/**
 * Created by jun.li on 10/29.
 */
'use strict';
var _recycle = require('./recycle');

/**
 * 运行时缓存管理
 * 注:需要在外部检测参数合法性
 * {type:{key:{time:xxx,content:xxx}}}
 */

function CacheShell(cache_type) {
    function checkType(type, caches) {
        var cache = caches[type];
        if (!cache) {
            console.error('找不到缓存类型：' + type);
        }
        return cache;
    }

    var Cache = function () {
        if (typeof  cache_type !== 'object') {
            return console.error('CACHE 初始化错误，cache_type为空');
        }
        var caches = {};
        var recycle = _recycle(cache_type);
        recycle.set(caches);//加入缓存回收器
        var cache_type_local = cache_type;
        for (var type in cache_type_local) {
            cache_type_local[type].NAME = type;
            caches[type] = {};
        }

        return {
            addType: function (type, cache) {
                type = type.NAME;
                if (caches[type]) {
                    console.error('重复添加cache,type:' + type);
                    return;
                }
                caches[type] = cache || {};
            },
            add: function (type, key, value) {
                if (!(type && key && value)) {
                    return;
                }
                type = type.NAME;
                value.time = Date.now();
                var cache = checkType(type, caches);
                (cache) && (cache[key] = value) || (console.error('添加元素找不到该类型,type:' + type));
            },
            del: function (type, key) {
                if (!(type && key)) {
                    return;
                }
                type = type.NAME;
                var cache = checkType(type, caches);
                if (cache) {
                    cache[key] = undefined;
                }
            },
            get: function (type, key) {
                type = type.NAME;
                var cache = checkType(type, caches);
                if (cache) {
                    return cache[key];
                }
                return null;
            },
            getType: function (type) {
                type = type.NAME;
                var cache = checkType(type, caches);
                if (cache) {
                    return cache;
                }
                return null;
            },
            remove: function (type) {
                type = type.NAME;
                var cache = checkType(type, caches);
                if (cache) {
                    caches[type] = undefined;
                }
            },
            clear: function (type) {
                type = type.NAME;
                var cache = checkType(type, caches);
                if (cache) {
                    caches[type] = {};
                }
            }
        }
    };
    return new Cache();
}
module.exports = CacheShell;