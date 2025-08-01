document.addEventListener("DOMContentLoaded", function (e) {
    let t = document.querySelector(".datatables-customer-order"),
        s = {
            1: {title: "Ready to  Pickup", class: "bg-label-info"},
            2: {title: "Dispatched", class: "bg-label-warning"},
            3: {title: "Delivered", class: "bg-label-success"},
            4: {title: "Out for delivery", class: "bg-label-primary"},
        };
    var a, r;
    t &&
        ((a = document.createElement("h5")).classList.add("card-title", "mb-0"),
        (a.innerHTML = "Orders placed"),
        (r = new DataTable(t, {
            ajax: assetsPath + "json/ecommerce-customer-order.json",
            columns: [
                {data: "id"},
                {data: "order"},
                {data: "date"},
                {data: "status"},
                {data: "spent"},
                {data: "id"},
            ],
            columnDefs: [
                {
                    className: "control",
                    searchable: !1,
                    orderable: !1,
                    responsivePriority: 2,
                    targets: 0,
                    render: function (e, t, a, r) {
                        return "";
                    },
                },
                {
                    targets: 1,
                    responsivePriority: 4,
                    render: function (e, t, a, r) {
                        return (
                            "<a href='app-ecommerce-order-details.html'><span>#" +
                            a.order +
                            "</span></a>"
                        );
                    },
                },
                {
                    targets: 2,
                    render: function (e, t, a, r) {
                        return (
                            '<span class="text-nowrap">' +
                            new Date(a.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            }) +
                            "</span > "
                        );
                    },
                },
                {
                    targets: 3,
                    render: function (e, t, a, r) {
                        a = a.status;
                        return (
                            '<span class="badge ' +
                            s[a].class +
                            '" text-capitalized>' +
                            s[a].title +
                            "</span>"
                        );
                    },
                },
                {
                    targets: 4,
                    render: function (e, t, a, r) {
                        return "<span >" + a.spent + "</span>";
                    },
                },
                {
                    targets: -1,
                    title: "Actions",
                    searchable: !1,
                    orderable: !1,
                    render: function (e, t, a, r) {
                        return `
              <div class="text-xxl-center">
                <button class="btn btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                  <i class="icon-base bx bx-dots-vertical-rounded"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-end m-0">
                  <a href="javascript:void(0);" class="dropdown-item">View</a>
                  <a href="javascript:void(0);" class="dropdown-item delete-record">Delete</a>
                </div>
              </div>
            `;
                    },
                },
            ],
            order: [[1, "desc"]],
            layout: {
                topStart: {
                    rowClass: "row card-header border-bottom mx-0 px-3 py-0",
                    features: [a],
                },
                topEnd: {
                    search: {placeholder: "Search order", text: "_INPUT_"},
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
            pageLength: 6,
            responsive: {
                details: {
                    display: DataTable.Responsive.display.modal({
                        header: function (e) {
                            return "Details of " + e.data().order;
                        },
                    }),
                    type: "column",
                    renderer: function (e, t, a) {
                        var r,
                            s,
                            o,
                            a = a
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
                            !!a &&
                            ((r = document.createElement("div")).classList.add(
                                "table-responsive",
                            ),
                            (s = document.createElement("table")),
                            r.appendChild(s),
                            s.classList.add("table"),
                            ((o = document.createElement("tbody")).innerHTML =
                                a),
                            s.appendChild(o),
                            r)
                        );
                    },
                },
            },
        }))),
        document.addEventListener("click", function (e) {
            e.target.classList.contains("delete-record") &&
                (r.row(e.target.closest("tr")).remove().draw(),
                (e = document.querySelector(".dtr-bs-modal"))) &&
                e.classList.contains("show") &&
                bootstrap.Modal.getInstance(e)?.hide();
        }),
        setTimeout(() => {
            [
                {selector: ".dt-buttons .btn", classToRemove: "btn-secondary"},
                {
                    selector: ".dt-search .form-control",
                    classToRemove: "form-control-sm",
                },
                {
                    selector: ".dt-length .form-select",
                    classToRemove: "form-select-sm",
                },
                {selector: ".dt-layout-table", classToRemove: "row mt-2"},
                {selector: ".dt-layout-start", classToAdd: "mb-xxl-0 mb-4"},
                {
                    selector: ".dt-layout-full",
                    classToRemove: "col-md col-12",
                    classToAdd: "table-responsive",
                },
            ].forEach(({selector: e, classToRemove: a, classToAdd: r}) => {
                document.querySelectorAll(e).forEach((t) => {
                    a && a.split(" ").forEach((e) => t.classList.remove(e)),
                        r && r.split(" ").forEach((e) => t.classList.add(e));
                });
            });
        }, 100);
});
