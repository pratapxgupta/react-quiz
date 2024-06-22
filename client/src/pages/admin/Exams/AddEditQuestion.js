import { Form, Modal, message } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import React from 'react'
import { addQuestionToExam, editQuestionById } from '../../../apicalls/exams';
import { useDispatch } from 'react-redux';
import { HideLoader, ShowLoader } from '../../../redux/loadingSlice';

function AddEditQuestion({
    showAddEditQuestionModal,
    setShowAddEditQuestionModal,
    refreshData,
    examId,
    selectedQuestion,
    setSelectedQuestion
}) {
    const dispatch = useDispatch();
    const onFinish = async(values)=>{
        try {
            dispatch(ShowLoader());
            const requiredPayload = {
                name: values.name,
                correctOption: values.correctOption,
                options:{
                    A: values.A,
                    B: values.B,
                    C: values.C,
                    D: values.D
                },
                    exam:examId
            };
            let response 
            if(selectedQuestion){
                response = await editQuestionById({
                    ...requiredPayload,
                    questionId: selectedQuestion._id
                })
            }else{
                response = await addQuestionToExam(requiredPayload);
            }
            if(response.success){
                message.success(response.message);
                refreshData();
                setShowAddEditQuestionModal(false);
            }else{
                message.error(response.message);
            }
            dispatch(HideLoader());
        } catch (error) {
            dispatch(HideLoader());
            message.error(error.message);
        }
    };  

  return (
      <Modal title={selectedQuestion ? "Edit Question":"Add Question"}
      visible={showAddEditQuestionModal} footer={false}
      onCancel={()=>{
        setShowAddEditQuestionModal(false)
        setSelectedQuestion(null)
      }}>
        <Form onFinish={onFinish} layout='vertical'
            initialValues={{
                name: selectedQuestion?.name,
                A: selectedQuestion?.options?.A,
                B: selectedQuestion?.options?.B,
                C: selectedQuestion?.options?.C,
                D: selectedQuestion?.options?.D,
                correctOption: selectedQuestion?.correctOption
            }}
        >
            <FormItem name="name" label="Question">
                <input type='text'/>
            </FormItem>
            <FormItem name="correctOption" label="Correct Option">
                <input type='text'/>
            </FormItem>

            <div className='flex gap-5'>
            <FormItem name="A" label="Option A">
                <input type='text'/>
            </FormItem>
            <FormItem name="B" label="Option B">
                <input type='text'/>
            </FormItem>
            </div>
            <div className='flex gap-5'>
            <FormItem name="C" label="Option C">
                <input type='text'/>
            </FormItem>
            <FormItem name="D" label="Option D">
                <input type='text'/>
            </FormItem>
            </div>

            <div className='flex justify-end gap-3'>
                <button className='primary-outlined-btn'
                type='button'
                onClick={()=> setShowAddEditQuestionModal(false)}>
                    Cancel
                </button>
                <button className='primary-contained-btn'>
                    Save
                </button>
            </div>
        </Form>
      </Modal>
  )
}

export default AddEditQuestion
