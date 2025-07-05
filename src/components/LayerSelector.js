import React, { useState, useRef, useEffect } from 'react';
import './LayerSelector.css';

const layers = {
  background: [
    'Acid Melon.png',
    'Blue Memory.png',
    'Blue Sky.png',
    'Boring Yellowish.png',
    'Cursed Mustard.png',
    'Cyber Slime.png',
    'Dark Void.png',
    'Gray Alien Skin.png',
    'Neon Lagoon.png',
    'Not Green, Not Blue.png',
    'Old Brothers Room.png',
    'Rusty Peach.png',
    'Sad Candy.png',
  ],
  body: [
    'Pilot - Alpha Class.png',
    'Pilot - Alpha Gang.png',
    'Pilot - Black Alpha.png',
    'Pilot - Brando.png',
    'Pilot - Furr Brown.png',
    'Pilot - Speedy Blue.png',
    'Secret Agent - Black Sirius.png',
    'Secret Agent - Dark Gentleman.png',
    'Secret Agent - Elegant Fella.png',
    'Secret Agent - Indi.png',
    'Secret Agent - Suit.png',
    'Special AI - Android Force.png',
    'Special AI - Astronaut.png',
    'Special AI - Cyberdyne Systems Model 101.png',
    'Special AI - Letal Android.png',
    'Special AI - OCP Crime Prevention Unit 001.png',
    'Special AI - Skeletronix.png',
    'Street Mafia - All Black hoodie.png',
    'Street Mafia - Badass.png',
    'Street Mafia - Chill Green.png',
    'Street Mafia - Cool Guy.png',
    'Street Mafia - Drip Hoodie.png',
    'Street Mafia - Hege Hoodie.png',
    'Street Mafia - Jupiter Hoodie.png',
    'Street Mafia - Solana Hoodie.png',
  ],
  skull: ['Cryptic Sentinel.png', 
    'Spectral Purple Haze.png', 
    'Toxic Breath.png', 
    'Decay Steel.png', 
    'Void Wishper.png',
  ],
  hats: ['Back Snapback.png',
    'Blue Raider.png',
    'Bored Surfer.png',
    'Born 2 Mint.png',
    'BubbleGum Anarchist.png',
    'Cold AF.png',
    'Cool Thief.png',
    'Drip Cap.png',
    'Explorer.png',
    'Forgotten Pirate.png',
    'Gentlemen.png',
    'Happy Beanie.png',
    'Hege Cap.png',
    'Im Batman in Yellow.png',
    'Im Batman too.png',
    'Im Batman.png',
    'Ice Cap.png',
    'Jupiter Cap.png',
    'King in the Castle.png',
    'My Astral Process Army.png',
    'No Hat.png',
    'Pirate Without Ship.png',
    'Green Beanie.png',
    'PolyRealmZ Crew.png',
    'PolyRealmz Sargent.png',
    'PTSD Helmet.png',
    'Retro Officer.png',
    'Elegant Man.png',
    'Skull Racer.png',
    'Speed Addict.png',
    'Starlight Helmet.png',
    'Stash Cap.png',
    'Summer Vibes.png',
    'The Winners Helmet.png',
    'Tom Cruise Cap.png',
    'Windy AF.png',
  ],
  mask: [
    'Bloodcore Mask.png',
    'Bored Smoker.png',
    'Dark Smile.png',
    'Dessert Mask.png',
    'Eco Filter.png',
    'Guerrilla Radio.png',
    'Heavy Smoker.png',
    'Jungle Whisperer.png',
    'Toxic Fate.png',
    'Unmasked.png',
    'Venom Breath.png',
  ],
  eyes: [
    'Cryo Leak.png',
    'Hex Slime.png',
    'Venom Drip.png',
    'Dark Glow.png',
    'Glitch Orbs.png',
    'Lucid Ember.png',
    'Paranoia Pods.png',
    'Void Drops.png',
    'Doomed Sigil.png',
    'Inferno Spirits.png',
    'Moon Ash.png',
    'Spirit Smog.png',
  ],
  hands: [
    'Beretta 93R.png',
    'Colt M1911.png',
    'Desert Eagle Mark XIX.png',
    'Dark Side of the Moon.png',
    'Doomscroller.png',
    'Game Boy Hacker.png',
    'Ghost Blade.png',
    'GM Warrior.png',
    'Inkmancer.png',
    'Neo Barista.png',
    'No Hands.png',
    'Piss Off Dealer.png',
    'Play Station Fury.png',
    'Skull Cola.png',
    'Skullverine.png',
    'Spray Prophet.png',
    'TNT ACME.png',
    'Toxic Graffer.png',
    'Water Gun.png',
    'Zip It Boy.png',
  ],
};

