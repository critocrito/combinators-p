# A NodeJs Library

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [API](#api)
  - [flow](#flow)
  - [compose](#compose)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### flow

Create a function out of a list of functions, where each successive
invocation is supplied the return value of the previous function call. The
new function forms a pipe where the results flow from left to right so to
speak. It's a shortcut for composing more than two functions.

**Parameters**

-   `fs` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)>** A list of functions to compose. Each function
    can either return a value or a promise for a value.
-   `x` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) | any)** The argument to call the function pipeline with. It
    can either be any value, or the promise for any value.

**Examples**

```javascript
const f = (x, y) => Promise.resolve(x + y);
const fs = map(f, [...Array(5).keys()]);
flow(fs, 0).then(console.log); // The sum of [0, 1, 2, 3, 4], returns 10
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** The result of applying `x` to the pipeline of
`fs`.

### compose

Compose two function that return promises to yield a third function that
returns a promise. The resulting composite function is denoted `g∘f : X →
Z`, defined by `(g∘f)(x) = g(f(x))` for all `x` in `X`.

**Parameters**

-   `f` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** The first function to compose. The function can either
    return a value or a promise for a value.
-   `g` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** The second function to compose. The function can either
    return a value or a promise for a value.
-   `x` **([Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) | any)** The argument to call `(g∘f)` with. It can either be
    any value, or the promise for any value.

**Examples**

```javascript
const f = x => Promise.resolve(x + 1);
const g = x => Promise.resolve(x + 5);
const h = compose(f, g);
h(10).then(console.log); // 10 + 1 + 5, returns 16.
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** The result of calling `g` with the result of
`f(x)`.
