import React, { useState } from "react";
import constantMessages from "../../constants/constatntMessages";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // api call to submit the form details
    try {
      const webApiUrl = `${process.env.REACT_APP_API_URL}/api/V1/auth/signInByPassword`;
      const payload = {
        email: formData.email,
        password: formData.password,
      };
      const response = await axios.post(webApiUrl, payload);
      if (response.data.success) {
        const resData = response.data.data;
        const {token, userData} = resData;
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("token", token);
        toast.success(response.data.message);
        if (userData.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(constantMessages.serverErrorMessage);
    }
  };

  const handleInputChange = (e) => {
    setErrors({});
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateForm({ ...formData, [name]: value })[name], 
    }));

  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.email.trim()) {
      errors.email = constantMessages.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = constantMessages.invalidEmail;
    }
    const regularExpression =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!data.password.trim()) {
      errors.password = constantMessages.passwordRequired;
    } else if (!regularExpression.test(data.password)) {
      errors.password = constantMessages.passwordRegex;
    }
    return errors;
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-12">
        <h2 className="mb-4">Login By Password</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label className="form-label">
                Email <span>*</span>
              </label>
              <input
                type="text"
                name="email"
                className="form-control"
                autoComplete="off"
                onChange={handleInputChange}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>
            <div className="form-group mb-3">
              <label className="form-label">
                Password <span>*</span>
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                autoComplete="off"
                onChange={handleInputChange}
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>
            <button type="submit" className="btn btn-primary mb-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
