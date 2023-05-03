import swUrl from './sw?worker&url';

const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker not supported in the browser');
    return;
  }

  try {
    navigator.serviceWorker.register(swUrl, {
      type: 'module',
    });
    console.log('Service worker registered');
  } catch (error) {
    console.log('Failed to register service worker', error);
  }
};

export default swRegister;
