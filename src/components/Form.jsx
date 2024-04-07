import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "./Button";

export default function FormProducts({ url, nameProp, handleSubmit, product }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setImgUrl(product.imgUrl);
      setStock(product.stock);
      setCategoryId(product.categoryId);
    }
  }, [product]);

  //fetch categories

  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    try {
      const { data } = await axios.get(
        `${url}/apis/branded-things/categories`,
        { headers: { Authorization: `Bearer ${localStorage.access_token}` } }
      );

      setCategories(data.data);
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
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {/* <!-- New Product Section --> */}
      <section
        className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
        id="new-product-section"
      >
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="display-2">New Product / Update Product</h1>
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <form
              id="product-form"
              onSubmit={(e) =>
                handleSubmit(
                  e,
                  name,
                  description,
                  price,
                  stock,
                  categoryId,
                  imgUrl
                )
              }
            >
              <div className="mb-3">
                <label htmlFor="product-name">
                  Name <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="form-control"
                  id="product-name"
                  placeholder="Enter product name"
                  autoComplete="off"
                  required
                  value={name}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="product-category">
                  Category <span className="text-danger fw-bold">*</span>
                </label>
                <select
                  onChange={(e) => setCategoryId(e.target.value)}
                  id="product-category"
                  className="form-select"
                  required
                  value={categoryId}
                >
                  <option value="0" disabled>
                    -- Select Category --
                  </option>
                  {categories.map((el) => {
                    return (
                      <option key={el.id} value={el.id}>
                        {el.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="product-desc">
                  Description
                  <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  className="form-control"
                  id="product-desc"
                  placeholder="Enter product description"
                  autoComplete="off"
                  required
                  value={description}
                />
              </div>
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="product-stock">
                      Stock <span className="text-danger fw-bold">*</span>
                    </label>
                    <input
                      onChange={(e) => setStock(e.target.value)}
                      type="number"
                      min="0"
                      className="form-control"
                      id="product-stock"
                      placeholder="Enter product stock"
                      autoComplete="off"
                      required
                      value={stock}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="product-price">
                      Price <span className="text-danger fw-bold">*</span>
                    </label>
                    <input
                      onChange={(e) => setPrice(e.target.value)}
                      type="number"
                      min="0"
                      className="form-control"
                      id="product-price"
                      placeholder="Enter product price"
                      autoComplete="off"
                      required
                      value={price}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="product-image">Image</label>
                <input
                  onChange={(e) => setImgUrl(e.target.value)}
                  type="text"
                  className="form-control"
                  id="product-image"
                  placeholder="Enter product image url"
                  autoComplete="off"
                  value={imgUrl}
                />
              </div>
              <div className="row mt-5 mb-3">
                <div className="col-6">
                  <Link
                    to={"/products"}
                    className="btn btn-lg btn-light rounded-pill w-100 p-2"
                  >
                    Cancel
                  </Link>
                </div>
                <Button nameProp={nameProp} />
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* <!-- End New Product Section --> */}
    </>
  );
}
