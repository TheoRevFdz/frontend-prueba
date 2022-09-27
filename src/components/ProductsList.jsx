import React from "react";
import { Table } from "antd";
import moment from "moment";

const ProductsList = ({ productos, loadingList }) => {
  const columns = [
    {
      title: "#",
      dataIndex: "idProducto",
      width: "70px",
      align: "center",
      fixed: "left",
    },
    {
      title: "Nombre del producto",
      dataIndex: "nombreProducto",
      width: "200px",
      align: "left",
      render: (txt) => <div className="name-doc">{txt}</div>,
    },
    {
      title: "Nombre del proveedor",
      dataIndex: ["proveedor", "nombreCompania"],
      width: "200px",
      align: "left",
      render: (txt) => <div className="name-doc">{txt}</div>,
    },
    {
      title: "Precio Unitario",
      dataIndex: "precioUnitario",
      width: "150px",
      align: "left",
    },
    {
      title: "Fecha de pedido",
      dataIndex: "fecha",
      width: "150px",
      align: "center",
      render: (fec) => {
        if (fec !== null && fec !== undefined) {
          return moment(new Date(`${fec}T00:00:00`))
            .utc()
            .format("DD/MM/YYYY");
        }
        return "";
      },
    },
    {
      title: "Cantidad de Productos vendidos",
      dataIndex: "unidadesEnPedido",
      width: "150px",
      align: "left",
      // render: (_, row) => row.unidadesEnPedido ?? 0,
    },
    {
      title: "Costo total",
      dataIndex: "estado",
      width: "150px",
      align: "center",
      fixed: "right",
      render: (_, row) => row.unidadesEnPedido * row.precioUnitario,
    },
  ];

  return (
    <div>
      <Table
        rowKey={"idProducto"}
        columns={columns}
        dataSource={productos}
        loading={loadingList}
        size="small"
        scroll={{ x: 1500 }}
        style={{ marginTop: "10px" }}
        className="custom-row-hover"
      />
    </div>
  );
};

export default ProductsList;
