/**
 * 交互组件效果集合
 * 包含：基础组件、导航组件、表单组件、内容展示、高级交互
 */

// ==================== UI基础组件 ====================
const UIBasicEffects = {
    // 按钮样式集
    buttonStyles: {
        name: '按钮样式集',
        desc: '多种精美按钮设计：渐变、阴影、描边、幽灵风格',
        category: 'ui-basic',
        render: () => `
            <div style="display: flex; flex-direction: column; gap: 20px; align-items: center; padding: 20px;">
                <div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center;">
                    <button class="pg-btn pg-btn-gradient">渐变按钮</button>
                    <button class="pg-btn pg-btn-glow">发光按钮</button>
                    <button class="pg-btn pg-btn-outline">描边按钮</button>
                    <button class="pg-btn pg-btn-ghost">幽灵按钮</button>
                </div>
                <div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center;">
                    <button class="pg-btn pg-btn-3d">3D立体</button>
                    <button class="pg-btn pg-btn-neon">霓虹效果</button>
                    <button class="pg-btn pg-btn-glass">玻璃态</button>
                    <button class="pg-btn pg-btn-ripple">波纹效果</button>
                </div>
            </div>
        `,
        html: `<button class="pg-btn pg-btn-gradient">渐变按钮</button>
<button class="pg-btn pg-btn-glow">发光按钮</button>
<button class="pg-btn pg-btn-outline">描边按钮</button>
<button class="pg-btn pg-btn-ghost">幽灵按钮</button>`,
        css: `.pg-btn {
    padding: 12px 28px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.pg-btn-gradient {
    background: linear-gradient(135deg, #6366f1, #ec4899);
    color: white;
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
}

.pg-btn-gradient:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.6);
}

.pg-btn-glow {
    background: #6366f1;
    color: white;
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
}

.pg-btn-glow:hover {
    box-shadow: 0 0 30px rgba(99, 102, 241, 0.8);
}

.pg-btn-outline {
    background: transparent;
    border: 2px solid #6366f1;
    color: #6366f1;
}

.pg-btn-outline:hover {
    background: #6366f1;
    color: white;
}

.pg-btn-ghost {
    background: rgba(99, 102, 241, 0.1);
    color: #6366f1;
}

.pg-btn-ghost:hover {
    background: rgba(99, 102, 241, 0.2);
}`
    },

    // 悬停卡片
    cardHover: {
        name: '悬停卡片',
        desc: '3D抬升、光泽扫过、边框发光等精美卡片效果',
        category: 'ui-basic',
        render: () => `
            <div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; padding: 20px;">
                <div class="pg-card pg-card-lift">
                    <div class="pg-card-image"></div>
                    <div class="pg-card-content">
                        <h4>3D抬升卡片</h4>
                        <p>悬浮时产生立体抬升效果</p>
                    </div>
                </div>
                <div class="pg-card pg-card-shine">
                    <div class="pg-card-image" style="background: linear-gradient(135deg, #ec4899, #f59e0b);"></div>
                    <div class="pg-card-content">
                        <h4>光泽扫过效果</h4>
                        <p>鼠标悬停时光泽扫过卡片</p>
                    </div>
                </div>
                <div class="pg-card pg-card-border">
                    <div class="pg-card-image" style="background: linear-gradient(135deg, #22c55e, #3b82f6);"></div>
                    <div class="pg-card-content">
                        <h4>渐变边框发光</h4>
                        <p>动态渐变边框效果</p>
                    </div>
                </div>
            </div>
        `,
        html: `<div class="pg-card pg-card-lift">
    <div class="pg-card-image"></div>
    <div class="pg-card-content">
        <h4>3D抬升卡片</h4>
        <p>悬浮时产生立体抬升效果</p>
    </div>
</div>`,
        css: `.pg-card {
    width: 200px;
    background: var(--bg-secondary);
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.pg-card-image {
    height: 120px;
    background: linear-gradient(135deg, #6366f1, #ec4899);
}

.pg-card-content {
    padding: 16px;
}

.pg-card-content h4 {
    margin: 0 0 8px 0;
    color: var(--text-primary);
}

.pg-card-content p {
    margin: 0;
    font-size: 13px;
    color: var(--text-secondary);
}

/* 3D抬升效果 */
.pg-card-lift:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

/* 光泽扫过效果 */
.pg-card-shine {
    position: relative;
}

.pg-card-shine::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s;
}

.pg-card-shine:hover::before {
    left: 100%;
}

/* 渐变边框 */
.pg-card-border {
    position: relative;
    background: var(--bg-primary);
}

.pg-card-border::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(45deg, #6366f1, #ec4899, #22c55e);
    border-radius: 18px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s;
}

.pg-card-border:hover::before {
    opacity: 1;
}`
    },

    // 徽章标签
    badgeTags: {
        name: '徽章标签',
        desc: '圆点状态、数字徽标、多彩标签',
        category: 'ui-basic',
        render: () => `
            <div style="display: flex; flex-direction: column; gap: 25px; align-items: center; padding: 20px;">
                <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
                    <span class="pg-badge pg-badge-dot pg-badge-primary">主要</span>
                    <span class="pg-badge pg-badge-dot pg-badge-success">成功</span>
                    <span class="pg-badge pg-badge-dot pg-badge-warning">警告</span>
                    <span class="pg-badge pg-badge-dot pg-badge-error">错误</span>
                </div>
                <div style="display: flex; gap: 15px; align-items: center;">
                    <div class="pg-avatar">
                        <div class="pg-avatar-image"></div>
                        <span class="pg-avatar-badge">3</span>
                    </div>
                    <div class="pg-avatar">
                        <div class="pg-avatar-image" style="background: linear-gradient(135deg, #ec4899, #f59e0b);"></div>
                        <span class="pg-avatar-badge pg-avatar-badge-dot"></span>
                    </div>
                </div>
                <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
                    <span class="pg-tag">标签一</span>
                    <span class="pg-tag pg-tag-blue">蓝色</span>
                    <span class="pg-tag pg-tag-green">绿色</span>
                    <span class="pg-tag pg-tag-purple">紫色</span>
                    <span class="pg-tag pg-tag-round">圆角</span>
                </div>
            </div>
        `,
        html: `<span class="pg-badge pg-badge-dot pg-badge-primary">主要</span>
<span class="pg-tag pg-tag-blue">蓝色标签</span>`,
        css: `.pg-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
}

.pg-badge-dot::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
}

.pg-badge-primary { background: rgba(99, 102, 241, 0.15); color: #6366f1; }
.pg-badge-success { background: rgba(34, 197, 94, 0.15); color: #22c55e; }
.pg-badge-warning { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }
.pg-badge-error { background: rgba(239, 68, 68, 0.15); color: #ef4444; }

.pg-avatar {
    position: relative;
    width: 50px;
    height: 50px;
}

.pg-avatar-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #3b82f6);
}

.pg-avatar-badge {
    position: absolute;
    top: -2px;
    right: -2px;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    background: #ef4444;
    color: white;
    border-radius: 9px;
    font-size: 11px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--bg-primary);
}

.pg-avatar-badge-dot {
    width: 14px;
    min-width: 14px;
    height: 14px;
    padding: 0;
    background: #22c55e;
}

.pg-tag {
    padding: 4px 12px;
    background: var(--bg-tertiary);
    border-radius: 4px;
    font-size: 12px;
    color: var(--text-secondary);
}

.pg-tag-blue { background: rgba(59, 130, 246, 0.15); color: #3b82f6; }
.pg-tag-green { background: rgba(34, 197, 94, 0.15); color: #22c55e; }
.pg-tag-purple { background: rgba(168, 85, 247, 0.15); color: #a855f7; }
.pg-tag-round { border-radius: 20px; }`
    },

    // 骨架屏卡片
    skeletonCards: {
        name: '骨架屏加载',
        desc: '优雅的加载占位效果，包括列表、图文、组合骨架',
        category: 'ui-basic',
        render: () => `
            <div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; padding: 20px;">
                <div class="pg-skeleton-card">
                    <div class="pg-skeleton pg-skeleton-image"></div>
                    <div class="pg-skeleton-content">
                        <div class="pg-skeleton pg-skeleton-title"></div>
                        <div class="pg-skeleton pg-skeleton-text"></div>
                        <div class="pg-skeleton pg-skeleton-text" style="width: 70%;"></div>
                    </div>
                </div>
                <div class="pg-skeleton-list">
                    <div class="pg-skeleton-item">
                        <div class="pg-skeleton pg-skeleton-avatar"></div>
                        <div style="flex: 1;">
                            <div class="pg-skeleton pg-skeleton-line" style="width: 40%;"></div>
                            <div class="pg-skeleton pg-skeleton-line" style="width: 70%; margin-top: 8px;"></div>
                        </div>
                    </div>
                    <div class="pg-skeleton-item">
                        <div class="pg-skeleton pg-skeleton-avatar"></div>
                        <div style="flex: 1;">
                            <div class="pg-skeleton pg-skeleton-line" style="width: 50%;"></div>
                            <div class="pg-skeleton pg-skeleton-line" style="width: 60%; margin-top: 8px;"></div>
                        </div>
                    </div>
                    <div class="pg-skeleton-item">
                        <div class="pg-skeleton pg-skeleton-avatar"></div>
                        <div style="flex: 1;">
                            <div class="pg-skeleton pg-skeleton-line" style="width: 35%;"></div>
                            <div class="pg-skeleton pg-skeleton-line" style="width: 80%; margin-top: 8px;"></div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        html: `<div class="pg-skeleton-card">
    <div class="pg-skeleton pg-skeleton-image"></div>
    <div class="pg-skeleton-content">
        <div class="pg-skeleton pg-skeleton-title"></div>
        <div class="pg-skeleton pg-skeleton-text"></div>
    </div>
</div>`,
        css: `.pg-skeleton {
    background: linear-gradient(90deg, var(--bg-tertiary) 25%, var(--border-light) 50%, var(--bg-tertiary) 75%);
    background-size: 200% 100%;
    animation: pg-skeleton-loading 1.5s ease-in-out infinite;
    border-radius: 4px;
}

@keyframes pg-skeleton-loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

.pg-skeleton-card {
    width: 200px;
    background: var(--bg-secondary);
    border-radius: 12px;
    overflow: hidden;
}

.pg-skeleton-image {
    height: 120px;
    border-radius: 0;
}

.pg-skeleton-content {
    padding: 16px;
}

.pg-skeleton-title {
    height: 18px;
    width: 60%;
    margin-bottom: 12px;
}

.pg-skeleton-text {
    height: 12px;
    margin-bottom: 8px;
}

.pg-skeleton-list {
    width: 250px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.pg-skeleton-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: var(--bg-secondary);
    border-radius: 8px;
}

.pg-skeleton-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    flex-shrink: 0;
}

.pg-skeleton-line {
    height: 12px;
    border-radius: 3px;
}`
    }
};

// ==================== 导航组件 ====================
const UINavEffects = {
    // 选项卡
    tabsComponent: {
        name: '选项卡组件',
        desc: '多种风格的选项卡：下划线、胶囊、滑动指示器',
        category: 'ui-nav',
        render: () => `
            <div style="display: flex; flex-direction: column; gap: 30px; align-items: center; padding: 20px;">
                <div class="pg-tabs pg-tabs-line">
                    <div class="pg-tab pg-tab-active">首页</div>
                    <div class="pg-tab">产品</div>
                    <div class="pg-tab">关于</div>
                    <div class="pg-tab">联系</div>
                </div>
                <div class="pg-tabs pg-tabs-pill">
                    <div class="pg-tab pg-tab-active">日视图</div>
                    <div class="pg-tab">周视图</div>
                    <div class="pg-tab">月视图</div>
                </div>
                <div class="pg-tabs pg-tabs-slider">
                    <div class="pg-tab pg-tab-active">选项一</div>
                    <div class="pg-tab">选项二</div>
                    <div class="pg-tab">选项三</div>
                    <div class="pg-tab-indicator"></div>
                </div>
            </div>
        `,
        html: `<div class="pg-tabs pg-tabs-line">
    <div class="pg-tab pg-tab-active">首页</div>
    <div class="pg-tab">产品</div>
    <div class="pg-tab">关于</div>
</div>`,
        css: `.pg-tabs {
    display: flex;
    gap: 4px;
    position: relative;
}

.pg-tab {
    padding: 10px 20px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-secondary);
    transition: all 0.3s;
    position: relative;
    white-space: nowrap;
}

