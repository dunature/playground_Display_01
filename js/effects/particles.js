/**
 * 粒子效果渲染器
 */

class ParticleSystem {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.options = {
            particleCount: 50,
            particleColor: '#6366f1',
            particleSize: { min: 2, max: 5 },
            particleSpeed: { min: 0.5, max: 2 },
            connectionDistance: 100,
            connectionColor: 'rgba(99, 102, 241, 0.2)',
            connectionWidth: 1,
            mouseInteraction: true,
            mouseRadius: 150,
            ...options
        };

        this.particles = [];
        this.mouse = { x: null, y: null };
        this.dpr = window.devicePixelRatio || 1;
        this.animationId = null;

        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.addEventListeners();
        this.animate();
    }

    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * this.dpr;
        this.canvas.height = rect.height * this.dpr;
        this.width = rect.width;
        this.height = rect.height;
        this.ctx.scale(this.dpr, this.dpr);
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.options.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 2 * this.options.particleSpeed.max,
                vy: (Math.random() - 0.5) * 2 * this.options.particleSpeed.max,
                size: Math.random() * (this.options.particleSize.max - this.options.particleSize.min) + this.options.particleSize.min,
                color: this.options.particleColor
            });
        }
    }

    addEventListeners() {
        if (this.options.mouseInteraction) {
            this.canvas.addEventListener('mousemove', (e) => {
                const rect = this.canvas.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
            });

            this.canvas.addEventListener('mouseleave', () => {
                this.mouse.x = null;
                this.mouse.y = null;
            });
        }

        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // 更新和绘制粒子
        this.particles.forEach((particle, i) => {
            // 更新位置
            particle.x += particle.vx;
            particle.y += particle.vy;

            // 边界检查
            if (particle.x < 0 || particle.x > this.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.height) particle.vy *= -1;

            // 鼠标交互
            if (this.options.mouseInteraction && this.mouse.x !== null) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.options.mouseRadius) {
                    const force = (this.options.mouseRadius - distance) / this.options.mouseRadius;
                    particle.vx += dx * force * 0.01;
                    particle.vy += dy * force * 0.01;
                }
            }

            // 绘制粒子
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();

            // 绘制连线
            for (let j = i + 1; j < this.particles.length; j++) {
                const other = this.particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.options.connectionDistance) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.strokeStyle = this.options.connectionColor;
                    this.ctx.lineWidth = this.options.connectionWidth;
                    this.ctx.stroke();
                }
            }
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// 粒子效果配置
const ParticleEffects = {
    basic: {
        name: '基础粒子',
        desc: '粒子与连线效果',
        init: (container) => {
            const canvas = document.createElement('canvas');
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            container.appendChild(canvas);

            return new ParticleSystem(canvas, {
                particleCount: 50,
                particleColor: '#6366f1',
                connectionDistance: 100
            });
        }
    },
    colorful: {
        name: '彩色粒子',
        desc: '多色粒子效果',
        init: (container) => {
            const canvas = document.createElement('canvas');
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            container.appendChild(canvas);

            const colors = ['#6366f1', '#ec4899', '#22c55e', '#f59e0b', '#3b82f6'];
            const system = new ParticleSystem(canvas, {
                particleCount: 60,
                connectionDistance: 120
            });

            system.particles.forEach((p, i) => {
                p.color = colors[i % colors.length];
            });

            return system;
        }
    },
    fireflies: {
        name: '萤火虫效果',
        desc: '闪烁的萤火虫粒子',
        init: (container) => {
            const canvas = document.createElement('canvas');
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            container.appendChild(canvas);

            return new ParticleSystem(canvas, {
                particleCount: 30,
                particleColor: '#fbbf24',
                particleSize: { min: 3, max: 8 },
                particleSpeed: { min: 0.2, max: 0.8 },
                connectionDistance: 80
            });
        }
    },
    snow: {
        name: '雪花飘落',
        desc: '飘落的雪花效果',
        init: (container) => {
            const canvas = document.createElement('canvas');
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            container.appendChild(canvas);

            const ctx = canvas.getContext('2d');
            const dpr = window.devicePixelRatio || 1;

            const resize = () => {
                const rect = canvas.getBoundingClientRect();
                canvas.width = rect.width * dpr;
                canvas.height = rect.height * dpr;
                ctx.scale(dpr, dpr);
            };
            resize();

            const snowflakes = [];
            for (let i = 0; i < 100; i++) {
                snowflakes.push({
                    x: Math.random() * canvas.width / dpr,
                    y: Math.random() * canvas.height / dpr,
                    radius: Math.random() * 3 + 1,
                    speed: Math.random() * 2 + 1,
                    swing: Math.random() * 2
                });
            }

            let animationId;
            const animate = () => {
                ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

                snowflakes.forEach(flake => {
                    flake.y += flake.speed;
                    flake.x += Math.sin(flake.y / 50) * flake.swing;

                    if (flake.y > canvas.height / dpr) {
                        flake.y = 0;
                        flake.x = Math.random() * canvas.width / dpr;
                    }

                    ctx.beginPath();
                    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                    ctx.fill();
                });

                animationId = requestAnimationFrame(animate);
            };
            animate();

            return { destroy: () => cancelAnimationFrame(animationId) };
        }
    },
    rain: {
        name: '下雨效果',
        desc: '雨滴下落效果',
        init: (container) => {
            const canvas = document.createElement('canvas');
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            container.appendChild(canvas);

            const ctx = canvas.getContext('2d');
            const dpr = window.devicePixelRatio || 1;

            const resize = () => {
                const rect = canvas.getBoundingClientRect();
                canvas.width = rect.width * dpr;
                canvas.height = rect.height * dpr;
                ctx.scale(dpr, dpr);
            };
            resize();

            const raindrops = [];
            for (let i = 0; i < 150; i++) {
                raindrops.push({
                    x: Math.random() * canvas.width / dpr,
                    y: Math.random() * canvas.height / dpr,
                    length: Math.random() * 20 + 10,
                    speed: Math.random() * 10 + 10
                });
            }

            let animationId;
            const animate = () => {
                ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

                ctx.strokeStyle = 'rgba(100, 149, 237, 0.5)';
                ctx.lineWidth = 1;

                raindrops.forEach(drop => {
                    ctx.beginPath();
                    ctx.moveTo(drop.x, drop.y);
                    ctx.lineTo(drop.x, drop.y + drop.length);
                    ctx.stroke();

                    drop.y += drop.speed;

                    if (drop.y > canvas.height / dpr) {
                        drop.y = -drop.length;
                        drop.x = Math.random() * canvas.width / dpr;
                    }
                });

                animationId = requestAnimationFrame(animate);
            };
            animate();

            return { destroy: () => cancelAnimationFrame(animationId) };
        }
    },
    stars: {
        name: '星空闪烁',
        desc: '闪烁的星空效果',
        init: (container) => {
            const canvas = document.createElement('canvas');
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            container.appendChild(canvas);

            const ctx = canvas.getContext('2d');
            const dpr = window.devicePixelRatio || 1;

            const resize = () => {
                const rect = canvas.getBoundingClientRect();
                canvas.width = rect.width * dpr;
                canvas.height = rect.height * dpr;
                ctx.scale(dpr, dpr);
            };
            resize();

            const stars = [];
            for (let i = 0; i < 150; i++) {
                stars.push({
                    x: Math.random() * canvas.width / dpr,
                    y: Math.random() * canvas.height / dpr,
                    radius: Math.random() * 1.5 + 0.5,
                    opacity: Math.random(),
                    fade: Math.random() * 0.02 + 0.005
                });
            }

            let animationId;
            const animate = () => {
                ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

                stars.forEach(star => {
                    star.opacity += star.fade;
                    if (star.opacity > 1 || star.opacity < 0) {
                        star.fade = -star.fade;
                    }

                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.opacity)})`;
                    ctx.fill();
                });

                animationId = requestAnimationFrame(animate);
            };
            animate();

            return { destroy: () => cancelAnimationFrame(animationId) };
        }
    }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ParticleSystem, ParticleEffects };
}

export { ParticleSystem, ParticleEffects };
