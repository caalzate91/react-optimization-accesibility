export const shouldUseMockApi = () => {
  if (typeof process !== 'undefined' && process.env && typeof process.env.VITE_USE_MOCK_API !== 'undefined') {
    return process.env.VITE_USE_MOCK_API === 'true';
  }
  return typeof window === 'undefined';
};