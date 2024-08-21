import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllConversations } from "../../../redux/conversation/conversation.actions";
import { GetAllFeedbacks } from "../../../redux/feedbacks/feedbacks.actions";
import { GetAllStudents } from "../../../redux/students/student.actions";
import { GetAllUnivs } from "../../../redux/university/university.actions";

function HeadCards() {

  const univs = useSelector((state) => state.UniversityReducer.universitys);
  const students = useSelector((state) => state.StudentReducer.students);
  const feedbacks = useSelector((state) => state.feedbacksReducer.feedbacks);
  const { conversations } = useSelector((state) => state.ConvReducer);

  const dispatch = useDispatch()

  const reloadData = () => {
    dispatch(GetAllUnivs());
  };

  
  
  const reloadDataStu = () => {
    dispatch(GetAllStudents());
  };

  const reloadDatafEED = () => {
    dispatch(GetAllFeedbacks());
  };

  
  useEffect(() => {
    reloadData();
    reloadDataStu()
    reloadDatafEED()
    dispatch(getAllConversations());

  }, []);

  

  


  return (
    <>
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Students</span>
              <div className="text-900 font-medium text-xl">{students.length}</div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-orange-100 border-round"
              style={{ width: "2.5rem", height: "2.5rem" }}
            >
              <i className="pi pi-users text-orange-500 text-xl" />
            </div>
          </div>
          <span className="text-green-500 font-medium">newly registered </span>
          <span className="text-500">on Success Study</span>
        </div>
      </div>
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Contact</span>
              <div className="text-900 font-medium text-xl">{feedbacks.length}</div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-green-100 border-round"
              style={{ width: "2.5rem", height: "2.5rem" }}
            >
              <i className="pi pi-fw pi-thumbs-up text-green-500 text-xl" />
            </div>
          </div>
          <span className="text-green-500 font-medium">newly sent </span>
          <span className="text-500">on Success Study</span>
        </div>
      </div>
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                Universities
              </span>
              <div className="text-900 font-medium text-xl">{univs.length}</div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-cyan-100 border-round"
              style={{ width: "2.5rem", height: "2.5rem" }}
            >
              <i className="pi pi-building text-cyan-500 text-xl" />
            </div>
          </div>
          <span className="text-green-500 font-medium">newly registered </span>
          <span className="text-500">on Success Study</span>
        </div>
      </div>
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Messages</span>
              <div className="text-900 font-medium text-xl">{conversations.length}</div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-purple-100 border-round"
              style={{ width: "2.5rem", height: "2.5rem" }}
            >
              <i className="pi pi-comment text-purple-500 text-xl" />
            </div>
          </div>
          <span className="text-green-500 font-medium">newly saved </span>
          <span className="text-500">on Success Study</span>
        </div>
      </div>
    </>
  );
}

export default HeadCards;
