import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../functions/socket.io";

import {
  CreateConv,
  sendMessage,
} from "../../redux/conversation/conversation.actions";

import hi from "../../assets/images/hi.svg";
import supportsu from "../../assets/images/supportsu.webp";
import toggle from "../../assets/images/dropdown.webp";
import supportimage from "../../assets/images/toggle.webp";
import { useRef } from "react";

function Messenger() {
  const user = useSelector((state) => state.UserReducer);
  const { messages } = useSelector((state) => state.ConvReducer);
  const conversation = useSelector((state) => state.ConvReducer);

  const [msg, setmsg] = useState([]);
  const [showContact, setShowContact] = useState(false);

  const dispatch = useDispatch();
  const bottomRef = useRef()
  useEffect(() => {
    console.log(socket);
    socket.on("connect", () => {


      socket.on("onlineuser", (data) => {
        console.log(data);
      });
    });
    socket.on("message", (data) => {
      console.log(data);
      //   if(data?.text !=="Admin has joined the chat!"){

      //   }

      setmsg((old) => [...old, data.text]);


    });
    dispatch(CreateConv(user.user));

  }, []);

  useEffect(() => {
    bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
  }, [msg])

  useEffect(() => {

    if (showContact == true) {
      let datas = {
        idOwner: "data",
      }
      bottomRef.current.scrollTop = bottomRef.current.scrollHeight;

      socket.emit("join", { user: user.user, conversation: conversation.conversation._id })
    };
  }, [showContact]);

  useEffect(() => {

  }, [conversation])

  useEffect(() => {
    console.log("Messages:", messages)
    console.log("Type of Messages:", typeof messages);
    setmsg(
      messages.map((mess) => {
        return { user: mess.user, message: mess.text, date: mess.createdAt };
      })
    );
  }, [messages]);

  function stratConv() {
    if (!showContact) {
      dispatch(CreateConv(user.user));
    }
    setShowContact(!showContact);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      socket.emit("sendMessage", {
        user: user.user,
        message: event.target.value,
        discussionId: conversation.conversation._id
      });
      dispatch(
        sendMessage(event.target.value, () => {
          event.target.value = "";
        })
      );
    }
  };

  return (
    <div>
      <div
        className="box-messanger-user"
        style={{ display: showContact ? "block" : "none", zIndex: 9999 }}
      >
        <div className="Bonjour-section-box">
          <div className="d-flex align-items-center">
            <p className="text-pos-hi-box">Bonjour ! </p>
            <div className="">
              <img src={hi} alt="hi" width={"30"} />
            </div>
          </div>
          <div className="my-3">
            <p className="m-0" style={{ fontSize: "14px", fontWeight: "400" }}>
              Toujours en contact...
            </p>
          </div>
        </div>
        <div className="user-message-box-hi" ref={bottomRef}>
          {msg?.map((x, ind) => {
            return (


              <React.Fragment key={ind}>
                {x.user?.email != user.user?.email ? (
                  <div
                    className="msg-hi-support-owner py-3"
                    style={{ float: "right" }}
                  >
                    <div
                      className="d-flex align-items-center"
                      style={{ width: "100%" }}
                    >
                      <div className="me-2  img-box-raduis-border">
                        <img src={supportsu} alt="/img" />
                      </div>
                      <div className="msg-hi-support-owner-pre-2" style={{ maxWidth: "70%" }}>
                        <div className="card-message-say-text">
                          <p
                            className="m-0"
                            style={{
                              minHeight: "30px",
                              fontSize: "16px",
                              maxWidth: "100%",
                              wordWrap: "break-word",
                              overflowWrap: "break-word",

                            }}
                          >
                            {x.message || x}
                          </p>
                        </div>
                        <p
                          className="m-0"
                          style={{ fontSize: "10px", fontWeight: "700" }}
                        >
                          {x.date ? (
                            <>
                              {new Date(x.date).toLocaleDateString()} {new Date(x.date).toLocaleTimeString()}
                            </>
                          ) : null}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="msg-hi-support-owner py-3">
                      <div
                        className="d-flex align-items-center"
                        style={{ width: "100%" }}
                      >
                        <div className="msg-hi-support-owner-pre" style={{ maxWidth: "70%", marginLeft: "40px" }}>
                          <div className="card-message-say-text" >
                            <p
                              className="m-0"
                              style={{
                                minHeight: "30px",
                                fontSize: "16px",
                                maxWidth: "100%",
                                wordWrap: "break-word",
                                overflowWrap: "break-word",

                              }}
                            >
                              {x.message || x}
                            </p>
                          </div>
                          <p className="m-0" style={{ fontSize: "10px", fontWeight: "700" }}>
                            {x.date ? (
                              <>
                                {new Date(x.date).toLocaleDateString()} {new Date(x.date).toLocaleTimeString()}
                              </>
                            ) : null}
                          </p>
                        </div>
                        <div className="ms-2 img-box-raduis-border">
                          <img src={user.user.picture} alt="/img" />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </React.Fragment>
            );
          })}

          <div className="msg-hi-support" style={{ float: "right" }}></div>
        </div>
        <div style={{ height: "9%" }}>
          <input
            className="input-send-support-text"
            onKeyDown={handleKeyDown}
            type="text"
          />
        </div>
      </div>
      <div
        className="box-card d-flex justify-content-center align-items-center"
        onClick={stratConv}
      >
        <div className="">
          <img src={showContact ? toggle : supportimage} alt="up" width={"30"} />
        </div>
      </div>
    </div>
  );
}

export default Messenger;