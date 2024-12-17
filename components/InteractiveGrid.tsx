"use client";
import { useEffect, useRef } from "react";

const InteractiveGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    let points: { x: number; y: number; originX: number; originY: number; opacity: number }[] = [];
    const mouse = { x: 0, y: 0 };
    
    const radius = 25; // radius of the circle the mouse displaces by
    const decay = 0.01; // Lower value = slower return
    const base_opacity = 0.2;

    const gridSize = 10; // distance between each point, lower number increases point density
    const grid_pattern_size = 200; // length and width of the square pattern in px

    const lightModeColor = "#f5f5ff";
    const darkModeColor = "#262626";
    const pointColor = "#8b5cf6";

    const hexToRGBA = (hex: string, opacity: number) => {
        hex = hex.replace("#", "");
      
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
      
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
      };

    const generateGrid = () => {
      points = [];
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const opacity_x1 = Math.min((x % grid_pattern_size) / grid_pattern_size + base_opacity, 0.8);
          const opacity_x2 = Math.min((grid_pattern_size - (x % grid_pattern_size)) / grid_pattern_size + base_opacity, 0.8);
          const opacity_x = Math.min(opacity_x1, opacity_x2);

          const opacity_y1 = Math.min((y % grid_pattern_size) / grid_pattern_size + base_opacity, 0.8);
          const opacity_y2 = Math.min((grid_pattern_size - (y % grid_pattern_size)) / grid_pattern_size + base_opacity, 0.8);
          const opacity_y = Math.min(opacity_y1, opacity_y2);

          points.push({
            x,
            y,
            originX: x,
            originY: y,
            opacity: Math.min(opacity_x, opacity_y),
          });
        }
      }
    };

    const drawPoints = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      ctx.fillStyle = isDarkMode ? darkModeColor : lightModeColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      points.forEach((point) => {
        const dx = point.x - mouse.x;
        const dy = point.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < radius) {
          const angle = Math.atan2(dy, dx);
          point.x = point.originX + Math.cos(angle) * radius;
          point.y = point.originY + Math.sin(angle) * radius;
        } else {
          point.x += (point.originX - point.x) * decay;
          point.y += (point.originY - point.y) * decay;
        }

        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = hexToRGBA(pointColor, point.opacity);
        ctx.fill();
      });

      requestAnimationFrame(drawPoints);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (
          e.clientX >= 0 &&
          e.clientX <= window.innerWidth &&
          e.clientY >= 0 &&
          e.clientY <= window.innerHeight
        ) {
          mouse.x = e.clientX;
          mouse.y = e.clientY;
        }
      };

    const handleResize = () => {
      generateGrid();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    generateGrid();
    drawPoints();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default InteractiveGrid;