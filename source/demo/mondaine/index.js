(function () {
    'use strict';
    var days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    function getDate() { return new Date().getDate().toString(); }
    function getDay() { return days[new Date().getDay()]; }
    function getL(target, theme, size, opts) {
        var L = Leonardo(size, size),
            family = "Verdana", //Arial
            themes = {
                white: {
                    background: 'white',
                    color: '#000000',
                    secColor: "#CC281E",
                    dateBg: "#dedede",
                    img: '/media/sbb-logo.png'
                },
                black: {
                    background: '#000000',
                    color: '#ffffff',
                    secColor: "#CC281E",
                    dateBg: "#dedede",
                    img: '/media/sbb-logo-inverted.png'
                }
            },

            width = size,
            height = size,
            ticksPerSecond = 20,
            container = L.group(),

            cx = width / 2,
            cy = height / 2,

            cir0 = L.circle(cx, cy, size / 2.2),

            circle = L.circle(cx, cy, size / 2.5),

            border = L.group(),
            secs = L.group().setAttributes({ id: 'seconds' }),
            secs1 = L.circle(0, height * 0.245, width / 40),
            secs2 = L.line(0, height * 0.26, 0, height * 0.62),
            secs3 = L.circle(0, height / 2, width / 120),
            secsBullet = L.circle(0, height / 2, width / 150),

            mins = L.polygon(
                cx - width * 0.028, cy + height * 0.09,
                cx - width * 0.018, size * 0.145,
                cx + width * 0.018, size * 0.145,
                cx + width * 0.028, cy + height * 0.09
            ).setAttributes({ id: 'minutes' }),
            hours = L.polygon(
                cx - width * 0.028, cy + height * 0.09,
                cx - width * 0.018, cy - height * 0.26,
                cx + width * 0.018, cy - height * 0.26,
                cx + width * 0.028, cy + height * 0.09
            ).setAttributes({ id: 'hours' }),
            text = L.text(cx * 0.78, cy * 0.7, "MONDAINE"),
            textSM = L.textPath("smade",
                L.pathBuild
                    .M(cx * 0.925, size * 0.89 * 0.995)
                    .Q(cx, size * 0.89, cx * 1.075, size * 0.89 * 0.995),
                "swiss made"
            ),
            image = L.image(cx - size / 10, cy * 0.7, size / 5, size / 20, themes[theme].img),
            filt = L.radialGradient([{
                perc: 0,
                color: "#fff",
            }, {
                perc: 90,
                color: "#888",
            }, {
                perc: 94,
                color: "#aaa"
            }, {
                perc: 97,
                color: "#aaa"
            }, {
                perc: 100,
                color: "#fff"
            }]);

        L.append(container);
        border.append(cir0).setAttributes({ fill: filt });

        container
            .setAttributes({ viewBox: [0, 0, size, size].join(' ') })
            .append(border, circle);

        (function () {
            var small = L.line(cx, size * 0.135, cx, height * 0.16),
                big = L.line(cx, size * 0.135, cx, height * 0.215),
                tmp, i;

            big.setAttributes({
                "stroke-width": size / 40,
                stroke: themes[theme].color
            });
            small.setAttributes({
                "stroke-width": size / 80,
                "stroke": themes[theme].color
            });

            for (i = 0; i < 60; i++) {
                if ((i * 6) % 5 == 0) {
                    tmp = big.clone();
                } else {
                    tmp = small.clone();
                }
                tmp.rotate(i * 6, cx, cy);
                container.append(tmp);
            }
        })();

        circle.setStyles({ fill: themes[theme].background });
        secsBullet.setAttributes({
            fill: L.radialGradient([ // linear
                { perc: 0, color: 'black' },
                { perc: 33, color: themes[theme].secColor },
                { perc: 66, color: 'white' },
                { perc: 100, color: 'black' }
            ]),
            "stroke-width": 0
        });

        secs.append(secs1, secs2, secs3, secsBullet)
            .setAttributes({
                fill: themes[theme].secColor,
                stroke: themes[theme].secColor,
                "stroke-width": size / 80
            }).move(cx, 0);

        // hours.setAttributes({"fill" : themes[theme].color})
        hours.setAttributes({ fill: themes[theme].color });
        mins.setAttributes({ fill: themes[theme].color });

        text.setAttributes({ 'font-size': size / 25, fill: themes[theme].color });
        textSM.setAttributes({ 'font-size': size / 70, fill: themes[theme].color });

        var daydate = [{
            condition: opts.date,
            getText: getDate,
            position: [cx * 1.4, cy * .945],
            size: [size / 14, size / 17]
        }, {
            condition: opts.day,
            getText: getDay,
            position: [cx * .89, cy * 1.42],
            size: [size / 8.8, size / 17]
        }];
        var yyy = daydate.reduce(function (acc, o, i) {
            if (!o.condition) return acc;

            var g = L.group(),
                tx = o.getText(),
                textDate = L.centeredText(o.size[0] * 2, o.size[1] * 1.2, tx),
                rectDate = L.rect(0, 0, o.size[0], o.size[1])
                    .setAttributes({
                        fill: L.radialGradient([ // linear
                            { perc: 0, color: 'white' },
                            { perc: 100, color: themes[theme].dateBg },
                        ]),
                        'stroke-width': 0.1,
                        stroke: '#000000',
                    });
            g.append(
                rectDate,
                textDate
            ).move(o.position[0], o.position[1]);
            textDate.setAttributes({
                'font-size': size / 25,
                'font-weight': 'bold',
                'font-family': family
            });
            textDate.k = i;
            container.append(g);
            acc.push(textDate);
            return acc;
        }, [])

        container.append(image, text, textSM, hours, mins, secs);
        target.style.width = size + 'px';


        var nowdaydate = null;
        function getTime(gmtDmove, gmtHmove, gmtMmove) {
            var time0 = new Date();
            return arguments.length ? new Date(Date.UTC(
                time0.getFullYear(),
                time0.getMonth(),
                time0.getDay() + (gmtDmove || 0),
                time0.getHours() + (gmtHmove || 0),
                time0.getMinutes() + (gmtMmove || 0),
                time0.getSeconds(),
                time0.getMilliseconds()
            )) : time0;
        }

        window.setInterval(function () {
            var time = getTime(),
                ms = time.getMilliseconds(),
                s = time.getSeconds(),
                m = time.getMinutes(),
                h = time.getHours() % 12,
                fact = 60;
            if (nowdaydate !== time.getDate()) {
                nowdaydate = time.getDate();
                yyy.forEach(function (y) {
                    y.updateText(daydate[y.k].getText())
                });
            }
            secs.rotate((s + ms / 1E3) * 6, cx, cy);
            mins.rotate((m * fact + s + ms / 1E3) * 0.1, cx, cy);
            hours.rotate((h * fact + m + s / fact) * (360 / (12 * fact)), cx, cy);
        }, 1000 / ticksPerSecond);
        return L;
    }

    function render() {
        var blackButton = document.getElementById('dark'),
            whiteButton = document.getElementById('light'),
            withDate = document.getElementById('date'),
            withDay = document.getElementById('day'),
            target = document.getElementById('trg'),
            viewPortWidth = window.innerWidth || documentElement.clientWidth,
            qs = Leonardo.getqs(),
            maxSize = 800,
            size = Math.min(viewPortWidth, maxSize),
            nowH = (new Date).getHours(),
            day = 'day' in qs,
            date = 'date' in qs,
            theme = ('theme' in qs && qs.theme.match(/white|black/)) ? qs.theme : (nowH > 7 && nowH < 17) ? 'white' : 'black',

            L = getL(target, theme, size, { day, date }),

            search = {
                commit: function (s) { document.location.search = s.toString() },
                get: function () { return new URLSearchParams(document.location.search) }
            };
        L.render({
            target: target,
            fade: 1000,
            cb: function () {
                whiteButton.classList.remove('active');
                blackButton.classList.remove('active');
                switch (theme) {
                    case 'white': whiteButton.classList.add('active'); break;
                    case 'black': blackButton.classList.add('active'); break;
                }

                [{ el: withDay, s: 'day' }, { el: withDate, s: 'date' }].forEach(function (i) {
                    i.el.addEventListener('click', function (e) {
                        var u = search.get();
                        if (e.target.checked) u.set(i.s, true);
                        else { u.delete(i.s, true); }
                        search.commit(u);
                    })
                });

                [{ btn: whiteButton, theme: 'white' }, { btn: blackButton, theme: 'black' }].forEach(function (i) {
                    i.btn.addEventListener('click', function (e) {
                        var u = search.get();
                        u.set('theme', i.theme);
                        search.commit(u);
                    })
                });

                withDay.checked = !!day;
                withDate.checked = !!date;
                console.log('rendered');
            }
        });
    }
    render();
    window.onresize = render;
})();
