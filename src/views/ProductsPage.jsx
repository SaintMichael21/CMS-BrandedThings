import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import spinLoad from "../assets/Spin@2x-1.0s-200px-200px.svg";
import Toastify from "toastify-js";

export default function ProductsPage({ url }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  async function deleteProduct(id) {
    try {
      await axios.delete(`${url}/apis/branded-things/products/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      Toastify({
        text: "Item has been deleted",
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
      fetchProducts();
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
  }

  async function fetchProducts() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/apis/branded-things/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setProducts(data.data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <section
        className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
        id="product-section"
      >
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="display-2">Products</h1>
          <Link to={"/products/add"}>
            <button className="btn btn-primary rounded-pill" id="new-product">
              <span className="icon material-symbols-outlined">add</span>New
              Product
            </button>
          </Link>
        </div>
        <div className="row">
          <div className="col-12 table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col" width="180px">
                    Image
                  </th>
                  <th scope="col" width="250px">
                    Description
                  </th>
                  <th scope="col">Stock</th>
                  <th scope="col">Price</th>
                  <th scope="col">Author</th>
                  <th scope="col" width="50px"></th>
                </tr>
              </thead>
              <tbody id="table-product">
                {loading ? (
                  <div className="mt-32 flex justify-center items-center">
                    <img src={spinLoad} />
                  </div>
                ) : (
                  products.map((product, index) => {
                    return (
                      <tr key={product.id}>
                        <td scope="row">#{index + 1}</td>
                        <td className="fw-bold">{product.name}</td>
                        <td>
                          <img src={product.imgUrl} className="img-fluid" />
                        </td>
                        <td>{product.description}</td>
                        <td>{product.stock}</td>
                        <td className="fw-bold">Rp. {product.price}</td>
                        <td>{product.User.email}</td>
                        <td>
                          <span className="d-flex">
                            <a
                              className="ms-3"
                              onClick={() => {
                                deleteProduct(product.id);
                              }}
                            >
                              <span
                                role="button"
                                className="icon material-symbols-outlined text-danger "
                              >
                                delete
                              </span>
                            </a>
                            <Link
                              to={`/products/edit/${product.id}`}
                              className="ms-3"
                            >
                              <span className="icon material-symbols-outlined text-danger">
                                edit
                              </span>
                            </Link>
                            <Link
                              to={`/products/edit/image/${product.id}`}
                              className="ms-3"
                            >
                              <span className="icon material-symbols-outlined text-danger">
                                image
                              </span>
                            </Link>
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
