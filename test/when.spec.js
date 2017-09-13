import {identity, constant, isEqual, startsWith} from "lodash/fp";
import jsc, {property} from "jsverify";
import sinon from "sinon";

import {plus, anyArb, isEqualAry} from "./arbitraries";
import {when, whenElse, unless, unlessElse} from "../lib";

const pred = bool => () => identity(bool);

const fixture = Symbol("fixture");
const consequent = Symbol("consequent");
const alternative = Symbol("alternative");

const whenTable = {
  true: consequent,
  false: fixture,
};

const whenElseTable = {
  true: consequent,
  false: alternative,
};

const unlessTable = {
  true: fixture,
  false: consequent,
};

const unlessElseTable = {
  true: alternative,
  false: consequent,
};

describe("The conditional operators", () => {
  property("when is equivalent to if", jsc.bool, x => {
    const stub = sinon.stub().returns(consequent);
    const result = pred(x)() ? whenTable.true : whenTable.false;
    return when(pred(x), stub, fixture).then(isEqual(result));
  });

  property("whenElse is equivalent to if-else", jsc.bool, x => {
    const stubC = sinon.stub().returns(consequent);
    const stubA = sinon.stub().returns(alternative);
    const result = pred(x)() ? whenElseTable.true : whenElseTable.false;
    return whenElse(pred(x), stubC, stubA, fixture).then(isEqual(result));
  });

  property("unless is equivalent to if-not", jsc.bool, x => {
    const stub = sinon.stub().returns(consequent);
    const result = pred(x)() ? unlessTable.true : unlessTable.false;
    return unless(pred(x), stub, fixture).then(isEqual(result));
  });

  property("unlessElse is equivalent to if-not-else", jsc.bool, x => {
    const stubC = sinon.stub().returns(consequent);
    const stubA = sinon.stub().returns(alternative);
    const result = pred(x)() ? unlessElseTable.true : unlessElseTable.false;
    return unlessElse(pred(x), stubC, stubA, fixture).then(isEqual(result));
  });

  property(
    "validates that the arguments of whenElse are functions",
    anyArb,
    async f => {
      const args = [sinon.stub(), sinon.stub(), sinon.stub()];
      args[jsc.random(0, 2)] = f;
      try {
        await whenElse(...args.concat(fixture));
      } catch (e) {
        return (
          e instanceof TypeError && startsWith("Future#whenElse ", e.message)
        );
      }
      return false;
    }
  );

  property(
    "validates that the arguments of unlessElse are functions",
    anyArb,
    async f => {
      const args = [sinon.stub(), sinon.stub(), sinon.stub()];
      args[jsc.random(0, 2)] = f;
      try {
        await unlessElse(...args.concat(fixture));
      } catch (e) {
        return (
          e instanceof TypeError && startsWith("Future#unlessElse ", e.message)
        );
      }
      return false;
    }
  );

  property(
    "validates that the arguments of when are functions",
    anyArb,
    async f => {
      const args = [sinon.stub(), sinon.stub()];
      args[jsc.random(0, 1)] = f;
      try {
        await when(...args.concat(fixture));
      } catch (e) {
        return e instanceof TypeError && startsWith("Future#when ", e.message);
      }
      return false;
    }
  );

  property(
    "validates that the arguments of unless are functions",
    anyArb,
    async f => {
      const args = [sinon.stub(), sinon.stub()];
      args[jsc.random(0, 1)] = f;
      try {
        await unless(...args.concat(fixture));
      } catch (e) {
        return (
          e instanceof TypeError && startsWith("Future#unless ", e.message)
        );
      }
      return false;
    }
  );

  property(
    "permits different action types for whenElse",
    "nat",
    "nat",
    "bool",
    async (a, b, c) =>
      isEqualAry(
        await Promise.all([
          whenElse(constant(c), plus(b), plus(b), a),
          whenElse(constant(c), plus(b), plus(b), Promise.resolve(a)),
          whenElse(constant(c), plus(b), plus(b), () => Promise.resolve(a)),
        ])
      )
  );
});
