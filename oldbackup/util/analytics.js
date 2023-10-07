import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('YOUR_TRACKING_ID'); // Replace with your actual tracking ID
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
