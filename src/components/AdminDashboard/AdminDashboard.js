import React, { useState, useEffect } from "react";
import constantMessages from "../../constants/constatntMessages";
import CommonModal from "./CommonModal";
import EditModal from "./EditModal";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const accessToken = localStorage.getItem("token");

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setEditShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [products, setProducts] = useState([]);

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
        const resData = response.data.data;
        setTotalCount(resData?.totalCount || 0);
        setProducts(resData?.products || []);
        // toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(constantMessages.serverErrorMessage);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const productFields = [
    {
      name: "productName",
      label: "Product Name",
      type: "text",
      placeholder: "Enter product name",
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      placeholder: "Enter price",
    },
    {
      name: "category",
      label: "Category",
      type: "text",
      placeholder: "Enter category",
    },
    {
      name: "imageUrl",
      label: "Image URL",
      type: "text",
      placeholder: "Enter image URL",
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      placeholder: "Enter description",
    },
    {
      name: "stock",
      label: "Stock",
      type: "number",
      placeholder: "Enter stock",
    },
  ];

  const couponFields = [
    {
      name: "code",
      label: "Coupon Code",
      type: "text",
      placeholder: "Enter coupon code",
    },
    {
      name: "discount",
      label: "Discount (%)",
      type: "number",
      placeholder: "Enter discount",
    },
    {
      name: "expiryDate",
      label: "Expiry Date",
      type: "date",
      placeholder: "Select expiry date",
    },
  ];

  //open product modal
  const openProductModal = () => {
    setModalType("product");
    setShowModal(true);
    setFormData({
      productName: "",
      price: "",
      category: "",
      description: "",
      imageUrl: "",
      stock: "",
    });
  };

  const openCouponModal = () => {
    setModalType("coupon");
    setShowModal(true);
    setFormData({ code: "", discount: "", expiryDate: "" });
  };

  const openEditProductModal = (product) => {
    setModalType("product");
    setFormData({
      _id: product._id,
      productName: product.productName,
      price: product.price,
      category: product.category,
      description: product.description,
      imageUrl: product.imageUrl,
      stock: product.stock,
    });
    setEditShowModal(true);
  };

  const openEditCouponModal = (coupon) => {
    setModalType("coupon");
    setFormData({
      _id: coupon._id,
      code: coupon.code,
      discount: coupon.discount,
      expiryDate: coupon.expiryDate,
    });
    setEditShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setFormData({});
  };

  const closeEditModal = () => {
    setEditShowModal(false);
    setFormData({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const webApiUrl =
        modalType === "product"
          ? `${process.env.REACT_APP_API_URL}/api/V1/products/addProduct`
          : `${process.env.REACT_APP_API_URL}/api/V1/coupons/addCoupon`;

      const headerObject = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      };
      const response = await axios.post(webApiUrl, formData, headerObject);
      if (response.data.success) {
        toast.success(response.data.message);
        closeModal();
        if (modalType === "product") {
          fetchAllProducts();
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const webApiUrl =
        modalType === "product"
          ? `${process.env.REACT_APP_API_URL}/api/V1/products/update/${formData._id}`
          : `${process.env.REACT_APP_API_URL}/api/V1/coupons/update/${formData._id}`;

      const headerObject = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      };
      const response = await axios.put(webApiUrl, formData, headerObject);
      if (response.data.success) {
        toast.success(response.data.message);
        // if (modalType === "product") {
        //   fetchAllProducts();
        // }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="container">
      <div className="page-header d-flex justify-content-between">
        <h1 className="page-header-title">
          Products{" "}
          <span class="badge bg-soft-dark text-dark ms-2">{totalCount}</span>
        </h1>
        <div className="pms-btns d-flex gap-2">
          <button
            className="btn btn-primary"
            style={{ height: "fit-content" }}
            onClick={openProductModal}
          >
            Add Product
          </button>
          <button
            className="btn btn-secondary"
            style={{ height: "fit-content" }}
            onClick={openCouponModal}
          >
            Add Coupon
          </button>
        </div>
      </div>

      <div className="product-list mt-4">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">PRODUCT</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">Stock</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={index}>
                  <td className="d-flex gap-2 align-items-center">
                    <img
                      src={product.imageUrl}
                      alt={product.productName}
                      width="100"
                      height="100"
                    />
                    {product.productName}
                  </td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                  <td>{product.stock}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() =>
                        product.category
                          ? openEditProductModal(product)
                          : openEditCouponModal(product)
                      }
                    >
                      Edit
                    </button>
                    <button className="btn btn-sm btn-danger ms-2">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <CommonModal
        show={showModal}
        handleClose={closeModal}
        handleSubmit={handleSubmit}
        type={modalType}
        formData={formData}
        setFormData={setFormData}
        formFields={modalType === "product" ? productFields : couponFields}
      />

      <EditModal
        show={showEditModal}
        handleClose={closeEditModal}
        handleSubmit={handleEditSubmit}
        type={modalType}
        formData={formData}
        setFormData={setFormData}
        formFields={modalType === "product" ? productFields : couponFields}
      />
    </div>
  );
};

export default AdminDashboard;
