/**
 * Created by jun.li on 10/29.
 */
'use strict';
var CACHE_TYPE = {
    TEST_CACHE: {RECYCLE_TIME: 1000 * 5, SHOW_LOG: true},
    TEST_CACHE_1: {RECYCLE_TIME: 1000 * 10, SHOW_LOG: true}
};
var cache = require('./src/cache')(CACHE_TYPE);
cache.add(CACHE_TYPE.TEST_CACHE, 1, {});
cache.add(CACHE_TYPE.TEST_CACHE_1, 1, {});


var cache1 = require('./src/cache')(CACHE_TYPE);
cache1.add(CACHE_TYPE.TEST_CACHE, 1, {});
cache1.add(CACHE_TYPE.TEST_CACHE_1, 1, {});