(function () {
  'use strict';
  
  exports = module.exports = function(size) {
    size = size || 100;
    var cache = {};
    var usages = [];
    var first = 0, last = size-1;

    // Prepare usage list as ring buffer
    var i;
    for (i=0; i<size; i++) {
      usages[i] = {
        prev: (size + i - 1) % size,
        next: (i+1) % size,
        key: null
      };
    }

    return {
      put: function(key, value) {
        // check whether key is already in cache. If this is the case
        // it should be the new first element. get() handles this reordering.
        var inCache = this.get(key);

        if (!inCache) {
          // get the old last element elem
          var elem = usages[last];

          // clear cache entry
          delete cache[elem.key];

          // set prev of old front
          usages[first].prev = last;
          // set next of new front
          elem.next = first;

          // set new first pointer
          first = last;
          // set new last pointer
          last = elem.prev;

          // Reuse elem as the new front
          elem.key = key;
        }

        // Insert record in cache
        cache[key] = {
          usage: first,
          val: value
        };
      },
      get: function(key) {
        var record = cache[key];
        var usage;
        if (record) {
          if (record.usage === last) {
            usage = usages[record.usage];

            // circular list - only change first and last
            last = usage.prev;
            first = record.usage;
          } else if (record.usage !== first) {
            // remove usage from list
            usage = usages[record.usage];
            // set next of prev
            usages[usage.prev].next = usage.next;
            // set prev of next
            usages[usage.next].prev = usage.prev;

            // insert usage at front of list
            usage.prev = usages[first].prev; // needed?
            usage.next = first;
            first = record.usage;
          }
          // Return record
          return record.val;
        }
      },
      has: function(key) {
        return key in cache;
      }
    };
  };
}());