.pg-tab:hover {
    color: var(--text-primary);
}

.pg-tab-active {
    color: var(--primary);
}

/* 下划线风格 */
.pg-tabs-line .pg-tab::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--primary);
    transform: scaleX(0);
    transition: transform 0.3s;
}

.pg-tabs-line .pg-tab-active::after {
    transform: scaleX(1);
}

/* 胶囊风格 */
.pg-tabs-pill {
    background: var(--bg-tertiary);
    padding: 4px;
    border-radius: 10px;
}

.pg-tabs-pill .pg-tab {
    border-radius: 8px;
}

.pg-tabs-pill .pg-tab-active {
    background: var(--primary);
    color: white;
}

/* 滑动指示器 */
.pg-tabs-slider {
    background: var(--bg-tertiary);
    padding: 4px;
    border-radius: 10px;
}

.pg-tabs-slider .pg-tab {
    z-index: 1;
}

.pg-tab-indicator {
    position: absolute;
    top: 4px;
    left: 4px;
    height: calc(100% - 8px);
    background: var(--primary);
    border-radius: 8px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    width: 60px;
}`
    },

    // 面包屑导航
    breadcrumbs: {
        name: '面包屑导航',
        desc: '多种分隔符风格：斜杠、箭头、折叠长路径',
        category: 'ui-nav',
        render: () => `
            <div style="display: flex; flex-direction: column; gap: 25px; align-items: center; padding: 20px;">
                <nav class="pg-breadcrumb pg-breadcrumb-slash">
                    <span class="pg-breadcrumb-item">首页</span>
                    <span class="pg-breadcrumb-item">产品</span>
                    <span class="pg-breadcrumb-item">详情</span>
                </nav>
                <nav class="pg-breadcrumb pg-breadcrumb-arrow">
                    <span class="pg-breadcrumb-item">工作台</span>
                    <span class="pg-breadcrumb-item">项目管理</span>
                    <span class="pg-breadcrumb-item pg-breadcrumb-active">任务列表</span>
                </nav>
                <nav class="pg-breadcrumb pg-breadcrumb-dot">
                    <span class="pg-breadcrumb-item">设置</span>
                    <span class="pg-breadcrumb-item">账户</span>
                    <span class="pg-breadcrumb-item">安全</span>
                    <span class="pg-breadcrumb-item pg-breadcrumb-active">两步验证</span>
                </nav>
            </div>
        `,
        html: `<nav class="pg-breadcrumb pg-breadcrumb-slash">
    <span class="pg-breadcrumb-item">首页</span>
    <span class="pg-breadcrumb-item">产品</span>
    <span class="pg-breadcrumb-item">详情</span>
