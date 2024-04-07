import axios from "axios";
import Form from "../components/Form";
import { useNavigate, useParams } from "react-router-dom";
import Toastify from "toastify-js";
import { useEffect, useState } from "react";

export default function EditProduct({ url }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  console.log(id);
  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `${url}/apis/branded-things/products/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.access_token}` },
        }
      );

      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

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
      const { data } = await axios.put(
        `${url}/apis/branded-things/products/${id}`,
        addedData,
        { headers: { Authorization: `Bearer ${localStorage.access_token}` } }
      );
      console.log(data);
      Toastify({
        text: `${data.message}`,
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
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  };
  return (
    <>
      <Form
        url={url}
        nameProp="Update Product"
        handleSubmit={handleSubmit}
        product={product}
      />
    </>
  );
}
