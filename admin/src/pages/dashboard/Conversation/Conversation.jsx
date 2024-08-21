import React, { useState, useEffect, useMemo, useRef } from "react";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Divider } from "primereact/divider";
import styles from "./styles.module.scss";

import { useSelector, useDispatch } from "react-redux";

import {
  getAllConversations,
  GetMessagesOfConv,
  sendMessage,
  updateConv,
} from "../../../redux/conversation/conversation.actions";

import AvatarComponent from "../../../MyComponents/DataDisplay/Avatar";
import { InputText } from "primereact/inputtext";
import MessageImg from "../../../assets/svgs/message.svg";
import { socket } from "../../../functions/socket.io";
import { isSousAdmin, isSuperAdmin } from "../../../custom/roles";

const Conversation = () => {
  const [Item, setItem] = useState({
    Subject: "",
    Content: "",
    emails: [],
    userType: "user",
  });
  const [Conv, setConv] = useState(null);
  const [msg, setmsg] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.UserReducer.user);
  const { conversations, messages } = useSelector((state) => state.ConvReducer);
  useEffect(()=>{
  },[msg]);
  useEffect(() => {
    

    socket.on("message", (data) => {
      console.log(data);
      setmsg((old) => [...old, data.text]);
      dispatch(getAllConversations());
    });
  }, []);

  useEffect(() => {
    if (Conv) {
      dispatch(GetMessagesOfConv(Conv));
      
    }

  }, [Conv]);

  useEffect(() => {
    setmsg(messages.map((mess) => ({ user: mess.user, message: mess.text })));
   
  }, [messages]);

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <h5 className="m-0 mr-2">Conversations</h5>
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            icon="pi pi-refresh"
            className="p-button-primary mr-2"
            onClick={() => { }}
          />
        </div>
      </React.Fragment>
    );
  };
  
  const UserDialogue = ({ conv }) => {
    const { user: us, seen } = conv;
  
    useEffect(() => {
      // Your effect code here if needed
    }, [conv]);
  
    return (
      <div
        onClick={() => {
          socket.emit('leave', { conversations: conv._id });
          setConv(conv);
          socket.emit("join", { user: user, conversation: conv._id });
          dispatch(updateConv(conv._id));
          window.scrollTo({ top: 1000 });
          
        }}
        className={`flex ${styles.dialItem}`}
        style={{
          backgroundColor: seen ? 'rgba(255, 223, 142, 0.6)' : '#f4ba41ff',
          position: 'relative', // Added position relative
        }}
      >
        {!seen && (
          <div
            className={styles.unseenIndicator}
            style={{
              position: 'absolute',
              top: "7px",
              right: "7px",
              width: '10px',
              height: '10px',
              backgroundColor: 'rgba(255, 223, 142, 0.6)',
              borderRadius: '50%',
            }}
          ></div>
        )}
        <AvatarComponent
          src={null}
          circle={true}
          name={us?.firstName || "N"}
          lastname={us?.lastName || "N"}
        />
        <div className="flex flex-column justify-content-center ml-2">
          <span className={seen ? "" : "font-semibold"}>{`${us?.firstName || "N"} ${us?.lastName || "N"}`}</span>
          <span className={`${styles.max1} text-600`}>{us?.email}</span>
        </div>
      </div>
    );
  };
  
  const UserDialogue2 = ({ conv }) => {
    const { user: us } = conv;
  

  
    return (
      <div
        onClick={() => {
          
          socket.emit('leave', { conversations: conv._id });
          setConv(conv);
          socket.emit("join", { user: user, conversation: conv._id });
          dispatch(updateConv(conv._id));
          
        }}
        className={`flex ${styles.dialItem}`}
   
      >        <AvatarComponent
      src={null}
      circle={true}
      name={us?.firstName || "N"}
      lastname={us?.lastName || "N"}
    />
    <div className=" flex flex-column justify-content-center ml-2  ">
      <span className=" font-semibold ">
        {`${us?.firstName || "N"} ${us?.lastName || "N"}`}
      </span>
      <span className={`${styles.max1} text-600`}>{us?.email}</span>
    </div></div>
    );
  };

  const LeftSide = () => {
    const [search, setSearch] = useState('')
    const [newConv, setnewConv] = useState([])
    useEffect(() => {
      setnewConv(conversations)
      
    },[conversations])
    useEffect(()=>{

     if(search.length===0)
      setnewConv(conversations)
      else{
        newConv.map(x=>{
          
          if(x.user){
            let name = x.user.firstName +" "+ x.user.lastName
            console.log(name.includes(search));
            if (name.includes(search)) {
              setnewConv([])
              setnewConv(old => [...old, x])
            }
          }
          /**/
        })
      }
    }, [search])

    return (
      <div className={styles.users_list}>
        <div className={styles.top_side}>
          {/*My Avatar*/}
          <div className={styles.avatar}>
            <AvatarComponent
              src={null}
              name={"Seeach"}
              lastname={"Eed"}
            />
          </div>
          <div className={`p-inputgroup ${styles.input_group}`}>
            <InputText placeholder="Keyword" onChange={e => setSearch(e.target.value)} />
            <Button icon="pi pi-search" />
          </div>
        </div>
        <div className={styles.BottomSide}>
          <div>
            {newConv.map((conv, index) => {
              return conv.user && <UserDialogue index={index} key={index} conv={conv} />;
            })}
          </div>
        </div>
      </div>
    );
  };

  const NoConversation = () => {
    return (
      <div className={styles.noComment}>
        <div className={styles.buble}>
          <img src={MessageImg} />
        </div>
        <p>Select Conversation</p>
      </div>
    );
  };

  const Message = ({ message }) => {
    const pos =
      isSousAdmin(message?.user) || isSuperAdmin(message?.user)
        ? "left"
        : "right";

    return message && message.user ? (
      <div className={`${styles.msg_container} ${styles[pos]}`}>
        <p className={`${styles.msg} `}>{message.message}</p>
      </div>
    ) : null;
  };

  const ShowConversation = () => {
    const [mess_text, set_mess_text] = useState("");

    const handle_change = (event) => {
      set_mess_text(event.target.value);
    };

    const handle_submit_enter = (event) => {
      if (event.key === "Enter") {
        socket.emit("sendMessage", { user: user, message: mess_text, discussionId: Conv._id });
        dispatch(
          sendMessage(mess_text, Conv, () => {
            set_mess_text("");
          })
        );
      }
    };

    const handle_submit = () => {
      socket.emit("sendMessage", { user: user, message: mess_text, discussionId: Conv._id });
      dispatch(
        sendMessage(mess_text, Conv, () => {
          set_mess_text("");
        })
      );
    };

    const bodySideRef = useRef(null);

    useEffect(() => {
       if (bodySideRef.current) {
        bodySideRef.current.scrollTo({
          top: bodySideRef.current.scrollHeight * 100, 
          behavior: "instant", 
        });
      }
    }, [Conv]); // Scroll whenever `msg` prop changes
  
    return (
      <div className={styles.Conversation}>
        <div className={styles.topside}>
          <UserDialogue2 conv={Conv} />
        </div>
        
        <div className={styles.bodySide} ref={bodySideRef}>
          {msg?.map((message, index) => {
            return <Message key={index} message={message} />;
          })}
        </div>
        
        <div className={styles.botSide}>
          <div className={`p-inputgroup ${styles.input_group}`}>
            
            <InputText
              placeholder="Message"
              onChange={handle_change}
              onKeyDown={handle_submit_enter}
            />
            <Button
              label="send"
              iconPos="right"
              icon="pi pi-send"
              onClick={handle_submit}
            />
          </div>
        </div>
      </div>
    );
  };

  const RightSide = () => {
    return (
      <div className={styles.conv_container}>
        {Conv ? <ShowConversation /> : <NoConversation />}
      </div>
    );
  };

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toolbar
            className="mb-4"
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          />

          <div className={styles.main}>
            <LeftSide />
            <RightSide />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;