import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Subscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [editData, setEditData] = useState(null);
  const [show, setShow] = useState(false);
  const [subscriptionsList, setSubscriptionsList] = useState([]);

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/V1/sub/subscriptions`
      );
      if (response.data.success) {
        setSubscriptionsList(response.data.data); 
        console.log(subscriptionsList);
      }
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };
  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!formData.name.trim() || !formData.description.trim()) return;
    setSubscriptions([...subscriptions, { ...formData, id: Date.now() }]);
    setFormData((prevData) => ({ ...prevData, description: "" }));
  };

  const handleDelete = (id) => {
    setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
  };

  const handleEditClick = (sub) => {
    setEditData(sub);
    setShow(true);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = () => {
    setSubscriptions(
      subscriptions.map((sub) => (sub.id === editData.id ? editData : sub))
    );
    setShow(false);
  };

  const handleFinalSubmit = async () => {
    if (subscriptions.length === 0) {
      alert("At least one subscription is required!");
      return;
    }
    try {
      const webApiUrl = `${process.env.REACT_APP_API_URL}/api/V1/sub/add-subs`;
      const payload = { subscriptions };
      const response = await axios.post(webApiUrl, payload);
      if (response.data.success) {
        const resData = response.data.data;
        toast.success(response.data.message);
        setSubscriptions([]);
        setFormData({})
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error");
    }
  };

  // Handle Activate/Deactivate
  const handleStatusChange = async (id, newStatus) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/v1/sub/${
        newStatus === "active" ? "activate" : "deactivate"
      }/${id}`;

      const response = await axios.put(url);

      // Update subscriptionsList state to reflect changes in UI
      setSubscriptionsList((prevSubscriptions) =>
        prevSubscriptions.map((sub) =>
          sub._id === id ? { ...sub, isActive: newStatus === "active" } : sub
        )
      );

      // Show success message using toast instead of alert
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error updating subscription status:", error);
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  const handleManage = (id) => {
    console.log("Manage subscription with ID:", id);
  };

  return (
    <div className="container mt-4">
      <h2>Subscription Management</h2>
      <div className="mb-3">
        <Form.Control
          type="text"
          name="name"
          placeholder="Subscription Name"
          value={formData.name}
          onChange={handleInputChange}
          className="mb-2"
        />
        <Form.Control
          type="text"
          name="description"
          placeholder="Subscription Description"
          value={formData.description}
          onChange={handleInputChange}
          className="mb-2"
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>

      {subscriptions.length > 0 && (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sl No.</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((sub, index) => (
            <tr key={sub.id}>
              <td>{index + 1}</td>
              <td>{sub.description}</td>
              <td>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => handleEditClick(sub)}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(sub.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      )}

      {subscriptions.length > 0 && (
        <Button variant="success" onClick={handleFinalSubmit}>
          Submit to DB
        </Button>
      )}

      <div>
        <h2>Subscriptions List</h2>
        <table>
          <thead>
            <tr>
              <th>Plan Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptionsList.map((sub) => (
              <tr key={sub._id}>
                <td>{sub.name}</td>
                <td>{sub.description}</td>
                <td>{sub.isActive ? "Active" : "Inactive"}</td>
                <td>
                  <button
                    onClick={() =>
                      handleStatusChange(
                        sub._id,
                        sub.isActive ? "inactive" : "active"
                      )
                    }
                  >
                    {sub.isActive ? "Deactivate" : "Activate"}
                  </button>
                  {sub.isActive && (
                    <button onClick={() => handleManage(sub._id)}>
                      Manage
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Subscription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Subscription Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editData?.name || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Subscription Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={editData?.description || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Subscription;
