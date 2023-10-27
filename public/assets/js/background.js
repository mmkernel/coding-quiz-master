"use strict";

const canvas = document.getElementById('backgroundCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const colors = ['#FF5733', '#33FF57', '#5733FF', '#FF33C2', '#33C2FF', '#C2FF33'];

        function drawRandomShapes() {
            const numShapes = Math.floor(Math.random() * 100);

            for (let i = 0; i < numShapes; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const size = Math.random() * 50;
                const color = colors[Math.floor(Math.random() * colors.length)];

                ctx.fillStyle = color;

                const randomShape = Math.random();
                if (randomShape < 0.33) {
                    // Draw a rectangle
                    ctx.fillRect(x, y, size, size);
                } else if (randomShape < 0.67) {
                    // Draw a circle
                    ctx.beginPath();
                    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    // Draw a triangle
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + size, y);
                    ctx.lineTo(x + size / 2, y + size);
                    ctx.fill();
                }
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawRandomShapes();
            requestAnimationFrame(draw);
        }

        draw();