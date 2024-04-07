import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";

export default function ImageUpload({ url }) {
  const navigate = useNavigate();
  const [file, setFile] = useState("");

  const { id } = useParams();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();

      //type data harus sama form-data
      formData.append("file", file);

      const { data } = await axios.patch(
        `${url}/apis/branded-things/products/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${localStorage.access_token}` } }
      );

      Toastify({
        text: `Image Successfully Updated`,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();

      console.log(data);
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
      {/* <!-- Update Section --> */}
      <section
        className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
        id="update-product-section"
      >
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="pt-3 pb-2 mb-3">
              <form id="register-form" onSubmit={(e) => handleSubmit(e)}>
                <h1 className="h3 mb-3 display-1">Update Image</h1>
                {/* <!-- <div className="mb-3"> --> */}
                <div className="input-group mb-3">
                  <input
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                    type="file"
                    className="form-control pb-2"
                    id="inputGroupFile02"
                    autoComplete="off"
                    name="image"
                    required
                  />
                </div>
                <button
                  className="btn btn-lg btn-primary rounded-pill w-100 p-2 mt-3"
                  type="submit"
                >
                  Update Image
                </button>
                {/* <!-- </div> --> */}
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End Update Section --> */}
    </>
  );
}
