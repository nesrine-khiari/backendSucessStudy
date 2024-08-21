import React from "react";
import {  useSelector } from "react-redux";

import Toast from "./components/Toast";
import MainRoutesComponent from "./routes/MainRoutesComponent";
import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useEffect } from "react";
import { socket } from "./functions/socket.io";
import { I18nextProvider } from "react-i18next";
import i18n from "./functions/i18n";
// ** ==>
function App() {
  
  const {user} = useSelector((state) => state.UserReducer);

  useEffect(()=>{
    return () => {
      socket.emit('leave',{data:user._id})
      socket.disconnect()
    };
  },[])


  const queryClient = new QueryClient()
  return (
    <div>
      <Toast />
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>

          <MainRoutesComponent />
        </I18nextProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
