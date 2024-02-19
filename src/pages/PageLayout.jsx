import { Outlet } from "react-router-dom";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import backgroundImage from "../images/backgroundImage.jpg";

export default function PageLayout() {
  return (
    <div className="relative h-screen">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black opacity-40 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      {/* page content */}
      <div className="relative z-10">
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
    </div>
  );
}
