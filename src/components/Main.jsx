import React, { useEffect, useState, lazy, Suspense } from "react";
import Header from "./header/Header";
import LeftPanel from "./left-panel/LeftPanel";
import RightPanel from "./right-panel/RightPanel";
import AllSections from "./all-sections/AllSections";
import Footer from "./footer/Footer";
import "./Main.css";
import { Routes, Route, useLocation } from "react-router-dom";

const LazyPortfolioBuilder = lazy(
  () => import("./portfolio-builder/PortfolioBuilderWrapper"),
);

const MysteryLady = lazy(() => import("./mysterylady/MysteryLady"));

export default function Main({
  headerData,
  footerData,
  socialMediaLinks,
  emails,
  userData,
}) {
  const [width, setWidth] = useState(window.innerWidth);
  const routerLocation = useLocation();

  const isMysteryLady = routerLocation.pathname === "/mysterylady";

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (isMysteryLady) {
    return (
      <Suspense fallback={<h1>Loading...</h1>}>
        <MysteryLady />
      </Suspense>
    );
  }
  return (
    <div className="main">
      <Header {...headerData} socialMediaLinks={socialMediaLinks} />
      {width > 500 && (
        <>
          <LeftPanel {...socialMediaLinks}></LeftPanel>
          <RightPanel emails={emails}></RightPanel>
        </>
      )}

      <div className="wrapper">
        <Routes>
          <Route path="/" element={<AllSections {...userData} />} />
          <Route
            path="/build-your-portfolio"
            element={
              <Suspense fallback={<h1>Loading...</h1>}>
                <LazyPortfolioBuilder />
              </Suspense>
            }
          />
          <Route path="*" element={<AllSections {...userData} />} />
        </Routes>
      </div>
      {width <= 500 && <LeftPanel {...socialMediaLinks} />}
      <Footer {...footerData} />
    </div>
  );
}