</nav>`,
        css: `.pg-breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
}

.pg-breadcrumb-item {
    color: var(--text-secondary);
    cursor: pointer;
    transition: color 0.2s;
}

.pg-breadcrumb-item:hover {
    color: var(--text-primary);
}

.pg-breadcrumb-active {
    color: var(--primary);
    font-weight: 500;
}

/* 斜杠分隔符 */
.pg-breadcrumb-slash .pg-breadcrumb-item:not(:last-child)::after {
    content: '/';
    margin-left: 8px;
    color: var(--text-muted);
}

/* 箭头分隔符 */
.pg-breadcrumb-arrow .pg-breadcrumb-item:not(:last-child)::after {
    content: '→';
    margin-left: 8px;
    color: var(--text-muted);
}

/* 圆点分隔符 */
.pg-breadcrumb-dot .pg-breadcrumb-item:not(:last-child)::after {
    content: '';
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--text-muted);
    margin: 0 0 2px 8px;
    vertical-align: middle;
}`
    },

    // 分页器
    pagination: {
        name: '分页器',
        desc: '简约、圆角、带跳转的分页组件',
        category: 'ui-nav',
        render: () => `
            <div style="display: flex; flex-direction: column; gap: 25px; align-items: center; padding: 20px;">
                <div class="pg-pagination">
                    <button class="pg-page-btn pg-page-prev"><i class="fas fa-chevron-left"></i></button>
                    <button class="pg-page-btn pg-page-active">1</button>
                    <button class="pg-page-btn">2</button>
                    <button class="pg-page-btn">3</button>
                    <span class="pg-page-ellipsis">...</span>
                    <button class="pg-page-btn">10</button>
                    <button class="pg-page-btn pg-page-next"><i class="fas fa-chevron-right"></i></button>
                </div>
                <div class="pg-pagination pg-pagination-simple">
                    <button class="pg-page-btn"><i class="fas fa-arrow-left"></i> 上一页</button>
                    <span class="pg-page-info">第 3 / 10 页</span>
                    <button class="pg-page-btn">下一页 <i class="fas fa-arrow-right"></i></button>
                </div>
            </div>
        `,
        html: `<div class="pg-pagination">
    <button class="pg-page-btn pg-page-prev"><i class="fas fa-chevron-left"></i></button>
    <button class="pg-page-btn pg-page-active">1</button>
    <button class="pg-page-btn">2</button>
    <button class="pg-page-btn">3</button>
    <span class="pg-page-ellipsis">...</span>
    <button class="pg-page-btn">10</button>
    <button class="pg-page-btn pg-page-next"><i class="fas fa-chevron-right"></i></button>
