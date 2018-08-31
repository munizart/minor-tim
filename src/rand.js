
const random = Math.random

/**
 * Return an integer within [0, max).
 *
 * @param  { Number } [max=0xfffffff] the max
 * @return { i32 } random integer within [0, max).
 */
exports.int = function (max) {
    return (random() * (max || 0xfffffff)) | 0
}

exports.float = random

/**
 * Return a boolean.
 *
 * @return { Boolean } Either true or false, randomly
 */
exports.bool = function () {
    return random() > 0.5
}

/**
 * Return an integer within [min, max).
 *
 * @param  { Number } min the min
 * @param  { Number } max the max
 * @return { i32 } an integer within [min, max)
 */
exports.range = function (min, max) {
    return (this.int(max - min) + min) | 0
}

/**
 * Pick an element from the source.
 *
 * @param  { ArrayLike.<T> } source an ArrayLike
 * @return { T } an item from the ArrayLike
 * @template T
 */
exports.pick = function (source) {
    return source[this.range(0, source.length)]
}
