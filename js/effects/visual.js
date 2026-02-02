/**
 * 视觉效果渲染器
 */

const VisualEffects = {
    // 现代设计风格
    modern: {
        glassmorphism: {
            name: '玻璃态效果',
            desc: '半透明毛玻璃效果',
            render: () => `
                <div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 50px; border-radius: 20px;">
                    <div class="glass-card" style="width: 300px;">
                        <h3 style="margin-bottom: 15px;">Glass Card</h3>
                        <p style="opacity: 0.8;">毛玻璃效果，带有背景模糊和半透明边框</p>
                        <button class="glass-button" style="margin-top: 20px;">Action</button>
                    </div>
                </div>
            `,
            html: `<div class="glass-card">
    <h3>Glass Card</h3>
    <p>毛玻璃效果</p>
    <button class="glass-button">Action</button>
</div>`,
            css: `.glass-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 30px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.glass-button {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: 12px 24px;
    border-radius: 10px;
    transition: all 0.3s;
}`
        },
        neumorphism: {
            name: '新拟态设计',
            desc: '柔和的凸起凹陷效果',
            render: () => `
                <div style="display: flex; gap: 30px; align-items: center; flex-wrap: wrap; justify-content: center;">
                    <div class="neumorphic" style="width: 150px; height: 150px; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                        <i class="fas fa-heart"></i>
                    </div>
                    <div class="neumorphic-inset" style="width: 150px; height: 150px; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                        <i class="fas fa-star"></i>
                    </div>
                    <button class="neumorphic-button">Click Me</button>
                </div>
            `,
            html: `<div class="neumorphic">Raised</div>
<div class="neumorphic-inset">Inset</div>
<button class="neumorphic-button">Click</button>`,
            css: `.neumorphic {
    background: var(--bg-primary);
    border-radius: 16px;
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.3),
                -8px -8px 16px rgba(255, 255, 255, 0.05);
}

.neumorphic-inset {
    background: var(--bg-primary);
    border-radius: 16px;
    box-shadow: inset 4px 4px 8px rgba(0, 0, 0, 0.3),
                inset -4px -4px 8px rgba(255, 255, 255, 0.05);
}

.neumorphic-button {
    padding: 15px 30px;
    background: var(--bg-primary);
    border-radius: 10px;
    box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.3),
                -6px -6px 12px rgba(255, 255, 255, 0.05);
    color: var(--text-primary);
    font-weight: 600;
    transition: all 0.2s;
}

.neumorphic-button:active {
    box-shadow: inset 4px 4px 8px rgba(0, 0, 0, 0.3),
                inset -4px -4px 8px rgba(255, 255, 255, 0.05);
}`
        },
        holographic: {
            name: '全息效果',
            desc: '彩虹光泽的全息效果',
            render: () => `
                <div class="holographic" style="width: 300px; height: 200px; border-radius: 20px; display: flex; align-items: center; justify-content: center;">
                    <span style="font-size: 1.5rem; font-weight: bold; color: rgba(255,255,255,0.9); z-index: 1;">Holographic</span>
                </div>
            `,
            html: `<div class="holographic">Holographic</div>`,
            css: `.holographic {
    background: linear-gradient(
        135deg,
        rgba(99, 102, 241, 0.3),
        rgba(236, 72, 153, 0.3),
        rgba(99, 102, 241, 0.3)
    );
    background-size: 200% 200%;
    position: relative;
    overflow: hidden;
}

.holographic::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(255, 255, 255, 0.03) 2px,
        rgba(255, 255, 255, 0.03) 4px
    );
}

.holographic::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
        45deg,
        transparent 30%,
        rgba(255, 255, 255, 0.1) 50%,
        transparent 70%
    );
    animation: holographicShine 3s ease-in-out infinite;
}

@keyframes holographicShine {
    0% { transform: translateX(-100%) rotate(45deg); }
    100% { transform: translateX(100%) rotate(45deg); }
}`
        }
    },

    // 背景效果
    bg: {
        gradient: {
            name: '动态渐变背景',
            desc: '流动的渐变色彩',
            render: () => `
                <div class="bg-gradient-animated" style="width: 100%; height: 300px; border-radius: 20px; display: flex; align-items: center; justify-content: center;">
                    <h2 style="color: white; font-size: 2rem; text-shadow: 0 2px 10px rgba(0,0,0,0.3);">Animated Gradient</h2>
                </div>
            `,
            html: `<div class="bg-gradient-animated">Content</div>`,
            css: `.bg-gradient-animated {
    background: linear-gradient(
        -45deg,
        #ee7752,
        #e73c7e,
        #23a6d5,
        #23d5ab
    );
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}`
        },
        grid: {
            name: '网格背景',
            desc: '网格线条背景效果',
            render: () => `
                <div class="bg-grid" style="width: 100%; height: 300px; border-radius: 20px; display: flex; align-items: center; justify-content: center;">
                    <div style="background: var(--bg-secondary); padding: 30px; border-radius: 10px;">
                        <h3>Grid Background</h3>
                    </div>
                </div>
            `,
            html: `<div class="bg-grid">Content</div>`,
            css: `.bg-grid {
    background-image:
        linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
    background-size: 30px 30px;
}`
        },
        dots: {
            name: '点阵背景',
            desc: '点状图案背景',
            render: () => `
                <div class="bg-grid-dots" style="width: 100%; height: 300px; border-radius: 20px; display: flex; align-items: center; justify-content: center;">
                    <div style="background: var(--bg-secondary); padding: 30px; border-radius: 10px;">
                        <h3>Dots Background</h3>
                    </div>
                </div>
            `,
            html: `<div class="bg-grid-dots">Content</div>`,
            css: `.bg-grid-dots {
    background-image: radial-gradient(
        rgba(99, 102, 241, 0.3) 1px,
        transparent 1px
    );
    background-size: 20px 20px;
}`
        },
        grainy: {
            name: '颗粒感背景',
            desc: '模拟纸张质感的颗粒噪声效果',
            render: () => `
                <div class="bg-grainy" style="width: 100%; height: 300px; border-radius: 20px; display: flex; align-items: center; justify-content: center; background: #f2f2f7;">
                    <div style="background: white; padding: 40px; border: 4px solid black; box-shadow: 10px 10px 0 black; z-index: 1;">
                        <h3 style="color: black; font-family: 'Merriweather', serif;">GRAINY TEXTURE</h3>
                    </div>
                </div>
            `,
            html: `<div class="bg-grainy">
    <div class="content">GRAINY TEXTURE</div>
</div>`,
            css: `.bg-grainy {
    position: relative;
    background: #f2f2f7;
    overflow: hidden;
}

.bg-grainy::before {
    content: "";
    position: absolute;
    inset: -100%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.15;
    pointer-events: none;
    animation: noiseMove 0.2s steps(2) infinite;
}

@keyframes noiseMove {
    0% { transform: translate(0,0) }
    10% { transform: translate(-5%,-5%) }
    20% { transform: translate(-10%,5%) }
    30% { transform: translate(5%,-10%) }
    40% { transform: translate(-5%,15%) }
    50% { transform: translate(-10%,5%) }
    60% { transform: translate(15%,0) }
    70% { transform: translate(0,10%) }
    80% { transform: translate(-15%,0) }
    90% { transform: translate(10%,5%) }
    100% { transform: translate(5%,0) }
}`
        },
        dither: {
            name: '抖动效果 (Dither)',
            desc: '复古低保真色彩抖动',
            render: () => `
                <div class="bg-dither" style="width: 100%; height: 300px; border-radius: 20px; display: flex; align-items: center; justify-content: center; background: #fa7ec5;">
                    <h2 style="color: white; font-size: 3rem; font-weight: 900; -webkit-text-stroke: 1.5px black; text-shadow: 4px 4px 0 black;">DITHER</h2>
                </div>
            `,
            html: `<div class="bg-dither">DITHER</div>`,
            css: `.bg-dither {
    background-color: #fa7ec5;
    background-image: 
    radial-gradient(circle at 50% 50%, rgba(0,0,0,0.2) 1px, transparent 1px),
    radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 1px, transparent 1px);
    background-size: 4px 4px;
    image-rendering: pixelated;
}`
        },
        mesh: {
            name: '网格渐变',
            desc: '液态多色流动背景',
            render: () => `
                <div class="bg-mesh-gradient" style="width: 100%; height: 300px; border-radius: 20px;">
                    <div class="mesh-ball mesh-ball-1"></div>
                    <div class="mesh-ball mesh-ball-2"></div>
                    <div class="mesh-ball mesh-ball-3"></div>
                    <div style="position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; height: 100%;">
                        <h2 style="color: black; font-weight: 900; font-size: 2.5rem; text-transform: uppercase; background: white; padding: 10px 20px; border: 4px solid black; box-shadow: 8px 8px 0 black;">Mesh Fluid</h2>
                    </div>
                </div>
            `,
            html: `<div class="bg-mesh-gradient">
    <div class="mesh-ball mesh-ball-1"></div>
    <div class="mesh-ball mesh-ball-2"></div>
    <div class="mesh-ball mesh-ball-3"></div>
</div>`,
            css: `/* See css/effects.css .bg-mesh-gradient */`
        },
        marquee: {
            name: '水平跑马灯',
            desc: '无限循环的品牌滚动特技',
            render: () => `
                <div style="width: 100%; padding: 40px 0; background: #f2f2f7; border-radius: 20px; overflow: hidden;">
                    <div class="marquee-container">
                        <div class="marquee-content">
                            NEW COLLECTION 2026 • MAGAZINE STYLE • BOLD TYPOGRAPHY • CREATIVE CODING • 
                        </div>
                    </div>
                    <div class="marquee-container" style="background: var(--secondary); margin-top: 20px;">
                        <div class="marquee-content" style="animation-direction: reverse; color: black;">
                            DESIGNING THE FUTURE • PIXEL PERFECT • ANIMATED INTERFACES • 
                        </div>
                    </div>
                </div>
            `,
            html: `<div class="marquee-container">
    <div class="marquee-content">YOUR SCROLLING TEXT HERE</div>
</div>`,
            css: `/* See css/effects.css .marquee-container */`
        }
    },

    // 动感排版 (Kinetic Typography)
    typography: {
        reveal: {
            name: '文字切片揭示',
            desc: '通过切片动画逐层揭示文字',
            render: () => `
                <div class="typo-reveal-container" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 300px; background: #1e4a8d; width: 100%; border-radius: 20px;">
                    <div class="reveal-wrapper">
                        <h2 class="reveal-text" data-text="MAGAZINE">MAGAZINE</h2>
                        <h2 class="reveal-text secondary" data-text="STYLE">STYLE</h2>
                    </div>
                </div>
            `,
            html: `<div class="reveal-wrapper">
    <h1 class="reveal-text" data-text="MAGAZINE">MAGAZINE</h1>
</div>`,
            css: `/* See css/effects.css .reveal-text */`
        },
        ticker: {
            name: '垂直跑马灯',
            desc: '杂志风格侧边栏滚动咨询',
            render: () => `
                <div style="display: flex; align-items: center; justify-content: center; height: 300px; background: #f2f2f7; width: 100%; border-radius: 20px;">
                    <div class="ticker-vertical" style="width: 300px;">
                        <ul class="ticker-vertical-list">
                            <li>BREAKING NEWS: NEW DESIGN SYSTEM</li>
                            <li>MAGAZINE STYLE IS TRENDING</li>
                            <li>MINIMALISM VS MAXIMALISM</li>
                            <li>THE FUTURE OF WEB TYPOGRAPHY</li>
                            <li>STAY CREATIVE, STAY BOLD</li>
                            <li>BREAKING NEWS: NEW DESIGN SYSTEM</li>
                        </ul>
                    </div>
                </div>
            `,
            html: `<div class="ticker-vertical">
    <ul class="ticker-vertical-list">
        <li>EDITORIAL UPDATE</li>
        <li>NEW TRENDS 2026</li>
        <li>DESIGN REVEALED</li>
    </ul>
</div>`,
            css: `/* See css/effects.css .ticker-vertical */`
        },
        kinetic: {
            name: '动力学文字',
            desc: '带有深度感和微妙浮动的文字',
            render: () => `
                <div style="display: flex; align-items: center; justify-content: center; height: 300px; background: white; width: 100%; border-radius: 20px; border: 2px solid var(--primary);">
                    <h1 class="kinetic-text" data-text="KINETIC">KINETIC</h1>
                </div>
            `,
            html: `<h1 class="kinetic-text" data-text="HEADING">HEADING</h1>`,
            css: `/* See css/effects.css .kinetic-text */`
        },
        splitHover: {
            name: '切片悬浮',
            desc: '鼠标悬浮时产生形变与图层切换',
            render: () => `
                <div style="display: flex; align-items: center; justify-content: center; height: 300px; background: #fafafa; width: 100%; border-radius: 20px;">
                    <div class="split-text-wrapper">
                        <span class="main-text">EXPLORE</span>
                        <span class="overlay-text">FUTURE</span>
                    </div>
                </div>
            `,
            html: `<div class="split-text-wrapper">
    <span class="main-text">TEXT</span>
    <span class="overlay-text">OVERLAY</span>
</div>`,
            css: `/* See css/effects.css .split-text-wrapper */`
        }
    },

    // 文字效果
    text: {
        gradient: {
            name: '渐变文字',
            desc: '文字渐变色彩',
            render: () => `
                <div style="display: flex; flex-direction: column; gap: 20px; align-items: center;">
                    <h2 class="text-gradient" style="font-size: 3rem;">Gradient Text</h2>
                    <h2 class="text-gradient-rainbow" style="font-size: 3rem;">Rainbow Text</h2>
                </div>
            `,
            html: `<h2 class="text-gradient">Gradient Text</h2>`,
            css: `.text-gradient {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.text-gradient-rainbow {
    background: linear-gradient(
        90deg,
        #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff
    );
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientFlow 5s ease infinite;
}`
        },
        stroke: {
            name: '描边文字',
            desc: '镂空描边文字效果',
            render: () => `
                <h2 class="text-stroke" style="font-size: 4rem; font-weight: bold;">STROKE</h2>
            `,
            html: `<h2 class="text-stroke">STROKE</h2>`,
            css: `.text-stroke {
    color: transparent;
    -webkit-text-stroke: 2px var(--primary);
    text-stroke: 2px var(--primary);
}`
        },
        neon: {
            name: '霓虹灯文字',
            desc: '发光霓虹灯效果',
            render: () => `
                <div style="background: #0a0a0a; padding: 40px; border-radius: 20px;">
                    <h2 class="text-neon" style="font-size: 3rem; font-family: monospace;">NEON</h2>
                </div>
            `,
            html: `<h2 class="text-neon">NEON</h2>`,
            css: `.text-neon {
    color: #fff;
    text-shadow:
        0 0 5px #fff,
        0 0 10px #fff,
        0 0 20px var(--primary),
        0 0 40px var(--primary),
        0 0 80px var(--primary);
    animation: neonFlicker 2s infinite alternate;
}

@keyframes neonFlicker {
    0%, 18%, 22%, 25%, 53%, 57%, 100% {
        text-shadow:
            0 0 5px #fff,
            0 0 10px #fff,
            0 0 20px var(--primary),
            0 0 40px var(--primary),
            0 0 80px var(--primary);
    }
    20%, 24%, 55% {
        text-shadow: none;
    }
}`
        },
        text3d: {
            name: '3D文字',
            desc: '立体文字阴影效果',
            render: () => `
                <h2 class="text-3d" style="font-size: 4rem; font-weight: bold;">3D TEXT</h2>
            `,
            html: `<h2 class="text-3d">3D TEXT</h2>`,
            css: `.text-3d {
    color: var(--primary);
    text-shadow:
        1px 1px 0 var(--primary-dark),
        2px 2px 0 var(--primary-dark),
        3px 3px 0 var(--primary-dark),
        4px 4px 0 var(--primary-dark),
        5px 5px 10px rgba(0, 0, 0, 0.3);
}`
        }
    },

    // 边框阴影
    border: {
        animated: {
            name: '动态边框',
            desc: '旋转渐变边框',
            render: () => `
                <div style="padding: 4px; border-radius: 18px; background: conic-gradient(from 0deg, var(--primary), var(--secondary), var(--primary)); animation: borderRotate 4s linear infinite;">
                    <div style="background: var(--bg-primary); padding: 30px; border-radius: 14px; text-align: center;">
                        <h3>Animated Border</h3>
                    </div>
                </div>
            `,
            html: `<div class="border-animated">
    <div class="content">Content</div>
</div>`,
            css: `.border-animated {
    position: relative;
    background: var(--bg-primary);
    border-radius: 16px;
}

.border-animated::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 18px;
    background: conic-gradient(
        from var(--angle, 0deg),
        var(--primary), var(--secondary), var(--primary)
    );
    animation: borderRotate 4s linear infinite;
    z-index: -1;
}

@keyframes borderRotate {
    to { --angle: 360deg; }
}

@property --angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
}`
        },
        glow: {
            name: '发光边框',
            desc: '脉冲发光边框效果',
            render: () => `
                <div class="border-glow" style="padding: 30px; border-radius: 16px; text-align: center;">
                    <h3>Glowing Border</h3>
                </div>
            `,
            html: `<div class="border-glow">Content</div>`,
            css: `.border-glow {
    border: 2px solid var(--primary);
    border-radius: 16px;
    box-shadow:
        0 0 5px var(--primary),
        0 0 10px var(--primary),
        0 0 20px var(--primary),
        inset 0 0 5px var(--primary);
    animation: borderGlow 2s ease-in-out infinite alternate;
}

@keyframes borderGlow {
    from {
        box-shadow:
            0 0 5px var(--primary),
            0 0 10px var(--primary),
            0 0 20px var(--primary),
            inset 0 0 5px var(--primary);
    }
    to {
        box-shadow:
            0 0 10px var(--primary),
            0 0 20px var(--primary),
            0 0 40px var(--primary),
            inset 0 0 10px var(--primary);
    }
}`
        },
        clip: {
            name: '裁剪路径',
            desc: '各种裁剪形状',
            render: () => `
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
                    <div class="clip-diagonal" style="background: var(--primary); padding: 40px; text-align: center;">Diagonal</div>
                    <div class="clip-hexagon" style="background: var(--secondary); padding: 40px; text-align: center;">Hexagon</div>
                    <div class="clip-wave" style="background: var(--primary); padding: 40px 40px 60px; text-align: center;">Wave</div>
                </div>
            `,
            html: `<div class="clip-diagonal">Diagonal</div>
<div class="clip-hexagon">Hexagon</div>
<div class="clip-wave">Wave</div>`,
            css: `.clip-diagonal {
    clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
}

.clip-hexagon {
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

.clip-wave {
    clip-path: polygon(
        0% 0%, 100% 0%, 100% calc(100% - 30px),
        75% 100%, 50% calc(100% - 30px),
        25% 100%, 0% calc(100% - 30px)
    );
}`
        }
    }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VisualEffects };
}

export { VisualEffects };
