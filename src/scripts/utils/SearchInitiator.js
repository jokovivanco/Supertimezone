const SearchInitiator = {
  init({ search }) {
    search.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  },
};

export default SearchInitiator;
