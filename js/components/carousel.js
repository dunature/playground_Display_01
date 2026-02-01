/**
 * 轮播组件
 */

class Carousel {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            autoplay: true,
            interval: 3000,
            loop: true,
            showDots: true,
            showNav: true,
            effect: 'slide', // slide | fade
            direction: 'horizontal', // horizontal | vertical
            ...options
        };

        this.slides = [];
        this.currentIndex = 0;
        this.timer = null;
        this.isAnimating = false;

        this.init();
    }

    init() {
        this.element.classList.add('carousel', this.options.effect);

        // 获取所有幻灯片
        this.slides = Array.from(this.element.querySelectorAll('.carousel-slide'));
        if (this.slides.length === 0) return;

        // 创建轨道
        this.track = document.createElement('div');
        this.track.className = 'carousel-track';

        this.slides.forEach((slide, index) => {
            slide.style.flex = '0 0 100%';
            this.track.appendChild(slide);
        });

        this.element.innerHTML = '';
        this.element.appendChild(this.track);

        // 添加导航
        if (this.options.showNav) {
            this.createNavigation();
        }

        // 添加指示点
        if (this.options.showDots) {
            this.createDots();
        }

        // 设置初始状态
        this.goTo(0);

        // 自动播放
        if (this.options.autoplay) {
            this.startAutoplay();
        }

        // 触摸支持
        this.addTouchSupport();
    }

    createNavigation() {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-nav prev';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.addEventListener('click', () => this.prev());

        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-nav next';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.addEventListener('click', () => this.next());

        this.element.appendChild(prevBtn);
        this.element.appendChild(nextBtn);
    }

    createDots() {
        this.dotsContainer = document.createElement('div');
        this.dotsContainer.className = 'carousel-dots';

        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.addEventListener('click', () => this.goTo(index));
            this.dotsContainer.appendChild(dot);
        });

        this.element.appendChild(this.dotsContainer);
    }

    updateDots() {
        if (!this.dotsContainer) return;

        const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    goTo(index) {
        if (this.isAnimating || index === this.currentIndex) return;
        this.isAnimating = true;

        const direction = index > this.currentIndex ? 1 : -1;

        // 边界检查
        if (this.options.loop) {
            if (index < 0) index = this.slides.length - 1;
            if (index >= this.slides.length) index = 0;
        } else {
            index = Math.max(0, Math.min(index, this.slides.length - 1));
        }

        if (this.options.effect === 'slide') {
            this.track.style.transform = `translateX(-${index * 100}%)`;
        } else if (this.options.effect === 'fade') {
            this.slides.forEach((slide, i) => {
                slide.style.opacity = i === index ? '1' : '0';
                slide.classList.toggle('active', i === index);
            });
        }

        this.currentIndex = index;
        this.updateDots();

        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }

    next() {
        this.goTo(this.currentIndex + 1);
    }

    prev() {
        this.goTo(this.currentIndex - 1);
    }

    startAutoplay() {
        this.stopAutoplay();
        this.timer = setInterval(() => {
            this.next();
        }, this.options.interval);
    }

    stopAutoplay() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    addTouchSupport() {
        let startX = 0;
        let startY = 0;

        this.element.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            this.stopAutoplay();
        }, { passive: true });

        this.element.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;

            const diffX = startX - endX;
            const diffY = startY - endY;

            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }

            if (this.options.autoplay) {
                this.startAutoplay();
            }
        }, { passive: true });
    }

    destroy() {
        this.stopAutoplay();
        // 清理事件监听器等
    }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Carousel };
}

export { Carousel };
