// import React, { useEffect, useState } from "react";
// import { Table, message } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { HideLoader, ShowLoader } from "../../../redux/loadingSlice";
// import PageTitle from "../../../components/PageTitle";
// import { getUserInfo } from "../../../apicalls/users";
// import { Link } from "react-router-dom";
// import moment from "moment";

// function AdminProfile() {
//   const [user, setUser] = React.useState([]);
//   const dispatch = useDispatch();

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       render: (text, record) => <>{record.user.name}</>
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       render: (text, record) => <>{record.user.email}</>,
//     },
//     {
//       title: "Creation Date",
//       dataIndex: "createdAt",
//       render: (text, record) => (
//         <>{moment(user.createdAt).format("DD-MM-YYYY")}</>
//       ),
//     },
//     {
//       title: "Profile",
//       dataIndex: "profile",
//       render: (
//         <Link to={ `/admin/profile/$(record._id)` }>Go to {user?.name} profile</Link>
//       ),
//     },
//   ];

//   const getData = async () => {
//     try {
//       dispatch(ShowLoader());
//       const response = await getUserInfo();
//       if (response.success) {
//         setUser(response.data);
//       } else {
//         message.error(response.message);
//       }
//       dispatch(HideLoader());
//     } catch (error) {
//       dispatch(HideLoader());
//       message.error(error.message);
//     }
//   };
//   useEffect(()=>{
//     getUserInfo();
//   },[]);

//   return (
//     <div>
//       <PageTitle title="Profiles" />
//       <div className="divider"></div>
//       <div>
//         <Table columns={columns} dataSource={user} />
//       </div>
//     </div>
//   );
// }

// export default AdminProfile;

import React, { useEffect } from "react";
import PageTitle from "../../../components/PageTitle";
import { Table, message } from "antd";
import { useDispatch } from "react-redux";
import { HideLoader, ShowLoader } from "../../../redux/loadingSlice";
import { getAllReports } from "../../../apicalls/reports";
import moment from "moment";
import { Link } from "react-router-dom";

function AdminProfile() {
  const [reportsData, setReportsData] = React.useState([]);
  const dispatch = useDispatch();
  const [filters, setFilters] = React.useState({
    examName: "",
    userName: "",
  });

  const removeDuplicates = (array, key) => {
    const uniqueSet = new Set();
    const uniqueArray = [];


    for (const item of array) {

      const itemKey = item[key];

      const nestedUserName = item.user.name
      if (!uniqueSet.has(nestedUserName)) {
        uniqueSet.add(nestedUserName);
        uniqueArray.push(item);
      }
    }
    return uniqueArray;
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "userName",
      render: (text, record) => <>{record.user.name}</>,
    },
    {
      title: "Created on",
      dataIndex: "date",
      render: (text, record) => (
        <>{moment(record.user.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, record) => <>{record.user.email}</>,
    },
    {
      title: "Action",
      key: "action",
      render: (record) => <Link to={"/user/profile"}>View Profile</Link>,
    },
  ];

  const getData = async (tempFilters) => {
    try {
      dispatch(ShowLoader());
      const response = await getAllReports(tempFilters);
      if (response.success) {
        const uniqueUsers = removeDuplicates(response.data, "user.name");
        setReportsData(uniqueUsers);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoader());
    } catch (error) {
      dispatch(HideLoader());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData(filters);
  }, []);

  return (
    <div>
      <div className="mt-1 mb-1">
      <PageTitle title="Profiles" />
      </div>
      <div className="divider"></div>
      <div className="flex gap-2 mt-2 w-100">
        <input
          type="text"
          placeholder="Search by User Name"
          value={filters.userName}
          onChange={(e) => setFilters({ ...filters, userName: e.target.value })}
        />
        <button className="primary-outlined-btn" onClick={() => {
          setFilters({
             examName: "",userName: ""
          })
          getData({
            examName: "",userName: ""
         });
        }}>
          Clear
        </button>
        <button className="primary-contained-btn" onClick={() => getData(filters)}>
          Search
        </button>
      </div>
      <Table columns={columns} dataSource={reportsData} className="mt-2" />
    </div>
  );
}

export default AdminProfile;

// import React, { useEffect, useState } from "react";
// import PageTitle from "../../../components/PageTitle";
// import { Table, message } from "antd";
// import { Link } from "react-router-dom";
// import { getUserInfo } from "../../../apicalls/users";
// import moment from "moment";

// function AdminProfile() {
//   const [user, setUser] = useState([]);

//   const getUsersData = async () => {
//     try {
//       const response = await getUserInfo();
//       if (response.success) {
//         // message.success(response.message);
//         setUser(response.data);
//       } else {
//         message.error(response.message);
//       }
//     } catch (error) {
//       message.error(error.message);
//     }
//   };

//   const userProfilesColumns = [
//     {
//       title: "User Name",
//       dataIndex: "name",
//     },
//     {
//       title: "Email Name",
//       dataIndex: "email",
//     },
//     {
//       title: "Created At",
//       dataIndex: "createdAt",
//       render: (text, record) => (
//         <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
//       ),
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (record) => (
//         <Link to={`/admin/profiles/${record._id}`}>
//           <div className="flex gap-1 items-center viewProfile">
//             <i
//               className="ri-eye-line"
//             ></i>
//             View Profile
//           </div>
//         </Link>
//       ),
//     },
//   ];

//   useEffect(() => {
//     getUsersData();
//   }, []);

//   return (
//     <div>
//       <PageTitle title="User Profiles" />
//       <div className="divider"></div>
//       <div
//         style={{
//           overflowY: "auto",
//           overflowX: "hidden",
//           height: "388px",
//           border: "1px solid #ccc",
//           borderRadius: "5px",
//           padding: "8px",
//         }}
//       >
//         <Table>
//           columns={userProfilesColumns}
//           dataSource={user}
//           </Table>
//       </div>
//     </div>
//   );
// }

// export default AdminProfile;
