import {identity, isEqual} from "lodash/fp";
import jsc, {property} from "jsverify";
import sinon from "sinon";

import {anyArb} from "./arbitraries";
import {of, when, whenElse, unless, unlessElse} from "../lib";

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
    return when(pred(x), stub, of(fixture)).then(isEqual(result));
  });

  property("whenElse is equivalent to if-else", jsc.bool, x => {
    const stubC = sinon.stub().returns(consequent);
    const stubA = sinon.stub().returns(alternative);
    const result = pred(x)() ? whenElseTable.true : whenElseTable.false;
    return whenElse(pred(x), stubC, stubA, of(fixture)).then(isEqual(result));
  });

  property("unless is equivalent to if-not", jsc.bool, x => {
    const stub = sinon.stub().returns(consequent);
    const result = pred(x)() ? unlessTable.true : unlessTable.false;
    return unless(pred(x), stub, of(fixture)).then(isEqual(result));
  });

  property("unlessElse is equivalent to if-not-else", jsc.bool, x => {
    const stubC = sinon.stub().returns(consequent);
    const stubA = sinon.stub().returns(alternative);
    const result = pred(x)() ? unlessElseTable.true : unlessElseTable.false;
    return unlessElse(pred(x), stubC, stubA, of(fixture)).then(isEqual(result));
  });

  [whenElse, unlessElse].forEach(f => {
    property(
      `validates that the arguments of ${f.name} are functions`,
      anyArb,
      g => {
        const args = [sinon.stub(), sinon.stub(), sinon.stub()];
        args[jsc.random(0, 2)] = g;
        const block = () => f(...args.concat(fixture));

        return jsc.throws(
          block,
          TypeError,
          new RegExp(`Future#${f.name} (.+)to be a function`)
        );
      }
    );

    property(
      `throws if the fourth argument of ${f.name} is not a promise`,
      anyArb,
      a => {
        const args = [sinon.stub(), sinon.stub(), sinon.stub(), a];
        const block = () => f(...args);
        return jsc.throws(
          block,
          TypeError,
          new RegExp(`^Future#${f.name} (.+)to be a promise`)
        );
      }
    );
  });

  [when, unless].forEach(f => {
    property(
      `validates that the arguments of ${f.name} are functions`,
      anyArb,
      g => {
        const args = [sinon.stub(), sinon.stub()];
        args[jsc.random(0, 1)] = g;
        const block = () => f(...args.concat(fixture));
        return jsc.throws(
          block,
          TypeError,
          new RegExp(`^Future#${f.name} (.+)to be a function`)
        );
      }
    );

    property(
      `throws if the third argument of ${f.name} is not a promise`,
      anyArb,
      a => {
        const args = [sinon.stub(), sinon.stub(), a];
        const block = () => f(...args);
        return jsc.throws(
          block,
          TypeError,
          new RegExp(`^Future#${f.name} (.+)to be a promise`)
        );
      }
    );
  });
});
