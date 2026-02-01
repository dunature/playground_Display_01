/**
 * CSS动效渲染器
 */

const AnimationEffects = {
    // 基础动画
    basic: {
        fadeIn: {
            name: '淡入效果',
            desc: '元素从透明逐渐变为不透明',
            render: () => `
                <div class="anim-demo-wrapper">
                    <div class="anim-demo-image-card anim-fadeIn">
                        <div class="card-img"><i class="fas fa-image"></i></div>
                        <div class="card-body">
                            <div class="card-title">风景照片</div>
                            <div class="card-text">图片加载完成</div>
                        </div>
                    </div>
                    <div class="anim-demo-controls">
                        <button onclick="this.closest('.anim-demo-wrapper').querySelector('.anim-demo-image-card').classList.remove('anim-fadeIn'); void this.closest('.anim-demo-wrapper').querySelector('.anim-demo-image-card').offsetWidth; this.closest('.anim-demo-wrapper').querySelector('.anim-demo-image-card').classList.add('anim-fadeIn')">
                            <i class="fas fa-play"></i> 播放
                        </button>
                        <span class="anim-info">0.5s ease</span>
                    </div>
                </div>
            `,
            html: `<div class="image-card anim-fadeIn">
    <img src="photo.jpg" alt="照片">
    <div class="content">
        <h4>风景照片</h4>
        <p>图片加载完成</p>
    </div>
</div>`,
            css: `@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.anim-fadeIn {
    animation: fadeIn 0.5s ease forwards;
}`
        },
        fadeOut: {
            name: '淡出效果',
            desc: '元素从不透明逐渐变为透明',
            render: () => `
                <div class="anim-demo-wrapper">
                    <div class="anim-demo-image-card anim-fadeOut" style="animation-direction: alternate; animation-iteration-count: infinite;">
                        <div class="card-img"><i class="fas fa-image"></i></div>
                        <div class="card-body">
                            <div class="card-title">淡出效果</div>
                            <div class="card-text">元素逐渐消失</div>
                        </div>
                    </div>
                    <div class="anim-demo-controls">
                        <label class="anim-demo-loop-toggle">
                            <input type="checkbox" checked onchange="this.closest('.anim-demo-wrapper').querySelector('.anim-demo-image-card').style.animationIterationCount = this.checked ? 'infinite' : '1'">
                            循环播放
                        </label>
                    </div>
                </div>
            `,
            html: `<div class="element anim-fadeOut">淡出</div>`,
            css: `@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}

.anim-fadeOut {
    animation: fadeOut 0.5s ease forwards;
}`
        },
        slideInLeft: {
            name: '从左滑入',
            desc: '元素从左侧滑入视图',
            render: () => `
                <div class="anim-demo-wrapper">
                    <div class="anim-demo-message anim-slideInLeft">
                        <div class="msg-icon"><i class="fas fa-check"></i></div>
                        <div class="msg-content">
                            <div class="msg-title">操作成功</div>
                            <div class="msg-desc">数据已成功保存</div>
                        </div>
                    </div>
                    <div class="anim-demo-controls">
                        <button onclick="this.closest('.anim-demo-wrapper').querySelector('.anim-demo-message').classList.remove('anim-slideInLeft'); void this.closest('.anim-demo-wrapper').querySelector('.anim-demo-message').offsetWidth; this.closest('.anim-demo-wrapper').querySelector('.anim-demo-message').classList.add('anim-slideInLeft')">
                            <i class="fas fa-play"></i> 播放
                        </button>
                        <span class="anim-info">0.6s ease</span>
                    </div>
                </div>
            `,
            html: `<div class="notification anim-slideInLeft">
    <i class="icon fa-check"></i>
    <div class="content">
        <h4>操作成功</h4>
        <p>数据已成功保存</p>
    </div>
</div>`,
            css: `@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-100px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.anim-slideInLeft {
    animation: slideInLeft 0.6s ease forwards;
}`
        },
        slideInRight: {
            name: '从右滑入',
            desc: '元素从右侧滑入视图',
            render: () => `
                <div class="anim-demo-wrapper">
                    <div class="anim-demo-message anim-slideInRight">
                        <div class="msg-icon"><i class="fas fa-bell"></i></div>
                        <div class="msg-content">
                            <div class="msg-title">新消息</div>
                            <div class="msg-desc">您有一条新通知</div>
                        </div>
                    </div>
                    <div class="anim-demo-controls">
                        <button onclick="this.closest('.anim-demo-wrapper').querySelector('.anim-demo-message').classList.remove('anim-slideInRight'); void this.closest('.anim-demo-wrapper').querySelector('.anim-demo-message').offsetWidth; this.closest('.anim-demo-wrapper').querySelector('.anim-demo-message').classList.add('anim-slideInRight')">
                            <i class="fas fa-play"></i> 播放
                        </button>
                        <span class="anim-info">0.6s ease</span>
                    </div>
                </div>
            `,
            html: `<div class="notification anim-slideInRight">
    <i class="icon fa-bell"></i>
    <div class="content">
        <h4>新消息</h4>
        <p>您有一条新通知</p>
    </div>
</div>`,
            css: `@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(100px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.anim-slideInRight {
    animation: slideInRight 0.6s ease forwards;
}`
        },
        slideInUp: {
            name: '从下滑入',
            desc: '元素从下方滑入视图',
            render: () => `
                <div class="anim-demo-wrapper">
                    <div class="anim-demo-message anim-slideInUp">
                        <div class="msg-icon"><i class="fas fa-info-circle"></i></div>
                        <div class="msg-content">
                            <div class="msg-title">温馨提示</div>
                            <div class="msg-desc">从下往上的滑入效果</div>
                        </div>
                    </div>
                    <div class="anim-demo-controls">
                        <button onclick="this.closest('.anim-demo-wrapper').querySelector('.anim-demo-message').classList.remove('anim-slideInUp'); void this.closest('.anim-demo-wrapper').querySelector('.anim-demo-message').offsetWidth; this.closest('.anim-demo-wrapper').querySelector('.anim-demo-message').classList.add('anim-slideInUp')">
                            <i class="fas fa-play"></i> 播放
                        </button>
                        <span class="anim-info">0.6s ease</span>
                    </div>
                </div>
            `,
            html: `<div class="notification anim-slideInUp">
    <i class="icon fa-info-circle"></i>
    <div class="content">
        <h4>温馨提示</h4>
        <p>从下往上的滑入效果</p>
    </div>
</div>`,
            css: `@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(100px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.anim-slideInUp {
    animation: slideInUp 0.6s ease forwards;
}`
        },
        slideInDown: {
            name: '从上滑入',
            desc: '元素从上方滑入视图',
            render: () => `
                <div class="anim-demo-wrapper">
                    <div class="anim-demo-message anim-slideInDown">
                        <div class="msg-icon"><i class="fas fa-download"></i></div>
                        <div class="msg-content">
                            <div class="msg-title">开始下载</div>
                            <div class="msg-desc">文件正在下载中...</div>
                        </div>
                    </div>
                    <div class="anim-demo-controls">
                        <button onclick="this.closest('.anim-demo-wrapper').querySelector('.anim-demo-message').classList.remove('anim-slideInDown'); void this.closest('.anim-demo-wrapper').querySelector('.anim-demo-message').offsetWidth; this.closest('.anim-demo-wrapper').querySelector('.anim-demo-message').classList.add('anim-slideInDown')">
                            <i class="fas fa-play"></i> 播放
                        </button>
                        <span class="anim-info">0.6s ease</span>
                    </div>
                </div>
            `,
            html: `<div class="notification anim-slideInDown">
    <i class="icon fa-download"></i>
    <div class="content">
        <h4>开始下载</h4>
        <p>文件正在下载中...</p>
    </div>
</div>`,
            css: `@keyframes slideInDown {
    from {
        opacity: 0;
        transform: translateY(-100px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.anim-slideInDown {
    animation: slideInDown 0.6s ease forwards;
}`
        },
        bounce: {
            name: '弹跳效果',
            desc: '元素上下弹跳动画',
            render: () => `
                <div class="anim-demo-wrapper">
                    <div class="anim-demo-ball anim-bounce"></div>
                    <div class="anim-demo-controls">
                        <button onclick="this.closest('.anim-demo-wrapper').querySelector('.anim-demo-ball').classList.remove('anim-bounce'); void this.closest('.anim-demo-wrapper').querySelector('.anim-demo-ball').offsetWidth; this.closest('.anim-demo-wrapper').querySelector('.anim-demo-ball').classList.add('anim-bounce')">
                            <i class="fas fa-play"></i> 播放
                        </button>
                        <label class="anim-demo-loop-toggle">
                            <input type="checkbox" checked onchange="const el = this.closest('.anim-demo-wrapper').querySelector('.anim-demo-ball'); el.style.animationIterationCount = this.checked ? 'infinite' : '1'">
                            循环
                        </label>
                        <span class="anim-info">1s ease</span>
                    </div>
                </div>
            `,
            html: `<div class="ball anim-bounce"></div>`,
            css: `@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-30px); }
    60% { transform: translateY(-15px); }
}

.anim-bounce {
    animation: bounce 1s ease infinite;
}

/* 弹跳球样式 */
.ball {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(145deg, #ff6b6b, #ee5a5a);
    box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);
}`
        },
        pulse: {
            name: '脉冲效果',
            desc: '元素缩放脉冲动画',
            render: () => `
                <div class="anim-demo-wrapper">
                    <div class="anim-demo-badge">
                        <i class="fas fa-bell"></i>
                        <div class="badge-dot anim-pulse">3</div>
                    </div>
                    <div class="anim-demo-controls">
                        <button onclick="const dot = this.closest('.anim-demo-wrapper').querySelector('.badge-dot'); dot.classList.remove('anim-pulse'); void dot.offsetWidth; dot.classList.add('anim-pulse')">
                            <i class="fas fa-play"></i> 播放
                        </button>
                        <label class="anim-demo-loop-toggle">
                            <input type="checkbox" checked onchange="const el = this.closest('.anim-demo-wrapper').querySelector('.badge-dot'); el.style.animationIterationCount = this.checked ? 'infinite' : '1'">
                            循环
                        </label>
                        <span class="anim-info">1.5s ease</span>
                    </div>
                </div>
            `,
            html: `<div class="notification-badge">
    <i class="bell-icon"></i>
    <span class="badge anim-pulse">3</span>
</div>`,
            css: `@keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.8; }
}

.anim-pulse {
    animation: pulse 1.5s ease infinite;
}`
        },
        shake: {
            name: '摇晃效果',
            desc: '元素左右摇晃动画',
            render: () => `
                <div class="anim-demo-wrapper">
                    <div class="anim-demo-input-group">
                        <label>邮箱地址</label>
                        <input type="text" class="input-field anim-shake" value="invalid-email" readonly style="animation-iteration-count: infinite;">
                        <div class="error-msg"><i class="fas fa-exclamation-circle"></i> 请输入有效的邮箱</div>
                    </div>
                    <div class="anim-demo-controls">
                        <button onclick="const el = this.closest('.anim-demo-wrapper').querySelector('.input-field'); el.classList.remove('anim-shake'); void el.offsetWidth; el.classList.add('anim-shake')">
                            <i class="fas fa-play"></i> 播放
                        </button>
                        <label class="anim-demo-loop-toggle">
                            <input type="checkbox" checked onchange="const el = this.closest('.anim-demo-wrapper').querySelector('.input-field'); el.style.animationIterationCount = this.checked ? 'infinite' : '1'">
                            循环
                        </label>
                        <span class="anim-info">0.8s ease</span>
                    </div>
                </div>
            `,
            html: `<div class="form-group">
    <label>邮箱</label>
    <input type="email" class="input anim-shake" value="invalid">
    <span class="error">请输入有效邮箱</span>
</div>`,
            css: `@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
    20%, 40%, 60%, 80% { transform: translateX(10px); }
}

.anim-shake {
    animation: shake 0.8s ease;
}`
        },
        rotate: {
            name: '旋转效果',
            desc: '元素持续旋转',
            render: () => `
                <div class="anim-demo-wrapper">
                    <div class="anim-demo-gear anim-rotate">
                        <svg viewBox="0 0 24 24"><path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/></svg>
                    </div>
                    <div class="anim-demo-controls">
                        <button onclick="const el = this.closest('.anim-demo-wrapper').querySelector('.anim-demo-gear'); el.classList.remove('anim-rotate'); void el.offsetWidth; el.classList.add('anim-rotate')">
                            <i class="fas fa-redo"></i> 重置
                        </button>
                        <label class="anim-demo-loop-toggle">
                            <input type="checkbox" checked onchange="const el = this.closest('.anim-demo-wrapper').querySelector('.anim-demo-gear'); el.style.animationIterationCount = this.checked ? 'infinite' : '1'">
                            循环
                        </label>
                        <span class="anim-info">2s linear</span>
                    </div>
                </div>
            `,
            html: `<div class="gear anim-rotate">
    <i class="fas fa-cog"></i>
</div>`,
            css: `@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.anim-rotate {
    animation: rotate 2s linear infinite;
}`
        },
        zoomIn: {
            name: '放大进入',
            desc: '元素从小放大进入',
            render: () => `
                <div class="anim-demo-wrapper">
                    <div class="anim-demo-zoom-image anim-zoomIn">
                        <i class="fas fa-rocket"></i>
                        <span>发射!</span>
                    </div>
                    <div class="anim-demo-controls">
                        <button onclick="const el = this.closest('.anim-demo-wrapper').querySelector('.anim-demo-zoom-image'); el.classList.remove('anim-zoomIn'); void el.offsetWidth; el.classList.add('anim-zoomIn')">
                            <i class="fas fa-play"></i> 播放
                        </button>
                        <span class="anim-info">0.5s ease</span>
                    </div>
                </div>
            `,
            html: `<div class="image anim-zoomIn">
    <i class="rocket-icon"></i>
</div>`,
            css: `@keyframes zoomIn {
    from {
        opacity: 0;
        transform: scale(0);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.anim-zoomIn {
    animation: zoomIn 0.5s ease forwards;
}`
        },
        zoomOut: {
            name: '缩小退出',
            desc: '元素缩小消失',
            render: () => `
                <div class="anim-demo-wrapper">
                    <div class="anim-demo-zoom-image anim-zoomOut" style="animation-direction: alternate; animation-iteration-count: infinite;">
                        <i class="fas fa-compress-arrows-alt"></i>
                        <span>缩小</span>
                    </div>
                    <div class="anim-demo-controls">
                        <button onclick="const el = this.closest('.anim-demo-wrapper').querySelector('.anim-demo-zoom-image'); el.classList.remove('anim-zoomOut'); void el.offsetWidth; el.classList.add('anim-zoomOut')">
                            <i class="fas fa-play"></i> 播放
                        </button>
                        <label class="anim-demo-loop-toggle">
                            <input type="checkbox" checked onchange="const el = this.closest('.anim-demo-wrapper').querySelector('.anim-demo-zoom-image'); el.style.animationIterationCount = this.checked ? 'infinite' : '1'">
                            循环
                        </label>
                        <span class="anim-info">0.5s ease</span>
                    </div>
                </div>
            `,
            html: `<div class="element anim-zoomOut">缩小</div>`,
            css: `@keyframes zoomOut {
    from {
        opacity: 1;
        transform: scale(1);
    }
    to {
        opacity: 0;
        transform: scale(0);
    }
}

.anim-zoomOut {
    animation: zoomOut 0.5s ease forwards;
}`
        },
        flip: {
            name: '翻转效果',
            desc: '元素3D翻转',
            render: () => `
                <div class="anim-demo-wrapper">
                    <div class="anim-demo-flip-card">
                        <div class="flip-inner anim-flip" style="animation-iteration-count: infinite;">
                            <div class="flip-front"><i class="fas fa-question"></i></div>
                            <div class="flip-back"><i class="fas fa-exclamation"></i></div>
                        </div>
                    </div>
                    <div class="anim-demo-controls">
                        <button onclick="const el = this.closest('.anim-demo-wrapper').querySelector('.flip-inner'); el.classList.remove('anim-flip'); void el.offsetWidth; el.classList.add('anim-flip')">
                            <i class="fas fa-play"></i> 播放
                        </button>
                        <label class="anim-demo-loop-toggle">
                            <input type="checkbox" checked onchange="const el = this.closest('.anim-demo-wrapper').querySelector('.flip-inner'); el.style.animationIterationCount = this.checked ? 'infinite' : '1'">
                            循环
                        </label>
                        <span class="anim-info">1s ease-in-out</span>
                    </div>
                </div>
            `,
            html: `<div class="card anim-flip">
    <div class="front">正面</div>
    <div class="back">背面</div>
</div>`,
            css: `@keyframes flip {
    0% { transform: perspective(400px) rotateY(0); }
    100% { transform: perspective(400px) rotateY(360deg); }
}

.anim-flip {
    animation: flip 1s ease-in-out;
}`
        },
        swing: {
            name: '摇摆效果',
            desc: '元素像钟摆一样摇摆',
            render: () => `
                <div class="anim-demo-wrapper">
                    <div class="anim-demo-pendulum anim-swing" style="animation-iteration-count: infinite;">
                        <div class="pendulum-string"></div>
                        <div class="pendulum-bob"><i class="fas fa-bell"></i></div>
                    </div>
                    <div class="anim-demo-controls">
                        <button onclick="const el = this.closest('.anim-demo-wrapper').querySelector('.anim-demo-pendulum'); el.classList.remove('anim-swing'); void el.offsetWidth; el.classList.add('anim-swing')">
                            <i class="fas fa-play"></i> 播放
                        </button>
                        <label class="anim-demo-loop-toggle">
                            <input type="checkbox" checked onchange="const el = this.closest('.anim-demo-wrapper').querySelector('.anim-demo-pendulum'); el.style.animationIterationCount = this.checked ? 'infinite' : '1'">
                            循环
                        </label>
                        <span class="anim-info">1s ease</span>
                    </div>
                </div>
            `,
            html: `<div class="pendulum anim-swing">
    <div class="bob"></div>
</div>`,
            css: `@keyframes swing {
    20% { transform: rotate(15deg); }
    40% { transform: rotate(-10deg); }
    60% { transform: rotate(5deg); }
    80% { transform: rotate(-5deg); }
    100% { transform: rotate(0deg); }
}

.anim-swing {
    animation: swing 1s ease;
    transform-origin: top center;
}`
        },
        rubberBand: {
            name: '橡皮筋效果',
            desc: '元素弹性变形',
            render: () => `
                <div class="anim-demo-wrapper">
                    <div class="anim-demo-elastic-btn anim-rubberBand" style="animation-iteration-count: infinite;">
                        <i class="fas fa-thumbs-up"></i> 点击我
                    </div>
                    <div class="anim-demo-controls">
                        <button onclick="const el = this.closest('.anim-demo-wrapper').querySelector('.anim-demo-elastic-btn'); el.classList.remove('anim-rubberBand'); void el.offsetWidth; el.classList.add('anim-rubberBand')">
                            <i class="fas fa-play"></i> 播放
                        </button>
                        <label class="anim-demo-loop-toggle">
                            <input type="checkbox" checked onchange="const el = this.closest('.anim-demo-wrapper').querySelector('.anim-demo-elastic-btn'); el.style.animationIterationCount = this.checked ? 'infinite' : '1'">
                            循环
                        </label>
                        <span class="anim-info">1s ease</span>
                    </div>
                </div>
            `,
            html: `<button class="btn anim-rubberBand">点击</button>`,
            css: `@keyframes rubberBand {
    0% { transform: scale(1); }
    30% { transform: scale(1.25, 0.75); }
    40% { transform: scale(0.75, 1.25); }
    50% { transform: scale(1.15, 0.85); }
    65% { transform: scale(0.95, 1.05); }
    75% { transform: scale(1.05, 0.95); }
    100% { transform: scale(1); }
}

.anim-rubberBand {
    animation: rubberBand 1s ease;
}`
        },
        heartBeat: {
            name: '心跳效果',
            desc: '像心跳一样的跳动',
            render: () => `
                <div class="anim-demo-wrapper">
                    <div class="anim-demo-heart anim-heartBeat">
                        <svg viewBox="0 0 24 24"><path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/></svg>
                    </div>
                    <div class="anim-demo-controls">
                        <button onclick="const el = this.closest('.anim-demo-wrapper').querySelector('.anim-demo-heart'); el.classList.remove('anim-heartBeat'); void el.offsetWidth; el.classList.add('anim-heartBeat')">
                            <i class="fas fa-play"></i> 播放
                        </button>
                        <label class="anim-demo-loop-toggle">
                            <input type="checkbox" checked onchange="const el = this.closest('.anim-demo-wrapper').querySelector('.anim-demo-heart'); el.style.animationIterationCount = this.checked ? 'infinite' : '1'">
                            循环
                        </label>
                        <span class="anim-info">1.3s ease</span>
                    </div>
                </div>
            `,
            html: `<div class="heart anim-heartBeat">❤️</div>`,
            css: `@keyframes heartBeat {
    0% { transform: scale(1); }
    14% { transform: scale(1.3); }
    28% { transform: scale(1); }
    42% { transform: scale(1.3); }
    70% { transform: scale(1); }
}

.anim-heartBeat {
    animation: heartBeat 1.3s ease infinite;
}`
        }
    },

    // 高级动画
    advanced: {
        typewriter: {
            name: '打字机效果',
            desc: '文字逐个显示效果',
            render: () => `<div class="typewriter" style="font-size: 1.5rem; font-family: monospace;">Hello World!</div>`,
            html: `<div class="typewriter">Hello World!</div>`,
            css: `@keyframes typing {
    from { width: 0; }
    to { width: 100%; }
}

@keyframes blink {
    50% { border-color: transparent; }
}

.typewriter {
    overflow: hidden;
    border-right: 3px solid var(--primary);
    white-space: nowrap;
    animation: typing 3s steps(40, end), blink 0.75s step-end infinite;
}`
        },
        gradientText: {
            name: '渐变文字流动',
            desc: '文字渐变色彩流动效果',
            render: () => `<div class="gradient-text-flow" style="font-size: 2rem; font-weight: bold;">Gradient Text</div>`,
            html: `<div class="gradient-text-flow">Gradient Text</div>`,
            css: `.gradient-text-flow {
    background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff6b6b);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientFlow 3s ease infinite;
}

@keyframes gradientFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}`
        },
        wave: {
            name: '波浪动画',
            desc: '波浪起伏效果',
            render: () => `<div class="wave-animation" style="font-size: 2rem;"><span>波</span><span>浪</span><span>动</span><span>画</span><span>!</span></div>`,
            html: `<div class="wave-animation">
    <span>波</span><span>浪</span><span>动</span><span>画</span><span>!</span>
</div>`,
            css: `@keyframes wave {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}

.wave-animation span {
    display: inline-block;
    animation: wave 1s ease-in-out infinite;
}

.wave-animation span:nth-child(2) { animation-delay: 0.1s; }
.wave-animation span:nth-child(3) { animation-delay: 0.2s; }
.wave-animation span:nth-child(4) { animation-delay: 0.3s; }
.wave-animation span:nth-child(5) { animation-delay: 0.4s; }`
        },
        loader1: {
            name: '旋转加载器',
            desc: '简单的旋转加载动画',
            render: () => `<div class="loader-spinner"></div>`,
            html: `<div class="loader-spinner"></div>`,
            css: `@keyframes spin {
    to { transform: rotate(360deg); }
}

.loader-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid var(--bg-tertiary);
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}`
        },
        loader2: {
            name: '脉冲加载器',
            desc: '脉冲扩散加载动画',
            render: () => `<div class="loader-pulse"></div>`,
            html: `<div class="loader-pulse"></div>`,
            css: `@keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.5); opacity: 0.5; }
}

.loader-pulse {
    width: 50px;
    height: 50px;
    background: var(--primary);
    border-radius: 50%;
    animation: pulse 1.5s ease infinite;
}`
        },
        loader3: {
            name: '双环加载器',
            desc: '双环旋转加载动画',
            render: () => `<div class="loader-dual-ring"></div>`,
            html: `<div class="loader-dual-ring"></div>`,
            css: `.loader-dual-ring::after {
    content: '';
    display: block;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    border: 4px solid var(--primary);
    border-color: var(--primary) transparent var(--primary) transparent;
    animation: spin 1.2s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}`
        },
        loader4: {
            name: '点状加载器',
            desc: '三个点弹跳动画',
            render: () => `<div class="loader-dots"><span></span><span></span><span></span></div>`,
            html: `<div class="loader-dots">
    <span></span><span></span><span></span>
</div>`,
            css: `.loader-dots {
    display: flex;
    gap: 8px;
}

.loader-dots span {
    width: 12px;
    height: 12px;
    background: var(--primary);
    border-radius: 50%;
    animation: bounce-dots 1.4s ease-in-out infinite both;
}

.loader-dots span:nth-child(1) { animation-delay: -0.32s; }
.loader-dots span:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce-dots {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
}`
        },
        loader5: {
            name: '波浪加载器',
            desc: '波浪条形加载动画',
            render: () => `<div class="loader-wave"><span></span><span></span><span></span><span></span><span></span></div>`,
            html: `<div class="loader-wave">
    <span></span><span></span><span></span>
    <span></span><span></span>
</div>`,
            css: `.loader-wave {
    display: flex;
    align-items: flex-end;
    gap: 4px;
    height: 40px;
}

.loader-wave span {
    width: 6px;
    background: var(--primary);
    border-radius: 3px;
    animation: wave-loading 1s ease-in-out infinite;
}

.loader-wave span:nth-child(2) { animation-delay: 0.1s; }
.loader-wave span:nth-child(3) { animation-delay: 0.2s; }
.loader-wave span:nth-child(4) { animation-delay: 0.3s; }
.loader-wave span:nth-child(5) { animation-delay: 0.4s; }

@keyframes wave-loading {
    0%, 100% { height: 10px; }
    50% { height: 30px; }
}`
        },
        skeleton: {
            name: '骨架屏效果',
            desc: '加载占位骨架动画',
            render: () => `
                <div style="width: 250px; padding: 20px; background: var(--bg-secondary); border-radius: 10px;">
                    <div class="skeleton" style="width: 60px; height: 60px; border-radius: 50%; margin-bottom: 15px;"></div>
                    <div class="skeleton" style="width: 80%; height: 20px; border-radius: 4px; margin-bottom: 10px;"></div>
                    <div class="skeleton" style="width: 60%; height: 15px; border-radius: 4px;"></div>
                </div>
            `,
            html: `<div class="skeleton-card">
    <div class="skeleton skeleton-avatar"></div>
    <div class="skeleton skeleton-title"></div>
    <div class="skeleton skeleton-text"></div>
</div>`,
            css: `@keyframes skeleton-loading {
    0% { background-position: -200px 0; }
    100% { background-position: calc(200px + 100%) 0; }
}

.skeleton {
    background: linear-gradient(90deg, var(--bg-tertiary) 25%, var(--border-light) 50%, var(--bg-tertiary) 75%);
    background-size: 200px 100%;
    animation: skeleton-loading 1.5s ease-in-out infinite;
    border-radius: 4px;
}`
        }
    },

    // 3D效果
    '3d': {
        flipCard: {
            name: '3D翻转卡片',
            desc: '鼠标悬停时卡片翻转',
            render: () => `
                <div class="flip-card">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">正面</div>
                        <div class="flip-card-back">背面</div>
                    </div>
                </div>
            `,
            html: `<div class="flip-card">
    <div class="flip-card-inner">
        <div class="flip-card-front">正面</div>
        <div class="flip-card-back">背面</div>
    </div>
</div>`,
            css: `.flip-card {
    perspective: 1000px;
    width: 200px;
    height: 280px;
}

.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.8s;
    transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
}

.flip-card-front {
    background: linear-gradient(135deg, #6366f1, #ec4899);
    color: white;
}

.flip-card-back {
    background: linear-gradient(135deg, #ec4899, #6366f1);
    color: white;
    transform: rotateY(180deg);
}`
        },
        btn3d: {
            name: '立体按钮',
            desc: '3D立体按压效果',
            render: () => `<button class="btn-3d">点击我</button>`,
            html: `<button class="btn-3d">点击我</button>`,
            css: `.btn-3d {
    padding: 15px 30px;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    background: #6366f1;
    border: none;
    border-radius: 10px;
    transform-style: preserve-3d;
    transition: all 0.2s;
    box-shadow: 0 4px 0 #4f46e5, 0 5px 10px rgba(0, 0, 0, 0.3);
}

.btn-3d:active {
    transform: translateY(4px);
    box-shadow: 0 0 0 #4f46e5, 0 0 0 rgba(0, 0, 0, 0.3);
}`
        },
        carousel3d: {
            name: '3D旋转木马',
            desc: '自动旋转的3D卡片展示',
            render: () => `
                <div class="carousel-3d">
                    <div class="carousel-3d-inner">
                        <div class="carousel-3d-item">1</div>
                        <div class="carousel-3d-item">2</div>
                        <div class="carousel-3d-item">3</div>
                        <div class="carousel-3d-item">4</div>
                    </div>
                </div>
            `,
            html: `<div class="carousel-3d">
    <div class="carousel-3d-inner">
        <div class="carousel-3d-item">1</div>
        <div class="carousel-3d-item">2</div>
        <div class="carousel-3d-item">3</div>
        <div class="carousel-3d-item">4</div>
    </div>
</div>`,
            css: `@keyframes rotateCarousel {
    from { transform: rotateY(0deg); }
    to { transform: rotateY(360deg); }
}

.carousel-3d {
    perspective: 1000px;
    width: 300px;
    height: 200px;
}

.carousel-3d-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    animation: rotateCarousel 10s linear infinite;
}

.carousel-3d-item {
    position: absolute;
    width: 100px;
    height: 100px;
    left: 50%;
    top: 50%;
    margin-left: -50px;
    margin-top: -50px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: white;
}

.carousel-3d-item:nth-child(1) { transform: rotateY(0deg) translateZ(150px); background: #ff6b6b; }
.carousel-3d-item:nth-child(2) { transform: rotateY(90deg) translateZ(150px); background: #4ecdc4; }
.carousel-3d-item:nth-child(3) { transform: rotateY(180deg) translateZ(150px); background: #45b7d1; }
.carousel-3d-item:nth-child(4) { transform: rotateY(270deg) translateZ(150px); background: #96ceb4; }`
        },
        perspectiveCard: {
            name: '透视卡片',
            desc: '鼠标跟随的透视倾斜效果',
            render: () => `
                <div class="perspective-card-container" style="perspective: 1000px;">
                    <div class="perspective-card">Hover Me</div>
                </div>
            `,
            html: `<div class="perspective-card-container">
    <div class="perspective-card">Hover Me</div>
</div>`,
            css: `.perspective-card-container {
    perspective: 1000px;
}

.perspective-card {
    width: 250px;
    height: 150px;
    background: linear-gradient(135deg, #6366f1, #ec4899);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: white;
    transform-style: preserve-3d;
    transition: transform 0.5s;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.perspective-card-container:hover .perspective-card {
    transform: rotateY(15deg) rotateX(10deg) scale(1.05);
}`
        },
        cube: {
            name: '立方体旋转',
            desc: '3D立方体多面旋转',
            render: () => `
                <div class="cube">
                    <div class="cube-face">1</div>
                    <div class="cube-face">2</div>
                    <div class="cube-face">3</div>
                    <div class="cube-face">4</div>
                    <div class="cube-face">5</div>
                    <div class="cube-face">6</div>
                </div>
            `,
            html: `<div class="cube">
    <div class="cube-face">1</div>
    <div class="cube-face">2</div>
    <div class="cube-face">3</div>
    <div class="cube-face">4</div>
    <div class="cube-face">5</div>
    <div class="cube-face">6</div>
</div>`,
            css: `@keyframes rotateCube {
    from { transform: rotateX(0deg) rotateY(0deg); }
    to { transform: rotateX(360deg) rotateY(360deg); }
}

.cube {
    width: 100px;
    height: 100px;
    position: relative;
    transform-style: preserve-3d;
    animation: rotateCube 8s linear infinite;
}

.cube-face {
    position: absolute;
    width: 100px;
    height: 100px;
    border: 2px solid #6366f1;
    background: rgba(99, 102, 241, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: #6366f1;
}

.cube-face:nth-child(1) { transform: translateZ(50px); }
.cube-face:nth-child(2) { transform: rotateY(180deg) translateZ(50px); }
.cube-face:nth-child(3) { transform: rotateY(-90deg) translateZ(50px); }
.cube-face:nth-child(4) { transform: rotateY(90deg) translateZ(50px); }
.cube-face:nth-child(5) { transform: rotateX(90deg) translateZ(50px); }
.cube-face:nth-child(6) { transform: rotateX(-90deg) translateZ(50px); }`
        }
    }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AnimationEffects };
}

export { AnimationEffects };
