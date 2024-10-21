import React from 'react';

const CampaignItem = ({ campaign }) => {
  const imageUrl =
    campaign?.attributes?.images?.data?.[0]?.attributes?.formats?.small?.url || '';
  
  const title = campaign?.attributes?.title || 'No Title';
  const shortDescription = campaign?.attributes?.shortDescription || 'No Description';
  const donationUrl = campaign?.attributes?.donationUrl || '';

  return (
    <div className="campaign-card">
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="campaign-image" />
      ) : (
        <div className="no-image-placeholder">No Image Available</div>
      )}
      
      <h3 className="campaign-title">{title}</h3>

      <p className="campaign-description">{shortDescription}</p>

      {donationUrl && (
        <a href={donationUrl} target="_blank" rel="noopener noreferrer" className="donation-link">
          Donate Now
        </a>
      )}
    </div>
  );
};

export default CampaignItem;
