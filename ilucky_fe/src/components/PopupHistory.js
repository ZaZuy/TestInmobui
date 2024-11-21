/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import PopupHistory1 from "../images/svgPopup/PopupHistory.svg";
import IconX from "../images/svgPopup/IconX.svg";

import "./styles.css";
import { callApi, mainUrl } from "../util/api/requestUtils";
import { prizes } from "../App";
import { useTranslation } from "react-i18next";
import gui from "../util/gui";
import moment from "moment";

const formatDate = (dateString) => {
  return moment(dateString).format('DD/MM/YYYY,HH:mm:ss');
};

const PopupHistory = ({ onClose}) => {
  const [tab, setTab] = useState(1);
  const { t } = useTranslation();
  const [dataTab1, setDataTab1] = useState([]);

  useEffect(() => {
    fetchData();
  });


  const fetchData = async () => {
    try {

      const url = mainUrl + "/api/lucky/history"
      const res = await callApi(url, "POST", {});
      setDataTab1(res || []);
    } catch (error) {
      console.log("error", error);
    } finally {
      //   setLoading(false);
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

          <div
            style={{
              position: "absolute",
              left: 134,
              color: "#4C2626",
            }}
          >
            {t("History")}
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
            <>
                <div
                  className="ct-flex-row"
                  style={{
                    justifyContent: "space-between",
                    width: 300,
                    marginTop: 10,
                    color: "#EBB859",
                    fontSize: 12,
                  }}
                >
                  <div>{t("No.")}</div>
                  <div style={{ marginRight: 80 }}> {t("Prize")}</div>
                  <div>{t("Date/Time")}</div>
                </div>
                <div
                  style={{
                    height: 280,
                    width: "90%",
                    overflow: "auto",
                  }}
                >
                  {dataTab1.map((item, index) => {
                    if(item == null || item.gift == null) return null;
                    const foundIcon = prizes.find((o) =>
                      o.giftCode.find((e) => e === item.gift.id)
                    );
                    return (
                      <div
                        key={index.toString()}
                        className="ct-flex-row"
                        style={{
                          justifyContent: "space-between",
                          width: "96%",
                          fontSize: 13,
                          height: 25,
                          borderRadius: 3,
                          marginBottom: 8,
                          backgroundColor: "#B46C6C",
                          paddingRight: 6,
                          paddingLeft: 6,
                        }}
                      >
                        <div className="ct-flex-row">
                          <div>{index + 1}</div>
                          <img
                            style={{
                              width: 15,
                              height: 15,
                              marginLeft: 12,
                              marginRight: 6,
                            }}
                            src={foundIcon?.img}
                          />
                          <div title={item.gift.name}>
                            {item.gift.name.length > 10 
                              ? `${item.gift.name.substring(0, 10)}...` 
                              : item.gift.name}
                          </div>
                        </div>
                        <div>{formatDate(item.addTime)}</div>
                      </div>
                    );
                  })}
                </div>
              </>
          </div>
          <img className="" style={{}} src={PopupHistory1} />
        </div>
      </div>
    </>
  );
};

export default PopupHistory;
