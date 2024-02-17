// Manually change this when updating the project.
const version = '0.0.0';

/**
 * @typedef {Object} FetchEvent
 * @property {Request} request
 */

/**
 *
 * @param {FetchEvent} event
 * @returns
 */
function cacheGetRequests(event) {
  // We should only cache GET requests.
  // POST, PUT, and other requests have side effects,
  // so we could provide invalid information by caching those types of requests.
  // The standard client-side code should address failures of non-GET requests.
  if (event.request.method !== 'GET') return;

  // Similar to event.waitUntil in that it blocks the fetch event on a promise.
  // Fulfillment result will be used as the response,
  // and rejection will end in a HTTP response indicating failure.
  event.respondWith(
    caches
      // This method returns a promise that resolves to a cache entry matching the request.
      // Once the promise is settled, we can then provide a response to the fetch request.
      .match(event.request)
      .then((cached) => {
        const networked = fetch(event.request)
          .then(cacheFetchResponse, createServiceUnavailableResponse)
          .catch(createServiceUnavailableResponse);

        // Returned cached response immediately if it's available.
        // Otherwise, we'll wait on the network response.
        return cached || networked;

        /**
         * Even if the response is in our cache, we go to the network as well.
         *
         * This pattern is known for producing "eventually fresh" responses,
         * where we return cached responses immediately,
         * and meanwhile pull a network response and store that in the cache.
         *
         * @see {@link https://ponyfoo.com/articles/progressive-networking-serviceworker}
         */
        function cacheFetchResponse(response) {
          // Copy the response before replying to the network request.
          // This is the response that will be stored on the ServiceWorker cache.
          const cacheCopy = response.clone();

          caches
            // Open a cache to store the response for this request.
            .open(version + 'pages')
            .then((cache) => {
              // Store the response for the request.
              // Later it will be available to caches.match(event.request) calls.
              return cache.put(event.request, cacheCopy);
            })
            .then(
              () =>
                console.log(
                  `ServiceWorker: Successfully cached ${event.request.url}`
                ),
              (error) =>
                console.error(
                  `ServiceWorker: Failed to cache ${event.request.url}`,
                  error
                )
            );

          // Return the response so that the promise is settled in fulfillment.
          return response;
        }

        /**
         * This method is called when we're unable to produce a response from the cache or network.
         * It will return a 503 response to indicate the service is unavailable.
         *
         * @returns {Response}
         */
        function createServiceUnavailableResponse() {
          return new Response('Service is unavailable', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain',
            }),
          });
        }
      })
  );
}

self.addEventListener('fetch', cacheGetRequests);
