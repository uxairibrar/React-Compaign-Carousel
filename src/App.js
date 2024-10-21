import React from 'react';
import CampaignCarousel from './components/CampaignCarousel/CampaignCarousel';
import './App.css';

function App() {
  return (
    <div className="App">
    <h1 className="carousel-title">{"Our Fundraising Campaigns"}</h1>
    <CampaignCarousel />
    </div>
  );
}

export default App;
