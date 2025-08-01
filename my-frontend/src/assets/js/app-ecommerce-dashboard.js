document.addEventListener("DOMContentLoaded", function (o) {
    let e, r, t, a, s, i, l, n, d, c, h;
    (d = isDarkStyle
        ? ((a = "dark"),
          (i = "#4f51c0"),
          (l = "#595cd9"),
          (n = "#8789ff"),
          "#c3c4ff")
        : ((a = ""),
          (i = "#e1e2ff"),
          (l = "#c3c4ff"),
          (n = "#a5a7ff"),
          "#696cff")),
        (e = config.colors.cardColor),
        (r = config.colors.headingColor),
        (t = config.colors.textMuted),
        (s = config.colors.borderColor),
        (c = config.fontFamily),
        (h = config.colors.bodyColor);
    var p = document.querySelector("#visitorsChart"),
        g = {
            chart: {
                height: 120,
                width: 200,
                parentHeightOffset: 0,
                type: "bar",
                toolbar: {show: !1},
            },
            plotOptions: {
                bar: {
                    barHeight: "75%",
                    columnWidth: "60%",
                    startingShape: "rounded",
                    endingShape: "rounded",
                    borderRadius: 7,
                    distributed: !0,
                },
            },
            grid: {show: !1, padding: {top: -25, bottom: -12}},
            colors: [
                config.colors_label.primary,
                config.colors_label.primary,
                config.colors_label.primary,
                config.colors_label.primary,
                config.colors_label.primary,
                config.colors.primary,
                config.colors_label.primary,
            ],
            dataLabels: {enabled: !1},
            series: [{data: [40, 95, 60, 45, 90, 50, 75]}],
            legend: {show: !1},
            responsive: [
                {
                    breakpoint: 1440,
                    options: {
                        plotOptions: {
                            bar: {borderRadius: 9, columnWidth: "60%"},
                        },
                    },
                },
                {
                    breakpoint: 1300,
                    options: {
                        plotOptions: {
                            bar: {borderRadius: 9, columnWidth: "60%"},
                        },
                    },
                },
                {
                    breakpoint: 1200,
                    options: {
                        plotOptions: {
                            bar: {borderRadius: 8, columnWidth: "50%"},
                        },
                    },
                },
                {
                    breakpoint: 1040,
                    options: {
                        plotOptions: {
                            bar: {borderRadius: 8, columnWidth: "50%"},
                        },
                    },
                },
                {
                    breakpoint: 991,
                    options: {
                        plotOptions: {
                            bar: {borderRadius: 8, columnWidth: "50%"},
                        },
                    },
                },
                {
                    breakpoint: 420,
                    options: {
                        plotOptions: {
                            bar: {borderRadius: 8, columnWidth: "50%"},
                        },
                    },
                },
            ],
            xaxis: {
                categories: ["M", "T", "W", "T", "F", "S", "S"],
                axisBorder: {show: !1},
                axisTicks: {show: !1},
                labels: {style: {colors: t, fontSize: "13px"}},
            },
            yaxis: {labels: {show: !1}},
        },
        p =
            (null !== p && new ApexCharts(p, g).render(),
            document.querySelector("#activityChart")),
        g = {
            chart: {
                height: 110,
                width: 220,
                parentHeightOffset: 0,
                toolbar: {show: !1},
                type: "area",
            },
            dataLabels: {enabled: !1},
            stroke: {width: 2, curve: "smooth"},
            series: [{data: [15, 22, 17, 39, 12, 35, 25]}],
            colors: [config.colors.success],
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    gradientToColors: [config.colors.cardColor],
                    opacityTo: 0.2,
                    stops: [0, 85, 100],
                },
            },
            grid: {show: !1, padding: {top: -20, bottom: -8}},
            legend: {show: !1},
            xaxis: {
                categories: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
                axisBorder: {show: !1},
                axisTicks: {show: !1},
                labels: {style: {fontSize: "13px", colors: t}},
            },
            yaxis: {labels: {show: !1}},
        },
        p =
            (null !== p && new ApexCharts(p, g).render(),
            document.querySelector("#profitChart")),
        g = {
            series: [{data: [73, 56, 56, 100]}, {data: [61, 42, 74, 72]}],
            chart: {type: "bar", height: 90, toolbar: {tools: {download: !1}}},
            plotOptions: {
                bar: {
                    columnWidth: "69%",
                    startingShape: "rounded",
                    endingShape: "rounded",
                    borderRadius: 3,
                    dataLabels: {show: !1},
                },
            },
            states: {
                hover: {filter: {type: "none"}},
                active: {filter: {type: "none"}},
            },
            grid: {
                show: !1,
                padding: {top: -30, bottom: -12, left: -10, right: 0},
            },
            colors: [config.colors.success, config.colors_label.success],
            dataLabels: {enabled: !1},
            stroke: {show: !0, width: 5, colors: e},
            legend: {show: !1},
            xaxis: {
                categories: ["Jan", "Apr", "Jul", "Oct"],
                axisBorder: {show: !1},
                axisTicks: {show: !1},
                labels: {style: {colors: t, fontSize: "13px"}},
            },
            yaxis: {labels: {show: !1}},
        },
        p =
            (null !== p && new ApexCharts(p, g).render(),
            document.querySelector("#expensesChart")),
        g = {
            chart: {
                height: 130,
                sparkline: {enabled: !0},
                parentHeightOffset: 0,
                type: "radialBar",
            },
            colors: [config.colors.primary],
            series: [78],
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    hollow: {size: "55%"},
                    track: {background: config.colors_label.secondary},
                    dataLabels: {
                        name: {show: !1},
                        value: {
                            fontSize: "18px",
                            fontFamily: c,
                            color: r,
                            fontWeight: 500,
                            offsetY: -5,
                        },
                    },
                },
            },
            grid: {show: !1, padding: {left: -10, right: -10, bottom: 5}},
            stroke: {lineCap: "round"},
            labels: ["Progress"],
        },
        p =
            (null !== p && new ApexCharts(p, g).render(),
            document.querySelector("#totalIncomeChart")),
        g = {
            chart: {
                height: 290,
                type: "area",
                toolbar: !1,
                dropShadow: {
                    enabled: !0,
                    top: 14,
                    left: 2,
                    blur: 3,
                    color: config.colors.primary,
                    opacity: 0.15,
                },
            },
            series: [
                {
                    data: [
                        3350, 3350, 4800, 4800, 2950, 2950, 1800, 1800, 3750,
                        3750, 5700, 5700,
                    ],
                },
            ],
            dataLabels: {enabled: !1},
            stroke: {width: 3, curve: "straight"},
            colors: [config.colors.primary],
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.3,
                    gradientToColors: [config.colors.cardColor],
                    opacityTo: 0.3,
                    stops: [0, 100],
                },
            },
            grid: {
                show: !0,
                strokeDashArray: 10,
                borderColor: s,
                padding: {top: -15, bottom: -10, left: 0, right: 0},
            },
            xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                ],
                labels: {
                    offsetX: 0,
                    style: {colors: t, fontFamily: c, fontSize: "13px"},
                },
                axisBorder: {show: !1},
                axisTicks: {show: !1},
                lines: {show: !1},
            },
            yaxis: {
                labels: {
                    offsetX: -15,
                    formatter: function (o) {
                        return "$" + parseInt(o / 1e3) + "k";
                    },
                    style: {fontSize: "13px", fontFamily: c, colors: t},
                },
                min: 1e3,
                max: 6e3,
                tickAmount: 5,
            },
        },
        p =
            (null !== p && new ApexCharts(p, g).render(),
            document.querySelector("#performanceChart")),
        g = {
            series: [
                {name: "Income", data: [26, 29, 31, 40, 29, 24]},
                {name: "Earning", data: [30, 26, 24, 26, 24, 40]},
            ],
            chart: {
                height: 310,
                type: "radar",
                toolbar: {show: !1},
                dropShadow: {
                    enabled: !0,
                    enabledOnSeries: void 0,
                    top: 6,
                    left: 0,
                    blur: 6,
                    color: "#000",
                    opacity: 0.14,
                },
            },
            plotOptions: {
                radar: {polygons: {strokeColors: s, connectorColors: s}},
            },
            stroke: {show: !1, width: 0},
            legend: {
                show: !0,
                fontSize: "13px",
                position: "bottom",
                labels: {colors: h, useSeriesColors: !1},
                markers: {size: 5, offsetX: -5, strokeWidth: 0},
                itemMargin: {horizontal: 10},
                onItemHover: {highlightDataSeries: !1},
            },
            colors: [config.colors.primary, config.colors.info],
            fill: {opacity: [1, 0.85]},
            markers: {size: 0},
            grid: {show: !1, padding: {top: -8, bottom: -5}},
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                labels: {
                    show: !0,
                    style: {
                        colors: [t, t, t, t, t, t],
                        fontSize: "13px",
                        fontFamily: c,
                    },
                },
            },
            yaxis: {show: !1, min: 0, max: 40, tickAmount: 4},
        },
        p =
            (null !== p && new ApexCharts(p, g).render(),
            document.querySelector("#conversionRateChart")),
        g = {
            chart: {
                height: 80,
                width: 140,
                type: "line",
                toolbar: {show: !1},
                dropShadow: {
                    enabled: !0,
                    top: 10,
                    left: 5,
                    blur: 3,
                    color: config.colors.primary,
                    opacity: 0.15,
                },
                sparkline: {enabled: !0},
            },
            markers: {
                size: 6,
                colors: "transparent",
                strokeColors: "transparent",
                strokeWidth: 4,
                discrete: [
                    {
                        fillColor: config.colors.white,
                        seriesIndex: 0,
                        dataPointIndex: 3,
                        strokeColor: config.colors.primary,
                        strokeWidth: 4,
                        size: 6,
                        radius: 2,
                    },
                ],
                offsetX: -1,
                hover: {size: 7},
            },
            grid: {show: !1, padding: {right: 8}},
            colors: [config.colors.primary],
            dataLabels: {enabled: !1},
            stroke: {width: 5, curve: "smooth"},
            series: [{data: [137, 210, 160, 245]}],
            xaxis: {
                show: !1,
                lines: {show: !1},
                labels: {show: !1},
                axisBorder: {show: !1},
            },
            yaxis: {show: !1},
        },
        p =
            (null !== p && new ApexCharts(p, g).render(),
            document.querySelector("#expensesBarChart")),
        g = {
            chart: {height: 190, stacked: !0, type: "bar", toolbar: {show: !1}},
            series: [
                {name: "2021", data: [15, 37, 14, 30, 38, 30, 20, 13, 14, 23]},
                {
                    name: "2020",
                    data: [-33, -23, -29, -21, -25, -21, -23, -19, -37, -22],
                },
            ],
            plotOptions: {
                bar: {
                    horizontal: !1,
                    columnWidth: "40%",
                    borderRadius: 5,
                    startingShape: "rounded",
                    endingShape: "rounded",
                    borderRadiusApplication: "around",
                },
            },
            colors: [config.colors.primary, config.colors.warning],
            dataLabels: {enabled: !1},
            stroke: {curve: "smooth", width: 2, lineCap: "round", colors: [e]},
            legend: {show: !1},
            grid: {show: !1, padding: {top: -10}},
            fill: {opacity: [1, 1]},
            xaxis: {
                show: !1,
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                labels: {show: !1},
                axisTicks: {show: !1},
                axisBorder: {show: !1},
            },
            yaxis: {show: !1},
            states: {
                hover: {filter: {type: "none"}},
                active: {filter: {type: "none"}},
            },
        },
        p =
            (null !== p && new ApexCharts(p, g).render(),
            document.querySelector("#totalBalanceChart")),
        g = {
            series: [{data: [137, 210, 160, 275, 205, 315]}],
            chart: {
                height: 245,
                parentHeightOffset: 0,
                parentWidthOffset: 0,
                type: "line",
                dropShadow: {
                    enabled: !0,
                    top: 10,
                    left: 5,
                    blur: 3,
                    color: config.colors.warning,
                    opacity: 0.25,
                },
                toolbar: {show: !1},
            },
            dataLabels: {enabled: !1},
            stroke: {width: 4, curve: "smooth"},
            legend: {show: !1},
            colors: [config.colors.warning],
            markers: {
                size: 6,
                colors: "transparent",
                strokeColors: "transparent",
                strokeWidth: 4,
                discrete: [
                    {
                        fillColor: config.colors.white,
                        seriesIndex: 0,
                        dataPointIndex: 5,
                        strokeColor: config.colors.warning,
                        strokeWidth: 8,
                        size: 8,
                        radius: 8,
                    },
                ],
                offsetX: -1,
                hover: {size: 9},
            },
            grid: {
                show: !1,
                padding: {top: -10, left: 0, right: 0, bottom: 10},
            },
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                axisBorder: {show: !1},
                axisTicks: {show: !1},
                labels: {
                    show: !0,
                    style: {fontSize: "13px", fontFamily: c, colors: t},
                },
            },
            yaxis: {labels: {show: !1}},
        };
    null !== p && new ApexCharts(p, g).render();
});
