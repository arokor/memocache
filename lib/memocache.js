(function () {
  'use strict';
  var c = require('./cache');

  exports = module.exports = {
    memoize: function(fn, size) {
      var cache = c(size);
      return function() {
        var args = Array.prototype.slice.call(arguments);
        var hash = '';
        var i = args.length;

        var currentArg;
        while (i--) {
          currentArg = args[i];
          hash += (currentArg === Object(currentArg) ?
                   JSON.stringify(currentArg) : currentArg);
        }
//        fn.memoize || (fn.memoize = {});
//        return (hash in fn.memoize ?
//                fn.memoize[hash] : fn.memoize[hash] = fn.apply(this, args));

        if (cache.has(hash)) {
          return cache.get(hash);
        } else {
          var val = fn.apply(this, args);
          cache.put(hash, val);
          return val;
        }
      };
    }
  };
}());

