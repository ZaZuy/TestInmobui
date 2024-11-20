/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, {useState} from "react";
import PopupOTP from "../images/svgPopup/PopupCancel.svg";
import IconX from "../images/svgPopup/IconX.svg";

import "./styles.css";
import { callApi, mainUrl } from "../util/api/requestUtils";
import { useTranslation } from "react-i18next";
import gui from "../util/gui";

const PopupBuyTurn = ({ onClose, onSuccess}) => {
  const { t } = useTranslation();
  const [disabled, setDisabled] = useState(false);

  const onSubmit = async () => {
    // onClose();
    setDisabled(true);
    try {
      var url = mainUrl + "/api/lucky/buy";
      const res = await callApi(url, "POST", {});
      if (res) {
        onSuccess(res);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div className="main-history ct-flex-col">
        <div
          style={{
            position: "relative",
            width: 330,
            height: gui.screenHeight,
            marginTop: 80,
          }}
        >
          <div
            onClick={onClose}
            style={{
              position: "absolute",
              zIndex: 10000,
              top: 10,
              right: -16,
              cursor: "pointer",
            }}
          >
            <img className="" src={IconX} />
          </div>
          <div className="title-popup"
            style={{
              position: "absolute",
              left: 120,
              top: 7,
              color: "#4C2626",
              fontSize: 14,
              width: "100px",
              textAlign: "center"
            }}
          >
            Gura
          </div>
          <div
            style={{
              position: "absolute",
              height: 130,
              width: "88%",
              top: 24,
              left: 8,
              padding: "24px 16px 0 16px",
              justifyContent: "center",
            }}
            className="ct-flex-col"
          >
            <div
              style={{
                width: 118,
                height: 33,
                border: "1px solid #B46C6C",
                backgroundColor: "#FFF",
                borderRadius: 50,
                justifyContent: "center",
                color: "#000",
              }}
              className="ct-flex-row"
            >
              5
            </div>
            <div style={{ fontSize: 12, marginTop: 6 }}>
              {t("5000 VND/5 turns/day")}
            </div>
            <button
              style={{ marginTop: 8 }}
              onClick={onSubmit}
              className="button-ok"
              disabled={disabled}
            >
              {t("Buy")}
            </button>
          </div>
          <img className="" style={{}} src={PopupOTP} />
        </div>
      </div>
    </>
  );
};

export default PopupBuyTurn;
