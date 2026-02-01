/**
 * 图表组件 - 使用 Canvas 绘制
 */

class Chart {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.options = {
            type: 'line', // line | bar | pie | doughnut | radar
            data: { labels: [], datasets: [] },
            colors: ['#6366f1', '#ec4899', '#22c55e', '#f59e0b', '#3b82f6'],
            animation: true,
            duration: 1000,
            padding: 40,
            ...options
        };

        this.dpr = window.devicePixelRatio || 1;
        this.resize();

        window.addEventListener('resize', () => this.resize());

        if (this.options.animation) {
            this.animate();
        } else {
            this.draw();
        }
    }

    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * this.dpr;
        this.canvas.height = rect.height * this.dpr;
        this.width = rect.width;
        this.height = rect.height;
        this.ctx.scale(this.dpr, this.dpr);
    }

    animate() {
        const startTime = performance.now();
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.options.duration, 1);
            const easedProgress = this.easeOutQuart(progress);

            this.draw(easedProgress);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }

    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    draw(progress = 1) {
        this.ctx.clearRect(0, 0, this.width, this.height);

        switch (this.options.type) {
            case 'line':
                this.drawLineChart(progress);
                break;
            case 'bar':
                this.drawBarChart(progress);
                break;
            case 'pie':
            case 'doughnut':
                this.drawPieChart(progress);
                break;
            case 'radar':
                this.drawRadarChart(progress);
                break;
        }
    }

    drawLineChart(progress) {
        const { padding, data, colors } = this.options;
        const chartWidth = this.width - padding * 2;
        const chartHeight = this.height - padding * 2;

        const maxValue = Math.max(...data.datasets.flatMap(d => d.data));
        const xStep = chartWidth / (data.labels.length - 1);

        // 绘制网格
        this.drawGrid(padding, chartWidth, chartHeight, maxValue);

        // 绘制线条
        data.datasets.forEach((dataset, datasetIndex) => {
            this.ctx.beginPath();
            this.ctx.strokeStyle = colors[datasetIndex % colors.length];
            this.ctx.lineWidth = 2;

            dataset.data.forEach((value, index) => {
                const x = padding + index * xStep;
                const y = padding + chartHeight - (value / maxValue) * chartHeight * progress;

                if (index === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            });

            this.ctx.stroke();

            // 绘制点
            this.ctx.fillStyle = colors[datasetIndex % colors.length];
            dataset.data.forEach((value, index) => {
                const x = padding + index * xStep;
                const y = padding + chartHeight - (value / maxValue) * chartHeight * progress;

                this.ctx.beginPath();
                this.ctx.arc(x, y, 4, 0, Math.PI * 2);
                this.ctx.fill();
            });
        });

        // 绘制标签
        this.ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-secondary');
        this.ctx.font = '12px sans-serif';
        this.ctx.textAlign = 'center';
        data.labels.forEach((label, index) => {
            const x = padding + index * xStep;
            this.ctx.fillText(label, x, this.height - padding + 20);
        });
    }

    drawBarChart(progress) {
        const { padding, data, colors } = this.options;
        const chartWidth = this.width - padding * 2;
        const chartHeight = this.height - padding * 2;

        const maxValue = Math.max(...data.datasets.flatMap(d => d.data));
        const barWidth = (chartWidth / data.labels.length) / data.datasets.length - 4;
        const groupWidth = chartWidth / data.labels.length;

        // 绘制网格
        this.drawGrid(padding, chartWidth, chartHeight, maxValue);

        // 绘制柱状图
        data.datasets.forEach((dataset, datasetIndex) => {
            this.ctx.fillStyle = colors[datasetIndex % colors.length];

            dataset.data.forEach((value, index) => {
                const x = padding + index * groupWidth + datasetIndex * (barWidth + 2) + 10;
                const barHeight = (value / maxValue) * chartHeight * progress;
                const y = padding + chartHeight - barHeight;

                this.ctx.fillRect(x, y, barWidth, barHeight);
            });
        });

        // 绘制标签
        this.ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-secondary');
        this.ctx.font = '12px sans-serif';
        this.ctx.textAlign = 'center';
        data.labels.forEach((label, index) => {
            const x = padding + index * groupWidth + groupWidth / 2;
            this.ctx.fillText(label, x, this.height - padding + 20);
        });
    }

    drawPieChart(progress) {
        const { data, colors } = this.options;
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const radius = Math.min(centerX, centerY) - 40;
        const innerRadius = this.options.type === 'doughnut' ? radius * 0.5 : 0;

        const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
        let currentAngle = -Math.PI / 2;

        data.datasets[0].data.forEach((value, index) => {
            const sliceAngle = (value / total) * Math.PI * 2 * progress;

            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            this.ctx.closePath();
            this.ctx.fillStyle = colors[index % colors.length];
            this.ctx.fill();

            // 绘制标签
            if (progress === 1) {
                const labelAngle = currentAngle + sliceAngle / 2;
                const labelX = centerX + Math.cos(labelAngle) * (radius + 20);
                const labelY = centerY + Math.sin(labelAngle) * (radius + 20);

                this.ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-primary');
                this.ctx.font = '12px sans-serif';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(data.labels[index], labelX, labelY);
            }

            currentAngle += sliceAngle;
        });

        // 绘制中心空洞（环形图）
        if (innerRadius > 0) {
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
            this.ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--bg-primary');
            this.ctx.fill();
        }
    }

    drawRadarChart(progress) {
        const { padding, data, colors } = this.options;
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const radius = Math.min(centerX, centerY) - padding;
        const angleStep = (Math.PI * 2) / data.labels.length;

        // 绘制网格
        for (let i = 1; i <= 5; i++) {
            const r = (radius / 5) * i;
            this.ctx.beginPath();
            for (let j = 0; j < data.labels.length; j++) {
                const angle = j * angleStep - Math.PI / 2;
                const x = centerX + Math.cos(angle) * r;
                const y = centerY + Math.sin(angle) * r;
                if (j === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.closePath();
            this.ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--border-color');
            this.ctx.stroke();
        }

        // 绘制轴线
        for (let i = 0; i < data.labels.length; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.lineTo(x, y);
            this.ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--border-color');
            this.ctx.stroke();

            // 绘制标签
            const labelX = centerX + Math.cos(angle) * (radius + 20);
            const labelY = centerY + Math.sin(angle) * (radius + 20);
            this.ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-secondary');
            this.ctx.font = '12px sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(data.labels[i], labelX, labelY);
        }

        // 绘制数据
        const maxValue = 100;
        data.datasets.forEach((dataset, datasetIndex) => {
            this.ctx.beginPath();
            dataset.data.forEach((value, index) => {
                const angle = index * angleStep - Math.PI / 2;
                const r = (value / maxValue) * radius * progress;
                const x = centerX + Math.cos(angle) * r;
                const y = centerY + Math.sin(angle) * r;

                if (index === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            });
            this.ctx.closePath();
            this.ctx.strokeStyle = colors[datasetIndex % colors.length];
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            this.ctx.fillStyle = colors[datasetIndex % colors.length] + '40';
            this.ctx.fill();
        });
    }

    drawGrid(padding, width, height, maxValue) {
        this.ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--border-color');
        this.ctx.lineWidth = 1;

        // 水平网格线
        for (let i = 0; i <= 5; i++) {
            const y = padding + (height / 5) * i;
            this.ctx.beginPath();
            this.ctx.moveTo(padding, y);
            this.ctx.lineTo(padding + width, y);
            this.ctx.stroke();

            // Y轴标签
            const value = Math.round(maxValue - (maxValue / 5) * i);
            this.ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-muted');
            this.ctx.font = '10px sans-serif';
            this.ctx.textAlign = 'right';
            this.ctx.fillText(value.toString(), padding - 10, y + 3);
        }
    }

    update(data) {
        this.options.data = data;
        if (this.options.animation) {
            this.animate();
        } else {
            this.draw();
        }
    }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Chart };
}

export { Chart };
