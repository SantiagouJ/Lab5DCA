import { Products } from "../utils/types";
import { store, State } from "../flux/Store";

export class CartRender extends HTMLElement {
  private state: State = { cart: [] };
  private listener = (state: State) => {
    this.state = state;
    this.render();
  };

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    store.subscribe(this.listener);
    this.render();
  }

  disconnectedCallback() {
    store.unsubscribe(this.listener);
  }

  render() {
    if (!this.shadowRoot) return;

    const products = this.state.cart || [];

    this.shadowRoot.innerHTML = `
      <style>
        .cart {
          padding: 20px;
        }
        .item {
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 10px;
          display: flex;
          gap: 20px;
          align-items: center;
          background-color: #f9f9f9;
        }
        img {
          width: 100px;
          height: 100px;
          object-fit: contain;
        }
        .info {
          flex: 1;
        }
        h2 {
          margin: 0;
        }
        p {
          margin: 4px 0;
        }
      </style>

      <div class="cart">
        <h1>Shopping Cart</h1>
        ${
          products.length > 0
            ? products
                .map(
                  (product) => `
            <div class="item">
              <img src="${product.image}" alt="${product.title}">
              <div class="info">
                <h2>${product.title}</h2>
                <p>$${product.price}</p>
                <p>${product.description}</p>
              </div>
            </div>
          `
                )
                .join("")
            : "<p>Your cart is empty.</p>"
        }
      </div>
    `;
  }
}

customElements.define("cart-render", CartRender);
