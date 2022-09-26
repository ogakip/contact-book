import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "../pages/register";
import { Login } from "../pages/login";
import { Dashboard } from "../pages/dashboard";
import { Redirect } from "../pages/redirect";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Redirect/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
