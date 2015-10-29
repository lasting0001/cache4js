/**
 * Created by jun.li on 10/29.
 */
'use strict';
//失效属性内存回收
function Recycle(cache_type) {
    var caches = {};
    var scan = function Scan() {
        var cache_type_local = cache_type;
        var interval = setInterval(function () {
            var st = Date.now();
            for (var type in caches) {
                var cache_obj = cache_type_local[type];
                if (!cache_obj) {
                    continue;
                }
                if (cache_obj.VALID_CHECK === false) {
                    continue;
                }
                var cache = caches[type];
                if (cache) {
                    for (var key in cache) {
                        var value = cache[key];
                        if (value && value.__time && (value.__time + (cache_obj && cache_obj.RECYCLE_TIME) < Date.now())) {
                            cache[key] = undefined;
                            (cache_obj.SHOW_LOG === true) && (console.log('Recycle删除type:' + type + ',key:' + key));
                        }
                    }
                }
            }
            var ct = Date.now() - st;
            if (ct > 100) {
                console.warn('Recycle cost too much time：' + ct + 'ms');
            }
            return interval;
        }, 1000 * 60 * 30);
    };
    var interval = scan();
    return {
        set: function (value) {
            caches = value;
        },
        stop: function () {
            clearInterval(interval);
        },
        start: function () {
            scan();
        }
    }
}

module.exports = Recycle;