//----------------------------------------------------------------------
//
// This source file is part of the Refinable project.
//
// See LICENCE for licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------


// -- ALIASES ----------------------------------------------------------
const keys       = Object.keys;
const clone      = Object.create;
const define     = Object.defineProperty;
const descriptor = Object.getOwnPropertyDescriptor;


// -- IMPLEMENTATION ---------------------------------------------------


/*~
 * Provides better primitives for prototype-based OO.
 *
 * While JavaScript uses prototype-based OO, the most important primitive
 * (the "clone" operation, [[Object.create]]) is not available directly
 * on the object you want to extend, and takes property descriptors for
 * new properties, which makes using it less convenient.
 *
 * The Refinable object is a base object that provides the "clone"
 * primitive in a more usable way, instead. The [[refine]] method
 * takes an object, and merges it in a copy of the receiver of the method
 * to create a new object:
 *
 *     const Point2d = Refinable.refine({
 *       x: 0,
 *       y: 0,
 *       toString() {
 *         return this.x + ', ' + this.y
 *       }
 *     });
 *
 *     const p1 = Point2d.refine({ x: 10, y: 10 });
 *     const p2 = p1.refine({ y: 20 });
 *
 *     p1.toString()
 *     // ==> 10, 10
 *
 *     p2.toString()
 *     // ==> 10, 20
 *
 * ---------------------------------------------------------------------
 * name        : Refinable
 * module      : refinable
 * copyright   : (c) 2016 Quildreen Motta
 * licence     : MIT
 * repository  : https://github.com/origamitower/refinable
 *
 * category    : Essential Objects
 * portability : portable
 * platforms:
 *   - ECMAScript 5
 *   - ECMAScript 3, with es5-shim
 *
 * maintainers:
 *   - Quildreen Motta <queen@robotlolita.me>
 */
module.exports = {

  /*~
   * A textual representation of this object.
   *
   * -------------------------------------------------------------------
   * name      : toString
   * category  : Inspecting
   * stability : stable
   *
   * signature: .toString()
   * type: |
   *   Refinable.() => String
   */
  toString() {
    return '[object Refinable]';
  },


  /*~
   * Constructs a new object that's enhanced with the given properties.
   *
   * The [[refine]] operation allows one to copy the receiver object,
   * and enhance that copy with the provided properties, in a more
   * convenient way than JavaScript's built-in [[Object.create]]:
   *
   *     const o1 = o.refine({ x: 1 });
   *     const o2 = o1.refine({ x: 2 });
   *     o1.x  // ==> 1
   *     o2.x  // ==> 2
   *
   * -------------------------------------------------------------------
   * name      : refine
   * category  : Refinement
   * stability : stable
   *
   * complexity : O(n), `n` is the number of properties.
   * signature  : .refine(properties)
   * type: |
   *   ('a is Refinable).(Object Any) => (Object Any) <: 'a
   */
  refine(properties) {
    const instance = clone(this);
    const names    = keys(properties);

    for (let i = 0; i < names.length; ++i) {
      const name = names[i];
      define(instance, name, descriptor(properties, name));
    }

    return instance;
  }
};
