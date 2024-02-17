/* eslint-disable @typescript-eslint/unbound-method */
import registerServiceWorker from './registerServiceWorker';

describe('registerServiceWorker', () => {
  // This will run before all other tests in this test suite
  beforeAll(() => {
    // Allow us to set the value of window.navigator
    Object.defineProperty(window, 'navigator', {
      value: {},
      writable: true,
    });
  });

  it('should not throw error if browser does not support service workers', async () => {
    // Arrange
    window.navigator = {} as any;

    // Act
    await registerServiceWorker();

    // Assert - Nothing needed since we just wanted to verify that no error was thrown.
  });

  it('should register service worker when supported by browser', async () => {
    // Arrange
    window.navigator = {
      serviceWorker: {
        register: jest.fn().mockImplementation(() => Promise.resolve({})),
      },
    } as any;

    // Act
    await registerServiceWorker();

    // Assert
    expect(window.navigator.serviceWorker.register).toHaveBeenCalledWith(
      'service-worker.js'
    );
  });

  it('should reject when service worker cannot be registered', async () => {
    // Arrange
    window.navigator = {
      serviceWorker: {
        register: jest
          .fn()
          .mockImplementation(() => Promise.reject(new Error('foo'))),
      },
    } as any;

    // Act

    try {
      await registerServiceWorker();
    } catch (error) {
      // Assert
      expect(error).toEqual(new Error('foo'));
    }
  });
});
