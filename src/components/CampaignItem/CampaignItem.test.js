import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CampaignItem from './CampaignItem';

const mockCampaign = {
  id: 1,
  attributes: {
    title: 'Campaign 1',
    shortDescription: 'Description 1',
    donationUrl: '#',
    images: { data: [{ attributes: { formats: { small: { url: '' } } } }] },
  },
};

describe('<CampaignItem />', () => {
  test('should render the campaign item', () => {
    render(<CampaignItem campaign={mockCampaign} />);
    
    expect(screen.getByText('Campaign 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
  });

  test('should render a donate button', () => {
    render(<CampaignItem campaign={mockCampaign} />);
    
    const donateButton = screen.getByRole('link', { name: /Donate Now/i });
    expect(donateButton).toBeInTheDocument();
  });

  test('should render placeholder when image is not available', () => {
    render(<CampaignItem campaign={mockCampaign} />);
    
    const placeholder = screen.getByText('No Image Available');
    expect(placeholder).toBeInTheDocument();
  });
});
