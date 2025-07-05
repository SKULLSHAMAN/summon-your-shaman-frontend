import React from 'react';

function SubmitForm({ canvasRef }) {
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      alert('Error: Canvas is not available');
      return;
    }

    // Create a temporary canvas to resize
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = 500; // Reduced resolution
    tempCanvas.height = 500;
    tempCtx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);

    // Generate image and trigger download
    const image = tempCanvas.toDataURL('image/jpeg', 0.5); // JPEG with 50% quality
    const link = document.createElement('a');
    link.href = image;
    link.download = 'shaman-nft.jpg';
    link.click();
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Download Your Shaman</h2>
      <button
        onClick={handleDownload}
        style={{
          padding: '10px 20px',
          background: '#ff4500',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1em',
        }}
      >
        Download Image
      </button>
    </div>
  );
}

export default SubmitForm;