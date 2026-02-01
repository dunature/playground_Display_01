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

            btn.addEventListener('click', function(e) {
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
    }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { InteractionEffects };
}

export { InteractionEffects };
