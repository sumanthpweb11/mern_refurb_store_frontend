import { Button, message, Upload } from "antd";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { UploadProductImage } from "../../../apicalls/products";

import { setLoader } from "../../../redux/loaderSlice";

const Images = ({ selectedProduct, setShowProductForm, getData }) => {
  const [showPreview = false, setShowPreview] = useState(true);
  const [file = null, setFile] = useState(null);
  const [images = [], setImages] = useState(selectedProduct.images);
  const dispatch = useDispatch();

  const upload = async () => {
    try {
      dispatch(setLoader(true));
      // Upload Image to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productId", selectedProduct._id);
      const response = await UploadProductImage(formData);
      // console.log(response);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        setImages([...images, response.data]);
        setShowPreview(false);
        setFile(null);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };
  return (
    <div>
      <div className="flex gap-5 mb-5">
        {images.map((image) => {
          return (
            <div className="flex gap-2 border border-solid border-gray-500 rounded p-2 items-end">
              <img className="h-20 w-20 object-cover" src={image} alt="" />
              <AiOutlineDelete
                onClick={() => {
                  //deleteImage(image)}
                }}
                size={20}
                className="cursor-pointer hover:text-red-300"
              />
            </div>
          );
        })}
      </div>
      <Upload
        listType="picture"
        beforeUpload={() => false}
        onChange={(info) => {
          setFile(info.file);
          setShowPreview(true);
        }}
        showUploadList={showPreview}
      >
        <Button type="dashed">Upload Image</Button>
      </Upload>

      <div className="flex justify-end gap-5 mt-5">
        <Button type="default" onClick={() => setShowProductForm(false)}>
          Cancel
        </Button>
        <Button type="primary" disabled={!file} onClick={upload}>
          Upload
        </Button>
      </div>
    </div>
  );
};

export default Images;
