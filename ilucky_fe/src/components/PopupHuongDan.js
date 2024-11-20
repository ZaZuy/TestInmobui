/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import PopupHistory1 from "../images/svgPopup/PopupHistory.svg";
import IconX from "../images/svgPopup/IconX.svg";

import "./styles.css";
import { callApi } from "../util/api/requestUtils";

import Samsung from "../images/quatang/SS.svg";
import Motor from "../images/quatang/MOTOR.svg";

import { prizes } from "../App";
import { useTranslation } from "react-i18next";
import gui from "../util/gui";

const PopupHuongDan = ({ onClose}) => {
  const [tab, setTab] = useState(1);
  const { t } = useTranslation();

  const [dataTab2, setDataTab2] = useState([]);


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

          <div
            style={{
              position: "absolute",
              left: 105,
              top: 5,
              color: "#4C2626",
              fontSize: 12,
            }}
          >
            {t("Guide & Prize")}
          </div>

          <div
            style={{
              position: "absolute",
              height: 387,
              width: "100%",
              top: 26,
              left: 4,
              padding: "30px 16px 16px 16px",
            }}
          >
            <div
              className="ct-flex-row"
              style={{
                justifyContent: "center",
                fontSize: 14,
                width: 300,
              }}
            >
              <div
                onClick={() => setTab(1)}
                className="btn-history-1 ct-flex-row"
                style={{
                  background:
                    tab === 1
                      ? "linear-gradient(180deg, #FED575 9.09%, #E1A920 49.12%, #FDD78D 92.3%)"
                      : "linear-gradient(180deg, #EEEEEE 9.09%, #D6D4D4 49.12%, #EEEEEE 92.3%)",
                }}
              >
                {t("Prize")}
              </div>

            </div>
            <div
                style={{
                  height: 310,
                  width: "90%",
                  overflow: "auto",
                  marginTop: 12,
                }}
              >
                <div
                  style={{
                    height: 55,
                    width: "93%",
                    backgroundColor: "#B46C6C",
                    borderRadius: 6,
                    paddingLeft: 12,
                    border: "2px solid #7E3D3D",
                    marginBottom: 12,
                  }}
                  className="ct-flex-row border-width-item"
                >
                  <img
                    style={{ height: 40, width: 30, marginRight: 8 }}
                    src={Samsung}
                  />{" "}
                  Samsung Galaxy S23
                </div>
                <div
                  style={{
                    marginBottom: 12,
                    justifyContent: "space-between",
                  }}
                  className="ct-flex-row"
                >
                  <ItemIcon label={"Motor"} img={Motor} />
                  <ItemIcon label={prizes[1].label} img={prizes[1].img} />
                  <ItemIcon label={prizes[5].label} img={prizes[5].img} />

                </div>
                <div
                  style={{
                    marginBottom: 12,
                    justifyContent: "space-between",
                  }}
                  className="ct-flex-row"
                >
                <div style={{
                  borderRadius: 6,
                  // border: "2px solid #7E3D3D",
                  width: 86,
                  height: 86,
                  // backgroundColor: "#B46C6C",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                }}></div>
                </div>
              </div>
          </div>
          <img className="" style={{}} src={PopupHistory1} />
        </div>
      </div>
    </>
  );
};

const ItemIcon = ({ label, img }) => {
  return (
    <div
      style={{
        borderRadius: 6,
        border: "2px solid #7E3D3D",
        width: 86,
        height: 86,
        backgroundColor: "#B46C6C",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <img style={{ height: 40, width: 40 }} src={img || Samsung} />
      <div style={{ fontSize: 13 }}>{label || "Text"}</div>
    </div>
  );
};

export default PopupHuongDan;
