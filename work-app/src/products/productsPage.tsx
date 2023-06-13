import { useContext, useEffect } from "react";
import { TitleContext } from "../context/context";

const ProductsPages = () => {
  const value = useContext(TitleContext);

  useEffect(() => {
    value.setTitle("Products");
  }, [value]);

  return <p>Welcome to products</p>;
};

export default ProductsPages;
