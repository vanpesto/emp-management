import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Employees from "./pages/Employees";
import "./index.scss";
import UserSetup from "./pages/UserSetup";

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Employees />}></Route>
        <Route path="/userSetup" element={<UserSetup />}></Route>
      </Routes>
    </Router>
  );
}

export default Routing;
