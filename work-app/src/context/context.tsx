import React, { createContext, useState } from "react";

export const TitleContext = createContext({
  title: "",
  setTitle: (e: string) => {},
});

const MainContext = ({ children }: any) => {
  const [title, setTitle] = useState("");
  const value = { title, setTitle };

  return (
    <TitleContext.Provider value={value}>{children}</TitleContext.Provider>
  );
};
export default MainContext;
