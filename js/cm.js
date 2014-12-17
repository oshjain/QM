function rPosOnDesigner(e, t) {
    return {
        left: e.left + desPos.left,
        top: e.top + t
    };
}

var line, tableBuilder, desPos, grid = {}, sample = {
    Employee: {
        alias: "Employee",
        relationShips: [ {
            withTable: "Department",
            field: "dept_id",
            fieldAlias: "Department ID",
            type: "leftOuter",
            on: "employee_dept",
            onAlias: "Employee Dept"
        } ],
        data: [ {
            col: "employee_id",
            alias: "Employee ID",
            type: "double",
            primary: !0
        }, {
            col: "employee_dept",
            alias: "Employee Dept",
            type: "varchar"
        }, {
            col: "employee name",
            alias: "Employee Name",
            type: "char"
        }, {
            col: "employee_account",
            alias: "Employee Account",
            type: "char"
        }, {
            col: "employee_age",
            alias: "Employee Age",
            type: "int"
        }, {
            col: "employee_band",
            alias: "Employee Band",
            type: "double"
        }, {
            col: "employee_join_date",
            alias: "Employee Join Date",
            type: "date"
        }, {
            col: "employee_domain",
            alias: "Employee Domain",
            type: "char"
        } ]
    },
    Department: {
        alias: "Dept",
        relationShips: [ {
            withTable: "Employee",
            field: "employee_dept",
            fieldAlias: "Employee Dept",
            type: "leftOuter",
            on: "dept_id",
            onAlias: "Department ID"
        } ],
        data: [ {
            col: "dept_id",
            alias: "Department ID",
            type: "double",
            primary: !0
        }, {
            col: "dept_name",
            alias: "Department Name",
            type: "varchar"
        }, {
            col: "dept_head",
            alias: "Department Head",
            type: "varchar"
        } ]
    },
    Products: {
        alias: "Products",
        data: [ {
            col: "product_id",
            alias: "Product ID",
            type: "double",
            primary: !0
        }, {
            col: "product name",
            alias: "Product Name",
            type: "char"
        }, {
            col: "product price",
            alias: "Product Price",
            type: "float/double"
        } ]
    },
    Sales: {
        alias: "Sales",
        data: [ {
            col: "sale_id",
            alias: "Sale ID",
            type: "double",
            primary: !0
        }, {
            col: "product name",
            alias: "Product Name",
            type: "char"
        }, {
            col: "sale amount",
            alias: "Sale Amount",
            type: "float/double"
        }, {
            col: "sale curr",
            alias: "Sale Currency",
            type: "String"
        }, {
            col: "salesman",
            alias: "Sales Person",
            type: "String"
        } ]
    }
};

Raphael.fn.connection = function(e, t, a, i, n) {
    e.line && e.from && e.to && (a = e, e = a.from, t = a.to);
    for (var o = e.getBBox(), r = t.getBBox(), l = [ {
        x: o.x + o.width / 2,
        y: o.y - 1
    }, {
        x: o.x + o.width / 2,
        y: o.y + o.height + 1
    }, {
        x: o.x - 1,
        y: o.y + o.height / 2
    }, {
        x: o.x + o.width + 1,
        y: o.y + o.height / 2
    }, {
        x: r.x + r.width / 2,
        y: r.y - 1
    }, {
        x: r.x + r.width / 2,
        y: r.y + r.height + 1
    }, {
        x: r.x - 1,
        y: r.y + r.height / 2
    }, {
        x: r.x + r.width + 1,
        y: r.y + r.height / 2
    } ], s = {}, d = [], p = 0; 4 > p; p++) for (var c = 4; 8 > c; c++) {
        var h = Math.abs(l[p].x - l[c].x), u = Math.abs(l[p].y - l[c].y);
        (p == c - 4 || (3 != p && 6 != c || l[p].x < l[c].x) && (2 != p && 7 != c || l[p].x > l[c].x) && (0 != p && 5 != c || l[p].y > l[c].y) && (1 != p && 4 != c || l[p].y < l[c].y)) && (d.push(h + u), 
        s[d[d.length - 1]] = [ p, c ]);
    }
    if (0 == d.length) var f = [ 0, 4 ]; else f = s[Math.min.apply(Math, d)];
    var g = l[f[0]].x, y = l[f[0]].y, b = l[f[1]].x, m = l[f[1]].y;
    h = Math.max(Math.abs(g - b) / 2, 10), u = Math.max(Math.abs(y - m) / 2, 10);
    var v = [ g, g, g - h, g + h ][f[0]].toFixed(3), x = [ y - u, y + u, y, y ][f[0]].toFixed(3), w = [ 0, 0, 0, 0, b, b, b - h, b + h ][f[1]].toFixed(3), k = [ 0, 0, 0, 0, y + u, y - u, m, m ][f[1]].toFixed(3), P = [ "M", g.toFixed(3), y.toFixed(3), "C", v, x, w, k, b.toFixed(3), m.toFixed(3) ].join(",");
    if (!a || !a.line) {
        var T = "string" == typeof a ? a : "#000", C = this.path(P).attr({
            stroke: T,
            fill: "none",
            "stroke-width": 3
        });
        return C.attr($.extend(!0, C.attrs, n)), {
            bg: i && i.split && this.path(P).attr({
                stroke: i.split("|")[0],
                fill: "none",
                "stroke-width": i.split("|")[1] || 3
            }),
            line: C,
            from: e,
            to: t
        };
    }
    a.bg && a.bg.attr({
        path: P
    }), a.line.attr({
        path: P
    });
};

