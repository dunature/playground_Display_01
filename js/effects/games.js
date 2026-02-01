/**
 * 简单游戏效果
 */

const GameEffects = {
    // 贪吃蛇
    snake: {
        name: '贪吃蛇',
        init: (container) => {
            const canvas = document.createElement('canvas');
            canvas.width = 400;
            canvas.height = 400;
            canvas.style.border = '2px solid var(--primary)';
            container.appendChild(canvas);

            const ctx = canvas.getContext('2d');
            const gridSize = 20;
            const tileCount = canvas.width / gridSize;

            let snake = [{ x: 10, y: 10 }];
            let food = { x: 15, y: 15 };
            let dx = 0, dy = 0;
            let score = 0;
            let gameLoop;
            let isGameOver = false;

            const scoreDiv = document.createElement('div');
            scoreDiv.className = 'game-score';
            scoreDiv.textContent = 'Score: 0';
            container.insertBefore(scoreDiv, canvas);

            const controlsDiv = document.createElement('div');
            controlsDiv.className = 'game-controls';
            controlsDiv.innerHTML = `
                <button class="btn btn-primary" id="start-snake">开始游戏</button>
                <p>使用方向键控制</p>
            `;
            container.appendChild(controlsDiv);

            function draw() {
                // 清空画布
                ctx.fillStyle = 'var(--bg-secondary)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // 绘制蛇
                ctx.fillStyle = 'var(--primary)';
                snake.forEach(segment => {
                    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
                });

                // 绘制食物
                ctx.fillStyle = 'var(--error)';
                ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
            }

            function update() {
                if (isGameOver) return;

                const head = { x: snake[0].x + dx, y: snake[0].y + dy };

                // 碰撞检测
                if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount ||
                    snake.some(segment => segment.x === head.x && segment.y === head.y)) {
                    isGameOver = true;
                    alert('Game Over! Score: ' + score);
                    return;
                }

                snake.unshift(head);

                // 吃食物
                if (head.x === food.x && head.y === food.y) {
                    score += 10;
                    scoreDiv.textContent = 'Score: ' + score;
                    food = {
                        x: Math.floor(Math.random() * tileCount),
                        y: Math.floor(Math.random() * tileCount)
                    };
                } else {
                    snake.pop();
                }
            }

            function gameStep() {
                update();
                draw();
            }

            document.addEventListener('keydown', (e) => {
                if (!isGameOver) {
                    switch (e.key) {
                        case 'ArrowUp': if (dy === 0) { dx = 0; dy = -1; } break;
                        case 'ArrowDown': if (dy === 0) { dx = 0; dy = 1; } break;
                        case 'ArrowLeft': if (dx === 0) { dx = -1; dy = 0; } break;
                        case 'ArrowRight': if (dx === 0) { dx = 1; dy = 0; } break;
                    }
                }
            });

            document.getElementById('start-snake')?.addEventListener('click', () => {
                clearInterval(gameLoop);
                snake = [{ x: 10, y: 10 }];
                food = { x: 15, y: 15 };
                dx = 1; dy = 0;
                score = 0;
                isGameOver = false;
                scoreDiv.textContent = 'Score: 0';
                gameLoop = setInterval(gameStep, 100);
            });

            draw();

            return {
                destroy: () => clearInterval(gameLoop)
            };
        }
    },

    // 打砖块
    breakout: {
        name: '打砖块',
        init: (container) => {
            const canvas = document.createElement('canvas');
            canvas.width = 400;
            canvas.height = 300;
            canvas.style.border = '2px solid var(--primary)';
            container.appendChild(canvas);

            const ctx = canvas.getContext('2d');

            const paddle = { x: 160, y: 280, width: 80, height: 10 };
            const ball = { x: 200, y: 150, dx: 3, dy: -3, radius: 6 };
            const bricks = [];
            const brickRowCount = 5;
            const brickColumnCount = 8;
            const brickWidth = 42;
            const brickHeight = 15;
            const brickPadding = 5;
            const brickOffsetTop = 30;
            const brickOffsetLeft = 15;

            // 初始化砖块
            for (let c = 0; c < brickColumnCount; c++) {
                for (let r = 0; r < brickRowCount; r++) {
                    bricks.push({
                        x: c * (brickWidth + brickPadding) + brickOffsetLeft,
                        y: r * (brickHeight + brickPadding) + brickOffsetTop,
                        status: 1
                    });
                }
            }

            let score = 0;
            let animationId;
            let isRunning = false;

            const controlsDiv = document.createElement('div');
            controlsDiv.className = 'game-controls';
            controlsDiv.innerHTML = `
                <button class="btn btn-primary" id="start-breakout">开始游戏</button>
                <div class="breakout-score">Score: 0</div>
                <p>移动鼠标控制挡板</p>
            `;
            container.appendChild(controlsDiv);

            function drawBall() {
                ctx.beginPath();
                ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'var(--primary)';
                ctx.fill();
                ctx.closePath();
            }

            function drawPaddle() {
                ctx.fillStyle = 'var(--secondary)';
                ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
            }

            function drawBricks() {
                const colors = ['#ef4444', '#f97316', '#f59e0b', '#22c55e', '#3b82f6'];
                bricks.forEach((brick, i) => {
                    if (brick.status === 1) {
                        ctx.fillStyle = colors[Math.floor(i / brickColumnCount)];
                        ctx.fillRect(brick.x, brick.y, brickWidth, brickHeight);
                    }
                });
            }

            function collisionDetection() {
                bricks.forEach(brick => {
                    if (brick.status === 1) {
                        if (ball.x > brick.x && ball.x < brick.x + brickWidth &&
                            ball.y > brick.y && ball.y < brick.y + brickHeight) {
                            ball.dy = -ball.dy;
                            brick.status = 0;
                            score += 10;
                            container.querySelector('.breakout-score').textContent = 'Score: ' + score;
                        }
                    }
                });
            }

            function update() {
                if (!isRunning) return;

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawBricks();
                drawBall();
                drawPaddle();
                collisionDetection();

                ball.x += ball.dx;
                ball.y += ball.dy;

                // 左右墙壁碰撞
                if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
                    ball.dx = -ball.dx;
                }

                // 顶部墙壁碰撞
                if (ball.y + ball.dy < ball.radius) {
                    ball.dy = -ball.dy;
                }
                // 挡板碰撞
                else if (ball.y + ball.dy > canvas.height - ball.radius - paddle.height &&
                    ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
                    ball.dy = -ball.dy;
                }
                // 底部掉落
                else if (ball.y + ball.dy > canvas.height - ball.radius) {
                    isRunning = false;
                    alert('Game Over! Score: ' + score);
                    return;
                }

                animationId = requestAnimationFrame(update);
            }

            canvas.addEventListener('mousemove', (e) => {
                const rect = canvas.getBoundingClientRect();
                const relativeX = e.clientX - rect.left;
                if (relativeX > 0 && relativeX < canvas.width) {
                    paddle.x = relativeX - paddle.width / 2;
                }
            });

            document.getElementById('start-breakout')?.addEventListener('click', () => {
                cancelAnimationFrame(animationId);
                ball.x = 200;
                ball.y = 150;
                ball.dx = 3;
                ball.dy = -3;
                score = 0;
                container.querySelector('.breakout-score').textContent = 'Score: 0';
                bricks.forEach(brick => brick.status = 1);
                isRunning = true;
                update();
            });

            drawBricks();
            drawBall();
            drawPaddle();

            return {
                destroy: () => cancelAnimationFrame(animationId)
            };
        }
    },

    // 记忆翻牌游戏
    memory: {
        name: '记忆翻牌',
        init: (container) => {
            const emojis = ['🎮', '🎯', '🎲', '🎸', '🎨', '🎭', '🎪', '🎬'];
            const cards = [...emojis, ...emojis];
            let flipped = [];
            let matched = [];
            let moves = 0;

            // 洗牌
            cards.sort(() => Math.random() - 0.5);

            container.innerHTML = `
                <div class="memory-game">
                    <div class="memory-grid">
                        ${cards.map((emoji, i) => `
                            <div class="memory-card" data-index="${i}" data-emoji="${emoji}">
                                <div class="card-front">?</div>
                                <div class="card-back">${emoji}</div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="memory-info">
                        <span>Moves: <span id="memory-moves">0</span></span>
                        <button class="btn btn-secondary" id="restart-memory">重新开始</button>
                    </div>
                </div>
            `;

            const cardsEl = container.querySelectorAll('.memory-card');
            const movesEl = container.querySelector('#memory-moves');

            cardsEl.forEach(card => {
                card.addEventListener('click', () => {
                    const index = parseInt(card.dataset.index);

                    if (flipped.length < 2 && !flipped.includes(index) && !matched.includes(index)) {
                        card.classList.add('flipped');
                        flipped.push(index);

                        if (flipped.length === 2) {
                            moves++;
                            movesEl.textContent = moves;

                            const [i1, i2] = flipped;
                            const card1 = cards[i1];
                            const card2 = cards[i2];

                            if (card1 === card2) {
                                matched.push(i1, i2);
                                flipped = [];

                                if (matched.length === cards.length) {
                                    setTimeout(() => alert(`恭喜！用了 ${moves} 步完成`), 500);
                                }
                            } else {
                                setTimeout(() => {
                                    cardsEl[i1].classList.remove('flipped');
                                    cardsEl[i2].classList.remove('flipped');
                                    flipped = [];
                                }, 1000);
                            }
                        }
                    }
                });
            });

            document.getElementById('restart-memory')?.addEventListener('click', () => {
                this.memory.init(container);
            });
        }
    }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GameEffects };
}

export { GameEffects };
