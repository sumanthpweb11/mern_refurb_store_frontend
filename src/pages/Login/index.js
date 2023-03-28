import { Button, Form, Input, message } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apicalls/users";
import { setLoader } from "../../redux/loaderSlice";

const rules = [
  {
    required: true,
    message: "required",
  },
];

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await LoginUser(values);
      dispatch(setLoader(false));

      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-red-300 to-red-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl text-center font-semibold">Login</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <Form layout="vertical" onFinish={onFinish}>
                  <div className="relative">
                    <Form.Item label="Email" name="email" rules={rules}>
                      <Input
                        autoComplete="off"
                        type="email"
                        className="peer placeholder-transparent h-10 w-full  text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Email"
                      />
                    </Form.Item>
                  </div>
                  <div className="relative">
                    <Form.Item label="Password" name="password" rules={rules}>
                      <Input
                        autoComplete="off"
                        type="password"
                        className="peer placeholder-transparent h-10 w-full  text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Password"
                      />
                    </Form.Item>
                  </div>
                  <div className="relative">
                    <Button
                      block
                      htmlType="submit"
                      className="bg-primary text-white  px-4 py-1"
                    >
                      Submit
                    </Button>
                  </div>
                  <span>
                    Don't have an account?{" "}
                    <Link className="text-primary" to="/register">
                      Sign up
                    </Link>
                  </span>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
