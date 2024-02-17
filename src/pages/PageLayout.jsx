import { Outlet } from "react-router-dom";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";

export default function PageLayout() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
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
