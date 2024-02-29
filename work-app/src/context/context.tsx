import React, { ReactNode, createContext, useState } from "react";

type HeaderProps = {
  children: ReactNode;
};

export const requestSender = createContext({
  dataValue: [""],
  setDataValue: (e: string[]) => {},
});

export const TitleContext = createContext({
  title: "",
  setTitle: (e: string) => {},
});

const MainContext = (HeaderProps: HeaderProps): JSX.Element => {
  const { children } = HeaderProps;
  const [title, setTitle] = useState("");
  const value = { title, setTitle };

  const [dataValue, setDataValue] = useState<string[]>([""]);
  const sendRequest = { dataValue, setDataValue };

  return (
    <>
      <TitleContext.Provider value={value}>
        <requestSender.Provider value={sendRequest}>
          {children}
        </requestSender.Provider>
      </TitleContext.Provider>
    </>
  );
};
export default MainContext;
