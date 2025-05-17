export class NavBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupListeners();
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          .nav-bar {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        background-color:rgb(0, 0, 0);
                        padding: 15px 30px;
                        color: white;
                        font-family: Arial, sans-serif;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    }

                    .nav-bar h1 {
                        margin: 0;
                        font-size: 24px;
                        font-weight: bold;
                    }

                    .nav-bar-links,
                    .nav-bar-cart {
                        display: flex;
                        align-items: center;
                        gap: 20px;
                    }

                    .nav-bar a {
                        color: white;
                        text-decoration: none;
                        font-size: 16px;
                        transition: color 0.3s ease;
                    }

                    .nav-bar a:hover {
                        color:rgb(137, 137, 137);
                    }

                    @media (max-width: 600px) {
                        .nav-bar {
                            flex-direction: column;
                            align-items: flex-start;
                            gap: 10px;
                        }

                        .nav-bar-links,
                        .nav-bar-cart {
                            flex-direction: column;
                            align-items: flex-start;
                            gap: 10px;
                        }
                    }
        </style>

        <div class="nav-bar">
          <h1>Tienda virtual</h1>
          <div class="nav-bar-links">
            <a href="#" id="home-link">Home</a>
          </div>
          <div class="nav-bar-cart">
            <a href="#" id="cart-link">Cart</a>
          </div>
        </div>
      `;
    }
  }

  setupListeners() {
    if (!this.shadowRoot) return;

    const homeLink = this.shadowRoot.getElementById("home-link");
    const cartLink = this.shadowRoot.getElementById("cart-link");

    homeLink?.addEventListener("click", (e) => {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent("navigate", {
          detail: "home",
          bubbles: true,
          composed: true,
        })
      );
    });

    cartLink?.addEventListener("click", (e) => {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent("navigate", {
          detail: "cart",
          bubbles: true,
          composed: true,
        })
      );
    });
  }
}

customElements.define("nav-bar", NavBar);

