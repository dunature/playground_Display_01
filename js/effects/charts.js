/**
 * 数据可视化图表组件
 * 包含：折线图、柱状图、饼图、环形图、面积图等基础图表
 */

/**
 * 绘制折线图
 * @param {HTMLCanvasElement} canvas - Canvas元素
 * @param {Object} config - 配置项
 */
function drawLineChart(canvas, config) {
    const ctx = canvas.getContext('2d');
    const { data, labels, colors } = config;
    const padding = 40;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 计算最大值
    const maxValue = Math.max(...data) * 1.1;
    const stepX = width / (data.length - 1);

    // 绘制网格线
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (height / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
    }

    // 绘制折线
    ctx.beginPath();
    ctx.strokeStyle = colors[0];
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    data.forEach((value, index) => {
        const x = padding + stepX * index;
        const y = padding + height - (value / maxValue) * height;
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();

    // 绘制填充渐变
    const gradient = ctx.createLinearGradient(0, padding, 0, canvas.height - padding);
    gradient.addColorStop(0, colors[0] + '40');
    gradient.addColorStop(1, colors[0] + '00');
    ctx.fillStyle = gradient;
    ctx.lineTo(padding + width, padding + height);
    ctx.lineTo(padding, padding + height);
    ctx.closePath();
    ctx.fill();

    // 绘制数据点
    data.forEach((value, index) => {
        const x = padding + stepX * index;
        const y = padding + height - (value / maxValue) * height;

        ctx.beginPath();
        ctx.fillStyle = colors[0];
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = '#fff';
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
    });

    // 绘制标签
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    labels.forEach((label, index) => {
        const x = padding + stepX * index;
        ctx.fillText(label, x, canvas.height - padding + 20);
    });
}

/**
 * 绘制柱状图
 * @param {HTMLCanvasElement} canvas - Canvas元素
 * @param {Object} config - 配置项
 */
function drawBarChart(canvas, config) {
    const ctx = canvas.getContext('2d');
    const { data, labels, colors } = config;
    const padding = 40;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const maxValue = Math.max(...data) * 1.1;
    const barWidth = (width / data.length) * 0.6;
    const barGap = (width / data.length) * 0.4;

    // 绘制网格线
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (height / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
    }

    // 绘制柱状图
    data.forEach((value, index) => {
        const x = padding + (barWidth + barGap) * index + barGap / 2;
        const barHeight = (value / maxValue) * height;
        const y = padding + height - barHeight;

        // 渐变填充
        const gradient = ctx.createLinearGradient(0, y, 0, padding + height);
        gradient.addColorStop(0, colors[index % colors.length]);
        gradient.addColorStop(1, colors[index % colors.length] + '80');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);

        // 圆角顶部
        ctx.beginPath();
        ctx.fillStyle = colors[index % colors.length];
        ctx.roundRect(x, y, barWidth, 6, [3, 3, 0, 0]);
        ctx.fill();
    });

    // 绘制标签
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    labels.forEach((label, index) => {
        const x = padding + (barWidth + barGap) * index + barGap / 2 + barWidth / 2;
        ctx.fillText(label, x, canvas.height - padding + 20);
    });
}

/**
 * 绘制饼图
 * @param {HTMLCanvasElement} canvas - Canvas元素
 * @param {Object} config - 配置项
 */
function drawPieChart(canvas, config) {
    const ctx = canvas.getContext('2d');
    const { data, labels, colors } = config;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 30;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const total = data.reduce((sum, val) => sum + val, 0);
    let currentAngle = -Math.PI / 2;

    data.forEach((value, index) => {
        const sliceAngle = (value / total) * Math.PI * 2;

        // 绘制扇形
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = colors[index % colors.length];
        ctx.fill();

        // 绘制边框
        ctx.strokeStyle = '#1a1d23';
        ctx.lineWidth = 2;
        ctx.stroke();

        // 绘制标签
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
        const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const percentage = Math.round((value / total) * 100) + '%';
        ctx.fillText(percentage, labelX, labelY);

        currentAngle += sliceAngle;
    });

    // 绘制图例
    let legendY = 20;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    labels.forEach((label, index) => {
        ctx.fillStyle = colors[index % colors.length];
        ctx.fillRect(canvas.width - 100, legendY - 8, 12, 12);

        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = '11px sans-serif';
        ctx.fillText(label, canvas.width - 85, legendY + 2);

        legendY += 20;
    });
}

/**
 * 绘制环形图
 * @param {HTMLCanvasElement} canvas - Canvas元素
 * @param {Object} config - 配置项
 */
function drawDoughnutChart(canvas, config) {
    const ctx = canvas.getContext('2d');
    const { data, labels, colors, centerText } = config;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const outerRadius = Math.min(centerX, centerY) - 30;
    const innerRadius = outerRadius * 0.6;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const total = data.reduce((sum, val) => sum + val, 0);
    let currentAngle = -Math.PI / 2;

    data.forEach((value, index) => {
        const sliceAngle = (value / total) * Math.PI * 2;

        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, currentAngle, currentAngle + sliceAngle);
        ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
        ctx.closePath();

        ctx.fillStyle = colors[index % colors.length];
        ctx.fill();

        ctx.strokeStyle = '#1a1d23';
        ctx.lineWidth = 2;
        ctx.stroke();

        currentAngle += sliceAngle;
    });

    // 中心文字
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(centerText || total.toString(), centerX, centerY - 10);

    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '12px sans-serif';
    ctx.fillText('总计', centerX, centerY + 15);
}

