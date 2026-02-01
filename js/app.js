/**
 * 前端页面效果 Playground - 主应用入口
 */

import { StateManager } from './state.js';
import { $, $$, debounce, copyToClipboard, delegate } from './utils.js';
import { AnimationEffects } from './effects/animations.js';
import { VisualEffects } from './effects/visual.js';
import { InteractionEffects } from './effects/interactions.js';
import { ParticleEffects } from './effects/particles.js';
import { GameEffects } from './effects/games.js';
import { ComponentEffects } from './effects/components.js';
import { ChartEffects } from './effects/charts.js';

// ==================== 全局状态 ====================
const state = new StateManager({
    currentCategory: 'css-basic',
    currentEffect: null,
    theme: 'light',
    codeTab: 'html',
    sidebarCollapsed: false,
    codePreviewVisible: true
});

// ==================== 效果注册表 ====================
// 从各个效果模块收集所有效果
const effectRegistry = {
    // CSS 基础动画
    ...Object.fromEntries(
        Object.entries(AnimationEffects.basic || {}).map(([key, val]) => [key, { ...val, id: key, category: 'css-basic' }])
    ),
    // CSS 高级动画
    ...Object.fromEntries(
        Object.entries(AnimationEffects.advanced || {}).map(([key, val]) => [key, { ...val, id: key, category: 'css-advanced' }])
    ),
    // CSS 3D效果
    ...Object.fromEntries(
        Object.entries(AnimationEffects['3d'] || {}).map(([key, val]) => [key, { ...val, id: key, category: 'css-3d' }])
    ),
    // 视觉效果 - 现代设计
    ...Object.fromEntries(
        Object.entries(VisualEffects.modern || {}).map(([key, val]) => [key, { ...val, id: key, category: 'visual-modern' }])
    ),
    // 视觉效果 - 背景
    ...Object.fromEntries(
        Object.entries(VisualEffects.bg || {}).map(([key, val]) => [key, { ...val, id: key, category: 'visual-bg' }])
    ),
    // 视觉效果 - 文字
    ...Object.fromEntries(
        Object.entries(VisualEffects.text || {}).map(([key, val]) => [key, { ...val, id: key, category: 'visual-text' }])
    ),
    // 视觉效果 - 边框
    ...Object.fromEntries(
        Object.entries(VisualEffects.border || {}).map(([key, val]) => [key, { ...val, id: key, category: 'visual-border' }])
    ),
    // 粒子效果
    ...Object.fromEntries(
        Object.entries(ParticleEffects || {}).map(([key, val]) => [key, { ...val, id: key, category: 'game-mouse' }])
    ),
    // 交互效果
    ...Object.fromEntries(
        Object.entries(InteractionEffects || {}).map(([key, val]) => [key, { ...val, id: key, category: 'game-mouse' }])
    ),
    // 游戏效果
    ...Object.fromEntries(
        Object.entries(GameEffects || {}).map(([key, val]) => [key, { ...val, id: key, category: 'game-demo' }])
    ),
    // 组件效果 - ui-basic
    ...Object.fromEntries(
        Object.entries(ComponentEffects || {}).filter(([_, v]) => v.category === 'ui-basic').map(([key, val]) => [key, { ...val, id: key }])
    ),
    // 组件效果 - ui-nav
    ...Object.fromEntries(
        Object.entries(ComponentEffects || {}).filter(([_, v]) => v.category === 'ui-nav').map(([key, val]) => [key, { ...val, id: key }])
    ),
    // 组件效果 - ui-form
    ...Object.fromEntries(
        Object.entries(ComponentEffects || {}).filter(([_, v]) => v.category === 'ui-form').map(([key, val]) => [key, { ...val, id: key }])
    ),
    // 组件效果 - ui-content
    ...Object.fromEntries(
        Object.entries(ComponentEffects || {}).filter(([_, v]) => v.category === 'ui-content').map(([key, val]) => [key, { ...val, id: key }])
    ),
    // 组件效果 - ui-advanced
    ...Object.fromEntries(
        Object.entries(ComponentEffects || {}).filter(([_, v]) => v.category === 'ui-advanced').map(([key, val]) => [key, { ...val, id: key }])
    ),
    // 图表效果 - chart-basic
    ...Object.fromEntries(
        Object.entries(ChartEffects || {}).map(([key, val]) => [key, { ...val, id: key, category: 'chart-basic' }])
    )
};

