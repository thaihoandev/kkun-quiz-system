document.addEventListener("DOMContentLoaded", function (e) {
    let a = document.querySelector(".datatables-permissions"),
        r = "app-user-list.html";
    a &&
        new DataTable(a, {
            ajax: assetsPath + "json/permissions-list.json",
            columns: [
                {data: "id"},
                {data: "id"},
                {data: "name"},
                {data: "assigned_to"},
                {data: "created_date"},
                {data: "id"},
            ],
            columnDefs: [
                {
                    className: "control",
                    orderable: !1,
                    searchable: !1,
                    responsivePriority: 2,
                    targets: 0,
                    render: function (e, a, t, s) {
                        return "";
                    },
                },
                {targets: 1, searchable: !1, visible: !1},
                {
                    targets: 2,
                    render: function (e, a, t, s) {
                        return (
                            '<span class="text-nowrap text-heading">' +
                            t.name +
                            "</span>"
                        );
                    },
                },
                {
                    targets: 3,
                    orderable: !1,
                    render: function (e, a, t, s) {
                        t = t.assigned_to;
                        let n = "",
                            o = {
                                Admin: `<a href="${r}"><span class="badge bg-label-primary me-4">Administrator</span></a>`,
                                Manager: `<a href="${r}"><span class="badge bg-label-warning me-4">Manager</span></a>`,
                                Users: `<a href="${r}"><span class="badge bg-label-success me-4">Users</span></a>`,
                                Support: `<a href="${r}"><span class="badge bg-label-info me-4">Support</span></a>`,
                                Restricted: `<a href="${r}"><span class="badge bg-label-danger me-4">Restricted User</span></a>`,
                            };
                        return (
                            t.forEach((e) => {
                                n += o[e] || "";
                            }),
                            `<span class="text-nowrap">${n}</span>`
                        );
                    },
                },
                {
                    targets: 4,
                    orderable: !1,
                    render: function (e, a, t, s) {
                        return (
                            '<span class="text-nowrap">' +
                            t.created_date +
                            "</span>"
                        );
                    },
                },
                {
                    targets: -1,
                    searchable: !1,
                    title: "Actions",
                    orderable: !1,
                    render: function (e, a, t, s) {
                        return `
              <div class="d-flex align-items-center">
                <span class="text-nowrap">
                  <button class="btn btn-icon me-1" data-bs-target="#editPermissionModal" data-bs-toggle="modal" data-bs-dismiss="modal">
                    <i class="icon-base bx bx-edit icon-md"></i>
                  </button>
                  <a href="javascript:;" class="btn btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                    <i class="icon-base bx bx-dots-vertical-rounded icon-md"></i>
                  </a>
                  <div class="dropdown-menu dropdown-menu-end m-0">
                    <a href="javascript:;" class="dropdown-item">Edit</a>
                    <a href="javascript:;" class="dropdown-item">Suspend</a>
                  </div>
                </span>
              </div>
            `;
                    },
                },
            ],
            order: [[1, "asc"]],
            layout: {
                topStart: {
                    rowClass: "row m-3 my-0 justify-content-between",
                    features: [
                        {
                            pageLength: {
                                menu: [10, 25, 50, 100],
                                text: "Show_MENU_",
                            },
                        },
                    ],
                },
                topEnd: {
                    features: [
                        {
                            search: {
                                placeholder: "Search Permission",
                                text: "_INPUT_",
                            },
                        },
                        {
                            buttons: [
                                {
                                    text: '<i class="icon-base bx bx-plus icon-xs me-0 me-sm-2"></i><span class="d-none d-sm-inline-block">Add Permission</span>',
                                    className: "add-new btn btn-primary",
                                    attr: {
                                        "data-bs-toggle": "modal",
                                        "data-bs-target": "#addPermissionModal",
                                    },
                                },
                            ],
                        },
                    ],
                },
                bottomStart: {
                    rowClass: "row mx-3 justify-content-between",
                    features: ["info"],
                },
                bottomEnd: {paging: {firstLast: !1}},
            },
            language: {
                paginate: {
                    next: '<i class="icon-base bx bx-chevron-right scaleX-n1-rtl icon-18px"></i>',
                    previous:
                        '<i class="icon-base bx bx-chevron-left scaleX-n1-rtl icon-18px"></i>',
                },
            },
            responsive: {
                details: {
                    display: DataTable.Responsive.display.modal({
                        header: function (e) {
                            return "Details of " + e.data().name;
                        },
                    }),
                    type: "column",
                    renderer: function (e, a, t) {
                        var s,
                            n,
                            o,
                            t = t
                                .map(function (e) {
                                    return "" !== e.title
                                        ? `<tr data-dt-row="${e.rowIndex}" data-dt-column="${e.columnIndex}">
                      <td>${e.title}:</td>
                      <td>${e.data}</td>
                    </tr>`
                                        : "";
                                })
                                .join("");
                        return (
                            !!t &&
                            ((s = document.createElement("div")).classList.add(
                                "table-responsive",
                            ),
                            (n = document.createElement("table")),
                            s.appendChild(n),
                            n.classList.add("table"),
                            ((o = document.createElement("tbody")).innerHTML =
                                t),
                            n.appendChild(o),
                            s)
                        );
                    },
                },
            },
        }),
        setTimeout(() => {
            [
                {selector: ".dt-buttons .btn", classToRemove: "btn-secondary"},
                {
                    selector: ".dt-search .form-control",
                    classToRemove: "form-control-sm",
                },
                {selector: ".dt-search", classToAdd: "mb-md-6 mb-2"},
                {
                    selector: ".dt-length .form-select",
                    classToRemove: "form-select-sm",
                },
                {selector: ".dt-length", classToAdd: "mb-0 mb-md-6"},
                {selector: ".dt-buttons", classToAdd: "mb-0"},
                {
                    selector: ".dt-layout-end",
                    classToRemove: "justify-content-between",
                    classToAdd:
                        "justify-content-md-between justify-content-center d-flex flex-wrap gap-4 mb-md-0 mb-6 mt-0",
                },
                {selector: ".dt-layout-start", classToAdd: "mt-0"},
                {selector: ".dt-layout-table", classToRemove: "row mt-2"},
            ].forEach(({selector: e, classToRemove: t, classToAdd: s}) => {
                document.querySelectorAll(e).forEach((a) => {
                    t && t.split(" ").forEach((e) => a.classList.remove(e)),
                        s && s.split(" ").forEach((e) => a.classList.add(e));
                });
            });
        }, 100);
});
