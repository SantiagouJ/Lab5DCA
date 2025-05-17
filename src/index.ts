import { AppContainer } from "./components/appContainer";
import { Card } from "./components/card";
import { CartRender } from "./components/cart-render";
import { NavBar } from "./components/navBar";

if (!customElements.get('app-container')) {
  customElements.define('app-container', AppContainer);
}

if (!customElements.get('nav-bar')) {
  customElements.define('nav-bar', NavBar);
}

if (!customElements.get('product-card')) {
  customElements.define('product-card', Card);
}

if (!customElements.get('cart-render')) {
  customElements.define('cart-render', CartRender);
}