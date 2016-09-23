import Promise from 'core-js/es6/promise';
let deviceReady;

export class Device {
  static isPhoneGap() {
    if (typeof document !== 'undefined') {
      return document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
    }

    return false;
  }

  static ready() {
    if (!deviceReady) {
      if (this.isPhoneGap()) {
        deviceReady = new Promise((resolve) => {
          const onDeviceReady = () => {
            document.removeEventListener('deviceready', onDeviceReady);
            resolve();
          };

          document.addEventListener('deviceready', onDeviceReady, false);
        });
      } else {
        deviceReady = Promise.resolve();
      }
    }

    return deviceReady;
  }
}

// Check that cordova plugins are installed
if (Device.isPhoneGap()) {
  Device.ready().then(() => {
    if (typeof global.device === 'undefined') {
      throw new Error('Cordova Device Plugin is not installed.'
        + ' Please refer to devcenter.kinvey.com/phonegap-v3.0/guides/getting-started for help with'
        + ' setting up your project.');
    }
  });
}
