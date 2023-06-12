import React, { createContext, useContext, useEffect, useState } from "react";
import AppHeader from "../navbars/AppHeader";

export const TitleContext = createContext({
  title: "",
  setTitle: (e: string) => {},
});

const MainContext = ({ children }: any) => {
  const prvTitle = useContext(TitleContext);
  const [title, setTitle] = useState(prvTitle.title);
  const value = { title, setTitle };

  useEffect(() => {
    window.localStorage.setItem("title", JSON.stringify(title));
  }, [title]);

  useEffect(() => {
    const data = window.localStorage.getItem("title");
    if (data !== null) {
      setTitle(JSON.parse(data));
    }
  }, []);

  return (
    <TitleContext.Provider value={value}>{children}</TitleContext.Provider>
  );
};
export default MainContext;
