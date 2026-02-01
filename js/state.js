/**
 * 状态管理 - 简单的发布-订阅模式
 */

class StateManager {
    constructor(initialState = {}) {
        this.state = { ...initialState };
        this.subscribers = new Map();
        this.history = [];
        this.maxHistory = 50;
    }

    // 获取状态
    get(key) {
        if (key) {
            return this._getNestedValue(this.state, key);
        }
        return { ...this.state };
    }

    // 设置状态
    set(key, value) {
        const oldState = { ...this.state };

        if (typeof key === 'object') {
            // 批量更新
            Object.entries(key).forEach(([k, v]) => {
                this._setNestedValue(this.state, k, v);
            });
        } else {
            this._setNestedValue(this.state, key, value);
        }

        // 保存历史
        this._pushHistory(oldState);

        // 通知订阅者
        this._notify(key, value);
    }

    // 订阅状态变化
    subscribe(key, callback) {
        if (!this.subscribers.has(key)) {
            this.subscribers.set(key, new Set());
        }
        this.subscribers.get(key).add(callback);

        // 返回取消订阅函数
        return () => {
            this.subscribers.get(key)?.delete(callback);
        };
    }

    // 批量订阅多个key
    subscribeMany(keys, callback) {
        const unsubscribes = keys.map(key => this.subscribe(key, callback));
        return () => unsubscribes.forEach(unsub => unsub());
    }

    // 通知订阅者
    _notify(key, value) {
        // 通知具体key的订阅者
        if (this.subscribers.has(key)) {
            this.subscribers.get(key).forEach(cb => cb(value, key));
        }

        // 通知通配符订阅者
        if (this.subscribers.has('*')) {
            this.subscribers.get('*').forEach(cb => cb(this.state, key));
        }
    }

    // 获取嵌套值
    _getNestedValue(obj, path) {
        return path.split('.').reduce((current, prop) => current?.[prop], obj);
    }

    // 设置嵌套值
    _setNestedValue(obj, path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((current, key) => {
            if (!(key in current)) current[key] = {};
            return current[key];
        }, obj);
        target[lastKey] = value;
    }

    // 保存历史
    _pushHistory(state) {
        this.history.push(JSON.parse(JSON.stringify(state)));
        if (this.history.length > this.maxHistory) {
            this.history.shift();
        }
    }

    // 撤销
    undo() {
        if (this.history.length > 0) {
            this.state = this.history.pop();
            this._notify('*', this.state);
            return true;
        }
        return false;
    }

    // 重置状态
    reset(initialState = {}) {
        this.state = { ...initialState };
        this.history = [];
        this._notify('*', this.state);
    }

    // 监听所有变化
    watch(callback) {
        return this.subscribe('*', callback);
    }
}

// 创建全局状态实例
const state = new StateManager({
    theme: localStorage.getItem('theme') || 'dark',
    currentCategory: 'css-basic',
    currentEffect: null,
    layout: 'horizontal', // horizontal | vertical
    codeVisible: true,
    sidebarCollapsed: false,
    panelCollapsed: false,
    animationSpeed: 1,
    previewParams: {}
});

// 订阅状态变化并持久化
state.subscribe('theme', (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});

// 初始化主题
document.documentElement.setAttribute('data-theme', state.get('theme'));

// 导出
export { StateManager, state };
