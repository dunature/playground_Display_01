/**
 * 简单路由管理
 */

class Router {
    constructor(options = {}) {
        this.routes = new Map();
        this.currentRoute = null;
        this.beforeHooks = [];
        this.afterHooks = [];
        this.mode = options.mode || 'hash'; // 'hash' | 'history'

        this.init();
    }

    init() {
        // 监听路由变化
        if (this.mode === 'hash') {
            window.addEventListener('hashchange', () => this.handleRoute());
        } else {
            window.addEventListener('popstate', () => this.handleRoute());
        }

        // 初始路由
        this.handleRoute();
    }

    // 注册路由
    on(path, handler) {
        this.routes.set(path, handler);
        return this;
    }

    // 注册多个路由
    register(routes) {
        Object.entries(routes).forEach(([path, handler]) => {
            this.routes.set(path, handler);
        });
        return this;
    }

    // 导航到指定路径
    navigate(path, replace = false) {
        if (this.mode === 'hash') {
            if (replace) {
                window.location.replace(`#${path}`);
            } else {
                window.location.hash = path;
            }
        } else {
            if (replace) {
                window.history.replaceState({}, '', path);
            } else {
                window.history.pushState({}, '', path);
            }
            this.handleRoute();
        }
    }

    // 处理当前路由
    handleRoute() {
        const path = this.getCurrentPath();

        // 执行前置钩子
        for (const hook of this.beforeHooks) {
            const result = hook(path, this.currentRoute);
            if (result === false) return;
        }

        // 查找匹配的路由
        const handler = this.findRoute(path);

        if (handler) {
            const prevRoute = this.currentRoute;
            this.currentRoute = path;
            handler(path, prevRoute);
        } else {
            // 404 处理
            this.handleNotFound?.(path);
        }

        // 执行后置钩子
        this.afterHooks.forEach(hook => hook(path, prevRoute));
    }

    // 获取当前路径
    getCurrentPath() {
        if (this.mode === 'hash') {
            return window.location.hash.slice(1) || '/';
        }
        return window.location.pathname + window.location.search;
    }

    // 查找匹配的路由
    findRoute(path) {
        // 精确匹配
        if (this.routes.has(path)) {
            return this.routes.get(path);
        }

        // 模式匹配（简单实现）
        for (const [routePath, handler] of this.routes) {
            if (this.matchPath(routePath, path)) {
                return handler;
            }
        }

        return null;
    }

    // 路径匹配
    matchPath(pattern, path) {
        // 将 :param 转换为正则
        const regexPattern = pattern
            .replace(/:([^/]+)/g, '([^/]+)')
            .replace(/\*/g, '.*');

        const regex = new RegExp(`^${regexPattern}$`);
        return regex.test(path);
    }

    // 前置钩子
    beforeEach(hook) {
        this.beforeHooks.push(hook);
        return this;
    }

    // 后置钩子
    afterEach(hook) {
        this.afterHooks.push(hook);
        return this;
    }

    // 获取路由参数
    getParams(pattern, path) {
        const paramNames = [];
        const regexPattern = pattern.replace(/:([^/]+)/g, (match, name) => {
            paramNames.push(name);
            return '([^/]+)';
        });

        const regex = new RegExp(`^${regexPattern}$`);
        const matches = path.match(regex);

        if (!matches) return {};

        return paramNames.reduce((params, name, index) => {
            params[name] = matches[index + 1];
            return params;
        }, {});
    }

    // 返回
    back() {
        window.history.back();
    }

    // 前进
    forward() {
        window.history.forward();
    }
}

// 创建路由实例
const router = new Router({ mode: 'hash' });

// 导出
export { Router, router };
