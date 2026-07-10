(() => {
    var e, t = {
            323: function(e, t) {
                ! function(e) {
                    "use strict";
                    var t = / /;

                    function o(e) {
                        var t = e.nodeType,
                            r = "";
                        if (1 === t || 9 === t || 11 === t) {
                            if ("string" == typeof e.textContent) return e.textContent;
                            for (e = e.firstChild; e; e = e.nextSibling) r += o(e)
                        } else if (3 === t || 4 === t) return e.nodeValue;
                        return r
                    }

                    function n(e, o, n) {
                        if (e += "", n && (e = e.replace(t, "")), o && "" !== o) return e.replace(/>/g, "&gt;").replace(/</g, "&lt;").split(o);
                        for (var i, a, s = [], l = e.length, c = 0; c < l; c++)(55296 <= (a = e.charAt(c)).charCodeAt(0) && a.charCodeAt(0) <= 56319 || 65024 <= e.charCodeAt(c + 1) && e.charCodeAt(c + 1) <= 65039) && (i = ((e.substr(c, 12).split(r) || [])[1] || "").length || 2, a = e.substr(c, i), c += i - (s.emoji = 1)), s.push(">" === a ? "&gt;" : "<" === a ? "&lt;" : a);
                        return s
                    }
                    var i = (a.prototype.grow = function(e) {
                        for (var t = 0; t < 20; t++) this.sets[t] += p(e - this.length, this.chars);
                        this.length = e
                    }, a);

                    function a(e) {
                        this.chars = n(e), this.sets = [], this.length = 50;
                        for (var t = 0; t < 20; t++) this.sets[t] = p(80, this.chars)
                    }

                    function s() {
                        return c || "undefined" != typeof window && (c = window.gsap) && c.registerPlugin && c
                    }

                    function l() {
                        d = c = s()
                    }
                    var c, d, u = /\s+/g,
                        p = function(e, t) {
                            for (var o = t.length, r = ""; - 1 < --e;) r += t[~~(Math.random() * o)];
                            return r
                        },
                        h = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                        m = h.toLowerCase(),
                        g = {
                            upperCase: new i(h),
                            lowerCase: new i(m),
                            upperAndLowerCase: new i(h + m)
                        },
                        f = {
                            version: "0.0.1",
                            name: "scrambleText",
                            register: function(e) {
                                c = e, l()
                            },
                            init: function(e, t, r) {
                                if (d || l(), this.prop = "innerHTML" in e ? "innerHTML" : "textContent" in e ? "textContent" : 0, this.prop) {
                                    this.target = e, "object" != typeof t && (t = {
                                        text: t
                                    });
                                    var a, s, c, p, h = t.text || t.value || "",
                                        m = !1 !== t.trim,
                                        f = this;
                                    return f.delimiter = a = t.delimiter || "", f.original = n(o(e).replace(u, " ").split("&nbsp;").join(""), a, m), "{original}" !== h && !0 !== h && null != h || (h = f.original.join(a)), f.text = n((h || "").replace(u, " "), a, m), f.hasClass = !(!t.newClass && !t.oldClass), f.newClass = t.newClass, f.oldClass = t.oldClass, p = "" === a, f.textHasEmoji = p && !!f.text.emoji, f.charsHaveEmoji = !!t.chars && !!n(t.chars).emoji, f.length = p ? f.original.length : f.original.join(a).length, f.lengthDif = (p ? f.text.length : f.text.join(a).length) - f.length, f.fillChar = t.fillChar || t.chars && ~t.chars.indexOf(" ") ? "&nbsp;" : "", f.charSet = c = g[t.chars || "upperCase"] || new i(t.chars), f.speed = .05 / (t.speed || 1), f.prevScrambleTime = 0, f.setIndex = 20 * Math.random() | 0, (s = f.length + Math.max(f.lengthDif, 0)) > c.length && c.grow(s), f.chars = c.sets[f.setIndex], f.revealDelay = t.revealDelay || 0, f.tweenLength = !1 !== t.tweenLength, f.tween = r, f.rightToLeft = !!t.rightToLeft, f._props.push("scrambleText", "text"), 1
                                }
                            },
                            render: function(e, t) {
                                var o, r, i, a, s, l, c, d, u, p, h, m = t.target,
                                    g = t.prop,
                                    f = t.text,
                                    w = t.delimiter,
                                    b = t.tween,
                                    v = t.prevScrambleTime,
                                    y = t.revealDelay,
                                    x = t.setIndex,
                                    S = t.chars,
                                    E = t.charSet,
                                    L = t.length,
                                    k = t.textHasEmoji,
                                    T = t.charsHaveEmoji,
                                    C = t.lengthDif,
                                    P = t.tweenLength,
                                    M = t.oldClass,
                                    _ = t.newClass,
                                    A = t.rightToLeft,
                                    q = t.fillChar,
                                    I = t.speed,
                                    D = t.original,
                                    H = t.hasClass,
                                    G = f.length,
                                    R = b._time,
                                    j = R - v;
                                y && (b._from && (R = b._dur - R), e = 0 === R ? 0 : R < y ? 1e-6 : R === b._dur ? 1 : b._ease((R - y) / (b._dur - y))), e < 0 ? e = 0 : 1 < e && (e = 1), A && (e = 1 - e), o = ~~(e * G + .5), a = e ? ((I < j || j < -I) && (t.setIndex = x = (x + (19 * Math.random() | 0)) % 20, t.chars = E.sets[x], t.prevScrambleTime += j), S) : D.join(w), h = b._from ? e : 1 - e, p = L + (P ? b._from ? h * h * h : 1 - h * h * h : 1) * C, a = A ? 1 !== e || !b._from && "isFromStart" !== b.data ? (c = f.slice(o).join(w), i = T ? n(a).slice(0, p - (k ? n(c) : c).length + .5 | 0).join("") : a.substr(0, p - (k ? n(c) : c).length + .5 | 0), c) : (i = "", D.join(w)) : (i = f.slice(0, o).join(w), r = (k ? n(i) : i).length, T ? n(a).slice(r, p + .5 | 0).join("") : a.substr(r, p - r + .5 | 0)), c = H ? ((s = (d = A ? M : _) && 0 != o) ? "<span class='" + d + "'>" : "") + i + (s ? "</span>" : "") + ((l = (u = A ? _ : M) && o !== G) ? "<span class='" + u + "'>" : "") + w + a + (l ? "</span>" : "") : i + w + a, m[g] = "&nbsp;" === q && ~c.indexOf("  ") ? c.split("  ").join("&nbsp;&nbsp;") : c
                            }
                        };
                    f.emojiSafeSplit = n, f.getText = o, s() && c.registerPlugin(f), e.wordScramble = f, e.default = f, "undefined" == typeof window || window !== e ? Object.defineProperty(e, "__esModule", {
                        value: !0
                    }) : delete e.default
                }(t)
            },
            531: (e, t, o) => {
                "use strict";
                var r = o(880),
                    n = o(192),
                    i = o(566),
                    a = o(591);
                r.os.registerPlugin(i.J, n.ScrollTrigger), globalThis.isTouchDevice = !1, globalThis.isPhone = !1, globalThis.isScrolled = !1, globalThis.isMenuOpen = !1, globalThis.viewport = {
                    width: window.innerWidth,
                    height: window.innerHeight
                }, globalThis.dom = {}, dom.hero = document.querySelector(".hero"), dom.about = document.querySelector(".about"), dom.work = document.querySelector(".work"), dom.lab = document.querySelector(".lab"), dom.siteDetails = document.querySelector(".site-details"), dom.footer = document.querySelector("footer"), dom.headerPanelsH2 = document.querySelectorAll(".header-panel .large-text-wrapper"), globalThis.isHome = !1, globalThis.isAbout = !1, globalThis.isWork = !1, globalThis.isLab = !1, globalThis.isLabSubpages = !1, globalThis.isOverview = !1, globalThis.isFeedback = !1, globalThis.isQuotesPage = "undefined" != typeof isQuotesPage && isQuotesPage, globalThis.isWebDesignPage = "undefined" != typeof isWebDesignPage && isWebDesignPage, globalThis.isHub = "undefined" != typeof isHub && isHub, globalThis.isStandardPage = "undefined" != typeof isStandardPage && isStandardPage, globalThis.isBlogPage = "undefined" != typeof isBlogPage && isBlogPage, globalThis.isVibeGames = "undefined" != typeof isVibeGames && isVibeGames, globalThis.isAnalyticsDisabled = !1, globalThis.isLocalhost = !1, globalThis.isDev = !1, globalThis.isProd = !1, globalThis.isMacOS = !1, globalThis.isFirefox = !1;
                class s {
                    constructor() {
                        // document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
                    }
                    checkPerformance() {
                        globalThis.isHighFPS = !0, "low" === localStorage.getItem("performanceMode") && (isHighFPS = !1), isHighFPS ? r.os.ticker.fps(60) : (r.os.ticker.fps(30), console.log("%cLow FPS detected - Performance Mode set to LOW", "color: #f54223"))
                    }
                    initTouchDetect() {
                        matchMedia("(pointer: coarse)").matches ? (isTouchDevice = !0, (window.matchMedia("(max-width: 490px)").matches || window.matchMedia("(min-width: 490px) and (max-width: 810px) and (orientation: landscape) and (pointer: coarse)").matches) && (isPhone = !0)) : isTouchDevice = !1
                    }
                    initLocalhostDetect() {
                        const e = window.location.origin;
                        (e.includes("localhost") || e.includes("127.0.0.1") || e.includes(":9001") || e.includes(":9002")) && (isLocalhost = !0, isProd = !0)
                    }
                    browserDetection() {
                        navigator.platform.indexOf("Mac") > -1 && (isMacOS = !0), isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1 || "undefined" != typeof InstallTrigger
                    }
                    fontLoad(e, t, o) {
                        const r = new FontFace(e, t, o);
                        document.fonts.add(r)
                    }
                    customScrollbar() {
                        const e = /iP(hone|ad|od)/.test(navigator.platform) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1,
                            t = /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);
                        isTouchDevice && (e || t) || (0, a.ae)(document.body, {
                            overflow: {
                                x: "hidden"
                            }
                        })
                    }
                    initialAnimation() {
                        globalThis.initialAnimationTL = r.os.timeline().to(".header-nav a.logo .scramble-text", {
                            opacity: 1,
                            text: "HOME",
                            duration: 1
                        }, 0).to([".header-nav .logo .bracket", ".header-nav .menu-btn-wrapper .text-btn .bracket"], {
                            opacity: 1,
                            duration: .25
                        }, .5)
                    }
                    customConsoleMsg() {

                    }

                    umamiScriptInit() {
                        if ("true" === localStorage.getItem("analyticsDisabled") || isLocalhost) return;
                        const e = document.createElement("script");
                        e.defer = !0, e.src = "", e.setAttribute("data-website-id", ""), e.setAttribute("data-host-url", ""), document.head.appendChild(e)
                    }
                    authorCreditHtml() {
                        const e = document.createComment("");
                        document.documentElement.prepend(e)
                    }
                }
                class l {
                    constructor() {}
                    customCursor() {
                        const e = document.querySelector(".cursor");
                        let t = r.os.quickSetter(e, "x", "px"),
                            o = r.os.quickSetter(e, "y", "px");
                        window.addEventListener("mousemove", (e => {
                            requestAnimationFrame((() => {
                                t(e.clientX), o(e.clientY)
                            }))
                        }), !1)
                    }
                    cursorHover() {
                        const e = document.querySelectorAll(".cursor-hover"),
                            t = document.querySelectorAll(".cursor-hover2"),
                            o = document.querySelector(".cursor .pointerCursor"),
                            n = document.querySelector(".cursor .pointerHand"),
                            i = document.querySelector(".cursor .pointerHand2"),
                            a = document.querySelectorAll(".no-cursor");
                        e.forEach((e => {
                            e.addEventListener("mouseenter", (() => {
                                r.os.set(o, {
                                    display: "none"
                                }), r.os.set(n, {
                                    display: "block"
                                })
                            })), e.addEventListener("mouseleave", (() => {
                                r.os.set(o, {
                                    display: "block"
                                }), r.os.set(n, {
                                    display: "none"
                                })
                            }))
                        })), t.forEach((e => {
                            e.addEventListener("mouseenter", (() => {
                                r.os.set(o, {
                                    display: "none"
                                }), r.os.set(i, {
                                    display: "block"
                                })
                            })), e.addEventListener("mouseleave", (() => {
                                r.os.set(o, {
                                    display: "block"
                                }), r.os.set(i, {
                                    display: "none"
                                })
                            }))
                        })), a.forEach((e => {
                            e.addEventListener("mouseenter", (() => {
                                r.os.set(o, {
                                    display: "none"
                                }), r.os.set(n, {
                                    display: "none"
                                })
                            })), e.addEventListener("mouseleave", (() => {
                                r.os.set(o, {
                                    display: "block"
                                })
                            }))
                        }))
                    }
                    logoHover() {
                        const e = document.querySelector(".header-nav .logo"),
                            t = e.querySelector(".scramble-text");
                        let o, n, i = r.os.set(document.body, {}),
                            a = r.os.set(document.body, {});
                        e.addEventListener("mouseenter", (() => {
                            n = !1, o = setTimeout((() => {
                                n = !0, a.kill(), i = isLabSubpages || isStandardPage || isBlogPage || isWebDesignPage || isVibeGames ? r.os.to(t, {
                                    duration: .9,
                                    ease: "none",
                                    text: {
                                        value: t.dataset.text2
                                    }
                                }) : r.os.to(t, {
                                    duration: .9,
                                    ease: "none",
                                    scrambleText: {
                                        text: t.dataset.text2,
                                        chars: " ",
                                        speed: .3
                                    }
                                })
                            }), 100)
                        })), e.addEventListener("mouseleave", (() => {
                            clearTimeout(o), n && (i.kill(), isLabSubpages || isStandardPage || isBlogPage || isVibeGames ? (t.textContent = "", a = r.os.to(t, {
                                duration: 1,
                                ease: "none",
                                text: {
                                    value: t.dataset.text1
                                }
                            })) : a = r.os.to(t, {
                                duration: 1,
                                ease: "none",
                                scrambleText: {
                                    text: t.dataset.text1,
                                    chars: "&#9744;"
                                }
                            }))
                        }))
                    }
                    pixelGridInit() {
                        const e = {
                                base: "#ffc900",
                                darker: {
                                    min: 166,
                                    max: 184
                                },
                                lighter: {
                                    min: 215,
                                    max: 229
                                }
                            },
                            t = document.querySelector(".header-nav .pixel-grid");
                        let o;
                        for (let e = 0; e < 96; e++) o = document.createElement("div"), t.appendChild(o);
                        const r = document.querySelectorAll(".header-nav .pixel-grid div");
                        if (isLab || isLabSubpages || isWork || isAbout || isBlogPage) r.forEach((t => {
                            const o = Math.random(),
                                r = e;
                            if (o < .8) t.style.backgroundColor = r.base;
                            else if (o < .9) {
                                const e = Math.floor(Math.random() * (r.darker.max - r.darker.min + 1)) + r.darker.min;
                                t.style.backgroundColor = `rgb(255, ${e}, 0)`
                            } else {
                                const e = Math.floor(Math.random() * (r.lighter.max - r.lighter.min + 1)) + r.lighter.min;
                                t.style.backgroundColor = `rgb(255, ${e}, 0)`
                            }
                        }));
                        else if (isHub || isVibeGames) {
                            let e;
                            e = isHub ? [{
                                r: 65,
                                g: 88,
                                b: 208
                            }, {
                                r: 200,
                                g: 80,
                                b: 192
                            }, {
                                r: 255,
                                g: 204,
                                b: 112
                            }] : [{
                                r: 132,
                                g: 35,
                                b: 141
                            }, {
                                r: 0,
                                g: 0,
                                b: 0
                            }, {
                                r: 255,
                                g: 201,
                                b: 0
                            }], r.forEach((t => {
                                const o = 2 * Math.random(),
                                    r = e[Math.floor(o)],
                                    n = e[Math.ceil(o)],
                                    i = o % 1,
                                    a = Math.round(r.r + (n.r - r.r) * i),
                                    s = Math.round(r.g + (n.g - r.g) * i),
                                    l = Math.round(r.b + (n.b - r.b) * i);
                                t.style.backgroundColor = `rgb(${a}, ${s}, ${l})`
                            }))
                        } else if (isQuotesPage) r.forEach((e => {
                            const t = Math.floor(256 * Math.random());
                            e.style.backgroundColor = `rgb(${t}, ${t}, ${t})`
                        }));
                        else if (isOverview) {
                            const e = getComputedStyle(document.documentElement).getPropertyValue("--color-prime").trim(),
                                t = document.createElement("div");
                            t.style.color = e, document.body.appendChild(t);
                            const o = getComputedStyle(t).color.match(/\d+/g).map(Number);
                            document.body.removeChild(t);
                            const n = o[0] / 255,
                                i = o[1] / 255,
                                a = o[2] / 255,
                                s = Math.max(n, i, a),
                                l = Math.min(n, i, a);
                            let c, d, u = (s + l) / 2;
                            if (s === l) c = d = 0;
                            else {
                                const e = s - l;
                                switch (d = u > .5 ? e / (2 - s - l) : e / (s + l), s) {
                                    case n:
                                        c = (i - a) / e + (i < a ? 6 : 0);
                                        break;
                                    case i:
                                        c = (a - n) / e + 2;
                                        break;
                                    case a:
                                        c = (n - i) / e + 4
                                }
                                c /= 6
                            }
                            const p = e,
                                h = `hsl(${360*c}deg, ${100*d}%, ${80*u}%)`,
                                m = `hsl(${360*c}deg, ${100*d}%, ${Math.min(100,120*u)}%)`;
                            r.forEach((e => {
                                const t = Math.random();
                                e.style.backgroundColor = t < .8 ? p : t < .9 ? h : m
                            }))
                        }
                    }
                    menuInit() {
                        const e = document.querySelector(".header-nav"),
                            t = e.querySelector(".menu-btn-wrapper"),
                            o = e.querySelector(".text-btn"),
                            i = e.querySelector(".logo"),
                            a = e.querySelectorAll(".overlayMenu .rowLink a"),
                            s = e.querySelectorAll(".overlayMenu .icons-c svg"),
                            l = e.querySelector(".pixel-grid"),
                            c = e.querySelector(".header-nav-top");
                        let d, u = "#000",
                            p = "#fff";
                        isAbout || isWork || isLab || isLabSubpages || isQuotesPage || isStandardPage || isBlogPage || isHub ? u = "#fff" : isWebDesignPage && (u = document.querySelector("header").dataset.color, r.os.set([i, o], {
                            clearProps: "color"
                        }), p = "#ff0000"), isAbout && isPhone && (u = "#000", r.os.set(i, {
                            color: "#000"
                        }), r.os.set(o, {
                            color: "#000"
                        }), r.os.set(".header-nav .menu-btn-wrapper .hamburger-btn path", {
                            stroke: "#000"
                        })), this.pixelGridInit();
                        const h = document.querySelectorAll(".header-nav .pixel-grid div");
                        document.querySelector(".header-nav .overlayMenu-c").style.contentVisibility = "visible";
                        let m = r.os.timeline({
                            paused: !0
                        });
                        m.set(l, {
                            display: "grid"
                        }, 0), m.set(h, {
                            willChange: "opacity"
                        }, 0), m.fromTo(h, {
                            opacity: 0
                        }, {
                            opacity: 1,
                            duration: .001,
                            stagger: {
                                amount: .5,
                                from: "random",
                                grid: "auto"
                            },
                            onComplete: () => {
                                r.os.set(".overlayMenu", {
                                    display: "block"
                                }, 0)
                            }
                        }, 0), m.to(h, {
                            opacity: 0,
                            duration: .001,
                            stagger: {
                                amount: .4,
                                from: "random",
                                grid: "auto"
                            },
                            onComplete: () => {
                                r.os.set(h, {
                                    willChange: "auto"
                                })
                            }
                        }, ">"), d = m.totalDuration();
                        const g = r.os.timeline({
                            paused: !0
                        });
                        g.to(".header-nav .text-btn .me", {
                            x: -6,
                            opacity: 0,
                            duration: .5
                        }, 0), g.to(".header-nav .text-btn .nu", {
                            x: 6,
                            opacity: 0,
                            duration: .5
                        }, 0), g.fromTo(".header-nav .text-btn .x-sign", {
                            scale: 0
                        }, {
                            scale: 1,
                            opacity: 1,
                            duration: .5
                        }, 0), g.to([i, o], {
                            color: p,
                            duration: .5
                        }, 1);
                        const f = r.os.timeline({
                            paused: !0
                        });
                        f.to(".header-nav .text-btn .me", {
                            x: 6,
                            opacity: 1,
                            duration: .5
                        }, 0), f.to(".header-nav .text-btn .nu", {
                            x: -6,
                            opacity: 1,
                            duration: .5
                        }, 0), f.to(".header-nav .text-btn .x-sign", {
                            scale: 0,
                            opacity: 0,
                            duration: .5
                        }, 0), isWebDesignPage ? f.set([i, o], {
                            color: u
                        }, .5) : f.to([i, o], {
                            color: u,
                            duration: .5
                        }, .5);
                        const w = r.os.timeline({
                                paused: !0
                            }).to(".header-nav .hamburger-btn path", {
                                stroke: p,
                                duration: .5
                            }, 1).to(i, {
                                color: p,
                                duration: .5
                            }, 1),
                            b = r.os.timeline({
                                paused: !0
                            }).to(".header-nav .hamburger-btn path", {
                                stroke: u,
                                duration: .3
                            }, .2).set(i, {
                                color: u,
                                duration: .5
                            }, 1);

                        function v() {
                            m.timeScale(1.6).reverse(), setTimeout((() => {
                                window.removeEventListener("DOMMouseScroll", _, !1), window.removeEventListener(D, _, I), window.removeEventListener("touchmove", _, I), window.removeEventListener("keydown", A, !1), isWebDesignPage && (r.os.set(document.body, {
                                    position: "static",
                                    width: "auto",
                                    top: "auto",
                                    overflow: "unset"
                                }), n.ScrollTrigger.getAll().forEach((e => {
                                    e.resume()
                                }))), r.os.set(".overlayMenu", {
                                    display: "none"
                                })
                            }), 300)
                        }
                        let y = r.os.timeline({
                                paused: !0
                            }),
                            x = d - .3;
                        isTouchDevice && (x = d - .3), y.fromTo(a, {
                            opacity: 0,
                            y: "200%"
                        }, {
                            opacity: 1,
                            y: 0,
                            duration: () => isTouchDevice ? .5 : 1.5,
                            stagger: .1,
                            ease: "power4.out"
                        }, x), y.fromTo(s, {
                            opacity: 0
                        }, {
                            opacity: 1,
                            duration: .5,
                            stagger: .1
                        }, d + .2);
                        let S = r.os.timeline({
                            paused: !0
                        });
                        S.set(".header-nav .overlayMenu .rowLink .link-w", {
                            clipPath: "unset"
                        }, 0), S.set(a, {
                            opacity: 1,
                            y: 0
                        }, x), S.fromTo(s, {
                            opacity: 0
                        }, {
                            opacity: 1,
                            duration: .5,
                            stagger: .1
                        }, d + .2);
                        const E = r.os.timeline({
                                paused: !0
                            }),
                            L = 13,
                            k = 10,
                            T = 12,
                            C = 12;
                        if (isTouchDevice || (isOverview ? E.to(c, {
                                top: L,
                                duration: .7,
                                ease: "power4.out"
                            }, d - .3) : isBlogPage ? E.to(c, {
                                top: k,
                                duration: .7,
                                ease: "power4.out"
                            }, d - .3) : isWebDesignPage ? E.to(c, {
                                top: T,
                                duration: .7,
                                ease: "power4.out"
                            }, d - .3) : isQuotesPage && E.to(c, {
                                top: C,
                                duration: .7,
                                ease: "power4.out"
                            }, d - .3)), isTouchDevice || isLabSubpages || y.fromTo(".header-nav .overlayMenu .row", {
                                borderColor: "#000000"
                            }, {
                                borderColor: "#1f1f1f",
                                duration: 1,
                                ease: "none",
                                immediateRender: !1
                            }, d + .3), t.addEventListener("click", P), isQuotesPage) {
                            t.addEventListener("touchstart", P), i.addEventListener("touchstart", (() => {
                                window.open("/", "_self")
                            }));
                            document.querySelectorAll(".header-nav .overlayMenu .icons-c a").forEach((e => {
                                e.addEventListener("touchstart", (t => {
                                    t.preventDefault(), window.open(e.href, "_self")
                                }))
                            }))
                        }

                        function P(o) {
                            t.classList.toggle("active"), e.classList.toggle("active"), isQuotesPage && o.preventDefault(), t.classList.contains("active") ? (m.timeScale(1).restart(), isHighFPS && !isTouchDevice ? y.restart() : S.restart(), b.progress(1).pause(), viewport.width >= 490 ? g.restart() : w.restart(), E.restart(), function() {
                                if (window.addEventListener("DOMMouseScroll", _, !1), window.addEventListener(D, _, I), window.addEventListener("touchmove", _, I), window.addEventListener("keydown", A, !1), isWebDesignPage) {
                                    const e = window.scrollY;
                                    r.os.set(document.body, {
                                        position: "fixed",
                                        width: "100%",
                                        top: -e,
                                        overflow: "hidden"
                                    }), n.ScrollTrigger.getAll().forEach((e => {
                                        console.log("trigger", e), e.pause()
                                    }))
                                }
                            }(), globalThis.isMenuOpen = !0, t.setAttribute("aria-expanded", !0), document.body.style.overflow = "hidden", isLabSubpages || isQuotesPage || r.os.set("body>.os-scrollbar", {
                                display: "none"
                            }), isWebDesignPage && r.os.set(".hand", {
                                display: "none"
                            })) : (v(), globalThis.isMenuOpen = !1, isHighFPS && !isTouchDevice ? y.progress(1) : S.progress(1), w.progress(1).pause(), f.restart(), b.restart(), E.reverse(), t.setAttribute("aria-expanded", !1), r.os.set(i, {
                                clearProps: "display",
                                delay: .4
                            }), document.body.style.overflow = "unset", isLabSubpages || isQuotesPage || r.os.set("body>.os-scrollbar", {
                                display: "unset"
                            }), isWebDesignPage && r.os.set(".hand", {
                                display: "block",
                                delay: .6
                            }))
                        }
                        matchMedia("(max-width: 490px)").addEventListener("change", (e => {
                            e.matches ? isMenuOpen ? r.os.set(".header-nav .menu-btn-wrapper .hamburger-btn path", {
                                stroke: p,
                                delay: 1.1
                            }) : r.os.set(".header-nav .menu-btn-wrapper .hamburger-btn path", {
                                stroke: u
                            }) : isMenuOpen ? r.os.set([i, o], {
                                color: p,
                                delay: 1.1
                            }) : r.os.set([i, o], {
                                color: u
                            })
                        }));
                        const M = {
                            37: 1,
                            38: 1,
                            39: 1,
                            40: 1
                        };

                        function _(e) {
                            e.preventDefault()
                        }

                        function A(e) {
                            if (M[e.keyCode]) return _(e), !1
                        }
                        let q = !1;
                        try {
                            window.addEventListener("test", null, Object.defineProperty({}, "passive", {
                                get: function() {
                                    return q = !0
                                }
                            }))
                        } catch (e) {}
                        let I = !!q && {
                                passive: !1
                            },
                            D = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";
                        if (!isTouchDevice) {
                            document.querySelectorAll(".overlayMenu .rowLink a").forEach((e => {
                                const t = r.os.timeline({
                                    paused: !0
                                }).to(e.querySelector(".spanCube"), {
                                    duration: .1,
                                    rotateX: 90,
                                    z: -100,
                                    ease: "power2.out"
                                }, 0).to(e.querySelector(".spanCube .front"), {
                                    duration: .1,
                                    opacity: 0,
                                    ease: "power2.out"
                                }, 0).to(e.querySelector(".spanCube .back"), {
                                    duration: .1,
                                    opacity: 1,
                                    ease: "power2.out"
                                }, 0);
                                e.addEventListener("mouseenter", (() => {
                                    e.querySelector(".spanCube") && t.restart()
                                })), e.addEventListener("mouseleave", (() => {
                                    e.querySelector(".spanCube") && t.progress(0).pause()
                                }))
                            }))
                        }
                        let H, G = r.os.timeline({
                            paused: !0
                        });

                        function R(e, t) {
                            e.preventDefault();
                            const o = t.href,
                                n = new URL(o).pathname;
                            H = n.includes("about/") ? "#000000" : n.includes("work/") || n.includes("lab/") ? "#252525" : n.includes("hub/") ? "#d9d9d9" : n.includes("minimal/") ? "#ffffff" : "#000000", r.os.set(".header-nav .overlayMenu-c .linkOpen", {
                                backgroundColor: H
                            }), G.restart(), G.eventCallback("onComplete", (() => {
                                setTimeout((() => {
                                    window.location.href = o
                                }), 10)
                            }))
                        }
                        G.fromTo(h, {
                            opacity: 0
                        }, {
                            opacity: 1,
                            duration: .001,
                            stagger: {
                                amount: .5,
                                from: "random",
                                grid: "auto"
                            },
                            onComplete: () => {
                                r.os.set(".header-nav .overlayMenu-c .linkOpen", {
                                    opacity: 1
                                })
                            }
                        }, 0), G.to(h, {
                            opacity: 0,
                            duration: .001,
                            stagger: {
                                amount: .4,
                                from: "random",
                                grid: "auto"
                            },
                            onComplete: () => {
                                r.os.set(h, {
                                    willChange: "auto"
                                })
                            }
                        }, ">"), a.forEach((e => {
                            e.addEventListener("click", (t => R(t, e))), isQuotesPage && e.addEventListener("touchstart", (t => {
                                t.preventDefault(), R(t, e)
                            }))
                        })), window.addEventListener("pageshow", (function(e) {
                            e.persisted && window.location.reload()
                        }))
                    }
                }
                var c = o(437),
                    d = o(922);
                r.os.registerPlugin(n.ScrollTrigger);
                let u, p, h, m, g = 0;
                class f {
                    constructor() {}
                    footerAnimation() {
                        const e = dom.footer.querySelector(".canvas-wrapper"),
                            t = document.querySelector("footer .email-container"),
                            o = t.querySelectorAll("a.email-link");
                        let i, a, s = r.os.timeline(),
                            l = r.os.to(t, {}),
                            p = r.os.to(dom.footer, {}),
                            g = r.os.set(dom.footer, {}),
                            f = r.os.matchMedia();
                        f.add("(max-width: 490px)", (() => {
                            g = r.os.to(t, {
                                x: "-150vw",
                                repeat: -1,
                                ease: "none",
                                duration: 6,
                                paused: !0
                            })
                        })), f.add("(min-width: 491px)", (() => {
                            g = r.os.to(t, {
                                x: "-100vw",
                                repeat: -1,
                                ease: "none",
                                duration: 8
                            })
                        })), o.forEach((e => {
                            e.addEventListener("mouseenter", (t => {
                                i = setTimeout((() => {
                                    r.os.to(g, {
                                        timeScale: 0,
                                        duration: 1
                                    }), r.os.to(t.target, {
                                        color: "#FFC900",
                                        duration: 1
                                    }), l = r.os.to(e.querySelector(".copied-msg"), {
                                        text: "> Contact us today!",
                                        duration: 1
                                    }), s.pause()
                                }), 100)
                            })), e.addEventListener("mouseleave", (() => {
                                clearTimeout(i), r.os.to(o, {
                                    color: "#ffffff",
                                    duration: 1
                                }), r.os.to(g, {
                                    timeScale: 1,
                                    duration: 1
                                }), l.progress(1).pause(), r.os.to(e.querySelector(".copied-msg"), {
                                    text: "",
                                    duration: .5
                                }), s.play()
                            })), e.addEventListener("click", (() => {
                                document.body.focus(), navigator.clipboard.writeText("").then((() => {}))
                            }))
                        }));
                        !isHighFPS || isPhone || m || (() => {
                            this.footerGrid = {};
                            try {
                                this.footerGrid.renderer = new c.JeP({
                                    powerPreference: isFirefox ? "default" : "high-performance",
                                    failIfMajorPerformanceCaveat: !1,
                                    alpha: !0,
                                    antialias: !0,
                                    stencil: !1
                                }), this.footerGrid.renderer.setSize(e.offsetWidth, e.offsetHeight), e.prepend(this.footerGrid.renderer.domElement), this.footerGrid.scene = new d.Z58, this.footerGrid.camera = new d.ubm(75, e.offsetWidth / e.offsetHeight, .01, 1e3), this.footerGrid.camera.position.set(0, 0, 70), this.footerGrid.scene.add(this.footerGrid.camera);
                                var t = new d.$p8(16777215, 4.5);
                                isLab && (t.intensity = 7.5), this.footerGrid.scene.add(t);
                                let o = new d.bdM(600, 100, 20, 10),
                                    r = new d.G_z({
                                        depthTest: !1
                                    });
                                a = new d.eaF(o, r), a.castShadow = !1, a.receiveShadow = !1, a.rotation.x = -.25 * Math.PI, isLab && (a.rotation.x = -.1), this.footerGrid.scene.add(a);
                                const n = window.matchMedia("(min-width: 1101px)"),
                                    i = e => {
                                        e.matches ? (a.position.z = 0, isLab || (this.footerGrid.camera.zoom = .8, this.footerGrid.scene.fog = new d.jUj(2434341, 65, 78))) : (a.position.z = 10, isLab || (this.footerGrid.camera.zoom = .6, this.footerGrid.scene.fog = new d.jUj(2434341, 50, 68)))
                                    };
                                isLab && (this.footerGrid.camera.zoom = 1, this.footerGrid.scene.fog = new d.jUj(2434341, 40, 80)), i(n), n.addEventListener && n.addEventListener("change", i);
                                let s = "/assets/img/c/textureFooterPlane0.avif";
                                isProd && (s = "/assets/img/c/textureFooterPlane0.avif"), this.textureLoading(s, this.footerGrid.renderer).then((e => {
                                    e.anisotropy = this.footerGrid.renderer.capabilities.getMaxAnisotropy(), a.material.map = e, e.needsUpdate = !0
                                }))
                            } catch (e) {
                      
                            }
                        })(), 
                            function() {
                                const e = document.querySelector("footer .scroll-to-top");
                                e.addEventListener("click", (() => {
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth"
                                    })
                                })), p = r.os.fromTo("footer .scroll-to-top svg.arrow-small path", {
                                    y: 18
                                }, {
                                    y: -18,
                                    duration: 2,
                                    ease: "power2.in",
                                    repeat: -1,
                                    paused: !0
                                }), e.addEventListener("mouseenter", (() => {
                                    r.os.to(p, {
                                        timeScale: 3,
                                        duration: 1
                                    })
                                })), e.addEventListener("mouseleave", (() => {
                                    r.os.to(p, {
                                        timeScale: 1,
                                        duration: 1
                                    })
                                }))
                            }(), setTimeout((() => {
                                if (n.ScrollTrigger.create({
                                        trigger: dom.footer,
                                        onEnter: () => {
                                            isHighFPS && !isPhone && s.restart(), g.restart(), p.restart(), h = !0
                                        },
                                        onLeaveBack: () => {
                                            isHighFPS && !isPhone && s.progress(1).pause(), g.progress(1).pause(), p.progress(1).pause(), h = !1
                                        }
                                    }), isHighFPS && !isPhone && !m) {
                                    u = new d.zD7, isHighFPS ? this.limitFPS(1 / 60) : this.limitFPS(1 / 30);
                                    const e = this;
                                    new ResizeObserver((function(t) {
                                        e.onResize(t[0].contentRect)
                                    })).observe(document.body)
                                }
                            }), 500), isTouchDevice && this.updateAfterOrientationChange()
                    }
                    updateAfterOrientationChange() {
                        screen.orientation && "function" == typeof screen.orientation.addEventListener ? screen.orientation.addEventListener("change", (() => {
                            this.onResize(), n.ScrollTrigger.refresh(!0)
                        })) : "ontouchstart" in window && window.addEventListener("orientationchange", (() => {
                            this.onResize(), n.ScrollTrigger.refresh(!0)
                        }))
                    }
                    textureLoading(e, t) {
                        let o;
                        if ("undefined" == typeof createImageBitmap || navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
                            let r = new d.Tap;
                            return new Promise((o => {
                                r.load(e, (e => {
                                    e.colorSpace = d.er$, e.anisotropy = 16, t.initTexture(e), o(e)
                                }))
                            }))
                        } {
                            const n = new d.Kzg;

                            function i(e) {
                                return new Promise((t => {
                                    n.load(e, t)
                                }))
                            }
                            return n.setOptions({
                                imageOrientation: "flipY"
                            }), i(e).then((e => {
                                o = new d.GOR(e), o.colorSpace = d.er$
                            })).then((() => (t.initTexture(o), o)))
                        }
                    }
                    onResize() {
                        !isHighFPS || isPhone || m || (p = {
                            width: dom.footer.offsetWidth,
                            height: dom.footer.offsetHeight
                        })
                    }
                    limitFPS(e) {
                        this.rafAnimate = requestAnimationFrame(this.limitFPS.bind(this, e)), g += u.getDelta(), g > e && (this.loopRAF(), g %= e)
                    }
                    stopRafAnimate() {
                        cancelAnimationFrame(rafAnimate)
                    }
                    loopRAF() {
                        h && isHighFPS && !isPhone && !m
                    }
                    copyrightUpdate() {
                 //       dom.footer.querySelector(".row .column:nth-of-type(2) .author .year").textContent = (new Date).getFullYear()
                    }
                }
                var w = o(323);
                r.os.registerPlugin(n.ScrollTrigger, w.wordScramble);
                class b {
                    constructor() {
                        dom.sectionsContainer = document.querySelector("main .sections-container"), dom.hero = dom.sectionsContainer.querySelector(".hero"), dom.project = dom.sectionsContainer.querySelector(".project"), dom.continuousPattern = document.querySelector("main .stack-container .continuous-pattern"), dom.heroBg = document.querySelector("main .stack-container .stack-bg-container .hero-bg"), dom.projectBg = document.querySelector("main .stack-container .stack-bg-container .project-bg"), new ResizeObserver((e => {
                            this.onResize(e[0].contentRect)
                        })).observe(document.body), setTimeout((() => {
                            this.onResize()
                        }), 1500)
                    }
                    // onResize() {
                    //     viewport.width  = window.innerWidth;
                    //     viewport.height = window.innerHeight;

                    //     requestAnimationFrame(() => {
                    //         if (dom.continuousPattern) {
                    //         const isFixed = getComputedStyle(dom.continuousPattern).position === "fixed";
                    //         dom.continuousPattern.style.height = isFixed
                    //             ? ""  // no manual height for fixed overlays
                    //             : (dom.sectionsContainer.offsetHeight + "px");
                    //         }

                    //         dom.heroBg.style.height    = dom.hero.offsetHeight + "px";
                    //         dom.projectBg.style.height = dom.project.offsetHeight + "px";
                    //     });
                    //     }
                    onResize() {
                        viewport.width = window.innerWidth, viewport.height = window.innerHeight, requestAnimationFrame((() => {
                            dom.continuousPattern.style.height = dom.sectionsContainer.offsetHeight + "px", dom.heroBg.style.height = dom.hero.offsetHeight + "px", dom.projectBg.style.height = dom.project.offsetHeight + "px"
                        }))
                    }
                    whenImageLoadedRecalculate() {
                        const e = document.querySelector(".project .video-wrapper video"),
                            t = document.querySelector(".project .screenshot"),
                            o = document.querySelector(".project .mobile-wrapper img:first-child");
                        let r, n, i, a, s, l;
                        s = new Image, l = new Image, t && (s.src = t.src), o && (l.src = o.src), a = document.createElement("video");
                        const c = e.querySelector("source");
                        a.src = c ? c.src : e.src, a.addEventListener("loadeddata", (() => {
                            r = !0, r && n && i && this.onResize()
                        })), t && (s.addEventListener("load", (() => {
                            n = !0, r && n && i && this.onResize()
                        })), l.addEventListener("load", (() => {
                            i = !0, r && n && i && this.onResize()
                        })))
                    }
                    showNav() {
                        const e = document.querySelector(".hero .left-part .num"),
                            t = document.querySelector(".hero .left-part .num span:nth-of-type(1)"),
                            o = document.querySelector(".hero .left-part .num span:nth-of-type(2)");
                        r.os.set(t, {
                            y: 200
                        }), r.os.set(o, {
                            y: -200
                        }), r.os.to(t, {
                            y: 0,
                            opacity: 1,
                            duration: 1
                        }), r.os.to(o, {
                            y: 0,
                            opacity: 1,
                            duration: 1
                        }), r.os.to(e, {
                            borderColor: "#000",
                            duration: .5
                        })
                    }
                    bgPatternAnimation() {
						console.log("BG updating...")
                        const e = document.querySelector("main .stack-container .continuous-pattern");
						r.os.to(e, {
                            duration: 1,
                            y: -64,
							// duration: 50,
							ease: "linear",
						   // backgroundPosition: "0 -320px",
							// y: "-50%",
							repeat: -1
						})
                    }
                    pixelateCarouselInit() {
                        let e, t, o, r, n, i, a, s, l, c, d, u, p, h = 0,
                            m = [.5, 1, 3, 2, 4, 2, 5.5, 6, 7, 10, 20, 40, 80],
                            g = !0,
                            f = !0,
                            w = !0,
                            b = !1,
                            v = 0;
                        e = document.querySelector(".hero .carousel-wrapper .carousel li.item .canvas-wrap"), t = e.querySelector("canvas");
                        const y = document.querySelectorAll(".hero .carousel-wrapper .carousel li.item img"),
                            x = document.querySelectorAll(".hero .carousel-wrapper .carousel li.item"),
                            S = document.querySelectorAll(".hero .carousel-wrapper .carousel-dots li");

                        function E(e) {
                            return window._carouselImageCache || (window._carouselImageCache = {}), window._carouselImageCache[e.src] ? Promise.resolve(window._carouselImageCache[e.src]) : new Promise(((t, o) => {
                                const r = new Image;
                                r.src = e.src, r.complete ? (window._carouselImageCache[e.src] = r, t(r)) : (r.onload = () => {
                                    window._carouselImageCache[e.src] = r, t(r)
                                }, r.onerror = o => {
                                    console.error("Failed to load image:", e.src, o), t(e)
                                })
                            }))
                        }

                        function L() {
                            t.width = e.offsetWidth, t.height = e.offsetHeight, t.style.width = e.offsetWidth + "px", t.style.height = e.offsetHeight + "px"
                        }

                        function k(f) {
                            if (h < m.length) u = setTimeout((() => {
                                if (!w) return;
                                p && (y.forEach((e => {
                                    e.style.opacity = 0
                                })), y[v].style.opacity = 1, S.forEach((e => {
                                    e.classList.remove("active")
                                })), S[v].classList.add("active")), p = !1;
                                const d = function(d) {
                                    try {
                                        o.clearRect(0, 0, t.width, t.height), t.width === e.offsetWidth && t.height === e.offsetHeight || (o.setTransform(1, 0, 0, 1, 0, 0), L()), r = d.naturalWidth / d.naturalHeight, a = t.width, s = t.height, l = 0, c = 0, a / s > r ? (s = Math.round(t.width / r), c = (t.height - s) / 2) : (a = Math.round(t.height * r), l = (t.width - a) / 2), n = g ? 1 : m[h], i = .01 * n, o.imageSmoothingEnabled = !1, o.mozImageSmoothingEnabled = !1, o.webkitImageSmoothingEnabled = !1, o.msImageSmoothingEnabled = !1;
                                        const u = Math.max(1, Math.floor(t.width * i)),
                                            p = Math.max(1, Math.floor(t.height * i));
                                        return o.drawImage(d, 0, 0, u, p), o.drawImage(t, 0, 0, u, p, l, c, a, s), !0
                                    } catch (e) {
                                        return console.error("Error in drawImage:", e, "img:", d.src, "complete:", d.complete, "naturalSize:", d.naturalWidth, "x", d.naturalHeight), !1
                                    }
                                }(f);
                                d ? (h++, requestAnimationFrame((() => {
                                    k(f)
                                }))) : (console.warn("Drawing failed, skipping to next step"), h++, requestAnimationFrame((() => {
                                    k(f)
                                })))
                            }), 0 === h ? 240 : 120);
                            else {
                                h = 0, y[v].style.opacity = 1, t.style.display = "none";
                                const r = (v + 1) % y.length;
                                d = setTimeout((() => {
                                    x[r].append(e), E(y[r]).then((e => {
                                        v = r, p = !0, t.style.display = "block", o.clearRect(0, 0, t.width, t.height), w && k(e)
                                    })).catch((e => {
                                        console.error("Failed to preload next image:", e), v = r, p = !0, t.style.display = "block", w && k(y[r])
                                    }))
                                }), 4e3)
                            }
                        }
                        y.forEach((e => {
                            e.style.opacity = 0
                        })), o = t.getContext("2d"), async function() {
                            try {
                                L(), x[v].append(e), t.style.display = "block";
                                const r = await E(y[v]);
                                S.forEach((e => e.classList.remove("active"))), S[v].classList.add("active"), o.clearRect(0, 0, t.width, t.height), g = !1, f = !1, Array.from(y).slice(1).forEach((e => E(e))), setTimeout((() => {
                                    k(r), b = !0
                                }), 100)
                            } catch (e) {
                                console.error("Error initializing carousel:", e), this.carouselBasicInit()
                            }
                        }(), S.forEach(((o, r) => {
                            o.addEventListener("click", (n => {
                                v !== r && (clearTimeout(u), clearTimeout(d), S.forEach((e => {
                                    e.classList.remove("active")
                                })), o.classList.add("active"), y.forEach((e => {
                                    e.style.opacity = 0
                                })), y[r].style.opacity = 1, x[r].append(e), h = 0, v = r, p = !0, t.style.display = "block", k(y[r]))
                            }))
                        })), new IntersectionObserver((function(o) {
                            if (f || !b) return;
                            o.forEach((o => {
                                o.isIntersecting ? (w = !0, clearTimeout(u), clearTimeout(d), h = 0, p = !0, y.forEach((e => {
                                    e.style.opacity = 0
                                })), y[v].style.opacity = 1, x[v].append(e), t.style.display = "block", k(y[v])) : (w = !1, clearTimeout(u), clearTimeout(d))
                            }))
                        })).observe(dom.hero)
                    }
                    carouselBasicInit() {
                        const e = document.querySelectorAll(".hero .carousel-wrapper .carousel li.item img"),
                            t = document.querySelectorAll(".hero .carousel-wrapper .carousel-dots li");
                        document.querySelectorAll(".hero .carousel-wrapper .carousel li.item");
                        let o, n = 0,
                            i = !1;
                        const a = o => {
                                n === o || i || (i = !0, t.forEach((e => e.classList.remove("active"))), t[o].classList.add("active"), r.os.to(e[n], {
                                    opacity: 0,
                                    duration: .5,
                                    ease: "power1.out"
                                }), r.os.fromTo(e[o], {
                                    opacity: 0,
                                    scale: 1.05
                                }, {
                                    opacity: 1,
                                    scale: 1,
                                    duration: .7,
                                    ease: "power2.out",
                                    onComplete: () => {
                                        i = !1, n = o
                                    }
                                }))
                            },
                            s = () => (o && (o.kill(), o = null), o = r.os.timeline({
                                repeat: -1
                            }).call((() => a(0)), [], 0).call((() => a(1)), [], 4).call((() => a(2)), [], 8), o);
                        r.os.set(e, {
                            opacity: 0
                        }), r.os.set(e[0], {
                            opacity: 1
                        });
                        s();
                        let l = 0;
                        t.forEach(((e, t) => {
                            e.addEventListener("click", (() => {
                                const e = Date.now();
                                e - l < 500 || (l = e, n !== t && (o && (o.kill(), o = null), a(t), setTimeout((() => {
                                    o || s()
                                }), 6e3)))
                            }))
                        }))
                    }
                    scrollingTextInit() {
                        const e = document.querySelectorAll(".scrolling-text  .line1 .item"),
                            t = document.querySelectorAll(".scrolling-text  .line2 .item"),
                            o = document.querySelectorAll(".scrolling-text  .line3 .item");
                        let i;
                        isTouchDevice ? (i = r.os.timeline({}).to(e, {
                            duration: 1,
                            ease: "none",
                            x: "-20%"
                        }, 0).to(t, {
                            duration: 1,
                            ease: "none",
                            x: "10%"
                        }, 0).to(o, {
                            duration: 1,
                            ease: "none",
                            x: "-20%"
                        }, 0), n.ScrollTrigger.create({
                            trigger: ".scrolling-text",
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1,
                            animation: i,
                            toggleActions: "play pause resume pause"
                        })) : (i = r.os.timeline({}).to(e, {
                            duration: 50,
                            ease: "none",
                            x: "-100%",
                            repeat: -1
                        }, 0).to(t, {
                            duration: 35,
                            ease: "none",
                            x: "100%",
                            repeat: -1
                        }, 0).to(o, {
                            duration: 50,
                            ease: "none",
                            x: "-100%",
                            repeat: -1
                        }, 0), n.ScrollTrigger.create({
                            trigger: ".scrolling-text",
                            start: "top bottom",
                            end: "bottom top",
                            animation: i,
                            toggleActions: "play pause resume pause"
                        }))
                    }
                    cardHover() {
                        const e = document.querySelectorAll(".project .card-wrapper .card");
                        let t, o, n, i, a, s, l, c, d, u, p, h = 0,
                            m = 0,
                            g = 0;
                        const f = function(e, t) {
                            let o;
                            return function(...r) {
                                o || (e.apply(this, r), o = !0, setTimeout((() => {
                                    o = !1
                                }), t))
                            }
                        }((function(e) {
                            o = e.clientX, n = e.clientY, i = o - t.x, a = n - t.y, s = {
                                x: i - t.width / 2,
                                y: a - t.height / 2
                            }, l = s.y / 50, c = -s.x / 50, d = 5 * -c, u = 5 * l, p = 10, h = d, m = u, g = 10, r.os.to(e.target.closest(".card"), {
                                scale: 1.1,
                                rotationX: l,
                                rotationY: c,
                                transformPerspective: 500,
                                ease: "power2.out",
                                boxShadow: `${d}px ${u}px 10px 6px rgba(72, 65, 56, .3)`
                            })
                        }), 60);
                        e.forEach((e => {
                            e.addEventListener("mouseenter", (() => {
                                viewport.width < 1e3 || (t = e.getBoundingClientRect(), document.addEventListener("mousemove", f), r.os.to(e, {
                                    scale: 1.1,
                                    rotationX: 0,
                                    rotationY: 0,
                                    duration: .6
                                }))
                            })), e.addEventListener("mouseleave", (() => {
                                viewport.width < 1e3 || (document.removeEventListener("mousemove", f), r.os.to(e, {
                                    scale: 1,
                                    rotationX: 0,
                                    rotationY: 0,
                                    duration: .6,
                                    ease: "power2.out"
                                }), r.os.to(e, {
                                    duration: .3,
                                    ease: "none",
                                    onComplete: () => {
                                        r.os.to(e, {
                                            boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0)",
                                            duration: 1,
                                            ease: "none"
                                        })
                                    }
                                }))
                            }))
                        }))
                    }
                    correctURLDeveloper() {
                        const e = document.querySelector(".project .btn-wrapper a.developer-link");
                        e && (e.href = "")
                    }
                }
                class v {
                    constructor() {}
                    errorHandling() {}
                    checkWebGLSupport() {
                        try {
                            const e = document.createElement("canvas");
                            let t = e.getContext("webgl2");
                            t || (t = e.getContext("webgl") || e.getContext("experimental-webgl")), t || webGLSupportFailed("WebGL not supported");
                            const o = t.createShader(t.VERTEX_SHADER),
                                r = t.createShader(t.FRAGMENT_SHADER);
                            return o && r || webGLSupportFailed("Shader creation failed"), t.deleteShader(o), t.deleteShader(r), sessionStorage.setItem("webGLSupport", "true"), !0
                        } catch (e) {
                            this.webGLSupportFailed("WebGL support check failed - custom error: ", e)
                        }
                    }
                    webGLSupportFailed(e) {
                        sessionStorage.setItem("webGLSupport", "false"), this.webGLFailedPopup("support", e);
                        const t = new CustomEvent("manualError", {
                            detail: {
                                message: e,
                                stack: "WebGL support check failed - custom error",
                                type: "MY WARNING"
                            }
                        });
                        return window.dispatchEvent(t), console.error("webGLSupportFailed", e), !1
                    }
                    webGLFailedPopup(e, t) {
                        if (document.getElementById("webglErrorModal")) return;
                        const o = document.createElement("div");
                        o.id = "webglErrorModal", o.style.cssText = "\n         position: fixed;\n         top: 0;\n         left: 0;\n         width: 100%;\n         height: 100%;\n         background-color: rgba(0, 0, 0, 0.9);\n         display: flex;\n         justify-content: center;\n         align-items: center;\n         z-index: 200;\n         padding: 20px;\n         box-sizing: border-box;\n         cursor: auto !important;\n      ";
                        const r = document.createElement("style");
                        let n, i, a;
                        r.textContent = "\n         @font-face {\n            font-family: 'Departure Mono';\n            src: url('./assets/fonts/departureMono-Regular.woff2') format('woff2');\n            font-weight: normal;\n            font-style: normal;\n         }\n      ", document.head.appendChild(r), "support" !== e && "error" !== e && (e = "error"), "support" === e ? (n = "Ops WEBGL NOT SUPPORTED", i = `\n            <p>Your browser or device doesn't support WebGL, which is required to view the interactive content on this site.</p>\n            <p>Error details: ${t}</p>\n            <h4 style="color: #ffc900; margin-top: 20px; margin-bottom: 15px;">Possible solutions:</h4>\n            <ul style="list-style-type: disc;">\n               <li>• Update to the latest version of your browser</li>\n               <li>• Enable hardware acceleration in your browser settings</li>\n               <li>• Update your graphics drivers to the latest version</li>\n               <li>• Try a different browser (Chrome, Firefox, or Edge are recommended)</li>\n            </ul>\n         `, a = '<div class="action-link">\n            <a href="/minimal/">Visit minimal version of our site</a>\n            <p>(No WebGL required)</p>\n         </div>') : (n = "WEBGL INITIALIZATION ERROR", i = `\n            <p>We encountered a problem while initializing the 3D graphics on this page.</p>\n            <p>Error details: <span style="color: #aaaaaa;">${t}</span></p>\n            <p>This could be due to outdated graphics drivers, limited system resources, or browser configuration issues.</p>\n            <h4 style="color: #ffc900; margin-top: 20px; margin-bottom: 15px;">Possible solutions:</h4>\n            <ul style="list-style-type: disc;">\n               <li>• <a href="javascript:location.reload()" style="text-decoration: underline;">Refresh the page</a> to attempt loading the content again</li>\n               <li>• Close other resource-intensive tabs or applications running on your device</li>\n               <li>• Update your graphics drivers to the latest version</li>\n               <li>• Try disabling hardware acceleration if you're experiencing graphical glitches</li>\n            </ul>\n         `, a = '<div class="action-link">\n            <a href="/minimal/">Visit minimal version of our site</a>\n            <p>(No WebGL required)</p>\n            <a href="javascript:location.reload()">Refresh this page</a>\n         </div>');
                        let s = "40px",
                            l = "3.5rem";
                        const c = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
                        c <= 800 && (l = "2.8rem"), c <= 490 && (s = "20px 15px", l = "2rem");
                        const d = document.createElement("div");
                        d.className = "modal-content", d.style.cssText = `\n         background-color: #252525;\n         width: ${c>=1024?"85%":c>=768?"90%":"95%"};\n         max-height: 90vh;\n         overflow-y: auto;\n         overflow-x: hidden;\n         padding: ${s};\n         box-sizing: border-box;\n         border: 2px solid #ffc900;\n         color: white;\n         font-family: 'Departure Mono', monospace;\n         font-size: 1.1rem;\n         position: relative;\n      `;
                        const u = document.createElement("button");
                        u.className = "webgl-error-close-btn", u.innerHTML = "✕", u.style.cssText = "\n      position: absolute;\n      top: 10px;\n      right: 10px;\n      background-color: transparent;\n      color: #ffc900;\n      border: 2px solid #ffc900;\n      width: 30px;\n      height: 30px;\n      border-radius: 50%;\n      font-size: 16px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      cursor: pointer;\n      z-index: 10;\n      transition: all 0.2s ease;\n      padding: 0;\n      line-height: 1;\n   ";
                        const p = document.createElement("style");
                        p.textContent = "\n      .webgl-error-close-btn:hover {\n         background-color: #ffc900;\n         color: #252525;\n         transform: scale(1.1);\n      }\n   ", document.head.appendChild(p), u.addEventListener("click", (function() {
                            o.remove(), document.body.style.overflow = "", document.body.style.cursor = ""
                        })), d.innerHTML = `\n         <h1 style="font-size: ${l}; color: #ffc900; text-align: center; margin-bottom: 30px; text-transform: uppercase; letter-spacing: 2px;">${n}</h1>\n         \n         <div style="background-color: rgba(255, 255, 255, 0.05); padding: ${c<=490?"15px 10px":"20px"}; border-radius: 4px; margin-bottom: 25px;">\n            ${i}\n         </div>\n         \n         <div style="\n            background-color: rgba(255, 201, 0, 0.2);\n            border-left: 4px solid #ffc900;\n            padding: ${c<=490?"10px":"15px"};\n            margin: 30px 0;\n            font-weight: bold;\n         ">\n            <p style="color: #ffc900; font-size: 1.2rem; margin-bottom: 0.5em;">🔹 IMPORTANT 🔹</p>\n            <p style="text-transform: uppercase; margin-bottom: 0;">YOU CAN VISIT OUR MINIMAL WEBSITE VERSION THAT DOESN'T REQUIRE WEBGL AT <a href="/minimal/" style="color: #ffc900; text-decoration: underline;">/MINIMAL/</a></p>\n         </div>\n         \n         <div style="text-align: center; margin: 30px 0;">\n            ${a}\n         </div>\n         \n         <h3 style="color: #ffc900; margin-top: 40px; text-transform: uppercase; letter-spacing: 1px; font-size: 1.6rem;">PREVIEW:</h3>\n         <div style="\n            display: flex;\n            flex-wrap: wrap;\n            gap: 40px;\n            justify-content: center;\n            margin-top: 20px;\n         ">\n            <div style="flex: 1; min-width: 280px; max-width: 45%;">\n               <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">\n                  <video style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;" autoplay muted loop playsinline>\n                     <source src="/assets/img/o/video5-1.mp4" type="video/mp4">\n                     Your browser does not support the video tag.\n                  </video>\n               </div>\n            </div>\n            <div style="flex: 1; min-width: 280px; max-width: 45%;">\n               <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">\n                  <video style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;" autoplay muted loop playsinline>\n                     <source src="/assets/img/o/video5-2.mp4" type="video/mp4">\n                     Your browser does not support the video tag.\n                  </video>\n               </div>\n            </div>\n         </div>\n         \n         <div style="text-align: center; margin-top: 30px;">\n            <p>Learn more about <a href="https://get.webgl.org/" target="_blank" style="color: #ffc900;">WebGL support</a></p>\n         </div>\n      `, d.appendChild(u);
                        const h = document.createElement("style");
                        h.textContent = `\n         #webglErrorModal a {\n            color: #ffc900;\n            text-decoration: none;\n            transition: all 0.3s ease;\n            cursor: pointer;\n         }\n         #webglErrorModal a:hover {\n            text-decoration: underline;\n            opacity: 0.9;\n         }\n         #webglErrorModal .action-link {\n            text-align: center;\n         }\n         #webglErrorModal .action-link a {\n            display: inline-block;\n            background-color: #ffc900;\n            color: #252525;\n            padding: ${c<=490?"10px 16px":"12px 24px"};\n            margin: ${c<=490?"5px":"10px"};\n            font-weight: bold;\n            border-radius: 4px;\n            text-transform: uppercase;\n            font-size: ${c<=490?"0.9rem":"1rem"};\n         }\n         #webglErrorModal .action-link a:hover {\n            background-color: #e0b000;\n            transform: translateY(-2px);\n            text-decoration: none;\n         }\n         #webglErrorModal p {\n            line-height: 1.6;\n            margin-bottom: 1.2em;\n         }\n         #webglErrorModal ul, #webglErrorModal ol {\n            margin-left: ${c<=490?"0.5em":"1.5em"};\n            margin-bottom: 1.5em;\n            list-style-type: disc;\n         }\n         #webglErrorModal li {\n            margin-bottom: 0.8em;\n            line-height: 1.5;\n            position: relative;\n            padding-left: ${c<=490?"0":"0.5em"};\n         }\n      `, document.head.appendChild(h), o.appendChild(d), document.body.appendChild(o), document.body.style.overflow = "hidden", document.body.style.cursor = "auto !important", document.documentElement.style.cursor = "auto !important", o.addEventListener("click", (function(e) {
                            e.target === o && (o.remove(), document.body.style.overflow = "")
                        }))
                    }
                    checkSW() {
                        if (!("serviceWorker" in navigator)) return;
                        navigator.serviceWorker.getRegistration().then((e => {
                            e && ((e => {
                                e.waiting && console.log("%c🔄 A new version of this site is available! Refresh the page to see updates.", "background: #4a4a4a; color: #ffc900; font-size: 14px; font-family: 'Courier New', Courier, monospace; padding: 8px 12px; border-radius: 7px; border: 2px solid #ffc900;")
                            })(e), e.addEventListener("updatefound", (() => {
                                const t = e.installing;
                                t.addEventListener("statechange", (() => {
                                    "installed" === t.state && navigator.serviceWorker.controller && console.log("%c🔄 A new version of this site is available! Refresh the page to see updates.", "background: #4a4a4a; color: #ffc900; font-size: 14px; padding: 8px 12px; border-radius: 4px; font-weight: bold;")
                                }))
                            })))
                        })).catch((e => {}))
                    }
                }
                let y;
                (new class {
                    constructor() {
                        y = new v, y.errorHandling(), isOverview = !0, dom.footer.style.contentVisibility = "visible"
                    }
                    init() {
                        this.common = new s, this.common.header = new l, this.common.footer = new f, this.overview = new b, this.initRest()
                    }
                    initRest() {
                        const e = navigator.userAgent.toLowerCase().includes("firefox");
                        this.common.customConsoleMsg(), this.common.checkPerformance(), this.common.initTouchDetect(), this.common.initLocalhostDetect(), isTouchDevice || (this.common.header.customCursor(), this.common.header.cursorHover(), this.common.header.logoHover()), this.common.header.menuInit(), this.common.fontLoad("3DIsometric", "url(./assets/fonts/3DIsometric01.woff2)", {
                            style: "normal",
                            weight: "400",
                            fontDisplay: "fallback"
                        }), this.common.fontLoad("amiga", "url(./assets/fonts/amiga.woff2)", {
                            style: "normal",
                            weight: "400",
                            fontDisplay: "fallback"
                        }), this.common.customScrollbar(), isHighFPS && this.overview.bgPatternAnimation(), isHighFPS && !e ? this.overview.pixelateCarouselInit() : this.overview.carouselBasicInit(), this.common.initialAnimation(), this.overview.showNav(), this.overview.scrollingTextInit(), this.overview.whenImageLoadedRecalculate(), this.common.footer.footerAnimation(), this.common.footer.copyrightUpdate(), isTouchDevice || this.overview.cardHover(), this.common.authorCreditHtml(), isLocalhost && this.overview.correctURLDeveloper(), y.checkSW()
                        } 1500
                    
                }).init()
            }
        },
        o = {};

    function n(e) {
        var r = o[e];
        if (void 0 !== r) return r.exports;
        var i = o[e] = {
            exports: {}
        };
        return t[e].call(i.exports, i, i.exports, n), i.exports
    }
    n.m = t, e = [], n.O = (t, o, r, i) => {
        if (!o) {
            var a = 1 / 0;
            for (d = 0; d < e.length; d++) {
                for (var [o, r, i] = e[d], s = !0, l = 0; l < o.length; l++)(!1 & i || a >= i) && Object.keys(n.O).every((e => n.O[e](o[l]))) ? o.splice(l--, 1) : (s = !1, i < a && (a = i));
                if (s) {
                    e.splice(d--, 1);
                    var c = r();
                    void 0 !== c && (t = c)
                }
            }
            return t
        }
        i = i || 0;
        for (var d = e.length; d > 0 && e[d - 1][2] > i; d--) e[d] = e[d - 1];
        e[d] = [o, r, i]
    }, n.d = (e, t) => {
        for (var o in t) n.o(t, o) && !n.o(e, o) && Object.defineProperty(e, o, {
            enumerable: !0,
            get: t[o]
        })
    }, n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), (() => {
        var e = {
            542: 0
        };
        n.O.j = t => 0 === e[t];
        var t = (t, o) => {
                var r, i, [a, s, l] = o,
                    c = 0;
                if (a.some((t => 0 !== e[t]))) {
                    for (r in s) n.o(s, r) && (n.m[r] = s[r]);
                    if (l) var d = l(n)
                }
                for (t && t(o); c < a.length; c++) i = a[c], n.o(e, i) && e[i] && e[i][0](), e[i] = 0;
                return n.O(d)
            },
            o = globalThis.webpackChunkstart = globalThis.webpackChunkstart || [];
        o.forEach(t.bind(null, 0)), o.push = t.bind(null, o.push.bind(o))
    })();
    var i = n.O(void 0, [543], (() => n(531)));
    i = n.O(i)
})();

