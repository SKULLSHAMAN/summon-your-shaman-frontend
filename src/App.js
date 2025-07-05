import React, { useState, useRef } from 'react';
import LayerSelector from './components/LayerSelector';
import CanvasPreview from './components/CanvasPreview';
import SubmitForm from './components/SubmitForm';
import './App.css';

function App() {
  const [selectedLayers, setSelectedLayers] = useState({});
  const canvasRef = useRef(null);

  const handleLayerChange = (layers) => {
    setSelectedLayers(layers);
  };

  return (
    <div className="App">
      <h1>Summon Your Shaman</h1>
      <p>CREATE YOUR OWN SHAMAN
      </p>
      <div className="main-container">
        <div className="layer-section">
          <LayerSelector onLayerChange={handleLayerChange} />
        </div>
        <div className="preview-section">
          <CanvasPreview layers={selectedLayers} canvasRef={canvasRef} />
          <SubmitForm canvasRef={canvasRef} />
        </div>
      </div>
    </div>
  );
}

export default App;