import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "../pages/register";
import { Login } from "../pages/login";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
