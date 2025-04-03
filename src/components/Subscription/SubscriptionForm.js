import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const SubscriptionForm = () => {
  // Form state variables
  const [subscriptionTypes, setSubscriptionTypes] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    effectFromDate: '',
    sellingPrice: 0,
    discountPrice: 0,
    maxUser: 0,
    validityInDays: 0,
  });
  const [error, setError] = useState('');
  const [activeSubscription, setActiveSubscription] = useState(null);

  // Fetch the subscription types when the component mounts
  useEffect(() => {
    const fetchSubscriptionTypes = async () => {
      try {
        const response = await axios.get('http://192.168.29.185:8089/api/V1/sub/subscriptions'); // Update with correct API URL
        setSubscriptionTypes(response.data.data); // Assuming your response has the subscription types
      } catch (err) {
        console.error(err);
        setError('Failed to load subscription types');
      }
    };

    fetchSubscriptionTypes();
  }, []);

  // Handle changes in the form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'name') {
      setSelectedSubscription(value);
      getSubscriptionDetails(value); // Fetch active subscription details for selected type
    }
  };

  // Fetch the active subscription details for the selected subscription type
  const getSubscriptionDetails = async (name) => {
    try {
      const response = await axios.get(`http://192.168.29.185:8089/api/V1/sub/get-active-subscription?name=${name}`);
      setActiveSubscription(response.data.data); // Store the active subscription details
    } catch (err) {
      console.error(err);
      setError('Failed to fetch active subscription details');
    }
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://192.168.29.185:8089/api/V1/sub/manage-subscription', formData); // Update with correct API URL
      alert('Subscription managed successfully');
      
    } catch (err) {
      console.error(err);
      setError('Failed to manage subscription');
    }
  };

  return (
    <div>
      <h1>Manage Subscription</h1>
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Subscription Type:</label>
          <select
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          >
            <option value="">Select Subscription</option>
            {subscriptionTypes.map((sub) => (
              <option key={sub._id} value={sub.name}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>

        {selectedSubscription && (
          <>
            <div>
              <label>Effect From Date:</label>
              <input
                type="date"
                name="effectFromDate"
                value={formData.effectFromDate}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Selling Price:</label>
              <input
                type="number"
                name="sellingPrice"
                value={formData.sellingPrice}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Discount Price:</label>
              <input
                type="number"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Max Users:</label>
              <input
                type="number"
                name="maxUser"
                value={formData.maxUser}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Validity (in days):</label>
              <input
                type="number"
                name="validityInDays"
                value={formData.validityInDays}
                onChange={handleChange}
                required
              />
            </div>

            {activeSubscription && (
              <div>
                <h3>Active Subscription Details</h3>
                <p><strong>Selling Price:</strong> {activeSubscription.sellingPrice}</p>
                <p><strong>Discount Price:</strong> {activeSubscription.discountPrice}</p>
                <p><strong>Max Users:</strong> {activeSubscription.maxUser}</p>
                <p><strong>Validity:</strong> {activeSubscription.validityInDays} days</p>
              </div>
            )}
          </>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubscriptionForm;
