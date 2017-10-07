# `combinators-p`

Program with promises in a functional style.

## Synopsis

    import {getJson, storeDb} from './async-utils';
    import {flow as flowP} from 'combinators-p';

    const url = "https://url.horse/api";

    const apiCall = flow([getJson, storeDb]);

    await apiCall(url);

## Get started

    npm install --save combinators-p

## Interoperability

<a href="http://promises-aplus.github.com/promises-spec"><img width="82" height="82" alt="Promises/A+" src="https://promisesaplus.com/assets/logo-small.png"></a>
<a href="https://github.com/rpominov/static-land"><img width="131" height="82" src="https://raw.githubusercontent.com/rpominov/static-land/master/logo/logo.png" /></a>

`combinators-p` is [compatible with Promises/A+ and ES6 Promises](promises).
It also implements [Static Land](https://github.com/rpominov/static-land)
[`Functor`](https://github.com/rpominov/static-land/blob/master/docs/spec.md#functor),
[`Bifunctor`](https://github.com/rpominov/static-land/blob/master/docs/spec.md#bifunctor),
[`Apply`](https://github.com/rpominov/static-land/blob/master/docs/spec.md#apply),
[`Applicative`](https://github.com/rpominov/static-land/blob/master/docs/spec.md#applicative),
[`Chain`](https://github.com/rpominov/static-land/blob/master/docs/spec.md#chain)
and
[`Monad`](https://github.com/rpominov/static-land/blob/master/docs/spec.md#monad).

## Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [API](#api)
  - [isPromise](#ispromise)
  - [constant](#constant)
  - [delay](#delay)
  - [of](#of)
  - [all](#all)
  - [lift2](#lift2)
  - [tap](#tap)
  - [caught](#caught)
  - [spread](#spread)
  - [fold](#fold)
  - [flow](#flow)
  - [flatmap](#flatmap)
  - [compose](#compose)
  - [tapClone](#tapclone)
  - [whenElse](#whenelse)
  - [flatmap2](#flatmap2)
  - [map](#map)
  - [flatmap3](#flatmap3)
  - [retry](#retry)
  - [unlessElse](#unlesselse)
  - [flatmap4](#flatmap4)
  - [flatmap5](#flatmap5)
  - [retry2](#retry2)
  - [bimap](#bimap)
  - [when](#when)
  - [retry3](#retry3)
  - [collect](#collect)
  - [retry4](#retry4)
  - [unless](#unless)
  - [collect2](#collect2)
  - [collect3](#collect3)
  - [collect4](#collect4)
  - [collect5](#collect5)
  - [ap](#ap)
  - [chain](#chain)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### isPromise

Test if an object is a promise.

**Parameters**

-   `p` **any** The object to test.

**Examples**

```javascript
const p = F.of(23);
isPromise(p); // Returns true;
```

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Returns `true` if the object is a promise, otherwise
`false`;

### constant

Create a function that always returns the same value.

**Parameters**

-   `x` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any> | any)** The value to return. This can either be a value
    or a promise for a value.

**Examples**

```javascript
const f = constant("Hello");
f().then(console.log); // Returns "Hello"
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** A promise that resolves to `x`.

### delay

Delay the resolution of a promise chain.

**Parameters**

-   `ms` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The time to wait in milliseconds.
-   `value` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any> | any)** The promise or value to resolve after the
    delay.

**Examples**

```javascript
delay(100).then(console.log) // Waits 100 ms.
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** A promise that resolved to value, or whatever value
resolves to.

### of

Lift a value into a promise. This is equivalent to `Promise.resolve`.

`of :: a -> Future a`

**Parameters**

-   `x` **any** The value to lift into a promise.

**Examples**

```javascript
const p = F.of(23);
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** The value inside a promise.

### all

Create a function that evaluates all promises in an array when called. This
is equivalent to `Promise.all`, with the difference that it creates a
callable function.

**Parameters**

-   `xs` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)> | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;any>)** An array of values that are
    resolved. `xs` can either be an array, or a promise that resolves to an
    array. Each element of `xs` can either be a value, or a promise that
    resolves to a value.

**Examples**

```javascript
const f = all([openFile1(), opeFile2(), openFile3()]);
f().then(console.log); // Returns [a, b, c];
```

Returns **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)&lt;Promise.Array&lt;any>>** A function, that when called, resolves all
promises and returns an Array of values.

### lift2

Lift a binary function over two promises.

`lift2 :: Functor f => (a -> b -> c) -> f a -> f b -> f c`

**Parameters**

-   `f` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)&lt;any, any>** A binary function that can either return a value
    or a promise for a value.
-   `x` **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** A value that gets lifted as the first argument
    of `f`. This is a promise that resolves to a value.
-   `y` **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** A value that gets lifted as the first argument
    of `f`. This is a promise that resolves to a value.

**Examples**

```javascript
const f = (x, y) => x + y;
lift2(f, of(a), of(b)).then(console.log); // Returns 3.
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** The value that f returns when applied to `x` and
`y`.

### tap

Run a function for side effect and return the original value.

**Parameters**

-   `f` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)&lt;any>** The function to call on `p`. This function is for
    meant for side effects, if it returns a value, it will be ignored.
-   `p` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any> | any)** The value to use for side effect. This can
    either be a value or a promise that resolves to a value.

**Examples**

```javascript
const f = a => of(a);
flow([f, tap(console.log)])(23); // Print "23" to the console.
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** Returns `p`.

### caught

Catch an exception on a promise and call a exception handler. This is
equivalent to `Promise.catch`.

**Parameters**

-   `f` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** The handler to call when the promise `p` get's
    rejected.
-   `p` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any> | any)** A value or a promise that get's resolved.

**Examples**

```javascript
const f = () => new Error("Boom");
caught(console.error, f()); // Prints the exception.
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** A promise that resolves either to the value of `p`
or to the return value of `f`.

### spread

Call a variadic function with the value of a promise as it's arguments. If
the value is an array, flatten it to the formal parameters of the
fulfillment handler.

**Parameters**

-   `f` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)&lt;any>** The function to apply to the value of p. This
    function can either return a value or the promise for a value.
-   `p` **any** The promise that resolves to the arguments for the
    function. The promise can either resolve to a single value or an array of
    values.

**Examples**

```javascript
const plus = (x, y) => x + y;
const p = of([1, 2]);
spread(plus, p).then(console.log); // Prints 3
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** The result of applying the value of `p` to `f`.

### fold

Reduce a list of values to a single value, using a reduction function. This
is equivalent to `Array.reduce`.

**Parameters**

-   `f` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)&lt;any>** The function to reduce over the list. This function
    takes an accumulator, a value and returns a promise for a value.
-   `acc` **any** The initial value to apply to the first call of `f`.
-   `xs` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;any>** The list to reduce to a single value.

**Examples**

```javascript
const f = (acc, x) => of(acc + x);
const xs = [...Array(5).keys()];
fold(f, 0, xs).then(console.log); // The sum of [0, 1, 2, 3, 4], returns 10;
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** The value of `xs` reduced over `f`.

### flow

Create a function out of a list of functions, where each successive
invocation is supplied the return value of the previous function call. The
new function forms a pipe where the results flow from left to right so to
speak. It's a shortcut for composing more than two functions.

**Parameters**

-   `fs` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)> | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)>)** An array of functions to
    compose. `fs` can either be an array, or a promise that resolves to an
    array. Each function can either return a value or a promise for a value.
-   `x` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) | any)** The argument to call the function pipeline with. It
    can either be any value, or the promise for any value.

**Examples**

```javascript
const f = (x, y) => of(x + y);
const fs = map(f, [...Array(5).keys()]);
flow(fs, 0).then(console.log); // The sum of [0, 1, 2, 3, 4], returns 10
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** The result of applying `x` to the pipeline of
`fs`.

### flatmap

Map a function over every element of a list and concatenate the results
into a single list. Only one promise at a time get's resolved.

**Parameters**

-   `f` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)&lt;any>** The function that is applied to every element. This
    function can either return a value or the promise for a value.
-   `xs` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)> | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;any>)** The list to map `f` over. This can
    either be an array, or the promise for an array.

**Examples**

```javascript
const f = x => [x, x];
const xs = [1, 2];
flatmap(f, xs).then(console.log); // Prints [1, 1, 2, 2];
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)>** The concatenation of applying every element of
`xs` to `f`.

### compose

Compose two function that return promises to yield a third function that
returns a promise. The resulting composite function is denoted
`g∘f : X → Z`, defined by `(g∘f)(x) = g(f(x))` for all `x` in `X`.

`compose :: Functor f => (a -> f b) -> (b -> f c) -> f a -> f c`

**Parameters**

-   `f` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** The function that get's called first when composing. It
    takes a value as an argument and returns a promise for a value.
-   `g` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** The function that get's called second when composing.
    It takes a value as an argument and returns a promise for a value.
-   `x` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any> | any)** The argument to call `(g∘f)` with. It can either be
    any value, or the promise for any value.

**Examples**

```javascript
const f = x => of(x + 1);
const g = x => of(x + 5);
const h = compose(f, g);
h(10).then(console.log); // 10 + 1 + 5, returns 16.
h(of(10)).then(console.log); // 10 + 1 + 5, returns 16.
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** The result of calling `g` with the result of
`f(x)`.

### tapClone

Like `tap`, but make a deep clone of `p` before applying it to `f`.

### whenElse

Make a conditional test and either call the left or the right branch.

**Parameters**

-   `predicate` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Test if a condition is `true` or `false`. This
    predicate can either return a boolean value, or a promise that resolves to
    a boolean value.
-   `consequent` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Apply `a` to this function if the
    predicate returns `true`;
-   `alternative` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Apply `a` to this function if the
    predicate returns `false`;
-   `a` **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** Test this value to decide whether to call the
    consequent or the alternative.

**Examples**

```javascript
const pred = userExists;
const cons = updateUser;
const alt = createUser;
whenElse(userExists, updateUser, createUser, user);
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** A promise that resolves to a value, that is the
result of either calling the `consequent` or the `alternative` with
`a`.

### flatmap2

The same as `flatmap`, but run two promises concurrently.

### map

Map a function over a promise.

`map :: Functor f => (a -> b) -> f a -> f b`

**Parameters**

-   `f` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)&lt;any>** The function to apply. `f` is a function that takes
    a single argument and returns a value.
-   `a` **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** An action that resolves to a value to apply to `f`.

**Examples**

```javascript
const p = F.of(1);
const f = x => x + 1;
F.map(f, p).then(console.log); // Prints 2
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** The result of `x` applied to `f`.

### flatmap3

The same as `flatmap`, but run three promises concurrently.

### retry

Call an action, and retry it in case it fails. An action is retried up to
five times with an increasing timeout.

**Parameters**

-   `action` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \| [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function))** A function or a promise that should be
    retried in case of failure.

**Examples**

```javascript
// Retries `fetchUser` in case of failure.
retry(fetchUser).then(console.log).catch(console.error);
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** A promise that resolves to the return value of
`action`, or that is rejected with the last exception that `action` failed
with.

### unlessElse

Like `whenElse`, only call the `consequent` if the predicate returns
`false`, and the `alternative` if the predicate returns `true`;

### flatmap4

The same as `flatmap`, but run four promises concurrently.

### flatmap5

The same as `flatmap`, but run five promises concurrently.

### retry2

Like `retry`, but accept one additional argument that is applied to
`action`.

**Parameters**

-   `action` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \| [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function))** A function or a promise that should be
    retried in case of failure.
-   `arg` **any** The argument to apply to `action`.

**Examples**

```javascript
// Retries `fetchUser` in case of failure.
retry(fetchUser, 23).then(console.log).catch(console.error);
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** A promise that resolves to the return value of
`action`, or that is rejected with the last exception that `action` failed
with.

### bimap

Map the left function over the rejection value, and the right function over
the success value of a promise.

`bimap :: Bifunctor f => (a -> c) -> (b -> d) -> f a b -> f c d`

**Parameters**

-   `left` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)&lt;any>** The function to map over the rejection value of
    `p`. `left` is a function that takes a single argument and returns a value.
-   `right` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)&lt;any>** The function to map over the success value of
    `p`. `right` is a function that takes a single argument argument and
    returns a value.
-   `a` **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** An action to resolve to a value. If it throws, call
    the `left` function with the reason, otherwise call the `right` function
    with it's evaluation value.

**Examples**

```javascript
const f = () => console.log('Boom!');
const g = x => x + 1;
F.bimap(f, g, F.of(1)).then(console.log); // Prints 2
F.bimap(f, g, Promise.reject()); // Prints 'Boom!'
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** A promise that evaluates either to the result of
calling left or calling right.

### when

Like `whenElse`, but have no alternative. If the predicate returns `false`,
simply return the `a`.

### retry3

Like `retry2`, but accept two arguments to apply to `action`.

### collect

Map a function over every element of a list. This is equivalent to
`Array.map`. Only one promise at a time get's resolved.

**Parameters**

-   `f` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)&lt;any>** The function that is applied to every element. This
    function can either return a value or the promise for a value.
-   `xs` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)> | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;any>)** The list to map `f` over. This can
    either be an array, or the promise for an array.

**Examples**

```javascript
const f = x => F.of(x + 1);
const xs = [...Array(5).keys()];
collect(f, xs).then(console.log); // Prints [1, 2, 3, 4, 5]
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)>** A list of the same length as `xs`, but with `f`
applied to each of its elements.

### retry4

Like `retry2`, but accept three arguments to apply to `action`.

### unless

Like `unlessElse`, but have no alternative. If the predicate returns `true`,
simply return the `a`.

### collect2

The same as `collect`, but run two promises concurrently.

### collect3

The same as `collect`, but run three promises concurrently.

### collect4

The same as `collect`, but run four promises concurrently.

### collect5

The same as `collect`, but run five promises concurrently.

### ap

Apply a function wrapped in a promise to a promisified value.

`ap :: Applicative f => f (a -> b) -> f a -> f b`

**Parameters**

-   `pf` **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)>** A promise that resolves to a function.
-   `a` **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** An action that resolves to a value to apply to the
    value of `pf`.

**Examples**

```javascript
const pf = F.of(v => v + 1);
const p = F.of(1);
apply(pf, p).then(console.log); // Returns 2.
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** A promise resolving to the resolved value of `a`
applied to the resolved function of `pf`.

### chain

Create a new promise based on the resolution value. This is equivalent to
`promise.then(f)`.

`chain :: Chain m => (a -> m b) -> m a -> m b`

**Parameters**

-   `f` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)&lt;[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)>** The function to chain. It returns a promise that
    resolves to a value.
-   `a` **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** An action that resolves to a value to apply to `f`.

**Examples**

```javascript
const f = x => of(x + 1);
chain(f, of(0)); // Resolves to 1
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** A promise that resolves to the result of `x` applied
to `f`.
