const APP_KEY = 'unique_app_key';
const init = {};

export const saveState = state => new Promise<void>(resolve => {
  chrome.storage.local.set({
    [APP_KEY]: JSON.stringify(state),
  }, () => resolve());
});
  
export const loadState = () => new Promise(resolve => {
  chrome.storage.local.get(APP_KEY, data => {
    if (data[APP_KEY]) {
      resolve({
        ...init,
        ...JSON.parse(data[APP_KEY]),
      });
    } else {
      resolve(init);
    }
  });
});
