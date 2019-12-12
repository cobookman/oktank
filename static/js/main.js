const teamSelected = false;

class App {
  constructor() {
    this.id = null;
    this.bind();
  }

  bind() {
    document.querySelector('#start-shopping').addEventListener('click', this.onStartShopping.bind(this));
    document.querySelector
  }

  onStartShopping() {
    const selectEl = document.querySelector('#store-select');
    if (selectEl.selectedIndex === 0) {
      alert("Please choose a store in the dropdown");
      return;
    }

    this.id = selectEl.options[selectEl.selectedIndex].value;
    document.querySelector('#shopping').classList.remove('hidden');
  }
}

new App();