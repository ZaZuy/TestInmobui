/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import bgIcon from "../images/svgquatang/bgIcon.png";

import L from "../images/quatang/L.svg";
import U from "../images/quatang/U.svg";
import M from "../images/quatang/M.svg";
import I from "../images/quatang/I.svg";
import T from "../images/quatang/T.svg";
import E from "../images/quatang/E.svg";
import L1 from "../images/quatang/L1.svg";
import SS1 from "../images/quatang/SS1.svg";
import SS2 from "../images/quatang/SS2.svg";
import SS3 from "../images/quatang/SS3.svg";
import SS4 from "../images/quatang/SS4.svg";

import "./styles.css";

const arrFound = [
  {
    code: "L",
    icon: L,
  },
  {
    code: "I",
    icon: I,
  },
  {
    code: "T",
    icon: T,
  },
  {
    code: "E",
    icon: E,
  },
  {
    code: "SS1",
    icon: SS1,
  },
  {
    code: "SS2",
    icon: SS2,
  },
  {
    code: "SS3",
    icon: SS3,
  },
  {
    code: "SS4",
    icon: SS4,
  }
];

const PopupQua = ({ callback, data }) => {
  const found = arrFound.find((o) => o.code == data.code);
  return (
    <>
      <div className="main-qua ct-flex-col">
        <div>Chúc mừng</div>
        <div
          style={{ margin: "50px 0px 50px 0px", alignItems: "center" }}
          className="ct-flex-col"
        >
          {found ? (
            <img
              className="popup-icon-qua"
              width={120}
              height={120}
              style={{}}
              src={found.icon}
            />
          ) : (
            <img
              className="popup-icon-qua"
              width={120}
              height={120}
              style={{}}
              src={data.img}
            />
          )}

          <div style={{ marginTop: 10 }}>{data.giftMsg}</div>
        </div>
        <button onClick={() => callback()} className="button-ok">
          OK
        </button>
      </div>
      <div className="main-qua-sub ct-flex-col">
        <img className="" style={{}} src={bgIcon} />
      </div>
    </>
  );
};

export default PopupQua;
