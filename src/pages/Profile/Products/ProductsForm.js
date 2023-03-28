import { Modal, Tabs, Form, Input, Col, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRef } from "react";

const rules = [
  {
    required: true,
    message: "required",
  },
];

// Checkboxes
const additionalThings = [
  {
    label: "Bill Available",
    name: "billAvailable",
  },
  {
    label: "Warranty Available",
    name: "warrantyAvailable",
  },
  {
    label: "Accessories Available",
    name: "accessoriesAvailable",
  },
  {
    label: "Box Available",
    name: "boxAvailable",
  },
];

const items = [
  {
    key: "1",
    label: `General`,
    children: <FormComponent />,
  },
  {
    key: "2",
    label: `Images`,
    children: `Content of Tab Pane 2`,
  },
];

const ProductsForm = ({ showProductForm, setShowProductForm }) => {
  const formRef = useRef(null);
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <Modal
      title=""
      open={showProductForm}
      onCancel={() => setShowProductForm(false)}
      centered
      width={1000}
      okText="Save"
      onOk={() => {
        formRef.current.submit();
      }}
    >
      <Tabs
        defaultActiveKey="1"
        items={items}
        formRef={formRef}
        onFinish={onFinish}
      />
    </Modal>
  );
};

// Product Form Component
const FormComponent = ({ formRef, onFinish }) => {
  return (
    <Form ref={formRef} layout="vertical" onFinish={onFinish}>
      <Form.Item label="Name" name="name" rules={rules}>
        <Input autoComplete="off" type="text" />
      </Form.Item>
      <Form.Item label="Description" name="description" rules={rules}>
        <TextArea type="text" />
      </Form.Item>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Form.Item label="Price" name="price" rules={rules}>
            <Input type="number" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Category" name="category" rules={rules}>
            <select>
              <option value="">Select</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home</option>
              <option value="sports">Sports</option>
            </select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Age" name="age" rules={rules}>
            <Input type="number" />
          </Form.Item>
        </Col>
      </Row>

      {/* CHECKBOXES */}
      <div className="flex gap-10">
        {additionalThings.map((item) => {
          return (
            <Form.Item
              label={item.label}
              name={item.name}
              // valuePropName="checked"
            >
              <Input
                type="checkbox"
                value={item.name}
                // onChange={(e) => {
                //   formRef.current.setFieldsValue({
                //     [item.name]: e.target.checked,
                //   });
                // }}
                // checked={formRef.current?.getFieldValue(item.name)}
              />
            </Form.Item>
          );
        })}
      </div>
    </Form>
  );
};

export default ProductsForm;
