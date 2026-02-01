/**
 * 模态框组件
 */

class Modal {
    constructor(options = {}) {
        this.options = {
            title: '提示',
            content: '',
            showClose: true,
            showFooter: true,
            confirmText: '确定',
            cancelText: '取消',
            showCancel: true,
            animation: 'slide-up', // slide-up | slide-down | zoom | flip | fade
            size: 'medium', // small | medium | large | full
            closable: true, // 点击遮罩关闭
            ...options
        };

        this.element = null;
        this.overlay = null;
        this.isOpen = false;
        this.resolve = null;
        this.reject = null;
    }

    // 创建模态框DOM
    create() {
        // 创建遮罩
        this.overlay = document.createElement('div');
        this.overlay.className = 'modal-overlay';

        // 创建模态框
        this.element = document.createElement('div');
        this.element.className = `modal ${this.options.animation} modal-${this.options.size}`;

        // 头部
        const header = document.createElement('div');
        header.className = 'modal-header';

        const title = document.createElement('h3');
        title.className = 'modal-title';
        title.textContent = this.options.title;
        header.appendChild(title);

        if (this.options.showClose) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'modal-close';
            closeBtn.innerHTML = '<i class="fas fa-times"></i>';
            closeBtn.addEventListener('click', () => this.close(false));
            header.appendChild(closeBtn);
        }

        this.element.appendChild(header);

        // 内容
        const body = document.createElement('div');
        body.className = 'modal-body';
        if (typeof this.options.content === 'string') {
            body.innerHTML = this.options.content;
        } else {
            body.appendChild(this.options.content);
        }
        this.element.appendChild(body);

        // 底部
        if (this.options.showFooter) {
            const footer = document.createElement('div');
            footer.className = 'modal-footer';

            if (this.options.showCancel) {
                const cancelBtn = document.createElement('button');
                cancelBtn.className = 'btn btn-secondary';
                cancelBtn.textContent = this.options.cancelText;
                cancelBtn.addEventListener('click', () => this.close(false));
                footer.appendChild(cancelBtn);
            }

            const confirmBtn = document.createElement('button');
            confirmBtn.className = 'btn btn-primary';
            confirmBtn.textContent = this.options.confirmText;
            confirmBtn.addEventListener('click', () => this.close(true));
            footer.appendChild(confirmBtn);

            this.element.appendChild(footer);
        }

        this.overlay.appendChild(this.element);

        // 点击遮罩关闭
        if (this.options.closable) {
            this.overlay.addEventListener('click', (e) => {
                if (e.target === this.overlay) {
                    this.close(false);
                }
            });
        }

        // ESC键关闭
        document.addEventListener('keydown', this.handleKeyDown);

        return this;
    }

    handleKeyDown = (e) => {
        if (e.key === 'Escape' && this.isOpen) {
            this.close(false);
        }
    }

    // 打开模态框
    open() {
        if (!this.element) {
            this.create();
        }

        document.body.appendChild(this.overlay);
        document.body.style.overflow = 'hidden';

        // 强制重绘以触发动画
        this.overlay.offsetHeight;
        this.overlay.classList.add('active');

        this.isOpen = true;

        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }

    // 关闭模态框
    close(confirmed = false) {
        if (!this.isOpen) return;

        this.overlay.classList.remove('active');

        setTimeout(() => {
            if (this.overlay.parentNode) {
                this.overlay.parentNode.removeChild(this.overlay);
            }
            document.body.style.overflow = '';
            document.removeEventListener('keydown', this.handleKeyDown);
            this.isOpen = false;

            if (this.resolve) {
                this.resolve(confirmed);
            }
        }, 300);
    }

    // 静态方法：快速创建确认对话框
    static confirm(options) {
        const modal = new Modal({
            title: '确认',
            content: '确定执行此操作吗？',
            showCancel: true,
            ...options
        });
        return modal.open();
    }

    // 静态方法：快速创建提示框
    static alert(options) {
        const modal = new Modal({
            title: '提示',
            content: '',
            showCancel: false,
            confirmText: '知道了',
            ...options
        });
        return modal.open();
    }

    // 静态方法：快速创建输入框
    static prompt(options) {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'input';
        input.placeholder = options.placeholder || '请输入...';
        input.value = options.defaultValue || '';

        const modal = new Modal({
            title: '输入',
            content: input,
            showCancel: true,
            ...options
        });

        return modal.open().then(confirmed => {
            return confirmed ? input.value : null;
        });
    }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Modal };
}

export { Modal };
