import { Outlet } from "react-router-dom";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";

export default function PageLayout() {
  return (
    <div
      // className="flex flex-col justify-between min-h-screen"
      style={{
        // backgroundColor: "red",
        backgroundImage: `url('../images/pexels-pixabay-139398.jpg')`, // Replace 'path_to_your_image' with the actual path to your image
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <PageNav />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Outlet />
      </div>
      <span style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
        <Footer />
      </span>
    </div>
  );
}
