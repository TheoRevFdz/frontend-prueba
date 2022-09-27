import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select } from "antd";
import ProductsList from "./ProductsList";

const ProductsScreen = () => {
  const [categorias, setCategorias] = useState([]);
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingList, setLoadingList] = useState(false);

  const findCategorias = async () => {
    try {
      const response = await axios.get("http://localhost:8084/api/categorias");
      setCategorias(response.data.categorias);
    } catch (err) {
      console.error(err);
    }
  };

  const findProductsByIdCategoria = async (idCategoria) => {
    try {
      setLoadingList(true);
      const response = await axios.get(
        `http://localhost:8084/api/productos/${idCategoria}`
      );
      console.log(response.data.productos);
      setLoadingList(false);
      setProducts(response.data.productos);
    } catch (err) {
      setLoadingList(false);
      console.error(err);
    }
  };

  const onChangeCategory = async (el) => {
    console.log(el);
    setCategory(el);
    await findProductsByIdCategoria(el);
  };

  useEffect(() => {
    findCategorias();
  }, []);

  return (
    <div>
      Categoría:
      <Select
        showSearch
        placeholder="Búsqueda"
        filterOption={true}
        style={{ width: "250px", marginLeft: "10px" }}
        value={category}
        onChange={onChangeCategory}
      >
        {categorias.map((c, idx) => (
          <Select.Option key={idx} value={c.idCategoria}>
            {c.nombreCategoria}
          </Select.Option>
        ))}
      </Select>
      <ProductsList productos={products} loadingList={loadingList} />
    </div>
  );
};

export default ProductsScreen;
