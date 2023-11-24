/**
 * Returns the reversed string
 *
 * @param {String} string
 * @returns {String}
 */
const reverse = (string) => {
    return string.split("").reverse().join("");
};

/**
 * Returns the average number of the ones in the array
 *
 * @param {Array} arr
 * @returns {Number}
 */
const average = (arr) => {
    return arr.length === 0 ? 0 : arr.reduce((sum, item) => sum + item, 0);
};

module.exports = {
    reverse,
    average,
};