</div>`,
        css: `.pg-pagination {
    display: flex;
    align-items: center;
    gap: 6px;
}

.pg-page-btn {
    min-width: 36px;
    height: 36px;
    padding: 0 10px;
    border: none;
    background: var(--bg-tertiary);
    color: var(--text-secondary);
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
}

.pg-page-btn:hover {
    background: var(--primary);
    color: white;
}

.pg-page-active {
    background: var(--primary);
    color: white;
}

.pg-page-ellipsis {
    color: var(--text-muted);
    padding: 0 4px;
}

.pg-pagination-simple .pg-page-btn {
    padding: 0 16px;
}

.pg-page-info {
    color: var(--text-secondary);
    font-size: 14px;
    margin: 0 10px;
}`
    }
};

// ==================== 表单组件 ====================
const UIFormEffects = {
    // 输入框焦点效果
    inputFocus: {
        name: '输入框焦点效果',
        desc: '边框动画、浮动标签、验证状态',
        category: 'ui-form',
        render: () => `
            <div style="display: flex; flex-direction: column; gap: 25px; align-items: center; padding: 20px; min-width: 300px;">
                <div class="pg-input-wrap">
                    <input type="text" class="pg-input" placeholder=" " value="">
                    <label class="pg-input-label">用户名</label>
                    <div class="pg-input-line"></div>
                </div>
                <div class="pg-input-wrap pg-input-success">
                    <input type="email" class="pg-input" placeholder=" " value="user@example.com">
                    <label class="pg-input-label">邮箱</label>
                    <i class="fas fa-check-circle pg-input-icon"></i>
                </div>
                <div class="pg-input-wrap pg-input-error">
                    <input type="password" class="pg-input" placeholder=" " value="123">
                    <label class="pg-input-label">密码</label>
                    <span class="pg-input-message">密码太短</span>
                </div>
            </div>
        `,
        html: `<div class="pg-input-wrap">
    <input type="text" class="pg-input" placeholder=" ">
    <label class="pg-input-label">用户名</label>
    <div class="pg-input-line"></div>
