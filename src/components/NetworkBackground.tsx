"use client";

import { useEffect, useRef } from "react";

const NEON_VIOLET = "108,92,231";
const SOFT_IRIS = "175,169,236";
const FROST = "238,237,254";

// NODE_COUNT n'est plus une constante fixe — c'est la référence utilisée
// pour calculer une densité (nœuds par pixel d'écran), qu'on réapplique
// ensuite à la vraie taille de l'écran de l'utilisateur
const REFERENCE_NODE_COUNT = 85;
const REFERENCE_AREA = 1920 * 1080; // l'écran sur lequel on a calé ce chiffre dans le labo
const MIN_NODES = 25; // jamais en dessous, même sur un très petit mobile
const MAX_NODES = 220; // jamais au-dessus, même sur un écran 4K/ultra-wide

const CONNECT_DIST = 180;
const DRIFT_SPEED = 0.05;
const LINE_OPACITY = 0.55;
const JITTER = 0.9;
const NODE_SIZE = 2.0;
const NODE_GLOW = 8;
const PULSE_DENSITY = 0.15;
const PULSE_PERIOD = 6000;
const PULSE_SIZE = 1;
const PULSE_GLOW = 15;
const PULSE_TRAVEL_FRACTION = 0.55;

type Node = { x: number; y: number; vx: number; vy: number; pulse: number };

function hash(i: number, j: number): number {
    const h = (i * 374761393 + j * 668265263) % 1000000;
    return (h < 0 ? h + 1000000 : h) / 1000000;
}

// Racine carrée plutôt que proportion linéaire : la densité (nœuds par
// unité de surface) doit rester stable, et une aire évolue en "carré" de
// la dimension — un scaling linéaire sur l'aire surcorrigerait beaucoup
// trop fort entre un petit mobile et un grand écran desktop
function getNodeCount(width: number, height: number): number {
    const area = width * height;
    const scaled = Math.round(REFERENCE_NODE_COUNT * Math.sqrt(area / REFERENCE_AREA));
    return Math.max(MIN_NODES, Math.min(MAX_NODES, scaled));
}

export default function NetworkBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let nodes: Node[] = [];
        let animationFrameId: number;

        function initNodes() {
            const count = getNodeCount(width, height);
            nodes = [];
            const cols = Math.round(Math.sqrt(count * (width / height)));
            const rows = Math.ceil(count / cols);
            const cellW = width / cols;
            const cellH = height / rows;
            let i = 0;
            for (let r = 0; r < rows && i < count; r++) {
                for (let c = 0; c < cols && i < count; c++) {
                    const cx = c * cellW + cellW / 2;
                    const cy = r * cellH + cellH / 2;
                    const jx = (Math.random() - 0.5) * cellW * JITTER;
                    const jy = (Math.random() - 0.5) * cellH * JITTER;
                    nodes.push({
                        x: cx + jx,
                        y: cy + jy,
                        vx: Math.random() - 0.5,
                        vy: Math.random() - 0.5,
                        pulse: Math.random() * Math.PI * 2,
                    });
                    i++;
                }
            }
        }

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas!.width = width;
            canvas!.height = height;
            initNodes();
        }

        function draw(now: number) {
            ctx!.clearRect(0, 0, width, height);

            for (const n of nodes) {
                if (!prefersReduced) {
                    n.x += n.vx * DRIFT_SPEED;
                    n.y += n.vy * DRIFT_SPEED;
                    n.pulse += 0.02;
                }
                if (n.x < 0 || n.x > width) n.vx *= -1;
                if (n.y < 0 || n.y > height) n.vy *= -1;
                n.x = Math.max(0, Math.min(width, n.x));
                n.y = Math.max(0, Math.min(height, n.y));
            }

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const a = nodes[i];
                    const b = nodes[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d >= CONNECT_DIST) continue;

                    const op = (1 - d / CONNECT_DIST) * LINE_OPACITY;
                    ctx!.strokeStyle = `rgba(${NEON_VIOLET},${op.toFixed(2)})`;
                    ctx!.lineWidth = 1;
                    ctx!.beginPath();
                    ctx!.moveTo(a.x, a.y);
                    ctx!.lineTo(b.x, b.y);
                    ctx!.stroke();

                    if (prefersReduced) continue;

                    const hv = hash(i, j);
                    if (hv > PULSE_DENSITY) continue;

                    const offset = hash(j, i);
                    const cycle = (now / PULSE_PERIOD + offset) % 1;
                    if (cycle >= PULSE_TRAVEL_FRACTION) continue;

                    const progress = cycle / PULSE_TRAVEL_FRACTION;
                    const reverse = (i + j) % 2 === 0;
                    const t = reverse ? 1 - progress : progress;
                    const px = a.x + (b.x - a.x) * t;
                    const py = a.y + (b.y - a.y) * t;
                    const fade = Math.sin(progress * Math.PI);

                    ctx!.shadowBlur = PULSE_GLOW;
                    ctx!.shadowColor = `rgba(${FROST},0.95)`;
                    ctx!.fillStyle = `rgba(${FROST},${fade.toFixed(2)})`;
                    ctx!.beginPath();
                    ctx!.arc(px, py, PULSE_SIZE, 0, Math.PI * 2);
                    ctx!.fill();
                    ctx!.shadowBlur = 0;
                }
            }

            for (const n of nodes) {
                const pulseFactor = prefersReduced ? 1 : 0.7 + 0.3 * Math.sin(n.pulse);
                ctx!.shadowBlur = NODE_GLOW;
                ctx!.shadowColor = `rgba(${SOFT_IRIS},0.9)`;
                ctx!.fillStyle = `rgba(${SOFT_IRIS},${pulseFactor.toFixed(2)})`;
                ctx!.beginPath();
                ctx!.arc(n.x, n.y, NODE_SIZE, 0, Math.PI * 2);
                ctx!.fill();
            }
            ctx!.shadowBlur = 0;

            animationFrameId = requestAnimationFrame(draw);
        }

        resize();
        window.addEventListener("resize", resize);
        animationFrameId = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 pointer-events-none"
            aria-hidden="true"
        />
    );
}