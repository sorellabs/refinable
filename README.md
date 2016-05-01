Refinable
=========

[![Chat on Gitter](https://img.shields.io/gitter/room/origamitower/discussion.svg?style=flat-square)](https://gitter.im/origamitower/discussion)[![Build status](https://img.shields.io/travis/origamitower/refinable/master.svg?style=flat-square)](https://travis-ci.org/origamitower/refinable)[![NPM version](https://img.shields.io/npm/v/refinable.svg?style=flat-square)](https://npmjs.org/package/refinable)[![Dependencies status](https://img.shields.io/david/origamitower/refinable.svg?style=flat-square)](https://david-dm.org/origamitower/refinable)![Licence](https://img.shields.io/npm/l/refinable.svg?style=flat-square&label=licence)![Stability: Stable](https://img.shields.io/badge/stability-stable-green.svg?style=flat-square)

A better primitive for prototype-based OO.


## Example

```js
const Refinable = require('refinable');

const Point2d = Refinable.refine({
  x: 0,
  y: 0,
  toString() {
    return this.x + ', ' + this.y
  }
});

const p1 = Point2d.refine({ x: 10, y: 10 });
const p2 = p1.refine({ y: 20 });

p1.toString()
// => 10, 10
p2.toString()
// => 10, 20
```

## Installation

The officially supported way of getting Refinable is through [npm][]:

    $ npm install refinable

> **NOTE**
>
> If you don't have npm, you'll need to install [Node.js][] in your
> system before installing Refinable.

A tool like [Browserify][] or [Webpack][] can be used to run Refinable in
platforms that don't implement Node-style modules, like the Browser.

[Node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com
[Browserify]: http://browserify.org/
[Webpack]: https://webpack.github.io/


## Supported platforms

Refinable is supported in all platforms that support ECMAScript 5.


> **NOTE**  
> For platforms that don't support ECMAScript 5, (like IE8 and 9) the
> [es5-shim][] library can be used to provide the additional runtime
> support.

[es5-shim]: https://github.com/es-shims/es5-shim


## Support

If you think you've found a bug in the project, or want to voice your
frustration about using it (maybe the documentation isn't clear enough? Maybe
it takes too much effort to use?), feel free to open a new issue in the
[Github issue tracker](https://github.com/origamitower/refinable/issues).

Pull Requests are welcome. By submitting a Pull Request you agree with releasing
your code under the MIT licence.

You can join the [Gitter Channel](https://gitter.im/origamitower/discussion) for
quick support. You may also contact the author directly through
[email](mailto:queen@robotlolita.me), or
[Twitter](https://twitter.com/robotlolita).

Note that all interactions in this project are subject to Origami Tower's
[Code of Conduct](https://github.com/origamitower/refinable/blob/master/CODE_OF_CONDUCT.md).


## Licence

Refinable is copyright (c) Quildreen Motta 2016, and released under the MIT licence. See the `LICENCE` file in this repository for detailed information.
