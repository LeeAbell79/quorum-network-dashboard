export const env = {
  defaultAuthenticatedRoute: '/dashboard',
  localStorageKey: 'network-dashboard-user',
  pollPeriod: 5 * 1000,
  apiUrl: window.API_URL && window.API_URL !== '__API_URL__' ? window.API_URL : 'http://localhost:3001'
};
