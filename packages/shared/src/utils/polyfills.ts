/**
 * This file provides polyfills for Node.js globals that AWS Amplify depends on
 * but are not available in the browser environment.
 */

// Add global to window
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.global = window;
}

// Add process.env if it doesn't exist
if (typeof process === 'undefined') {
  // @ts-ignore
  window.process = { env: {} };
}

// Add Buffer if it doesn't exist
if (typeof window !== 'undefined' && typeof window.Buffer === 'undefined') {
  // @ts-ignore
  window.Buffer = {
    isBuffer: () => false,
  };
}

/**
 * This file contains polyfills that might be needed for older browsers.
 * Currently it's just a placeholder, but you can add any needed polyfills here.
 */

// Ensure Array.prototype.includes is available
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement, fromIndex) {
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    const o = Object(this);
    const len = o.length >>> 0;
    
    if (len === 0) {
      return false;
    }
    
    const n = fromIndex | 0;
    let k = Math.max(n >= 0 ? n : len + n, 0);
    
    while (k < len) {
      if (o[k] === searchElement) {
        return true;
      }
      k++;
    }
    
    return false;
  };
}

// Add more polyfills as needed

// Export a dummy object to make TypeScript happy
export const polyfills = {
  loaded: true
};
