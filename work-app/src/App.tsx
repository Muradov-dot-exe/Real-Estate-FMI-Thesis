import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./router/HomePage";
import SignUp from "./auth/signUp";
import SignIn from "./auth/signIn";
import ProductsPages from "./products/productsPage";

const App = () => {
  return (
    <BrowserRouter>
      <Box className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/products" element={<ProductsPages />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};
export default App;
