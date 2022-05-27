import { Routes, Route } from "react-router-dom";

import { Login, Signup } from "features";
import { PrivateRoute, Home } from "components";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
