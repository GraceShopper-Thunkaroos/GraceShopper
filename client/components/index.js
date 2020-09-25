/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Landing } from "./landing";
export { default as LandingAuthForm } from "./landing-auth-form";
export { default as Navbar } from "./navbar";
export { default as UserHome } from "./user-home";
export { Login, Signup } from "./auth-form";
export { default as AllProducts } from "./AllProducts";
export { default as ProductCard } from "./product-card";
export { default as SingleProduct } from "./SingleProduct";
export { default as Cart } from "./cart";
export { default as Checkout } from "./Checkout";
export { default as ThankYou } from "./thankyou";