</div>`,
        css: `.pg-input-wrap {
    position: relative;
    width: 100%;
    max-width: 280px;
}

.pg-input {
    width: 100%;
    padding: 16px 12px 8px;
    background: var(--bg-tertiary);
    border: 2px solid transparent;
    border-radius: 10px;
    color: var(--text-primary);
    font-size: 15px;
    transition: all 0.3s;
    outline: none;
}

.pg-input:focus {
    border-color: var(--primary);
    background: var(--bg-secondary);
}

.pg-input-label {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
    font-size: 15px;
    pointer-events: none;
    transition: all 0.2s;
}

.pg-input:focus ~ .pg-input-label,
.pg-input:not(:placeholder-shown) ~ .pg-input-label {
    top: 8px;
    transform: translateY(0);
    font-size: 11px;
    color: var(--primary);
}

.pg-input-line {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: var(--primary);
    transition: all 0.3s;
}

.pg-input:focus ~ .pg-input-line {
    left: 0;
    width: 100%;
}

.pg-input-success .pg-input {
    border-color: #22c55e;
}

.pg-input-success .pg-input-label {
    color: #22c55e;
}

.pg-input-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #22c55e;
}

.pg-input-error .pg-input {
    border-color: #ef4444;
}

.pg-input-error .pg-input-label {
    color: #ef4444;
}

.pg-input-message {
    position: absolute;
    bottom: -20px;
    left: 0;
    font-size: 12px;
    color: #ef4444;
}`
    },

    // 开关组件
    toggleSwitches: {
        name: '开关组件',
        desc: 'iOS风格、安卓风格、圆角开关',
        category: 'ui-form',
        render: () => `
            <div style="display: flex; flex-direction: column; gap: 30px; align-items: center; padding: 20px;">
                <div style="display: flex; gap: 30px; align-items: center;">
                    <label class="pg-switch pg-switch-ios">
                        <input type="checkbox" checked>
                        <span class="pg-switch-slider"></span>
                    </label>
                    <label class="pg-switch pg-switch-android">
                        <input type="checkbox">
                        <span class="pg-switch-slider"></span>
                    </label>
                    <label class="pg-switch pg-switch-round">
                        <input type="checkbox" checked>
                        <span class="pg-switch-slider"></span>
                    </label>
                </div>
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    <label class="pg-switch-label">
                        <span class="pg-switch pg-switch-ios">
                            <input type="checkbox" checked>
                            <span class="pg-switch-slider"></span>
                        </span>
                        <span>接收通知</span>
                    </label>
                    <label class="pg-switch-label">
                        <span class="pg-switch pg-switch-ios">
                            <input type="checkbox">
                            <span class="pg-switch-slider"></span>
                        </span>
                        <span>自动更新</span>
                    </label>
                </div>
            </div>
        `,
        html: `<label class="pg-switch pg-switch-ios">
    <input type="checkbox" checked>
    <span class="pg-switch-slider"></span>
</label>`,
        css: `.pg-switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 28px;
    cursor: pointer;
}

.pg-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.pg-switch-slider {
    position: absolute;
    inset: 0;
    background: var(--bg-tertiary);
    transition: 0.3s;
    border-radius: 28px;
}

.pg-switch-slider::before {
    content: '';
    position: absolute;
    height: 22px;
    width: 22px;
    left: 3px;
    bottom: 3px;
    background: white;
    transition: 0.3s;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.pg-switch input:checked + .pg-switch-slider {
    background: var(--primary);
}

.pg-switch input:checked + .pg-switch-slider::before {
    transform: translateX(22px);
}

/* iOS风格 */
.pg-switch-ios .pg-switch-slider {
    background: var(--bg-tertiary);
}

.pg-switch-ios input:checked + .pg-switch-slider {
    background: #34c759;
}

/* 安卓风格 */
.pg-switch-android {
    width: 36px;
    height: 14px;
}

.pg-switch-android .pg-switch-slider {
    border-radius: 7px;
    background: rgba(255,255,255,0.3);
}

.pg-switch-android .pg-switch-slider::before {
    width: 20px;
    height: 20px;
    left: -2px;
    bottom: -3px;
    background: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.4);
}

.pg-switch-android input:checked + .pg-switch-slider {
    background: rgba(99, 102, 241, 0.5);
}

