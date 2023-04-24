const NotFound = {
  async render() {
    return `
      <div>This is 404 Not Found Page.</div>
    `;
  },
  async afterRender() {
    return null;
  },
};

export default NotFound;
