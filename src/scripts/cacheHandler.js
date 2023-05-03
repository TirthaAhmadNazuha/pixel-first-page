const ASSET_VERSION = 1;
const CacheHandler = class {
  constructor(cacheName) {
    this.cacheName = cacheName;
    this.cache = caches.open(cacheName);
  }
  async add(url) {
    const c = await this.cache;
    c.add(url);
  }

  async find(url) {
    const c = await this.cache;
    const result = await c.match(url);
    if (result) return result;
    return false;
  }
};

const cacheHandler = new CacheHandler(`static-V${ASSET_VERSION}`);

export default cacheHandler;
