/**
 * 交互效果库
 */

const InteractionEffects = {
    // 视差滚动效果
    parallax: {
        name: '视差滚动',
        init: (container) => {
            container.innerHTML = `
                <div class="parallax-container">
                    <div class="parallax-layer layer-back">
                        <div class="parallax-box"></div>
                    </div>
                    <div class="parallax-layer layer-middle">
                        <div class="parallax-box"></div>
                    </div>
                    <div class="parallax-layer layer-front">
                        <div class="parallax-box"></div>
                    </div>
                </div>
            `;

            const layers = container.querySelectorAll('.parallax-layer');
            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
                const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

                layers.forEach((layer, i) => {
                    const depth = (i + 1) * 20;
                    layer.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
                });
            });
        }
    },

    // 鼠标跟随效果
    mouseFollow: {
        name: '鼠标跟随',
        init: (container) => {
            container.innerHTML = `
                <div class="mouse-follow-container">
                    <div class="follower"></div>
                    <div class="follower-trail"></div>
                </div>
            `;

            const follower = container.querySelector('.follower');
            const trail = container.querySelector('.follower-trail');

            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                follower.style.transform = `translate(${x - 20}px, ${y - 20}px)`;

                setTimeout(() => {
                    trail.style.transform = `translate(${x - 15}px, ${y - 15}px)`;
                }, 100);
            });
        }
    },

    // 磁性按钮效果
    magneticButton: {
        name: '磁性按钮',
        init: (container) => {
            container.innerHTML = `
                <div class="magnetic-container">
                    <button class="magnetic-btn">
                        <span>Hover Me</span>
                    </button>
                </div>
            `;

            const btn = container.querySelector('.magnetic-btn');

            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        }
    },

    // 文字打乱效果
    textScramble: {
        name: '文字打乱',
        init: (container) => {
            container.innerHTML = `
                <div class="text-scramble-container">
                    <h2 class="scramble-text" data-text="Hover over this text">
                        Hover over this text
                    </h2>
                </div>
            `;

            const text = container.querySelector('.scramble-text');
            const originalText = text.dataset.text;
            const chars = '!<>-_\\/[]{}—=+*^?#________';

            text.addEventListener('mouseenter', () => {
                let iteration = 0;
                const interval = setInterval(() => {
                    text.textContent = originalText
                        .split('')
                        .map((char, index) => {
                            if (index < iteration) {
                                return originalText[index];
                            }
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join('');

                    if (iteration >= originalText.length) {
                        clearInterval(interval);
                    }
                    iteration += 1 / 3;
                }, 30);
            });
        }
    },

    //  ripple 波纹效果
    ripple: {
        name: '点击波纹',
        init: (container) => {
            container.innerHTML = `
                <div class="ripple-container">
                    <button class="ripple-btn">Click Me</button>
                </div>
            `;

            const btn = container.querySelector('.ripple-btn');

            btn.addEventListener('click', function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.className = 'ripple-effect';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';

                this.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        }
    },

    // 3D Pro 卡片 (3D Pro Card)
    proCard: {
        name: '3D Pro 卡片',
        init: (container) => {
            container.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 300px; background: #f2f2f7; width: 100%; border-radius: 20px;">
                    <div class="pro-card-container">
                        <div class="pro-card">
                            <div class="pro-card-glint"></div>
                            <h2 style="margin: 0; font-size: 1.5rem; color: var(--primary);">Interactive 3D</h2>
                            <p style="margin-top: auto; opacity: 0.6;">Mouse over to tilt</p>
                            <div style="position: absolute; bottom: 20px; right: 20px; font-weight: 900; font-size: 2rem; opacity: 0.1;">01</div>
                        </div>
                    </div>
                </div>
            `;

            const card = container.querySelector('.pro-card');
            const glint = container.querySelector('.pro-card-glint');

            container.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

                // 光影跟随
                const glintX = (x / rect.width) * 100;
                const glintY = (y / rect.height) * 100;
                glint.style.background = `radial-gradient(circle at ${glintX}% ${glintY}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 80%)`;
            });

            container.addEventListener('mouseleave', () => {
                card.style.transform = `rotateX(0deg) rotateY(0deg)`;
                glint.style.background = `none`;
            });
        }
    },

    // 磁吸效果 (Cursor Magnet)
    magnet: {
        name: '磁力吸附',
        init: (container) => {
            container.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 300px; background: white; width: 100%; border-radius: 20px; border: 2px solid var(--border-light);">
                    <div class="magnet-target">MAGNET</div>
                </div>
            `;

            const target = container.querySelector('.magnet-target');

            container.addEventListener('mousemove', (e) => {
                const rect = target.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const distanceX = e.clientX - centerX;
                const distanceY = e.clientY - centerY;
                const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                const magnetRadius = 150;

                if (distance < magnetRadius) {
                    const pull = (1 - distance / magnetRadius) * 40;
                    target.style.transform = `translate(${distanceX * 0.2}px, ${distanceY * 0.2}px)`;
                    target.style.background = `var(--secondary)`;
                } else {
                    target.style.transform = `translate(0, 0)`;
                    target.style.background = `var(--primary)`;
                }
            });

            container.addEventListener('mouseleave', () => {
                target.style.transform = `translate(0, 0)`;
                target.style.background = `var(--primary)`;
            });
        }
    }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { InteractionEffects };
}

export { InteractionEffects };
