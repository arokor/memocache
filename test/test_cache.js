(function () {
  'use strict';
  var cache = require('../lib/cache');
  var assert = require('assert');

  describe('General cache functionality', function() {
    var c;
    beforeEach(function() {
      c = cache(5);
    });

    it('should cache stuff', function() {
      assert(!c.get(1));
      c.put(1, 100);
      assert.strictEqual(c.get(1), 100);
    });

    it('should respect cache size', function() {
      c.put(1, 100);
      c.put(2, 200);
      c.put(3, 300);
      c.put(4, 400);
      c.put(5, 500);
      c.put(6, 600);
      assert(!c.get(1));
      assert.strictEqual(c.get(2), 200);
    });

    it('should be a LRU cache', function() {
      c.put(1, 100);
      c.put(2, 200);
      c.put(3, 300);
      c.put(4, 400);
      c.put(5, 500);
      assert.strictEqual(c.get(1), 100);
      // 1 is now most recently used

      c.put(10, 1000);
      c.put(20, 2000);
      c.put(30, 3000);
      c.put(40, 4000);

      // 1 should still be there
      assert.strictEqual(c.get(1), 100);

      // 2,3,4 and 5 should be gone
      assert(!c.get(2));
      assert(!c.get(3));
      assert(!c.get(4));
      assert(!c.get(5));
    });

    it('should work when getting first element repeatedly', function() {
      c.put(1, 100);
      c.put(2, 200);
      c.put(3, 300);
      c.put(4, 400);
      c.put(5, 500);
      assert.strictEqual(c.get(1), 100);
      assert.strictEqual(c.get(1), 100);
      assert.strictEqual(c.get(1), 100);
      assert.strictEqual(c.get(1), 100);
      assert.strictEqual(c.get(1), 100);

      // other element should still be there
      assert.strictEqual(c.get(5), 500);
    });

    it('should work when getting last element repeatedly', function() {
      c.put(1, 100);
      c.put(2, 200);
      c.put(3, 300);
      c.put(4, 400);
      c.put(5, 500);
      assert.strictEqual(c.get(5), 500);
      assert.strictEqual(c.get(4), 400);
      assert.strictEqual(c.get(3), 300);
      assert.strictEqual(c.get(2), 200);
      assert.strictEqual(c.get(1), 100);
    });

    it('should support has()', function() {
      assert(!c.has(1));
      c.put(1, 100);
      c.put(2, 200);
      c.put(3, 300);
      c.put(4, 400);
      c.put(5, 500);
      assert(c.has(1));
      assert(c.has(2));
      assert(c.has(3));
      assert(c.has(4));
      assert(c.has(5));
    });

    it('should respect cache rules also when half empty', function() {
      c.put(1, 100);
      c.put(2, 200);
      c.put(3, 300);
      assert.strictEqual(c.get(1), 100);

      c.put(4, 400);
      c.put(5, 500);
      c.put(6, 600);

      assert(c.has(1));
      assert(!c.has(2));
      assert(c.has(3));
    });

    it('set should work as update', function() {
      assert(!c.has(1));
      c.put(1, 100);
      c.put(2, 200);
      c.put(3, 300);
      c.put(4, 400);
      c.put(5, 500);

      // now reset 5 and 4
      c.put(5, 5000);
      c.put(4, 4000);

      // all elems should still be cached
      assert.strictEqual(c.get(1), 100);
      assert.strictEqual(c.get(2), 200);
      assert.strictEqual(c.get(3), 300);
      
      // 4 and 5 should be updated
      assert.strictEqual(c.get(4), 4000);
      assert.strictEqual(c.get(5), 5000);
    });
  });


  describe('Multiple instances of cache', function() {
    it('should all have their own cache', function() {
      var c1 = cache(4);
      var c2 = cache(6);
      assert(!c1.get(1));
      c1.put(1, 100);
      assert.strictEqual(c1.get(1), 100);
      assert(!c2.get(1));
      c2.put(1, 100);
      assert.strictEqual(c2.get(1), 100);
    });

    it('should all have their own size', function() {
      var c1 = cache(3);
      var c2 = cache(5);
      c1.put(1, 101);
      c1.put(2, 102);
      c1.put(3, 103);
      c1.put(4, 104);
      assert(!c1.get(1));
      assert.strictEqual(c1.get(2), 102);

      c2.put(1, 201);
      c2.put(2, 202);
      c2.put(3, 203);
      c2.put(4, 204);
      c2.put(5, 205);
      c2.put(6, 206);
      assert(!c2.get(1));
      assert.strictEqual(c2.get(2), 202);
    });
  });
}());

