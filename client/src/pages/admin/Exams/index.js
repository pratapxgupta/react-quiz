import React, { useEffect } from 'react'
import PageTitle from '../../../components/PageTitle'
import { useNavigate } from 'react-router-dom'
import { Table, message } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoader, ShowLoader } from '../../../redux/loadingSlice';
import { deleteExamById, getAllExams } from '../../../apicalls/exams';

function Exams() {

const navigate = useNavigate();
const [exams, setExams] = React.useState([]);
const dispatch = useDispatch();

  

  const getExamsData = async()=>{
    try {
      dispatch(ShowLoader());
      const response = await getAllExams();
      dispatch(HideLoader());
      if(response.success){
        setExams(response.data);
      }else{
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoader());
      message.error(error.message);
    }
  };

  const deleteExam = async(examId)=>{
    try {
      dispatch(ShowLoader());
      const response = await deleteExamById({examId});
      dispatch(HideLoader());
      if(response.success){
        message.success(response.message);
        getExamsData();
      }else{
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoader());
      message.error(error.message);
    }
  };

  const columns = [{
    title: "Exam Name",
    dataIndex:"name"
  },{
    title: "College",
    dataIndex:"college"
  },{
    title: "Courses",
    dataIndex:"category"
  },{
    title: "Duration",
    dataIndex:"duration"
  },{
    title: "Total Marks",
    dataIndex:"totalMarks"
  },{
    title:"Passing Marks",
    dataIndex:"passingMarks"
  },{
    title: "Action",
    dataIndex:"action",
    render: (text,record)=>(
      <div className='flex gap-2'>
        <i className="ri-pencil-line"
        onClick={()=> navigate(`/admin/exams/edit/${record._id}`)}></i>
        <i className="ri-delete-bin-line" 
        onClick={()=>deleteExam(record._id)}
        ></i>
        </div>
    ),
  }
    ];

  useEffect(()=>{
    getExamsData();
  },[]);

  return (
    <div>
    <div className='flex justify-between mt-1'>
      <PageTitle title='Exams'/>
      <button className='primary-outlined-btn flex item-center'
      onClick={()=> navigate("/admin/exams/add")}>
        <i className='ri-add-line'></i>
        Add Exam
      </button>
    </div>
    <div className='divider'></div>

    <Table columns = {columns} dataSource={exams} />

    </div>
  )
}

export default Exams
