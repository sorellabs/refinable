//----------------------------------------------------------------------
//
// This source file is part of the Refinable project.
//
// See LICENCE for licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

const assert      = require('assert');
const Refinable   = require('../../');
const metamagical = require('metamagical-interface');
const defineTests = require('metamagical-mocha-bridge')(metamagical, describe, it);

defineTests(Refinable);

describe('Refinable', _ => {
  describe('refine()', _ => {
    it('Should make a new object, inheriting from proto.', () => {
      const a = Refinable.refine({ a: 1 });
      const b = a.refine({ b: 2 });

      assert(Object.getPrototypeOf(b) === a,         'b <: a');
      assert(Object.getPrototypeOf(a) === Refinable, 'a <: Refinable');
    });

    it('Should provide the new properties to the object.', () => {
      const a = Refinable.refine({ a: 1 });
      const b = a.refine({ b: 2 });

      assert.equal(a.a, 1, 'a.a === 1');
      assert.equal(b.a, 1, 'b.a === 1');
      assert.equal(b.b, 2, 'b.b === 2');
    });

    it('Should support getters.', () => {
      let b = 0;
      const a = Refinable.refine({
        get x() { return ++b; }
      });

      assert.equal(a.x, 1);
      assert.equal(a.x, 2);
    });

    it('Should support setters.', () => {
      let b = 0;
      const a = Refinable.refine({
        set x(value) { b = value; }
      });

      a.x = 2;
      assert.equal(b, 2);
    });
  });
});
