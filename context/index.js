import React, { useState, useEffect } from "react";
export const AppContext = React.createContext([{}, () => {}]);

export const AppProvider = (props) => {
  const [cart, setCart] = useState(null);

  /**
   * This will be called once on initial load ( component mount ).
   *
   * Sets the cart data from localStorage to `cart` in the context.
   */

  useEffect(() => {
    let cartData = localStorage.getItem("next-cart");
    cartData = null !== cartData ? JSON.parse(cartData) : null;
    setCart(cartData);
  }, []);

  useEffect(() => {
    localStorage.setItem("next-cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <AppContext.Provider value={[cart, setCart]}>
      {props.children}
    </AppContext.Provider>
  );
};
