import { RouterProvider } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { auth } from "./firebase";
import { setUser } from "./redux/authActions";
import { router } from "./router/routes";
import React from "react";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser(authUser));
      } else {
        dispatch(setUser(null));
      }
    });
  }, [dispatch]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
