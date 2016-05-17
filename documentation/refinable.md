

# Refinable





> 
> **Stability: 2 - Stable**
> 
> This feature is stable, and its API is unlikely to change (unless deemed
> necessary for security or other important reasons). You should expect
> backwards compatibility with the system, and a well-defined and automated
> (if possible) migration path if it changes.
> 


  - **From:**
    refinable
  - **Copyright:**
    (c) 2016 Quildreen Motta
  - **Licence:**
    MIT
  - **Repository:**
    https://github.com/origamitower/refinable.git
  - **Category:**
    Essential Objects
  - **Portability:**
    portable
  - **Platforms:**
      - ECMAScript 5
      - ECMAScript 3 (with `es5-shim`)
  - **Maintainers:**
      - Quildreen Motta <queen@robotlolita.me>
  - **Authors:**
      - Quildreen Motta <queen@robotlolita.me>



Provides better primitives for prototype-based OO.

While JavaScript uses prototype-based OO, the most important primitive
(the "clone" operation, [[Object.create]]) is not available directly
on the object you want to extend, and takes property descriptors for
new properties, which makes using it less convenient.

The Refinable object is a base object that provides the "clone"
primitive in a more usable way, instead. The [[refine]] method
takes an object, and merges it in a copy of the receiver of the method
to create a new object:

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
    // ==> '10, 10'

    p2.toString()
    // ==> '10, 20'



## Source


```javascript
{

  /*~
   * A textual representation of this object.
   *
   * ---
   * category  : Inspecting
   * stability : stable
   *
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
   * convenient way than JavaScript's built-in [[Object.create]]::
   *
   *     const o  = Refinable.refine({ x: 0, y: 3 });
   *     const o1 = o.refine({ x: 1 });
   *     const o2 = o1.refine({ x: 2 });
   *     [o1.x, o1.y];  // ==> [1, 3]
   *     [o2.x, o2.y];  // ==> [2, 3]
   *
   * ---
   * category  : Refinement
   * stability : stable
   *
   * complexity : O(n), `n` is the number of properties.
   * type: |
   *   (a is Refinable).(Object Any) => (Object Any) <: a
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
}
```




## Properties in `Refinable`




### Inspecting




#### [`toString()`](refinable/toString)



```haskell
Refinable.() => String
```

A textual representation of this object.





### Refinement




#### [`refine(properties)`](refinable/refine)

  - **Complexity:**
    O(n), `n` is the number of properties.

```haskell
(a is Refinable).(Object Any) => (Object Any) <: a
```

Constructs a new object that's enhanced with the given properties.






