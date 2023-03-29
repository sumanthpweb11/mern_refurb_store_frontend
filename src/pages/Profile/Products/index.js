import { Button, message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { DeleteProduct, GetProducts } from "../../../apicalls/products";
import { setLoader } from "../../../redux/loaderSlice";
import ProductForm from "./ProductForm";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const Products = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProducts();
      dispatch(setLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      dispatch(setLoader(true));
      const response = await DeleteProduct(id);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const columns = [
    // {
    //   title: "Product",
    //   dataIndex: "image",
    //   render: (text, record) => {
    //     return (
    //       <img
    //         src={record?.images?.length > 0 ? record.images[0] : ""}
    //         alt=""
    //         className="w-20 h-20 object-cover rounded-md"
    //       />
    //     );
    //   },
    // },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Added On",
      dataIndex: "createdAt",
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-5 items-center">
            <AiOutlineDelete
              onClick={() => {
                deleteProduct(record._id);
              }}
              size={20}
              className="cursor-pointer hover:text-red-300"
            />

            <AiOutlineEdit
              onClick={() => {
                setSelectedProduct(record);
                setShowProductForm(true);
              }}
              size={20}
              className="cursor-pointer hover:text-red-300"
            />

            {/* <span
              className="underline cursor-pointer"
              onClick={() => {
                setSelectedProduct(record);
                setShowBids(true);
              }}
            >
              Show Bids
            </span> */}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="flex justify-end mb-2">
        <Button
          onClick={() => {
            setSelectedProduct(null);
            setShowProductForm(true);
          }}
          type="default"
        >
          Add Product
        </Button>
      </div>
      <Table
        className="capitalize font-semibold"
        columns={columns}
        dataSource={products}
      />

      {showProductForm && (
        <ProductForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
          selectedProduct={selectedProduct}
          getData={getData}
        />
      )}
    </div>
  );
};

export default Products;
