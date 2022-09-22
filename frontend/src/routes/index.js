import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "../pages/register";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Register/>}/>
            </Routes>
        </BrowserRouter>
    )
}