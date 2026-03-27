const canvas = document.getElementById("networkCanvas");

if (canvas) {
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let nodes = [];

    function createNodes() {
        nodes = [];
        for (let i = 0; i < 40; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.7,
                vy: (Math.random() - 0.5) * 0.7
            });
        }
    }

    createNodes();

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        nodes.forEach((node, i) => {
            node.x += node.vx;
            node.y += node.vy;

            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

            ctx.beginPath();
            ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = "#38bdf8";
            ctx.fill();

            for (let j = i + 1; j < nodes.length; j++) {
                let dx = node.x - nodes[j].x;
                let dy = node.y - nodes[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = "rgba(56,189,248,0.15)";
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(draw);
    }

    draw();
}
