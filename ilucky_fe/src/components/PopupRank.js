import React, { useState, useEffect } from "react";
import "./../css/PopupRank.css"; 
import { useTranslation } from "react-i18next";
import { callApi, mainUrl } from "../util/api/requestUtils";

const PopupRank = ({ onClose }) => {
  const { t } = useTranslation();
  
  const [rankedUsers, setRankedUsers] = useState([]);

  useEffect(() => {
    const fetchRankedUsers = async () => {
      try {
        var url = mainUrl + "/api/user/sorted-by-stars";
        const res = await callApi(url, "GET", {});
        if (res) {
            setRankedUsers(res);
        }
        console.log(res)
      } catch (error) {
        console.log("Error fetching ranked users:", error);
      }
    };

    fetchRankedUsers();
  }, []);

  return (
    <div className="popup-rank">
      <button className="close-btn" onClick={onClose}>
        {t("Close")}
      </button>
      <h2>{t("User Rankings")}</h2>
      <table>
        <thead>
          <tr>
            <th>{t("Username")}</th>
            <th>{t("Total Play")}</th>
            <th>{t("Total VND")}</th>
            <th>{t("Total Stars")}</th>
          </tr>
        </thead>
        <tbody>
          {rankedUsers.length > 0 ? (
            rankedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.totalplay}</td>
                <td>{user.totalVND}</td>
                <td>{user.totalstart}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">{t("No rankings available")}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PopupRank;
