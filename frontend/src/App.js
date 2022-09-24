import { AppRoutes } from "./routes";
import { GlobalStyles } from "./styles/global";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css'

export const App = () => {
  return (
    <div className="app">
      <GlobalStyles/>
      <AppRoutes/>
      <ToastContainer/>
    </div>
  );
}
