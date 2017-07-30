import {curry, reduce} from "lodash/fp";

/**
 * Create a function out of a list of functions, where each successive
 * invocation is supplied the return value of the previous function call. The
 * new function forms a pipe where the results flow from left to right so to
 * speak. It's a shortcut for composing more than two functions.
 *
 * @example
 * const f = (x, y) => Promise.resolve(x + y);
 * const fs = map(f, [...Array(5).keys()]);
 * flow(fs, 0).then(console.log); // Returns the sum of 10
 *
 * @param {Array.<Function>} fs A list of functions to compose. Each function
 * can either return a value or a promise for a value.
 * @param {(Promise|*)} x The argument to call the function pipeline with. It
 * can either be any value, or the promise for any value.
 * @returns {Promise.<*>} The result of applying `x` to the pipeline of
 * `fs`.
 */
const flow = curry((fs, x) =>
  reduce((memo, f) => memo.then(f), Promise.resolve(x), fs)
);

export default flow;