import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('vasu_studio_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error parsing cart from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('vasu_studio_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      // Check for exact duplicate configuration
      // We identify a unique item by its id AND its variant string so that 
      // 16GB and 32GB of the same pendrive show up as separate items if needed,
      // or we just group them if they match exactly.
      const existingItemIndex = prev.findIndex(item => 
        item.id === product.id && item.variantString === product.variantString
      );

      if (existingItemIndex !== -1) {
        // If exact same config exists, just increase quantity
        const newCart = [...prev];
        newCart[existingItemIndex].quantity += product.quantity;
        newCart[existingItemIndex].totalPrice = newCart[existingItemIndex].unitPrice * newCart[existingItemIndex].quantity;
        return newCart;
      }

      // Add new item
      return [...prev, {
        cartId: Date.now().toString(), // unique id for cart array
        ...product,
        totalPrice: product.unitPrice * product.quantity
      }];
    });
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty, totalPrice: item.unitPrice * newQty };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotalAmount = cart.reduce((total, item) => total + item.totalPrice, 0);
  const cartTotalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotalAmount,
      cartTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};
