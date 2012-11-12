(function () {
  'use strict';
  var mc = require('../lib/memocache');
  var assert = require('assert');

  var f = function(n) {
    if (n <= 2) return n;
    return f(n - 1) + f(n - 2);
  };

  describe('Memocache features', function() {
    var fc;
    beforeEach(function() {
      fc = mc.memoize(f);
    });

    it('should output same as unmemoized version', function() {
      assert.strictEqual(fc(1), f(1));
      assert.strictEqual(fc(2), f(2));
      assert.strictEqual(fc(3), f(3));
      assert.strictEqual(fc(4), f(4));
      assert.strictEqual(fc(5), f(5));
    });

    it('should cache', function() {
      var n = 25;
      var t1;

      t1 = Date.now();
      var a = {
        val: f(n),
        time: Date.now() - t1
      };

      t1 = Date.now();
      var b = {
        val: fc(n),
        time: Date.now() - t1
      };

      t1 = Date.now();
      var c = {
        val: fc(n),
        time: Date.now() - t1
      };

      assert.strictEqual(a.val, b.val);
      assert.strictEqual(a.val, c.val);

      assert(a.time > c.time);
      assert(b.time > c.time);
    });
  });
}());

