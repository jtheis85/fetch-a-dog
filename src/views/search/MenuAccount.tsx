import React from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "wouter/use-hash-location";

import api from "../../api/api";
import MenuButton from "../../components/menu-button/MenuButton";

import { FaUser } from "react-icons/fa6";

interface Props {}

/**
 * A menu button for the user's account actions. Currently this is just for
 * logging out, but could display the logged in user name and email.
 */
const MenuAccount: React.FC<Props> = ({}) => {
  const { t } = useTranslation();

  return (
    <MenuButton
      menuOptionContents={{ logout: <>{t("searchMenuItemSignOut")}</> }}
      onChange={async () => {
        const res = await api.logout();

        // If we get a 401 back, the user's token has likely expired, and
        // they need to log in again anyway.
        // TODO: Consider unconditionally navigating to login to prevent
        // cases where the user is stuck not being able to get there due
        // to a server error that logging in again would fix.
        if (res.ok || res.status === 401) {
          navigate("/login");
        }
      }}
    >
      <FaUser />
    </MenuButton>
  );
};

export default MenuAccount;
