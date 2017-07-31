import {sum, isEqual} from "lodash/fp";
import {property} from "jsverify";

import {maybePromisify, addP, addMaybeP} from "./arbitraries";
import compose from "../lib/combinators/compose";

describe("The compose combinator", () => {
  property(
    "accepts non promisified and promisified arguments",
    "nat",
    "nat",
    "nat",
    (x, y, z) =>
      compose(
        maybePromisify(addMaybeP(x)),
        maybePromisify(addMaybeP(y)),
        maybePromisify(z)
      ).then(isEqual(sum([x, y, z])))
  );

  property("is always associative", "nat", "nat", "nat", "nat", (w, x, y, z) =>
    Promise.all([
      compose(addP(w), compose(addP(x), addP(y)), z),
      compose(compose(addP(w), addP(x)), addP(y), z),
    ]).then(([a, b]) => isEqual(a, b))
  );
});
