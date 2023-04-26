import timezones from './timezones';

class DataSource {
  static fetch() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(timezones);
      }, 1500);
    });
  }
}

export default DataSource;