.pg-switch-android input:checked + .pg-switch-slider::before {
    transform: translateX(20px);
    background: var(--primary);
}

/* 圆角风格 */
.pg-switch-round .pg-switch-slider {
    border-radius: 8px;
}

.pg-switch-label {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    font-size: 14px;
    color: var(--text-secondary);
}`
    },

    // 复选框和单选
    checkboxRadio: {
        name: '复选框与单选',
        desc: '自定义样式的复选框和单选按钮',
        category: 'ui-form',
        render: () => `
            <div style="display: flex; gap: 40px; flex-wrap: wrap; justify-content: center; padding: 20px;">
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    <label class="pg-checkbox">
                        <input type="checkbox" checked>
                        <span class="pg-checkmark"></span>
                        <span>选项一</span>
                    </label>
                    <label class="pg-checkbox">
                        <input type="checkbox">
                        <span class="pg-checkmark"></span>
                        <span>选项二</span>
                    </label>
                    <label class="pg-checkbox pg-checkbox-disabled">
                        <input type="checkbox" disabled>
                        <span class="pg-checkmark"></span>
                        <span>禁用选项</span>
                    </label>
                </div>
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    <label class="pg-radio">
                        <input type="radio" name="radio-group" checked>
                        <span class="pg-radiomark"></span>
                        <span>选项 A</span>
                    </label>
                    <label class="pg-radio">
                        <input type="radio" name="radio-group">
                        <span class="pg-radiomark"></span>
                        <span>选项 B</span>
                    </label>
                    <label class="pg-radio">
                        <input type="radio" name="radio-group">
                        <span class="pg-radiomark"></span>
                        <span>选项 C</span>
                    </label>
                </div>
            </div>
        `,
        html: `<label class="pg-checkbox">
    <input type="checkbox" checked>
    <span class="pg-checkmark"></span>
    <span>选项一</span>
</label>

<label class="pg-radio">
    <input type="radio" name="radio-group" checked>
    <span class="pg-radiomark"></span>
    <span>选项 A</span>
</label>`,
        css: `.pg-checkbox, .pg-radio {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    font-size: 14px;
    color: var(--text-secondary);
    position: relative;
}

.pg-checkbox input, .pg-radio input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

.pg-checkmark, .pg-radiomark {
    width: 20px;
    height: 20px;
    background: var(--bg-tertiary);
    border: 2px solid var(--border-color);
    transition: all 0.2s;
    position: relative;
    flex-shrink: 0;
}

.pg-checkmark {
    border-radius: 5px;
}

.pg-radiomark {
    border-radius: 50%;
}

.pg-checkbox:hover input ~ .pg-checkmark,
.pg-radio:hover input ~ .pg-radiomark {
    border-color: var(--primary);
}

.pg-checkbox input:checked ~ .pg-checkmark {
    background: var(--primary);
    border-color: var(--primary);
}

.pg-checkmark::after {
    content: '';
    position: absolute;
    display: none;
    left: 5px;
    top: 1px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

.pg-checkbox input:checked ~ .pg-checkmark::after {
    display: block;
}

.pg-radio input:checked ~ .pg-radiomark {
    border-color: var(--primary);
    border-width: 5px;
}

.pg-checkbox-disabled {
    opacity: 0.5;
    cursor: not-allowed;
}`
    }
};

// ==================== 内容展示组件 ====================
const UIContentEffects = {
    // 折叠面板
    accordion: {
        name: '折叠面板',
        desc: '手风琴式内容展开收起效果',
        category: 'ui-content',
        render: () => `
            <div style="width: 100%; max-width: 400px; padding: 20px;">
                <div class="pg-accordion">
                    <div class="pg-accordion-item pg-accordion-active">
                        <div class="pg-accordion-header">
                            <span>什么是前端效果 Playground？</span>
                            <i class="fas fa-chevron-down pg-accordion-icon"></i>
                        </div>
                        <div class="pg-accordion-body">
                            <p>这是一个展示各种前端效果的交互式平台，包含CSS动画、视觉效果、交互组件等。</p>
                        </div>
                    </div>
                    <div class="pg-accordion-item">
                        <div class="pg-accordion-header">
                            <span>如何使用这些效果？</span>
                            <i class="fas fa-chevron-down pg-accordion-icon"></i>
                        </div>
                        <div class="pg-accordion-body">
                            <p>点击任意效果卡片即可查看预览和代码，代码支持一键复制。</p>
                        </div>
                    </div>
                    <div class="pg-accordion-item">
                        <div class="pg-accordion-header">
                            <span>支持哪些浏览器？</span>
                            <i class="fas fa-chevron-down pg-accordion-icon"></i>
                        </div>
                        <div class="pg-accordion-body">
                            <p>支持所有现代浏览器，包括 Chrome、Firefox、Safari、Edge 等。</p>
                        </div>
                    </div>
                </div>
            </div>
        `,
        html: `<div class="pg-accordion">
    <div class="pg-accordion-item pg-accordion-active">
        <div class="pg-accordion-header">
            <span>标题</span>
            <i class="fas fa-chevron-down"></i>
        </div>
        <div class="pg-accordion-body">
            <p>内容</p>
        </div>
    </div>
</div>`,
        css: `.pg-accordion {
    border-radius: 12px;
    overflow: hidden;
    background: var(--bg-secondary);
}

.pg-accordion-item {
    border-bottom: 1px solid var(--border-color);
}

.pg-accordion-item:last-child {
    border-bottom: none;
}

.pg-accordion-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    cursor: pointer;
    font-weight: 500;
    color: var(--text-primary);
    transition: background 0.2s;
}

