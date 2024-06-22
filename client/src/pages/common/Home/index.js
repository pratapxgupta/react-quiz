import React, { useEffect } from "react";
import { getAllExams } from "../../../apicalls/exams";
import { useDispatch, useSelector } from "react-redux";
import { HideLoader, ShowLoader } from "../../../redux/loadingSlice";
import { Row, message, Col } from "antd";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";

function Home() {
  const [exams, setExams] = React.useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  const getExams = async () => {
    try {
      dispatch(ShowLoader());
      const response = await getAllExams();
      if (response.success) {
        setExams(response.data);
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
    getExams();
  }, []);

  return (
    // user &&(put whole return code in this bracket if login is not working)
    <div className="">
      <div style={{marginBottom:"15px",marginTop:"15px"}} className="text-center">
        <PageTitle title={"Welcome to Exam Panel !"} />
      </div>
      <div className="divider"></div>

      <div
        style={{
          overflowY: "scroll",
          overflowX: "hidden",
          height: "438px",
          padding: "10px",
        }}
      >
        <Row gutter={[16, 16]}>
          {exams.map((exam) => (
            <Col span={6}>
              <div className="card flex flex-col gap-1 p-2 mt-1">
                <h1 className="text-2xl">{exam.name}</h1>
                <hr />
                <h1 className="text-md">category: {exam.category}</h1>
                <h1 className="text-md">Total Marks: {exam.totalMarks}</h1>
                <h1 className="text-md">Passing Marks: {exam.passingMarks}</h1>
                <h1 className="text-md">Duration: {exam.duration}</h1>

                <button
                  className="primary-contained-btn"
                  onClick={() => navigate(`/user/write-exam/${exam._id}`)}
                >
                  Start Exam
                </button>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Home;

