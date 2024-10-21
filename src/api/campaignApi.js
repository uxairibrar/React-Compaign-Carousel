import { apiClient } from '../utils/apiClient';

export const fetchDonationCampaigns = async () => {
  const endpoint = '/donation-campaigns?sort[0]=id&populate=*';
  return apiClient(endpoint);
};
