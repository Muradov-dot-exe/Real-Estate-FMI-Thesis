import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/homePage";
import SignUp from "./auth/signUp";
import SignIn from "./auth/signIn";
import ProductsPages from "./products/productsPage";
import AuthVerification from "./router/authVerificationComponent";
import HomeBar from "./navbars/AppBar";
import ErrorPage from "./pages/errorPage";

const App = () => {
  return (
    <BrowserRouter>
      <HomeBar />
      <Box className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<AuthVerification />}>
            <Route path="/products" element={<ProductsPages />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};
export default App;
