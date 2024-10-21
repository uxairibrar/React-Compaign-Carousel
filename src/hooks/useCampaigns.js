import { useState, useEffect } from 'react';
import { fetchDonationCampaigns } from '../api/campaignApi';

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaignsData = async () => {
      try {
        const data = await fetchDonationCampaigns();

        // Check if response contains valid data
        if (data && data.data) {
          setCampaigns(data.data); 
        } else {
          throw new Error('Error: No data received from API');
        }
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        // Provide a fallback error message if `err.message` is not available
        setError(err.message || 'Error: Something went wrong while fetching campaigns');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignsData();
  }, []);

  return { campaigns, loading, error };
};
