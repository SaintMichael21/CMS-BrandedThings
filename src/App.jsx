import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routers/index.jsx";
import "toastify-js/src/toastify.css";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
