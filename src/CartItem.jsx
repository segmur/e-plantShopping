import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      // Parse the cost string to a float, removing the '$' symbol
      const cost = parseFloat(item.cost.substring(1));
      // Add the item's total cost to the cumulative total
      total += item.quantity * cost;
    });
    // Return the final total formatted to two decimal places
    return total.toFixed(2);
  };

  const handleContinueShopping = (e) => {
   // Ensure onContinueShopping is a function before calling it
   if (typeof onContinueShopping === 'function') {
    onContinueShopping(e);
  } else {
    console.warn("onContinueShopping prop is not a function.");
  }
  };



  const handleIncrement = (item) => {
    setCart(currentCart =>
        currentCart.map(item =>
          item.name === itemToIncrement.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
};

  const handleDecrement = (item) => {
    setCart(currentCart =>
        currentCart.flatMap(item => {
          if (item.name === itemToDecrement.name) {
            if (item.quantity === 1) {
              return []; // Remove item if quantity becomes 0
            } else {
              return { ...item, quantity: item.quantity - 1 }; // Decrement quantity
            }
          }
          return item; // Keep other items as they are
        })
      );
  };

  const handleRemove = (item) => {
    setCart(currentCart =>
        currentCart.filter(item => item.name !== itemToRemove.name)
      );
};

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    // Parse the cost string to a float, removing the '$' symbol
    const cost = parseFloat(item.cost.substring(1));
    // Calculate the total cost for the item
    const totalCost = item.quantity * cost;
    // Return the total cost formatted to two decimal places
    return totalCost.toFixed(2);

};

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


