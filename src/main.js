const loop = require('./loop')
const rand = require('./rand')
const key = require('./key')

const canvas = document.createElement('canvas')
canvas.width = window.innerWidth - 1
canvas.height = window.innerHeight
canvas.style.backgroundColor = '#071B1F'
canvas.style.margin = 'auto'
canvas.style.display = 'block'
document.body.style.padding = document.body.style.margin = 0
document.body.boxSizing = 'border-box'
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')
const colors = ['white', '#A9E3D4', '#67244C'] // #EA5730
// demo entity

/**
 * Contructs a mob
 * @returns { Mob } new mob
 */
const mob = () => ({
    x: rand.int(canvas.width),
    y: rand.int(canvas.height),
    width: 1,
    height: 1,
    color: rand.pick(colors),
    inertia: 1 / 62,
    xSpeed: 0,
    ySpeed: 0,
    maxSpeed: rand.range(1, 1999),

    /**
     * get radius
     *
     * @return { Number } the mob radious
     */
    get radius () {
        return 20 * (this.maxSpeed / 2000)
    },
    /**
     * @param  { CanvasRenderingContext2D } ctx a canvas context
     * @return { void }
     */
    render: function (ctx) {
        const fs = ctx.fillStyle

        ctx.fillStyle = this.color

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        ctx.fill()

        ctx.fillStyle = fs
    }
})

// game loop
const objs = Array.from({ length: 70 }, mob).sort((a, b) => a.maxSpeed - b.maxSpeed)

loop.start(function (dt) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    objs.forEach(renderMob(dt))
})

/**
 * renderMob - renders all mobs
 *
 * @param  { Number } dt delta time
 * @return { void }
 */
function renderMob (dt) {
    return function renderMob (mob) {
    // update mob

        if (key.isDown(key.LEFT)) {
            mob.xSpeed -= mob.maxSpeed * mob.inertia
        }
        if (key.isDown(key.RIGHT)) {
            mob.xSpeed += mob.maxSpeed * mob.inertia
        }
        if (key.isDown(key.UP)) {
            mob.ySpeed -= mob.maxSpeed * mob.inertia
        }
        if (key.isDown(key.DOWN)) {
            mob.ySpeed += mob.maxSpeed * mob.inertia
        }

        mob.xSpeed = Math.max(Math.min(mob.maxSpeed, mob.xSpeed), -mob.maxSpeed)
        mob.ySpeed = Math.max(Math.min(mob.maxSpeed, mob.ySpeed), -mob.maxSpeed)

        mob.x = mob.x + (mob.xSpeed * dt)
        mob.y = mob.y + (mob.ySpeed * dt)

        // check bounds collisions
        wrap(mob)

        mob.render(ctx)
    }
}

// /**
//  * bound
//  *
//  * @param  { Mob } mob a mob to bound
//  * @return { void }
//  */
// function bound (mob) {
//     if (mob.x < 0 || (mob.x + mob.width) > canvas.width) {
//         mob.x = Math.max(0, Math.min(mob.x, canvas.width - mob.width))
//         mob.xSpeed = 0
//     }
//     if (mob.y < 0 || (mob.y + mob.height) > canvas.height) {
//         mob.y = Math.max(0, Math.min(mob.y, canvas.height - mob.height))
//         mob.ySpeed = 0
//     }
// }

/**
 * wrap
 *
 * @param  { Mob } mob a mob to wrap
 * @return { void }
 */
function wrap (mob) {
    if (mob.x < 0) {
        mob.x = canvas.width - mob.width
    } else if ((mob.x + mob.width) > canvas.width) {
        mob.x = 0
    }
    if (mob.y < 0) {
        mob.y = canvas.height - mob.height
    } else if ((mob.y + mob.height) > canvas.height) {
        mob.y = 0
    }
}