var el, paper, joins = {
    rightOuter: {
        "arrow-end": "oval",
        "arrow-start": "classic-wide-short",
        stroke: "green",
        type: "rightOuter"
    },
    leftOuter: {
        "arrow-end": "classic-wide-short",
        "arrow-start": "oval",
        stroke: "#4D4F4F",
        type: "leftOuter",
        text: "Hello"
    },
    inner: {
        "arrow-end": "oval",
        "arrow-start": "oval",
        type: "inner",
        stroke: "#6598c7"
    }
};

Paper = {
    R: null,
    connection: {},
    connections: 0,
    dragger: function() {
        this.ox = this.attr("rect" == this.type ? "x" : "cx"), this.oy = this.attr("rect" == this.type ? "y" : "cy"), 
        this.animate({
            "fill-opacity": .2
        }, 500);
    },
    move: function(e, t) {
        var a = "rect" == this.type ? {
            x: this.ox + e,
            y: this.oy + t
        } : {
            cx: this.ox + e,
            cy: this.oy + t
        };
        this.attr(a), Paper.updateConnections();
    },
    up: function() {
        this.animate({
            "fill-opacity": 0
        }, 500);
    },
    makeRect: function(e, t, a, i, n, o) {
        if (r = this.R.rect(e, t, a, i), r.attr({
            fill: "blue",
            stroke: "blue",
            "fill-opacity": 2,
            "stroke-width": 2,
            cursor: "move"
        }), n) for (key in n) r[key] = n[key];
        if (o) for (key in o) r.attr({
            key: o[key]
        });
        return r.drag(this.move, this.dragger, this.up), r;
    },
    createConnection: function(e, t, a, i, n) {
        var o = this.getPosition(e, t), r = this.makeRect(o.dragger.left, o.dragger.top, 20, 2, {
            side: o.dragger.side,
            attachedTo: e
        }), l = this.makeRect(o.dropped.left, o.dropped.top, 20, 2, {
            side: o.dropped.side,
            attachedTo: t
        }), s = n ? joins[n] : joins.inner;
        this.connections += 1, s.connection = this.connections;
        var d = this.R.connection(r, l, "#6598c7", null, s), p = d.line;
        return this.connection[this.connections] = d, this.applyEvents(p, e, t).attachToParent(e, t, p, this.connections, s, r, l), 
        tableBuilder.tables.addJoin(a, s, e.text(), t.text(), i, this.connections), this;
    },
    updateConnections: function() {
        for (key in this.connection) this.R.connection(this.connection[key]);
        this.R.safari();
    },
    applyEvents: function(e, t, a) {
        return e.click(this.connector.click.bind(e, [ t, a ])), e.mouseover(this.connector.mouseover), 
        e.mouseout(this.connector.mouseout), this;
    },
    attachToParent: function(e, t, a, i, n, o, r) {
        var l, s;
        return l = $.data(e.offsetParent()[0], "C"), void 0 == l && (l = []), l.push({
            tr: e,
            line: a,
            id: i,
            joinType: n,
            from: o,
            to: r
        }), $.data(e.offsetParent()[0], "C", l), s = $.data(t.offsetParent()[0], "C"), void 0 == s && (s = []), 
        s.push({
            tr: t,
            line: a,
            id: i,
            joinType: n,
            from: r,
            to: o
        }), $.data(t.offsetParent()[0], "C", s), this;
    },
    connector: {
        click: function() {
            var e, t;
            from_object.innerHTML = e = arguments[0][0].data().Table, to_object.innerHTML = t = arguments[0][1].data().Table, 
            object_expression_input.innerHTML = arguments[0][0].text() + " = " + arguments[0][1].text();
            var a = this, i = a.attrs.type;
            return $("#" + i).attr("checked", !0), $.data($("#joinProps")[0], "A", {
                orig: i,
                changed: !1,
                newJoin: null,
                line: a,
                from: e,
                to: t
            }), $('input[type="radio"], #joinProps').each(function(e, t) {
                var a = $(t);
                a.iCheck({
                    radioClass: "iradio_square-blue"
                }).on("ifChecked", function() {
                    $.data($("#joinProps")[0], "A", $.extend({}, $.data($("#joinProps")[0], "A"), {
                        changed: !0,
                        newJoin: $(this).attr("id")
                    }));
                });
            }), $("#joinProps").dialog("open").offsetParent().css({
                width: "380px",
                "text-align": "center"
            }), 1;
        },
        mouseover: function() {
            this.attr({
                cursor: "hand",
                stroke: "red"
            });
        },
        mouseout: function() {
            this.attr({
                stroke: joins[this.attr("type")].stroke
            });
        }
    },
    getPosition: function(e, t) {
        var a = {
            side: "Left",
            top: e.position().top + e.offsetParent().position().top - 36,
            left: e.offsetParent().position().left
        }, i = {
            side: "Left",
            top: t.position().top + t.offsetParent().position().top - 36,
            left: t.offsetParent().position().left - 16
        }, n = this.onSide(a.left, i.left);
        return "Right" == n.dragger ? (i.left += 110, i.side = "Right") : (a.left += 110, 
        a.side = "Right"), {
            dragger: a,
            dropped: i
        };
    },
    onSide: function(e, t) {
        var a = e > t ? {
            dragger: "Right",
            dropped: "Left"
        } : {
            dragger: "Left",
            dropped: "Right"
        };
        return a;
    },
    clear: function() {
        return this.R.clear();
    }
}, $(document).ready(function() {
    function e() {
        var e = $.data($(this)[0], "C");
        if (e && e.length) {
            for (var t, a, i, n, o, r, l = 36, s = 0; s < e.length; s++) n = e[s].tr.offsetParent(), 
            a = e[s].tr.position(), i = n.position(), o = n.height() - 6, r = i.top + n.outerHeight(!0) - 52, 
            t = arguments.length > 1 ? a.top < 0 ? i.top - l : a.top > o ? r : a.top + i.top - l : a.top > o ? r : a.top < 0 ? i.top - l : a.top + i.top - l, 
            e[s].from.attr({
                x: "Right" == e[s].from.side ? i.left + 110 : i.left - 16,
                y: t
            });
            Paper.updateConnections();
        }
    }
    $(".MainFrame").height(window.innerHeight - 26 + "px"), $("#tabs").tabs(), Paper.R = Raphael("drawing", $("#designer").width(), 349), 
    tableBuilder = {
        raw: null,
        init: function(e) {
            return this.raw = e, this;
        },
        makeTableTree: function() {
            var e, t = this.raw, a = '<ul class="treeview grey" id="menu">';
            for (key in t) {
                for (e = t[key].data, a += '<li class="expandable"><div class="hitarea expandable-hitarea"></div><input type="checkbox" class="addMe"><span class="tName">' + key + "</span>", 
                a += '<ul style="display: none">', x = 0; x < e.length; x++) a += "<li>" + e[x].alias + "</li>";
                a += "</ul>";
            }
            return $(a).appendTo(".leftContainer>.content"), $("#menu").treeview({
                animated: "fast",
                collapsed: !1,
                unique: !0
            }), $("li.expandable").draggable({
                appendTo: "body",
                opacity: .7,
                cursor: "move",
                cursorAt: {
                    left: -6
                },
                refreshPositions: !0,
                helper: function() {
                    var e = "<div class='dragger-helper'><img src='css/images/drop-no.gif' align='top' style='margin-right: 4px'/>" + $(".tName", this).text() + "</div>";
                    return $(e);
                },
                stop: function() {
                    $(".container").removeClass("activateContainer");
                }
            }), this;
        },
        addTableToCont: function(e, t, i) {
            if (this.tables.current[e]) return this.popMsg("Table is already added"), this;
            var i = i || "#designer", n = this._outerHolder(e), o = this._tableRows(n.t, n.a, n.tb, n.tn, e);
            o.appendTo(n.a), n.a.appendTo(n.inner);
            var r = this._putTogether(n.outer, n.misc, n.inner, t, i), l = this._applyCSS(r)._makeRowsDraggable(r), s = l.find(".inner-holder"), d = l.find(".closer")[0];
            return d.onclick = a.bind(d), this._makeInnerDraggable(s), l;
        },
        _outerHolder: function(e) {
            {
                var t, a, i, n, o, r = this.raw[e].data;
                this.tables.inc;
            }
            a = $('<div class="outer-holder" id=tab' + e + ">"), o = '<div class="holder-header"><span style="float:left">' + e + '</span><span class="closer"></span></div>', 
            o += '<div class="alias-holder"><span style="float:left">Alias</span>&nbsp<input style="float: right" type="text" class="tableAlias" size=8 value="' + this.raw[e].alias + '"></div>', 
            misc = $(o), i = $('<div class="inner-holder">');
            var t = $("<table id=tb" + e + ">"), n = $("<tbody></tbody>");
            return {
                a: t,
                tb: n,
                t: r,
                outer: a,
                inner: i,
                misc: misc,
                tn: e
            };
        },
        _tableRows: function(e, t, a, i, n) {
            $("<tr></tr>").html('<td><input type="checkbox" class="selCol selAll"></td><td>*</td>').data("details", {
                table: n,
                col: "*",
                alias: "*"
            }).appendTo(a);
            for (var o, r, l = 0; l < e.length; l++) o = $("<tr id=trow" + i + "tr" + l + ">").addClass("rowJoin").data("Table", n), 
            r = $("<td>").html('<input type="checkbox" class="selCol">').appendTo(o), r = $("<td>"), 
            e[l].primary && r.append("<span class='primaryKey'></span>"), r.append(e[l].alias).appendTo(o), 
            e[l].table = i, o.data("details", e[l]).appendTo(a);
            return a;
        },
        _putTogether: function(e, t, a, i, n) {
            var o = e.append(t).append(a).css({
                left: i.left + "px",
                top: i.top + "px"
            }).appendTo(n);
            return o;
        },
        _applyCSS: function(e) {
            var t = e.find("table").children();
            return t.applyStyles(), this;
        },
        _makeRowsDraggable: function(e) {
            e.find("table").find("tr").draggable({
                appendTo: "body",
                helper: function() {
                    return $('<div class="tr-dragger"/>').text($(this).text());
                },
                opacity: .7,
                cursor: "move"
            }).droppable({
                drop: function(e, t) {
                    var a = t.draggable.offsetParent();
                    return a[0] == $(this).offsetParent()[0] ? tableBuilder.popMsg("Cannot drop on same table") : void Paper.createConnection(t.draggable, $(this), $("div.holder-header", a).text(), $("div.holder-header", $(this).offsetParent()).text());
                }
            });
            return e;
        },
        _makeInnerDraggable: function(t) {
            var a = t.offsetParent(), i = [ a.position().top ];
            t.scroll(e.bind(a, i));
        },
        setAlias: function(e, t) {
            return this.raw[e].alias = t;
        },
        tables: {
            current: {},
            joins: [],
            remove: function(e, t) {
                var a = $.data(t[0], "C");
                return $(t).remove(), this.current[e].hasOwnProperty("props") && "Derived" == this.current[e].props.type && delete tableBuilder.raw[e], 
                delete this.current[e], void 0 !== a && this.removeJoin(a), grid.remove(null, e);
            },
            add: function(e, t, a) {
                if (this.current[t] = e, this.current[t].hasOwnProperty("relationShips")) for (var i = this.current[t].relationShips, n = 0; n < i.length; n++) if (this.current.hasOwnProperty(i[n].withTable)) {
                    var o = $("#tb" + i[n].withTable), r = i[n].type, l = this.findRowInTable(o, i[n].fieldAlias), s = a.find("#tb" + t), d = this.findRowInTable(s, i[n].onAlias);
                    Paper.createConnection(l, d, i[n].withTable, t, r);
                }
            },
            inc: 0,
            addJoin: function(e, t, a, i, n, o) {
                return this.joins.push({
                    fromTable: e,
                    join: t,
                    field: a,
                    on: i,
                    withTable: n,
                    id: o
                }), this;
            },
            updateJoin: function(e, t, a, i) {
                for (z in Paper.connection) Paper.connection[z].line.attrs.connection == e.attrs.connection && (Paper.connection[z].line.attr(t), 
                Paper.connection[z].line.attrs.type = t.type, Paper.applyEvents(e, a, i));
            },
            removeJoin: function(e) {
                var t = this.joins;
                return e.length && $.each(e, function(e, a) {
                    a.line.remove(), a.from.remove(), a.to.remove(), delete Paper.connection[a.id], 
                    Paper.connections--, $.each(t, function(e, i) {
                        return i.id == a.id ? (t.splice(e, 1), !1) : void 0;
                    }), this.joins = t;
                }), this;
            },
            findRowInTable: function(e, t) {
                for (var a = e.find("tr"), i = 0; i < a.length; i++) if (a[i].innerText.match(t)) return $(a[i]);
                return 0;
            }
        },
        popMsg: function(e) {
            return $("#msgHolder").html(e).slideDown("fast"), setTimeout(function() {
                $("#msgHolder").slideUp();
            }, 1500);
        }
    }, tableBuilder.init(sample).makeTableTree(), $(".tableAlias").live("change", function() {
        var e = $(this).offsetParent().attr("id").replace(/^tab/gi, "");
        tableBuilder.setAlias(e, $(this).val());
    }), $(".frame2").resizable(), $("button").button(), $(".outer-holder").resizable();
    var t = function() {
        $(".outer-holder").draggable({
            handle: ".holder-header",
            cursor: "move",
            containment: "#designer",
            drag: function() {
                e.apply(this);
            }
        });
    };
    $(".addMe").on("click", function() {
        var e = $(this), i = $(this).next(".tName").text(), n = {
            left: 150 * Math.random(),
            top: 250 * Math.random()
        };
        if (this.checked) {
            var o = tableBuilder.addTableToCont(i, n);
            tableBuilder.tables.add(tableBuilder.raw[i], i, o), t();
            var r = o.find(".closer")[0];
            r.onclick = a.bind(r, [ e[0] ]);
        } else {
            var l = $("#tab" + i);
            tableBuilder.tables.remove(i, l), $.removeData(l[0], "C"), e[0].checked = !1;
        }
    }), $(".container").droppable({
        accept: "li.expandable",
        tolerance: "pointer",
        drop: function(e, a) {
            if (a.draggable.hasClass("outer-holder")) return 0;
            a.draggable.revert = "valid";
            var i = (a.draggable.index(), $(".dragger-helper").text()), n = $(".dragger-helper").position(), o = $("#designer").offset();
            n.top < o.top && (n.top = o.top + 3);
            var r = {
                left: n.left - o.left,
                top: n.top - o.top
            };
            $(".dragger-helper").remove();
            var l = tableBuilder.addTableToCont(i, r);
            tableBuilder.tables.add(tableBuilder.raw[i], i, l), t();
        },
        over: function() {
            $("img", ".dragger-helper").attr("src", "css/images/drop-yes.gif"), $(this).addClass("activateContainer");
        },
        activate: function() {},
        out: function() {
            $(this).removeClass("activateContainer");
        }
    }), $(".closer").live("hover", function() {
        $(this).addClass("hb");
    }, function() {
        $(this).removeClass("hb");
    });
    var a = function() {
        arguments.length > 1 && (arguments[0][0].checked = !1), tableBuilder.tables.remove($(this).parent().text(), $(this).offsetParent()), 
        $.removeData($(this).offsetParent()[0], "C");
    };
    $.fn.applyStyles = function() {
        var e = $(this);
        return e.find("td:even").addClass("tdeven"), e.find("td:odd").css({
            "padding-left": "16px"
        }), e.find("tr:odd").addClass("even"), $(".primaryKey", e).parent().css({
            "font-weight": "bold"
        }), e;
    }, $("#qProps").on("click", function() {
        var e = $("#queryProps"), t = e.find("input");
        t.iCheck({
            radioClass: "iradio_square-blue",
            checkboxClass: "iradio-square-blue"
        }), e.dialog("open");
    }), $("#gridView").droppable({
        drop: function(e, t) {
            grid.add(t.draggable);
        }
    });
    var i = function() {
        $('input[type="radio"], #joinProps').iCheck("destroy"), $(this).dialog("close");
    };
    $("#joinProps").dialog({
        autoOpen: !1,
        width: 460,
        title: "Link Propeties",
        buttons: [ {
            text: "Ok",
            id: "joinPropChange",
            click: function() {
                var e = $.data($(this)[0], "A");
                e.changed && e.orig != e.newJoin && tableBuilder.tables.updateJoin(e.line, joins[e.newJoin], e.from, e.to), 
                i.apply(this);
            }
        }, {
            text: "Cancel",
            click: function() {
                i.apply(this);
            }
        } ]
    }), $("#queryProps").dialog({
        autoOpen: !1,
        title: "Query Properties",
        width: 450,
        height: "auto",
        buttons: [ {
            text: "Ok",
            click: function() {}
        }, {
            text: "Cancel",
            click: function() {
                $(this).dialog("close");
            }
        } ]
    }), grid.utils = {
        aggrlist: function() {
            var e = [], t = "<select class='aggr'><option value='' selected>----------</option>";
            e = this.fnList();
            for (var a = 0; a < e.length; a++) t += "<option value='" + e[a] + "'>" + e[a] + "</option>";
            return t += "</select>";
        },
        fnList: function() {
            return [ "Sum", "Avg", "Min", "Max", "Count", "StDev", "Var", "First", "Last", "Expr" ];
        },
        sortlist: function() {
            var e = "<select class='aggr'><option value=1 selected>Ascending</option>";
            return e += "<option value=0>Descending</option><option value=-1 >None</option></select>";
        },
        actionList: function() {
            var e = "<span class='actionSpan ", t = $("tr", ".gridTable").length;
            return e += 0 == t ? "actionUp-Dis'" : "actionUp'", e += "></span><span class='actionSpan actionDown'></span><span class='actionSpan actionRemove'></span><span class='actionSpan actionExpr'></span>";
        }
    }, grid.AggrChange = function() {
        var e = arguments[0], t = $.data(e[0], "details"), a = this.val(), i = e.children();
        return i[2].innerHTML = "<font color='blue'>" + a + "</font>(" + t.table + "." + t.col + ")";
    }, $(".aggr").live("change", function() {
        grid.AggrChange.apply($(this), [ $(this).closest("tr") ]);
    }), grid.add = function(e) {
        var t = $("<tr class='gridRow'>");
        t.append("<td><input type='checkbox' class='output' checked=true></td>").append("<td>" + this.utils.actionList() + "</td>").append("<td>" + e.data("details").table + "." + e.data("details").col + "</td>").append("<td>" + this.utils.aggrlist(e) + "</td>").append("<td><input class='tableAlias' type='text' value='" + e.data("details").alias + "'></td>").append("<td><input type='checkbox' class='groupCol'></td>").append("<td>" + this.utils.sortlist() + "</td>").appendTo(".gridTable"), 
        $.data(t[0], "details", e.data("details"));
    }, grid.remove = function(e, t) {
        if (t) {
            var a, i = $(".gridRow");
            $.each(i, function(e, i) {
                a = $.data(i, "details"), t == a.table && $(i).remove();
            });
        }
        $(".gridRow:contains(" + e + ")").remove();
    };
    var n = function() {
        var e = $(this).parent().parent();
        this.checked ? grid.add(e) : grid.remove(e.data("details").col);
    };
    $(".selCol").live("click", n), $.data($("#doNewTable")[0], "on", !1);
    var o = function() {
        var e = $.data($(this)[0], "on");
        return 0 == e ? ($(".newTableDef").animate({
            top: "-7px"
        }, 300), $.data($(this)[0], "on", !0), newtableName.focus()) : ($(".newTableDef").animate({
            top: "-300px"
        }, 300), $.data($(this)[0], "on", !1)), 1;
    };
    $("#doNewTable ").on("click", function() {
        o.apply($(this));
    }), $("#createnewTable").button().on("click", function() {
        var e = newtableName.value;
        if (!e) return alert("Please enter a name for the new table"), newTableName.focus(), 
        0;
        if (sample.hasOwnProperty(e)) return alert("A table already exists with the same name!!"), 
        newtableName.focus(), 0;
        tableBuilder.raw[e] = {
            alias: newtableAlias.value || "",
            data: [],
            props: {
                type: "Derived",
                noFallback: newtableFallback.value
            }
        };
        var a = {
            left: 250 * Math.random(),
            top: 300 * Math.random()
        }, i = tableBuilder.addTableToCont(e, a), n = {
            accept: ".rowJoin",
            drop: function(t, a) {
                var n = i.find("table"), o = a.draggable.clone();
                $.data(o[0], "details", a.draggable.data("details")), o.data("details").table = e, 
                n.append(o);
            }
        }, r = $("<div class='NewRowAccept'></div>").html("Drop here").droppable(n);
        i.append(r), o.apply($("#doNewTable")), t();
    }), $("#closeNewTable").on("click", function() {
        o.apply($("#doNewTable"));
    });
});