.pg-accordion-header:hover {
    background: rgba(255,255,255,0.02);
}

.pg-accordion-icon {
    transition: transform 0.3s;
    color: var(--text-muted);
    font-size: 14px;
}

.pg-accordion-active .pg-accordion-icon {
    transform: rotate(180deg);
}

.pg-accordion-body {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
}

.pg-accordion-active .pg-accordion-body {
    max-height: 200px;
}

.pg-accordion-body p {
    padding: 0 20px 16px;
    margin: 0;
    color: var(--text-secondary);
    font-size: 14px;
    line-height: 1.6;
}`
    },

    // 时间轴
    timeline: {
        name: '时间轴',
        desc: '垂直时间轴展示',
        category: 'ui-content',
        render: () => `
            <div style="padding: 20px;">
                <div class="pg-timeline">
                    <div class="pg-timeline-item">
                        <div class="pg-timeline-dot pg-timeline-dot-primary"></div>
                        <div class="pg-timeline-content">
                            <div class="pg-timeline-time">2024-01</div>
                            <div class="pg-timeline-title">项目启动</div>
                            <div class="pg-timeline-desc">确定项目目标和技术方案</div>
                        </div>
                    </div>
                    <div class="pg-timeline-item">
                        <div class="pg-timeline-dot pg-timeline-dot-success"></div>
                        <div class="pg-timeline-content">
                            <div class="pg-timeline-time">2024-03</div>
                            <div class="pg-timeline-title">第一阶段完成</div>
                            <div class="pg-timeline-desc">核心功能开发完成</div>
                        </div>
                    </div>
                    <div class="pg-timeline-item">
                        <div class="pg-timeline-dot pg-timeline-dot-warning"></div>
                        <div class="pg-timeline-content">
                            <div class="pg-timeline-time">2024-06</div>
                            <div class="pg-timeline-title">测试阶段</div>
                            <div class="pg-timeline-desc">进行全面的测试和优化</div>
                        </div>
                    </div>
                    <div class="pg-timeline-item">
                        <div class="pg-timeline-dot"></div>
                        <div class="pg-timeline-content">
                            <div class="pg-timeline-time">2024-09</div>
                            <div class="pg-timeline-title">正式上线</div>
                            <div class="pg-timeline-desc">项目正式发布</div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        html: `<div class="pg-timeline">
    <div class="pg-timeline-item">
        <div class="pg-timeline-dot pg-timeline-dot-primary"></div>
        <div class="pg-timeline-content">
            <div class="pg-timeline-time">2024-01</div>
            <div class="pg-timeline-title">项目启动</div>
        </div>
    </div>
</div>`,
        css: `.pg-timeline {
    position: relative;
    padding-left: 30px;
}

.pg-timeline::before {
    content: '';
    position: absolute;
    left: 6px;
    top: 8px;
    bottom: 8px;
    width: 2px;
    background: var(--border-color);
}

.pg-timeline-item {
    position: relative;
    padding-bottom: 24px;
}

.pg-timeline-item:last-child {
    padding-bottom: 0;
}

.pg-timeline-dot {
    position: absolute;
    left: -30px;
    top: 4px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--bg-tertiary);
    border: 2px solid var(--border-color);
}

.pg-timeline-dot-primary {
    background: var(--primary);
    border-color: var(--primary);
}

.pg-timeline-dot-success {
    background: #22c55e;
    border-color: #22c55e;
}

.pg-timeline-dot-warning {
    background: #f59e0b;
    border-color: #f59e0b;
}

.pg-timeline-content {
    padding-left: 10px;
}

.pg-timeline-time {
    font-size: 12px;
    color: var(--text-muted);
    margin-bottom: 4px;
}

.pg-timeline-title {
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 4px;
}

.pg-timeline-desc {
    font-size: 13px;
    color: var(--text-secondary);
}`
    }
};

