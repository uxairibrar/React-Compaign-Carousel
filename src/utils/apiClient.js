const API_URL = "https://backend.bonoboo.schnaq.consulting/api";

// API client wrapper for centralized request handling
export const apiClient = async (endpoint, options = {}) => {
  const defaultHeaders = {
    Authorization: `Bearer cf88d7d9fddecbadcb8740261cf7d8580d6e6a18932d31b7ecae24e2bc815d9f80a8e29541c2439ae4d2349d66ca2b695d19dd2d087be1c5459e7e10b64c41953dc6df1e26f201e4302269e36a6031d4384d32466355e3f65a09fb52af9ba94aa7ece90429ebf341d7cc9b7c1a6d1f61f021543ca38c28e71357ae8664bf6323`,
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};
