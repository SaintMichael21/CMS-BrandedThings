import { createBrowserRouter, redirect } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import ProductsPage from "../views/ProductsPage";
import ListCategories from "../views/ListCategories";
import LoginPage from "../views/LoginPage";
import AddUser from "../views/AddUser";
import AddProduct from "../views/AddProduct";
import EditProduct from "../views/EditProduct";
import ImageUpload from "../views/ImageUpload";
import Toastify from "toastify-js";

const url = "https://phase2-aio.vercel.app";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => {
      return redirect("/login");
    },
  },
  {
    path: "/login",
    element: <LoginPage url={url} />,
    loader: () => {
      if (localStorage.access_token) {
        Toastify({
          text: "You already logged in",
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
        return redirect("/products");
      }
      return null;
    },
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        Toastify({
          text: "Please login first",
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
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/products",
        element: <ProductsPage url={url} />,
      },
      {
        path: "/products/add",
        element: <AddProduct url={url} />,
      },
      {
        path: "/products/edit/:id",
        element: <EditProduct url={url} />,
      },
      {
        path: "/categories",
        element: <ListCategories url={url} />,
      },
      {
        path: "/products/edit/image/:id",
        element: <ImageUpload url={url} />,
      },
      {
        path: "/register",
        element: <AddUser url={url} />,
      },
    ],
  },
]);

export default router;