// ==================== 分类配置（匹配 HTML 结构）====================
const categories = {
    // CSS动效
    'css-basic': {
        name: '基础动画',
        icon: 'fas fa-play-circle',
        parent: 'CSS动效',
        description: '常用的CSS基础动画效果展示',
        effects: Object.keys(AnimationEffects.basic || {})
    },
    'css-advanced': {
        name: '高级动画',
        icon: 'fas fa-star',
        parent: 'CSS动效',
        description: '复杂的CSS动画和加载效果',
        effects: Object.keys(AnimationEffects.advanced || {})
    },
    'css-3d': {
        name: '3D效果',
        icon: 'fas fa-cube',
        parent: 'CSS动效',
        description: '3D变换和透视效果',
        effects: Object.keys(AnimationEffects['3d'] || {})
    },
    // 交互组件
    'ui-basic': {
        name: '基础组件',
        icon: 'fas fa-window-restore',
        parent: '交互组件',
        description: '按钮、卡片、标签等基础UI组件',
        effects: Object.keys(ComponentEffects || {}).filter(key => ComponentEffects[key].category === 'ui-basic')
    },
    'ui-nav': {
        name: '导航组件',
        icon: 'fas fa-compass',
        parent: '交互组件',
        description: '导航栏、面包屑、分页等',
        effects: Object.keys(ComponentEffects || {}).filter(key => ComponentEffects[key].category === 'ui-nav')
    },
    'ui-form': {
        name: '表单组件',
        icon: 'fas fa-edit',
        parent: '交互组件',
        description: '输入框、选择器、开关等表单元素',
        effects: Object.keys(ComponentEffects || {}).filter(key => ComponentEffects[key].category === 'ui-form')
    },
    'ui-content': {
        name: '内容展示',
        icon: 'fas fa-list',
        parent: '交互组件',
        description: '列表、卡片、折叠面板等',
        effects: Object.keys(ComponentEffects || {}).filter(key => ComponentEffects[key].category === 'ui-content')
    },
    'ui-advanced': {
        name: '高级交互',
        icon: 'fas fa-cogs',
        parent: '交互组件',
        description: '复杂交互组件和动画组合',
        effects: Object.keys(ComponentEffects || {}).filter(key => ComponentEffects[key].category === 'ui-advanced')
    },
    // 数据可视化
    'chart-basic': {
        name: '基础图表',
        icon: 'fas fa-chart-line',
        parent: '数据可视化',
        description: '折线图、柱状图、饼图等基础图表',
        effects: Object.keys(ChartEffects || {})
    },
    'chart-advanced': {
        name: '高级图表',
        icon: 'fas fa-chart-pie',
        parent: '数据可视化',
        description: '雷达图、桑基图、K线图等',
        effects: []
    },
    'chart-display': {
        name: '数据展示',
        icon: 'fas fa-table',
        parent: '数据可视化',
        description: '表格、指标卡、数据列表等',
        effects: []
    },
    // 视觉效果
    'visual-modern': {
        name: '现代设计',
        icon: 'fas fa-gem',
        parent: '视觉效果',
        description: '玻璃态、新拟态、全息效果等现代设计风格',
        effects: Object.keys(VisualEffects.modern || {})
    },
    'visual-bg': {
        name: '背景效果',
        icon: 'fas fa-image',
        parent: '视觉效果',
        description: '渐变、网格、动态背景效果',
        effects: Object.keys(VisualEffects.bg || {})
    },
    'visual-text': {
        name: '文字效果',
        icon: 'fas fa-font',
        parent: '视觉效果',
        description: '渐变文字、描边、霓虹灯文字效果',
        effects: Object.keys(VisualEffects.text || {})
    },
    'visual-border': {
        name: '边框阴影',
        icon: 'fas fa-border-style',
        parent: '视觉效果',
        description: '动态边框、发光边框、裁剪路径',
        effects: Object.keys(VisualEffects.border || {})
    },
    // 交互游戏
    'game-mouse': {
        name: '鼠标交互',
        icon: 'fas fa-mouse',
        parent: '交互游戏',
        description: '鼠标跟随、粒子效果、磁性按钮',
        effects: [...Object.keys(ParticleEffects || {}), ...Object.keys(InteractionEffects || {})].slice(0, 8)
    },
    'game-scroll': {
        name: '滚动效果',
        icon: 'fas fa-scroll',
        parent: '交互游戏',
        description: '视差滚动、滚动触发动画',
        effects: ['parallax']
    },
    'game-demo': {
        name: '小游戏',
        icon: 'fas fa-puzzle-piece',
        parent: '交互游戏',
        description: '贪吃蛇、打砖块等小游戏',
        effects: Object.keys(GameEffects || {})
    },
    // 现代特性
    'feature-css': {
        name: 'CSS特性',
        icon: 'fab fa-css3-alt',
        parent: '现代特性',
        description: 'CSS Grid、Flexbox、容器查询等',
        effects: []
    },
    'feature-js': {
        name: 'JS API',
        icon: 'fab fa-js',
        parent: '现代特性',
        description: '现代JavaScript API演示',
        effects: []
    },
    'feature-responsive': {
        name: '响应式设计',
        icon: 'fas fa-mobile-alt',
        parent: '现代特性',
        description: '响应式布局、断点切换',
        effects: []
    }
};

