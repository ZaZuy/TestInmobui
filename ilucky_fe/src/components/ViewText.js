/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";

import { useEffect, useState } from "react";
import { callApi } from "../util/api/requestUtils";
import { useTranslation } from "react-i18next";

import A from "../images/svg/A.svg";
import C from "../images/svg/C.svg";
import I from "../images/svg/I.svg";
import K from "../images/svg/K.svg";
import L from "../images/svg/L.svg";
import O from "../images/svg/O.svg";
import P from "../images/svg/P.svg";
import U from "../images/svg/U.svg";
import Y from "../images/svg/Y.svg";

const ViewText = ({ reload, isdn, token, languageUrl }) => {
  // const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (isdn) {
      fetchData();
    }
  }, [reload, isdn]);

  const fetchData = async () => {
    try {
      const dto = {
        wsCode: "wsGetHistoryGiftLetter",
        wsRequest: {
          isdn,
          token,
          gameCode: "LUCKYGAME",
          language: languageUrl || "VI",
        },
      };
      const res = await callApi("", "POST", dto);
      const { wsResponse } = res;
      setData(wsResponse || []);
    } catch (error) {
      console.log("error", error);
    } finally {
      //   setLoading(false);
    }
  };
return (
  <></>
)

};


const ItemText = ({ item, data, line }) => {
  const found = data.find((o) => o.giftCode === item.giftCode);
  return (
    <div
      style={{
        marginLeft: line ? 6 : 3,
        marginRight: line ? 6 : 3,
        backgroundColor: "#B46C6C",
        width: 40,
        height: 40,
        maxHeight: 40,
        justifyContent: "center",
        borderRadius: 4,
        border: "1px solid #7E3D3D",
        position: "relative",
        opacity: found ? 1 : 0.5,
      }}
      className="ct-flex-row"
    >
      <img style={{}} src={item.icon} />
      {found?.giftCount ? (
        <div
          style={{
            position: "absolute",
            fontWeight: 700,
            color: "#333",
            textShadow:
              "2px 0 #FFCB63, -2px 0 #FFCB63, 0 2px #FFCB63, 0 -2px #FFCB63, 1px 1px #FFCB63, -1px -1px #FFCB63, 1px -1px #FFCB63, -1px 1px #FFCB63",
            fontSize: 10,
            lineHeight: 14,
            marginTop: 15,
            right: 2,
            zIndex: 99,
          }}
        >
          {found.giftCount || ""}
        </div>
      ) : null}
    </div>
  );
};

export default ViewText;
