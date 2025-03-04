/**
 * This file provides polyfills for Node.js globals that AWS Amplify depends on
 * but are not available in the browser environment.
 */

// Minimal polyfills needed for AWS Amplify
if (typeof window !== 'undefined') {
  // Add global to window
  // @ts-ignore
  window.global = window;

  // Add process.env if it doesn't exist
  // @ts-ignore
  window.process = { env: {} };

  // Add basic Buffer shim
  // @ts-ignore
  window.Buffer = {
    isBuffer: function(_: unknown): _ is Buffer {
      return false;
    }
  };
}
