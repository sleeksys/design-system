/***
 * SleekJsTracker - A simple JavaScript error tracking tool.
 * Copyright (c) 2025 Sleek Systems
 * Licensed under the MIT License.
 * @version 1.0.0
 * @file sleek-js-tracker.js
 */

// Send log to the SleekSys API
const sleekJsTrackerLogFn = function (payload) {
  const endpoint = 'https://api.sleeksys.com/js-tracker/logs';
  console.info('[sleeksys.jstracker] Error tracking initiated:', payload);

  // track credentials
  payload.credentials = SleekJsTracker.trackingId;

  // track client information
  payload.metadata = {
    language: navigator.language,
    userAgent: navigator.userAgent,
    os: navigator.userAgent.match(/\(([^)]+)\)/)[1] || 'unknown',
    browser: navigator.userAgent.split(' ')[0] || 'unknown',
  };

  let xhr = new XMLHttpRequest();
  xhr.open('POST', endpoint, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(payload));
  xhr.onerror = function() {
    console.error('[sleeksys.jstracker] XMLHttpRequest failed:', payload);
  };
  xhr.onabort = function() {
    console.warn('[sleeksys.jstracker] XMLHttpRequest aborted:', payload);
  }
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status !== 200) {
      console.warn('[sleeksys.jstracker] Error logging failed using XMLHttpRequest:', xhr.statusText);
    }
  }
};

// Check if the SleekJsTracker object exists
const SleekJsTracker = {
  trackingId: null,
  init: function (trackingId) {
    if (!trackingId) {
      console.error('Tracking ID is required for SleekJsTracker initialization.');
      return;
    }

    // set the tracking ID
    this.trackingId = trackingId;

    // track window error events
    window.addEventListener('error', function (event) {
      event.preventDefault();

      if (!event.error) {
        console.warn('[sleeksys.jstracker] Error event does not contain an error object:', event);
        return;
      }

      let error = {
        name: event.error.name,
        message: event.error.message,
        url: event.filename,
        line: event.lineno,
        column: event.colno,
      };
      sleekJsTrackerLogFn(error);
    });
  }
};