// ==================== 高级交互组件 ====================
const UIAdvancedEffects = {
    // 拖拽排序
    draggableList: {
        name: '拖拽排序',
        desc: '可拖拽排序的列表',
        category: 'ui-advanced',
        render: () => `
            <div style="padding: 20px;">
                <div class="pg-draggable-list">
                    <div class="pg-draggable-item">
                        <i class="fas fa-grip-vertical pg-drag-handle"></i>
                        <span>项目一</span>
                    </div>
                    <div class="pg-draggable-item">
                        <i class="fas fa-grip-vertical pg-drag-handle"></i>
                        <span>项目二</span>
                    </div>
                    <div class="pg-draggable-item">
                        <i class="fas fa-grip-vertical pg-drag-handle"></i>
                        <span>项目三</span>
                    </div>
                    <div class="pg-draggable-item">
                        <i class="fas fa-grip-vertical pg-drag-handle"></i>
                        <span>项目四</span>
                    </div>
                </div>
            </div>
        `,
        html: `<div class="pg-draggable-list">
    <div class="pg-draggable-item">
        <i class="fas fa-grip-vertical pg-drag-handle"></i>
        <span>项目一</span>
    </div>
</div>`,
        css: `.pg-draggable-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    max-width: 300px;
}

.pg-draggable-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    background: var(--bg-secondary);
    border-radius: 10px;
    border: 1px solid var(--border-color);
    cursor: move;
    transition: all 0.2s;
}

.pg-draggable-item:hover {
    border-color: var(--primary);
    background: var(--bg-tertiary);
}

.pg-drag-handle {
    color: var(--text-muted);
    cursor: grab;
}

.pg-drag-handle:active {
    cursor: grabbing;
}

.pg-draggable-item span {
    color: var(--text-primary);
    font-size: 14px;
}`
    },

    // 评分组件
    ratingStars: {
        name: '评分组件',
        desc: '五星评分，支持半星',
        category: 'ui-advanced',
        render: () => `
            <div style="display: flex; flex-direction: column; gap: 25px; align-items: center; padding: 20px;">
                <div class="pg-rating">
                    <i class="fas fa-star pg-rating-star pg-rating-active"></i>
                    <i class="fas fa-star pg-rating-star pg-rating-active"></i>
                    <i class="fas fa-star pg-rating-star pg-rating-active"></i>
                    <i class="fas fa-star pg-rating-star pg-rating-active"></i>
                    <i class="fas fa-star pg-rating-star"></i>
                </div>
                <div class="pg-rating pg-rating-lg">
                    <i class="fas fa-heart pg-rating-icon pg-rating-active"></i>
                    <i class="fas fa-heart pg-rating-icon pg-rating-active"></i>
                    <i class="fas fa-heart pg-rating-icon pg-rating-active"></i>
                    <i class="fas fa-heart pg-rating-icon"></i>
                    <i class="fas fa-heart pg-rating-icon"></i>
                </div>
                <div class="pg-rating-display">
                    <div class="pg-rating">
                        <i class="fas fa-star pg-rating-star pg-rating-active"></i>
                        <i class="fas fa-star pg-rating-star pg-rating-active"></i>
                        <i class="fas fa-star pg-rating-star pg-rating-active"></i>
                        <i class="fas fa-star pg-rating-star pg-rating-active"></i>
                        <i class="fas fa-star-half-alt pg-rating-star pg-rating-active"></i>
                    </div>
                    <span class="pg-rating-score">4.5</span>
                    <span class="pg-rating-count">(128 评价)</span>
                </div>
            </div>
        `,
        html: `<div class="pg-rating">
    <i class="fas fa-star pg-rating-star pg-rating-active"></i>
    <i class="fas fa-star pg-rating-star pg-rating-active"></i>
    <i class="fas fa-star pg-rating-star pg-rating-active"></i>
    <i class="fas fa-star pg-rating-star pg-rating-active"></i>
    <i class="fas fa-star pg-rating-star"></i>
</div>`,
        css: `.pg-rating {
    display: flex;
    gap: 4px;
}

.pg-rating-star, .pg-rating-icon {
    font-size: 20px;
    color: var(--bg-tertiary);
    cursor: pointer;
    transition: all 0.2s;
}

.pg-rating-lg .pg-rating-icon {
    font-size: 28px;
}

.pg-rating-star:hover,
.pg-rating-icon:hover,
.pg-rating-active {
    color: #f59e0b;
}

.pg-rating-star:hover ~ .pg-rating-star {
    color: var(--bg-tertiary);
}

.pg-rating-display {
    display: flex;
    align-items: center;
    gap: 10px;
}

.pg-rating-score {
    font-size: 18px;
    font-weight: 700;
    color: var(--text-primary);
}

.pg-rating-count {
    font-size: 13px;
    color: var(--text-muted);
}`
    }
};

// 导出所有组件效果
const ComponentEffects = {
    ...UIBasicEffects,
    ...UINavEffects,
    ...UIFormEffects,
    ...UIContentEffects,
    ...UIAdvancedEffects
};

export { ComponentEffects, UIBasicEffects, UINavEffects, UIFormEffects, UIContentEffects, UIAdvancedEffects };
