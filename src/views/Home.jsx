import Sidebar from "../components/Sidebar";
import ProductsPage from "./ProductsPage";
import FormProducts from "../components/Form";
import ImageUpload from "./ImageUpload";
import ListCategories from "./ListCategories";
import AddUser from "./AddUser";

export default function Home() {
  return (
    <>
      {/* <!-- Home Section --> */}
      <section className="container-fluid" id="home-section">
        <div className="row">
          {/* <!-- Sidebar --> */}
          <Sidebar setPage={setPage} />
          {/* <!-- End Sidebar --> */}

          {/* <!-- Product Section --> */}
          {page === "ProductsPage" && <ProductsPage setPage={setPage} />}
          {/* <!-- End Product Section --> */}

          {/* <!-- New Product Section --> */}
          {page === "FormProducts" && <FormProducts setPage={setPage} />}
          {/* <!-- End New Product Section --> */}

          {/* <!-- Update Section --> */}
          {page === "ImageUpload" && <ImageUpload />}
          {/* <!-- End Update Section --> */}

          {/* <!-- Category Section --> */}
          {page === "ListCategories" && <ListCategories />}
          {/* <!-- End Category Section --> */}

          {/* <!-- New User Section --> */}
          {page === "AddUser" && <AddUser />}
          {/* <!-- End New User Section --> */}
        </div>
      </section>
      {/* <!-- End Home Section --> */}
    </>
  );
}
