import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Loading from "./components/Loading";

const LazyList = React.lazy(() => import("./pages/List"));
const LazyProfile = React.lazy(() => import("./pages/Profile"));

const AppRoute: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Suspense fallback={<Loading />}><LazyList /></Suspense>} />
        <Route path="/profile/:id" element={<Suspense fallback={<Loading />}><LazyProfile /></Suspense>} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  )
}
export default AppRoute;