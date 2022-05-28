import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Login, Signup } from "features";
import { PrivateRoute, Home } from "components";
import "./App.css";

function App() {
  return (
    <div>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "black",
            color: "#fff",
          },
        }}
      />

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
