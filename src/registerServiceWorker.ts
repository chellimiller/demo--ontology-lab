/**
 * Registers a service worker if supported by the browser.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers Using Service Workers}
 */
async function registerServiceWorker(): Promise<void> {
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker.register('service-worker.js');
  }
}

export default registerServiceWorker;
