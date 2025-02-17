import React, { useState } from "react";
import logo from "../../assets/Logo.png";

import "./login.css";
import { useTranslation } from "react-i18next";

interface Props {}

const ViewLogin: React.FC<Props> = ({}) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const { t } = useTranslation();

  return (
    <div className="view-login">
      <div className="panel-login">
        <img className="logo" src={logo} />
        <div className="fields">
          <label>
            {t("loginFieldName")}
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
          <label>
            {t("loginFieldEmail")}
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        </div>
        <button disabled={!userName || !email} className="primary">
          {t("loginFieldSignIn")}
        </button>
      </div>
    </div>
  );
};

export default ViewLogin;
