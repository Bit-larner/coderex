if (function (t) {
        function e(e) {
            var s = ".smartmenus_mouse";
            if (l || e) l && e && (t(document).unbind(s), l = !1); else {
                var d = !0, c = null;
                t(document).bind(r([["mousemove", function (e) {
                    var i = {x: e.pageX, y: e.pageY, timeStamp: (new Date).getTime()};
                    if (c) {
                        var n = Math.abs(c.x - i.x), r = Math.abs(c.y - i.y);
                        if ((n > 0 || r > 0) && 2 >= n && 2 >= r && i.timeStamp - c.timeStamp <= 300 && (o = !0, d)) {
                            var s = t(e.target).closest("a");
                            s.is("a") && t.each(a, function () {
                                return t.contains(this.$root[0], s[0]) ? (this.itemEnter({currentTarget: s[0]}), !1) : void 0
                            }), d = !1
                        }
                    }
                    c = i
                }], [n() ? "touchstart" : "pointerover pointermove pointerout MSPointerOver MSPointerMove MSPointerOut", function (t) {
                    i(t.originalEvent) && (o = !1)
                }]], s)), l = !0
            }
        }

        function i(t) {
            return !/^(4|mouse)$/.test(t.pointerType)
        }

        function n() {
            return "ontouchstart" in window
        }

        function r(e, i) {
            i || (i = "");
            var n = {};
            return t.each(e, function (t, e) {
                n[e[0].split(" ").join(i + " ") + i] = e[1]
            }), n
        }

        var a = [], s = !!window.createPopup, o = !1, l = !1;
        t.SmartMenus = function (e, i) {
            this.$root = t(e), this.opts = i, this.rootId = "", this.accessIdPrefix = "", this.$subArrow = null, this.activatedItems = [], this.visibleSubMenus = [], this.showTimeout = 0, this.hideTimeout = 0, this.scrollTimeout = 0, this.clickActivated = !1, this.focusActivated = !1, this.zIndexInc = 0, this.idInc = 0, this.$firstLink = null, this.$firstSub = null, this.disabled = !1, this.$disableOverlay = null, this.isTouchScrolling = !1, this.wasCollapsible = !1, this.init()
        }, t.extend(t.SmartMenus, {
            hideAll: function () {
                t.each(a, function () {
                    this.menuHideAll()
                })
            }, destroy: function () {
                for (; a.length;) a[0].destroy();
                e(!0)
            }, prototype: {
                init: function (i) {
                    var n = this;
                    if (!i) {
                        a.push(this), this.rootId = ((new Date).getTime() + Math.random() + "").replace(/\D/g, ""), this.accessIdPrefix = "sm-" + this.rootId + "-", this.$root.hasClass("sm-rtl") && (this.opts.rightToLeftSubMenus = !0);
                        var s = ".smartmenus";
                        this.$root.data("smartmenus", this).attr("data-smartmenus-id", this.rootId).dataSM("level", 1).bind(r([["mouseover focusin", t.proxy(this.rootOver, this)], ["mouseout focusout", t.proxy(this.rootOut, this)], ["keydown", t.proxy(this.rootKeyDown, this)]], s)).delegate("a", r([["mouseenter", t.proxy(this.itemEnter, this)], ["mouseleave", t.proxy(this.itemLeave, this)], ["mousedown", t.proxy(this.itemDown, this)], ["focus", t.proxy(this.itemFocus, this)], ["blur", t.proxy(this.itemBlur, this)], ["click", t.proxy(this.itemClick, this)], ["touchend", t.proxy(this.itemTouchEnd, this)]], s)), s += this.rootId, this.opts.hideOnClick && t(document).bind(r([["touchstart", t.proxy(this.docTouchStart, this)], ["touchmove", t.proxy(this.docTouchMove, this)], ["touchend", t.proxy(this.docTouchEnd, this)], ["click", t.proxy(this.docClick, this)]], s)), t(window).bind(r([["resize orientationchange", t.proxy(this.winResize, this)]], s)), this.opts.subIndicators && (this.$subArrow = t("<span/>").addClass("sub-arrow"), this.opts.subIndicatorsText && this.$subArrow.html(this.opts.subIndicatorsText)), e()
                    }
                    if (this.$firstSub = this.$root.find("ul").each(function () {
                            n.menuInit(t(this))
                        }).eq(0), this.$firstLink = this.$root.find("a").eq(0), this.opts.markCurrentItem) {
                        var o = /(index|default)\.[^#\?\/]*/i, l = /#.*/, d = window.location.href.replace(o, ""),
                            c = d.replace(l, "");
                        this.$root.find("a").each(function () {
                            var e = this.href.replace(o, ""), i = t(this);
                            e != d && e != c || (i.addClass("current"), n.opts.markCurrentTree && i.parentsUntil("[data-smartmenus-id]", "ul").each(function () {
                                t(this).dataSM("parent-a").addClass("current")
                            }))
                        })
                    }
                    this.wasCollapsible = this.isCollapsible()
                }, destroy: function (e) {
                    if (!e) {
                        var i = ".smartmenus";
                        this.$root.removeData("smartmenus").removeAttr("data-smartmenus-id").removeDataSM("level").unbind(i).undelegate(i), i += this.rootId, t(document).unbind(i), t(window).unbind(i), this.opts.subIndicators && (this.$subArrow = null)
                    }
                    this.menuHideAll();
                    var n = this;
                    this.$root.find("ul").each(function () {
                        var e = t(this);
                        e.dataSM("scroll-arrows") && e.dataSM("scroll-arrows").remove(), e.dataSM("shown-before") && ((n.opts.subMenusMinWidth || n.opts.subMenusMaxWidth) && e.css({
                            width: "",
                            minWidth: "",
                            maxWidth: ""
                        }).removeClass("sm-nowrap"), e.dataSM("scroll-arrows") && e.dataSM("scroll-arrows").remove(), e.css({
                            zIndex: "",
                            top: "",
                            left: "",
                            marginLeft: "",
                            marginTop: "",
                            display: ""
                        })), 0 == e.attr("id").indexOf(n.accessIdPrefix) && e.removeAttr("id")
                    }).removeDataSM("in-mega").removeDataSM("shown-before").removeDataSM("ie-shim").removeDataSM("scroll-arrows").removeDataSM("parent-a").removeDataSM("level").removeDataSM("beforefirstshowfired").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeAttr("aria-expanded"), this.$root.find("a.has-submenu").each(function () {
                        var e = t(this);
                        0 == e.attr("id").indexOf(n.accessIdPrefix) && e.removeAttr("id")
                    }).removeClass("has-submenu").removeDataSM("sub").removeAttr("aria-haspopup").removeAttr("aria-controls").removeAttr("aria-expanded").closest("li").removeDataSM("sub"), this.opts.subIndicators && this.$root.find("span.sub-arrow").remove(), this.opts.markCurrentItem && this.$root.find("a.current").removeClass("current"), e || (this.$root = null, this.$firstLink = null, this.$firstSub = null, this.$disableOverlay && (this.$disableOverlay.remove(), this.$disableOverlay = null), a.splice(t.inArray(this, a), 1))
                }, disable: function (e) {
                    if (!this.disabled) {
                        if (this.menuHideAll(), !e && !this.opts.isPopup && this.$root.is(":visible")) {
                            var i = this.$root.offset();
                            this.$disableOverlay = t('<div class="sm-jquery-disable-overlay"/>').css({
                                position: "absolute",
                                top: i.top,
                                left: i.left,
                                width: this.$root.outerWidth(),
                                height: this.$root.outerHeight(),
                                zIndex: this.getStartZIndex(!0),
                                opacity: 0
                            }).appendTo(document.body)
                        }
                        this.disabled = !0
                    }
                }, docClick: function (e) {
                    return this.isTouchScrolling ? void(this.isTouchScrolling = !1) : void((this.visibleSubMenus.length && !t.contains(this.$root[0], e.target) || t(e.target).is("a")) && this.menuHideAll())
                }, docTouchEnd: function (e) {
                    if (this.lastTouch) {
                        if (this.visibleSubMenus.length && (void 0 === this.lastTouch.x2 || this.lastTouch.x1 == this.lastTouch.x2) && (void 0 === this.lastTouch.y2 || this.lastTouch.y1 == this.lastTouch.y2) && (!this.lastTouch.target || !t.contains(this.$root[0], this.lastTouch.target))) {
                            this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0);
                            var i = this;
                            this.hideTimeout = setTimeout(function () {
                                i.menuHideAll()
                            }, 350)
                        }
                        this.lastTouch = null
                    }
                }, docTouchMove: function (t) {
                    if (this.lastTouch) {
                        var e = t.originalEvent.touches[0];
                        this.lastTouch.x2 = e.pageX, this.lastTouch.y2 = e.pageY
                    }
                }, docTouchStart: function (t) {
                    var e = t.originalEvent.touches[0];
                    this.lastTouch = {x1: e.pageX, y1: e.pageY, target: e.target}
                }, enable: function () {
                    this.disabled && (this.$disableOverlay && (this.$disableOverlay.remove(), this.$disableOverlay = null), this.disabled = !1)
                }, getClosestMenu: function (e) {
                    for (var i = t(e).closest("ul"); i.dataSM("in-mega");) i = i.parent().closest("ul");
                    return i[0] || null
                }, getHeight: function (t) {
                    return this.getOffset(t, !0)
                }, getOffset: function (t, e) {
                    var i;
                    "none" == t.css("display") && (i = {
                        position: t[0].style.position,
                        visibility: t[0].style.visibility
                    }, t.css({position: "absolute", visibility: "hidden"}).show());
                    var n = t[0].getBoundingClientRect && t[0].getBoundingClientRect(),
                        r = n && (e ? n.height || n.bottom - n.top : n.width || n.right - n.left);
                    return r || 0 === r || (r = e ? t[0].offsetHeight : t[0].offsetWidth), i && t.hide().css(i), r
                }, getStartZIndex: function (t) {
                    var e = parseInt(this[t ? "$root" : "$firstSub"].css("z-index"));
                    return !t && isNaN(e) && (e = parseInt(this.$root.css("z-index"))), isNaN(e) ? 1 : e
                }, getTouchPoint: function (t) {
                    return t.touches && t.touches[0] || t.changedTouches && t.changedTouches[0] || t
                }, getViewport: function (t) {
                    var e = t ? "Height" : "Width", i = document.documentElement["client" + e], n = window["inner" + e];
                    return n && (i = Math.min(i, n)), i
                }, getViewportHeight: function () {
                    return this.getViewport(!0)
                }, getViewportWidth: function () {
                    return this.getViewport()
                }, getWidth: function (t) {
                    return this.getOffset(t)
                }, handleEvents: function () {
                    return !this.disabled && this.isCSSOn()
                }, handleItemEvents: function (t) {
                    return this.handleEvents() && !this.isLinkInMegaMenu(t)
                }, isCollapsible: function () {
                    return "static" == this.$firstSub.css("position")
                }, isCSSOn: function () {
                    return "block" == this.$firstLink.css("display")
                }, isFixed: function () {
                    var e = "fixed" == this.$root.css("position");
                    return e || this.$root.parentsUntil("body").each(function () {
                        return "fixed" == t(this).css("position") ? (e = !0, !1) : void 0
                    }), e
                }, isLinkInMegaMenu: function (e) {
                    return t(this.getClosestMenu(e[0])).hasClass("mega-menu")
                }, isTouchMode: function () {
                    return !o || this.isCollapsible()
                }, itemActivate: function (e, i) {
                    var n = e.closest("ul"), r = n.dataSM("level");
                    if (r > 1 && (!this.activatedItems[r - 2] || this.activatedItems[r - 2][0] != n.dataSM("parent-a")[0])) {
                        var a = this;
                        t(n.parentsUntil("[data-smartmenus-id]", "ul").get().reverse()).add(n).each(function () {
                            a.itemActivate(t(this).dataSM("parent-a"))
                        })
                    }
                    if (this.isCollapsible() && !i || this.menuHideSubMenus(this.activatedItems[r - 1] && this.activatedItems[r - 1][0] == e[0] ? r : r - 1), this.activatedItems[r - 1] = e, this.$root.triggerHandler("activate.smapi", e[0]) !== !1) {
                        var s = e.dataSM("sub");
                        s && (this.isTouchMode() || !this.opts.showOnClick || this.clickActivated) && this.menuShow(s)
                    }
                }, itemBlur: function (e) {
                    var i = t(e.currentTarget);
                    this.handleItemEvents(i) && this.$root.triggerHandler("blur.smapi", i[0])
                }, itemClick: function (e) {
                    if (this.isTouchScrolling) return this.isTouchScrolling = !1, e.stopPropagation(), !1;
                    var i = t(e.currentTarget);
                    if (this.handleItemEvents(i)) {
                        if (this.$root.triggerHandler("click.smapi", i[0]) === !1) return !1;
                        i.dataSM("href") && i.attr("href", i.dataSM("href")).removeDataSM("href");
                        var n = t(e.target).is("span.sub-arrow"), r = i.dataSM("sub");
                        if (r && !r.is(":visible")) {
                            if (this.itemActivate(i), r.is(":visible")) return this.focusActivated = !0, !1
                        } else if (this.isCollapsible() && n) return this.itemActivate(i), this.menuHide(r), !1;
                        return this.opts.showOnClick && r && 2 == r.dataSM("level") ? (this.clickActivated = !0, this.menuShow(r), !1) : i.hasClass("disabled") ? !1 : this.$root.triggerHandler("select.smapi", i[0]) === !1 ? !1 : void 0
                    }
                }, itemDown: function (e) {
                    var i = t(e.currentTarget);
                    this.handleItemEvents(i) && i.dataSM("mousedown", !0)
                }, itemEnter: function (e) {
                    var i = t(e.currentTarget);
                    if (this.handleItemEvents(i)) {
                        if (!this.isTouchMode()) {
                            this.showTimeout && (clearTimeout(this.showTimeout), this.showTimeout = 0);
                            var n = this;
                            this.showTimeout = setTimeout(function () {
                                n.itemActivate(i)
                            }, this.opts.showOnClick && 1 == i.closest("ul").dataSM("level") ? 1 : this.opts.showTimeout)
                        }
                        this.$root.triggerHandler("mouseenter.smapi", i[0])
                    }
                }, itemFocus: function (e) {
                    var i = t(e.currentTarget);
                    this.handleItemEvents(i) && (!this.focusActivated || this.isTouchMode() && i.dataSM("mousedown") || this.activatedItems.length && this.activatedItems[this.activatedItems.length - 1][0] == i[0] || this.itemActivate(i, !0), this.$root.triggerHandler("focus.smapi", i[0]))
                }, itemLeave: function (e) {
                    var i = t(e.currentTarget);
                    this.handleItemEvents(i) && (this.isTouchMode() || this.showTimeout && (clearTimeout(this.showTimeout), this.showTimeout = 0), i.removeDataSM("mousedown"), this.$root.triggerHandler("mouseleave.smapi", i[0]))
                }, itemTouchEnd: function (e) {
                    var i = t(e.currentTarget);
                    if (this.handleItemEvents(i)) {
                        var n = i.dataSM("sub");
                        "#" !== i.attr("href").charAt(0) && n && !n.is(":visible") && i.dataSM("href", i.attr("href")).attr("href", "#")
                    }
                }, menuHide: function (e) {
                    if (this.$root.triggerHandler("beforehide.smapi", e[0]) !== !1 && (e.stop(!0, !0), "none" != e.css("display"))) {
                        var i = function () {
                            e.css("z-index", "")
                        };
                        this.isCollapsible() ? this.opts.collapsibleHideFunction ? this.opts.collapsibleHideFunction.call(this, e, i) : e.hide(this.opts.collapsibleHideDuration, i) : this.opts.hideFunction ? this.opts.hideFunction.call(this, e, i) : e.hide(this.opts.hideDuration, i), e.dataSM("ie-shim") && e.dataSM("ie-shim").remove(), e.dataSM("scroll") && (this.menuScrollStop(e), e.css({
                            "touch-action": "",
                            "-ms-touch-action": ""
                        }).unbind(".smartmenus_scroll").removeDataSM("scroll").dataSM("scroll-arrows").hide()), e.dataSM("parent-a").removeClass("highlighted").attr("aria-expanded", "false"), e.attr({
                            "aria-expanded": "false",
                            "aria-hidden": "true"
                        });
                        var n = e.dataSM("level");
                        this.activatedItems.splice(n - 1, 1), this.visibleSubMenus.splice(t.inArray(e, this.visibleSubMenus), 1), this.$root.triggerHandler("hide.smapi", e[0])
                    }
                }, menuHideAll: function () {
                    this.showTimeout && (clearTimeout(this.showTimeout), this.showTimeout = 0);
                    for (var t = this.opts.isPopup ? 1 : 0, e = this.visibleSubMenus.length - 1; e >= t; e--) this.menuHide(this.visibleSubMenus[e]);
                    this.opts.isPopup && (this.$root.stop(!0, !0), this.$root.is(":visible") && (this.opts.hideFunction ? this.opts.hideFunction.call(this, this.$root) : this.$root.hide(this.opts.hideDuration), this.$root.dataSM("ie-shim") && this.$root.dataSM("ie-shim").remove())), this.activatedItems = [], this.visibleSubMenus = [], this.clickActivated = !1, this.focusActivated = !1, this.zIndexInc = 0
                }, menuHideSubMenus: function (t) {
                    for (var e = this.activatedItems.length - 1; e >= t; e--) {
                        var i = this.activatedItems[e].dataSM("sub");
                        i && this.menuHide(i)
                    }
                }, menuIframeShim: function (e) {
                    s && this.opts.overlapControlsInIE && !e.dataSM("ie-shim") && e.dataSM("ie-shim", t("<iframe/>").attr({
                        src: "javascript:0",
                        tabindex: -9
                    }).css({position: "absolute", top: "auto", left: "0", opacity: 0, border: "0"}))
                }, menuInit: function (t) {
                    if (!t.dataSM("in-mega")) {
                        t.hasClass("mega-menu") && t.find("ul").dataSM("in-mega", !0);
                        for (var e = 2, i = t[0]; (i = i.parentNode.parentNode) != this.$root[0];) e++;
                        var n = t.prevAll("a").eq(-1);
                        n.length || (n = t.prevAll().find("a").eq(-1)), n.addClass("has-submenu").dataSM("sub", t), t.dataSM("parent-a", n).dataSM("level", e).parent().dataSM("sub", t);
                        var r = n.attr("id") || this.accessIdPrefix + ++this.idInc,
                            a = t.attr("id") || this.accessIdPrefix + ++this.idInc;
                        n.attr({id: r, "aria-haspopup": "true", "aria-controls": a, "aria-expanded": "false"}), t.attr({
                            id: a,
                            role: "group",
                            "aria-hidden": "true",
                            "aria-labelledby": r,
                            "aria-expanded": "false"
                        }), this.opts.subIndicators && n[this.opts.subIndicatorsPos](this.$subArrow.clone())
                    }
                }, menuPosition: function (e) {
                    var i, a, s = e.dataSM("parent-a"), o = s.closest("li"), l = o.parent(), d = e.dataSM("level"),
                        c = this.getWidth(e), u = this.getHeight(e), h = s.offset(), p = h.left, f = h.top,
                        m = this.getWidth(s), g = this.getHeight(s), v = t(window), b = v.scrollLeft(),
                        y = v.scrollTop(), w = this.getViewportWidth(), S = this.getViewportHeight(),
                        _ = l.hasClass("sm") && !l.hasClass("sm-vertical"),
                        x = this.opts.rightToLeftSubMenus && !o.is("[data-sm-reverse]") || !this.opts.rightToLeftSubMenus && o.is("[data-sm-reverse]"),
                        D = 2 == d ? this.opts.mainMenuSubOffsetX : this.opts.subMenusSubOffsetX,
                        T = 2 == d ? this.opts.mainMenuSubOffsetY : this.opts.subMenusSubOffsetY;
                    if (_ ? (i = x ? m - c - D : D, a = this.opts.bottomToTopSubMenus ? -u - T : g + T) : (i = x ? D - c : m - D, a = this.opts.bottomToTopSubMenus ? g - T - u : T), this.opts.keepInViewport) {
                        var C = p + i, A = f + a;
                        if (x && b > C ? i = _ ? b - C + i : m - D : !x && C + c > b + w && (i = _ ? b + w - c - C + i : D - c), _ || (S > u && A + u > y + S ? a += y + S - u - A : (u >= S || y > A) && (a += y - A)), _ && (A + u > y + S + .49 || y > A) || !_ && u > S + .49) {
                            var k = this;
                            e.dataSM("scroll-arrows") || e.dataSM("scroll-arrows", t([t('<span class="scroll-up"><span class="scroll-up-arrow"></span></span>')[0], t('<span class="scroll-down"><span class="scroll-down-arrow"></span></span>')[0]]).bind({
                                mouseenter: function () {
                                    e.dataSM("scroll").up = t(this).hasClass("scroll-up"), k.menuScroll(e)
                                }, mouseleave: function (t) {
                                    k.menuScrollStop(e), k.menuScrollOut(e, t)
                                }, "mousewheel DOMMouseScroll": function (t) {
                                    t.preventDefault()
                                }
                            }).insertAfter(e));
                            var I = ".smartmenus_scroll";
                            e.dataSM("scroll", {
                                step: 1,
                                itemH: g,
                                subH: u,
                                arrowDownH: this.getHeight(e.dataSM("scroll-arrows").eq(1))
                            }).bind(r([["mouseover", function (t) {
                                k.menuScrollOver(e, t)
                            }], ["mouseout", function (t) {
                                k.menuScrollOut(e, t)
                            }], ["mousewheel DOMMouseScroll", function (t) {
                                k.menuScrollMousewheel(e, t)
                            }]], I)).dataSM("scroll-arrows").css({
                                top: "auto",
                                left: "0",
                                marginLeft: i + (parseInt(e.css("border-left-width")) || 0),
                                width: c - (parseInt(e.css("border-left-width")) || 0) - (parseInt(e.css("border-right-width")) || 0),
                                zIndex: e.css("z-index")
                            }).eq(_ && this.opts.bottomToTopSubMenus ? 0 : 1).show(), this.isFixed() && e.css({
                                "touch-action": "none",
                                "-ms-touch-action": "none"
                            }).bind(r([[n() ? "touchstart touchmove touchend" : "pointerdown pointermove pointerup MSPointerDown MSPointerMove MSPointerUp", function (t) {
                                k.menuScrollTouch(e, t)
                            }]], I))
                        }
                    }
                    e.css({
                        top: "auto",
                        left: "0",
                        marginLeft: i,
                        marginTop: a - g
                    }), this.menuIframeShim(e), e.dataSM("ie-shim") && e.dataSM("ie-shim").css({
                        zIndex: e.css("z-index"),
                        width: c,
                        height: u,
                        marginLeft: i,
                        marginTop: a - g
                    })
                }, menuScroll: function (t, e, i) {
                    var n, r = t.dataSM("scroll"), a = t.dataSM("scroll-arrows"), s = parseFloat(t.css("margin-top")),
                        l = r.up ? r.upEnd : r.downEnd;
                    if (!e && r.velocity) {
                        if (r.velocity *= .9, n = r.velocity, .5 > n) return void this.menuScrollStop(t)
                    } else n = i || (e || !this.opts.scrollAccelerate ? this.opts.scrollStep : Math.floor(r.step));
                    var d = t.dataSM("level");
                    this.activatedItems[d - 1] && this.activatedItems[d - 1].dataSM("sub") && this.activatedItems[d - 1].dataSM("sub").is(":visible") && this.menuHideSubMenus(d - 1);
                    var c = r.up && s >= l || !r.up && l >= s ? s : Math.abs(l - s) > n ? s + (r.up ? n : -n) : l;
                    if (t.add(t.dataSM("ie-shim")).css("margin-top", c), o && (r.up && c > r.downEnd || !r.up && c < r.upEnd) && a.eq(r.up ? 1 : 0).show(), c == l) o && a.eq(r.up ? 0 : 1).hide(), this.menuScrollStop(t); else if (!e) {
                        this.opts.scrollAccelerate && r.step < this.opts.scrollStep && (r.step += .5);
                        var u = this;
                        this.scrollTimeout = setTimeout(function () {
                            u.menuScroll(t)
                        }, this.opts.scrollInterval)
                    }
                }, menuScrollMousewheel: function (t, e) {
                    if (this.getClosestMenu(e.target) == t[0]) {
                        e = e.originalEvent;
                        var i = (e.wheelDelta || -e.detail) > 0;
                        t.dataSM("scroll-arrows").eq(i ? 0 : 1).is(":visible") && (t.dataSM("scroll").up = i, this.menuScroll(t, !0))
                    }
                    e.preventDefault()
                }, menuScrollOut: function (e, i) {
                    o && (/^scroll-(up|down)/.test((i.relatedTarget || "").className) || (e[0] == i.relatedTarget || t.contains(e[0], i.relatedTarget)) && this.getClosestMenu(i.relatedTarget) == e[0] || e.dataSM("scroll-arrows").css("visibility", "hidden"))
                }, menuScrollOver: function (t, e) {
                    if (o && !/^scroll-(up|down)/.test(e.target.className) && this.getClosestMenu(e.target) == t[0]) {
                        this.menuScrollRefreshData(t);
                        var i = t.dataSM("scroll");
                        t.dataSM("scroll-arrows").eq(0).css("margin-top", i.upEnd).end().eq(1).css("margin-top", i.downEnd + i.subH - i.arrowDownH).end().css("visibility", "visible")
                    }
                }, menuScrollRefreshData: function (e) {
                    var i = e.dataSM("scroll"), n = t(window),
                        r = n.scrollTop() - e.dataSM("parent-a").offset().top - i.itemH;
                    t.extend(i, {upEnd: r, downEnd: r + this.getViewportHeight() - i.subH})
                }, menuScrollStop: function (e) {
                    return this.scrollTimeout ? (clearTimeout(this.scrollTimeout), this.scrollTimeout = 0, t.extend(e.dataSM("scroll"), {
                        step: 1,
                        velocity: 0
                    }), !0) : void 0
                }, menuScrollTouch: function (e, n) {
                    if (n = n.originalEvent, i(n)) {
                        var r = this.getTouchPoint(n);
                        if (this.getClosestMenu(r.target) == e[0]) {
                            var a = e.dataSM("scroll");
                            if (/(start|down)$/i.test(n.type)) this.menuScrollStop(e) ? (n.preventDefault(), this.isTouchScrolling = !0) : this.isTouchScrolling = !1, this.menuScrollRefreshData(e), t.extend(a, {
                                touchY: r.pageY,
                                touchTimestamp: n.timeStamp,
                                velocity: 0
                            }); else if (/move$/i.test(n.type)) {
                                var s = a.touchY;
                                void 0 !== s && s != r.pageY && (this.isTouchScrolling = !0, t.extend(a, {
                                    up: s < r.pageY,
                                    touchY: r.pageY,
                                    touchTimestamp: n.timeStamp,
                                    velocity: a.velocity + .5 * Math.abs(r.pageY - s)
                                }), this.menuScroll(e, !0, Math.abs(a.touchY - s))), n.preventDefault()
                            } else void 0 !== a.touchY && (n.timeStamp - a.touchTimestamp < 120 && a.velocity > 0 && (a.velocity *= .5, this.menuScrollStop(e), this.menuScroll(e), n.preventDefault()), delete a.touchY)
                        }
                    }
                }, menuShow: function (t) {
                    if ((t.dataSM("beforefirstshowfired") || (t.dataSM("beforefirstshowfired", !0), this.$root.triggerHandler("beforefirstshow.smapi", t[0]) !== !1)) && this.$root.triggerHandler("beforeshow.smapi", t[0]) !== !1 && (t.dataSM("shown-before", !0).stop(!0, !0), !t.is(":visible"))) {
                        var e = t.dataSM("parent-a");
                        if ((this.opts.keepHighlighted || this.isCollapsible()) && e.addClass("highlighted"), this.isCollapsible()) t.removeClass("sm-nowrap").css({
                            zIndex: "",
                            width: "auto",
                            minWidth: "",
                            maxWidth: "",
                            top: "",
                            left: "",
                            marginLeft: "",
                            marginTop: ""
                        }); else {
                            if (t.css("z-index", this.zIndexInc = (this.zIndexInc || this.getStartZIndex()) + 1), (this.opts.subMenusMinWidth || this.opts.subMenusMaxWidth) && (t.css({
                                    width: "auto",
                                    minWidth: "",
                                    maxWidth: ""
                                }).addClass("sm-nowrap"), this.opts.subMenusMinWidth && t.css("min-width", this.opts.subMenusMinWidth), this.opts.subMenusMaxWidth)) {
                                var i = this.getWidth(t);
                                t.css("max-width", this.opts.subMenusMaxWidth), i > this.getWidth(t) && t.removeClass("sm-nowrap").css("width", this.opts.subMenusMaxWidth)
                            }
                            this.menuPosition(t), t.dataSM("ie-shim") && t.dataSM("ie-shim").insertBefore(t)
                        }
                        var n = function () {
                            t.css("overflow", "")
                        };
                        this.isCollapsible() ? this.opts.collapsibleShowFunction ? this.opts.collapsibleShowFunction.call(this, t, n) : t.show(this.opts.collapsibleShowDuration, n) : this.opts.showFunction ? this.opts.showFunction.call(this, t, n) : t.show(this.opts.showDuration, n), e.attr("aria-expanded", "true"), t.attr({
                            "aria-expanded": "true",
                            "aria-hidden": "false"
                        }), this.visibleSubMenus.push(t), this.$root.triggerHandler("show.smapi", t[0])
                    }
                }, popupHide: function (t) {
                    this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0);
                    var e = this;
                    this.hideTimeout = setTimeout(function () {
                        e.menuHideAll()
                    }, t ? 1 : this.opts.hideTimeout)
                }, popupShow: function (t, e) {
                    if (!this.opts.isPopup) return void alert('SmartMenus jQuery Error:\n\nIf you want to show this menu via the "popupShow" method, set the isPopup:true option.');
                    if (this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0), this.$root.dataSM("shown-before", !0).stop(!0, !0), !this.$root.is(":visible")) {
                        this.$root.css({
                            left: t,
                            top: e
                        }), this.menuIframeShim(this.$root), this.$root.dataSM("ie-shim") && this.$root.dataSM("ie-shim").css({
                            zIndex: this.$root.css("z-index"),
                            width: this.getWidth(this.$root),
                            height: this.getHeight(this.$root),
                            left: t,
                            top: e
                        }).insertBefore(this.$root);
                        var i = this, n = function () {
                            i.$root.css("overflow", "")
                        };
                        this.opts.showFunction ? this.opts.showFunction.call(this, this.$root, n) : this.$root.show(this.opts.showDuration, n), this.visibleSubMenus[0] = this.$root
                    }
                }, refresh: function () {
                    this.destroy(!0), this.init(!0)
                }, rootKeyDown: function (e) {
                    if (this.handleEvents()) switch (e.keyCode) {
                        case 27:
                            var i = this.activatedItems[0];
                            if (i) {
                                this.menuHideAll(), i[0].focus();
                                var n = i.dataSM("sub");
                                n && this.menuHide(n)
                            }
                            break;
                        case 32:
                            var r = t(e.target);
                            if (r.is("a") && this.handleItemEvents(r)) {
                                var n = r.dataSM("sub");
                                n && !n.is(":visible") && (this.itemClick({currentTarget: e.target}), e.preventDefault())
                            }
                    }
                }, rootOut: function (t) {
                    if (this.handleEvents() && !this.isTouchMode() && t.target != this.$root[0] && (this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0), !this.opts.showOnClick || !this.opts.hideOnClick)) {
                        var e = this;
                        this.hideTimeout = setTimeout(function () {
                            e.menuHideAll()
                        }, this.opts.hideTimeout)
                    }
                }, rootOver: function (t) {
                    this.handleEvents() && !this.isTouchMode() && t.target != this.$root[0] && this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0)
                }, winResize: function (t) {
                    if (this.handleEvents()) {
                        if (!("onorientationchange" in window) || "orientationchange" == t.type) {
                            var e = this.isCollapsible();
                            this.wasCollapsible && e || (this.activatedItems.length && this.activatedItems[this.activatedItems.length - 1][0].blur(), this.menuHideAll()), this.wasCollapsible = e
                        }
                    } else if (this.$disableOverlay) {
                        var i = this.$root.offset();
                        this.$disableOverlay.css({
                            top: i.top,
                            left: i.left,
                            width: this.$root.outerWidth(),
                            height: this.$root.outerHeight()
                        })
                    }
                }
            }
        }), t.fn.dataSM = function (t, e) {
            return e ? this.data(t + "_smartmenus", e) : this.data(t + "_smartmenus")
        }, t.fn.removeDataSM = function (t) {
            return this.removeData(t + "_smartmenus")
        }, t.fn.smartmenus = function (e) {
            if ("string" == typeof e) {
                var i = arguments, n = e;
                return Array.prototype.shift.call(i), this.each(function () {
                    var e = t(this).data("smartmenus");
                    e && e[n] && e[n].apply(e, i)
                })
            }
            var r = t.extend({}, t.fn.smartmenus.defaults, e);
            return this.each(function () {
                new t.SmartMenus(this, r)
            })
        }, t.fn.smartmenus.defaults = {
            isPopup: !1,
            mainMenuSubOffsetX: 0,
            mainMenuSubOffsetY: 0,
            subMenusSubOffsetX: 0,
            subMenusSubOffsetY: 0,
            subMenusMinWidth: "10em",
            subMenusMaxWidth: "20em",
            subIndicators: !0,
            subIndicatorsPos: "prepend",
            subIndicatorsText: "+",
            scrollStep: 30,
            scrollInterval: 30,
            scrollAccelerate: !0,
            showTimeout: 250,
            hideTimeout: 500,
            showDuration: 0,
            showFunction: null,
            hideDuration: 0,
            hideFunction: function (t, e) {
                t.fadeOut(200, e)
            },
            collapsibleShowDuration: 0,
            collapsibleShowFunction: function (t, e) {
                t.slideDown(200, e)
            },
            collapsibleHideDuration: 0,
            collapsibleHideFunction: function (t, e) {
                t.slideUp(200, e)
            },
            showOnClick: !1,
            hideOnClick: !0,
            keepInViewport: !0,
            keepHighlighted: !0,
            markCurrentItem: !1,
            markCurrentTree: !0,
            rightToLeftSubMenus: !1,
            bottomToTopSubMenus: !1,
            overlapControlsInIE: !0
        }
    }(jQuery), function (t) {
        t(function () {
            var e = t("ul.navbar-nav:not([data-sm-skip])");
            e.each(function () {
                function e() {
                    var t = n.getViewportWidth();
                    t != r && (n.isCollapsible() ? (i.addClass("sm-collapsible"), i.is("[data-sm-skip-collapsible-behavior]") || a.addClass("navbar-toggle sub-arrow")) : (i.removeClass("sm-collapsible"), i.is("[data-sm-skip-collapsible-behavior]") || a.removeClass("navbar-toggle sub-arrow")), r = t)
                }

                var i = t(this);
                i.addClass("sm").smartmenus({
                    subMenusSubOffsetX: 2,
                    subMenusSubOffsetY: -6,
                    subIndicators: !1,
                    collapsibleShowFunction: null,
                    collapsibleHideFunction: null,
                    rightToLeftSubMenus: i.hasClass("navbar-right"),
                    bottomToTopSubMenus: i.closest(".navbar").hasClass("navbar-fixed-bottom")
                }).bind({
                    "show.smapi": function (e, i) {
                        var n = t(i), r = n.dataSM("scroll-arrows");
                        r && r.css("background-color", t(document.body).css("background-color")), n.parent().addClass("open")
                    }, "hide.smapi": function (e, i) {
                        t(i).parent().removeClass("open")
                    }
                }).find("a.current").parent().addClass("active");
                var n = i.data("smartmenus");
                i.is("[data-sm-skip-collapsible-behavior]") && i.bind({
                    "click.smapi": function (e, i) {
                        if (n.isCollapsible()) {
                            var r = t(i), a = r.parent().dataSM("sub");
                            if (a && a.dataSM("shown-before") && a.is(":visible")) return n.itemActivate(r), n.menuHide(a), !1
                        }
                    }
                });
                var r, a = i.find(".caret");
                e(), t(window).bind("resize.smartmenus" + n.rootId, e)
            })
        }), t.SmartMenus.prototype.isCollapsible = function () {
            return "left" != this.$firstLink.parent().css("float")
        }
    }(jQuery), function (t, e) {
        "function" == typeof define && define.amd ? define(["jquery"], function (t) {
            return e(t)
        }) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
    }(this, function (t) {
        !function (t) {
            "use strict";

            function e(e) {
                var i = [{re: /[\xC0-\xC6]/g, ch: "A"}, {re: /[\xE0-\xE6]/g, ch: "a"}, {
                    re: /[\xC8-\xCB]/g,
                    ch: "E"
                }, {re: /[\xE8-\xEB]/g, ch: "e"}, {re: /[\xCC-\xCF]/g, ch: "I"}, {
                    re: /[\xEC-\xEF]/g,
                    ch: "i"
                }, {re: /[\xD2-\xD6]/g, ch: "O"}, {re: /[\xF2-\xF6]/g, ch: "o"}, {
                    re: /[\xD9-\xDC]/g,
                    ch: "U"
                }, {re: /[\xF9-\xFC]/g, ch: "u"}, {re: /[\xC7-\xE7]/g, ch: "c"}, {
                    re: /[\xD1]/g,
                    ch: "N"
                }, {re: /[\xF1]/g, ch: "n"}];
                return t.each(i, function () {
                    e = e.replace(this.re, this.ch)
                }), e
            }

            function i(t) {
                var e = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;"},
                    i = "(?:" + Object.keys(e).join("|") + ")", n = new RegExp(i), r = new RegExp(i, "g"),
                    a = null == t ? "" : "" + t;
                return n.test(a) ? a.replace(r, function (t) {
                    return e[t]
                }) : a
            }

            function n(e, i) {
                var n = arguments, a = e, s = i;
                [].shift.apply(n);
                var o, l = this.each(function () {
                    var e = t(this);
                    if (e.is("select")) {
                        var i = e.data("selectpicker"), l = "object" == typeof a && a;
                        if (i) {
                            if (l) for (var d in l) l.hasOwnProperty(d) && (i.options[d] = l[d])
                        } else {
                            var c = t.extend({}, r.DEFAULTS, t.fn.selectpicker.defaults || {}, e.data(), l);
                            c.template = t.extend({}, r.DEFAULTS.template, t.fn.selectpicker.defaults ? t.fn.selectpicker.defaults.template : {}, e.data().template, l.template), e.data("selectpicker", i = new r(this, c, s))
                        }
                        "string" == typeof a && (o = i[a] instanceof Function ? i[a].apply(i, n) : i.options[a])
                    }
                });
                return "undefined" != typeof o ? o : l
            }

            String.prototype.includes || !function () {
                var t = {}.toString, e = function () {
                    try {
                        var t = {}, e = Object.defineProperty, i = e(t, t, t) && e
                    } catch (n) {
                    }
                    return i
                }(), i = "".indexOf, n = function (e) {
                    if (null == this) throw new TypeError;
                    var n = String(this);
                    if (e && "[object RegExp]" == t.call(e)) throw new TypeError;
                    var r = n.length, a = String(e), s = a.length, o = arguments.length > 1 ? arguments[1] : void 0,
                        l = o ? Number(o) : 0;
                    l != l && (l = 0);
                    var d = Math.min(Math.max(l, 0), r);
                    return s + d > r ? !1 : -1 != i.call(n, a, l)
                };
                e ? e(String.prototype, "includes", {
                    value: n,
                    configurable: !0,
                    writable: !0
                }) : String.prototype.includes = n
            }(), String.prototype.startsWith || !function () {
                var t = function () {
                    try {
                        var t = {}, e = Object.defineProperty, i = e(t, t, t) && e
                    } catch (n) {
                    }
                    return i
                }(), e = {}.toString, i = function (t) {
                    if (null == this) throw new TypeError;
                    var i = String(this);
                    if (t && "[object RegExp]" == e.call(t)) throw new TypeError;
                    var n = i.length, r = String(t), a = r.length, s = arguments.length > 1 ? arguments[1] : void 0,
                        o = s ? Number(s) : 0;
                    o != o && (o = 0);
                    var l = Math.min(Math.max(o, 0), n);
                    if (a + l > n) return !1;
                    for (var d = -1; ++d < a;) if (i.charCodeAt(l + d) != r.charCodeAt(d)) return !1;
                    return !0
                };
                t ? t(String.prototype, "startsWith", {
                    value: i,
                    configurable: !0,
                    writable: !0
                }) : String.prototype.startsWith = i
            }(), Object.keys || (Object.keys = function (t, e, i) {
                i = [];
                for (e in t) i.hasOwnProperty.call(t, e) && i.push(e);
                return i
            }), t.fn.triggerNative = function (t) {
                var e, i = this[0];
                i.dispatchEvent ? ("function" == typeof Event ? e = new Event(t, {bubbles: !0}) : (e = document.createEvent("Event"), e.initEvent(t, !0, !1)), i.dispatchEvent(e)) : (i.fireEvent && (e = document.createEventObject(), e.eventType = t, i.fireEvent("on" + t, e)), this.trigger(t))
            }, t.expr[":"].icontains = function (e, i, n) {
                var r = t(e), a = (r.data("tokens") || r.text()).toUpperCase();
                return a.includes(n[3].toUpperCase())
            }, t.expr[":"].ibegins = function (e, i, n) {
                var r = t(e), a = (r.data("tokens") || r.text()).toUpperCase();
                return a.startsWith(n[3].toUpperCase())
            }, t.expr[":"].aicontains = function (e, i, n) {
                var r = t(e), a = (r.data("tokens") || r.data("normalizedText") || r.text()).toUpperCase();
                return a.includes(n[3].toUpperCase())
            }, t.expr[":"].aibegins = function (e, i, n) {
                var r = t(e), a = (r.data("tokens") || r.data("normalizedText") || r.text()).toUpperCase();
                return a.startsWith(n[3].toUpperCase())
            };
            var r = function (e, i, n) {
                n && (n.stopPropagation(), n.preventDefault()), this.$element = t(e), this.$newElement = null, this.$button = null, this.$menu = null, this.$lis = null, this.options = i, null === this.options.title && (this.options.title = this.$element.attr("title")), this.val = r.prototype.val, this.render = r.prototype.render, this.refresh = r.prototype.refresh, this.setStyle = r.prototype.setStyle, this.selectAll = r.prototype.selectAll, this.deselectAll = r.prototype.deselectAll, this.destroy = r.prototype.destroy, this.remove = r.prototype.remove, this.show = r.prototype.show, this.hide = r.prototype.hide, this.init()
            };
            r.VERSION = "1.7.7", r.DEFAULTS = {
                noneSelectedText: "Nothing selected",
                noneResultsText: "No results matched {0}",
                countSelectedText: function (t, e) {
                    return 1 == t ? "{0} item selected" : "{0} items selected"
                },
                maxOptionsText: function (t, e) {
                    return [1 == t ? "Limit reached ({n} item max)" : "Limit reached ({n} items max)", 1 == e ? "Group limit reached ({n} item max)" : "Group limit reached ({n} items max)"]
                },
                selectAllText: "Select All",
                deselectAllText: "Deselect All",
                doneButton: !1,
                doneButtonText: "Close",
                multipleSeparator: ", ",
                styleBase: "btn",
                style: "btn-default",
                size: "auto",
                title: null,
                selectedTextFormat: "values",
                width: !1,
                container: !1,
                hideDisabled: !1,
                showSubtext: !1,
                showIcon: !0,
                showContent: !0,
                dropupAuto: !0,
                header: !1,
                liveSearch: !1,
                liveSearchPlaceholder: null,
                liveSearchNormalize: !1,
                liveSearchStyle: "contains",
                actionsBox: !1,
                iconBase: "glyphicon",
                tickIcon: "glyphicon-ok",
                template: {caret: '<span class="caret"></span>'},
                maxOptions: !1,
                mobile: !1,
                selectOnTab: !1,
                dropdownAlignRight: !1
            }, r.prototype = {
                constructor: r, init: function () {
                    var e = this, i = this.$element.attr("id");
                    this.$element.addClass("bs-select-hidden"), this.liObj = {}, this.multiple = this.$element.prop("multiple"), this.autofocus = this.$element.prop("autofocus"), this.$newElement = this.createView(), this.$element.after(this.$newElement), this.$button = this.$newElement.children("button"), this.$menu = this.$newElement.children(".dropdown-menu"), this.$menuInner = this.$menu.children(".inner"), this.$searchbox = this.$menu.find("input"), this.options.dropdownAlignRight && this.$menu.addClass("dropdown-menu-right"), "undefined" != typeof i && (this.$button.attr("data-id", i), t('label[for="' + i + '"]').click(function (t) {
                        t.preventDefault(), e.$button.focus()
                    })), this.checkDisabled(), this.clickListener(), this.options.liveSearch && this.liveSearchListener(), this.render(), this.setStyle(), this.setWidth(), this.options.container && this.selectPosition(), this.$menu.data("this", this), this.$newElement.data("this", this), this.options.mobile && this.mobile(), this.$newElement.on({
                        "hide.bs.dropdown": function (t) {
                            e.$element.trigger("hide.bs.select", t)
                        }, "hidden.bs.dropdown": function (t) {
                            e.$element.trigger("hidden.bs.select", t)
                        }, "show.bs.dropdown": function (t) {
                            e.$element.trigger("show.bs.select", t)
                        }, "shown.bs.dropdown": function (t) {
                            e.$element.trigger("shown.bs.select", t)
                        }
                    }), setTimeout(function () {
                        e.$element.trigger("loaded.bs.select")
                    })
                }, createDropdown: function () {
                    var e = this.multiple ? " show-tick" : "",
                        n = this.$element.parent().hasClass("input-group") ? " input-group-btn" : "",
                        r = this.autofocus ? " autofocus" : "",
                        a = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>" : "",
                        s = this.options.liveSearch ? '<div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"' + (null === this.options.liveSearchPlaceholder ? "" : ' placeholder="' + i(this.options.liveSearchPlaceholder) + '"') + "></div>" : "",
                        o = this.multiple && this.options.actionsBox ? '<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button type="button" class="actions-btn bs-select-all btn btn-default">' + this.options.selectAllText + '</button><button type="button" class="actions-btn bs-deselect-all btn btn-default">' + this.options.deselectAllText + "</button></div></div>" : "",
                        l = this.multiple && this.options.doneButton ? '<div class="bs-donebutton"><div class="btn-group btn-block"><button type="button" class="btn btn-sm btn-default">' + this.options.doneButtonText + "</button></div></div>" : "",
                        d = '<div class="btn-group bootstrap-select' + e + n + '"><button type="button" class="' + this.options.styleBase + ' dropdown-toggle" data-toggle="dropdown"' + r + '><span class="filter-option pull-left"></span>&nbsp;<span class="bs-caret">' + this.options.template.caret + '</span></button><div class="dropdown-menu open">' + a + s + o + '<ul class="dropdown-menu inner" role="menu"></ul>' + l + "</div></div>";
                    return t(d)
                }, createView: function () {
                    var t = this.createDropdown(), e = this.createLi();
                    return t.find("ul")[0].innerHTML = e, t
                }, reloadLi: function () {
                    this.destroyLi();
                    var t = this.createLi();
                    this.$menuInner[0].innerHTML = t
                }, destroyLi: function () {
                    this.$menu.find("li").remove()
                }, createLi: function () {
                    var n = this, r = [], a = 0, s = document.createElement("option"), o = -1,
                        l = function (t, e, i, n) {
                            return "<li" + ("undefined" != typeof i & "" !== i ? ' class="' + i + '"' : "") + ("undefined" != typeof e & null !== e ? ' data-original-index="' + e + '"' : "") + ("undefined" != typeof n & null !== n ? 'data-optgroup="' + n + '"' : "") + ">" + t + "</li>"
                        }, d = function (t, r, a, s) {
                            return '<a tabindex="0"' + ("undefined" != typeof r ? ' class="' + r + '"' : "") + ("undefined" != typeof a ? ' style="' + a + '"' : "") + (n.options.liveSearchNormalize ? ' data-normalized-text="' + e(i(t)) + '"' : "") + ("undefined" != typeof s || null !== s ? ' data-tokens="' + s + '"' : "") + ">" + t + '<span class="' + n.options.iconBase + " " + n.options.tickIcon + ' check-mark"></span></a>'
                        };
                    if (this.options.title && !this.multiple && (o--, !this.$element.find(".bs-title-option").length)) {
                        var c = this.$element[0];
                        s.className = "bs-title-option", s.appendChild(document.createTextNode(this.options.title)), s.value = "", c.insertBefore(s, c.firstChild), void 0 === t(c.options[c.selectedIndex]).attr("selected") && (s.selected = !0)
                    }
                    return this.$element.find("option").each(function (e) {
                        var i = t(this);
                        if (o++, !i.hasClass("bs-title-option")) {
                            var s = this.className || "", c = this.style.cssText,
                                u = i.data("content") ? i.data("content") : i.html(),
                                h = i.data("tokens") ? i.data("tokens") : null,
                                p = "undefined" != typeof i.data("subtext") ? '<small class="text-muted">' + i.data("subtext") + "</small>" : "",
                                f = "undefined" != typeof i.data("icon") ? '<span class="' + n.options.iconBase + " " + i.data("icon") + '"></span> ' : "",
                                m = this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled;
                            if ("" !== f && m && (f = "<span>" + f + "</span>"), n.options.hideDisabled && m) return void o--;
                            if (i.data("content") || (u = f + '<span class="text">' + u + p + "</span>"), "OPTGROUP" === this.parentNode.tagName && i.data("divider") !== !0) {
                                var g = " " + this.parentNode.className || "";
                                if (0 === i.index()) {
                                    a += 1;
                                    var v = this.parentNode.label,
                                        b = "undefined" != typeof i.parent().data("subtext") ? '<small class="text-muted">' + i.parent().data("subtext") + "</small>" : "",
                                        y = i.parent().data("icon") ? '<span class="' + n.options.iconBase + " " + i.parent().data("icon") + '"></span> ' : "";
                                    v = y + '<span class="text">' + v + b + "</span>", 0 !== e && r.length > 0 && (o++, r.push(l("", null, "divider", a + "div"))), o++, r.push(l(v, null, "dropdown-header" + g, a))
                                }
                                r.push(l(d(u, "opt " + s + g, c, h), e, "", a))
                            } else i.data("divider") === !0 ? r.push(l("", e, "divider")) : i.data("hidden") === !0 ? r.push(l(d(u, s, c, h), e, "hidden is-hidden")) : (this.previousElementSibling && "OPTGROUP" === this.previousElementSibling.tagName && (o++, r.push(l("", null, "divider", a + "div"))), r.push(l(d(u, s, c, h), e)));
                            n.liObj[e] = o
                        }
                    }), this.multiple || 0 !== this.$element.find("option:selected").length || this.options.title || this.$element.find("option").eq(0).prop("selected", !0).attr("selected", "selected"), r.join("")
                }, findLis: function () {
                    return null == this.$lis && (this.$lis = this.$menu.find("li")), this.$lis
                }, render: function (e) {
                    var i, n = this;
                    e !== !1 && this.$element.find("option").each(function (t) {
                        var e = n.findLis().eq(n.liObj[t]);
                        n.setDisabled(t, this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled, e), n.setSelected(t, this.selected, e)
                    }), this.tabIndex();
                    var r = this.$element.find("option").map(function () {
                        if (this.selected) {
                            if (n.options.hideDisabled && (this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled)) return;
                            var e, i = t(this),
                                r = i.data("icon") && n.options.showIcon ? '<i class="' + n.options.iconBase + " " + i.data("icon") + '"></i> ' : "";
                            return e = n.options.showSubtext && i.data("subtext") && !n.multiple ? ' <small class="text-muted">' + i.data("subtext") + "</small>" : "", "undefined" != typeof i.attr("title") ? i.attr("title") : i.data("content") && n.options.showContent ? i.data("content") : r + i.html() + e
                        }
                    }).toArray(), a = this.multiple ? r.join(this.options.multipleSeparator) : r[0];
                    if (this.multiple && this.options.selectedTextFormat.indexOf("count") > -1) {
                        var s = this.options.selectedTextFormat.split(">");
                        if (s.length > 1 && r.length > s[1] || 1 == s.length && r.length >= 2) {
                            i = this.options.hideDisabled ? ", [disabled]" : "";
                            var o = this.$element.find("option").not('[data-divider="true"], [data-hidden="true"]' + i).length,
                                l = "function" == typeof this.options.countSelectedText ? this.options.countSelectedText(r.length, o) : this.options.countSelectedText;
                            a = l.replace("{0}", r.length.toString()).replace("{1}", o.toString())
                        }
                    }
                    void 0 == this.options.title && (this.options.title = this.$element.attr("title")), "static" == this.options.selectedTextFormat && (a = this.options.title), a || (a = "undefined" != typeof this.options.title ? this.options.title : this.options.noneSelectedText), this.$button.attr("title", t.trim(a.replace(/<[^>]*>?/g, ""))), this.$button.children(".filter-option").html(a), this.$element.trigger("rendered.bs.select")
                }, setStyle: function (t, e) {
                    this.$element.attr("class") && this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ""));
                    var i = t ? t : this.options.style;
                    "add" == e ? this.$button.addClass(i) : "remove" == e ? this.$button.removeClass(i) : (this.$button.removeClass(this.options.style), this.$button.addClass(i))
                }, liHeight: function (e) {
                    if (e || this.options.size !== !1 && !this.sizeInfo) {
                        var i = document.createElement("div"), n = document.createElement("div"),
                            r = document.createElement("ul"), a = document.createElement("li"),
                            s = document.createElement("li"), o = document.createElement("a"),
                            l = document.createElement("span"),
                            d = this.options.header && this.$menu.find(".popover-title").length > 0 ? this.$menu.find(".popover-title")[0].cloneNode(!0) : null,
                            c = this.options.liveSearch ? document.createElement("div") : null,
                            u = this.options.actionsBox && this.multiple && this.$menu.find(".bs-actionsbox").length > 0 ? this.$menu.find(".bs-actionsbox")[0].cloneNode(!0) : null,
                            h = this.options.doneButton && this.multiple && this.$menu.find(".bs-donebutton").length > 0 ? this.$menu.find(".bs-donebutton")[0].cloneNode(!0) : null;
                        if (l.className = "text", i.className = this.$menu[0].parentNode.className + " open", n.className = "dropdown-menu open", r.className = "dropdown-menu inner", a.className = "divider", l.appendChild(document.createTextNode("Inner text")), o.appendChild(l), s.appendChild(o), r.appendChild(s), r.appendChild(a), d && n.appendChild(d), c) {
                            var p = document.createElement("span");
                            c.className = "bs-searchbox", p.className = "form-control", c.appendChild(p), n.appendChild(c)
                        }
                        u && n.appendChild(u), n.appendChild(r), h && n.appendChild(h), i.appendChild(n), document.body.appendChild(i);
                        var f = o.offsetHeight, m = d ? d.offsetHeight : 0, g = c ? c.offsetHeight : 0,
                            v = u ? u.offsetHeight : 0, b = h ? h.offsetHeight : 0, y = t(a).outerHeight(!0),
                            w = "function" == typeof getComputedStyle ? getComputedStyle(n) : !1, S = w ? null : t(n),
                            _ = parseInt(w ? w.paddingTop : S.css("paddingTop")) + parseInt(w ? w.paddingBottom : S.css("paddingBottom")) + parseInt(w ? w.borderTopWidth : S.css("borderTopWidth")) + parseInt(w ? w.borderBottomWidth : S.css("borderBottomWidth")),
                            x = _ + parseInt(w ? w.marginTop : S.css("marginTop")) + parseInt(w ? w.marginBottom : S.css("marginBottom")) + 2;
                        document.body.removeChild(i), this.sizeInfo = {
                            liHeight: f,
                            headerHeight: m,
                            searchHeight: g,
                            actionsHeight: v,
                            doneButtonHeight: b,
                            dividerHeight: y,
                            menuPadding: _,
                            menuExtras: x
                        }
                    }
                }, setSize: function () {
                    if (this.findLis(), this.liHeight(), this.options.header && this.$menu.css("padding-top", 0), this.options.size !== !1) {
                        var e, i, n, r, a = this, s = this.$menu, o = this.$menuInner, l = t(window),
                            d = this.$newElement[0].offsetHeight, c = this.sizeInfo.liHeight,
                            u = this.sizeInfo.headerHeight, h = this.sizeInfo.searchHeight,
                            p = this.sizeInfo.actionsHeight, f = this.sizeInfo.doneButtonHeight,
                            m = this.sizeInfo.dividerHeight, g = this.sizeInfo.menuPadding,
                            v = this.sizeInfo.menuExtras, b = this.options.hideDisabled ? ".disabled" : "",
                            y = function () {
                                n = a.$newElement.offset().top - l.scrollTop(), r = l.height() - n - d
                            };
                        if (y(), "auto" === this.options.size) {
                            var w = function () {
                                var l, d = function (e, i) {
                                        return function (n) {
                                            return i ? n.classList ? n.classList.contains(e) : t(n).hasClass(e) : !(n.classList ? n.classList.contains(e) : t(n).hasClass(e))
                                        }
                                    }, m = a.$menuInner[0].getElementsByTagName("li"),
                                    b = Array.prototype.filter ? Array.prototype.filter.call(m, d("hidden", !1)) : a.$lis.not(".hidden"),
                                    w = Array.prototype.filter ? Array.prototype.filter.call(b, d("dropdown-header", !0)) : b.filter(".dropdown-header");
                                y(), e = r - v, a.options.container ? (s.data("height") || s.data("height", s.height()), i = s.data("height")) : i = s.height(), a.options.dropupAuto && a.$newElement.toggleClass("dropup", n > r && i > e - v), a.$newElement.hasClass("dropup") && (e = n - v), l = b.length + w.length > 3 ? 3 * c + v - 2 : 0, s.css({
                                    "max-height": e + "px",
                                    overflow: "hidden",
                                    "min-height": l + u + h + p + f + "px"
                                }), o.css({
                                    "max-height": e - u - h - p - f - g + "px",
                                    "overflow-y": "auto",
                                    "min-height": Math.max(l - g, 0) + "px"
                                })
                            };
                            w(), this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize", w), l.off("resize.getSize scroll.getSize").on("resize.getSize scroll.getSize", w)
                        } else if (this.options.size && "auto" != this.options.size && this.$lis.not(b).length > this.options.size) {
                            var S = this.$lis.not(".divider").not(b).children().slice(0, this.options.size).last().parent().index(),
                                _ = this.$lis.slice(0, S + 1).filter(".divider").length;
                            e = c * this.options.size + _ * m + g, a.options.container ? (s.data("height") || s.data("height", s.height()), i = s.data("height")) : i = s.height(), a.options.dropupAuto && this.$newElement.toggleClass("dropup", n > r && i > e - v), s.css({
                                "max-height": e + u + h + p + f + "px",
                                overflow: "hidden",
                                "min-height": ""
                            }), o.css({"max-height": e - g + "px", "overflow-y": "auto", "min-height": ""})
                        }
                    }
                }, setWidth: function () {
                    if ("auto" === this.options.width) {
                        this.$menu.css("min-width", "0");
                        var t = this.$menu.parent().clone().appendTo("body"),
                            e = this.options.container ? this.$newElement.clone().appendTo("body") : t,
                            i = t.children(".dropdown-menu").outerWidth(),
                            n = e.css("width", "auto").children("button").outerWidth();
                        t.remove(), e.remove(), this.$newElement.css("width", Math.max(i, n) + "px")
                    } else "fit" === this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", "").addClass("fit-width")) : this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", this.options.width)) : (this.$menu.css("min-width", ""), this.$newElement.css("width", ""));
                    this.$newElement.hasClass("fit-width") && "fit" !== this.options.width && this.$newElement.removeClass("fit-width")
                }, selectPosition: function () {
                    this.$bsContainer = t('<div class="bs-container" />');
                    var e, i, n = this, r = function (t) {
                        n.$bsContainer.addClass(t.attr("class").replace(/form-control|fit-width/gi, "")).toggleClass("dropup", t.hasClass("dropup")), e = t.offset(), i = t.hasClass("dropup") ? 0 : t[0].offsetHeight, n.$bsContainer.css({
                            top: e.top + i,
                            left: e.left,
                            width: t[0].offsetWidth
                        })
                    };
                    this.$newElement.on("click", function () {
                        var e = t(this);
                        n.isDisabled() || (r(e), n.$bsContainer.appendTo(n.options.container).toggleClass("open", !e.hasClass("open")).append(n.$menu))
                    }), t(window).on("resize scroll", function () {
                        r(n.$newElement)
                    }), this.$element.on("hide.bs.select", function () {
                        n.$menu.data("height", n.$menu.height()), n.$bsContainer.detach()
                    })
                }, setSelected: function (t, e, i) {
                    i || (i = this.findLis().eq(this.liObj[t])), i.toggleClass("selected", e)
                }, setDisabled: function (t, e, i) {
                    i || (i = this.findLis().eq(this.liObj[t])), e ? i.addClass("disabled").children("a").attr("href", "#").attr("tabindex", -1) : i.removeClass("disabled").children("a").removeAttr("href").attr("tabindex", 0)
                }, isDisabled: function () {
                    return this.$element[0].disabled
                }, checkDisabled: function () {
                    var t = this;
                    this.isDisabled() ? (this.$newElement.addClass("disabled"), this.$button.addClass("disabled").attr("tabindex", -1)) : (this.$button.hasClass("disabled") && (this.$newElement.removeClass("disabled"), this.$button.removeClass("disabled")), -1 != this.$button.attr("tabindex") || this.$element.data("tabindex") || this.$button.removeAttr("tabindex")), this.$button.click(function () {
                        return !t.isDisabled()
                    })
                }, tabIndex: function () {
                    this.$element.is("[tabindex]") && (this.$element.data("tabindex", this.$element.attr("tabindex")), this.$button.attr("tabindex", this.$element.data("tabindex")))
                }, clickListener: function () {
                    var e = this, i = t(document);
                    this.$newElement.on("touchstart.dropdown", ".dropdown-menu", function (t) {
                        t.stopPropagation()
                    }), i.data("spaceSelect", !1), this.$button.on("keyup", function (t) {
                        /(32)/.test(t.keyCode.toString(10)) && i.data("spaceSelect") && (t.preventDefault(), i.data("spaceSelect", !1))
                    }), this.$newElement.on("click", function () {
                        e.setSize(), e.$element.on("shown.bs.select", function () {
                            if (e.options.liveSearch || e.multiple) {
                                if (!e.multiple) {
                                    var t = e.liObj[e.$element[0].selectedIndex];
                                    if ("number" != typeof t || e.options.size === !1) return;
                                    var i = e.$lis.eq(t)[0].offsetTop - e.$menuInner[0].offsetTop;
                                    i = i - e.$menuInner[0].offsetHeight / 2 + e.sizeInfo.liHeight / 2, e.$menuInner[0].scrollTop = i
                                }
                            } else e.$menuInner.find(".selected a").focus()
                        })
                    }), this.$menuInner.on("click", "li a", function (i) {
                        var n = t(this), r = n.parent().data("originalIndex"), a = e.$element.val(),
                            s = e.$element.prop("selectedIndex");
                        if (e.multiple && i.stopPropagation(), i.preventDefault(), !e.isDisabled() && !n.parent().hasClass("disabled")) {
                            var o = e.$element.find("option"), l = o.eq(r), d = l.prop("selected"),
                                c = l.parent("optgroup"), u = e.options.maxOptions, h = c.data("maxOptions") || !1;
                            if (e.multiple) {
                                if (l.prop("selected", !d), e.setSelected(r, !d), n.blur(), u !== !1 || h !== !1) {
                                    var p = u < o.filter(":selected").length, f = h < c.find("option:selected").length;
                                    if (u && p || h && f) if (u && 1 == u) o.prop("selected", !1), l.prop("selected", !0), e.$menuInner.find(".selected").removeClass("selected"), e.setSelected(r, !0); else if (h && 1 == h) {
                                        c.find("option:selected").prop("selected", !1), l.prop("selected", !0);
                                        var m = n.parent().data("optgroup");
                                        e.$menuInner.find('[data-optgroup="' + m + '"]').removeClass("selected"), e.setSelected(r, !0)
                                    } else {
                                        var g = "function" == typeof e.options.maxOptionsText ? e.options.maxOptionsText(u, h) : e.options.maxOptionsText,
                                            v = g[0].replace("{n}", u), b = g[1].replace("{n}", h),
                                            y = t('<div class="notify"></div>');
                                        g[2] && (v = v.replace("{var}", g[2][u > 1 ? 0 : 1]), b = b.replace("{var}", g[2][h > 1 ? 0 : 1])), l.prop("selected", !1), e.$menu.append(y), u && p && (y.append(t("<div>" + v + "</div>")), e.$element.trigger("maxReached.bs.select")), h && f && (y.append(t("<div>" + b + "</div>")), e.$element.trigger("maxReachedGrp.bs.select")), setTimeout(function () {
                                            e.setSelected(r, !1)
                                        }, 10), y.delay(750).fadeOut(300, function () {
                                            t(this).remove()
                                        })
                                    }
                                }
                            } else o.prop("selected", !1), l.prop("selected", !0), e.$menuInner.find(".selected").removeClass("selected"), e.setSelected(r, !0);
                            e.multiple ? e.options.liveSearch && e.$searchbox.focus() : e.$button.focus(), (a != e.$element.val() && e.multiple || s != e.$element.prop("selectedIndex") && !e.multiple) && (e.$element.triggerNative("change"), e.$element.trigger("changed.bs.select", [r, l.prop("selected"), d]))
                        }
                    }), this.$menu.on("click", "li.disabled a, .popover-title, .popover-title :not(.close)", function (i) {
                        i.currentTarget == this && (i.preventDefault(), i.stopPropagation(), e.options.liveSearch && !t(i.target).hasClass("close") ? e.$searchbox.focus() : e.$button.focus())
                    }), this.$menuInner.on("click", ".divider, .dropdown-header", function (t) {
                        t.preventDefault(), t.stopPropagation(), e.options.liveSearch ? e.$searchbox.focus() : e.$button.focus()
                    }), this.$menu.on("click", ".popover-title .close", function () {
                        e.$button.click()
                    }), this.$searchbox.on("click", function (t) {
                        t.stopPropagation()
                    }), this.$menu.on("click", ".actions-btn", function (i) {
                        e.options.liveSearch ? e.$searchbox.focus() : e.$button.focus(), i.preventDefault(), i.stopPropagation(), t(this).hasClass("bs-select-all") ? e.selectAll() : e.deselectAll(), e.$element.triggerNative("change")
                    }), this.$element.change(function () {
                        e.render(!1)
                    })
                }, liveSearchListener: function () {
                    var n = this, r = t('<li class="no-results"></li>');
                    this.$newElement.on("click.dropdown.data-api touchstart.dropdown.data-api", function () {
                        n.$menuInner.find(".active").removeClass("active"), n.$searchbox.val() && (n.$searchbox.val(""), n.$lis.not(".is-hidden").removeClass("hidden"), r.parent().length && r.remove()), n.multiple || n.$menuInner.find(".selected").addClass("active"), setTimeout(function () {
                            n.$searchbox.focus()
                        }, 10)
                    }), this.$searchbox.on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api", function (t) {
                        t.stopPropagation()
                    }), this.$searchbox.on("input propertychange", function () {
                        if (n.$searchbox.val()) {
                            var a = n.$lis.not(".is-hidden").removeClass("hidden").children("a");
                            a = n.options.liveSearchNormalize ? a.not(":a" + n._searchStyle() + '("' + e(n.$searchbox.val()) + '")') : a.not(":" + n._searchStyle() + '("' + n.$searchbox.val() + '")'), a.parent().addClass("hidden"), n.$lis.filter(".dropdown-header").each(function () {
                                var e = t(this), i = e.data("optgroup");
                                0 === n.$lis.filter("[data-optgroup=" + i + "]").not(e).not(".hidden").length && (e.addClass("hidden"), n.$lis.filter("[data-optgroup=" + i + "div]").addClass("hidden"))
                            });
                            var s = n.$lis.not(".hidden");
                            s.each(function (e) {
                                var i = t(this);
                                i.hasClass("divider") && (i.index() === s.first().index() || i.index() === s.last().index() || s.eq(e + 1).hasClass("divider")) && i.addClass("hidden")
                            }), n.$lis.not(".hidden, .no-results").length ? r.parent().length && r.remove() : (r.parent().length && r.remove(), r.html(n.options.noneResultsText.replace("{0}", '"' + i(n.$searchbox.val()) + '"')).show(), n.$menuInner.append(r))
                        } else n.$lis.not(".is-hidden").removeClass("hidden"), r.parent().length && r.remove();
                        n.$lis.filter(".active").removeClass("active"), n.$searchbox.val() && n.$lis.not(".hidden, .divider, .dropdown-header").eq(0).addClass("active").children("a").focus(), t(this).focus()
                    })
                }, _searchStyle: function () {
                    var t = {begins: "ibegins", startsWith: "ibegins"};
                    return t[this.options.liveSearchStyle] || "icontains"
                }, val: function (t) {
                    return "undefined" != typeof t ? (this.$element.val(t), this.render(), this.$element) : this.$element.val()
                }, changeAll: function (e) {
                    "undefined" == typeof e && (e = !0), this.findLis();
                    for (var i = this.$element.find("option"), n = this.$lis.not(".divider, .dropdown-header, .disabled, .hidden").toggleClass("selected", e), r = n.length, a = [], s = 0; r > s; s++) {
                        var o = n[s].getAttribute("data-original-index");
                        a[a.length] = i.eq(o)[0]
                    }
                    t(a).prop("selected", e), this.render(!1)
                }, selectAll: function () {
                    return this.changeAll(!0)
                }, deselectAll: function () {
                    return this.changeAll(!1)
                }, keydown: function (i) {
                    var n, r, a, s, o, l, d, c, u, h = t(this), p = h.is("input") ? h.parent().parent() : h.parent(),
                        f = p.data("this"), m = ":not(.disabled, .hidden, .dropdown-header, .divider)", g = {
                            32: " ",
                            48: "0",
                            49: "1",
                            50: "2",
                            51: "3",
                            52: "4",
                            53: "5",
                            54: "6",
                            55: "7",
                            56: "8",
                            57: "9",
                            59: ";",
                            65: "a",
                            66: "b",
                            67: "c",
                            68: "d",
                            69: "e",
                            70: "f",
                            71: "g",
                            72: "h",
                            73: "i",
                            74: "j",
                            75: "k",
                            76: "l",
                            77: "m",
                            78: "n",
                            79: "o",
                            80: "p",
                            81: "q",
                            82: "r",
                            83: "s",
                            84: "t",
                            85: "u",
                            86: "v",
                            87: "w",
                            88: "x",
                            89: "y",
                            90: "z",
                            96: "0",
                            97: "1",
                            98: "2",
                            99: "3",
                            100: "4",
                            101: "5",
                            102: "6",
                            103: "7",
                            104: "8",
                            105: "9"
                        };
                    if (f.options.liveSearch && (p = h.parent().parent()), f.options.container && (p = f.$menu), n = t("[role=menu] li", p), u = f.$menu.parent().hasClass("open"), !u && (i.keyCode >= 48 && i.keyCode <= 57 || i.keyCode >= 96 && i.keyCode <= 105 || i.keyCode >= 65 && i.keyCode <= 90) && (f.options.container ? f.$newElement.trigger("click") : (f.setSize(), f.$menu.parent().addClass("open"), u = !0), f.$searchbox.focus()), f.options.liveSearch && (/(^9$|27)/.test(i.keyCode.toString(10)) && u && 0 === f.$menu.find(".active").length && (i.preventDefault(), f.$menu.parent().removeClass("open"), f.options.container && f.$newElement.removeClass("open"), f.$button.focus()), n = t("[role=menu] li" + m, p), h.val() || /(38|40)/.test(i.keyCode.toString(10)) || 0 === n.filter(".active").length && (n = f.$menuInner.find("li"), n = f.options.liveSearchNormalize ? n.filter(":a" + f._searchStyle() + "(" + e(g[i.keyCode]) + ")") : n.filter(":" + f._searchStyle() + "(" + g[i.keyCode] + ")"))), n.length) {
                        if (/(38|40)/.test(i.keyCode.toString(10))) r = n.index(n.find("a").filter(":focus").parent()), s = n.filter(m).first().index(), o = n.filter(m).last().index(), a = n.eq(r).nextAll(m).eq(0).index(), l = n.eq(r).prevAll(m).eq(0).index(), d = n.eq(a).prevAll(m).eq(0).index(), f.options.liveSearch && (n.each(function (e) {
                            t(this).hasClass("disabled") || t(this).data("index", e)
                        }), r = n.index(n.filter(".active")), s = n.first().data("index"), o = n.last().data("index"), a = n.eq(r).nextAll().eq(0).data("index"), l = n.eq(r).prevAll().eq(0).data("index"), d = n.eq(a).prevAll().eq(0).data("index")), c = h.data("prevIndex"), 38 == i.keyCode ? (f.options.liveSearch && r--, r != d && r > l && (r = l), s > r && (r = s), r == c && (r = o)) : 40 == i.keyCode && (f.options.liveSearch && r++, -1 == r && (r = 0), r != d && a > r && (r = a), r > o && (r = o), r == c && (r = s)), h.data("prevIndex", r), f.options.liveSearch ? (i.preventDefault(), h.hasClass("dropdown-toggle") || (n.removeClass("active").eq(r).addClass("active").children("a").focus(), h.focus())) : n.eq(r).children("a").focus(); else if (!h.is("input")) {
                            var v, b, y = [];
                            n.each(function () {
                                t(this).hasClass("disabled") || t.trim(t(this).children("a").text().toLowerCase()).substring(0, 1) == g[i.keyCode] && y.push(t(this).index())
                            }), v = t(document).data("keycount"), v++, t(document).data("keycount", v), b = t.trim(t(":focus").text().toLowerCase()).substring(0, 1), b != g[i.keyCode] ? (v = 1, t(document).data("keycount", v)) : v >= y.length && (t(document).data("keycount", 0), v > y.length && (v = 1)), n.eq(y[v - 1]).children("a").focus()
                        }
                        if ((/(13|32)/.test(i.keyCode.toString(10)) || /(^9$)/.test(i.keyCode.toString(10)) && f.options.selectOnTab) && u) {
                            if (/(32)/.test(i.keyCode.toString(10)) || i.preventDefault(), f.options.liveSearch) /(32)/.test(i.keyCode.toString(10)) || (f.$menuInner.find(".active a").click(), h.focus()); else {
                                var w = t(":focus");
                                w.click(), w.focus(), i.preventDefault(), t(document).data("spaceSelect", !0)
                            }
                            t(document).data("keycount", 0)
                        }
                        (/(^9$|27)/.test(i.keyCode.toString(10)) && u && (f.multiple || f.options.liveSearch) || /(27)/.test(i.keyCode.toString(10)) && !u) && (f.$menu.parent().removeClass("open"), f.options.container && f.$newElement.removeClass("open"), f.$button.focus())
                    }
                }, mobile: function () {
                    this.$element.addClass("mobile-device").appendTo(this.$newElement), this.options.container && this.$menu.hide()
                }, refresh: function () {
                    this.$lis = null, this.liObj = {}, this.reloadLi(), this.render(), this.checkDisabled(), this.liHeight(!0), this.setStyle(), this.setWidth(), this.$lis && this.$searchbox.trigger("propertychange"), this.$element.trigger("refreshed.bs.select")
                }, hide: function () {
                    this.$newElement.hide()
                }, show: function () {
                    this.$newElement.show()
                }, remove: function () {
                    this.$newElement.remove(), this.$element.remove()
                }, destroy: function () {
                    this.$newElement.remove(), this.$bsContainer ? this.$bsContainer.remove() : this.$menu.remove(), this.$element.off(".bs.select").removeData("selectpicker").removeClass("bs-select-hidden selectpicker")
                }
            };
            var a = t.fn.selectpicker;
            t.fn.selectpicker = n, t.fn.selectpicker.Constructor = r, t.fn.selectpicker.noConflict = function () {
                return t.fn.selectpicker = a, this
            }, t(document).data("keycount", 0).on("keydown.bs.select", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input', r.prototype.keydown).on("focusin.modal", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input', function (t) {
                t.stopPropagation()
            }), t(window).on("load.bs.select.data-api", function () {
                t(".selectpicker").each(function () {
                    var e = t(this);
                    n.call(e, e.data())
                })
            })
        }(t)
    }), !function (t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : jQuery)
    }(function (t) {
        var e = function () {
            if (t && t.fn && t.fn.select2 && t.fn.select2.amd) var e = t.fn.select2.amd;
            var e;
            return function () {
                if (!e || !e.requirejs) {
                    e ? i = e : e = {};
                    var t, i, n;
                    !function (e) {
                        function r(t, e) {
                            return w.call(t, e)
                        }

                        function a(t, e) {
                            var i, n, r, a, s, o, l, d, c, u, h, p = e && e.split("/"), f = b.map,
                                m = f && f["*"] || {};
                            if (t && "." === t.charAt(0)) if (e) {
                                for (t = t.split("/"), s = t.length - 1, b.nodeIdCompat && _.test(t[s]) && (t[s] = t[s].replace(_, "")), t = p.slice(0, p.length - 1).concat(t), c = 0; c < t.length; c += 1) if (h = t[c], "." === h) t.splice(c, 1), c -= 1; else if (".." === h) {
                                    if (1 === c && (".." === t[2] || ".." === t[0])) break;
                                    c > 0 && (t.splice(c - 1, 2), c -= 2)
                                }
                                t = t.join("/")
                            } else 0 === t.indexOf("./") && (t = t.substring(2));
                            if ((p || m) && f) {
                                for (i = t.split("/"), c = i.length; c > 0; c -= 1) {
                                    if (n = i.slice(0, c).join("/"), p) for (u = p.length; u > 0; u -= 1) if (r = f[p.slice(0, u).join("/")], r && (r = r[n])) {
                                        a = r, o = c;
                                        break
                                    }
                                    if (a) break;
                                    !l && m && m[n] && (l = m[n], d = c)
                                }
                                !a && l && (a = l, o = d), a && (i.splice(0, o, a), t = i.join("/"))
                            }
                            return t
                        }

                        function s(t, i) {
                            return function () {
                                var n = S.call(arguments, 0);
                                return "string" != typeof n[0] && 1 === n.length && n.push(null), p.apply(e, n.concat([t, i]))
                            }
                        }

                        function o(t) {
                            return function (e) {
                                return a(e, t)
                            }
                        }

                        function l(t) {
                            return function (e) {
                                g[t] = e
                            }
                        }

                        function d(t) {
                            if (r(v, t)) {
                                var i = v[t];
                                delete v[t], y[t] = !0, h.apply(e, i)
                            }
                            if (!r(g, t) && !r(y, t)) throw new Error("No " + t);
                            return g[t]
                        }

                        function c(t) {
                            var e, i = t ? t.indexOf("!") : -1;
                            return i > -1 && (e = t.substring(0, i), t = t.substring(i + 1, t.length)), [e, t]
                        }

                        function u(t) {
                            return function () {
                                return b && b.config && b.config[t] || {}
                            }
                        }

                        var h, p, f, m, g = {}, v = {}, b = {}, y = {}, w = Object.prototype.hasOwnProperty,
                            S = [].slice, _ = /\.js$/;
                        f = function (t, e) {
                            var i, n = c(t), r = n[0];
                            return t = n[1], r && (r = a(r, e), i = d(r)), r ? t = i && i.normalize ? i.normalize(t, o(e)) : a(t, e) : (t = a(t, e), n = c(t), r = n[0], t = n[1], r && (i = d(r))), {
                                f: r ? r + "!" + t : t,
                                n: t,
                                pr: r,
                                p: i
                            }
                        }, m = {
                            require: function (t) {
                                return s(t)
                            }, exports: function (t) {
                                var e = g[t];
                                return "undefined" != typeof e ? e : g[t] = {}
                            }, module: function (t) {
                                return {id: t, uri: "", exports: g[t], config: u(t)}
                            }
                        }, h = function (t, i, n, a) {
                            var o, c, u, h, p, b, w = [], S = typeof n;
                            if (a = a || t, "undefined" === S || "function" === S) {
                                for (i = !i.length && n.length ? ["require", "exports", "module"] : i, p = 0; p < i.length; p += 1) if (h = f(i[p], a), c = h.f, "require" === c) w[p] = m.require(t); else if ("exports" === c) w[p] = m.exports(t), b = !0; else if ("module" === c) o = w[p] = m.module(t); else if (r(g, c) || r(v, c) || r(y, c)) w[p] = d(c); else {
                                    if (!h.p) throw new Error(t + " missing " + c);
                                    h.p.load(h.n, s(a, !0), l(c), {}), w[p] = g[c]
                                }
                                u = n ? n.apply(g[t], w) : void 0, t && (o && o.exports !== e && o.exports !== g[t] ? g[t] = o.exports : u === e && b || (g[t] = u))
                            } else t && (g[t] = n)
                        }, t = i = p = function (t, i, n, r, a) {
                            if ("string" == typeof t) return m[t] ? m[t](i) : d(f(t, i).f);
                            if (!t.splice) {
                                if (b = t, b.deps && p(b.deps, b.callback), !i) return;
                                i.splice ? (t = i, i = n, n = null) : t = e
                            }
                            return i = i || function () {
                            }, "function" == typeof n && (n = r, r = a), r ? h(e, t, i, n) : setTimeout(function () {
                                h(e, t, i, n)
                            }, 4), p
                        }, p.config = function (t) {
                            return p(t)
                        }, t._defined = g, n = function (t, e, i) {
                            if ("string" != typeof t) throw new Error("See almond README: incorrect module build, no module name");
                            e.splice || (i = e, e = []), r(g, t) || r(v, t) || (v[t] = [t, e, i])
                        }, n.amd = {jQuery: !0}
                    }(), e.requirejs = t, e.require = i, e.define = n
                }
            }(), e.define("almond", function () {
            }), e.define("jquery", [], function () {
                var e = t || $;
                return null == e && console && console.error && console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."), e
            }), e.define("select2/utils", ["jquery"], function (t) {
                function e(t) {
                    var e = t.prototype, i = [];
                    for (var n in e) {
                        var r = e[n];
                        "function" == typeof r && "constructor" !== n && i.push(n)
                    }
                    return i
                }

                var i = {};
                i.Extend = function (t, e) {
                    function i() {
                        this.constructor = t
                    }

                    var n = {}.hasOwnProperty;
                    for (var r in e) n.call(e, r) && (t[r] = e[r]);
                    return i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype, t
                }, i.Decorate = function (t, i) {
                    function n() {
                        var e = Array.prototype.unshift, n = i.prototype.constructor.length,
                            r = t.prototype.constructor;
                        n > 0 && (e.call(arguments, t.prototype.constructor), r = i.prototype.constructor), r.apply(this, arguments)
                    }

                    function r() {
                        this.constructor = n
                    }

                    var a = e(i), s = e(t);
                    i.displayName = t.displayName, n.prototype = new r;
                    for (var o = 0; o < s.length; o++) {
                        var l = s[o];
                        n.prototype[l] = t.prototype[l]
                    }
                    for (var d = (function (t) {
                        var e = function () {
                        };
                        t in n.prototype && (e = n.prototype[t]);
                        var r = i.prototype[t];
                        return function () {
                            var t = Array.prototype.unshift;
                            return t.call(arguments, e), r.apply(this, arguments)
                        }
                    }), c = 0; c < a.length; c++) {
                        var u = a[c];
                        n.prototype[u] = d(u)
                    }
                    return n
                };
                var n = function () {
                    this.listeners = {}
                };
                return n.prototype.on = function (t, e) {
                    this.listeners = this.listeners || {}, t in this.listeners ? this.listeners[t].push(e) : this.listeners[t] = [e]
                }, n.prototype.trigger = function (t) {
                    var e = Array.prototype.slice;
                    this.listeners = this.listeners || {}, t in this.listeners && this.invoke(this.listeners[t], e.call(arguments, 1)), "*" in this.listeners && this.invoke(this.listeners["*"], arguments)
                }, n.prototype.invoke = function (t, e) {
                    for (var i = 0, n = t.length; n > i; i++) t[i].apply(this, e)
                }, i.Observable = n, i.generateChars = function (t) {
                    for (var e = "", i = 0; t > i; i++) {
                        var n = Math.floor(36 * Math.random());
                        e += n.toString(36)
                    }
                    return e
                }, i.bind = function (t, e) {
                    return function () {
                        t.apply(e, arguments)
                    }
                }, i._convertData = function (t) {
                    for (var e in t) {
                        var i = e.split("-"), n = t;
                        if (1 !== i.length) {
                            for (var r = 0; r < i.length; r++) {
                                var a = i[r];
                                a = a.substring(0, 1).toLowerCase() + a.substring(1), a in n || (n[a] = {}), r == i.length - 1 && (n[a] = t[e]), n = n[a]
                            }
                            delete t[e]
                        }
                    }
                    return t
                }, i.hasScroll = function (e, i) {
                    var n = t(i), r = i.style.overflowX, a = i.style.overflowY;
                    return r !== a || "hidden" !== a && "visible" !== a ? "scroll" === r || "scroll" === a ? !0 : n.innerHeight() < i.scrollHeight || n.innerWidth() < i.scrollWidth : !1
                }, i.escapeMarkup = function (t) {
                    var e = {
                        "\\": "&#92;",
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': "&quot;",
                        "'": "&#39;",
                        "/": "&#47;"
                    };
                    return "string" != typeof t ? t : String(t).replace(/[&<>"'\/\\]/g, function (t) {
                        return e[t]
                    })
                }, i.appendMany = function (e, i) {
                    if ("1.7" === t.fn.jquery.substr(0, 3)) {
                        var n = t();
                        t.map(i, function (t) {
                            n = n.add(t)
                        }), i = n
                    }
                    e.append(i)
                }, i
            }), e.define("select2/results", ["jquery", "./utils"], function (t, e) {
                function i(t, e, n) {
                    this.$element = t, this.data = n, this.options = e, i.__super__.constructor.call(this)
                }

                return e.Extend(i, e.Observable), i.prototype.render = function () {
                    var e = t('<ul class="select2-results__options" role="tree"></ul>');
                    return this.options.get("multiple") && e.attr("aria-multiselectable", "true"), this.$results = e, e
                }, i.prototype.clear = function () {
                    this.$results.empty()
                }, i.prototype.displayMessage = function (e) {
                    var i = this.options.get("escapeMarkup");
                    this.clear(), this.hideLoading();
                    var n = t('<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'),
                        r = this.options.get("translations").get(e.message);
                    n.append(i(r(e.args))), n[0].className += " select2-results__message", this.$results.append(n)
                }, i.prototype.hideMessages = function () {
                    this.$results.find(".select2-results__message").remove()
                }, i.prototype.append = function (t) {
                    this.hideLoading();
                    var e = [];
                    if (null == t.results || 0 === t.results.length) return void(0 === this.$results.children().length && this.trigger("results:message", {message: "noResults"}));
                    t.results = this.sort(t.results);
                    for (var i = 0; i < t.results.length; i++) {
                        var n = t.results[i], r = this.option(n);
                        e.push(r)
                    }
                    this.$results.append(e)
                }, i.prototype.position = function (t, e) {
                    var i = e.find(".select2-results");
                    i.append(t)
                }, i.prototype.sort = function (t) {
                    var e = this.options.get("sorter");
                    return e(t)
                }, i.prototype.setClasses = function () {
                    var e = this;
                    this.data.current(function (i) {
                        var n = t.map(i, function (t) {
                            return t.id.toString()
                        }), r = e.$results.find(".select2-results__option[aria-selected]");
                        r.each(function () {
                            var e = t(this), i = t.data(this, "data"), r = "" + i.id;
                            null != i.element && i.element.selected || null == i.element && t.inArray(r, n) > -1 ? e.attr("aria-selected", "true") : e.attr("aria-selected", "false")
                        });
                        var a = r.filter("[aria-selected=true]");
                        a.length > 0 ? a.first().trigger("mouseenter") : r.first().trigger("mouseenter")
                    })
                }, i.prototype.showLoading = function (t) {
                    this.hideLoading();
                    var e = this.options.get("translations").get("searching"),
                        i = {disabled: !0, loading: !0, text: e(t)}, n = this.option(i);
                    n.className += " loading-results", this.$results.prepend(n)
                }, i.prototype.hideLoading = function () {
                    this.$results.find(".loading-results").remove()
                }, i.prototype.option = function (e) {
                    var i = document.createElement("li");
                    i.className = "select2-results__option";
                    var n = {role: "treeitem", "aria-selected": "false"};
                    e.disabled && (delete n["aria-selected"], n["aria-disabled"] = "true"), null == e.id && delete n["aria-selected"], null != e._resultId && (i.id = e._resultId), e.title && (i.title = e.title), e.children && (n.role = "group", n["aria-label"] = e.text, delete n["aria-selected"]);
                    for (var r in n) {
                        var a = n[r];
                        i.setAttribute(r, a)
                    }
                    if (e.children) {
                        var s = t(i), o = document.createElement("strong");
                        o.className = "select2-results__group", t(o), this.template(e, o);
                        for (var l = [], d = 0; d < e.children.length; d++) {
                            var c = e.children[d], u = this.option(c);
                            l.push(u)
                        }
                        var h = t("<ul></ul>", {"class": "select2-results__options select2-results__options--nested"});
                        h.append(l), s.append(o), s.append(h)
                    } else this.template(e, i);
                    return t.data(i, "data", e), i
                }, i.prototype.bind = function (e, i) {
                    var n = this, r = e.id + "-results";
                    this.$results.attr("id", r), e.on("results:all", function (t) {
                        n.clear(), n.append(t.data), e.isOpen() && n.setClasses()
                    }), e.on("results:append", function (t) {
                        n.append(t.data), e.isOpen() && n.setClasses()
                    }), e.on("query", function (t) {
                        n.hideMessages(), n.showLoading(t)
                    }), e.on("select", function () {
                        e.isOpen() && n.setClasses()
                    }), e.on("unselect", function () {
                        e.isOpen() && n.setClasses();
                    }), e.on("open", function () {
                        n.$results.attr("aria-expanded", "true"), n.$results.attr("aria-hidden", "false"), n.setClasses(), n.ensureHighlightVisible()
                    }), e.on("close", function () {
                        n.$results.attr("aria-expanded", "false"), n.$results.attr("aria-hidden", "true"), n.$results.removeAttr("aria-activedescendant")
                    }), e.on("results:toggle", function () {
                        var t = n.getHighlightedResults();
                        0 !== t.length && t.trigger("mouseup")
                    }), e.on("results:select", function () {
                        var t = n.getHighlightedResults();
                        if (0 !== t.length) {
                            var e = t.data("data");
                            "true" == t.attr("aria-selected") ? n.trigger("close", {}) : n.trigger("select", {data: e})
                        }
                    }), e.on("results:previous", function () {
                        var t = n.getHighlightedResults(), e = n.$results.find("[aria-selected]"), i = e.index(t);
                        if (0 !== i) {
                            var r = i - 1;
                            0 === t.length && (r = 0);
                            var a = e.eq(r);
                            a.trigger("mouseenter");
                            var s = n.$results.offset().top, o = a.offset().top, l = n.$results.scrollTop() + (o - s);
                            0 === r ? n.$results.scrollTop(0) : 0 > o - s && n.$results.scrollTop(l)
                        }
                    }), e.on("results:next", function () {
                        var t = n.getHighlightedResults(), e = n.$results.find("[aria-selected]"), i = e.index(t),
                            r = i + 1;
                        if (!(r >= e.length)) {
                            var a = e.eq(r);
                            a.trigger("mouseenter");
                            var s = n.$results.offset().top + n.$results.outerHeight(!1),
                                o = a.offset().top + a.outerHeight(!1), l = n.$results.scrollTop() + o - s;
                            0 === r ? n.$results.scrollTop(0) : o > s && n.$results.scrollTop(l)
                        }
                    }), e.on("results:focus", function (t) {
                        t.element.addClass("select2-results__option--highlighted")
                    }), e.on("results:message", function (t) {
                        n.displayMessage(t)
                    }), t.fn.mousewheel && this.$results.on("mousewheel", function (t) {
                        var e = n.$results.scrollTop(),
                            i = n.$results.get(0).scrollHeight - n.$results.scrollTop() + t.deltaY,
                            r = t.deltaY > 0 && e - t.deltaY <= 0, a = t.deltaY < 0 && i <= n.$results.height();
                        r ? (n.$results.scrollTop(0), t.preventDefault(), t.stopPropagation()) : a && (n.$results.scrollTop(n.$results.get(0).scrollHeight - n.$results.height()), t.preventDefault(), t.stopPropagation())
                    }), this.$results.on("mouseup", ".select2-results__option[aria-selected]", function (e) {
                        var i = t(this), r = i.data("data");
                        return "true" === i.attr("aria-selected") ? void(n.options.get("multiple") ? n.trigger("unselect", {
                            originalEvent: e,
                            data: r
                        }) : n.trigger("close", {})) : void n.trigger("select", {originalEvent: e, data: r})
                    }), this.$results.on("mouseenter", ".select2-results__option[aria-selected]", function (e) {
                        var i = t(this).data("data");
                        n.getHighlightedResults().removeClass("select2-results__option--highlighted"), n.trigger("results:focus", {
                            data: i,
                            element: t(this)
                        })
                    })
                }, i.prototype.getHighlightedResults = function () {
                    var t = this.$results.find(".select2-results__option--highlighted");
                    return t
                }, i.prototype.destroy = function () {
                    this.$results.remove()
                }, i.prototype.ensureHighlightVisible = function () {
                    var t = this.getHighlightedResults();
                    if (0 !== t.length) {
                        var e = this.$results.find("[aria-selected]"), i = e.index(t), n = this.$results.offset().top,
                            r = t.offset().top, a = this.$results.scrollTop() + (r - n), s = r - n;
                        a -= 2 * t.outerHeight(!1), 2 >= i ? this.$results.scrollTop(0) : (s > this.$results.outerHeight() || 0 > s) && this.$results.scrollTop(a)
                    }
                }, i.prototype.template = function (e, i) {
                    var n = this.options.get("templateResult"), r = this.options.get("escapeMarkup"), a = n(e, i);
                    null == a ? i.style.display = "none" : "string" == typeof a ? i.innerHTML = r(a) : t(i).append(a)
                }, i
            }), e.define("select2/keys", [], function () {
                var t = {
                    BACKSPACE: 8,
                    TAB: 9,
                    ENTER: 13,
                    SHIFT: 16,
                    CTRL: 17,
                    ALT: 18,
                    ESC: 27,
                    SPACE: 32,
                    PAGE_UP: 33,
                    PAGE_DOWN: 34,
                    END: 35,
                    HOME: 36,
                    LEFT: 37,
                    UP: 38,
                    RIGHT: 39,
                    DOWN: 40,
                    DELETE: 46
                };
                return t
            }), e.define("select2/selection/base", ["jquery", "../utils", "../keys"], function (t, e, i) {
                function n(t, e) {
                    this.$element = t, this.options = e, n.__super__.constructor.call(this)
                }

                return e.Extend(n, e.Observable), n.prototype.render = function () {
                    var e = t('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');
                    return this._tabindex = 0, null != this.$element.data("old-tabindex") ? this._tabindex = this.$element.data("old-tabindex") : null != this.$element.attr("tabindex") && (this._tabindex = this.$element.attr("tabindex")), e.attr("title", this.$element.attr("title")), e.attr("tabindex", this._tabindex), this.$selection = e, e
                }, n.prototype.bind = function (t, e) {
                    var n = this, r = (t.id + "-container", t.id + "-results");
                    this.container = t, this.$selection.on("focus", function (t) {
                        n.trigger("focus", t)
                    }), this.$selection.on("blur", function (t) {
                        n._handleBlur(t)
                    }), this.$selection.on("keydown", function (t) {
                        n.trigger("keypress", t), t.which === i.SPACE && t.preventDefault()
                    }), t.on("results:focus", function (t) {
                        n.$selection.attr("aria-activedescendant", t.data._resultId)
                    }), t.on("selection:update", function (t) {
                        n.update(t.data)
                    }), t.on("open", function () {
                        n.$selection.attr("aria-expanded", "true"), n.$selection.attr("aria-owns", r), n._attachCloseHandler(t)
                    }), t.on("close", function () {
                        n.$selection.attr("aria-expanded", "false"), n.$selection.removeAttr("aria-activedescendant"), n.$selection.removeAttr("aria-owns"), n.$selection.focus(), n._detachCloseHandler(t)
                    }), t.on("enable", function () {
                        n.$selection.attr("tabindex", n._tabindex)
                    }), t.on("disable", function () {
                        n.$selection.attr("tabindex", "-1")
                    })
                }, n.prototype._handleBlur = function (e) {
                    var i = this;
                    window.setTimeout(function () {
                        document.activeElement == i.$selection[0] || t.contains(i.$selection[0], document.activeElement) || i.trigger("blur", e)
                    }, 1)
                }, n.prototype._attachCloseHandler = function (e) {
                    t(document.body).on("mousedown.select2." + e.id, function (e) {
                        var i = t(e.target), n = i.closest(".select2"), r = t(".select2.select2-container--open");
                        r.each(function () {
                            var e = t(this);
                            if (this != n[0]) {
                                var i = e.data("element");
                                i.select2("close")
                            }
                        })
                    })
                }, n.prototype._detachCloseHandler = function (e) {
                    t(document.body).off("mousedown.select2." + e.id)
                }, n.prototype.position = function (t, e) {
                    var i = e.find(".selection");
                    i.append(t)
                }, n.prototype.destroy = function () {
                    this._detachCloseHandler(this.container)
                }, n.prototype.update = function (t) {
                    throw new Error("The `update` method must be defined in child classes.")
                }, n
            }), e.define("select2/selection/single", ["jquery", "./base", "../utils", "../keys"], function (t, e, i, n) {
                function r() {
                    r.__super__.constructor.apply(this, arguments)
                }

                return i.Extend(r, e), r.prototype.render = function () {
                    var t = r.__super__.render.call(this);
                    return t.addClass("select2-selection--single"), t.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'), t
                }, r.prototype.bind = function (t, e) {
                    var i = this;
                    r.__super__.bind.apply(this, arguments);
                    var n = t.id + "-container";
                    this.$selection.find(".select2-selection__rendered").attr("id", n), this.$selection.attr("aria-labelledby", n), this.$selection.on("mousedown", function (t) {
                        1 === t.which && i.trigger("toggle", {originalEvent: t})
                    }), this.$selection.on("focus", function (t) {
                    }), this.$selection.on("blur", function (t) {
                    }), t.on("selection:update", function (t) {
                        i.update(t.data)
                    })
                }, r.prototype.clear = function () {
                    this.$selection.find(".select2-selection__rendered").empty()
                }, r.prototype.display = function (t, e) {
                    var i = this.options.get("templateSelection"), n = this.options.get("escapeMarkup");
                    return n(i(t, e))
                }, r.prototype.selectionContainer = function () {
                    return t("<span></span>")
                }, r.prototype.update = function (t) {
                    if (0 === t.length) return void this.clear();
                    var e = t[0], i = this.$selection.find(".select2-selection__rendered"), n = this.display(e, i);
                    i.empty().append(n), i.prop("title", e.title || e.text)
                }, r
            }), e.define("select2/selection/multiple", ["jquery", "./base", "../utils"], function (t, e, i) {
                function n(t, e) {
                    n.__super__.constructor.apply(this, arguments)
                }

                return i.Extend(n, e), n.prototype.render = function () {
                    var t = n.__super__.render.call(this);
                    return t.addClass("select2-selection--multiple"), t.html('<ul class="select2-selection__rendered"></ul>'), t
                }, n.prototype.bind = function (e, i) {
                    var r = this;
                    n.__super__.bind.apply(this, arguments), this.$selection.on("click", function (t) {
                        r.trigger("toggle", {originalEvent: t})
                    }), this.$selection.on("click", ".select2-selection__choice__remove", function (e) {
                        if (!r.options.get("disabled")) {
                            var i = t(this), n = i.parent(), a = n.data("data");
                            r.trigger("unselect", {originalEvent: e, data: a})
                        }
                    })
                }, n.prototype.clear = function () {
                    this.$selection.find(".select2-selection__rendered").empty()
                }, n.prototype.display = function (t, e) {
                    var i = this.options.get("templateSelection"), n = this.options.get("escapeMarkup");
                    return n(i(t, e))
                }, n.prototype.selectionContainer = function () {
                    var e = t('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>');
                    return e
                }, n.prototype.update = function (t) {
                    if (this.clear(), 0 !== t.length) {
                        for (var e = [], n = 0; n < t.length; n++) {
                            var r = t[n], a = this.selectionContainer(), s = this.display(r, a);
                            a.append(s), a.prop("title", r.title || r.text), a.data("data", r), e.push(a)
                        }
                        var o = this.$selection.find(".select2-selection__rendered");
                        i.appendMany(o, e)
                    }
                }, n
            }), e.define("select2/selection/placeholder", ["../utils"], function (t) {
                function e(t, e, i) {
                    this.placeholder = this.normalizePlaceholder(i.get("placeholder")), t.call(this, e, i)
                }

                return e.prototype.normalizePlaceholder = function (t, e) {
                    return "string" == typeof e && (e = {id: "", text: e}), e
                }, e.prototype.createPlaceholder = function (t, e) {
                    var i = this.selectionContainer();
                    return i.html(this.display(e)), i.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"), i
                }, e.prototype.update = function (t, e) {
                    var i = 1 == e.length && e[0].id != this.placeholder.id, n = e.length > 1;
                    if (n || i) return t.call(this, e);
                    this.clear();
                    var r = this.createPlaceholder(this.placeholder);
                    this.$selection.find(".select2-selection__rendered").append(r)
                }, e
            }), e.define("select2/selection/allowClear", ["jquery", "../keys"], function (t, e) {
                function i() {
                }

                return i.prototype.bind = function (t, e, i) {
                    var n = this;
                    t.call(this, e, i), null == this.placeholder && this.options.get("debug") && window.console && console.error && console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."), this.$selection.on("mousedown", ".select2-selection__clear", function (t) {
                        n._handleClear(t)
                    }), e.on("keypress", function (t) {
                        n._handleKeyboardClear(t, e)
                    })
                }, i.prototype._handleClear = function (t, e) {
                    if (!this.options.get("disabled")) {
                        var i = this.$selection.find(".select2-selection__clear");
                        if (0 !== i.length) {
                            e.stopPropagation();
                            for (var n = i.data("data"), r = 0; r < n.length; r++) {
                                var a = {data: n[r]};
                                if (this.trigger("unselect", a), a.prevented) return
                            }
                            this.$element.val(this.placeholder.id).trigger("change"), this.trigger("toggle", {})
                        }
                    }
                }, i.prototype._handleKeyboardClear = function (t, i, n) {
                    n.isOpen() || (i.which == e.DELETE || i.which == e.BACKSPACE) && this._handleClear(i)
                }, i.prototype.update = function (e, i) {
                    if (e.call(this, i), !(this.$selection.find(".select2-selection__placeholder").length > 0 || 0 === i.length)) {
                        var n = t('<span class="select2-selection__clear">&times;</span>');
                        n.data("data", i), this.$selection.find(".select2-selection__rendered").prepend(n)
                    }
                }, i
            }), e.define("select2/selection/search", ["jquery", "../utils", "../keys"], function (t, e, i) {
                function n(t, e, i) {
                    t.call(this, e, i)
                }

                return n.prototype.render = function (e) {
                    var i = t('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>');
                    this.$searchContainer = i, this.$search = i.find("input");
                    var n = e.call(this);
                    return this._transferTabIndex(), n
                }, n.prototype.bind = function (t, e, n) {
                    var r = this;
                    t.call(this, e, n), e.on("open", function () {
                        r.$search.trigger("focus")
                    }), e.on("close", function () {
                        r.$search.val(""), r.$search.removeAttr("aria-activedescendant"), r.$search.trigger("focus")
                    }), e.on("enable", function () {
                        r.$search.prop("disabled", !1), r._transferTabIndex()
                    }), e.on("disable", function () {
                        r.$search.prop("disabled", !0)
                    }), e.on("focus", function (t) {
                        r.$search.trigger("focus")
                    }), e.on("results:focus", function (t) {
                        r.$search.attr("aria-activedescendant", t.id)
                    }), this.$selection.on("focusin", ".select2-search--inline", function (t) {
                        r.trigger("focus", t)
                    }), this.$selection.on("focusout", ".select2-search--inline", function (t) {
                        r._handleBlur(t)
                    }), this.$selection.on("keydown", ".select2-search--inline", function (t) {
                        t.stopPropagation(), r.trigger("keypress", t), r._keyUpPrevented = t.isDefaultPrevented();
                        var e = t.which;
                        if (e === i.BACKSPACE && "" === r.$search.val()) {
                            var n = r.$searchContainer.prev(".select2-selection__choice");
                            if (n.length > 0) {
                                var a = n.data("data");
                                r.searchRemoveChoice(a), t.preventDefault()
                            }
                        }
                    });
                    var a = document.documentMode, s = a && 11 >= a;
                    this.$selection.on("input.searchcheck", ".select2-search--inline", function (t) {
                        return s ? void r.$selection.off("input.search input.searchcheck") : void r.$selection.off("keyup.search")
                    }), this.$selection.on("keyup.search input.search", ".select2-search--inline", function (t) {
                        if (s && "input" === t.type) return void r.$selection.off("input.search input.searchcheck");
                        var e = t.which;
                        e != i.SHIFT && e != i.CTRL && e != i.ALT && e != i.TAB && r.handleSearch(t)
                    })
                }, n.prototype._transferTabIndex = function (t) {
                    this.$search.attr("tabindex", this.$selection.attr("tabindex")), this.$selection.attr("tabindex", "-1")
                }, n.prototype.createPlaceholder = function (t, e) {
                    this.$search.attr("placeholder", e.text)
                }, n.prototype.update = function (t, e) {
                    var i = this.$search[0] == document.activeElement;
                    this.$search.attr("placeholder", ""), t.call(this, e), this.$selection.find(".select2-selection__rendered").append(this.$searchContainer), this.resizeSearch(), i && this.$search.focus()
                }, n.prototype.handleSearch = function () {
                    if (this.resizeSearch(), !this._keyUpPrevented) {
                        var t = this.$search.val();
                        this.trigger("query", {term: t})
                    }
                    this._keyUpPrevented = !1
                }, n.prototype.searchRemoveChoice = function (t, e) {
                    this.trigger("unselect", {data: e}), this.$search.val(e.text), this.handleSearch()
                }, n.prototype.resizeSearch = function () {
                    this.$search.css("width", "25px");
                    var t = "";
                    if ("" !== this.$search.attr("placeholder")) t = this.$selection.find(".select2-selection__rendered").innerWidth(); else {
                        var e = this.$search.val().length + 1;
                        t = .75 * e + "em"
                    }
                    this.$search.css("width", t)
                }, n
            }), e.define("select2/selection/eventRelay", ["jquery"], function (t) {
                function e() {
                }

                return e.prototype.bind = function (e, i, n) {
                    var r = this,
                        a = ["open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting"],
                        s = ["opening", "closing", "selecting", "unselecting"];
                    e.call(this, i, n), i.on("*", function (e, i) {
                        if (-1 !== t.inArray(e, a)) {
                            i = i || {};
                            var n = t.Event("select2:" + e, {params: i});
                            r.$element.trigger(n), -1 !== t.inArray(e, s) && (i.prevented = n.isDefaultPrevented())
                        }
                    })
                }, e
            }), e.define("select2/translation", ["jquery", "require"], function (t, e) {
                function i(t) {
                    this.dict = t || {}
                }

                return i.prototype.all = function () {
                    return this.dict
                }, i.prototype.get = function (t) {
                    return this.dict[t]
                }, i.prototype.extend = function (e) {
                    this.dict = t.extend({}, e.all(), this.dict)
                }, i._cache = {}, i.loadPath = function (t) {
                    if (!(t in i._cache)) {
                        var n = e(t);
                        i._cache[t] = n
                    }
                    return new i(i._cache[t])
                }, i
            }), e.define("select2/diacritics", [], function () {
                var t = {
                    "Ⓐ": "A",
                    "Ａ": "A",
                    "À": "A",
                    "Á": "A",
                    "Â": "A",
                    "Ầ": "A",
                    "Ấ": "A",
                    "Ẫ": "A",
                    "Ẩ": "A",
                    "Ã": "A",
                    "Ā": "A",
                    "Ă": "A",
                    "Ằ": "A",
                    "Ắ": "A",
                    "Ẵ": "A",
                    "Ẳ": "A",
                    "Ȧ": "A",
                    "Ǡ": "A",
                    "Ä": "A",
                    "Ǟ": "A",
                    "Ả": "A",
                    "Å": "A",
                    "Ǻ": "A",
                    "Ǎ": "A",
                    "Ȁ": "A",
                    "Ȃ": "A",
                    "Ạ": "A",
                    "Ậ": "A",
                    "Ặ": "A",
                    "Ḁ": "A",
                    "Ą": "A",
                    "Ⱥ": "A",
                    "Ɐ": "A",
                    "Ꜳ": "AA",
                    "Æ": "AE",
                    "Ǽ": "AE",
                    "Ǣ": "AE",
                    "Ꜵ": "AO",
                    "Ꜷ": "AU",
                    "Ꜹ": "AV",
                    "Ꜻ": "AV",
                    "Ꜽ": "AY",
                    "Ⓑ": "B",
                    "Ｂ": "B",
                    "Ḃ": "B",
                    "Ḅ": "B",
                    "Ḇ": "B",
                    "Ƀ": "B",
                    "Ƃ": "B",
                    "Ɓ": "B",
                    "Ⓒ": "C",
                    "Ｃ": "C",
                    "Ć": "C",
                    "Ĉ": "C",
                    "Ċ": "C",
                    "Č": "C",
                    "Ç": "C",
                    "Ḉ": "C",
                    "Ƈ": "C",
                    "Ȼ": "C",
                    "Ꜿ": "C",
                    "Ⓓ": "D",
                    "Ｄ": "D",
                    "Ḋ": "D",
                    "Ď": "D",
                    "Ḍ": "D",
                    "Ḑ": "D",
                    "Ḓ": "D",
                    "Ḏ": "D",
                    "Đ": "D",
                    "Ƌ": "D",
                    "Ɗ": "D",
                    "Ɖ": "D",
                    "Ꝺ": "D",
                    "Ǳ": "DZ",
                    "Ǆ": "DZ",
                    "ǲ": "Dz",
                    "ǅ": "Dz",
                    "Ⓔ": "E",
                    "Ｅ": "E",
                    "È": "E",
                    "É": "E",
                    "Ê": "E",
                    "Ề": "E",
                    "Ế": "E",
                    "Ễ": "E",
                    "Ể": "E",
                    "Ẽ": "E",
                    "Ē": "E",
                    "Ḕ": "E",
                    "Ḗ": "E",
                    "Ĕ": "E",
                    "Ė": "E",
                    "Ë": "E",
                    "Ẻ": "E",
                    "Ě": "E",
                    "Ȅ": "E",
                    "Ȇ": "E",
                    "Ẹ": "E",
                    "Ệ": "E",
                    "Ȩ": "E",
                    "Ḝ": "E",
                    "Ę": "E",
                    "Ḙ": "E",
                    "Ḛ": "E",
                    "Ɛ": "E",
                    "Ǝ": "E",
                    "Ⓕ": "F",
                    "Ｆ": "F",
                    "Ḟ": "F",
                    "Ƒ": "F",
                    "Ꝼ": "F",
                    "Ⓖ": "G",
                    "Ｇ": "G",
                    "Ǵ": "G",
                    "Ĝ": "G",
                    "Ḡ": "G",
                    "Ğ": "G",
                    "Ġ": "G",
                    "Ǧ": "G",
                    "Ģ": "G",
                    "Ǥ": "G",
                    "Ɠ": "G",
                    "Ꞡ": "G",
                    "Ᵹ": "G",
                    "Ꝿ": "G",
                    "Ⓗ": "H",
                    "Ｈ": "H",
                    "Ĥ": "H",
                    "Ḣ": "H",
                    "Ḧ": "H",
                    "Ȟ": "H",
                    "Ḥ": "H",
                    "Ḩ": "H",
                    "Ḫ": "H",
                    "Ħ": "H",
                    "Ⱨ": "H",
                    "Ⱶ": "H",
                    "Ɥ": "H",
                    "Ⓘ": "I",
                    "Ｉ": "I",
                    "Ì": "I",
                    "Í": "I",
                    "Î": "I",
                    "Ĩ": "I",
                    "Ī": "I",
                    "Ĭ": "I",
                    "İ": "I",
                    "Ï": "I",
                    "Ḯ": "I",
                    "Ỉ": "I",
                    "Ǐ": "I",
                    "Ȉ": "I",
                    "Ȋ": "I",
                    "Ị": "I",
                    "Į": "I",
                    "Ḭ": "I",
                    "Ɨ": "I",
                    "Ⓙ": "J",
                    "Ｊ": "J",
                    "Ĵ": "J",
                    "Ɉ": "J",
                    "Ⓚ": "K",
                    "Ｋ": "K",
                    "Ḱ": "K",
                    "Ǩ": "K",
                    "Ḳ": "K",
                    "Ķ": "K",
                    "Ḵ": "K",
                    "Ƙ": "K",
                    "Ⱪ": "K",
                    "Ꝁ": "K",
                    "Ꝃ": "K",
                    "Ꝅ": "K",
                    "Ꞣ": "K",
                    "Ⓛ": "L",
                    "Ｌ": "L",
                    "Ŀ": "L",
                    "Ĺ": "L",
                    "Ľ": "L",
                    "Ḷ": "L",
                    "Ḹ": "L",
                    "Ļ": "L",
                    "Ḽ": "L",
                    "Ḻ": "L",
                    "Ł": "L",
                    "Ƚ": "L",
                    "Ɫ": "L",
                    "Ⱡ": "L",
                    "Ꝉ": "L",
                    "Ꝇ": "L",
                    "Ꞁ": "L",
                    "Ǉ": "LJ",
                    "ǈ": "Lj",
                    "Ⓜ": "M",
                    "Ｍ": "M",
                    "Ḿ": "M",
                    "Ṁ": "M",
                    "Ṃ": "M",
                    "Ɱ": "M",
                    "Ɯ": "M",
                    "Ⓝ": "N",
                    "Ｎ": "N",
                    "Ǹ": "N",
                    "Ń": "N",
                    "Ñ": "N",
                    "Ṅ": "N",
                    "Ň": "N",
                    "Ṇ": "N",
                    "Ņ": "N",
                    "Ṋ": "N",
                    "Ṉ": "N",
                    "Ƞ": "N",
                    "Ɲ": "N",
                    "Ꞑ": "N",
                    "Ꞥ": "N",
                    "Ǌ": "NJ",
                    "ǋ": "Nj",
                    "Ⓞ": "O",
                    "Ｏ": "O",
                    "Ò": "O",
                    "Ó": "O",
                    "Ô": "O",
                    "Ồ": "O",
                    "Ố": "O",
                    "Ỗ": "O",
                    "Ổ": "O",
                    "Õ": "O",
                    "Ṍ": "O",
                    "Ȭ": "O",
                    "Ṏ": "O",
                    "Ō": "O",
                    "Ṑ": "O",
                    "Ṓ": "O",
                    "Ŏ": "O",
                    "Ȯ": "O",
                    "Ȱ": "O",
                    "Ö": "O",
                    "Ȫ": "O",
                    "Ỏ": "O",
                    "Ő": "O",
                    "Ǒ": "O",
                    "Ȍ": "O",
                    "Ȏ": "O",
                    "Ơ": "O",
                    "Ờ": "O",
                    "Ớ": "O",
                    "Ỡ": "O",
                    "Ở": "O",
                    "Ợ": "O",
                    "Ọ": "O",
                    "Ộ": "O",
                    "Ǫ": "O",
                    "Ǭ": "O",
                    "Ø": "O",
                    "Ǿ": "O",
                    "Ɔ": "O",
                    "Ɵ": "O",
                    "Ꝋ": "O",
                    "Ꝍ": "O",
                    "Ƣ": "OI",
                    "Ꝏ": "OO",
                    "Ȣ": "OU",
                    "Ⓟ": "P",
                    "Ｐ": "P",
                    "Ṕ": "P",
                    "Ṗ": "P",
                    "Ƥ": "P",
                    "Ᵽ": "P",
                    "Ꝑ": "P",
                    "Ꝓ": "P",
                    "Ꝕ": "P",
                    "Ⓠ": "Q",
                    "Ｑ": "Q",
                    "Ꝗ": "Q",
                    "Ꝙ": "Q",
                    "Ɋ": "Q",
                    "Ⓡ": "R",
                    "Ｒ": "R",
                    "Ŕ": "R",
                    "Ṙ": "R",
                    "Ř": "R",
                    "Ȑ": "R",
                    "Ȓ": "R",
                    "Ṛ": "R",
                    "Ṝ": "R",
                    "Ŗ": "R",
                    "Ṟ": "R",
                    "Ɍ": "R",
                    "Ɽ": "R",
                    "Ꝛ": "R",
                    "Ꞧ": "R",
                    "Ꞃ": "R",
                    "Ⓢ": "S",
                    "Ｓ": "S",
                    "ẞ": "S",
                    "Ś": "S",
                    "Ṥ": "S",
                    "Ŝ": "S",
                    "Ṡ": "S",
                    "Š": "S",
                    "Ṧ": "S",
                    "Ṣ": "S",
                    "Ṩ": "S",
                    "Ș": "S",
                    "Ş": "S",
                    "Ȿ": "S",
                    "Ꞩ": "S",
                    "Ꞅ": "S",
                    "Ⓣ": "T",
                    "Ｔ": "T",
                    "Ṫ": "T",
                    "Ť": "T",
                    "Ṭ": "T",
                    "Ț": "T",
                    "Ţ": "T",
                    "Ṱ": "T",
                    "Ṯ": "T",
                    "Ŧ": "T",
                    "Ƭ": "T",
                    "Ʈ": "T",
                    "Ⱦ": "T",
                    "Ꞇ": "T",
                    "Ꜩ": "TZ",
                    "Ⓤ": "U",
                    "Ｕ": "U",
                    "Ù": "U",
                    "Ú": "U",
                    "Û": "U",
                    "Ũ": "U",
                    "Ṹ": "U",
                    "Ū": "U",
                    "Ṻ": "U",
                    "Ŭ": "U",
                    "Ü": "U",
                    "Ǜ": "U",
                    "Ǘ": "U",
                    "Ǖ": "U",
                    "Ǚ": "U",
                    "Ủ": "U",
                    "Ů": "U",
                    "Ű": "U",
                    "Ǔ": "U",
                    "Ȕ": "U",
                    "Ȗ": "U",
                    "Ư": "U",
                    "Ừ": "U",
                    "Ứ": "U",
                    "Ữ": "U",
                    "Ử": "U",
                    "Ự": "U",
                    "Ụ": "U",
                    "Ṳ": "U",
                    "Ų": "U",
                    "Ṷ": "U",
                    "Ṵ": "U",
                    "Ʉ": "U",
                    "Ⓥ": "V",
                    "Ｖ": "V",
                    "Ṽ": "V",
                    "Ṿ": "V",
                    "Ʋ": "V",
                    "Ꝟ": "V",
                    "Ʌ": "V",
                    "Ꝡ": "VY",
                    "Ⓦ": "W",
                    "Ｗ": "W",
                    "Ẁ": "W",
                    "Ẃ": "W",
                    "Ŵ": "W",
                    "Ẇ": "W",
                    "Ẅ": "W",
                    "Ẉ": "W",
                    "Ⱳ": "W",
                    "Ⓧ": "X",
                    "Ｘ": "X",
                    "Ẋ": "X",
                    "Ẍ": "X",
                    "Ⓨ": "Y",
                    "Ｙ": "Y",
                    "Ỳ": "Y",
                    "Ý": "Y",
                    "Ŷ": "Y",
                    "Ỹ": "Y",
                    "Ȳ": "Y",
                    "Ẏ": "Y",
                    "Ÿ": "Y",
                    "Ỷ": "Y",
                    "Ỵ": "Y",
                    "Ƴ": "Y",
                    "Ɏ": "Y",
                    "Ỿ": "Y",
                    "Ⓩ": "Z",
                    "Ｚ": "Z",
                    "Ź": "Z",
                    "Ẑ": "Z",
                    "Ż": "Z",
                    "Ž": "Z",
                    "Ẓ": "Z",
                    "Ẕ": "Z",
                    "Ƶ": "Z",
                    "Ȥ": "Z",
                    "Ɀ": "Z",
                    "Ⱬ": "Z",
                    "Ꝣ": "Z",
                    "ⓐ": "a",
                    "ａ": "a",
                    "ẚ": "a",
                    "à": "a",
                    "á": "a",
                    "â": "a",
                    "ầ": "a",
                    "ấ": "a",
                    "ẫ": "a",
                    "ẩ": "a",
                    "ã": "a",
                    "ā": "a",
                    "ă": "a",
                    "ằ": "a",
                    "ắ": "a",
                    "ẵ": "a",
                    "ẳ": "a",
                    "ȧ": "a",
                    "ǡ": "a",
                    "ä": "a",
                    "ǟ": "a",
                    "ả": "a",
                    "å": "a",
                    "ǻ": "a",
                    "ǎ": "a",
                    "ȁ": "a",
                    "ȃ": "a",
                    "ạ": "a",
                    "ậ": "a",
                    "ặ": "a",
                    "ḁ": "a",
                    "ą": "a",
                    "ⱥ": "a",
                    "ɐ": "a",
                    "ꜳ": "aa",
                    "æ": "ae",
                    "ǽ": "ae",
                    "ǣ": "ae",
                    "ꜵ": "ao",
                    "ꜷ": "au",
                    "ꜹ": "av",
                    "ꜻ": "av",
                    "ꜽ": "ay",
                    "ⓑ": "b",
                    "ｂ": "b",
                    "ḃ": "b",
                    "ḅ": "b",
                    "ḇ": "b",
                    "ƀ": "b",
                    "ƃ": "b",
                    "ɓ": "b",
                    "ⓒ": "c",
                    "ｃ": "c",
                    "ć": "c",
                    "ĉ": "c",
                    "ċ": "c",
                    "č": "c",
                    "ç": "c",
                    "ḉ": "c",
                    "ƈ": "c",
                    "ȼ": "c",
                    "ꜿ": "c",
                    "ↄ": "c",
                    "ⓓ": "d",
                    "ｄ": "d",
                    "ḋ": "d",
                    "ď": "d",
                    "ḍ": "d",
                    "ḑ": "d",
                    "ḓ": "d",
                    "ḏ": "d",
                    "đ": "d",
                    "ƌ": "d",
                    "ɖ": "d",
                    "ɗ": "d",
                    "ꝺ": "d",
                    "ǳ": "dz",
                    "ǆ": "dz",
                    "ⓔ": "e",
                    "ｅ": "e",
                    "è": "e",
                    "é": "e",
                    "ê": "e",
                    "ề": "e",
                    "ế": "e",
                    "ễ": "e",
                    "ể": "e",
                    "ẽ": "e",
                    "ē": "e",
                    "ḕ": "e",
                    "ḗ": "e",
                    "ĕ": "e",
                    "ė": "e",
                    "ë": "e",
                    "ẻ": "e",
                    "ě": "e",
                    "ȅ": "e",
                    "ȇ": "e",
                    "ẹ": "e",
                    "ệ": "e",
                    "ȩ": "e",
                    "ḝ": "e",
                    "ę": "e",
                    "ḙ": "e",
                    "ḛ": "e",
                    "ɇ": "e",
                    "ɛ": "e",
                    "ǝ": "e",
                    "ⓕ": "f",
                    "ｆ": "f",
                    "ḟ": "f",
                    "ƒ": "f",
                    "ꝼ": "f",
                    "ⓖ": "g",
                    "ｇ": "g",
                    "ǵ": "g",
                    "ĝ": "g",
                    "ḡ": "g",
                    "ğ": "g",
                    "ġ": "g",
                    "ǧ": "g",
                    "ģ": "g",
                    "ǥ": "g",
                    "ɠ": "g",
                    "ꞡ": "g",
                    "ᵹ": "g",
                    "ꝿ": "g",
                    "ⓗ": "h",
                    "ｈ": "h",
                    "ĥ": "h",
                    "ḣ": "h",
                    "ḧ": "h",
                    "ȟ": "h",
                    "ḥ": "h",
                    "ḩ": "h",
                    "ḫ": "h",
                    "ẖ": "h",
                    "ħ": "h",
                    "ⱨ": "h",
                    "ⱶ": "h",
                    "ɥ": "h",
                    "ƕ": "hv",
                    "ⓘ": "i",
                    "ｉ": "i",
                    "ì": "i",
                    "í": "i",
                    "î": "i",
                    "ĩ": "i",
                    "ī": "i",
                    "ĭ": "i",
                    "ï": "i",
                    "ḯ": "i",
                    "ỉ": "i",
                    "ǐ": "i",
                    "ȉ": "i",
                    "ȋ": "i",
                    "ị": "i",
                    "į": "i",
                    "ḭ": "i",
                    "ɨ": "i",
                    "ı": "i",
                    "ⓙ": "j",
                    "ｊ": "j",
                    "ĵ": "j",
                    "ǰ": "j",
                    "ɉ": "j",
                    "ⓚ": "k",
                    "ｋ": "k",
                    "ḱ": "k",
                    "ǩ": "k",
                    "ḳ": "k",
                    "ķ": "k",
                    "ḵ": "k",
                    "ƙ": "k",
                    "ⱪ": "k",
                    "ꝁ": "k",
                    "ꝃ": "k",
                    "ꝅ": "k",
                    "ꞣ": "k",
                    "ⓛ": "l",
                    "ｌ": "l",
                    "ŀ": "l",
                    "ĺ": "l",
                    "ľ": "l",
                    "ḷ": "l",
                    "ḹ": "l",
                    "ļ": "l",
                    "ḽ": "l",
                    "ḻ": "l",
                    "ſ": "l",
                    "ł": "l",
                    "ƚ": "l",
                    "ɫ": "l",
                    "ⱡ": "l",
                    "ꝉ": "l",
                    "ꞁ": "l",
                    "ꝇ": "l",
                    "ǉ": "lj",
                    "ⓜ": "m",
                    "ｍ": "m",
                    "ḿ": "m",
                    "ṁ": "m",
                    "ṃ": "m",
                    "ɱ": "m",
                    "ɯ": "m",
                    "ⓝ": "n",
                    "ｎ": "n",
                    "ǹ": "n",
                    "ń": "n",
                    "ñ": "n",
                    "ṅ": "n",
                    "ň": "n",
                    "ṇ": "n",
                    "ņ": "n",
                    "ṋ": "n",
                    "ṉ": "n",
                    "ƞ": "n",
                    "ɲ": "n",
                    "ŉ": "n",
                    "ꞑ": "n",
                    "ꞥ": "n",
                    "ǌ": "nj",
                    "ⓞ": "o",
                    "ｏ": "o",
                    "ò": "o",
                    "ó": "o",
                    "ô": "o",
                    "ồ": "o",
                    "ố": "o",
                    "ỗ": "o",
                    "ổ": "o",
                    "õ": "o",
                    "ṍ": "o",
                    "ȭ": "o",
                    "ṏ": "o",
                    "ō": "o",
                    "ṑ": "o",
                    "ṓ": "o",
                    "ŏ": "o",
                    "ȯ": "o",
                    "ȱ": "o",
                    "ö": "o",
                    "ȫ": "o",
                    "ỏ": "o",
                    "ő": "o",
                    "ǒ": "o",
                    "ȍ": "o",
                    "ȏ": "o",
                    "ơ": "o",
                    "ờ": "o",
                    "ớ": "o",
                    "ỡ": "o",
                    "ở": "o",
                    "ợ": "o",
                    "ọ": "o",
                    "ộ": "o",
                    "ǫ": "o",
                    "ǭ": "o",
                    "ø": "o",
                    "ǿ": "o",
                    "ɔ": "o",
                    "ꝋ": "o",
                    "ꝍ": "o",
                    "ɵ": "o",
                    "ƣ": "oi",
                    "ȣ": "ou",
                    "ꝏ": "oo",
                    "ⓟ": "p",
                    "ｐ": "p",
                    "ṕ": "p",
                    "ṗ": "p",
                    "ƥ": "p",
                    "ᵽ": "p",
                    "ꝑ": "p",
                    "ꝓ": "p",
                    "ꝕ": "p",
                    "ⓠ": "q",
                    "ｑ": "q",
                    "ɋ": "q",
                    "ꝗ": "q",
                    "ꝙ": "q",
                    "ⓡ": "r",
                    "ｒ": "r",
                    "ŕ": "r",
                    "ṙ": "r",
                    "ř": "r",
                    "ȑ": "r",
                    "ȓ": "r",
                    "ṛ": "r",
                    "ṝ": "r",
                    "ŗ": "r",
                    "ṟ": "r",
                    "ɍ": "r",
                    "ɽ": "r",
                    "ꝛ": "r",
                    "ꞧ": "r",
                    "ꞃ": "r",
                    "ⓢ": "s",
                    "ｓ": "s",
                    "ß": "s",
                    "ś": "s",
                    "ṥ": "s",
                    "ŝ": "s",
                    "ṡ": "s",
                    "š": "s",
                    "ṧ": "s",
                    "ṣ": "s",
                    "ṩ": "s",
                    "ș": "s",
                    "ş": "s",
                    "ȿ": "s",
                    "ꞩ": "s",
                    "ꞅ": "s",
                    "ẛ": "s",
                    "ⓣ": "t",
                    "ｔ": "t",
                    "ṫ": "t",
                    "ẗ": "t",
                    "ť": "t",
                    "ṭ": "t",
                    "ț": "t",
                    "ţ": "t",
                    "ṱ": "t",
                    "ṯ": "t",
                    "ŧ": "t",
                    "ƭ": "t",
                    "ʈ": "t",
                    "ⱦ": "t",
                    "ꞇ": "t",
                    "ꜩ": "tz",
                    "ⓤ": "u",
                    "ｕ": "u",
                    "ù": "u",
                    "ú": "u",
                    "û": "u",
                    "ũ": "u",
                    "ṹ": "u",
                    "ū": "u",
                    "ṻ": "u",
                    "ŭ": "u",
                    "ü": "u",
                    "ǜ": "u",
                    "ǘ": "u",
                    "ǖ": "u",
                    "ǚ": "u",
                    "ủ": "u",
                    "ů": "u",
                    "ű": "u",
                    "ǔ": "u",
                    "ȕ": "u",
                    "ȗ": "u",
                    "ư": "u",
                    "ừ": "u",
                    "ứ": "u",
                    "ữ": "u",
                    "ử": "u",
                    "ự": "u",
                    "ụ": "u",
                    "ṳ": "u",
                    "ų": "u",
                    "ṷ": "u",
                    "ṵ": "u",
                    "ʉ": "u",
                    "ⓥ": "v",
                    "ｖ": "v",
                    "ṽ": "v",
                    "ṿ": "v",
                    "ʋ": "v",
                    "ꝟ": "v",
                    "ʌ": "v",
                    "ꝡ": "vy",
                    "ⓦ": "w",
                    "ｗ": "w",
                    "ẁ": "w",
                    "ẃ": "w",
                    "ŵ": "w",
                    "ẇ": "w",
                    "ẅ": "w",
                    "ẘ": "w",
                    "ẉ": "w",
                    "ⱳ": "w",
                    "ⓧ": "x",
                    "ｘ": "x",
                    "ẋ": "x",
                    "ẍ": "x",
                    "ⓨ": "y",
                    "ｙ": "y",
                    "ỳ": "y",
                    "ý": "y",
                    "ŷ": "y",
                    "ỹ": "y",
                    "ȳ": "y",
                    "ẏ": "y",
                    "ÿ": "y",
                    "ỷ": "y",
                    "ẙ": "y",
                    "ỵ": "y",
                    "ƴ": "y",
                    "ɏ": "y",
                    "ỿ": "y",
                    "ⓩ": "z",
                    "ｚ": "z",
                    "ź": "z",
                    "ẑ": "z",
                    "ż": "z",
                    "ž": "z",
                    "ẓ": "z",
                    "ẕ": "z",
                    "ƶ": "z",
                    "ȥ": "z",
                    "ɀ": "z",
                    "ⱬ": "z",
                    "ꝣ": "z",
                    "Ά": "Α",
                    "Έ": "Ε",
                    "Ή": "Η",
                    "Ί": "Ι",
                    "Ϊ": "Ι",
                    "Ό": "Ο",
                    "Ύ": "Υ",
                    "Ϋ": "Υ",
                    "Ώ": "Ω",
                    "ά": "α",
                    "έ": "ε",
                    "ή": "η",
                    "ί": "ι",
                    "ϊ": "ι",
                    "ΐ": "ι",
                    "ό": "ο",
                    "ύ": "υ",
                    "ϋ": "υ",
                    "ΰ": "υ",
                    "ω": "ω",
                    "ς": "σ"
                };
                return t
            }), e.define("select2/data/base", ["../utils"], function (t) {
                function e(t, i) {
                    e.__super__.constructor.call(this)
                }

                return t.Extend(e, t.Observable), e.prototype.current = function (t) {
                    throw new Error("The `current` method must be defined in child classes.")
                }, e.prototype.query = function (t, e) {
                    throw new Error("The `query` method must be defined in child classes.")
                }, e.prototype.bind = function (t, e) {
                }, e.prototype.destroy = function () {
                }, e.prototype.generateResultId = function (e, i) {
                    var n = e.id + "-result-";
                    return n += t.generateChars(4), n += null != i.id ? "-" + i.id.toString() : "-" + t.generateChars(4)
                }, e
            }), e.define("select2/data/select", ["./base", "../utils", "jquery"], function (t, e, i) {
                function n(t, e) {
                    this.$element = t, this.options = e, n.__super__.constructor.call(this)
                }

                return e.Extend(n, t), n.prototype.current = function (t) {
                    var e = [], n = this;
                    this.$element.find(":selected").each(function () {
                        var t = i(this), r = n.item(t);
                        e.push(r)
                    }), t(e)
                }, n.prototype.select = function (t) {
                    var e = this;
                    if (t.selected = !0, i(t.element).is("option")) return t.element.selected = !0, void this.$element.trigger("change");
                    if (this.$element.prop("multiple")) this.current(function (n) {
                        var r = [];
                        t = [t], t.push.apply(t, n);
                        for (var a = 0; a < t.length; a++) {
                            var s = t[a].id;
                            -1 === i.inArray(s, r) && r.push(s)
                        }
                        e.$element.val(r), e.$element.trigger("change")
                    }); else {
                        var n = t.id;
                        this.$element.val(n), this.$element.trigger("change")
                    }
                }, n.prototype.unselect = function (t) {
                    var e = this;
                    return this.$element.prop("multiple") ? (t.selected = !1, i(t.element).is("option") ? (t.element.selected = !1, void this.$element.trigger("change")) : void this.current(function (n) {
                        for (var r = [], a = 0; a < n.length; a++) {
                            var s = n[a].id;
                            s !== t.id && -1 === i.inArray(s, r) && r.push(s)
                        }
                        e.$element.val(r), e.$element.trigger("change")
                    })) : void 0
                }, n.prototype.bind = function (t, e) {
                    var i = this;
                    this.container = t, t.on("select", function (t) {
                        i.select(t.data)
                    }), t.on("unselect", function (t) {
                        i.unselect(t.data)
                    })
                }, n.prototype.destroy = function () {
                    this.$element.find("*").each(function () {
                        i.removeData(this, "data")
                    })
                }, n.prototype.query = function (t, e) {
                    var n = [], r = this, a = this.$element.children();
                    a.each(function () {
                        var e = i(this);
                        if (e.is("option") || e.is("optgroup")) {
                            var a = r.item(e), s = r.matches(t, a);
                            null !== s && n.push(s)
                        }
                    }), e({results: n})
                }, n.prototype.addOptions = function (t) {
                    e.appendMany(this.$element, t)
                }, n.prototype.option = function (t) {
                    var e;
                    t.children ? (e = document.createElement("optgroup"), e.label = t.text) : (e = document.createElement("option"), void 0 !== e.textContent ? e.textContent = t.text : e.innerText = t.text), t.id && (e.value = t.id), t.disabled && (e.disabled = !0), t.selected && (e.selected = !0), t.title && (e.title = t.title);
                    var n = i(e), r = this._normalizeItem(t);
                    return r.element = e, i.data(e, "data", r), n
                }, n.prototype.item = function (t) {
                    var e = {};
                    if (e = i.data(t[0], "data"), null != e) return e;
                    if (t.is("option")) e = {
                        id: t.val(),
                        text: t.text(),
                        disabled: t.prop("disabled"),
                        selected: t.prop("selected"),
                        title: t.prop("title")
                    }; else if (t.is("optgroup")) {
                        e = {text: t.prop("label"), children: [], title: t.prop("title")};
                        for (var n = t.children("option"), r = [], a = 0; a < n.length; a++) {
                            var s = i(n[a]), o = this.item(s);
                            r.push(o)
                        }
                        e.children = r
                    }
                    return e = this._normalizeItem(e), e.element = t[0], i.data(t[0], "data", e), e
                }, n.prototype._normalizeItem = function (t) {
                    i.isPlainObject(t) || (t = {id: t, text: t}), t = i.extend({}, {text: ""}, t);
                    var e = {selected: !1, disabled: !1};
                    return null != t.id && (t.id = t.id.toString()), null != t.text && (t.text = t.text.toString()), null == t._resultId && t.id && null != this.container && (t._resultId = this.generateResultId(this.container, t)), i.extend({}, e, t)
                }, n.prototype.matches = function (t, e) {
                    var i = this.options.get("matcher");
                    return i(t, e)
                }, n
            }), e.define("select2/data/array", ["./select", "../utils", "jquery"], function (t, e, i) {
                function n(t, e) {
                    var i = e.get("data") || [];
                    n.__super__.constructor.call(this, t, e), this.addOptions(this.convertToOptions(i))
                }

                return e.Extend(n, t), n.prototype.select = function (t) {
                    var e = this.$element.find("option").filter(function (e, i) {
                        return i.value == t.id.toString()
                    });
                    0 === e.length && (e = this.option(t), this.addOptions(e)), n.__super__.select.call(this, t)
                }, n.prototype.convertToOptions = function (t) {
                    function n(t) {
                        return function () {
                            return i(this).val() == t.id
                        }
                    }

                    for (var r = this, a = this.$element.find("option"), s = a.map(function () {
                        return r.item(i(this)).id
                    }).get(), o = [], l = 0; l < t.length; l++) {
                        var d = this._normalizeItem(t[l]);
                        if (i.inArray(d.id, s) >= 0) {
                            var c = a.filter(n(d)), u = this.item(c), h = i.extend(!0, {}, u, d), p = this.option(h);
                            c.replaceWith(p)
                        } else {
                            var f = this.option(d);
                            if (d.children) {
                                var m = this.convertToOptions(d.children);
                                e.appendMany(f, m)
                            }
                            o.push(f)
                        }
                    }
                    return o
                }, n
            }), e.define("select2/data/ajax", ["./array", "../utils", "jquery"], function (t, e, i) {
                function n(t, e) {
                    this.ajaxOptions = this._applyDefaults(e.get("ajax")), null != this.ajaxOptions.processResults && (this.processResults = this.ajaxOptions.processResults), n.__super__.constructor.call(this, t, e)
                }

                return e.Extend(n, t), n.prototype._applyDefaults = function (t) {
                    var e = {
                        data: function (t) {
                            return i.extend({}, t, {q: t.term})
                        }, transport: function (t, e, n) {
                            var r = i.ajax(t);
                            return r.then(e), r.fail(n), r
                        }
                    };
                    return i.extend({}, e, t, !0)
                }, n.prototype.processResults = function (t) {
                    return t
                }, n.prototype.query = function (t, e) {
                    function n() {
                        var n = a.transport(a, function (n) {
                            var a = r.processResults(n, t);
                            r.options.get("debug") && window.console && console.error && (a && a.results && i.isArray(a.results) || console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")), e(a)
                        }, function () {
                        });
                        r._request = n
                    }

                    var r = this;
                    null != this._request && (i.isFunction(this._request.abort) && this._request.abort(), this._request = null);
                    var a = i.extend({type: "GET"}, this.ajaxOptions);
                    "function" == typeof a.url && (a.url = a.url.call(this.$element, t)), "function" == typeof a.data && (a.data = a.data.call(this.$element, t)), this.ajaxOptions.delay && "" !== t.term ? (this._queryTimeout && window.clearTimeout(this._queryTimeout), this._queryTimeout = window.setTimeout(n, this.ajaxOptions.delay)) : n()
                }, n
            }), e.define("select2/data/tags", ["jquery"], function (t) {
                function e(e, i, n) {
                    var r = n.get("tags"), a = n.get("createTag");
                    if (void 0 !== a && (this.createTag = a), e.call(this, i, n), t.isArray(r)) for (var s = 0; s < r.length; s++) {
                        var o = r[s], l = this._normalizeItem(o), d = this.option(l);
                        this.$element.append(d)
                    }
                }

                return e.prototype.query = function (t, e, i) {
                    function n(t, a) {
                        for (var s = t.results, o = 0; o < s.length; o++) {
                            var l = s[o], d = null != l.children && !n({results: l.children}, !0),
                                c = l.text === e.term;
                            if (c || d) return a ? !1 : (t.data = s, void i(t))
                        }
                        if (a) return !0;
                        var u = r.createTag(e);
                        if (null != u) {
                            var h = r.option(u);
                            h.attr("data-select2-tag", !0), r.addOptions([h]), r.insertTag(s, u)
                        }
                        t.results = s, i(t)
                    }

                    var r = this;
                    return this._removeOldTags(), null == e.term || null != e.page ? void t.call(this, e, i) : void t.call(this, e, n)
                }, e.prototype.createTag = function (e, i) {
                    var n = t.trim(i.term);
                    return "" === n ? null : {id: n, text: n}
                }, e.prototype.insertTag = function (t, e, i) {
                    e.unshift(i)
                }, e.prototype._removeOldTags = function (e) {
                    var i = (this._lastTag, this.$element.find("option[data-select2-tag]"));
                    i.each(function () {
                        this.selected || t(this).remove()
                    })
                }, e
            }), e.define("select2/data/tokenizer", ["jquery"], function (t) {
                function e(t, e, i) {
                    var n = i.get("tokenizer");
                    void 0 !== n && (this.tokenizer = n), t.call(this, e, i)
                }

                return e.prototype.bind = function (t, e, i) {
                    t.call(this, e, i), this.$search = e.dropdown.$search || e.selection.$search || i.find(".select2-search__field")
                }, e.prototype.query = function (t, e, i) {
                    function n(t) {
                        r.trigger("select", {data: t})
                    }

                    var r = this;
                    e.term = e.term || "";
                    var a = this.tokenizer(e, this.options, n);
                    a.term !== e.term && (this.$search.length && (this.$search.val(a.term), this.$search.focus()), e.term = a.term), t.call(this, e, i)
                }, e.prototype.tokenizer = function (e, i, n, r) {
                    for (var a = n.get("tokenSeparators") || [], s = i.term, o = 0, l = this.createTag || function (t) {
                        return {id: t.term, text: t.term}
                    }; o < s.length;) {
                        var d = s[o];
                        if (-1 !== t.inArray(d, a)) {
                            var c = s.substr(0, o), u = t.extend({}, i, {term: c}), h = l(u);
                            null != h ? (r(h), s = s.substr(o + 1) || "", o = 0) : o++
                        } else o++
                    }
                    return {term: s}
                }, e
            }), e.define("select2/data/minimumInputLength", [], function () {
                function t(t, e, i) {
                    this.minimumInputLength = i.get("minimumInputLength"), t.call(this, e, i)
                }

                return t.prototype.query = function (t, e, i) {
                    return e.term = e.term || "", e.term.length < this.minimumInputLength ? void this.trigger("results:message", {
                        message: "inputTooShort",
                        args: {minimum: this.minimumInputLength, input: e.term, params: e}
                    }) : void t.call(this, e, i)
                }, t
            }), e.define("select2/data/maximumInputLength", [], function () {
                function t(t, e, i) {
                    this.maximumInputLength = i.get("maximumInputLength"), t.call(this, e, i)
                }

                return t.prototype.query = function (t, e, i) {
                    return e.term = e.term || "", this.maximumInputLength > 0 && e.term.length > this.maximumInputLength ? void this.trigger("results:message", {
                        message: "inputTooLong",
                        args: {maximum: this.maximumInputLength, input: e.term, params: e}
                    }) : void t.call(this, e, i)
                }, t
            }), e.define("select2/data/maximumSelectionLength", [], function () {
                function t(t, e, i) {
                    this.maximumSelectionLength = i.get("maximumSelectionLength"), t.call(this, e, i)
                }

                return t.prototype.query = function (t, e, i) {
                    var n = this;
                    this.current(function (r) {
                        var a = null != r ? r.length : 0;
                        return n.maximumSelectionLength > 0 && a >= n.maximumSelectionLength ? void n.trigger("results:message", {
                            message: "maximumSelected",
                            args: {maximum: n.maximumSelectionLength}
                        }) : void t.call(n, e, i)
                    })
                }, t
            }), e.define("select2/dropdown", ["jquery", "./utils"], function (t, e) {
                function i(t, e) {
                    this.$element = t, this.options = e, i.__super__.constructor.call(this)
                }

                return e.Extend(i, e.Observable), i.prototype.render = function () {
                    var e = t('<span class="select2-dropdown"><span class="select2-results"></span></span>');
                    return e.attr("dir", this.options.get("dir")), this.$dropdown = e, e
                }, i.prototype.bind = function () {
                }, i.prototype.position = function (t, e) {
                }, i.prototype.destroy = function () {
                    this.$dropdown.remove()
                }, i
            }), e.define("select2/dropdown/search", ["jquery", "../utils"], function (t, e) {
                function i() {
                }

                return i.prototype.render = function (e) {
                    var i = e.call(this),
                        n = t('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></span>');
                    return this.$searchContainer = n, this.$search = n.find("input"), i.prepend(n), i
                }, i.prototype.bind = function (e, i, n) {
                    var r = this;
                    e.call(this, i, n), this.$search.on("keydown", function (t) {
                        r.trigger("keypress", t), r._keyUpPrevented = t.isDefaultPrevented()
                    }), this.$search.on("input", function (e) {
                        t(this).off("keyup")
                    }), this.$search.on("keyup input", function (t) {
                        r.handleSearch(t)
                    }), i.on("open", function () {
                        r.$search.attr("tabindex", 0), r.$search.focus(), window.setTimeout(function () {
                            r.$search.focus()
                        }, 0)
                    }), i.on("close", function () {
                        r.$search.attr("tabindex", -1), r.$search.val("")
                    }), i.on("results:all", function (t) {
                        if (null == t.query.term || "" === t.query.term) {
                            var e = r.showSearch(t);
                            e ? r.$searchContainer.removeClass("select2-search--hide") : r.$searchContainer.addClass("select2-search--hide")
                        }
                    })
                }, i.prototype.handleSearch = function (t) {
                    if (!this._keyUpPrevented) {
                        var e = this.$search.val();
                        this.trigger("query", {term: e})
                    }
                    this._keyUpPrevented = !1;
                }, i.prototype.showSearch = function (t, e) {
                    return !0
                }, i
            }), e.define("select2/dropdown/hidePlaceholder", [], function () {
                function t(t, e, i, n) {
                    this.placeholder = this.normalizePlaceholder(i.get("placeholder")), t.call(this, e, i, n)
                }

                return t.prototype.append = function (t, e) {
                    e.results = this.removePlaceholder(e.results), t.call(this, e)
                }, t.prototype.normalizePlaceholder = function (t, e) {
                    return "string" == typeof e && (e = {id: "", text: e}), e
                }, t.prototype.removePlaceholder = function (t, e) {
                    for (var i = e.slice(0), n = e.length - 1; n >= 0; n--) {
                        var r = e[n];
                        this.placeholder.id === r.id && i.splice(n, 1)
                    }
                    return i
                }, t
            }), e.define("select2/dropdown/infiniteScroll", ["jquery"], function (t) {
                function e(t, e, i, n) {
                    this.lastParams = {}, t.call(this, e, i, n), this.$loadingMore = this.createLoadingMore(), this.loading = !1
                }

                return e.prototype.append = function (t, e) {
                    this.$loadingMore.remove(), this.loading = !1, t.call(this, e), this.showLoadingMore(e) && this.$results.append(this.$loadingMore)
                }, e.prototype.bind = function (e, i, n) {
                    var r = this;
                    e.call(this, i, n), i.on("query", function (t) {
                        r.lastParams = t, r.loading = !0
                    }), i.on("query:append", function (t) {
                        r.lastParams = t, r.loading = !0
                    }), this.$results.on("scroll", function () {
                        var e = t.contains(document.documentElement, r.$loadingMore[0]);
                        if (!r.loading && e) {
                            var i = r.$results.offset().top + r.$results.outerHeight(!1),
                                n = r.$loadingMore.offset().top + r.$loadingMore.outerHeight(!1);
                            i + 50 >= n && r.loadMore()
                        }
                    })
                }, e.prototype.loadMore = function () {
                    this.loading = !0;
                    var e = t.extend({}, {page: 1}, this.lastParams);
                    e.page++, this.trigger("query:append", e)
                }, e.prototype.showLoadingMore = function (t, e) {
                    return e.pagination && e.pagination.more
                }, e.prototype.createLoadingMore = function () {
                    var e = t('<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'),
                        i = this.options.get("translations").get("loadingMore");
                    return e.html(i(this.lastParams)), e
                }, e
            }), e.define("select2/dropdown/attachBody", ["jquery", "../utils"], function (t, e) {
                function i(e, i, n) {
                    this.$dropdownParent = n.get("dropdownParent") || t(document.body), e.call(this, i, n)
                }

                return i.prototype.bind = function (t, e, i) {
                    var n = this, r = !1;
                    t.call(this, e, i), e.on("open", function () {
                        n._showDropdown(), n._attachPositioningHandler(e), r || (r = !0, e.on("results:all", function () {
                            n._positionDropdown(), n._resizeDropdown()
                        }), e.on("results:append", function () {
                            n._positionDropdown(), n._resizeDropdown()
                        }))
                    }), e.on("close", function () {
                        n._hideDropdown(), n._detachPositioningHandler(e)
                    }), this.$dropdownContainer.on("mousedown", function (t) {
                        t.stopPropagation()
                    })
                }, i.prototype.destroy = function (t) {
                    t.call(this), this.$dropdownContainer.remove()
                }, i.prototype.position = function (t, e, i) {
                    e.attr("class", i.attr("class")), e.removeClass("select2"), e.addClass("select2-container--open"), e.css({
                        position: "absolute",
                        top: -999999
                    }), this.$container = i
                }, i.prototype.render = function (e) {
                    var i = t("<span></span>"), n = e.call(this);
                    return i.append(n), this.$dropdownContainer = i, i
                }, i.prototype._hideDropdown = function (t) {
                    this.$dropdownContainer.detach()
                }, i.prototype._attachPositioningHandler = function (i, n) {
                    var r = this, a = "scroll.select2." + n.id, s = "resize.select2." + n.id,
                        o = "orientationchange.select2." + n.id, l = this.$container.parents().filter(e.hasScroll);
                    l.each(function () {
                        t(this).data("select2-scroll-position", {x: t(this).scrollLeft(), y: t(this).scrollTop()})
                    }), l.on(a, function (e) {
                        var i = t(this).data("select2-scroll-position");
                        t(this).scrollTop(i.y)
                    }), t(window).on(a + " " + s + " " + o, function (t) {
                        r._positionDropdown(), r._resizeDropdown()
                    })
                }, i.prototype._detachPositioningHandler = function (i, n) {
                    var r = "scroll.select2." + n.id, a = "resize.select2." + n.id,
                        s = "orientationchange.select2." + n.id, o = this.$container.parents().filter(e.hasScroll);
                    o.off(r), t(window).off(r + " " + a + " " + s)
                }, i.prototype._positionDropdown = function () {
                    var e = t(window), i = this.$dropdown.hasClass("select2-dropdown--above"),
                        n = this.$dropdown.hasClass("select2-dropdown--below"), r = null,
                        a = (this.$container.position(), this.$container.offset());
                    a.bottom = a.top + this.$container.outerHeight(!1);
                    var s = {height: this.$container.outerHeight(!1)};
                    s.top = a.top, s.bottom = a.top + s.height;
                    var o = {height: this.$dropdown.outerHeight(!1)},
                        l = {top: e.scrollTop(), bottom: e.scrollTop() + e.height()}, d = l.top < a.top - o.height,
                        c = l.bottom > a.bottom + o.height, u = {left: a.left, top: s.bottom};
                    if ("static" !== this.$dropdownParent[0].style.position) {
                        var h = this.$dropdownParent.offset();
                        u.top -= h.top, u.left -= h.left
                    }
                    i || n || (r = "below"), c || !d || i ? !d && c && i && (r = "below") : r = "above", ("above" == r || i && "below" !== r) && (u.top = s.top - o.height), null != r && (this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--" + r), this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--" + r)), this.$dropdownContainer.css(u)
                }, i.prototype._resizeDropdown = function () {
                    var t = {width: this.$container.outerWidth(!1) + "px"};
                    this.options.get("dropdownAutoWidth") && (t.minWidth = t.width, t.width = "auto"), this.$dropdown.css(t)
                }, i.prototype._showDropdown = function (t) {
                    this.$dropdownContainer.appendTo(this.$dropdownParent), this._positionDropdown(), this._resizeDropdown()
                }, i
            }), e.define("select2/dropdown/minimumResultsForSearch", [], function () {
                function t(e) {
                    for (var i = 0, n = 0; n < e.length; n++) {
                        var r = e[n];
                        r.children ? i += t(r.children) : i++
                    }
                    return i
                }

                function e(t, e, i, n) {
                    this.minimumResultsForSearch = i.get("minimumResultsForSearch"), this.minimumResultsForSearch < 0 && (this.minimumResultsForSearch = 1 / 0), t.call(this, e, i, n)
                }

                return e.prototype.showSearch = function (e, i) {
                    return t(i.data.results) < this.minimumResultsForSearch ? !1 : e.call(this, i)
                }, e
            }), e.define("select2/dropdown/selectOnClose", [], function () {
                function t() {
                }

                return t.prototype.bind = function (t, e, i) {
                    var n = this;
                    t.call(this, e, i), e.on("close", function () {
                        n._handleSelectOnClose()
                    })
                }, t.prototype._handleSelectOnClose = function () {
                    var t = this.getHighlightedResults();
                    if (!(t.length < 1)) {
                        var e = t.data("data");
                        null != e.element && e.element.selected || null == e.element && e.selected || this.trigger("select", {data: e})
                    }
                }, t
            }), e.define("select2/dropdown/closeOnSelect", [], function () {
                function t() {
                }

                return t.prototype.bind = function (t, e, i) {
                    var n = this;
                    t.call(this, e, i), e.on("select", function (t) {
                        n._selectTriggered(t)
                    }), e.on("unselect", function (t) {
                        n._selectTriggered(t)
                    })
                }, t.prototype._selectTriggered = function (t, e) {
                    var i = e.originalEvent;
                    i && i.ctrlKey || this.trigger("close", {})
                }, t
            }), e.define("select2/i18n/en", [], function () {
                return {
                    errorLoading: function () {
                        return "The results could not be loaded."
                    }, inputTooLong: function (t) {
                        var e = t.input.length - t.maximum, i = "Please delete " + e + " character";
                        return 1 != e && (i += "s"), i
                    }, inputTooShort: function (t) {
                        var e = t.minimum - t.input.length, i = "Please enter " + e + " or more characters";
                        return i
                    }, loadingMore: function () {
                        return "Loading more results…"
                    }, maximumSelected: function (t) {
                        var e = "You can only select " + t.maximum + " item";
                        return 1 != t.maximum && (e += "s"), e
                    }, noResults: function () {
                        return "No results found"
                    }, searching: function () {
                        return "Searching…"
                    }
                }
            }), e.define("select2/defaults", ["jquery", "require", "./results", "./selection/single", "./selection/multiple", "./selection/placeholder", "./selection/allowClear", "./selection/search", "./selection/eventRelay", "./utils", "./translation", "./diacritics", "./data/select", "./data/array", "./data/ajax", "./data/tags", "./data/tokenizer", "./data/minimumInputLength", "./data/maximumInputLength", "./data/maximumSelectionLength", "./dropdown", "./dropdown/search", "./dropdown/hidePlaceholder", "./dropdown/infiniteScroll", "./dropdown/attachBody", "./dropdown/minimumResultsForSearch", "./dropdown/selectOnClose", "./dropdown/closeOnSelect", "./i18n/en"], function (t, e, i, n, r, a, s, o, l, d, c, u, h, p, f, m, g, v, b, y, w, S, _, x, D, T, C, A, k) {
                function I() {
                    this.reset()
                }

                I.prototype.apply = function (u) {
                    if (u = t.extend({}, this.defaults, u), null == u.dataAdapter) {
                        if (null != u.ajax ? u.dataAdapter = f : null != u.data ? u.dataAdapter = p : u.dataAdapter = h, u.minimumInputLength > 0 && (u.dataAdapter = d.Decorate(u.dataAdapter, v)), u.maximumInputLength > 0 && (u.dataAdapter = d.Decorate(u.dataAdapter, b)), u.maximumSelectionLength > 0 && (u.dataAdapter = d.Decorate(u.dataAdapter, y)), u.tags && (u.dataAdapter = d.Decorate(u.dataAdapter, m)), (null != u.tokenSeparators || null != u.tokenizer) && (u.dataAdapter = d.Decorate(u.dataAdapter, g)), null != u.query) {
                            var k = e(u.amdBase + "compat/query");
                            u.dataAdapter = d.Decorate(u.dataAdapter, k)
                        }
                        if (null != u.initSelection) {
                            var I = e(u.amdBase + "compat/initSelection");
                            u.dataAdapter = d.Decorate(u.dataAdapter, I)
                        }
                    }
                    if (null == u.resultsAdapter && (u.resultsAdapter = i, null != u.ajax && (u.resultsAdapter = d.Decorate(u.resultsAdapter, x)), null != u.placeholder && (u.resultsAdapter = d.Decorate(u.resultsAdapter, _)), u.selectOnClose && (u.resultsAdapter = d.Decorate(u.resultsAdapter, C))), null == u.dropdownAdapter) {
                        if (u.multiple) u.dropdownAdapter = w; else {
                            var M = d.Decorate(w, S);
                            u.dropdownAdapter = M
                        }
                        if (0 !== u.minimumResultsForSearch && (u.dropdownAdapter = d.Decorate(u.dropdownAdapter, T)), u.closeOnSelect && (u.dropdownAdapter = d.Decorate(u.dropdownAdapter, A)), null != u.dropdownCssClass || null != u.dropdownCss || null != u.adaptDropdownCssClass) {
                            var F = e(u.amdBase + "compat/dropdownCss");
                            u.dropdownAdapter = d.Decorate(u.dropdownAdapter, F)
                        }
                        u.dropdownAdapter = d.Decorate(u.dropdownAdapter, D)
                    }
                    if (null == u.selectionAdapter) {
                        if (u.multiple ? u.selectionAdapter = r : u.selectionAdapter = n, null != u.placeholder && (u.selectionAdapter = d.Decorate(u.selectionAdapter, a)), u.allowClear && (u.selectionAdapter = d.Decorate(u.selectionAdapter, s)), u.multiple && (u.selectionAdapter = d.Decorate(u.selectionAdapter, o)), null != u.containerCssClass || null != u.containerCss || null != u.adaptContainerCssClass) {
                            var E = e(u.amdBase + "compat/containerCss");
                            u.selectionAdapter = d.Decorate(u.selectionAdapter, E)
                        }
                        u.selectionAdapter = d.Decorate(u.selectionAdapter, l)
                    }
                    if ("string" == typeof u.language) if (u.language.indexOf("-") > 0) {
                        var $ = u.language.split("-"), L = $[0];
                        u.language = [u.language, L]
                    } else u.language = [u.language];
                    if (t.isArray(u.language)) {
                        var O = new c;
                        u.language.push("en");
                        for (var V = u.language, P = 0; P < V.length; P++) {
                            var H = V[P], R = {};
                            try {
                                R = c.loadPath(H)
                            } catch (N) {
                                try {
                                    H = this.defaults.amdLanguageBase + H, R = c.loadPath(H)
                                } catch (U) {
                                    u.debug && window.console && console.warn && console.warn('Select2: The language file for "' + H + '" could not be automatically loaded. A fallback will be used instead.');
                                    continue
                                }
                            }
                            O.extend(R)
                        }
                        u.translations = O
                    } else {
                        var Y = c.loadPath(this.defaults.amdLanguageBase + "en"), j = new c(u.language);
                        j.extend(Y), u.translations = j
                    }
                    return u
                }, I.prototype.reset = function () {
                    function e(t) {
                        function e(t) {
                            return u[t] || t
                        }

                        return t.replace(/[^\u0000-\u007E]/g, e)
                    }

                    function i(n, r) {
                        if ("" === t.trim(n.term)) return r;
                        if (r.children && r.children.length > 0) {
                            for (var a = t.extend(!0, {}, r), s = r.children.length - 1; s >= 0; s--) {
                                var o = r.children[s], l = i(n, o);
                                null == l && a.children.splice(s, 1)
                            }
                            return a.children.length > 0 ? a : i(n, a)
                        }
                        var d = e(r.text).toUpperCase(), c = e(n.term).toUpperCase();
                        return d.indexOf(c) > -1 ? r : null
                    }

                    this.defaults = {
                        amdBase: "./",
                        amdLanguageBase: "./i18n/",
                        closeOnSelect: !0,
                        debug: !1,
                        dropdownAutoWidth: !1,
                        escapeMarkup: d.escapeMarkup,
                        language: k,
                        matcher: i,
                        minimumInputLength: 0,
                        maximumInputLength: 0,
                        maximumSelectionLength: 0,
                        minimumResultsForSearch: 0,
                        selectOnClose: !1,
                        sorter: function (t) {
                            return t
                        },
                        templateResult: function (t) {
                            return t.text
                        },
                        templateSelection: function (t) {
                            return t.text
                        },
                        theme: "default",
                        width: "resolve"
                    }
                }, I.prototype.set = function (e, i) {
                    var n = t.camelCase(e), r = {};
                    r[n] = i;
                    var a = d._convertData(r);
                    t.extend(this.defaults, a)
                };
                var M = new I;
                return M
            }), e.define("select2/options", ["require", "jquery", "./defaults", "./utils"], function (t, e, i, n) {
                function r(e, r) {
                    if (this.options = e, null != r && this.fromElement(r), this.options = i.apply(this.options), r && r.is("input")) {
                        var a = t(this.get("amdBase") + "compat/inputData");
                        this.options.dataAdapter = n.Decorate(this.options.dataAdapter, a)
                    }
                }

                return r.prototype.fromElement = function (t) {
                    var i = ["select2"];
                    null == this.options.multiple && (this.options.multiple = t.prop("multiple")), null == this.options.disabled && (this.options.disabled = t.prop("disabled")), null == this.options.language && (t.prop("lang") ? this.options.language = t.prop("lang").toLowerCase() : t.closest("[lang]").prop("lang") && (this.options.language = t.closest("[lang]").prop("lang"))), null == this.options.dir && (t.prop("dir") ? this.options.dir = t.prop("dir") : t.closest("[dir]").prop("dir") ? this.options.dir = t.closest("[dir]").prop("dir") : this.options.dir = "ltr"), t.prop("disabled", this.options.disabled), t.prop("multiple", this.options.multiple), t.data("select2Tags") && (this.options.debug && window.console && console.warn && console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'), t.data("data", t.data("select2Tags")), t.data("tags", !0)), t.data("ajaxUrl") && (this.options.debug && window.console && console.warn && console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."), t.attr("ajax--url", t.data("ajaxUrl")), t.data("ajax--url", t.data("ajaxUrl")));
                    var r = {};
                    r = e.fn.jquery && "1." == e.fn.jquery.substr(0, 2) && t[0].dataset ? e.extend(!0, {}, t[0].dataset, t.data()) : t.data();
                    var a = e.extend(!0, {}, r);
                    a = n._convertData(a);
                    for (var s in a) e.inArray(s, i) > -1 || (e.isPlainObject(this.options[s]) ? e.extend(this.options[s], a[s]) : this.options[s] = a[s]);
                    return this
                }, r.prototype.get = function (t) {
                    return this.options[t]
                }, r.prototype.set = function (t, e) {
                    this.options[t] = e
                }, r
            }), e.define("select2/core", ["jquery", "./options", "./utils", "./keys"], function (t, e, i, n) {
                var r = function (t, i) {
                    null != t.data("select2") && t.data("select2").destroy(), this.$element = t, this.id = this._generateId(t), i = i || {}, this.options = new e(i, t), r.__super__.constructor.call(this);
                    var n = t.attr("tabindex") || 0;
                    t.data("old-tabindex", n), t.attr("tabindex", "-1");
                    var a = this.options.get("dataAdapter");
                    this.dataAdapter = new a(t, this.options);
                    var s = this.render();
                    this._placeContainer(s);
                    var o = this.options.get("selectionAdapter");
                    this.selection = new o(t, this.options), this.$selection = this.selection.render(), this.selection.position(this.$selection, s);
                    var l = this.options.get("dropdownAdapter");
                    this.dropdown = new l(t, this.options), this.$dropdown = this.dropdown.render(), this.dropdown.position(this.$dropdown, s);
                    var d = this.options.get("resultsAdapter");
                    this.results = new d(t, this.options, this.dataAdapter), this.$results = this.results.render(), this.results.position(this.$results, this.$dropdown);
                    var c = this;
                    this._bindAdapters(), this._registerDomEvents(), this._registerDataEvents(), this._registerSelectionEvents(), this._registerDropdownEvents(), this._registerResultsEvents(), this._registerEvents(), this.dataAdapter.current(function (t) {
                        c.trigger("selection:update", {data: t})
                    }), t.addClass("select2-hidden-accessible"), t.attr("aria-hidden", "true"), this._syncAttributes(), t.data("select2", this)
                };
                return i.Extend(r, i.Observable), r.prototype._generateId = function (t) {
                    var e = "";
                    return e = null != t.attr("id") ? t.attr("id") : null != t.attr("name") ? t.attr("name") + "-" + i.generateChars(2) : i.generateChars(4), e = "select2-" + e
                }, r.prototype._placeContainer = function (t) {
                    t.insertAfter(this.$element);
                    var e = this._resolveWidth(this.$element, this.options.get("width"));
                    null != e && t.css("width", e)
                }, r.prototype._resolveWidth = function (t, e) {
                    var i = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
                    if ("resolve" == e) {
                        var n = this._resolveWidth(t, "style");
                        return null != n ? n : this._resolveWidth(t, "element")
                    }
                    if ("element" == e) {
                        var r = t.outerWidth(!1);
                        return 0 >= r ? "auto" : r + "px"
                    }
                    if ("style" == e) {
                        var a = t.attr("style");
                        if ("string" != typeof a) return null;
                        for (var s = a.split(";"), o = 0, l = s.length; l > o; o += 1) {
                            var d = s[o].replace(/\s/g, ""), c = d.match(i);
                            if (null !== c && c.length >= 1) return c[1]
                        }
                        return null
                    }
                    return e
                }, r.prototype._bindAdapters = function () {
                    this.dataAdapter.bind(this, this.$container), this.selection.bind(this, this.$container), this.dropdown.bind(this, this.$container), this.results.bind(this, this.$container)
                }, r.prototype._registerDomEvents = function () {
                    var e = this;
                    this.$element.on("change.select2", function () {
                        e.dataAdapter.current(function (t) {
                            e.trigger("selection:update", {data: t})
                        })
                    }), this._sync = i.bind(this._syncAttributes, this), this.$element[0].attachEvent && this.$element[0].attachEvent("onpropertychange", this._sync);
                    var n = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                    null != n ? (this._observer = new n(function (i) {
                        t.each(i, e._sync)
                    }), this._observer.observe(this.$element[0], {
                        attributes: !0,
                        subtree: !1
                    })) : this.$element[0].addEventListener && this.$element[0].addEventListener("DOMAttrModified", e._sync, !1)
                }, r.prototype._registerDataEvents = function () {
                    var t = this;
                    this.dataAdapter.on("*", function (e, i) {
                        t.trigger(e, i)
                    })
                }, r.prototype._registerSelectionEvents = function () {
                    var e = this, i = ["toggle", "focus"];
                    this.selection.on("toggle", function () {
                        e.toggleDropdown()
                    }), this.selection.on("focus", function (t) {
                        e.focus(t)
                    }), this.selection.on("*", function (n, r) {
                        -1 === t.inArray(n, i) && e.trigger(n, r)
                    })
                }, r.prototype._registerDropdownEvents = function () {
                    var t = this;
                    this.dropdown.on("*", function (e, i) {
                        t.trigger(e, i)
                    })
                }, r.prototype._registerResultsEvents = function () {
                    var t = this;
                    this.results.on("*", function (e, i) {
                        t.trigger(e, i)
                    })
                }, r.prototype._registerEvents = function () {
                    var t = this;
                    this.on("open", function () {
                        t.$container.addClass("select2-container--open")
                    }), this.on("close", function () {
                        t.$container.removeClass("select2-container--open")
                    }), this.on("enable", function () {
                        t.$container.removeClass("select2-container--disabled")
                    }), this.on("disable", function () {
                        t.$container.addClass("select2-container--disabled")
                    }), this.on("blur", function () {
                        t.$container.removeClass("select2-container--focus")
                    }), this.on("query", function (e) {
                        t.isOpen() || t.trigger("open", {}), this.dataAdapter.query(e, function (i) {
                            t.trigger("results:all", {data: i, query: e})
                        })
                    }), this.on("query:append", function (e) {
                        this.dataAdapter.query(e, function (i) {
                            t.trigger("results:append", {data: i, query: e})
                        })
                    }), this.on("keypress", function (e) {
                        var i = e.which;
                        t.isOpen() ? i === n.ESC || i === n.TAB || i === n.UP && e.altKey ? (t.close(), e.preventDefault()) : i === n.ENTER ? (t.trigger("results:select", {}), e.preventDefault()) : i === n.SPACE && e.ctrlKey ? (t.trigger("results:toggle", {}), e.preventDefault()) : i === n.UP ? (t.trigger("results:previous", {}), e.preventDefault()) : i === n.DOWN && (t.trigger("results:next", {}), e.preventDefault()) : (i === n.ENTER || i === n.SPACE || i === n.DOWN && e.altKey) && (t.open(), e.preventDefault())
                    })
                }, r.prototype._syncAttributes = function () {
                    this.options.set("disabled", this.$element.prop("disabled")), this.options.get("disabled") ? (this.isOpen() && this.close(), this.trigger("disable", {})) : this.trigger("enable", {})
                }, r.prototype.trigger = function (t, e) {
                    var i = r.__super__.trigger,
                        n = {open: "opening", close: "closing", select: "selecting", unselect: "unselecting"};
                    if (void 0 === e && (e = {}), t in n) {
                        var a = n[t], s = {prevented: !1, name: t, args: e};
                        if (i.call(this, a, s), s.prevented) return void(e.prevented = !0)
                    }
                    i.call(this, t, e)
                }, r.prototype.toggleDropdown = function () {
                    this.options.get("disabled") || (this.isOpen() ? this.close() : this.open())
                }, r.prototype.open = function () {
                    this.isOpen() || this.trigger("query", {})
                }, r.prototype.close = function () {
                    this.isOpen() && this.trigger("close", {})
                }, r.prototype.isOpen = function () {
                    return this.$container.hasClass("select2-container--open")
                }, r.prototype.hasFocus = function () {
                    return this.$container.hasClass("select2-container--focus")
                }, r.prototype.focus = function (t) {
                    this.hasFocus() || (this.$container.addClass("select2-container--focus"), this.trigger("focus", {}))
                }, r.prototype.enable = function (t) {
                    this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'), (null == t || 0 === t.length) && (t = [!0]);
                    var e = !t[0];
                    this.$element.prop("disabled", e)
                }, r.prototype.data = function () {
                    this.options.get("debug") && arguments.length > 0 && window.console && console.warn && console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');
                    var t = [];
                    return this.dataAdapter.current(function (e) {
                        t = e
                    }), t
                }, r.prototype.val = function (e) {
                    if (this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'), null == e || 0 === e.length) return this.$element.val();
                    var i = e[0];
                    t.isArray(i) && (i = t.map(i, function (t) {
                        return t.toString()
                    })), this.$element.val(i).trigger("change")
                }, r.prototype.destroy = function () {
                    this.$container.remove(), this.$element[0].detachEvent && this.$element[0].detachEvent("onpropertychange", this._sync), null != this._observer ? (this._observer.disconnect(), this._observer = null) : this.$element[0].removeEventListener && this.$element[0].removeEventListener("DOMAttrModified", this._sync, !1), this._sync = null, this.$element.off(".select2"), this.$element.attr("tabindex", this.$element.data("old-tabindex")), this.$element.removeClass("select2-hidden-accessible"), this.$element.attr("aria-hidden", "false"), this.$element.removeData("select2"), this.dataAdapter.destroy(), this.selection.destroy(), this.dropdown.destroy(), this.results.destroy(), this.dataAdapter = null, this.selection = null, this.dropdown = null, this.results = null
                }, r.prototype.render = function () {
                    var e = t('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');
                    return e.attr("dir", this.options.get("dir")), this.$container = e, this.$container.addClass("select2-container--" + this.options.get("theme")), e.data("element", this.$element), e
                }, r
            }), e.define("jquery-mousewheel", ["jquery"], function (t) {
                return t
            }), e.define("jquery.select2", ["jquery", "jquery-mousewheel", "./select2/core", "./select2/defaults"], function (t, e, i, n) {
                if (null == t.fn.select2) {
                    var r = ["open", "close", "destroy"];
                    t.fn.select2 = function (e) {
                        if (e = e || {}, "object" == typeof e) return this.each(function () {
                            var n = t.extend(!0, {}, e);
                            new i(t(this), n)
                        }), this;
                        if ("string" == typeof e) {
                            var n;
                            return this.each(function () {
                                var i = t(this).data("select2");
                                null == i && window.console && console.error && console.error("The select2('" + e + "') method was called on an element that is not using Select2.");
                                var r = Array.prototype.slice.call(arguments, 1);
                                n = i[e].apply(i, r)
                            }), t.inArray(e, r) > -1 ? this : n
                        }
                        throw new Error("Invalid arguments for Select2: " + e)
                    }
                }
                return null == t.fn.select2.defaults && (t.fn.select2.defaults = n), i
            }), {define: e.define, require: e.require}
        }(), i = e.require("jquery.select2");
        return t.fn.select2.amd = e, i
    }), window.FormValidation = {
        AddOn: {},
        Framework: {},
        I18n: {},
        Validator: {}
    }, "undefined" == typeof jQuery) throw new Error("FormValidation requires jQuery");
if (function (t) {
        var e = t.fn.jquery.split(" ")[0].split(".");
        if (+e[0] < 2 && +e[1] < 9 || 1 === +e[0] && 9 === +e[1] && +e[2] < 1) throw new Error("FormValidation requires jQuery version 1.9.1 or higher")
    }(jQuery), function (t) {
        FormValidation.Base = function (e, i, n) {
            this.$form = t(e), this.options = t.extend({}, t.fn.formValidation.DEFAULT_OPTIONS, i), this._namespace = n || "fv", this.$invalidFields = t([]), this.$submitButton = null, this.$hiddenButton = null, this.STATUS_NOT_VALIDATED = "NOT_VALIDATED", this.STATUS_VALIDATING = "VALIDATING", this.STATUS_INVALID = "INVALID", this.STATUS_VALID = "VALID";
            var r = function () {
                for (var t = 3, e = document.createElement("div"), i = e.all || []; e.innerHTML = "<!--[if gt IE " + ++t + "]><br><![endif]-->", i[0];) ;
                return t > 4 ? t : !t
            }(), a = document.createElement("div");
            this._changeEvent = 9 !== r && "oninput" in a ? "input" : "keyup", this._submitIfValid = null, this._cacheFields = {}, this._init()
        }, FormValidation.Base.prototype = {
            constructor: FormValidation.Base, _exceedThreshold: function (e) {
                var i = this._namespace, n = e.attr("data-" + i + "-field"),
                    r = this.options.fields[n].threshold || this.options.threshold;
                if (!r) return !0;
                var a = -1 !== t.inArray(e.attr("type"), ["button", "checkbox", "file", "hidden", "image", "radio", "reset", "submit"]);
                return a || e.val().length >= r
            }, _init: function () {
                var e = this, i = this._namespace, n = {
                    addOns: {},
                    autoFocus: this.$form.attr("data-" + i + "-autofocus"),
                    button: {
                        selector: this.$form.attr("data-" + i + "-button-selector") || this.$form.attr("data-" + i + "-submitbuttons"),
                        disabled: this.$form.attr("data-" + i + "-button-disabled")
                    },
                    control: {
                        valid: this.$form.attr("data-" + i + "-control-valid"),
                        invalid: this.$form.attr("data-" + i + "-control-invalid")
                    },
                    err: {
                        clazz: this.$form.attr("data-" + i + "-err-clazz"),
                        container: this.$form.attr("data-" + i + "-err-container") || this.$form.attr("data-" + i + "-container"),
                        parent: this.$form.attr("data-" + i + "-err-parent")
                    },
                    events: {
                        formInit: this.$form.attr("data-" + i + "-events-form-init"),
                        formError: this.$form.attr("data-" + i + "-events-form-error"),
                        formSuccess: this.$form.attr("data-" + i + "-events-form-success"),
                        fieldAdded: this.$form.attr("data-" + i + "-events-field-added"),
                        fieldRemoved: this.$form.attr("data-" + i + "-events-field-removed"),
                        fieldInit: this.$form.attr("data-" + i + "-events-field-init"),
                        fieldError: this.$form.attr("data-" + i + "-events-field-error"),
                        fieldSuccess: this.$form.attr("data-" + i + "-events-field-success"),
                        fieldStatus: this.$form.attr("data-" + i + "-events-field-status"),
                        localeChanged: this.$form.attr("data-" + i + "-events-locale-changed"),
                        validatorError: this.$form.attr("data-" + i + "-events-validator-error"),
                        validatorSuccess: this.$form.attr("data-" + i + "-events-validator-success")
                    },
                    excluded: this.$form.attr("data-" + i + "-excluded"),
                    icon: {
                        valid: this.$form.attr("data-" + i + "-icon-valid") || this.$form.attr("data-" + i + "-feedbackicons-valid"),
                        invalid: this.$form.attr("data-" + i + "-icon-invalid") || this.$form.attr("data-" + i + "-feedbackicons-invalid"),
                        validating: this.$form.attr("data-" + i + "-icon-validating") || this.$form.attr("data-" + i + "-feedbackicons-validating"),
                        feedback: this.$form.attr("data-" + i + "-icon-feedback")
                    },
                    live: this.$form.attr("data-" + i + "-live"),
                    locale: this.$form.attr("data-" + i + "-locale"),
                    message: this.$form.attr("data-" + i + "-message"),
                    onError: this.$form.attr("data-" + i + "-onerror"),
                    onSuccess: this.$form.attr("data-" + i + "-onsuccess"),
                    row: {
                        selector: this.$form.attr("data-" + i + "-row-selector") || this.$form.attr("data-" + i + "-group"),
                        valid: this.$form.attr("data-" + i + "-row-valid"),
                        invalid: this.$form.attr("data-" + i + "-row-invalid"),
                        feedback: this.$form.attr("data-" + i + "-row-feedback")
                    },
                    threshold: this.$form.attr("data-" + i + "-threshold"),
                    trigger: this.$form.attr("data-" + i + "-trigger"),
                    verbose: this.$form.attr("data-" + i + "-verbose"),
                    fields: {}
                };
                this.$form.attr("novalidate", "novalidate").addClass(this.options.elementClass).on("submit." + i, function (t) {
                    t.preventDefault(), e.validate()
                }).on("click." + i, this.options.button.selector, function () {
                    e.$submitButton = t(this), e._submitIfValid = !0
                }).find("[name], [data-" + i + "-field]").each(function () {
                    var r = t(this), a = r.attr("name") || r.attr("data-" + i + "-field"), s = e._parseOptions(r);
                    s && (r.attr("data-" + i + "-field", a), n.fields[a] = t.extend({}, s, n.fields[a]))
                }), this.options = t.extend(!0, this.options, n), "string" == typeof this.options.err.parent && (this.options.err.parent = new RegExp(this.options.err.parent)), this.options.container && (this.options.err.container = this.options.container, delete this.options.container), this.options.feedbackIcons && (this.options.icon = t.extend(!0, this.options.icon, this.options.feedbackIcons), delete this.options.feedbackIcons), this.options.group && (this.options.row.selector = this.options.group, delete this.options.group), this.options.submitButtons && (this.options.button.selector = this.options.submitButtons, delete this.options.submitButtons), FormValidation.I18n[this.options.locale] || (this.options.locale = t.fn.formValidation.DEFAULT_OPTIONS.locale), this.options = t.extend(!0, this.options, {addOns: this._parseAddOnOptions()}), this.$hiddenButton = t("<button/>").attr("type", "submit").prependTo(this.$form).addClass("fv-hidden-submit").css({
                    display: "none",
                    width: 0,
                    height: 0
                }), this.$form.on("click." + this._namespace, '[type="submit"]', function (i) {
                    if (!i.isDefaultPrevented()) {
                        var n = t(i.target), r = n.is('[type="submit"]') ? n.eq(0) : n.parent('[type="submit"]').eq(0);
                        !e.options.button.selector || r.is(e.options.button.selector) || r.is(e.$hiddenButton) || e.$form.off("submit." + e._namespace).submit()
                    }
                });
                for (var r in this.options.fields) this._initField(r);
                for (var a in this.options.addOns) "function" == typeof FormValidation.AddOn[a].init && FormValidation.AddOn[a].init(this, this.options.addOns[a]);
                this.$form.trigger(t.Event(this.options.events.formInit), {
                    bv: this,
                    fv: this,
                    options: this.options
                }), this.options.onSuccess && this.$form.on(this.options.events.formSuccess, function (t) {
                    FormValidation.Helper.call(e.options.onSuccess, [t])
                }), this.options.onError && this.$form.on(this.options.events.formError, function (t) {
                    FormValidation.Helper.call(e.options.onError, [t])
                })
            }, _initField: function (e) {
                var i = this._namespace, n = t([]);
                switch (typeof e) {
                    case"object":
                        n = e, e = e.attr("data-" + i + "-field");
                        break;
                    case"string":
                        n = this.getFieldElements(e), n.attr("data-" + i + "-field", e)
                }
                if (0 !== n.length && null !== this.options.fields[e] && null !== this.options.fields[e].validators) {
                    var r;
                    for (r in this.options.fields[e].validators) FormValidation.Validator[r] || delete this.options.fields[e].validators[r];
                    null === this.options.fields[e].enabled && (this.options.fields[e].enabled = !0);
                    for (var a = this, s = n.length, o = n.attr("type"), l = 1 === s || "radio" === o || "checkbox" === o, d = this._getFieldTrigger(n.eq(0)), c = t.map(d, function (t) {
                        return t + ".update." + i
                    }).join(" "), u = 0; s > u; u++) {
                        var h = n.eq(u), p = this.options.fields[e].row || this.options.row.selector, f = h.closest(p),
                            m = "function" == typeof(this.options.fields[e].container || this.options.fields[e].err || this.options.err.container) ? (this.options.fields[e].container || this.options.fields[e].err || this.options.err.container).call(this, h, this) : this.options.fields[e].container || this.options.fields[e].err || this.options.err.container,
                            g = m && "tooltip" !== m && "popover" !== m ? t(m) : this._getMessageContainer(h, p);
                        m && "tooltip" !== m && "popover" !== m && g.addClass(this.options.err.clazz), g.find("." + this.options.err.clazz.split(" ").join(".") + "[data-" + i + "-validator][data-" + i + '-for="' + e + '"]').remove(), f.find("i[data-" + i + '-icon-for="' + e + '"]').remove(), h.off(c).on(c, function () {
                            a.updateStatus(t(this), a.STATUS_NOT_VALIDATED)
                        }), h.data(i + ".messages", g);
                        for (r in this.options.fields[e].validators) h.data(i + ".result." + r, this.STATUS_NOT_VALIDATED), l && u !== s - 1 || t("<small/>").css("display", "none").addClass(this.options.err.clazz).attr("data-" + i + "-validator", r).attr("data-" + i + "-for", e).attr("data-" + i + "-result", this.STATUS_NOT_VALIDATED).html(this._getMessage(e, r)).appendTo(g), "function" == typeof FormValidation.Validator[r].init && FormValidation.Validator[r].init(this, h, this.options.fields[e].validators[r]);
                        if (this.options.fields[e].icon !== !1 && "false" !== this.options.fields[e].icon && this.options.icon && this.options.icon.valid && this.options.icon.invalid && this.options.icon.validating && (!l || u === s - 1)) {
                            f.addClass(this.options.row.feedback);
                            var v = t("<i/>").css("display", "none").addClass(this.options.icon.feedback).attr("data-" + i + "-icon-for", e).insertAfter(h);
                            (l ? n : h).data(i + ".icon", v), "tooltip" !== m && "popover" !== m || ((l ? n : h).on(this.options.events.fieldError, function () {
                                f.addClass("fv-has-tooltip")
                            }).on(this.options.events.fieldSuccess, function () {
                                f.removeClass("fv-has-tooltip")
                            }), h.off("focus.container." + i).on("focus.container." + i, function () {
                                a._showTooltip(h, m)
                            }).off("blur.container." + i).on("blur.container." + i, function () {
                                a._hideTooltip(h, m)
                            })), "string" == typeof this.options.fields[e].icon && "true" !== this.options.fields[e].icon ? v.appendTo(t(this.options.fields[e].icon)) : this._fixIcon(h, v)
                        }
                    }
                    n.on(this.options.events.fieldSuccess, function (t, e) {
                        var i = a.getOptions(e.field, null, "onSuccess");
                        i && FormValidation.Helper.call(i, [t, e])
                    }).on(this.options.events.fieldError, function (t, e) {
                        var i = a.getOptions(e.field, null, "onError");
                        i && FormValidation.Helper.call(i, [t, e])
                    }).on(this.options.events.fieldStatus, function (t, e) {
                        var i = a.getOptions(e.field, null, "onStatus");
                        i && FormValidation.Helper.call(i, [t, e])
                    }).on(this.options.events.validatorError, function (t, e) {
                        var i = a.getOptions(e.field, e.validator, "onError");
                        i && FormValidation.Helper.call(i, [t, e])
                    }).on(this.options.events.validatorSuccess, function (t, e) {
                        var i = a.getOptions(e.field, e.validator, "onSuccess");
                        i && FormValidation.Helper.call(i, [t, e])
                    }), this.onLiveChange(n, "live", function () {
                        a._exceedThreshold(t(this)) && a.validateField(t(this))
                    }), n.trigger(t.Event(this.options.events.fieldInit), {bv: this, fv: this, field: e, element: n})
                }
            }, _isExcluded: function (e) {
                var i = this._namespace, n = e.attr("data-" + i + "-excluded"),
                    r = e.attr("data-" + i + "-field") || e.attr("name");
                switch (!0) {
                    case!!r && this.options.fields && this.options.fields[r] && ("true" === this.options.fields[r].excluded || this.options.fields[r].excluded === !0):
                    case"true" === n:
                    case"" === n:
                        return !0;
                    case!!r && this.options.fields && this.options.fields[r] && ("false" === this.options.fields[r].excluded || this.options.fields[r].excluded === !1):
                    case"false" === n:
                        return !1;
                    default:
                        if (this.options.excluded) {
                            "string" == typeof this.options.excluded && (this.options.excluded = t.map(this.options.excluded.split(","), function (e) {
                                return t.trim(e)
                            }));
                            for (var a = this.options.excluded.length, s = 0; a > s; s++) if ("string" == typeof this.options.excluded[s] && e.is(this.options.excluded[s]) || "function" == typeof this.options.excluded[s] && this.options.excluded[s].call(this, e, this) === !0) return !0
                        }
                        return !1
                }
            }, _getFieldTrigger: function (t) {
                var e = this._namespace, i = t.data(e + ".trigger");
                if (i) return i;
                var n = t.attr("type"), r = t.attr("data-" + e + "-field"),
                    a = "radio" === n || "checkbox" === n || "file" === n || "SELECT" === t.get(0).tagName ? "change" : this._changeEvent;
                return i = ((this.options.fields[r] ? this.options.fields[r].trigger : null) || this.options.trigger || a).split(" "), t.data(e + ".trigger", i), i
            }, _getMessage: function (t, e) {
                if (!(this.options.fields[t] && FormValidation.Validator[e] && this.options.fields[t].validators && this.options.fields[t].validators[e])) return "";
                switch (!0) {
                    case!!this.options.fields[t].validators[e].message:
                        return this.options.fields[t].validators[e].message;
                    case!!this.options.fields[t].message:
                        return this.options.fields[t].message;
                    case!!FormValidation.I18n[this.options.locale][e]["default"]:
                        return FormValidation.I18n[this.options.locale][e]["default"];
                    default:
                        return this.options.message
                }
            }, _getMessageContainer: function (t, e) {
                if (!this.options.err.parent) throw new Error("The err.parent option is not defined");
                var i = t.parent();
                if (i.is(e)) return i;
                var n = i.attr("class");
                return n && this.options.err.parent.test(n) ? i : this._getMessageContainer(i, e)
            }, _parseAddOnOptions: function () {
                var t = this._namespace, e = this.$form.attr("data-" + t + "-addons"), i = this.options.addOns || {};
                if (e) {
                    e = e.replace(/\s/g, "").split(",");
                    for (var n = 0; n < e.length; n++) i[e[n]] || (i[e[n]] = {})
                }
                var r, a, s, o;
                for (r in i) if (FormValidation.AddOn[r]) {
                    if (a = FormValidation.AddOn[r].html5Attributes) for (s in a) o = this.$form.attr("data-" + t + "-addons-" + r.toLowerCase() + "-" + s.toLowerCase()), o && (i[r][a[s]] = o)
                } else delete i[r];
                return i
            }, _parseOptions: function (e) {
                var i, n, r, a, s, o, l, d, c, u = this._namespace,
                    h = e.attr("name") || e.attr("data-" + u + "-field"), p = {};
                for (n in FormValidation.Validator) if (i = FormValidation.Validator[n], r = "data-" + u + "-" + n.toLowerCase(), a = e.attr(r) + "", c = "function" == typeof i.enableByHtml5 ? i.enableByHtml5(e) : null, c && "false" !== a || c !== !0 && ("" === a || "true" === a || r === a.toLowerCase())) {
                    i.html5Attributes = t.extend({}, {
                        message: "message",
                        onerror: "onError",
                        onsuccess: "onSuccess",
                        transformer: "transformer"
                    }, i.html5Attributes), p[n] = t.extend({}, c === !0 ? {} : c, p[n]);
                    for (d in i.html5Attributes) s = i.html5Attributes[d], o = "data-" + u + "-" + n.toLowerCase() + "-" + d, l = e.attr(o), l && ("true" === l || o === l.toLowerCase() ? l = !0 : "false" === l && (l = !1), p[n][s] = l)
                }
                var f = {
                    autoFocus: e.attr("data-" + u + "-autofocus"),
                    err: e.attr("data-" + u + "-err-container") || e.attr("data-" + u + "-container"),
                    excluded: e.attr("data-" + u + "-excluded"),
                    icon: e.attr("data-" + u + "-icon") || e.attr("data-" + u + "-feedbackicons") || (this.options.fields && this.options.fields[h] ? this.options.fields[h].feedbackIcons : null),
                    message: e.attr("data-" + u + "-message"),
                    onError: e.attr("data-" + u + "-onerror"),
                    onStatus: e.attr("data-" + u + "-onstatus"),
                    onSuccess: e.attr("data-" + u + "-onsuccess"),
                    row: e.attr("data-" + u + "-row") || e.attr("data-" + u + "-group") || (this.options.fields && this.options.fields[h] ? this.options.fields[h].group : null),
                    selector: e.attr("data-" + u + "-selector"),
                    threshold: e.attr("data-" + u + "-threshold"),
                    transformer: e.attr("data-" + u + "-transformer"),
                    trigger: e.attr("data-" + u + "-trigger"),
                    verbose: e.attr("data-" + u + "-verbose"),
                    validators: p
                }, m = t.isEmptyObject(f), g = t.isEmptyObject(p);
                return !g || !m && this.options.fields && this.options.fields[h] ? (f.validators = p, f) : null
            }, _submit: function () {
                var e = this.isValid(), i = e ? this.options.events.formSuccess : this.options.events.formError,
                    n = t.Event(i);
                this.$form.trigger(n), this.$submitButton && (e ? this._onSuccess(n) : this._onError(n))
            }, _onError: function (e) {
                if (!e.isDefaultPrevented()) {
                    if ("submitted" === this.options.live) {
                        this.options.live = "enabled";
                        var i = this;
                        for (var n in this.options.fields) !function (e) {
                            var n = i.getFieldElements(e);
                            n.length && i.onLiveChange(n, "live", function () {
                                i._exceedThreshold(t(this)) && i.validateField(t(this))
                            })
                        }(n)
                    }
                    for (var r = this._namespace, a = 0; a < this.$invalidFields.length; a++) {
                        var s = this.$invalidFields.eq(a),
                            o = this.isOptionEnabled(s.attr("data-" + r + "-field"), "autoFocus");
                        if (o) {
                            s.focus();
                            break
                        }
                    }
                }
            }, _onFieldValidated: function (e, i) {
                var n = this._namespace, r = e.attr("data-" + n + "-field"), a = this.options.fields[r].validators,
                    s = {}, o = 0,
                    l = {bv: this, fv: this, field: r, element: e, validator: i, result: e.data(n + ".response." + i)};
                if (i) switch (e.data(n + ".result." + i)) {
                    case this.STATUS_INVALID:
                        e.trigger(t.Event(this.options.events.validatorError), l);
                        break;
                    case this.STATUS_VALID:
                        e.trigger(t.Event(this.options.events.validatorSuccess), l)
                }
                s[this.STATUS_NOT_VALIDATED] = 0, s[this.STATUS_VALIDATING] = 0, s[this.STATUS_INVALID] = 0, s[this.STATUS_VALID] = 0;
                for (var d in a) if (a[d].enabled !== !1) {
                    o++;
                    var c = e.data(n + ".result." + d);
                    c && s[c]++
                }
                s[this.STATUS_VALID] === o ? (this.$invalidFields = this.$invalidFields.not(e), e.trigger(t.Event(this.options.events.fieldSuccess), l)) : (0 === s[this.STATUS_NOT_VALIDATED] || !this.isOptionEnabled(r, "verbose")) && 0 === s[this.STATUS_VALIDATING] && s[this.STATUS_INVALID] > 0 && (this.$invalidFields = this.$invalidFields.add(e), e.trigger(t.Event(this.options.events.fieldError), l))
            }, _onSuccess: function (t) {
                t.isDefaultPrevented() || this.disableSubmitButtons(!0).defaultSubmit()
            }, _fixIcon: function (t, e) {
            }, _createTooltip: function (t, e, i) {
            }, _destroyTooltip: function (t, e) {
            }, _hideTooltip: function (t, e) {
            }, _showTooltip: function (t, e) {
            }, defaultSubmit: function () {
                var e = this._namespace;
                this.$submitButton && t("<input/>").attr({
                    type: "hidden",
                    name: this.$submitButton.attr("name")
                }).attr("data-" + e + "-submit-hidden", "").val(this.$submitButton.val()).appendTo(this.$form), this.$form.off("submit." + e).submit()
            }, disableSubmitButtons: function (t) {
                return t ? "disabled" !== this.options.live && this.$form.find(this.options.button.selector).attr("disabled", "disabled").addClass(this.options.button.disabled) : this.$form.find(this.options.button.selector).removeAttr("disabled").removeClass(this.options.button.disabled), this
            }, getFieldElements: function (e) {
                if (!this._cacheFields[e]) if (this.options.fields[e] && this.options.fields[e].selector) {
                    var i = this.$form.find(this.options.fields[e].selector);
                    this._cacheFields[e] = i.length ? i : t(this.options.fields[e].selector)
                } else this._cacheFields[e] = this.$form.find('[name="' + e + '"]');
                return this._cacheFields[e]
            }, getFieldValue: function (t, e) {
                var i, n = this._namespace;
                if ("string" == typeof t) {
                    if (i = this.getFieldElements(t), 0 === i.length) return null
                } else i = t, t = i.attr("data-" + n + "-field");
                if (!t || !this.options.fields[t]) return i.val();
                var r = (this.options.fields[t].validators && this.options.fields[t].validators[e] ? this.options.fields[t].validators[e].transformer : null) || this.options.fields[t].transformer;
                return r ? FormValidation.Helper.call(r, [i, e]) : i.val()
            }, getNamespace: function () {
                return this._namespace
            }, getOptions: function (t, e, i) {
                var n = this._namespace;
                if (!t) return i ? this.options[i] : this.options;
                if ("object" == typeof t && (t = t.attr("data-" + n + "-field")), !this.options.fields[t]) return null;
                var r = this.options.fields[t];
                return e ? r.validators && r.validators[e] ? i ? r.validators[e][i] : r.validators[e] : null : i ? r[i] : r
            }, getStatus: function (t, e) {
                var i = this._namespace;
                switch (typeof t) {
                    case"object":
                        return t.data(i + ".result." + e);
                    case"string":
                    default:
                        return this.getFieldElements(t).eq(0).data(i + ".result." + e)
                }
            }, isOptionEnabled: function (t, e) {
                return !this.options.fields[t] || "true" !== this.options.fields[t][e] && this.options.fields[t][e] !== !0 ? !this.options.fields[t] || "false" !== this.options.fields[t][e] && this.options.fields[t][e] !== !1 ? "true" === this.options[e] || this.options[e] === !0 : !1 : !0
            }, isValid: function () {
                for (var t in this.options.fields) if (!this.isValidField(t)) return !1;
                return !0
            }, isValidContainer: function (e) {
                var i = this, n = this._namespace, r = {}, a = "string" == typeof e ? t(e) : e;
                if (0 === a.length) return !0;
                a.find("[data-" + n + "-field]").each(function () {
                    var e = t(this), a = e.attr("data-" + n + "-field");
                    i._isExcluded(e) || r[a] || (r[a] = e)
                });
                for (var s in r) {
                    var o = r[s],
                        l = o.data(n + ".messages").find("." + this.options.err.clazz.split(" ").join(".") + "[data-" + n + "-validator][data-" + n + '-for="' + s + '"]');
                    if (l.filter("[data-" + n + '-result="' + this.STATUS_INVALID + '"]').length > 0) return !1;
                    if (l.filter("[data-" + n + '-result="' + this.STATUS_NOT_VALIDATED + '"]').length > 0 || l.filter("[data-" + n + '-result="' + this.STATUS_VALIDATING + '"]').length > 0) return null
                }
                return !0
            }, isValidField: function (e) {
                var i = this._namespace, n = t([]);
                switch (typeof e) {
                    case"object":
                        n = e, e = e.attr("data-" + i + "-field");
                        break;
                    case"string":
                        n = this.getFieldElements(e)
                }
                if (0 === n.length || !this.options.fields[e] || this.options.fields[e].enabled === !1) return !0;
                for (var r, a, s, o = n.attr("type"), l = "radio" === o || "checkbox" === o ? 1 : n.length, d = 0; l > d; d++) if (r = n.eq(d), !this._isExcluded(r)) for (a in this.options.fields[e].validators) if (this.options.fields[e].validators[a].enabled !== !1 && (s = r.data(i + ".result." + a), s !== this.STATUS_VALID)) return !1;
                return !0
            }, offLiveChange: function (e, i) {
                if (null === e || 0 === e.length) return this;
                var n = this._namespace, r = this._getFieldTrigger(e.eq(0)), a = t.map(r, function (t) {
                    return t + "." + i + "." + n
                }).join(" ");
                return e.off(a), this
            }, onLiveChange: function (e, i, n) {
                if (null === e || 0 === e.length) return this;
                var r = this._namespace, a = this._getFieldTrigger(e.eq(0)), s = t.map(a, function (t) {
                    return t + "." + i + "." + r
                }).join(" ");
                switch (this.options.live) {
                    case"submitted":
                        break;
                    case"disabled":
                        e.off(s);
                        break;
                    case"enabled":
                    default:
                        e.off(s).on(s, function (t) {
                            n.apply(this, arguments)
                        })
                }
                return this
            }, updateMessage: function (e, i, n) {
                var r = this, a = this._namespace, s = t([]);
                switch (typeof e) {
                    case"object":
                        s = e, e = e.attr("data-" + a + "-field");
                        break;
                    case"string":
                        s = this.getFieldElements(e)
                }
                s.each(function () {
                    t(this).data(a + ".messages").find("." + r.options.err.clazz + "[data-" + a + '-validator="' + i + '"][data-' + a + '-for="' + e + '"]').html(n)
                })
            }, updateStatus: function (e, i, n) {
                var r = this._namespace, a = t([]);
                switch (typeof e) {
                    case"object":
                        a = e, e = e.attr("data-" + r + "-field");
                        break;
                    case"string":
                        a = this.getFieldElements(e)
                }
                if (!e || !this.options.fields[e]) return this;
                i === this.STATUS_NOT_VALIDATED && (this._submitIfValid = !1);
                for (var s = this, o = a.attr("type"), l = this.options.fields[e].row || this.options.row.selector, d = "radio" === o || "checkbox" === o ? 1 : a.length, c = 0; d > c; c++) {
                    var u = a.eq(c);
                    if (!this._isExcluded(u)) {
                        var h = u.closest(l), p = u.data(r + ".messages"),
                            f = p.find("." + this.options.err.clazz.split(" ").join(".") + "[data-" + r + "-validator][data-" + r + '-for="' + e + '"]'),
                            m = n ? f.filter("[data-" + r + '-validator="' + n + '"]') : f, g = u.data(r + ".icon"),
                            v = "function" == typeof(this.options.fields[e].container || this.options.fields[e].err || this.options.err.container) ? (this.options.fields[e].container || this.options.fields[e].err || this.options.err.container).call(this, u, this) : this.options.fields[e].container || this.options.fields[e].err || this.options.err.container,
                            b = null;
                        if (n) u.data(r + ".result." + n, i); else for (var y in this.options.fields[e].validators) u.data(r + ".result." + y, i);
                        switch (m.attr("data-" + r + "-result", i), i) {
                            case this.STATUS_VALIDATING:
                                b = null, this.disableSubmitButtons(!0), u.removeClass(this.options.control.valid).removeClass(this.options.control.invalid), h.removeClass(this.options.row.valid).removeClass(this.options.row.invalid), g && g.removeClass(this.options.icon.valid).removeClass(this.options.icon.invalid).addClass(this.options.icon.validating).show();
                                break;
                            case this.STATUS_INVALID:
                                b = !1, this.disableSubmitButtons(!0), u.removeClass(this.options.control.valid).addClass(this.options.control.invalid), h.removeClass(this.options.row.valid).addClass(this.options.row.invalid), g && g.removeClass(this.options.icon.valid).removeClass(this.options.icon.validating).addClass(this.options.icon.invalid).show();
                                break;
                            case this.STATUS_VALID:
                                if (b = 0 === f.filter("[data-" + r + '-result="' + this.STATUS_NOT_VALIDATED + '"]').length ? f.filter("[data-" + r + '-result="' + this.STATUS_VALID + '"]').length === f.length : null, u.removeClass(this.options.control.valid).removeClass(this.options.control.invalid), null !== b && (this.disableSubmitButtons(this.$submitButton ? !this.isValid() : !b), u.addClass(b ? this.options.control.valid : this.options.control.invalid), g)) {
                                    var w = f.filter('[data-bv-result="' + this.STATUS_VALIDATING + '"]').length > 0;
                                    g.removeClass(this.options.icon.invalid).removeClass(this.options.icon.validating).removeClass(this.options.icon.valid).addClass(b ? this.options.icon.valid : w ? this.options.icon.validating : this.options.icon.invalid).show()
                                }
                                var S = this.isValidContainer(h);
                                null !== S && h.removeClass(this.options.row.valid).removeClass(this.options.row.invalid).addClass(S ? this.options.row.valid : this.options.row.invalid);
                                break;
                            case this.STATUS_NOT_VALIDATED:
                            default:
                                b = null, this.disableSubmitButtons(!1), u.removeClass(this.options.control.valid).removeClass(this.options.control.invalid), h.removeClass(this.options.row.valid).removeClass(this.options.row.invalid), g && g.removeClass(this.options.icon.valid).removeClass(this.options.icon.invalid).removeClass(this.options.icon.validating).hide()
                        }
                        !g || "tooltip" !== v && "popover" !== v ? i === this.STATUS_INVALID ? m.show() : m.hide() : b === !1 ? this._createTooltip(u, f.filter("[data-" + r + '-result="' + s.STATUS_INVALID + '"]').eq(0).html(), v) : this._destroyTooltip(u, v), u.trigger(t.Event(this.options.events.fieldStatus), {
                            bv: this,
                            fv: this,
                            field: e,
                            element: u,
                            status: i
                        }), this._onFieldValidated(u, n)
                    }
                }
                return this
            }, validate: function () {
                if (!this.options.fields) return this;
                this.disableSubmitButtons(!0), this._submitIfValid = !1;
                for (var t in this.options.fields) this.validateField(t);
                return this._submit(), this._submitIfValid = !0, this
            }, validateField: function (e) {
                var i = this._namespace, n = t([]);
                switch (typeof e) {
                    case"object":
                        n = e, e = e.attr("data-" + i + "-field");
                        break;
                    case"string":
                        n = this.getFieldElements(e)
                }
                if (0 === n.length || !this.options.fields[e] || this.options.fields[e].enabled === !1) return this;
                for (var r, a, s = this, o = n.attr("type"), l = "radio" === o || "checkbox" === o ? 1 : n.length, d = "radio" === o || "checkbox" === o, c = this.options.fields[e].validators, u = this.isOptionEnabled(e, "verbose"), h = 0; l > h; h++) {
                    var p = n.eq(h);
                    if (!this._isExcluded(p)) {
                        var f = !1;
                        for (r in c) {
                            if (p.data(i + ".dfs." + r) && p.data(i + ".dfs." + r).reject(), f) break;
                            var m = p.data(i + ".result." + r);
                            if (m !== this.STATUS_VALID && m !== this.STATUS_INVALID) if (c[r].enabled !== !1) {
                                if (p.data(i + ".result." + r, this.STATUS_VALIDATING), a = FormValidation.Validator[r].validate(this, p, c[r]), "object" == typeof a && a.resolve) this.updateStatus(d ? e : p, this.STATUS_VALIDATING, r), p.data(i + ".dfs." + r, a), a.done(function (t, e, n) {
                                    t.removeData(i + ".dfs." + e).data(i + ".response." + e, n), n.message && s.updateMessage(t, e, n.message), s.updateStatus(d ? t.attr("data-" + i + "-field") : t, n.valid ? s.STATUS_VALID : s.STATUS_INVALID, e), n.valid && s._submitIfValid === !0 ? s._submit() : n.valid || u || (f = !0)
                                }); else if ("object" == typeof a && void 0 !== a.valid) {
                                    if (p.data(i + ".response." + r, a), a.message && this.updateMessage(d ? e : p, r, a.message), this.updateStatus(d ? e : p, a.valid ? this.STATUS_VALID : this.STATUS_INVALID, r), !a.valid && !u) break
                                } else if ("boolean" == typeof a && (p.data(i + ".response." + r, a), this.updateStatus(d ? e : p, a ? this.STATUS_VALID : this.STATUS_INVALID, r), !a && !u)) break
                            } else this.updateStatus(d ? e : p, this.STATUS_VALID, r); else this._onFieldValidated(p, r)
                        }
                    }
                }
                return this
            }, addField: function (e, i) {
                var n = this._namespace, r = t([]);
                switch (typeof e) {
                    case"object":
                        r = e, e = e.attr("data-" + n + "-field") || e.attr("name");
                        break;
                    case"string":
                        delete this._cacheFields[e], r = this.getFieldElements(e)
                }
                r.attr("data-" + n + "-field", e);
                for (var a = r.attr("type"), s = "radio" === a || "checkbox" === a ? 1 : r.length, o = 0; s > o; o++) {
                    var l = r.eq(o), d = this._parseOptions(l);
                    d = null === d ? i : t.extend(!0, i, d), this.options.fields[e] = t.extend(!0, this.options.fields[e], d), this._cacheFields[e] = this._cacheFields[e] ? this._cacheFields[e].add(l) : l, this._initField("checkbox" === a || "radio" === a ? e : l)
                }
                return this.disableSubmitButtons(!1), this.$form.trigger(t.Event(this.options.events.fieldAdded), {
                    field: e,
                    element: r,
                    options: this.options.fields[e]
                }), this
            }, destroy: function () {
                var t, e, i, n, r, a, s, o = this._namespace;
                for (e in this.options.fields) for (i = this.getFieldElements(e), t = 0; t < i.length; t++) {
                    n = i.eq(t);
                    for (r in this.options.fields[e].validators) n.data(o + ".dfs." + r) && n.data(o + ".dfs." + r).reject(), n.removeData(o + ".result." + r).removeData(o + ".response." + r).removeData(o + ".dfs." + r), "function" == typeof FormValidation.Validator[r].destroy && FormValidation.Validator[r].destroy(this, n, this.options.fields[e].validators[r])
                }
                for (e in this.options.fields) for (i = this.getFieldElements(e), s = this.options.fields[e].row || this.options.row.selector, t = 0; t < i.length; t++) {
                    n = i.eq(t), n.data(o + ".messages").find("." + this.options.err.clazz.split(" ").join(".") + "[data-" + o + "-validator][data-" + o + '-for="' + e + '"]').remove().end().end().removeData(o + ".messages").closest(s).removeClass(this.options.row.valid).removeClass(this.options.row.invalid).removeClass(this.options.row.feedback).end().off("." + o).removeAttr("data-" + o + "-field");
                    var l = "function" == typeof(this.options.fields[e].container || this.options.fields[e].err || this.options.err.container) ? (this.options.fields[e].container || this.options.fields[e].err || this.options.err.container).call(this, n, this) : this.options.fields[e].container || this.options.fields[e].err || this.options.err.container;
                    "tooltip" !== l && "popover" !== l || this._destroyTooltip(n, l), a = n.data(o + ".icon"), a && a.remove(), n.removeData(o + ".icon").removeData(o + ".trigger")
                }
                for (var d in this.options.addOns) "function" == typeof FormValidation.AddOn[d].destroy && FormValidation.AddOn[d].destroy(this, this.options.addOns[d]);
                this.disableSubmitButtons(!1), this.$hiddenButton.remove(), this.$form.removeClass(this.options.elementClass).off("." + o).removeData("bootstrapValidator").removeData("formValidation").find("[data-" + o + "-submit-hidden]").remove().end().find('[type="submit"]').off("click." + o)
            }, enableFieldValidators: function (t, e, i) {
                var n = this.options.fields[t].validators;
                if (i && n && n[i] && n[i].enabled !== e) this.options.fields[t].validators[i].enabled = e, this.updateStatus(t, this.STATUS_NOT_VALIDATED, i); else if (!i && this.options.fields[t].enabled !== e) {
                    this.options.fields[t].enabled = e;
                    for (var r in n) this.enableFieldValidators(t, e, r)
                }
                return this
            }, getDynamicOption: function (t, e) {
                var i = "string" == typeof t ? this.getFieldElements(t) : t, n = i.val();
                if ("function" == typeof e) return FormValidation.Helper.call(e, [n, this, i]);
                if ("string" == typeof e) {
                    var r = this.getFieldElements(e);
                    return r.length ? r.val() : FormValidation.Helper.call(e, [n, this, i]) || e
                }
                return null
            }, getForm: function () {
                return this.$form
            }, getInvalidFields: function () {
                return this.$invalidFields
            }, getLocale: function () {
                return this.options.locale
            }, getMessages: function (e, i) {
                var n = this, r = this._namespace, a = [], s = t([]);
                switch (!0) {
                    case e && "object" == typeof e:
                        s = e;
                        break;
                    case e && "string" == typeof e:
                        var o = this.getFieldElements(e);
                        if (o.length > 0) {
                            var l = o.attr("type");
                            s = "radio" === l || "checkbox" === l ? o.eq(0) : o
                        }
                        break;
                    default:
                        s = this.$invalidFields
                }
                var d = i ? "[data-" + r + '-validator="' + i + '"]' : "";
                return s.each(function () {
                    a = a.concat(t(this).data(r + ".messages").find("." + n.options.err.clazz + "[data-" + r + '-for="' + t(this).attr("data-" + r + "-field") + '"][data-' + r + '-result="' + n.STATUS_INVALID + '"]' + d).map(function () {
                        var e = t(this).attr("data-" + r + "-validator"), i = t(this).attr("data-" + r + "-for");
                        return n.options.fields[i].validators[e].enabled === !1 ? "" : t(this).html()
                    }).get())
                }), a
            }, getSubmitButton: function () {
                return this.$submitButton
            }, removeField: function (e) {
                var i = this._namespace, n = t([]);
                switch (typeof e) {
                    case"object":
                        n = e, e = e.attr("data-" + i + "-field") || e.attr("name"), n.attr("data-" + i + "-field", e);
                        break;
                    case"string":
                        n = this.getFieldElements(e)
                }
                if (0 === n.length) return this;
                for (var r = n.attr("type"), a = "radio" === r || "checkbox" === r ? 1 : n.length, s = 0; a > s; s++) {
                    var o = n.eq(s);
                    this.$invalidFields = this.$invalidFields.not(o), this._cacheFields[e] = this._cacheFields[e].not(o)
                }
                return this._cacheFields[e] && 0 !== this._cacheFields[e].length || delete this.options.fields[e], "checkbox" !== r && "radio" !== r || this._initField(e), this.disableSubmitButtons(!1), this.$form.trigger(t.Event(this.options.events.fieldRemoved), {
                    field: e,
                    element: n
                }), this
            }, resetField: function (e, i) {
                var n = this._namespace, r = t([]);
                switch (typeof e) {
                    case"object":
                        r = e, e = e.attr("data-" + n + "-field");
                        break;
                    case"string":
                        r = this.getFieldElements(e)
                }
                var a = r.length;
                if (this.options.fields[e]) for (var s = 0; a > s; s++) for (var o in this.options.fields[e].validators) r.eq(s).removeData(n + ".dfs." + o);
                if (this.updateStatus(e, this.STATUS_NOT_VALIDATED), i) {
                    var l = r.attr("type");
                    "radio" === l || "checkbox" === l ? r.removeAttr("checked").removeAttr("selected") : r.val("")
                }
                return this
            }, resetForm: function (e) {
                for (var i in this.options.fields) this.resetField(i, e);
                return this.$invalidFields = t([]), this.$submitButton = null, this.disableSubmitButtons(!1), this
            }, revalidateField: function (t) {
                return this.updateStatus(t, this.STATUS_NOT_VALIDATED).validateField(t), this
            }, setLocale: function (e) {
                return this.options.locale = e, this.$form.trigger(t.Event(this.options.events.localeChanged), {
                    locale: e,
                    bv: this,
                    fv: this
                }), this
            }, updateOption: function (t, e, i, n) {
                var r = this._namespace;
                return "object" == typeof t && (t = t.attr("data-" + r + "-field")), this.options.fields[t] && this.options.fields[t].validators[e] && (this.options.fields[t].validators[e][i] = n, this.updateStatus(t, this.STATUS_NOT_VALIDATED, e)), this
            }, validateContainer: function (e) {
                var i = this, n = this._namespace, r = {}, a = "string" == typeof e ? t(e) : e;
                if (0 === a.length) return this;
                a.find("[data-" + n + "-field]").each(function () {
                    var e = t(this), a = e.attr("data-" + n + "-field");
                    i._isExcluded(e) || r[a] || (r[a] = e)
                });
                for (var s in r) this.validateField(r[s]);
                return this
            }
        }, t.fn.formValidation = function (e) {
            var i = arguments;
            return this.each(function () {
                var n = t(this), r = n.data("formValidation"), a = "object" == typeof e && e;
                if (!r) {
                    var s = (a.framework || n.attr("data-fv-framework") || "bootstrap").toLowerCase();
                    switch (s) {
                        case"foundation":
                            r = new FormValidation.Framework.Foundation(this, a);
                            break;
                        case"pure":
                            r = new FormValidation.Framework.Pure(this, a);
                            break;
                        case"semantic":
                            r = new FormValidation.Framework.Semantic(this, a);
                            break;
                        case"uikit":
                            r = new FormValidation.Framework.UIKit(this, a);
                            break;
                        case"bootstrap":
                        default:
                            r = new FormValidation.Framework.Bootstrap(this, a)
                    }
                    n.addClass("fv-form-" + s).data("formValidation", r)
                }
                "string" == typeof e && r[e].apply(r, Array.prototype.slice.call(i, 1))
            })
        }, t.fn.formValidation.Constructor = FormValidation.Base, t.fn.formValidation.DEFAULT_OPTIONS = {
            autoFocus: !0,
            elementClass: "fv-form",
            events: {
                formInit: "init.form.fv",
                formError: "err.form.fv",
                formSuccess: "success.form.fv",
                fieldAdded: "added.field.fv",
                fieldRemoved: "removed.field.fv",
                fieldInit: "init.field.fv",
                fieldError: "err.field.fv",
                fieldSuccess: "success.field.fv",
                fieldStatus: "status.field.fv",
                localeChanged: "changed.locale.fv",
                validatorError: "err.validator.fv",
                validatorSuccess: "success.validator.fv"
            },
            excluded: [":disabled", ":hidden", ":not(:visible)"],
            fields: null,
            live: "enabled",
            locale: "en_US",
            message: "This value is not valid",
            threshold: null,
            verbose: !0,
            button: {selector: '[type="submit"]', disabled: ""},
            control: {valid: "", invalid: ""},
            err: {clazz: "", container: null, parent: null},
            icon: {valid: null, invalid: null, validating: null, feedback: ""},
            row: {selector: null, valid: "", invalid: "", feedback: ""}
        }
    }(jQuery), function (t) {
        FormValidation.Helper = {
            call: function (t, e) {
                if ("function" == typeof t) return t.apply(this, e);
                if ("string" == typeof t) {
                    "()" === t.substring(t.length - 2) && (t = t.substring(0, t.length - 2));
                    for (var i = t.split("."), n = i.pop(), r = window, a = 0; a < i.length; a++) r = r[i[a]];
                    return "undefined" == typeof r[n] ? null : r[n].apply(this, e)
                }
            }, date: function (t, e, i, n) {
                if (isNaN(t) || isNaN(e) || isNaN(i)) return !1;
                if (i.length > 2 || e.length > 2 || t.length > 4) return !1;
                if (i = parseInt(i, 10), e = parseInt(e, 10), t = parseInt(t, 10), 1e3 > t || t > 9999 || 0 >= e || e > 12) return !1;
                var r = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                if ((t % 400 === 0 || t % 100 !== 0 && t % 4 === 0) && (r[1] = 29), 0 >= i || i > r[e - 1]) return !1;
                if (n === !0) {
                    var a = new Date, s = a.getFullYear(), o = a.getMonth(), l = a.getDate();
                    return s > t || t === s && o > e - 1 || t === s && e - 1 === o && l > i
                }
                return !0
            }, format: function (e, i) {
                t.isArray(i) || (i = [i]);
                for (var n in i) e = e.replace("%s", i[n]);
                return e
            }, luhn: function (t) {
                for (var e = t.length, i = 0, n = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]], r = 0; e--;) r += n[i][parseInt(t.charAt(e), 10)], i ^= 1;
                return r % 10 === 0 && r > 0
            }, mod11And10: function (t) {
                for (var e = 5, i = t.length, n = 0; i > n; n++) e = (2 * (e || 10) % 11 + parseInt(t.charAt(n), 10)) % 10;
                return 1 === e
            }, mod37And36: function (t, e) {
                e = e || "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                for (var i = e.length, n = t.length, r = Math.floor(i / 2), a = 0; n > a; a++) r = (2 * (r || i) % (i + 1) + e.indexOf(t.charAt(a))) % i;
                return 1 === r
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {base64: {"default": "Please enter a valid base 64 encoded"}}}), FormValidation.Validator.base64 = {
            validate: function (t, e, i) {
                var n = t.getFieldValue(e, "base64");
                return "" === n ? !0 : /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(n)
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {
            en_US: {
                between: {
                    "default": "Please enter a value between %s and %s",
                    notInclusive: "Please enter a value between %s and %s strictly"
                }
            }
        }), FormValidation.Validator.between = {
            html5Attributes: {
                message: "message",
                min: "min",
                max: "max",
                inclusive: "inclusive"
            }, enableByHtml5: function (t) {
                return "range" === t.attr("type") ? {min: t.attr("min"), max: t.attr("max")} : !1
            }, validate: function (e, i, n) {
                var r = e.getFieldValue(i, "between");
                if ("" === r) return !0;
                if (r = this._format(r), !t.isNumeric(r)) return !1;
                var a = e.getLocale(), s = t.isNumeric(n.min) ? n.min : e.getDynamicOption(i, n.min),
                    o = t.isNumeric(n.max) ? n.max : e.getDynamicOption(i, n.max), l = this._format(s),
                    d = this._format(o);
                return r = parseFloat(r), n.inclusive === !0 || void 0 === n.inclusive ? {
                    valid: r >= l && d >= r,
                    message: FormValidation.Helper.format(n.message || FormValidation.I18n[a].between["default"], [s, o])
                } : {
                    valid: r > l && d > r,
                    message: FormValidation.Helper.format(n.message || FormValidation.I18n[a].between.notInclusive, [s, o])
                }
            }, _format: function (t) {
                return (t + "").replace(",", ".")
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {bic: {"default": "Please enter a valid BIC number"}}}), FormValidation.Validator.bic = {
            validate: function (t, e, i) {
                var n = t.getFieldValue(e, "bic");
                return "" === n ? !0 : /^[a-zA-Z]{6}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?$/.test(n)
            }
        }
    }(jQuery), function (t) {
        FormValidation.Validator.blank = {
            validate: function (t, e, i) {
                return !0
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {callback: {"default": "Please enter a valid value"}}}), FormValidation.Validator.callback = {
            html5Attributes: {
                message: "message",
                callback: "callback"
            }, validate: function (e, i, n) {
                var r = e.getFieldValue(i, "callback"), a = new t.Deferred, s = {valid: !0};
                if (n.callback) {
                    var o = FormValidation.Helper.call(n.callback, [r, e, i]);
                    s = "boolean" == typeof o ? {valid: o} : o
                }
                return a.resolve(i, "callback", s), a
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {
            en_US: {
                choice: {
                    "default": "Please enter a valid value",
                    less: "Please choose %s options at minimum",
                    more: "Please choose %s options at maximum",
                    between: "Please choose %s - %s options"
                }
            }
        }), FormValidation.Validator.choice = {
            html5Attributes: {message: "message", min: "min", max: "max"},
            validate: function (e, i, n) {
                var r = e.getLocale(), a = e.getNamespace(),
                    s = i.is("select") ? e.getFieldElements(i.attr("data-" + a + "-field")).find("option").filter(":selected").length : e.getFieldElements(i.attr("data-" + a + "-field")).filter(":checked").length,
                    o = n.min ? t.isNumeric(n.min) ? n.min : e.getDynamicOption(i, n.min) : null,
                    l = n.max ? t.isNumeric(n.max) ? n.max : e.getDynamicOption(i, n.max) : null, d = !0,
                    c = n.message || FormValidation.I18n[r].choice["default"];
                switch ((o && s < parseInt(o, 10) || l && s > parseInt(l, 10)) && (d = !1), !0) {
                    case!!o && !!l:
                        c = FormValidation.Helper.format(n.message || FormValidation.I18n[r].choice.between, [parseInt(o, 10), parseInt(l, 10)]);
                        break;
                    case!!o:
                        c = FormValidation.Helper.format(n.message || FormValidation.I18n[r].choice.less, parseInt(o, 10));
                        break;
                    case!!l:
                        c = FormValidation.Helper.format(n.message || FormValidation.I18n[r].choice.more, parseInt(l, 10))
                }
                return {valid: d, message: c}
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {color: {"default": "Please enter a valid color"}}}), FormValidation.Validator.color = {
            html5Attributes: {
                message: "message",
                type: "type"
            },
            enableByHtml5: function (t) {
                return "color" === t.attr("type")
            },
            SUPPORTED_TYPES: ["hex", "rgb", "rgba", "hsl", "hsla", "keyword"],
            KEYWORD_COLORS: ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkgrey", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow", "grey", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightgrey", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "transparent", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"],
            validate: function (e, i, n) {
                var r = e.getFieldValue(i, "color");
                if ("" === r) return !0;
                if (this.enableByHtml5(i)) return /^#[0-9A-F]{6}$/i.test(r);
                var a = n.type || this.SUPPORTED_TYPES;
                t.isArray(a) || (a = a.replace(/s/g, "").split(","));
                for (var s, o, l = !1, d = 0; d < a.length; d++) if (o = a[d], s = "_" + o.toLowerCase(), l = l || this[s](r)) return !0;
                return !1
            },
            _hex: function (t) {
                return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t)
            },
            _hsl: function (t) {
                return /^hsl\((\s*(-?\d+)\s*,)(\s*(\b(0?\d{1,2}|100)\b%)\s*,)(\s*(\b(0?\d{1,2}|100)\b%)\s*)\)$/.test(t)
            },
            _hsla: function (t) {
                return /^hsla\((\s*(-?\d+)\s*,)(\s*(\b(0?\d{1,2}|100)\b%)\s*,){2}(\s*(0?(\.\d+)?|1(\.0+)?)\s*)\)$/.test(t)
            },
            _keyword: function (e) {
                return t.inArray(e, this.KEYWORD_COLORS) >= 0
            },
            _rgb: function (t) {
                var e = /^rgb\((\s*(\b([01]?\d{1,2}|2[0-4]\d|25[0-5])\b)\s*,){2}(\s*(\b([01]?\d{1,2}|2[0-4]\d|25[0-5])\b)\s*)\)$/,
                    i = /^rgb\((\s*(\b(0?\d{1,2}|100)\b%)\s*,){2}(\s*(\b(0?\d{1,2}|100)\b%)\s*)\)$/;
                return e.test(t) || i.test(t)
            },
            _rgba: function (t) {
                var e = /^rgba\((\s*(\b([01]?\d{1,2}|2[0-4]\d|25[0-5])\b)\s*,){3}(\s*(0?(\.\d+)?|1(\.0+)?)\s*)\)$/,
                    i = /^rgba\((\s*(\b(0?\d{1,2}|100)\b%)\s*,){3}(\s*(0?(\.\d+)?|1(\.0+)?)\s*)\)$/;
                return e.test(t) || i.test(t)
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {creditCard: {"default": "Please enter a valid credit card number"}}}), FormValidation.Validator.creditCard = {
            validate: function (e, i, n) {
                var r = e.getFieldValue(i, "creditCard");
                if ("" === r) return !0;
                if (/[^0-9-\s]+/.test(r)) return !1;
                if (r = r.replace(/\D/g, ""), !FormValidation.Helper.luhn(r)) return !1;
                var a, s, o = {
                    AMERICAN_EXPRESS: {length: [15], prefix: ["34", "37"]},
                    DINERS_CLUB: {length: [14], prefix: ["300", "301", "302", "303", "304", "305", "36"]},
                    DINERS_CLUB_US: {length: [16], prefix: ["54", "55"]},
                    DISCOVER: {
                        length: [16],
                        prefix: ["6011", "622126", "622127", "622128", "622129", "62213", "62214", "62215", "62216", "62217", "62218", "62219", "6222", "6223", "6224", "6225", "6226", "6227", "6228", "62290", "62291", "622920", "622921", "622922", "622923", "622924", "622925", "644", "645", "646", "647", "648", "649", "65"]
                    },
                    JCB: {
                        length: [16], prefix: ["3528", "3529", "353", "354", "355", "356", "357", "358"]
                    },
                    LASER: {length: [16, 17, 18, 19], prefix: ["6304", "6706", "6771", "6709"]},
                    MAESTRO: {
                        length: [12, 13, 14, 15, 16, 17, 18, 19],
                        prefix: ["5018", "5020", "5038", "6304", "6759", "6761", "6762", "6763", "6764", "6765", "6766"]
                    },
                    MASTERCARD: {length: [16], prefix: ["51", "52", "53", "54", "55"]},
                    SOLO: {length: [16, 18, 19], prefix: ["6334", "6767"]},
                    UNIONPAY: {
                        length: [16, 17, 18, 19],
                        prefix: ["622126", "622127", "622128", "622129", "62213", "62214", "62215", "62216", "62217", "62218", "62219", "6222", "6223", "6224", "6225", "6226", "6227", "6228", "62290", "62291", "622920", "622921", "622922", "622923", "622924", "622925"]
                    },
                    VISA: {length: [16], prefix: ["4"]}
                };
                for (a in o) for (s in o[a].prefix) if (r.substr(0, o[a].prefix[s].length) === o[a].prefix[s] && -1 !== t.inArray(r.length, o[a].length)) return {
                    valid: !0,
                    type: a
                };
                return !1
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {cusip: {"default": "Please enter a valid CUSIP number"}}}), FormValidation.Validator.cusip = {
            validate: function (e, i, n) {
                var r = e.getFieldValue(i, "cusip");
                if ("" === r) return !0;
                if (r = r.toUpperCase(), !/^[0-9A-Z]{9}$/.test(r)) return !1;
                for (var a = t.map(r.split(""), function (t) {
                    var e = t.charCodeAt(0);
                    return e >= "A".charCodeAt(0) && e <= "Z".charCodeAt(0) ? e - "A".charCodeAt(0) + 10 : t
                }), s = a.length, o = 0, l = 0; s - 1 > l; l++) {
                    var d = parseInt(a[l], 10);
                    l % 2 !== 0 && (d *= 2), d > 9 && (d -= 9), o += d
                }
                return o = (10 - o % 10) % 10, o === parseInt(a[s - 1], 10)
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {cvv: {"default": "Please enter a valid CVV number"}}}), FormValidation.Validator.cvv = {
            html5Attributes: {
                message: "message",
                ccfield: "creditCardField"
            }, init: function (t, e, i) {
                if (i.creditCardField) {
                    var n = t.getFieldElements(i.creditCardField);
                    t.onLiveChange(n, "live_cvv", function () {
                        var i = t.getStatus(e, "cvv");
                        i !== t.STATUS_NOT_VALIDATED && t.revalidateField(e)
                    })
                }
            }, destroy: function (t, e, i) {
                if (i.creditCardField) {
                    var n = t.getFieldElements(i.creditCardField);
                    t.offLiveChange(n, "live_cvv")
                }
            }, validate: function (e, i, n) {
                var r = e.getFieldValue(i, "cvv");
                if ("" === r) return !0;
                if (!/^[0-9]{3,4}$/.test(r)) return !1;
                if (!n.creditCardField) return !0;
                var a = e.getFieldElements(n.creditCardField).val();
                if ("" === a) return !0;
                a = a.replace(/\D/g, "");
                var s, o, l = {
                    AMERICAN_EXPRESS: {length: [15], prefix: ["34", "37"]},
                    DINERS_CLUB: {length: [14], prefix: ["300", "301", "302", "303", "304", "305", "36"]},
                    DINERS_CLUB_US: {length: [16], prefix: ["54", "55"]},
                    DISCOVER: {
                        length: [16],
                        prefix: ["6011", "622126", "622127", "622128", "622129", "62213", "62214", "62215", "62216", "62217", "62218", "62219", "6222", "6223", "6224", "6225", "6226", "6227", "6228", "62290", "62291", "622920", "622921", "622922", "622923", "622924", "622925", "644", "645", "646", "647", "648", "649", "65"]
                    },
                    JCB: {length: [16], prefix: ["3528", "3529", "353", "354", "355", "356", "357", "358"]},
                    LASER: {length: [16, 17, 18, 19], prefix: ["6304", "6706", "6771", "6709"]},
                    MAESTRO: {
                        length: [12, 13, 14, 15, 16, 17, 18, 19],
                        prefix: ["5018", "5020", "5038", "6304", "6759", "6761", "6762", "6763", "6764", "6765", "6766"]
                    },
                    MASTERCARD: {length: [16], prefix: ["51", "52", "53", "54", "55"]},
                    SOLO: {length: [16, 18, 19], prefix: ["6334", "6767"]},
                    UNIONPAY: {
                        length: [16, 17, 18, 19],
                        prefix: ["622126", "622127", "622128", "622129", "62213", "62214", "62215", "62216", "62217", "62218", "62219", "6222", "6223", "6224", "6225", "6226", "6227", "6228", "62290", "62291", "622920", "622921", "622922", "622923", "622924", "622925"]
                    },
                    VISA: {length: [16], prefix: ["4"]}
                }, d = null;
                for (s in l) for (o in l[s].prefix) if (a.substr(0, l[s].prefix[o].length) === l[s].prefix[o] && -1 !== t.inArray(a.length, l[s].length)) {
                    d = s;
                    break
                }
                return null === d ? !1 : "AMERICAN_EXPRESS" === d ? 4 === r.length : 3 === r.length
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {
            en_US: {
                date: {
                    "default": "Please enter a valid date",
                    min: "Please enter a date after %s",
                    max: "Please enter a date before %s",
                    range: "Please enter a date in the range %s - %s"
                }
            }
        }), FormValidation.Validator.date = {
            html5Attributes: {
                message: "message",
                format: "format",
                min: "min",
                max: "max",
                separator: "separator"
            }, validate: function (e, i, n) {
                var r = e.getFieldValue(i, "date");
                if ("" === r) return !0;
                n.format = n.format || "MM/DD/YYYY", "date" === i.attr("type") && (n.format = "YYYY-MM-DD");
                var a = e.getLocale(), s = n.message || FormValidation.I18n[a].date["default"], o = n.format.split(" "),
                    l = o[0], d = o.length > 1 ? o[1] : null, c = o.length > 2 ? o[2] : null, u = r.split(" "),
                    h = u[0], p = u.length > 1 ? u[1] : null;
                if (o.length !== u.length) return {valid: !1, message: s};
                var f = n.separator;
                if (f || (f = -1 !== h.indexOf("/") ? "/" : -1 !== h.indexOf("-") ? "-" : null), null === f || -1 === h.indexOf(f)) return {
                    valid: !1,
                    message: s
                };
                if (h = h.split(f), l = l.split(f), h.length !== l.length) return {valid: !1, message: s};
                var m = h[t.inArray("YYYY", l)], g = h[t.inArray("MM", l)], v = h[t.inArray("DD", l)];
                if (!m || !g || !v || 4 !== m.length) return {valid: !1, message: s};
                var b = null, y = null, w = null;
                if (d) {
                    if (d = d.split(":"), p = p.split(":"), d.length !== p.length) return {valid: !1, message: s};
                    if (y = p.length > 0 ? p[0] : null, b = p.length > 1 ? p[1] : null, w = p.length > 2 ? p[2] : null, "" === y || "" === b || "" === w) return {
                        valid: !1,
                        message: s
                    };
                    if (w) {
                        if (isNaN(w) || w.length > 2) return {valid: !1, message: s};
                        if (w = parseInt(w, 10), 0 > w || w > 60) return {valid: !1, message: s}
                    }
                    if (y) {
                        if (isNaN(y) || y.length > 2) return {valid: !1, message: s};
                        if (y = parseInt(y, 10), 0 > y || y >= 24 || c && y > 12) return {valid: !1, message: s}
                    }
                    if (b) {
                        if (isNaN(b) || b.length > 2) return {valid: !1, message: s};
                        if (b = parseInt(b, 10), 0 > b || b > 59) return {valid: !1, message: s}
                    }
                }
                var S = FormValidation.Helper.date(m, g, v), _ = null, x = null, D = n.min, T = n.max;
                switch (D && (isNaN(Date.parse(D)) && (D = e.getDynamicOption(i, D)), _ = D instanceof Date ? D : this._parseDate(D, l, f), D = D instanceof Date ? this._formatDate(D, n.format) : D), T && (isNaN(Date.parse(T)) && (T = e.getDynamicOption(i, T)), x = T instanceof Date ? T : this._parseDate(T, l, f), T = T instanceof Date ? this._formatDate(T, n.format) : T), h = new Date(m, g - 1, v, y, b, w), !0) {
                    case D && !T && S:
                        S = h.getTime() >= _.getTime(), s = n.message || FormValidation.Helper.format(FormValidation.I18n[a].date.min, D);
                        break;
                    case T && !D && S:
                        S = h.getTime() <= x.getTime(), s = n.message || FormValidation.Helper.format(FormValidation.I18n[a].date.max, T);
                        break;
                    case T && D && S:
                        S = h.getTime() <= x.getTime() && h.getTime() >= _.getTime(), s = n.message || FormValidation.Helper.format(FormValidation.I18n[a].date.range, [D, T])
                }
                return {valid: S, message: s}
            }, _parseDate: function (e, i, n) {
                var r = 0, a = 0, s = 0, o = e.split(" "), l = o[0], d = o.length > 1 ? o[1] : null;
                l = l.split(n);
                var c = l[t.inArray("YYYY", i)], u = l[t.inArray("MM", i)], h = l[t.inArray("DD", i)];
                return d && (d = d.split(":"), a = d.length > 0 ? d[0] : null, r = d.length > 1 ? d[1] : null, s = d.length > 2 ? d[2] : null), new Date(c, u - 1, h, a, r, s)
            }, _formatDate: function (t, e) {
                e = e.replace(/Y/g, "y").replace(/M/g, "m").replace(/D/g, "d").replace(/:m/g, ":M").replace(/:mm/g, ":MM").replace(/:S/, ":s").replace(/:SS/, ":ss");
                var i = {
                    d: function (t) {
                        return t.getDate()
                    }, dd: function (t) {
                        var e = t.getDate();
                        return 10 > e ? "0" + e : e
                    }, m: function (t) {
                        return t.getMonth() + 1
                    }, mm: function (t) {
                        var e = t.getMonth() + 1;
                        return 10 > e ? "0" + e : e
                    }, yy: function (t) {
                        return ("" + t.getFullYear()).substr(2)
                    }, yyyy: function (t) {
                        return t.getFullYear()
                    }, h: function (t) {
                        return t.getHours() % 12 || 12
                    }, hh: function (t) {
                        var e = t.getHours() % 12 || 12;
                        return 10 > e ? "0" + e : e
                    }, H: function (t) {
                        return t.getHours()
                    }, HH: function (t) {
                        var e = t.getHours();
                        return 10 > e ? "0" + e : e
                    }, M: function (t) {
                        return t.getMinutes()
                    }, MM: function (t) {
                        var e = t.getMinutes();
                        return 10 > e ? "0" + e : e
                    }, s: function (t) {
                        return t.getSeconds()
                    }, ss: function (t) {
                        var e = t.getSeconds();
                        return 10 > e ? "0" + e : e
                    }
                };
                return e.replace(/d{1,4}|m{1,4}|yy(?:yy)?|([HhMs])\1?|"[^"]*"|'[^']*'/g, function (e) {
                    return i[e] ? i[e](t) : e.slice(1, e.length - 1)
                })
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {different: {"default": "Please enter a different value"}}}), FormValidation.Validator.different = {
            html5Attributes: {
                message: "message",
                field: "field"
            }, init: function (t, e, i) {
                for (var n = i.field.split(","), r = 0; r < n.length; r++) {
                    var a = t.getFieldElements(n[r]);
                    t.onLiveChange(a, "live_different", function () {
                        var i = t.getStatus(e, "different");
                        i !== t.STATUS_NOT_VALIDATED && t.revalidateField(e)
                    })
                }
            }, destroy: function (t, e, i) {
                for (var n = i.field.split(","), r = 0; r < n.length; r++) {
                    var a = t.getFieldElements(n[r]);
                    t.offLiveChange(a, "live_different")
                }
            }, validate: function (t, e, i) {
                var n = t.getFieldValue(e, "different");
                if ("" === n) return !0;
                for (var r = i.field.split(","), a = !0, s = 0; s < r.length; s++) {
                    var o = t.getFieldElements(r[s]);
                    if (null != o && 0 !== o.length) {
                        var l = t.getFieldValue(o, "different");
                        n === l ? a = !1 : "" !== l && t.updateStatus(o, t.STATUS_VALID, "different")
                    }
                }
                return a
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {digits: {"default": "Please enter only digits"}}}), FormValidation.Validator.digits = {
            validate: function (t, e, i) {
                var n = t.getFieldValue(e, "digits");
                return "" === n ? !0 : /^\d+$/.test(n)
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {ean: {"default": "Please enter a valid EAN number"}}}), FormValidation.Validator.ean = {
            validate: function (t, e, i) {
                var n = t.getFieldValue(e, "ean");
                if ("" === n) return !0;
                if (!/^(\d{8}|\d{12}|\d{13})$/.test(n)) return !1;
                for (var r = n.length, a = 0, s = 8 === r ? [3, 1] : [1, 3], o = 0; r - 1 > o; o++) a += parseInt(n.charAt(o), 10) * s[o % 2];
                return a = (10 - a % 10) % 10, a + "" === n.charAt(r - 1)
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {ein: {"default": "Please enter a valid EIN number"}}}), FormValidation.Validator.ein = {
            CAMPUS: {
                ANDOVER: ["10", "12"],
                ATLANTA: ["60", "67"],
                AUSTIN: ["50", "53"],
                BROOKHAVEN: ["01", "02", "03", "04", "05", "06", "11", "13", "14", "16", "21", "22", "23", "25", "34", "51", "52", "54", "55", "56", "57", "58", "59", "65"],
                CINCINNATI: ["30", "32", "35", "36", "37", "38", "61"],
                FRESNO: ["15", "24"],
                KANSAS_CITY: ["40", "44"],
                MEMPHIS: ["94", "95"],
                OGDEN: ["80", "90"],
                PHILADELPHIA: ["33", "39", "41", "42", "43", "46", "48", "62", "63", "64", "66", "68", "71", "72", "73", "74", "75", "76", "77", "81", "82", "83", "84", "85", "86", "87", "88", "91", "92", "93", "98", "99"],
                INTERNET: ["20", "26", "27", "45", "46"],
                SMALL_BUSINESS_ADMINISTRATION: ["31"]
            }, validate: function (e, i, n) {
                var r = e.getFieldValue(i, "ein");
                if ("" === r) return !0;
                if (!/^[0-9]{2}-?[0-9]{7}$/.test(r)) return !1;
                var a = r.substr(0, 2) + "";
                for (var s in this.CAMPUS) if (-1 !== t.inArray(a, this.CAMPUS[s])) return {valid: !0, campus: s};
                return !1
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {emailAddress: {"default": "Please enter a valid email address"}}}), FormValidation.Validator.emailAddress = {
            html5Attributes: {
                message: "message",
                multiple: "multiple",
                separator: "separator"
            }, enableByHtml5: function (t) {
                return "email" === t.attr("type")
            }, validate: function (t, e, i) {
                var n = t.getFieldValue(e, "emailAddress");
                if ("" === n) return !0;
                var r = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                    a = i.multiple === !0 || "true" === i.multiple;
                if (a) {
                    for (var s = i.separator || /[,;]/, o = this._splitEmailAddresses(n, s), l = 0; l < o.length; l++) if (!r.test(o[l])) return !1;
                    return !0
                }
                return r.test(n)
            }, _splitEmailAddresses: function (t, e) {
                for (var i = t.split(/"/), n = i.length, r = [], a = "", s = 0; n > s; s++) if (s % 2 === 0) {
                    var o = i[s].split(e), l = o.length;
                    if (1 === l) a += o[0]; else {
                        r.push(a + o[0]);
                        for (var d = 1; l - 1 > d; d++) r.push(o[d]);
                        a = o[l - 1]
                    }
                } else a += '"' + i[s], n - 1 > s && (a += '"');
                return r.push(a), r
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {file: {"default": "Please choose a valid file"}}}), FormValidation.Validator.file = {
            html5Attributes: {
                extension: "extension",
                maxfiles: "maxFiles",
                minfiles: "minFiles",
                maxsize: "maxSize",
                minsize: "minSize",
                maxtotalsize: "maxTotalSize",
                mintotalsize: "minTotalSize",
                message: "message",
                type: "type"
            }, validate: function (e, i, n) {
                var r = e.getFieldValue(i, "file");
                if ("" === r) return !0;
                var a, s = n.extension ? n.extension.toLowerCase().split(",") : null,
                    o = n.type ? n.type.toLowerCase().split(",") : null,
                    l = window.File && window.FileList && window.FileReader;
                if (l) {
                    var d = i.get(0).files, c = d.length, u = 0;
                    if (n.maxFiles && c > parseInt(n.maxFiles, 10) || n.minFiles && c < parseInt(n.minFiles, 10)) return !1;
                    for (var h = 0; c > h; h++) if (u += d[h].size, a = d[h].name.substr(d[h].name.lastIndexOf(".") + 1), n.minSize && d[h].size < parseInt(n.minSize, 10) || n.maxSize && d[h].size > parseInt(n.maxSize, 10) || s && -1 === t.inArray(a.toLowerCase(), s) || d[h].type && o && -1 === t.inArray(d[h].type.toLowerCase(), o)) return !1;
                    if (n.maxTotalSize && u > parseInt(n.maxTotalSize, 10) || n.minTotalSize && u < parseInt(n.minTotalSize, 10)) return !1
                } else if (a = r.substr(r.lastIndexOf(".") + 1), s && -1 === t.inArray(a.toLowerCase(), s)) return !1;
                return !0
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {
            en_US: {
                greaterThan: {
                    "default": "Please enter a value greater than or equal to %s",
                    notInclusive: "Please enter a value greater than %s"
                }
            }
        }), FormValidation.Validator.greaterThan = {
            html5Attributes: {
                message: "message",
                value: "value",
                inclusive: "inclusive"
            }, enableByHtml5: function (t) {
                var e = t.attr("type"), i = t.attr("min");
                return i && "date" !== e ? {value: i} : !1
            }, validate: function (e, i, n) {
                var r = e.getFieldValue(i, "greaterThan");
                if ("" === r) return !0;
                if (r = this._format(r), !t.isNumeric(r)) return !1;
                var a = e.getLocale(), s = t.isNumeric(n.value) ? n.value : e.getDynamicOption(i, n.value),
                    o = this._format(s);
                return r = parseFloat(r), n.inclusive === !0 || void 0 === n.inclusive ? {
                    valid: r >= o,
                    message: FormValidation.Helper.format(n.message || FormValidation.I18n[a].greaterThan["default"], s)
                } : {
                    valid: r > o,
                    message: FormValidation.Helper.format(n.message || FormValidation.I18n[a].greaterThan.notInclusive, s)
                }
            }, _format: function (t) {
                return (t + "").replace(",", ".")
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {grid: {"default": "Please enter a valid GRId number"}}}), FormValidation.Validator.grid = {
            validate: function (t, e, i) {
                var n = t.getFieldValue(e, "grid");
                return "" === n ? !0 : (n = n.toUpperCase(), /^[GRID:]*([0-9A-Z]{2})[-\s]*([0-9A-Z]{5})[-\s]*([0-9A-Z]{10})[-\s]*([0-9A-Z]{1})$/g.test(n) ? (n = n.replace(/\s/g, "").replace(/-/g, ""), "GRID:" === n.substr(0, 5) && (n = n.substr(5)), FormValidation.Helper.mod37And36(n)) : !1)
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {hex: {"default": "Please enter a valid hexadecimal number"}}}), FormValidation.Validator.hex = {
            validate: function (t, e, i) {
                var n = t.getFieldValue(e, "hex");
                return "" === n ? !0 : /^[0-9a-fA-F]+$/.test(n)
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {
            en_US: {
                iban: {
                    "default": "Please enter a valid IBAN number",
                    country: "Please enter a valid IBAN number in %s",
                    countries: {
                        AD: "Andorra",
                        AE: "United Arab Emirates",
                        AL: "Albania",
                        AO: "Angola",
                        AT: "Austria",
                        AZ: "Azerbaijan",
                        BA: "Bosnia and Herzegovina",
                        BE: "Belgium",
                        BF: "Burkina Faso",
                        BG: "Bulgaria",
                        BH: "Bahrain",
                        BI: "Burundi",
                        BJ: "Benin",
                        BR: "Brazil",
                        CH: "Switzerland",
                        CI: "Ivory Coast",
                        CM: "Cameroon",
                        CR: "Costa Rica",
                        CV: "Cape Verde",
                        CY: "Cyprus",
                        CZ: "Czech Republic",
                        DE: "Germany",
                        DK: "Denmark",
                        DO: "Dominican Republic",
                        DZ: "Algeria",
                        EE: "Estonia",
                        ES: "Spain",
                        FI: "Finland",
                        FO: "Faroe Islands",
                        FR: "France",
                        GB: "United Kingdom",
                        GE: "Georgia",
                        GI: "Gibraltar",
                        GL: "Greenland",
                        GR: "Greece",
                        GT: "Guatemala",
                        HR: "Croatia",
                        HU: "Hungary",
                        IE: "Ireland",
                        IL: "Israel",
                        IR: "Iran",
                        IS: "Iceland",
                        IT: "Italy",
                        JO: "Jordan",
                        KW: "Kuwait",
                        KZ: "Kazakhstan",
                        LB: "Lebanon",
                        LI: "Liechtenstein",
                        LT: "Lithuania",
                        LU: "Luxembourg",
                        LV: "Latvia",
                        MC: "Monaco",
                        MD: "Moldova",
                        ME: "Montenegro",
                        MG: "Madagascar",
                        MK: "Macedonia",
                        ML: "Mali",
                        MR: "Mauritania",
                        MT: "Malta",
                        MU: "Mauritius",
                        MZ: "Mozambique",
                        NL: "Netherlands",
                        NO: "Norway",
                        PK: "Pakistan",
                        PL: "Poland",
                        PS: "Palestine",
                        PT: "Portugal",
                        QA: "Qatar",
                        RO: "Romania",
                        RS: "Serbia",
                        SA: "Saudi Arabia",
                        SE: "Sweden",
                        SI: "Slovenia",
                        SK: "Slovakia",
                        SM: "San Marino",
                        SN: "Senegal",
                        TN: "Tunisia",
                        TR: "Turkey",
                        VG: "Virgin Islands, British"
                    }
                }
            }
        }), FormValidation.Validator.iban = {
            html5Attributes: {message: "message", country: "country"},
            REGEX: {
                AD: "AD[0-9]{2}[0-9]{4}[0-9]{4}[A-Z0-9]{12}",
                AE: "AE[0-9]{2}[0-9]{3}[0-9]{16}",
                AL: "AL[0-9]{2}[0-9]{8}[A-Z0-9]{16}",
                AO: "AO[0-9]{2}[0-9]{21}",
                AT: "AT[0-9]{2}[0-9]{5}[0-9]{11}",
                AZ: "AZ[0-9]{2}[A-Z]{4}[A-Z0-9]{20}",
                BA: "BA[0-9]{2}[0-9]{3}[0-9]{3}[0-9]{8}[0-9]{2}",
                BE: "BE[0-9]{2}[0-9]{3}[0-9]{7}[0-9]{2}",
                BF: "BF[0-9]{2}[0-9]{23}",
                BG: "BG[0-9]{2}[A-Z]{4}[0-9]{4}[0-9]{2}[A-Z0-9]{8}",
                BH: "BH[0-9]{2}[A-Z]{4}[A-Z0-9]{14}",
                BI: "BI[0-9]{2}[0-9]{12}",
                BJ: "BJ[0-9]{2}[A-Z]{1}[0-9]{23}",
                BR: "BR[0-9]{2}[0-9]{8}[0-9]{5}[0-9]{10}[A-Z][A-Z0-9]",
                CH: "CH[0-9]{2}[0-9]{5}[A-Z0-9]{12}",
                CI: "CI[0-9]{2}[A-Z]{1}[0-9]{23}",
                CM: "CM[0-9]{2}[0-9]{23}",
                CR: "CR[0-9]{2}[0-9]{3}[0-9]{14}",
                CV: "CV[0-9]{2}[0-9]{21}",
                CY: "CY[0-9]{2}[0-9]{3}[0-9]{5}[A-Z0-9]{16}",
                CZ: "CZ[0-9]{2}[0-9]{20}",
                DE: "DE[0-9]{2}[0-9]{8}[0-9]{10}",
                DK: "DK[0-9]{2}[0-9]{14}",
                DO: "DO[0-9]{2}[A-Z0-9]{4}[0-9]{20}",
                DZ: "DZ[0-9]{2}[0-9]{20}",
                EE: "EE[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{11}[0-9]{1}",
                ES: "ES[0-9]{2}[0-9]{4}[0-9]{4}[0-9]{1}[0-9]{1}[0-9]{10}",
                FI: "FI[0-9]{2}[0-9]{6}[0-9]{7}[0-9]{1}",
                FO: "FO[0-9]{2}[0-9]{4}[0-9]{9}[0-9]{1}",
                FR: "FR[0-9]{2}[0-9]{5}[0-9]{5}[A-Z0-9]{11}[0-9]{2}",
                GB: "GB[0-9]{2}[A-Z]{4}[0-9]{6}[0-9]{8}",
                GE: "GE[0-9]{2}[A-Z]{2}[0-9]{16}",
                GI: "GI[0-9]{2}[A-Z]{4}[A-Z0-9]{15}",
                GL: "GL[0-9]{2}[0-9]{4}[0-9]{9}[0-9]{1}",
                GR: "GR[0-9]{2}[0-9]{3}[0-9]{4}[A-Z0-9]{16}",
                GT: "GT[0-9]{2}[A-Z0-9]{4}[A-Z0-9]{20}",
                HR: "HR[0-9]{2}[0-9]{7}[0-9]{10}",
                HU: "HU[0-9]{2}[0-9]{3}[0-9]{4}[0-9]{1}[0-9]{15}[0-9]{1}",
                IE: "IE[0-9]{2}[A-Z]{4}[0-9]{6}[0-9]{8}",
                IL: "IL[0-9]{2}[0-9]{3}[0-9]{3}[0-9]{13}",
                IR: "IR[0-9]{2}[0-9]{22}",
                IS: "IS[0-9]{2}[0-9]{4}[0-9]{2}[0-9]{6}[0-9]{10}",
                IT: "IT[0-9]{2}[A-Z]{1}[0-9]{5}[0-9]{5}[A-Z0-9]{12}",
                JO: "JO[0-9]{2}[A-Z]{4}[0-9]{4}[0]{8}[A-Z0-9]{10}",
                KW: "KW[0-9]{2}[A-Z]{4}[0-9]{22}",
                KZ: "KZ[0-9]{2}[0-9]{3}[A-Z0-9]{13}",
                LB: "LB[0-9]{2}[0-9]{4}[A-Z0-9]{20}",
                LI: "LI[0-9]{2}[0-9]{5}[A-Z0-9]{12}",
                LT: "LT[0-9]{2}[0-9]{5}[0-9]{11}",
                LU: "LU[0-9]{2}[0-9]{3}[A-Z0-9]{13}",
                LV: "LV[0-9]{2}[A-Z]{4}[A-Z0-9]{13}",
                MC: "MC[0-9]{2}[0-9]{5}[0-9]{5}[A-Z0-9]{11}[0-9]{2}",
                MD: "MD[0-9]{2}[A-Z0-9]{20}",
                ME: "ME[0-9]{2}[0-9]{3}[0-9]{13}[0-9]{2}",
                MG: "MG[0-9]{2}[0-9]{23}",
                MK: "MK[0-9]{2}[0-9]{3}[A-Z0-9]{10}[0-9]{2}",
                ML: "ML[0-9]{2}[A-Z]{1}[0-9]{23}",
                MR: "MR13[0-9]{5}[0-9]{5}[0-9]{11}[0-9]{2}",
                MT: "MT[0-9]{2}[A-Z]{4}[0-9]{5}[A-Z0-9]{18}",
                MU: "MU[0-9]{2}[A-Z]{4}[0-9]{2}[0-9]{2}[0-9]{12}[0-9]{3}[A-Z]{3}",
                MZ: "MZ[0-9]{2}[0-9]{21}",
                NL: "NL[0-9]{2}[A-Z]{4}[0-9]{10}",
                NO: "NO[0-9]{2}[0-9]{4}[0-9]{6}[0-9]{1}",
                PK: "PK[0-9]{2}[A-Z]{4}[A-Z0-9]{16}",
                PL: "PL[0-9]{2}[0-9]{8}[0-9]{16}",
                PS: "PS[0-9]{2}[A-Z]{4}[A-Z0-9]{21}",
                PT: "PT[0-9]{2}[0-9]{4}[0-9]{4}[0-9]{11}[0-9]{2}",
                QA: "QA[0-9]{2}[A-Z]{4}[A-Z0-9]{21}",
                RO: "RO[0-9]{2}[A-Z]{4}[A-Z0-9]{16}",
                RS: "RS[0-9]{2}[0-9]{3}[0-9]{13}[0-9]{2}",
                SA: "SA[0-9]{2}[0-9]{2}[A-Z0-9]{18}",
                SE: "SE[0-9]{2}[0-9]{3}[0-9]{16}[0-9]{1}",
                SI: "SI[0-9]{2}[0-9]{5}[0-9]{8}[0-9]{2}",
                SK: "SK[0-9]{2}[0-9]{4}[0-9]{6}[0-9]{10}",
                SM: "SM[0-9]{2}[A-Z]{1}[0-9]{5}[0-9]{5}[A-Z0-9]{12}",
                SN: "SN[0-9]{2}[A-Z]{1}[0-9]{23}",
                TN: "TN59[0-9]{2}[0-9]{3}[0-9]{13}[0-9]{2}",
                TR: "TR[0-9]{2}[0-9]{5}[A-Z0-9]{1}[A-Z0-9]{16}",
                VG: "VG[0-9]{2}[A-Z]{4}[0-9]{16}"
            },
            validate: function (e, i, n) {
                var r = e.getFieldValue(i, "iban");
                if ("" === r) return !0;
                r = r.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
                var a = n.country;
                a ? "string" == typeof a && this.REGEX[a] || (a = e.getDynamicOption(i, a)) : a = r.substr(0, 2);
                var s = e.getLocale();
                if (!this.REGEX[a]) return !0;
                if (!new RegExp("^" + this.REGEX[a] + "$").test(r)) return {
                    valid: !1,
                    message: FormValidation.Helper.format(n.message || FormValidation.I18n[s].iban.country, FormValidation.I18n[s].iban.countries[a])
                };
                r = r.substr(4) + r.substr(0, 4), r = t.map(r.split(""), function (t) {
                    var e = t.charCodeAt(0);
                    return e >= "A".charCodeAt(0) && e <= "Z".charCodeAt(0) ? e - "A".charCodeAt(0) + 10 : t
                }), r = r.join("");
                for (var o = parseInt(r.substr(0, 1), 10), l = r.length, d = 1; l > d; ++d) o = (10 * o + parseInt(r.substr(d, 1), 10)) % 97;
                return {
                    valid: 1 === o,
                    message: FormValidation.Helper.format(n.message || FormValidation.I18n[s].iban.country, FormValidation.I18n[s].iban.countries[a])
                }
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {
            en_US: {
                id: {
                    "default": "Please enter a valid identification number",
                    country: "Please enter a valid identification number in %s",
                    countries: {
                        BA: "Bosnia and Herzegovina",
                        BG: "Bulgaria",
                        BR: "Brazil",
                        CH: "Switzerland",
                        CL: "Chile",
                        CN: "China",
                        CZ: "Czech Republic",
                        DK: "Denmark",
                        EE: "Estonia",
                        ES: "Spain",
                        FI: "Finland",
                        HR: "Croatia",
                        IE: "Ireland",
                        IS: "Iceland",
                        LT: "Lithuania",
                        LV: "Latvia",
                        ME: "Montenegro",
                        MK: "Macedonia",
                        NL: "Netherlands",
                        RO: "Romania",
                        RS: "Serbia",
                        SE: "Sweden",
                        SI: "Slovenia",
                        SK: "Slovakia",
                        SM: "San Marino",
                        TH: "Thailand",
                        ZA: "South Africa"
                    }
                }
            }
        }), FormValidation.Validator.id = {
            html5Attributes: {message: "message", country: "country"},
            COUNTRY_CODES: ["BA", "BG", "BR", "CH", "CL", "CN", "CZ", "DK", "EE", "ES", "FI", "HR", "IE", "IS", "LT", "LV", "ME", "MK", "NL", "RO", "RS", "SE", "SI", "SK", "SM", "TH", "ZA"],
            validate: function (e, i, n) {
                var r = e.getFieldValue(i, "id");
                if ("" === r) return !0;
                var a = e.getLocale(), s = n.country;
                if (s ? "string" == typeof s && -1 !== t.inArray(s.toUpperCase(), this.COUNTRY_CODES) || (s = e.getDynamicOption(i, s)) : s = r.substr(0, 2), -1 === t.inArray(s, this.COUNTRY_CODES)) return !0;
                var o = ["_", s.toLowerCase()].join("");
                return this[o](r) ? !0 : {
                    valid: !1,
                    message: FormValidation.Helper.format(n.message || FormValidation.I18n[a].id.country, FormValidation.I18n[a].id.countries[s.toUpperCase()])
                }
            },
            _validateJMBG: function (t, e) {
                if (!/^\d{13}$/.test(t)) return !1;
                var i = parseInt(t.substr(0, 2), 10), n = parseInt(t.substr(2, 2), 10),
                    r = (parseInt(t.substr(4, 3), 10), parseInt(t.substr(7, 2), 10)), a = parseInt(t.substr(12, 1), 10);
                if (i > 31 || n > 12) return !1;
                for (var s = 0, o = 0; 6 > o; o++) s += (7 - o) * (parseInt(t.charAt(o), 10) + parseInt(t.charAt(o + 6), 10));
                if (s = 11 - s % 11, 10 !== s && 11 !== s || (s = 0), s !== a) return !1;
                switch (e.toUpperCase()) {
                    case"BA":
                        return r >= 10 && 19 >= r;
                    case"MK":
                        return r >= 41 && 49 >= r;
                    case"ME":
                        return r >= 20 && 29 >= r;
                    case"RS":
                        return r >= 70 && 99 >= r;
                    case"SI":
                        return r >= 50 && 59 >= r;
                    default:
                        return !0
                }
            },
            _ba: function (t) {
                return this._validateJMBG(t, "BA")
            },
            _mk: function (t) {
                return this._validateJMBG(t, "MK")
            },
            _me: function (t) {
                return this._validateJMBG(t, "ME")
            },
            _rs: function (t) {
                return this._validateJMBG(t, "RS")
            },
            _si: function (t) {
                return this._validateJMBG(t, "SI")
            },
            _bg: function (t) {
                if (!/^\d{10}$/.test(t) && !/^\d{6}\s\d{3}\s\d{1}$/.test(t)) return !1;
                t = t.replace(/\s/g, "");
                var e = parseInt(t.substr(0, 2), 10) + 1900, i = parseInt(t.substr(2, 2), 10),
                    n = parseInt(t.substr(4, 2), 10);
                if (i > 40 ? (e += 100, i -= 40) : i > 20 && (e -= 100, i -= 20), !FormValidation.Helper.date(e, i, n)) return !1;
                for (var r = 0, a = [2, 4, 8, 5, 10, 9, 7, 3, 6], s = 0; 9 > s; s++) r += parseInt(t.charAt(s), 10) * a[s];
                return r = r % 11 % 10, r + "" === t.substr(9, 1)
            },
            _br: function (t) {
                if (t = t.replace(/\D/g, ""), /^1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11}|0{11}$/.test(t)) return !1;
                for (var e = 0, i = 0; 9 > i; i++) e += (10 - i) * parseInt(t.charAt(i), 10);
                if (e = 11 - e % 11, 10 !== e && 11 !== e || (e = 0), e + "" !== t.charAt(9)) return !1;
                var n = 0;
                for (i = 0; 10 > i; i++) n += (11 - i) * parseInt(t.charAt(i), 10);
                return n = 11 - n % 11, 10 !== n && 11 !== n || (n = 0), n + "" === t.charAt(10)
            },
            _ch: function (t) {
                if (!/^756[\.]{0,1}[0-9]{4}[\.]{0,1}[0-9]{4}[\.]{0,1}[0-9]{2}$/.test(t)) return !1;
                t = t.replace(/\D/g, "").substr(3);
                for (var e = t.length, i = 0, n = 8 === e ? [3, 1] : [1, 3], r = 0; e - 1 > r; r++) i += parseInt(t.charAt(r), 10) * n[r % 2];
                return i = 10 - i % 10, i + "" === t.charAt(e - 1)
            },
            _cl: function (t) {
                if (!/^\d{7,8}[-]{0,1}[0-9K]$/i.test(t)) return !1;
                for (t = t.replace(/\-/g, ""); t.length < 9;) t = "0" + t;
                for (var e = 0, i = [3, 2, 7, 6, 5, 4, 3, 2], n = 0; 8 > n; n++) e += parseInt(t.charAt(n), 10) * i[n];
                return e = 11 - e % 11, 11 === e ? e = 0 : 10 === e && (e = "K"), e + "" === t.charAt(8).toUpperCase()
            },
            _cn: function (e) {
                if (e = e.trim(), !/^\d{15}$/.test(e) && !/^\d{17}[\dXx]{1}$/.test(e)) return !1;
                var i = {
                    11: {0: [0], 1: [[0, 9], [11, 17]], 2: [0, 28, 29]},
                    12: {0: [0], 1: [[0, 16]], 2: [0, 21, 23, 25]},
                    13: {
                        0: [0],
                        1: [[0, 5], 7, 8, 21, [23, 33], [81, 85]],
                        2: [[0, 5], [7, 9], [23, 25], 27, 29, 30, 81, 83],
                        3: [[0, 4], [21, 24]],
                        4: [[0, 4], 6, 21, [23, 35], 81],
                        5: [[0, 3], [21, 35], 81, 82],
                        6: [[0, 4], [21, 38], [81, 84]],
                        7: [[0, 3], 5, 6, [21, 33]],
                        8: [[0, 4], [21, 28]],
                        9: [[0, 3], [21, 30], [81, 84]],
                        10: [[0, 3], [22, 26], 28, 81, 82],
                        11: [[0, 2], [21, 28], 81, 82]
                    },
                    14: {
                        0: [0],
                        1: [0, 1, [5, 10], [21, 23], 81],
                        2: [[0, 3], 11, 12, [21, 27]],
                        3: [[0, 3], 11, 21, 22],
                        4: [[0, 2], 11, 21, [23, 31], 81],
                        5: [[0, 2], 21, 22, 24, 25, 81],
                        6: [[0, 3], [21, 24]],
                        7: [[0, 2], [21, 29], 81],
                        8: [[0, 2], [21, 30], 81, 82],
                        9: [[0, 2], [21, 32], 81],
                        10: [[0, 2], [21, 34], 81, 82],
                        11: [[0, 2], [21, 30], 81, 82],
                        23: [[0, 3], 22, 23, [25, 30], 32, 33]
                    },
                    15: {
                        0: [0],
                        1: [[0, 5], [21, 25]],
                        2: [[0, 7], [21, 23]],
                        3: [[0, 4]],
                        4: [[0, 4], [21, 26], [28, 30]],
                        5: [[0, 2], [21, 26], 81],
                        6: [[0, 2], [21, 27]],
                        7: [[0, 3], [21, 27], [81, 85]],
                        8: [[0, 2], [21, 26]],
                        9: [[0, 2], [21, 29], 81],
                        22: [[0, 2], [21, 24]],
                        25: [[0, 2], [22, 31]],
                        26: [[0, 2], [24, 27], [29, 32], 34],
                        28: [0, 1, [22, 27]],
                        29: [0, [21, 23]]
                    },
                    21: {
                        0: [0],
                        1: [[0, 6], [11, 14], [22, 24], 81],
                        2: [[0, 4], [11, 13], 24, [81, 83]],
                        3: [[0, 4], 11, 21, 23, 81],
                        4: [[0, 4], 11, [21, 23]],
                        5: [[0, 5], 21, 22],
                        6: [[0, 4], 24, 81, 82],
                        7: [[0, 3], 11, 26, 27, 81, 82],
                        8: [[0, 4], 11, 81, 82],
                        9: [[0, 5], 11, 21, 22],
                        10: [[0, 5], 11, 21, 81],
                        11: [[0, 3], 21, 22],
                        12: [[0, 2], 4, 21, 23, 24, 81, 82],
                        13: [[0, 3], 21, 22, 24, 81, 82],
                        14: [[0, 4], 21, 22, 81]
                    },
                    22: {
                        0: [0],
                        1: [[0, 6], 12, 22, [81, 83]],
                        2: [[0, 4], 11, 21, [81, 84]],
                        3: [[0, 3], 22, 23, 81, 82],
                        4: [[0, 3], 21, 22],
                        5: [[0, 3], 21, 23, 24, 81, 82],
                        6: [[0, 2], 4, 5, [21, 23], 25, 81],
                        7: [[0, 2], [21, 24], 81],
                        8: [[0, 2], 21, 22, 81, 82],
                        24: [[0, 6], 24, 26]
                    },
                    23: {
                        0: [0],
                        1: [[0, 12], 21, [23, 29], [81, 84]],
                        2: [[0, 8], 21, [23, 25], 27, [29, 31], 81],
                        3: [[0, 7], 21, 81, 82],
                        4: [[0, 7], 21, 22],
                        5: [[0, 3], 5, 6, [21, 24]],
                        6: [[0, 6], [21, 24]],
                        7: [[0, 16], 22, 81],
                        8: [[0, 5], 11, 22, 26, 28, 33, 81, 82],
                        9: [[0, 4], 21],
                        10: [[0, 5], 24, 25, 81, [83, 85]],
                        11: [[0, 2], 21, 23, 24, 81, 82],
                        12: [[0, 2], [21, 26], [81, 83]],
                        27: [[0, 4], [21, 23]]
                    },
                    31: {0: [0], 1: [0, 1, [3, 10], [12, 20]], 2: [0, 30]},
                    32: {
                        0: [0],
                        1: [[0, 7], 11, [13, 18], 24, 25],
                        2: [[0, 6], 11, 81, 82],
                        3: [[0, 5], 11, 12, [21, 24], 81, 82],
                        4: [[0, 2], 4, 5, 11, 12, 81, 82],
                        5: [[0, 9], [81, 85]],
                        6: [[0, 2], 11, 12, 21, 23, [81, 84]],
                        7: [0, 1, 3, 5, 6, [21, 24]],
                        8: [[0, 4], 11, 26, [29, 31]],
                        9: [[0, 3], [21, 25], 28, 81, 82],
                        10: [[0, 3], 11, 12, 23, 81, 84, 88],
                        11: [[0, 2], 11, 12, [81, 83]],
                        12: [[0, 4], [81, 84]],
                        13: [[0, 2], 11, [21, 24]]
                    },
                    33: {
                        0: [0],
                        1: [[0, 6], [8, 10], 22, 27, 82, 83, 85],
                        2: [0, 1, [3, 6], 11, 12, 25, 26, [81, 83]],
                        3: [[0, 4], 22, 24, [26, 29], 81, 82],
                        4: [[0, 2], 11, 21, 24, [81, 83]],
                        5: [[0, 3], [21, 23]],
                        6: [[0, 2], 21, 24, [81, 83]],
                        7: [[0, 3], 23, 26, 27, [81, 84]],
                        8: [[0, 3], 22, 24, 25, 81],
                        9: [[0, 3], 21, 22],
                        10: [[0, 4], [21, 24], 81, 82],
                        11: [[0, 2], [21, 27], 81]
                    },
                    34: {
                        0: [0],
                        1: [[0, 4], 11, [21, 24], 81],
                        2: [[0, 4], 7, 8, [21, 23], 25],
                        3: [[0, 4], 11, [21, 23]],
                        4: [[0, 6], 21],
                        5: [[0, 4], 6, [21, 23]],
                        6: [[0, 4], 21],
                        7: [[0, 3], 11, 21],
                        8: [[0, 3], 11, [22, 28], 81],
                        10: [[0, 4], [21, 24]],
                        11: [[0, 3], 22, [24, 26], 81, 82],
                        12: [[0, 4], 21, 22, 25, 26, 82],
                        13: [[0, 2], [21, 24]],
                        14: [[0, 2], [21, 24]],
                        15: [[0, 3], [21, 25]],
                        16: [[0, 2], [21, 23]],
                        17: [[0, 2], [21, 23]],
                        18: [[0, 2], [21, 25], 81]
                    },
                    35: {
                        0: [0],
                        1: [[0, 5], 11, [21, 25], 28, 81, 82],
                        2: [[0, 6], [11, 13]],
                        3: [[0, 5], 22],
                        4: [[0, 3], 21, [23, 30], 81],
                        5: [[0, 5], 21, [24, 27], [81, 83]],
                        6: [[0, 3], [22, 29], 81],
                        7: [[0, 2], [21, 25], [81, 84]],
                        8: [[0, 2], [21, 25], 81],
                        9: [[0, 2], [21, 26], 81, 82]
                    },
                    36: {
                        0: [0],
                        1: [[0, 5], 11, [21, 24]],
                        2: [[0, 3], 22, 81],
                        3: [[0, 2], 13, [21, 23]],
                        4: [[0, 3], 21, [23, 30], 81, 82],
                        5: [[0, 2], 21],
                        6: [[0, 2], 22, 81],
                        7: [[0, 2], [21, 35], 81, 82],
                        8: [[0, 3], [21, 30], 81],
                        9: [[0, 2], [21, 26], [81, 83]],
                        10: [[0, 2], [21, 30]],
                        11: [[0, 2], [21, 30], 81]
                    },
                    37: {
                        0: [0],
                        1: [[0, 5], 12, 13, [24, 26], 81],
                        2: [[0, 3], 5, [11, 14], [81, 85]],
                        3: [[0, 6], [21, 23]],
                        4: [[0, 6], 81],
                        5: [[0, 3], [21, 23]],
                        6: [[0, 2], [11, 13], 34, [81, 87]],
                        7: [[0, 5], 24, 25, [81, 86]],
                        8: [[0, 2], 11, [26, 32], [81, 83]],
                        9: [[0, 3], 11, 21, 23, 82, 83],
                        10: [[0, 2], [81, 83]],
                        11: [[0, 3], 21, 22],
                        12: [[0, 3]],
                        13: [[0, 2], 11, 12, [21, 29]],
                        14: [[0, 2], [21, 28], 81, 82],
                        15: [[0, 2], [21, 26], 81],
                        16: [[0, 2], [21, 26]],
                        17: [[0, 2], [21, 28]]
                    },
                    41: {
                        0: [0],
                        1: [[0, 6], 8, 22, [81, 85]],
                        2: [[0, 5], 11, [21, 25]],
                        3: [[0, 7], 11, [22, 29], 81],
                        4: [[0, 4], 11, [21, 23], 25, 81, 82],
                        5: [[0, 3], 5, 6, 22, 23, 26, 27, 81],
                        6: [[0, 3], 11, 21, 22],
                        7: [[0, 4], 11, 21, [24, 28], 81, 82],
                        8: [[0, 4], 11, [21, 23], 25, [81, 83]],
                        9: [[0, 2], 22, 23, [26, 28]],
                        10: [[0, 2], [23, 25], 81, 82],
                        11: [[0, 4], [21, 23]],
                        12: [[0, 2], 21, 22, 24, 81, 82],
                        13: [[0, 3], [21, 30], 81],
                        14: [[0, 3], [21, 26], 81],
                        15: [[0, 3], [21, 28]],
                        16: [[0, 2], [21, 28], 81],
                        17: [[0, 2], [21, 29]],
                        90: [0, 1]
                    },
                    42: {
                        0: [0],
                        1: [[0, 7], [11, 17]],
                        2: [[0, 5], 22, 81],
                        3: [[0, 3], [21, 25], 81],
                        5: [[0, 6], [25, 29], [81, 83]],
                        6: [[0, 2], 6, 7, [24, 26], [82, 84]],
                        7: [[0, 4]],
                        8: [[0, 2], 4, 21, 22, 81],
                        9: [[0, 2], [21, 23], 81, 82, 84],
                        10: [[0, 3], [22, 24], 81, 83, 87],
                        11: [[0, 2], [21, 27], 81, 82],
                        12: [[0, 2], [21, 24], 81],
                        13: [[0, 3], 21, 81],
                        28: [[0, 2], 22, 23, [25, 28]],
                        90: [0, [4, 6], 21]
                    },
                    43: {
                        0: [0],
                        1: [[0, 5], 11, 12, 21, 22, 24, 81],
                        2: [[0, 4], 11, 21, [23, 25], 81],
                        3: [[0, 2], 4, 21, 81, 82],
                        4: [0, 1, [5, 8], 12, [21, 24], 26, 81, 82],
                        5: [[0, 3], 11, [21, 25], [27, 29], 81],
                        6: [[0, 3], 11, 21, 23, 24, 26, 81, 82],
                        7: [[0, 3], [21, 26], 81],
                        8: [[0, 2], 11, 21, 22],
                        9: [[0, 3], [21, 23], 81],
                        10: [[0, 3], [21, 28], 81],
                        11: [[0, 3], [21, 29]],
                        12: [[0, 2], [21, 30], 81],
                        13: [[0, 2], 21, 22, 81, 82],
                        31: [0, 1, [22, 27], 30]
                    },
                    44: {
                        0: [0],
                        1: [[0, 7], [11, 16], 83, 84],
                        2: [[0, 5], 21, 22, 24, 29, 32, 33, 81, 82],
                        3: [0, 1, [3, 8]],
                        4: [[0, 4]],
                        5: [0, 1, [6, 15], 23, 82, 83],
                        6: [0, 1, [4, 8]],
                        7: [0, 1, [3, 5], 81, [83, 85]],
                        8: [[0, 4], 11, 23, 25, [81, 83]],
                        9: [[0, 3], 23, [81, 83]],
                        12: [[0, 3], [23, 26], 83, 84],
                        13: [[0, 3], [22, 24], 81],
                        14: [[0, 2], [21, 24], 26, 27, 81],
                        15: [[0, 2], 21, 23, 81],
                        16: [[0, 2], [21, 25]],
                        17: [[0, 2], 21, 23, 81],
                        18: [[0, 3], 21, 23, [25, 27], 81, 82],
                        19: [0],
                        20: [0],
                        51: [[0, 3], 21, 22],
                        52: [[0, 3], 21, 22, 24, 81],
                        53: [[0, 2], [21, 23], 81]
                    },
                    45: {
                        0: [0],
                        1: [[0, 9], [21, 27]],
                        2: [[0, 5], [21, 26]],
                        3: [[0, 5], 11, 12, [21, 32]],
                        4: [0, 1, [3, 6], 11, [21, 23], 81],
                        5: [[0, 3], 12, 21],
                        6: [[0, 3], 21, 81],
                        7: [[0, 3], 21, 22],
                        8: [[0, 4], 21, 81],
                        9: [[0, 3], [21, 24], 81],
                        10: [[0, 2], [21, 31]],
                        11: [[0, 2], [21, 23]],
                        12: [[0, 2], [21, 29], 81],
                        13: [[0, 2], [21, 24], 81],
                        14: [[0, 2], [21, 25], 81]
                    },
                    46: {0: [0], 1: [0, 1, [5, 8]], 2: [0, 1], 3: [0, [21, 23]], 90: [[0, 3], [5, 7], [21, 39]]},
                    50: {0: [0], 1: [[0, 19]], 2: [0, [22, 38], [40, 43]], 3: [0, [81, 84]]},
                    51: {
                        0: [0],
                        1: [0, 1, [4, 8], [12, 15], [21, 24], 29, 31, 32, [81, 84]],
                        3: [[0, 4], 11, 21, 22],
                        4: [[0, 3], 11, 21, 22],
                        5: [[0, 4], 21, 22, 24, 25],
                        6: [0, 1, 3, 23, 26, [81, 83]],
                        7: [0, 1, 3, 4, [22, 27], 81],
                        8: [[0, 2], 11, 12, [21, 24]],
                        9: [[0, 4], [21, 23]],
                        10: [[0, 2], 11, 24, 25, 28],
                        11: [[0, 2], [11, 13], 23, 24, 26, 29, 32, 33, 81],
                        13: [[0, 4], [21, 25], 81],
                        14: [[0, 2], [21, 25]],
                        15: [[0, 3], [21, 29]],
                        16: [[0, 3], [21, 23], 81],
                        17: [[0, 3], [21, 25], 81],
                        18: [[0, 3], [21, 27]],
                        19: [[0, 3], [21, 23]],
                        20: [[0, 2], 21, 22, 81],
                        32: [0, [21, 33]],
                        33: [0, [21, 38]],
                        34: [0, 1, [22, 37]]
                    },
                    52: {
                        0: [0],
                        1: [[0, 3], [11, 15], [21, 23], 81],
                        2: [0, 1, 3, 21, 22],
                        3: [[0, 3], [21, 30], 81, 82],
                        4: [[0, 2], [21, 25]],
                        5: [[0, 2], [21, 27]],
                        6: [[0, 3], [21, 28]],
                        22: [0, 1, [22, 30]],
                        23: [0, 1, [22, 28]],
                        24: [0, 1, [22, 28]],
                        26: [0, 1, [22, 36]],
                        27: [[0, 2], 22, 23, [25, 32]]
                    },
                    53: {
                        0: [0],
                        1: [[0, 3], [11, 14], 21, 22, [24, 29], 81],
                        3: [[0, 2], [21, 26], 28, 81],
                        4: [[0, 2], [21, 28]],
                        5: [[0, 2], [21, 24]],
                        6: [[0, 2], [21, 30]],
                        7: [[0, 2], [21, 24]],
                        8: [[0, 2], [21, 29]],
                        9: [[0, 2], [21, 27]],
                        23: [0, 1, [22, 29], 31],
                        25: [[0, 4], [22, 32]],
                        26: [0, 1, [21, 28]],
                        27: [0, 1, [22, 30]],
                        28: [0, 1, 22, 23],
                        29: [0, 1, [22, 32]],
                        31: [0, 2, 3, [22, 24]],
                        34: [0, [21, 23]],
                        33: [0, 21, [23, 25]],
                        35: [0, [21, 28]]
                    },
                    54: {
                        0: [0],
                        1: [[0, 2], [21, 27]],
                        21: [0, [21, 29], 32, 33],
                        22: [0, [21, 29], [31, 33]],
                        23: [0, 1, [22, 38]],
                        24: [0, [21, 31]],
                        25: [0, [21, 27]],
                        26: [0, [21, 27]]
                    },
                    61: {
                        0: [0],
                        1: [[0, 4], [11, 16], 22, [24, 26]],
                        2: [[0, 4], 22],
                        3: [[0, 4], [21, 24], [26, 31]],
                        4: [[0, 4], [22, 31], 81],
                        5: [[0, 2], [21, 28], 81, 82],
                        6: [[0, 2], [21, 32]],
                        7: [[0, 2], [21, 30]],
                        8: [[0, 2], [21, 31]],
                        9: [[0, 2], [21, 29]],
                        10: [[0, 2], [21, 26]]
                    },
                    62: {
                        0: [0],
                        1: [[0, 5], 11, [21, 23]],
                        2: [0, 1],
                        3: [[0, 2], 21],
                        4: [[0, 3], [21, 23]],
                        5: [[0, 3], [21, 25]],
                        6: [[0, 2], [21, 23]],
                        7: [[0, 2], [21, 25]],
                        8: [[0, 2], [21, 26]],
                        9: [[0, 2], [21, 24], 81, 82],
                        10: [[0, 2], [21, 27]],
                        11: [[0, 2], [21, 26]],
                        12: [[0, 2], [21, 28]],
                        24: [0, 21, [24, 29]],
                        26: [0, 21, [23, 30]],
                        29: [0, 1, [21, 27]],
                        30: [0, 1, [21, 27]]
                    },
                    63: {
                        0: [0],
                        1: [[0, 5], [21, 23]],
                        2: [0, 2, [21, 25]],
                        21: [0, [21, 23], [26, 28]],
                        22: [0, [21, 24]],
                        23: [0, [21, 24]],
                        25: [0, [21, 25]],
                        26: [0, [21, 26]],
                        27: [0, 1, [21, 26]],
                        28: [[0, 2], [21, 23]]
                    },
                    64: {
                        0: [0],
                        1: [0, 1, [4, 6], 21, 22, 81],
                        2: [[0, 3], 5, [21, 23]],
                        3: [[0, 3], [21, 24], 81],
                        4: [[0, 2], [21, 25]],
                        5: [[0, 2], 21, 22]
                    },
                    65: {
                        0: [0],
                        1: [[0, 9], 21],
                        2: [[0, 5]],
                        21: [0, 1, 22, 23],
                        22: [0, 1, 22, 23],
                        23: [[0, 3], [23, 25], 27, 28],
                        28: [0, 1, [22, 29]],
                        29: [0, 1, [22, 29]],
                        30: [0, 1, [22, 24]],
                        31: [0, 1, [21, 31]],
                        32: [0, 1, [21, 27]],
                        40: [0, 2, 3, [21, 28]],
                        42: [[0, 2], 21, [23, 26]],
                        43: [0, 1, [21, 26]],
                        90: [[0, 4]],
                        27: [[0, 2], 22, 23]
                    },
                    71: {0: [0]},
                    81: {0: [0]},
                    82: {0: [0]}
                }, n = parseInt(e.substr(0, 2), 10), r = parseInt(e.substr(2, 2), 10), a = parseInt(e.substr(4, 2), 10);
                if (!i[n] || !i[n][r]) return !1;
                for (var s = !1, o = i[n][r], l = 0; l < o.length; l++) if (t.isArray(o[l]) && o[l][0] <= a && a <= o[l][1] || !t.isArray(o[l]) && a === o[l]) {
                    s = !0;
                    break
                }
                if (!s) return !1;
                var d;
                d = 18 === e.length ? e.substr(6, 8) : "19" + e.substr(6, 6);
                var c = parseInt(d.substr(0, 4), 10), u = parseInt(d.substr(4, 2), 10),
                    h = parseInt(d.substr(6, 2), 10);
                if (!FormValidation.Helper.date(c, u, h)) return !1;
                if (18 === e.length) {
                    var p = 0, f = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                    for (l = 0; 17 > l; l++) p += parseInt(e.charAt(l), 10) * f[l];
                    p = (12 - p % 11) % 11;
                    var m = "X" !== e.charAt(17).toUpperCase() ? parseInt(e.charAt(17), 10) : 10;
                    return m === p
                }
                return !0
            },
            _cz: function (t) {
                if (!/^\d{9,10}$/.test(t)) return !1;
                var e = 1900 + parseInt(t.substr(0, 2), 10), i = parseInt(t.substr(2, 2), 10) % 50 % 20,
                    n = parseInt(t.substr(4, 2), 10);
                if (9 === t.length) {
                    if (e >= 1980 && (e -= 100), e > 1953) return !1
                } else 1954 > e && (e += 100);
                if (!FormValidation.Helper.date(e, i, n)) return !1;
                if (10 === t.length) {
                    var r = parseInt(t.substr(0, 9), 10) % 11;
                    return 1985 > e && (r %= 10), r + "" === t.substr(9, 1)
                }
                return !0
            },
            _dk: function (t) {
                if (!/^[0-9]{6}[-]{0,1}[0-9]{4}$/.test(t)) return !1;
                t = t.replace(/-/g, "");
                var e = parseInt(t.substr(0, 2), 10), i = parseInt(t.substr(2, 2), 10),
                    n = parseInt(t.substr(4, 2), 10);
                switch (!0) {
                    case-1 !== "5678".indexOf(t.charAt(6)) && n >= 58:
                        n += 1800;
                        break;
                    case-1 !== "0123".indexOf(t.charAt(6)):
                    case-1 !== "49".indexOf(t.charAt(6)) && n >= 37:
                        n += 1900;
                        break;
                    default:
                        n += 2e3
                }
                return FormValidation.Helper.date(n, i, e);
            },
            _ee: function (t) {
                return this._lt(t)
            },
            _es: function (t) {
                var e = /^[0-9]{8}[-]{0,1}[A-HJ-NP-TV-Z]$/.test(t),
                    i = /^[XYZ][-]{0,1}[0-9]{7}[-]{0,1}[A-HJ-NP-TV-Z]$/.test(t),
                    n = /^[A-HNPQS][-]{0,1}[0-9]{7}[-]{0,1}[0-9A-J]$/.test(t);
                if (!e && !i && !n) return !1;
                t = t.replace(/-/g, "");
                var r;
                if (e || i) {
                    var a = "XYZ".indexOf(t.charAt(0));
                    return -1 !== a && (t = a + t.substr(1) + ""), r = parseInt(t.substr(0, 8), 10), r = "TRWAGMYFPDXBNJZSQVHLCKE"[r % 23], r === t.substr(8, 1)
                }
                r = t.substr(1, 7);
                for (var s = t[0], o = t.substr(-1), l = 0, d = 0; d < r.length; d++) if (d % 2 !== 0) l += parseInt(r[d], 10); else {
                    var c = "" + 2 * parseInt(r[d], 10);
                    l += parseInt(c[0], 10), 2 === c.length && (l += parseInt(c[1], 10))
                }
                var u = l - 10 * Math.floor(l / 10);
                return 0 !== u && (u = 10 - u), -1 !== "KQS".indexOf(s) ? o === "JABCDEFGHI"[u] : -1 !== "ABEH".indexOf(s) ? o === "" + u : o === "" + u || o === "JABCDEFGHI"[u]
            },
            _fi: function (t) {
                if (!/^[0-9]{6}[-+A][0-9]{3}[0-9ABCDEFHJKLMNPRSTUVWXY]$/.test(t)) return !1;
                var e = parseInt(t.substr(0, 2), 10), i = parseInt(t.substr(2, 2), 10),
                    n = parseInt(t.substr(4, 2), 10), r = {"+": 1800, "-": 1900, A: 2e3};
                if (n = r[t.charAt(6)] + n, !FormValidation.Helper.date(n, i, e)) return !1;
                var a = parseInt(t.substr(7, 3), 10);
                if (2 > a) return !1;
                var s = t.substr(0, 6) + t.substr(7, 3) + "";
                return s = parseInt(s, 10), "0123456789ABCDEFHJKLMNPRSTUVWXY".charAt(s % 31) === t.charAt(10)
            },
            _hr: function (t) {
                return /^[0-9]{11}$/.test(t) ? FormValidation.Helper.mod11And10(t) : !1
            },
            _ie: function (t) {
                if (!/^\d{7}[A-W][AHWTX]?$/.test(t)) return !1;
                var e = function (t) {
                    for (; t.length < 7;) t = "0" + t;
                    for (var e = "WABCDEFGHIJKLMNOPQRSTUV", i = 0, n = 0; 7 > n; n++) i += parseInt(t.charAt(n), 10) * (8 - n);
                    return i += 9 * e.indexOf(t.substr(7)), e[i % 23]
                };
                return 9 !== t.length || "A" !== t.charAt(8) && "H" !== t.charAt(8) ? t.charAt(7) === e(t.substr(0, 7)) : t.charAt(7) === e(t.substr(0, 7) + t.substr(8) + "")
            },
            _is: function (t) {
                if (!/^[0-9]{6}[-]{0,1}[0-9]{4}$/.test(t)) return !1;
                t = t.replace(/-/g, "");
                var e = parseInt(t.substr(0, 2), 10), i = parseInt(t.substr(2, 2), 10),
                    n = parseInt(t.substr(4, 2), 10), r = parseInt(t.charAt(9), 10);
                if (n = 9 === r ? 1900 + n : 100 * (20 + r) + n, !FormValidation.Helper.date(n, i, e, !0)) return !1;
                for (var a = 0, s = [3, 2, 7, 6, 5, 4, 3, 2], o = 0; 8 > o; o++) a += parseInt(t.charAt(o), 10) * s[o];
                return a = 11 - a % 11, a + "" === t.charAt(8)
            },
            _lt: function (t) {
                if (!/^[0-9]{11}$/.test(t)) return !1;
                var e = parseInt(t.charAt(0), 10), i = parseInt(t.substr(1, 2), 10), n = parseInt(t.substr(3, 2), 10),
                    r = parseInt(t.substr(5, 2), 10), a = e % 2 === 0 ? 17 + e / 2 : 17 + (e + 1) / 2;
                if (i = 100 * a + i, !FormValidation.Helper.date(i, n, r, !0)) return !1;
                for (var s = 0, o = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1], l = 0; 10 > l; l++) s += parseInt(t.charAt(l), 10) * o[l];
                if (s %= 11, 10 !== s) return s + "" === t.charAt(10);
                for (s = 0, o = [3, 4, 5, 6, 7, 8, 9, 1, 2, 3], l = 0; 10 > l; l++) s += parseInt(t.charAt(l), 10) * o[l];
                return s %= 11, 10 === s && (s = 0), s + "" === t.charAt(10)
            },
            _lv: function (t) {
                if (!/^[0-9]{6}[-]{0,1}[0-9]{5}$/.test(t)) return !1;
                t = t.replace(/\D/g, "");
                var e = parseInt(t.substr(0, 2), 10), i = parseInt(t.substr(2, 2), 10),
                    n = parseInt(t.substr(4, 2), 10);
                if (n = n + 1800 + 100 * parseInt(t.charAt(6), 10), !FormValidation.Helper.date(n, i, e, !0)) return !1;
                for (var r = 0, a = [10, 5, 8, 4, 2, 1, 6, 3, 7, 9], s = 0; 10 > s; s++) r += parseInt(t.charAt(s), 10) * a[s];
                return r = (r + 1) % 11 % 10, r + "" === t.charAt(10)
            },
            _nl: function (t) {
                for (; t.length < 9;) t = "0" + t;
                if (!/^[0-9]{4}[.]{0,1}[0-9]{2}[.]{0,1}[0-9]{3}$/.test(t)) return !1;
                if (t = t.replace(/\./g, ""), 0 === parseInt(t, 10)) return !1;
                for (var e = 0, i = t.length, n = 0; i - 1 > n; n++) e += (9 - n) * parseInt(t.charAt(n), 10);
                return e %= 11, 10 === e && (e = 0), e + "" === t.charAt(i - 1)
            },
            _ro: function (t) {
                if (!/^[0-9]{13}$/.test(t)) return !1;
                var e = parseInt(t.charAt(0), 10);
                if (0 === e || 7 === e || 8 === e) return !1;
                var i = parseInt(t.substr(1, 2), 10), n = parseInt(t.substr(3, 2), 10),
                    r = parseInt(t.substr(5, 2), 10), a = {1: 1900, 2: 1900, 3: 1800, 4: 1800, 5: 2e3, 6: 2e3};
                if (r > 31 && n > 12) return !1;
                if (9 !== e && (i = a[e + ""] + i, !FormValidation.Helper.date(i, n, r))) return !1;
                for (var s = 0, o = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9], l = t.length, d = 0; l - 1 > d; d++) s += parseInt(t.charAt(d), 10) * o[d];
                return s %= 11, 10 === s && (s = 1), s + "" === t.charAt(l - 1)
            },
            _se: function (t) {
                if (!/^[0-9]{10}$/.test(t) && !/^[0-9]{6}[-|+][0-9]{4}$/.test(t)) return !1;
                t = t.replace(/[^0-9]/g, "");
                var e = parseInt(t.substr(0, 2), 10) + 1900, i = parseInt(t.substr(2, 2), 10),
                    n = parseInt(t.substr(4, 2), 10);
                return FormValidation.Helper.date(e, i, n) ? FormValidation.Helper.luhn(t) : !1
            },
            _sk: function (t) {
                return this._cz(t)
            },
            _sm: function (t) {
                return /^\d{5}$/.test(t)
            },
            _th: function (t) {
                if (13 !== t.length) return !1;
                for (var e = 0, i = 0; 12 > i; i++) e += parseInt(t.charAt(i), 10) * (13 - i);
                return (11 - e % 11) % 10 === parseInt(t.charAt(12), 10)
            },
            _za: function (t) {
                if (!/^[0-9]{10}[0|1][8|9][0-9]$/.test(t)) return !1;
                var e = parseInt(t.substr(0, 2), 10), i = (new Date).getFullYear() % 100,
                    n = parseInt(t.substr(2, 2), 10), r = parseInt(t.substr(4, 2), 10);
                return e = e >= i ? e + 1900 : e + 2e3, FormValidation.Helper.date(e, n, r) ? FormValidation.Helper.luhn(t) : !1
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {identical: {"default": "Please enter the same value"}}}), FormValidation.Validator.identical = {
            html5Attributes: {
                message: "message",
                field: "field"
            }, init: function (t, e, i) {
                var n = t.getFieldElements(i.field);
                t.onLiveChange(n, "live_identical", function () {
                    var i = t.getStatus(e, "identical");
                    i !== t.STATUS_NOT_VALIDATED && t.revalidateField(e)
                })
            }, destroy: function (t, e, i) {
                var n = t.getFieldElements(i.field);
                t.offLiveChange(n, "live_identical")
            }, validate: function (t, e, i) {
                var n = t.getFieldValue(e, "identical"), r = t.getFieldElements(i.field);
                if (null === r || 0 === r.length) return !0;
                var a = t.getFieldValue(r, "identical");
                return n === a ? (t.updateStatus(r, t.STATUS_VALID, "identical"), !0) : !1
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {imei: {"default": "Please enter a valid IMEI number"}}}), FormValidation.Validator.imei = {
            validate: function (t, e, i) {
                var n = t.getFieldValue(e, "imei");
                if ("" === n) return !0;
                switch (!0) {
                    case/^\d{15}$/.test(n):
                    case/^\d{2}-\d{6}-\d{6}-\d{1}$/.test(n):
                    case/^\d{2}\s\d{6}\s\d{6}\s\d{1}$/.test(n):
                        return n = n.replace(/[^0-9]/g, ""), FormValidation.Helper.luhn(n);
                    case/^\d{14}$/.test(n):
                    case/^\d{16}$/.test(n):
                    case/^\d{2}-\d{6}-\d{6}(|-\d{2})$/.test(n):
                    case/^\d{2}\s\d{6}\s\d{6}(|\s\d{2})$/.test(n):
                        return !0;
                    default:
                        return !1
                }
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {imo: {"default": "Please enter a valid IMO number"}}}), FormValidation.Validator.imo = {
            validate: function (t, e, i) {
                var n = t.getFieldValue(e, "imo");
                if ("" === n) return !0;
                if (!/^IMO \d{7}$/i.test(n)) return !1;
                for (var r = 0, a = n.replace(/^.*(\d{7})$/, "$1"), s = 6; s >= 1; s--) r += a.slice(6 - s, -s) * (s + 1);
                return r % 10 === parseInt(a.charAt(6), 10)
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {integer: {"default": "Please enter a valid number"}}}), FormValidation.Validator.integer = {
            enableByHtml5: function (t) {
                return "number" === t.attr("type") && (void 0 === t.attr("step") || t.attr("step") % 1 === 0)
            }, validate: function (t, e, i) {
                if (this.enableByHtml5(e) && e.get(0).validity && e.get(0).validity.badInput === !0) return !1;
                var n = t.getFieldValue(e, "integer");
                return "" === n ? !0 : /^(?:-?(?:0|[1-9][0-9]*))$/.test(n)
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {
            en_US: {
                ip: {
                    "default": "Please enter a valid IP address",
                    ipv4: "Please enter a valid IPv4 address",
                    ipv6: "Please enter a valid IPv6 address"
                }
            }
        }), FormValidation.Validator.ip = {
            html5Attributes: {message: "message", ipv4: "ipv4", ipv6: "ipv6"},
            validate: function (e, i, n) {
                var r = e.getFieldValue(i, "ip");
                if ("" === r) return !0;
                n = t.extend({}, {ipv4: !0, ipv6: !0}, n);
                var a, s = e.getLocale(),
                    o = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
                    l = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
                    d = !1;
                switch (!0) {
                    case n.ipv4 && !n.ipv6:
                        d = o.test(r), a = n.message || FormValidation.I18n[s].ip.ipv4;
                        break;
                    case!n.ipv4 && n.ipv6:
                        d = l.test(r), a = n.message || FormValidation.I18n[s].ip.ipv6;
                        break;
                    case n.ipv4 && n.ipv6:
                    default:
                        d = o.test(r) || l.test(r), a = n.message || FormValidation.I18n[s].ip["default"]
                }
                return {valid: d, message: a}
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {isbn: {"default": "Please enter a valid ISBN number"}}}), FormValidation.Validator.isbn = {
            validate: function (t, e, i) {
                var n = t.getFieldValue(e, "isbn");
                if ("" === n) return !0;
                var r;
                switch (!0) {
                    case/^\d{9}[\dX]$/.test(n):
                    case 13 === n.length && /^(\d+)-(\d+)-(\d+)-([\dX])$/.test(n):
                    case 13 === n.length && /^(\d+)\s(\d+)\s(\d+)\s([\dX])$/.test(n):
                        r = "ISBN10";
                        break;
                    case/^(978|979)\d{9}[\dX]$/.test(n):
                    case 17 === n.length && /^(978|979)-(\d+)-(\d+)-(\d+)-([\dX])$/.test(n):
                    case 17 === n.length && /^(978|979)\s(\d+)\s(\d+)\s(\d+)\s([\dX])$/.test(n):
                        r = "ISBN13";
                        break;
                    default:
                        return !1
                }
                n = n.replace(/[^0-9X]/gi, "");
                var a, s, o = n.split(""), l = o.length, d = 0;
                switch (r) {
                    case"ISBN10":
                        for (d = 0, a = 0; l - 1 > a; a++) d += parseInt(o[a], 10) * (10 - a);
                        return s = 11 - d % 11, 11 === s ? s = 0 : 10 === s && (s = "X"), s + "" === o[l - 1];
                    case"ISBN13":
                        for (d = 0, a = 0; l - 1 > a; a++) d += a % 2 === 0 ? parseInt(o[a], 10) : 3 * parseInt(o[a], 10);
                        return s = 10 - d % 10, 10 === s && (s = "0"), s + "" === o[l - 1];
                    default:
                        return !1
                }
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {isin: {"default": "Please enter a valid ISIN number"}}}), FormValidation.Validator.isin = {
            COUNTRY_CODES: "AF|AX|AL|DZ|AS|AD|AO|AI|AQ|AG|AR|AM|AW|AU|AT|AZ|BS|BH|BD|BB|BY|BE|BZ|BJ|BM|BT|BO|BQ|BA|BW|BV|BR|IO|BN|BG|BF|BI|KH|CM|CA|CV|KY|CF|TD|CL|CN|CX|CC|CO|KM|CG|CD|CK|CR|CI|HR|CU|CW|CY|CZ|DK|DJ|DM|DO|EC|EG|SV|GQ|ER|EE|ET|FK|FO|FJ|FI|FR|GF|PF|TF|GA|GM|GE|DE|GH|GI|GR|GL|GD|GP|GU|GT|GG|GN|GW|GY|HT|HM|VA|HN|HK|HU|IS|IN|ID|IR|IQ|IE|IM|IL|IT|JM|JP|JE|JO|KZ|KE|KI|KP|KR|KW|KG|LA|LV|LB|LS|LR|LY|LI|LT|LU|MO|MK|MG|MW|MY|MV|ML|MT|MH|MQ|MR|MU|YT|MX|FM|MD|MC|MN|ME|MS|MA|MZ|MM|NA|NR|NP|NL|NC|NZ|NI|NE|NG|NU|NF|MP|NO|OM|PK|PW|PS|PA|PG|PY|PE|PH|PN|PL|PT|PR|QA|RE|RO|RU|RW|BL|SH|KN|LC|MF|PM|VC|WS|SM|ST|SA|SN|RS|SC|SL|SG|SX|SK|SI|SB|SO|ZA|GS|SS|ES|LK|SD|SR|SJ|SZ|SE|CH|SY|TW|TJ|TZ|TH|TL|TG|TK|TO|TT|TN|TR|TM|TC|TV|UG|UA|AE|GB|US|UM|UY|UZ|VU|VE|VN|VG|VI|WF|EH|YE|ZM|ZW",
            validate: function (t, e, i) {
                var n = t.getFieldValue(e, "isin");
                if ("" === n) return !0;
                n = n.toUpperCase();
                var r = new RegExp("^(" + this.COUNTRY_CODES + ")[0-9A-Z]{10}$");
                if (!r.test(n)) return !1;
                for (var a = "", s = n.length, o = 0; s - 1 > o; o++) {
                    var l = n.charCodeAt(o);
                    a += l > 57 ? (l - 55).toString() : n.charAt(o)
                }
                var d = "", c = a.length, u = c % 2 !== 0 ? 0 : 1;
                for (o = 0; c > o; o++) d += parseInt(a[o], 10) * (o % 2 === u ? 2 : 1) + "";
                var h = 0;
                for (o = 0; o < d.length; o++) h += parseInt(d.charAt(o), 10);
                return h = (10 - h % 10) % 10, h + "" === n.charAt(s - 1)
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {ismn: {"default": "Please enter a valid ISMN number"}}}), FormValidation.Validator.ismn = {
            validate: function (t, e, i) {
                var n = t.getFieldValue(e, "ismn");
                if ("" === n) return !0;
                var r;
                switch (!0) {
                    case/^M\d{9}$/.test(n):
                    case/^M-\d{4}-\d{4}-\d{1}$/.test(n):
                    case/^M\s\d{4}\s\d{4}\s\d{1}$/.test(n):
                        r = "ISMN10";
                        break;
                    case/^9790\d{9}$/.test(n):
                    case/^979-0-\d{4}-\d{4}-\d{1}$/.test(n):
                    case/^979\s0\s\d{4}\s\d{4}\s\d{1}$/.test(n):
                        r = "ISMN13";
                        break;
                    default:
                        return !1
                }
                "ISMN10" === r && (n = "9790" + n.substr(1)), n = n.replace(/[^0-9]/gi, "");
                for (var a = n.length, s = 0, o = [1, 3], l = 0; a - 1 > l; l++) s += parseInt(n.charAt(l), 10) * o[l % 2];
                return s = 10 - s % 10, s + "" === n.charAt(a - 1)
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {issn: {"default": "Please enter a valid ISSN number"}}}), FormValidation.Validator.issn = {
            validate: function (t, e, i) {
                var n = t.getFieldValue(e, "issn");
                if ("" === n) return !0;
                if (!/^\d{4}\-\d{3}[\dX]$/.test(n)) return !1;
                n = n.replace(/[^0-9X]/gi, "");
                var r = n.split(""), a = r.length, s = 0;
                "X" === r[7] && (r[7] = 10);
                for (var o = 0; a > o; o++) s += parseInt(r[o], 10) * (8 - o);
                return s % 11 === 0
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {
            en_US: {
                lessThan: {
                    "default": "Please enter a value less than or equal to %s",
                    notInclusive: "Please enter a value less than %s"
                }
            }
        }), FormValidation.Validator.lessThan = {
            html5Attributes: {
                message: "message",
                value: "value",
                inclusive: "inclusive"
            }, enableByHtml5: function (t) {
                var e = t.attr("type"), i = t.attr("max");
                return i && "date" !== e ? {value: i} : !1
            }, validate: function (e, i, n) {
                var r = e.getFieldValue(i, "lessThan");
                if ("" === r) return !0;
                if (r = this._format(r), !t.isNumeric(r)) return !1;
                var a = e.getLocale(), s = t.isNumeric(n.value) ? n.value : e.getDynamicOption(i, n.value),
                    o = this._format(s);
                return r = parseFloat(r), n.inclusive === !0 || void 0 === n.inclusive ? {
                    valid: o >= r,
                    message: FormValidation.Helper.format(n.message || FormValidation.I18n[a].lessThan["default"], s)
                } : {
                    valid: o > r,
                    message: FormValidation.Helper.format(n.message || FormValidation.I18n[a].lessThan.notInclusive, s)
                }
            }, _format: function (t) {
                return (t + "").replace(",", ".")
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {mac: {"default": "Please enter a valid MAC address"}}}), FormValidation.Validator.mac = {
            validate: function (t, e, i) {
                var n = t.getFieldValue(e, "mac");
                return "" === n ? !0 : /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/.test(n)
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {meid: {"default": "Please enter a valid MEID number"}}}), FormValidation.Validator.meid = {
            validate: function (t, e, i) {
                var n = t.getFieldValue(e, "meid");
                if ("" === n) return !0;
                switch (!0) {
                    case/^[0-9A-F]{15}$/i.test(n):
                    case/^[0-9A-F]{2}[- ][0-9A-F]{6}[- ][0-9A-F]{6}[- ][0-9A-F]$/i.test(n):
                    case/^\d{19}$/.test(n):
                    case/^\d{5}[- ]\d{5}[- ]\d{4}[- ]\d{4}[- ]\d$/.test(n):
                        var r = n.charAt(n.length - 1);
                        if (n = n.replace(/[- ]/g, ""), n.match(/^\d*$/i)) return FormValidation.Helper.luhn(n);
                        n = n.slice(0, -1);
                        for (var a = "", s = 1; 13 >= s; s += 2) a += (2 * parseInt(n.charAt(s), 16)).toString(16);
                        var o = 0;
                        for (s = 0; s < a.length; s++) o += parseInt(a.charAt(s), 16);
                        return o % 10 === 0 ? "0" === r : r === (2 * (10 * Math.floor((o + 10) / 10) - o)).toString(16);
                    case/^[0-9A-F]{14}$/i.test(n):
                    case/^[0-9A-F]{2}[- ][0-9A-F]{6}[- ][0-9A-F]{6}$/i.test(n):
                    case/^\d{18}$/.test(n):
                    case/^\d{5}[- ]\d{5}[- ]\d{4}[- ]\d{4}$/.test(n):
                        return !0;
                    default:
                        return !1
                }
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {notEmpty: {"default": "Please enter a value"}}}), FormValidation.Validator.notEmpty = {
            enableByHtml5: function (t) {
                var e = t.attr("required") + "";
                return "required" === e || "true" === e
            }, validate: function (e, i, n) {
                var r = i.attr("type");
                if ("radio" === r || "checkbox" === r) {
                    var a = e.getNamespace();
                    return e.getFieldElements(i.attr("data-" + a + "-field")).filter(":checked").length > 0
                }
                return "number" === r && i.get(0).validity && i.get(0).validity.badInput === !0 ? !0 : "" !== t.trim(i.val())
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {numeric: {"default": "Please enter a valid float number"}}}), FormValidation.Validator.numeric = {
            html5Attributes: {
                message: "message",
                separator: "separator"
            }, enableByHtml5: function (t) {
                return "number" === t.attr("type") && void 0 !== t.attr("step") && t.attr("step") % 1 !== 0
            }, validate: function (t, e, i) {
                if (this.enableByHtml5(e) && e.get(0).validity && e.get(0).validity.badInput === !0) return !1;
                var n = t.getFieldValue(e, "numeric");
                if ("" === n) return !0;
                var r = i.separator || ".";
                return "." !== r && (n = n.replace(r, ".")), !isNaN(parseFloat(n)) && isFinite(n)
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {
            en_US: {
                phone: {
                    "default": "Please enter a valid phone number",
                    country: "Please enter a valid phone number in %s",
                    countries: {
                        AE: "United Arab Emirates",
                        BR: "Brazil",
                        CN: "China",
                        CZ: "Czech Republic",
                        DE: "Germany",
                        DK: "Denmark",
                        ES: "Spain",
                        FR: "France",
                        GB: "United Kingdom",
                        IN: "India",
                        MA: "Morocco",
                        PK: "Pakistan",
                        RO: "Romania",
                        RU: "Russia",
                        SK: "Slovakia",
                        TH: "Thailand",
                        US: "USA",
                        VE: "Venezuela"
                    }
                }
            }
        }), FormValidation.Validator.phone = {
            html5Attributes: {message: "message", country: "country"},
            COUNTRY_CODES: ["AE", "BR", "CN", "CZ", "DE", "DK", "ES", "FR", "GB", "IN", "MA", "PK", "RO", "RU", "SK", "TH", "US", "VE"],
            validate: function (e, i, n) {
                var r = e.getFieldValue(i, "phone");
                if ("" === r) return !0;
                var a = e.getLocale(), s = n.country;
                if ("string" == typeof s && -1 !== t.inArray(s, this.COUNTRY_CODES) || (s = e.getDynamicOption(i, s)), !s || -1 === t.inArray(s.toUpperCase(), this.COUNTRY_CODES)) return !0;
                var o = !0;
                switch (s.toUpperCase()) {
                    case"AE":
                        r = t.trim(r), o = /^(((\+|00)?971[\s\.-]?(\(0\)[\s\.-]?)?|0)(\(5(0|2|5|6)\)|5(0|2|5|6)|2|3|4|6|7|9)|60)([\s\.-]?[0-9]){7}$/.test(r);
                        break;
                    case"BR":
                        r = t.trim(r), o = /^(([\d]{4}[-.\s]{1}[\d]{2,3}[-.\s]{1}[\d]{2}[-.\s]{1}[\d]{2})|([\d]{4}[-.\s]{1}[\d]{3}[-.\s]{1}[\d]{4})|((\(?\+?[0-9]{2}\)?\s?)?(\(?\d{2}\)?\s?)?\d{4,5}[-.\s]?\d{4}))$/.test(r);
                        break;
                    case"CN":
                        r = t.trim(r), o = /^((00|\+)?(86(?:-| )))?((\d{11})|(\d{3}[- ]{1}\d{4}[- ]{1}\d{4})|((\d{2,4}[- ]){1}(\d{7,8}|(\d{3,4}[- ]{1}\d{4}))([- ]{1}\d{1,4})?))$/.test(r);
                        break;
                    case"CZ":
                        o = /^(((00)([- ]?)|\+)(420)([- ]?))?((\d{3})([- ]?)){2}(\d{3})$/.test(r);
                        break;
                    case"DE":
                        r = t.trim(r), o = /^(((((((00|\+)49[ \-/]?)|0)[1-9][0-9]{1,4})[ \-/]?)|((((00|\+)49\()|\(0)[1-9][0-9]{1,4}\)[ \-/]?))[0-9]{1,7}([ \-/]?[0-9]{1,5})?)$/.test(r);
                        break;
                    case"DK":
                        r = t.trim(r), o = /^(\+45|0045|\(45\))?\s?[2-9](\s?\d){7}$/.test(r);
                        break;
                    case"ES":
                        r = t.trim(r), o = /^(?:(?:(?:\+|00)34\D?))?(?:5|6|7|8|9)(?:\d\D?){8}$/.test(r);
                        break;
                    case"FR":
                        r = t.trim(r), o = /^(?:(?:(?:\+|00)33[ ]?(?:\(0\)[ ]?)?)|0){1}[1-9]{1}([ .-]?)(?:\d{2}\1?){3}\d{2}$/.test(r);
                        break;
                    case"GB":
                        r = t.trim(r), o = /^\(?(?:(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?\(?(?:0\)?[\s-]?\(?)?|0)(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}|\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4}|\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3})|\d{5}\)?[\s-]?\d{4,5}|8(?:00[\s-]?11[\s-]?11|45[\s-]?46[\s-]?4\d))(?:(?:[\s-]?(?:x|ext\.?\s?|\#)\d+)?)$/.test(r);
                        break;
                    case"IN":
                        r = t.trim(r), o = /((\+?)((0[ -]+)*|(91 )*)(\d{12}|\d{10}))|\d{5}([- ]*)\d{6}/.test(r);
                        break;
                    case"MA":
                        r = t.trim(r), o = /^(?:(?:(?:\+|00)212[\s]?(?:[\s]?\(0\)[\s]?)?)|0){1}(?:5[\s.-]?[2-3]|6[\s.-]?[13-9]){1}[0-9]{1}(?:[\s.-]?\d{2}){3}$/.test(r);
                        break;
                    case"PK":
                        r = t.trim(r), o = /^0?3[0-9]{2}[0-9]{7}$/.test(r);
                        break;
                    case"RO":
                        o = /^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/g.test(r);
                        break;
                    case"RU":
                        o = /^((8|\+7|007)[\-\.\/ ]?)?([\(\/\.]?\d{3}[\)\/\.]?[\-\.\/ ]?)?[\d\-\.\/ ]{7,10}$/g.test(r);
                        break;
                    case"SK":
                        o = /^(((00)([- ]?)|\+)(420)([- ]?))?((\d{3})([- ]?)){2}(\d{3})$/.test(r);
                        break;
                    case"TH":
                        o = /^0\(?([6|8-9]{2})*-([0-9]{3})*-([0-9]{4})$/.test(r);
                        break;
                    case"VE":
                        r = t.trim(r), o = /^0(?:2(?:12|4[0-9]|5[1-9]|6[0-9]|7[0-8]|8[1-35-8]|9[1-5]|3[45789])|4(?:1[246]|2[46]))\d{7}$/.test(r);
                        break;
                    case"US":
                    default:
                        o = /^(?:(1\-?)|(\+1 ?))?\(?(\d{3})[\)\-\.]?(\d{3})[\-\.]?(\d{4})$/.test(r)
                }
                return {
                    valid: o,
                    message: FormValidation.Helper.format(n.message || FormValidation.I18n[a].phone.country, FormValidation.I18n[a].phone.countries[s])
                }
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {regexp: {"default": "Please enter a value matching the pattern"}}}), FormValidation.Validator.regexp = {
            html5Attributes: {
                message: "message",
                regexp: "regexp"
            }, enableByHtml5: function (t) {
                var e = t.attr("pattern");
                return e ? {regexp: e} : !1
            }, validate: function (t, e, i) {
                var n = t.getFieldValue(e, "regexp");
                if ("" === n) return !0;
                var r = "string" == typeof i.regexp ? new RegExp(i.regexp) : i.regexp;
                return r.test(n)
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {remote: {"default": "Please enter a valid value"}}}), FormValidation.Validator.remote = {
            html5Attributes: {
                message: "message",
                name: "name",
                type: "type",
                url: "url",
                data: "data",
                delay: "delay"
            }, destroy: function (t, e, i) {
                var n = t.getNamespace(), r = e.data(n + ".remote.timer");
                r && (clearTimeout(r), e.removeData(n + ".remote.timer"))
            }, validate: function (e, i, n) {
                function r() {
                    var e = t.ajax({type: u, headers: h, url: c, dataType: "json", data: d});
                    return e.then(function (t) {
                        t.valid = t.valid === !0 || "true" === t.valid, o.resolve(i, "remote", t)
                    }), o.fail(function () {
                        e.abort()
                    }), o
                }

                var a = e.getNamespace(), s = e.getFieldValue(i, "remote"), o = new t.Deferred;
                if ("" === s) return o.resolve(i, "remote", {valid: !0}), o;
                var l = i.attr("data-" + a + "-field"), d = n.data || {}, c = n.url, u = n.type || "GET",
                    h = n.headers || {};
                return "function" == typeof d && (d = d.call(this, e)), "string" == typeof d && (d = JSON.parse(d)), "function" == typeof c && (c = c.call(this, e)), d[n.name || l] = s, n.delay ? (i.data(a + ".remote.timer") && clearTimeout(i.data(a + ".remote.timer")), i.data(a + ".remote.timer", setTimeout(r, n.delay)), o) : r()
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {rtn: {"default": "Please enter a valid RTN number"}}}), FormValidation.Validator.rtn = {
            validate: function (t, e, i) {
                var n = t.getFieldValue(e, "rtn");
                if ("" === n) return !0;
                if (!/^\d{9}$/.test(n)) return !1;
                for (var r = 0, a = 0; a < n.length; a += 3) r += 3 * parseInt(n.charAt(a), 10) + 7 * parseInt(n.charAt(a + 1), 10) + parseInt(n.charAt(a + 2), 10);
                return 0 !== r && r % 10 === 0
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {sedol: {"default": "Please enter a valid SEDOL number"}}}), FormValidation.Validator.sedol = {
            validate: function (t, e, i) {
                var n = t.getFieldValue(e, "sedol");
                if ("" === n) return !0;
                if (n = n.toUpperCase(), !/^[0-9A-Z]{7}$/.test(n)) return !1;
                for (var r = 0, a = [1, 3, 1, 7, 3, 9, 1], s = n.length, o = 0; s - 1 > o; o++) r += a[o] * parseInt(n.charAt(o), 36);
                return r = (10 - r % 10) % 10, r + "" === n.charAt(s - 1)
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {siren: {"default": "Please enter a valid SIREN number"}}}), FormValidation.Validator.siren = {
            validate: function (t, e, i) {
                var n = t.getFieldValue(e, "siren");
                return "" === n ? !0 : /^\d{9}$/.test(n) ? FormValidation.Helper.luhn(n) : !1
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {siret: {"default": "Please enter a valid SIRET number"}}}), FormValidation.Validator.siret = {
            validate: function (t, e, i) {
                var n = t.getFieldValue(e, "siret");
                if ("" === n) return !0;
                for (var r, a = 0, s = n.length, o = 0; s > o; o++) r = parseInt(n.charAt(o), 10), o % 2 === 0 && (r = 2 * r, r > 9 && (r -= 9)), a += r;
                return a % 10 === 0
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {step: {"default": "Please enter a valid step of %s"}}}), FormValidation.Validator.step = {
            html5Attributes: {
                message: "message",
                base: "baseValue",
                step: "step"
            }, validate: function (e, i, n) {
                var r = e.getFieldValue(i, "step");
                if ("" === r) return !0;
                if (n = t.extend({}, {baseValue: 0, step: 1}, n), r = parseFloat(r), !t.isNumeric(r)) return !1;
                var a = function (t, e) {
                    var i = Math.pow(10, e);
                    t *= i;
                    var n = t > 0 | -(0 > t), r = t % 1 === .5 * n;
                    return r ? (Math.floor(t) + (n > 0)) / i : Math.round(t) / i
                }, s = function (t, e) {
                    if (0 === e) return 1;
                    var i = (t + "").split("."), n = (e + "").split("."),
                        r = (1 === i.length ? 0 : i[1].length) + (1 === n.length ? 0 : n[1].length);
                    return a(t - e * Math.floor(t / e), r)
                }, o = e.getLocale(), l = s(r - n.baseValue, n.step);
                return {
                    valid: 0 === l || l === n.step,
                    message: FormValidation.Helper.format(n.message || FormValidation.I18n[o].step["default"], [n.step])
                }
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {
            en_US: {
                stringCase: {
                    "default": "Please enter only lowercase characters",
                    upper: "Please enter only uppercase characters"
                }
            }
        }), FormValidation.Validator.stringCase = {
            html5Attributes: {message: "message", "case": "case"},
            validate: function (t, e, i) {
                var n = t.getFieldValue(e, "stringCase");
                if ("" === n) return !0;
                var r = t.getLocale(), a = (i["case"] || "lower").toLowerCase();
                return {
                    valid: "upper" === a ? n === n.toUpperCase() : n === n.toLowerCase(),
                    message: i.message || ("upper" === a ? FormValidation.I18n[r].stringCase.upper : FormValidation.I18n[r].stringCase["default"])
                }
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {
            en_US: {
                stringLength: {
                    "default": "Please enter a value with valid length",
                    less: "Please enter less than %s characters",
                    more: "Please enter more than %s characters",
                    between: "Please enter value between %s and %s characters long"
                }
            }
        }), FormValidation.Validator.stringLength = {
            html5Attributes: {
                message: "message",
                min: "min",
                max: "max",
                trim: "trim",
                utf8bytes: "utf8Bytes"
            }, enableByHtml5: function (e) {
                var i = {}, n = e.attr("maxlength"), r = e.attr("minlength");
                return n && (i.max = parseInt(n, 10)), r && (i.min = parseInt(r, 10)), t.isEmptyObject(i) ? !1 : i
            }, validate: function (e, i, n) {
                var r = e.getFieldValue(i, "stringLength");
                if (n.trim !== !0 && "true" !== n.trim || (r = t.trim(r)), "" === r) return !0;
                var a = e.getLocale(), s = t.isNumeric(n.min) ? n.min : e.getDynamicOption(i, n.min),
                    o = t.isNumeric(n.max) ? n.max : e.getDynamicOption(i, n.max), l = function (t) {
                        for (var e = t.length, i = t.length - 1; i >= 0; i--) {
                            var n = t.charCodeAt(i);
                            n > 127 && 2047 >= n ? e++ : n > 2047 && 65535 >= n && (e += 2), n >= 56320 && 57343 >= n && i--
                        }
                        return e
                    }, d = n.utf8Bytes ? l(r) : r.length, c = !0,
                    u = n.message || FormValidation.I18n[a].stringLength["default"];
                switch ((s && d < parseInt(s, 10) || o && d > parseInt(o, 10)) && (c = !1), !0) {
                    case!!s && !!o:
                        u = FormValidation.Helper.format(n.message || FormValidation.I18n[a].stringLength.between, [parseInt(s, 10), parseInt(o, 10)]);
                        break;
                    case!!s:
                        u = FormValidation.Helper.format(n.message || FormValidation.I18n[a].stringLength.more, parseInt(s, 10));
                        break;
                    case!!o:
                        u = FormValidation.Helper.format(n.message || FormValidation.I18n[a].stringLength.less, parseInt(o, 10))
                }
                return {valid: c, message: u}
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {uri: {"default": "Please enter a valid URI"}}}), FormValidation.Validator.uri = {
            html5Attributes: {
                message: "message",
                allowlocal: "allowLocal",
                allowemptyprotocol: "allowEmptyProtocol",
                protocol: "protocol"
            }, enableByHtml5: function (t) {
                return "url" === t.attr("type")
            }, validate: function (t, e, i) {
                var n = t.getFieldValue(e, "uri");
                if ("" === n) return !0;
                var r = i.allowLocal === !0 || "true" === i.allowLocal,
                    a = i.allowEmptyProtocol === !0 || "true" === i.allowEmptyProtocol,
                    s = (i.protocol || "http, https, ftp").split(",").join("|").replace(/\s/g, ""),
                    o = new RegExp("^(?:(?:" + s + ")://)" + (a ? "?" : "") + "(?:\\S+(?::\\S*)?@)?(?:" + (r ? "" : "(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})") + "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-?)*[a-z\\u00a1-\\uffff0-9])*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" + (r ? "?" : "") + ")(?::\\d{2,5})?(?:/[^\\s]*)?$", "i");
                return o.test(n)
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {
            en_US: {
                uuid: {
                    "default": "Please enter a valid UUID number",
                    version: "Please enter a valid UUID version %s number"
                }
            }
        }), FormValidation.Validator.uuid = {
            html5Attributes: {message: "message", version: "version"},
            validate: function (t, e, i) {
                var n = t.getFieldValue(e, "uuid");
                if ("" === n) return !0;
                var r = t.getLocale(), a = {
                    3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
                    4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
                    5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
                    all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
                }, s = i.version ? i.version + "" : "all";
                return {
                    valid: null === a[s] ? !0 : a[s].test(n),
                    message: i.version ? FormValidation.Helper.format(i.message || FormValidation.I18n[r].uuid.version, i.version) : i.message || FormValidation.I18n[r].uuid["default"]
                }
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {
            en_US: {
                vat: {
                    "default": "Please enter a valid VAT number",
                    country: "Please enter a valid VAT number in %s",
                    countries: {
                        AT: "Austria",
                        BE: "Belgium",
                        BG: "Bulgaria",
                        BR: "Brazil",
                        CH: "Switzerland",
                        CY: "Cyprus",
                        CZ: "Czech Republic",
                        DE: "Germany",
                        DK: "Denmark",
                        EE: "Estonia",
                        ES: "Spain",
                        FI: "Finland",
                        FR: "France",
                        GB: "United Kingdom",
                        GR: "Greek",
                        EL: "Greek",
                        HU: "Hungary",
                        HR: "Croatia",
                        IE: "Ireland",
                        IS: "Iceland",
                        IT: "Italy",
                        LT: "Lithuania",
                        LU: "Luxembourg",
                        LV: "Latvia",
                        MT: "Malta",
                        NL: "Netherlands",
                        NO: "Norway",
                        PL: "Poland",
                        PT: "Portugal",
                        RO: "Romania",
                        RU: "Russia",
                        RS: "Serbia",
                        SE: "Sweden",
                        SI: "Slovenia",
                        SK: "Slovakia",
                        VE: "Venezuela",
                        ZA: "South Africa"
                    }
                }
            }
        }), FormValidation.Validator.vat = {
            html5Attributes: {message: "message", country: "country"},
            COUNTRY_CODES: ["AT", "BE", "BG", "BR", "CH", "CY", "CZ", "DE", "DK", "EE", "EL", "ES", "FI", "FR", "GB", "GR", "HR", "HU", "IE", "IS", "IT", "LT", "LU", "LV", "MT", "NL", "NO", "PL", "PT", "RO", "RU", "RS", "SE", "SK", "SI", "VE", "ZA"],
            validate: function (e, i, n) {
                var r = e.getFieldValue(i, "vat");
                if ("" === r) return !0;
                var a = e.getLocale(), s = n.country;
                if (s ? "string" == typeof s && -1 !== t.inArray(s.toUpperCase(), this.COUNTRY_CODES) || (s = e.getDynamicOption(i, s)) : s = r.substr(0, 2), -1 === t.inArray(s, this.COUNTRY_CODES)) return !0;
                var o = ["_", s.toLowerCase()].join("");
                return this[o](r) ? !0 : {
                    valid: !1,
                    message: FormValidation.Helper.format(n.message || FormValidation.I18n[a].vat.country, FormValidation.I18n[a].vat.countries[s.toUpperCase()])
                }
            },
            _at: function (t) {
                if (/^ATU[0-9]{8}$/.test(t) && (t = t.substr(2)), !/^U[0-9]{8}$/.test(t)) return !1;
                t = t.substr(1);
                for (var e = 0, i = [1, 2, 1, 2, 1, 2, 1], n = 0, r = 0; 7 > r; r++) n = parseInt(t.charAt(r), 10) * i[r], n > 9 && (n = Math.floor(n / 10) + n % 10), e += n;
                return e = 10 - (e + 4) % 10, 10 === e && (e = 0), e + "" === t.substr(7, 1)
            },
            _be: function (t) {
                if (/^BE[0]{0,1}[0-9]{9}$/.test(t) && (t = t.substr(2)), !/^[0]{0,1}[0-9]{9}$/.test(t)) return !1;
                if (9 === t.length && (t = "0" + t), "0" === t.substr(1, 1)) return !1;
                var e = parseInt(t.substr(0, 8), 10) + parseInt(t.substr(8, 2), 10);
                return e % 97 === 0
            },
            _bg: function (t) {
                if (/^BG[0-9]{9,10}$/.test(t) && (t = t.substr(2)), !/^[0-9]{9,10}$/.test(t)) return !1;
                var e = 0, i = 0;
                if (9 === t.length) {
                    for (i = 0; 8 > i; i++) e += parseInt(t.charAt(i), 10) * (i + 1);
                    if (e %= 11, 10 === e) for (e = 0, i = 0; 8 > i; i++) e += parseInt(t.charAt(i), 10) * (i + 3);
                    return e %= 10, e + "" === t.substr(8)
                }
                if (10 === t.length) {
                    var n = function (t) {
                        var e = parseInt(t.substr(0, 2), 10) + 1900, i = parseInt(t.substr(2, 2), 10),
                            n = parseInt(t.substr(4, 2), 10);
                        if (i > 40 ? (e += 100, i -= 40) : i > 20 && (e -= 100, i -= 20), !FormValidation.Helper.date(e, i, n)) return !1;
                        for (var r = 0, a = [2, 4, 8, 5, 10, 9, 7, 3, 6], s = 0; 9 > s; s++) r += parseInt(t.charAt(s), 10) * a[s];
                        return r = r % 11 % 10, r + "" === t.substr(9, 1)
                    }, r = function (t) {
                        for (var e = 0, i = [21, 19, 17, 13, 11, 9, 7, 3, 1], n = 0; 9 > n; n++) e += parseInt(t.charAt(n), 10) * i[n];
                        return e %= 10, e + "" === t.substr(9, 1)
                    }, a = function (t) {
                        for (var e = 0, i = [4, 3, 2, 7, 6, 5, 4, 3, 2], n = 0; 9 > n; n++) e += parseInt(t.charAt(n), 10) * i[n];
                        return e = 11 - e % 11, 10 === e ? !1 : (11 === e && (e = 0), e + "" === t.substr(9, 1))
                    };
                    return n(t) || r(t) || a(t)
                }
                return !1
            },
            _br: function (t) {
                if ("" === t) return !0;
                var e = t.replace(/[^\d]+/g, "");
                if ("" === e || 14 !== e.length) return !1;
                if ("00000000000000" === e || "11111111111111" === e || "22222222222222" === e || "33333333333333" === e || "44444444444444" === e || "55555555555555" === e || "66666666666666" === e || "77777777777777" === e || "88888888888888" === e || "99999999999999" === e) return !1;
                for (var i = e.length - 2, n = e.substring(0, i), r = e.substring(i), a = 0, s = i - 7, o = i; o >= 1; o--) a += parseInt(n.charAt(i - o), 10) * s--, 2 > s && (s = 9);
                var l = 2 > a % 11 ? 0 : 11 - a % 11;
                if (l !== parseInt(r.charAt(0), 10)) return !1;
                for (i += 1, n = e.substring(0, i), a = 0, s = i - 7, o = i; o >= 1; o--) a += parseInt(n.charAt(i - o), 10) * s--, 2 > s && (s = 9);
                return l = 2 > a % 11 ? 0 : 11 - a % 11, l === parseInt(r.charAt(1), 10)
            },
            _ch: function (t) {
                if (/^CHE[0-9]{9}(MWST)?$/.test(t) && (t = t.substr(2)), !/^E[0-9]{9}(MWST)?$/.test(t)) return !1;
                t = t.substr(1);
                for (var e = 0, i = [5, 4, 3, 2, 7, 6, 5, 4], n = 0; 8 > n; n++) e += parseInt(t.charAt(n), 10) * i[n];
                return e = 11 - e % 11, 10 === e ? !1 : (11 === e && (e = 0), e + "" === t.substr(8, 1))
            },
            _cy: function (t) {
                if (/^CY[0-5|9]{1}[0-9]{7}[A-Z]{1}$/.test(t) && (t = t.substr(2)), !/^[0-5|9]{1}[0-9]{7}[A-Z]{1}$/.test(t)) return !1;
                if ("12" === t.substr(0, 2)) return !1;
                for (var e = 0, i = {
                    0: 1,
                    1: 0,
                    2: 5,
                    3: 7,
                    4: 9,
                    5: 13,
                    6: 15,
                    7: 17,
                    8: 19,
                    9: 21
                }, n = 0; 8 > n; n++) {
                    var r = parseInt(t.charAt(n), 10);
                    n % 2 === 0 && (r = i[r + ""]), e += r
                }
                return e = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[e % 26], e + "" === t.substr(8, 1)
            },
            _cz: function (t) {
                if (/^CZ[0-9]{8,10}$/.test(t) && (t = t.substr(2)), !/^[0-9]{8,10}$/.test(t)) return !1;
                var e = 0, i = 0;
                if (8 === t.length) {
                    if (t.charAt(0) + "" == "9") return !1;
                    for (e = 0, i = 0; 7 > i; i++) e += parseInt(t.charAt(i), 10) * (8 - i);
                    return e = 11 - e % 11, 10 === e && (e = 0), 11 === e && (e = 1), e + "" === t.substr(7, 1)
                }
                if (9 === t.length && t.charAt(0) + "" == "6") {
                    for (e = 0, i = 0; 7 > i; i++) e += parseInt(t.charAt(i + 1), 10) * (8 - i);
                    return e = 11 - e % 11, 10 === e && (e = 0), 11 === e && (e = 1), e = [8, 7, 6, 5, 4, 3, 2, 1, 0, 9, 10][e - 1], e + "" === t.substr(8, 1)
                }
                if (9 === t.length || 10 === t.length) {
                    var n = 1900 + parseInt(t.substr(0, 2), 10), r = parseInt(t.substr(2, 2), 10) % 50 % 20,
                        a = parseInt(t.substr(4, 2), 10);
                    if (9 === t.length) {
                        if (n >= 1980 && (n -= 100), n > 1953) return !1
                    } else 1954 > n && (n += 100);
                    if (!FormValidation.Helper.date(n, r, a)) return !1;
                    if (10 === t.length) {
                        var s = parseInt(t.substr(0, 9), 10) % 11;
                        return 1985 > n && (s %= 10), s + "" === t.substr(9, 1)
                    }
                    return !0
                }
                return !1
            },
            _de: function (t) {
                return /^DE[0-9]{9}$/.test(t) && (t = t.substr(2)), /^[0-9]{9}$/.test(t) ? FormValidation.Helper.mod11And10(t) : !1
            },
            _dk: function (t) {
                if (/^DK[0-9]{8}$/.test(t) && (t = t.substr(2)), !/^[0-9]{8}$/.test(t)) return !1;
                for (var e = 0, i = [2, 7, 6, 5, 4, 3, 2, 1], n = 0; 8 > n; n++) e += parseInt(t.charAt(n), 10) * i[n];
                return e % 11 === 0
            },
            _ee: function (t) {
                if (/^EE[0-9]{9}$/.test(t) && (t = t.substr(2)), !/^[0-9]{9}$/.test(t)) return !1;
                for (var e = 0, i = [3, 7, 1, 3, 7, 1, 3, 7, 1], n = 0; 9 > n; n++) e += parseInt(t.charAt(n), 10) * i[n];
                return e % 10 === 0
            },
            _es: function (t) {
                if (/^ES[0-9A-Z][0-9]{7}[0-9A-Z]$/.test(t) && (t = t.substr(2)), !/^[0-9A-Z][0-9]{7}[0-9A-Z]$/.test(t)) return !1;
                var e = function (t) {
                    var e = parseInt(t.substr(0, 8), 10);
                    return e = "TRWAGMYFPDXBNJZSQVHLCKE"[e % 23], e + "" === t.substr(8, 1)
                }, i = function (t) {
                    var e = ["XYZ".indexOf(t.charAt(0)), t.substr(1)].join("");
                    return e = parseInt(e, 10), e = "TRWAGMYFPDXBNJZSQVHLCKE"[e % 23], e + "" === t.substr(8, 1)
                }, n = function (t) {
                    var e, i = t.charAt(0);
                    if (-1 !== "KLM".indexOf(i)) return e = parseInt(t.substr(1, 8), 10), e = "TRWAGMYFPDXBNJZSQVHLCKE"[e % 23], e + "" === t.substr(8, 1);
                    if (-1 !== "ABCDEFGHJNPQRSUVW".indexOf(i)) {
                        for (var n = 0, r = [2, 1, 2, 1, 2, 1, 2], a = 0, s = 0; 7 > s; s++) a = parseInt(t.charAt(s + 1), 10) * r[s], a > 9 && (a = Math.floor(a / 10) + a % 10), n += a;
                        return n = 10 - n % 10, n + "" === t.substr(8, 1) || "JABCDEFGHI"[n] === t.substr(8, 1)
                    }
                    return !1
                }, r = t.charAt(0);
                return /^[0-9]$/.test(r) ? e(t) : /^[XYZ]$/.test(r) ? i(t) : n(t)
            },
            _fi: function (t) {
                if (/^FI[0-9]{8}$/.test(t) && (t = t.substr(2)), !/^[0-9]{8}$/.test(t)) return !1;
                for (var e = 0, i = [7, 9, 10, 5, 8, 4, 2, 1], n = 0; 8 > n; n++) e += parseInt(t.charAt(n), 10) * i[n];
                return e % 11 === 0
            },
            _fr: function (t) {
                if (/^FR[0-9A-Z]{2}[0-9]{9}$/.test(t) && (t = t.substr(2)), !/^[0-9A-Z]{2}[0-9]{9}$/.test(t)) return !1;
                if (!FormValidation.Helper.luhn(t.substr(2))) return !1;
                if (/^[0-9]{2}$/.test(t.substr(0, 2))) return t.substr(0, 2) === parseInt(t.substr(2) + "12", 10) % 97 + "";
                var e, i = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";
                return e = /^[0-9]{1}$/.test(t.charAt(0)) ? 24 * i.indexOf(t.charAt(0)) + i.indexOf(t.charAt(1)) - 10 : 34 * i.indexOf(t.charAt(0)) + i.indexOf(t.charAt(1)) - 100, (parseInt(t.substr(2), 10) + 1 + Math.floor(e / 11)) % 11 === e % 11
            },
            _gb: function (t) {
                if ((/^GB[0-9]{9}$/.test(t) || /^GB[0-9]{12}$/.test(t) || /^GBGD[0-9]{3}$/.test(t) || /^GBHA[0-9]{3}$/.test(t) || /^GB(GD|HA)8888[0-9]{5}$/.test(t)) && (t = t.substr(2)), !(/^[0-9]{9}$/.test(t) || /^[0-9]{12}$/.test(t) || /^GD[0-9]{3}$/.test(t) || /^HA[0-9]{3}$/.test(t) || /^(GD|HA)8888[0-9]{5}$/.test(t))) return !1;
                var e = t.length;
                if (5 === e) {
                    var i = t.substr(0, 2), n = parseInt(t.substr(2), 10);
                    return "GD" === i && 500 > n || "HA" === i && n >= 500
                }
                if (11 === e && ("GD8888" === t.substr(0, 6) || "HA8888" === t.substr(0, 6))) return "GD" === t.substr(0, 2) && parseInt(t.substr(6, 3), 10) >= 500 || "HA" === t.substr(0, 2) && parseInt(t.substr(6, 3), 10) < 500 ? !1 : parseInt(t.substr(6, 3), 10) % 97 === parseInt(t.substr(9, 2), 10);
                if (9 === e || 12 === e) {
                    for (var r = 0, a = [8, 7, 6, 5, 4, 3, 2, 10, 1], s = 0; 9 > s; s++) r += parseInt(t.charAt(s), 10) * a[s];
                    return r %= 97, parseInt(t.substr(0, 3), 10) >= 100 ? 0 === r || 42 === r || 55 === r : 0 === r
                }
                return !0
            },
            _gr: function (t) {
                if (/^(GR|EL)[0-9]{9}$/.test(t) && (t = t.substr(2)), !/^[0-9]{9}$/.test(t)) return !1;
                8 === t.length && (t = "0" + t);
                for (var e = 0, i = [256, 128, 64, 32, 16, 8, 4, 2], n = 0; 8 > n; n++) e += parseInt(t.charAt(n), 10) * i[n];
                return e = e % 11 % 10, e + "" === t.substr(8, 1)
            },
            _el: function (t) {
                return this._gr(t)
            },
            _hu: function (t) {
                if (/^HU[0-9]{8}$/.test(t) && (t = t.substr(2)), !/^[0-9]{8}$/.test(t)) return !1;
                for (var e = 0, i = [9, 7, 3, 1, 9, 7, 3, 1], n = 0; 8 > n; n++) e += parseInt(t.charAt(n), 10) * i[n];
                return e % 10 === 0
            },
            _hr: function (t) {
                return /^HR[0-9]{11}$/.test(t) && (t = t.substr(2)), /^[0-9]{11}$/.test(t) ? FormValidation.Helper.mod11And10(t) : !1
            },
            _ie: function (t) {
                if (/^IE[0-9]{1}[0-9A-Z\*\+]{1}[0-9]{5}[A-Z]{1,2}$/.test(t) && (t = t.substr(2)), !/^[0-9]{1}[0-9A-Z\*\+]{1}[0-9]{5}[A-Z]{1,2}$/.test(t)) return !1;
                var e = function (t) {
                    for (; t.length < 7;) t = "0" + t;
                    for (var e = "WABCDEFGHIJKLMNOPQRSTUV", i = 0, n = 0; 7 > n; n++) i += parseInt(t.charAt(n), 10) * (8 - n);
                    return i += 9 * e.indexOf(t.substr(7)), e[i % 23]
                };
                return /^[0-9]+$/.test(t.substr(0, 7)) ? t.charAt(7) === e(t.substr(0, 7) + t.substr(8) + "") : -1 !== "ABCDEFGHIJKLMNOPQRSTUVWXYZ+*".indexOf(t.charAt(1)) ? t.charAt(7) === e(t.substr(2, 5) + t.substr(0, 1) + "") : !0
            },
            _is: function (t) {
                return /^IS[0-9]{5,6}$/.test(t) && (t = t.substr(2)), /^[0-9]{5,6}$/.test(t)
            },
            _it: function (t) {
                if (/^IT[0-9]{11}$/.test(t) && (t = t.substr(2)), !/^[0-9]{11}$/.test(t)) return !1;
                if (0 === parseInt(t.substr(0, 7), 10)) return !1;
                var e = parseInt(t.substr(7, 3), 10);
                return 1 > e || e > 201 && 999 !== e && 888 !== e ? !1 : FormValidation.Helper.luhn(t)
            },
            _lt: function (t) {
                if (/^LT([0-9]{7}1[0-9]{1}|[0-9]{10}1[0-9]{1})$/.test(t) && (t = t.substr(2)), !/^([0-9]{7}1[0-9]{1}|[0-9]{10}1[0-9]{1})$/.test(t)) return !1;
                var e, i = t.length, n = 0;
                for (e = 0; i - 1 > e; e++) n += parseInt(t.charAt(e), 10) * (1 + e % 9);
                var r = n % 11;
                if (10 === r) for (n = 0, e = 0; i - 1 > e; e++) n += parseInt(t.charAt(e), 10) * (1 + (e + 2) % 9);
                return r = r % 11 % 10, r + "" === t.charAt(i - 1)
            },
            _lu: function (t) {
                return /^LU[0-9]{8}$/.test(t) && (t = t.substr(2)), /^[0-9]{8}$/.test(t) ? parseInt(t.substr(0, 6), 10) % 89 + "" === t.substr(6, 2) : !1
            },
            _lv: function (t) {
                if (/^LV[0-9]{11}$/.test(t) && (t = t.substr(2)), !/^[0-9]{11}$/.test(t)) return !1;
                var e, i = parseInt(t.charAt(0), 10), n = 0, r = [], a = t.length;
                if (i > 3) {
                    for (n = 0, r = [9, 1, 4, 8, 3, 10, 2, 5, 7, 6, 1], e = 0; a > e; e++) n += parseInt(t.charAt(e), 10) * r[e];
                    return n %= 11, 3 === n
                }
                var s = parseInt(t.substr(0, 2), 10), o = parseInt(t.substr(2, 2), 10),
                    l = parseInt(t.substr(4, 2), 10);
                if (l = l + 1800 + 100 * parseInt(t.charAt(6), 10), !FormValidation.Helper.date(l, o, s)) return !1;
                for (n = 0, r = [10, 5, 8, 4, 2, 1, 6, 3, 7, 9], e = 0; a - 1 > e; e++) n += parseInt(t.charAt(e), 10) * r[e];
                return n = (n + 1) % 11 % 10, n + "" === t.charAt(a - 1)
            },
            _mt: function (t) {
                if (/^MT[0-9]{8}$/.test(t) && (t = t.substr(2)), !/^[0-9]{8}$/.test(t)) return !1;
                for (var e = 0, i = [3, 4, 6, 7, 8, 9, 10, 1], n = 0; 8 > n; n++) e += parseInt(t.charAt(n), 10) * i[n];
                return e % 37 === 0
            },
            _nl: function (t) {
                if (/^NL[0-9]{9}B[0-9]{2}$/.test(t) && (t = t.substr(2)), !/^[0-9]{9}B[0-9]{2}$/.test(t)) return !1;
                for (var e = 0, i = [9, 8, 7, 6, 5, 4, 3, 2], n = 0; 8 > n; n++) e += parseInt(t.charAt(n), 10) * i[n];
                return e %= 11, e > 9 && (e = 0), e + "" === t.substr(8, 1)
            },
            _no: function (t) {
                if (/^NO[0-9]{9}$/.test(t) && (t = t.substr(2)), !/^[0-9]{9}$/.test(t)) return !1;
                for (var e = 0, i = [3, 2, 7, 6, 5, 4, 3, 2], n = 0; 8 > n; n++) e += parseInt(t.charAt(n), 10) * i[n];
                return e = 11 - e % 11, 11 === e && (e = 0), e + "" === t.substr(8, 1)
            },
            _pl: function (t) {
                if (/^PL[0-9]{10}$/.test(t) && (t = t.substr(2)), !/^[0-9]{10}$/.test(t)) return !1;
                for (var e = 0, i = [6, 5, 7, 2, 3, 4, 5, 6, 7, -1], n = 0; 10 > n; n++) e += parseInt(t.charAt(n), 10) * i[n];
                return e % 11 === 0
            },
            _pt: function (t) {
                if (/^PT[0-9]{9}$/.test(t) && (t = t.substr(2)), !/^[0-9]{9}$/.test(t)) return !1;
                for (var e = 0, i = [9, 8, 7, 6, 5, 4, 3, 2], n = 0; 8 > n; n++) e += parseInt(t.charAt(n), 10) * i[n];
                return e = 11 - e % 11, e > 9 && (e = 0), e + "" === t.substr(8, 1)
            },
            _ro: function (t) {
                if (/^RO[1-9][0-9]{1,9}$/.test(t) && (t = t.substr(2)), !/^[1-9][0-9]{1,9}$/.test(t)) return !1;
                for (var e = t.length, i = [7, 5, 3, 2, 1, 7, 5, 3, 2].slice(10 - e), n = 0, r = 0; e - 1 > r; r++) n += parseInt(t.charAt(r), 10) * i[r];
                return n = 10 * n % 11 % 10, n + "" === t.substr(e - 1, 1)
            },
            _ru: function (t) {
                if (/^RU([0-9]{10}|[0-9]{12})$/.test(t) && (t = t.substr(2)), !/^([0-9]{10}|[0-9]{12})$/.test(t)) return !1;
                var e = 0;
                if (10 === t.length) {
                    var i = 0, n = [2, 4, 10, 3, 5, 9, 4, 6, 8, 0];
                    for (e = 0; 10 > e; e++) i += parseInt(t.charAt(e), 10) * n[e];
                    return i %= 11, i > 9 && (i %= 10), i + "" === t.substr(9, 1)
                }
                if (12 === t.length) {
                    var r = 0, a = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8, 0], s = 0, o = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8, 0];
                    for (e = 0; 11 > e; e++) r += parseInt(t.charAt(e), 10) * a[e], s += parseInt(t.charAt(e), 10) * o[e];
                    return r %= 11, r > 9 && (r %= 10), s %= 11, s > 9 && (s %= 10), r + "" === t.substr(10, 1) && s + "" === t.substr(11, 1)
                }
                return !1
            },
            _rs: function (t) {
                if (/^RS[0-9]{9}$/.test(t) && (t = t.substr(2)), !/^[0-9]{9}$/.test(t)) return !1;
                for (var e = 10, i = 0, n = 0; 8 > n; n++) i = (parseInt(t.charAt(n), 10) + e) % 10, 0 === i && (i = 10), e = 2 * i % 11;
                return (e + parseInt(t.substr(8, 1), 10)) % 10 === 1
            },
            _se: function (t) {
                return /^SE[0-9]{10}01$/.test(t) && (t = t.substr(2)), /^[0-9]{10}01$/.test(t) ? (t = t.substr(0, 10), FormValidation.Helper.luhn(t)) : !1
            },
            _si: function (t) {
                var e = t.match(/^(SI)?([1-9][0-9]{7})$/);
                if (!e) return !1;
                e[1] && (t = t.substr(2));
                for (var i = 0, n = [8, 7, 6, 5, 4, 3, 2], r = 0; 7 > r; r++) i += parseInt(t.charAt(r), 10) * n[r];
                return i = 11 - i % 11, 10 === i && (i = 0), i + "" === t.substr(7, 1)
            },
            _sk: function (t) {
                return /^SK[1-9][0-9][(2-4)|(6-9)][0-9]{7}$/.test(t) && (t = t.substr(2)), /^[1-9][0-9][(2-4)|(6-9)][0-9]{7}$/.test(t) ? parseInt(t, 10) % 11 === 0 : !1
            },
            _ve: function (t) {
                if (/^VE[VEJPG][0-9]{9}$/.test(t) && (t = t.substr(2)), !/^[VEJPG][0-9]{9}$/.test(t)) return !1;
                for (var e = {
                    V: 4,
                    E: 8,
                    J: 12,
                    P: 16,
                    G: 20
                }, i = e[t.charAt(0)], n = [3, 2, 7, 6, 5, 4, 3, 2], r = 0; 8 > r; r++) i += parseInt(t.charAt(r + 1), 10) * n[r];
                return i = 11 - i % 11, 11 !== i && 10 !== i || (i = 0), i + "" === t.substr(9, 1)
            },
            _za: function (t) {
                return /^ZA4[0-9]{9}$/.test(t) && (t = t.substr(2)), /^4[0-9]{9}$/.test(t)
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {en_US: {vin: {"default": "Please enter a valid VIN number"}}}), FormValidation.Validator.vin = {
            validate: function (t, e, i) {
                var n = t.getFieldValue(e, "vin");
                if ("" === n) return !0;
                if (!/^[a-hj-npr-z0-9]{8}[0-9xX][a-hj-npr-z0-9]{8}$/i.test(n)) return !1;
                n = n.toUpperCase();
                for (var r = {
                    A: 1,
                    B: 2,
                    C: 3,
                    D: 4,
                    E: 5,
                    F: 6,
                    G: 7,
                    H: 8,
                    J: 1,
                    K: 2,
                    L: 3,
                    M: 4,
                    N: 5,
                    P: 7,
                    R: 9,
                    S: 2,
                    T: 3,
                    U: 4,
                    V: 5,
                    W: 6,
                    X: 7,
                    Y: 8,
                    Z: 9,
                    1: 1,
                    2: 2,
                    3: 3,
                    4: 4,
                    5: 5,
                    6: 6,
                    7: 7,
                    8: 8,
                    9: 9,
                    0: 0
                }, a = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2], s = 0, o = n.length, l = 0; o > l; l++) s += r[n.charAt(l) + ""] * a[l];
                var d = s % 11;
                return 10 === d && (d = "X"), d + "" === n.charAt(8)
            }
        }
    }(jQuery), function (t) {
        FormValidation.I18n = t.extend(!0, FormValidation.I18n || {}, {
            en_US: {
                zipCode: {
                    "default": "Please enter a valid postal code",
                    country: "Please enter a valid postal code in %s",
                    countries: {
                        AT: "Austria",
                        BR: "Brazil",
                        CA: "Canada",
                        CH: "Switzerland",
                        CZ: "Czech Republic",
                        DE: "Germany",
                        DK: "Denmark",
                        ES: "Spain",
                        FR: "France",
                        GB: "United Kingdom",
                        IE: "Ireland",
                        IN: "India",
                        IT: "Italy",
                        MA: "Morocco",
                        NL: "Netherlands",
                        PT: "Portugal",
                        RO: "Romania",
                        RU: "Russia",
                        SE: "Sweden",
                        SG: "Singapore",
                        SK: "Slovakia",
                        US: "USA"
                    }
                }
            }
        }), FormValidation.Validator.zipCode = {
            html5Attributes: {message: "message", country: "country"},
            COUNTRY_CODES: ["AT", "BR", "CA", "CH", "CZ", "DE", "DK", "ES", "FR", "GB", "IE", "IN", "IT", "MA", "NL", "PT", "RO", "RU", "SE", "SG", "SK", "US"],
            validate: function (e, i, n) {
                var r = e.getFieldValue(i, "zipCode");
                if ("" === r || !n.country) return !0;
                var a = e.getLocale(), s = n.country;
                if ("string" == typeof s && -1 !== t.inArray(s, this.COUNTRY_CODES) || (s = e.getDynamicOption(i, s)), !s || -1 === t.inArray(s.toUpperCase(), this.COUNTRY_CODES)) return !0;
                var o = !1;
                switch (s = s.toUpperCase()) {
                    case"AT":
                        o = /^([1-9]{1})(\d{3})$/.test(r);
                        break;
                    case"BR":
                        o = /^(\d{2})([\.]?)(\d{3})([\-]?)(\d{3})$/.test(r);
                        break;
                    case"CA":
                        o = /^(?:A|B|C|E|G|H|J|K|L|M|N|P|R|S|T|V|X|Y){1}[0-9]{1}(?:A|B|C|E|G|H|J|K|L|M|N|P|R|S|T|V|W|X|Y|Z){1}\s?[0-9]{1}(?:A|B|C|E|G|H|J|K|L|M|N|P|R|S|T|V|W|X|Y|Z){1}[0-9]{1}$/i.test(r);
                        break;
                    case"CH":
                        o = /^([1-9]{1})(\d{3})$/.test(r);
                        break;
                    case"CZ":
                        o = /^(\d{3})([ ]?)(\d{2})$/.test(r);
                        break;
                    case"DE":
                        o = /^(?!01000|99999)(0[1-9]\d{3}|[1-9]\d{4})$/.test(r);
                        break;
                    case"DK":
                        o = /^(DK(-|\s)?)?\d{4}$/i.test(r);
                        break;
                    case"ES":
                        o = /^(?:0[1-9]|[1-4][0-9]|5[0-2])\d{3}$/.test(r);
                        break;
                    case"FR":
                        o = /^[0-9]{5}$/i.test(r);
                        break;
                    case"GB":
                        o = this._gb(r);
                        break;
                    case"IN":
                        o = /^\d{3}\s?\d{3}$/.test(r);
                        break;
                    case"IE":
                        o = /^(D6W|[ACDEFHKNPRTVWXY]\d{2})\s[0-9ACDEFHKNPRTVWXY]{4}$/.test(r);
                        break;
                    case"IT":
                        o = /^(I-|IT-)?\d{5}$/i.test(r);
                        break;
                    case"MA":
                        o = /^[1-9][0-9]{4}$/i.test(r);
                        break;
                    case"NL":
                        o = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i.test(r);
                        break;
                    case"PT":
                        o = /^[1-9]\d{3}-\d{3}$/.test(r);
                        break;
                    case"RO":
                        o = /^(0[1-8]{1}|[1-9]{1}[0-5]{1})?[0-9]{4}$/i.test(r);
                        break;
                    case"RU":
                        o = /^[0-9]{6}$/i.test(r);
                        break;
                    case"SE":
                        o = /^(S-)?\d{3}\s?\d{2}$/i.test(r);
                        break;
                    case"SG":
                        o = /^([0][1-9]|[1-6][0-9]|[7]([0-3]|[5-9])|[8][0-2])(\d{4})$/i.test(r);
                        break;
                    case"SK":
                        o = /^(\d{3})([ ]?)(\d{2})$/.test(r);
                        break;
                    case"US":
                    default:
                        o = /^\d{4,5}([\-]?\d{4})?$/.test(r)
                }
                return {
                    valid: o,
                    message: FormValidation.Helper.format(n.message || FormValidation.I18n[a].zipCode.country, FormValidation.I18n[a].zipCode.countries[s])
                }
            },
            _gb: function (t) {
                for (var e = "[ABCDEFGHIJKLMNOPRSTUWYZ]", i = "[ABCDEFGHKLMNOPQRSTUVWXY]", n = "[ABCDEFGHJKPMNRSTUVWXY]", r = "[ABEHMNPRVWXY]", a = "[ABDEFGHJLNPQRSTUWXYZ]", s = [new RegExp("^(" + e + "{1}" + i + "?[0-9]{1,2})(\\s*)([0-9]{1}" + a + "{2})$", "i"), new RegExp("^(" + e + "{1}[0-9]{1}" + n + "{1})(\\s*)([0-9]{1}" + a + "{2})$", "i"), new RegExp("^(" + e + "{1}" + i + "{1}?[0-9]{1}" + r + "{1})(\\s*)([0-9]{1}" + a + "{2})$", "i"), new RegExp("^(BF1)(\\s*)([0-6]{1}[ABDEFGHJLNPQRST]{1}[ABDEFGHJLNPQRSTUWZYZ]{1})$", "i"), /^(GIR)(\s*)(0AA)$/i, /^(BFPO)(\s*)([0-9]{1,4})$/i, /^(BFPO)(\s*)(c\/o\s*[0-9]{1,3})$/i, /^([A-Z]{4})(\s*)(1ZZ)$/i, /^(AI-2640)$/i], o = 0; o < s.length; o++) if (s[o].test(t)) return !0;
                return !1
            }
        }
    }(jQuery), function (t) {
        FormValidation.Framework.Bootstrap = function (e, i, n) {
            i = t.extend(!0, {
                button: {selector: '[type="submit"]', disabled: "disabled"},
                err: {clazz: "help-block", parent: "^(.*)col-(xs|sm|md|lg)-(offset-){0,1}[0-9]+(.*)$"},
                icon: {valid: null, invalid: null, validating: null, feedback: "form-control-feedback"},
                row: {selector: ".form-group", valid: "has-success", invalid: "has-error", feedback: "has-feedback"}
            }, i), FormValidation.Base.apply(this, [e, i, n])
        }, FormValidation.Framework.Bootstrap.prototype = t.extend({}, FormValidation.Base.prototype, {
            _fixIcon: function (t, e) {
                var i = this._namespace, n = t.attr("type"), r = t.attr("data-" + i + "-field"),
                    a = this.options.fields[r].row || this.options.row.selector, s = t.closest(a);
                if ("checkbox" === n || "radio" === n) {
                    var o = t.parent();
                    o.hasClass(n) ? e.insertAfter(o) : o.parent().hasClass(n) && e.insertAfter(o.parent())
                }
                0 === s.find("label").length && e.addClass("fv-icon-no-label"), 0 !== s.find(".input-group").length && e.addClass("fv-bootstrap-icon-input-group").insertAfter(s.find(".input-group").eq(0))
            }, _createTooltip: function (t, e, i) {
                var n = this._namespace, r = t.data(n + ".icon");
                if (r) switch (i) {
                    case"popover":
                        r.css({cursor: "pointer", "pointer-events": "auto"}).popover("destroy").popover({
                            container: "body",
                            content: e,
                            html: !0,
                            placement: "auto top",
                            trigger: "hover click"
                        });
                        break;
                    case"tooltip":
                    default:
                        r.css({cursor: "pointer", "pointer-events": "auto"}).tooltip("destroy").tooltip({
                            container: "body",
                            html: !0,
                            placement: "auto top",
                            title: e
                        })
                }
            }, _destroyTooltip: function (t, e) {
                var i = this._namespace, n = t.data(i + ".icon");
                if (n) switch (e) {
                    case"popover":
                        n.css({cursor: "", "pointer-events": "none"}).popover("destroy");
                        break;
                    case"tooltip":
                    default:
                        n.css({cursor: "", "pointer-events": "none"}).tooltip("destroy")
                }
            }, _hideTooltip: function (t, e) {
                var i = this._namespace, n = t.data(i + ".icon");
                if (n) switch (e) {
                    case"popover":
                        n.popover("hide");
                        break;
                    case"tooltip":
                    default:
                        n.tooltip("hide")
                }
            }, _showTooltip: function (t, e) {
                var i = this._namespace, n = t.data(i + ".icon");
                if (n) switch (e) {
                    case"popover":
                        n.popover("show");
                        break;
                    case"tooltip":
                    default:
                        n.tooltip("show")
                }
            }
        }), t.fn.bootstrapValidator = function (e) {
            var i = arguments;
            return this.each(function () {
                var n = t(this), r = n.data("formValidation") || n.data("bootstrapValidator"),
                    a = "object" == typeof e && e;
                r || (r = new FormValidation.Framework.Bootstrap(this, t.extend({}, {
                    events: {
                        formInit: "init.form.bv",
                        formError: "error.form.bv",
                        formSuccess: "success.form.bv",
                        fieldAdded: "added.field.bv",
                        fieldRemoved: "removed.field.bv",
                        fieldInit: "init.field.bv",
                        fieldError: "error.field.bv",
                        fieldSuccess: "success.field.bv",
                        fieldStatus: "status.field.bv",
                        localeChanged: "changed.locale.bv",
                        validatorError: "error.validator.bv",
                        validatorSuccess: "success.validator.bv"
                    }
                }, a), "bv"), n.addClass("fv-form-bootstrap").data("formValidation", r).data("bootstrapValidator", r)), "string" == typeof e && r[e].apply(r, Array.prototype.slice.call(i, 1))
            })
        }, t.fn.bootstrapValidator.Constructor = FormValidation.Framework.Bootstrap
    }(jQuery), function (t) {
        FormValidation.AddOn.mandatoryIcon = {
            html5Attributes: {icon: "icon"}, init: function (e, i) {
                if (i && i.icon) {
                    var n = this, r = e.getNamespace(), a = e.getOptions();
                    for (var s in a.fields) e.getFieldElements(s).each(function () {
                        var o = t(this), l = o.data(r + ".icon"), d = a.fields[s].validators;
                        d.notEmpty && d.notEmpty.enabled !== !1 && a.fields[s].enabled !== !1 && n._isEmpty(e, o) && l.addClass(i.icon).show()
                    });
                    var o = i.icon.split(" "), l = {};
                    if (l[e.STATUS_VALID] = [], l[e.STATUS_INVALID] = [], l[e.STATUS_VALIDATING] = [], a.icon) {
                        var d = {};
                        d[e.STATUS_VALID] = a.icon.valid ? a.icon.valid.split(" ") : [], d[e.STATUS_INVALID] = a.icon.invalid ? a.icon.invalid.split(" ") : [], d[e.STATUS_VALIDATING] = a.icon.validating ? a.icon.validating.split(" ") : [];
                        for (var c in d) {
                            for (var u = 0; u < o.length; u++) -1 === t.inArray(o[u], d[c]) && l[c].push(o[u]);
                            l[c] = l[c].join(" ")
                        }
                    }
                    e.getForm().on(a.events.fieldStatus, function (t, s) {
                        var o = s.element.data(r + ".icon"), d = s.fv.getOptions(s.field).validators;
                        d.notEmpty && d.notEmpty.enabled !== !1 && a.fields[s.field].enabled !== !1 && (a.icon && (a.icon.valid || a.icon.invalid || a.icon.validating) ? o.removeClass(l[s.status]) : o.removeClass(i.icon), s.status === e.STATUS_NOT_VALIDATED && n._isEmpty(e, s.element) && o.addClass(i.icon).show())
                    })
                }
            }, _isEmpty: function (t, e) {
                return !FormValidation.Validator.notEmpty.validate(t, e)
            }
        }
    }(jQuery), function (t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : jQuery)
    }(function (t, e) {
        function i() {
            return new Date(Date.UTC.apply(Date, arguments))
        }

        function n() {
            var t = new Date;
            return i(t.getFullYear(), t.getMonth(), t.getDate())
        }

        function r(t, e) {
            return t.getUTCFullYear() === e.getUTCFullYear() && t.getUTCMonth() === e.getUTCMonth() && t.getUTCDate() === e.getUTCDate()
        }

        function a(t) {
            return function () {
                return this[t].apply(this, arguments)
            }
        }

        function s(t) {
            return t && !isNaN(t.getTime())
        }

        function o(e, i) {
            function n(t, e) {
                return e.toLowerCase()
            }

            var r, a = t(e).data(), s = {}, o = new RegExp("^" + i.toLowerCase() + "([A-Z])");
            i = new RegExp("^" + i.toLowerCase());
            for (var l in a) i.test(l) && (r = l.replace(o, n), s[r] = a[l]);
            return s
        }

        function l(e) {
            var i = {};
            if (g[e] || (e = e.split("-")[0], g[e])) {
                var n = g[e];
                return t.each(m, function (t, e) {
                    e in n && (i[e] = n[e])
                }), i
            }
        }

        var d = function () {
            var e = {
                get: function (t) {
                    return this.slice(t)[0]
                }, contains: function (t) {
                    for (var e = t && t.valueOf(), i = 0, n = this.length; n > i; i++) if (this[i].valueOf() === e) return i;
                    return -1
                }, remove: function (t) {
                    this.splice(t, 1)
                }, replace: function (e) {
                    e && (t.isArray(e) || (e = [e]), this.clear(), this.push.apply(this, e))
                }, clear: function () {
                    this.length = 0
                }, copy: function () {
                    var t = new d;
                    return t.replace(this), t
                }
            };
            return function () {
                var i = [];
                return i.push.apply(i, arguments), t.extend(i, e), i
            }
        }(), c = function (e, i) {
            t(e).data("datepicker", this), this._process_options(i), this.dates = new d, this.viewDate = this.o.defaultViewDate, this.focusDate = null, this.element = t(e), this.isInline = !1, this.isInput = this.element.is("input"), this.component = this.element.hasClass("date") ? this.element.find(".add-on, .input-group-addon, .btn") : !1, this.hasInput = this.component && this.element.find("input").length, this.component && 0 === this.component.length && (this.component = !1), this.picker = t(v.template), this._buildEvents(), this._attachEvents(), this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"), this.o.rtl && this.picker.addClass("datepicker-rtl"), this.viewMode = this.o.startView, this.o.calendarWeeks && this.picker.find("thead .datepicker-title, tfoot .today, tfoot .clear").attr("colspan", function (t, e) {
                return parseInt(e) + 1
            }), this._allow_update = !1, this.setStartDate(this._o.startDate), this.setEndDate(this._o.endDate), this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled), this.setDaysOfWeekHighlighted(this.o.daysOfWeekHighlighted), this.setDatesDisabled(this.o.datesDisabled), this.fillDow(), this.fillMonths(), this._allow_update = !0, this.update(), this.showMode(), this.isInline && this.show()
        };
        c.prototype = {
            constructor: c, _process_options: function (e) {
                this._o = t.extend({}, this._o, e);
                var r = this.o = t.extend({}, this._o), a = r.language;
                switch (g[a] || (a = a.split("-")[0], g[a] || (a = f.language)), r.language = a, r.startView) {
                    case 2:
                    case"decade":
                        r.startView = 2;
                        break;
                    case 1:
                    case"year":
                        r.startView = 1;
                        break;
                    default:
                        r.startView = 0
                }
                switch (r.minViewMode) {
                    case 1:
                    case"months":
                        r.minViewMode = 1;
                        break;
                    case 2:
                    case"years":
                        r.minViewMode = 2;
                        break;
                    default:
                        r.minViewMode = 0
                }
                switch (r.maxViewMode) {
                    case 0:
                    case"days":
                        r.maxViewMode = 0;
                        break;
                    case 1:
                    case"months":
                        r.maxViewMode = 1;
                        break;
                    default:
                        r.maxViewMode = 2
                }
                r.startView = Math.min(r.startView, r.maxViewMode), r.startView = Math.max(r.startView, r.minViewMode), r.multidate !== !0 && (r.multidate = Number(r.multidate) || !1, r.multidate !== !1 && (r.multidate = Math.max(0, r.multidate))), r.multidateSeparator = String(r.multidateSeparator), r.weekStart %= 7, r.weekEnd = (r.weekStart + 6) % 7;
                var s = v.parseFormat(r.format);
                if (r.startDate !== -(1 / 0) && (r.startDate ? r.startDate instanceof Date ? r.startDate = this._local_to_utc(this._zero_time(r.startDate)) : r.startDate = v.parseDate(r.startDate, s, r.language) : r.startDate = -(1 / 0)), r.endDate !== 1 / 0 && (r.endDate ? r.endDate instanceof Date ? r.endDate = this._local_to_utc(this._zero_time(r.endDate)) : r.endDate = v.parseDate(r.endDate, s, r.language) : r.endDate = 1 / 0), r.daysOfWeekDisabled = r.daysOfWeekDisabled || [], t.isArray(r.daysOfWeekDisabled) || (r.daysOfWeekDisabled = r.daysOfWeekDisabled.split(/[,\s]*/)), r.daysOfWeekDisabled = t.map(r.daysOfWeekDisabled, function (t) {
                        return parseInt(t, 10)
                    }), r.daysOfWeekHighlighted = r.daysOfWeekHighlighted || [], t.isArray(r.daysOfWeekHighlighted) || (r.daysOfWeekHighlighted = r.daysOfWeekHighlighted.split(/[,\s]*/)), r.daysOfWeekHighlighted = t.map(r.daysOfWeekHighlighted, function (t) {
                        return parseInt(t, 10)
                    }), r.datesDisabled = r.datesDisabled || [], !t.isArray(r.datesDisabled)) {
                    var o = [];
                    o.push(v.parseDate(r.datesDisabled, s, r.language)), r.datesDisabled = o
                }
                r.datesDisabled = t.map(r.datesDisabled, function (t) {
                    return v.parseDate(t, s, r.language)
                });
                var l = String(r.orientation).toLowerCase().split(/\s+/g), d = r.orientation.toLowerCase();
                if (l = t.grep(l, function (t) {
                        return /^auto|left|right|top|bottom$/.test(t)
                    }), r.orientation = {x: "auto", y: "auto"}, d && "auto" !== d) if (1 === l.length) switch (l[0]) {
                    case"top":
                    case"bottom":
                        r.orientation.y = l[0];
                        break;
                    case"left":
                    case"right":
                        r.orientation.x = l[0]
                } else d = t.grep(l, function (t) {
                    return /^left|right$/.test(t)
                }), r.orientation.x = d[0] || "auto", d = t.grep(l, function (t) {
                    return /^top|bottom$/.test(t)
                }), r.orientation.y = d[0] || "auto"; else ;
                if (r.defaultViewDate) {
                    var c = r.defaultViewDate.year || (new Date).getFullYear(), u = r.defaultViewDate.month || 0,
                        h = r.defaultViewDate.day || 1;
                    r.defaultViewDate = i(c, u, h)
                } else r.defaultViewDate = n()
            }, _events: [], _secondaryEvents: [], _applyEvents: function (t) {
                for (var i, n, r, a = 0; a < t.length; a++) i = t[a][0], 2 === t[a].length ? (n = e, r = t[a][1]) : 3 === t[a].length && (n = t[a][1], r = t[a][2]), i.on(r, n)
            }, _unapplyEvents: function (t) {
                for (var i, n, r, a = 0; a < t.length; a++) i = t[a][0], 2 === t[a].length ? (r = e, n = t[a][1]) : 3 === t[a].length && (r = t[a][1], n = t[a][2]), i.off(n, r)
            }, _buildEvents: function () {
                var e = {
                    keyup: t.proxy(function (e) {
                        -1 === t.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) && this.update()
                    }, this), keydown: t.proxy(this.keydown, this), paste: t.proxy(this.paste, this)
                };
                this.o.showOnFocus === !0 && (e.focus = t.proxy(this.show, this)), this.isInput ? this._events = [[this.element, e]] : this.component && this.hasInput ? this._events = [[this.element.find("input"), e], [this.component, {click: t.proxy(this.show, this)}]] : this.element.is("div") ? this.isInline = !0 : this._events = [[this.element, {click: t.proxy(this.show, this)}]], this._events.push([this.element, "*", {
                    blur: t.proxy(function (t) {
                        this._focused_from = t.target
                    }, this)
                }], [this.element, {
                    blur: t.proxy(function (t) {
                        this._focused_from = t.target
                    }, this)
                }]), this.o.immediateUpdates && this._events.push([this.element, {
                    "changeYear changeMonth": t.proxy(function (t) {
                        this.update(t.date)
                    }, this)
                }]), this._secondaryEvents = [[this.picker, {click: t.proxy(this.click, this)}], [t(window), {resize: t.proxy(this.place, this)}], [t(document), {
                    mousedown: t.proxy(function (t) {
                        this.element.is(t.target) || this.element.find(t.target).length || this.picker.is(t.target) || this.picker.find(t.target).length || this.picker.hasClass("datepicker-inline") || this.hide()
                    }, this)
                }]]
            }, _attachEvents: function () {
                this._detachEvents(), this._applyEvents(this._events)
            }, _detachEvents: function () {
                this._unapplyEvents(this._events)
            }, _attachSecondaryEvents: function () {
                this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents)
            }, _detachSecondaryEvents: function () {
                this._unapplyEvents(this._secondaryEvents)
            }, _trigger: function (e, i) {
                var n = i || this.dates.get(-1), r = this._utc_to_local(n);
                this.element.trigger({
                    type: e,
                    date: r,
                    dates: t.map(this.dates, this._utc_to_local),
                    format: t.proxy(function (t, e) {
                        0 === arguments.length ? (t = this.dates.length - 1, e = this.o.format) : "string" == typeof t && (e = t, t = this.dates.length - 1), e = e || this.o.format;
                        var i = this.dates.get(t);
                        return v.formatDate(i, e, this.o.language)
                    }, this)
                })
            }, show: function () {
                var e = this.component ? this.element.find("input") : this.element;
                if (!e.attr("readonly") || this.o.enableOnReadonly !== !1) return this.isInline || this.picker.appendTo(this.o.container), this.place(), this.picker.show(), this._attachSecondaryEvents(), this._trigger("show"), (window.navigator.msMaxTouchPoints || "ontouchstart" in document) && this.o.disableTouchKeyboard && t(this.element).blur(), this
            }, hide: function () {
                return this.isInline ? this : this.picker.is(":visible") ? (this.focusDate = null, this.picker.hide().detach(), this._detachSecondaryEvents(), this.viewMode = this.o.startView, this.showMode(), this.o.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(), this._trigger("hide"), this) : this
            }, remove: function () {
                return this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), delete this.element.data().datepicker, this.isInput || delete this.element.data().date, this
            }, paste: function (e) {
                var i;
                if (e.originalEvent.clipboardData && e.originalEvent.clipboardData.types && -1 !== t.inArray("text/plain", e.originalEvent.clipboardData.types)) i = e.originalEvent.clipboardData.getData("text/plain"); else {
                    if (!window.clipboardData) return;
                    i = window.clipboardData.getData("Text")
                }
                this.setDate(i), this.update(), e.preventDefault()
            }, _utc_to_local: function (t) {
                return t && new Date(t.getTime() + 6e4 * t.getTimezoneOffset())
            }, _local_to_utc: function (t) {
                return t && new Date(t.getTime() - 6e4 * t.getTimezoneOffset())
            }, _zero_time: function (t) {
                return t && new Date(t.getFullYear(), t.getMonth(), t.getDate())
            }, _zero_utc_time: function (t) {
                return t && new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()))
            }, getDates: function () {
                return t.map(this.dates, this._utc_to_local)
            }, getUTCDates: function () {
                return t.map(this.dates, function (t) {
                    return new Date(t)
                })
            }, getDate: function () {
                return this._utc_to_local(this.getUTCDate())
            }, getUTCDate: function () {
                var t = this.dates.get(-1);
                return "undefined" != typeof t ? new Date(t) : null
            }, clearDates: function () {
                var t;
                this.isInput ? t = this.element : this.component && (t = this.element.find("input")), t && t.val(""), this.update(), this._trigger("changeDate"), this.o.autoclose && this.hide()
            }, setDates: function () {
                var e = t.isArray(arguments[0]) ? arguments[0] : arguments;
                return this.update.apply(this, e), this._trigger("changeDate"), this.setValue(), this
            }, setUTCDates: function () {
                var e = t.isArray(arguments[0]) ? arguments[0] : arguments;
                return this.update.apply(this, t.map(e, this._utc_to_local)), this._trigger("changeDate"), this.setValue(), this
            }, setDate: a("setDates"), setUTCDate: a("setUTCDates"), setValue: function () {
                var t = this.getFormattedDate();
                return this.isInput ? this.element.val(t) : this.component && this.element.find("input").val(t), this
            }, getFormattedDate: function (i) {
                i === e && (i = this.o.format);
                var n = this.o.language;
                return t.map(this.dates, function (t) {
                    return v.formatDate(t, i, n)
                }).join(this.o.multidateSeparator)
            }, setStartDate: function (t) {
                return this._process_options({startDate: t}), this.update(), this.updateNavArrows(), this
            }, setEndDate: function (t) {
                return this._process_options({endDate: t}), this.update(), this.updateNavArrows(), this
            }, setDaysOfWeekDisabled: function (t) {
                return this._process_options({daysOfWeekDisabled: t}), this.update(), this.updateNavArrows(), this
            }, setDaysOfWeekHighlighted: function (t) {
                return this._process_options({daysOfWeekHighlighted: t}), this.update(), this
            }, setDatesDisabled: function (t) {
                this._process_options({datesDisabled: t}), this.update(), this.updateNavArrows()
            }, place: function () {
                if (this.isInline) return this;
                var e = this.picker.outerWidth(), i = this.picker.outerHeight(), n = 10, r = t(this.o.container),
                    a = r.width(), s = "body" === this.o.container ? t(document).scrollTop() : r.scrollTop(),
                    o = r.offset(), l = [];
                this.element.parents().each(function () {
                    var e = t(this).css("z-index");
                    "auto" !== e && 0 !== e && l.push(parseInt(e))
                });
                var d = Math.max.apply(Math, l) + this.o.zIndexOffset,
                    c = this.component ? this.component.parent().offset() : this.element.offset(),
                    u = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1),
                    h = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1),
                    p = c.left - o.left, f = c.top - o.top;
                "body" !== this.o.container && (f += s), this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"), "auto" !== this.o.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x), "right" === this.o.orientation.x && (p -= e - h)) : c.left < 0 ? (this.picker.addClass("datepicker-orient-left"), p -= c.left - n) : p + e > a ? (this.picker.addClass("datepicker-orient-right"), p += h - e) : this.picker.addClass("datepicker-orient-left");
                var m, g = this.o.orientation.y;
                if ("auto" === g && (m = -s + f - i, g = 0 > m ? "bottom" : "top"), this.picker.addClass("datepicker-orient-" + g), "top" === g ? f -= i + parseInt(this.picker.css("padding-top")) : f += u, this.o.rtl) {
                    var v = a - (p + h);
                    this.picker.css({top: f, right: v, zIndex: d})
                } else this.picker.css({top: f, left: p, zIndex: d});
                return this
            }, _allow_update: !0, update: function () {
                if (!this._allow_update) return this;
                var e = this.dates.copy(), i = [], n = !1;
                return arguments.length ? (t.each(arguments, t.proxy(function (t, e) {
                    e instanceof Date && (e = this._local_to_utc(e)), i.push(e)
                }, this)), n = !0) : (i = this.isInput ? this.element.val() : this.element.data("date") || this.element.find("input").val(), i = i && this.o.multidate ? i.split(this.o.multidateSeparator) : [i], delete this.element.data().date), i = t.map(i, t.proxy(function (t) {
                    return v.parseDate(t, this.o.format, this.o.language)
                }, this)), i = t.grep(i, t.proxy(function (t) {
                    return !this.dateWithinRange(t) || !t
                }, this), !0), this.dates.replace(i), this.dates.length ? this.viewDate = new Date(this.dates.get(-1)) : this.viewDate < this.o.startDate ? this.viewDate = new Date(this.o.startDate) : this.viewDate > this.o.endDate ? this.viewDate = new Date(this.o.endDate) : this.viewDate = this.o.defaultViewDate, n ? this.setValue() : i.length && String(e) !== String(this.dates) && this._trigger("changeDate"), !this.dates.length && e.length && this._trigger("clearDate"), this.fill(), this.element.change(), this
            }, fillDow: function () {
                var t = this.o.weekStart, e = "<tr>";
                for (this.o.calendarWeeks && (this.picker.find(".datepicker-days .datepicker-switch").attr("colspan", function (t, e) {
                    return parseInt(e) + 1
                }), e += '<th class="cw">&#160;</th>'); t < this.o.weekStart + 7;) e += '<th class="dow">' + g[this.o.language].daysMin[t++ % 7] + "</th>";
                e += "</tr>", this.picker.find(".datepicker-days thead").append(e)
            }, fillMonths: function () {
                for (var t = "", e = 0; 12 > e;) t += '<span class="month">' + g[this.o.language].monthsShort[e++] + "</span>";
                this.picker.find(".datepicker-months td").html(t)
            }, setRange: function (e) {
                e && e.length ? this.range = t.map(e, function (t) {
                    return t.valueOf()
                }) : delete this.range, this.fill()
            }, getClassNames: function (e) {
                var i = [], n = this.viewDate.getUTCFullYear(), r = this.viewDate.getUTCMonth(), a = new Date;
                return e.getUTCFullYear() < n || e.getUTCFullYear() === n && e.getUTCMonth() < r ? i.push("old") : (e.getUTCFullYear() > n || e.getUTCFullYear() === n && e.getUTCMonth() > r) && i.push("new"), this.focusDate && e.valueOf() === this.focusDate.valueOf() && i.push("focused"), this.o.todayHighlight && e.getUTCFullYear() === a.getFullYear() && e.getUTCMonth() === a.getMonth() && e.getUTCDate() === a.getDate() && i.push("today"), -1 !== this.dates.contains(e) && i.push("active"), this.dateWithinRange(e) && !this.dateIsDisabled(e) || i.push("disabled"), -1 !== t.inArray(e.getUTCDay(), this.o.daysOfWeekHighlighted) && i.push("highlighted"), this.range && (e > this.range[0] && e < this.range[this.range.length - 1] && i.push("range"), -1 !== t.inArray(e.valueOf(), this.range) && i.push("selected"), e.valueOf() === this.range[0] && i.push("range-start"), e.valueOf() === this.range[this.range.length - 1] && i.push("range-end")), i
            }, fill: function () {
                var n, r = new Date(this.viewDate), a = r.getUTCFullYear(), s = r.getUTCMonth(),
                    o = this.o.startDate !== -(1 / 0) ? this.o.startDate.getUTCFullYear() : -(1 / 0),
                    l = this.o.startDate !== -(1 / 0) ? this.o.startDate.getUTCMonth() : -(1 / 0),
                    d = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0,
                    c = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0,
                    u = g[this.o.language].today || g.en.today || "", h = g[this.o.language].clear || g.en.clear || "",
                    p = g[this.o.language].titleFormat || g.en.titleFormat;
                if (!isNaN(a) && !isNaN(s)) {
                    this.picker.find(".datepicker-days thead .datepicker-switch").text(v.formatDate(new i(a, s), p, this.o.language)), this.picker.find("tfoot .today").text(u).toggle(this.o.todayBtn !== !1),
                        this.picker.find("tfoot .clear").text(h).toggle(this.o.clearBtn !== !1), this.picker.find("thead .datepicker-title").text(this.o.title).toggle("" !== this.o.title), this.updateNavArrows(), this.fillMonths();
                    var f = i(a, s - 1, 28), m = v.getDaysInMonth(f.getUTCFullYear(), f.getUTCMonth());
                    f.setUTCDate(m), f.setUTCDate(m - (f.getUTCDay() - this.o.weekStart + 7) % 7);
                    var b = new Date(f);
                    f.getUTCFullYear() < 100 && b.setUTCFullYear(f.getUTCFullYear()), b.setUTCDate(b.getUTCDate() + 42), b = b.valueOf();
                    for (var y, w = []; f.valueOf() < b;) {
                        if (f.getUTCDay() === this.o.weekStart && (w.push("<tr>"), this.o.calendarWeeks)) {
                            var S = new Date(+f + (this.o.weekStart - f.getUTCDay() - 7) % 7 * 864e5),
                                _ = new Date(Number(S) + (11 - S.getUTCDay()) % 7 * 864e5),
                                x = new Date(Number(x = i(_.getUTCFullYear(), 0, 1)) + (11 - x.getUTCDay()) % 7 * 864e5),
                                D = (_ - x) / 864e5 / 7 + 1;
                            w.push('<td class="cw">' + D + "</td>")
                        }
                        if (y = this.getClassNames(f), y.push("day"), this.o.beforeShowDay !== t.noop) {
                            var T = this.o.beforeShowDay(this._utc_to_local(f));
                            T === e ? T = {} : "boolean" == typeof T ? T = {enabled: T} : "string" == typeof T && (T = {classes: T}), T.enabled === !1 && y.push("disabled"), T.classes && (y = y.concat(T.classes.split(/\s+/))), T.tooltip && (n = T.tooltip)
                        }
                        y = t.unique(y), w.push('<td class="' + y.join(" ") + '"' + (n ? ' title="' + n + '"' : "") + ">" + f.getUTCDate() + "</td>"), n = null, f.getUTCDay() === this.o.weekEnd && w.push("</tr>"), f.setUTCDate(f.getUTCDate() + 1)
                    }
                    this.picker.find(".datepicker-days tbody").empty().append(w.join(""));
                    var C = g[this.o.language].monthsTitle || g.en.monthsTitle || "Months",
                        A = this.picker.find(".datepicker-months").find(".datepicker-switch").text(this.o.maxViewMode < 2 ? C : a).end().find("span").removeClass("active");
                    if (t.each(this.dates, function (t, e) {
                            e.getUTCFullYear() === a && A.eq(e.getUTCMonth()).addClass("active")
                        }), (o > a || a > d) && A.addClass("disabled"), a === o && A.slice(0, l).addClass("disabled"), a === d && A.slice(c + 1).addClass("disabled"), this.o.beforeShowMonth !== t.noop) {
                        var k = this;
                        t.each(A, function (e, i) {
                            if (!t(i).hasClass("disabled")) {
                                var n = new Date(a, e, 1), r = k.o.beforeShowMonth(n);
                                r === !1 && t(i).addClass("disabled")
                            }
                        })
                    }
                    w = "", a = 10 * parseInt(a / 10, 10);
                    var I = this.picker.find(".datepicker-years").find(".datepicker-switch").text(a + "-" + (a + 9)).end().find("td");
                    a -= 1;
                    for (var M, F = t.map(this.dates, function (t) {
                        return t.getUTCFullYear()
                    }), E = -1; 11 > E; E++) {
                        if (M = ["year"], n = null, -1 === E ? M.push("old") : 10 === E && M.push("new"), -1 !== t.inArray(a, F) && M.push("active"), (o > a || a > d) && M.push("disabled"), this.o.beforeShowYear !== t.noop) {
                            var $ = this.o.beforeShowYear(new Date(a, 0, 1));
                            $ === e ? $ = {} : "boolean" == typeof $ ? $ = {enabled: $} : "string" == typeof $ && ($ = {classes: $}), $.enabled === !1 && M.push("disabled"), $.classes && (M = M.concat($.classes.split(/\s+/))), $.tooltip && (n = $.tooltip)
                        }
                        w += '<span class="' + M.join(" ") + '"' + (n ? ' title="' + n + '"' : "") + ">" + a + "</span>", a += 1
                    }
                    I.html(w)
                }
            }, updateNavArrows: function () {
                if (this._allow_update) {
                    var t = new Date(this.viewDate), e = t.getUTCFullYear(), i = t.getUTCMonth();
                    switch (this.viewMode) {
                        case 0:
                            this.o.startDate !== -(1 / 0) && e <= this.o.startDate.getUTCFullYear() && i <= this.o.startDate.getUTCMonth() ? this.picker.find(".prev").css({visibility: "hidden"}) : this.picker.find(".prev").css({visibility: "visible"}), this.o.endDate !== 1 / 0 && e >= this.o.endDate.getUTCFullYear() && i >= this.o.endDate.getUTCMonth() ? this.picker.find(".next").css({visibility: "hidden"}) : this.picker.find(".next").css({visibility: "visible"});
                            break;
                        case 1:
                        case 2:
                            this.o.startDate !== -(1 / 0) && e <= this.o.startDate.getUTCFullYear() || this.o.maxViewMode < 2 ? this.picker.find(".prev").css({visibility: "hidden"}) : this.picker.find(".prev").css({visibility: "visible"}), this.o.endDate !== 1 / 0 && e >= this.o.endDate.getUTCFullYear() || this.o.maxViewMode < 2 ? this.picker.find(".next").css({visibility: "hidden"}) : this.picker.find(".next").css({visibility: "visible"})
                    }
                }
            }, click: function (e) {
                e.preventDefault(), e.stopPropagation();
                var r, a, s, o = t(e.target).closest("span, td, th");
                if (1 === o.length) switch (o[0].nodeName.toLowerCase()) {
                    case"th":
                        switch (o[0].className) {
                            case"datepicker-switch":
                                this.showMode(1);
                                break;
                            case"prev":
                            case"next":
                                var l = v.modes[this.viewMode].navStep * ("prev" === o[0].className ? -1 : 1);
                                switch (this.viewMode) {
                                    case 0:
                                        this.viewDate = this.moveMonth(this.viewDate, l), this._trigger("changeMonth", this.viewDate);
                                        break;
                                    case 1:
                                    case 2:
                                        this.viewDate = this.moveYear(this.viewDate, l), 1 === this.viewMode && this._trigger("changeYear", this.viewDate)
                                }
                                this.fill();
                                break;
                            case"today":
                                this.showMode(-2);
                                var d = "linked" === this.o.todayBtn ? null : "view";
                                this._setDate(n(), d);
                                break;
                            case"clear":
                                this.clearDates()
                        }
                        break;
                    case"span":
                        o.hasClass("disabled") || (this.viewDate.setUTCDate(1), o.hasClass("month") ? (s = 1, a = o.parent().find("span").index(o), r = this.viewDate.getUTCFullYear(), this.viewDate.setUTCMonth(a), this._trigger("changeMonth", this.viewDate), 1 === this.o.minViewMode ? (this._setDate(i(r, a, s)), this.showMode()) : this.showMode(-1)) : (s = 1, a = 0, r = parseInt(o.text(), 10) || 0, this.viewDate.setUTCFullYear(r), this._trigger("changeYear", this.viewDate), 2 === this.o.minViewMode && this._setDate(i(r, a, s)), this.showMode(-1)), this.fill());
                        break;
                    case"td":
                        o.hasClass("day") && !o.hasClass("disabled") && (s = parseInt(o.text(), 10) || 1, r = this.viewDate.getUTCFullYear(), a = this.viewDate.getUTCMonth(), o.hasClass("old") ? 0 === a ? (a = 11, r -= 1) : a -= 1 : o.hasClass("new") && (11 === a ? (a = 0, r += 1) : a += 1), this._setDate(i(r, a, s)))
                }
                this.picker.is(":visible") && this._focused_from && t(this._focused_from).focus(), delete this._focused_from
            }, _toggle_multidate: function (t) {
                var e = this.dates.contains(t);
                if (t || this.dates.clear(), -1 !== e ? (this.o.multidate === !0 || this.o.multidate > 1 || this.o.toggleActive) && this.dates.remove(e) : this.o.multidate === !1 ? (this.dates.clear(), this.dates.push(t)) : this.dates.push(t), "number" == typeof this.o.multidate) for (; this.dates.length > this.o.multidate;) this.dates.remove(0)
            }, _setDate: function (t, e) {
                e && "date" !== e || this._toggle_multidate(t && new Date(t)), e && "view" !== e || (this.viewDate = t && new Date(t)), this.fill(), this.setValue(), e && "view" === e || this._trigger("changeDate");
                var i;
                this.isInput ? i = this.element : this.component && (i = this.element.find("input")), i && i.change(), !this.o.autoclose || e && "date" !== e || this.hide()
            }, moveDay: function (t, e) {
                var i = new Date(t);
                return i.setUTCDate(t.getUTCDate() + e), i
            }, moveWeek: function (t, e) {
                return this.moveDay(t, 7 * e)
            }, moveMonth: function (t, e) {
                if (!s(t)) return this.o.defaultViewDate;
                if (!e) return t;
                var i, n, r = new Date(t.valueOf()), a = r.getUTCDate(), o = r.getUTCMonth(), l = Math.abs(e);
                if (e = e > 0 ? 1 : -1, 1 === l) n = -1 === e ? function () {
                    return r.getUTCMonth() === o
                } : function () {
                    return r.getUTCMonth() !== i
                }, i = o + e, r.setUTCMonth(i), (0 > i || i > 11) && (i = (i + 12) % 12); else {
                    for (var d = 0; l > d; d++) r = this.moveMonth(r, e);
                    i = r.getUTCMonth(), r.setUTCDate(a), n = function () {
                        return i !== r.getUTCMonth()
                    }
                }
                for (; n();) r.setUTCDate(--a), r.setUTCMonth(i);
                return r
            }, moveYear: function (t, e) {
                return this.moveMonth(t, 12 * e)
            }, moveAvailableDate: function (t, e, i) {
                do {
                    if (t = this[i](t, e), !this.dateWithinRange(t)) return !1;
                    i = "moveDay"
                } while (this.dateIsDisabled(t));
                return t
            }, weekOfDateIsDisabled: function (e) {
                return -1 !== t.inArray(e.getUTCDay(), this.o.daysOfWeekDisabled)
            }, dateIsDisabled: function (e) {
                return this.weekOfDateIsDisabled(e) || t.grep(this.o.datesDisabled, function (t) {
                    return r(e, t)
                }).length > 0
            }, dateWithinRange: function (t) {
                return t >= this.o.startDate && t <= this.o.endDate
            }, keydown: function (t) {
                if (!this.picker.is(":visible")) return void(40 !== t.keyCode && 27 !== t.keyCode || (this.show(), t.stopPropagation()));
                var e, i, n = !1, r = this.focusDate || this.viewDate;
                switch (t.keyCode) {
                    case 27:
                        this.focusDate ? (this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill()) : this.hide(), t.preventDefault(), t.stopPropagation();
                        break;
                    case 37:
                    case 38:
                    case 39:
                    case 40:
                        if (!this.o.keyboardNavigation || 7 === this.o.daysOfWeekDisabled.length) break;
                        e = 37 === t.keyCode || 38 === t.keyCode ? -1 : 1, t.ctrlKey ? (i = this.moveAvailableDate(r, e, "moveYear"), i && this._trigger("changeYear", this.viewDate)) : t.shiftKey ? (i = this.moveAvailableDate(r, e, "moveMonth"), i && this._trigger("changeMonth", this.viewDate)) : 37 === t.keyCode || 39 === t.keyCode ? i = this.moveAvailableDate(r, e, "moveDay") : this.weekOfDateIsDisabled(r) || (i = this.moveAvailableDate(r, e, "moveWeek")), i && (this.focusDate = this.viewDate = i, this.setValue(), this.fill(), t.preventDefault());
                        break;
                    case 13:
                        if (!this.o.forceParse) break;
                        r = this.focusDate || this.dates.get(-1) || this.viewDate, this.o.keyboardNavigation && (this._toggle_multidate(r), n = !0), this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.setValue(), this.fill(), this.picker.is(":visible") && (t.preventDefault(), t.stopPropagation(), this.o.autoclose && this.hide());
                        break;
                    case 9:
                        this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill(), this.hide()
                }
                if (n) {
                    this.dates.length ? this._trigger("changeDate") : this._trigger("clearDate");
                    var a;
                    this.isInput ? a = this.element : this.component && (a = this.element.find("input")), a && a.change()
                }
            }, showMode: function (t) {
                t && (this.viewMode = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, this.viewMode + t))), this.picker.children("div").hide().filter(".datepicker-" + v.modes[this.viewMode].clsName).show(), this.updateNavArrows()
            }
        };
        var u = function (e, i) {
            t(e).data("datepicker", this), this.element = t(e), this.inputs = t.map(i.inputs, function (t) {
                return t.jquery ? t[0] : t
            }), delete i.inputs, p.call(t(this.inputs), i).on("changeDate", t.proxy(this.dateUpdated, this)), this.pickers = t.map(this.inputs, function (e) {
                return t(e).data("datepicker")
            }), this.updateDates()
        };
        u.prototype = {
            updateDates: function () {
                this.dates = t.map(this.pickers, function (t) {
                    return t.getUTCDate()
                }), this.updateRanges()
            }, updateRanges: function () {
                var e = t.map(this.dates, function (t) {
                    return t.valueOf()
                });
                t.each(this.pickers, function (t, i) {
                    i.setRange(e)
                })
            }, dateUpdated: function (e) {
                if (!this.updating) {
                    this.updating = !0;
                    var i = t(e.target).data("datepicker");
                    if ("undefined" != typeof i) {
                        var n = i.getUTCDate(), r = t.inArray(e.target, this.inputs), a = r - 1, s = r + 1,
                            o = this.inputs.length;
                        if (-1 !== r) {
                            if (t.each(this.pickers, function (t, e) {
                                    e.getUTCDate() || e.setUTCDate(n)
                                }), n < this.dates[a]) for (; a >= 0 && n < this.dates[a];) this.pickers[a--].setUTCDate(n); else if (n > this.dates[s]) for (; o > s && n > this.dates[s];) this.pickers[s++].setUTCDate(n);
                            this.updateDates(), delete this.updating
                        }
                    }
                }
            }, remove: function () {
                t.map(this.pickers, function (t) {
                    t.remove()
                }), delete this.element.data().datepicker
            }
        };
        var h = t.fn.datepicker, p = function (i) {
            var n = Array.apply(null, arguments);
            n.shift();
            var r;
            if (this.each(function () {
                    var e = t(this), a = e.data("datepicker"), s = "object" == typeof i && i;
                    if (!a) {
                        var d = o(this, "date"), h = t.extend({}, f, d, s), p = l(h.language),
                            m = t.extend({}, f, p, d, s);
                        e.hasClass("input-daterange") || m.inputs ? (t.extend(m, {inputs: m.inputs || e.find("input").toArray()}), a = new u(this, m)) : a = new c(this, m), e.data("datepicker", a)
                    }
                    "string" == typeof i && "function" == typeof a[i] && (r = a[i].apply(a, n))
                }), r === e || r instanceof c || r instanceof u) return this;
            if (this.length > 1) throw new Error("Using only allowed for the collection of a single element (" + i + " function)");
            return r
        };
        t.fn.datepicker = p;
        var f = t.fn.datepicker.defaults = {
            autoclose: !1,
            beforeShowDay: t.noop,
            beforeShowMonth: t.noop,
            beforeShowYear: t.noop,
            calendarWeeks: !1,
            clearBtn: !1,
            toggleActive: !1,
            daysOfWeekDisabled: [],
            daysOfWeekHighlighted: [],
            datesDisabled: [],
            endDate: 1 / 0,
            forceParse: !0,
            format: "mm/dd/yyyy",
            keyboardNavigation: !0,
            language: "en",
            minViewMode: 0,
            maxViewMode: 2,
            multidate: !1,
            multidateSeparator: ",",
            orientation: "auto",
            rtl: !1,
            startDate: -(1 / 0),
            startView: 0,
            todayBtn: !1,
            todayHighlight: !1,
            weekStart: 0,
            disableTouchKeyboard: !1,
            enableOnReadonly: !0,
            showOnFocus: !0,
            zIndexOffset: 10,
            container: "body",
            immediateUpdates: !1,
            title: ""
        }, m = t.fn.datepicker.locale_opts = ["format", "rtl", "weekStart"];
        t.fn.datepicker.Constructor = c;
        var g = t.fn.datepicker.dates = {
            en: {
                days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                today: "Today",
                clear: "Clear",
                titleFormat: "MM yyyy"
            }
        }, v = {
            modes: [{clsName: "days", navFnc: "Month", navStep: 1}, {
                clsName: "months",
                navFnc: "FullYear",
                navStep: 1
            }, {clsName: "years", navFnc: "FullYear", navStep: 10}],
            isLeapYear: function (t) {
                return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0
            },
            getDaysInMonth: function (t, e) {
                return [31, v.isLeapYear(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e]
            },
            validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
            nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
            parseFormat: function (t) {
                if ("function" == typeof t.toValue && "function" == typeof t.toDisplay) return t;
                var e = t.replace(this.validParts, "\x00").split("\x00"), i = t.match(this.validParts);
                if (!e || !e.length || !i || 0 === i.length) throw new Error("Invalid date format.");
                return {separators: e, parts: i}
            },
            parseDate: function (r, a, s) {
                function o() {
                    var t = this.slice(0, f[u].length), e = f[u].slice(0, t.length);
                    return t.toLowerCase() === e.toLowerCase()
                }

                if (!r) return e;
                if (r instanceof Date) return r;
                if ("string" == typeof a && (a = v.parseFormat(a)), a.toValue) return a.toValue(r, a, s);
                var l, d, u, h, p = /([\-+]\d+)([dmwy])/, f = r.match(/([\-+]\d+)([dmwy])/g),
                    m = {d: "moveDay", m: "moveMonth", w: "moveWeek", y: "moveYear"};
                if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(r)) {
                    for (r = new Date, u = 0; u < f.length; u++) l = p.exec(f[u]), d = parseInt(l[1]), h = m[l[2]], r = c.prototype[h](r, d);
                    return i(r.getUTCFullYear(), r.getUTCMonth(), r.getUTCDate())
                }
                f = r && r.match(this.nonpunctuation) || [], r = new Date;
                var b, y, w = {}, S = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"], _ = {
                    yyyy: function (t, e) {
                        return t.setUTCFullYear(e)
                    }, yy: function (t, e) {
                        return t.setUTCFullYear(2e3 + e)
                    }, m: function (t, e) {
                        if (isNaN(t)) return t;
                        for (e -= 1; 0 > e;) e += 12;
                        for (e %= 12, t.setUTCMonth(e); t.getUTCMonth() !== e;) t.setUTCDate(t.getUTCDate() - 1);
                        return t
                    }, d: function (t, e) {
                        return t.setUTCDate(e)
                    }
                };
                _.M = _.MM = _.mm = _.m, _.dd = _.d, r = n();
                var x = a.parts.slice();
                if (f.length !== x.length && (x = t(x).filter(function (e, i) {
                        return -1 !== t.inArray(i, S)
                    }).toArray()), f.length === x.length) {
                    var D;
                    for (u = 0, D = x.length; D > u; u++) {
                        if (b = parseInt(f[u], 10), l = x[u], isNaN(b)) switch (l) {
                            case"MM":
                                y = t(g[s].months).filter(o), b = t.inArray(y[0], g[s].months) + 1;
                                break;
                            case"M":
                                y = t(g[s].monthsShort).filter(o), b = t.inArray(y[0], g[s].monthsShort) + 1
                        }
                        w[l] = b
                    }
                    var T, C;
                    for (u = 0; u < S.length; u++) C = S[u], C in w && !isNaN(w[C]) && (T = new Date(r), _[C](T, w[C]), isNaN(T) || (r = T))
                }
                return r
            },
            formatDate: function (e, i, n) {
                if (!e) return "";
                if ("string" == typeof i && (i = v.parseFormat(i)), i.toDisplay) return i.toDisplay(e, i, n);
                var r = {
                    d: e.getUTCDate(),
                    D: g[n].daysShort[e.getUTCDay()],
                    DD: g[n].days[e.getUTCDay()],
                    m: e.getUTCMonth() + 1,
                    M: g[n].monthsShort[e.getUTCMonth()],
                    MM: g[n].months[e.getUTCMonth()],
                    yy: e.getUTCFullYear().toString().substring(2),
                    yyyy: e.getUTCFullYear()
                };
                r.dd = (r.d < 10 ? "0" : "") + r.d, r.mm = (r.m < 10 ? "0" : "") + r.m, e = [];
                for (var a = t.extend([], i.separators), s = 0, o = i.parts.length; o >= s; s++) a.length && e.push(a.shift()), e.push(r[i.parts[s]]);
                return e.join("")
            },
            headTemplate: '<thead><tr><th colspan="7" class="datepicker-title"></th></tr><tr><th class="prev">&#171;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&#187;</th></tr></thead>',
            contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
            footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
        };
        v.template = '<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">' + v.headTemplate + "<tbody></tbody>" + v.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + v.headTemplate + v.contTemplate + v.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + v.headTemplate + v.contTemplate + v.footTemplate + "</table></div></div>", t.fn.datepicker.DPGlobal = v, t.fn.datepicker.noConflict = function () {
            return t.fn.datepicker = h, this
        }, t.fn.datepicker.version = "1.5.1", t(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function (e) {
            var i = t(this);
            i.data("datepicker") || (e.preventDefault(), p.call(i, "show"))
        }), t(function () {
            p.call(t('[data-provide="datepicker-inline"]'))
        })
    }), function (t) {
        if ("function" == typeof define && define.amd) define(t); else if ("object" == typeof exports) module.exports = t(); else {
            var e = window.Cookies, i = window.Cookies = t();
            i.noConflict = function () {
                return window.Cookies = e, i
            }
        }
    }(function () {
        function t() {
            for (var t = 0, e = {}; t < arguments.length; t++) {
                var i = arguments[t];
                for (var n in i) e[n] = i[n]
            }
            return e
        }

        function e(i) {
            function n(e, r, a) {
                var s;
                if (arguments.length > 1) {
                    if (a = t({path: "/"}, n.defaults, a), "number" == typeof a.expires) {
                        var o = new Date;
                        o.setMilliseconds(o.getMilliseconds() + 864e5 * a.expires), a.expires = o
                    }
                    try {
                        s = JSON.stringify(r), /^[\{\[]/.test(s) && (r = s)
                    } catch (l) {
                    }
                    return r = encodeURIComponent(String(r)), r = r.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), e = encodeURIComponent(String(e)), e = e.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent), e = e.replace(/[\(\)]/g, escape), document.cookie = [e, "=", r, a.expires && "; expires=" + a.expires.toUTCString(), a.path && "; path=" + a.path, a.domain && "; domain=" + a.domain, a.secure ? "; secure" : ""].join("")
                }
                e || (s = {});
                for (var d = document.cookie ? document.cookie.split("; ") : [], c = /(%[0-9A-Z]{2})+/g, u = 0; u < d.length; u++) {
                    var h = d[u].split("="), p = h[0].replace(c, decodeURIComponent), f = h.slice(1).join("=");
                    '"' === f.charAt(0) && (f = f.slice(1, -1));
                    try {
                        if (f = i && i(f, p) || f.replace(c, decodeURIComponent), this.json) try {
                            f = JSON.parse(f)
                        } catch (l) {
                        }
                        if (e === p) {
                            s = f;
                            break
                        }
                        e || (s[p] = f)
                    } catch (l) {
                    }
                }
                return s
            }

            return n.get = n.set = n, n.getJSON = function () {
                return n.apply({json: !0}, [].slice.call(arguments))
            }, n.defaults = {}, n.remove = function (e, i) {
                n(e, "", t(i, {expires: -1}))
            }, n.withConverter = e, n
        }

        return e()
    }), function (t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], function (e) {
            return t(e, window, document)
        }) : "object" == typeof exports ? module.exports = function (e, i) {
            return e || (e = window), i || (i = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), t(i, e, e.document)
        } : t(jQuery, window, document)
    }(function (t, e, i, n) {
        "use strict";

        function r(e) {
            var i, n, a = "a aa ai ao as b fn i m o s ", s = {};
            t.each(e, function (t, o) {
                i = t.match(/^([^A-Z]+?)([A-Z])/), i && -1 !== a.indexOf(i[1] + " ") && (n = t.replace(i[0], i[2].toLowerCase()), s[n] = t, "o" === i[1] && r(e[t]))
            }), e._hungarianMap = s
        }

        function a(e, i, s) {
            e._hungarianMap || r(e);
            var o;
            t.each(i, function (r, l) {
                o = e._hungarianMap[r], o === n || !s && i[o] !== n || ("o" === o.charAt(0) ? (i[o] || (i[o] = {}), t.extend(!0, i[o], i[r]), a(e[o], i[o], s)) : i[o] = i[r])
            })
        }

        function s(t) {
            var e = zt.defaults.oLanguage, i = t.sZeroRecords;
            !t.sEmptyTable && i && "No data available in table" === e.sEmptyTable && Ot(t, t, "sZeroRecords", "sEmptyTable"), !t.sLoadingRecords && i && "Loading..." === e.sLoadingRecords && Ot(t, t, "sZeroRecords", "sLoadingRecords"), t.sInfoThousands && (t.sThousands = t.sInfoThousands);
            var n = t.sDecimal;
            n && Wt(n)
        }

        function o(t) {
            ge(t, "ordering", "bSort"), ge(t, "orderMulti", "bSortMulti"), ge(t, "orderClasses", "bSortClasses"), ge(t, "orderCellsTop", "bSortCellsTop"), ge(t, "order", "aaSorting"), ge(t, "orderFixed", "aaSortingFixed"), ge(t, "paging", "bPaginate"), ge(t, "pagingType", "sPaginationType"), ge(t, "pageLength", "iDisplayLength"), ge(t, "searching", "bFilter"), "boolean" == typeof t.sScrollX && (t.sScrollX = t.sScrollX ? "100%" : ""), "boolean" == typeof t.scrollX && (t.scrollX = t.scrollX ? "100%" : "");
            var e = t.aoSearchCols;
            if (e) for (var i = 0, n = e.length; n > i; i++) e[i] && a(zt.models.oSearch, e[i])
        }

        function l(e) {
            ge(e, "orderable", "bSortable"), ge(e, "orderData", "aDataSort"), ge(e, "orderSequence", "asSorting"), ge(e, "orderDataType", "sortDataType");
            var i = e.aDataSort;
            i && !t.isArray(i) && (e.aDataSort = [i])
        }

        function d(e) {
            if (!zt.__browser) {
                var i = {};
                zt.__browser = i;
                var n = t("<div/>").css({
                        position: "fixed",
                        top: 0,
                        left: 0,
                        height: 1,
                        width: 1,
                        overflow: "hidden"
                    }).append(t("<div/>").css({
                        position: "absolute",
                        top: 1,
                        left: 1,
                        width: 100,
                        overflow: "scroll"
                    }).append(t("<div/>").css({width: "100%", height: 10}))).appendTo("body"), r = n.children(),
                    a = r.children();
                i.barWidth = r[0].offsetWidth - r[0].clientWidth, i.bScrollOversize = 100 === a[0].offsetWidth && 100 !== r[0].clientWidth, i.bScrollbarLeft = 1 !== Math.round(a.offset().left), i.bBounding = !!n[0].getBoundingClientRect().width, n.remove()
            }
            t.extend(e.oBrowser, zt.__browser), e.oScroll.iBarWidth = zt.__browser.barWidth
        }

        function c(t, e, i, r, a, s) {
            var o, l = r, d = !1;
            for (i !== n && (o = i, d = !0); l !== a;) t.hasOwnProperty(l) && (o = d ? e(o, t[l], l, t) : t[l], d = !0, l += s);
            return o
        }

        function u(e, n) {
            var r = zt.defaults.column, a = e.aoColumns.length, s = t.extend({}, zt.models.oColumn, r, {
                nTh: n ? n : i.createElement("th"),
                sTitle: r.sTitle ? r.sTitle : n ? n.innerHTML : "",
                aDataSort: r.aDataSort ? r.aDataSort : [a],
                mData: r.mData ? r.mData : a,
                idx: a
            });
            e.aoColumns.push(s);
            var o = e.aoPreSearchCols;
            o[a] = t.extend({}, zt.models.oSearch, o[a]), h(e, a, t(n).data())
        }

        function h(e, i, r) {
            var s = e.aoColumns[i], o = e.oClasses, d = t(s.nTh);
            if (!s.sWidthOrig) {
                s.sWidthOrig = d.attr("width") || null;
                var c = (d.attr("style") || "").match(/width:\s*(\d+[pxem%]+)/);
                c && (s.sWidthOrig = c[1])
            }
            r !== n && null !== r && (l(r), a(zt.defaults.column, r), r.mDataProp === n || r.mData || (r.mData = r.mDataProp), r.sType && (s._sManualType = r.sType), r.className && !r.sClass && (r.sClass = r.className), t.extend(s, r), Ot(s, r, "sWidth", "sWidthOrig"), r.iDataSort !== n && (s.aDataSort = [r.iDataSort]), Ot(s, r, "aDataSort"));
            var u = s.mData, h = A(u), p = s.mRender ? A(s.mRender) : null, f = function (t) {
                return "string" == typeof t && -1 !== t.indexOf("@")
            };
            s._bAttrSrc = t.isPlainObject(u) && (f(u.sort) || f(u.type) || f(u.filter)), s.fnGetData = function (t, e, i) {
                var r = h(t, e, n, i);
                return p && e ? p(r, e, t, i) : r
            }, s.fnSetData = function (t, e, i) {
                return k(u)(t, e, i)
            }, "number" != typeof u && (e._rowReadObject = !0), e.oFeatures.bSort || (s.bSortable = !1, d.addClass(o.sSortableNone));
            var m = -1 !== t.inArray("asc", s.asSorting), g = -1 !== t.inArray("desc", s.asSorting);
            s.bSortable && (m || g) ? m && !g ? (s.sSortingClass = o.sSortableAsc, s.sSortingClassJUI = o.sSortJUIAscAllowed) : !m && g ? (s.sSortingClass = o.sSortableDesc, s.sSortingClassJUI = o.sSortJUIDescAllowed) : (s.sSortingClass = o.sSortable, s.sSortingClassJUI = o.sSortJUI) : (s.sSortingClass = o.sSortableNone, s.sSortingClassJUI = "")
        }

        function p(t) {
            if (t.oFeatures.bAutoWidth !== !1) {
                var e = t.aoColumns;
                bt(t);
                for (var i = 0, n = e.length; n > i; i++) e[i].nTh.style.width = e[i].sWidth
            }
            var r = t.oScroll;
            "" === r.sY && "" === r.sX || gt(t), Rt(t, null, "column-sizing", [t])
        }

        function f(t, e) {
            var i = v(t, "bVisible");
            return "number" == typeof i[e] ? i[e] : null
        }

        function m(e, i) {
            var n = v(e, "bVisible"), r = t.inArray(i, n);
            return -1 !== r ? r : null
        }

        function g(t) {
            return v(t, "bVisible").length
        }

        function v(e, i) {
            var n = [];
            return t.map(e.aoColumns, function (t, e) {
                t[i] && n.push(e)
            }), n
        }

        function b(t) {
            var e, i, r, a, s, o, l, d, c, u = t.aoColumns, h = t.aoData, p = zt.ext.type.detect;
            for (e = 0, i = u.length; i > e; e++) if (l = u[e], c = [], !l.sType && l._sManualType) l.sType = l._sManualType; else if (!l.sType) {
                for (r = 0, a = p.length; a > r; r++) {
                    for (s = 0, o = h.length; o > s && (c[s] === n && (c[s] = D(t, s, e, "type")), d = p[r](c[s], t), d || r === p.length - 1) && "html" !== d; s++) ;
                    if (d) {
                        l.sType = d;
                        break
                    }
                }
                l.sType || (l.sType = "string")
            }
        }

        function y(e, i, r, a) {
            var s, o, l, d, c, h, p, f = e.aoColumns;
            if (i) for (s = i.length - 1; s >= 0; s--) {
                p = i[s];
                var m = p.targets !== n ? p.targets : p.aTargets;
                for (t.isArray(m) || (m = [m]), l = 0, d = m.length; d > l; l++) if ("number" == typeof m[l] && m[l] >= 0) {
                    for (; f.length <= m[l];) u(e);
                    a(m[l], p)
                } else if ("number" == typeof m[l] && m[l] < 0) a(f.length + m[l], p); else if ("string" == typeof m[l]) for (c = 0, h = f.length; h > c; c++) ("_all" == m[l] || t(f[c].nTh).hasClass(m[l])) && a(c, p)
            }
            if (r) for (s = 0, o = r.length; o > s; s++) a(s, r[s])
        }

        function w(e, i, r, a) {
            var s = e.aoData.length, o = t.extend(!0, {}, zt.models.oRow, {src: r ? "dom" : "data", idx: s});
            o._aData = i, e.aoData.push(o);
            for (var l = e.aoColumns, d = 0, c = l.length; c > d; d++) l[d].sType = null;
            e.aiDisplayMaster.push(s);
            var u = e.rowIdFn(i);
            return u !== n && (e.aIds[u] = o), !r && e.oFeatures.bDeferRender || L(e, s, r, a), s
        }

        function S(e, i) {
            var n;
            return i instanceof t || (i = t(i)), i.map(function (t, i) {
                return n = $(e, i), w(e, n.data, i, n.cells)
            })
        }

        function _(t, e) {
            return e._DT_RowIndex !== n ? e._DT_RowIndex : null
        }

        function x(e, i, n) {
            return t.inArray(n, e.aoData[i].anCells)
        }

        function D(t, e, i, r) {
            var a = t.iDraw, s = t.aoColumns[i], o = t.aoData[e]._aData, l = s.sDefaultContent,
                d = s.fnGetData(o, r, {settings: t, row: e, col: i});
            if (d === n) return t.iDrawError != a && null === l && (Lt(t, 0, "Requested unknown parameter " + ("function" == typeof s.mData ? "{function}" : "'" + s.mData + "'") + " for row " + e + ", column " + i, 4), t.iDrawError = a), l;
            if (d !== o && null !== d || null === l) {
                if ("function" == typeof d) return d.call(o)
            } else d = l;
            return null === d && "display" == r ? "" : d
        }

        function T(t, e, i, n) {
            var r = t.aoColumns[i], a = t.aoData[e]._aData;
            r.fnSetData(a, n, {settings: t, row: e, col: i})
        }

        function C(e) {
            return t.map(e.match(/(\\.|[^\.])+/g) || [""], function (t) {
                return t.replace(/\\./g, ".")
            })
        }

        function A(e) {
            if (t.isPlainObject(e)) {
                var i = {};
                return t.each(e, function (t, e) {
                    e && (i[t] = A(e))
                }), function (t, e, r, a) {
                    var s = i[e] || i._;
                    return s !== n ? s(t, e, r, a) : t
                }
            }
            if (null === e) return function (t) {
                return t
            };
            if ("function" == typeof e) return function (t, i, n, r) {
                return e(t, i, n, r)
            };
            if ("string" != typeof e || -1 === e.indexOf(".") && -1 === e.indexOf("[") && -1 === e.indexOf("(")) return function (t, i) {
                return t[e]
            };
            var r = function (e, i, a) {
                var s, o, l, d;
                if ("" !== a) for (var c = C(a), u = 0, h = c.length; h > u; u++) {
                    if (s = c[u].match(ve), o = c[u].match(be), s) {
                        if (c[u] = c[u].replace(ve, ""), "" !== c[u] && (e = e[c[u]]), l = [], c.splice(0, u + 1), d = c.join("."), t.isArray(e)) for (var p = 0, f = e.length; f > p; p++) l.push(r(e[p], i, d));
                        var m = s[0].substring(1, s[0].length - 1);
                        e = "" === m ? l : l.join(m);
                        break
                    }
                    if (o) c[u] = c[u].replace(be, ""), e = e[c[u]](); else {
                        if (null === e || e[c[u]] === n) return n;
                        e = e[c[u]]
                    }
                }
                return e
            };
            return function (t, i) {
                return r(t, i, e)
            }
        }

        function k(e) {
            if (t.isPlainObject(e)) return k(e._);
            if (null === e) return function () {
            };
            if ("function" == typeof e) return function (t, i, n) {
                e(t, "set", i, n)
            };
            if ("string" != typeof e || -1 === e.indexOf(".") && -1 === e.indexOf("[") && -1 === e.indexOf("(")) return function (t, i) {
                t[e] = i
            };
            var i = function (e, r, a) {
                for (var s, o, l, d, c, u = C(a), h = u[u.length - 1], p = 0, f = u.length - 1; f > p; p++) {
                    if (o = u[p].match(ve), l = u[p].match(be), o) {
                        if (u[p] = u[p].replace(ve, ""), e[u[p]] = [], s = u.slice(), s.splice(0, p + 1), c = s.join("."), t.isArray(r)) for (var m = 0, g = r.length; g > m; m++) d = {}, i(d, r[m], c), e[u[p]].push(d); else e[u[p]] = r;
                        return
                    }
                    l && (u[p] = u[p].replace(be, ""), e = e[u[p]](r)), null !== e[u[p]] && e[u[p]] !== n || (e[u[p]] = {}), e = e[u[p]]
                }
                h.match(be) ? e = e[h.replace(be, "")](r) : e[h.replace(ve, "")] = r
            };
            return function (t, n) {
                return i(t, n, e)
            }
        }

        function I(t) {
            return ce(t.aoData, "_aData")
        }

        function M(t) {
            t.aoData.length = 0, t.aiDisplayMaster.length = 0, t.aiDisplay.length = 0, t.aIds = {}
        }

        function F(t, e, i) {
            for (var r = -1, a = 0, s = t.length; s > a; a++) t[a] == e ? r = a : t[a] > e && t[a]--;
            -1 != r && i === n && t.splice(r, 1)
        }

        function E(t, e, i, r) {
            var a, s, o = t.aoData[e], l = function (i, n) {
                for (; i.childNodes.length;) i.removeChild(i.firstChild);
                i.innerHTML = D(t, e, n, "display")
            };
            if ("dom" !== i && (i && "auto" !== i || "dom" !== o.src)) {
                var d = o.anCells;
                if (d) if (r !== n) l(d[r], r); else for (a = 0, s = d.length; s > a; a++) l(d[a], a)
            } else o._aData = $(t, o, r, r === n ? n : o._aData).data;
            o._aSortData = null, o._aFilterData = null;
            var c = t.aoColumns;
            if (r !== n) c[r].sType = null; else {
                for (a = 0, s = c.length; s > a; a++) c[a].sType = null;
                O(t, o)
            }
        }

        function $(e, i, r, a) {
            var s, o, l, d = [], c = i.firstChild, u = 0, h = e.aoColumns, p = e._rowReadObject;
            a = a !== n ? a : p ? {} : [];
            var f = function (t, e) {
                if ("string" == typeof t) {
                    var i = t.indexOf("@");
                    if (-1 !== i) {
                        var n = t.substring(i + 1), r = k(t);
                        r(a, e.getAttribute(n))
                    }
                }
            }, m = function (e) {
                if (r === n || r === u) if (o = h[u], l = t.trim(e.innerHTML), o && o._bAttrSrc) {
                    var i = k(o.mData._);
                    i(a, l), f(o.mData.sort, e), f(o.mData.type, e), f(o.mData.filter, e)
                } else p ? (o._setter || (o._setter = k(o.mData)), o._setter(a, l)) : a[u] = l;
                u++
            };
            if (c) for (; c;) s = c.nodeName.toUpperCase(), "TD" != s && "TH" != s || (m(c), d.push(c)), c = c.nextSibling; else {
                d = i.anCells;
                for (var g = 0, v = d.length; v > g; g++) m(d[g])
            }
            var b = i.firstChild ? i : i.nTr;
            if (b) {
                var y = b.getAttribute("id");
                y && k(e.rowId)(a, y)
            }
            return {data: a, cells: d}
        }

        function L(t, e, n, r) {
            var a, s, o, l, d, c = t.aoData[e], u = c._aData, h = [];
            if (null === c.nTr) {
                for (a = n || i.createElement("tr"), c.nTr = a, c.anCells = h, a._DT_RowIndex = e, O(t, c), l = 0, d = t.aoColumns.length; d > l; l++) o = t.aoColumns[l], s = n ? r[l] : i.createElement(o.sCellType), s._DT_CellIndex = {
                    row: e,
                    column: l
                }, h.push(s), n && !o.mRender && o.mData === l || (s.innerHTML = D(t, e, l, "display")), o.sClass && (s.className += " " + o.sClass), o.bVisible && !n ? a.appendChild(s) : !o.bVisible && n && s.parentNode.removeChild(s), o.fnCreatedCell && o.fnCreatedCell.call(t.oInstance, s, D(t, e, l), u, e, l);
                Rt(t, "aoRowCreatedCallback", null, [a, u, e])
            }
            c.nTr.setAttribute("role", "row")
        }

        function O(e, i) {
            var n = i.nTr, r = i._aData;
            if (n) {
                var a = e.rowIdFn(r);
                if (a && (n.id = a), r.DT_RowClass) {
                    var s = r.DT_RowClass.split(" ");
                    i.__rowc = i.__rowc ? me(i.__rowc.concat(s)) : s, t(n).removeClass(i.__rowc.join(" ")).addClass(r.DT_RowClass)
                }
                r.DT_RowAttr && t(n).attr(r.DT_RowAttr), r.DT_RowData && t(n).data(r.DT_RowData)
            }
        }

        function V(e) {
            var i, n, r, a, s, o = e.nTHead, l = e.nTFoot, d = 0 === t("th, td", o).length, c = e.oClasses,
                u = e.aoColumns;
            for (d && (a = t("<tr/>").appendTo(o)), i = 0, n = u.length; n > i; i++) s = u[i], r = t(s.nTh).addClass(s.sClass), d && r.appendTo(a), e.oFeatures.bSort && (r.addClass(s.sSortingClass), s.bSortable !== !1 && (r.attr("tabindex", e.iTabIndex).attr("aria-controls", e.sTableId), kt(e, s.nTh, i))), s.sTitle != r[0].innerHTML && r.html(s.sTitle), Ut(e, "header")(e, r, s, c);
            if (d && U(e.aoHeader, o), t(o).find(">tr").attr("role", "row"), t(o).find(">tr>th, >tr>td").addClass(c.sHeaderTH), t(l).find(">tr>th, >tr>td").addClass(c.sFooterTH), null !== l) {
                var h = e.aoFooter[0];
                for (i = 0, n = h.length; n > i; i++) s = u[i], s.nTf = h[i].cell, s.sClass && t(s.nTf).addClass(s.sClass)
            }
        }

        function P(e, i, r) {
            var a, s, o, l, d, c, u, h, p, f = [], m = [], g = e.aoColumns.length;
            if (i) {
                for (r === n && (r = !1), a = 0, s = i.length; s > a; a++) {
                    for (f[a] = i[a].slice(), f[a].nTr = i[a].nTr, o = g - 1; o >= 0; o--) e.aoColumns[o].bVisible || r || f[a].splice(o, 1);
                    m.push([])
                }
                for (a = 0, s = f.length; s > a; a++) {
                    if (u = f[a].nTr) for (; c = u.firstChild;) u.removeChild(c);
                    for (o = 0, l = f[a].length; l > o; o++) if (h = 1, p = 1, m[a][o] === n) {
                        for (u.appendChild(f[a][o].cell), m[a][o] = 1; f[a + h] !== n && f[a][o].cell == f[a + h][o].cell;) m[a + h][o] = 1, h++;
                        for (; f[a][o + p] !== n && f[a][o].cell == f[a][o + p].cell;) {
                            for (d = 0; h > d; d++) m[a + d][o + p] = 1;
                            p++
                        }
                        t(f[a][o].cell).attr("rowspan", h).attr("colspan", p)
                    }
                }
            }
        }

        function H(e) {
            var i = Rt(e, "aoPreDrawCallback", "preDraw", [e]);
            if (-1 !== t.inArray(!1, i)) return void ft(e, !1);
            var r = [], a = 0, s = e.asStripeClasses, o = s.length, l = (e.aoOpenRows.length, e.oLanguage),
                d = e.iInitDisplayStart, c = "ssp" == Yt(e), u = e.aiDisplay;
            e.bDrawing = !0, d !== n && -1 !== d && (e._iDisplayStart = c ? d : d >= e.fnRecordsDisplay() ? 0 : d, e.iInitDisplayStart = -1);
            var h = e._iDisplayStart, p = e.fnDisplayEnd();
            if (e.bDeferLoading) e.bDeferLoading = !1, e.iDraw++, ft(e, !1); else if (c) {
                if (!e.bDestroying && !W(e)) return
            } else e.iDraw++;
            if (0 !== u.length) for (var f = c ? 0 : h, m = c ? e.aoData.length : p, v = f; m > v; v++) {
                var b = u[v], y = e.aoData[b];
                null === y.nTr && L(e, b);
                var w = y.nTr;
                if (0 !== o) {
                    var S = s[a % o];
                    y._sRowStripe != S && (t(w).removeClass(y._sRowStripe).addClass(S), y._sRowStripe = S)
                }
                Rt(e, "aoRowCallback", null, [w, y._aData, a, v]), r.push(w), a++
            } else {
                var _ = l.sZeroRecords;
                1 == e.iDraw && "ajax" == Yt(e) ? _ = l.sLoadingRecords : l.sEmptyTable && 0 === e.fnRecordsTotal() && (_ = l.sEmptyTable), r[0] = t("<tr/>", {"class": o ? s[0] : ""}).append(t("<td />", {
                    valign: "top",
                    colSpan: g(e),
                    "class": e.oClasses.sRowEmpty
                }).html(_))[0]
            }
            Rt(e, "aoHeaderCallback", "header", [t(e.nTHead).children("tr")[0], I(e), h, p, u]), Rt(e, "aoFooterCallback", "footer", [t(e.nTFoot).children("tr")[0], I(e), h, p, u]);
            var x = t(e.nTBody);
            x.children().detach(), x.append(t(r)), Rt(e, "aoDrawCallback", "draw", [e]), e.bSorted = !1, e.bFiltered = !1, e.bDrawing = !1
        }

        function R(t, e) {
            var i = t.oFeatures, n = i.bSort, r = i.bFilter;
            n && Tt(t), r ? Z(t, t.oPreviousSearch) : t.aiDisplay = t.aiDisplayMaster.slice(), e !== !0 && (t._iDisplayStart = 0), t._drawHold = e, H(t), t._drawHold = !1
        }

        function N(e) {
            var i = e.oClasses, n = t(e.nTable), r = t("<div/>").insertBefore(n), a = e.oFeatures, s = t("<div/>", {
                id: e.sTableId + "_wrapper",
                "class": i.sWrapper + (e.nTFoot ? "" : " " + i.sNoFooter)
            });
            e.nHolding = r[0], e.nTableWrapper = s[0], e.nTableReinsertBefore = e.nTable.nextSibling;
            for (var o, l, d, c, u, h, p = e.sDom.split(""), f = 0; f < p.length; f++) {
                if (o = null, l = p[f], "<" == l) {
                    if (d = t("<div/>")[0], c = p[f + 1], "'" == c || '"' == c) {
                        for (u = "", h = 2; p[f + h] != c;) u += p[f + h], h++;
                        if ("H" == u ? u = i.sJUIHeader : "F" == u && (u = i.sJUIFooter), -1 != u.indexOf(".")) {
                            var m = u.split(".");
                            d.id = m[0].substr(1, m[0].length - 1), d.className = m[1]
                        } else "#" == u.charAt(0) ? d.id = u.substr(1, u.length - 1) : d.className = u;
                        f += h
                    }
                    s.append(d), s = t(d)
                } else if (">" == l) s = s.parent(); else if ("l" == l && a.bPaginate && a.bLengthChange) o = ct(e); else if ("f" == l && a.bFilter) o = G(e); else if ("r" == l && a.bProcessing) o = pt(e); else if ("t" == l) o = mt(e); else if ("i" == l && a.bInfo) o = rt(e); else if ("p" == l && a.bPaginate) o = ut(e); else if (0 !== zt.ext.feature.length) for (var g = zt.ext.feature, v = 0, b = g.length; b > v; v++) if (l == g[v].cFeature) {
                    o = g[v].fnInit(e);
                    break
                }
                if (o) {
                    var y = e.aanFeatures;
                    y[l] || (y[l] = []), y[l].push(o), s.append(o)
                }
            }
            r.replaceWith(s), e.nHolding = null
        }

        function U(e, i) {
            var n, r, a, s, o, l, d, c, u, h, p, f = t(i).children("tr"), m = function (t, e, i) {
                for (var n = t[e]; n[i];) i++;
                return i
            };
            for (e.splice(0, e.length), a = 0, l = f.length; l > a; a++) e.push([]);
            for (a = 0, l = f.length; l > a; a++) for (n = f[a], c = 0, r = n.firstChild; r;) {
                if ("TD" == r.nodeName.toUpperCase() || "TH" == r.nodeName.toUpperCase()) for (u = 1 * r.getAttribute("colspan"), h = 1 * r.getAttribute("rowspan"), u = u && 0 !== u && 1 !== u ? u : 1, h = h && 0 !== h && 1 !== h ? h : 1, d = m(e, a, c), p = 1 === u, o = 0; u > o; o++) for (s = 0; h > s; s++) e[a + s][d + o] = {
                    cell: r,
                    unique: p
                }, e[a + s].nTr = n;
                r = r.nextSibling
            }
        }

        function Y(t, e, i) {
            var n = [];
            i || (i = t.aoHeader, e && (i = [], U(i, e)));
            for (var r = 0, a = i.length; a > r; r++) for (var s = 0, o = i[r].length; o > s; s++) !i[r][s].unique || n[s] && t.bSortCellsTop || (n[s] = i[r][s].cell);
            return n
        }

        function j(e, i, n) {
            if (Rt(e, "aoServerParams", "serverParams", [i]), i && t.isArray(i)) {
                var r = {}, a = /(.*?)\[\]$/;
                t.each(i, function (t, e) {
                    var i = e.name.match(a);
                    if (i) {
                        var n = i[0];
                        r[n] || (r[n] = []), r[n].push(e.value)
                    } else r[e.name] = e.value
                }), i = r
            }
            var s, o = e.ajax, l = e.oInstance, d = function (t) {
                Rt(e, null, "xhr", [e, t, e.jqXHR]), n(t)
            };
            if (t.isPlainObject(o) && o.data) {
                s = o.data;
                var c = t.isFunction(s) ? s(i, e) : s;
                i = t.isFunction(s) && c ? c : t.extend(!0, i, c), delete o.data
            }
            var u = {
                data: i, success: function (t) {
                    var i = t.error || t.sError;
                    i && Lt(e, 0, i), e.json = t, d(t)
                }, dataType: "json", cache: !1, type: e.sServerMethod, error: function (i, n, r) {
                    var a = Rt(e, null, "xhr", [e, null, e.jqXHR]);
                    -1 === t.inArray(!0, a) && ("parsererror" == n ? Lt(e, 0, "Invalid JSON response", 1) : 4 === i.readyState && Lt(e, 0, "Ajax error", 7)), ft(e, !1)
                }
            };
            e.oAjaxData = i, Rt(e, null, "preXhr", [e, i]), e.fnServerData ? e.fnServerData.call(l, e.sAjaxSource, t.map(i, function (t, e) {
                return {name: e, value: t}
            }), d, e) : e.sAjaxSource || "string" == typeof o ? e.jqXHR = t.ajax(t.extend(u, {url: o || e.sAjaxSource})) : t.isFunction(o) ? e.jqXHR = o.call(l, i, d, e) : (e.jqXHR = t.ajax(t.extend(u, o)), o.data = s)
        }

        function W(t) {
            return t.bAjaxDataGet ? (t.iDraw++, ft(t, !0), j(t, B(t), function (e) {
                z(t, e)
            }), !1) : !0
        }

        function B(e) {
            var i, n, r, a, s = e.aoColumns, o = s.length, l = e.oFeatures, d = e.oPreviousSearch,
                c = e.aoPreSearchCols, u = [], h = Dt(e), p = e._iDisplayStart,
                f = l.bPaginate !== !1 ? e._iDisplayLength : -1, m = function (t, e) {
                    u.push({name: t, value: e})
                };
            m("sEcho", e.iDraw), m("iColumns", o), m("sColumns", ce(s, "sName").join(",")), m("iDisplayStart", p), m("iDisplayLength", f);
            var g = {
                draw: e.iDraw,
                columns: [],
                order: [],
                start: p,
                length: f,
                search: {value: d.sSearch, regex: d.bRegex}
            };
            for (i = 0; o > i; i++) r = s[i], a = c[i], n = "function" == typeof r.mData ? "function" : r.mData, g.columns.push({
                data: n,
                name: r.sName,
                searchable: r.bSearchable,
                orderable: r.bSortable,
                search: {value: a.sSearch, regex: a.bRegex}
            }), m("mDataProp_" + i, n), l.bFilter && (m("sSearch_" + i, a.sSearch), m("bRegex_" + i, a.bRegex), m("bSearchable_" + i, r.bSearchable)), l.bSort && m("bSortable_" + i, r.bSortable);
            l.bFilter && (m("sSearch", d.sSearch), m("bRegex", d.bRegex)), l.bSort && (t.each(h, function (t, e) {
                g.order.push({column: e.col, dir: e.dir}), m("iSortCol_" + t, e.col), m("sSortDir_" + t, e.dir)
            }), m("iSortingCols", h.length));
            var v = zt.ext.legacy.ajax;
            return null === v ? e.sAjaxSource ? u : g : v ? u : g
        }

        function z(t, e) {
            var i = function (t, i) {
                    return e[t] !== n ? e[t] : e[i]
                }, r = q(t, e), a = i("sEcho", "draw"), s = i("iTotalRecords", "recordsTotal"),
                o = i("iTotalDisplayRecords", "recordsFiltered");
            if (a) {
                if (1 * a < t.iDraw) return;
                t.iDraw = 1 * a
            }
            M(t), t._iRecordsTotal = parseInt(s, 10), t._iRecordsDisplay = parseInt(o, 10);
            for (var l = 0, d = r.length; d > l; l++) w(t, r[l]);
            t.aiDisplay = t.aiDisplayMaster.slice(), t.bAjaxDataGet = !1, H(t), t._bInitComplete || lt(t, e), t.bAjaxDataGet = !0, ft(t, !1)
        }

        function q(e, i) {
            var r = t.isPlainObject(e.ajax) && e.ajax.dataSrc !== n ? e.ajax.dataSrc : e.sAjaxDataProp;
            return "data" === r ? i.aaData || i[r] : "" !== r ? A(r)(i) : i
        }

        function G(e) {
            var n = e.oClasses, r = e.sTableId, a = e.oLanguage, s = e.oPreviousSearch, o = e.aanFeatures,
                l = '<input type="search" class="' + n.sFilterInput + '"/>', d = a.sSearch;
            d = d.match(/_INPUT_/) ? d.replace("_INPUT_", l) : d + l;
            var c = t("<div/>", {id: o.f ? null : r + "_filter", "class": n.sFilter}).append(t("<label/>").append(d)),
                u = function () {
                    var t = (o.f, this.value ? this.value : "");
                    t != s.sSearch && (Z(e, {
                        sSearch: t,
                        bRegex: s.bRegex,
                        bSmart: s.bSmart,
                        bCaseInsensitive: s.bCaseInsensitive
                    }), e._iDisplayStart = 0, H(e))
                }, h = null !== e.searchDelay ? e.searchDelay : "ssp" === Yt(e) ? 400 : 0,
                p = t("input", c).val(s.sSearch).attr("placeholder", a.sSearchPlaceholder).bind("keyup.DT search.DT input.DT paste.DT cut.DT", h ? yt(u, h) : u).bind("keypress.DT", function (t) {
                    return 13 == t.keyCode ? !1 : void 0
                }).attr("aria-controls", r);
            return t(e.nTable).on("search.dt.DT", function (t, n) {
                if (e === n) try {
                    p[0] !== i.activeElement && p.val(s.sSearch)
                } catch (r) {
                }
            }), c[0]
        }

        function Z(t, e, i) {
            var r = t.oPreviousSearch, a = t.aoPreSearchCols, s = function (t) {
                r.sSearch = t.sSearch, r.bRegex = t.bRegex, r.bSmart = t.bSmart, r.bCaseInsensitive = t.bCaseInsensitive
            }, o = function (t) {
                return t.bEscapeRegex !== n ? !t.bEscapeRegex : t.bRegex
            };
            if (b(t), "ssp" != Yt(t)) {
                Q(t, e.sSearch, i, o(e), e.bSmart, e.bCaseInsensitive), s(e);
                for (var l = 0; l < a.length; l++) K(t, a[l].sSearch, l, o(a[l]), a[l].bSmart, a[l].bCaseInsensitive);
                X(t)
            } else s(e);
            t.bFiltered = !0, Rt(t, null, "search", [t])
        }

        function X(e) {
            for (var i, n, r = zt.ext.search, a = e.aiDisplay, s = 0, o = r.length; o > s; s++) {
                for (var l = [], d = 0, c = a.length; c > d; d++) n = a[d], i = e.aoData[n], r[s](e, i._aFilterData, n, i._aData, d) && l.push(n);
                a.length = 0, t.merge(a, l)
            }
        }

        function K(t, e, i, n, r, a) {
            if ("" !== e) for (var s, o = t.aiDisplay, l = J(e, n, r, a), d = o.length - 1; d >= 0; d--) s = t.aoData[o[d]]._aFilterData[i], l.test(s) || o.splice(d, 1)
        }

        function Q(t, e, i, n, r, a) {
            var s, o, l, d = J(e, n, r, a), c = t.oPreviousSearch.sSearch, u = t.aiDisplayMaster;
            if (0 !== zt.ext.search.length && (i = !0), o = et(t), e.length <= 0) t.aiDisplay = u.slice(); else for ((o || i || c.length > e.length || 0 !== e.indexOf(c) || t.bSorted) && (t.aiDisplay = u.slice()), s = t.aiDisplay, l = s.length - 1; l >= 0; l--) d.test(t.aoData[s[l]]._sFilterRow) || s.splice(l, 1)
        }

        function J(e, i, n, r) {
            if (e = i ? e : tt(e), n) {
                var a = t.map(e.match(/"[^"]+"|[^ ]+/g) || [""], function (t) {
                    if ('"' === t.charAt(0)) {
                        var e = t.match(/^"(.*)"$/);
                        t = e ? e[1] : t
                    }
                    return t.replace('"', "")
                });
                e = "^(?=.*?" + a.join(")(?=.*?") + ").*$"
            }
            return new RegExp(e, r ? "i" : "")
        }

        function tt(t) {
            return t.replace(ie, "\\$1")
        }

        function et(t) {
            var e, i, n, r, a, s, o, l, d = t.aoColumns, c = zt.ext.type.search, u = !1;
            for (i = 0, r = t.aoData.length; r > i; i++) if (l = t.aoData[i], !l._aFilterData) {
                for (s = [], n = 0, a = d.length; a > n; n++) e = d[n], e.bSearchable ? (o = D(t, i, n, "filter"), c[e.sType] && (o = c[e.sType](o)), null === o && (o = ""), "string" != typeof o && o.toString && (o = o.toString())) : o = "", o.indexOf && -1 !== o.indexOf("&") && (ye.innerHTML = o, o = we ? ye.textContent : ye.innerText), o.replace && (o = o.replace(/[\r\n]/g, "")), s.push(o);
                l._aFilterData = s, l._sFilterRow = s.join("  "), u = !0
            }
            return u
        }

        function it(t) {
            return {search: t.sSearch, smart: t.bSmart, regex: t.bRegex, caseInsensitive: t.bCaseInsensitive}
        }

        function nt(t) {
            return {sSearch: t.search, bSmart: t.smart, bRegex: t.regex, bCaseInsensitive: t.caseInsensitive}
        }

        function rt(e) {
            var i = e.sTableId, n = e.aanFeatures.i,
                r = t("<div/>", {"class": e.oClasses.sInfo, id: n ? null : i + "_info"});
            return n || (e.aoDrawCallback.push({
                fn: at,
                sName: "information"
            }), r.attr("role", "status").attr("aria-live", "polite"), t(e.nTable).attr("aria-describedby", i + "_info")), r[0]
        }

        function at(e) {
            var i = e.aanFeatures.i;
            if (0 !== i.length) {
                var n = e.oLanguage, r = e._iDisplayStart + 1, a = e.fnDisplayEnd(), s = e.fnRecordsTotal(),
                    o = e.fnRecordsDisplay(), l = o ? n.sInfo : n.sInfoEmpty;
                o !== s && (l += " " + n.sInfoFiltered), l += n.sInfoPostFix, l = st(e, l);
                var d = n.fnInfoCallback;
                null !== d && (l = d.call(e.oInstance, e, r, a, s, o, l)), t(i).html(l)
            }
        }

        function st(t, e) {
            var i = t.fnFormatNumber, n = t._iDisplayStart + 1, r = t._iDisplayLength, a = t.fnRecordsDisplay(),
                s = -1 === r;
            return e.replace(/_START_/g, i.call(t, n)).replace(/_END_/g, i.call(t, t.fnDisplayEnd())).replace(/_MAX_/g, i.call(t, t.fnRecordsTotal())).replace(/_TOTAL_/g, i.call(t, a)).replace(/_PAGE_/g, i.call(t, s ? 1 : Math.ceil(n / r))).replace(/_PAGES_/g, i.call(t, s ? 1 : Math.ceil(a / r)))
        }

        function ot(t) {
            var e, i, n, r = t.iInitDisplayStart, a = t.aoColumns, s = t.oFeatures, o = t.bDeferLoading;
            if (!t.bInitialised) return void setTimeout(function () {
                ot(t)
            }, 200);
            for (N(t), V(t), P(t, t.aoHeader), P(t, t.aoFooter), ft(t, !0), s.bAutoWidth && bt(t), e = 0, i = a.length; i > e; e++) n = a[e], n.sWidth && (n.nTh.style.width = xt(n.sWidth));
            Rt(t, null, "preInit", [t]), R(t);
            var l = Yt(t);
            ("ssp" != l || o) && ("ajax" == l ? j(t, [], function (i) {
                var n = q(t, i);
                for (e = 0; e < n.length; e++) w(t, n[e]);
                t.iInitDisplayStart = r, R(t), ft(t, !1), lt(t, i)
            }, t) : (ft(t, !1), lt(t)))
        }

        function lt(t, e) {
            t._bInitComplete = !0, (e || t.oInit.aaData) && p(t), Rt(t, null, "plugin-init", [t, e]), Rt(t, "aoInitComplete", "init", [t, e])
        }

        function dt(t, e) {
            var i = parseInt(e, 10);
            t._iDisplayLength = i, Nt(t), Rt(t, null, "length", [t, i])
        }

        function ct(e) {
            for (var i = e.oClasses, n = e.sTableId, r = e.aLengthMenu, a = t.isArray(r[0]), s = a ? r[0] : r, o = a ? r[1] : r, l = t("<select/>", {
                name: n + "_length",
                "aria-controls": n,
                "class": i.sLengthSelect
            }), d = 0, c = s.length; c > d; d++) l[0][d] = new Option(o[d], s[d]);
            var u = t("<div><label/></div>").addClass(i.sLength);
            return e.aanFeatures.l || (u[0].id = n + "_length"), u.children().append(e.oLanguage.sLengthMenu.replace("_MENU_", l[0].outerHTML)), t("select", u).val(e._iDisplayLength).bind("change.DT", function (i) {
                dt(e, t(this).val()), H(e)
            }), t(e.nTable).bind("length.dt.DT", function (i, n, r) {
                e === n && t("select", u).val(r)
            }), u[0]
        }

        function ut(e) {
            var i = e.sPaginationType, n = zt.ext.pager[i], r = "function" == typeof n, a = function (t) {
                H(t)
            }, s = t("<div/>").addClass(e.oClasses.sPaging + i)[0], o = e.aanFeatures;
            return r || n.fnInit(e, s, a), o.p || (s.id = e.sTableId + "_paginate", e.aoDrawCallback.push({
                fn: function (t) {
                    if (r) {
                        var e, i, s = t._iDisplayStart, l = t._iDisplayLength, d = t.fnRecordsDisplay(), c = -1 === l,
                            u = c ? 0 : Math.ceil(s / l), h = c ? 1 : Math.ceil(d / l), p = n(u, h);
                        for (e = 0, i = o.p.length; i > e; e++) Ut(t, "pageButton")(t, o.p[e], e, p, u, h)
                    } else n.fnUpdate(t, a)
                }, sName: "pagination"
            })), s
        }

        function ht(t, e, i) {
            var n = t._iDisplayStart, r = t._iDisplayLength, a = t.fnRecordsDisplay();
            0 === a || -1 === r ? n = 0 : "number" == typeof e ? (n = e * r, n > a && (n = 0)) : "first" == e ? n = 0 : "previous" == e ? (n = r >= 0 ? n - r : 0, 0 > n && (n = 0)) : "next" == e ? a > n + r && (n += r) : "last" == e ? n = Math.floor((a - 1) / r) * r : Lt(t, 0, "Unknown paging action: " + e, 5);
            var s = t._iDisplayStart !== n;
            return t._iDisplayStart = n, s && (Rt(t, null, "page", [t]), i && H(t)), s
        }

        function pt(e) {
            return t("<div/>", {
                id: e.aanFeatures.r ? null : e.sTableId + "_processing",
                "class": e.oClasses.sProcessing
            }).html(e.oLanguage.sProcessing).insertBefore(e.nTable)[0]
        }

        function ft(e, i) {
            e.oFeatures.bProcessing && t(e.aanFeatures.r).css("display", i ? "block" : "none"), Rt(e, null, "processing", [e, i])
        }

        function mt(e) {
            var i = t(e.nTable);
            i.attr("role", "grid");
            var n = e.oScroll;
            if ("" === n.sX && "" === n.sY) return e.nTable;
            var r = n.sX, a = n.sY, s = e.oClasses, o = i.children("caption"), l = o.length ? o[0]._captionSide : null,
                d = t(i[0].cloneNode(!1)), c = t(i[0].cloneNode(!1)), u = i.children("tfoot"), h = "<div/>",
                p = function (t) {
                    return t ? xt(t) : null
                };
            u.length || (u = null);
            var f = t(h, {"class": s.sScrollWrapper}).append(t(h, {"class": s.sScrollHead}).css({
                overflow: "hidden",
                position: "relative",
                border: 0,
                width: r ? p(r) : "100%"
            }).append(t(h, {"class": s.sScrollHeadInner}).css({
                "box-sizing": "content-box",
                width: n.sXInner || "100%"
            }).append(d.removeAttr("id").css("margin-left", 0).append("top" === l ? o : null).append(i.children("thead"))))).append(t(h, {"class": s.sScrollBody}).css({
                position: "relative",
                overflow: "auto",
                width: p(r)
            }).append(i));
            u && f.append(t(h, {"class": s.sScrollFoot}).css({
                overflow: "hidden",
                border: 0,
                width: r ? p(r) : "100%"
            }).append(t(h, {"class": s.sScrollFootInner}).append(c.removeAttr("id").css("margin-left", 0).append("bottom" === l ? o : null).append(i.children("tfoot")))));
            var m = f.children(), g = m[0], v = m[1], b = u ? m[2] : null;
            return r && t(v).on("scroll.DT", function (t) {
                var e = this.scrollLeft;
                g.scrollLeft = e, u && (b.scrollLeft = e)
            }), t(v).css(a && n.bCollapse ? "max-height" : "height", a), e.nScrollHead = g, e.nScrollBody = v, e.nScrollFoot = b, e.aoDrawCallback.push({
                fn: gt,
                sName: "scrolling"
            }), f[0]
        }

        function gt(e) {
            var i, r, a, s, o, l, d, c, u, h = e.oScroll, m = h.sX, g = h.sXInner, v = h.sY, b = h.iBarWidth,
                y = t(e.nScrollHead), w = y[0].style, S = y.children("div"), _ = S[0].style, x = S.children("table"),
                D = e.nScrollBody, T = t(D), C = D.style, A = t(e.nScrollFoot), k = A.children("div"),
                I = k.children("table"), M = t(e.nTHead), F = t(e.nTable), E = F[0], $ = E.style,
                L = e.nTFoot ? t(e.nTFoot) : null, O = e.oBrowser, V = O.bScrollOversize, P = [], H = [], R = [],
                N = function (t) {
                    var e = t.style;
                    e.paddingTop = "0", e.paddingBottom = "0", e.borderTopWidth = "0", e.borderBottomWidth = "0", e.height = 0
                }, U = D.scrollHeight > D.clientHeight;
            if (e.scrollBarVis !== U && e.scrollBarVis !== n) return e.scrollBarVis = U, void p(e);
            e.scrollBarVis = U, F.children("thead, tfoot").remove(), o = M.clone().prependTo(F), i = M.find("tr"), a = o.find("tr"), o.find("th, td").removeAttr("tabindex"), L && (l = L.clone().prependTo(F), r = L.find("tr"), s = l.find("tr")), m || (C.width = "100%", y[0].style.width = "100%"), t.each(Y(e, o), function (t, i) {
                d = f(e, t), i.style.width = e.aoColumns[d].sWidth
            }), L && vt(function (t) {
                t.style.width = ""
            }, s), u = F.outerWidth(), "" === m ? ($.width = "100%", V && (F.find("tbody").height() > D.offsetHeight || "scroll" == T.css("overflow-y")) && ($.width = xt(F.outerWidth() - b)), u = F.outerWidth()) : "" !== g && ($.width = xt(g), u = F.outerWidth()), vt(N, a), vt(function (e) {
                R.push(e.innerHTML), P.push(xt(t(e).css("width")))
            }, a), vt(function (t, e) {
                t.style.width = P[e]
            }, i), t(a).height(0), L && (vt(N, s), vt(function (e) {
                H.push(xt(t(e).css("width")))
            }, s), vt(function (t, e) {
                t.style.width = H[e]
            }, r), t(s).height(0)), vt(function (t, e) {
                t.innerHTML = '<div class="dataTables_sizing" style="height:0;overflow:hidden;">' + R[e] + "</div>", t.style.width = P[e]
            }, a), L && vt(function (t, e) {
                t.innerHTML = "", t.style.width = H[e]
            }, s), F.outerWidth() < u ? (c = D.scrollHeight > D.offsetHeight || "scroll" == T.css("overflow-y") ? u + b : u, V && (D.scrollHeight > D.offsetHeight || "scroll" == T.css("overflow-y")) && ($.width = xt(c - b)), "" !== m && "" === g || Lt(e, 1, "Possible column misalignment", 6)) : c = "100%", C.width = xt(c), w.width = xt(c), L && (e.nScrollFoot.style.width = xt(c)), v || V && (C.height = xt(E.offsetHeight + b));
            var j = F.outerWidth();
            x[0].style.width = xt(j), _.width = xt(j);
            var W = F.height() > D.clientHeight || "scroll" == T.css("overflow-y"),
                B = "padding" + (O.bScrollbarLeft ? "Left" : "Right");
            _[B] = W ? b + "px" : "0px", L && (I[0].style.width = xt(j), k[0].style.width = xt(j), k[0].style[B] = W ? b + "px" : "0px"), T.scroll(), !e.bSorted && !e.bFiltered || e._drawHold || (D.scrollTop = 0)
        }

        function vt(t, e, i) {
            for (var n, r, a = 0, s = 0, o = e.length; o > s;) {
                for (n = e[s].firstChild, r = i ? i[s].firstChild : null; n;) 1 === n.nodeType && (i ? t(n, r, a) : t(n, a), a++), n = n.nextSibling, r = i ? r.nextSibling : null;
                s++
            }
        }

        function bt(i) {
            var n, r, a, s = i.nTable, o = i.aoColumns, l = i.oScroll, d = l.sY, c = l.sX, u = l.sXInner, h = o.length,
                m = v(i, "bVisible"), b = t("th", i.nTHead), y = s.getAttribute("width"), w = s.parentNode, S = !1,
                _ = i.oBrowser, x = _.bScrollOversize, D = s.style.width;
            for (D && -1 !== D.indexOf("%") && (y = D), n = 0; n < m.length; n++) r = o[m[n]], null !== r.sWidth && (r.sWidth = wt(r.sWidthOrig, w), S = !0);
            if (x || !S && !c && !d && h == g(i) && h == b.length) for (n = 0; h > n; n++) {
                var T = f(i, n);
                null !== T && (o[T].sWidth = xt(b.eq(n).width()))
            } else {
                var C = t(s).clone().css("visibility", "hidden").removeAttr("id");
                C.find("tbody tr").remove();
                var A = t("<tr/>").appendTo(C.find("tbody"));
                for (C.find("thead, tfoot").remove(), C.append(t(i.nTHead).clone()).append(t(i.nTFoot).clone()), C.find("tfoot th, tfoot td").css("width", ""), b = Y(i, C.find("thead")[0]), n = 0; n < m.length; n++) r = o[m[n]], b[n].style.width = null !== r.sWidthOrig && "" !== r.sWidthOrig ? xt(r.sWidthOrig) : "", r.sWidthOrig && c && t(b[n]).append(t("<div/>").css({
                    width: r.sWidthOrig,
                    margin: 0,
                    padding: 0,
                    border: 0,
                    height: 1
                }));
                if (i.aoData.length) for (n = 0; n < m.length; n++) a = m[n], r = o[a], t(St(i, a)).clone(!1).append(r.sContentPadding).appendTo(A);
                var k = t("<div/>").css(c || d ? {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: 1,
                    right: 0,
                    overflow: "hidden"
                } : {}).append(C).appendTo(w);
                c && u ? C.width(u) : c ? (C.css("width", "auto"), C.removeAttr("width"), C.width() < w.clientWidth && y && C.width(w.clientWidth)) : d ? C.width(w.clientWidth) : y && C.width(y);
                var I = 0;
                for (n = 0; n < m.length; n++) {
                    var M = t(b[n]), F = M.outerWidth() - M.width(),
                        E = _.bBounding ? Math.ceil(b[n].getBoundingClientRect().width) : M.outerWidth();
                    I += E, o[m[n]].sWidth = xt(E - F)
                }
                s.style.width = xt(I), k.remove()
            }
            if (y && (s.style.width = xt(y)), (y || c) && !i._reszEvt) {
                var $ = function () {
                    t(e).bind("resize.DT-" + i.sInstance, yt(function () {
                        p(i)
                    }))
                };
                x ? setTimeout($, 1e3) : $(), i._reszEvt = !0
            }
        }

        function yt(t, e) {
            var i, r, a = e !== n ? e : 200;
            return function () {
                var e = this, s = +new Date, o = arguments;
                i && i + a > s ? (clearTimeout(r), r = setTimeout(function () {
                    i = n, t.apply(e, o)
                }, a)) : (i = s, t.apply(e, o))
            }
        }

        function wt(e, n) {
            if (!e) return 0;
            var r = t("<div/>").css("width", xt(e)).appendTo(n || i.body), a = r[0].offsetWidth;
            return r.remove(), a
        }

        function St(e, i) {
            var n = _t(e, i);
            if (0 > n) return null;
            var r = e.aoData[n];
            return r.nTr ? r.anCells[i] : t("<td/>").html(D(e, n, i, "display"))[0]
        }

        function _t(t, e) {
            for (var i, n = -1, r = -1, a = 0, s = t.aoData.length; s > a; a++) i = D(t, a, e, "display") + "", i = i.replace(Se, ""), i = i.replace(/&nbsp;/g, " "), i.length > n && (n = i.length, r = a);
            return r
        }

        function xt(t) {
            return null === t ? "0px" : "number" == typeof t ? 0 > t ? "0px" : t + "px" : t.match(/\d$/) ? t + "px" : t
        }

        function Dt(e) {
            var i, r, a, s, o, l, d, c = [], u = e.aoColumns, h = e.aaSortingFixed, p = t.isPlainObject(h), f = [],
                m = function (e) {
                    e.length && !t.isArray(e[0]) ? f.push(e) : t.merge(f, e)
                };
            for (t.isArray(h) && m(h), p && h.pre && m(h.pre), m(e.aaSorting), p && h.post && m(h.post), i = 0; i < f.length; i++) for (d = f[i][0], s = u[d].aDataSort, r = 0, a = s.length; a > r; r++) o = s[r], l = u[o].sType || "string", f[i]._idx === n && (f[i]._idx = t.inArray(f[i][1], u[o].asSorting)), c.push({
                src: d,
                col: o,
                dir: f[i][1],
                index: f[i]._idx,
                type: l,
                formatter: zt.ext.type.order[l + "-pre"]
            });
            return c
        }

        function Tt(t) {
            var e, i, n, r, a, s = [], o = zt.ext.type.order, l = t.aoData, d = (t.aoColumns, 0), c = t.aiDisplayMaster;
            for (b(t), a = Dt(t), e = 0, i = a.length; i > e; e++) r = a[e], r.formatter && d++, Mt(t, r.col);
            if ("ssp" != Yt(t) && 0 !== a.length) {
                for (e = 0, n = c.length; n > e; e++) s[c[e]] = e;
                d === a.length ? c.sort(function (t, e) {
                    var i, n, r, o, d, c = a.length, u = l[t]._aSortData, h = l[e]._aSortData;
                    for (r = 0; c > r; r++) if (d = a[r], i = u[d.col], n = h[d.col], o = n > i ? -1 : i > n ? 1 : 0, 0 !== o) return "asc" === d.dir ? o : -o;
                    return i = s[t], n = s[e], n > i ? -1 : i > n ? 1 : 0
                }) : c.sort(function (t, e) {
                    var i, n, r, d, c, u, h = a.length, p = l[t]._aSortData, f = l[e]._aSortData;
                    for (r = 0; h > r; r++) if (c = a[r], i = p[c.col], n = f[c.col], u = o[c.type + "-" + c.dir] || o["string-" + c.dir], d = u(i, n), 0 !== d) return d;
                    return i = s[t], n = s[e], n > i ? -1 : i > n ? 1 : 0
                })
            }
            t.bSorted = !0
        }

        function Ct(t) {
            for (var e, i, n = t.aoColumns, r = Dt(t), a = t.oLanguage.oAria, s = 0, o = n.length; o > s; s++) {
                var l = n[s], d = l.asSorting, c = l.sTitle.replace(/<.*?>/g, ""), u = l.nTh;
                u.removeAttribute("aria-sort"), l.bSortable ? (r.length > 0 && r[0].col == s ? (u.setAttribute("aria-sort", "asc" == r[0].dir ? "ascending" : "descending"), i = d[r[0].index + 1] || d[0]) : i = d[0], e = c + ("asc" === i ? a.sSortAscending : a.sSortDescending)) : e = c, u.setAttribute("aria-label", e)
            }
        }

        function At(e, i, r, a) {
            var s, o = e.aoColumns[i], l = e.aaSorting, d = o.asSorting, c = function (e, i) {
                var r = e._idx;
                return r === n && (r = t.inArray(e[1], d)), r + 1 < d.length ? r + 1 : i ? null : 0
            };
            if ("number" == typeof l[0] && (l = e.aaSorting = [l]), r && e.oFeatures.bSortMulti) {
                var u = t.inArray(i, ce(l, "0"));
                -1 !== u ? (s = c(l[u], !0), null === s && 1 === l.length && (s = 0), null === s ? l.splice(u, 1) : (l[u][1] = d[s], l[u]._idx = s)) : (l.push([i, d[0], 0]), l[l.length - 1]._idx = 0)
            } else l.length && l[0][0] == i ? (s = c(l[0]), l.length = 1, l[0][1] = d[s], l[0]._idx = s) : (l.length = 0, l.push([i, d[0]]), l[0]._idx = 0);
            R(e), "function" == typeof a && a(e)
        }

        function kt(t, e, i, n) {
            var r = t.aoColumns[i];
            Pt(e, {}, function (e) {
                r.bSortable !== !1 && (t.oFeatures.bProcessing ? (ft(t, !0), setTimeout(function () {
                    At(t, i, e.shiftKey, n), "ssp" !== Yt(t) && ft(t, !1)
                }, 0)) : At(t, i, e.shiftKey, n))
            })
        }

        function It(e) {
            var i, n, r, a = e.aLastSort, s = e.oClasses.sSortColumn, o = Dt(e), l = e.oFeatures;
            if (l.bSort && l.bSortClasses) {
                for (i = 0, n = a.length; n > i; i++) r = a[i].src, t(ce(e.aoData, "anCells", r)).removeClass(s + (2 > i ? i + 1 : 3));
                for (i = 0, n = o.length; n > i; i++) r = o[i].src, t(ce(e.aoData, "anCells", r)).addClass(s + (2 > i ? i + 1 : 3))
            }
            e.aLastSort = o
        }

        function Mt(t, e) {
            var i, n = t.aoColumns[e], r = zt.ext.order[n.sSortDataType];
            r && (i = r.call(t.oInstance, t, e, m(t, e)));
            for (var a, s, o = zt.ext.type.order[n.sType + "-pre"], l = 0, d = t.aoData.length; d > l; l++) a = t.aoData[l], a._aSortData || (a._aSortData = []), a._aSortData[e] && !r || (s = r ? i[l] : D(t, l, e, "sort"), a._aSortData[e] = o ? o(s) : s)
        }

        function Ft(e) {
            if (e.oFeatures.bStateSave && !e.bDestroying) {
                var i = {
                    time: +new Date,
                    start: e._iDisplayStart,
                    length: e._iDisplayLength,
                    order: t.extend(!0, [], e.aaSorting),
                    search: it(e.oPreviousSearch),
                    columns: t.map(e.aoColumns, function (t, i) {
                        return {visible: t.bVisible, search: it(e.aoPreSearchCols[i])}
                    })
                };
                Rt(e, "aoStateSaveParams", "stateSaveParams", [e, i]), e.oSavedState = i, e.fnStateSaveCallback.call(e.oInstance, e, i)
            }
        }

        function Et(e, i) {
            var r, a, s = e.aoColumns;
            if (e.oFeatures.bStateSave) {
                var o = e.fnStateLoadCallback.call(e.oInstance, e);
                if (o && o.time) {
                    var l = Rt(e, "aoStateLoadParams", "stateLoadParams", [e, o]);
                    if (-1 === t.inArray(!1, l)) {
                        var d = e.iStateDuration;
                        if (!(d > 0 && o.time < +new Date - 1e3 * d) && s.length === o.columns.length) {
                            for (e.oLoadedState = t.extend(!0, {}, o), o.start !== n && (e._iDisplayStart = o.start, e.iInitDisplayStart = o.start), o.length !== n && (e._iDisplayLength = o.length), o.order !== n && (e.aaSorting = [], t.each(o.order, function (t, i) {
                                e.aaSorting.push(i[0] >= s.length ? [0, i[1]] : i)
                            })), o.search !== n && t.extend(e.oPreviousSearch, nt(o.search)), r = 0, a = o.columns.length; a > r; r++) {
                                var c = o.columns[r];
                                c.visible !== n && (s[r].bVisible = c.visible), c.search !== n && t.extend(e.aoPreSearchCols[r], nt(c.search))
                            }
                            Rt(e, "aoStateLoaded", "stateLoaded", [e, o])
                        }
                    }
                }
            }
        }

        function $t(e) {
            var i = zt.settings, n = t.inArray(e, ce(i, "nTable"));
            return -1 !== n ? i[n] : null
        }

        function Lt(t, i, n, r) {
            if (n = "DataTables warning: " + (t ? "table id=" + t.sTableId + " - " : "") + n, r && (n += ". For more information about this error, please see http://datatables.net/tn/" + r), i) e.console && console.log && console.log(n); else {
                var a = zt.ext, s = a.sErrMode || a.errMode;
                if (t && Rt(t, null, "error", [t, r, n]), "alert" == s) alert(n); else {
                    if ("throw" == s) throw new Error(n);
                    "function" == typeof s && s(t, r, n)
                }
            }
        }

        function Ot(e, i, r, a) {
            return t.isArray(r) ? void t.each(r, function (n, r) {
                t.isArray(r) ? Ot(e, i, r[0], r[1]) : Ot(e, i, r)
            }) : (a === n && (a = r), void(i[r] !== n && (e[a] = i[r])))
        }

        function Vt(e, i, n) {
            var r;
            for (var a in i) i.hasOwnProperty(a) && (r = i[a], t.isPlainObject(r) ? (t.isPlainObject(e[a]) || (e[a] = {}), t.extend(!0, e[a], r)) : n && "data" !== a && "aaData" !== a && t.isArray(r) ? e[a] = r.slice() : e[a] = r);
            return e
        }

        function Pt(e, i, n) {
            t(e).bind("click.DT", i, function (t) {
                e.blur(), n(t)
            }).bind("keypress.DT", i, function (t) {
                13 === t.which && (t.preventDefault(), n(t))
            }).bind("selectstart.DT", function () {
                return !1
            })
        }

        function Ht(t, e, i, n) {
            i && t[e].push({fn: i, sName: n})
        }

        function Rt(e, i, n, r) {
            var a = [];
            if (i && (a = t.map(e[i].slice().reverse(), function (t, i) {
                    return t.fn.apply(e.oInstance, r)
                })), null !== n) {
                var s = t.Event(n + ".dt");
                t(e.nTable).trigger(s, r), a.push(s.result)
            }
            return a
        }

        function Nt(t) {
            var e = t._iDisplayStart, i = t.fnDisplayEnd(), n = t._iDisplayLength;
            e >= i && (e = i - n), e -= e % n, (-1 === n || 0 > e) && (e = 0), t._iDisplayStart = e
        }

        function Ut(e, i) {
            var n = e.renderer, r = zt.ext.renderer[i];
            return t.isPlainObject(n) && n[i] ? r[n[i]] || r._ : "string" == typeof n ? r[n] || r._ : r._
        }

        function Yt(t) {
            return t.oFeatures.bServerSide ? "ssp" : t.ajax || t.sAjaxSource ? "ajax" : "dom"
        }

        function jt(t, e) {
            var i = [], n = We.numbers_length, r = Math.floor(n / 2);
            return n >= e ? i = he(0, e) : r >= t ? (i = he(0, n - 2), i.push("ellipsis"), i.push(e - 1)) : t >= e - 1 - r ? (i = he(e - (n - 2), e), i.splice(0, 0, "ellipsis"), i.splice(0, 0, 0)) : (i = he(t - r + 2, t + r - 1), i.push("ellipsis"), i.push(e - 1), i.splice(0, 0, "ellipsis"), i.splice(0, 0, 0)), i.DT_el = "span", i
        }

        function Wt(e) {
            t.each({
                num: function (t) {
                    return Be(t, e)
                }, "num-fmt": function (t) {
                    return Be(t, e, ne)
                }, "html-num": function (t) {
                    return Be(t, e, Jt)
                }, "html-num-fmt": function (t) {
                    return Be(t, e, Jt, ne)
                }
            }, function (t, i) {
                qt.type.order[t + e + "-pre"] = i, t.match(/^html\-/) && (qt.type.search[t + e] = qt.type.search.html)
            })
        }

        function Bt(t) {
            return function () {
                var e = [$t(this[zt.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));
                return zt.ext.internal[t].apply(this, e)
            }
        }

        var zt, qt, Gt, Zt, Xt, Kt = {}, Qt = /[\r\n]/g, Jt = /<.*?>/g, te = /^[\w\+\-]/, ee = /[\w\+\-]$/,
            ie = new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^", "-"].join("|\\") + ")", "g"),
            ne = /[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfk]/gi, re = function (t) {
                return !t || t === !0 || "-" === t
            }, ae = function (t) {
                var e = parseInt(t, 10);
                return !isNaN(e) && isFinite(t) ? e : null
            }, se = function (t, e) {
                return Kt[e] || (Kt[e] = new RegExp(tt(e), "g")), "string" == typeof t && "." !== e ? t.replace(/\./g, "").replace(Kt[e], ".") : t
            }, oe = function (t, e, i) {
                var n = "string" == typeof t;
                return re(t) ? !0 : (e && n && (t = se(t, e)), i && n && (t = t.replace(ne, "")), !isNaN(parseFloat(t)) && isFinite(t))
            }, le = function (t) {
                return re(t) || "string" == typeof t
            }, de = function (t, e, i) {
                if (re(t)) return !0;
                var n = le(t);
                return n && oe(fe(t), e, i) ? !0 : null
            }, ce = function (t, e, i) {
                var r = [], a = 0, s = t.length;
                if (i !== n) for (; s > a; a++) t[a] && t[a][e] && r.push(t[a][e][i]); else for (; s > a; a++) t[a] && r.push(t[a][e]);
                return r
            }, ue = function (t, e, i, r) {
                var a = [], s = 0, o = e.length;
                if (r !== n) for (; o > s; s++) t[e[s]][i] && a.push(t[e[s]][i][r]); else for (; o > s; s++) a.push(t[e[s]][i]);
                return a
            }, he = function (t, e) {
                var i, r = [];
                e === n ? (e = 0, i = t) : (i = e, e = t);
                for (var a = e; i > a; a++) r.push(a);
                return r
            }, pe = function (t) {
                for (var e = [], i = 0, n = t.length; n > i; i++) t[i] && e.push(t[i]);
                return e
            }, fe = function (t) {
                return t.replace(Jt, "")
            }, me = function (t) {
                var e, i, n, r = [], a = t.length, s = 0;
                t:for (i = 0; a > i; i++) {
                    for (e = t[i], n = 0; s > n; n++) if (r[n] === e) continue t;
                    r.push(e), s++
                }
                return r
            }, ge = function (t, e, i) {
                t[e] !== n && (t[i] = t[e])
            }, ve = /\[.*?\]$/, be = /\(\)$/, ye = t("<div>")[0], we = ye.textContent !== n, Se = /<.*?>/g;
        zt = function (e) {
            this.$ = function (t, e) {
                return this.api(!0).$(t, e)
            }, this._ = function (t, e) {
                return this.api(!0).rows(t, e).data()
            }, this.api = function (t) {
                return new Gt(t ? $t(this[qt.iApiIndex]) : this)
            }, this.fnAddData = function (e, i) {
                var r = this.api(!0),
                    a = t.isArray(e) && (t.isArray(e[0]) || t.isPlainObject(e[0])) ? r.rows.add(e) : r.row.add(e);
                return (i === n || i) && r.draw(), a.flatten().toArray()
            }, this.fnAdjustColumnSizing = function (t) {
                var e = this.api(!0).columns.adjust(), i = e.settings()[0], r = i.oScroll;
                t === n || t ? e.draw(!1) : "" === r.sX && "" === r.sY || gt(i)
            }, this.fnClearTable = function (t) {
                var e = this.api(!0).clear();
                (t === n || t) && e.draw()
            }, this.fnClose = function (t) {
                this.api(!0).row(t).child.hide()
            }, this.fnDeleteRow = function (t, e, i) {
                var r = this.api(!0), a = r.rows(t), s = a.settings()[0], o = s.aoData[a[0][0]];
                return a.remove(), e && e.call(this, s, o), (i === n || i) && r.draw(), o
            }, this.fnDestroy = function (t) {
                this.api(!0).destroy(t)
            }, this.fnDraw = function (t) {
                this.api(!0).draw(t)
            }, this.fnFilter = function (t, e, i, r, a, s) {
                var o = this.api(!0);
                null === e || e === n ? o.search(t, i, r, s) : o.column(e).search(t, i, r, s), o.draw()
            }, this.fnGetData = function (t, e) {
                var i = this.api(!0);
                if (t !== n) {
                    var r = t.nodeName ? t.nodeName.toLowerCase() : "";
                    return e !== n || "td" == r || "th" == r ? i.cell(t, e).data() : i.row(t).data() || null
                }
                return i.data().toArray()
            }, this.fnGetNodes = function (t) {
                var e = this.api(!0);
                return t !== n ? e.row(t).node() : e.rows().nodes().flatten().toArray()
            }, this.fnGetPosition = function (t) {
                var e = this.api(!0), i = t.nodeName.toUpperCase();
                if ("TR" == i) return e.row(t).index();
                if ("TD" == i || "TH" == i) {
                    var n = e.cell(t).index();
                    return [n.row, n.columnVisible, n.column]
                }
                return null
            }, this.fnIsOpen = function (t) {
                return this.api(!0).row(t).child.isShown()
            }, this.fnOpen = function (t, e, i) {
                return this.api(!0).row(t).child(e, i).show().child()[0]
            }, this.fnPageChange = function (t, e) {
                var i = this.api(!0).page(t);
                (e === n || e) && i.draw(!1)
            }, this.fnSetColumnVis = function (t, e, i) {
                var r = this.api(!0).column(t).visible(e);
                (i === n || i) && r.columns.adjust().draw()
            }, this.fnSettings = function () {
                return $t(this[qt.iApiIndex])
            }, this.fnSort = function (t) {
                this.api(!0).order(t).draw()
            }, this.fnSortListener = function (t, e, i) {
                this.api(!0).order.listener(t, e, i)
            }, this.fnUpdate = function (t, e, i, r, a) {
                var s = this.api(!0);
                return i === n || null === i ? s.row(e).data(t) : s.cell(e, i).data(t), (a === n || a) && s.columns.adjust(), (r === n || r) && s.draw(), 0
            }, this.fnVersionCheck = qt.fnVersionCheck;
            var i = this, r = e === n, c = this.length;
            r && (e = {}), this.oApi = this.internal = qt.internal;
            for (var p in zt.ext.internal) p && (this[p] = Bt(p));
            return this.each(function () {
                var p, f = {}, m = c > 1 ? Vt(f, e, !0) : e, g = 0, v = this.getAttribute("id"), b = !1,
                    _ = zt.defaults, x = t(this);
                if ("table" != this.nodeName.toLowerCase()) return void Lt(null, 0, "Non-table node initialisation (" + this.nodeName + ")", 2);
                o(_), l(_.column), a(_, _, !0), a(_.column, _.column, !0), a(_, t.extend(m, x.data()));
                var D = zt.settings;
                for (g = 0, p = D.length; p > g; g++) {
                    var T = D[g];
                    if (T.nTable == this || T.nTHead.parentNode == this || T.nTFoot && T.nTFoot.parentNode == this) {
                        var C = m.bRetrieve !== n ? m.bRetrieve : _.bRetrieve,
                            k = m.bDestroy !== n ? m.bDestroy : _.bDestroy;
                        if (r || C) return T.oInstance;
                        if (k) {
                            T.oInstance.fnDestroy();
                            break
                        }
                        return void Lt(T, 0, "Cannot reinitialise DataTable", 3)
                    }
                    if (T.sTableId == this.id) {
                        D.splice(g, 1);
                        break
                    }
                }
                null !== v && "" !== v || (v = "DataTables_Table_" + zt.ext._unique++, this.id = v);
                var I = t.extend(!0, {}, zt.models.oSettings, {
                    sDestroyWidth: x[0].style.width,
                    sInstance: v,
                    sTableId: v
                });
                I.nTable = this, I.oApi = i.internal, I.oInit = m, D.push(I), I.oInstance = 1 === i.length ? i : x.dataTable(), o(m), m.oLanguage && s(m.oLanguage), m.aLengthMenu && !m.iDisplayLength && (m.iDisplayLength = t.isArray(m.aLengthMenu[0]) ? m.aLengthMenu[0][0] : m.aLengthMenu[0]), m = Vt(t.extend(!0, {}, _), m), Ot(I.oFeatures, m, ["bPaginate", "bLengthChange", "bFilter", "bSort", "bSortMulti", "bInfo", "bProcessing", "bAutoWidth", "bSortClasses", "bServerSide", "bDeferRender"]), Ot(I, m, ["asStripeClasses", "ajax", "fnServerData", "fnFormatNumber", "sServerMethod", "aaSorting", "aaSortingFixed", "aLengthMenu", "sPaginationType", "sAjaxSource", "sAjaxDataProp", "iStateDuration", "sDom", "bSortCellsTop", "iTabIndex", "fnStateLoadCallback", "fnStateSaveCallback", "renderer", "searchDelay", "rowId", ["iCookieDuration", "iStateDuration"], ["oSearch", "oPreviousSearch"], ["aoSearchCols", "aoPreSearchCols"], ["iDisplayLength", "_iDisplayLength"], ["bJQueryUI", "bJUI"]]), Ot(I.oScroll, m, [["sScrollX", "sX"], ["sScrollXInner", "sXInner"], ["sScrollY", "sY"], ["bScrollCollapse", "bCollapse"]]), Ot(I.oLanguage, m, "fnInfoCallback"), Ht(I, "aoDrawCallback", m.fnDrawCallback, "user"), Ht(I, "aoServerParams", m.fnServerParams, "user"), Ht(I, "aoStateSaveParams", m.fnStateSaveParams, "user"), Ht(I, "aoStateLoadParams", m.fnStateLoadParams, "user"), Ht(I, "aoStateLoaded", m.fnStateLoaded, "user"), Ht(I, "aoRowCallback", m.fnRowCallback, "user"), Ht(I, "aoRowCreatedCallback", m.fnCreatedRow, "user"), Ht(I, "aoHeaderCallback", m.fnHeaderCallback, "user"), Ht(I, "aoFooterCallback", m.fnFooterCallback, "user"), Ht(I, "aoInitComplete", m.fnInitComplete, "user"), Ht(I, "aoPreDrawCallback", m.fnPreDrawCallback, "user"), I.rowIdFn = A(m.rowId), d(I);
                var M = I.oClasses;
                if (m.bJQueryUI ? (t.extend(M, zt.ext.oJUIClasses, m.oClasses), m.sDom === _.sDom && "lfrtip" === _.sDom && (I.sDom = '<"H"lfr>t<"F"ip>'), I.renderer ? t.isPlainObject(I.renderer) && !I.renderer.header && (I.renderer.header = "jqueryui") : I.renderer = "jqueryui") : t.extend(M, zt.ext.classes, m.oClasses), x.addClass(M.sTable), I.iInitDisplayStart === n && (I.iInitDisplayStart = m.iDisplayStart, I._iDisplayStart = m.iDisplayStart), null !== m.iDeferLoading) {
                    I.bDeferLoading = !0;
                    var F = t.isArray(m.iDeferLoading);
                    I._iRecordsDisplay = F ? m.iDeferLoading[0] : m.iDeferLoading, I._iRecordsTotal = F ? m.iDeferLoading[1] : m.iDeferLoading
                }
                var E = I.oLanguage;
                t.extend(!0, E, m.oLanguage), "" !== E.sUrl && (t.ajax({
                    dataType: "json",
                    url: E.sUrl,
                    success: function (e) {
                        s(e), a(_.oLanguage, e), t.extend(!0, E, e), ot(I)
                    },
                    error: function () {
                        ot(I)
                    }
                }), b = !0), null === m.asStripeClasses && (I.asStripeClasses = [M.sStripeOdd, M.sStripeEven]);
                var $ = I.asStripeClasses, L = x.children("tbody").find("tr").eq(0);
                -1 !== t.inArray(!0, t.map($, function (t, e) {
                    return L.hasClass(t)
                })) && (t("tbody tr", this).removeClass($.join(" ")), I.asDestroyStripes = $.slice());
                var O, V = [], P = this.getElementsByTagName("thead");
                if (0 !== P.length && (U(I.aoHeader, P[0]), V = Y(I)), null === m.aoColumns) for (O = [], g = 0, p = V.length; p > g; g++) O.push(null); else O = m.aoColumns;
                for (g = 0, p = O.length; p > g; g++) u(I, V ? V[g] : null);
                if (y(I, m.aoColumnDefs, O, function (t, e) {
                        h(I, t, e)
                    }), L.length) {
                    var H = function (t, e) {
                        return null !== t.getAttribute("data-" + e) ? e : null
                    };
                    t(L[0]).children("th, td").each(function (t, e) {
                        var i = I.aoColumns[t];
                        if (i.mData === t) {
                            var r = H(e, "sort") || H(e, "order"), a = H(e, "filter") || H(e, "search");
                            null === r && null === a || (i.mData = {
                                _: t + ".display",
                                sort: null !== r ? t + ".@data-" + r : n,
                                type: null !== r ? t + ".@data-" + r : n,
                                filter: null !== a ? t + ".@data-" + a : n
                            }, h(I, t))
                        }
                    })
                }
                var R = I.oFeatures;
                if (m.bStateSave && (R.bStateSave = !0, Et(I, m), Ht(I, "aoDrawCallback", Ft, "state_save")), m.aaSorting === n) {
                    var N = I.aaSorting;
                    for (g = 0, p = N.length; p > g; g++) N[g][1] = I.aoColumns[g].asSorting[0]
                }
                It(I), R.bSort && Ht(I, "aoDrawCallback", function () {
                    if (I.bSorted) {
                        var e = Dt(I), i = {};
                        t.each(e, function (t, e) {
                            i[e.src] = e.dir
                        }), Rt(I, null, "order", [I, e, i]), Ct(I)
                    }
                }), Ht(I, "aoDrawCallback", function () {
                    (I.bSorted || "ssp" === Yt(I) || R.bDeferRender) && It(I)
                }, "sc");
                var j = x.children("caption").each(function () {
                    this._captionSide = x.css("caption-side")
                }), W = x.children("thead");
                0 === W.length && (W = t("<thead/>").appendTo(this)), I.nTHead = W[0];
                var B = x.children("tbody");
                0 === B.length && (B = t("<tbody/>").appendTo(this)), I.nTBody = B[0];
                var z = x.children("tfoot");
                if (0 === z.length && j.length > 0 && ("" !== I.oScroll.sX || "" !== I.oScroll.sY) && (z = t("<tfoot/>").appendTo(this)), 0 === z.length || 0 === z.children().length ? x.addClass(M.sNoFooter) : z.length > 0 && (I.nTFoot = z[0], U(I.aoFooter, I.nTFoot)), m.aaData) for (g = 0; g < m.aaData.length; g++) w(I, m.aaData[g]); else (I.bDeferLoading || "dom" == Yt(I)) && S(I, t(I.nTBody).children("tr"));
                I.aiDisplay = I.aiDisplayMaster.slice(), I.bInitialised = !0, b === !1 && ot(I)
            }), i = null, this
        };
        var _e = [], xe = Array.prototype, De = function (e) {
            var i, n, r = zt.settings, a = t.map(r, function (t, e) {
                return t.nTable
            });
            return e ? e.nTable && e.oApi ? [e] : e.nodeName && "table" === e.nodeName.toLowerCase() ? (i = t.inArray(e, a), -1 !== i ? [r[i]] : null) : e && "function" == typeof e.settings ? e.settings().toArray() : ("string" == typeof e ? n = t(e) : e instanceof t && (n = e), n ? n.map(function (e) {
                return i = t.inArray(this, a), -1 !== i ? r[i] : null
            }).toArray() : void 0) : []
        };
        Gt = function (e, i) {
            if (!(this instanceof Gt)) return new Gt(e, i);
            var n = [], r = function (t) {
                var e = De(t);
                e && (n = n.concat(e))
            };
            if (t.isArray(e)) for (var a = 0, s = e.length; s > a; a++) r(e[a]); else r(e);
            this.context = me(n), i && t.merge(this, i), this.selector = {
                rows: null,
                cols: null,
                opts: null
            }, Gt.extend(this, this, _e)
        }, zt.Api = Gt, t.extend(Gt.prototype, {
            any: function () {
                return 0 !== this.count()
            },
            concat: xe.concat,
            context: [],
            count: function () {
                return this.flatten().length
            },
            each: function (t) {
                for (var e = 0, i = this.length; i > e; e++) t.call(this, this[e], e, this);
                return this
            },
            eq: function (t) {
                var e = this.context;
                return e.length > t ? new Gt(e[t], this[t]) : null
            },
            filter: function (t) {
                var e = [];
                if (xe.filter) e = xe.filter.call(this, t, this); else for (var i = 0, n = this.length; n > i; i++) t.call(this, this[i], i, this) && e.push(this[i]);
                return new Gt(this.context, e)
            },
            flatten: function () {
                var t = [];
                return new Gt(this.context, t.concat.apply(t, this.toArray()))
            },
            join: xe.join,
            indexOf: xe.indexOf || function (t, e) {
                for (var i = e || 0, n = this.length; n > i; i++) if (this[i] === t) return i;
                return -1
            },
            iterator: function (t, e, i, r) {
                var a, s, o, l, d, c, u, h, p = [], f = this.context, m = this.selector;
                for ("string" == typeof t && (r = i, i = e, e = t, t = !1), s = 0, o = f.length; o > s; s++) {
                    var g = new Gt(f[s]);
                    if ("table" === e) a = i.call(g, f[s], s), a !== n && p.push(a); else if ("columns" === e || "rows" === e) a = i.call(g, f[s], this[s], s), a !== n && p.push(a); else if ("column" === e || "column-rows" === e || "row" === e || "cell" === e) for (u = this[s], "column-rows" === e && (c = Me(f[s], m.opts)), l = 0, d = u.length; d > l; l++) h = u[l], a = "cell" === e ? i.call(g, f[s], h.row, h.column, s, l) : i.call(g, f[s], h, s, l, c), a !== n && p.push(a)
                }
                if (p.length || r) {
                    var v = new Gt(f, t ? p.concat.apply([], p) : p), b = v.selector;
                    return b.rows = m.rows, b.cols = m.cols, b.opts = m.opts, v
                }
                return this
            },
            lastIndexOf: xe.lastIndexOf || function (t, e) {
                return this.indexOf.apply(this.toArray.reverse(), arguments)
            },
            length: 0,
            map: function (t) {
                var e = [];
                if (xe.map) e = xe.map.call(this, t, this); else for (var i = 0, n = this.length; n > i; i++) e.push(t.call(this, this[i], i));
                return new Gt(this.context, e)
            },
            pluck: function (t) {
                return this.map(function (e) {
                    return e[t]
                })
            },
            pop: xe.pop,
            push: xe.push,
            reduce: xe.reduce || function (t, e) {
                return c(this, t, e, 0, this.length, 1)
            },
            reduceRight: xe.reduceRight || function (t, e) {
                return c(this, t, e, this.length - 1, -1, -1)
            },
            reverse: xe.reverse,
            selector: null,
            shift: xe.shift,
            sort: xe.sort,
            splice: xe.splice,
            toArray: function () {
                return xe.slice.call(this)
            },
            to$: function () {
                return t(this)
            },
            toJQuery: function () {
                return t(this)
            },
            unique: function () {
                return new Gt(this.context, me(this))
            },
            unshift: xe.unshift
        }), Gt.extend = function (e, i, n) {
            if (n.length && i && (i instanceof Gt || i.__dt_wrapper)) {
                var r, a, s, o = function (t, e, i) {
                    return function () {
                        var n = e.apply(t, arguments);
                        return Gt.extend(n, n, i.methodExt), n
                    }
                };
                for (r = 0, a = n.length; a > r; r++) s = n[r], i[s.name] = "function" == typeof s.val ? o(e, s.val, s) : t.isPlainObject(s.val) ? {} : s.val, i[s.name].__dt_wrapper = !0, Gt.extend(e, i[s.name], s.propExt)
            }
        }, Gt.register = Zt = function (e, i) {
            if (t.isArray(e)) for (var n = 0, r = e.length; r > n; n++) Gt.register(e[n], i); else {
                var a, s, o, l, d = e.split("."), c = _e, u = function (t, e) {
                    for (var i = 0, n = t.length; n > i; i++) if (t[i].name === e) return t[i];
                    return null
                };
                for (a = 0, s = d.length; s > a; a++) {
                    l = -1 !== d[a].indexOf("()"), o = l ? d[a].replace("()", "") : d[a];
                    var h = u(c, o);
                    h || (h = {
                        name: o,
                        val: {},
                        methodExt: [],
                        propExt: []
                    }, c.push(h)), a === s - 1 ? h.val = i : c = l ? h.methodExt : h.propExt
                }
            }
        }, Gt.registerPlural = Xt = function (e, i, r) {
            Gt.register(e, r), Gt.register(i, function () {
                var e = r.apply(this, arguments);
                return e === this ? this : e instanceof Gt ? e.length ? t.isArray(e[0]) ? new Gt(e.context, e[0]) : e[0] : n : e
            })
        };
        var Te = function (e, i) {
            if ("number" == typeof e) return [i[e]];
            var n = t.map(i, function (t, e) {
                return t.nTable
            });
            return t(n).filter(e).map(function (e) {
                var r = t.inArray(this, n);
                return i[r]
            }).toArray()
        };
        Zt("tables()", function (t) {
            return t ? new Gt(Te(t, this.context)) : this
        }), Zt("table()", function (t) {
            var e = this.tables(t), i = e.context;
            return i.length ? new Gt(i[0]) : e
        }), Xt("tables().nodes()", "table().node()", function () {
            return this.iterator("table", function (t) {
                return t.nTable
            }, 1)
        }), Xt("tables().body()", "table().body()", function () {
            return this.iterator("table", function (t) {
                return t.nTBody
            }, 1)
        }), Xt("tables().header()", "table().header()", function () {
            return this.iterator("table", function (t) {
                return t.nTHead
            }, 1)
        }), Xt("tables().footer()", "table().footer()", function () {
            return this.iterator("table", function (t) {
                return t.nTFoot
            }, 1)
        }), Xt("tables().containers()", "table().container()", function () {
            return this.iterator("table", function (t) {
                return t.nTableWrapper
            }, 1)
        }), Zt("draw()", function (t) {
            return this.iterator("table", function (e) {
                "page" === t ? H(e) : ("string" == typeof t && (t = "full-hold" !== t), R(e, t === !1))
            })
        }), Zt("page()", function (t) {
            return t === n ? this.page.info().page : this.iterator("table", function (e) {
                ht(e, t)
            })
        }), Zt("page.info()", function (t) {
            if (0 === this.context.length) return n;
            var e = this.context[0], i = e._iDisplayStart, r = e.oFeatures.bPaginate ? e._iDisplayLength : -1,
                a = e.fnRecordsDisplay(), s = -1 === r;
            return {
                page: s ? 0 : Math.floor(i / r),
                pages: s ? 1 : Math.ceil(a / r),
                start: i,
                end: e.fnDisplayEnd(),
                length: r,
                recordsTotal: e.fnRecordsTotal(),
                recordsDisplay: a,
                serverSide: "ssp" === Yt(e)
            }
        }), Zt("page.len()", function (t) {
            return t === n ? 0 !== this.context.length ? this.context[0]._iDisplayLength : n : this.iterator("table", function (e) {
                dt(e, t)
            })
        });
        var Ce = function (t, e, i) {
            if (i) {
                var n = new Gt(t);
                n.one("draw", function () {
                    i(n.ajax.json())
                })
            }
            if ("ssp" == Yt(t)) R(t, e); else {
                ft(t, !0);
                var r = t.jqXHR;
                r && 4 !== r.readyState && r.abort(), j(t, [], function (i) {
                    M(t);
                    for (var n = q(t, i), r = 0, a = n.length; a > r; r++) w(t, n[r]);
                    R(t, e), ft(t, !1)
                })
            }
        };
        Zt("ajax.json()", function () {
            var t = this.context;
            return t.length > 0 ? t[0].json : void 0
        }), Zt("ajax.params()", function () {
            var t = this.context;
            return t.length > 0 ? t[0].oAjaxData : void 0
        }), Zt("ajax.reload()", function (t, e) {
            return this.iterator("table", function (i) {
                Ce(i, e === !1, t)
            })
        }), Zt("ajax.url()", function (e) {
            var i = this.context;
            return e === n ? 0 === i.length ? n : (i = i[0], i.ajax ? t.isPlainObject(i.ajax) ? i.ajax.url : i.ajax : i.sAjaxSource) : this.iterator("table", function (i) {
                t.isPlainObject(i.ajax) ? i.ajax.url = e : i.ajax = e
            })
        }), Zt("ajax.url().load()", function (t, e) {
            return this.iterator("table", function (i) {
                Ce(i, e === !1, t)
            })
        });
        var Ae = function (e, i, r, a, s) {
            var o, l, d, c, u, h, p = [], f = typeof i;
            for (i && "string" !== f && "function" !== f && i.length !== n || (i = [i]), d = 0, c = i.length; c > d; d++) for (l = i[d] && i[d].split ? i[d].split(",") : [i[d]], u = 0, h = l.length; h > u; u++) o = r("string" == typeof l[u] ? t.trim(l[u]) : l[u]), o && o.length && (p = p.concat(o));
            var m = qt.selector[e];
            if (m.length) for (d = 0, c = m.length; c > d; d++) p = m[d](a, s, p);
            return me(p)
        }, ke = function (e) {
            return e || (e = {}), e.filter && e.search === n && (e.search = e.filter), t.extend({
                search: "none",
                order: "current",
                page: "all"
            }, e)
        }, Ie = function (t) {
            for (var e = 0, i = t.length; i > e; e++) if (t[e].length > 0) return t[0] = t[e], t[0].length = 1, t.length = 1, t.context = [t.context[e]], t;
            return t.length = 0, t
        }, Me = function (e, i) {
            var n, r, a, s = [], o = e.aiDisplay, l = e.aiDisplayMaster, d = i.search, c = i.order, u = i.page;
            if ("ssp" == Yt(e)) return "removed" === d ? [] : he(0, l.length);
            if ("current" == u) for (n = e._iDisplayStart, r = e.fnDisplayEnd(); r > n; n++) s.push(o[n]); else if ("current" == c || "applied" == c) s = "none" == d ? l.slice() : "applied" == d ? o.slice() : t.map(l, function (e, i) {
                return -1 === t.inArray(e, o) ? e : null
            }); else if ("index" == c || "original" == c) for (n = 0, r = e.aoData.length; r > n; n++) "none" == d ? s.push(n) : (a = t.inArray(n, o), (-1 === a && "removed" == d || a >= 0 && "applied" == d) && s.push(n));
            return s
        }, Fe = function (e, i, r) {
            var a = function (i) {
                var a = ae(i);
                if (null !== a && !r) return [a];
                var s = Me(e, r);
                if (null !== a && -1 !== t.inArray(a, s)) return [a];
                if (!i) return s;
                if ("function" == typeof i) return t.map(s, function (t) {
                    var n = e.aoData[t];
                    return i(t, n._aData, n.nTr) ? t : null
                });
                var o = pe(ue(e.aoData, s, "nTr"));
                if (i.nodeName && -1 !== t.inArray(i, o)) return [i._DT_RowIndex];
                if ("string" == typeof i && "#" === i.charAt(0)) {
                    var l = e.aIds[i.replace(/^#/, "")];
                    if (l !== n) return [l.idx]
                }
                return t(o).filter(i).map(function () {
                    return this._DT_RowIndex
                }).toArray()
            };
            return Ae("row", i, a, e, r)
        };
        Zt("rows()", function (e, i) {
            e === n ? e = "" : t.isPlainObject(e) && (i = e, e = ""), i = ke(i);
            var r = this.iterator("table", function (t) {
                return Fe(t, e, i)
            }, 1);
            return r.selector.rows = e, r.selector.opts = i, r
        }), Zt("rows().nodes()", function () {
            return this.iterator("row", function (t, e) {
                return t.aoData[e].nTr || n
            }, 1)
        }), Zt("rows().data()", function () {
            return this.iterator(!0, "rows", function (t, e) {
                return ue(t.aoData, e, "_aData")
            }, 1)
        }), Xt("rows().cache()", "row().cache()", function (t) {
            return this.iterator("row", function (e, i) {
                var n = e.aoData[i];
                return "search" === t ? n._aFilterData : n._aSortData
            }, 1)
        }), Xt("rows().invalidate()", "row().invalidate()", function (t) {
            return this.iterator("row", function (e, i) {
                E(e, i, t)
            })
        }), Xt("rows().indexes()", "row().index()", function () {
            return this.iterator("row", function (t, e) {
                return e
            }, 1)
        }), Xt("rows().ids()", "row().id()", function (t) {
            for (var e = [], i = this.context, n = 0, r = i.length; r > n; n++) for (var a = 0, s = this[n].length; s > a; a++) {
                var o = i[n].rowIdFn(i[n].aoData[this[n][a]]._aData);
                e.push((t === !0 ? "#" : "") + o)
            }
            return new Gt(i, e)
        }), Xt("rows().remove()", "row().remove()", function () {
            var t = this;
            return this.iterator("row", function (e, i, r) {
                var a, s, o, l, d, c, u = e.aoData, h = u[i];
                for (u.splice(i, 1), a = 0, s = u.length; s > a; a++) if (d = u[a], c = d.anCells, null !== d.nTr && (d.nTr._DT_RowIndex = a), null !== c) for (o = 0, l = c.length; l > o; o++) c[o]._DT_CellIndex.row = a;
                F(e.aiDisplayMaster, i), F(e.aiDisplay, i), F(t[r], i, !1), Nt(e);
                var p = e.rowIdFn(h._aData);
                p !== n && delete e.aIds[p]
            }), this.iterator("table", function (t) {
                for (var e = 0, i = t.aoData.length; i > e; e++) t.aoData[e].idx = e
            }), this
        }), Zt("rows.add()", function (e) {
            var i = this.iterator("table", function (t) {
                var i, n, r, a = [];
                for (n = 0, r = e.length; r > n; n++) i = e[n], i.nodeName && "TR" === i.nodeName.toUpperCase() ? a.push(S(t, i)[0]) : a.push(w(t, i));
                return a
            }, 1), n = this.rows(-1);
            return n.pop(), t.merge(n, i), n
        }), Zt("row()", function (t, e) {
            return Ie(this.rows(t, e))
        }), Zt("row().data()", function (t) {
            var e = this.context;
            return t === n ? e.length && this.length ? e[0].aoData[this[0]]._aData : n : (e[0].aoData[this[0]]._aData = t, E(e[0], this[0], "data"), this)
        }), Zt("row().node()", function () {
            var t = this.context;
            return t.length && this.length ? t[0].aoData[this[0]].nTr || null : null
        }), Zt("row.add()", function (e) {
            e instanceof t && e.length && (e = e[0]);
            var i = this.iterator("table", function (t) {
                return e.nodeName && "TR" === e.nodeName.toUpperCase() ? S(t, e)[0] : w(t, e)
            });
            return this.row(i[0])
        });
        var Ee = function (e, i, n, r) {
            var a = [], s = function (i, n) {
                if (t.isArray(i) || i instanceof t) for (var r = 0, o = i.length; o > r; r++) s(i[r], n); else if (i.nodeName && "tr" === i.nodeName.toLowerCase()) a.push(i); else {
                    var l = t("<tr><td/></tr>").addClass(n);
                    t("td", l).addClass(n).html(i)[0].colSpan = g(e), a.push(l[0])
                }
            };
            s(n, r), i._details && i._details.remove(), i._details = t(a), i._detailsShow && i._details.insertAfter(i.nTr)
        }, $e = function (t, e) {
            var i = t.context;
            if (i.length) {
                var r = i[0].aoData[e !== n ? e : t[0]];
                r && r._details && (r._details.remove(), r._detailsShow = n, r._details = n)
            }
        }, Le = function (t, e) {
            var i = t.context;
            if (i.length && t.length) {
                var n = i[0].aoData[t[0]];
                n._details && (n._detailsShow = e, e ? n._details.insertAfter(n.nTr) : n._details.detach(), Oe(i[0]))
            }
        }, Oe = function (t) {
            var e = new Gt(t), i = ".dt.DT_details", n = "draw" + i, r = "column-visibility" + i, a = "destroy" + i,
                s = t.aoData;
            e.off(n + " " + r + " " + a), ce(s, "_details").length > 0 && (e.on(n, function (i, n) {
                t === n && e.rows({page: "current"}).eq(0).each(function (t) {
                    var e = s[t];
                    e._detailsShow && e._details.insertAfter(e.nTr)
                })
            }), e.on(r, function (e, i, n, r) {
                if (t === i) for (var a, o = g(i), l = 0, d = s.length; d > l; l++) a = s[l], a._details && a._details.children("td[colspan]").attr("colspan", o)
            }), e.on(a, function (i, n) {
                if (t === n) for (var r = 0, a = s.length; a > r; r++) s[r]._details && $e(e, r)
            }))
        }, Ve = "", Pe = Ve + "row().child", He = Pe + "()";
        Zt(He, function (t, e) {
            var i = this.context;
            return t === n ? i.length && this.length ? i[0].aoData[this[0]]._details : n : (t === !0 ? this.child.show() : t === !1 ? $e(this) : i.length && this.length && Ee(i[0], i[0].aoData[this[0]], t, e), this)
        }), Zt([Pe + ".show()", He + ".show()"], function (t) {
            return Le(this, !0), this
        }), Zt([Pe + ".hide()", He + ".hide()"], function () {
            return Le(this, !1), this
        }), Zt([Pe + ".remove()", He + ".remove()"], function () {
            return $e(this), this
        }), Zt(Pe + ".isShown()", function () {
            var t = this.context;
            return t.length && this.length ? t[0].aoData[this[0]]._detailsShow || !1 : !1
        });
        var Re = /^(.+):(name|visIdx|visible)$/, Ne = function (t, e, i, n, r) {
            for (var a = [], s = 0, o = r.length; o > s; s++) a.push(D(t, r[s], e));
            return a
        }, Ue = function (e, i, n) {
            var r = e.aoColumns, a = ce(r, "sName"), s = ce(r, "nTh"), o = function (i) {
                var o = ae(i);
                if ("" === i) return he(r.length);
                if (null !== o) return [o >= 0 ? o : r.length + o];
                if ("function" == typeof i) {
                    var l = Me(e, n);
                    return t.map(r, function (t, n) {
                        return i(n, Ne(e, n, 0, 0, l), s[n]) ? n : null
                    })
                }
                var d = "string" == typeof i ? i.match(Re) : "";
                if (!d) return t(s).filter(i).map(function () {
                    return t.inArray(this, s)
                }).toArray();
                switch (d[2]) {
                    case"visIdx":
                    case"visible":
                        var c = parseInt(d[1], 10);
                        if (0 > c) {
                            var u = t.map(r, function (t, e) {
                                return t.bVisible ? e : null
                            });
                            return [u[u.length + c]]
                        }
                        return [f(e, c)];
                    case"name":
                        return t.map(a, function (t, e) {
                            return t === d[1] ? e : null
                        })
                }
            };
            return Ae("column", i, o, e, n)
        }, Ye = function (e, i, r, a) {
            var s, o, l, d, c = e.aoColumns, u = c[i], h = e.aoData;
            if (r === n) return u.bVisible;
            if (u.bVisible !== r) {
                if (r) {
                    var f = t.inArray(!0, ce(c, "bVisible"), i + 1);
                    for (o = 0, l = h.length; l > o; o++) d = h[o].nTr, s = h[o].anCells, d && d.insertBefore(s[i], s[f] || null)
                } else t(ce(e.aoData, "anCells", i)).detach();
                u.bVisible = r, P(e, e.aoHeader), P(e, e.aoFooter), (a === n || a) && (p(e), (e.oScroll.sX || e.oScroll.sY) && gt(e)), Rt(e, null, "column-visibility", [e, i, r, a]), Ft(e)
            }
        };
        Zt("columns()", function (e, i) {
            e === n ? e = "" : t.isPlainObject(e) && (i = e, e = ""), i = ke(i);
            var r = this.iterator("table", function (t) {
                return Ue(t, e, i)
            }, 1);
            return r.selector.cols = e, r.selector.opts = i, r
        }), Xt("columns().header()", "column().header()", function (t, e) {
            return this.iterator("column", function (t, e) {
                return t.aoColumns[e].nTh
            }, 1)
        }), Xt("columns().footer()", "column().footer()", function (t, e) {
            return this.iterator("column", function (t, e) {
                return t.aoColumns[e].nTf
            }, 1)
        }), Xt("columns().data()", "column().data()", function () {
            return this.iterator("column-rows", Ne, 1)
        }), Xt("columns().dataSrc()", "column().dataSrc()", function () {
            return this.iterator("column", function (t, e) {
                return t.aoColumns[e].mData
            }, 1)
        }), Xt("columns().cache()", "column().cache()", function (t) {
            return this.iterator("column-rows", function (e, i, n, r, a) {
                return ue(e.aoData, a, "search" === t ? "_aFilterData" : "_aSortData", i)
            }, 1)
        }), Xt("columns().nodes()", "column().nodes()", function () {
            return this.iterator("column-rows", function (t, e, i, n, r) {
                return ue(t.aoData, r, "anCells", e)
            }, 1)
        }), Xt("columns().visible()", "column().visible()", function (t, e) {
            return this.iterator("column", function (i, r) {
                return t === n ? i.aoColumns[r].bVisible : void Ye(i, r, t, e)
            })
        }), Xt("columns().indexes()", "column().index()", function (t) {
            return this.iterator("column", function (e, i) {
                return "visible" === t ? m(e, i) : i
            }, 1)
        }), Zt("columns.adjust()", function () {
            return this.iterator("table", function (t) {
                p(t)
            }, 1)
        }), Zt("column.index()", function (t, e) {
            if (0 !== this.context.length) {
                var i = this.context[0];
                if ("fromVisible" === t || "toData" === t) return f(i, e);
                if ("fromData" === t || "toVisible" === t) return m(i, e)
            }
        }), Zt("column()", function (t, e) {
            return Ie(this.columns(t, e))
        });
        var je = function (e, i, r) {
            var a, s, o, l, d, c, u, h = e.aoData, p = Me(e, r), f = pe(ue(h, p, "anCells")),
                m = t([].concat.apply([], f)), g = e.aoColumns.length, v = function (i) {
                    var r = "function" == typeof i;
                    if (null === i || i === n || r) {
                        for (s = [], o = 0, l = p.length; l > o; o++) for (a = p[o], d = 0; g > d; d++) c = {
                            row: a,
                            column: d
                        }, r ? (u = h[a], i(c, D(e, a, d), u.anCells ? u.anCells[d] : null) && s.push(c)) : s.push(c);
                        return s
                    }
                    return t.isPlainObject(i) ? [i] : m.filter(i).map(function (t, e) {
                        return {row: e._DT_CellIndex.row, column: e._DT_CellIndex.column}
                    }).toArray()
                };
            return Ae("cell", i, v, e, r)
        };
        Zt("cells()", function (e, i, r) {
            if (t.isPlainObject(e) && (e.row === n ? (r = e, e = null) : (r = i, i = null)), t.isPlainObject(i) && (r = i, i = null), null === i || i === n) return this.iterator("table", function (t) {
                return je(t, e, ke(r))
            });
            var a, s, o, l, d, c = this.columns(i, r), u = this.rows(e, r), h = this.iterator("table", function (t, e) {
                for (a = [], s = 0, o = u[e].length; o > s; s++) for (l = 0, d = c[e].length; d > l; l++) a.push({
                    row: u[e][s],
                    column: c[e][l]
                });
                return a
            }, 1);
            return t.extend(h.selector, {cols: i, rows: e, opts: r}), h
        }), Xt("cells().nodes()", "cell().node()", function () {
            return this.iterator("cell", function (t, e, i) {
                var r = t.aoData[e].anCells;
                return r ? r[i] : n
            }, 1)
        }), Zt("cells().data()", function () {
            return this.iterator("cell", function (t, e, i) {
                return D(t, e, i)
            }, 1)
        }), Xt("cells().cache()", "cell().cache()", function (t) {
            return t = "search" === t ? "_aFilterData" : "_aSortData", this.iterator("cell", function (e, i, n) {
                return e.aoData[i][t][n]
            }, 1)
        }), Xt("cells().render()", "cell().render()", function (t) {
            return this.iterator("cell", function (e, i, n) {
                return D(e, i, n, t)
            }, 1)
        }), Xt("cells().indexes()", "cell().index()", function () {
            return this.iterator("cell", function (t, e, i) {
                return {row: e, column: i, columnVisible: m(t, i)}
            }, 1)
        }), Xt("cells().invalidate()", "cell().invalidate()", function (t) {
            return this.iterator("cell", function (e, i, n) {
                E(e, i, t, n)
            })
        }), Zt("cell()", function (t, e, i) {
            return Ie(this.cells(t, e, i))
        }), Zt("cell().data()", function (t) {
            var e = this.context, i = this[0];
            return t === n ? e.length && i.length ? D(e[0], i[0].row, i[0].column) : n : (T(e[0], i[0].row, i[0].column, t), E(e[0], i[0].row, "data", i[0].column), this)
        }), Zt("order()", function (e, i) {
            var r = this.context;
            return e === n ? 0 !== r.length ? r[0].aaSorting : n : ("number" == typeof e ? e = [[e, i]] : t.isArray(e[0]) || (e = Array.prototype.slice.call(arguments)), this.iterator("table", function (t) {
                t.aaSorting = e.slice()
            }))
        }), Zt("order.listener()", function (t, e, i) {
            return this.iterator("table", function (n) {
                kt(n, t, e, i)
            })
        }), Zt("order.fixed()", function (e) {
            if (!e) {
                var i = this.context, r = i.length ? i[0].aaSortingFixed : n;
                return t.isArray(r) ? {pre: r} : r
            }
            return this.iterator("table", function (i) {
                i.aaSortingFixed = t.extend(!0, {}, e)
            })
        }), Zt(["columns().order()", "column().order()"], function (e) {
            var i = this;
            return this.iterator("table", function (n, r) {
                var a = [];
                t.each(i[r], function (t, i) {
                    a.push([i, e])
                }), n.aaSorting = a
            })
        }), Zt("search()", function (e, i, r, a) {
            var s = this.context;
            return e === n ? 0 !== s.length ? s[0].oPreviousSearch.sSearch : n : this.iterator("table", function (n) {
                n.oFeatures.bFilter && Z(n, t.extend({}, n.oPreviousSearch, {
                    sSearch: e + "",
                    bRegex: null === i ? !1 : i,
                    bSmart: null === r ? !0 : r,
                    bCaseInsensitive: null === a ? !0 : a
                }), 1)
            })
        }), Xt("columns().search()", "column().search()", function (e, i, r, a) {
            return this.iterator("column", function (s, o) {
                var l = s.aoPreSearchCols;
                return e === n ? l[o].sSearch : void(s.oFeatures.bFilter && (t.extend(l[o], {
                    sSearch: e + "",
                    bRegex: null === i ? !1 : i,
                    bSmart: null === r ? !0 : r,
                    bCaseInsensitive: null === a ? !0 : a
                }), Z(s, s.oPreviousSearch, 1)))
            })
        }), Zt("state()", function () {
            return this.context.length ? this.context[0].oSavedState : null
        }), Zt("state.clear()", function () {
            return this.iterator("table", function (t) {
                t.fnStateSaveCallback.call(t.oInstance, t, {})
            })
        }), Zt("state.loaded()", function () {
            return this.context.length ? this.context[0].oLoadedState : null
        }), Zt("state.save()", function () {
            return this.iterator("table", function (t) {
                Ft(t)
            })
        }), zt.versionCheck = zt.fnVersionCheck = function (t) {
            for (var e, i, n = zt.version.split("."), r = t.split("."), a = 0, s = r.length; s > a; a++) if (e = parseInt(n[a], 10) || 0, i = parseInt(r[a], 10) || 0, e !== i) return e > i;
            return !0
        }, zt.isDataTable = zt.fnIsDataTable = function (e) {
            var i = t(e).get(0), n = !1;
            return t.each(zt.settings, function (e, r) {
                var a = r.nScrollHead ? t("table", r.nScrollHead)[0] : null,
                    s = r.nScrollFoot ? t("table", r.nScrollFoot)[0] : null;
                r.nTable !== i && a !== i && s !== i || (n = !0)
            }), n
        }, zt.tables = zt.fnTables = function (e) {
            var i = !1;
            t.isPlainObject(e) && (i = e.api, e = e.visible);
            var n = t.map(zt.settings, function (i) {
                return !e || e && t(i.nTable).is(":visible") ? i.nTable : void 0
            });
            return i ? new Gt(n) : n
        }, zt.util = {throttle: yt, escapeRegex: tt}, zt.camelToHungarian = a, Zt("$()", function (e, i) {
            var n = this.rows(i).nodes(), r = t(n);
            return t([].concat(r.filter(e).toArray(), r.find(e).toArray()))
        }), t.each(["on", "one", "off"], function (e, i) {
            Zt(i + "()", function () {
                var e = Array.prototype.slice.call(arguments);
                e[0].match(/\.dt\b/) || (e[0] += ".dt");
                var n = t(this.tables().nodes());
                return n[i].apply(n, e), this
            })
        }), Zt("clear()", function () {
            return this.iterator("table", function (t) {
                M(t)
            })
        }), Zt("settings()", function () {
            return new Gt(this.context, this.context)
        }), Zt("init()", function () {
            var t = this.context;
            return t.length ? t[0].oInit : null
        }), Zt("data()", function () {
            return this.iterator("table", function (t) {
                return ce(t.aoData, "_aData")
            }).flatten()
        }), Zt("destroy()", function (i) {
            return i = i || !1, this.iterator("table", function (n) {
                var r, a = n.nTableWrapper.parentNode, s = n.oClasses, o = n.nTable, l = n.nTBody, d = n.nTHead,
                    c = n.nTFoot, u = t(o), h = t(l), p = t(n.nTableWrapper), f = t.map(n.aoData, function (t) {
                        return t.nTr
                    });
                n.bDestroying = !0, Rt(n, "aoDestroyCallback", "destroy", [n]), i || new Gt(n).columns().visible(!0), p.unbind(".DT").find(":not(tbody *)").unbind(".DT"), t(e).unbind(".DT-" + n.sInstance), o != d.parentNode && (u.children("thead").detach(), u.append(d)), c && o != c.parentNode && (u.children("tfoot").detach(), u.append(c)), n.aaSorting = [], n.aaSortingFixed = [], It(n), t(f).removeClass(n.asStripeClasses.join(" ")), t("th, td", d).removeClass(s.sSortable + " " + s.sSortableAsc + " " + s.sSortableDesc + " " + s.sSortableNone), n.bJUI && (t("th span." + s.sSortIcon + ", td span." + s.sSortIcon, d).detach(), t("th, td", d).each(function () {
                    var e = t("div." + s.sSortJUIWrapper, this);
                    t(this).append(e.contents()), e.detach()
                })), h.children().detach(), h.append(f);
                var m = i ? "remove" : "detach";
                u[m](), p[m](), !i && a && (a.insertBefore(o, n.nTableReinsertBefore), u.css("width", n.sDestroyWidth).removeClass(s.sTable), r = n.asDestroyStripes.length, r && h.children().each(function (e) {
                    t(this).addClass(n.asDestroyStripes[e % r])
                }));
                var g = t.inArray(n, zt.settings);
                -1 !== g && zt.settings.splice(g, 1)
            })
        }), t.each(["column", "row", "cell"], function (t, e) {
            Zt(e + "s().every()", function (t) {
                var i = this.selector.opts, r = this;
                return this.iterator(e, function (a, s, o, l, d) {
                    t.call(r[e](s, "cell" === e ? o : i, "cell" === e ? i : n), s, o, l, d)
                })
            })
        }), Zt("i18n()", function (e, i, r) {
            var a = this.context[0], s = A(e)(a.oLanguage);
            return s === n && (s = i), r !== n && t.isPlainObject(s) && (s = s[r] !== n ? s[r] : s._), s.replace("%d", r)
        }), zt.version = "1.10.10", zt.settings = [], zt.models = {}, zt.models.oSearch = {
            bCaseInsensitive: !0,
            sSearch: "",
            bRegex: !1,
            bSmart: !0
        }, zt.models.oRow = {
            nTr: null,
            anCells: null,
            _aData: [],
            _aSortData: null,
            _aFilterData: null,
            _sFilterRow: null,
            _sRowStripe: "",
            src: null,
            idx: -1
        }, zt.models.oColumn = {
            idx: null,
            aDataSort: null,
            asSorting: null,
            bSearchable: null,
            bSortable: null,
            bVisible: null,
            _sManualType: null,
            _bAttrSrc: !1,
            fnCreatedCell: null,
            fnGetData: null,
            fnSetData: null,
            mData: null,
            mRender: null,
            nTh: null,
            nTf: null,
            sClass: null,
            sContentPadding: null,
            sDefaultContent: null,
            sName: null,
            sSortDataType: "std",
            sSortingClass: null,
            sSortingClassJUI: null,
            sTitle: null,
            sType: null,
            sWidth: null,
            sWidthOrig: null
        }, zt.defaults = {
            aaData: null,
            aaSorting: [[0, "asc"]],
            aaSortingFixed: [],
            ajax: null,
            aLengthMenu: [10, 25, 50, 100],
            aoColumns: null,
            aoColumnDefs: null,
            aoSearchCols: [],
            asStripeClasses: null,
            bAutoWidth: !0,
            bDeferRender: !1,
            bDestroy: !1,
            bFilter: !0,
            bInfo: !0,
            bJQueryUI: !1,
            bLengthChange: !0,
            bPaginate: !0,
            bProcessing: !1,
            bRetrieve: !1,
            bScrollCollapse: !1,
            bServerSide: !1,
            bSort: !0,
            bSortMulti: !0,
            bSortCellsTop: !1,
            bSortClasses: !0,
            bStateSave: !1,
            fnCreatedRow: null,
            fnDrawCallback: null,
            fnFooterCallback: null,
            fnFormatNumber: function (t) {
                return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands)
            },
            fnHeaderCallback: null,
            fnInfoCallback: null,
            fnInitComplete: null,
            fnPreDrawCallback: null,
            fnRowCallback: null,
            fnServerData: null,
            fnServerParams: null,
            fnStateLoadCallback: function (t) {
                try {
                    return JSON.parse((-1 === t.iStateDuration ? sessionStorage : localStorage).getItem("DataTables_" + t.sInstance + "_" + location.pathname))
                } catch (e) {
                }
            },
            fnStateLoadParams: null,
            fnStateLoaded: null,
            fnStateSaveCallback: function (t, e) {
                try {
                    (-1 === t.iStateDuration ? sessionStorage : localStorage).setItem("DataTables_" + t.sInstance + "_" + location.pathname, JSON.stringify(e))
                } catch (i) {
                }
            },
            fnStateSaveParams: null,
            iStateDuration: 7200,
            iDeferLoading: null,
            iDisplayLength: 10,
            iDisplayStart: 0,
            iTabIndex: 0,
            oClasses: {},
            oLanguage: {
                oAria: {
                    sSortAscending: ": activate to sort column ascending",
                    sSortDescending: ": activate to sort column descending"
                },
                oPaginate: {sFirst: "First", sLast: "Last", sNext: "Next", sPrevious: "Previous"},
                sEmptyTable: "No data available in table",
                sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
                sInfoEmpty: "Showing 0 to 0 of 0 entries",
                sInfoFiltered: "(filtered from _MAX_ total entries)",
                sInfoPostFix: "",
                sDecimal: "",
                sThousands: ",",
                sLengthMenu: "Show _MENU_ entries",
                sLoadingRecords: "Loading...",
                sProcessing: "Processing...",
                sSearch: "Search:",
                sSearchPlaceholder: "",
                sUrl: "",
                sZeroRecords: "No matching records found"
            },
            oSearch: t.extend({}, zt.models.oSearch),
            sAjaxDataProp: "data",
            sAjaxSource: null,
            sDom: "lfrtip",
            searchDelay: null,
            sPaginationType: "simple_numbers",
            sScrollX: "",
            sScrollXInner: "",
            sScrollY: "",
            sServerMethod: "GET",
            renderer: null,
            rowId: "DT_RowId"
        }, r(zt.defaults), zt.defaults.column = {
            aDataSort: null,
            iDataSort: -1,
            asSorting: ["asc", "desc"],
            bSearchable: !0,
            bSortable: !0,
            bVisible: !0,
            fnCreatedCell: null,
            mData: null,
            mRender: null,
            sCellType: "td",
            sClass: "",
            sContentPadding: "",
            sDefaultContent: null,
            sName: "",
            sSortDataType: "std",
            sTitle: null,
            sType: null,
            sWidth: null
        }, r(zt.defaults.column), zt.models.oSettings = {
            oFeatures: {
                bAutoWidth: null,
                bDeferRender: null,
                bFilter: null,
                bInfo: null,
                bLengthChange: null,
                bPaginate: null,
                bProcessing: null,
                bServerSide: null,
                bSort: null,
                bSortMulti: null,
                bSortClasses: null,
                bStateSave: null
            },
            oScroll: {bCollapse: null, iBarWidth: 0, sX: null, sXInner: null, sY: null},
            oLanguage: {fnInfoCallback: null},
            oBrowser: {bScrollOversize: !1, bScrollbarLeft: !1, bBounding: !1, barWidth: 0},
            ajax: null,
            aanFeatures: [],
            aoData: [],
            aiDisplay: [],
            aiDisplayMaster: [],
            aIds: {},
            aoColumns: [],
            aoHeader: [],
            aoFooter: [],
            oPreviousSearch: {},
            aoPreSearchCols: [],
            aaSorting: null,
            aaSortingFixed: [],
            asStripeClasses: null,
            asDestroyStripes: [],
            sDestroyWidth: 0,
            aoRowCallback: [],
            aoHeaderCallback: [],
            aoFooterCallback: [],
            aoDrawCallback: [],
            aoRowCreatedCallback: [],
            aoPreDrawCallback: [],
            aoInitComplete: [],
            aoStateSaveParams: [],
            aoStateLoadParams: [],
            aoStateLoaded: [],
            sTableId: "",
            nTable: null,
            nTHead: null,
            nTFoot: null,
            nTBody: null,
            nTableWrapper: null,
            bDeferLoading: !1,
            bInitialised: !1,
            aoOpenRows: [],
            sDom: null,
            searchDelay: null,
            sPaginationType: "two_button",
            iStateDuration: 0,
            aoStateSave: [],
            aoStateLoad: [],
            oSavedState: null,
            oLoadedState: null,
            sAjaxSource: null,
            sAjaxDataProp: null,
            bAjaxDataGet: !0,
            jqXHR: null,
            json: n,
            oAjaxData: n,
            fnServerData: null,
            aoServerParams: [],
            sServerMethod: null,
            fnFormatNumber: null,
            aLengthMenu: null,
            iDraw: 0,
            bDrawing: !1,
            iDrawError: -1,
            _iDisplayLength: 10,
            _iDisplayStart: 0,
            _iRecordsTotal: 0,
            _iRecordsDisplay: 0,
            bJUI: null,
            oClasses: {},
            bFiltered: !1,
            bSorted: !1,
            bSortCellsTop: null,
            oInit: null,
            aoDestroyCallback: [],
            fnRecordsTotal: function () {
                return "ssp" == Yt(this) ? 1 * this._iRecordsTotal : this.aiDisplayMaster.length
            },
            fnRecordsDisplay: function () {
                return "ssp" == Yt(this) ? 1 * this._iRecordsDisplay : this.aiDisplay.length
            },
            fnDisplayEnd: function () {
                var t = this._iDisplayLength, e = this._iDisplayStart, i = e + t, n = this.aiDisplay.length,
                    r = this.oFeatures, a = r.bPaginate;
                return r.bServerSide ? a === !1 || -1 === t ? e + n : Math.min(e + t, this._iRecordsDisplay) : !a || i > n || -1 === t ? n : i
            },
            oInstance: null,
            sInstance: null,
            iTabIndex: 0,
            nScrollHead: null,
            nScrollFoot: null,
            aLastSort: [],
            oPlugins: {},
            rowIdFn: null,
            rowId: null
        }, zt.ext = qt = {
            buttons: {},
            classes: {},
            builder: "-source-",
            errMode: "alert",
            feature: [],
            search: [],
            selector: {cell: [], column: [], row: []},
            internal: {},
            legacy: {ajax: null},
            pager: {},
            renderer: {pageButton: {}, header: {}},
            order: {},
            type: {detect: [], search: {}, order: {}},
            _unique: 0,
            fnVersionCheck: zt.fnVersionCheck,
            iApiIndex: 0,
            oJUIClasses: {},
            sVersion: zt.version
        }, t.extend(qt, {
            afnFiltering: qt.search,
            aTypes: qt.type.detect,
            ofnSearch: qt.type.search,
            oSort: qt.type.order,
            afnSortData: qt.order,
            aoFeatures: qt.feature,
            oApi: qt.internal,
            oStdClasses: qt.classes,
            oPagination: qt.pager
        }), t.extend(zt.ext.classes, {
            sTable: "dataTable",
            sNoFooter: "no-footer",
            sPageButton: "paginate_button",
            sPageButtonActive: "current",
            sPageButtonDisabled: "disabled",
            sStripeOdd: "odd",
            sStripeEven: "even",
            sRowEmpty: "dataTables_empty",
            sWrapper: "dataTables_wrapper",
            sFilter: "dataTables_filter",
            sInfo: "dataTables_info",
            sPaging: "dataTables_paginate paging_",
            sLength: "dataTables_length",
            sProcessing: "dataTables_processing",
            sSortAsc: "sorting_asc",
            sSortDesc: "sorting_desc",
            sSortable: "sorting",
            sSortableAsc: "sorting_asc_disabled",
            sSortableDesc: "sorting_desc_disabled",
            sSortableNone: "sorting_disabled",
            sSortColumn: "sorting_",
            sFilterInput: "",
            sLengthSelect: "",
            sScrollWrapper: "dataTables_scroll",
            sScrollHead: "dataTables_scrollHead",
            sScrollHeadInner: "dataTables_scrollHeadInner",
            sScrollBody: "dataTables_scrollBody",
            sScrollFoot: "dataTables_scrollFoot",
            sScrollFootInner: "dataTables_scrollFootInner",
            sHeaderTH: "",
            sFooterTH: "",
            sSortJUIAsc: "",
            sSortJUIDesc: "",
            sSortJUI: "",
            sSortJUIAscAllowed: "",
            sSortJUIDescAllowed: "",
            sSortJUIWrapper: "",
            sSortIcon: "",
            sJUIHeader: "",
            sJUIFooter: ""
        }), function () {
            var e = "";
            e = "";
            var i = e + "ui-state-default", n = e + "css_right ui-icon ui-icon-",
                r = e + "fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix";
            t.extend(zt.ext.oJUIClasses, zt.ext.classes, {
                sPageButton: "fg-button ui-button " + i,
                sPageButtonActive: "ui-state-disabled",
                sPageButtonDisabled: "ui-state-disabled",
                sPaging: "dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",
                sSortAsc: i + " sorting_asc",
                sSortDesc: i + " sorting_desc",
                sSortable: i + " sorting",
                sSortableAsc: i + " sorting_asc_disabled",
                sSortableDesc: i + " sorting_desc_disabled",
                sSortableNone: i + " sorting_disabled",
                sSortJUIAsc: n + "triangle-1-n",
                sSortJUIDesc: n + "triangle-1-s",
                sSortJUI: n + "carat-2-n-s",
                sSortJUIAscAllowed: n + "carat-1-n",
                sSortJUIDescAllowed: n + "carat-1-s",
                sSortJUIWrapper: "DataTables_sort_wrapper",
                sSortIcon: "DataTables_sort_icon",
                sScrollHead: "dataTables_scrollHead " + i,
                sScrollFoot: "dataTables_scrollFoot " + i,
                sHeaderTH: i,
                sFooterTH: i,
                sJUIHeader: r + " ui-corner-tl ui-corner-tr",
                sJUIFooter: r + " ui-corner-bl ui-corner-br"
            })
        }();
        var We = zt.ext.pager;
        t.extend(We, {
            simple: function (t, e) {
                return ["previous", "next"]
            }, full: function (t, e) {
                return ["first", "previous", "next", "last"]
            }, numbers: function (t, e) {
                return [jt(t, e)]
            }, simple_numbers: function (t, e) {
                return ["previous", jt(t, e), "next"]
            }, full_numbers: function (t, e) {
                return ["first", "previous", jt(t, e), "next", "last"]
            }, _numbers: jt, numbers_length: 7
        }), t.extend(!0, zt.ext.renderer, {
            pageButton: {
                _: function (e, n, r, a, s, o) {
                    var l, d, c, u = e.oClasses, h = e.oLanguage.oPaginate, p = e.oLanguage.oAria.paginate || {}, f = 0,
                        m = function (i, n) {
                            var a, c, g, v, b = function (t) {
                                ht(e, t.data.action, !0)
                            };
                            for (a = 0, c = n.length; c > a; a++) if (v = n[a], t.isArray(v)) {
                                var y = t("<" + (v.DT_el || "div") + "/>").appendTo(i);
                                m(y, v)
                            } else {
                                switch (l = null, d = "", v) {
                                    case"ellipsis":
                                        i.append('<span class="ellipsis">&#x2026;</span>');
                                        break;
                                    case"first":
                                        l = h.sFirst, d = v + (s > 0 ? "" : " " + u.sPageButtonDisabled);
                                        break;
                                    case"previous":
                                        l = h.sPrevious, d = v + (s > 0 ? "" : " " + u.sPageButtonDisabled);
                                        break;
                                    case"next":
                                        l = h.sNext, d = v + (o - 1 > s ? "" : " " + u.sPageButtonDisabled);
                                        break;
                                    case"last":
                                        l = h.sLast, d = v + (o - 1 > s ? "" : " " + u.sPageButtonDisabled);
                                        break;
                                    default:
                                        l = v + 1, d = s === v ? u.sPageButtonActive : ""
                                }
                                null !== l && (g = t("<a>", {
                                    "class": u.sPageButton + " " + d,
                                    "aria-controls": e.sTableId,
                                    "aria-label": p[v],
                                    "data-dt-idx": f,
                                    tabindex: e.iTabIndex,
                                    id: 0 === r && "string" == typeof v ? e.sTableId + "_" + v : null
                                }).html(l).appendTo(i), Pt(g, {action: v}, b), f++)
                            }
                        };
                    try {
                        c = t(n).find(i.activeElement).data("dt-idx")
                    } catch (g) {
                    }
                    m(t(n).empty(), a), c && t(n).find("[data-dt-idx=" + c + "]").focus()
                }
            }
        }), t.extend(zt.ext.type.detect, [function (t, e) {
            var i = e.oLanguage.sDecimal;
            return oe(t, i) ? "num" + i : null
        }, function (t, e) {
            if (t && !(t instanceof Date) && (!te.test(t) || !ee.test(t))) return null;
            var i = Date.parse(t);
            return null !== i && !isNaN(i) || re(t) ? "date" : null
        }, function (t, e) {
            var i = e.oLanguage.sDecimal;
            return oe(t, i, !0) ? "num-fmt" + i : null
        }, function (t, e) {
            var i = e.oLanguage.sDecimal;
            return de(t, i) ? "html-num" + i : null
        }, function (t, e) {
            var i = e.oLanguage.sDecimal;
            return de(t, i, !0) ? "html-num-fmt" + i : null
        }, function (t, e) {
            return re(t) || "string" == typeof t && -1 !== t.indexOf("<") ? "html" : null
        }]), t.extend(zt.ext.type.search, {
            html: function (t) {
                return re(t) ? t : "string" == typeof t ? t.replace(Qt, " ").replace(Jt, "") : ""
            }, string: function (t) {
                return re(t) ? t : "string" == typeof t ? t.replace(Qt, " ") : t
            }
        });
        var Be = function (t, e, i, n) {
            return 0 === t || t && "-" !== t ? (e && (t = se(t, e)), t.replace && (i && (t = t.replace(i, "")), n && (t = t.replace(n, ""))), 1 * t) : -(1 / 0)
        };
        return t.extend(qt.type.order, {
            "date-pre": function (t) {
                return Date.parse(t) || 0
            }, "html-pre": function (t) {
                return re(t) ? "" : t.replace ? t.replace(/<.*?>/g, "").toLowerCase() : t + ""
            }, "string-pre": function (t) {
                return re(t) ? "" : "string" == typeof t ? t.toLowerCase() : t.toString ? t.toString() : ""
            }, "string-asc": function (t, e) {
                return e > t ? -1 : t > e ? 1 : 0
            }, "string-desc": function (t, e) {
                return e > t ? 1 : t > e ? -1 : 0
            }
        }), Wt(""), t.extend(!0, zt.ext.renderer, {
            header: {
                _: function (e, i, n, r) {
                    t(e.nTable).on("order.dt.DT", function (t, a, s, o) {
                        if (e === a) {
                            var l = n.idx;
                            i.removeClass(n.sSortingClass + " " + r.sSortAsc + " " + r.sSortDesc).addClass("asc" == o[l] ? r.sSortAsc : "desc" == o[l] ? r.sSortDesc : n.sSortingClass)
                        }
                    })
                }, jqueryui: function (e, i, n, r) {
                    t("<div/>").addClass(r.sSortJUIWrapper).append(i.contents()).append(t("<span/>").addClass(r.sSortIcon + " " + n.sSortingClassJUI)).appendTo(i), t(e.nTable).on("order.dt.DT", function (t, a, s, o) {
                        if (e === a) {
                            var l = n.idx;
                            i.removeClass(r.sSortAsc + " " + r.sSortDesc).addClass("asc" == o[l] ? r.sSortAsc : "desc" == o[l] ? r.sSortDesc : n.sSortingClass), i.find("span." + r.sSortIcon).removeClass(r.sSortJUIAsc + " " + r.sSortJUIDesc + " " + r.sSortJUI + " " + r.sSortJUIAscAllowed + " " + r.sSortJUIDescAllowed).addClass("asc" == o[l] ? r.sSortJUIAsc : "desc" == o[l] ? r.sSortJUIDesc : n.sSortingClassJUI)
                        }
                    })
                }
            }
        }), zt.render = {
            number: function (t, e, i, n, r) {
                return {
                    display: function (a) {
                        if ("number" != typeof a && "string" != typeof a) return a;
                        var s = 0 > a ? "-" : "", o = parseFloat(a);
                        if (isNaN(o)) return a;
                        a = Math.abs(o);
                        var l = parseInt(a, 10), d = i ? e + (a - l).toFixed(i).substring(2) : "";
                        return s + (n || "") + l.toString().replace(/\B(?=(\d{3})+(?!\d))/g, t) + d + (r || "")
                    }
                }
            }, text: function () {
                return {
                    display: function (t) {
                        return "string" == typeof t ? t.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") : t
                    }
                }
            }
        }, t.extend(zt.ext.internal, {
            _fnExternApiFunc: Bt,
            _fnBuildAjax: j,
            _fnAjaxUpdate: W,
            _fnAjaxParameters: B,
            _fnAjaxUpdateDraw: z,
            _fnAjaxDataSrc: q,
            _fnAddColumn: u,
            _fnColumnOptions: h,
            _fnAdjustColumnSizing: p,
            _fnVisibleToColumnIndex: f,
            _fnColumnIndexToVisible: m,
            _fnVisbleColumns: g,
            _fnGetColumns: v,
            _fnColumnTypes: b,
            _fnApplyColumnDefs: y,
            _fnHungarianMap: r,
            _fnCamelToHungarian: a,
            _fnLanguageCompat: s,
            _fnBrowserDetect: d,
            _fnAddData: w,
            _fnAddTr: S,
            _fnNodeToDataIndex: _,
            _fnNodeToColumnIndex: x,
            _fnGetCellData: D,
            _fnSetCellData: T,
            _fnSplitObjNotation: C,
            _fnGetObjectDataFn: A,
            _fnSetObjectDataFn: k,
            _fnGetDataMaster: I,
            _fnClearTable: M,
            _fnDeleteIndex: F,
            _fnInvalidate: E,
            _fnGetRowElements: $,
            _fnCreateTr: L,
            _fnBuildHead: V,
            _fnDrawHead: P,
            _fnDraw: H,
            _fnReDraw: R,
            _fnAddOptionsHtml: N,
            _fnDetectHeader: U,
            _fnGetUniqueThs: Y,
            _fnFeatureHtmlFilter: G,
            _fnFilterComplete: Z,
            _fnFilterCustom: X,
            _fnFilterColumn: K,
            _fnFilter: Q,
            _fnFilterCreateSearch: J,
            _fnEscapeRegex: tt,
            _fnFilterData: et,
            _fnFeatureHtmlInfo: rt,
            _fnUpdateInfo: at,
            _fnInfoMacros: st,
            _fnInitialise: ot,
            _fnInitComplete: lt,
            _fnLengthChange: dt,
            _fnFeatureHtmlLength: ct,
            _fnFeatureHtmlPaginate: ut,
            _fnPageChange: ht,
            _fnFeatureHtmlProcessing: pt,
            _fnProcessingDisplay: ft,
            _fnFeatureHtmlTable: mt,
            _fnScrollDraw: gt,
            _fnApplyToChildren: vt,
            _fnCalculateColumnWidths: bt,
            _fnThrottle: yt,
            _fnConvertToWidth: wt,
            _fnGetWidestNode: St,
            _fnGetMaxLenString: _t,
            _fnStringToCss: xt,
            _fnSortFlatten: Dt,
            _fnSort: Tt,
            _fnSortAria: Ct,
            _fnSortListener: At,
            _fnSortAttachListener: kt,
            _fnSortingClasses: It,
            _fnSortData: Mt,
            _fnSaveState: Ft,
            _fnLoadState: Et,
            _fnSettingsFromNode: $t,
            _fnLog: Lt,
            _fnMap: Ot,
            _fnBindAction: Pt,
            _fnCallbackReg: Ht,
            _fnCallbackFire: Rt,
            _fnLengthOverflow: Nt,
            _fnRenderer: Ut,
            _fnDataSource: Yt,
            _fnRowAttributes: O,
            _fnCalculateEnd: function () {
            }
        }), t.fn.dataTable = zt, zt.$ = t, t.fn.dataTableSettings = zt.settings, t.fn.dataTableExt = zt.ext, t.fn.DataTable = function (e) {
            return t(this).dataTable(e).api()
        }, t.each(zt, function (e, i) {
            t.fn.DataTable[e] = i
        }), t.fn.dataTable
    }), function (t) {
        "function" == typeof define && define.amd ? define(["jquery", "datatables.net"], function (e) {
            return t(e, window, document)
        }) : "object" == typeof exports ? module.exports = function (e, i) {
            return e || (e = window), i && i.fn.dataTable || (i = require("datatables.net")(e, i).$), t(i, e, e.document)
        } : t(jQuery, window, document)
    }(function (t, e, i, n) {
        "use strict";
        var r = t.fn.dataTable;
        return t.extend(!0, r.defaults, {
            dom: "<'row'<'col-sm-6'l><'col-sm-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-5'i><'col-sm-7'p>>",
            renderer: "bootstrap"
        }), t.extend(r.ext.classes, {
            sWrapper: "dataTables_wrapper form-inline dt-bootstrap",
            sFilterInput: "form-control input-sm",
            sLengthSelect: "form-control input-sm",
            sProcessing: "dataTables_processing panel panel-default"
        }), r.ext.renderer.pageButton.bootstrap = function (e, n, a, s, o, l) {
            var d, c, u, h = new r.Api(e), p = e.oClasses, f = e.oLanguage.oPaginate,
                m = e.oLanguage.oAria.paginate || {}, g = 0, v = function (i, n) {
                    var r, s, u, b, y = function (e) {
                        e.preventDefault(), t(e.currentTarget).hasClass("disabled") || h.page() == e.data.action || h.page(e.data.action).draw("page")
                    };
                    for (r = 0, s = n.length; s > r; r++) if (b = n[r], t.isArray(b)) v(i, b); else {
                        switch (d = "", c = "", b) {
                            case"ellipsis":
                                d = "&#x2026;", c = "disabled";
                                break;
                            case"first":
                                d = f.sFirst, c = b + (o > 0 ? "" : " disabled");
                                break;
                            case"previous":
                                d = f.sPrevious, c = b + (o > 0 ? "" : " disabled");
                                break;
                            case"next":
                                d = f.sNext, c = b + (l - 1 > o ? "" : " disabled");
                                break;
                            case"last":
                                d = f.sLast, c = b + (l - 1 > o ? "" : " disabled");
                                break;
                            default:
                                d = b + 1, c = o === b ? "active" : ""
                        }
                        d && (u = t("<li>", {
                            "class": p.sPageButton + " " + c,
                            id: 0 === a && "string" == typeof b ? e.sTableId + "_" + b : null
                        }).append(t("<a>", {
                            href: "#",
                            "aria-controls": e.sTableId,
                            "aria-label": m[b],
                            "data-dt-idx": g,
                            tabindex: e.iTabIndex
                        }).html(d)).appendTo(i), e.oApi._fnBindAction(u, {action: b}, y), g++)
                    }
                };
            try {
                u = t(n).find(i.activeElement).data("dt-idx")
            } catch (b) {
            }
            v(t(n).empty().html('<ul class="pagination"/>').children("ul"), s), u && t(n).find("[data-dt-idx=" + u + "]").focus()
        }, r.TableTools && (t.extend(!0, r.TableTools.classes, {
            container: "DTTT btn-group",
            buttons: {normal: "btn btn-default", disabled: "disabled"},
            collection: {container: "DTTT_dropdown dropdown-menu", buttons: {normal: "", disabled: "disabled"}},
            print: {info: "DTTT_print_info"},
            select: {row: "active"}
        }), t.extend(!0, r.TableTools.DEFAULTS.oTags, {collection: {container: "ul", button: "li", liner: "a"}})), r
    }), function (t) {
        "function" == typeof define && define.amd ? define(["jquery", "datatables.net"], function (e) {
            return t(e, window, document)
        }) : "object" == typeof exports ? module.exports = function (e, i) {
            return e || (e = window), i && i.fn.dataTable || (i = require("datatables.net")(e, i).$), t(i, e, e.document)
        } : t(jQuery, window, document)
    }(function (t, e, i, n) {
        "use strict";
        var r = t.fn.dataTable, a = function (e, i) {
            if (!r.versionCheck || !r.versionCheck("1.10.3")) throw"DataTables Responsive requires DataTables 1.10.3 or newer";
            this.s = {
                dt: new r.Api(e),
                columns: [],
                current: []
            }, this.s.dt.settings()[0].responsive || (i && "string" == typeof i.details && (i.details = {type: i.details}), this.c = t.extend(!0, {}, a.defaults, r.defaults.responsive, i), e.responsive = this, this._constructor())
        };
        t.extend(a.prototype, {
            _constructor: function () {
                var i = this, n = this.s.dt, a = n.settings()[0], s = t(e).width();
                n.settings()[0]._responsive = this, t(e).on("resize.dtr orientationchange.dtr", r.util.throttle(function () {
                    var n = t(e).width();
                    n !== s && (i._resize(), s = n)
                })), a.oApi._fnCallbackReg(a, "aoRowCreatedCallback", function (e, r, a) {
                    -1 !== t.inArray(!1, i.s.current) && t("td, th", e).each(function (e) {
                        var r = n.column.index("toData", e);
                        i.s.current[r] === !1 && t(this).css("display", "none")
                    })
                }), n.on("destroy.dtr", function () {
                    n.off(".dtr"), t(n.table().body()).off(".dtr"), t(e).off("resize.dtr orientationchange.dtr"), t.each(i.s.current, function (t, e) {
                        e === !1 && i._setColumnVis(t, !0)
                    })
                }), this.c.breakpoints.sort(function (t, e) {
                    return t.width < e.width ? 1 : t.width > e.width ? -1 : 0
                }), this._classLogic(), this._resizeAuto();
                var o = this.c.details;
                o.type !== !1 && (i._detailsInit(), n.on("column-visibility.dtr", function (t, e, n, r) {
                    i._classLogic(), i._resizeAuto(), i._resize()
                }), n.on("draw.dtr", function () {
                    i._redrawChildren()
                }), t(n.table().node()).addClass("dtr-" + o.type)), n.on("column-reorder.dtr", function (t, e, n) {
                    n.drop && (i._classLogic(), i._resizeAuto(), i._resize())
                }), n.on("column-sizing.dtr", function () {
                    i._resize()
                }), n.on("init.dtr", function (e, r, a) {
                    i._resizeAuto(), i._resize(), t.inArray(!1, i.s.current) && n.columns.adjust()
                }), this._resize()
            }, _columnsVisiblity: function (e) {
                var i, n, r = this.s.dt, a = this.s.columns, s = a.map(function (t, e) {
                    return {columnIdx: e, priority: t.priority}
                }).sort(function (t, e) {
                    return t.priority !== e.priority ? t.priority - e.priority : t.columnIdx - e.columnIdx
                }), o = t.map(a, function (i) {
                    return i.auto && null === i.minWidth ? !1 : i.auto === !0 ? "-" : -1 !== t.inArray(e, i.includeIn)
                }), l = 0;
                for (i = 0, n = o.length; n > i; i++) o[i] === !0 && (l += a[i].minWidth);
                var d = r.settings()[0].oScroll, c = d.sY || d.sX ? d.iBarWidth : 0,
                    u = r.table().container().offsetWidth - c, h = u - l;
                for (i = 0, n = o.length; n > i; i++) a[i].control && (h -= a[i].minWidth);
                var p = !1;
                for (i = 0, n = s.length; n > i; i++) {
                    var f = s[i].columnIdx;
                    "-" === o[f] && !a[f].control && a[f].minWidth && (p || h - a[f].minWidth < 0 ? (p = !0, o[f] = !1) : o[f] = !0, h -= a[f].minWidth)
                }
                var m = !1;
                for (i = 0, n = a.length; n > i; i++) if (!a[i].control && !a[i].never && !o[i]) {
                    m = !0;
                    break
                }
                for (i = 0, n = a.length; n > i; i++) a[i].control && (o[i] = m);
                return -1 === t.inArray(!0, o) && (o[0] = !0), o
            }, _classLogic: function () {
                var e = this, i = this.c.breakpoints, r = this.s.dt, a = r.columns().eq(0).map(function (e) {
                    var i = this.column(e), a = i.header().className,
                        s = r.settings()[0].aoColumns[e].responsivePriority;
                    if (s === n) {
                        var o = t(i.header()).data("priority");
                        s = o !== n ? 1 * o : 1e4
                    }
                    return {
                        className: a,
                        includeIn: [],
                        auto: !1,
                        control: !1,
                        never: !!a.match(/\bnever\b/),
                        priority: s
                    }
                }), s = function (e, i) {
                    var n = a[e].includeIn;
                    -1 === t.inArray(i, n) && n.push(i)
                }, o = function (t, n, r, o) {
                    var l, d, c;
                    if (r) {
                        if ("max-" === r) for (l = e._find(n).width, d = 0, c = i.length; c > d; d++) i[d].width <= l && s(t, i[d].name); else if ("min-" === r) for (l = e._find(n).width, d = 0, c = i.length; c > d; d++) i[d].width >= l && s(t, i[d].name); else if ("not-" === r) for (d = 0, c = i.length; c > d; d++) -1 === i[d].name.indexOf(o) && s(t, i[d].name)
                    } else a[t].includeIn.push(n)
                };
                a.each(function (e, n) {
                    for (var r = e.className.split(" "), a = !1, s = 0, l = r.length; l > s; s++) {
                        var d = t.trim(r[s]);
                        if ("all" === d) return a = !0, void(e.includeIn = t.map(i, function (t) {
                            return t.name
                        }));
                        if ("none" === d || e.never) return void(a = !0);
                        if ("control" === d) return a = !0, void(e.control = !0);
                        t.each(i, function (t, e) {
                            var i = e.name.split("-"),
                                r = new RegExp("(min\\-|max\\-|not\\-)?(" + i[0] + ")(\\-[_a-zA-Z0-9])?"),
                                s = d.match(r);
                            s && (a = !0, s[2] === i[0] && s[3] === "-" + i[1] ? o(n, e.name, s[1], s[2] + s[3]) : s[2] !== i[0] || s[3] || o(n, e.name, s[1], s[2]))
                        })
                    }
                    a || (e.auto = !0)
                }), this.s.columns = a
            }, _detailsDisplay: function (e, i) {
                var n = this, r = this.s.dt, a = this.c.details;
                if (a && a.type) {
                    var s = a.display(e, i, function () {
                        return a.renderer(r, e[0], n._detailsObj(e[0]))
                    });
                    s !== !0 && s !== !1 || t(r.table().node()).triggerHandler("responsive-display.dt", [r, e, s, i])
                }
            }, _detailsInit: function () {
                var e = this, i = this.s.dt, n = this.c.details;
                "inline" === n.type && (n.target = "td:first-child, th:first-child"), i.on("draw.dtr", function () {
                    e._tabIndexes()
                }), e._tabIndexes(), t(i.table().body()).on("keyup.dtr", "td, th", function (e) {
                    13 === e.keyCode && t(this).data("dtr-keyboard") && t(this).click()
                });
                var r = n.target, a = "string" == typeof r ? r : "td, th";
                t(i.table().body()).on("click.dtr mousedown.dtr mouseup.dtr", a, function (n) {
                    if (t(i.table().node()).hasClass("collapsed") && i.row(t(this).closest("tr")).length) {
                        if ("number" == typeof r) {
                            var a = 0 > r ? i.columns().eq(0).length + r : r;
                            if (i.cell(this).index().column !== a) return
                        }
                        var s = i.row(t(this).closest("tr"));
                        "click" === n.type ? e._detailsDisplay(s, !1) : "mousedown" === n.type ? t(this).css("outline", "none") : "mouseup" === n.type && t(this).blur().css("outline", "")
                    }
                })
            }, _detailsObj: function (e) {
                var i = this, n = this.s.dt;
                return t.map(this.s.columns, function (t, r) {
                    return t.never ? void 0 : {
                        title: n.settings()[0].aoColumns[r].sTitle,
                        data: n.cell(e, r).render(i.c.orthogonal),
                        hidden: n.column(r).visible() && !i.s.current[r],
                        columnIndex: r
                    }
                })
            }, _find: function (t) {
                for (var e = this.c.breakpoints, i = 0, n = e.length; n > i; i++) if (e[i].name === t) return e[i]
            }, _redrawChildren: function () {
                var t = this, e = this.s.dt;
                e.rows({page: "current"}).iterator("row", function (i, n) {
                    e.row(n);
                    t._detailsDisplay(e.row(n), !0)
                })
            }, _resize: function () {
                var i, n, r = this, a = this.s.dt, s = t(e).width(), o = this.c.breakpoints, l = o[0].name,
                    d = this.s.columns, c = this.s.current.slice();
                for (i = o.length - 1; i >= 0; i--) if (s <= o[i].width) {
                    l = o[i].name;
                    break
                }
                var u = this._columnsVisiblity(l);
                this.s.current = u;
                var h = !1;
                for (i = 0, n = d.length; n > i; i++) if (u[i] === !1 && !d[i].never && !d[i].control) {
                    h = !0;
                    break
                }
                t(a.table().node()).toggleClass("collapsed", h);
                var p = !1;
                a.columns().eq(0).each(function (t, e) {
                    u[e] !== c[e] && (p = !0, r._setColumnVis(t, u[e]))
                }), p && (this._redrawChildren(), t(a.table().node()).trigger("responsive-resize.dt", [a, this.s.current]))
            }, _resizeAuto: function () {
                var e = this.s.dt, i = this.s.columns;
                if (this.c.auto && -1 !== t.inArray(!0, t.map(i, function (t) {
                        return t.auto
                    }))) {
                    var n = (e.table().node().offsetWidth, e.columns, e.table().node().cloneNode(!1)),
                        r = t(e.table().header().cloneNode(!1)).appendTo(n),
                        a = t(e.table().body()).clone(!1, !1).empty().appendTo(n),
                        s = e.columns().header().filter(function (t) {
                            return e.column(t).visible()
                        }).to$().clone(!1).css("display", "table-cell");
                    t(a).append(t(e.rows({page: "current"}).nodes()).clone(!1)).find("th, td").css("display", "");
                    var o = e.table().footer();
                    if (o) {
                        var l = t(o.cloneNode(!1)).appendTo(n), d = e.columns().header().filter(function (t) {
                            return e.column(t).visible()
                        }).to$().clone(!1).css("display", "table-cell");
                        t("<tr/>").append(d).appendTo(l)
                    }
                    t("<tr/>").append(s).appendTo(r), "inline" === this.c.details.type && t(n).addClass("dtr-inline collapsed");
                    var c = t("<div/>").css({width: 1, height: 1, overflow: "hidden"}).append(n);
                    c.insertBefore(e.table().node()), s.each(function (t) {
                        var n = e.column.index("fromVisible", t);
                        i[n].minWidth = this.offsetWidth || 0
                    }), c.remove()
                }
            }, _setColumnVis: function (e, i) {
                var n = this.s.dt, r = i ? "" : "none";
                t(n.column(e).header()).css("display", r), t(n.column(e).footer()).css("display", r), n.column(e).nodes().to$().css("display", r)
            }, _tabIndexes: function () {
                var e = this.s.dt, i = e.cells({page: "current"}).nodes().to$(), n = e.settings()[0],
                    r = this.c.details.target;
                i.filter("[data-dtr-keyboard]").removeData("[data-dtr-keyboard]");
                var a = "number" == typeof r ? ":eq(" + r + ")" : r;
                t(a, e.rows({page: "current"}).nodes()).attr("tabIndex", n.iTabIndex).data("dtr-keyboard", 1)
            }
        }), a.breakpoints = [{name: "desktop", width: 1 / 0}, {name: "tablet-l", width: 1024}, {
            name: "tablet-p",
            width: 768
        }, {name: "mobile-l", width: 480}, {name: "mobile-p", width: 320}], a.display = {
            childRow: function (e, i, n) {
                return i ? t(e.node()).hasClass("parent") ? (e.child(n(), "child").show(), !0) : void 0 : e.child.isShown() ? (e.child(!1), t(e.node()).removeClass("parent"), !1) : (e.child(n(), "child").show(), t(e.node()).addClass("parent"), !0)
            }, childRowImmediate: function (e, i, n) {
                return !i && e.child.isShown() || !e.responsive.hasHidden() ? (e.child(!1), t(e.node()).removeClass("parent"), !1) : (e.child(n(), "child").show(), t(e.node()).addClass("parent"), !0)
            }, modal: function (e) {
                return function (n, r, a) {
                    if (r) t("div.dtr-modal-content").empty().append(a()); else {
                        var s = function () {
                                o.remove(), t(i).off("keypress.dtr")
                            },
                            o = t('<div class="dtr-modal"/>').append(t('<div class="dtr-modal-display"/>').append(t('<div class="dtr-modal-content"/>').append(a())).append(t('<div class="dtr-modal-close">&times;</div>').click(function () {
                                s()
                            }))).append(t('<div class="dtr-modal-background"/>').click(function () {
                                s()
                            })).appendTo("body");
                        t(i).on("keyup.dtr", function (t) {
                            27 === t.keyCode && (t.stopPropagation(), s())
                        })
                    }
                    e && e.header && t("div.dtr-modal-content").prepend("<h2>" + e.header(n) + "</h2>")
                }
            }
        }, a.defaults = {
            breakpoints: a.breakpoints,
            auto: !0,
            details: {
                display: a.display.childRow, renderer: function (e, i, n) {
                    var r = t.map(n, function (t, e) {
                        return t.hidden ? '<li data-dtr-index="' + t.columnIndex + '"><span class="dtr-title">' + t.title + '</span> <span class="dtr-data">' + t.data + "</span></li>" : ""
                    }).join("");
                    return r ? t('<ul data-dtr-index="' + i + '"/>').append(r) : !1
                }, target: 0, type: "inline"
            },
            orthogonal: "display"
        };
        var s = t.fn.dataTable.Api;
        return s.register("responsive()", function () {
            return this
        }), s.register("responsive.index()", function (e) {
            return e = t(e), {column: e.data("dtr-index"), row: e.parent().data("dtr-index")}
        }), s.register("responsive.rebuild()", function () {
            return this.iterator("table", function (t) {
                t._responsive && t._responsive._classLogic()
            })
        }), s.register("responsive.recalc()", function () {
            return this.iterator("table", function (t) {
                t._responsive && (t._responsive._resizeAuto(), t._responsive._resize())
            })
        }), s.register("responsive.hasHidden()", function () {
            var e = this.context[0];
            return e._responsive ? -1 !== t.inArray(!1, e._responsive.s.current) : !1
        }), a.version = "2.0.1", t.fn.dataTable.Responsive = a, t.fn.DataTable.Responsive = a, t(i).on("preInit.dt.dtr", function (e, i, n) {
            if ("dt" === e.namespace && (t(i.nTable).hasClass("responsive") || t(i.nTable).hasClass("dt-responsive") || i.oInit.responsive || r.defaults.responsive)) {
                var s = i.oInit.responsive;
                s !== !1 && new a(i, t.isPlainObject(s) ? s : {})
            }
        }), a
    }), function (t) {
        "function" == typeof define && define.amd ? define(["jquery", "datatables.net-bs", "datatables.net-responsive"], function (e) {
            return t(e, window, document)
        }) : "object" == typeof exports ? module.exports = function (e, i) {
            return e || (e = window), i && i.fn.dataTable || (i = require("datatables.net-bs")(e, i).$), i.fn.dataTable.Responsive || require("datatables.net-responsive")(e, i), t(i, e, e.document)
        } : t(jQuery, window, document)
    }(function (t, e, i, n) {
        "use strict";
        var r = t.fn.dataTable, a = r.Responsive.display, s = a.modal;
        return a.modal = function (e) {
            return function (i, n, r) {
                if (t.fn.modal) {
                    if (!n) {
                        var a = t('<div class="modal fade" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"/></div></div></div>');
                        e && e.header && a.find("div.modal-header").append('<h4 class="modal-title">' + e.header(i) + "</h4>"), a.find("div.modal-body").append(r()), a.appendTo("body").modal()
                    }
                } else s(i, n, r)
            }
        }, r.Responsive
    }), function t(e, i, n) {
        function r(s, o) {
            if (!i[s]) {
                if (!e[s]) {
                    var l = "function" == typeof require && require;
                    if (!o && l) return l(s, !0);
                    if (a) return a(s, !0);
                    var d = new Error("Cannot find module '" + s + "'");
                    throw d.code = "MODULE_NOT_FOUND", d
                }
                var c = i[s] = {exports: {}};
                e[s][0].call(c.exports, function (t) {
                    var i = e[s][1][t];
                    return r(i ? i : t)
                }, c, c.exports, t, e, i, n)
            }
            return i[s].exports
        }

        for (var a = "function" == typeof require && require, s = 0; s < n.length; s++) r(n[s]);
        return r
    }({
        1: [function (t, e, i) {
            "use strict";

            function n(t) {
                t.fn.perfectScrollbar = function (e) {
                    return this.each(function () {
                        if ("object" == typeof e || "undefined" == typeof e) {
                            var i = e;
                            a.get(this) || r.initialize(this, i)
                        } else {
                            var n = e;
                            "update" === n ? r.update(this) : "destroy" === n && r.destroy(this)
                        }
                        return t(this)
                    })
                }
            }

            var r = t("../main"), a = t("../plugin/instances");
            if ("function" == typeof define && define.amd) define(["jquery"], n); else {
                var s = window.jQuery ? window.jQuery : window.$;
                "undefined" != typeof s && n(s)
            }
            e.exports = n
        }, {"../main": 7, "../plugin/instances": 18}],
        2: [function (t, e, i) {
            "use strict";

            function n(t, e) {
                var i = t.className.split(" ");
                i.indexOf(e) < 0 && i.push(e), t.className = i.join(" ")
            }

            function r(t, e) {
                var i = t.className.split(" "), n = i.indexOf(e);
                n >= 0 && i.splice(n, 1), t.className = i.join(" ")
            }

            i.add = function (t, e) {
                t.classList ? t.classList.add(e) : n(t, e)
            }, i.remove = function (t, e) {
                t.classList ? t.classList.remove(e) : r(t, e)
            }, i.list = function (t) {
                return t.classList ? Array.prototype.slice.apply(t.classList) : t.className.split(" ")
            }
        }, {}],
        3: [function (t, e, i) {
            "use strict";

            function n(t, e) {
                return window.getComputedStyle(t)[e]
            }

            function r(t, e, i) {
                return "number" == typeof i && (i = i.toString() + "px"), t.style[e] = i, t
            }

            function a(t, e) {
                for (var i in e) {
                    var n = e[i];
                    "number" == typeof n && (n = n.toString() + "px"), t.style[i] = n
                }
                return t
            }

            var s = {};
            s.e = function (t, e) {
                var i = document.createElement(t);
                return i.className = e, i
            }, s.appendTo = function (t, e) {
                return e.appendChild(t), t
            }, s.css = function (t, e, i) {
                return "object" == typeof e ? a(t, e) : "undefined" == typeof i ? n(t, e) : r(t, e, i)
            }, s.matches = function (t, e) {
                return "undefined" != typeof t.matches ? t.matches(e) : "undefined" != typeof t.matchesSelector ? t.matchesSelector(e) : "undefined" != typeof t.webkitMatchesSelector ? t.webkitMatchesSelector(e) : "undefined" != typeof t.mozMatchesSelector ? t.mozMatchesSelector(e) : "undefined" != typeof t.msMatchesSelector ? t.msMatchesSelector(e) : void 0
            }, s.remove = function (t) {
                "undefined" != typeof t.remove ? t.remove() : t.parentNode && t.parentNode.removeChild(t)
            }, s.queryChildren = function (t, e) {
                return Array.prototype.filter.call(t.childNodes, function (t) {
                    return s.matches(t, e)
                })
            }, e.exports = s
        }, {}],
        4: [function (t, e, i) {
            "use strict";
            var n = function (t) {
                this.element = t, this.events = {}
            };
            n.prototype.bind = function (t, e) {
                "undefined" == typeof this.events[t] && (this.events[t] = []), this.events[t].push(e), this.element.addEventListener(t, e, !1)
            }, n.prototype.unbind = function (t, e) {
                var i = "undefined" != typeof e;
                this.events[t] = this.events[t].filter(function (n) {
                    return i && n !== e ? !0 : (this.element.removeEventListener(t, n, !1), !1)
                }, this)
            }, n.prototype.unbindAll = function () {
                for (var t in this.events) this.unbind(t)
            };
            var r = function () {
                this.eventElements = []
            };
            r.prototype.eventElement = function (t) {
                var e = this.eventElements.filter(function (e) {
                    return e.element === t
                })[0];
                return "undefined" == typeof e && (e = new n(t), this.eventElements.push(e)), e
            }, r.prototype.bind = function (t, e, i) {
                this.eventElement(t).bind(e, i)
            }, r.prototype.unbind = function (t, e, i) {
                this.eventElement(t).unbind(e, i)
            }, r.prototype.unbindAll = function () {
                for (var t = 0; t < this.eventElements.length; t++) this.eventElements[t].unbindAll()
            }, r.prototype.once = function (t, e, i) {
                var n = this.eventElement(t), r = function (t) {
                    n.unbind(e, r), i(t)
                };
                n.bind(e, r)
            }, e.exports = r
        }, {}],
        5: [function (t, e, i) {
            "use strict";
            e.exports = function () {
                function t() {
                    return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
                }

                return function () {
                    return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
                }
            }()
        }, {}],
        6: [function (t, e, i) {
            "use strict";
            var n = t("./class"), r = t("./dom");
            i.toInt = function (t) {
                return parseInt(t, 10) || 0
            }, i.clone = function (t) {
                if (null === t) return null;
                if ("object" == typeof t) {
                    var e = {};
                    for (var i in t) e[i] = this.clone(t[i]);
                    return e
                }
                return t
            }, i.extend = function (t, e) {
                var i = this.clone(t);
                for (var n in e) i[n] = this.clone(e[n]);
                return i
            }, i.isEditable = function (t) {
                return r.matches(t, "input,[contenteditable]") || r.matches(t, "select,[contenteditable]") || r.matches(t, "textarea,[contenteditable]") || r.matches(t, "button,[contenteditable]")
            }, i.removePsClasses = function (t) {
                for (var e = n.list(t), i = 0; i < e.length; i++) {
                    var r = e[i];
                    0 === r.indexOf("ps-") && n.remove(t, r)
                }
            }, i.outerWidth = function (t) {
                return this.toInt(r.css(t, "width")) + this.toInt(r.css(t, "paddingLeft")) + this.toInt(r.css(t, "paddingRight")) + this.toInt(r.css(t, "borderLeftWidth")) + this.toInt(r.css(t, "borderRightWidth"))
            }, i.startScrolling = function (t, e) {
                n.add(t, "ps-in-scrolling"), "undefined" != typeof e ? n.add(t, "ps-" + e) : (n.add(t, "ps-x"), n.add(t, "ps-y"))
            }, i.stopScrolling = function (t, e) {
                n.remove(t, "ps-in-scrolling"), "undefined" != typeof e ? n.remove(t, "ps-" + e) : (n.remove(t, "ps-x"), n.remove(t, "ps-y"))
            }, i.env = {
                isWebKit: "WebkitAppearance" in document.documentElement.style,
                supportsTouch: "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch,
                supportsIePointer: null !== window.navigator.msMaxTouchPoints
            }
        }, {"./class": 2, "./dom": 3}],
        7: [function (t, e, i) {
            "use strict";
            var n = t("./plugin/destroy"), r = t("./plugin/initialize"), a = t("./plugin/update");
            e.exports = {initialize: r, update: a, destroy: n}
        }, {"./plugin/destroy": 9, "./plugin/initialize": 17, "./plugin/update": 21}],
        8: [function (t, e, i) {
            "use strict";
            e.exports = {
                maxScrollbarLength: null,
                minScrollbarLength: null,
                scrollXMarginOffset: 0,
                scrollYMarginOffset: 0,
                stopPropagationOnClick: !0,
                suppressScrollX: !1,
                suppressScrollY: !1,
                swipePropagation: !0,
                useBothWheelAxes: !1,
                useKeyboard: !0,
                useSelectionScroll: !1,
                wheelPropagation: !1,
                wheelSpeed: 1
            }
        }, {}],
        9: [function (t, e, i) {
            "use strict";
            var n = t("../lib/dom"), r = t("../lib/helper"), a = t("./instances");
            e.exports = function (t) {
                var e = a.get(t);
                e && (e.event.unbindAll(), n.remove(e.scrollbarX), n.remove(e.scrollbarY), n.remove(e.scrollbarXRail), n.remove(e.scrollbarYRail), r.removePsClasses(t), a.remove(t))
            }
        }, {"../lib/dom": 3, "../lib/helper": 6, "./instances": 18}],
        10: [function (t, e, i) {
            "use strict";

            function n(t, e) {
                function i(t) {
                    return t.getBoundingClientRect()
                }

                var n = window.Event.prototype.stopPropagation.bind;
                e.settings.stopPropagationOnClick && e.event.bind(e.scrollbarY, "click", n), e.event.bind(e.scrollbarYRail, "click", function (n) {
                    var a = r.toInt(e.scrollbarYHeight / 2),
                        l = e.railYRatio * (n.pageY - window.pageYOffset - i(e.scrollbarYRail).top - a),
                        d = e.railYRatio * (e.railYHeight - e.scrollbarYHeight), c = l / d;
                    0 > c ? c = 0 : c > 1 && (c = 1), o(t, "top", (e.contentHeight - e.containerHeight) * c), s(t), n.stopPropagation()
                }), e.settings.stopPropagationOnClick && e.event.bind(e.scrollbarX, "click", n), e.event.bind(e.scrollbarXRail, "click", function (n) {
                    var a = r.toInt(e.scrollbarXWidth / 2),
                        l = e.railXRatio * (n.pageX - window.pageXOffset - i(e.scrollbarXRail).left - a),
                        d = e.railXRatio * (e.railXWidth - e.scrollbarXWidth), c = l / d;
                    0 > c ? c = 0 : c > 1 && (c = 1), o(t, "left", (e.contentWidth - e.containerWidth) * c - e.negativeScrollAdjustment), s(t), n.stopPropagation()
                })
            }

            var r = t("../../lib/helper"), a = t("../instances"), s = t("../update-geometry"),
                o = t("../update-scroll");
            e.exports = function (t) {
                var e = a.get(t);
                n(t, e)
            }
        }, {"../../lib/helper": 6, "../instances": 18, "../update-geometry": 19, "../update-scroll": 20}],
        11: [function (t, e, i) {
            "use strict";

            function n(t, e) {
                function i(i) {
                    var r = n + i * e.railXRatio,
                        a = Math.max(0, e.scrollbarXRail.getBoundingClientRect().left) + e.railXRatio * (e.railXWidth - e.scrollbarXWidth);
                    0 > r ? e.scrollbarXLeft = 0 : r > a ? e.scrollbarXLeft = a : e.scrollbarXLeft = r;
                    var o = s.toInt(e.scrollbarXLeft * (e.contentWidth - e.containerWidth) / (e.containerWidth - e.railXRatio * e.scrollbarXWidth)) - e.negativeScrollAdjustment;
                    d(t, "left", o)
                }

                var n = null, r = null, o = function (e) {
                    i(e.pageX - r), l(t), e.stopPropagation(), e.preventDefault()
                }, c = function () {
                    s.stopScrolling(t, "x"), e.event.unbind(e.ownerDocument, "mousemove", o)
                };
                e.event.bind(e.scrollbarX, "mousedown", function (i) {
                    r = i.pageX, n = s.toInt(a.css(e.scrollbarX, "left")) * e.railXRatio, s.startScrolling(t, "x"), e.event.bind(e.ownerDocument, "mousemove", o), e.event.once(e.ownerDocument, "mouseup", c), i.stopPropagation(), i.preventDefault()
                })
            }

            function r(t, e) {
                function i(i) {
                    var r = n + i * e.railYRatio,
                        a = Math.max(0, e.scrollbarYRail.getBoundingClientRect().top) + e.railYRatio * (e.railYHeight - e.scrollbarYHeight);
                    0 > r ? e.scrollbarYTop = 0 : r > a ? e.scrollbarYTop = a : e.scrollbarYTop = r;
                    var o = s.toInt(e.scrollbarYTop * (e.contentHeight - e.containerHeight) / (e.containerHeight - e.railYRatio * e.scrollbarYHeight));
                    d(t, "top", o)
                }

                var n = null, r = null, o = function (e) {
                    i(e.pageY - r), l(t), e.stopPropagation(), e.preventDefault()
                }, c = function () {
                    s.stopScrolling(t, "y"), e.event.unbind(e.ownerDocument, "mousemove", o)
                };
                e.event.bind(e.scrollbarY, "mousedown", function (i) {
                    r = i.pageY, n = s.toInt(a.css(e.scrollbarY, "top")) * e.railYRatio, s.startScrolling(t, "y"), e.event.bind(e.ownerDocument, "mousemove", o), e.event.once(e.ownerDocument, "mouseup", c), i.stopPropagation(), i.preventDefault()
                })
            }

            var a = t("../../lib/dom"), s = t("../../lib/helper"), o = t("../instances"), l = t("../update-geometry"),
                d = t("../update-scroll");
            e.exports = function (t) {
                var e = o.get(t);
                n(t, e), r(t, e)
            }
        }, {
            "../../lib/dom": 3,
            "../../lib/helper": 6,
            "../instances": 18,
            "../update-geometry": 19,
            "../update-scroll": 20
        }],
        12: [function (t, e, i) {
            "use strict";

            function n(t, e) {
                function i(i, n) {
                    var r = t.scrollTop;
                    if (0 === i) {
                        if (!e.scrollbarYActive) return !1;
                        if (0 === r && n > 0 || r >= e.contentHeight - e.containerHeight && 0 > n) return !e.settings.wheelPropagation
                    }
                    var a = t.scrollLeft;
                    if (0 === n) {
                        if (!e.scrollbarXActive) return !1;
                        if (0 === a && 0 > i || a >= e.contentWidth - e.containerWidth && i > 0) return !e.settings.wheelPropagation
                    }
                    return !0
                }

                var n = !1;
                e.event.bind(t, "mouseenter", function () {
                    n = !0
                }), e.event.bind(t, "mouseleave", function () {
                    n = !1
                });
                var a = !1;
                e.event.bind(e.ownerDocument, "keydown", function (l) {
                    if ((!l.isDefaultPrevented || !l.isDefaultPrevented()) && n) {
                        var d = document.activeElement ? document.activeElement : e.ownerDocument.activeElement;
                        if (d) {
                            for (; d.shadowRoot;) d = d.shadowRoot.activeElement;
                            if (r.isEditable(d)) return
                        }
                        var c = 0, u = 0;
                        switch (l.which) {
                            case 37:
                                c = -30;
                                break;
                            case 38:
                                u = 30;
                                break;
                            case 39:
                                c = 30;
                                break;
                            case 40:
                                u = -30;
                                break;
                            case 33:
                                u = 90;
                                break;
                            case 32:
                                u = l.shiftKey ? 90 : -90;
                                break;
                            case 34:
                                u = -90;
                                break;
                            case 35:
                                u = l.ctrlKey ? -e.contentHeight : -e.containerHeight;
                                break;
                            case 36:
                                u = l.ctrlKey ? t.scrollTop : e.containerHeight;
                                break;
                            default:
                                return
                        }
                        o(t, "top", t.scrollTop - u), o(t, "left", t.scrollLeft + c), s(t), a = i(c, u), a && l.preventDefault()
                    }
                })
            }

            var r = t("../../lib/helper"), a = t("../instances"), s = t("../update-geometry"),
                o = t("../update-scroll");
            e.exports = function (t) {
                var e = a.get(t);
                n(t, e)
            }
        }, {"../../lib/helper": 6, "../instances": 18, "../update-geometry": 19, "../update-scroll": 20}],
        13: [function (t, e, i) {
            "use strict";

            function n(t, e) {
                function i(i, n) {
                    var r = t.scrollTop;
                    if (0 === i) {
                        if (!e.scrollbarYActive) return !1;
                        if (0 === r && n > 0 || r >= e.contentHeight - e.containerHeight && 0 > n) return !e.settings.wheelPropagation
                    }
                    var a = t.scrollLeft;
                    if (0 === n) {
                        if (!e.scrollbarXActive) return !1;
                        if (0 === a && 0 > i || a >= e.contentWidth - e.containerWidth && i > 0) return !e.settings.wheelPropagation
                    }
                    return !0
                }

                function n(t) {
                    var e = t.deltaX, i = -1 * t.deltaY;
                    return "undefined" != typeof e && "undefined" != typeof i || (e = -1 * t.wheelDeltaX / 6, i = t.wheelDeltaY / 6), t.deltaMode && 1 === t.deltaMode && (e *= 10, i *= 10), e !== e && i !== i && (e = 0, i = t.wheelDelta), [e, i]
                }

                function r(e, i) {
                    var n = t.querySelector("textarea:hover");
                    if (n) {
                        var r = n.scrollHeight - n.clientHeight;
                        if (r > 0 && !(0 === n.scrollTop && i > 0 || n.scrollTop === r && 0 > i)) return !0;
                        var a = n.scrollLeft - n.clientWidth;
                        if (a > 0 && !(0 === n.scrollLeft && 0 > e || n.scrollLeft === a && e > 0)) return !0
                    }
                    return !1
                }

                function o(o) {
                    var d = n(o), c = d[0], u = d[1];
                    r(c, u) || (l = !1, e.settings.useBothWheelAxes ? e.scrollbarYActive && !e.scrollbarXActive ? (u ? s(t, "top", t.scrollTop - u * e.settings.wheelSpeed) : s(t, "top", t.scrollTop + c * e.settings.wheelSpeed), l = !0) : e.scrollbarXActive && !e.scrollbarYActive && (c ? s(t, "left", t.scrollLeft + c * e.settings.wheelSpeed) : s(t, "left", t.scrollLeft - u * e.settings.wheelSpeed), l = !0) : (s(t, "top", t.scrollTop - u * e.settings.wheelSpeed), s(t, "left", t.scrollLeft + c * e.settings.wheelSpeed)), a(t), l = l || i(c, u), l && (o.stopPropagation(), o.preventDefault()))
                }

                var l = !1;
                "undefined" != typeof window.onwheel ? e.event.bind(t, "wheel", o) : "undefined" != typeof window.onmousewheel && e.event.bind(t, "mousewheel", o)
            }

            var r = t("../instances"), a = t("../update-geometry"), s = t("../update-scroll");
            e.exports = function (t) {
                var e = r.get(t);
                n(t, e)
            }
        }, {"../instances": 18, "../update-geometry": 19, "../update-scroll": 20}],
        14: [function (t, e, i) {
            "use strict";

            function n(t, e) {
                e.event.bind(t, "scroll", function () {
                    a(t)
                })
            }

            var r = t("../instances"), a = t("../update-geometry");
            e.exports = function (t) {
                var e = r.get(t);
                n(t, e)
            }
        }, {"../instances": 18, "../update-geometry": 19}],
        15: [function (t, e, i) {
            "use strict";

            function n(t, e) {
                function i() {
                    var t = window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : "";
                    return 0 === t.toString().length ? null : t.getRangeAt(0).commonAncestorContainer
                }

                function n() {
                    d || (d = setInterval(function () {
                        return a.get(t) ? (o(t, "top", t.scrollTop + c.top), o(t, "left", t.scrollLeft + c.left), void s(t)) : void clearInterval(d)
                    }, 50))
                }

                function l() {
                    d && (clearInterval(d), d = null), r.stopScrolling(t)
                }

                var d = null, c = {top: 0, left: 0}, u = !1;
                e.event.bind(e.ownerDocument, "selectionchange", function () {
                    t.contains(i()) ? u = !0 : (u = !1, l())
                }), e.event.bind(window, "mouseup", function () {
                    u && (u = !1, l())
                }), e.event.bind(window, "mousemove", function (e) {
                    if (u) {
                        var i = {x: e.pageX, y: e.pageY}, a = {
                            left: t.offsetLeft,
                            right: t.offsetLeft + t.offsetWidth,
                            top: t.offsetTop,
                            bottom: t.offsetTop + t.offsetHeight
                        };
                        i.x < a.left + 3 ? (c.left = -5, r.startScrolling(t, "x")) : i.x > a.right - 3 ? (c.left = 5, r.startScrolling(t, "x")) : c.left = 0, i.y < a.top + 3 ? (a.top + 3 - i.y < 5 ? c.top = -5 : c.top = -20, r.startScrolling(t, "y")) : i.y > a.bottom - 3 ? (i.y - a.bottom + 3 < 5 ? c.top = 5 : c.top = 20, r.startScrolling(t, "y")) : c.top = 0, 0 === c.top && 0 === c.left ? l() : n()
                    }
                })
            }

            var r = t("../../lib/helper"), a = t("../instances"), s = t("../update-geometry"),
                o = t("../update-scroll");
            e.exports = function (t) {
                var e = a.get(t);
                n(t, e)
            }
        }, {"../../lib/helper": 6, "../instances": 18, "../update-geometry": 19, "../update-scroll": 20}],
        16: [function (t, e, i) {
            "use strict";

            function n(t, e, i, n) {
                function o(i, n) {
                    var r = t.scrollTop, a = t.scrollLeft, s = Math.abs(i), o = Math.abs(n);
                    if (o > s) {
                        if (0 > n && r === e.contentHeight - e.containerHeight || n > 0 && 0 === r) return !e.settings.swipePropagation
                    } else if (s > o && (0 > i && a === e.contentWidth - e.containerWidth || i > 0 && 0 === a)) return !e.settings.swipePropagation;
                    return !0
                }

                function l(e, i) {
                    s(t, "top", t.scrollTop - i), s(t, "left", t.scrollLeft - e), a(t)
                }

                function d() {
                    w = !0
                }

                function c() {
                    w = !1
                }

                function u(t) {
                    return t.targetTouches ? t.targetTouches[0] : t
                }

                function h(t) {
                    return t.targetTouches && 1 === t.targetTouches.length ? !0 : !(!t.pointerType || "mouse" === t.pointerType || t.pointerType === t.MSPOINTER_TYPE_MOUSE)
                }

                function p(t) {
                    if (h(t)) {
                        S = !0;
                        var e = u(t);
                        g.pageX = e.pageX, g.pageY = e.pageY, v = (new Date).getTime(), null !== y && clearInterval(y), t.stopPropagation()
                    }
                }

                function f(t) {
                    if (!w && S && h(t)) {
                        var e = u(t), i = {pageX: e.pageX, pageY: e.pageY}, n = i.pageX - g.pageX,
                            r = i.pageY - g.pageY;
                        l(n, r), g = i;
                        var a = (new Date).getTime(), s = a - v;
                        s > 0 && (b.x = n / s, b.y = r / s, v = a), o(n, r) && (t.stopPropagation(), t.preventDefault())
                    }
                }

                function m() {
                    !w && S && (S = !1, clearInterval(y), y = setInterval(function () {
                        return r.get(t) ? Math.abs(b.x) < .01 && Math.abs(b.y) < .01 ? void clearInterval(y) : (l(30 * b.x, 30 * b.y), b.x *= .8, void(b.y *= .8)) : void clearInterval(y)
                    }, 10))
                }

                var g = {}, v = 0, b = {}, y = null, w = !1, S = !1;
                i && (e.event.bind(window, "touchstart", d), e.event.bind(window, "touchend", c), e.event.bind(t, "touchstart", p), e.event.bind(t, "touchmove", f), e.event.bind(t, "touchend", m)), n && (window.PointerEvent ? (e.event.bind(window, "pointerdown", d), e.event.bind(window, "pointerup", c), e.event.bind(t, "pointerdown", p), e.event.bind(t, "pointermove", f), e.event.bind(t, "pointerup", m)) : window.MSPointerEvent && (e.event.bind(window, "MSPointerDown", d), e.event.bind(window, "MSPointerUp", c), e.event.bind(t, "MSPointerDown", p), e.event.bind(t, "MSPointerMove", f), e.event.bind(t, "MSPointerUp", m)))
            }

            var r = t("../instances"), a = t("../update-geometry"), s = t("../update-scroll");
            e.exports = function (t, e, i) {
                var a = r.get(t);
                n(t, a, e, i)
            }
        }, {"../instances": 18, "../update-geometry": 19, "../update-scroll": 20}],
        17: [function (t, e, i) {
            "use strict";
            var n = t("../lib/class"), r = t("../lib/helper"), a = t("./instances"), s = t("./update-geometry"),
                o = t("./handler/click-rail"), l = t("./handler/drag-scrollbar"), d = t("./handler/keyboard"),
                c = t("./handler/mouse-wheel"), u = t("./handler/native-scroll"), h = t("./handler/selection"),
                p = t("./handler/touch");
            e.exports = function (t, e) {
                e = "object" == typeof e ? e : {}, n.add(t, "ps-container");
                var i = a.add(t);
                i.settings = r.extend(i.settings, e), o(t), l(t), c(t), u(t), i.settings.useSelectionScroll && h(t), (r.env.supportsTouch || r.env.supportsIePointer) && p(t, r.env.supportsTouch, r.env.supportsIePointer), i.settings.useKeyboard && d(t), s(t)
            }
        }, {
            "../lib/class": 2,
            "../lib/helper": 6,
            "./handler/click-rail": 10,
            "./handler/drag-scrollbar": 11,
            "./handler/keyboard": 12,
            "./handler/mouse-wheel": 13,
            "./handler/native-scroll": 14,
            "./handler/selection": 15,
            "./handler/touch": 16,
            "./instances": 18,
            "./update-geometry": 19
        }],
        18: [function (t, e, i) {
            "use strict";

            function n(t) {
                var e = this;
                e.settings = u.clone(l), e.containerWidth = null, e.containerHeight = null, e.contentWidth = null, e.contentHeight = null, e.isRtl = "rtl" === o.css(t, "direction"), e.isNegativeScroll = function () {
                    var e = t.scrollLeft, i = null;
                    return t.scrollLeft = -1, i = t.scrollLeft < 0, t.scrollLeft = e, i
                }(), e.negativeScrollAdjustment = e.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, e.event = new d, e.ownerDocument = t.ownerDocument || document, e.scrollbarXRail = o.appendTo(o.e("div", "ps-scrollbar-x-rail"), t), e.scrollbarX = o.appendTo(o.e("div", "ps-scrollbar-x"), e.scrollbarXRail), e.scrollbarX.setAttribute("tabindex", 0), e.scrollbarXActive = null, e.scrollbarXWidth = null, e.scrollbarXLeft = null, e.scrollbarXBottom = u.toInt(o.css(e.scrollbarXRail, "bottom")), e.isScrollbarXUsingBottom = e.scrollbarXBottom === e.scrollbarXBottom, e.scrollbarXTop = e.isScrollbarXUsingBottom ? null : u.toInt(o.css(e.scrollbarXRail, "top")), e.railBorderXWidth = u.toInt(o.css(e.scrollbarXRail, "borderLeftWidth")) + u.toInt(o.css(e.scrollbarXRail, "borderRightWidth")), o.css(e.scrollbarXRail, "display", "block"), e.railXMarginWidth = u.toInt(o.css(e.scrollbarXRail, "marginLeft")) + u.toInt(o.css(e.scrollbarXRail, "marginRight")), o.css(e.scrollbarXRail, "display", ""), e.railXWidth = null, e.railXRatio = null, e.scrollbarYRail = o.appendTo(o.e("div", "ps-scrollbar-y-rail"), t), e.scrollbarY = o.appendTo(o.e("div", "ps-scrollbar-y"), e.scrollbarYRail), e.scrollbarY.setAttribute("tabindex", 0), e.scrollbarYActive = null, e.scrollbarYHeight = null, e.scrollbarYTop = null, e.scrollbarYRight = u.toInt(o.css(e.scrollbarYRail, "right")), e.isScrollbarYUsingRight = e.scrollbarYRight === e.scrollbarYRight, e.scrollbarYLeft = e.isScrollbarYUsingRight ? null : u.toInt(o.css(e.scrollbarYRail, "left")), e.scrollbarYOuterWidth = e.isRtl ? u.outerWidth(e.scrollbarY) : null, e.railBorderYWidth = u.toInt(o.css(e.scrollbarYRail, "borderTopWidth")) + u.toInt(o.css(e.scrollbarYRail, "borderBottomWidth")), o.css(e.scrollbarYRail, "display", "block"), e.railYMarginHeight = u.toInt(o.css(e.scrollbarYRail, "marginTop")) + u.toInt(o.css(e.scrollbarYRail, "marginBottom")), o.css(e.scrollbarYRail, "display", ""), e.railYHeight = null, e.railYRatio = null
            }

            function r(t) {
                return "undefined" == typeof t.dataset ? t.getAttribute("data-ps-id") : t.dataset.psId
            }

            function a(t, e) {
                "undefined" == typeof t.dataset ? t.setAttribute("data-ps-id", e) : t.dataset.psId = e
            }

            function s(t) {
                "undefined" == typeof t.dataset ? t.removeAttribute("data-ps-id") : delete t.dataset.psId
            }

            var o = t("../lib/dom"), l = t("./default-setting"), d = t("../lib/event-manager"), c = t("../lib/guid"),
                u = t("../lib/helper"), h = {};
            i.add = function (t) {
                var e = c();
                return a(t, e), h[e] = new n(t), h[e]
            }, i.remove = function (t) {
                delete h[r(t)], s(t)
            }, i.get = function (t) {
                return h[r(t)]
            }
        }, {"../lib/dom": 3, "../lib/event-manager": 4, "../lib/guid": 5, "../lib/helper": 6, "./default-setting": 8}],
        19: [function (t, e, i) {
            "use strict";

            function n(t, e) {
                return t.settings.minScrollbarLength && (e = Math.max(e, t.settings.minScrollbarLength)), t.settings.maxScrollbarLength && (e = Math.min(e, t.settings.maxScrollbarLength)), e
            }

            function r(t, e) {
                var i = {width: e.railXWidth};
                e.isRtl ? i.left = e.negativeScrollAdjustment + t.scrollLeft + e.containerWidth - e.contentWidth : i.left = t.scrollLeft, e.isScrollbarXUsingBottom ? i.bottom = e.scrollbarXBottom - t.scrollTop : i.top = e.scrollbarXTop + t.scrollTop, s.css(e.scrollbarXRail, i);
                var n = {top: t.scrollTop, height: e.railYHeight};
                e.isScrollbarYUsingRight ? e.isRtl ? n.right = e.contentWidth - (e.negativeScrollAdjustment + t.scrollLeft) - e.scrollbarYRight - e.scrollbarYOuterWidth : n.right = e.scrollbarYRight - t.scrollLeft : e.isRtl ? n.left = e.negativeScrollAdjustment + t.scrollLeft + 2 * e.containerWidth - e.contentWidth - e.scrollbarYLeft - e.scrollbarYOuterWidth : n.left = e.scrollbarYLeft + t.scrollLeft, s.css(e.scrollbarYRail, n), s.css(e.scrollbarX, {
                    left: e.scrollbarXLeft,
                    width: e.scrollbarXWidth - e.railBorderXWidth
                }), s.css(e.scrollbarY, {top: e.scrollbarYTop, height: e.scrollbarYHeight - e.railBorderYWidth})
            }

            var a = t("../lib/class"), s = t("../lib/dom"), o = t("../lib/helper"), l = t("./instances"),
                d = t("./update-scroll");
            e.exports = function (t) {
                var e = l.get(t);
                e.containerWidth = t.clientWidth, e.containerHeight = t.clientHeight, e.contentWidth = t.scrollWidth, e.contentHeight = t.scrollHeight;
                var i;
                t.contains(e.scrollbarXRail) || (i = s.queryChildren(t, ".ps-scrollbar-x-rail"), i.length > 0 && i.forEach(function (t) {
                    s.remove(t)
                }), s.appendTo(e.scrollbarXRail, t)), t.contains(e.scrollbarYRail) || (i = s.queryChildren(t, ".ps-scrollbar-y-rail"), i.length > 0 && i.forEach(function (t) {
                    s.remove(t)
                }), s.appendTo(e.scrollbarYRail, t)), !e.settings.suppressScrollX && e.containerWidth + e.settings.scrollXMarginOffset < e.contentWidth ? (e.scrollbarXActive = !0, e.railXWidth = e.containerWidth - e.railXMarginWidth, e.railXRatio = e.containerWidth / e.railXWidth, e.scrollbarXWidth = n(e, o.toInt(e.railXWidth * e.containerWidth / e.contentWidth)), e.scrollbarXLeft = o.toInt((e.negativeScrollAdjustment + t.scrollLeft) * (e.railXWidth - e.scrollbarXWidth) / (e.contentWidth - e.containerWidth))) : e.scrollbarXActive = !1, !e.settings.suppressScrollY && e.containerHeight + e.settings.scrollYMarginOffset < e.contentHeight ? (e.scrollbarYActive = !0, e.railYHeight = e.containerHeight - e.railYMarginHeight, e.railYRatio = e.containerHeight / e.railYHeight, e.scrollbarYHeight = n(e, o.toInt(e.railYHeight * e.containerHeight / e.contentHeight)), e.scrollbarYTop = o.toInt(t.scrollTop * (e.railYHeight - e.scrollbarYHeight) / (e.contentHeight - e.containerHeight))) : e.scrollbarYActive = !1, e.scrollbarXLeft >= e.railXWidth - e.scrollbarXWidth && (e.scrollbarXLeft = e.railXWidth - e.scrollbarXWidth), e.scrollbarYTop >= e.railYHeight - e.scrollbarYHeight && (e.scrollbarYTop = e.railYHeight - e.scrollbarYHeight), r(t, e), e.scrollbarXActive ? a.add(t, "ps-active-x") : (a.remove(t, "ps-active-x"), e.scrollbarXWidth = 0, e.scrollbarXLeft = 0, d(t, "left", 0)), e.scrollbarYActive ? a.add(t, "ps-active-y") : (a.remove(t, "ps-active-y"), e.scrollbarYHeight = 0, e.scrollbarYTop = 0, d(t, "top", 0))
            }
        }, {"../lib/class": 2, "../lib/dom": 3, "../lib/helper": 6, "./instances": 18, "./update-scroll": 20}],
        20: [function (t, e, i) {
            "use strict";
            var n, r, a = t("./instances"), s = document.createEvent("Event"), o = document.createEvent("Event"),
                l = document.createEvent("Event"), d = document.createEvent("Event"), c = document.createEvent("Event"),
                u = document.createEvent("Event"), h = document.createEvent("Event"), p = document.createEvent("Event"),
                f = document.createEvent("Event"), m = document.createEvent("Event");
            s.initEvent("ps-scroll-up", !0, !0), o.initEvent("ps-scroll-down", !0, !0), l.initEvent("ps-scroll-left", !0, !0), d.initEvent("ps-scroll-right", !0, !0), c.initEvent("ps-scroll-y", !0, !0), u.initEvent("ps-scroll-x", !0, !0), h.initEvent("ps-x-reach-start", !0, !0), p.initEvent("ps-x-reach-end", !0, !0), f.initEvent("ps-y-reach-start", !0, !0), m.initEvent("ps-y-reach-end", !0, !0), e.exports = function (t, e, i) {
                if ("undefined" == typeof t) throw"You must provide an element to the update-scroll function";
                if ("undefined" == typeof e) throw"You must provide an axis to the update-scroll function";
                if ("undefined" == typeof i) throw"You must provide a value to the update-scroll function";
                if ("top" === e && 0 >= i) return t.scrollTop = 0, void t.dispatchEvent(f);
                if ("left" === e && 0 >= i) return t.scrollLeft = 0, void t.dispatchEvent(h);
                var g = a.get(t);
                return "top" === e && i >= g.contentHeight - g.containerHeight ? (t.scrollTop = g.contentHeight - g.containerHeight, void t.dispatchEvent(m)) : "left" === e && i >= g.contentWidth - g.containerWidth ? (t.scrollLeft = g.contentWidth - g.containerWidth, void t.dispatchEvent(p)) : (n || (n = t.scrollTop), r || (r = t.scrollLeft), "top" === e && n > i && t.dispatchEvent(s), "top" === e && i > n && t.dispatchEvent(o), "left" === e && r > i && t.dispatchEvent(l), "left" === e && i > r && t.dispatchEvent(d), "top" === e && (t.scrollTop = n = i, t.dispatchEvent(c)), void("left" === e && (t.scrollLeft = r = i, t.dispatchEvent(u))))
            }
        }, {"./instances": 18}],
        21: [function (t, e, i) {
            "use strict";
            var n = t("../lib/dom"), r = t("../lib/helper"), a = t("./instances"), s = t("./update-geometry"),
                o = t("./update-scroll");
            e.exports = function (t) {
                var e = a.get(t);
                e && (e.negativeScrollAdjustment = e.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, n.css(e.scrollbarXRail, "display", "block"), n.css(e.scrollbarYRail, "display", "block"), e.railXMarginWidth = r.toInt(n.css(e.scrollbarXRail, "marginLeft")) + r.toInt(n.css(e.scrollbarXRail, "marginRight")), e.railYMarginHeight = r.toInt(n.css(e.scrollbarYRail, "marginTop")) + r.toInt(n.css(e.scrollbarYRail, "marginBottom")), n.css(e.scrollbarXRail, "display", "none"), n.css(e.scrollbarYRail, "display", "none"), s(t), o(t, "top", t.scrollTop), o(t, "left", t.scrollLeft), n.css(e.scrollbarXRail, "display", ""), n.css(e.scrollbarYRail, "display", ""))
            }
        }, {"../lib/dom": 3, "../lib/helper": 6, "./instances": 18, "./update-geometry": 19, "./update-scroll": 20}]
    }, {}, [1]), function (t, e, i, n) {
        function r(e, i) {
            this.element = t(e), this.settings = t.extend({}, S, i), this._defaults = S, this._name = w, this.init()
        }

        function a(t) {
            t.element.trigger("change")
        }

        function s(e) {
            e.element.find("option").each(function (i, n) {
                var r = t(n);
                "undefined" == typeof r.data("original-index") && r.data("original-index", e.elementCount++), "undefined" == typeof r.data("_selected") && r.data("_selected", !1)
            })
        }

        function o(e, i, n) {
            e.element.find("option").each(function (e, r) {
                var a = t(r);
                a.data("original-index") === i && a.prop("selected", n)
            })
        }

        function l(t, e) {
            return t.replace(/\{(\d+)\}/g, function (t, i) {
                return "undefined" != typeof e[i] ? e[i] : t
            })
        }

        function d(t) {
            if (t.settings.infoText) {
                var e = t.elements.select1.find("option").length, i = t.elements.select2.find("option").length,
                    n = t.element.find("option").length - t.selectedElements, r = t.selectedElements, a = "";
                a = 0 === n ? t.settings.infoTextEmpty : e === n ? l(t.settings.infoText, [e, n]) : l(t.settings.infoTextFiltered, [e, n]), t.elements.info1.html(a), t.elements.box1.toggleClass("filtered", !(e === n || 0 === n)), a = 0 === r ? t.settings.infoTextEmpty : i === r ? l(t.settings.infoText, [i, r]) : l(t.settings.infoTextFiltered, [i, r]), t.elements.info2.html(a), t.elements.box2.toggleClass("filtered", !(i === r || 0 === r))
            }
        }

        function c(e) {
            e.selectedElements = 0, e.elements.select1.empty(), e.elements.select2.empty(), e.element.find("option").each(function (i, n) {
                var r = t(n);
                r.prop("selected") ? (e.selectedElements++, e.elements.select2.append(r.clone(!0).prop("selected", r.data("_selected")))) : e.elements.select1.append(r.clone(!0).prop("selected", r.data("_selected")))
            }), e.settings.showFilterInputs && (u(e, 1), u(e, 2)), d(e)
        }

        function u(e, i) {
            if (e.settings.showFilterInputs) {
                h(e, i), e.elements["select" + i].empty().scrollTop(0);
                var n = new RegExp(t.trim(e.elements["filterInput" + i].val()), "gi"), r = e.element.find("option"),
                    a = e.element;
                a = 1 === i ? r.not(":selected") : a.find("option:selected"), a.each(function (a, s) {
                    var o = t(s), l = !0;
                    (s.text.match(n) || e.settings.filterOnValues && o.attr("value").match(n)) && (l = !1, e.elements["select" + i].append(o.clone(!0).prop("selected", o.data("_selected")))), r.eq(o.data("original-index")).data("filtered" + i, l)
                }), d(e)
            }
        }

        function h(e, i) {
            var n = e.element.find("option");
            e.elements["select" + i].find("option").each(function (e, i) {
                var r = t(i);
                n.eq(r.data("original-index")).data("_selected", r.prop("selected"))
            })
        }

        function p(e) {
            e.find("option").sort(function (e, i) {
                return t(e).data("original-index") > t(i).data("original-index") ? 1 : -1
            }).appendTo(e)
        }

        function f(t) {
            t.elements.select1.find("option").each(function () {
                t.element.find("option").data("_selected", !1)
            })
        }

        function m(e) {
            "all" !== e.settings.preserveSelectionOnMove || e.settings.moveOnSelect ? "moved" !== e.settings.preserveSelectionOnMove || e.settings.moveOnSelect || h(e, 1) : (h(e, 1), h(e, 2)), e.elements.select1.find("option:selected").each(function (i, n) {
                var r = t(n);
                r.data("filtered1") || o(e, r.data("original-index"), !0)
            }), c(e), a(e), p(e.elements.select2)
        }

        function g(e) {
            "all" !== e.settings.preserveSelectionOnMove || e.settings.moveOnSelect ? "moved" !== e.settings.preserveSelectionOnMove || e.settings.moveOnSelect || h(e, 2) : (h(e, 1), h(e, 2)), e.elements.select2.find("option:selected").each(function (i, n) {
                var r = t(n);
                r.data("filtered2") || o(e, r.data("original-index"), !1)
            }), c(e), a(e), p(e.elements.select1)
        }

        function v(e) {
            "all" !== e.settings.preserveSelectionOnMove || e.settings.moveOnSelect ? "moved" !== e.settings.preserveSelectionOnMove || e.settings.moveOnSelect || h(e, 1) : (h(e, 1), h(e, 2)), e.element.find("option").each(function (e, i) {
                var n = t(i);
                n.data("filtered1") || n.prop("selected", !0)
            }), c(e), a(e)
        }

        function b(e) {
            "all" !== e.settings.preserveSelectionOnMove || e.settings.moveOnSelect ? "moved" !== e.settings.preserveSelectionOnMove || e.settings.moveOnSelect || h(e, 2) : (h(e, 1), h(e, 2)), e.element.find("option").each(function (e, i) {
                var n = t(i);
                n.data("filtered2") || n.prop("selected", !1)
            }), c(e), a(e)
        }

        function y(t) {
            t.elements.form.submit(function (e) {
                t.elements.filterInput1.is(":focus") ? (e.preventDefault(), t.elements.filterInput1.focusout()) : t.elements.filterInput2.is(":focus") && (e.preventDefault(), t.elements.filterInput2.focusout())
            }), t.element.on("bootstrapDualListbox.refresh", function (e, i) {
                t.refresh(i)
            }), t.elements.filterClear1.on("click", function () {
                t.setNonSelectedFilter("", !0)
            }), t.elements.filterClear2.on("click", function () {
                t.setSelectedFilter("", !0)
            }), t.elements.moveButton.on("click", function () {
                m(t)
            }), t.elements.moveAllButton.on("click", function () {
                v(t)
            }), t.elements.removeButton.on("click", function () {
                g(t)
            }), t.elements.removeAllButton.on("click", function () {
                b(t)
            }), t.elements.filterInput1.on("change keyup", function () {
                u(t, 1)
            }), t.elements.filterInput2.on("change keyup", function () {
                u(t, 2)
            })
        }

        var w = "bootstrapDualListbox", S = {
            bootstrap2Compatible: !1,
            filterTextClear: "show all",
            filterPlaceHolder: "Filter",
            moveSelectedLabel: "Move selected",
            moveAllLabel: "Move all",
            removeSelectedLabel: "Remove selected",
            removeAllLabel: "Remove all",
            moveOnSelect: !0,
            preserveSelectionOnMove: !1,
            selectedListLabel: !1,
            nonSelectedListLabel: !1,
            helperSelectNamePostfix: "_helper",
            selectorMinimalHeight: 100,
            showFilterInputs: !0,
            nonSelectedFilter: "",
            selectedFilter: "",
            infoText: "Showing all {0}",
            infoTextFiltered: '<span class="label label-warning">Filtered</span> {0} from {1}',
            infoTextEmpty: "Empty list",
            filterOnValues: !1
        }, _ = /android/i.test(navigator.userAgent.toLowerCase());
        r.prototype = {
            init: function () {
                this.container = t('<div class="bootstrap-duallistbox-container"> <div class="box1">   <label></label>   <span class="info-container">     <span class="info"></span>     <button type="button" class="btn clear1 pull-right"></button>   </span>   <input class="filter" type="text">   <div class="btn-group buttons">     <button type="button" class="btn moveall">       <i></i>       <i></i>     </button>     <button type="button" class="btn move">       <i></i>     </button>   </div>   <select multiple="multiple"></select> </div> <div class="box2">   <label></label>   <span class="info-container">     <span class="info"></span>     <button type="button" class="btn clear2 pull-right"></button>   </span>   <input class="filter" type="text">   <div class="btn-group buttons">     <button type="button" class="btn remove">       <i></i>     </button>     <button type="button" class="btn removeall">       <i></i>       <i></i>     </button>   </div>   <select multiple="multiple"></select> </div></div>').insertBefore(this.element), this.elements = {
                    originalSelect: this.element,
                    box1: t(".box1", this.container),
                    box2: t(".box2", this.container),
                    filterInput1: t(".box1 .filter", this.container),
                    filterInput2: t(".box2 .filter", this.container),
                    filterClear1: t(".box1 .clear1", this.container),
                    filterClear2: t(".box2 .clear2", this.container),
                    label1: t(".box1 > label", this.container),
                    label2: t(".box2 > label", this.container),
                    info1: t(".box1 .info", this.container),
                    info2: t(".box2 .info", this.container),
                    select1: t(".box1 select", this.container),
                    select2: t(".box2 select", this.container),
                    moveButton: t(".box1 .move", this.container),
                    removeButton: t(".box2 .remove", this.container),
                    moveAllButton: t(".box1 .moveall", this.container),
                    removeAllButton: t(".box2 .removeall", this.container),
                    form: t(t(".box1 .filter", this.container)[0].form)
                }, this.originalSelectName = this.element.attr("name") || "";
                var e = "bootstrap-duallistbox-nonselected-list_" + this.originalSelectName,
                    i = "bootstrap-duallistbox-selected-list_" + this.originalSelectName;
                return this.elements.select1.attr("id", e), this.elements.select2.attr("id", i), this.elements.label1.attr("for", e), this.elements.label2.attr("for", i), this.selectedElements = 0, this.elementCount = 0, this.setBootstrap2Compatible(this.settings.bootstrap2Compatible), this.setFilterTextClear(this.settings.filterTextClear), this.setFilterPlaceHolder(this.settings.filterPlaceHolder), this.setMoveSelectedLabel(this.settings.moveSelectedLabel), this.setMoveAllLabel(this.settings.moveAllLabel), this.setRemoveSelectedLabel(this.settings.removeSelectedLabel), this.setRemoveAllLabel(this.settings.removeAllLabel), this.setMoveOnSelect(this.settings.moveOnSelect), this.setPreserveSelectionOnMove(this.settings.preserveSelectionOnMove), this.setSelectedListLabel(this.settings.selectedListLabel), this.setNonSelectedListLabel(this.settings.nonSelectedListLabel), this.setHelperSelectNamePostfix(this.settings.helperSelectNamePostfix), this.setSelectOrMinimalHeight(this.settings.selectorMinimalHeight), s(this), this.setShowFilterInputs(this.settings.showFilterInputs), this.setNonSelectedFilter(this.settings.nonSelectedFilter), this.setSelectedFilter(this.settings.selectedFilter), this.setInfoText(this.settings.infoText), this.setInfoTextFiltered(this.settings.infoTextFiltered), this.setInfoTextEmpty(this.settings.infoTextEmpty), this.setFilterOnValues(this.settings.filterOnValues), this.element.hide(), y(this), c(this), this.element
            }, setBootstrap2Compatible: function (t, e) {
                return this.settings.bootstrap2Compatible = t, t ? (this.container.removeClass("row").addClass("row-fluid bs2compatible"), this.container.find(".box1, .box2").removeClass("col-md-6").addClass("span6"), this.container.find(".clear1, .clear2").removeClass("btn-default btn-xs").addClass("btn-mini"), this.container.find("input, select").removeClass("form-control"), this.container.find(".btn").removeClass("btn-default"), this.container.find(".moveall > i, .move > i").removeClass("glyphicon glyphicon-arrow-right").addClass("icon-arrow-right"), this.container.find(".removeall > i, .remove > i").removeClass("glyphicon glyphicon-arrow-left").addClass("icon-arrow-left")) : (this.container.removeClass("row-fluid bs2compatible").addClass("row"), this.container.find(".box1, .box2").removeClass("span6").addClass("col-md-6"), this.container.find(".clear1, .clear2").removeClass("btn-mini").addClass("btn-default btn-xs"), this.container.find("input, select").addClass("form-control"), this.container.find(".btn").addClass("btn-default"), this.container.find(".moveall > i, .move > i").removeClass("icon-arrow-right").addClass("glyphicon glyphicon-arrow-right"), this.container.find(".removeall > i, .remove > i").removeClass("icon-arrow-left").addClass("glyphicon glyphicon-arrow-left")), e && c(this), this.element
            }, setFilterTextClear: function (t, e) {
                return this.settings.filterTextClear = t, this.elements.filterClear1.html(t), this.elements.filterClear2.html(t), e && c(this), this.element
            }, setFilterPlaceHolder: function (t, e) {
                return this.settings.filterPlaceHolder = t, this.elements.filterInput1.attr("placeholder", t), this.elements.filterInput2.attr("placeholder", t), e && c(this), this.element
            }, setMoveSelectedLabel: function (t, e) {
                return this.settings.moveSelectedLabel = t, this.elements.moveButton.attr("title", t), e && c(this), this.element
            }, setMoveAllLabel: function (t, e) {
                return this.settings.moveAllLabel = t, this.elements.moveAllButton.attr("title", t), e && c(this), this.element
            }, setRemoveSelectedLabel: function (t, e) {
                return this.settings.removeSelectedLabel = t, this.elements.removeButton.attr("title", t), e && c(this), this.element
            }, setRemoveAllLabel: function (t, e) {
                return this.settings.removeAllLabel = t, this.elements.removeAllButton.attr("title", t), e && c(this), this.element
            }, setMoveOnSelect: function (t, e) {
                if (_ && (t = !0), this.settings.moveOnSelect = t, this.settings.moveOnSelect) {
                    this.container.addClass("moveonselect");
                    var i = this;
                    this.elements.select1.on("change", function () {
                        m(i)
                    }), this.elements.select2.on("change", function () {
                        g(i)
                    })
                } else this.container.removeClass("moveonselect"), this.elements.select1.off("change"), this.elements.select2.off("change");
                return e && c(this), this.element
            }, setPreserveSelectionOnMove: function (t, e) {
                return _ && (t = !1), this.settings.preserveSelectionOnMove = t, e && c(this), this.element
            }, setSelectedListLabel: function (t, e) {
                return this.settings.selectedListLabel = t, t ? this.elements.label2.show().html(t) : this.elements.label2.hide().html(t), e && c(this), this.element
            }, setNonSelectedListLabel: function (t, e) {
                return this.settings.nonSelectedListLabel = t, t ? this.elements.label1.show().html(t) : this.elements.label1.hide().html(t), e && c(this), this.element
            }, setHelperSelectNamePostfix: function (t, e) {
                return this.settings.helperSelectNamePostfix = t, t ? (this.elements.select1.attr("name", this.originalSelectName + t + "1"), this.elements.select2.attr("name", this.originalSelectName + t + "2")) : (this.elements.select1.removeAttr("name"), this.elements.select2.removeAttr("name")), e && c(this), this.element
            }, setSelectOrMinimalHeight: function (t, e) {
                this.settings.selectorMinimalHeight = t;
                var i = this.element.height();
                return this.element.height() < t && (i = t), this.elements.select1.height(i), this.elements.select2.height(i), e && c(this), this.element
            }, setShowFilterInputs: function (t, e) {
                return t ? (this.elements.filterInput1.show(), this.elements.filterInput2.show()) : (this.setNonSelectedFilter(""), this.setSelectedFilter(""), c(this), this.elements.filterInput1.hide(), this.elements.filterInput2.hide()), this.settings.showFilterInputs = t, e && c(this), this.element
            }, setNonSelectedFilter: function (t, e) {
                return this.settings.showFilterInputs ? (this.settings.nonSelectedFilter = t, this.elements.filterInput1.val(t), e && c(this), this.element) : void 0
            }, setSelectedFilter: function (t, e) {
                return this.settings.showFilterInputs ? (this.settings.selectedFilter = t, this.elements.filterInput2.val(t), e && c(this), this.element) : void 0
            }, setInfoText: function (t, e) {
                return this.settings.infoText = t, e && c(this), this.element
            }, setInfoTextFiltered: function (t, e) {
                return this.settings.infoTextFiltered = t, e && c(this), this.element
            }, setInfoTextEmpty: function (t, e) {
                return this.settings.infoTextEmpty = t, e && c(this), this.element
            }, setFilterOnValues: function (t, e) {
                return this.settings.filterOnValues = t, e && c(this), this.element
            }, getContainer: function () {
                return this.container
            }, refresh: function (t) {
                s(this), t ? f(this) : (h(this, 1), h(this, 2)), c(this)
            }, destroy: function () {
                return this.container.remove(), this.element.show(), t.data(this, "plugin_" + w, null), this.element
            }
        }, t.fn[w] = function (e) {
            var i = arguments;
            if (e === n || "object" == typeof e) return this.each(function () {
                t(this).is("select") ? t.data(this, "plugin_" + w) || t.data(this, "plugin_" + w, new r(this, e)) : t(this).find("select").each(function (i, n) {
                    t(n).bootstrapDualListbox(e)
                })
            });
            if ("string" == typeof e && "_" !== e[0] && "init" !== e) {
                var a;
                return this.each(function () {
                    var n = t.data(this, "plugin_" + w);
                    n instanceof r && "function" == typeof n[e] && (a = n[e].apply(n, Array.prototype.slice.call(i, 1)))
                }), a !== n ? a : this
            }
        }
    }(jQuery, window, document), function (t) {
        function e() {
            var t = "!@#$%^&*()+=[]\\';,/{}|\":<>?~`.-_";
            return t += " "
        }

        function i() {
            var t = "¬€£¦";
            return t
        }

        function n(e, i, n) {
            e.each(function () {
                var e = t(this);
                e.off(".alphanum").on("keyup.alphanum change.alphanum paste.alphanum", function (t) {
                    var r = "";
                    t.originalEvent && t.originalEvent.clipboardData && t.originalEvent.clipboardData.getData && (r = t.originalEvent.clipboardData.getData("text/plain")), setTimeout(function () {
                        o(e, i, n, r)
                    }, 0)
                }).on("keypress.alphanum", function (t) {
                    var r = t.charCode ? t.charCode : t.which;
                    if (!(s(r) || t.ctrlKey || t.metaKey)) {
                        var a = String.fromCharCode(r), o = e.selection(), l = o.start, d = o.end, c = e.val(),
                            u = c.substring(0, l) + a + c.substring(d), h = i(u, n);
                        h != u && t.preventDefault()
                    }
                })
            })
        }

        function r(e, i) {
            var n = parseFloat(t(e).val()), r = t(e);
            return isNaN(n) ? void r.val("") : (a(i.min) && n < i.min && r.val(""), void(a(i.max) && n > i.max && r.val("")))
        }

        function a(t) {
            return !isNaN(t)
        }

        function s(t) {
            return t >= 32 ? !1 : 10 == t ? !1 : 13 != t
        }

        function o(t, e, i, n) {
            var r = t.val();
            "" == r && n.length > 0 && (r = n);
            var a = e(r, i);
            if (r != a) {
                var s = t.alphanum_caret();
                t.val(a), r.length == a.length + 1 ? t.alphanum_caret(s - 1) : t.alphanum_caret(s)
            }
        }

        function l(e, i) {
            "undefined" == typeof i && (i = I);
            var n, r = {};
            return n = "string" == typeof e ? F[e] : "undefined" == typeof e ? {} : e, t.extend(r, i, n), "undefined" == typeof r.blacklist && (r.blacklistSet = x(r.allow, r.disallow)), r
        }

        function d(e) {
            var i, n = {};
            return i = "string" == typeof e ? E[e] : "undefined" == typeof e ? {} : e, t.extend(n, M, i), n
        }

        function c(t, e, i) {
            return i.maxLength && t.length >= i.maxLength ? !1 : i.allow.indexOf(e) >= 0 ? !0 : i.allowSpace && " " == e ? !0 : i.allowNewline || "\n" != e && "\r" != e ? i.blacklistSet.contains(e) ? !1 : !i.allowNumeric && V[e] ? !1 : !i.allowUpper && w(e) ? !1 : !i.allowLower && S(e) ? !1 : !i.allowCaseless && _(e) ? !1 : !i.allowLatin && P.contains(e) ? !1 : i.allowOtherCharSets ? !0 : !(!V[e] && !P.contains(e)) : !1
        }

        function u(t, e, i) {
            if (V[e]) return p(t, i) ? !1 : m(t, i) ? !1 : f(t, i) ? !1 : g(t + e, i) ? !1 : !v(t + e, i);
            if (i.allowPlus && "+" == e && "" == t) return !0;
            if (i.allowMinus && "-" == e && "" == t) return !0;
            if (e == L && i.allowThouSep && C(t, e)) return !0;
            if (e == O) {
                if (t.indexOf(O) >= 0) return !1;
                if (i.allowDecSep) return !0
            }
            return !1
        }

        function h(t) {
            return t += "", t.replace(/[^0-9]/g, "").length
        }

        function p(t, e) {
            var i = e.maxDigits;
            if ("" == i || isNaN(i)) return !1;
            var n = h(t);
            return n >= i
        }

        function f(t, e) {
            var i = e.maxDecimalPlaces;
            if ("" == i || isNaN(i)) return !1;
            var n = t.indexOf(O);
            if (-1 == n) return !1;
            var r = t.substring(n), a = h(r);
            return a >= i
        }

        function m(t, e) {
            var i = e.maxPreDecimalPlaces;
            if ("" == i || isNaN(i)) return !1;
            var n = t.indexOf(O);
            if (n >= 0) return !1;
            var r = h(t);
            return r >= i
        }

        function g(t, e) {
            if (!e.max || e.max < 0) return !1;
            var i = parseFloat(t);
            return i > e.max
        }

        function v(t, e) {
            if (!e.min || e.min > 0) return !1;
            var i = parseFloat(t);
            return i < e.min
        }

        function b(t, e) {
            if ("string" != typeof t) return t;
            var i, n = t.split(""), r = [], a = 0;
            for (a = 0; a < n.length; a++) {
                i = n[a];
                var s = r.join("");
                c(s, i, e) && r.push(i)
            }
            var o = r.join("");
            return e.forceLower ? o = o.toLowerCase() : e.forceUpper && (o = o.toUpperCase()), o
        }

        function y(t, e) {
            if ("string" != typeof t) return t;
            var i, n = t.split(""), r = [], a = 0;
            for (a = 0; a < n.length; a++) {
                i = n[a];
                var s = r.join("");
                u(s, i, e) && r.push(i)
            }
            return r.join("")
        }

        function w(t) {
            var e = t.toUpperCase(), i = t.toLowerCase();
            return t == e && e != i
        }

        function S(t) {
            var e = t.toUpperCase(), i = t.toLowerCase();
            return t == i && e != i
        }

        function _(t) {
            return t.toUpperCase() == t.toLowerCase()
        }

        function x(t, e) {
            var i = new A($ + e), n = new A(t), r = i.subtract(n);
            return r
        }

        function D() {
            var t, e = "0123456789".split(""), i = {}, n = 0;
            for (n = 0; n < e.length; n++) t = e[n], i[t] = !0;
            return i
        }

        function T() {
            var t = "abcdefghijklmnopqrstuvwxyz", e = t.toUpperCase(), i = new A(t + e);
            return i
        }

        function C(t, e) {
            if (0 == t.length) return !1;
            var i = t.indexOf(O);
            if (i >= 0) return !1;
            var n = t.indexOf(L);
            if (0 > n) return !0;
            var r = t.lastIndexOf(L), a = t.length - r - 1;
            if (3 > a) return !1;
            var s = h(t.substring(n));
            return !(s % 3 > 0)
        }

        function A(t) {
            "string" == typeof t ? this.map = k(t) : this.map = {}
        }

        function k(t) {
            var e, i = {}, n = t.split(""), r = 0;
            for (r = 0; r < n.length; r++) e = n[r], i[e] = !0;
            return i
        }

        t.fn.alphanum = function (t) {
            var e = l(t), i = this;
            return n(i, b, e), this
        }, t.fn.alpha = function (t) {
            var e = l("alpha"), i = l(t, e), r = this;
            return n(r, b, i), this
        }, t.fn.numeric = function (t) {
            var e = d(t), i = this;
            return n(i, y, e), i.blur(function () {
                r(this, t)
            }), this
        };
        var I = {
            allow: "",
            disallow: "",
            allowSpace: !0,
            allowNewline: !0,
            allowNumeric: !0,
            allowUpper: !0,
            allowLower: !0,
            allowCaseless: !0,
            allowLatin: !0,
            allowOtherCharSets: !0,
            forceUpper: !1,
            forceLower: !1,
            maxLength: NaN
        }, M = {
            allowPlus: !1,
            allowMinus: !0,
            allowThouSep: !0,
            allowDecSep: !0,
            allowLeadingSpaces: !1,
            maxDigits: NaN,
            maxDecimalPlaces: NaN,
            maxPreDecimalPlaces: NaN,
            max: NaN,
            min: NaN
        }, F = {
            alpha: {allowNumeric: !1},
            upper: {allowNumeric: !1, allowUpper: !0, allowLower: !1, allowCaseless: !0},
            lower: {allowNumeric: !1, allowUpper: !1, allowLower: !0, allowCaseless: !0}
        }, E = {
            integer: {allowPlus: !1, allowMinus: !0, allowThouSep: !1, allowDecSep: !1},
            positiveInteger: {allowPlus: !1, allowMinus: !1, allowThouSep: !1, allowDecSep: !1}
        }, $ = e() + i(), L = ",", O = ".", V = D(), P = T();
        A.prototype.add = function (t) {
            var e = this.clone();
            for (var i in t.map) e.map[i] = !0;
            return e
        }, A.prototype.subtract = function (t) {
            var e = this.clone();
            for (var i in t.map) delete e.map[i];
            return e
        }, A.prototype.contains = function (t) {
            return !!this.map[t]
        }, A.prototype.clone = function () {
            var t = new A;
            for (var e in this.map) t.map[e] = !0;
            return t
        }, t.fn.alphanum.backdoorAlphaNum = function (t, e) {
            var i = l(e);
            return b(t, i)
        }, t.fn.alphanum.backdoorNumeric = function (t, e) {
            var i = d(e);
            return y(t, i)
        }, t.fn.alphanum.setNumericSeparators = function (t) {
            1 == t.thousandsSeparator.length && 1 == t.decimalSeparator.length && (L = t.thousandsSeparator, O = t.decimalSeparator)
        }
    }(jQuery), function (t) {
        function e(t, e) {
            if (t.createTextRange) {
                var i = t.createTextRange();
                i.move("character", e), i.select()
            } else null != t.selectionStart && (t.focus(), t.setSelectionRange(e, e))
        }

        function i(t) {
            if ("selection" in document) {
                var e = t.createTextRange();
                try {
                    e.setEndPoint("EndToStart", document.selection.createRange())
                } catch (i) {
                    return 0
                }
                return e.text.length
            }
            return null != t.selectionStart ? t.selectionStart : void 0
        }

        t.fn.alphanum_caret = function (n, r) {
            return "undefined" == typeof n ? i(this.get(0)) : this.queue(function (i) {
                if (isNaN(n)) {
                    var a = t(this).val().indexOf(n);
                    r === !0 ? a += n.length : "undefined" != typeof r && (a += r), e(this, a)
                } else e(this, n);
                i()
            })
        }
    }(jQuery), function (t) {
        var e = function (t) {
            return t ? t.ownerDocument.defaultView || t.ownerDocument.parentWindow : window
        }, i = function (e, i) {
            var n = t.Range.current(e).clone(), r = t.Range(e).select(e);
            return n.overlaps(r) ? (n.compare("START_TO_START", r) < 1 ? (startPos = 0, n.move("START_TO_START", r)) : (fromElementToCurrent = r.clone(), fromElementToCurrent.move("END_TO_START", n), startPos = fromElementToCurrent.toString().length), n.compare("END_TO_END", r) >= 0 ? endPos = r.toString().length : endPos = startPos + n.toString().length, {
                start: startPos,
                end: endPos
            }) : null
        }, n = function (n) {
            var r = e(n);
            if (void 0 !== n.selectionStart) return document.activeElement && document.activeElement != n && n.selectionStart == n.selectionEnd && 0 == n.selectionStart ? {
                start: n.value.length,
                end: n.value.length
            } : {start: n.selectionStart, end: n.selectionEnd};
            if (r.getSelection) return i(n, r);
            try {
                if ("input" == n.nodeName.toLowerCase()) {
                    var a = e(n).document.selection.createRange(), s = n.createTextRange();
                    s.setEndPoint("EndToStart", a);
                    var o = s.text.length;
                    return {start: o, end: o + a.text.length}
                }
                var l = i(n, r);
                if (!l) return l;
                var d = t.Range.current().clone(), c = d.clone().collapse().range, u = d.clone().collapse(!1).range;
                return c.moveStart("character", -1), u.moveStart("character", -1), 0 != l.startPos && "" == c.text && (l.startPos += 2), 0 != l.endPos && "" == u.text && (l.endPos += 2), l
            } catch (h) {
                return {
                    start: n.value.length, end: n.value.length
                }
            }
        }, r = function (t, i, n) {
            var r = e(t);
            if (t.setSelectionRange) void 0 === n ? (t.focus(), t.setSelectionRange(i, i)) : (t.select(), t.selectionStart = i, t.selectionEnd = n); else if (t.createTextRange) {
                var a = t.createTextRange();
                a.moveStart("character", i), n = n || i, a.moveEnd("character", n - t.value.length), a.select()
            } else if (r.getSelection) {
                var o = r.document, l = r.getSelection(), d = o.createRange(), c = [i, void 0 !== n ? n : i];
                s([t], c), d.setStart(c[0].el, c[0].count), d.setEnd(c[1].el, c[1].count), l.removeAllRanges(), l.addRange(d)
            } else if (r.document.body.createTextRange) {
                var d = document.body.createTextRange();
                d.moveToElementText(t), d.collapse(), d.moveStart("character", i), d.moveEnd("character", void 0 !== n ? n : i), d.select()
            }
        }, a = function (t, e, i, n) {
            "number" == typeof i[0] && i[0] < e && (i[0] = {
                el: n,
                count: i[0] - t
            }), "number" == typeof i[1] && i[1] <= e && (i[1] = {el: n, count: i[1] - t})
        }, s = function (t, e, i) {
            var n, r;
            i = i || 0;
            for (var o = 0; t[o]; o++) n = t[o], 3 === n.nodeType || 4 === n.nodeType ? (r = i, i += n.nodeValue.length, a(r, i, e, n)) : 8 !== n.nodeType && (i = s(n.childNodes, e, i));
            return i
        };
        jQuery.fn.selection = function (t, e) {
            return void 0 !== t ? this.each(function () {
                r(this, t, e)
            }) : n(this[0])
        }, t.fn.selection.getCharElement = s
    }(jQuery), "undefined" == typeof jQuery) throw new Error("multiselect requires jQuery");
!function (t) {
    "use strict";
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 7) throw new Error("multiselect requires jQuery version 1.7 or higher")
}(jQuery), function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function (t) {
    "use strict";
    var e = function (t) {
        function e(e, i) {
            var n = e.prop("id");
            this.left = e, this.right = t(t(i.right).length ? i.right : "#" + n + "_to"), this.actions = {
                leftAll: t(t(i.leftAll).length ? i.leftAll : "#" + n + "_leftAll"),
                rightAll: t(t(i.rightAll).length ? i.rightAll : "#" + n + "_rightAll"),
                leftSelected: t(t(i.leftSelected).length ? i.leftSelected : "#" + n + "_leftSelected"),
                rightSelected: t(t(i.rightSelected).length ? i.rightSelected : "#" + n + "_rightSelected"),
                undo: t(t(i.undo).length ? i.undo : "#" + n + "_undo"),
                redo: t(t(i.redo).length ? i.redo : "#" + n + "_redo")
            }, delete i.leftAll, delete i.leftSelected, delete i.right, delete i.rightAll, delete i.rightSelected, this.options = {
                keepRenderingSort: i.keepRenderingSort,
                submitAllLeft: void 0 !== i.submitAllLeft ? i.submitAllLeft : !0,
                submitAllRight: void 0 !== i.submitAllRight ? i.submitAllLeft : !0,
                search: i.search
            }, delete i.keepRenderingSort, i.submitAllLeft, i.submitAllRight, i.search, this.callbacks = i, this.init()
        }

        return e.prototype = {
            undoStack: [], redoStack: [], init: function () {
                var e = this;
                e.options.keepRenderingSort && (e.skipInitSort = !0, e.callbacks.sort = function (e, i) {
                    return t(e).data("position") > t(i).data("position") ? 1 : -1
                }, e.left.find("option").each(function (e, i) {
                    t(i).data("position", e)
                }), e.right.find("option").each(function (e, i) {
                    t(i).data("position", e)
                })), "function" == typeof e.callbacks.startUp && e.callbacks.startUp(e.left, e.right), e.skipInitSort || "function" != typeof e.callbacks.sort || (e.left.find("option").sort(e.callbacks.sort).appendTo(e.left), e.right.each(function (i, n) {
                    t(n).find("option").sort(e.callbacks.sort).appendTo(n)
                })), e.options.search && e.options.search.left && (e.options.search.left = t(e.options.search.left), e.left.before(e.options.search.left)), e.options.search && e.options.search.right && (e.options.search.right = t(e.options.search.right), e.right.before(t(e.options.search.right))), e.events(e.actions)
            }, events: function (e) {
                var i = this;
                i.left.on("dblclick", "option", function (t) {
                    t.preventDefault(), i.moveToRight(this, t)
                }), i.right.on("dblclick", "option", function (t) {
                    t.preventDefault(), i.moveToLeft(this, t)
                }), i.options.search && i.options.search.left && i.options.search.left.on("keyup", function (e) {
                    var n = new RegExp(this.value, "ig");
                    i.left.find("option").each(function (e, i) {
                        i.text.search(n) >= 0 ? t(i).show() : t(i).hide()
                    })
                }), i.options.search && i.options.search.right && i.options.search.right.on("keyup", function (e) {
                    var n = new RegExp(this.value, "ig");
                    i.right.find("option").each(function (e, i) {
                        i.text.search(n) >= 0 ? t(i).show() : t(i).hide()
                    })
                }), i.right.closest("form").on("submit", function (t) {
                    i.left.children().prop("selected", i.options.submitAllLeft), i.right.children().prop("selected", i.options.submitAllRight)
                }), (navigator.userAgent.match(/MSIE/i) || navigator.userAgent.indexOf("Trident/") > 0 || navigator.userAgent.indexOf("Edge/") > 0) && (i.left.dblclick(function (t) {
                    e.rightSelected.trigger("click")
                }), i.right.dblclick(function (t) {
                    e.leftSelected.trigger("click")
                })), e.rightSelected.on("click", function (e) {
                    e.preventDefault();
                    var n = i.left.find("option:selected");
                    n && i.moveToRight(n, e), t(this).blur()
                }), e.leftSelected.on("click", function (e) {
                    e.preventDefault();
                    var n = i.right.find("option:selected");
                    n && i.moveToLeft(n, e), t(this).blur()
                }), e.rightAll.on("click", function (e) {
                    e.preventDefault();
                    var n = i.left.find("option");
                    n && i.moveToRight(n, e), t(this).blur()
                }), e.leftAll.on("click", function (e) {
                    e.preventDefault();
                    var n = i.right.find("option");
                    n && i.moveToLeft(n, e), t(this).blur()
                }), e.undo.on("click", function (t) {
                    t.preventDefault(), i.undo(t)
                }), e.redo.on("click", function (t) {
                    t.preventDefault(), i.redo(t)
                })
            }, moveToRight: function (t, e, i, n) {
                var r = this;
                return "function" == typeof r.callbacks.moveToRight ? r.callbacks.moveToRight(r, t, e, i, n) : "function" != typeof r.callbacks.beforeMoveToRight || i || r.callbacks.beforeMoveToRight(r.left, r.right, t) ? (r.right.append(t), n || (r.undoStack.push(["right", t]), r.redoStack = []), "function" != typeof r.callbacks.sort || i || r.right.find("option").sort(r.callbacks.sort).appendTo(r.right), "function" != typeof r.callbacks.afterMoveToRight || i || r.callbacks.afterMoveToRight(r.left, r.right, t), r) : !1
            }, moveToLeft: function (t, e, i, n) {
                var r = this;
                return "function" == typeof r.callbacks.moveToLeft ? r.callbacks.moveToLeft(r, t, e, i, n) : "function" != typeof r.callbacks.beforeMoveToLeft || i || r.callbacks.beforeMoveToLeft(r.left, r.right, t) ? (r.left.append(t), n || (r.undoStack.push(["left", t]), r.redoStack = []), "function" != typeof r.callbacks.sort || i || r.left.find("option").sort(r.callbacks.sort).appendTo(r.left), "function" != typeof r.callbacks.afterMoveToLeft || i || r.callbacks.afterMoveToLeft(r.left, r.right, t), r) : !1
            }, undo: function (t) {
                var e = this, i = e.undoStack.pop();
                if (i) switch (e.redoStack.push(i), i[0]) {
                    case"left":
                        e.moveToRight(i[1], t, !1, !0);
                        break;
                    case"right":
                        e.moveToLeft(i[1], t, !1, !0)
                }
            }, redo: function (t) {
                var e = this, i = e.redoStack.pop();
                if (i) switch (e.undoStack.push(i), i[0]) {
                    case"left":
                        e.moveToLeft(i[1], t, !1, !0);
                        break;
                    case"right":
                        e.moveToRight(i[1], t, !1, !0)
                }
            }
        }, e
    }(t);
    t.multiselect = {
        defaults: {
            startUp: function (t, e) {
                e.find("option").each(function (e, i) {
                    t.find('option[value="' + i.value + '"]').remove()
                })
            }, beforeMoveToRight: function (t, e, i) {
                return !0
            }, afterMoveToRight: function (t, e, i) {
            }, beforeMoveToLeft: function (t, e, i) {
                return !0
            }, afterMoveToLeft: function (t, e, i) {
            }, sort: function (t, e) {
                return "NA" == t.innerHTML ? 1 : "NA" == e.innerHTML ? -1 : t.innerHTML > e.innerHTML ? 1 : -1
            }
        }
    }, t.fn.multiselect = function (i) {
        return this.each(function () {
            var n = t(this), r = n.data(), a = t.extend({}, t.multiselect.defaults, r, i);
            return new e(n, a)
        })
    }
}), !function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.moment = e()
}(this, function () {
    "use strict";

    function t() {
        return Ki.apply(null, arguments)
    }

    function e(t) {
        Ki = t
    }

    function i(t) {
        return t instanceof Array || "[object Array]" === Object.prototype.toString.call(t)
    }

    function n(t) {
        return t instanceof Date || "[object Date]" === Object.prototype.toString.call(t)
    }

    function r(t, e) {
        var i, n = [];
        for (i = 0; i < t.length; ++i) n.push(e(t[i], i));
        return n
    }

    function a(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }

    function s(t, e) {
        for (var i in e) a(e, i) && (t[i] = e[i]);
        return a(e, "toString") && (t.toString = e.toString), a(e, "valueOf") && (t.valueOf = e.valueOf), t
    }

    function o(t, e, i, n) {
        return Lt(t, e, i, n, !0).utc()
    }

    function l() {
        return {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1
        }
    }

    function d(t) {
        return null == t._pf && (t._pf = l()), t._pf
    }

    function c(t) {
        if (null == t._isValid) {
            var e = d(t);
            t._isValid = !(isNaN(t._d.getTime()) || !(e.overflow < 0) || e.empty || e.invalidMonth || e.invalidWeekday || e.nullInput || e.invalidFormat || e.userInvalidated), t._strict && (t._isValid = t._isValid && 0 === e.charsLeftOver && 0 === e.unusedTokens.length && void 0 === e.bigHour)
        }
        return t._isValid
    }

    function u(t) {
        var e = o(NaN);
        return null != t ? s(d(e), t) : d(e).userInvalidated = !0, e
    }

    function h(t) {
        return void 0 === t
    }

    function p(t, e) {
        var i, n, r;
        if (h(e._isAMomentObject) || (t._isAMomentObject = e._isAMomentObject), h(e._i) || (t._i = e._i), h(e._f) || (t._f = e._f), h(e._l) || (t._l = e._l), h(e._strict) || (t._strict = e._strict), h(e._tzm) || (t._tzm = e._tzm), h(e._isUTC) || (t._isUTC = e._isUTC), h(e._offset) || (t._offset = e._offset), h(e._pf) || (t._pf = d(e)), h(e._locale) || (t._locale = e._locale), Qi.length > 0) for (i in Qi) n = Qi[i], r = e[n], h(r) || (t[n] = r);
        return t
    }

    function f(e) {
        p(this, e), this._d = new Date(null != e._d ? e._d.getTime() : NaN), Ji === !1 && (Ji = !0, t.updateOffset(this), Ji = !1)
    }

    function m(t) {
        return t instanceof f || null != t && null != t._isAMomentObject
    }

    function g(t) {
        return 0 > t ? Math.ceil(t) : Math.floor(t)
    }

    function v(t) {
        var e = +t, i = 0;
        return 0 !== e && isFinite(e) && (i = g(e)), i
    }

    function b(t, e, i) {
        var n, r = Math.min(t.length, e.length), a = Math.abs(t.length - e.length), s = 0;
        for (n = 0; r > n; n++) (i && t[n] !== e[n] || !i && v(t[n]) !== v(e[n])) && s++;
        return s + a
    }

    function y(e) {
        t.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e)
    }

    function w(t, e) {
        var i = !0;
        return s(function () {
            return i && (y(t + "\nArguments: " + Array.prototype.slice.call(arguments).join(", ") + "\n" + (new Error).stack), i = !1), e.apply(this, arguments)
        }, e)
    }

    function S(t, e) {
        tn[t] || (y(e), tn[t] = !0)
    }

    function _(t) {
        return t instanceof Function || "[object Function]" === Object.prototype.toString.call(t)
    }

    function x(t) {
        return "[object Object]" === Object.prototype.toString.call(t)
    }

    function D(t) {
        var e, i;
        for (i in t) e = t[i], _(e) ? this[i] = e : this["_" + i] = e;
        this._config = t, this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
    }

    function T(t, e) {
        var i, n = s({}, t);
        for (i in e) a(e, i) && (x(t[i]) && x(e[i]) ? (n[i] = {}, s(n[i], t[i]), s(n[i], e[i])) : null != e[i] ? n[i] = e[i] : delete n[i]);
        return n
    }

    function C(t) {
        null != t && this.set(t)
    }

    function A(t) {
        return t ? t.toLowerCase().replace("_", "-") : t
    }

    function k(t) {
        for (var e, i, n, r, a = 0; a < t.length;) {
            for (r = A(t[a]).split("-"), e = r.length, i = A(t[a + 1]), i = i ? i.split("-") : null; e > 0;) {
                if (n = I(r.slice(0, e).join("-"))) return n;
                if (i && i.length >= e && b(r, i, !0) >= e - 1) break;
                e--
            }
            a++
        }
        return null
    }

    function I(t) {
        var e = null;
        if (!nn[t] && "undefined" != typeof module && module && module.exports) try {
            e = en._abbr, require("./locale/" + t), M(e)
        } catch (i) {
        }
        return nn[t]
    }

    function M(t, e) {
        var i;
        return t && (i = h(e) ? $(t) : F(t, e), i && (en = i)), en._abbr
    }

    function F(t, e) {
        return null !== e ? (e.abbr = t, null != nn[t] ? (S("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale"), e = T(nn[t]._config, e)) : null != e.parentLocale && (null != nn[e.parentLocale] ? e = T(nn[e.parentLocale]._config, e) : S("parentLocaleUndefined", "specified parentLocale is not defined yet")), nn[t] = new C(e), M(t), nn[t]) : (delete nn[t], null)
    }

    function E(t, e) {
        if (null != e) {
            var i;
            null != nn[t] && (e = T(nn[t]._config, e)), i = new C(e), i.parentLocale = nn[t], nn[t] = i, M(t)
        } else null != nn[t] && (null != nn[t].parentLocale ? nn[t] = nn[t].parentLocale : null != nn[t] && delete nn[t]);
        return nn[t]
    }

    function $(t) {
        var e;
        if (t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t) return en;
        if (!i(t)) {
            if (e = I(t)) return e;
            t = [t]
        }
        return k(t)
    }

    function L() {
        return Object.keys(nn)
    }

    function O(t, e) {
        var i = t.toLowerCase();
        rn[i] = rn[i + "s"] = rn[e] = t
    }

    function V(t) {
        return "string" == typeof t ? rn[t] || rn[t.toLowerCase()] : void 0
    }

    function P(t) {
        var e, i, n = {};
        for (i in t) a(t, i) && (e = V(i), e && (n[e] = t[i]));
        return n
    }

    function H(e, i) {
        return function (n) {
            return null != n ? (N(this, e, n), t.updateOffset(this, i), this) : R(this, e)
        }
    }

    function R(t, e) {
        return t.isValid() ? t._d["get" + (t._isUTC ? "UTC" : "") + e]() : NaN
    }

    function N(t, e, i) {
        t.isValid() && t._d["set" + (t._isUTC ? "UTC" : "") + e](i)
    }

    function U(t, e) {
        var i;
        if ("object" == typeof t) for (i in t) this.set(i, t[i]); else if (t = V(t), _(this[t])) return this[t](e);
        return this
    }

    function Y(t, e, i) {
        var n = "" + Math.abs(t), r = e - n.length, a = t >= 0;
        return (a ? i ? "+" : "" : "-") + Math.pow(10, Math.max(0, r)).toString().substr(1) + n
    }

    function j(t, e, i, n) {
        var r = n;
        "string" == typeof n && (r = function () {
            return this[n]()
        }), t && (ln[t] = r), e && (ln[e[0]] = function () {
            return Y(r.apply(this, arguments), e[1], e[2])
        }), i && (ln[i] = function () {
            return this.localeData().ordinal(r.apply(this, arguments), t)
        })
    }

    function W(t) {
        return t.match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "")
    }

    function B(t) {
        var e, i, n = t.match(an);
        for (e = 0, i = n.length; i > e; e++) ln[n[e]] ? n[e] = ln[n[e]] : n[e] = W(n[e]);
        return function (r) {
            var a = "";
            for (e = 0; i > e; e++) a += n[e] instanceof Function ? n[e].call(r, t) : n[e];
            return a
        }
    }

    function z(t, e) {
        return t.isValid() ? (e = q(e, t.localeData()), on[e] = on[e] || B(e), on[e](t)) : t.localeData().invalidDate()
    }

    function q(t, e) {
        function i(t) {
            return e.longDateFormat(t) || t
        }

        var n = 5;
        for (sn.lastIndex = 0; n >= 0 && sn.test(t);) t = t.replace(sn, i), sn.lastIndex = 0, n -= 1;
        return t
    }

    function G(t, e, i) {
        Cn[t] = _(e) ? e : function (t, n) {
            return t && i ? i : e
        }
    }

    function Z(t, e) {
        return a(Cn, t) ? Cn[t](e._strict, e._locale) : new RegExp(X(t))
    }

    function X(t) {
        return K(t.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (t, e, i, n, r) {
            return e || i || n || r
        }))
    }

    function K(t) {
        return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }

    function Q(t, e) {
        var i, n = e;
        for ("string" == typeof t && (t = [t]), "number" == typeof e && (n = function (t, i) {
            i[e] = v(t)
        }), i = 0; i < t.length; i++) An[t[i]] = n
    }

    function J(t, e) {
        Q(t, function (t, i, n, r) {
            n._w = n._w || {}, e(t, n._w, n, r)
        })
    }

    function tt(t, e, i) {
        null != e && a(An, t) && An[t](e, i._a, i, t)
    }

    function et(t, e) {
        return new Date(Date.UTC(t, e + 1, 0)).getUTCDate()
    }

    function it(t, e) {
        return i(this._months) ? this._months[t.month()] : this._months[Pn.test(e) ? "format" : "standalone"][t.month()]
    }

    function nt(t, e) {
        return i(this._monthsShort) ? this._monthsShort[t.month()] : this._monthsShort[Pn.test(e) ? "format" : "standalone"][t.month()]
    }

    function rt(t, e, i) {
        var n, r, a;
        for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), n = 0; 12 > n; n++) {
            if (r = o([2e3, n]), i && !this._longMonthsParse[n] && (this._longMonthsParse[n] = new RegExp("^" + this.months(r, "").replace(".", "") + "$", "i"), this._shortMonthsParse[n] = new RegExp("^" + this.monthsShort(r, "").replace(".", "") + "$", "i")), i || this._monthsParse[n] || (a = "^" + this.months(r, "") + "|^" + this.monthsShort(r, ""), this._monthsParse[n] = new RegExp(a.replace(".", ""), "i")), i && "MMMM" === e && this._longMonthsParse[n].test(t)) return n;
            if (i && "MMM" === e && this._shortMonthsParse[n].test(t)) return n;
            if (!i && this._monthsParse[n].test(t)) return n
        }
    }

    function at(t, e) {
        var i;
        if (!t.isValid()) return t;
        if ("string" == typeof e) if (/^\d+$/.test(e)) e = v(e); else if (e = t.localeData().monthsParse(e), "number" != typeof e) return t;
        return i = Math.min(t.date(), et(t.year(), e)), t._d["set" + (t._isUTC ? "UTC" : "") + "Month"](e, i), t
    }

    function st(e) {
        return null != e ? (at(this, e), t.updateOffset(this, !0), this) : R(this, "Month")
    }

    function ot() {
        return et(this.year(), this.month())
    }

    function lt(t) {
        return this._monthsParseExact ? (a(this, "_monthsRegex") || ct.call(this), t ? this._monthsShortStrictRegex : this._monthsShortRegex) : this._monthsShortStrictRegex && t ? this._monthsShortStrictRegex : this._monthsShortRegex
    }

    function dt(t) {
        return this._monthsParseExact ? (a(this, "_monthsRegex") || ct.call(this), t ? this._monthsStrictRegex : this._monthsRegex) : this._monthsStrictRegex && t ? this._monthsStrictRegex : this._monthsRegex
    }

    function ct() {
        function t(t, e) {
            return e.length - t.length
        }

        var e, i, n = [], r = [], a = [];
        for (e = 0; 12 > e; e++) i = o([2e3, e]), n.push(this.monthsShort(i, "")), r.push(this.months(i, "")), a.push(this.months(i, "")), a.push(this.monthsShort(i, ""));
        for (n.sort(t), r.sort(t), a.sort(t), e = 0; 12 > e; e++) n[e] = K(n[e]), r[e] = K(r[e]), a[e] = K(a[e]);
        this._monthsRegex = new RegExp("^(" + a.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + r.join("|") + ")$", "i"), this._monthsShortStrictRegex = new RegExp("^(" + n.join("|") + ")$", "i")
    }

    function ut(t) {
        var e, i = t._a;
        return i && -2 === d(t).overflow && (e = i[In] < 0 || i[In] > 11 ? In : i[Mn] < 1 || i[Mn] > et(i[kn], i[In]) ? Mn : i[Fn] < 0 || i[Fn] > 24 || 24 === i[Fn] && (0 !== i[En] || 0 !== i[$n] || 0 !== i[Ln]) ? Fn : i[En] < 0 || i[En] > 59 ? En : i[$n] < 0 || i[$n] > 59 ? $n : i[Ln] < 0 || i[Ln] > 999 ? Ln : -1, d(t)._overflowDayOfYear && (kn > e || e > Mn) && (e = Mn), d(t)._overflowWeeks && -1 === e && (e = On), d(t)._overflowWeekday && -1 === e && (e = Vn), d(t).overflow = e), t
    }

    function ht(t) {
        var e, i, n, r, a, s, o = t._i, l = Yn.exec(o) || jn.exec(o);
        if (l) {
            for (d(t).iso = !0, e = 0, i = Bn.length; i > e; e++) if (Bn[e][1].exec(l[1])) {
                r = Bn[e][0], n = Bn[e][2] !== !1;
                break
            }
            if (null == r) return void(t._isValid = !1);
            if (l[3]) {
                for (e = 0, i = zn.length; i > e; e++) if (zn[e][1].exec(l[3])) {
                    a = (l[2] || " ") + zn[e][0];
                    break
                }
                if (null == a) return void(t._isValid = !1)
            }
            if (!n && null != a) return void(t._isValid = !1);
            if (l[4]) {
                if (!Wn.exec(l[4])) return void(t._isValid = !1);
                s = "Z"
            }
            t._f = r + (a || "") + (s || ""), At(t)
        } else t._isValid = !1
    }

    function pt(e) {
        var i = qn.exec(e._i);
        return null !== i ? void(e._d = new Date(+i[1])) : (ht(e), void(e._isValid === !1 && (delete e._isValid, t.createFromInputFallback(e))))
    }

    function ft(t, e, i, n, r, a, s) {
        var o = new Date(t, e, i, n, r, a, s);
        return 100 > t && t >= 0 && isFinite(o.getFullYear()) && o.setFullYear(t), o
    }

    function mt(t) {
        var e = new Date(Date.UTC.apply(null, arguments));
        return 100 > t && t >= 0 && isFinite(e.getUTCFullYear()) && e.setUTCFullYear(t), e
    }

    function gt(t) {
        return vt(t) ? 366 : 365
    }

    function vt(t) {
        return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0
    }

    function bt() {
        return vt(this.year())
    }

    function yt(t, e, i) {
        var n = 7 + e - i, r = (7 + mt(t, 0, n).getUTCDay() - e) % 7;
        return -r + n - 1
    }

    function wt(t, e, i, n, r) {
        var a, s, o = (7 + i - n) % 7, l = yt(t, n, r), d = 1 + 7 * (e - 1) + o + l;
        return 0 >= d ? (a = t - 1, s = gt(a) + d) : d > gt(t) ? (a = t + 1, s = d - gt(t)) : (a = t, s = d), {
            year: a,
            dayOfYear: s
        }
    }

    function St(t, e, i) {
        var n, r, a = yt(t.year(), e, i), s = Math.floor((t.dayOfYear() - a - 1) / 7) + 1;
        return 1 > s ? (r = t.year() - 1, n = s + _t(r, e, i)) : s > _t(t.year(), e, i) ? (n = s - _t(t.year(), e, i), r = t.year() + 1) : (r = t.year(), n = s), {
            week: n,
            year: r
        }
    }

    function _t(t, e, i) {
        var n = yt(t, e, i), r = yt(t + 1, e, i);
        return (gt(t) - n + r) / 7
    }

    function xt(t, e, i) {
        return null != t ? t : null != e ? e : i
    }

    function Dt(e) {
        var i = new Date(t.now());
        return e._useUTC ? [i.getUTCFullYear(), i.getUTCMonth(), i.getUTCDate()] : [i.getFullYear(), i.getMonth(), i.getDate()]
    }

    function Tt(t) {
        var e, i, n, r, a = [];
        if (!t._d) {
            for (n = Dt(t), t._w && null == t._a[Mn] && null == t._a[In] && Ct(t), t._dayOfYear && (r = xt(t._a[kn], n[kn]), t._dayOfYear > gt(r) && (d(t)._overflowDayOfYear = !0), i = mt(r, 0, t._dayOfYear), t._a[In] = i.getUTCMonth(), t._a[Mn] = i.getUTCDate()), e = 0; 3 > e && null == t._a[e]; ++e) t._a[e] = a[e] = n[e];
            for (; 7 > e; e++) t._a[e] = a[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e];
            24 === t._a[Fn] && 0 === t._a[En] && 0 === t._a[$n] && 0 === t._a[Ln] && (t._nextDay = !0, t._a[Fn] = 0), t._d = (t._useUTC ? mt : ft).apply(null, a), null != t._tzm && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), t._nextDay && (t._a[Fn] = 24)
        }
    }

    function Ct(t) {
        var e, i, n, r, a, s, o, l;
        e = t._w, null != e.GG || null != e.W || null != e.E ? (a = 1, s = 4, i = xt(e.GG, t._a[kn], St(Ot(), 1, 4).year), n = xt(e.W, 1), r = xt(e.E, 1), (1 > r || r > 7) && (l = !0)) : (a = t._locale._week.dow, s = t._locale._week.doy, i = xt(e.gg, t._a[kn], St(Ot(), a, s).year), n = xt(e.w, 1), null != e.d ? (r = e.d, (0 > r || r > 6) && (l = !0)) : null != e.e ? (r = e.e + a, (e.e < 0 || e.e > 6) && (l = !0)) : r = a), 1 > n || n > _t(i, a, s) ? d(t)._overflowWeeks = !0 : null != l ? d(t)._overflowWeekday = !0 : (o = wt(i, n, r, a, s), t._a[kn] = o.year, t._dayOfYear = o.dayOfYear)
    }

    function At(e) {
        if (e._f === t.ISO_8601) return void ht(e);
        e._a = [], d(e).empty = !0;
        var i, n, r, a, s, o = "" + e._i, l = o.length, c = 0;
        for (r = q(e._f, e._locale).match(an) || [], i = 0; i < r.length; i++) a = r[i], n = (o.match(Z(a, e)) || [])[0], n && (s = o.substr(0, o.indexOf(n)), s.length > 0 && d(e).unusedInput.push(s), o = o.slice(o.indexOf(n) + n.length), c += n.length), ln[a] ? (n ? d(e).empty = !1 : d(e).unusedTokens.push(a), tt(a, n, e)) : e._strict && !n && d(e).unusedTokens.push(a);
        d(e).charsLeftOver = l - c, o.length > 0 && d(e).unusedInput.push(o), d(e).bigHour === !0 && e._a[Fn] <= 12 && e._a[Fn] > 0 && (d(e).bigHour = void 0), e._a[Fn] = kt(e._locale, e._a[Fn], e._meridiem), Tt(e), ut(e)
    }

    function kt(t, e, i) {
        var n;
        return null == i ? e : null != t.meridiemHour ? t.meridiemHour(e, i) : null != t.isPM ? (n = t.isPM(i), n && 12 > e && (e += 12), n || 12 !== e || (e = 0), e) : e
    }

    function It(t) {
        var e, i, n, r, a;
        if (0 === t._f.length) return d(t).invalidFormat = !0, void(t._d = new Date(NaN));
        for (r = 0; r < t._f.length; r++) a = 0, e = p({}, t), null != t._useUTC && (e._useUTC = t._useUTC), e._f = t._f[r], At(e), c(e) && (a += d(e).charsLeftOver, a += 10 * d(e).unusedTokens.length, d(e).score = a, (null == n || n > a) && (n = a, i = e));
        s(t, i || e)
    }

    function Mt(t) {
        if (!t._d) {
            var e = P(t._i);
            t._a = r([e.year, e.month, e.day || e.date, e.hour, e.minute, e.second, e.millisecond], function (t) {
                return t && parseInt(t, 10)
            }), Tt(t)
        }
    }

    function Ft(t) {
        var e = new f(ut(Et(t)));
        return e._nextDay && (e.add(1, "d"), e._nextDay = void 0), e
    }

    function Et(t) {
        var e = t._i, r = t._f;
        return t._locale = t._locale || $(t._l), null === e || void 0 === r && "" === e ? u({nullInput: !0}) : ("string" == typeof e && (t._i = e = t._locale.preparse(e)), m(e) ? new f(ut(e)) : (i(r) ? It(t) : r ? At(t) : n(e) ? t._d = e : $t(t), c(t) || (t._d = null), t))
    }

    function $t(e) {
        var a = e._i;
        void 0 === a ? e._d = new Date(t.now()) : n(a) ? e._d = new Date(+a) : "string" == typeof a ? pt(e) : i(a) ? (e._a = r(a.slice(0), function (t) {
            return parseInt(t, 10)
        }), Tt(e)) : "object" == typeof a ? Mt(e) : "number" == typeof a ? e._d = new Date(a) : t.createFromInputFallback(e)
    }

    function Lt(t, e, i, n, r) {
        var a = {};
        return "boolean" == typeof i && (n = i, i = void 0), a._isAMomentObject = !0, a._useUTC = a._isUTC = r, a._l = i, a._i = t, a._f = e, a._strict = n, Ft(a)
    }

    function Ot(t, e, i, n) {
        return Lt(t, e, i, n, !1)
    }

    function Vt(t, e) {
        var n, r;
        if (1 === e.length && i(e[0]) && (e = e[0]), !e.length) return Ot();
        for (n = e[0], r = 1; r < e.length; ++r) (!e[r].isValid() || e[r][t](n)) && (n = e[r]);
        return n
    }

    function Pt() {
        var t = [].slice.call(arguments, 0);
        return Vt("isBefore", t)
    }

    function Ht() {
        var t = [].slice.call(arguments, 0);
        return Vt("isAfter", t)
    }

    function Rt(t) {
        var e = P(t), i = e.year || 0, n = e.quarter || 0, r = e.month || 0, a = e.week || 0, s = e.day || 0,
            o = e.hour || 0, l = e.minute || 0, d = e.second || 0, c = e.millisecond || 0;
        this._milliseconds = +c + 1e3 * d + 6e4 * l + 36e5 * o, this._days = +s + 7 * a, this._months = +r + 3 * n + 12 * i, this._data = {}, this._locale = $(), this._bubble()
    }

    function Nt(t) {
        return t instanceof Rt
    }

    function Ut(t, e) {
        j(t, 0, 0, function () {
            var t = this.utcOffset(), i = "+";
            return 0 > t && (t = -t, i = "-"), i + Y(~~(t / 60), 2) + e + Y(~~t % 60, 2)
        })
    }

    function Yt(t, e) {
        var i = (e || "").match(t) || [], n = i[i.length - 1] || [], r = (n + "").match(Qn) || ["-", 0, 0],
            a = +(60 * r[1]) + v(r[2]);
        return "+" === r[0] ? a : -a
    }

    function jt(e, i) {
        var r, a;
        return i._isUTC ? (r = i.clone(), a = (m(e) || n(e) ? +e : +Ot(e)) - +r, r._d.setTime(+r._d + a), t.updateOffset(r, !1), r) : Ot(e).local()
    }

    function Wt(t) {
        return 15 * -Math.round(t._d.getTimezoneOffset() / 15)
    }

    function Bt(e, i) {
        var n, r = this._offset || 0;
        return this.isValid() ? null != e ? ("string" == typeof e ? e = Yt(xn, e) : Math.abs(e) < 16 && (e = 60 * e), !this._isUTC && i && (n = Wt(this)), this._offset = e, this._isUTC = !0, null != n && this.add(n, "m"), r !== e && (!i || this._changeInProgress ? le(this, ie(e - r, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, t.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? r : Wt(this) : null != e ? this : NaN
    }

    function zt(t, e) {
        return null != t ? ("string" != typeof t && (t = -t), this.utcOffset(t, e), this) : -this.utcOffset()
    }

    function qt(t) {
        return this.utcOffset(0, t)
    }

    function Gt(t) {
        return this._isUTC && (this.utcOffset(0, t), this._isUTC = !1, t && this.subtract(Wt(this), "m")), this
    }

    function Zt() {
        return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(Yt(_n, this._i)), this
    }

    function Xt(t) {
        return this.isValid() ? (t = t ? Ot(t).utcOffset() : 0, (this.utcOffset() - t) % 60 === 0) : !1
    }

    function Kt() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
    }

    function Qt() {
        if (!h(this._isDSTShifted)) return this._isDSTShifted;
        var t = {};
        if (p(t, this), t = Et(t), t._a) {
            var e = t._isUTC ? o(t._a) : Ot(t._a);
            this._isDSTShifted = this.isValid() && b(t._a, e.toArray()) > 0
        } else this._isDSTShifted = !1;
        return this._isDSTShifted
    }

    function Jt() {
        return this.isValid() ? !this._isUTC : !1
    }

    function te() {
        return this.isValid() ? this._isUTC : !1
    }

    function ee() {
        return this.isValid() ? this._isUTC && 0 === this._offset : !1
    }

    function ie(t, e) {
        var i, n, r, s = t, o = null;
        return Nt(t) ? s = {
            ms: t._milliseconds,
            d: t._days,
            M: t._months
        } : "number" == typeof t ? (s = {}, e ? s[e] = t : s.milliseconds = t) : (o = Jn.exec(t)) ? (i = "-" === o[1] ? -1 : 1, s = {
            y: 0,
            d: v(o[Mn]) * i,
            h: v(o[Fn]) * i,
            m: v(o[En]) * i,
            s: v(o[$n]) * i,
            ms: v(o[Ln]) * i
        }) : (o = tr.exec(t)) ? (i = "-" === o[1] ? -1 : 1, s = {
            y: ne(o[2], i),
            M: ne(o[3], i),
            w: ne(o[4], i),
            d: ne(o[5], i),
            h: ne(o[6], i),
            m: ne(o[7], i),
            s: ne(o[8], i)
        }) : null == s ? s = {} : "object" == typeof s && ("from" in s || "to" in s) && (r = ae(Ot(s.from), Ot(s.to)), s = {}, s.ms = r.milliseconds, s.M = r.months), n = new Rt(s), Nt(t) && a(t, "_locale") && (n._locale = t._locale), n
    }

    function ne(t, e) {
        var i = t && parseFloat(t.replace(",", "."));
        return (isNaN(i) ? 0 : i) * e
    }

    function re(t, e) {
        var i = {milliseconds: 0, months: 0};
        return i.months = e.month() - t.month() + 12 * (e.year() - t.year()), t.clone().add(i.months, "M").isAfter(e) && --i.months, i.milliseconds = +e - +t.clone().add(i.months, "M"), i
    }

    function ae(t, e) {
        var i;
        return t.isValid() && e.isValid() ? (e = jt(e, t), t.isBefore(e) ? i = re(t, e) : (i = re(e, t), i.milliseconds = -i.milliseconds, i.months = -i.months), i) : {
            milliseconds: 0,
            months: 0
        }
    }

    function se(t) {
        return 0 > t ? -1 * Math.round(-1 * t) : Math.round(t)
    }

    function oe(t, e) {
        return function (i, n) {
            var r, a;
            return null === n || isNaN(+n) || (S(e, "moment()." + e + "(period, number) is deprecated. Please use moment()." + e + "(number, period)."), a = i, i = n, n = a), i = "string" == typeof i ? +i : i, r = ie(i, n), le(this, r, t), this
        }
    }

    function le(e, i, n, r) {
        var a = i._milliseconds, s = se(i._days), o = se(i._months);
        e.isValid() && (r = null == r ? !0 : r, a && e._d.setTime(+e._d + a * n), s && N(e, "Date", R(e, "Date") + s * n), o && at(e, R(e, "Month") + o * n), r && t.updateOffset(e, s || o))
    }

    function de(t, e) {
        var i = t || Ot(), n = jt(i, this).startOf("day"), r = this.diff(n, "days", !0),
            a = -6 > r ? "sameElse" : -1 > r ? "lastWeek" : 0 > r ? "lastDay" : 1 > r ? "sameDay" : 2 > r ? "nextDay" : 7 > r ? "nextWeek" : "sameElse",
            s = e && (_(e[a]) ? e[a]() : e[a]);
        return this.format(s || this.localeData().calendar(a, this, Ot(i)))
    }

    function ce() {
        return new f(this)
    }

    function ue(t, e) {
        var i = m(t) ? t : Ot(t);
        return this.isValid() && i.isValid() ? (e = V(h(e) ? "millisecond" : e), "millisecond" === e ? +this > +i : +i < +this.clone().startOf(e)) : !1
    }

    function he(t, e) {
        var i = m(t) ? t : Ot(t);
        return this.isValid() && i.isValid() ? (e = V(h(e) ? "millisecond" : e), "millisecond" === e ? +i > +this : +this.clone().endOf(e) < +i) : !1
    }

    function pe(t, e, i) {
        return this.isAfter(t, i) && this.isBefore(e, i)
    }

    function fe(t, e) {
        var i, n = m(t) ? t : Ot(t);
        return this.isValid() && n.isValid() ? (e = V(e || "millisecond"), "millisecond" === e ? +this === +n : (i = +n, +this.clone().startOf(e) <= i && i <= +this.clone().endOf(e))) : !1
    }

    function me(t, e) {
        return this.isSame(t, e) || this.isAfter(t, e)
    }

    function ge(t, e) {
        return this.isSame(t, e) || this.isBefore(t, e)
    }

    function ve(t, e, i) {
        var n, r, a, s;
        return this.isValid() ? (n = jt(t, this), n.isValid() ? (r = 6e4 * (n.utcOffset() - this.utcOffset()), e = V(e), "year" === e || "month" === e || "quarter" === e ? (s = be(this, n), "quarter" === e ? s /= 3 : "year" === e && (s /= 12)) : (a = this - n, s = "second" === e ? a / 1e3 : "minute" === e ? a / 6e4 : "hour" === e ? a / 36e5 : "day" === e ? (a - r) / 864e5 : "week" === e ? (a - r) / 6048e5 : a), i ? s : g(s)) : NaN) : NaN
    }

    function be(t, e) {
        var i, n, r = 12 * (e.year() - t.year()) + (e.month() - t.month()), a = t.clone().add(r, "months");
        return 0 > e - a ? (i = t.clone().add(r - 1, "months"), n = (e - a) / (a - i)) : (i = t.clone().add(r + 1, "months"), n = (e - a) / (i - a)), -(r + n)
    }

    function ye() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    }

    function we() {
        var t = this.clone().utc();
        return 0 < t.year() && t.year() <= 9999 ? _(Date.prototype.toISOString) ? this.toDate().toISOString() : z(t, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : z(t, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
    }

    function Se(e) {
        var i = z(this, e || t.defaultFormat);
        return this.localeData().postformat(i)
    }

    function _e(t, e) {
        return this.isValid() && (m(t) && t.isValid() || Ot(t).isValid()) ? ie({
            to: this,
            from: t
        }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate()
    }

    function xe(t) {
        return this.from(Ot(), t)
    }

    function De(t, e) {
        return this.isValid() && (m(t) && t.isValid() || Ot(t).isValid()) ? ie({
            from: this,
            to: t
        }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate()
    }

    function Te(t) {
        return this.to(Ot(), t)
    }

    function Ce(t) {
        var e;
        return void 0 === t ? this._locale._abbr : (e = $(t), null != e && (this._locale = e), this)
    }

    function Ae() {
        return this._locale
    }

    function ke(t) {
        switch (t = V(t)) {
            case"year":
                this.month(0);
            case"quarter":
            case"month":
                this.date(1);
            case"week":
            case"isoWeek":
            case"day":
                this.hours(0);
            case"hour":
                this.minutes(0);
            case"minute":
                this.seconds(0);
            case"second":
                this.milliseconds(0)
        }
        return "week" === t && this.weekday(0), "isoWeek" === t && this.isoWeekday(1), "quarter" === t && this.month(3 * Math.floor(this.month() / 3)), this
    }

    function Ie(t) {
        return t = V(t), void 0 === t || "millisecond" === t ? this : this.startOf(t).add(1, "isoWeek" === t ? "week" : t).subtract(1, "ms")
    }

    function Me() {
        return +this._d - 6e4 * (this._offset || 0)
    }

    function Fe() {
        return Math.floor(+this / 1e3)
    }

    function Ee() {
        return this._offset ? new Date(+this) : this._d
    }

    function $e() {
        var t = this;
        return [t.year(), t.month(), t.date(), t.hour(), t.minute(), t.second(), t.millisecond()]
    }

    function Le() {
        var t = this;
        return {
            years: t.year(),
            months: t.month(),
            date: t.date(),
            hours: t.hours(),
            minutes: t.minutes(),
            seconds: t.seconds(),
            milliseconds: t.milliseconds()
        }
    }

    function Oe() {
        return this.isValid() ? this.toISOString() : null
    }

    function Ve() {
        return c(this)
    }

    function Pe() {
        return s({}, d(this))
    }

    function He() {
        return d(this).overflow
    }

    function Re() {
        return {input: this._i, format: this._f, locale: this._locale, isUTC: this._isUTC, strict: this._strict}
    }

    function Ne(t, e) {
        j(0, [t, t.length], 0, e)
    }

    function Ue(t) {
        return Be.call(this, t, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
    }

    function Ye(t) {
        return Be.call(this, t, this.isoWeek(), this.isoWeekday(), 1, 4)
    }

    function je() {
        return _t(this.year(), 1, 4)
    }

    function We() {
        var t = this.localeData()._week;
        return _t(this.year(), t.dow, t.doy)
    }

    function Be(t, e, i, n, r) {
        var a;
        return null == t ? St(this, n, r).year : (a = _t(t, n, r), e > a && (e = a), ze.call(this, t, e, i, n, r))
    }

    function ze(t, e, i, n, r) {
        var a = wt(t, e, i, n, r), s = mt(a.year, 0, a.dayOfYear);
        return this.year(s.getUTCFullYear()), this.month(s.getUTCMonth()), this.date(s.getUTCDate()), this
    }

    function qe(t) {
        return null == t ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (t - 1) + this.month() % 3)
    }

    function Ge(t) {
        return St(t, this._week.dow, this._week.doy).week
    }

    function Ze() {
        return this._week.dow
    }

    function Xe() {
        return this._week.doy
    }

    function Ke(t) {
        var e = this.localeData().week(this);
        return null == t ? e : this.add(7 * (t - e), "d")
    }

    function Qe(t) {
        var e = St(this, 1, 4).week;
        return null == t ? e : this.add(7 * (t - e), "d")
    }

    function Je(t, e) {
        return "string" != typeof t ? t : isNaN(t) ? (t = e.weekdaysParse(t), "number" == typeof t ? t : null) : parseInt(t, 10)
    }

    function ti(t, e) {
        return i(this._weekdays) ? this._weekdays[t.day()] : this._weekdays[this._weekdays.isFormat.test(e) ? "format" : "standalone"][t.day()]
    }

    function ei(t) {
        return this._weekdaysShort[t.day()]
    }

    function ii(t) {
        return this._weekdaysMin[t.day()]
    }

    function ni(t, e, i) {
        var n, r, a;
        for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), n = 0; 7 > n; n++) {
            if (r = Ot([2e3, 1]).day(n), i && !this._fullWeekdaysParse[n] && (this._fullWeekdaysParse[n] = new RegExp("^" + this.weekdays(r, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[n] = new RegExp("^" + this.weekdaysShort(r, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[n] = new RegExp("^" + this.weekdaysMin(r, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[n] || (a = "^" + this.weekdays(r, "") + "|^" + this.weekdaysShort(r, "") + "|^" + this.weekdaysMin(r, ""), this._weekdaysParse[n] = new RegExp(a.replace(".", ""), "i")), i && "dddd" === e && this._fullWeekdaysParse[n].test(t)) return n;
            if (i && "ddd" === e && this._shortWeekdaysParse[n].test(t)) return n;
            if (i && "dd" === e && this._minWeekdaysParse[n].test(t)) return n;
            if (!i && this._weekdaysParse[n].test(t)) return n
        }
    }

    function ri(t) {
        if (!this.isValid()) return null != t ? this : NaN;
        var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != t ? (t = Je(t, this.localeData()), this.add(t - e, "d")) : e
    }

    function ai(t) {
        if (!this.isValid()) return null != t ? this : NaN;
        var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return null == t ? e : this.add(t - e, "d")
    }

    function si(t) {
        return this.isValid() ? null == t ? this.day() || 7 : this.day(this.day() % 7 ? t : t - 7) : null != t ? this : NaN
    }

    function oi(t) {
        var e = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        return null == t ? e : this.add(t - e, "d")
    }

    function li() {
        return this.hours() % 12 || 12
    }

    function di(t, e) {
        j(t, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), e)
        })
    }

    function ci(t, e) {
        return e._meridiemParse
    }

    function ui(t) {
        return "p" === (t + "").toLowerCase().charAt(0)
    }

    function hi(t, e, i) {
        return t > 11 ? i ? "pm" : "PM" : i ? "am" : "AM"
    }

    function pi(t, e) {
        e[Ln] = v(1e3 * ("0." + t))
    }

    function fi() {
        return this._isUTC ? "UTC" : ""
    }

    function mi() {
        return this._isUTC ? "Coordinated Universal Time" : "";
    }

    function gi(t) {
        return Ot(1e3 * t)
    }

    function vi() {
        return Ot.apply(null, arguments).parseZone()
    }

    function bi(t, e, i) {
        var n = this._calendar[t];
        return _(n) ? n.call(e, i) : n
    }

    function yi(t) {
        var e = this._longDateFormat[t], i = this._longDateFormat[t.toUpperCase()];
        return e || !i ? e : (this._longDateFormat[t] = i.replace(/MMMM|MM|DD|dddd/g, function (t) {
            return t.slice(1)
        }), this._longDateFormat[t])
    }

    function wi() {
        return this._invalidDate
    }

    function Si(t) {
        return this._ordinal.replace("%d", t)
    }

    function _i(t) {
        return t
    }

    function xi(t, e, i, n) {
        var r = this._relativeTime[i];
        return _(r) ? r(t, e, i, n) : r.replace(/%d/i, t)
    }

    function Di(t, e) {
        var i = this._relativeTime[t > 0 ? "future" : "past"];
        return _(i) ? i(e) : i.replace(/%s/i, e)
    }

    function Ti(t, e, i, n) {
        var r = $(), a = o().set(n, e);
        return r[i](a, t)
    }

    function Ci(t, e, i, n, r) {
        if ("number" == typeof t && (e = t, t = void 0), t = t || "", null != e) return Ti(t, e, i, r);
        var a, s = [];
        for (a = 0; n > a; a++) s[a] = Ti(t, a, i, r);
        return s
    }

    function Ai(t, e) {
        return Ci(t, e, "months", 12, "month")
    }

    function ki(t, e) {
        return Ci(t, e, "monthsShort", 12, "month")
    }

    function Ii(t, e) {
        return Ci(t, e, "weekdays", 7, "day")
    }

    function Mi(t, e) {
        return Ci(t, e, "weekdaysShort", 7, "day")
    }

    function Fi(t, e) {
        return Ci(t, e, "weekdaysMin", 7, "day")
    }

    function Ei() {
        var t = this._data;
        return this._milliseconds = Dr(this._milliseconds), this._days = Dr(this._days), this._months = Dr(this._months), t.milliseconds = Dr(t.milliseconds), t.seconds = Dr(t.seconds), t.minutes = Dr(t.minutes), t.hours = Dr(t.hours), t.months = Dr(t.months), t.years = Dr(t.years), this
    }

    function $i(t, e, i, n) {
        var r = ie(e, i);
        return t._milliseconds += n * r._milliseconds, t._days += n * r._days, t._months += n * r._months, t._bubble()
    }

    function Li(t, e) {
        return $i(this, t, e, 1)
    }

    function Oi(t, e) {
        return $i(this, t, e, -1)
    }

    function Vi(t) {
        return 0 > t ? Math.floor(t) : Math.ceil(t)
    }

    function Pi() {
        var t, e, i, n, r, a = this._milliseconds, s = this._days, o = this._months, l = this._data;
        return a >= 0 && s >= 0 && o >= 0 || 0 >= a && 0 >= s && 0 >= o || (a += 864e5 * Vi(Ri(o) + s), s = 0, o = 0), l.milliseconds = a % 1e3, t = g(a / 1e3), l.seconds = t % 60, e = g(t / 60), l.minutes = e % 60, i = g(e / 60), l.hours = i % 24, s += g(i / 24), r = g(Hi(s)), o += r, s -= Vi(Ri(r)), n = g(o / 12), o %= 12, l.days = s, l.months = o, l.years = n, this
    }

    function Hi(t) {
        return 4800 * t / 146097
    }

    function Ri(t) {
        return 146097 * t / 4800
    }

    function Ni(t) {
        var e, i, n = this._milliseconds;
        if (t = V(t), "month" === t || "year" === t) return e = this._days + n / 864e5, i = this._months + Hi(e), "month" === t ? i : i / 12;
        switch (e = this._days + Math.round(Ri(this._months)), t) {
            case"week":
                return e / 7 + n / 6048e5;
            case"day":
                return e + n / 864e5;
            case"hour":
                return 24 * e + n / 36e5;
            case"minute":
                return 1440 * e + n / 6e4;
            case"second":
                return 86400 * e + n / 1e3;
            case"millisecond":
                return Math.floor(864e5 * e) + n;
            default:
                throw new Error("Unknown unit " + t)
        }
    }

    function Ui() {
        return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * v(this._months / 12)
    }

    function Yi(t) {
        return function () {
            return this.as(t)
        }
    }

    function ji(t) {
        return t = V(t), this[t + "s"]()
    }

    function Wi(t) {
        return function () {
            return this._data[t]
        }
    }

    function Bi() {
        return g(this.days() / 7)
    }

    function zi(t, e, i, n, r) {
        return r.relativeTime(e || 1, !!i, t, n)
    }

    function qi(t, e, i) {
        var n = ie(t).abs(), r = Nr(n.as("s")), a = Nr(n.as("m")), s = Nr(n.as("h")), o = Nr(n.as("d")),
            l = Nr(n.as("M")), d = Nr(n.as("y")),
            c = r < Ur.s && ["s", r] || 1 >= a && ["m"] || a < Ur.m && ["mm", a] || 1 >= s && ["h"] || s < Ur.h && ["hh", s] || 1 >= o && ["d"] || o < Ur.d && ["dd", o] || 1 >= l && ["M"] || l < Ur.M && ["MM", l] || 1 >= d && ["y"] || ["yy", d];
        return c[2] = e, c[3] = +t > 0, c[4] = i, zi.apply(null, c)
    }

    function Gi(t, e) {
        return void 0 === Ur[t] ? !1 : void 0 === e ? Ur[t] : (Ur[t] = e, !0)
    }

    function Zi(t) {
        var e = this.localeData(), i = qi(this, !t, e);
        return t && (i = e.pastFuture(+this, i)), e.postformat(i)
    }

    function Xi() {
        var t, e, i, n = Yr(this._milliseconds) / 1e3, r = Yr(this._days), a = Yr(this._months);
        t = g(n / 60), e = g(t / 60), n %= 60, t %= 60, i = g(a / 12), a %= 12;
        var s = i, o = a, l = r, d = e, c = t, u = n, h = this.asSeconds();
        return h ? (0 > h ? "-" : "") + "P" + (s ? s + "Y" : "") + (o ? o + "M" : "") + (l ? l + "D" : "") + (d || c || u ? "T" : "") + (d ? d + "H" : "") + (c ? c + "M" : "") + (u ? u + "S" : "") : "P0D"
    }

    var Ki, Qi = t.momentProperties = [], Ji = !1, tn = {};
    t.suppressDeprecationWarnings = !1;
    var en, nn = {}, rn = {},
        an = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
        sn = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, on = {}, ln = {}, dn = /\d/, cn = /\d\d/, un = /\d{3}/,
        hn = /\d{4}/, pn = /[+-]?\d{6}/, fn = /\d\d?/, mn = /\d\d\d\d?/, gn = /\d\d\d\d\d\d?/, vn = /\d{1,3}/,
        bn = /\d{1,4}/, yn = /[+-]?\d{1,6}/, wn = /\d+/, Sn = /[+-]?\d+/, _n = /Z|[+-]\d\d:?\d\d/gi,
        xn = /Z|[+-]\d\d(?::?\d\d)?/gi, Dn = /[+-]?\d+(\.\d{1,3})?/,
        Tn = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
        Cn = {}, An = {}, kn = 0, In = 1, Mn = 2, Fn = 3, En = 4, $n = 5, Ln = 6, On = 7, Vn = 8;
    j("M", ["MM", 2], "Mo", function () {
        return this.month() + 1
    }), j("MMM", 0, 0, function (t) {
        return this.localeData().monthsShort(this, t)
    }), j("MMMM", 0, 0, function (t) {
        return this.localeData().months(this, t)
    }), O("month", "M"), G("M", fn), G("MM", fn, cn), G("MMM", function (t, e) {
        return e.monthsShortRegex(t)
    }), G("MMMM", function (t, e) {
        return e.monthsRegex(t)
    }), Q(["M", "MM"], function (t, e) {
        e[In] = v(t) - 1
    }), Q(["MMM", "MMMM"], function (t, e, i, n) {
        var r = i._locale.monthsParse(t, n, i._strict);
        null != r ? e[In] = r : d(i).invalidMonth = t
    });
    var Pn = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,
        Hn = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        Rn = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), Nn = Tn, Un = Tn,
        Yn = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
        jn = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
        Wn = /Z|[+-]\d\d(?::?\d\d)?/,
        Bn = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/]],
        zn = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]],
        qn = /^\/?Date\((\-?\d+)/i;
    t.createFromInputFallback = w("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function (t) {
        t._d = new Date(t._i + (t._useUTC ? " UTC" : ""))
    }), j("Y", 0, 0, function () {
        var t = this.year();
        return 9999 >= t ? "" + t : "+" + t
    }), j(0, ["YY", 2], 0, function () {
        return this.year() % 100
    }), j(0, ["YYYY", 4], 0, "year"), j(0, ["YYYYY", 5], 0, "year"), j(0, ["YYYYYY", 6, !0], 0, "year"), O("year", "y"), G("Y", Sn), G("YY", fn, cn), G("YYYY", bn, hn), G("YYYYY", yn, pn), G("YYYYYY", yn, pn), Q(["YYYYY", "YYYYYY"], kn), Q("YYYY", function (e, i) {
        i[kn] = 2 === e.length ? t.parseTwoDigitYear(e) : v(e)
    }), Q("YY", function (e, i) {
        i[kn] = t.parseTwoDigitYear(e)
    }), Q("Y", function (t, e) {
        e[kn] = parseInt(t, 10)
    }), t.parseTwoDigitYear = function (t) {
        return v(t) + (v(t) > 68 ? 1900 : 2e3)
    };
    var Gn = H("FullYear", !1);
    t.ISO_8601 = function () {
    };
    var Zn = w("moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function () {
            var t = Ot.apply(null, arguments);
            return this.isValid() && t.isValid() ? this > t ? this : t : u()
        }),
        Xn = w("moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function () {
            var t = Ot.apply(null, arguments);
            return this.isValid() && t.isValid() ? t > this ? this : t : u()
        }), Kn = function () {
            return Date.now ? Date.now() : +new Date
        };
    Ut("Z", ":"), Ut("ZZ", ""), G("Z", xn), G("ZZ", xn), Q(["Z", "ZZ"], function (t, e, i) {
        i._useUTC = !0, i._tzm = Yt(xn, t)
    });
    var Qn = /([\+\-]|\d\d)/gi;
    t.updateOffset = function () {
    };
    var Jn = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/,
        tr = /^(-)?P(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)W)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?$/;
    ie.fn = Rt.prototype;
    var er = oe(1, "add"), ir = oe(-1, "subtract");
    t.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
    var nr = w("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (t) {
        return void 0 === t ? this.localeData() : this.locale(t)
    });
    j(0, ["gg", 2], 0, function () {
        return this.weekYear() % 100
    }), j(0, ["GG", 2], 0, function () {
        return this.isoWeekYear() % 100
    }), Ne("gggg", "weekYear"), Ne("ggggg", "weekYear"), Ne("GGGG", "isoWeekYear"), Ne("GGGGG", "isoWeekYear"), O("weekYear", "gg"), O("isoWeekYear", "GG"), G("G", Sn), G("g", Sn), G("GG", fn, cn), G("gg", fn, cn), G("GGGG", bn, hn), G("gggg", bn, hn), G("GGGGG", yn, pn), G("ggggg", yn, pn), J(["gggg", "ggggg", "GGGG", "GGGGG"], function (t, e, i, n) {
        e[n.substr(0, 2)] = v(t)
    }), J(["gg", "GG"], function (e, i, n, r) {
        i[r] = t.parseTwoDigitYear(e)
    }), j("Q", 0, "Qo", "quarter"), O("quarter", "Q"), G("Q", dn), Q("Q", function (t, e) {
        e[In] = 3 * (v(t) - 1)
    }), j("w", ["ww", 2], "wo", "week"), j("W", ["WW", 2], "Wo", "isoWeek"), O("week", "w"), O("isoWeek", "W"), G("w", fn), G("ww", fn, cn), G("W", fn), G("WW", fn, cn), J(["w", "ww", "W", "WW"], function (t, e, i, n) {
        e[n.substr(0, 1)] = v(t)
    });
    var rr = {dow: 0, doy: 6};
    j("D", ["DD", 2], "Do", "date"), O("date", "D"), G("D", fn), G("DD", fn, cn), G("Do", function (t, e) {
        return t ? e._ordinalParse : e._ordinalParseLenient
    }), Q(["D", "DD"], Mn), Q("Do", function (t, e) {
        e[Mn] = v(t.match(fn)[0], 10)
    });
    var ar = H("Date", !0);
    j("d", 0, "do", "day"), j("dd", 0, 0, function (t) {
        return this.localeData().weekdaysMin(this, t)
    }), j("ddd", 0, 0, function (t) {
        return this.localeData().weekdaysShort(this, t)
    }), j("dddd", 0, 0, function (t) {
        return this.localeData().weekdays(this, t)
    }), j("e", 0, 0, "weekday"), j("E", 0, 0, "isoWeekday"), O("day", "d"), O("weekday", "e"), O("isoWeekday", "E"), G("d", fn), G("e", fn), G("E", fn), G("dd", Tn), G("ddd", Tn), G("dddd", Tn), J(["dd", "ddd", "dddd"], function (t, e, i, n) {
        var r = i._locale.weekdaysParse(t, n, i._strict);
        null != r ? e.d = r : d(i).invalidWeekday = t
    }), J(["d", "e", "E"], function (t, e, i, n) {
        e[n] = v(t)
    });
    var sr = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        or = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), lr = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
    j("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), O("dayOfYear", "DDD"), G("DDD", vn), G("DDDD", un), Q(["DDD", "DDDD"], function (t, e, i) {
        i._dayOfYear = v(t)
    }), j("H", ["HH", 2], 0, "hour"), j("h", ["hh", 2], 0, li), j("hmm", 0, 0, function () {
        return "" + li.apply(this) + Y(this.minutes(), 2)
    }), j("hmmss", 0, 0, function () {
        return "" + li.apply(this) + Y(this.minutes(), 2) + Y(this.seconds(), 2)
    }), j("Hmm", 0, 0, function () {
        return "" + this.hours() + Y(this.minutes(), 2)
    }), j("Hmmss", 0, 0, function () {
        return "" + this.hours() + Y(this.minutes(), 2) + Y(this.seconds(), 2)
    }), di("a", !0), di("A", !1), O("hour", "h"), G("a", ci), G("A", ci), G("H", fn), G("h", fn), G("HH", fn, cn), G("hh", fn, cn), G("hmm", mn), G("hmmss", gn), G("Hmm", mn), G("Hmmss", gn), Q(["H", "HH"], Fn), Q(["a", "A"], function (t, e, i) {
        i._isPm = i._locale.isPM(t), i._meridiem = t
    }), Q(["h", "hh"], function (t, e, i) {
        e[Fn] = v(t), d(i).bigHour = !0
    }), Q("hmm", function (t, e, i) {
        var n = t.length - 2;
        e[Fn] = v(t.substr(0, n)), e[En] = v(t.substr(n)), d(i).bigHour = !0
    }), Q("hmmss", function (t, e, i) {
        var n = t.length - 4, r = t.length - 2;
        e[Fn] = v(t.substr(0, n)), e[En] = v(t.substr(n, 2)), e[$n] = v(t.substr(r)), d(i).bigHour = !0
    }), Q("Hmm", function (t, e, i) {
        var n = t.length - 2;
        e[Fn] = v(t.substr(0, n)), e[En] = v(t.substr(n))
    }), Q("Hmmss", function (t, e, i) {
        var n = t.length - 4, r = t.length - 2;
        e[Fn] = v(t.substr(0, n)), e[En] = v(t.substr(n, 2)), e[$n] = v(t.substr(r))
    });
    var dr = /[ap]\.?m?\.?/i, cr = H("Hours", !0);
    j("m", ["mm", 2], 0, "minute"), O("minute", "m"), G("m", fn), G("mm", fn, cn), Q(["m", "mm"], En);
    var ur = H("Minutes", !1);
    j("s", ["ss", 2], 0, "second"), O("second", "s"), G("s", fn), G("ss", fn, cn), Q(["s", "ss"], $n);
    var hr = H("Seconds", !1);
    j("S", 0, 0, function () {
        return ~~(this.millisecond() / 100)
    }), j(0, ["SS", 2], 0, function () {
        return ~~(this.millisecond() / 10)
    }), j(0, ["SSS", 3], 0, "millisecond"), j(0, ["SSSS", 4], 0, function () {
        return 10 * this.millisecond()
    }), j(0, ["SSSSS", 5], 0, function () {
        return 100 * this.millisecond()
    }), j(0, ["SSSSSS", 6], 0, function () {
        return 1e3 * this.millisecond()
    }), j(0, ["SSSSSSS", 7], 0, function () {
        return 1e4 * this.millisecond()
    }), j(0, ["SSSSSSSS", 8], 0, function () {
        return 1e5 * this.millisecond()
    }), j(0, ["SSSSSSSSS", 9], 0, function () {
        return 1e6 * this.millisecond()
    }), O("millisecond", "ms"), G("S", vn, dn), G("SS", vn, cn), G("SSS", vn, un);
    var pr;
    for (pr = "SSSS"; pr.length <= 9; pr += "S") G(pr, wn);
    for (pr = "S"; pr.length <= 9; pr += "S") Q(pr, pi);
    var fr = H("Milliseconds", !1);
    j("z", 0, 0, "zoneAbbr"), j("zz", 0, 0, "zoneName");
    var mr = f.prototype;
    mr.add = er, mr.calendar = de, mr.clone = ce, mr.diff = ve, mr.endOf = Ie, mr.format = Se, mr.from = _e, mr.fromNow = xe, mr.to = De, mr.toNow = Te, mr.get = U, mr.invalidAt = He, mr.isAfter = ue, mr.isBefore = he, mr.isBetween = pe, mr.isSame = fe, mr.isSameOrAfter = me, mr.isSameOrBefore = ge, mr.isValid = Ve, mr.lang = nr, mr.locale = Ce, mr.localeData = Ae, mr.max = Xn, mr.min = Zn, mr.parsingFlags = Pe, mr.set = U, mr.startOf = ke, mr.subtract = ir, mr.toArray = $e, mr.toObject = Le, mr.toDate = Ee, mr.toISOString = we, mr.toJSON = Oe, mr.toString = ye, mr.unix = Fe, mr.valueOf = Me, mr.creationData = Re, mr.year = Gn, mr.isLeapYear = bt, mr.weekYear = Ue, mr.isoWeekYear = Ye, mr.quarter = mr.quarters = qe, mr.month = st, mr.daysInMonth = ot, mr.week = mr.weeks = Ke, mr.isoWeek = mr.isoWeeks = Qe, mr.weeksInYear = We, mr.isoWeeksInYear = je, mr.date = ar, mr.day = mr.days = ri, mr.weekday = ai, mr.isoWeekday = si, mr.dayOfYear = oi, mr.hour = mr.hours = cr, mr.minute = mr.minutes = ur, mr.second = mr.seconds = hr, mr.millisecond = mr.milliseconds = fr, mr.utcOffset = Bt, mr.utc = qt, mr.local = Gt, mr.parseZone = Zt, mr.hasAlignedHourOffset = Xt, mr.isDST = Kt, mr.isDSTShifted = Qt, mr.isLocal = Jt, mr.isUtcOffset = te, mr.isUtc = ee, mr.isUTC = ee, mr.zoneAbbr = fi, mr.zoneName = mi, mr.dates = w("dates accessor is deprecated. Use date instead.", ar), mr.months = w("months accessor is deprecated. Use month instead", st), mr.years = w("years accessor is deprecated. Use year instead", Gn), mr.zone = w("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", zt);
    var gr = mr, vr = {
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        nextWeek: "dddd [at] LT",
        lastDay: "[Yesterday at] LT",
        lastWeek: "[Last] dddd [at] LT",
        sameElse: "L"
    }, br = {
        LTS: "h:mm:ss A",
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY h:mm A",
        LLLL: "dddd, MMMM D, YYYY h:mm A"
    }, yr = "Invalid date", wr = "%d", Sr = /\d{1,2}/, _r = {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
    }, xr = C.prototype;
    xr._calendar = vr, xr.calendar = bi, xr._longDateFormat = br, xr.longDateFormat = yi, xr._invalidDate = yr, xr.invalidDate = wi, xr._ordinal = wr, xr.ordinal = Si, xr._ordinalParse = Sr, xr.preparse = _i, xr.postformat = _i, xr._relativeTime = _r, xr.relativeTime = xi, xr.pastFuture = Di, xr.set = D, xr.months = it, xr._months = Hn, xr.monthsShort = nt, xr._monthsShort = Rn, xr.monthsParse = rt, xr._monthsRegex = Un, xr.monthsRegex = dt, xr._monthsShortRegex = Nn, xr.monthsShortRegex = lt, xr.week = Ge, xr._week = rr, xr.firstDayOfYear = Xe, xr.firstDayOfWeek = Ze, xr.weekdays = ti, xr._weekdays = sr, xr.weekdaysMin = ii, xr._weekdaysMin = lr, xr.weekdaysShort = ei, xr._weekdaysShort = or, xr.weekdaysParse = ni, xr.isPM = ui, xr._meridiemParse = dr, xr.meridiem = hi, M("en", {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function (t) {
            var e = t % 10, i = 1 === v(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th";
            return t + i
        }
    }), t.lang = w("moment.lang is deprecated. Use moment.locale instead.", M), t.langData = w("moment.langData is deprecated. Use moment.localeData instead.", $);
    var Dr = Math.abs, Tr = Yi("ms"), Cr = Yi("s"), Ar = Yi("m"), kr = Yi("h"), Ir = Yi("d"), Mr = Yi("w"),
        Fr = Yi("M"), Er = Yi("y"), $r = Wi("milliseconds"), Lr = Wi("seconds"), Or = Wi("minutes"), Vr = Wi("hours"),
        Pr = Wi("days"), Hr = Wi("months"), Rr = Wi("years"), Nr = Math.round, Ur = {s: 45, m: 45, h: 22, d: 26, M: 11},
        Yr = Math.abs, jr = Rt.prototype;
    jr.abs = Ei, jr.add = Li, jr.subtract = Oi, jr.as = Ni, jr.asMilliseconds = Tr, jr.asSeconds = Cr, jr.asMinutes = Ar, jr.asHours = kr, jr.asDays = Ir, jr.asWeeks = Mr, jr.asMonths = Fr, jr.asYears = Er, jr.valueOf = Ui, jr._bubble = Pi, jr.get = ji, jr.milliseconds = $r, jr.seconds = Lr, jr.minutes = Or, jr.hours = Vr, jr.days = Pr, jr.weeks = Bi, jr.months = Hr, jr.years = Rr, jr.humanize = Zi, jr.toISOString = Xi, jr.toString = Xi, jr.toJSON = Xi, jr.locale = Ce, jr.localeData = Ae, jr.toIsoString = w("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Xi), jr.lang = nr, j("X", 0, 0, "unix"), j("x", 0, 0, "valueOf"), G("x", Sn), G("X", Dn), Q("X", function (t, e, i) {
        i._d = new Date(1e3 * parseFloat(t, 10))
    }), Q("x", function (t, e, i) {
        i._d = new Date(v(t))
    }), t.version = "2.12.0", e(Ot), t.fn = gr, t.min = Pt, t.max = Ht, t.now = Kn, t.utc = o, t.unix = gi, t.months = Ai, t.isDate = n, t.locale = M, t.invalid = u, t.duration = ie, t.isMoment = m, t.weekdays = Ii, t.parseZone = vi, t.localeData = $, t.isDuration = Nt, t.monthsShort = ki, t.weekdaysMin = Fi, t.defineLocale = F, t.updateLocale = E, t.locales = L, t.weekdaysShort = Mi, t.normalizeUnits = V, t.relativeTimeThreshold = Gi, t.prototype = gr;
    var Wr = t;
    return Wr
}), !function (t) {
    "use strict";
    if ("function" == typeof define && define.amd) define(["jquery", "moment"], t); else if ("object" == typeof exports) t(require("jquery"), require("moment")); else {
        if ("undefined" == typeof jQuery) throw"bootstrap-datetimepicker requires jQuery to be loaded first";
        if ("undefined" == typeof moment) throw"bootstrap-datetimepicker requires Moment.js to be loaded first";
        t(jQuery, moment)
    }
}(function (t, e) {
    "use strict";
    if (!e) throw new Error("bootstrap-datetimepicker requires Moment.js to be loaded first");
    var i = function (i, n) {
        var r, a, s, o, l, d, c, u = {}, h = !0, p = !1, f = !1, m = 0,
            g = [{clsName: "days", navFnc: "M", navStep: 1}, {
                clsName: "months",
                navFnc: "y",
                navStep: 1
            }, {clsName: "years", navFnc: "y", navStep: 10}, {clsName: "decades", navFnc: "y", navStep: 100}],
            v = ["days", "months", "years", "decades"], b = ["top", "bottom", "auto"], y = ["left", "right", "auto"],
            w = ["default", "top", "bottom"], S = {
                up: 38,
                38: "up",
                down: 40,
                40: "down",
                left: 37,
                37: "left",
                right: 39,
                39: "right",
                tab: 9,
                9: "tab",
                escape: 27,
                27: "escape",
                enter: 13,
                13: "enter",
                pageUp: 33,
                33: "pageUp",
                pageDown: 34,
                34: "pageDown",
                shift: 16,
                16: "shift",
                control: 17,
                17: "control",
                space: 32,
                32: "space",
                t: 84,
                84: "t",
                "delete": 46,
                46: "delete"
            }, _ = {}, x = function (t) {
                var i, r, a, s, o, l = !1;
                return void 0 !== e.tz && void 0 !== n.timeZone && null !== n.timeZone && "" !== n.timeZone && (l = !0), void 0 === t || null === t ? i = l ? e().tz(n.timeZone).startOf("d") : e().startOf("d") : l ? (r = e().tz(n.timeZone).utcOffset(), a = e(t, d, n.useStrict).utcOffset(), a !== r ? (s = e().tz(n.timeZone).format("Z"), o = e(t, d, n.useStrict).format("YYYY-MM-DD[T]HH:mm:ss") + s, i = e(o, d, n.useStrict).tz(n.timeZone)) : i = e(t, d, n.useStrict).tz(n.timeZone)) : i = e(t, d, n.useStrict), i
            }, D = function (t) {
                if ("string" != typeof t || t.length > 1) throw new TypeError("isEnabled expects a single character string parameter");
                switch (t) {
                    case"y":
                        return -1 !== l.indexOf("Y");
                    case"M":
                        return -1 !== l.indexOf("M");
                    case"d":
                        return -1 !== l.toLowerCase().indexOf("d");
                    case"h":
                    case"H":
                        return -1 !== l.toLowerCase().indexOf("h");
                    case"m":
                        return -1 !== l.indexOf("m");
                    case"s":
                        return -1 !== l.indexOf("s");
                    default:
                        return !1
                }
            }, T = function () {
                return D("h") || D("m") || D("s")
            }, C = function () {
                return D("y") || D("M") || D("d")
            }, A = function () {
                var e = t("<thead>").append(t("<tr>").append(t("<th>").addClass("prev").attr("data-action", "previous").append(t("<span>").addClass(n.icons.previous))).append(t("<th>").addClass("picker-switch").attr("data-action", "pickerSwitch").attr("colspan", n.calendarWeeks ? "6" : "5")).append(t("<th>").addClass("next").attr("data-action", "next").append(t("<span>").addClass(n.icons.next)))),
                    i = t("<tbody>").append(t("<tr>").append(t("<td>").attr("colspan", n.calendarWeeks ? "8" : "7")));
                return [t("<div>").addClass("datepicker-days").append(t("<table>").addClass("table-condensed").append(e).append(t("<tbody>"))), t("<div>").addClass("datepicker-months").append(t("<table>").addClass("table-condensed").append(e.clone()).append(i.clone())), t("<div>").addClass("datepicker-years").append(t("<table>").addClass("table-condensed").append(e.clone()).append(i.clone())), t("<div>").addClass("datepicker-decades").append(t("<table>").addClass("table-condensed").append(e.clone()).append(i.clone()))]
            }, k = function () {
                var e = t("<tr>"), i = t("<tr>"), r = t("<tr>");
                return D("h") && (e.append(t("<td>").append(t("<a>").attr({
                    href: "#",
                    tabindex: "-1",
                    title: n.tooltips.incrementHour
                }).addClass("btn").attr("data-action", "incrementHours").append(t("<span>").addClass(n.icons.up)))), i.append(t("<td>").append(t("<span>").addClass("timepicker-hour").attr({
                    "data-time-component": "hours",
                    title: n.tooltips.pickHour
                }).attr("data-action", "showHours"))), r.append(t("<td>").append(t("<a>").attr({
                    href: "#",
                    tabindex: "-1",
                    title: n.tooltips.decrementHour
                }).addClass("btn").attr("data-action", "decrementHours").append(t("<span>").addClass(n.icons.down))))), D("m") && (D("h") && (e.append(t("<td>").addClass("separator")), i.append(t("<td>").addClass("separator").html(":")), r.append(t("<td>").addClass("separator"))), e.append(t("<td>").append(t("<a>").attr({
                    href: "#",
                    tabindex: "-1",
                    title: n.tooltips.incrementMinute
                }).addClass("btn").attr("data-action", "incrementMinutes").append(t("<span>").addClass(n.icons.up)))), i.append(t("<td>").append(t("<span>").addClass("timepicker-minute").attr({
                    "data-time-component": "minutes",
                    title: n.tooltips.pickMinute
                }).attr("data-action", "showMinutes"))), r.append(t("<td>").append(t("<a>").attr({
                    href: "#",
                    tabindex: "-1",
                    title: n.tooltips.decrementMinute
                }).addClass("btn").attr("data-action", "decrementMinutes").append(t("<span>").addClass(n.icons.down))))), D("s") && (D("m") && (e.append(t("<td>").addClass("separator")), i.append(t("<td>").addClass("separator").html(":")), r.append(t("<td>").addClass("separator"))), e.append(t("<td>").append(t("<a>").attr({
                    href: "#",
                    tabindex: "-1",
                    title: n.tooltips.incrementSecond
                }).addClass("btn").attr("data-action", "incrementSeconds").append(t("<span>").addClass(n.icons.up)))), i.append(t("<td>").append(t("<span>").addClass("timepicker-second").attr({
                    "data-time-component": "seconds",
                    title: n.tooltips.pickSecond
                }).attr("data-action", "showSeconds"))), r.append(t("<td>").append(t("<a>").attr({
                    href: "#",
                    tabindex: "-1",
                    title: n.tooltips.decrementSecond
                }).addClass("btn").attr("data-action", "decrementSeconds").append(t("<span>").addClass(n.icons.down))))), o || (e.append(t("<td>").addClass("separator")), i.append(t("<td>").append(t("<button>").addClass("btn btn-primary").attr({
                    "data-action": "togglePeriod",
                    tabindex: "-1",
                    title: n.tooltips.togglePeriod
                }))), r.append(t("<td>").addClass("separator"))), t("<div>").addClass("timepicker-picker").append(t("<table>").addClass("table-condensed").append([e, i, r]))
            }, I = function () {
                var e = t("<div>").addClass("timepicker-hours").append(t("<table>").addClass("table-condensed")),
                    i = t("<div>").addClass("timepicker-minutes").append(t("<table>").addClass("table-condensed")),
                    n = t("<div>").addClass("timepicker-seconds").append(t("<table>").addClass("table-condensed")),
                    r = [k()];
                return D("h") && r.push(e), D("m") && r.push(i), D("s") && r.push(n), r
            }, M = function () {
                var e = [];
                return n.showTodayButton && e.push(t("<td>").append(t("<a>").attr({
                    "data-action": "today",
                    title: n.tooltips.today
                }).append(t("<span>").addClass(n.icons.today)))), !n.sideBySide && C() && T() && e.push(t("<td>").append(t("<a>").attr({
                    "data-action": "togglePicker",
                    title: n.tooltips.selectTime
                }).append(t("<span>").addClass(n.icons.time)))), n.showClear && e.push(t("<td>").append(t("<a>").attr({
                    "data-action": "clear",
                    title: n.tooltips.clear
                }).append(t("<span>").addClass(n.icons.clear)))), n.showClose && e.push(t("<td>").append(t("<a>").attr({
                    "data-action": "close",
                    title: n.tooltips.close
                }).append(t("<span>").addClass(n.icons.close)))), t("<table>").addClass("table-condensed").append(t("<tbody>").append(t("<tr>").append(e)))
            }, F = function () {
                var e = t("<div>").addClass("bootstrap-datetimepicker-widget dropdown-menu"),
                    i = t("<div>").addClass("datepicker").append(A()), r = t("<div>").addClass("timepicker").append(I()),
                    a = t("<ul>").addClass("list-unstyled"),
                    s = t("<li>").addClass("picker-switch" + (n.collapse ? " accordion-toggle" : "")).append(M());
                return n.inline && e.removeClass("dropdown-menu"), o && e.addClass("usetwentyfour"), D("s") && !o && e.addClass("wider"), n.sideBySide && C() && T() ? (e.addClass("timepicker-sbs"), "top" === n.toolbarPlacement && e.append(s), e.append(t("<div>").addClass("row").append(i.addClass("col-md-6")).append(r.addClass("col-md-6"))), "bottom" === n.toolbarPlacement && e.append(s), e) : ("top" === n.toolbarPlacement && a.append(s), C() && a.append(t("<li>").addClass(n.collapse && T() ? "collapse in" : "").append(i)), "default" === n.toolbarPlacement && a.append(s), T() && a.append(t("<li>").addClass(n.collapse && C() ? "collapse" : "").append(r)), "bottom" === n.toolbarPlacement && a.append(s), e.append(a))
            }, E = function () {
                var e, r = {};
                return e = i.is("input") || n.inline ? i.data() : i.find("input").data(), e.dateOptions && e.dateOptions instanceof Object && (r = t.extend(!0, r, e.dateOptions)), t.each(n, function (t) {
                    var i = "date" + t.charAt(0).toUpperCase() + t.slice(1);
                    void 0 !== e[i] && (r[t] = e[i])
                }), r
            }, $ = function () {
                var e, r = (p || i).position(), a = (p || i).offset(), s = n.widgetPositioning.vertical,
                    o = n.widgetPositioning.horizontal;
                if (n.widgetParent) e = n.widgetParent.append(f); else if (i.is("input")) e = i.after(f).parent(); else {
                    if (n.inline) return void(e = i.append(f));
                    e = i, i.children().first().after(f)
                }
                if ("auto" === s && (s = a.top + 1.5 * f.height() >= t(window).height() + t(window).scrollTop() && f.height() + i.outerHeight() < a.top ? "top" : "bottom"), "auto" === o && (o = e.width() < a.left + f.outerWidth() / 2 && a.left + f.outerWidth() > t(window).width() ? "right" : "left"), "top" === s ? f.addClass("top").removeClass("bottom") : f.addClass("bottom").removeClass("top"), "right" === o ? f.addClass("pull-right") : f.removeClass("pull-right"), "relative" !== e.css("position") && (e = e.parents().filter(function () {
                        return "relative" === t(this).css("position")
                    }).first()), 0 === e.length) throw new Error("datetimepicker component should be placed within a relative positioned container");
                f.css({
                    top: "top" === s ? "auto" : r.top + i.outerHeight(),
                    bottom: "top" === s ? r.top + i.outerHeight() : "auto",
                    left: "left" === o ? e === i ? 0 : r.left : "auto",
                    right: "left" === o ? "auto" : e.outerWidth() - i.outerWidth() - (e === i ? 0 : r.left)
                })
            }, L = function (t) {
                "dp.change" === t.type && (t.date && t.date.isSame(t.oldDate) || !t.date && !t.oldDate) || i.trigger(t)
            }, O = function (t) {
                "y" === t && (t = "YYYY"), L({type: "dp.update", change: t, viewDate: a.clone()})
            }, V = function (t) {
                f && (t && (c = Math.max(m, Math.min(3, c + t))), f.find(".datepicker > div").hide().filter(".datepicker-" + g[c].clsName).show())
            }, P = function () {
                var e = t("<tr>"), i = a.clone().startOf("w").startOf("d");
                for (n.calendarWeeks === !0 && e.append(t("<th>").addClass("cw").text("#")); i.isBefore(a.clone().endOf("w"));) e.append(t("<th>").addClass("dow").text(i.format("dd"))), i.add(1, "d");
                f.find(".datepicker-days thead").append(e)
            }, H = function (t) {
                return n.disabledDates[t.format("YYYY-MM-DD")] === !0
            }, R = function (t) {
                return n.enabledDates[t.format("YYYY-MM-DD")] === !0
            }, N = function (t) {
                return n.disabledHours[t.format("H")] === !0
            }, U = function (t) {
                return n.enabledHours[t.format("H")] === !0
            }, Y = function (e, i) {
                if (!e.isValid()) return !1;
                if (n.disabledDates && "d" === i && H(e)) return !1;
                if (n.enabledDates && "d" === i && !R(e)) return !1;
                if (n.minDate && e.isBefore(n.minDate, i)) return !1;
                if (n.maxDate && e.isAfter(n.maxDate, i)) return !1;
                if (n.daysOfWeekDisabled && "d" === i && -1 !== n.daysOfWeekDisabled.indexOf(e.day())) return !1;
                if (n.disabledHours && ("h" === i || "m" === i || "s" === i) && N(e)) return !1;
                if (n.enabledHours && ("h" === i || "m" === i || "s" === i) && !U(e)) return !1;
                if (n.disabledTimeIntervals && ("h" === i || "m" === i || "s" === i)) {
                    var r = !1;
                    if (t.each(n.disabledTimeIntervals, function () {
                            return e.isBetween(this[0], this[1]) ? (r = !0, !1) : void 0
                        }), r) return !1
                }
                return !0
            }, j = function () {
                for (var e = [], i = a.clone().startOf("y").startOf("d"); i.isSame(a, "y");) e.push(t("<span>").attr("data-action", "selectMonth").addClass("month").text(i.format("MMM"))), i.add(1, "M");
                f.find(".datepicker-months td").empty().append(e)
            }, W = function () {
                var e = f.find(".datepicker-months"), i = e.find("th"), s = e.find("tbody").find("span");
                i.eq(0).find("span").attr("title", n.tooltips.prevYear), i.eq(1).attr("title", n.tooltips.selectYear), i.eq(2).find("span").attr("title", n.tooltips.nextYear), e.find(".disabled").removeClass("disabled"), Y(a.clone().subtract(1, "y"), "y") || i.eq(0).addClass("disabled"), i.eq(1).text(a.year()), Y(a.clone().add(1, "y"), "y") || i.eq(2).addClass("disabled"), s.removeClass("active"), r.isSame(a, "y") && !h && s.eq(r.month()).addClass("active"), s.each(function (e) {
                    Y(a.clone().month(e), "M") || t(this).addClass("disabled")
                })
            }, B = function () {
                var t = f.find(".datepicker-years"), e = t.find("th"), i = a.clone().subtract(5, "y"),
                    s = a.clone().add(6, "y"), o = "";
                for (e.eq(0).find("span").attr("title", n.tooltips.prevDecade), e.eq(1).attr("title", n.tooltips.selectDecade), e.eq(2).find("span").attr("title", n.tooltips.nextDecade), t.find(".disabled").removeClass("disabled"), n.minDate && n.minDate.isAfter(i, "y") && e.eq(0).addClass("disabled"), e.eq(1).text(i.year() + "-" + s.year()), n.maxDate && n.maxDate.isBefore(s, "y") && e.eq(2).addClass("disabled"); !i.isAfter(s, "y");) o += '<span data-action="selectYear" class="year' + (i.isSame(r, "y") && !h ? " active" : "") + (Y(i, "y") ? "" : " disabled") + '">' + i.year() + "</span>", i.add(1, "y");
                t.find("td").html(o)
            }, z = function () {
                var t = f.find(".datepicker-decades"), i = t.find("th"), s = e({y: a.year() - a.year() % 100 - 1}),
                    o = s.clone().add(100, "y"), l = s.clone(), d = "";
                for (i.eq(0).find("span").attr("title", n.tooltips.prevCentury), i.eq(2).find("span").attr("title", n.tooltips.nextCentury), t.find(".disabled").removeClass("disabled"), (s.isSame(e({y: 1900})) || n.minDate && n.minDate.isAfter(s, "y")) && i.eq(0).addClass("disabled"), i.eq(1).text(s.year() + "-" + o.year()), (s.isSame(e({y: 2e3})) || n.maxDate && n.maxDate.isBefore(o, "y")) && i.eq(2).addClass("disabled"); !s.isAfter(o, "y");) d += '<span data-action="selectDecade" class="decade' + (s.isSame(r, "y") ? " active" : "") + (Y(s, "y") ? "" : " disabled") + '" data-selection="' + (s.year() + 6) + '">' + (s.year() + 1) + " - " + (s.year() + 12) + "</span>", s.add(12, "y");
                d += "<span></span><span></span><span></span>", t.find("td").html(d), i.eq(1).text(l.year() + 1 + "-" + s.year())
            }, q = function () {
                var e, i, s, o, l = f.find(".datepicker-days"), d = l.find("th"), c = [];
                if (C()) {
                    for (d.eq(0).find("span").attr("title", n.tooltips.prevMonth), d.eq(1).attr("title", n.tooltips.selectMonth), d.eq(2).find("span").attr("title", n.tooltips.nextMonth), l.find(".disabled").removeClass("disabled"), d.eq(1).text(a.format(n.dayViewHeaderFormat)), Y(a.clone().subtract(1, "M"), "M") || d.eq(0).addClass("disabled"), Y(a.clone().add(1, "M"), "M") || d.eq(2).addClass("disabled"), e = a.clone().startOf("M").startOf("w").startOf("d"), o = 0; 42 > o; o++) 0 === e.weekday() && (i = t("<tr>"), n.calendarWeeks && i.append('<td class="cw">' + e.week() + "</td>"), c.push(i)), s = "", e.isBefore(a, "M") && (s += " old"), e.isAfter(a, "M") && (s += " new"), e.isSame(r, "d") && !h && (s += " active"), Y(e, "d") || (s += " disabled"), e.isSame(x(), "d") && (s += " today"), (0 === e.day() || 6 === e.day()) && (s += " weekend"), i.append('<td data-action="selectDay" data-day="' + e.format("L") + '" class="day' + s + '">' + e.date() + "</td>"), e.add(1, "d");
                    l.find("tbody").empty().append(c), W(), B(), z()
                }
            }, G = function () {
                var e = f.find(".timepicker-hours table"), i = a.clone().startOf("d"), n = [], r = t("<tr>");
                for (a.hour() > 11 && !o && i.hour(12); i.isSame(a, "d") && (o || a.hour() < 12 && i.hour() < 12 || a.hour() > 11);) i.hour() % 4 === 0 && (r = t("<tr>"), n.push(r)), r.append('<td data-action="selectHour" class="hour' + (Y(i, "h") ? "" : " disabled") + '">' + i.format(o ? "HH" : "hh") + "</td>"), i.add(1, "h");
                e.empty().append(n)
            }, Z = function () {
                for (var e = f.find(".timepicker-minutes table"), i = a.clone().startOf("h"), r = [], s = t("<tr>"), o = 1 === n.stepping ? 5 : n.stepping; a.isSame(i, "h");) i.minute() % (4 * o) === 0 && (s = t("<tr>"), r.push(s)), s.append('<td data-action="selectMinute" class="minute' + (Y(i, "m") ? "" : " disabled") + '">' + i.format("mm") + "</td>"), i.add(o, "m");
                e.empty().append(r)
            }, X = function () {
                for (var e = f.find(".timepicker-seconds table"), i = a.clone().startOf("m"), n = [], r = t("<tr>"); a.isSame(i, "m");) i.second() % 20 === 0 && (r = t("<tr>"), n.push(r)), r.append('<td data-action="selectSecond" class="second' + (Y(i, "s") ? "" : " disabled") + '">' + i.format("ss") + "</td>"), i.add(5, "s");
                e.empty().append(n)
            }, K = function () {
                var t, e, i = f.find(".timepicker span[data-time-component]");
                o || (t = f.find(".timepicker [data-action=togglePeriod]"), e = r.clone().add(r.hours() >= 12 ? -12 : 12, "h"), t.text(r.format("A")), Y(e, "h") ? t.removeClass("disabled") : t.addClass("disabled")), i.filter("[data-time-component=hours]").text(r.format(o ? "HH" : "hh")), i.filter("[data-time-component=minutes]").text(r.format("mm")), i.filter("[data-time-component=seconds]").text(r.format("ss")), G(), Z(), X()
            }, Q = function () {
                f && (q(), K())
            }, J = function (t) {
                var e = h ? null : r;
                return t ? (t = t.clone().locale(n.locale), 1 !== n.stepping && t.minutes(Math.round(t.minutes() / n.stepping) * n.stepping % 60).seconds(0), void(Y(t) ? (r = t, a = r.clone(), s.val(r.format(l)), i.data("date", r.format(l)), h = !1, Q(), L({
                    type: "dp.change",
                    date: r.clone(),
                    oldDate: e
                })) : (n.keepInvalid || s.val(h ? "" : r.format(l)),
                    L({type: "dp.error", date: t})))) : (h = !0, s.val(""), i.data("date", ""), L({
                    type: "dp.change",
                    date: !1,
                    oldDate: e
                }), void Q())
            }, tt = function () {
                var e = !1;
                return f ? (f.find(".collapse").each(function () {
                    var i = t(this).data("collapse");
                    return i && i.transitioning ? (e = !0, !1) : !0
                }), e ? u : (p && p.hasClass("btn") && p.toggleClass("active"), f.hide(), t(window).off("resize", $), f.off("click", "[data-action]"), f.off("mousedown", !1), f.remove(), f = !1, L({
                    type: "dp.hide",
                    date: r.clone()
                }), s.blur(), u)) : u
            }, et = function () {
                J(null)
            }, it = {
                next: function () {
                    var t = g[c].navFnc;
                    a.add(g[c].navStep, t), q(), O(t)
                }, previous: function () {
                    var t = g[c].navFnc;
                    a.subtract(g[c].navStep, t), q(), O(t)
                }, pickerSwitch: function () {
                    V(1)
                }, selectMonth: function (e) {
                    var i = t(e.target).closest("tbody").find("span").index(t(e.target));
                    a.month(i), c === m ? (J(r.clone().year(a.year()).month(a.month())), n.inline || tt()) : (V(-1), q()), O("M")
                }, selectYear: function (e) {
                    var i = parseInt(t(e.target).text(), 10) || 0;
                    a.year(i), c === m ? (J(r.clone().year(a.year())), n.inline || tt()) : (V(-1), q()), O("YYYY")
                }, selectDecade: function (e) {
                    var i = parseInt(t(e.target).data("selection"), 10) || 0;
                    a.year(i), c === m ? (J(r.clone().year(a.year())), n.inline || tt()) : (V(-1), q()), O("YYYY")
                }, selectDay: function (e) {
                    var i = a.clone();
                    t(e.target).is(".old") && i.subtract(1, "M"), t(e.target).is(".new") && i.add(1, "M"), J(i.date(parseInt(t(e.target).text(), 10))), T() || n.keepOpen || n.inline || tt()
                }, incrementHours: function () {
                    var t = r.clone().add(1, "h");
                    Y(t, "h") && J(t)
                }, incrementMinutes: function () {
                    var t = r.clone().add(n.stepping, "m");
                    Y(t, "m") && J(t)
                }, incrementSeconds: function () {
                    var t = r.clone().add(1, "s");
                    Y(t, "s") && J(t)
                }, decrementHours: function () {
                    var t = r.clone().subtract(1, "h");
                    Y(t, "h") && J(t)
                }, decrementMinutes: function () {
                    var t = r.clone().subtract(n.stepping, "m");
                    Y(t, "m") && J(t)
                }, decrementSeconds: function () {
                    var t = r.clone().subtract(1, "s");
                    Y(t, "s") && J(t)
                }, togglePeriod: function () {
                    J(r.clone().add(r.hours() >= 12 ? -12 : 12, "h"))
                }, togglePicker: function (e) {
                    var i, r = t(e.target), a = r.closest("ul"), s = a.find(".in"), o = a.find(".collapse:not(.in)");
                    if (s && s.length) {
                        if (i = s.data("collapse"), i && i.transitioning) return;
                        s.collapse ? (s.collapse("hide"), o.collapse("show")) : (s.removeClass("in"), o.addClass("in")), r.is("span") ? r.toggleClass(n.icons.time + " " + n.icons.date) : r.find("span").toggleClass(n.icons.time + " " + n.icons.date)
                    }
                }, showPicker: function () {
                    f.find(".timepicker > div:not(.timepicker-picker)").hide(), f.find(".timepicker .timepicker-picker").show()
                }, showHours: function () {
                    f.find(".timepicker .timepicker-picker").hide(), f.find(".timepicker .timepicker-hours").show()
                }, showMinutes: function () {
                    f.find(".timepicker .timepicker-picker").hide(), f.find(".timepicker .timepicker-minutes").show()
                }, showSeconds: function () {
                    f.find(".timepicker .timepicker-picker").hide(), f.find(".timepicker .timepicker-seconds").show()
                }, selectHour: function (e) {
                    var i = parseInt(t(e.target).text(), 10);
                    o || (r.hours() >= 12 ? 12 !== i && (i += 12) : 12 === i && (i = 0)), J(r.clone().hours(i)), it.showPicker.call(u)
                }, selectMinute: function (e) {
                    J(r.clone().minutes(parseInt(t(e.target).text(), 10))), it.showPicker.call(u)
                }, selectSecond: function (e) {
                    J(r.clone().seconds(parseInt(t(e.target).text(), 10))), it.showPicker.call(u)
                }, clear: et, today: function () {
                    var t = x();
                    Y(t, "d") && J(t)
                }, close: tt
            }, nt = function (e) {
                return t(e.currentTarget).is(".disabled") ? !1 : (it[t(e.currentTarget).data("action")].apply(u, arguments), !1)
            }, rt = function () {
                var e, i = {
                    year: function (t) {
                        return t.month(0).date(1).hours(0).seconds(0).minutes(0)
                    }, month: function (t) {
                        return t.date(1).hours(0).seconds(0).minutes(0)
                    }, day: function (t) {
                        return t.hours(0).seconds(0).minutes(0)
                    }, hour: function (t) {
                        return t.seconds(0).minutes(0)
                    }, minute: function (t) {
                        return t.seconds(0)
                    }
                };
                return s.prop("disabled") || !n.ignoreReadonly && s.prop("readonly") || f ? u : (void 0 !== s.val() && 0 !== s.val().trim().length ? J(st(s.val().trim())) : n.useCurrent && h && (s.is("input") && 0 === s.val().trim().length || n.inline) && (e = x(), "string" == typeof n.useCurrent && (e = i[n.useCurrent](e)), J(e)), f = F(), P(), j(), f.find(".timepicker-hours").hide(), f.find(".timepicker-minutes").hide(), f.find(".timepicker-seconds").hide(), Q(), V(), t(window).on("resize", $), f.on("click", "[data-action]", nt), f.on("mousedown", !1), p && p.hasClass("btn") && p.toggleClass("active"), f.show(), $(), n.focusOnShow && !s.is(":focus") && s.focus(), L({type: "dp.show"}), u)
            }, at = function () {
                return f ? tt() : rt()
            }, st = function (t) {
                return t = void 0 === n.parseInputDate ? e.isMoment(t) || t instanceof Date ? e(t) : x(t) : n.parseInputDate(t), t.locale(n.locale), t
            }, ot = function (t) {
                var e, i, r, a, s = null, o = [], l = {}, d = t.which, c = "p";
                _[d] = c;
                for (e in _) _.hasOwnProperty(e) && _[e] === c && (o.push(e), parseInt(e, 10) !== d && (l[e] = !0));
                for (e in n.keyBinds) if (n.keyBinds.hasOwnProperty(e) && "function" == typeof n.keyBinds[e] && (r = e.split(" "), r.length === o.length && S[d] === r[r.length - 1])) {
                    for (a = !0, i = r.length - 2; i >= 0; i--) if (!(S[r[i]] in l)) {
                        a = !1;
                        break
                    }
                    if (a) {
                        s = n.keyBinds[e];
                        break
                    }
                }
                s && (s.call(u, f), t.stopPropagation(), t.preventDefault())
            }, lt = function (t) {
                _[t.which] = "r", t.stopPropagation(), t.preventDefault()
            }, dt = function (e) {
                var i = t(e.target).val().trim(), n = i ? st(i) : null;
                return J(n), e.stopImmediatePropagation(), !1
            }, ct = function () {
                s.on({
                    change: dt,
                    blur: n.debug ? "" : tt,
                    keydown: ot,
                    keyup: lt,
                    focus: n.allowInputToggle ? rt : ""
                }), i.is("input") ? s.on({focus: rt}) : p && (p.on("click", at), p.on("mousedown", !1))
            }, ut = function () {
                s.off({
                    change: dt,
                    blur: blur,
                    keydown: ot,
                    keyup: lt,
                    focus: n.allowInputToggle ? tt : ""
                }), i.is("input") ? s.off({focus: rt}) : p && (p.off("click", at), p.off("mousedown", !1))
            }, ht = function (e) {
                var i = {};
                return t.each(e, function () {
                    var t = st(this);
                    t.isValid() && (i[t.format("YYYY-MM-DD")] = !0)
                }), Object.keys(i).length ? i : !1
            }, pt = function (e) {
                var i = {};
                return t.each(e, function () {
                    i[this] = !0
                }), Object.keys(i).length ? i : !1
            }, ft = function () {
                var t = n.format || "L LT";
                l = t.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function (t) {
                    var e = r.localeData().longDateFormat(t) || t;
                    return e.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function (t) {
                        return r.localeData().longDateFormat(t) || t
                    })
                }), d = n.extraFormats ? n.extraFormats.slice() : [], d.indexOf(t) < 0 && d.indexOf(l) < 0 && d.push(l), o = l.toLowerCase().indexOf("a") < 1 && l.replace(/\[.*?\]/g, "").indexOf("h") < 1, D("y") && (m = 2), D("M") && (m = 1), D("d") && (m = 0), c = Math.max(m, c), h || J(r)
            };
        if (u.destroy = function () {
                tt(), ut(), i.removeData("DateTimePicker"), i.removeData("date")
            }, u.toggle = at, u.show = rt, u.hide = tt, u.disable = function () {
                return tt(), p && p.hasClass("btn") && p.addClass("disabled"), s.prop("disabled", !0), u
            }, u.enable = function () {
                return p && p.hasClass("btn") && p.removeClass("disabled"), s.prop("disabled", !1), u
            }, u.ignoreReadonly = function (t) {
                if (0 === arguments.length) return n.ignoreReadonly;
                if ("boolean" != typeof t) throw new TypeError("ignoreReadonly () expects a boolean parameter");
                return n.ignoreReadonly = t, u
            }, u.options = function (e) {
                if (0 === arguments.length) return t.extend(!0, {}, n);
                if (!(e instanceof Object)) throw new TypeError("options() options parameter should be an object");
                return t.extend(!0, n, e), t.each(n, function (t, e) {
                    if (void 0 === u[t]) throw new TypeError("option " + t + " is not recognized!");
                    u[t](e)
                }), u
            }, u.date = function (t) {
                if (0 === arguments.length) return h ? null : r.clone();
                if (!(null === t || "string" == typeof t || e.isMoment(t) || t instanceof Date)) throw new TypeError("date() parameter must be one of [null, string, moment or Date]");
                return J(null === t ? null : st(t)), u
            }, u.format = function (t) {
                if (0 === arguments.length) return n.format;
                if ("string" != typeof t && ("boolean" != typeof t || t !== !1)) throw new TypeError("format() expects a sting or boolean:false parameter " + t);
                return n.format = t, l && ft(), u
            }, u.timeZone = function (t) {
                return 0 === arguments.length ? n.timeZone : (n.timeZone = t, u)
            }, u.dayViewHeaderFormat = function (t) {
                if (0 === arguments.length) return n.dayViewHeaderFormat;
                if ("string" != typeof t) throw new TypeError("dayViewHeaderFormat() expects a string parameter");
                return n.dayViewHeaderFormat = t, u
            }, u.extraFormats = function (t) {
                if (0 === arguments.length) return n.extraFormats;
                if (t !== !1 && !(t instanceof Array)) throw new TypeError("extraFormats() expects an array or false parameter");
                return n.extraFormats = t, d && ft(), u
            }, u.disabledDates = function (e) {
                if (0 === arguments.length) return n.disabledDates ? t.extend({}, n.disabledDates) : n.disabledDates;
                if (!e) return n.disabledDates = !1, Q(), u;
                if (!(e instanceof Array)) throw new TypeError("disabledDates() expects an array parameter");
                return n.disabledDates = ht(e), n.enabledDates = !1, Q(), u
            }, u.enabledDates = function (e) {
                if (0 === arguments.length) return n.enabledDates ? t.extend({}, n.enabledDates) : n.enabledDates;
                if (!e) return n.enabledDates = !1, Q(), u;
                if (!(e instanceof Array)) throw new TypeError("enabledDates() expects an array parameter");
                return n.enabledDates = ht(e), n.disabledDates = !1, Q(), u
            }, u.daysOfWeekDisabled = function (t) {
                if (0 === arguments.length) return n.daysOfWeekDisabled.splice(0);
                if ("boolean" == typeof t && !t) return n.daysOfWeekDisabled = !1, Q(), u;
                if (!(t instanceof Array)) throw new TypeError("daysOfWeekDisabled() expects an array parameter");
                if (n.daysOfWeekDisabled = t.reduce(function (t, e) {
                        return e = parseInt(e, 10), e > 6 || 0 > e || isNaN(e) ? t : (-1 === t.indexOf(e) && t.push(e), t)
                    }, []).sort(), n.useCurrent && !n.keepInvalid) {
                    for (var e = 0; !Y(r, "d");) {
                        if (r.add(1, "d"), 7 === e) throw"Tried 7 times to find a valid date";
                        e++
                    }
                    J(r)
                }
                return Q(), u
            }, u.maxDate = function (t) {
                if (0 === arguments.length) return n.maxDate ? n.maxDate.clone() : n.maxDate;
                if ("boolean" == typeof t && t === !1) return n.maxDate = !1, Q(), u;
                "string" == typeof t && ("now" === t || "moment" === t) && (t = x());
                var e = st(t);
                if (!e.isValid()) throw new TypeError("maxDate() Could not parse date parameter: " + t);
                if (n.minDate && e.isBefore(n.minDate)) throw new TypeError("maxDate() date parameter is before options.minDate: " + e.format(l));
                return n.maxDate = e, n.useCurrent && !n.keepInvalid && r.isAfter(t) && J(n.maxDate), a.isAfter(e) && (a = e.clone().subtract(n.stepping, "m")), Q(), u
            }, u.minDate = function (t) {
                if (0 === arguments.length) return n.minDate ? n.minDate.clone() : n.minDate;
                if ("boolean" == typeof t && t === !1) return n.minDate = !1, Q(), u;
                "string" == typeof t && ("now" === t || "moment" === t) && (t = x());
                var e = st(t);
                if (!e.isValid()) throw new TypeError("minDate() Could not parse date parameter: " + t);
                if (n.maxDate && e.isAfter(n.maxDate)) throw new TypeError("minDate() date parameter is after options.maxDate: " + e.format(l));
                return n.minDate = e, n.useCurrent && !n.keepInvalid && r.isBefore(t) && J(n.minDate), a.isBefore(e) && (a = e.clone().add(n.stepping, "m")), Q(), u
            }, u.defaultDate = function (t) {
                if (0 === arguments.length) return n.defaultDate ? n.defaultDate.clone() : n.defaultDate;
                if (!t) return n.defaultDate = !1, u;
                "string" == typeof t && ("now" === t || "moment" === t) && (t = x());
                var e = st(t);
                if (!e.isValid()) throw new TypeError("defaultDate() Could not parse date parameter: " + t);
                if (!Y(e)) throw new TypeError("defaultDate() date passed is invalid according to component setup validations");
                return n.defaultDate = e, (n.defaultDate && n.inline || "" === s.val().trim()) && J(n.defaultDate), u
            }, u.locale = function (t) {
                if (0 === arguments.length) return n.locale;
                if (!e.localeData(t)) throw new TypeError("locale() locale " + t + " is not loaded from moment locales!");
                return n.locale = t, r.locale(n.locale), a.locale(n.locale), l && ft(), f && (tt(), rt()), u
            }, u.stepping = function (t) {
                return 0 === arguments.length ? n.stepping : (t = parseInt(t, 10), (isNaN(t) || 1 > t) && (t = 1), n.stepping = t, u)
            }, u.useCurrent = function (t) {
                var e = ["year", "month", "day", "hour", "minute"];
                if (0 === arguments.length) return n.useCurrent;
                if ("boolean" != typeof t && "string" != typeof t) throw new TypeError("useCurrent() expects a boolean or string parameter");
                if ("string" == typeof t && -1 === e.indexOf(t.toLowerCase())) throw new TypeError("useCurrent() expects a string parameter of " + e.join(", "));
                return n.useCurrent = t, u
            }, u.collapse = function (t) {
                if (0 === arguments.length) return n.collapse;
                if ("boolean" != typeof t) throw new TypeError("collapse() expects a boolean parameter");
                return n.collapse === t ? u : (n.collapse = t, f && (tt(), rt()), u)
            }, u.icons = function (e) {
                if (0 === arguments.length) return t.extend({}, n.icons);
                if (!(e instanceof Object)) throw new TypeError("icons() expects parameter to be an Object");
                return t.extend(n.icons, e), f && (tt(), rt()), u
            }, u.tooltips = function (e) {
                if (0 === arguments.length) return t.extend({}, n.tooltips);
                if (!(e instanceof Object)) throw new TypeError("tooltips() expects parameter to be an Object");
                return t.extend(n.tooltips, e), f && (tt(), rt()), u
            }, u.useStrict = function (t) {
                if (0 === arguments.length) return n.useStrict;
                if ("boolean" != typeof t) throw new TypeError("useStrict() expects a boolean parameter");
                return n.useStrict = t, u
            }, u.sideBySide = function (t) {
                if (0 === arguments.length) return n.sideBySide;
                if ("boolean" != typeof t) throw new TypeError("sideBySide() expects a boolean parameter");
                return n.sideBySide = t, f && (tt(), rt()), u
            }, u.viewMode = function (t) {
                if (0 === arguments.length) return n.viewMode;
                if ("string" != typeof t) throw new TypeError("viewMode() expects a string parameter");
                if (-1 === v.indexOf(t)) throw new TypeError("viewMode() parameter must be one of (" + v.join(", ") + ") value");
                return n.viewMode = t, c = Math.max(v.indexOf(t), m), V(), u
            }, u.toolbarPlacement = function (t) {
                if (0 === arguments.length) return n.toolbarPlacement;
                if ("string" != typeof t) throw new TypeError("toolbarPlacement() expects a string parameter");
                if (-1 === w.indexOf(t)) throw new TypeError("toolbarPlacement() parameter must be one of (" + w.join(", ") + ") value");
                return n.toolbarPlacement = t, f && (tt(), rt()), u
            }, u.widgetPositioning = function (e) {
                if (0 === arguments.length) return t.extend({}, n.widgetPositioning);
                if ("[object Object]" !== {}.toString.call(e)) throw new TypeError("widgetPositioning() expects an object variable");
                if (e.horizontal) {
                    if ("string" != typeof e.horizontal) throw new TypeError("widgetPositioning() horizontal variable must be a string");
                    if (e.horizontal = e.horizontal.toLowerCase(), -1 === y.indexOf(e.horizontal)) throw new TypeError("widgetPositioning() expects horizontal parameter to be one of (" + y.join(", ") + ")");
                    n.widgetPositioning.horizontal = e.horizontal
                }
                if (e.vertical) {
                    if ("string" != typeof e.vertical) throw new TypeError("widgetPositioning() vertical variable must be a string");
                    if (e.vertical = e.vertical.toLowerCase(), -1 === b.indexOf(e.vertical)) throw new TypeError("widgetPositioning() expects vertical parameter to be one of (" + b.join(", ") + ")");
                    n.widgetPositioning.vertical = e.vertical
                }
                return Q(), u
            }, u.calendarWeeks = function (t) {
                if (0 === arguments.length) return n.calendarWeeks;
                if ("boolean" != typeof t) throw new TypeError("calendarWeeks() expects parameter to be a boolean value");
                return n.calendarWeeks = t, Q(), u
            }, u.showTodayButton = function (t) {
                if (0 === arguments.length) return n.showTodayButton;
                if ("boolean" != typeof t) throw new TypeError("showTodayButton() expects a boolean parameter");
                return n.showTodayButton = t, f && (tt(), rt()), u
            }, u.showClear = function (t) {
                if (0 === arguments.length) return n.showClear;
                if ("boolean" != typeof t) throw new TypeError("showClear() expects a boolean parameter");
                return n.showClear = t, f && (tt(), rt()), u
            }, u.widgetParent = function (e) {
                if (0 === arguments.length) return n.widgetParent;
                if ("string" == typeof e && (e = t(e)), null !== e && "string" != typeof e && !(e instanceof t)) throw new TypeError("widgetParent() expects a string or a jQuery object parameter");
                return n.widgetParent = e, f && (tt(), rt()), u
            }, u.keepOpen = function (t) {
                if (0 === arguments.length) return n.keepOpen;
                if ("boolean" != typeof t) throw new TypeError("keepOpen() expects a boolean parameter");
                return n.keepOpen = t, u
            }, u.focusOnShow = function (t) {
                if (0 === arguments.length) return n.focusOnShow;
                if ("boolean" != typeof t) throw new TypeError("focusOnShow() expects a boolean parameter");
                return n.focusOnShow = t, u
            }, u.inline = function (t) {
                if (0 === arguments.length) return n.inline;
                if ("boolean" != typeof t) throw new TypeError("inline() expects a boolean parameter");
                return n.inline = t, u
            }, u.clear = function () {
                return et(), u
            }, u.keyBinds = function (t) {
                return n.keyBinds = t, u
            }, u.getMoment = function (t) {
                return x(t)
            }, u.debug = function (t) {
                if ("boolean" != typeof t) throw new TypeError("debug() expects a boolean parameter");
                return n.debug = t, u
            }, u.allowInputToggle = function (t) {
                if (0 === arguments.length) return n.allowInputToggle;
                if ("boolean" != typeof t) throw new TypeError("allowInputToggle() expects a boolean parameter");
                return n.allowInputToggle = t, u
            }, u.showClose = function (t) {
                if (0 === arguments.length) return n.showClose;
                if ("boolean" != typeof t) throw new TypeError("showClose() expects a boolean parameter");
                return n.showClose = t, u
            }, u.keepInvalid = function (t) {
                if (0 === arguments.length) return n.keepInvalid;
                if ("boolean" != typeof t) throw new TypeError("keepInvalid() expects a boolean parameter");
                return n.keepInvalid = t, u
            }, u.datepickerInput = function (t) {
                if (0 === arguments.length) return n.datepickerInput;
                if ("string" != typeof t) throw new TypeError("datepickerInput() expects a string parameter");
                return n.datepickerInput = t, u
            }, u.parseInputDate = function (t) {
                if (0 === arguments.length) return n.parseInputDate;
                if ("function" != typeof t) throw new TypeError("parseInputDate() sholud be as function");
                return n.parseInputDate = t, u
            }, u.disabledTimeIntervals = function (e) {
                if (0 === arguments.length) return n.disabledTimeIntervals ? t.extend({}, n.disabledTimeIntervals) : n.disabledTimeIntervals;
                if (!e) return n.disabledTimeIntervals = !1, Q(), u;
                if (!(e instanceof Array)) throw new TypeError("disabledTimeIntervals() expects an array parameter");
                return n.disabledTimeIntervals = e, Q(), u
            }, u.disabledHours = function (e) {
                if (0 === arguments.length) return n.disabledHours ? t.extend({}, n.disabledHours) : n.disabledHours;
                if (!e) return n.disabledHours = !1, Q(), u;
                if (!(e instanceof Array)) throw new TypeError("disabledHours() expects an array parameter");
                if (n.disabledHours = pt(e), n.enabledHours = !1, n.useCurrent && !n.keepInvalid) {
                    for (var i = 0; !Y(r, "h");) {
                        if (r.add(1, "h"), 24 === i) throw"Tried 24 times to find a valid date";
                        i++
                    }
                    J(r)
                }
                return Q(), u
            }, u.enabledHours = function (e) {
                if (0 === arguments.length) return n.enabledHours ? t.extend({}, n.enabledHours) : n.enabledHours;
                if (!e) return n.enabledHours = !1, Q(), u;
                if (!(e instanceof Array)) throw new TypeError("enabledHours() expects an array parameter");
                if (n.enabledHours = pt(e), n.disabledHours = !1, n.useCurrent && !n.keepInvalid) {
                    for (var i = 0; !Y(r, "h");) {
                        if (r.add(1, "h"), 24 === i) throw"Tried 24 times to find a valid date";
                        i++
                    }
                    J(r)
                }
                return Q(), u
            }, u.viewDate = function (t) {
                if (0 === arguments.length) return a.clone();
                if (!t) return a = r.clone(), u;
                if (!("string" == typeof t || e.isMoment(t) || t instanceof Date)) throw new TypeError("viewDate() parameter must be one of [string, moment or Date]");
                return a = st(t), O(), u
            }, i.is("input")) s = i; else if (s = i.find(n.datepickerInput), 0 === s.size()) s = i.find("input"); else if (!s.is("input")) throw new Error('CSS class "' + n.datepickerInput + '" cannot be applied to non input element');
        if (i.hasClass("input-group") && (p = 0 === i.find(".datepickerbutton").size() ? i.find(".input-group-addon") : i.find(".datepickerbutton")), !n.inline && !s.is("input")) throw new Error("Could not initialize DateTimePicker without an input element");
        return r = x(), a = r.clone(), t.extend(!0, n, E()), u.options(n), ft(), ct(), s.prop("disabled") && u.disable(), s.is("input") && 0 !== s.val().trim().length ? J(st(s.val().trim())) : n.defaultDate && void 0 === s.attr("placeholder") && J(n.defaultDate), n.inline && rt(), u
    };
    t.fn.datetimepicker = function (e) {
        return this.each(function () {
            var n = t(this);
            n.data("DateTimePicker") || (e = t.extend(!0, {}, t.fn.datetimepicker.defaults, e), n.data("DateTimePicker", i(n, e)))
        })
    }, t.fn.datetimepicker.defaults = {
        timeZone: "Etc/UTC",
        format: !1,
        dayViewHeaderFormat: "MMMM YYYY",
        extraFormats: !1,
        stepping: 1,
        minDate: !1,
        maxDate: !1,
        useCurrent: !0,
        collapse: !0,
        locale: e.locale(),
        defaultDate: !1,
        disabledDates: !1,
        enabledDates: !1,
        icons: {
            time: "glyphicon glyphicon-time",
            date: "glyphicon glyphicon-calendar",
            up: "glyphicon glyphicon-chevron-up",
            down: "glyphicon glyphicon-chevron-down",
            previous: "glyphicon glyphicon-chevron-left",
            next: "glyphicon glyphicon-chevron-right",
            today: "glyphicon glyphicon-screenshot",
            clear: "glyphicon glyphicon-trash",
            close: "glyphicon glyphicon-remove"
        },
        tooltips: {
            today: "Go to today",
            clear: "Clear selection",
            close: "Close the picker",
            selectMonth: "Select Month",
            prevMonth: "Previous Month",
            nextMonth: "Next Month",
            selectYear: "Select Year",
            prevYear: "Previous Year",
            nextYear: "Next Year",
            selectDecade: "Select Decade",
            prevDecade: "Previous Decade",
            nextDecade: "Next Decade",
            prevCentury: "Previous Century",
            nextCentury: "Next Century",
            pickHour: "Pick Hour",
            incrementHour: "Increment Hour",
            decrementHour: "Decrement Hour",
            pickMinute: "Pick Minute",
            incrementMinute: "Increment Minute",
            decrementMinute: "Decrement Minute",
            pickSecond: "Pick Second",
            incrementSecond: "Increment Second",
            decrementSecond: "Decrement Second",
            togglePeriod: "Toggle Period",
            selectTime: "Select Time"
        },
        useStrict: !1,
        sideBySide: !1,
        daysOfWeekDisabled: !1,
        calendarWeeks: !1,
        viewMode: "days",
        toolbarPlacement: "default",
        showTodayButton: !1,
        showClear: !1,
        showClose: !1,
        widgetPositioning: {horizontal: "auto", vertical: "auto"},
        widgetParent: null,
        ignoreReadonly: !1,
        keepOpen: !1,
        focusOnShow: !0,
        inline: !1,
        keepInvalid: !1,
        datepickerInput: ".datepickerinput",
        keyBinds: {
            up: function (t) {
                if (t) {
                    var e = this.date() || this.getMoment();
                    t.find(".datepicker").is(":visible") ? this.date(e.clone().subtract(7, "d")) : this.date(e.clone().add(this.stepping(), "m"))
                }
            }, down: function (t) {
                if (!t) return void this.show();
                var e = this.date() || this.getMoment();
                t.find(".datepicker").is(":visible") ? this.date(e.clone().add(7, "d")) : this.date(e.clone().subtract(this.stepping(), "m"))
            }, "control up": function (t) {
                if (t) {
                    var e = this.date() || this.getMoment();
                    t.find(".datepicker").is(":visible") ? this.date(e.clone().subtract(1, "y")) : this.date(e.clone().add(1, "h"))
                }
            }, "control down": function (t) {
                if (t) {
                    var e = this.date() || this.getMoment();
                    t.find(".datepicker").is(":visible") ? this.date(e.clone().add(1, "y")) : this.date(e.clone().subtract(1, "h"))
                }
            }, left: function (t) {
                if (t) {
                    var e = this.date() || this.getMoment();
                    t.find(".datepicker").is(":visible") && this.date(e.clone().subtract(1, "d"))
                }
            }, right: function (t) {
                if (t) {
                    var e = this.date() || this.getMoment();
                    t.find(".datepicker").is(":visible") && this.date(e.clone().add(1, "d"))
                }
            }, pageUp: function (t) {
                if (t) {
                    var e = this.date() || this.getMoment();
                    t.find(".datepicker").is(":visible") && this.date(e.clone().subtract(1, "M"))
                }
            }, pageDown: function (t) {
                if (t) {
                    var e = this.date() || this.getMoment();
                    t.find(".datepicker").is(":visible") && this.date(e.clone().add(1, "M"))
                }
            }, enter: function () {
                this.hide()
            }, escape: function () {
                this.hide()
            }, "control space": function (t) {
                t.find(".timepicker").is(":visible") && t.find('.btn[data-action="togglePeriod"]').click()
            }, t: function () {
                this.date(this.getMoment())
            }, "delete": function () {
                this.clear()
            }
        },
        debug: !1,
        allowInputToggle: !1,
        disabledTimeIntervals: !1,
        disabledHours: !1,
        enabledHours: !1,
        viewDate: !1
    }
}), function (t, e, i) {
    !function (t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], t) : jQuery && !jQuery.fn.qtip && t(jQuery)
    }(function (n) {
        "use strict";

        function r(t, e, i, r) {
            this.id = i, this.target = t, this.tooltip = F, this.elements = {target: t}, this._id = W + "-" + i, this.timers = {img: {}}, this.options = e, this.plugins = {}, this.cache = {
                event: {},
                target: n(),
                disabled: M,
                attr: r,
                onTooltip: M,
                lastClass: ""
            }, this.rendered = this.destroyed = this.disabled = this.waiting = this.hiddenDuringWait = this.positioning = this.triggering = M
        }

        function a(t) {
            return t === F || "object" !== n.type(t)
        }

        function s(t) {
            return !(n.isFunction(t) || t && t.attr) || t.length || "object" === n.type(t) && (t.jquery || t.then)
        }

        function o(t) {
            var e, i, r, o;
            return a(t) ? M : (a(t.metadata) && (t.metadata = {type: t.metadata}), "content" in t && (e = t.content, a(e) || e.jquery || e.done ? (i = s(e) ? M : e, e = t.content = {text: i}) : i = e.text, "ajax" in e && (r = e.ajax, o = r && r.once !== M, delete e.ajax, e.text = function (t, e) {
                var a = i || n(this).attr(e.options.content.attr) || "Loading...",
                    s = n.ajax(n.extend({}, r, {context: e})).then(r.success, F, r.error).then(function (t) {
                        return t && o && e.set("content.text", t), t
                    }, function (t, i, n) {
                        e.destroyed || 0 === t.status || e.set("content.text", i + ": " + n)
                    });
                return o ? a : (e.set("content.text", a), s)
            }), "title" in e && (n.isPlainObject(e.title) && (e.button = e.title.button, e.title = e.title.text), s(e.title || M) && (e.title = M))), "position" in t && a(t.position) && (t.position = {
                my: t.position,
                at: t.position
            }), "show" in t && a(t.show) && (t.show = t.show.jquery ? {target: t.show} : t.show === I ? {ready: I} : {event: t.show}), "hide" in t && a(t.hide) && (t.hide = t.hide.jquery ? {target: t.hide} : {event: t.hide}), "style" in t && a(t.style) && (t.style = {classes: t.style}), n.each(j, function () {
                this.sanitize && this.sanitize(t)
            }), t)
        }

        function l(t, e) {
            for (var i, n = 0, r = t, a = e.split("."); r = r[a[n++]];) n < a.length && (i = r);
            return [i || t, a.pop()]
        }

        function d(t, e) {
            var i, n, r;
            for (i in this.checks) if (this.checks.hasOwnProperty(i)) for (n in this.checks[i]) this.checks[i].hasOwnProperty(n) && (r = new RegExp(n, "i").exec(t)) && (e.push(r), ("builtin" === i || this.plugins[i]) && this.checks[i][n].apply(this.plugins[i] || this, e))
        }

        function c(t) {
            return q.concat("").join(t ? "-" + t + " " : " ")
        }

        function u(t, e) {
            return e > 0 ? setTimeout(n.proxy(t, this), e) : void t.call(this)
        }

        function h(t) {
            this.tooltip.hasClass(tt) || (clearTimeout(this.timers.show), clearTimeout(this.timers.hide), this.timers.show = u.call(this, function () {
                this.toggle(I, t)
            }, this.options.show.delay))
        }

        function p(t) {
            if (!this.tooltip.hasClass(tt) && !this.destroyed) {
                var e = n(t.relatedTarget), i = e.closest(G)[0] === this.tooltip[0],
                    r = e[0] === this.options.show.target[0];
                if (clearTimeout(this.timers.show), clearTimeout(this.timers.hide), this !== e[0] && "mouse" === this.options.position.target && i || this.options.hide.fixed && /mouse(out|leave|move)/.test(t.type) && (i || r)) try {
                    t.preventDefault(), t.stopImmediatePropagation()
                } catch (a) {
                } else this.timers.hide = u.call(this, function () {
                    this.toggle(M, t)
                }, this.options.hide.delay, this)
            }
        }

        function f(t) {
            !this.tooltip.hasClass(tt) && this.options.hide.inactive && (clearTimeout(this.timers.inactive), this.timers.inactive = u.call(this, function () {
                this.hide(t)
            }, this.options.hide.inactive))
        }

        function m(t) {
            this.rendered && this.tooltip[0].offsetWidth > 0 && this.reposition(t)
        }

        function g(t, i, r) {
            n(e.body).delegate(t, (i.split ? i : i.join("." + W + " ")) + "." + W, function () {
                var t = D.api[n.attr(this, z)];
                t && !t.disabled && r.apply(t, arguments)
            })
        }

        function v(t, i, a) {
            var s, l, d, c, u, h = n(e.body), p = t[0] === e ? h : t, f = t.metadata ? t.metadata(a.metadata) : F,
                m = "html5" === a.metadata.type && f ? f[a.metadata.name] : F,
                g = t.data(a.metadata.name || "qtipopts");
            try {
                g = "string" == typeof g ? n.parseJSON(g) : g
            } catch (v) {
            }
            if (c = n.extend(I, {}, D.defaults, a, "object" == typeof g ? o(g) : F, o(m || f)), l = c.position, c.id = i, "boolean" == typeof c.content.text) {
                if (d = t.attr(c.content.attr), c.content.attr === M || !d) return M;
                c.content.text = d
            }
            if (l.container.length || (l.container = h), l.target === M && (l.target = p), c.show.target === M && (c.show.target = p), c.show.solo === I && (c.show.solo = l.container.closest("body")), c.hide.target === M && (c.hide.target = p), c.position.viewport === I && (c.position.viewport = l.container), l.container = l.container.eq(0), l.at = new C(l.at, I), l.my = new C(l.my), t.data(W)) if (c.overwrite) t.qtip("destroy", !0); else if (c.overwrite === M) return M;
            return t.attr(B, i), c.suppress && (u = t.attr("title")) && t.removeAttr("title").attr(it, u).attr("title", ""), s = new r(t, c, i, !!d), t.data(W, s), s
        }

        function b(t) {
            return t.charAt(0).toUpperCase() + t.slice(1)
        }

        function y(t, e) {
            var n, r, a = e.charAt(0).toUpperCase() + e.slice(1), s = (e + " " + St.join(a + " ") + a).split(" "),
                o = 0;
            if (wt[e]) return t.css(wt[e]);
            for (; n = s[o++];) if ((r = t.css(n)) !== i) return wt[e] = n, r
        }

        function w(t, e) {
            return Math.ceil(parseFloat(y(t, e)))
        }

        function S(t, e) {
            this._ns = "tip", this.options = e, this.offset = e.offset, this.size = [e.width, e.height], this.qtip = t, this.init(t)
        }

        function _(t, e) {
            this.options = e, this._ns = "-modal", this.qtip = t, this.init(t)
        }

        function x(t) {
            this._ns = "ie6", this.qtip = t, this.init(t)
        }

        var D, T, C, A, k, I = !0, M = !1, F = null, E = "x", $ = "y", L = "width", O = "height", V = "top", P = "left",
            H = "bottom", R = "right", N = "center", U = "flipinvert", Y = "shift", j = {}, W = "qtip",
            B = "data-hasqtip", z = "data-qtip-id", q = ["ui-widget", "ui-tooltip"], G = "." + W,
            Z = "click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "), X = W + "-fixed",
            K = W + "-default", Q = W + "-focus", J = W + "-hover", tt = W + "-disabled", et = "_replacedByqTip",
            it = "oldtitle", nt = {
                ie: function () {
                    var t, i;
                    for (t = 4, i = e.createElement("div"); (i.innerHTML = "<!--[if gt IE " + t + "]><i></i><![endif]-->") && i.getElementsByTagName("i")[0]; t += 1) ;
                    return t > 4 ? t : NaN
                }(),
                iOS: parseFloat(("" + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) || M
            };
        T = r.prototype, T._when = function (t) {
            return n.when.apply(n, t)
        }, T.render = function (t) {
            if (this.rendered || this.destroyed) return this;
            var e = this, i = this.options, r = this.cache, a = this.elements, s = i.content.text, o = i.content.title,
                l = i.content.button, d = i.position, c = [];
            return n.attr(this.target[0], "aria-describedby", this._id), r.posClass = this._createPosClass((this.position = {
                my: d.my,
                at: d.at
            }).my), this.tooltip = a.tooltip = n("<div/>", {
                id: this._id,
                "class": [W, K, i.style.classes, r.posClass].join(" "),
                width: i.style.width || "",
                height: i.style.height || "",
                tracking: "mouse" === d.target && d.adjust.mouse,
                role: "alert",
                "aria-live": "polite",
                "aria-atomic": M,
                "aria-describedby": this._id + "-content",
                "aria-hidden": I
            }).toggleClass(tt, this.disabled).attr(z, this.id).data(W, this).appendTo(d.container).append(a.content = n("<div />", {
                "class": W + "-content",
                id: this._id + "-content",
                "aria-atomic": I
            })), this.rendered = -1, this.positioning = I, o && (this._createTitle(), n.isFunction(o) || c.push(this._updateTitle(o, M))), l && this._createButton(), n.isFunction(s) || c.push(this._updateContent(s, M)), this.rendered = I, this._setWidget(), n.each(j, function (t) {
                var i;
                "render" === this.initialize && (i = this(e)) && (e.plugins[t] = i)
            }), this._unassignEvents(), this._assignEvents(), this._when(c).then(function () {
                e._trigger("render"), e.positioning = M, e.hiddenDuringWait || !i.show.ready && !t || e.toggle(I, r.event, M), e.hiddenDuringWait = M
            }), D.api[this.id] = this, this
        }, T.destroy = function (t) {
            function e() {
                if (!this.destroyed) {
                    this.destroyed = I;
                    var t, e = this.target, i = e.attr(it);
                    this.rendered && this.tooltip.stop(1, 0).find("*").remove().end().remove(), n.each(this.plugins, function () {
                        this.destroy && this.destroy()
                    });
                    for (t in this.timers) this.timers.hasOwnProperty(t) && clearTimeout(this.timers[t]);
                    e.removeData(W).removeAttr(z).removeAttr(B).removeAttr("aria-describedby"), this.options.suppress && i && e.attr("title", i).removeAttr(it), this._unassignEvents(), this.options = this.elements = this.cache = this.timers = this.plugins = this.mouse = F, delete D.api[this.id]
                }
            }

            return this.destroyed ? this.target : (t === I && "hide" !== this.triggering || !this.rendered ? e.call(this) : (this.tooltip.one("tooltiphidden", n.proxy(e, this)), !this.triggering && this.hide()), this.target)
        }, A = T.checks = {
            builtin: {
                "^id$": function (t, e, i, r) {
                    var a = i === I ? D.nextid : i, s = W + "-" + a;
                    a !== M && a.length > 0 && !n("#" + s).length ? (this._id = s, this.rendered && (this.tooltip[0].id = this._id, this.elements.content[0].id = this._id + "-content", this.elements.title[0].id = this._id + "-title")) : t[e] = r
                }, "^prerender": function (t, e, i) {
                    i && !this.rendered && this.render(this.options.show.ready)
                }, "^content.text$": function (t, e, i) {
                    this._updateContent(i)
                }, "^content.attr$": function (t, e, i, n) {
                    this.options.content.text === this.target.attr(n) && this._updateContent(this.target.attr(i))
                }, "^content.title$": function (t, e, i) {
                    return i ? (i && !this.elements.title && this._createTitle(), void this._updateTitle(i)) : this._removeTitle()
                }, "^content.button$": function (t, e, i) {
                    this._updateButton(i)
                }, "^content.title.(text|button)$": function (t, e, i) {
                    this.set("content." + e, i)
                }, "^position.(my|at)$": function (t, e, i) {
                    "string" == typeof i && (this.position[e] = t[e] = new C(i, "at" === e))
                }, "^position.container$": function (t, e, i) {
                    this.rendered && this.tooltip.appendTo(i)
                }, "^show.ready$": function (t, e, i) {
                    i && (!this.rendered && this.render(I) || this.toggle(I))
                }, "^style.classes$": function (t, e, i, n) {
                    this.rendered && this.tooltip.removeClass(n).addClass(i)
                }, "^style.(width|height)": function (t, e, i) {
                    this.rendered && this.tooltip.css(e, i)
                }, "^style.widget|content.title": function () {
                    this.rendered && this._setWidget()
                }, "^style.def": function (t, e, i) {
                    this.rendered && this.tooltip.toggleClass(K, !!i)
                }, "^events.(render|show|move|hide|focus|blur)$": function (t, e, i) {
                    this.rendered && this.tooltip[(n.isFunction(i) ? "" : "un") + "bind"]("tooltip" + e, i)
                }, "^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)": function () {
                    if (this.rendered) {
                        var t = this.options.position;
                        this.tooltip.attr("tracking", "mouse" === t.target && t.adjust.mouse), this._unassignEvents(), this._assignEvents()
                    }
                }
            }
        }, T.get = function (t) {
            if (this.destroyed) return this;
            var e = l(this.options, t.toLowerCase()), i = e[0][e[1]];
            return i.precedance ? i.string() : i
        };
        var rt = /^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,
            at = /^prerender|show\.ready/i;
        T.set = function (t, e) {
            if (this.destroyed) return this;
            var i, r = this.rendered, a = M, s = this.options;
            return "string" == typeof t ? (i = t,
                t = {}, t[i] = e) : t = n.extend({}, t), n.each(t, function (e, i) {
                if (r && at.test(e)) return void delete t[e];
                var o, d = l(s, e.toLowerCase());
                o = d[0][d[1]], d[0][d[1]] = i && i.nodeType ? n(i) : i, a = rt.test(e) || a, t[e] = [d[0], d[1], i, o]
            }), o(s), this.positioning = I, n.each(t, n.proxy(d, this)), this.positioning = M, this.rendered && this.tooltip[0].offsetWidth > 0 && a && this.reposition("mouse" === s.position.target ? F : this.cache.event), this
        }, T._update = function (t, e) {
            var i = this, r = this.cache;
            return this.rendered && t ? (n.isFunction(t) && (t = t.call(this.elements.target, r.event, this) || ""), n.isFunction(t.then) ? (r.waiting = I, t.then(function (t) {
                return r.waiting = M, i._update(t, e)
            }, F, function (t) {
                return i._update(t, e)
            })) : t === M || !t && "" !== t ? M : (t.jquery && t.length > 0 ? e.empty().append(t.css({
                display: "block",
                visibility: "visible"
            })) : e.html(t), this._waitForContent(e).then(function (t) {
                i.rendered && i.tooltip[0].offsetWidth > 0 && i.reposition(r.event, !t.length)
            }))) : M
        }, T._waitForContent = function (t) {
            var e = this.cache;
            return e.waiting = I, (n.fn.imagesLoaded ? t.imagesLoaded() : (new n.Deferred).resolve([])).done(function () {
                e.waiting = M
            }).promise()
        }, T._updateContent = function (t, e) {
            this._update(t, this.elements.content, e)
        }, T._updateTitle = function (t, e) {
            this._update(t, this.elements.title, e) === M && this._removeTitle(M)
        }, T._createTitle = function () {
            var t = this.elements, e = this._id + "-title";
            t.titlebar && this._removeTitle(), t.titlebar = n("<div />", {"class": W + "-titlebar " + (this.options.style.widget ? c("header") : "")}).append(t.title = n("<div />", {
                id: e,
                "class": W + "-title",
                "aria-atomic": I
            })).insertBefore(t.content).delegate(".qtip-close", "mousedown keydown mouseup keyup mouseout", function (t) {
                n(this).toggleClass("ui-state-active ui-state-focus", "down" === t.type.substr(-4))
            }).delegate(".qtip-close", "mouseover mouseout", function (t) {
                n(this).toggleClass("ui-state-hover", "mouseover" === t.type)
            }), this.options.content.button && this._createButton()
        }, T._removeTitle = function (t) {
            var e = this.elements;
            e.title && (e.titlebar.remove(), e.titlebar = e.title = e.button = F, t !== M && this.reposition())
        }, T._createPosClass = function (t) {
            return W + "-pos-" + (t || this.options.position.my).abbrev()
        }, T.reposition = function (i, r) {
            if (!this.rendered || this.positioning || this.destroyed) return this;
            this.positioning = I;
            var a, s, o, l, d = this.cache, c = this.tooltip, u = this.options.position, h = u.target, p = u.my,
                f = u.at, m = u.viewport, g = u.container, v = u.adjust, b = v.method.split(" "), y = c.outerWidth(M),
                w = c.outerHeight(M), S = 0, _ = 0, x = c.css("position"), D = {left: 0, top: 0},
                T = c[0].offsetWidth > 0, C = i && "scroll" === i.type, A = n(t), k = g[0].ownerDocument,
                F = this.mouse;
            if (n.isArray(h) && 2 === h.length) f = {x: P, y: V}, D = {
                left: h[0],
                top: h[1]
            }; else if ("mouse" === h) f = {
                x: P,
                y: V
            }, (!v.mouse || this.options.hide.distance) && d.origin && d.origin.pageX ? i = d.origin : !i || i && ("resize" === i.type || "scroll" === i.type) ? i = d.event : F && F.pageX && (i = F), "static" !== x && (D = g.offset()), k.body.offsetWidth !== (t.innerWidth || k.documentElement.clientWidth) && (s = n(e.body).offset()), D = {
                left: i.pageX - D.left + (s && s.left || 0),
                top: i.pageY - D.top + (s && s.top || 0)
            }, v.mouse && C && F && (D.left -= (F.scrollX || 0) - A.scrollLeft(), D.top -= (F.scrollY || 0) - A.scrollTop()); else {
                if ("event" === h ? i && i.target && "scroll" !== i.type && "resize" !== i.type ? d.target = n(i.target) : i.target || (d.target = this.elements.target) : "event" !== h && (d.target = n(h.jquery ? h : this.elements.target)), h = d.target, h = n(h).eq(0), 0 === h.length) return this;
                h[0] === e || h[0] === t ? (S = nt.iOS ? t.innerWidth : h.width(), _ = nt.iOS ? t.innerHeight : h.height(), h[0] === t && (D = {
                    top: (m || h).scrollTop(),
                    left: (m || h).scrollLeft()
                })) : j.imagemap && h.is("area") ? a = j.imagemap(this, h, f, j.viewport ? b : M) : j.svg && h && h[0].ownerSVGElement ? a = j.svg(this, h, f, j.viewport ? b : M) : (S = h.outerWidth(M), _ = h.outerHeight(M), D = h.offset()), a && (S = a.width, _ = a.height, s = a.offset, D = a.position), D = this.reposition.offset(h, D, g), (nt.iOS > 3.1 && nt.iOS < 4.1 || nt.iOS >= 4.3 && nt.iOS < 4.33 || !nt.iOS && "fixed" === x) && (D.left -= A.scrollLeft(), D.top -= A.scrollTop()), (!a || a && a.adjustable !== M) && (D.left += f.x === R ? S : f.x === N ? S / 2 : 0, D.top += f.y === H ? _ : f.y === N ? _ / 2 : 0)
            }
            return D.left += v.x + (p.x === R ? -y : p.x === N ? -y / 2 : 0), D.top += v.y + (p.y === H ? -w : p.y === N ? -w / 2 : 0), j.viewport ? (o = D.adjusted = j.viewport(this, D, u, S, _, y, w), s && o.left && (D.left += s.left), s && o.top && (D.top += s.top), o.my && (this.position.my = o.my)) : D.adjusted = {
                left: 0,
                top: 0
            }, d.posClass !== (l = this._createPosClass(this.position.my)) && (d.posClass = l, c.removeClass(d.posClass).addClass(l)), this._trigger("move", [D, m.elem || m], i) ? (delete D.adjusted, r === M || !T || isNaN(D.left) || isNaN(D.top) || "mouse" === h || !n.isFunction(u.effect) ? c.css(D) : n.isFunction(u.effect) && (u.effect.call(c, this, n.extend({}, D)), c.queue(function (t) {
                n(this).css({opacity: "", height: ""}), nt.ie && this.style.removeAttribute("filter"), t()
            })), this.positioning = M, this) : this
        }, T.reposition.offset = function (t, i, r) {
            function a(t, e) {
                i.left += e * t.scrollLeft(), i.top += e * t.scrollTop()
            }

            if (!r[0]) return i;
            var s, o, l, d, c = n(t[0].ownerDocument), u = !!nt.ie && "CSS1Compat" !== e.compatMode, h = r[0];
            do "static" !== (o = n.css(h, "position")) && ("fixed" === o ? (l = h.getBoundingClientRect(), a(c, -1)) : (l = n(h).position(), l.left += parseFloat(n.css(h, "borderLeftWidth")) || 0, l.top += parseFloat(n.css(h, "borderTopWidth")) || 0), i.left -= l.left + (parseFloat(n.css(h, "marginLeft")) || 0), i.top -= l.top + (parseFloat(n.css(h, "marginTop")) || 0), s || "hidden" === (d = n.css(h, "overflow")) || "visible" === d || (s = n(h))); while (h = h.offsetParent);
            return s && (s[0] !== c[0] || u) && a(s, 1), i
        };
        var st = (C = T.reposition.Corner = function (t, e) {
            t = ("" + t).replace(/([A-Z])/, " $1").replace(/middle/gi, N).toLowerCase(), this.x = (t.match(/left|right/i) || t.match(/center/) || ["inherit"])[0].toLowerCase(), this.y = (t.match(/top|bottom|center/i) || ["inherit"])[0].toLowerCase(), this.forceY = !!e;
            var i = t.charAt(0);
            this.precedance = "t" === i || "b" === i ? $ : E
        }).prototype;
        st.invert = function (t, e) {
            this[t] = this[t] === P ? R : this[t] === R ? P : e || this[t]
        }, st.string = function (t) {
            var e = this.x, i = this.y,
                n = e !== i ? "center" === e || "center" !== i && (this.precedance === $ || this.forceY) ? [i, e] : [e, i] : [e];
            return t !== !1 ? n.join(" ") : n
        }, st.abbrev = function () {
            var t = this.string(!1);
            return t[0].charAt(0) + (t[1] && t[1].charAt(0) || "")
        }, st.clone = function () {
            return new C(this.string(), this.forceY)
        }, T.toggle = function (t, i) {
            var r = this.cache, a = this.options, s = this.tooltip;
            if (i) {
                if (/over|enter/.test(i.type) && r.event && /out|leave/.test(r.event.type) && a.show.target.add(i.target).length === a.show.target.length && s.has(i.relatedTarget).length) return this;
                r.event = n.event.fix(i)
            }
            if (this.waiting && !t && (this.hiddenDuringWait = I), !this.rendered) return t ? this.render(1) : this;
            if (this.destroyed || this.disabled) return this;
            var o, l, d, c = t ? "show" : "hide", u = this.options[c], h = this.options.position,
                p = this.options.content, f = this.tooltip.css("width"), m = this.tooltip.is(":visible"),
                g = t || 1 === u.target.length, v = !i || u.target.length < 2 || r.target[0] === i.target;
            return (typeof t).search("boolean|number") && (t = !m), o = !s.is(":animated") && m === t && v, l = o ? F : !!this._trigger(c, [90]), this.destroyed ? this : (l !== M && t && this.focus(i), !l || o ? this : (n.attr(s[0], "aria-hidden", !t), t ? (this.mouse && (r.origin = n.event.fix(this.mouse)), n.isFunction(p.text) && this._updateContent(p.text, M), n.isFunction(p.title) && this._updateTitle(p.title, M), !k && "mouse" === h.target && h.adjust.mouse && (n(e).bind("mousemove." + W, this._storeMouse), k = I), f || s.css("width", s.outerWidth(M)), this.reposition(i, arguments[2]), f || s.css("width", ""), u.solo && ("string" == typeof u.solo ? n(u.solo) : n(G, u.solo)).not(s).not(u.target).qtip("hide", new n.Event("tooltipsolo"))) : (clearTimeout(this.timers.show), delete r.origin, k && !n(G + '[tracking="true"]:visible', u.solo).not(s).length && (n(e).unbind("mousemove." + W), k = M), this.blur(i)), d = n.proxy(function () {
                t ? (nt.ie && s[0].style.removeAttribute("filter"), s.css("overflow", ""), "string" == typeof u.autofocus && n(this.options.show.autofocus, s).focus(), this.options.show.target.trigger("qtip-" + this.id + "-inactive")) : s.css({
                    display: "",
                    visibility: "",
                    opacity: "",
                    left: "",
                    top: ""
                }), this._trigger(t ? "visible" : "hidden")
            }, this), u.effect === M || g === M ? (s[c](), d()) : n.isFunction(u.effect) ? (s.stop(1, 1), u.effect.call(s, this), s.queue("fx", function (t) {
                d(), t()
            })) : s.fadeTo(90, t ? 1 : 0, d), t && u.target.trigger("qtip-" + this.id + "-inactive"), this))
        }, T.show = function (t) {
            return this.toggle(I, t)
        }, T.hide = function (t) {
            return this.toggle(M, t)
        }, T.focus = function (t) {
            if (!this.rendered || this.destroyed) return this;
            var e = n(G), i = this.tooltip, r = parseInt(i[0].style.zIndex, 10), a = D.zindex + e.length;
            return i.hasClass(Q) || this._trigger("focus", [a], t) && (r !== a && (e.each(function () {
                this.style.zIndex > r && (this.style.zIndex = this.style.zIndex - 1)
            }), e.filter("." + Q).qtip("blur", t)), i.addClass(Q)[0].style.zIndex = a), this
        }, T.blur = function (t) {
            return !this.rendered || this.destroyed ? this : (this.tooltip.removeClass(Q), this._trigger("blur", [this.tooltip.css("zIndex")], t), this)
        }, T.disable = function (t) {
            return this.destroyed ? this : ("toggle" === t ? t = !(this.rendered ? this.tooltip.hasClass(tt) : this.disabled) : "boolean" != typeof t && (t = I), this.rendered && this.tooltip.toggleClass(tt, t).attr("aria-disabled", t), this.disabled = !!t, this)
        }, T.enable = function () {
            return this.disable(M)
        }, T._createButton = function () {
            var t = this, e = this.elements, i = e.tooltip, r = this.options.content.button, a = "string" == typeof r,
                s = a ? r : "Close tooltip";
            e.button && e.button.remove(), r.jquery ? e.button = r : e.button = n("<a />", {
                "class": "qtip-close " + (this.options.style.widget ? "" : W + "-icon"),
                title: s,
                "aria-label": s
            }).prepend(n("<span />", {
                "class": "ui-icon ui-icon-close",
                html: "&times;"
            })), e.button.appendTo(e.titlebar || i).attr("role", "button").click(function (e) {
                return i.hasClass(tt) || t.hide(e), M
            })
        }, T._updateButton = function (t) {
            if (!this.rendered) return M;
            var e = this.elements.button;
            t ? this._createButton() : e.remove()
        }, T._setWidget = function () {
            var t = this.options.style.widget, e = this.elements, i = e.tooltip, n = i.hasClass(tt);
            i.removeClass(tt), tt = t ? "ui-state-disabled" : "qtip-disabled", i.toggleClass(tt, n), i.toggleClass("ui-helper-reset " + c(), t).toggleClass(K, this.options.style.def && !t), e.content && e.content.toggleClass(c("content"), t), e.titlebar && e.titlebar.toggleClass(c("header"), t), e.button && e.button.toggleClass(W + "-icon", !t)
        }, T._storeMouse = function (t) {
            return (this.mouse = n.event.fix(t)).type = "mousemove", this
        }, T._bind = function (t, e, i, r, a) {
            if (t && i && e.length) {
                var s = "." + this._id + (r ? "-" + r : "");
                return n(t).bind((e.split ? e : e.join(s + " ")) + s, n.proxy(i, a || this)), this
            }
        }, T._unbind = function (t, e) {
            return t && n(t).unbind("." + this._id + (e ? "-" + e : "")), this
        }, T._trigger = function (t, e, i) {
            var r = new n.Event("tooltip" + t);
            return r.originalEvent = i && n.extend({}, i) || this.cache.event || F, this.triggering = t, this.tooltip.trigger(r, [this].concat(e || [])), this.triggering = M, !r.isDefaultPrevented()
        }, T._bindEvents = function (t, e, i, r, a, s) {
            var o = i.filter(r).add(r.filter(i)), l = [];
            o.length && (n.each(e, function (e, i) {
                var r = n.inArray(i, t);
                r > -1 && l.push(t.splice(r, 1)[0])
            }), l.length && (this._bind(o, l, function (t) {
                var e = this.rendered ? this.tooltip[0].offsetWidth > 0 : !1;
                (e ? s : a).call(this, t)
            }), i = i.not(o), r = r.not(o))), this._bind(i, t, a), this._bind(r, e, s)
        }, T._assignInitialEvents = function (t) {
            function e(t) {
                return this.disabled || this.destroyed ? M : (this.cache.event = t && n.event.fix(t), this.cache.target = t && n(t.target), clearTimeout(this.timers.show), void(this.timers.show = u.call(this, function () {
                    this.render("object" == typeof t || i.show.ready)
                }, i.prerender ? 0 : i.show.delay)))
            }

            var i = this.options, r = i.show.target, a = i.hide.target,
                s = i.show.event ? n.trim("" + i.show.event).split(" ") : [],
                o = i.hide.event ? n.trim("" + i.hide.event).split(" ") : [];
            this._bind(this.elements.target, ["remove", "removeqtip"], function () {
                this.destroy(!0)
            }, "destroy"), /mouse(over|enter)/i.test(i.show.event) && !/mouse(out|leave)/i.test(i.hide.event) && o.push("mouseleave"), this._bind(r, "mousemove", function (t) {
                this._storeMouse(t), this.cache.onTarget = I
            }), this._bindEvents(s, o, r, a, e, function () {
                return this.timers ? void clearTimeout(this.timers.show) : M
            }), (i.show.ready || i.prerender) && e.call(this, t)
        }, T._assignEvents = function () {
            var i = this, r = this.options, a = r.position, s = this.tooltip, o = r.show.target, l = r.hide.target,
                d = a.container, c = a.viewport, u = n(e), g = n(t),
                v = r.show.event ? n.trim("" + r.show.event).split(" ") : [],
                b = r.hide.event ? n.trim("" + r.hide.event).split(" ") : [];
            n.each(r.events, function (t, e) {
                i._bind(s, "toggle" === t ? ["tooltipshow", "tooltiphide"] : ["tooltip" + t], e, null, s)
            }), /mouse(out|leave)/i.test(r.hide.event) && "window" === r.hide.leave && this._bind(u, ["mouseout", "blur"], function (t) {
                /select|option/.test(t.target.nodeName) || t.relatedTarget || this.hide(t)
            }), r.hide.fixed ? l = l.add(s.addClass(X)) : /mouse(over|enter)/i.test(r.show.event) && this._bind(l, "mouseleave", function () {
                clearTimeout(this.timers.show)
            }), ("" + r.hide.event).indexOf("unfocus") > -1 && this._bind(d.closest("html"), ["mousedown", "touchstart"], function (t) {
                var e = n(t.target), i = this.rendered && !this.tooltip.hasClass(tt) && this.tooltip[0].offsetWidth > 0,
                    r = e.parents(G).filter(this.tooltip[0]).length > 0;
                e[0] === this.target[0] || e[0] === this.tooltip[0] || r || this.target.has(e[0]).length || !i || this.hide(t)
            }), "number" == typeof r.hide.inactive && (this._bind(o, "qtip-" + this.id + "-inactive", f, "inactive"), this._bind(l.add(s), D.inactiveEvents, f)), this._bindEvents(v, b, o, l, h, p), this._bind(o.add(s), "mousemove", function (t) {
                if ("number" == typeof r.hide.distance) {
                    var e = this.cache.origin || {}, i = this.options.hide.distance, n = Math.abs;
                    (n(t.pageX - e.pageX) >= i || n(t.pageY - e.pageY) >= i) && this.hide(t)
                }
                this._storeMouse(t)
            }), "mouse" === a.target && a.adjust.mouse && (r.hide.event && this._bind(o, ["mouseenter", "mouseleave"], function (t) {
                return this.cache ? void(this.cache.onTarget = "mouseenter" === t.type) : M
            }), this._bind(u, "mousemove", function (t) {
                this.rendered && this.cache.onTarget && !this.tooltip.hasClass(tt) && this.tooltip[0].offsetWidth > 0 && this.reposition(t)
            })), (a.adjust.resize || c.length) && this._bind(n.event.special.resize ? c : g, "resize", m), a.adjust.scroll && this._bind(g.add(a.container), "scroll", m)
        }, T._unassignEvents = function () {
            var i = this.options, r = i.show.target, a = i.hide.target,
                s = n.grep([this.elements.target[0], this.rendered && this.tooltip[0], i.position.container[0], i.position.viewport[0], i.position.container.closest("html")[0], t, e], function (t) {
                    return "object" == typeof t
                });
            r && r.toArray && (s = s.concat(r.toArray())), a && a.toArray && (s = s.concat(a.toArray())), this._unbind(s)._unbind(s, "destroy")._unbind(s, "inactive")
        }, n(function () {
            g(G, ["mouseenter", "mouseleave"], function (t) {
                var e = "mouseenter" === t.type, i = n(t.currentTarget), r = n(t.relatedTarget || t.target),
                    a = this.options;
                e ? (this.focus(t), i.hasClass(X) && !i.hasClass(tt) && clearTimeout(this.timers.hide)) : "mouse" === a.position.target && a.position.adjust.mouse && a.hide.event && a.show.target && !r.closest(a.show.target[0]).length && this.hide(t), i.toggleClass(J, e)
            }), g("[" + z + "]", Z, f)
        }), D = n.fn.qtip = function (t, e, r) {
            var a = ("" + t).toLowerCase(), s = F, l = n.makeArray(arguments).slice(1), d = l[l.length - 1],
                c = this[0] ? n.data(this[0], W) : F;
            return !arguments.length && c || "api" === a ? c : "string" == typeof t ? (this.each(function () {
                var t = n.data(this, W);
                if (!t) return I;
                if (d && d.timeStamp && (t.cache.event = d), !e || "option" !== a && "options" !== a) t[a] && t[a].apply(t, l); else {
                    if (r === i && !n.isPlainObject(e)) return s = t.get(e), M;
                    t.set(e, r)
                }
            }), s !== F ? s : this) : "object" != typeof t && arguments.length ? void 0 : (c = o(n.extend(I, {}, t)), this.each(function (t) {
                var e, i;
                return i = n.isArray(c.id) ? c.id[t] : c.id, i = !i || i === M || i.length < 1 || D.api[i] ? D.nextid++ : i, e = v(n(this), i, c), e === M ? I : (D.api[i] = e, n.each(j, function () {
                    "initialize" === this.initialize && this(e)
                }), void e._assignInitialEvents(d))
            }))
        }, n.qtip = r, D.api = {}, n.each({
            attr: function (t, e) {
                if (this.length) {
                    var i = this[0], r = "title", a = n.data(i, "qtip");
                    if (t === r && a && a.options && "object" == typeof a && "object" == typeof a.options && a.options.suppress) return arguments.length < 2 ? n.attr(i, it) : (a && a.options.content.attr === r && a.cache.attr && a.set("content.text", e), this.attr(it, e))
                }
                return n.fn["attr" + et].apply(this, arguments)
            }, clone: function (t) {
                var e = n.fn["clone" + et].apply(this, arguments);
                return t || e.filter("[" + it + "]").attr("title", function () {
                    return n.attr(this, it)
                }).removeAttr(it), e
            }
        }, function (t, e) {
            if (!e || n.fn[t + et]) return I;
            var i = n.fn[t + et] = n.fn[t];
            n.fn[t] = function () {
                return e.apply(this, arguments) || i.apply(this, arguments)
            }
        }), n.ui || (n["cleanData" + et] = n.cleanData, n.cleanData = function (t) {
            for (var e, i = 0; (e = n(t[i])).length; i++) if (e.attr(B)) try {
                e.triggerHandler("removeqtip")
            } catch (r) {
            }
            n["cleanData" + et].apply(this, arguments)
        }), D.version = "3.0.2", D.nextid = 0, D.inactiveEvents = Z, D.zindex = 15e3, D.defaults = {
            prerender: M,
            id: M,
            overwrite: I,
            suppress: I,
            content: {text: I, attr: "title", title: M, button: M},
            position: {
                my: "top left",
                at: "bottom right",
                target: M,
                container: M,
                viewport: M,
                adjust: {x: 0, y: 0, mouse: I, scroll: I, resize: I, method: "flipinvert flipinvert"},
                effect: function (t, e) {
                    n(this).animate(e, {duration: 200, queue: M})
                }
            },
            show: {target: M, event: "mouseenter", effect: I, delay: 90, solo: M, ready: M, autofocus: M},
            hide: {
                target: M,
                event: "mouseleave",
                effect: I,
                delay: 0,
                fixed: M,
                inactive: M,
                leave: "window",
                distance: M
            },
            style: {classes: "", widget: M, width: M, height: M, def: I},
            events: {render: F, move: F, show: F, hide: F, toggle: F, visible: F, hidden: F, focus: F, blur: F}
        };
        var ot, lt, dt, ct, ut, ht = "margin", pt = "border", ft = "color", mt = "background-color", gt = "transparent",
            vt = " !important", bt = !!e.createElement("canvas").getContext,
            yt = /rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i, wt = {}, St = ["Webkit", "O", "Moz", "ms"];
        bt ? (ct = t.devicePixelRatio || 1, ut = function () {
            var t = e.createElement("canvas").getContext("2d");
            return t.backingStorePixelRatio || t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || 1
        }(), dt = ct / ut) : lt = function (t, e, i) {
            return "<qtipvml:" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" ' + (e || "") + ' style="behavior: url(#default#VML); ' + (i || "") + '" />'
        }, n.extend(S.prototype, {
            init: function (t) {
                var e, i;
                i = this.element = t.elements.tip = n("<div />", {"class": W + "-tip"}).prependTo(t.tooltip), bt ? (e = n("<canvas />").appendTo(this.element)[0].getContext("2d"), e.lineJoin = "miter", e.miterLimit = 1e5, e.save()) : (e = lt("shape", 'coordorigin="0,0"', "position:absolute;"), this.element.html(e + e), t._bind(n("*", i).add(i), ["click", "mousedown"], function (t) {
                    t.stopPropagation()
                }, this._ns)), t._bind(t.tooltip, "tooltipmove", this.reposition, this._ns, this), this.create()
            }, _swapDimensions: function () {
                this.size[0] = this.options.height, this.size[1] = this.options.width
            }, _resetDimensions: function () {
                this.size[0] = this.options.width, this.size[1] = this.options.height
            }, _useTitle: function (t) {
                var e = this.qtip.elements.titlebar;
                return e && (t.y === V || t.y === N && this.element.position().top + this.size[1] / 2 + this.options.offset < e.outerHeight(I))
            }, _parseCorner: function (t) {
                var e = this.qtip.options.position.my;
                return t === M || e === M ? t = M : t === I ? t = new C(e.string()) : t.string || (t = new C(t), t.fixed = I), t
            }, _parseWidth: function (t, e, i) {
                var n = this.qtip.elements, r = pt + b(e) + "Width";
                return (i ? w(i, r) : w(n.content, r) || w(this._useTitle(t) && n.titlebar || n.content, r) || w(n.tooltip, r)) || 0
            }, _parseRadius: function (t) {
                var e = this.qtip.elements, i = pt + b(t.y) + b(t.x) + "Radius";
                return nt.ie < 9 ? 0 : w(this._useTitle(t) && e.titlebar || e.content, i) || w(e.tooltip, i) || 0
            }, _invalidColour: function (t, e, i) {
                var n = t.css(e);
                return !n || i && n === t.css(i) || yt.test(n) ? M : n
            }, _parseColours: function (t) {
                var e = this.qtip.elements, i = this.element.css("cssText", ""), r = pt + b(t[t.precedance]) + b(ft),
                    a = this._useTitle(t) && e.titlebar || e.content, s = this._invalidColour, o = [];
                return o[0] = s(i, mt) || s(a, mt) || s(e.content, mt) || s(e.tooltip, mt) || i.css(mt), o[1] = s(i, r, ft) || s(a, r, ft) || s(e.content, r, ft) || s(e.tooltip, r, ft) || e.tooltip.css(r), n("*", i).add(i).css("cssText", mt + ":" + gt + vt + ";" + pt + ":0" + vt + ";"), o
            }, _calculateSize: function (t) {
                var e, i, n, r = t.precedance === $, a = this.options.width, s = this.options.height,
                    o = "c" === t.abbrev(), l = (r ? a : s) * (o ? .5 : 1), d = Math.pow, c = Math.round,
                    u = Math.sqrt(d(l, 2) + d(s, 2)), h = [this.border / l * u, this.border / s * u];
                return h[2] = Math.sqrt(d(h[0], 2) - d(this.border, 2)), h[3] = Math.sqrt(d(h[1], 2) - d(this.border, 2)), e = u + h[2] + h[3] + (o ? 0 : h[0]), i = e / u, n = [c(i * a), c(i * s)], r ? n : n.reverse()
            }, _calculateTip: function (t, e, i) {
                i = i || 1, e = e || this.size;
                var n = e[0] * i, r = e[1] * i, a = Math.ceil(n / 2), s = Math.ceil(r / 2), o = {
                    br: [0, 0, n, r, n, 0],
                    bl: [0, 0, n, 0, 0, r],
                    tr: [0, r, n, 0, n, r],
                    tl: [0, 0, 0, r, n, r],
                    tc: [0, r, a, 0, n, r],
                    bc: [0, 0, n, 0, a, r],
                    rc: [0, 0, n, s, 0, r],
                    lc: [n, 0, n, r, 0, s]
                };
                return o.lt = o.br, o.rt = o.bl, o.lb = o.tr, o.rb = o.tl, o[t.abbrev()]
            }, _drawCoords: function (t, e) {
                t.beginPath(), t.moveTo(e[0], e[1]), t.lineTo(e[2], e[3]), t.lineTo(e[4], e[5]), t.closePath()
            }, create: function () {
                var t = this.corner = (bt || nt.ie) && this._parseCorner(this.options.corner);
                return this.enabled = !!this.corner && "c" !== this.corner.abbrev(), this.enabled && (this.qtip.cache.corner = t.clone(), this.update()), this.element.toggle(this.enabled), this.corner
            }, update: function (e, i) {
                if (!this.enabled) return this;
                var r, a, s, o, l, d, c, u, h = this.qtip.elements, p = this.element, f = p.children(),
                    m = this.options, g = this.size, v = m.mimic, b = Math.round;
                e || (e = this.qtip.cache.corner || this.corner), v === M ? v = e : (v = new C(v), v.precedance = e.precedance, "inherit" === v.x ? v.x = e.x : "inherit" === v.y ? v.y = e.y : v.x === v.y && (v[e.precedance] = e[e.precedance])), a = v.precedance, e.precedance === E ? this._swapDimensions() : this._resetDimensions(), r = this.color = this._parseColours(e), r[1] !== gt ? (u = this.border = this._parseWidth(e, e[e.precedance]), m.border && 1 > u && !yt.test(r[1]) && (r[0] = r[1]), this.border = u = m.border !== I ? m.border : u) : this.border = u = 0, c = this.size = this._calculateSize(e), p.css({
                    width: c[0],
                    height: c[1],
                    lineHeight: c[1] + "px"
                }), d = e.precedance === $ ? [b(v.x === P ? u : v.x === R ? c[0] - g[0] - u : (c[0] - g[0]) / 2), b(v.y === V ? c[1] - g[1] : 0)] : [b(v.x === P ? c[0] - g[0] : 0), b(v.y === V ? u : v.y === H ? c[1] - g[1] - u : (c[1] - g[1]) / 2)], bt ? (s = f[0].getContext("2d"), s.restore(), s.save(), s.clearRect(0, 0, 6e3, 6e3), o = this._calculateTip(v, g, dt), l = this._calculateTip(v, this.size, dt), f.attr(L, c[0] * dt).attr(O, c[1] * dt), f.css(L, c[0]).css(O, c[1]), this._drawCoords(s, l), s.fillStyle = r[1], s.fill(), s.translate(d[0] * dt, d[1] * dt), this._drawCoords(s, o), s.fillStyle = r[0], s.fill()) : (o = this._calculateTip(v), o = "m" + o[0] + "," + o[1] + " l" + o[2] + "," + o[3] + " " + o[4] + "," + o[5] + " xe", d[2] = u && /^(r|b)/i.test(e.string()) ? 8 === nt.ie ? 2 : 1 : 0, f.css({
                    coordsize: c[0] + u + " " + c[1] + u,
                    antialias: "" + (v.string().indexOf(N) > -1),
                    left: d[0] - d[2] * Number(a === E),
                    top: d[1] - d[2] * Number(a === $),
                    width: c[0] + u,
                    height: c[1] + u
                }).each(function (t) {
                    var e = n(this);
                    e[e.prop ? "prop" : "attr"]({
                        coordsize: c[0] + u + " " + c[1] + u,
                        path: o,
                        fillcolor: r[0],
                        filled: !!t,
                        stroked: !t
                    }).toggle(!(!u && !t)), !t && e.html(lt("stroke", 'weight="' + 2 * u + 'px" color="' + r[1] + '" miterlimit="1000" joinstyle="miter"'))
                })), t.opera && setTimeout(function () {
                    h.tip.css({display: "inline-block", visibility: "visible"})
                }, 1), i !== M && this.calculate(e, c)
            }, calculate: function (t, e) {
                if (!this.enabled) return M;
                var i, r, a = this, s = this.qtip.elements, o = this.element, l = this.options.offset, d = {};
                return t = t || this.corner, i = t.precedance, e = e || this._calculateSize(t), r = [t.x, t.y], i === E && r.reverse(), n.each(r, function (n, r) {
                    var o, c, u;
                    r === N ? (o = i === $ ? P : V, d[o] = "50%", d[ht + "-" + o] = -Math.round(e[i === $ ? 0 : 1] / 2) + l) : (o = a._parseWidth(t, r, s.tooltip), c = a._parseWidth(t, r, s.content), u = a._parseRadius(t), d[r] = Math.max(-a.border, n ? c : l + (u > o ? u : -o)))
                }), d[t[i]] -= e[i === E ? 0 : 1], o.css({
                    margin: "",
                    top: "",
                    bottom: "",
                    left: "",
                    right: ""
                }).css(d), d
            }, reposition: function (t, e, n) {
                function r(t, e, i, n, r) {
                    t === Y && d.precedance === e && c[n] && d[i] !== N ? d.precedance = d.precedance === E ? $ : E : t !== Y && c[n] && (d[e] = d[e] === N ? c[n] > 0 ? n : r : d[e] === n ? r : n)
                }

                function a(t, e, r) {
                    d[t] === N ? m[ht + "-" + e] = f[t] = s[ht + "-" + e] - c[e] : (o = s[r] !== i ? [c[e], -s[e]] : [-c[e], s[e]], (f[t] = Math.max(o[0], o[1])) > o[0] && (n[e] -= c[e], f[e] = M), m[s[r] !== i ? r : e] = f[t])
                }

                if (this.enabled) {
                    var s, o, l = e.cache, d = this.corner.clone(), c = n.adjusted,
                        u = e.options.position.adjust.method.split(" "), h = u[0], p = u[1] || u[0],
                        f = {left: M, top: M, x: 0, y: 0}, m = {};
                    this.corner.fixed !== I && (r(h, E, $, P, R), r(p, $, E, V, H), d.string() === l.corner.string() && l.cornerTop === c.top && l.cornerLeft === c.left || this.update(d, M)), s = this.calculate(d), s.right !== i && (s.left = -s.right), s.bottom !== i && (s.top = -s.bottom), s.user = this.offset, f.left = h === Y && !!c.left, f.left && a(E, P, R), f.top = p === Y && !!c.top, f.top && a($, V, H), this.element.css(m).toggle(!(f.x && f.y || d.x === N && f.y || d.y === N && f.x)), n.left -= s.left.charAt ? s.user : h !== Y || f.top || !f.left && !f.top ? s.left + this.border : 0, n.top -= s.top.charAt ? s.user : p !== Y || f.left || !f.left && !f.top ? s.top + this.border : 0, l.cornerLeft = c.left, l.cornerTop = c.top, l.corner = d.clone()
                }
            }, destroy: function () {
                this.qtip._unbind(this.qtip.tooltip, this._ns), this.qtip.elements.tip && this.qtip.elements.tip.find("*").remove().end().remove()
            }
        }), ot = j.tip = function (t) {
            return new S(t, t.options.style.tip)
        }, ot.initialize = "render", ot.sanitize = function (t) {
            if (t.style && "tip" in t.style) {
                var e = t.style.tip;
                "object" != typeof e && (e = t.style.tip = {corner: e}), /string|boolean/i.test(typeof e.corner) || (e.corner = I)
            }
        }, A.tip = {
            "^position.my|style.tip.(corner|mimic|border)$": function () {
                this.create(), this.qtip.reposition()
            }, "^style.tip.(height|width)$": function (t) {
                this.size = [t.width, t.height], this.update(), this.qtip.reposition()
            }, "^content.title|style.(classes|widget)$": function () {
                this.update()
            }
        }, n.extend(I, D.defaults, {style: {tip: {corner: I, mimic: M, width: 6, height: 6, border: I, offset: 0}}});
        var _t, xt, Dt = "qtip-modal", Tt = "." + Dt;
        xt = function () {
            function t(t) {
                if (n.expr[":"].focusable) return n.expr[":"].focusable;
                var e, i, r, a = !isNaN(n.attr(t, "tabindex")), s = t.nodeName && t.nodeName.toLowerCase();
                return "area" === s ? (e = t.parentNode, i = e.name, t.href && i && "map" === e.nodeName.toLowerCase() ? (r = n("img[usemap=#" + i + "]")[0], !!r && r.is(":visible")) : !1) : /input|select|textarea|button|object/.test(s) ? !t.disabled : "a" === s ? t.href || a : a
            }

            function i(t) {
                d.length < 1 && t.length ? t.not("body").blur() : d.first().focus()
            }

            function r(t) {
                if (o.is(":visible")) {
                    var e, r = n(t.target), s = a.tooltip, l = r.closest(G);
                    e = l.length < 1 ? M : parseInt(l[0].style.zIndex, 10) > parseInt(s[0].style.zIndex, 10), e || r.closest(G)[0] === s[0] || i(r)
                }
            }

            var a, s, o, l = this, d = {};
            n.extend(l, {
                init: function () {
                    return o = l.elem = n("<div />", {
                        id: "qtip-overlay", html: "<div></div>", mousedown: function () {
                            return M
                        }
                    }).hide(), n(e.body).bind("focusin" + Tt, r), n(e).bind("keydown" + Tt, function (t) {
                        a && a.options.show.modal.escape && 27 === t.keyCode && a.hide(t)
                    }), o.bind("click" + Tt, function (t) {
                        a && a.options.show.modal.blur && a.hide(t)
                    }), l
                }, update: function (e) {
                    a = e, d = e.options.show.modal.stealfocus !== M ? e.tooltip.find("*").filter(function () {
                        return t(this)
                    }) : []
                }, toggle: function (t, r, d) {
                    var c = t.tooltip, u = t.options.show.modal, h = u.effect, p = r ? "show" : "hide",
                        f = o.is(":visible"), m = n(Tt).filter(":visible:not(:animated)").not(c);
                    return l.update(t), r && u.stealfocus !== M && i(n(":focus")), o.toggleClass("blurs", u.blur), r && o.appendTo(e.body), o.is(":animated") && f === r && s !== M || !r && m.length ? l : (o.stop(I, M), n.isFunction(h) ? h.call(o, r) : h === M ? o[p]() : o.fadeTo(parseInt(d, 10) || 90, r ? 1 : 0, function () {
                        r || o.hide()
                    }), r || o.queue(function (t) {
                        o.css({left: "", top: ""}), n(Tt).length || o.detach(), t()
                    }), s = r, a.destroyed && (a = F), l)
                }
            }), l.init()
        }, xt = new xt, n.extend(_.prototype, {
            init: function (t) {
                var e = t.tooltip;
                return this.options.on ? (t.elements.overlay = xt.elem, e.addClass(Dt).css("z-index", D.modal_zindex + n(Tt).length), t._bind(e, ["tooltipshow", "tooltiphide"], function (t, i, r) {
                    var a = t.originalEvent;
                    if (t.target === e[0]) if (a && "tooltiphide" === t.type && /mouse(leave|enter)/.test(a.type) && n(a.relatedTarget).closest(xt.elem[0]).length) try {
                        t.preventDefault()
                    } catch (s) {
                    } else (!a || a && "tooltipsolo" !== a.type) && this.toggle(t, "tooltipshow" === t.type, r)
                }, this._ns, this), t._bind(e, "tooltipfocus", function (t, i) {
                    if (!t.isDefaultPrevented() && t.target === e[0]) {
                        var r = n(Tt), a = D.modal_zindex + r.length, s = parseInt(e[0].style.zIndex, 10);
                        xt.elem[0].style.zIndex = a - 1, r.each(function () {
                            this.style.zIndex > s && (this.style.zIndex -= 1)
                        }), r.filter("." + Q).qtip("blur", t.originalEvent), e.addClass(Q)[0].style.zIndex = a, xt.update(i);
                        try {
                            t.preventDefault()
                        } catch (o) {
                        }
                    }
                }, this._ns, this), void t._bind(e, "tooltiphide", function (t) {
                    t.target === e[0] && n(Tt).filter(":visible").not(e).last().qtip("focus", t)
                }, this._ns, this)) : this
            }, toggle: function (t, e, i) {
                return t && t.isDefaultPrevented() ? this : void xt.toggle(this.qtip, !!e, i)
            }, destroy: function () {
                this.qtip.tooltip.removeClass(Dt), this.qtip._unbind(this.qtip.tooltip, this._ns), xt.toggle(this.qtip, M), delete this.qtip.elements.overlay
            }
        }), _t = j.modal = function (t) {
            return new _(t, t.options.show.modal)
        }, _t.sanitize = function (t) {
            t.show && ("object" != typeof t.show.modal ? t.show.modal = {on: !!t.show.modal} : "undefined" == typeof t.show.modal.on && (t.show.modal.on = I))
        }, D.modal_zindex = D.zindex - 200, _t.initialize = "render", A.modal = {
            "^show.modal.(on|blur)$": function () {
                this.destroy(), this.init(), this.qtip.elems.overlay.toggle(this.qtip.tooltip[0].offsetWidth > 0)
            }
        }, n.extend(I, D.defaults, {
            show: {
                modal: {
                    on: M,
                    effect: I,
                    blur: I,
                    stealfocus: I,
                    escape: I
                }
            }
        }), j.viewport = function (i, n, r, a, s, o, l) {
            function d(t, e, i, r, a, s, o, l, d) {
                var c = n[a], b = w[t], y = S[t], _ = i === Y, x = b === a ? d : b === s ? -d : -d / 2,
                    D = y === a ? l : y === s ? -l : -l / 2, T = g[a] + v[a] - (p ? 0 : h[a]), C = T - c,
                    A = c + d - (o === L ? f : m) - T,
                    k = x - (w.precedance === t || b === w[e] ? D : 0) - (y === N ? l / 2 : 0);
                return _ ? (k = (b === a ? 1 : -1) * x, n[a] += C > 0 ? C : A > 0 ? -A : 0, n[a] = Math.max(-h[a] + v[a], c - k, Math.min(Math.max(-h[a] + v[a] + (o === L ? f : m), c + k), n[a], "center" === b ? c - x : 1e9))) : (r *= i === U ? 2 : 0, C > 0 && (b !== a || A > 0) ? (n[a] -= k + r, u.invert(t, a)) : A > 0 && (b !== s || C > 0) && (n[a] -= (b === N ? -k : k) + r, u.invert(t, s)), n[a] < g[a] && -n[a] > A && (n[a] = c, u = w.clone())), n[a] - c
            }

            var c, u, h, p, f, m, g, v, b = r.target, y = i.elements.tooltip, w = r.my, S = r.at, _ = r.adjust,
                x = _.method.split(" "), D = x[0], T = x[1] || x[0], C = r.viewport, A = r.container,
                k = {left: 0, top: 0};
            return C.jquery && b[0] !== t && b[0] !== e.body && "none" !== _.method ? (h = A.offset() || k, p = "static" === A.css("position"), c = "fixed" === y.css("position"), f = C[0] === t ? C.width() : C.outerWidth(M), m = C[0] === t ? C.height() : C.outerHeight(M), g = {
                left: c ? 0 : C.scrollLeft(),
                top: c ? 0 : C.scrollTop()
            }, v = C.offset() || k, "shift" === D && "shift" === T || (u = w.clone()), k = {
                left: "none" !== D ? d(E, $, D, _.x, P, R, L, a, o) : 0,
                top: "none" !== T ? d($, E, T, _.y, V, H, O, s, l) : 0,
                my: u
            }) : k
        }, j.polys = {
            polygon: function (t, e) {
                var i, n, r,
                    a = {width: 0, height: 0, position: {top: 1e10, right: 0, bottom: 0, left: 1e10}, adjustable: M},
                    s = 0, o = [], l = 1, d = 1, c = 0, u = 0;
                for (s = t.length; s--;) i = [parseInt(t[--s], 10), parseInt(t[s + 1], 10)], i[0] > a.position.right && (a.position.right = i[0]), i[0] < a.position.left && (a.position.left = i[0]), i[1] > a.position.bottom && (a.position.bottom = i[1]), i[1] < a.position.top && (a.position.top = i[1]), o.push(i);
                if (n = a.width = Math.abs(a.position.right - a.position.left), r = a.height = Math.abs(a.position.bottom - a.position.top), "c" === e.abbrev()) a.position = {
                    left: a.position.left + a.width / 2,
                    top: a.position.top + a.height / 2
                }; else {
                    for (; n > 0 && r > 0 && l > 0 && d > 0;) for (n = Math.floor(n / 2), r = Math.floor(r / 2), e.x === P ? l = n : e.x === R ? l = a.width - n : l += Math.floor(n / 2), e.y === V ? d = r : e.y === H ? d = a.height - r : d += Math.floor(r / 2), s = o.length; s-- && !(o.length < 2);) c = o[s][0] - a.position.left, u = o[s][1] - a.position.top, (e.x === P && c >= l || e.x === R && l >= c || e.x === N && (l > c || c > a.width - l) || e.y === V && u >= d || e.y === H && d >= u || e.y === N && (d > u || u > a.height - d)) && o.splice(s, 1);
                    a.position = {left: o[0][0], top: o[0][1]}
                }
                return a
            },
            rect: function (t, e, i, n) {
                return {
                    width: Math.abs(i - t),
                    height: Math.abs(n - e),
                    position: {left: Math.min(t, i), top: Math.min(e, n)}
                }
            },
            _angles: {tc: 1.5, tr: 7 / 4, tl: 5 / 4, bc: .5, br: .25, bl: .75, rc: 2, lc: 1, c: 0},
            ellipse: function (t, e, i, n, r) {
                var a = j.polys._angles[r.abbrev()], s = 0 === a ? 0 : i * Math.cos(a * Math.PI),
                    o = n * Math.sin(a * Math.PI);
                return {
                    width: 2 * i - Math.abs(s),
                    height: 2 * n - Math.abs(o),
                    position: {left: t + s, top: e + o},
                    adjustable: M
                }
            },
            circle: function (t, e, i, n) {
                return j.polys.ellipse(t, e, i, i, n)
            }
        }, j.svg = function (t, i, r) {
            for (var a, s, o, l, d, c, u, h, p, f = i[0], m = n(f.ownerSVGElement), g = f.ownerDocument, v = (parseInt(i.css("stroke-width"), 10) || 0) / 2; !f.getBBox;) f = f.parentNode;
            if (!f.getBBox || !f.parentNode) return M;
            switch (f.nodeName) {
                case"ellipse":
                case"circle":
                    h = j.polys.ellipse(f.cx.baseVal.value, f.cy.baseVal.value, (f.rx || f.r).baseVal.value + v, (f.ry || f.r).baseVal.value + v, r);
                    break;
                case"line":
                case"polygon":
                case"polyline":
                    for (u = f.points || [{x: f.x1.baseVal.value, y: f.y1.baseVal.value}, {
                        x: f.x2.baseVal.value,
                        y: f.y2.baseVal.value
                    }], h = [], c = -1, l = u.numberOfItems || u.length; ++c < l;) d = u.getItem ? u.getItem(c) : u[c], h.push.apply(h, [d.x, d.y]);
                    h = j.polys.polygon(h, r);
                    break;
                default:
                    h = f.getBBox(), h = {width: h.width, height: h.height, position: {left: h.x, top: h.y}}
            }
            return p = h.position, m = m[0], m.createSVGPoint && (s = f.getScreenCTM(), u = m.createSVGPoint(), u.x = p.left, u.y = p.top, o = u.matrixTransform(s), p.left = o.x, p.top = o.y), g !== e && "mouse" !== t.position.target && (a = n((g.defaultView || g.parentWindow).frameElement).offset(), a && (p.left += a.left, p.top += a.top)), g = n(g), p.left += g.scrollLeft(), p.top += g.scrollTop(), h
        }, j.imagemap = function (t, e, i) {
            e.jquery || (e = n(e));
            var r, a, s, o, l, d = (e.attr("shape") || "rect").toLowerCase().replace("poly", "polygon"),
                c = n('img[usemap="#' + e.parent("map").attr("name") + '"]'), u = n.trim(e.attr("coords")),
                h = u.replace(/,$/, "").split(",");
            if (!c.length) return M;
            if ("polygon" === d) o = j.polys.polygon(h, i); else {
                if (!j.polys[d]) return M;
                for (s = -1,
                         l = h.length, a = []; ++s < l;) a.push(parseInt(h[s], 10));
                o = j.polys[d].apply(this, a.concat(i))
            }
            return r = c.offset(), r.left += Math.ceil((c.outerWidth(M) - c.width()) / 2), r.top += Math.ceil((c.outerHeight(M) - c.height()) / 2), o.position.left += r.left, o.position.top += r.top, o
        };
        var Ct,
            At = '<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>';
        n.extend(x.prototype, {
            _scroll: function () {
                var e = this.qtip.elements.overlay;
                e && (e[0].style.top = n(t).scrollTop() + "px")
            }, init: function (i) {
                var r = i.tooltip;
                n("select, object").length < 1 && (this.bgiframe = i.elements.bgiframe = n(At).appendTo(r), i._bind(r, "tooltipmove", this.adjustBGIFrame, this._ns, this)), this.redrawContainer = n("<div/>", {id: W + "-rcontainer"}).appendTo(e.body), i.elements.overlay && i.elements.overlay.addClass("qtipmodal-ie6fix") && (i._bind(t, ["scroll", "resize"], this._scroll, this._ns, this), i._bind(r, ["tooltipshow"], this._scroll, this._ns, this)), this.redraw()
            }, adjustBGIFrame: function () {
                var t, e, i = this.qtip.tooltip, n = {height: i.outerHeight(M), width: i.outerWidth(M)},
                    r = this.qtip.plugins.tip, a = this.qtip.elements.tip;
                e = parseInt(i.css("borderLeftWidth"), 10) || 0, e = {
                    left: -e,
                    top: -e
                }, r && a && (t = "x" === r.corner.precedance ? [L, P] : [O, V], e[t[1]] -= a[t[0]]()), this.bgiframe.css(e).css(n)
            }, redraw: function () {
                if (this.qtip.rendered < 1 || this.drawing) return this;
                var t, e, i, n, r = this.qtip.tooltip, a = this.qtip.options.style,
                    s = this.qtip.options.position.container;
                return this.qtip.drawing = 1, a.height && r.css(O, a.height), a.width ? r.css(L, a.width) : (r.css(L, "").appendTo(this.redrawContainer), e = r.width(), 1 > e % 2 && (e += 1), i = r.css("maxWidth") || "", n = r.css("minWidth") || "", t = (i + n).indexOf("%") > -1 ? s.width() / 100 : 0, i = (i.indexOf("%") > -1 ? t : 1 * parseInt(i, 10)) || e, n = (n.indexOf("%") > -1 ? t : 1 * parseInt(n, 10)) || 0, e = i + n ? Math.min(Math.max(e, n), i) : e, r.css(L, Math.round(e)).appendTo(s)), this.drawing = 0, this
            }, destroy: function () {
                this.bgiframe && this.bgiframe.remove(), this.qtip._unbind([t, this.qtip.tooltip], this._ns)
            }
        }), Ct = j.ie6 = function (t) {
            return 6 === nt.ie ? new x(t) : M
        }, Ct.initialize = "render", A.ie6 = {
            "^content|style$": function () {
                this.redraw()
            }
        }
    })
}(window, document), function (t, e) {
    var i, n;
    return n = e.document, i = function () {
        function i(i) {
            var n;
            try {
                n = e.localStorage
            } catch (r) {
                n = !1
            }
            this._options = t.extend({
                name: "tour",
                steps: [],
                container: "body",
                autoscroll: !0,
                keyboard: !0,
                storage: n,
                debug: !1,
                backdrop: !1,
                backdropPadding: 0,
                redirect: !0,
                orphan: !1,
                duration: !1,
                delay: !1,
                basePath: "",
                template: '<div class="popover" role="tooltip"> <div class="arrow"></div> <h3 class="popover-title"></h3> <div class="popover-content"></div> <div class="popover-navigation"> <div class="btn-group"> <button class="btn btn-sm btn-default" data-role="prev">&laquo; Prev</button> <button class="btn btn-sm btn-default" data-role="next">Next &raquo;</button> <button class="btn btn-sm btn-default" data-role="pause-resume" data-pause-text="Pause" data-resume-text="Resume">Pause</button> </div> <button class="btn btn-sm btn-default" data-role="end">End tour</button> </div> </div>',
                afterSetState: function (t, e) {
                },
                afterGetState: function (t, e) {
                },
                afterRemoveState: function (t) {
                },
                onStart: function (t) {
                },
                onEnd: function (t) {
                },
                onShow: function (t) {
                },
                onShown: function (t) {
                },
                onHide: function (t) {
                },
                onHidden: function (t) {
                },
                onNext: function (t) {
                },
                onPrev: function (t) {
                },
                onPause: function (t, e) {
                },
                onResume: function (t, e) {
                }
            }, i), this._force = !1, this._inited = !1, this.backdrop = {
                overlay: null,
                $element: null,
                $background: null,
                backgroundShown: !1,
                overlayElementShown: !1
            }
        }

        return i.prototype.addSteps = function (t) {
            var e, i, n;
            for (i = 0, n = t.length; n > i; i++) e = t[i], this.addStep(e);
            return this
        }, i.prototype.addStep = function (t) {
            return this._options.steps.push(t), this
        }, i.prototype.getStep = function (e) {
            return null != this._options.steps[e] ? t.extend({
                id: "step-" + e,
                path: "",
                placement: "right",
                title: "",
                content: "<p></p>",
                next: e === this._options.steps.length - 1 ? -1 : e + 1,
                prev: e - 1,
                animation: !0,
                container: this._options.container,
                autoscroll: this._options.autoscroll,
                backdrop: this._options.backdrop,
                backdropPadding: this._options.backdropPadding,
                redirect: this._options.redirect,
                orphan: this._options.orphan,
                duration: this._options.duration,
                delay: this._options.delay,
                template: this._options.template,
                onShow: this._options.onShow,
                onShown: this._options.onShown,
                onHide: this._options.onHide,
                onHidden: this._options.onHidden,
                onNext: this._options.onNext,
                onPrev: this._options.onPrev,
                onPause: this._options.onPause,
                onResume: this._options.onResume
            }, this._options.steps[e]) : void 0
        }, i.prototype.init = function (t) {
            return this._force = t, this.ended() ? (this._debug("Tour ended, init prevented."), this) : (this.setCurrentStep(), this._initMouseNavigation(), this._initKeyboardNavigation(), this._onResize(function (t) {
                return function () {
                    return t.showStep(t._current)
                }
            }(this)), null !== this._current && this.showStep(this._current), this._inited = !0, this)
        }, i.prototype.start = function (t) {
            var e;
            return null == t && (t = !1), this._inited || this.init(t), null === this._current && (e = this._makePromise(null != this._options.onStart ? this._options.onStart(this) : void 0), this._callOnPromiseDone(e, this.showStep, 0)), this
        }, i.prototype.next = function () {
            var t;
            return t = this.hideStep(this._current), this._callOnPromiseDone(t, this._showNextStep)
        }, i.prototype.prev = function () {
            var t;
            return t = this.hideStep(this._current), this._callOnPromiseDone(t, this._showPrevStep)
        }, i.prototype.goTo = function (t) {
            var e;
            return e = this.hideStep(this._current), this._callOnPromiseDone(e, this.showStep, t)
        }, i.prototype.end = function () {
            var i, r;
            return i = function (i) {
                return function (r) {
                    return t(n).off("click.tour-" + i._options.name), t(n).off("keyup.tour-" + i._options.name), t(e).off("resize.tour-" + i._options.name), i._setState("end", "yes"), i._inited = !1, i._force = !1, i._clearTimer(), null != i._options.onEnd ? i._options.onEnd(i) : void 0
                }
            }(this), r = this.hideStep(this._current), this._callOnPromiseDone(r, i)
        }, i.prototype.ended = function () {
            return !this._force && !!this._getState("end")
        }, i.prototype.restart = function () {
            return this._removeState("current_step"), this._removeState("end"), this.start()
        }, i.prototype.pause = function () {
            var t;
            return t = this.getStep(this._current), t && t.duration ? (this._paused = !0, this._duration -= (new Date).getTime() - this._start, e.clearTimeout(this._timer), this._debug("Paused/Stopped step " + (this._current + 1) + " timer (" + this._duration + " remaining)."), null != t.onPause ? t.onPause(this, this._duration) : void 0) : this
        }, i.prototype.resume = function () {
            var t;
            return t = this.getStep(this._current), t && t.duration ? (this._paused = !1, this._start = (new Date).getTime(), this._duration = this._duration || t.duration, this._timer = e.setTimeout(function (t) {
                return function () {
                    return t._isLast() ? t.next() : t.end()
                }
            }(this), this._duration), this._debug("Started step " + (this._current + 1) + " timer with duration " + this._duration), null != t.onResume && this._duration !== t.duration ? t.onResume(this, this._duration) : void 0) : this
        }, i.prototype.hideStep = function (e) {
            var i, n, r;
            return (r = this.getStep(e)) ? (this._clearTimer(), n = this._makePromise(null != r.onHide ? r.onHide(this, e) : void 0), i = function (i) {
                return function (n) {
                    var a;
                    return a = t(r.element), a.data("bs.popover") || a.data("popover") || (a = t("body")), a.popover("destroy").removeClass("tour-" + i._options.name + "-element tour-" + i._options.name + "-" + e + "-element"), r.reflex && a.removeClass("tour-step-element-reflex").off("" + i._reflexEvent(r.reflex) + ".tour-" + i._options.name), r.backdrop && i._hideBackdrop(), null != r.onHidden ? r.onHidden(i) : void 0
                }
            }(this), this._callOnPromiseDone(n, i), n) : void 0
        }, i.prototype.showStep = function (t) {
            var i, r, a, s;
            return this.ended() ? (this._debug("Tour ended, showStep prevented."), this) : (s = this.getStep(t)) ? (a = t < this._current, i = this._makePromise(null != s.onShow ? s.onShow(this, t) : void 0), r = function (e) {
                return function (i) {
                    var r, o, l;
                    if (e.setCurrentStep(t), o = function () {
                            switch ({}.toString.call(s.path)) {
                                case"[object Function]":
                                    return s.path();
                                case"[object String]":
                                    return this._options.basePath + s.path;
                                default:
                                    return s.path
                            }
                        }.call(e), r = [n.location.pathname, n.location.hash].join(""), e._isRedirect(o, r)) return void e._redirect(s, o);
                    if (e._isOrphan(s)) {
                        if (!s.orphan) return e._debug("Skip the orphan step " + (e._current + 1) + ".\nOrphan option is false and the element does not exist or is hidden."), void(a ? e._showPrevStep() : e._showNextStep());
                        e._debug("Show the orphan step " + (e._current + 1) + ". Orphans option is true.")
                    }
                    return s.backdrop && e._showBackdrop(e._isOrphan(s) ? void 0 : s.element), l = function () {
                        return e.getCurrentStep() === t ? (null != s.element && s.backdrop && e._showOverlayElement(s), e._showPopover(s, t), null != s.onShown && s.onShown(e), e._debug("Step " + (e._current + 1) + " of " + e._options.steps.length)) : void 0
                    }, s.autoscroll ? e._scrollIntoView(s.element, l) : l(), s.duration ? e.resume() : void 0
                }
            }(this), s.delay ? (this._debug("Wait " + s.delay + " milliseconds to show the step " + (this._current + 1)), e.setTimeout(function (t) {
                return function () {
                    return t._callOnPromiseDone(i, r)
                }
            }(this), s.delay)) : this._callOnPromiseDone(i, r), i) : void 0
        }, i.prototype.getCurrentStep = function () {
            return this._current
        }, i.prototype.setCurrentStep = function (t) {
            return null != t ? (this._current = t, this._setState("current_step", t)) : (this._current = this._getState("current_step"), this._current = null === this._current ? null : parseInt(this._current, 10)), this
        }, i.prototype._setState = function (t, e) {
            var i, n;
            if (this._options.storage) {
                n = "" + this._options.name + "_" + t;
                try {
                    this._options.storage.setItem(n, e)
                } catch (r) {
                    i = r, i.code === DOMException.QUOTA_EXCEEDED_ERR && this._debug("LocalStorage quota exceeded. State storage failed.")
                }
                return this._options.afterSetState(n, e)
            }
            return null == this._state && (this._state = {}), this._state[t] = e
        }, i.prototype._removeState = function (t) {
            var e;
            return this._options.storage ? (e = "" + this._options.name + "_" + t, this._options.storage.removeItem(e), this._options.afterRemoveState(e)) : null != this._state ? delete this._state[t] : void 0
        }, i.prototype._getState = function (t) {
            var e, i;
            return this._options.storage ? (e = "" + this._options.name + "_" + t, i = this._options.storage.getItem(e)) : null != this._state && (i = this._state[t]), void 0 !== i && "null" !== i || (i = null), this._options.afterGetState(t, i), i
        }, i.prototype._showNextStep = function () {
            var t, e, i;
            return i = this.getStep(this._current), e = function (t) {
                return function (e) {
                    return t.showStep(i.next)
                }
            }(this), t = this._makePromise(null != i.onNext ? i.onNext(this) : void 0), this._callOnPromiseDone(t, e)
        }, i.prototype._showPrevStep = function () {
            var t, e, i;
            return i = this.getStep(this._current), e = function (t) {
                return function (e) {
                    return t.showStep(i.prev)
                }
            }(this), t = this._makePromise(null != i.onPrev ? i.onPrev(this) : void 0), this._callOnPromiseDone(t, e)
        }, i.prototype._debug = function (t) {
            return this._options.debug ? e.console.log("Bootstrap Tour '" + this._options.name + "' | " + t) : void 0
        }, i.prototype._isRedirect = function (t, e) {
            return null != t && "" !== t && ("[object RegExp]" === {}.toString.call(t) && !t.test(e) || "[object String]" === {}.toString.call(t) && t.replace(/\?.*$/, "").replace(/\/?$/, "") !== e.replace(/\/?$/, ""))
        }, i.prototype._redirect = function (e, i) {
            return t.isFunction(e.redirect) ? e.redirect.call(this, i) : e.redirect === !0 ? (this._debug("Redirect to " + i), n.location.href = i) : void 0
        }, i.prototype._isOrphan = function (e) {
            return null == e.element || !t(e.element).length || t(e.element).is(":hidden") && "http://www.w3.org/2000/svg" !== t(e.element)[0].namespaceURI
        }, i.prototype._isLast = function () {
            return this._current < this._options.steps.length - 1
        }, i.prototype._showPopover = function (e, i) {
            var n, r, a, s;
            return t(".tour-" + this._options.name).remove(), s = t.extend({}, this._options), a = this._isOrphan(e), e.template = this._template(e, i), a && (e.element = "body", e.placement = "top"), n = t(e.element), n.addClass("tour-" + this._options.name + "-element tour-" + this._options.name + "-" + i + "-element"), e.options && t.extend(s, e.options), e.reflex && !a && (n.addClass("tour-step-element-reflex"), n.off("" + this._reflexEvent(e.reflex) + ".tour-" + this._options.name), n.on("" + this._reflexEvent(e.reflex) + ".tour-" + this._options.name, function (t) {
                return function () {
                    return t._isLast() ? t.next() : t.end()
                }
            }(this))), n.popover({
                placement: e.placement,
                trigger: "manual",
                title: e.title,
                content: e.content,
                html: !0,
                animation: e.animation,
                container: e.container,
                template: e.template,
                selector: e.element
            }).popover("show"), r = n.data("bs.popover") ? n.data("bs.popover").tip() : n.data("popover").tip(), r.attr("id", e.id), this._reposition(r, e), a ? this._center(r) : void 0
        }, i.prototype._template = function (e, i) {
            var n, r, a, s, o;
            return o = t(t.isFunction(e.template) ? e.template(i, e) : e.template), n = o.find(".popover-navigation"), a = n.find('[data-role="prev"]'), r = n.find('[data-role="next"]'), s = n.find('[data-role="pause-resume"]'), this._isOrphan(e) && o.addClass("orphan"), o.addClass("tour-" + this._options.name + " tour-" + this._options.name + "-" + i), e.prev < 0 && a.addClass("disabled"), e.next < 0 && r.addClass("disabled"), e.duration || s.remove(), o.clone().wrap("<div>").parent().html()
        }, i.prototype._reflexEvent = function (t) {
            return "[object Boolean]" === {}.toString.call(t) ? "click" : t
        }, i.prototype._reposition = function (e, i) {
            var r, a, s, o, l, d, c;
            if (o = e[0].offsetWidth, a = e[0].offsetHeight, c = e.offset(), l = c.left, d = c.top, r = t(n).outerHeight() - c.top - e.outerHeight(), 0 > r && (c.top = c.top + r), s = t("html").outerWidth() - c.left - e.outerWidth(), 0 > s && (c.left = c.left + s), c.top < 0 && (c.top = 0), c.left < 0 && (c.left = 0), e.offset(c), "bottom" === i.placement || "top" === i.placement) {
                if (l !== c.left) return this._replaceArrow(e, 2 * (c.left - l), o, "left")
            } else if (d !== c.top) return this._replaceArrow(e, 2 * (c.top - d), a, "top")
        }, i.prototype._center = function (i) {
            return i.css("top", t(e).outerHeight() / 2 - i.outerHeight() / 2)
        }, i.prototype._replaceArrow = function (t, e, i, n) {
            return t.find(".arrow").css(n, e ? 50 * (1 - e / i) + "%" : "")
        }, i.prototype._scrollIntoView = function (i, n) {
            var r, a, s, o, l, d;
            return r = t(i), r.length ? (a = t(e), o = r.offset().top, d = a.height(), l = Math.max(0, o - d / 2), this._debug("Scroll into view. ScrollTop: " + l + ". Element offset: " + o + ". Window height: " + d + "."), s = 0, t("body, html").stop(!0, !0).animate({scrollTop: Math.ceil(l)}, function (t) {
                return function () {
                    return 2 === ++s ? (n(), t._debug("Scroll into view.\nAnimation end element offset: " + r.offset().top + ".\nWindow height: " + a.height() + ".")) : void 0
                }
            }(this))) : n()
        }, i.prototype._onResize = function (i, n) {
            return t(e).on("resize.tour-" + this._options.name, function () {
                return clearTimeout(n), n = setTimeout(i, 100)
            })
        }, i.prototype._initMouseNavigation = function () {
            var e;
            return e = this, t(n).off("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role='prev']").off("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role='next']").off("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role='end']").off("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role='pause-resume']").on("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role='next']", function (t) {
                return function (e) {
                    return e.preventDefault(), t.next()
                }
            }(this)).on("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role='prev']", function (t) {
                return function (e) {
                    return e.preventDefault(), t.prev()
                }
            }(this)).on("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role='end']", function (t) {
                return function (e) {
                    return e.preventDefault(), t.end()
                }
            }(this)).on("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role='pause-resume']", function (i) {
                var n;
                return i.preventDefault(), n = t(this), n.text(e._paused ? n.data("pause-text") : n.data("resume-text")), e._paused ? e.resume() : e.pause()
            })
        }, i.prototype._initKeyboardNavigation = function () {
            return this._options.keyboard ? t(n).on("keyup.tour-" + this._options.name, function (t) {
                return function (e) {
                    if (e.which) switch (e.which) {
                        case 39:
                            return e.preventDefault(), t._isLast() ? t.next() : t.end();
                        case 37:
                            if (e.preventDefault(), t._current > 0) return t.prev();
                            break;
                        case 27:
                            return e.preventDefault(), t.end()
                    }
                }
            }(this)) : void 0
        }, i.prototype._makePromise = function (e) {
            return e && t.isFunction(e.then) ? e : null
        }, i.prototype._callOnPromiseDone = function (t, e, i) {
            return t ? t.then(function (t) {
                return function (n) {
                    return e.call(t, i)
                }
            }(this)) : e.call(this, i)
        }, i.prototype._showBackdrop = function (e) {
            return this.backdrop.backgroundShown ? void 0 : (this.backdrop = t("<div>", {"class": "tour-backdrop"}), this.backdrop.backgroundShown = !0, t("body").append(this.backdrop))
        }, i.prototype._hideBackdrop = function () {
            return this._hideOverlayElement(), this._hideBackground()
        }, i.prototype._hideBackground = function () {
            return this.backdrop ? (this.backdrop.remove(), this.backdrop.overlay = null, this.backdrop.backgroundShown = !1) : void 0
        }, i.prototype._showOverlayElement = function (e) {
            var i, n;
            return i = t(e.element), i && 0 !== i.length && !this.backdrop.overlayElementShown ? (this.backdrop.overlayElementShown = !0, this.backdrop.$element = i.addClass("tour-step-backdrop"), this.backdrop.$background = t("<div>", {"class": "tour-step-background"}), n = {
                width: i.innerWidth(),
                height: i.innerHeight(),
                offset: i.offset()
            }, this.backdrop.$background.appendTo("body"), e.backdropPadding && (n = this._applyBackdropPadding(e.backdropPadding, n)), this.backdrop.$background.width(n.width).height(n.height).offset(n.offset)) : void 0
        }, i.prototype._hideOverlayElement = function () {
            return this.backdrop.overlayElementShown ? (this.backdrop.$element.removeClass("tour-step-backdrop"), this.backdrop.$background.remove(), this.backdrop.$element = null, this.backdrop.$background = null, this.backdrop.overlayElementShown = !1) : void 0
        }, i.prototype._applyBackdropPadding = function (t, e) {
            return "object" == typeof t ? (null == t.top && (t.top = 0), null == t.right && (t.right = 0), null == t.bottom && (t.bottom = 0), null == t.left && (t.left = 0), e.offset.top = e.offset.top - t.top, e.offset.left = e.offset.left - t.left, e.width = e.width + t.left + t.right, e.height = e.height + t.top + t.bottom) : (e.offset.top = e.offset.top - t, e.offset.left = e.offset.left - t, e.width = e.width + 2 * t, e.height = e.height + 2 * t), e
        }, i.prototype._clearTimer = function () {
            return e.clearTimeout(this._timer), this._timer = null, this._duration = null
        }, i
    }(), e.Tour = i
}(jQuery, window), function (t) {
    "use strict";
    "object" == typeof exports ? module.exports = t(window.jQuery) : "function" == typeof define && define.amd ? define(["jquery"], t) : window.jQuery && !window.jQuery.fn.colorpicker && t(window.jQuery)
}(function (t) {
    "use strict";
    var e = function (e, i) {
        this.value = {
            h: 0,
            s: 0,
            b: 0,
            a: 1
        }, this.origFormat = null, i && t.extend(this.colors, i), e && (void 0 !== e.toLowerCase ? (e += "", this.setColor(e)) : void 0 !== e.h && (this.value = e))
    };
    e.prototype = {
        constructor: e,
        colors: {
            aliceblue: "#f0f8ff",
            antiquewhite: "#faebd7",
            aqua: "#00ffff",
            aquamarine: "#7fffd4",
            azure: "#f0ffff",
            beige: "#f5f5dc",
            bisque: "#ffe4c4",
            black: "#000000",
            blanchedalmond: "#ffebcd",
            blue: "#0000ff",
            blueviolet: "#8a2be2",
            brown: "#a52a2a",
            burlywood: "#deb887",
            cadetblue: "#5f9ea0",
            chartreuse: "#7fff00",
            chocolate: "#d2691e",
            coral: "#ff7f50",
            cornflowerblue: "#6495ed",
            cornsilk: "#fff8dc",
            crimson: "#dc143c",
            cyan: "#00ffff",
            darkblue: "#00008b",
            darkcyan: "#008b8b",
            darkgoldenrod: "#b8860b",
            darkgray: "#a9a9a9",
            darkgreen: "#006400",
            darkkhaki: "#bdb76b",
            darkmagenta: "#8b008b",
            darkolivegreen: "#556b2f",
            darkorange: "#ff8c00",
            darkorchid: "#9932cc",
            darkred: "#8b0000",
            darksalmon: "#e9967a",
            darkseagreen: "#8fbc8f",
            darkslateblue: "#483d8b",
            darkslategray: "#2f4f4f",
            darkturquoise: "#00ced1",
            darkviolet: "#9400d3",
            deeppink: "#ff1493",
            deepskyblue: "#00bfff",
            dimgray: "#696969",
            dodgerblue: "#1e90ff",
            firebrick: "#b22222",
            floralwhite: "#fffaf0",
            forestgreen: "#228b22",
            fuchsia: "#ff00ff",
            gainsboro: "#dcdcdc",
            ghostwhite: "#f8f8ff",
            gold: "#ffd700",
            goldenrod: "#daa520",
            gray: "#808080",
            green: "#008000",
            greenyellow: "#adff2f",
            honeydew: "#f0fff0",
            hotpink: "#ff69b4",
            indianred: "#cd5c5c",
            indigo: "#4b0082",
            ivory: "#fffff0",
            khaki: "#f0e68c",
            lavender: "#e6e6fa",
            lavenderblush: "#fff0f5",
            lawngreen: "#7cfc00",
            lemonchiffon: "#fffacd",
            lightblue: "#add8e6",
            lightcoral: "#f08080",
            lightcyan: "#e0ffff",
            lightgoldenrodyellow: "#fafad2",
            lightgrey: "#d3d3d3",
            lightgreen: "#90ee90",
            lightpink: "#ffb6c1",
            lightsalmon: "#ffa07a",
            lightseagreen: "#20b2aa",
            lightskyblue: "#87cefa",
            lightslategray: "#778899",
            lightsteelblue: "#b0c4de",
            lightyellow: "#ffffe0",
            lime: "#00ff00",
            limegreen: "#32cd32",
            linen: "#faf0e6",
            magenta: "#ff00ff",
            maroon: "#800000",
            mediumaquamarine: "#66cdaa",
            mediumblue: "#0000cd",
            mediumorchid: "#ba55d3",
            mediumpurple: "#9370d8",
            mediumseagreen: "#3cb371",
            mediumslateblue: "#7b68ee",
            mediumspringgreen: "#00fa9a",
            mediumturquoise: "#48d1cc",
            mediumvioletred: "#c71585",
            midnightblue: "#191970",
            mintcream: "#f5fffa",
            mistyrose: "#ffe4e1",
            moccasin: "#ffe4b5",
            navajowhite: "#ffdead",
            navy: "#000080",
            oldlace: "#fdf5e6",
            olive: "#808000",
            olivedrab: "#6b8e23",
            orange: "#ffa500",
            orangered: "#ff4500",
            orchid: "#da70d6",
            palegoldenrod: "#eee8aa",
            palegreen: "#98fb98",
            paleturquoise: "#afeeee",
            palevioletred: "#d87093",
            papayawhip: "#ffefd5",
            peachpuff: "#ffdab9",
            peru: "#cd853f",
            pink: "#ffc0cb",
            plum: "#dda0dd",
            powderblue: "#b0e0e6",
            purple: "#800080",
            red: "#ff0000",
            rosybrown: "#bc8f8f",
            royalblue: "#4169e1",
            saddlebrown: "#8b4513",
            salmon: "#fa8072",
            sandybrown: "#f4a460",
            seagreen: "#2e8b57",
            seashell: "#fff5ee",
            sienna: "#a0522d",
            silver: "#c0c0c0",
            skyblue: "#87ceeb",
            slateblue: "#6a5acd",
            slategray: "#708090",
            snow: "#fffafa",
            springgreen: "#00ff7f",
            steelblue: "#4682b4",
            tan: "#d2b48c",
            teal: "#008080",
            thistle: "#d8bfd8",
            tomato: "#ff6347",
            turquoise: "#40e0d0",
            violet: "#ee82ee",
            wheat: "#f5deb3",
            white: "#ffffff",
            whitesmoke: "#f5f5f5",
            yellow: "#ffff00",
            yellowgreen: "#9acd32",
            transparent: "transparent"
        },
        _sanitizeNumber: function (t) {
            return "number" == typeof t ? t : isNaN(t) || null === t || "" === t || void 0 === t ? 1 : "" === t ? 0 : void 0 !== t.toLowerCase ? (t.match(/^\./) && (t = "0" + t), Math.ceil(100 * parseFloat(t)) / 100) : 1
        },
        isTransparent: function (t) {
            return t ? (t = t.toLowerCase().trim(), "transparent" === t || t.match(/#?00000000/) || t.match(/(rgba|hsla)\(0,0,0,0?\.?0\)/)) : !1
        },
        rgbaIsTransparent: function (t) {
            return 0 === t.r && 0 === t.g && 0 === t.b && 0 === t.a
        },
        setColor: function (t) {
            t = t.toLowerCase().trim(), t && (this.isTransparent(t) ? this.value = {
                h: 0,
                s: 0,
                b: 0,
                a: 0
            } : this.value = this.stringToHSB(t) || {h: 0, s: 0, b: 0, a: 1})
        },
        stringToHSB: function (e) {
            e = e.toLowerCase();
            var i;
            "undefined" != typeof this.colors[e] && (e = this.colors[e], i = "alias");
            var n = this, r = !1;
            return t.each(this.stringParsers, function (t, a) {
                var s = a.re.exec(e), o = s && a.parse.apply(n, [s]), l = i || a.format || "rgba";
                return o ? (r = l.match(/hsla?/) ? n.RGBtoHSB.apply(n, n.HSLtoRGB.apply(n, o)) : n.RGBtoHSB.apply(n, o), n.origFormat = l, !1) : !0
            }), r
        },
        setHue: function (t) {
            this.value.h = 1 - t
        },
        setSaturation: function (t) {
            this.value.s = t
        },
        setBrightness: function (t) {
            this.value.b = 1 - t
        },
        setAlpha: function (t) {
            this.value.a = Math.round(parseInt(100 * (1 - t), 10) / 100 * 100) / 100
        },
        toRGB: function (t, e, i, n) {
            t || (t = this.value.h, e = this.value.s, i = this.value.b), t *= 360;
            var r, a, s, o, l;
            return t = t % 360 / 60, l = i * e, o = l * (1 - Math.abs(t % 2 - 1)), r = a = s = i - l, t = ~~t, r += [l, o, 0, 0, o, l][t], a += [o, l, l, o, 0, 0][t], s += [0, 0, o, l, l, o][t], {
                r: Math.round(255 * r),
                g: Math.round(255 * a),
                b: Math.round(255 * s),
                a: n || this.value.a
            }
        },
        toHex: function (t, e, i, n) {
            var r = this.toRGB(t, e, i, n);
            return this.rgbaIsTransparent(r) ? "transparent" : "#" + (1 << 24 | parseInt(r.r) << 16 | parseInt(r.g) << 8 | parseInt(r.b)).toString(16).substr(1)
        },
        toHSL: function (t, e, i, n) {
            t = t || this.value.h, e = e || this.value.s, i = i || this.value.b, n = n || this.value.a;
            var r = t, a = (2 - e) * i, s = e * i;
            return s /= a > 0 && 1 >= a ? a : 2 - a, a /= 2, s > 1 && (s = 1), {
                h: isNaN(r) ? 0 : r,
                s: isNaN(s) ? 0 : s,
                l: isNaN(a) ? 0 : a,
                a: isNaN(n) ? 0 : n
            }
        },
        toAlias: function (t, e, i, n) {
            var r = this.toHex(t, e, i, n);
            for (var a in this.colors) if (this.colors[a] === r) return a;
            return !1
        },
        RGBtoHSB: function (t, e, i, n) {
            t /= 255, e /= 255, i /= 255;
            var r, a, s, o;
            return s = Math.max(t, e, i), o = s - Math.min(t, e, i), r = 0 === o ? null : s === t ? (e - i) / o : s === e ? (i - t) / o + 2 : (t - e) / o + 4, r = (r + 360) % 6 * 60 / 360, a = 0 === o ? 0 : o / s, {
                h: this._sanitizeNumber(r),
                s: a,
                b: s,
                a: this._sanitizeNumber(n)
            }
        },
        HueToRGB: function (t, e, i) {
            return 0 > i ? i += 1 : i > 1 && (i -= 1), 1 > 6 * i ? t + (e - t) * i * 6 : 1 > 2 * i ? e : 2 > 3 * i ? t + (e - t) * (2 / 3 - i) * 6 : t
        },
        HSLtoRGB: function (t, e, i, n) {
            0 > e && (e = 0);
            var r;
            r = .5 >= i ? i * (1 + e) : i + e - i * e;
            var a = 2 * i - r, s = t + 1 / 3, o = t, l = t - 1 / 3, d = Math.round(255 * this.HueToRGB(a, r, s)),
                c = Math.round(255 * this.HueToRGB(a, r, o)), u = Math.round(255 * this.HueToRGB(a, r, l));
            return [d, c, u, this._sanitizeNumber(n)]
        },
        toString: function (t) {
            t = t || "rgba";
            var e = !1;
            switch (t) {
                case"rgb":
                    return e = this.toRGB(), this.rgbaIsTransparent(e) ? "transparent" : "rgb(" + e.r + "," + e.g + "," + e.b + ")";
                case"rgba":
                    return e = this.toRGB(), "rgba(" + e.r + "," + e.g + "," + e.b + "," + e.a + ")";
                case"hsl":
                    return e = this.toHSL(), "hsl(" + Math.round(360 * e.h) + "," + Math.round(100 * e.s) + "%," + Math.round(100 * e.l) + "%)";
                case"hsla":
                    return e = this.toHSL(), "hsla(" + Math.round(360 * e.h) + "," + Math.round(100 * e.s) + "%," + Math.round(100 * e.l) + "%," + e.a + ")";
                case"hex":
                    return this.toHex();
                case"alias":
                    return this.toAlias() || this.toHex();
                default:
                    return e
            }
        },
        stringParsers: [{
            re: /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*?\)/,
            format: "rgb",
            parse: function (t) {
                return [t[1], t[2], t[3], 1]
            }
        }, {
            re: /rgb\(\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*?\)/,
            format: "rgb",
            parse: function (t) {
                return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], 1]
            }
        }, {
            re: /rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d*(?:\.\d+)?)\s*)?\)/,
            format: "rgba",
            parse: function (t) {
                return [t[1], t[2], t[3], t[4]]
            }
        }, {
            re: /rgba\(\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*(?:,\s*(\d*(?:\.\d+)?)\s*)?\)/,
            format: "rgba",
            parse: function (t) {
                return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]]
            }
        }, {
            re: /hsl\(\s*(\d*(?:\.\d+)?)\s*,\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*?\)/,
            format: "hsl",
            parse: function (t) {
                return [t[1] / 360, t[2] / 100, t[3] / 100, t[4]]
            }
        }, {
            re: /hsla\(\s*(\d*(?:\.\d+)?)\s*,\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*(?:,\s*(\d*(?:\.\d+)?)\s*)?\)/,
            format: "hsla",
            parse: function (t) {
                return [t[1] / 360, t[2] / 100, t[3] / 100, t[4]]
            }
        }, {
            re: /#?([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/, format: "hex", parse: function (t) {
                return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16), 1]
            }
        }, {
            re: /#?([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/, format: "hex", parse: function (t) {
                return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16), 1]
            }
        }],
        colorNameToHex: function (t) {
            return "undefined" != typeof this.colors[t.toLowerCase()] ? this.colors[t.toLowerCase()] : !1
        }
    };
    var i = {
        horizontal: !1,
        inline: !1,
        color: !1,
        format: !1,
        input: "input",
        container: !1,
        component: ".add-on, .input-group-addon",
        sliders: {
            saturation: {maxLeft: 100, maxTop: 100, callLeft: "setSaturation", callTop: "setBrightness"},
            hue: {maxLeft: 0, maxTop: 100, callLeft: !1, callTop: "setHue"},
            alpha: {maxLeft: 0, maxTop: 100, callLeft: !1, callTop: "setAlpha"}
        },
        slidersHorz: {
            saturation: {maxLeft: 100, maxTop: 100, callLeft: "setSaturation", callTop: "setBrightness"},
            hue: {maxLeft: 100, maxTop: 0, callLeft: "setHue", callTop: !1},
            alpha: {maxLeft: 100, maxTop: 0, callLeft: "setAlpha", callTop: !1}
        },
        template: '<div class="colorpicker dropdown-menu"><div class="colorpicker-saturation"><i><b></b></i></div><div class="colorpicker-hue"><i></i></div><div class="colorpicker-alpha"><i></i></div><div class="colorpicker-color"><div /></div><div class="colorpicker-selectors"></div></div>',
        align: "right",
        customClass: null,
        colorSelectors: null
    }, n = function (n, r) {
        if (this.element = t(n).addClass("colorpicker-element"), this.options = t.extend(!0, {}, i, this.element.data(), r), this.component = this.options.component, this.component = this.component !== !1 ? this.element.find(this.component) : !1, this.component && 0 === this.component.length && (this.component = !1), this.container = this.options.container === !0 ? this.element : this.options.container, this.container = this.container !== !1 ? t(this.container) : !1, this.input = this.element.is("input") ? this.element : this.options.input ? this.element.find(this.options.input) : !1, this.input && 0 === this.input.length && (this.input = !1), this.color = new e(this.options.color !== !1 ? this.options.color : this.getValue(), this.options.colorSelectors), this.format = this.options.format !== !1 ? this.options.format : this.color.origFormat, this.options.color !== !1 && (this.updateInput(this.color), this.updateData(this.color)), this.picker = t(this.options.template), this.options.customClass && this.picker.addClass(this.options.customClass), this.options.inline ? this.picker.addClass("colorpicker-inline colorpicker-visible") : this.picker.addClass("colorpicker-hidden"), this.options.horizontal && this.picker.addClass("colorpicker-horizontal"), "rgba" !== this.format && "hsla" !== this.format && this.options.format !== !1 || this.picker.addClass("colorpicker-with-alpha"), "right" === this.options.align && this.picker.addClass("colorpicker-right"), this.options.inline === !0 && this.picker.addClass("colorpicker-no-arrow"), this.options.colorSelectors) {
            var a = this;
            t.each(this.options.colorSelectors, function (e, i) {
                var n = t("<i />").css("background-color", i).data("class", e);
                n.click(function () {
                    a.setValue(t(this).css("background-color"))
                }), a.picker.find(".colorpicker-selectors").append(n)
            }), this.picker.find(".colorpicker-selectors").show()
        }
        this.picker.on("mousedown.colorpicker touchstart.colorpicker", t.proxy(this.mousedown, this)), this.picker.appendTo(this.container ? this.container : t("body")), this.input !== !1 && (this.input.on({"keyup.colorpicker": t.proxy(this.keyup, this)}), this.input.on({"change.colorpicker": t.proxy(this.change, this)}), this.component === !1 && this.element.on({"focus.colorpicker": t.proxy(this.show, this)}), this.options.inline === !1 && this.element.on({"focusout.colorpicker": t.proxy(this.hide, this)})), this.component !== !1 && this.component.on({"click.colorpicker": t.proxy(this.show, this)}), this.input === !1 && this.component === !1 && this.element.on({"click.colorpicker": t.proxy(this.show, this)}), this.input !== !1 && this.component !== !1 && "color" === this.input.attr("type") && this.input.on({
            "click.colorpicker": t.proxy(this.show, this),
            "focus.colorpicker": t.proxy(this.show, this)
        }), this.update(), t(t.proxy(function () {
            this.element.trigger("create")
        }, this))
    };
    n.Color = e, n.prototype = {
        constructor: n, destroy: function () {
            this.picker.remove(), this.element.removeData("colorpicker", "color").off(".colorpicker"), this.input !== !1 && this.input.off(".colorpicker"), this.component !== !1 && this.component.off(".colorpicker"), this.element.removeClass("colorpicker-element"), this.element.trigger({type: "destroy"})
        }, reposition: function () {
            if (this.options.inline !== !1 || this.options.container) return !1;
            var t = this.container && this.container[0] !== document.body ? "position" : "offset",
                e = this.component || this.element, i = e[t]();
            "right" === this.options.align && (i.left -= this.picker.outerWidth() - e.outerWidth()), this.picker.css({
                top: i.top + e.outerHeight(),
                left: i.left
            })
        }, show: function (e) {
            return this.isDisabled() ? !1 : (this.picker.addClass("colorpicker-visible").removeClass("colorpicker-hidden"), this.reposition(), t(window).on("resize.colorpicker", t.proxy(this.reposition, this)), !e || this.hasInput() && "color" !== this.input.attr("type") || e.stopPropagation && e.preventDefault && (e.stopPropagation(), e.preventDefault()), !this.component && this.input || this.options.inline !== !1 || t(window.document).on({"mousedown.colorpicker": t.proxy(this.hide, this)}), void this.element.trigger({
                type: "showPicker",
                color: this.color
            }))
        }, hide: function () {
            this.picker.addClass("colorpicker-hidden").removeClass("colorpicker-visible"), t(window).off("resize.colorpicker", this.reposition), t(document).off({"mousedown.colorpicker": this.hide}), this.update(), this.element.trigger({
                type: "hidePicker",
                color: this.color
            })
        }, updateData: function (t) {
            return t = t || this.color.toString(this.format), this.element.data("color", t), t
        }, updateInput: function (t) {
            if (t = t || this.color.toString(this.format), this.input !== !1) {
                if (this.options.colorSelectors) {
                    var i = new e(t, this.options.colorSelectors), n = i.toAlias();
                    "undefined" != typeof this.options.colorSelectors[n] && (t = n)
                }
                this.input.prop("value", t)
            }
            return t
        }, updatePicker: function (t) {
            void 0 !== t && (this.color = new e(t, this.options.colorSelectors));
            var i = this.options.horizontal === !1 ? this.options.sliders : this.options.slidersHorz,
                n = this.picker.find("i");
            return 0 !== n.length ? (this.options.horizontal === !1 ? (i = this.options.sliders, n.eq(1).css("top", i.hue.maxTop * (1 - this.color.value.h)).end().eq(2).css("top", i.alpha.maxTop * (1 - this.color.value.a))) : (i = this.options.slidersHorz, n.eq(1).css("left", i.hue.maxLeft * (1 - this.color.value.h)).end().eq(2).css("left", i.alpha.maxLeft * (1 - this.color.value.a))), n.eq(0).css({
                top: i.saturation.maxTop - this.color.value.b * i.saturation.maxTop,
                left: this.color.value.s * i.saturation.maxLeft
            }), this.picker.find(".colorpicker-saturation").css("backgroundColor", this.color.toHex(this.color.value.h, 1, 1, 1)), this.picker.find(".colorpicker-alpha").css("backgroundColor", this.color.toHex()), this.picker.find(".colorpicker-color, .colorpicker-color div").css("backgroundColor", this.color.toString(this.format)), t) : void 0
        }, updateComponent: function (t) {
            if (t = t || this.color.toString(this.format), this.component !== !1) {
                var e = this.component.find("i").eq(0);
                e.length > 0 ? e.css({
                    backgroundColor: t
                }) : this.component.css({backgroundColor: t})
            }
            return t
        }, update: function (t) {
            var e;
            return this.getValue(!1) === !1 && t !== !0 || (e = this.updateComponent(), this.updateInput(e), this.updateData(e), this.updatePicker()), e
        }, setValue: function (t) {
            this.color = new e(t, this.options.colorSelectors), this.update(!0), this.element.trigger({
                type: "changeColor",
                color: this.color,
                value: t
            })
        }, getValue: function (t) {
            t = void 0 === t ? "#000000" : t;
            var e;
            return e = this.hasInput() ? this.input.val() : this.element.data("color"), void 0 !== e && "" !== e && null !== e || (e = t), e
        }, hasInput: function () {
            return this.input !== !1
        }, isDisabled: function () {
            return this.hasInput() ? this.input.prop("disabled") === !0 : !1
        }, disable: function () {
            return this.hasInput() ? (this.input.prop("disabled", !0), this.element.trigger({
                type: "disable",
                color: this.color,
                value: this.getValue()
            }), !0) : !1
        }, enable: function () {
            return this.hasInput() ? (this.input.prop("disabled", !1), this.element.trigger({
                type: "enable",
                color: this.color,
                value: this.getValue()
            }), !0) : !1
        }, currentSlider: null, mousePointer: {left: 0, top: 0}, mousedown: function (e) {
            !e.pageX && !e.pageY && e.originalEvent && e.originalEvent.touches && (e.pageX = e.originalEvent.touches[0].pageX, e.pageY = e.originalEvent.touches[0].pageY), e.stopPropagation(), e.preventDefault();
            var i = t(e.target), n = i.closest("div"),
                r = this.options.horizontal ? this.options.slidersHorz : this.options.sliders;
            if (!n.is(".colorpicker")) {
                if (n.is(".colorpicker-saturation")) this.currentSlider = t.extend({}, r.saturation); else if (n.is(".colorpicker-hue")) this.currentSlider = t.extend({}, r.hue); else {
                    if (!n.is(".colorpicker-alpha")) return !1;
                    this.currentSlider = t.extend({}, r.alpha)
                }
                var a = n.offset();
                this.currentSlider.guide = n.find("i")[0].style, this.currentSlider.left = e.pageX - a.left, this.currentSlider.top = e.pageY - a.top, this.mousePointer = {
                    left: e.pageX,
                    top: e.pageY
                }, t(document).on({
                    "mousemove.colorpicker": t.proxy(this.mousemove, this),
                    "touchmove.colorpicker": t.proxy(this.mousemove, this),
                    "mouseup.colorpicker": t.proxy(this.mouseup, this),
                    "touchend.colorpicker": t.proxy(this.mouseup, this)
                }).trigger("mousemove")
            }
            return !1
        }, mousemove: function (t) {
            !t.pageX && !t.pageY && t.originalEvent && t.originalEvent.touches && (t.pageX = t.originalEvent.touches[0].pageX, t.pageY = t.originalEvent.touches[0].pageY), t.stopPropagation(), t.preventDefault();
            var e = Math.max(0, Math.min(this.currentSlider.maxLeft, this.currentSlider.left + ((t.pageX || this.mousePointer.left) - this.mousePointer.left))),
                i = Math.max(0, Math.min(this.currentSlider.maxTop, this.currentSlider.top + ((t.pageY || this.mousePointer.top) - this.mousePointer.top)));
            return this.currentSlider.guide.left = e + "px", this.currentSlider.guide.top = i + "px", this.currentSlider.callLeft && this.color[this.currentSlider.callLeft].call(this.color, e / this.currentSlider.maxLeft), this.currentSlider.callTop && this.color[this.currentSlider.callTop].call(this.color, i / this.currentSlider.maxTop), "setAlpha" === this.currentSlider.callTop && this.options.format === !1 && (1 !== this.color.value.a ? (this.format = "rgba", this.color.origFormat = "rgba") : (this.format = "hex", this.color.origFormat = "hex")), this.update(!0), this.element.trigger({
                type: "changeColor",
                color: this.color
            }), !1
        }, mouseup: function (e) {
            return e.stopPropagation(), e.preventDefault(), t(document).off({
                "mousemove.colorpicker": this.mousemove,
                "touchmove.colorpicker": this.mousemove,
                "mouseup.colorpicker": this.mouseup,
                "touchend.colorpicker": this.mouseup
            }), !1
        }, change: function (t) {
            this.keyup(t)
        }, keyup: function (t) {
            38 === t.keyCode ? (this.color.value.a < 1 && (this.color.value.a = Math.round(100 * (this.color.value.a + .01)) / 100), this.update(!0)) : 40 === t.keyCode ? (this.color.value.a > 0 && (this.color.value.a = Math.round(100 * (this.color.value.a - .01)) / 100), this.update(!0)) : (this.color = new e(this.input.val(), this.options.colorSelectors), this.color.origFormat && this.options.format === !1 && (this.format = this.color.origFormat), this.getValue(!1) !== !1 && (this.updateData(), this.updateComponent(), this.updatePicker())), this.element.trigger({
                type: "changeColor",
                color: this.color,
                value: this.input.val()
            })
        }
    }, t.colorpicker = n, t.fn.colorpicker = function (e) {
        var i = arguments, r = null, a = this.each(function () {
            var a = t(this), s = a.data("colorpicker"), o = "object" == typeof e ? e : {};
            s || "string" == typeof e ? "string" == typeof e && (r = s[e].apply(s, Array.prototype.slice.call(i, 1))) : a.data("colorpicker", new n(this, o))
        });
        return "getValue" === e ? r : a
    }, t.fn.colorpicker.constructor = n
}), function (t) {
    var e = Cookies.get("isSidebar");
    "no" == e && t("#wrapper").addClass("toggled"), t(".navbar-toggle-secondary").click(function (e) {
        e.preventDefault(), t("#wrapper").removeClass("toggled")
    }), t("#menu-toggle").click(function (e) {
        e.preventDefault(), t("#navbar").removeClass("in"), t("#wrapper").toggleClass("toggled"), 0 == t("#wrapper").hasClass("toggled") ? Cookies.set("isSidebar", "yes") : Cookies.set("isSidebar", "no")
    }), t(document).on("click", ".panel-heading span.clickable", function (e) {
        var i = t(this);
        i.hasClass("panel-collapsed") ? (i.parents(".panel").find(".panel-body").slideDown(), i.removeClass("panel-collapsed"), i.find("i").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up")) : (i.parents(".panel").find(".panel-body").slideUp(), i.addClass("panel-collapsed"), i.find("i").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down"))
    }), t(".selectpicker").selectpicker(), t(".select2").select2({
        theme: "bootstrap",
        allowClear: !0,
        placeholder: "-- Select --"
    }), t(".color-picker").colorpicker(), t("#formHorizontal").find('[name="bs_select"]').selectpicker().change(function (e) {
        t("#formHorizontal").formValidation("revalidateField", "bs_select")
    }).end().find('[name="colors"]').selectpicker().change(function (e) {
        t("#formHorizontal").formValidation("revalidateField", "colors")
    }).end().find('[name="colors2"]').select2().change(function (e) {
        t("#formHorizontal").formValidation("revalidateField", "colors2")
    }).end().formValidation({
        framework: "bootstrap",
        excluded: ":disabled",
        icon: {
            valid: "glyphicon glyphicon-ok",
            invalid: "glyphicon glyphicon-remove",
            validating: "glyphicon glyphicon-refresh"
        },
        addOns: {mandatoryIcon: {icon: "glyphicon glyphicon-asterisk"}},
        fields: {
            first_name: {validators: {notEmpty: {message: "First Name is required and cannot be empty"}}},
            last_name: {validators: {notEmpty: {}, message: "Last Name is required and cannot be empty"}},
            textarea: {validators: {notEmpty: {message: "Text Area is required and cannot be empty"}}},
            checkbox: {validators: {notEmpty: {message: "Inline checkbox is required and cannot be empty"}}},
            inline_checkbox: {validators: {notEmpty: {message: "Checkbox is required and cannot be empty"}}},
            radio: {validators: {notEmpty: {message: "radio button is required and cannot be empty"}}},
            radioInline: {validators: {notEmpty: {message: "Inline radio button is required and cannot be empty"}}},
            colors: {
                validators: {
                    callback: {
                        message: "Please choose 2-4 colors you like most",
                        callback: function (t, e, i) {
                            var n = e.getFieldElements("colors").val();
                            return null != n && n.length >= 2 && n.length <= 4
                        }
                    }
                }
            },
            bs_select: {validators: {notEmpty: {message: "Please select your option."}}},
            colors2: {
                validators: {
                    callback: {
                        message: "Please choose 2-4 color you like most",
                        callback: function (t, e, i) {
                            var n = e.getFieldElements("colors2").val();
                            return null != n && n.length >= 2 && n.length <= 4
                        }
                    }
                }
            },
            date: {
                validators: {
                    notEmpty: {message: "The date is required"},
                    date: {format: "MM/DD/YYYY", message: "The date is not a valid"}
                }
            }
        }
    }), t("#datePicker").datepicker({format: "dd/mm/yyyy"}).on("changeDate", function (e) {
        t("#formHorizontal").formValidation("revalidateField", "date")
    }), t(".input-daterange input").each(function () {
        t(this).datepicker("clearDates")
    }), t('[data-toggle="popover"]').popover(), t("body").on("click", function (e) {
        t('[data-toggle="popover"]').each(function () {
            t(this).is(e.target) || 0 !== t(this).has(e.target).length || 0 !== t(".popover").has(e.target).length || t(this).popover("hide")
        })
    }), t("#sidebar-wrapper").perfectScrollbar(), tinymce.init({
        selector: "#mytextarea",
        menubar: !1,
        statusbar: !1,
        plugins: ["advlist autolink lists link image charmap print preview anchor"],
        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify",
        content_css: ["//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css", "//www.tinymce.com/css/codepen.min.css"]
    }), t(function () {
        t(".wrapper1").scroll(function () {
            t(".wrapper2").scrollLeft(t(".wrapper1").scrollLeft())
        }), t(".wrapper2").scroll(function () {
            t(".wrapper1").scrollLeft(t(".wrapper2").scrollLeft())
        })
    });
    t('select[name="duallistbox_demo1[]"]').bootstrapDualListbox();
    t("#demoform").submit(function () {
        return alert(t('[name="duallistbox_demo1[]"]').val()), !1
    }), t("#multiselect").multiselect(), t("#search").multiselect({
        search: {
            left: '<input type="text" name="q" class="form-control" placeholder="Search..." />',
            right: '<input type="text" name="q" class="form-control" placeholder="Search..." />'
        }
    }), t('[data-tooltip="tooltip"]').tooltip(), t(".datetimepicker").datetimepicker({format: "LT"}), t("#showDetaildModal").on("shown.bs.modal", function (e) {
        t(".color-picker").colorpicker(), t(".startDatePicker").datepicker({format: "dd/mm/yyyy"}).on("changeDate", function (e) {
            t("#amMainForm").formValidation("revalidateField", "startDate")
        }), t(".endDatePicker").datepicker({format: "dd/mm/yyyy"}).on("changeDate", function (e) {
            t("#amMainForm").formValidation("revalidateField", "endDate")
        }), t("#amMainForm").formValidation({
            framework: "bootstrap",
            excluded: ":disabled",
            icon: {
                valid: "glyphicon glyphicon-ok",
                invalid: "glyphicon glyphicon-remove",
                validating: "glyphicon glyphicon-refresh"
            },
            addOns: {mandatoryIcon: {icon: "glyphicon glyphicon-asterisk"}}
        }), t(".amMainForm").formValidation({
            framework: "bootstrap",
            excluded: ":disabled",
            icon: {
                valid: "glyphicon glyphicon-ok",
                invalid: "glyphicon glyphicon-remove",
                validating: "glyphicon glyphicon-refresh"
            },
            addOns: {mandatoryIcon: {icon: "glyphicon glyphicon-asterisk"}}
        }), tinymce.init({
            selector: ".dgdpTextAreaEditor",
            menubar: !1,
            statusbar: !1,
            plugins: ["advlist autolink lists link image charmap print preview anchor"],
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify",
            content_css: ["//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css", "//www.tinymce.com/css/codepen.min.css"]
        }), t('[data-toggle="popover"]').popover(), t("body").on("click", function (e) {
            t('[data-toggle="popover"]').each(function () {
                t(this).is(e.target) || 0 !== t(this).has(e.target).length || 0 !== t(".popover").has(e.target).length || t(this).popover("hide")
            })
        }), t('[data-tooltip="tooltip"]').tooltip(), t("#datePicker").datepicker({format: "dd-mm-yyyy"}).on("changeDate", function (e) {
            t("#amMainForm").formValidation("revalidateField", "date")
        }), t(".datePicker").datepicker({format: "dd-mm-yyyy"}).on("changeDate", function (e) {
            t("#amMainForm").formValidation("revalidateField", "date")
        }), t(".input-daterange input").each(function () {
            t(this).datepicker("clearDates")
        }), t(".selectpicker").selectpicker(), t(".select2").select2({theme: "bootstrap"}), t(".datetimepicker").datetimepicker({format: "LT"}), t(".txtEditor").redactor({
            minHeight: 200,
            maxHeight: 300,
            imageUpload: '<?php echo base_url("Editor/index"); ?>',
            plugins: ["fontfamily", "fontsize", "fontcolor", "advanced"]
        });
        var i = window.location.href;
        i = i.replace(/\/$/, ""), i = decodeURIComponent(i), t(".sidebar-menu a").each(function () {
            var e = t(this).attr("href");
            i === e && (t(this).closest("li").addClass("active"), t(this).parents("ul").addClass("in"), t(this).parents("ul").prev("li").removeClass("collapsed"))
        })
    }), t("#showDetaildModal").on("hide.bs.modal", function (e) {
        t('[data-toggle="popover"]').popover("hide"), tinyMCE.remove(".dgdpTextAreaEditor")
    }), t(".amMainForm").formValidation({
        framework: "bootstrap",
        excluded: ":disabled",
        icon: {
            valid: "glyphicon glyphicon-ok",
            invalid: "glyphicon glyphicon-remove",
            validating: "glyphicon glyphicon-refresh"
        },
        addOns: {mandatoryIcon: {icon: "glyphicon glyphicon-asterisk"}}
    }), tinymce.init({
        selector: ".dgdpTextAreaEditor",
        menubar: !1,
        statusbar: !1,
        plugins: ["advlist autolink lists link image charmap print preview anchor"],
        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify",
        content_css: ["//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css", "//www.tinymce.com/css/codepen.min.css"]
    }), t(".datePicker").datepicker({format: "dd-mm-yyyy"}).on("changeDate", function (e) {
        t(".amMainForm").formValidation("revalidateField", "date")
    }), t(".txtEditor").redactor({
        minHeight: 200,
        maxHeight: 300,
        imageUpload: '<?php echo base_url("Editor/index"); ?>',
        plugins: ["fontfamily", "fontsize", "fontcolor", "advanced"]
    });
    var i = window.location.href;
    i = i.replace(/\/$/, ""), i = decodeURIComponent(i), t(".sidebar-menu a").each(function () {
        var e = t(this).attr("href");
        i === e && (t(this).closest("li").addClass("active"), t(this).parents("ul").addClass("in"), t(this).parents("ul").prev("li").removeClass("collapsed"))
    })
}(jQuery);
//# sourceMappingURL=main.js.map