// ==================== 主题管理 ====================
const themes = {
    dark: { name: '暗黑模式', icon: 'moon' },
    light: { name: '亮色模式', icon: 'sun' }
};

// ==================== 应用主类 ====================
class PlaygroundApp {
    constructor() {
        this.currentEffectInstance = null;
        this.fpsMonitor = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.initFPSMonitor();

        // 根据初始状态设置 body 类
        if (state.get('sidebarCollapsed')) {
            document.body.classList.add('sidebar-collapsed');
        }
        if (state.get('panelCollapsed')) {
            document.body.classList.add('panel-collapsed');
        }

        // 从 URL 加载状态
        const hash = window.location.hash.slice(1);
        if (hash) {
            const [category, effect] = hash.split('/');
            if (category && categories[category]) {
                state.set('currentCategory', category);
                // 激活对应的侧边栏项
                this.updateSidebarActive(category);
                if (effect && effectRegistry[effect]) {
                    state.set('currentEffect', effect);
                }
            }
        }

        // 应用保存的主题
        const savedTheme = localStorage.getItem('playground-theme') || 'dark';
        this.applyTheme(savedTheme);

        // 初始渲染
        this.renderContent();
        this.updatePageInfo();

        // 订阅状态变化
        state.subscribe('currentCategory', () => this.onCategoryChange());
        state.subscribe('currentEffect', () => this.onEffectChange());
        state.subscribe('codeTab', () => this.onCodeTabChange());
    }