function LayerSelector({ onLayerChange }) {
  const [selectedLayers, setSelectedLayers] = useState({
    background: null,
    body: null,
    skull: null,
    hats: null,
    mask: null,
    eyes: null,
    hands: null,
  });

  const [carouselPositions, setCarouselPositions] = useState({
    background: 0,
    body: 0,
    skull: 0,
    hats: 0,
    mask: 0,
    eyes: 0,
    hands: 0,
  });

  const carouselRefs = {
    background: useRef(null),
    body: useRef(null),
    skull: useRef(null),
    hats: useRef(null),
    mask: useRef(null),
    eyes: useRef(null),
    hands: useRef(null),
  };

  const imagesPerView = 6; // 6 images visible at a time

  const handleLayerSelect = (category, layer) => {
    const newLayers = { ...selectedLayers, [category]: layer };
    setSelectedLayers(newLayers);
    onLayerChange(newLayers);
  };

  const handleScroll = (category, direction) => {
    const totalImages = layers[category].length;
    const maxPosition = Math.max(0, totalImages - imagesPerView);

    setCarouselPositions((prev) => {
      let newPosition = prev[category];
      if (direction === 'left') {
        newPosition = Math.max(0, prev[category] - imagesPerView);
      } else if (direction === 'right') {
        newPosition = Math.min(maxPosition, prev[category] + imagesPerView);
      }
      return { ...prev, [category]: newPosition };
    });
  };

  const handleKeyDown = (e, category) => {
    const currentIndex = selectedLayers[category]
      ? layers[category].indexOf(selectedLayers[category])
      : -1;
    const totalImages = layers[category].length;

    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault(); // Prevent default scrolling behavior
      let newIndex = currentIndex;

      if (e.key === 'ArrowLeft') {
        newIndex = (currentIndex - 1 + totalImages) % totalImages; // Move to previous image
      } else if (e.key === 'ArrowRight') {
        newIndex = (currentIndex + 1) % totalImages; // Move to next image
      }

      if (newIndex !== currentIndex && newIndex >= 0) {
        const newLayer = layers[category][newIndex];
        handleLayerSelect(category, newLayer);
      }
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  // Add keyboard event listener when component mounts
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // Only trigger if focus is on a carousel or its images
      const activeElement = document.activeElement;
      if (activeElement && activeElement.classList.contains('carousel-image')) {
        const category = Object.keys(carouselRefs).find(
          (cat) => carouselRefs[cat].current.contains(activeElement)
        );
        if (category) {
          handleKeyDown(e, category);
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [selectedLayers]); // Add selectedLayers to dependency array

  return (
    <div className="layer-container">
      {Object.keys(layers).map((category) => (
        <div key={category} className="layer-category">
          <h3>{category.toUpperCase()}</h3>
          <div className="carousel-wrapper" ref={carouselRefs[category]}>
            <button
              className="carousel-button left"
              onClick={() => handleScroll(category, 'left')}
              disabled={carouselPositions[category] === 0}
            >
              ←
            </button>
            <div className="carousel">
              <div
                className="carousel-inner"
                style={{
                  transform: `translateX(-${carouselPositions[category] * 90}px)`,
                }}
              >
                {layers[category].map((layer) => (
                  <img
                    key={layer}
                    src={`/assets/${category}/${layer}`}
                    alt={`${category} ${layer}`}
                    className={`carousel-image ${
                      selectedLayers[category] === layer ? 'selected' : ''
                    }`}
                    onClick={() => handleLayerSelect(category, layer)}
                    onContextMenu={handleContextMenu}
                    tabIndex={0} // Makes the image focusable
                    onKeyDown={(e) => handleKeyDown(e, category)} // Local key handling
                  />
                ))}
              </div>
            </div>
            <button
              className="carousel-button right"
              onClick={() => handleScroll(category, 'right')}
              disabled={
                carouselPositions[category] >=
                layers[category].length - imagesPerView
              }
            >
              →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LayerSelector;