/**
 * 绘制面积图
 * @param {HTMLCanvasElement} canvas - Canvas元素
 * @param {Object} config - 配置项
 */
function drawAreaChart(canvas, config) {
    const ctx = canvas.getContext('2d');
    const { data, labels, colors } = config;
    const padding = 40;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const maxValue = Math.max(...data) * 1.1;
    const stepX = width / (data.length - 1);

    // 绘制网格线
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (height / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
    }

    // 绘制面积
    ctx.beginPath();
    data.forEach((value, index) => {
        const x = padding + stepX * index;
        const y = padding + height - (value / maxValue) * height;
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    // 渐变填充
    const gradient = ctx.createLinearGradient(0, padding, 0, canvas.height - padding);
    gradient.addColorStop(0, colors[0] + '60');
    gradient.addColorStop(1, colors[0] + '10');

    ctx.lineTo(padding + width, padding + height);
    ctx.lineTo(padding, padding + height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // 绘制边界线
    ctx.beginPath();
    data.forEach((value, index) => {
        const x = padding + stepX * index;
        const y = padding + height - (value / maxValue) * height;
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.strokeStyle = colors[0];
    ctx.lineWidth = 3;
    ctx.stroke();

    // 绘制标签
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    labels.forEach((label, index) => {
        const x = padding + stepX * index;
        ctx.fillText(label, x, canvas.height - padding + 20);
    });
}

// 图表效果定义
const ChartEffects = {
    // 折线图
    lineChart: {
        name: '折线图',
        desc: '带渐变填充的平滑折线图',
        category: 'chart-basic',
        render: () => {
            const canvasId = 'lineChart_' + Date.now();
            setTimeout(() => {
                const canvas = document.getElementById(canvasId);
                if (canvas) {
                    canvas.width = 400;
                    canvas.height = 250;
                    drawLineChart(canvas, {
                        data: [65, 78, 90, 81, 96, 105, 120],
                        labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                        colors: ['#6366f1']
                    });
                }
            }, 0);
            return `<canvas id="${canvasId}" style="max-width: 100%; height: auto;"></canvas>`;
        },
        html: '<canvas id="lineChart" width="400" height="250"></canvas>',
        js: `const canvas = document.getElementById('lineChart');
const ctx = canvas.getContext('2d');

// 绘制折线图
drawLineChart(canvas, {
    data: [65, 78, 90, 81, 96, 105, 120],
    labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    colors: ['#6366f1']
});`
    },

    // 柱状图
    barChart: {
        name: '柱状图',
        desc: '多彩渐变柱状图，支持响应式',
        category: 'chart-basic',
        render: () => {
            const canvasId = 'barChart_' + Date.now();
            setTimeout(() => {
                const canvas = document.getElementById(canvasId);
                if (canvas) {
                    canvas.width = 400;
                    canvas.height = 250;
                    drawBarChart(canvas, {
                        data: [45, 72, 58, 89, 64, 95, 78],
                        labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
                        colors: ['#6366f1', '#ec4899', '#22c55e', '#f59e0b', '#3b82f6', '#a855f7', '#ef4444']
                    });
                }
            }, 0);
            return `<canvas id="${canvasId}" style="max-width: 100%; height: auto;"></canvas>`;
        },
        html: '<canvas id="barChart" width="400" height="250"></canvas>',
        js: `drawBarChart(canvas, {
    data: [45, 72, 58, 89, 64, 95, 78],
    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
    colors: ['#6366f1', '#ec4899', '#22c55e']
});`
    },

    // 饼图
    pieChart: {
        name: '饼图',
        desc: '带百分比显示的彩色饼图',
        category: 'chart-basic',
        render: () => {
            const canvasId = 'pieChart_' + Date.now();
            setTimeout(() => {
                const canvas = document.getElementById(canvasId);
                if (canvas) {
                    canvas.width = 350;
                    canvas.height = 250;
                    drawPieChart(canvas, {
                        data: [30, 25, 20, 15, 10],
                        labels: ['产品A', '产品B', '产品C', '产品D', '其他'],
                        colors: ['#6366f1', '#ec4899', '#22c55e', '#f59e0b', '#6b7280']
                    });
                }
            }, 0);
            return `<canvas id="${canvasId}" style="max-width: 100%; height: auto;"></canvas>`;
        },
        html: '<canvas id="pieChart" width="350" height="250"></canvas>',
        js: `drawPieChart(canvas, {
    data: [30, 25, 20, 15, 10],
    labels: ['产品A', '产品B', '产品C', '产品D', '其他'],
    colors: ['#6366f1', '#ec4899', '#22c55e', '#f59e0b', '#6b7280']
});`
    },

    // 环形图
    doughnutChart: {
        name: '环形图',
        desc: '带中心文字显示的环形图',
        category: 'chart-basic',
        render: () => {
            const canvasId = 'doughnutChart_' + Date.now();
            setTimeout(() => {
                const canvas = document.getElementById(canvasId);
                if (canvas) {
                    canvas.width = 300;
                    canvas.height = 250;
                    drawDoughnutChart(canvas, {
                        data: [35, 28, 22, 15],
                        labels: ['桌面', '移动', '平板', '其他'],
                        colors: ['#6366f1', '#ec4899', '#22c55e', '#f59e0b'],
                        centerText: '2,458'
                    });
                }
            }, 0);
            return `<canvas id="${canvasId}" style="max-width: 100%; height: auto;"></canvas>`;
        },
        html: '<canvas id="doughnutChart" width="300" height="250"></canvas>',
        js: `drawDoughnutChart(canvas, {
    data: [35, 28, 22, 15],
    labels: ['桌面', '移动', '平板', '其他'],
    colors: ['#6366f1', '#ec4899', '#22c55e', '#f59e0b'],
    centerText: '2,458'
});`
    },

    // 面积图
    areaChart: {
        name: '面积图',
        desc: '渐变填充的面积趋势图',
        category: 'chart-basic',
        render: () => {
            const canvasId = 'areaChart_' + Date.now();
            setTimeout(() => {
                const canvas = document.getElementById(canvasId);
                if (canvas) {
                    canvas.width = 400;
                    canvas.height = 250;
                    drawAreaChart(canvas, {
                        data: [30, 45, 38, 52, 48, 68, 75, 82],
                        labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
                        colors: ['#ec4899']
                    });
                }
            }, 0);
            return `<canvas id="${canvasId}" style="max-width: 100%; height: auto;"></canvas>`;
        },
        html: '<canvas id="areaChart" width="400" height="250"></canvas>',
        js: `drawAreaChart(canvas, {
    data: [30, 45, 38, 52, 48, 68, 75, 82],
    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
    colors: ['#ec4899']
});`
    }
};

// 导出图表效果和绘制函数
export { ChartEffects, drawLineChart, drawBarChart, drawPieChart, drawDoughnutChart, drawAreaChart };
