import timezones from './timezones';

class DataSource {
  static fetch() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(timezones);
      }, 3000);
    });
  }
}

export default DataSource;
