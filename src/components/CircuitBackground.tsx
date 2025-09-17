import { useEffect, useRef } from 'react';

export default function CircuitBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Configuración del canvas
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Configuración del circuito
        const nodes: Array<{
            x: number;
            y: number;
            connections: number[];
            active: boolean;
            pulse: number;
        }> = [];

        const connections: Array<{
            from: number;
            to: number;
            progress: number;
            speed: number;
            active: boolean;
        }> = [];

        // Crear nodos del circuito
        const createNodes = () => {
            const cols = Math.floor(canvas.width / 120);
            const rows = Math.floor(canvas.height / 120);

            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    const x = (j * canvas.width) / cols + (canvas.width / cols) * 0.5;
                    const y = (i * canvas.height) / rows + (canvas.height / rows) * 0.5;

                    nodes.push({
                        x: x + (Math.random() - 0.5) * 40,
                        y: y + (Math.random() - 0.5) * 40,
                        connections: [],
                        active: false,
                        pulse: 0
                    });
                }
            }

            // Crear conexiones entre nodos cercanos
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150 && Math.random() < 0.3) {
                        nodes[i].connections.push(j);
                        nodes[j].connections.push(i);

                        connections.push({
                            from: i,
                            to: j,
                            progress: 0,
                            speed: 0.005 + Math.random() * 0.01,
                            active: false
                        });
                    }
                }
            }
        };

        // Función para activar un pulso
        const activatePulse = (nodeIndex: number) => {
            nodes[nodeIndex].active = true;
            nodes[nodeIndex].pulse = 1;

            // Activar conexiones desde este nodo
            connections.forEach(conn => {
                if (conn.from === nodeIndex) {
                    conn.active = true;
                    conn.progress = 0;
                }
            });
        };

        // Función de animación
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Actualizar nodos
            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                if (node.active) {
                    node.pulse -= 0.02;
                    if (node.pulse <= 0) {
                        node.active = false;
                        node.pulse = 0;
                    }
                }
            }

            // Actualizar conexiones
            for (let i = 0; i < connections.length; i++) {
                const conn = connections[i];
                if (conn.active) {
                    conn.progress += conn.speed;
                    if (conn.progress >= 1) {
                        conn.active = false;
                        conn.progress = 0;

                        // Activar el nodo de destino
                        if (!nodes[conn.to].active) {
                            activatePulse(conn.to);
                        }
                    }
                }
            }

            // Dibujar conexiones
            ctx.strokeStyle = 'rgba(255, 0, 0, 0.2)'; // Rojo más visible
            ctx.lineWidth = 2; // Líneas más gruesas
            connections.forEach(conn => {
                const fromNode = nodes[conn.from];
                const toNode = nodes[conn.to];

                ctx.beginPath();
                ctx.moveTo(fromNode.x, fromNode.y);

                if (conn.active) {
                    const progress = conn.progress;
                    const x = fromNode.x + (toNode.x - fromNode.x) * progress;
                    const y = fromNode.y + (toNode.y - fromNode.y) * progress;

                    // Dibujar línea hasta el punto actual
                    ctx.lineTo(x, y);

                    // Dibujar punto de luz más brillante
                    ctx.strokeStyle = 'rgba(255, 0, 0, 1)'; // Rojo brillante
                    ctx.lineWidth = 4; // Línea más gruesa
                    ctx.stroke();

                    // Punto brillante más grande
                    ctx.fillStyle = 'rgba(255, 0, 0, 1)'; // Rojo sólido
                    ctx.beginPath();
                    ctx.arc(x, y, 6, 0, Math.PI * 2); // Punto más grande
                    ctx.fill();

                    // Efecto de resplandor
                    ctx.shadowColor = 'rgba(255, 0, 0, 0.8)';
                    ctx.shadowBlur = 15;
                    ctx.fillStyle = 'rgba(255, 0, 0, 0.6)';
                    ctx.beginPath();
                    ctx.arc(x, y, 12, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.shadowBlur = 0;

                    ctx.strokeStyle = 'rgba(255, 0, 0, 0.2)';
                    ctx.lineWidth = 2;
                } else {
                    ctx.lineTo(toNode.x, toNode.y);
                }

                ctx.stroke();
            });

            // Dibujar nodos
            nodes.forEach((node, index) => {
                if (node.active) {
                    // Nodo activo con pulso más dramático
                    const radius = 6 + node.pulse * 12; // Más grande
                    const alpha = 0.5 + node.pulse * 0.5; // Más opaco

                    // Efecto de resplandor exterior
                    ctx.shadowColor = 'rgba(255, 0, 0, 0.8)';
                    ctx.shadowBlur = 20;
                    ctx.fillStyle = `rgba(255, 0, 0, ${alpha * 0.3})`;
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, radius * 3, 0, Math.PI * 2);
                    ctx.fill();

                    // Efecto de resplandor medio
                    ctx.shadowColor = 'rgba(255, 0, 0, 0.6)';
                    ctx.shadowBlur = 15;
                    ctx.fillStyle = `rgba(255, 0, 0, ${alpha * 0.6})`;
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, radius * 1.5, 0, Math.PI * 2);
                    ctx.fill();

                    // Nodo principal
                    ctx.shadowColor = 'rgba(255, 0, 0, 1)';
                    ctx.shadowBlur = 10;
                    ctx.fillStyle = `rgba(255, 0, 0, ${alpha})`;
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.shadowBlur = 0;
                } else {
                    // Nodo inactivo más visible
                    ctx.fillStyle = 'rgba(255, 0, 0, 0.3)'; // Más visible
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, 3, 0, Math.PI * 2); // Más grande
                    ctx.fill();
                }
            });

            requestAnimationFrame(animate);
        };

        // Inicializar
        createNodes();

        // Activar pulsos aleatorios más frecuentes
        const pulseInterval = setInterval(() => {
            const randomNode = Math.floor(Math.random() * nodes.length);
            if (!nodes[randomNode].active) {
                activatePulse(randomNode);
            }
        }, 500); // Más frecuente: cada 500ms

        // Activar múltiples pulsos simultáneos
        const multiPulseInterval = setInterval(() => {
            const numPulses = 2 + Math.floor(Math.random() * 3); // 2-4 pulsos simultáneos
            for (let i = 0; i < numPulses; i++) {
                const randomNode = Math.floor(Math.random() * nodes.length);
                if (!nodes[randomNode].active) {
                    activatePulse(randomNode);
                }
            }
        }, 1500);

        // Iniciar animación
        animate();

        // Limpiar
        return () => {
            clearInterval(pulseInterval);
            clearInterval(multiPulseInterval);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: -1 }}
        />
    );
}
