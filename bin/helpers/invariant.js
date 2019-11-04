/*
 * @Author: SiYuan Wang
 * @Date: 2019-10-25 16:38:23
 * @Description: invariant
 */

const io = require('./io');

function invariant(condition, format, a, b, c, d, e, f) {
    if (!condition) {
        let argsIndex = 0;
        const args = [a, b, c, d, e, f];
        const errorMessage = format.replace(/%s/g, function() {
            return args[argsIndex++];
        });

        io.print4error(errorMessage);

        process.exit(-1);
    }
}

module.exports = invariant;
