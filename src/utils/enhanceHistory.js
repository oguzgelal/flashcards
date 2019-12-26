export default history => {

  history.past = [];
  history.listen((location, action) => {
    // first location when app loads and when pushing onto history
    if (action === 'PUSH') history.past.push(location);
    // only when using history.replace
    if (action === 'REPLACE') history.past[history.past.length - 1] = location;
    // happens when using the back button, or forward button
    if (action === 'POP') {
      history.past.pop();
      // location according to history.past
      const appLocation = history.past[history.past.length - 1];
      // If the current location doesn't match what the app thinks is
      // the current location, blow up the app history.
      if (!appLocation || appLocation.key !== location.key) {
        history.past = [location];
      }
    }
  });

  history.canGoBack = () => {
    return history.past.length > 0;
  }

  history.goBackOrRun = callback => {
    if (history.canGoBack()) {
      history.goBack();
    } else {
      if (typeof callback === 'function') {
        callback();
      }
    }
  }

  window.customHistory = history;
  return history;
}
