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
