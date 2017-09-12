import {isEqual, startsWith} from "lodash/fp";
import {property} from "jsverify";
import sinon from "sinon";

import {minus, add, addP, anyArb} from "./arbitraries";
import {Future as F, compose as comp} from "../lib";

const fixture = Symbol("fixture");

describe("The type Future", () => {
  // https://github.com/rpominov/static-land/blob/master/docs/spec.md#functor
  describe("is an instance of Functor", () => {
    property("identity", anyArb, async a => isEqual(await F.map(x => x, a), a));
    property("composition", "nat", "nat", "nat", async (a, b, c) => {
      const f = addP(b);
      const g = addP(c);

      return isEqual(await F.map(comp(f, g), a), await F.map(f, F.map(g, a)));
    });
    property("validates that the mapper is a function", anyArb, async f => {
      try {
        await F.map(f, fixture);
      } catch (e) {
        return e instanceof TypeError && startsWith("Future#map", e.message);
      }
      return false;
    });
  });

  // https://github.com/rpominov/static-land/blob/master/docs/spec.md#bifunctor
  describe("is an instance of Bifunctor", () => {
    property("identity", anyArb, async a =>
      isEqual(await F.bimap(x => x, x => x, F.of(a)), await F.of(a))
    );
    property(
      "composition",
      "nat",
      "nat",
      "nat",
      "nat",
      "nat",
      async (a, b, c, d, e) => {
        const f = add(b);
        const g = minus(c);
        const h = add(d);
        const i = minus(e);

        return isEqual(
          await F.bimap(x => f(g(x)), x => h(i(x)), F.of(a)),
          await F.bimap(f, h, F.bimap(g, i, F.of(a)))
        );
      }
    );
    property("deriving Functors map", "nat", "nat", async (a, b) => {
      const f = add(b);
      return isEqual(
        await F.bimap(x => x, f, F.of(a)),
        await F.map(f, F.of(a))
      );
    });
    it("maps the left function over the rejection value", async () => {
      const a = sinon.stub().rejects();
      const f = sinon.mock().once();
      const g = sinon.mock().never();
      await F.bimap(f, g, a());
      f.verify().should.equal(true);
      g.verify().should.equal(true);
    });
    it("maps the right function over the resolution value", async () => {
      const a = sinon.stub().resolves(fixture);
      const f = sinon.mock().never();
      const g = sinon.mock().once();
      await F.bimap(f, g, a());
      f.verify().should.equal(true);
      g.verify().should.equal(true);
    });
    it("doesn't call the right function if the left one throws", async () => {
      const a = sinon.stub().rejects();
      const f = sinon
        .mock()
        .once()
        .rejects();
      const g = sinon.mock().never();
      try {
        await F.bimap(f, g, a());
      } catch (e) {} // eslint-disable-line no-empty
      f.verify().should.equal(true);
      g.verify().should.equal(true);
    });
  });

  describe("is an instance of Applicative", () => {
    // https://github.com/rpominov/static-land/blob/master/docs/spec.md#applicative
    property("identity", "nat", async a => {
      const v = F.of(a);
      return isEqual(await F.ap(F.of(x => x), v), a);
    });

    property("homomorphism", "nat", "nat", async (a, b) => {
      const f = addP(a);
      return isEqual(await F.ap(F.of(f), F.of(b)), await F.of(f(b)));
    });

    property("interchange", "nat", "nat", async (a, b) => {
      const u = F.of(addP(b));
      return isEqual(await F.ap(u, F.of(b)), await F.ap(F.of(f => f(b)), u));
    });

    property("composition", "nat", "nat", "nat", async (a, b, c) => {
      const x = F.of(a);
      const u = F.of(addP(b));
      const v = F.of(addP(c));

      return isEqual(
        await F.ap(F.ap(F.map(comp, u), v), x),
        await F.ap(u, F.ap(v, x))
      );
    });

    property("deriving Functors map", "nat", "nat", async (a, b) => {
      const f = addP(b);
      const map = (g, u) => F.ap(F.of(g), u);

      return isEqual(await F.map(f, F.of(a)), await map(f, F.of(a)));
    });
  });

  describe("is an instance of Monad", () => {
    // https://github.com/rpominov/static-land/blob/master/docs/spec.md#monad
    property("associativity", "nat", "nat", "nat", async (a, b, c) => {
      const f = addP(b);
      const g = addP(c);

      return isEqual(
        await F.chain(f, F.chain(g, F.of(a))),
        await F.chain(x => F.chain(g, f(x)), F.of(a))
      );
    });

    property("left identity", "nat", "nat", async (a, b) => {
      const f = addP(b);
      return isEqual(await F.chain(f, F.of(a)), await f(a));
    });

    property("right identity", "nat", async a =>
      isEqual(await F.chain(F.of, F.of(a)), await F.of(a))
    );
  });
});
