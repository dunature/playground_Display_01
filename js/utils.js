/**
 * 工具函数库
 */

// DOM 操作工具
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

// 创建元素
const createElement = (tag, options = {}) => {
    const element = document.createElement(tag);
    if (options.className) element.className = options.className;
    if (options.id) element.id = options.id;
    if (options.text) element.textContent = options.text;
    if (options.html) element.innerHTML = options.html;
    if (options.attrs) {
        Object.entries(options.attrs).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
    }
    if (options.styles) {
        Object.assign(element.style, options.styles);
    }
    if (options.events) {
        Object.entries(options.events).forEach(([event, handler]) => {
            element.addEventListener(event, handler);
        });
    }
    return element;
};

// 防抖函数
const debounce = (fn, delay = 300) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
};

// 节流函数
const throttle = (fn, limit = 300) => {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// 随机数生成
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min, max) => Math.random() * (max - min) + min;
const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;

// 颜色转换
const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

const rgbToHex = (r, g, b) => {
    return `#${[r, g, b].map(x => Math.round(x).toString(16).padStart(2, '0')).join('')}`;
};

const interpolateColor = (color1, color2, factor) => {
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    const r = Math.round(c1.r + (c2.r - c1.r) * factor);
    const g = Math.round(c1.g + (c2.g - c1.g) * factor);
    const b = Math.round(c1.b + (c2.b - c1.b) * factor);
    return rgbToHex(r, g, b);
};

// 复制到剪贴板
const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        return success;
    }
};

// 下载文件
const downloadFile = (content, filename, type = 'text/plain') => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

// 格式化代码
const formatCode = (code, language) => {
    // 简单的代码格式化
    let formatted = code.trim();

    // HTML 转义
    formatted = formatted
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // 简单的高亮
    if (language === 'html') {
        formatted = formatted
            .replace(/&lt;(\/?)([\w-]+)/g, '<span class="code-tag">&lt;$1$2</span>')
            .replace(/(\s)([\w-]+)=/g, '$1<span class="code-attr">$2</span>=')
            .replace(/"([^"]*)"/g, '<span class="code-string">"$1"</span>');
    } else if (language === 'css') {
        formatted = formatted
            .replace(/([\w-]+)\s*:/g, '<span class="code-attr">$1</span>:')
            .replace(/:\s*([^;]+);/g, ': <span class="code-string">$1</span>;')
            .replace(/\{|\}/g, '<span class="code-keyword">$&</span>');
    } else if (language === 'js') {
        const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'from', 'async', 'await'];
        keywords.forEach(kw => {
            const regex = new RegExp(`\\b(${kw})\\b`, 'g');
            formatted = formatted.replace(regex, '<span class="code-keyword">$1</span>');
        });
        formatted = formatted
            .replace(/('[^']*'|"[^"]*"|`[^`]*`)/g, '<span class="code-string">$1</span>')
            .replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>');
    }

    return formatted;
};

// 动画帧工具
const raf = {
    id: null,
    start: (callback) => {
        const loop = (time) => {
            callback(time);
            raf.id = requestAnimationFrame(loop);
        };
        raf.id = requestAnimationFrame(loop);
        return raf.id;
    },
    stop: () => {
        if (raf.id) {
            cancelAnimationFrame(raf.id);
            raf.id = null;
        }
    }
};

// 缓动函数
const easing = {
    linear: t => t,
    easeInQuad: t => t * t,
    easeOutQuad: t => 1 - (1 - t) * (1 - t),
    easeInOutQuad: t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
    easeInCubic: t => t * t * t,
    easeOutCubic: t => 1 - Math.pow(1 - t, 3),
    easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    easeOutBounce: t => {
        const n1 = 7.5625;
        const d1 = 2.75;
        if (t < 1 / d1) return n1 * t * t;
        if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
        if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
        return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
};

// 动画工具
const animate = (options) => {
    const {
        duration = 1000,
        easing: easeFn = easing.easeInOutQuad,
        onUpdate,
        onComplete
    } = options;

    const startTime = performance.now();

    const loop = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeFn(progress);

        onUpdate(easedProgress, progress);

        if (progress < 1) {
            requestAnimationFrame(loop);
        } else {
            onComplete?.();
        }
    };

    requestAnimationFrame(loop);
};

// 检测元素是否在视口中
const isInViewport = (element, threshold = 0) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) - threshold &&
        rect.bottom >= threshold
    );
};

// 延迟执行
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 生成唯一ID
const generateId = () => `_${Math.random().toString(36).substr(2, 9)}`;

// 深度克隆
const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

// 合并对象
const deepMerge = (target, source) => {
    const result = { ...target };
    for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            result[key] = deepMerge(result[key] || {}, source[key]);
        } else {
            result[key] = source[key];
        }
    }
    return result;
};

// 事件委托
const delegate = (parent, eventType, selector, handler) => {
    parent.addEventListener(eventType, (e) => {
        const target = e.target.closest(selector);
        if (target && parent.contains(target)) {
            handler(e, target);
        }
    });
};

// 存储工具
const storage = {
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch {
            return defaultValue;
        }
    },
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('Storage error:', e);
        }
    },
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn('Storage error:', e);
        }
    }
};

// 完整屏幕API
const fullscreen = {
    isSupported: () => document.fullscreenEnabled,
    isActive: () => !!document.fullscreenElement,
    enter: (element) => element.requestFullscreen?.(),
    exit: () => document.exitFullscreen?.(),
    toggle: (element) => {
        if (fullscreen.isActive()) {
            return fullscreen.exit();
        }
        return fullscreen.enter(element);
    }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        $, $$, createElement, debounce, throttle,
        random, randomFloat, randomColor,
        hexToRgb, rgbToHex, interpolateColor,
        copyToClipboard, downloadFile, formatCode,
        raf, easing, animate, isInViewport, sleep,
        generateId, deepClone, deepMerge, delegate,
        storage, fullscreen
    };
}

export { $, $$, createElement, debounce, throttle, random,
    randomFloat, randomColor, hexToRgb, rgbToHex, interpolateColor,
    copyToClipboard, downloadFile, formatCode,
    raf, easing, animate, isInViewport, sleep,
    generateId, deepClone, deepMerge, delegate,
    storage, fullscreen };
