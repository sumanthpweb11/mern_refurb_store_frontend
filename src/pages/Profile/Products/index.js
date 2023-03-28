import { Button } from "antd";
import React, { useState } from "react";
import ProductForm2 from "./ProductForm2";
// import ProductsForm from "./ProductsForm";

const Products = () => {
  const [showProductForm, setShowProductForm] = useState(false);

  return (
    <div>
      <div className="flex justify-end ">
        <Button onClick={() => setShowProductForm(true)} type="default">
          Add Product
        </Button>
      </div>

      {showProductForm && (
        <ProductForm2
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
        />
      )}
    </div>
  );
};

export default Products;
