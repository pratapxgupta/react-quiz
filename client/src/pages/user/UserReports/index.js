import React, { useEffect } from "react";
import PageTitle from "../../../components/PageTitle";
import { Table, message } from "antd";
import { useDispatch } from "react-redux";
import { HideLoader, ShowLoader } from "../../../redux/loadingSlice";
import { getAllReportsByUser } from "../../../apicalls/reports";
import moment from "moment";

function UserReports() {
  const [reportsData, setReportsData] = React.useState([]);
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      render: (text,record)=>
      <>{record.exam?.name}</>
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text , record)=>
      <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
    },
    {
      title: "Total Marks",
      dataIndex: "totalQuestions",
      render: (text,record)=>
      <>{record.exam?.totalMarks}</>
  
    },
    {
        title: "Passing Marks",
        dataIndex: "correctAnswers",
        render: (text,record)=>
        <>{record.exam?.passingMarks}</>

    },
    {
        title: "Obtained Marks",
        dataIndex: "correctAnswers",
        render: (text,record)=>
        <>{record.result?.correctAnswers.length}</>
    },
    {
      title: "Verdict",
      dataIndex: "verdict",
      render: (text,record)=>
      <>{record.result.verdict}</>
    },
  ];

  const getData = async()=>{
    try {
        dispatch(ShowLoader());
        const response = await getAllReportsByUser();
        if(response.success){
            setReportsData(response.data);
        }else{
            message.error(response.message);
        }
        dispatch(HideLoader());
    } catch (error) {
        dispatch(HideLoader());
        message.error(error.message);
    }
  };

  useEffect(()=>{
    getData();
  },[]);

  return (
    <div>
      <PageTitle title="Reports" />
      <div className="divider"></div>
      <Table columns={columns} dataSource={reportsData} />
    </div>
  );
}

export default UserReports;
