import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Essential Redux hooks
import { addItem } from './CartSlice'; // Import the addItem action from your Redux slice

import CartItem from './CartItem'; // Import the CartItem component
import './ProductList.css'; // Assume ProductList.css exists for external styling (though inline is also used for key elements)

function ProductList({ onHomeClick }) {
    // State to control the visibility of the shopping cart component.
    // When true, CartItem is rendered; otherwise, the product list is rendered.
    const [showCart, setShowCart] = useState(false);
    // State to explicitly control the visibility of the plants listing.
    // This helps manage complex navigations where multiple views might be toggled.
    const [showPlants, setShowPlants] = useState(true); // Default to showing plants initially

    // Get the dispatch function from react-redux to send actions to the Redux store.
    const dispatch = useDispatch();
    // Use useSelector to subscribe to changes in the 'cart.items' part of the Redux state.
    // This allows the component to re-render automatically when items are added/removed/updated in the cart.
    const cartItems = useSelector(state => state.cart.items);

    // Local state to keep track of which products have been added to the cart.
    // This is crucial for dynamically disabling the "Add to Cart" buttons.
    // It's an object where keys are product names and values are booleans (true if added).
    const [addedToCart, setAddedToCart] = useState({});

    // Calculate the total number of items (quantities summed up) in the cart.
    // This value is displayed next to the cart icon in the navbar.
    const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    // useEffect hook to synchronize the local 'addedToCart' state with the Redux 'cartItems'.
    // This ensures that if items are removed from the cart (e.g., from CartItem.jsx),
    // the "Add to Cart" buttons for those products in ProductList.jsx are correctly re-enabled.
    useEffect(() => {
        const newAddedToCartState = {};
        cartItems.forEach(item => {
            // Mark a product as added if it exists in the Redux cart.
            newAddedToCartState[item.name] = true;
        });
        // Update the local state. React will re-render if there's a change.
        setAddedToCart(newAddedToCartState);
    }, [cartItems]); // Dependency array: this effect runs whenever `cartItems` array reference changes.


    /**
     * Handles adding a product to the shopping cart.
     * Dispatches the 'addItem' action to the Redux store, which will handle the logic
     * of either adding a new product or incrementing the quantity of an existing one.
     * The `addedToCart` local state is then updated via the `useEffect` hook.
     * @param {object} product - The product object (containing name, image, description, cost) to add.
     */
    const handleAddToCart = (product) => {
        dispatch(addItem(product)); // Dispatch the action to add the product to the Redux cart.
    };

    // Static data array containing various plant categories and their details.
    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Produces oxygen at night, improving air quality.",
                    cost: "15.00" // Changed to number string without $ for consistency, add $ in display
                },
                {
                    name: "Spider Plant",
                    image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                    description: "Filters formaldehyde and xylene from the air.",
                    cost: "12.00"
                },
                {
                    name: "Peace Lily",
                    image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
                    description: "Removes mold spores and purifies the air.",
                    cost: "18.00"
                },
                {
                    name: "Boston Fern",
                    image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg",
                    description: "Adds humidity to the air and removes toxins.",
                    cost: "20.00"
                },
                {
                    name: "Rubber Plant",
                    image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg",
                    description: "Easy to care for and effective at removing toxins.",
                    cost: "17.00"
                },
                {
                    name: "Aloe Vera",
                    image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
                    description: "Purifies the air and has healing properties for skin.",
                    cost: "14.00"
                }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                {
                    name: "Lavender",
                    image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    description: "Calming scent, used in aromatherapy.",
                    cost: "20.00"
                },
                {
                    name: "Jasmine",
                    image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    description: "Sweet fragrance, promotes relaxation.",
                    cost: "18.00"
                },
                {
                    name: "Rosemary",
                    image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg",
                    description: "Invigorating scent, often used in cooking.",
                    cost: "15.00"
                },
                {
                    name: "Mint",
                    image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg",
                    description: "Refreshing aroma, used in teas and cooking.",
                    cost: "12.00"
                },
                {
                    name: "Lemon Balm",
                    image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg",
                    description: "Citrusy scent, relieves stress and promotes sleep.",
                    cost: "14.00"
                },
                {
                    name: "Hyacinth",
                    image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg",
                    description: "Hyacinth is a beautiful flowering plant known for its fragrant.",
                    cost: "22.00"
                }
            ]
        },
        {
            category: "Insect Repellent Plants",
            plants: [
                {
                    name: "oregano",
                    image: "https://cdn.pixabay.com/photo/2015/05/30/21/20/oregano-790702_1280.jpg",
                    description: "The oregano plants contains compounds that can deter certain insects.",
                    cost: "10.00"
                },
                {
                    name: "Marigold",
                    image: "https://cdn.pixabay.com/photo/2022/02/22/05/45/marigold-7028063_1280.jpg",
                    description: "Natural insect repellent, also adds color to the garden.",
                    cost: "8.00"
                },
                {
                    name: "Geraniums",
                    image: "https://cdn.pixabay.com/photo/2012/04/26/21/51/flowerpot-43270_1280.jpg",
                    description: "Known for their insect-repelling properties while adding a pleasant scent.",
                    cost: "20.00"
                },
                {
                    name: "Basil",
                    image: "https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg",
                    description: "Repels flies and mosquitoes, also used in cooking.",
                    cost: "9.00"
                },
                {
                    name: "Lavender",
                    image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    cost: "20.00"
                },
                {
                    name: "Catnip",
                    image: "https://cdn.pixabay.com/photo/2015/07/02/21/55/cat-829681_1280.jpg",
                    description: "Repels mosquitoes and attracts cats.",
                    cost: "13.00"
                }
            ]
        },
        {
            category: "Medicinal Plants",
            plants: [
                {
                    name: "Aloe Vera",
                    image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
                    description: "Soothing gel used for skin ailments.",
                    cost: "14.00"
                },
                {
                    name: "Echinacea",
                    image: "https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg",
                    description: "Boosts immune system, helps fight colds.",
                    cost: "16.00"
                },
                {
                    name: "Peppermint",
                    image: "https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg",
                    description: "Relieves digestive issues and headaches.",
                    cost: "13.00"
                },
                {
                    name: "Lemon Balm",
                    image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg",
                    description: "Calms nerves and promotes relaxation.",
                    cost: "14.00"
                },
                {
                    name: "Chamomile",
                    image: "https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg",
                    description: "Soothes anxiety and promotes sleep.",
                    cost: "15.00"
                },
                {
                    name: "Calendula",
                    image: "https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg",
                    description: "Heals wounds and soothes skin irritations.",
                    cost: "12.00"
                }
            ]
        },
        {
            category: "Low Maintenance Plants",
            plants: [
                {
                    name: "ZZ Plant",
                    image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    description: "Thrives in low light and requires minimal watering.",
                    cost: "25.00"
                },
                {
                    name: "Pothos",
                    image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg",
                    description: "Tolerates neglect and can grow in various conditions.",
                    cost: "10.00"
                },
                {
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Needs infrequent watering and is resilient to most pests.",
                    cost: "15.00"
                },
                {
                    name: "Cast Iron Plant",
                    image: "https://cdn.pixabay.com/photo/2017/02/16/18/04/cast-iron-plant-2072008_1280.jpg",
                    description: "Hardy plant that tolerates low light and neglect.",
                    cost: "20.00"
                },
                {
                    name: "Succulents",
                    image: "https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg",
                    description: "Drought-tolerant plants with unique shapes and colors.",
                    cost: "18.00"
                },
                {
                    name: "Aglaonema",
                    image: "https://cdn.pixabay.com/photo/2014/10/10/04/27/aglaonema-482915_1280.jpg",
                    description: "Requires minimal care and adds color to indoor spaces.",
                    cost: "22.00"
                }
            ]
        }
    ];

    // Inline styles for the Navbar (ensuring responsiveness where possible with basic CSS)
    const styleObj = {
        backgroundColor: '#4CAF50', // Green navbar background
        color: '#fff', // White text color
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '20px',
        flexWrap: 'wrap', // Allow items to wrap on smaller screens
    };

    const styleObjUl = {
        display: 'flex',
        justifyContent: 'flex-end', // Align items to the end (right)
        alignItems: 'center',
        listStyle: 'none', // Remove bullet points
        padding: 0,
        margin: 0,
        width: 'auto', // Adjust width automatically
        flexGrow: 1, // Allow it to grow and take available space
        flexWrap: 'wrap', // Allow links to wrap
    };

    const styleA = {
        color: 'white',
        fontSize: '18px', // Slightly smaller for better fit
        textDecoration: 'none',
        padding: '5px 10px',
        margin: '0 10px',
        transition: 'color 0.3s ease', // Smooth transition on hover
    };

    const logoTextStyle = {
        color: 'white',
        margin: '0',
        fontSize: '1.5em', // Larger for emphasis
        fontWeight: 'bold',
    };

    const taglineStyle = {
        color: 'white',
        fontSize: '0.8em',
        fontStyle: 'italic',
    };

    /**
     * Handles the click event for the Home link in the navbar.
     * Prevents default link behavior and calls the onHomeClick prop from the parent.
     * Sets component state to show the product list and hide the cart.
     * @param {Event} e - The DOM event object.
     */
    const handleHomeClick = (e) => {
        e.preventDefault();
        if (typeof onHomeClick === 'function') {
            onHomeClick(); // Call parent's handler if available
        }
        setShowCart(false); // Hide the cart view
        setShowPlants(true); // Show the plants product list
    };

    /**
     * Handles the click event for the Cart icon in the navbar.
     * Prevents default link behavior and sets component state to display the CartItem component.
     * @param {Event} e - The DOM event object.
     */
    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true); // Show the cart view
        setShowPlants(false); // Hide the plants product list
    };

    /**
     * Handles the click event for the "Plants" link in the navbar.
     * Prevents default link behavior and sets component state to display the product listing.
     * @param {Event} e - The DOM event object.
     */
    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true); // Show the plants product list
        setShowCart(false); // Hide the cart view
    };

    /**
     * Callback function passed to CartItem, triggered when "Continue Shopping" button is clicked in the cart.
     * Resets component state to hide the CartItem and show the ProductList.
     * @param {Event} e - The DOM event object.
     */
    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false); // Hide the cart view
        setShowPlants(true); // Show the plants product list
    };

    return (
        <div>
            {/* Navbar Section */}
            <div className="navbar" style={styleObj}>
                <div className="tag" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', flexShrink: 0 }}> {/* Flex for logo and text */}
                    <div className="luxury" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="Mursgreen Logo" style={{ height: '40px', marginRight: '10px', borderRadius: '50%' }} />
                        <a href="/" onClick={(e) => handleHomeClick(e)} style={{ textDecoration: 'none' }}>
                            <div>
                                <h3 style={logoTextStyle}>Mursgreen</h3>
                                <i style={taglineStyle}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>
                <ul style={styleObjUl}> {/* Using ul for navigation links */}
                    <li style={{ listStyle: 'none' }}> {/* li for each link */}
                        <a href="#" onClick={(e) => handlePlantsClick(e)} style={styleA}>Plants</a>
                    </li>
                    <li style={{ listStyle: 'none' }}>
                        <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}>
                            <h1 className='cart' style={{ position: 'relative', display: 'inline-block', margin: 0, fontSize: '1.5em' }}> {/* Reduced font size for cart icon */}
                                {/* Cart SVG Icon from Phosphor Icons / Font Awesome equivalent for better visuals*/}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="30" width="30" fill="white" style={{ verticalAlign: 'middle' }}>
                                    <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM200,88V56H56V88Zm0,112H56V104H200v96Z"></path>
                                    <rect x="56" y="56" width="144" height="32" fill="white"></rect> {/* Represents the handle/top part, filled */}
                                    <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /> {/* Main cart body, stroke for outline */}
                                    <circle cx="80" cy="216" r="12" fill="#faf9f9"></circle> {/* Wheels */}
                                    <circle cx="184" cy="216" r="12" fill="#faf9f9"></circle> {/* Wheels */}
                                </svg>
                                {totalCartQuantity > 0 && ( // Conditionally render cart item count if greater than 0
                                    <span style={{
                                        position: 'absolute',
                                        top: '-5px', // Adjusted position for aesthetics
                                        right: '-8px', // Adjusted position
                                        backgroundColor: '#FF6347', // Distinct red background for the count
                                        color: 'white',
                                        borderRadius: '50%', // Circular shape
                                        padding: '2px 6px', // Padding to make the circle visible
                                        fontSize: '0.6em', // Smaller font size for count
                                        fontWeight: 'bold',
                                        lineHeight: '1', // Ensure vertical alignment
                                        minWidth: '20px', // Minimum width for single and double digits
                                        textAlign: 'center',
                                    }}>
                                        {totalCartQuantity}
                                    </span>
                                )}
                            </h1>
                        </a>
                    </li>
                </ul>
            </div>

            {/* Conditional Rendering of Product List or Cart */}
            {showCart ? (
                // If showCart is true, display the CartItem component
                <CartItem onContinueShopping={handleContinueShopping} />
            ) : showPlants ? (
                // If showPlants is true (and showCart is false), display the product grid
                <div className="product-grid">
                    {plantsArray.map((category, index) => ( // Loop through each category of plants
                        <React.Fragment key={index}> {/* Use React.Fragment to group category title and plants */}
                            <h1>
                                {category.category} {/* Display the category name */}
                            </h1>
                            {category.plants.map((plant) => ( // Loop through each plant within the current category
                                <div className="product-card" key={plant.name}>
                                    <img
                                        className="product-image"
                                        src={plant.image} // Display the plant image
                                        alt={plant.name} // Alt text for accessibility
                                        // Fallback image in case of loading error
                                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/220x220/cccccc/000000?text=No+Image"; }}
                                    />
                                    <div className="product-title">{plant.name}</div> {/* Display plant name */}
                                    <div className="product-description">{plant.description}</div> {/* Display plant description */}
                                    <div className="product-cost">${parseFloat(plant.cost).toFixed(2)}</div> {/* Display plant cost with 2 decimals */}
                                    <button
                                        className="product-button"
                                        onClick={() => handleAddToCart(plant)} // Handle adding plant to cart
                                        disabled={addedToCart[plant.name]} // Disable if already added to cart
                                        
                                    >
                                        {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                                    </button>
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            ) : (
                // If neither cart nor plants are explicitly shown (e.g., initial state or unknown state),
                // a fallback message is displayed. In a full app, this might be a default dashboard or error.
                <div>
                    Please use the navigation links above.
                </div>
            )}
        </div>
    );
}

export default ProductList;
