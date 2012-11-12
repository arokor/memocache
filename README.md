#Memocache
A simple memoization function and LRU cache.

Memoization is a powerful optimization technique but many implementations doesn't provide any means of controlling the cache size. This implementation uses a LRU cache with O(1) put and get operations.

##Example
    
  // function to be memoized
  var f = function(n) {
    if (n <= 2) return n;
    return f(n - 1) + f(n - 2);
  };

  // 1024 elem cache size
  var fCached = mc.memoize(f, 1024);
  
  console.log(fCached(10)); 

##License 

(The MIT License)

Copyright (c) 2012 Aron Kornhall <arokor@kornhall.se>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
