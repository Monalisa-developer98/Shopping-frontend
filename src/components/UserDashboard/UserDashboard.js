import React, { useState, useEffect } from "react";
import constantMessages from "../../constants/constatntMessages";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaShoppingCart } from "react-icons/fa";

const UserDashboard = () => {
  const accessToken = localStorage.getItem("token");

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const webApiUrl = `${process.env.REACT_APP_API_URL}/api/V1/products/allProducts`;
        const headerObject = {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        };
        const response = await axios.get(webApiUrl, headerObject);
        if (response.data.success) {
          setProducts(response.data.data?.products || []);
        }
      } catch (error) {
        toast.error(constantMessages.serverErrorMessage);
      }
    };
    fetchAllProducts();
  }, []);

  // Function to update the quantity selector (before adding to cart)
  const updateQuantity = (productId, change) => {
    setSelectedQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[productId] || 1) + change;
      return {
        ...prevQuantities,
        [productId]: newQuantity > 0 ? newQuantity : 1,
      };
    });
  };

  // Function to add the selected quantity to the cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => ({
      ...prevCart,
      [product._id]: (prevCart[product._id] || 0) + (selectedQuantities[product._id] || 1),
    }));
    toast.success(`${product.productName} added to cart`);
  };

  // Calculate total items in cart
  const totalCartItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  // Calculate total price, discount, and final price
  const totalPrice = Object.keys(cart).reduce((sum, productId) => {
    const product = products.find((p) => p._id === productId);
    return sum + (product ? product.price * cart[productId] : 0);
  }, 0);
  const discount = totalPrice * 0.1;
  const finalPrice = totalPrice - discount;

  return (
    <div className="container mt-4">
      <nav className="navbar navbar-light bg-light mb-4">
        <div className="container-fluid d-flex justify-content-between">
          <h2 className="navbar-brand">User Dashboard</h2>
          <div className="position-relative" onClick={() => setShowCart(true)}>
            <FaShoppingCart size={30} style={{ cursor: "pointer" }} />
            {totalCartItems > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.8rem" }}>
                {totalCartItems}
              </span>
            )}
          </div>
        </div>
      </nav>
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column align-items-center">
                <img src={product.imageUrl} alt={product.productName} width="100" height="100" />
                <h5 className="card-title mt-3">{product.productName}</h5>
                <p className="card-text">Price: ${product.price}</p>
                <div className="d-flex align-items-center mb-3">
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantity(product._id, -1)}>-</button>
                  <span className="mx-2">{selectedQuantities[product._id] || 1}</span>
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantity(product._id, 1)}>+</button>
                </div>
                <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showCart && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Shopping Cart</h5>
                <button type="button" className="btn-close" onClick={() => setShowCart(false)}></button>
              </div>
              <div className="modal-body">
                {Object.keys(cart).length > 0 ? (
                  <>
                    <ul className="list-group mb-3">
                      {Object.keys(cart).map((productId) => {
                        const product = products.find((p) => p._id === productId);
                        return product ? (
                          <li key={productId} className="list-group-item d-flex justify-content-between align-items-center">
                            {product.productName} (x{cart[productId]}) - ${product.price * cart[productId]}
                          </li>
                        ) : null;
                      })}
                    </ul>
                    <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
                    <p><strong>Discount (10%):</strong> -${discount.toFixed(2)}</p>
                    <p><strong>Final Price:</strong> ${finalPrice.toFixed(2)}</p>
                  </>
                ) : (
                  <p>Your cart is empty.</p>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowCart(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
