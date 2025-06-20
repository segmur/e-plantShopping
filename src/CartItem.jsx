import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';


const CartItem = ({ onContinueShopping }) => {
    // useSelector hook extracts the 'items' array from the 'cart' slice of the Redux store.
    // This automatically subscribes the component to updates in 'cart.items', triggering re-renders.
    const cart = useSelector(state => state.cart.items);
    // useDispatch hook provides the 'dispatch' function, used to send actions to the Redux store.
    const dispatch = useDispatch();
  
    /**
     * Calculates the total cost for a single item based on its quantity and unit price.
     * It handles cost strings that might start with a '$' symbol.
     * @param {object} item - The cart item object, expected to have 'quantity' (number) and 'cost' (string).
     * @returns {string} The calculated total cost for the item, formatted to two decimal places.
     */
    const calculateTotalCost = (item) => {
      // Safely parse the cost string: remove '$' if present, then convert to a float.
      // Default to '0' if item.cost is undefined or null to prevent errors.
      const rawCost = item.cost ? (item.cost.toString().startsWith('$') ? item.cost.substring(1) : item.cost) : '0';
      const unitCost = parseFloat(rawCost);
  
      // Validate that unitCost is a number; if not, treat it as 0 to avoid NaN in calculations.
      const validUnitCost = isNaN(unitCost) ? 0 : unitCost;
  
      const totalItemCost = item.quantity * validUnitCost;
      return totalItemCost.toFixed(2);
    };
  
    /**
     * Calculates the cumulative total amount for all products currently present in the cart.
     * Iterates through all items in the 'cart' array, summing their individual calculated total costs.
     * @returns {string} The grand total for the entire cart, formatted to two decimal places.
     */
    const calculateTotalAmount = () => {
      let total = 0;
      cart.forEach(item => {
        // Re-use the safe parsing logic for consistency.
        const rawCost = item.cost ? (item.cost.toString().startsWith('$') ? item.cost.substring(1) : item.cost) : '0';
        const cost = parseFloat(rawCost);
        const validCost = isNaN(cost) ? 0 : cost;
  
        total += item.quantity * validCost;
      });
      return total.toFixed(2);
    };
  
    /**
     * Handles the action when the "Continue Shopping" button is clicked.
     * It invokes the `onContinueShopping` function passed as a prop from the parent component (ProductList.jsx).
     * This function is responsible for navigating the user back to the product listing.
     * @param {Event} e - The DOM event object from the button click.
     */
    const handleContinueShopping = (e) => {
      e.preventDefault(); // Prevent default link/button behavior
      // Ensure onContinueShopping is a function before calling it.
      if (typeof onContinueShopping === 'function') {
        onContinueShopping(); // Call the parent-provided callback
      } else {
        console.warn("`onContinueShopping` prop is not provided or not a function in CartItem.");
      }
    };
  
    /**
     * Handles incrementing the quantity of a specific item in the cart.
     * Dispatches the 'updateQuantity' action to the Redux store with the new quantity.
     * @param {object} item - The cart item object whose quantity is to be incremented.
     */
    const handleIncrement = (item) => {
      // Dispatch the updateQuantity action with the item's name and its quantity incremented by 1.
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };
  
    /**
     * Handles decrementing the quantity of a specific item in the cart.
     * If the item's current quantity is greater than 1, it dispatches 'updateQuantity' to decrease it.
     * If the quantity is 1 (meaning it would become 0), it dispatches 'removeItem' to remove the item entirely.
     * @param {object} item - The cart item object whose quantity is to be decremented.
     */
    const handleDecrement = (item) => {
      if (item.quantity > 1) {
        // If quantity is more than 1, just decrement it.
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
      } else {
        // If quantity is 1, remove the item completely.
        dispatch(removeItem(item.name)); // removeItem action expects just the name string as payload.
      }
    };
  
    /**
     * Handles the complete removal (deletion) of a specific item from the cart.
     * Dispatches the 'removeItem' action to the Redux store.
     * @param {object} item - The cart item object to be removed.
     */
    const handleRemove = (item) => {
      // Dispatch the removeItem action with the item's name.
      dispatch(removeItem(item.name)); // removeItem action expects just the name string as payload.
    };
  
    /**
     * Handles the "Checkout" button click.
     * Displays a simple alert message as instructed.
     * @param {Event} e - The DOM event object from the button click.
     */
    const handleCheckoutShopping = (e) => {
      alert('Functionality to be added for future reference'); // Display an alert as specified.
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
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


