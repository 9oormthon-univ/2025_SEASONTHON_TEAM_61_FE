import axios from 'axios';

const API_BASE = 'https://3001-ie8kwy33uts4uea5lzj2o-6532622b.e2b.dev';

export const getPopular = async () => {
  const response = await axios.get(`${API_BASE}/api/special-top10`);
  return response.data;
};
