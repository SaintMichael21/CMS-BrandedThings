import axios from "axios";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

export default function AddProduct({ url }) {
  const navigate = useNavigate();
  const handleSubmit = async (
    e,
    name,
    description,
    price,
    stock,
    categoryId,
    imgUrl
  ) => {
    try {
      e.preventDefault();
      const addedData = {
        name,
        categoryId: +categoryId,
        description,
        stock: +stock,
        price: +price,
        imgUrl,
      };
      console.log(addedData);
      const { data } = await axios.post(
        `${url}/apis/branded-things/products`,
        addedData,
        { headers: { Authorization: `Bearer ${localStorage.access_token}` } }
      );

      Toastify({
        text: `Product ${data.data.name} added Successfully`,
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

      navigate("/products");
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response.data.error,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 3px 3px black",
          fontWeight: "bold",
          "border-radius": "5px",
        },
      }).showToast();
    }
  };
  return (
    <>
      <Form nameProp="Add Product" url={url} handleSubmit={handleSubmit} />
    </>
  );
}
