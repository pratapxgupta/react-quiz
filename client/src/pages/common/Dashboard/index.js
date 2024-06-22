import React, { useEffect, useState } from "react";
import {
  Layout,
  Card,
  Row,
  Col,
  Button,
  Typography,
  message,
  Progress,
} from "antd";
import "antd/dist/antd.min.js";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllExams, getAllQuestions } from "../../../apicalls/exams";
import { getUserInfo } from "../../../apicalls/users";
import { HideLoader, ShowLoader } from "../../../redux/loadingSlice";

function AdminDashboard() {
  const { Title } = Typography;
  const { Content } = Layout;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalExams, setTotalExams] = useState([]);
  const [totalCourses, setTotalCourses] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState([]);
  const { user } = useSelector((state) => state.users);

  const getExamsData = async () => {
    try {
      dispatch(ShowLoader());
      const response = await getAllExams();
      dispatch(HideLoader());
      if (response.success) {
        // message.success(response.message);
        setTotalExams(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoader());
      message.error(error.message);
    }
  };

  const getUsersData = async () => {
    try {
      const response = await getUserInfo();
      if (response.success) {
        // message.success(response.message);
        setTotalUsers(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const getQuestionsData = async () => {
    try {
      const response = await getAllQuestions();
      if (response.success) {
        setTotalQuestions(response.data);
      } else {
        // message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getExamsData();
    getUsersData();
    getQuestionsData();
  }, []);

  const QuestionUI = () => {
    const options1 = ["A. Message Reading", "B. Data Transfer", "C. Message Passing", "D. Data Binding"];

    return (
      <Card  title="Question UI" >
        <div className="flex gap-5 justify-between">
          <div className="flex flex-col">
            <Title level={5}> The feature by which one object can interact with another object is ?</Title>
            <div
              style={{
                margin: "-5px",
              }}
            >
              {options1.map((option) => (
                <Button key={option} style={{ margin: "8px" }}>
                  {option}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex mt-1">
            <div style={{ width: 400 }}>
              <Progress percent={80} size="small" status="active" />
              <Progress percent={30} size="small" status="active" />
              <Progress percent={70} size="small" status="exception" />
              <Progress percent={100} size="small" />
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div>
      <div className="text-center mt-2 mb-2">
        <PageTitle title={`Hi ${user?.name}, Welcome to Online Quiz Portal`} />
      </div>
      <div className="divider"></div>
      <div
        className="mt-1"
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          maxHeight: "408px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "8px",
        }}
      >
        <Layout style={{ borderRadius: "5px" }}>
          <Content style={{ margin: "5px" }}>
            <Row gutter={[16, 16]} justify="space-around" align="middle">
              <Col span={6}>
                <Card
                  className="dashboardComponent mt-1"
                  style={{
                    backgroundColor: "#e64141",
                  }}
                  onClick={() => navigate("/")}
                >
                  <h1 className="text-lg">Total Exams</h1>
                  <h1 className="text-lg">{totalExams.length}</h1>
                </Card>
              </Col>

              <Col span={6}>
                <Card
                  onClick={() => {
                    navigate("/admin/courses");
                  }}
                  className="dashboardComponent mt-1"
                  style={{
                    backgroundColor: "#0071e3",
                  }}
                >
                  <h1 className="text-lg">Total Courses</h1>
                  <h1 className="text-lg">{totalCourses.length}</h1>
                </Card>
              </Col>

              <Col span={6}>
                <Card
                  onClick={() => navigate("/admin/profile")}
                  className="dashboardComponent mt-1"
                  style={{
                    backgroundColor: "#f9b115",
                  }}
                >
                  <h1 className="text-lg">Total Users</h1>
                  <h1 className="text-lg">{user.name.length}</h1>
                </Card>
              </Col>
              <Col span={6}>
                <Card
                  onClick={() => navigate("/admin/exams")}
                  className="dashboardComponent mt-1"
                  style={{
                    backgroundColor: "#43d24c",
                  }}
                >
                  <h1 className="text-lg">Total Questions</h1>
                  <h1 className="text-lg">{totalQuestions.length}</h1>
                </Card>
              </Col>
            </Row>

            <div className="mt-2">
              <QuestionUI />
            </div>
          </Content>
        </Layout>
      </div>
    </div>
  );
}

export default AdminDashboard;
