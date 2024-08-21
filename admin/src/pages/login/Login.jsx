import React, { useState, useEffect } from "react";
import girlImg from "../../assets/images/login1.png";
import ManImg from "../../assets/images/login2.png";

import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import styles from "./login.module.scss";
import { ActionLogin } from "../../redux/user/user.actions";
import { useDispatch } from "react-redux";

function Login() {
  
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handle_change = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    dispatch(ActionLogin(user, () => {}));
  };

  useEffect(() => {
    // sizes : 12, 13, 14, 15, 16
    document.documentElement.style.fontSize = 14 + "px";
  }, []);

  return (
    <div className={styles.login}>
      <div className="flex align-items-center justify-content-center ">
        <img src={girlImg} className={styles.left_img} />
        <div className={styles.login_card}>
          <h2 className={styles.title}>Sign in to our platform</h2>
          <div className="p-fluid">
            <div className="field">
              <label htmlFor="name" className={styles.label}>
                Your Email
              </label>
              <span className="p-input-icon-left">
                <i className="pi pi-envelope" />
                <InputText
                  autoFocus
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handle_change}
                  placeholder="example@company.com"
                />
              </span>
            </div>
            <div className="field">
              <label htmlFor="name" className={styles.label}>
                Your Password
              </label>
              <span className="p-input-icon-left">
                <i className="pi pi-unlock" />
                <InputText
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handle_change}
                  placeholder="Password"
                />
              </span>
            </div>
            <div className={`field ${styles.remember}`}>
              <div className="formgrid grid">
                <div className="field-radiobutton col-6">
                  <Checkbox inputId="published1" name="published" />
                  <label htmlFor="published1">Remember</label>
                </div>
              </div>
              <div className={styles.forget_pass}>Forget Password ?</div>
            </div>
            <Button
              label="Sign In"
              className="p-button-primary"
              onClick={handleSubmit}
            />
          </div>
        </div>
        <img src={ManImg} className={styles.right_img} />
      </div>
    </div>
  );
}

export default Login;
