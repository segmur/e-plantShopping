import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';


const CartItem = ({ onContinueShopping }) => {
    // Use useSelector to extract the 'items' array from the 'cart' slice of your Redux store.
    // This hook subscribes the component to Redux store updates, ensuring re-renders when 'cart.items' changes.
    const cart = useSelector(state => state.cart.items);
    // useDispatch hook returns a reference to the dispatch function from the Redux store.
    // This function is used to dispatch actions, which then trigger state updates via reducers.
    const dispatch = useDispatch();
  
    /**
     * Calculates the total cost for a single item based on its quantity and unit price.
     * The unit price is extracted from a string (e.g., "$10.00") by removing the '$' and parsing to a float.
     * @param {object} item - The cart item object, expected to have 'quantity' (number) and 'cost' (string).
     * @returns {string} The calculated total cost for the item, formatted to two decimal places.
     */
    const calculateTotalCost = (item) => {
      // Safely convert item.cost to a string to ensure substring works, then parse to float.
      const unitCost = parseFloat(item.cost.toString().substring(1));
      const totalItemCost = item.quantity * unitCost;
      return totalItemCost.toFixed(2);
    };
  
    /**
     * Calculates the cumulative total amount for all products currently present in the cart.
     * Iterates through all items in the 'cart' array, summing up their individual total costs.
     * @returns {string} The grand total for the entire cart, formatted to two decimal places.
     */
    const calculateTotalAmount = () => {
      let total = 0;
      cart.forEach(item => {
        // Safely convert item.cost to a string, remove '$', and parse to float.
        const cost = parseFloat(item.cost.toString().substring(1));
        total += item.quantity * cost;
      });
      return total.toFixed(2);
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


