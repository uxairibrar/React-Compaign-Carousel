import React, { useEffect, useState, useRef } from 'react';
import { useCampaigns } from '../../hooks/useCampaigns';
import '../../styles/Carousel.css';
import CampaignItem from '../CampaignItem/CampaignItem';

const CampaignCarousel = ({ title }) => {
  const { campaigns, loading, error } = useCampaigns();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);

  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Adjust the number of visible items based on screen size
  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth <= 768) {
        setVisibleItems(1); // Only 1 card on mobile
      } else if (window.innerWidth <= 1024) {
        setVisibleItems(2); // 2 cards on medium screens
      } else {
        setVisibleItems(3); // 3 cards on larger screens
      }
    };
  
    updateVisibleItems(); 
    window.addEventListener('resize', updateVisibleItems); // Update on resize
  
    return () => {
      window.removeEventListener('resize', updateVisibleItems); // Cleaning up
    };
  }, []);

  // Handle Next and Previous buttons
  const handleNext = () => {
    if (currentIndex + visibleItems < campaigns.length) {
      setCurrentIndex(currentIndex + visibleItems);
    } else {
      setCurrentIndex(campaigns.length - visibleItems); 
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - visibleItems);
    } else {
      setCurrentIndex(0); 
    }
  };

  const handlePaginationClick = (pageIndex) => {
    setCurrentIndex(pageIndex * visibleItems); 
  };

  // Drag and Swipe Handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  if (loading) {
    return (
      <div className="loading-spinner-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button className="retry-button" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  if (!campaigns || campaigns.length === 0) {
    return <div className="empty-message">No campaigns available at the moment.</div>;
  }

  const totalPages = Math.ceil(campaigns.length / visibleItems);

  return (
    <div className="carousel-container">
      <h1 className="carousel-title">{title}</h1>

      <div
        className="carousel-track-wrapper"
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${(100 / visibleItems) * currentIndex}%)`,
            transition: 'transform 0.5s ease',
          }}
        >
          {campaigns.map((campaign, index) => (
            <CampaignItem key={index} campaign={campaign} />
          ))}
        </div>
      </div>

      <div className="carousel-controls">
        <button className="carousel-btn prev" onClick={handlePrevious}>
          &#8592;
        </button>

        <div className="carousel-indicators">
          {[...Array(totalPages)].map((_, i) => (
            <span
              key={i}
              className={`carousel-indicator ${i === Math.floor(currentIndex / visibleItems) ? 'active' : ''}`}
              onClick={() => handlePaginationClick(i)}  
            ></span>
          ))}
        </div>

        <button className="carousel-btn next" onClick={handleNext}>
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default CampaignCarousel;
