import { Form, message } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import React from 'react'
import {Link} from 'react-router-dom';
import { loginUser } from '../../../apicalls/users';
import { useDispatch } from 'react-redux';
import { HideLoader, ShowLoader } from '../../../redux/loadingSlice';

function Login() {
  const dispatch = useDispatch();
    const OnFinish = async (values)=>{
        try {
          dispatch(ShowLoader());
          const response = await loginUser(values);
          dispatch(HideLoader());
          if (response.success){
            message.success(response.message);
            localStorage.setItem("token",response.data);
            window.location.href = '/';
          }else{
            message.error(response.message);
          }
        } catch (error) {
          dispatch(HideLoader());
          message.error(error.message);
        }
    }

  return (
    <div style={{
      backgroundImage: `url(${process.env.PUBLIC_URL + "login-bgimg.jpg"})`,backgroundSize:"cover"
    }}
    className='flex justify-center item-center h-screen w-screen'>
      <div className='card w-25 p-3 bg-white'>
        <div className='flex flex-col'>
            <h1 className='text-2xl p-1'>LOGIN</h1>
            <div className='divider'></div>
            <Form layout='vertical' className='p-1' onFinish={OnFinish}>
                <FormItem 
                name='email'
                label='Email'>
                    <input type='text'/>
                </FormItem>
                <FormItem 
                name='password'
                label='Password'>
                    <input type='password'/>
                </FormItem>
                <div className='flex flex-col gap-2'>
                <button type='submit' className='primary-contained-btn' >LOGIN</button>
                <Link to='/register'>Not a Member? Register</Link>
                </div>
            </Form>
        </div>
      </div>
    </div>
  )
}

export default Login
