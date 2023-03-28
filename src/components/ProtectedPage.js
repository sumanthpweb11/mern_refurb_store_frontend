// only logged in user can access

import { message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../apicalls/users";
import { BiUser } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../redux/loaderSlice";
import { setUser } from "../redux/userSlice";

const ProtectedPage = ({ children }) => {
  // const [user, setUser] = useState(null);

  const { user } = useSelector((state) => state.users);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateToken = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetCurrentUser();
      dispatch(setLoader(false));
      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      navigate("/login");
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      // message.error("Please login to continue");
      navigate("/login");
    }
  }, []);
  return (
    user && (
      <div>
        {/**HEADER */}
        <div className="bg-primary flex justify-between items-center p-5 text-white">
          <h1 className="text-2xl">Refurbished Store</h1>
          <div className="bg-white py-2 px-5 flex items-center gap-5">
            <span className="text-black capitalize font-semibold flex items-center gap-1">
              <BiUser size={20} />
              <span
                onClick={() => {
                  navigate("/profile");
                }}
                className="hover:underline cursor-pointer"
              >
                {user.name}
              </span>
            </span>
            <span className="text-black cursor-pointer">
              <AiOutlineLogout
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
                size={25}
              />
            </span>
          </div>
        </div>
        <div className="p-5">{children}</div>
      </div>
    )
  );
};

export default ProtectedPage;
