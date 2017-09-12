import {isEqual, startsWith} from "lodash/fp";
import {property} from "jsverify";
import Promise from "bluebird";

import {anyArb, add, addP, isEqualAry} from "./arbitraries";
import {fold} from "../lib";

const fixture = Symbol("fixture");

describe("The fold combinator", () => {
  property(
    "produces the same result as a synchronous reduce",
    "array nat",
    "nat",
    (xs, y) => fold(add, y, xs).then(isEqual(xs.reduce(add, y)))
  );

  property(
    "produces the same result as reduce of Bluebird",
    "array nat",
    "nat",
    (xs, y) =>
      Promise.all([Promise.reduce(xs, addP, y), fold(addP, y, xs)]).then(
        isEqualAry
      )
  );

  property("validates that the mapper is a function", anyArb, async f => {
    try {
      await fold(f, fixture, [fixture]);
    } catch (e) {
      return e instanceof TypeError && startsWith("Future#fold", e.message);
    }
    return false;
  });
});
