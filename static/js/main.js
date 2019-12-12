const teamSelected = false;

class App {
  constructor() {
    this.store = null;
    this.bind();
  }

  bind() {
    // document.querySelector('#start-shopping').addEventListener('click', this.onStartShopping.bind(this));
    document.querySelector('#store-select').addEventListener('change', this.onStartShopping.bind(this));
    const items = document.querySelectorAll('.shopping-item-purchase').forEach((el) => {
      el.addEventListener('click', this.onBuy.bind(this, el));
    });
  }

  onStartShopping() {
    const selectEl = document.querySelector('#store-select');
    if (selectEl.selectedIndex === 0) {
      alert("Please choose a store in the dropdown");
      return;
    }

    this.store = selectEl.options[selectEl.selectedIndex].value;
    document.querySelector('#shopping').classList.remove('hidden');
    document.querySelector('#sales-dashboard-link').classList.remove('btn-secondary');
    document.querySelector('#sales-dashboard-link').classList.add('btn-primary');
  }

  onBuy(el) {
    const payload = {
      product: el.getAttribute('data-product'),
      store: this.store,
      cost: el.getAttribute('data-cost'),
      datetime: new Date().toJSON().slice(0, 19).replace('T', ' '),
    };

    let xhr = new XMLHttpRequest();
    // xhr.open('POST', 'https://kl8urenjvf.execute-api.us-west-2.amazonaws.com/octank-lambda');
    xhr.open("POST", "https://re9u6hsb51.execute-api.us-west-2.amazonaws.com/default/octank-lambda");
    xhr.setRequestHeader('Content-Type', 'application/json');
    const payloadstr = JSON.stringify(payload);
    console.log(payloadstr)
    xhr.send(payloadstr);
    xhr.onerror = console.log;
    alert("You bought :" + payload.product);
  }
}

new App();