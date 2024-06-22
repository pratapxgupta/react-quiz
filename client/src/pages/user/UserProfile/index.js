import React from "react";
import PageTitle from "../../../components/PageTitle";
import { useSelector } from "react-redux";
import { Image } from "antd";
import moment from "moment";

function Profile() {
  const { user } = useSelector((state) => state.users);
  
  return (
    <div className=" flex justify-center">
      <div className="flex flex-col gap-2 card w-25 mt-3 p-3">
        <div className="flex justify-center">
          <PageTitle title="Profile" />
        </div>
        <div className="flex justify-center profilepic">
        <Image src={'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg&ga=GA1.1.535321273.1705905256&semt=ais'}> </Image>
        </div>
        <div>
          <ul className="prof">
            <li className="text-lg">
              <b>Name:</b> {user?.name}
            </li>
            <li className="text-lg">
              <b>Email:</b> {user?.email}
            </li>
            <li className="text-lg">
              <b>Created on:</b> {moment (user.createdAt).format("DD-MM-YYYY")}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;
