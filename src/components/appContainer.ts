export class AppContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupNavigation();
  }


  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <nav-bar></nav-bar>
      <main id="main-content"></main>
    `;

    this.renderHome(); // Vista por defecto
  }

  setupNavigation() {
    this.addEventListener("navigate", (event: Event) => {
      const customEvent = event as CustomEvent;
      const destination = customEvent.detail;

      if (destination === "home") {
        this.renderHome();
      } else if (destination === "cart") {
        this.renderCart();
      }
    });
  }

  renderHome() {
    const main = this.shadowRoot?.querySelector("#main-content");
    if (main) {
      main.innerHTML = "";
      const card = document.createElement("product-card");
      main.appendChild(card);
    }
  }

  renderCart() {
    const main = this.shadowRoot?.querySelector("#main-content");
    if (main) {
      main.innerHTML = "";
      const cart = document.createElement("cart-render");
      main.appendChild(cart);
    }
  }
}

customElements.define("app-container", AppContainer);
