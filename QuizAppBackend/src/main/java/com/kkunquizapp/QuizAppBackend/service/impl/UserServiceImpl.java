package com.kkunquizapp.QuizAppBackend.service.impl;

import com.cloudinary.Cloudinary;
import com.kkunquizapp.QuizAppBackend.dto.UserRequestDTO;
import com.kkunquizapp.QuizAppBackend.dto.UserResponseDTO;
import com.kkunquizapp.QuizAppBackend.dto.AuthResponseDTO;
import com.kkunquizapp.QuizAppBackend.exception.DuplicateEntityException;
import com.kkunquizapp.QuizAppBackend.exception.InvalidRequestException;
import com.kkunquizapp.QuizAppBackend.exception.UserNotFoundException;
import com.kkunquizapp.QuizAppBackend.model.User;
import com.kkunquizapp.QuizAppBackend.model.UserPrincipal;
import com.kkunquizapp.QuizAppBackend.model.enums.UserRole;
import com.kkunquizapp.QuizAppBackend.repo.UserRepo;
import com.kkunquizapp.QuizAppBackend.service.CustomUserDetailsService;
import com.kkunquizapp.QuizAppBackend.service.JwtService;
import com.kkunquizapp.QuizAppBackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.kkunquizapp.QuizAppBackend.helper.validateHelper.isEmailFormat;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final JwtEncoder jwtEncoder;
    private final UserRepo userRepo;
    private final ModelMapper modelMapper;
    private final BCryptPasswordEncoder encoder;
    private final CustomUserDetailsService customUserDetailsService;
    private final JwtService jwtService;
    private final Cloudinary cloudinary;

    @Override
    @Transactional
    public AuthResponseDTO createOrUpdateOAuth2User(String email, String name) {
        User user = userRepo.findByEmail(email)
                .orElse(new User());

        if (user.getUserId() == null) {
            user.setEmail(email);
            user.setUsername(email.substring(0, email.indexOf('@')));
            user.setRole(UserRole.USER);
            user.setPassword(encoder.encode(UUID.randomUUID().toString()));
        }

        User savedUser = userRepo.save(user);
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(savedUser.getUsername());
        Map<String, String> tokens = jwtService.generateTokens((UserPrincipal) userDetails);

        return AuthResponseDTO.builder()
                .accessToken(tokens.get("accessToken"))
                .refreshToken(tokens.get("refreshToken"))
                .type("Bearer")
                .username(savedUser.getUsername())
                .roles(List.of(savedUser.getRole().name()))
                .build();
    }

    @Override
    public List<UserResponseDTO> getAllUsers(String token) {
        Map<String, Object> userInfo = jwtService.getUserInfoFromToken(token.replace("Bearer ", ""));
        boolean isAdmin = ((List<?>) userInfo.get("roles")).contains("ROLE_ADMIN");

        // Nếu không phải admin, trả về lỗi 403
        if (!isAdmin) {
            throw new SecurityException("Bạn không có quyền truy cập");
        }

        // Chỉ admin mới truy vấn danh sách người dùng
        return userRepo.findAll().stream()
                .map(user -> modelMapper.map(user, UserResponseDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public UserResponseDTO getUserById(String userId, String token) {
        // Lấy thông tin từ Access Token bằng SecurityContextHolder
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication.getPrincipal() instanceof Jwt jwt)) {
            throw new SecurityException("Không thể xác thực Access Token");
        }
        String userIdFromToken = jwt.getClaim("userId");
        List<String> roles = jwt.getClaim("roles");
        boolean isAdmin = roles.contains(UserRole.ADMIN.name()); // Kiểm tra quyền admin

        // Nếu không phải admin và không phải chủ tài khoản, trả về lỗi
        if (!isAdmin && !userIdFromToken.equals(userId)) {
            throw new SecurityException("Bạn không có quyền truy cập vào thông tin người dùng này");
        }

        // Lấy thông tin người dùng
        User user = userRepo.findById(UUID.fromString(userId))
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));

        return modelMapper.map(user, UserResponseDTO.class);
    }

    @Override
    @Transactional
    public UserResponseDTO updateUser(UUID id, UserRequestDTO userRequestDTO) {
        User existingUser = userRepo.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + id));

        // Validate email format
        if (userRequestDTO.getEmail() != null && !isEmailFormat(userRequestDTO.getEmail())) {
            throw new InvalidRequestException("Invalid email format");
        }

        // Check for duplicate email (if changed)
        if (userRequestDTO.getEmail() != null && !userRequestDTO.getEmail().equals(existingUser.getEmail())) {
            if (userRepo.findByEmail(userRequestDTO.getEmail()).isPresent()) {
                throw new DuplicateEntityException("Email already in use");
            }
            existingUser.setEmail(userRequestDTO.getEmail());
        }

        // Update fields if provided
        if (userRequestDTO.getUsername() != null && !userRequestDTO.getUsername().isEmpty()) {
            existingUser.setUsername(userRequestDTO.getUsername());
        }
        if (userRequestDTO.getName() != null) {
            existingUser.setName(userRequestDTO.getName());
        }
        if (userRequestDTO.getSchool() != null) {
            existingUser.setSchool(userRequestDTO.getSchool());
        }
        if (userRequestDTO.getPassword() != null && !userRequestDTO.getPassword().isEmpty()) {
            existingUser.setPassword(encoder.encode(userRequestDTO.getPassword()));
        }
        if (userRequestDTO.getRole() != null) {
            try {
                UserRole role = UserRole.valueOf(userRequestDTO.getRole().toUpperCase());
                existingUser.setRole(role);
            } catch (IllegalArgumentException e) {
                throw new InvalidRequestException("Invalid role: " + userRequestDTO.getRole());
            }
        }

        // Save updated user
        User updatedUser = userRepo.save(existingUser);
        return modelMapper.map(updatedUser, UserResponseDTO.class);
    }

    @Override
    public void deleteUser(UUID id) {
        if (!userRepo.existsById(id)) {
            throw new UserNotFoundException("User not found with ID: " + id);
        }
        userRepo.deleteById(id);
    }

    @Override
    @Transactional
    public UserResponseDTO updateUserAvatar(UUID id, MultipartFile file, String token) {
        // Lấy thông tin từ Access Token
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication.getPrincipal() instanceof Jwt jwt)) {
            throw new SecurityException("Không thể xác thực Access Token");
        }
        String userIdFromToken = jwt.getClaim("userId");
        List<String> roles = jwt.getClaim("roles");
        boolean isAdmin = roles.contains(UserRole.ADMIN.name());

        // Nếu không phải admin và không phải chủ tài khoản, trả về lỗi
        if (!isAdmin && !userIdFromToken.equals(id.toString())) {
            throw new SecurityException("Bạn không có quyền cập nhật avatar của người dùng này");
        }

        // Tìm người dùng
        User user = userRepo.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + id));

        try {
            // Upload file lên Cloudinary
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                    Map.of("resource_type", "image", "public_id", "user_avatars/" + id.toString()));

            // Lấy URL của ảnh từ Cloudinary
            String avatarUrl = (String) uploadResult.get("secure_url");

            // Cập nhật avatar trong database
            user.setAvatar(avatarUrl);
            User updatedUser = userRepo.save(user);

            return modelMapper.map(updatedUser, UserResponseDTO.class);
        } catch (IOException e) {
            throw new RuntimeException("Lỗi khi upload avatar lên Cloudinary: " + e.getMessage());
        }
    }
}