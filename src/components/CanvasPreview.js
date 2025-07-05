import React, { useRef, useEffect } from 'react';

function CanvasPreview({ layers, canvasRef }) {
  const internalCanvasRef = useRef(null);
  const ref = canvasRef || internalCanvasRef;

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');

    // Limpia el canvas antes de redibujar
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Orden fijo de las capas
    const layerOrder = ['background', 'body', 'skull', 'hats', 'mask', 'eyes', 'hands'];

    // Función para dibujar una capa
    const drawLayer = (src) => {
      if (!src) return;
      const img = new Image();
      img.src = src;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    };

    // Dibuja todas las capas en el orden fijo
    layerOrder.forEach((category) => {
      if (layers[category]) {
        drawLayer(`/assets/${category}/${layers[category]}`);
      }
    });
  }, [layers, ref]);

  return (
    <div>
      <h2>Vista Previa</h2>
      <canvas ref={ref} width={360} height={360} style={{ border: '1px solid white' }} />
    </div>
  );
}

export default CanvasPreview;