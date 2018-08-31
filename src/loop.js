/* global PRODUCTION */
var lastTime = timestamp()
var stats

if (!PRODUCTION) {
    stats = require('stats.js')(0)
    document.body.appendChild(stats.dom)
}

/**
 * UNPURE!
 * timestamp - return a timestamp represent the current time
 * @return { Number } current timestamp
 */
function timestamp () {
    return window.performance && window.performance.now
        ? window.performance.now()
        : Date.now()
}

/**
 * raf - request an animation frame for a new tick
 *
 * @param  { function (Number): void } fn the game tick function
 * @return { void }
 */
function raf (fn) {
    return window.requestAnimationFrame(() => {
        stats && stats.begin()

        var now = timestamp()
        var dt = now - lastTime

        if (dt > 999) {
            dt = 1 / 60
        } else {
            dt /= 1000
        }

        lastTime = now

        fn(dt)

        stats && stats.end()
    })
}

/**
 * start - start game main loop
 *
 * @param  { function ( Number ) : void } fn game main loop function
 * @return { void }
 */
exports.start = function (fn) {
    return raf(function tick (dt) {
        fn(dt)
        raf(tick)
    })
}
