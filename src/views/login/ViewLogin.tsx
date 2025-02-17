import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import logo from "../../assets/Logo.png";
import api from "../../api/api";

import "./login.css";

interface Props {}

/**
 * The login view for the app.
 */
const ViewLogin: React.FC<Props> = ({}) => {
  const [, navigate] = useLocation();
  const { t } = useTranslation();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

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
        <button
          disabled={!userName || !email}
          className="primary"
          onClick={async () => {
            const res = await api.login({ name: userName, email });

            if (res.ok) {
              navigate("/search");
            }
          }}
        >
          {t("loginButtonSignIn")}
        </button>
      </div>
    </div>
  );
};

export default ViewLogin;
