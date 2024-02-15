import React, { useRef, useEffect } from 'react';

const CircularChart = ({ value, color, size }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = size / 2;
    const lineWidth = 20; // Adjust the width of the doughnut ring

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the background circle
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    context.lineWidth = lineWidth;
    context.strokeStyle = '#e0e0e0'; // Background color
    context.stroke();

    // Draw the filled portion of the doughnut
    context.beginPath();
    context.arc(centerX, centerY, radius, -0.5 * Math.PI, -0.5 * Math.PI + (2 * Math.PI * value));
    context.lineWidth = lineWidth;
    context.strokeStyle = color;
    context.stroke();
  }, [value, color, size]);

  return <canvas ref={canvasRef} width={size} height={size} />;
};

export default CircularChart;
