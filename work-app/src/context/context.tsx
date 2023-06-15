import React, { ReactNode, createContext, useState } from "react";

type HeaderProps = {
  children: ReactNode;
};

export const TitleContext = createContext({
  title: "",
  setTitle: (e: string) => {},
});

const MainContext = (HeaderProps: HeaderProps): JSX.Element => {
  const { children } = HeaderProps;
  const [title, setTitle] = useState("");
  const value = { title, setTitle };

  return (
    <TitleContext.Provider value={value}>{children}</TitleContext.Provider>
  );
};
export default MainContext;
