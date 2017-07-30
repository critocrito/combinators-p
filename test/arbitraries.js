import {curry} from "lodash/fp";
import Promise from "bluebird";
import {random} from "jsverify";

export const maybePromisify = val => {
  switch (random(0, 1)) {
    case 0:
      return val;
    default:
      return Promise.resolve(val);
  }
};

export const add = curry((x, y) => x + y);
export const addP = curry((x, y) => Promise.resolve(add(x, y)));
export const addMaybeP = curry((x, y) => maybePromisify(add(x, y)));

export default {
  maybePromisify,
  add,
  addP,
  addMaybeP,
};