    bindEvents() {
        // 主题切换
        $('#themeToggle')?.addEventListener('click', () => {
            const currentTheme = state.get('theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            state.set('theme', newTheme);
            this.applyTheme(newTheme);
        });

        // 代码预览切换
        $('#codeToggle')?.addEventListener('click', () => {
            const visible = state.get('codePreviewVisible');
            state.set('codePreviewVisible', !visible);
            $('#codeArea')?.classList.toggle('hidden', visible);
        });

        // 全屏按钮
        $('#fullscreenBtn')?.addEventListener('click', () => {
            this.toggleFullscreen();
        });

        // 重新播放按钮
        $('#replayBtn')?.addEventListener('click', () => {
            this.rerunCurrentEffect();
        });

        // 布局切换
        $('#layoutToggle')?.addEventListener('click', () => {
            $('#previewLayout')?.classList.toggle('vertical-layout');
        });

        // 复制代码按钮
        $('#copyCodeBtn')?.addEventListener('click', () => this.copyCurrentCode());

        // 侧边栏导航点击事件（事件委托）
        const sidebarNav = $('.sidebar-nav');
        if (sidebarNav) {
            delegate(sidebarNav, 'click', '[data-category]', (e, target) => {
                e.preventDefault();
                const category = target.dataset.category;
                state.set('currentCategory', category);
                state.set('currentEffect', null);
                window.location.hash = category;

                // 更新激活状态
                $$('.nav-list a').forEach(a => a.classList.remove('active'));
                target.classList.add('active');
            });
        }

        // 代码标签切换
        const codeTabs = $('.code-tabs');
        if (codeTabs) {
            delegate(codeTabs, 'click', '.code-tab', (e, target) => {
                const tab = target.dataset.tab;
                state.set('codeTab', tab);

                // 更新标签激活状态
                $$('.code-tab').forEach(t => t.classList.remove('active'));
                target.classList.add('active');
            });
        }

        // 左侧边栏收起/展开
        $('#menuToggle')?.addEventListener('click', () => {
            const sidebar = $('#sidebar');
            const isCollapsed = sidebar?.classList.toggle('collapsed');
            document.body.classList.toggle('sidebar-collapsed', isCollapsed);
            state.set('sidebarCollapsed', isCollapsed);

            // 切换图标
            const icon = $('#menuToggle i');
            if (icon) {
                icon.className = isCollapsed ? 'fas fa-bars' : 'fas fa-chevron-left';
            }
        });

        // 右侧边栏收起/展开
        $('#panelToggle')?.addEventListener('click', () => {
            const panel = $('#propertiesPanel');
            const isCollapsed = panel?.classList.toggle('collapsed');
            document.body.classList.toggle('panel-collapsed', isCollapsed);
            state.set('panelCollapsed', isCollapsed);

            // 切换图标
            const icon = $('#panelToggle i');
            if (icon) {
                icon.className = isCollapsed ? 'fas fa-chevron-left' : 'fas fa-chevron-right';
            }
        });

        // 模态框关闭
        $('#modalClose')?.addEventListener('click', () => {
            this.closeFullscreenModal();
        });

        $('#fullscreenModal')?.addEventListener('click', (e) => {
            if (e.target === $('#fullscreenModal')) {
                this.closeFullscreenModal();
            }
        });

        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'Enter':
                        e.preventDefault();
                        this.rerunCurrentEffect();
                        break;
                }
            }
            if (e.key === 'Escape') {
                this.closeFullscreenModal();
            }
        });

        // 搜索功能
        $('#searchInput')?.addEventListener('input', debounce((e) => {
            this.handleSearch(e.target.value);
        }, 300));
    }

    updateSidebarActive(category) {
        $$('.nav-list a').forEach(a => {
            a.classList.toggle('active', a.dataset.category === category);
        });
    }

    updatePageInfo() {
        const category = categories[state.get('currentCategory')];
        if (!category) return;

        const pageTitle = $('#pageTitle');
        const pageDesc = $('#pageDesc');

        if (pageTitle) pageTitle.textContent = category.name;
        if (pageDesc) pageDesc.textContent = category.description;
    }

    renderContent() {
        const container = $('#effectsGrid');
        if (!container) return;

        const category = state.get('currentCategory');
        const categoryData = categories[category];
        if (!categoryData) return;

        // 获取当前分类的效果列表
        const effectIds = categoryData.effects || [];

        if (effectIds.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-hammer"></i>
                    <h3>正在开发中</h3>
                    <p>此分类的效果正在紧锣密鼓地开发中，请先浏览其他已完成的分类。推荐查看 CSS动效 和 视觉效果 分类，那里有大量精彩效果！</p>
                </div>
            `;
            return;
        }

        // 渲染效果卡片
        container.innerHTML = effectIds.map(effectId => {
            const effect = effectRegistry[effectId];
            if (!effect) return '';

            return `
                <div class="effect-card" data-effect="${effectId}">
                    <div class="effect-preview">
                        ${effect.render ? effect.render() : '<div class="preview-placeholder"><i class="fas fa-image"></i><p>预览效果</p></div>'}
                    </div>
                    <div class="effect-info">
                        <h3 class="effect-name" data-type="${effect.category || 'component'}">${effect.name || effectId}</h3>
                        <p class="effect-desc">${effect.desc || ''}</p>
                    </div>
                </div>
            `;
        }).join('');

        // 绑定卡片点击事件
        container.querySelectorAll('.effect-card').forEach(card => {
            card.addEventListener('click', () => {
                const effectId = card.dataset.effect;
                this.selectEffect(effectId);
            });
        });
    }

    selectEffect(effectId) {
        state.set('currentEffect', effectId);
        window.location.hash = `${state.get('currentCategory')}/${effectId}`;

        // Highlight active card
        const cards = document.querySelectorAll('.effect-card');
        cards.forEach(card => {
            if (card.dataset.effect === effectId) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        this.showEffect(effectId);
    }

    showEffect(effectId) {
        const effect = effectRegistry[effectId];
        if (!effect) return;

        const previewStage = $('#previewStage');
        const codeDisplay = $('#codeDisplay');

        // 清理之前的效果实例
        if (this.currentEffectInstance?.destroy) {
            this.currentEffectInstance.destroy();
            this.currentEffectInstance = null;
        }

        // 渲染预览
        if (previewStage) {
            previewStage.innerHTML = '';
            if (effect.render) {
                previewStage.innerHTML = effect.render();
            } else if (effect.init) {
                // 对于需要 init 方法的效果（如粒子、游戏）
                this.currentEffectInstance = effect.init(previewStage);
            }
        }

        // 更新代码显示
        this.updateCodeDisplay(effect);

        // 更新属性面板
        this.updatePropertiesPanel(effect);
    }

    updateCodeDisplay(effect) {
        const codeDisplay = $('#codeDisplay');
        if (!codeDisplay) return;

        const currentTab = state.get('codeTab');
        let code = '';
        let language = 'html';

        switch (currentTab) {
            case 'html':
                code = effect.html || '<!-- 无需 HTML -->';
                language = 'html';
                break;
            case 'css':
                code = effect.css || '/* 无需 CSS */';
                language = 'css';
                break;
            case 'js':
                code = effect.js || '// 无需 JavaScript';
                language = 'javascript';
                break;
        }

        // 使用 Prism.js 进行代码高亮
        const highlighted = Prism.highlight(
            code,
            Prism.languages[language] || Prism.languages.html,
            language
        );

        codeDisplay.innerHTML = highlighted;
        codeDisplay.className = `language-${language}`;

        // 确保父元素有正确的类名
        const preElement = codeDisplay.parentElement;
        if (preElement && preElement.tagName === 'PRE') {
            preElement.className = `language-${language}`;
        }
    }

    updatePropertiesPanel(effect) {
        const panelContent = $('#panelContent');
        if (!panelContent) return;

        if (!effect.params || effect.params.length === 0) {
            panelContent.innerHTML = '<p class="no-params">此效果暂无可调节参数</p>';
            return;
        }

        panelContent.innerHTML = effect.params.map(param => `
            <div class="param-group">
                <label>${param.label}</label>
                ${param.type === 'slider' ? `
                    <input type="range"
                        min="${param.min}"
                        max="${param.max}"
                        step="${param.step}"
                        value="${param.value}"
                        data-param="${param.name}"
                    >
                    <span class="param-value">${param.value}</span>
                ` : `
                    <input type="${param.type}" value="${param.value}" data-param="${param.name}">
                `}
            </div>
        `).join('');
    }

    onCategoryChange() {
        this.updateSidebarActive(state.get('currentCategory'));
        this.updatePageInfo();
        this.renderContent();

        // 清除当前效果
        const previewStage = $('#previewStage');
        if (previewStage) {
            previewStage.innerHTML = '<div class="preview-placeholder">选择左侧效果进行预览</div>';
        }

        // 清除代码显示
        const codeDisplay = $('#codeDisplay');
        if (codeDisplay) {
            codeDisplay.textContent = '';
        }
    }

    onEffectChange() {
        const effectId = state.get('currentEffect');
        if (effectId) {
            this.showEffect(effectId);
        }
    }

    onCodeTabChange() {
        const effectId = state.get('currentEffect');
        if (effectId) {
            const effect = effectRegistry[effectId];
            if (effect) {
                this.updateCodeDisplay(effect);
            }
        }
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('playground-theme', theme);
        state.set('theme', theme);

        const themeBtn = $('#themeToggle');
        if (themeBtn) {
            const icon = themeBtn.querySelector('i');
            if (icon) {
                icon.className = `fas fa-${themes[theme].icon}`;
            }
        }
    }

    rerunCurrentEffect() {
        const effectId = state.get('currentEffect');
        if (effectId) {
            // 重新触发动画
            const previewStage = $('#previewStage');
            if (previewStage) {
                const content = previewStage.innerHTML;
                previewStage.innerHTML = '';
                // 强制重排
                void previewStage.offsetWidth;
                previewStage.innerHTML = content;

                // 如果是需要 init 的效果，重新初始化
                const effect = effectRegistry[effectId];
                if (effect && effect.init) {
                    if (this.currentEffectInstance?.destroy) {
                        this.currentEffectInstance.destroy();
                    }
                    previewStage.innerHTML = '';
                    this.currentEffectInstance = effect.init(previewStage);
                }
            }
        }
    }

    copyCurrentCode() {
        const codeDisplay = $('#codeDisplay');
        if (codeDisplay && codeDisplay.textContent) {
            copyToClipboard(codeDisplay.textContent);
            this.showToast('代码已复制到剪贴板', 'success');
        }
    }

    showToast(message, type = 'info') {
        const container = $('#toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        // 触发动画
        requestAnimationFrame(() => toast.classList.add('show'));

        // 自动移除
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    toggleFullscreen() {
        const modal = $('#fullscreenModal');
        const modalBody = $('#modalBody');
        const previewStage = $('#previewStage');

        if (modal && previewStage) {
            modalBody.innerHTML = previewStage.innerHTML;
            modal.classList.add('active');
        }
    }

    closeFullscreenModal() {
        $('#fullscreenModal')?.classList.remove('active');
    }

    handleSearch(query) {
        if (!query.trim()) {
            this.renderContent();
            return;
        }

        const container = $('#effectsGrid');
        if (!container) return;

        const results = Object.entries(effectRegistry).filter(([id, effect]) => {
            const searchText = `${id} ${effect.name || ''} ${effect.desc || ''}`.toLowerCase();
            return searchText.includes(query.toLowerCase());
        });

        if (results.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <h3>未找到匹配的效果</h3>
                    <p>尝试使用其他关键词搜索，或浏览侧边栏分类发现更多精彩效果</p>
                </div>
            `;
            return;
        }

        container.innerHTML = results.map(([effectId, effect]) => `
            <div class="effect-card" data-effect="${effectId}">
                <div class="effect-preview">
                    ${effect.render ? effect.render() : '<div class="preview-placeholder"><i class="fas fa-image"></i><p>预览效果</p></div>'}
                </div>
                <div class="effect-info">
                    <h3 class="effect-name" data-type="${effect.category || 'component'}">${effect.name || effectId}</h3>
                    <p class="effect-desc">${effect.desc || ''}</p>
                </div>
            </div>
        `).join('');

        // 重新绑定点击事件
        container.querySelectorAll('.effect-card').forEach(card => {
            card.addEventListener('click', () => {
                const effectId = card.dataset.effect;
                this.selectEffect(effectId);
            });
        });
    }

    initFPSMonitor() {
        let lastTime = performance.now();
        let frames = 0;
        const fpsDisplay = $('#fpsCounter');

        const updateFPS = () => {
            frames++;
            const time = performance.now();

            if (time >= lastTime + 1000) {
                const fps = Math.round((frames * 1000) / (time - lastTime));
                if (fpsDisplay) {
                    fpsDisplay.textContent = `${fps} FPS`;
                    fpsDisplay.className = 'fps-counter' + (fps >= 50 ? ' fps-good' : fps >= 30 ? ' fps-ok' : ' fps-bad');
                }
                frames = 0;
                lastTime = time;
            }

            requestAnimationFrame(updateFPS);
        };

        requestAnimationFrame(updateFPS);
    }
}

// ==================== 初始化应用 ====================
document.addEventListener('DOMContentLoaded', () => {
    window.playground = new PlaygroundApp();
});

// 导出供其他模块使用
export { PlaygroundApp, categories, effectRegistry, themes };
