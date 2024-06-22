import { message } from 'antd';
import React, { children, useEffect, useState } from 'react'
import { getUserInfo } from '../apicalls/users';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../redux/usersSlice';
import { useNavigate } from 'react-router-dom';
import { HideLoader, ShowLoader } from '../redux/loadingSlice';

function ProtectedRoute({children}) {

const {user} = useSelector((state)=> state.users);

const navigate = useNavigate();
const [menu, setMenu] = useState([]);
const [collapsed, setCollapsed] = useState(false);
const userMenu = [
    {
        title: "Panel",
        paths: ["/","/user/write-exam"],
        icon: <i className="ri-home-line"></i>,
        onClick: ()=> navigate("/")
    },
    {
        title: "Reports",
        paths: ["/user/reports"],
        icon: <i className="ri-bar-chart-fill"></i>,
        onClick: ()=> navigate("/user/reports")
    },
    {
        title: "Profile",
        paths: ["/user/profile"],
        icon: <i className="ri-user-3-fill"></i>,
        onClick: ()=> navigate("/user/profile")
    },
    {
        title: "Logout",
        paths: ["/logout"],
        icon: <i className="ri-logout-box-line"></i>,
        onClick: ()=> {
            localStorage.removeItem("token");
            navigate("/login")
        }
    }
]
const adminMenu = [
    {
        title: "Dashboard",
        paths: ["/admin/dashboard"],
        icon: <i className="ri-dashboard-fill"></i>,
        onClick: ()=> navigate("/admin/dashboard")
    },
    {
        title: "Panel",
        paths: ["/","/user/write-exam"],
        icon: <i class="ri-flashlight-fill"></i>,
        onClick: ()=> navigate("/")
    },
    {
        title: "Exams",
        paths: ["/admin/exams","/admin/exams/add"],
        icon: <i className="ri-file-list-line"></i>,
        onClick: ()=> navigate("/admin/exams")
    },
    {
        title: "Reports",
        paths: ["/admin/reports"],
        icon: <i className="ri-bar-chart-fill"></i>,
        onClick: ()=> navigate("/admin/reports")
    },
    {
        title: "Profile",
        paths: ["/admin/profile","/user/profile"],
        icon: <i className="ri-user-3-fill"></i>,
        onClick: ()=> navigate("/admin/profile")
    },
    {
        title: "Logout",
        paths: ["/logout"],
        icon: <i className="ri-logout-box-line"></i>,
        onClick: ()=> {
            localStorage.removeItem("token");
            navigate("/login")
        }
    }
]

const dispatch = useDispatch()
const getUserData = async()=>{
    try {
        dispatch(ShowLoader());
        const response = await getUserInfo();
        dispatch(HideLoader());
        if(response.success){
            // message.success(response.message)
            dispatch(SetUser(response.data))
            if(response.data.isAdmin){
                setMenu(adminMenu);
            }else{
                setMenu(userMenu);
            }
        }else{
            message.error(response.message)
        }
    } catch (error) {
        navigate("/login");
        dispatch(HideLoader());
        message.error(error.message);
    }
};
    useEffect(()=>{
        if(localStorage.getItem("token")){
            getUserData();
        }else{
            navigate("/login");
        }
    },[]);

    const activeRoute = window.location.pathname;
    const getIsActiveOrNot = (paths)=>{
        if(paths.includes(activeRoute)){
            return true;
        }else{
            if(activeRoute.includes('/admin/exams/edit')&&paths.includes('/admin/exams')){
            return true;}
            if(activeRoute.includes("/user/write-exam") && paths.includes('/user/write-exam')){
                return true;
            }
        }
        return false;
    };

  return (
    <div className='layout'>
        <div className='flex gap-2 '>
            <div className='sidebar'>
                <div className='menu'>
                    {menu.map((item, index)=>{
                        return(
                        <div className={
                            `menu-item ${
                                getIsActiveOrNot(item.paths) && 'active-menu-item'}`
                        }
                        key={index}
                        onClick={item.onClick}
                        >
                            {item.icon}
                            {!collapsed && <span>{item.title}</span>}
                        </div>);
                    })}
                </div>
            </div>

            <div className='body'>
                <div className='header flex justify-between'>
                    {!collapsed && <i className="ri-close-line"
                        onClick={()=> setCollapsed(true)}
                        ></i>}
                    {collapsed && <i className='ri-menu-line'
                        onClick={()=> setCollapsed(false)}
                        ></i>}
                    <h1 className='text-2xl'>ONLINE QUIZ PORTAL </h1>
                    <div><div className='flex gap-1 items-center'>
                        <i className="ri-user-line"></i>
                        <h1 className='text-lg '>{user?.name}</h1>
                        </div>
                        <span>Role: {user?.isAdmin ? "Admin":"User"}</span>
                    </div>
                </div>
                <div className='content'>{children}</div>
            </div>
        </div>
    </div>
  )
}

export default ProtectedRoute;