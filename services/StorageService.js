
export class StorageService {
    constructor(key) {
        this.key = key;
    }

    get() {
        const value = localStorage.getItem(this.key);
        if (value) {
            return value;
        }
        return null;
    }

    set(data) {
        if (typeof data === 'object') {
            data = JSON.stringify(data);
        }
        localStorage.setItem(this.key, data);
    }

    delete() {
        localStorage.removeItem(this.key);
    }
}

export class FavoriteService extends StorageService {
    static instance;
    constructor (key = 'favorite') {
        if (!FavoriteService.instance) {
            super(key);
            this.favorite = new Set(this.get());
            FavoriteService.instance = this;
        }
        return FavoriteService.instance;
    }

    get() {
        const data = super.get();

        if (data) {
            const favorite = JSON.parse(data);
            if (Array.isArray(favorite)) {
                return favorite
            }
        }

        return [];

    }

    add(value) {
        this.favorite.add(value);
        this.set([...this.favorite]);
    }

    remove(value) {
        if (this.check(value)) {
            this.favorite.delete(value);
            this.set([...this.favorite]);
            return true;
        }
        return false;
    }

    check(value) {
        return this.favorite.has(value);

    }

}

export class AccessKeyService {
    static instance;
    constructor() {
        if (!AccessKeyService.instance) {
            this.accessKeyKey = 'accessKey';
            AccessKeyService.instance = this;
        }
        return AccessKeyService.instance;
    }

    getAccessKey() {
        return localStorage.getItem(this.accessKeyKey);
    }


    set(accessKey) {
        localStorage.setItem(this.accessKeyKey, accessKey);
    }

    clear() {
        localStorage.removeItem(this.accessKeyKey);
    }
}
