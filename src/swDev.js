// swDev.js

// Check if the browser supports service workers.
if ('serviceWorker' in navigator) {
    const swUrl = `${process.env.PUBLIC_URL}/sw.js`
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register(swUrl) // Replace with the path to your service worker file
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
  
          // Listen for updates to the service worker.
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
  
            // Check if there is a new service worker.
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                // Check if the new service worker has been installed.
                if (newWorker.state === 'installed') {
                  // Notify the user or take any necessary action.
                  console.log('New service worker installed. Please refresh the page.');
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
  