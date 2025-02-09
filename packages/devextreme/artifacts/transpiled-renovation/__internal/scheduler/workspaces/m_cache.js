"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cache = void 0;
var _type = require("../../../core/utils/type");
class Cache {
  constructor() {
    this._cache = new Map();
  }
  get size() {
    return this._cache.size;
  }
  clear() {
    this._cache.clear();
  }
  get(name, callback) {
    if (!this._cache.has(name) && callback) {
      this.set(name, callback());
    }
    return this._cache.get(name);
  }
  set(name, value) {
    (0, _type.isDefined)(value) && this._cache.set(name, value);
  }
}
exports.Cache = Cache;