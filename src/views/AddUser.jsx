import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import axios from "axios";

export default function AddUser({ url }) {
  // Inputan User

  const [username, setUsername] = useState("");
  const usernameOnChange = (e) => setUsername(e.target.value);

  const [email, setEmail] = useState("");
  const emailOnChange = (e) => setEmail(e.target.value);

  const [password, setPassword] = useState("");
  const passwordOnChange = (e) => setPassword(e.target.value);

  const [phoneNumber, setPhoneNumber] = useState("");
  const phoneNumberOnChange = (e) => setPhoneNumber(e.target.value);

  const [address, setAddress] = useState("");
  const addressOnChange = (e) => setAddress(e.target.value);

  // Navigasi
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const dataRegis = { username, email, password, phoneNumber, address };

      const { data } = await axios.post(`${url}/apis/add-user`, dataRegis, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      // console.log(data);
      Toastify({
        text: `Success Added User ${data.data.email}`,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
      navigate("/products");
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response.data.error,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  };

  return (
    <>
      {/* <!-- New User Section --> */}
      <section
        className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
        id="new-user-section"
      >
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="pt-3 pb-2 mb-3 border-bottom">
              <form id="register-form" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 display-1">Register User</h1>
                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <label htmlFor="register-username">Username</label>
                    <label className="text-danger text-end fw-bold">*</label>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="register-username"
                    placeholder="Enter username ..."
                    autoComplete="off"
                    required
                    onChange={usernameOnChange}
                  />
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <label htmlFor="register-email">Email</label>
                    <label className="text-danger text-end fw-bold">*</label>
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    id="register-email"
                    placeholder="Enter email address ..."
                    autoComplete="off"
                    required
                    onChange={emailOnChange}
                  />
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <label htmlFor="register-password">Password</label>
                    <label className="text-danger text-end fw-bold">*</label>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    id="register-password"
                    placeholder="Enter password ..."
                    autoComplete="off"
                    required
                    onChange={passwordOnChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="register-phone">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="register-phone"
                    placeholder="Enter phone number (optional) ..."
                    autoComplete="off"
                    onChange={phoneNumberOnChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="register-address">Address</label>
                  <textarea
                    id="register-address"
                    className="form-control"
                    rows="3"
                    placeholder="Enter address (optional) ..."
                    autoComplete="off"
                    onChange={addressOnChange}
                  ></textarea>
                </div>
                <button
                  className="btn btn-lg btn-primary rounded-pill w-100 p-2 mt-3"
                  type="submit"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End New User Section --> */}
    </>
  );
}
