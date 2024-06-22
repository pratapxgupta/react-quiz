import React, { useEffect } from "react";
import PageTitle from "../../../components/PageTitle";
import { Col, Form, Row, Select, Table, Tabs, message } from "antd";
import { addExam, deleteQuestionById, editExamById, getExamById } from "../../../apicalls/exams";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoader, ShowLoader } from "../../../redux/loadingSlice";
import TabPane from "antd/es/tabs/TabPane";
import AddEditQuestion from "./AddEditQuestion";
// const {TabPane} = Tabs;

function AddEditExam() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [examData, setExamData] = React.useState(null);
  const [showAddEditQuestionModal, setShowAddEditQuestionModal] = React.useState(false);
  const [selectedQuestion, setSelectedQuestion] = React.useState(null);
  const params = useParams();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoader());
      let response;
      if(params.id){
        response = await editExamById({...values, examId: params.id});
      }else{
        response = await addExam(values);
      }
      if (response.success) {
        message.success(response.message);
        navigate("/admin/exams");
      } else {
        message.error(response.message);
      }
      dispatch(HideLoader());
    } catch (error) {
      dispatch(HideLoader());
      message.error(error.message);
    }
  };

  const getExamData = async () => {
    try {
      dispatch(ShowLoader());
      const response = await getExamById({ examId: params.id });
      dispatch(HideLoader());
      if (response.success) {
        setExamData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoader());
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (params.id) {
      getExamData();
    }
  }, []);

  const deleteQuestion = async(questionId)=>{
    try {
      dispatch(ShowLoader());
      const response = await deleteQuestionById({
        questionId,
        examId : params.id
      });
      dispatch(HideLoader());
      if(response.success){
        message.success(response.message)
        getExamData();
      }else{
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoader());
      message.error(error.message);
    }

  }

  const questionsColumns =[
  {
    title: "Questions",
    dataIndex:"name"
  },
  {
    title: "Options",
    dataIndex: "options",
    render: (text, record)=>{
      return Object.keys(record.options).map((key)=>{
        return <div>{key}: {record.options[key]}</div>;
      })
    }
  },
  {
    title: "Correct Option",
    dataIndex: "correctOption",
    render:(text,record)=>{
      return ` ${record.correctOption}: ${record.options[record.correctOption]}`;
    }
  },
  {
    title: 'Action',
    dataIndex: "action",
    render:(text,record)=>(
      <div className='flex gap-2'>
        <i className="ri-pencil-line"
        onClick={()=> {
          setSelectedQuestion(record);
          setShowAddEditQuestionModal(true);
        }}></i>
        <i className="ri-delete-bin-line" 
        onClick={()=>{
          deleteQuestion(record._id);
        }}
        ></i>
        </div>
    )
  }
]

  return (
    <div>
      <div className="mt-1 mb-1">
        <PageTitle title={params.id ? "Edit Exam" : "Add Exam"} />
      </div>
      <div className="divider"></div>

      {(examData || !params.id) && (
        <Form layout="vertical" onFinish={onFinish} initialValues={examData}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Exam Details" key="1">
              <Row gutter={[20, 10]}>
                <Col span={8}>
                  <Form.Item label="Exam Name" name="name">
                    <input type="text" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="College" name="college">
                    <select name="" id="">
                      <option value="">Select College</option>
                      <option value="GD Goenka University">GD Goenka University</option>
                      <option value="Manav Rachna University">Manav Rachna University</option>
                      <option value="Gurgrgam University">Gurgrgam University</option>
                      <option value="KR Mangalam University">KR Mangalam University</option>
                      <option value="Sushant University">Sushant University</option>
                      <option value="Ansal University">Ansal University</option>
                      <option value="SGT University">SGT University</option>
                    </select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Courses" name="category">
                    <select name="" id="">
                      <option value="">Select Courses</option>
                      <option value="BCA">BCA</option>
                      <option value="MCA">MCA</option>
                      <option value="B.Tech">B.Tech</option>
                      <option value="M.Tech">M.Tech</option>
                      <option value="B.Pharma">B.Pharma</option>
                      <option value="M.Pharma">M.Pharma</option>
                      <option value="B.Com">B.Com</option>
                      <option value="M.Com">M.Com</option>
                      <option value="B.Sc">B.Sc</option>
                      <option value="M.Sc">M.Sc</option>
                    </select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Exam Duration" name="duration">
                    <input type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Total Marks" name="totalMarks">
                    <input type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Passing Marks" name="passingMarks">
                    <input type="number" />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex justify-end gap-2">
          <button className="primary-outlined-btn" type="button"
          onClick={()=> navigate('/admin/exams')}>
              Cancel
            </button>
            <button className="primary-contained-btn" type="submit">
              Save
            </button>
              </div>
            </TabPane>
            {params.id &&(
              <TabPane tab="Questions" key="2">
              <div className="flex justify-end">
                
              <button className="primary-outlined-btn mb-1"
                type="button" onClick={()=>setShowAddEditQuestionModal(true)}>
                  Add Questions
              </button>
              </div>

              <Table 
              columns={questionsColumns}
              dataSource={examData?.questions || []}
              />
              </TabPane>
            )}
          </Tabs>
        </Form>
      )}
      {showAddEditQuestionModal && (
      <AddEditQuestion 
        setShowAddEditQuestionModal={setShowAddEditQuestionModal}
        showAddEditQuestionModal={showAddEditQuestionModal}
        examId={params.id}
        refreshData={getExamData}
        selectedQuestion = {selectedQuestion}
        setSelectedQuestion={setSelectedQuestion}
      />)}
    </div>
  );
}

export default AddEditExam;
