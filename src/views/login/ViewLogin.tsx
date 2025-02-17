import React, { useState } from "react";
import logo from "../../assets/Logo.png";

import "./login.css";

interface Props {}

const ViewLogin: React.FC<Props> = ({}) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="view-login">
      <div className="panel-login">
        <img className="logo" src={logo} />
        <div className="fields">
          <label>
            Name
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
          <label>
            E-mail
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        </div>
        <button disabled={!userName || !email} className="primary">
          Sign in
        </button>
      </div>
    </div>
  );
};

export default ViewLogin;
