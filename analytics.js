/**
 * @file analytics.js
 * A simple analytics service simulator for tracking user events.
 * This script generates an anonymous user ID, stores it in localStorage,
 * and provides a function to log tracked events to the console.
 */

/**
 * Generates and stores a version 4 UUID in localStorage if one doesn't already exist.
 * This ensures that a user is consistently identified across sessions on the same browser.
 */
function generateAnonymousId() {
  // Check if the anonymous user ID already exists in localStorage.
  if (!localStorage.getItem('anonymousUserId')) {
    // If it doesn't exist, generate a new version 4 UUID using the Web Crypto API.
    // This is a secure and standard way to create a universally unique identifier.
    const userId = crypto.randomUUID();
    
    // Store the newly generated ID in localStorage.
    localStorage.setItem('anonymousUserId', userId);
    console.log('New anonymous user ID generated:', userId);
  }
}

/**
 * Tracks a custom event by logging it to the console in a structured JSON format.
 * This simulates sending an event to a real analytics service.
 * @param {string} eventName - The name of the event to track (e.g., 'module_started').
 * @param {object} properties - An object containing key-value pairs of data related to the event.
 */
function trackEvent(eventName, properties) {
  // Retrieve the anonymous user ID from localStorage.
  const anonymousId = localStorage.getItem('anonymousUserId');

  // If no ID is found, it's good practice to log a warning,
  // as events can't be tracked without an identifier.
  if (!anonymousId) {
    console.warn('Analytics warning: Anonymous user ID not found. Cannot track event.');
    return;
  }

  // Create the event data object.
  // This structure is typical for analytics payloads.
  const eventData = {
    eventName: eventName,
    properties: { ...properties }, // Create a shallow copy of the properties object
    anonymousUserId: anonymousId,
    timestamp: new Date().toISOString(), // Add a timestamp for when the event occurred
  };

  // Log the event data to the console as a formatted JSON string.
  // In a real application, this is where you would send the data to a server (e.g., using fetch).
  console.log('ANALYTICS EVENT:', JSON.stringify(eventData, null, 2));
}

// --- Example Usage (for testing purposes) ---

// Ensure an anonymous ID is generated as soon as the script loads.
// generateAnonymousId();

// Example of tracking an event.
// trackEvent('page_view', { page: '/module-library', title: 'Module Library' });
