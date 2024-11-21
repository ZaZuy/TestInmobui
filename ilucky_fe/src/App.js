import "./App.css";

import "./css/typo/typo.css";
import "./css/hc-canvas-luckwheel.css";
import hcLuckywheel from "./js/hc-canvas-luckwheel";
import { useEffect, useState, useRef } from "react";
import gui from "./util/gui";
import Background from "./images/free/bg1.png";
import Vongquay from "./images/free/Vongquay.png";
import HieuUngSao from "./images/free/HieuUngSao.png";
import IconKimQuay from "./images/icon/IconKimQuay.svg";
import IconLoa from "./images/icon/IconLoa.svg";
import IconLoaTat from "./images/icon/IconLoaTat.svg";
import bangdon from "./images/icon/bangdon.svg";
import Congratulation from "./images/icon/Congratulation.svg";
import LuckyRoulette from "./images/icon/LuckyRoulette.svg";

import IconVuongMieng from "./images/svg/IconVuongMieng.svg";
import IconTui from "./images/svg/IconTui.svg";
import IconSach from "./images/svg/IconSach.svg";
import logout from "./images/svg/logout.svg";
import { callApi, mainUrl } from "./util/api/requestUtils";
import React from "react";
import Icon1 from "./images/svgquatang/icon1.svg";
import IconSamsung from "./images/quatang/SS.svg";
import Gift from "./images/quatang/GIFT.svg";
import IconLetter from "./images/quatang/LETTER.svg";
import IconStars from "./images/quatang/STARS.svg";
import IconFBU from "./images/quatang/FBU.svg";
import mp3Main from "./mp3/lucky_spin.mp3";
import mp3Done from "./mp3/lucky_done.mp3";
import PopupQua from "./components/PopupQua";
import PopupHistory from "./components/PopupHistory";
import PopupHuongDan from "./components/PopupHuongDan";
import PopupRank from "./components/PopupRank";
import PopupBuyTurn from "./components/PopupBuyTurn";
import { useTranslation } from "react-i18next";
import "./util/i18n";
import PopupLogin from "./components/PopupLogin";
import { useNavigate } from "react-router-dom";

export const prizes = [
  {
    text: "Share",
    img: Icon1,
    number: 8, // 1%,
    giftCode: ["SHARE"],
    lucky: 0,
    label: "Share",
  },
  {
    text: "VND",
    img: IconFBU,
    number: 11,
    giftCode: ["200VND", "500VND", "1000VND", "10000VND"],
    lucky: 1,
    label: "10000 VND",
  },
  {
    text: "GoodLuck",
    img: Gift,
    number: 9,
    giftCode: ["UNLUCKY"],
    lucky: 2,
    label: "Chúc bạn may mắn lần sau",
  },
  {
    text: "Letter",
    img: IconLetter,
    number: 17,
    giftCode: ["L", "U", "M", "I", "T", "E", "L1"],
    lucky: 3,
    label: "Letter",
  },
  {
    text: "Galaxy S23",
    img: IconSamsung,
    number: 26, // 1%,
    giftCode: ["SAMSUNG1", "SAMSUNG2", "SAMSUNG3", "SAMSUNG4"],
    lucky: 4,
  },
  {
    // text: "Stars",
    text: "Stars",
    img: IconStars,
    giftCode: ["5STARS", "55STARS", "555STARS", "5555STARS"],
    lucky: 5,
    label: "5555 Stars",
  },
];

const convertStringToArray = (str) => {
  let converPath = str
    .split(/[&]+/)
    .map((i) => i.trim())
    .map((i) => ({
      type: i.split(/[=]+/)[0],
      value: i.split(/[=]+/)[1],
    }));
  return converPath;
};

const App = () => {
  
  const paramsArray = window.location.search
    ? convertStringToArray(
      window.location.search.slice(1, window.location.search.length)
    )
    : [];

  const languageUrl = paramsArray.find((o) => o.type === "lang")?.value || "VI";
  const tokenLocal = localStorage.getItem("token") || "";

  const [tokenState, setTokenState] = useState(tokenLocal);

  const [isMute, setIsMute] = useState(false);
  const [showQua, setShowQua] = useState(false);
  const [ItemTrungThuong, setItemTrungThuong] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [showRank, setShowRank] = useState(false);
  const [showHuongDan, setShowHuongDan] = useState(false);
  const [countPlayTurn, setCountPlayTurn] = useState(0);

  const [buyMore, setBuyMore] = useState(false);
  const [messageError, setMessageError] = useState("");

  const { t, i18n } = useTranslation();

  const audioRef = useRef(null);
  const audioDoneRef = useRef(null);

  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  const toggleLanguage = () => {
    const newLang = i18n.language === "VI" ? "EN" : "VI";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang); // Lưu vào localStorage để duy trì ngôn ngữ khi load lại trang
  };
  const handleLoginClick = () => {
    setShowLoginPopup(true);
  };

  const handleClosePopup = () => {
    setShowLoginPopup(false);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    window.location.reload()
  };
  

  useEffect(() => {
    // Kiểm tra token trong localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoggedIn(false);
          return;
        }
    
        const response = await fetch(`${mainUrl}/api/auth/validateToken?token=${token}`, {
          method: "GET", // Use GET method
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        if (!response.ok) {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error("Error verifying token:", err);
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    };
    

    // Kiểm tra token nếu có
    verifyToken();
  }, []);

  useEffect(() => {
    if(tokenLocal) {
      setTokenState(tokenLocal);
      wsGetLuckyPlayTurn();
    }
  });
  
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(mp3Main);
    }
    if (!audioDoneRef.current) {
      audioDoneRef.current = new Audio(mp3Done);
    }
    audioRef.current.muted = isMute;
    audioDoneRef.current.muted = isMute;
  }, [isMute]);

  useEffect(() => {
    i18n.changeLanguage(languageUrl || "VI");
  }, [languageUrl]);

  
  useEffect(() => {
    fetchData();
  });

  // Lấy số lượt chơi đang có
  const wsGetLuckyPlayTurn = async () => {
    try {
      const url = mainUrl + "/api/user/info";
      const res = await callApi(url, "POST", {});
      const { totalPlay } = res;
      if (res) {
        setCountPlayTurn(totalPlay || 0);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchData = () => {
    hcLuckywheel.init({
      id: "luckywheel",
      config: function (callback) {
        callback && callback(prizes);
      },
      mode: "both",
      getPrize: async function (callback) {
        audioRef.current.play();
        try {
          const url = mainUrl + "/api/lucky/play"
          const res = await callApi(url, "POST", {});
          const { gift } = res;
          const found =
            gift.id &&
            prizes.find((o) =>
              o.giftCode.find((k) => k === gift.id)
            );
          setItemTrungThuong({
            ...res,
            ...found,
            code: gift.id,
          });
          if (found) {
            callback && callback([found?.lucky || 0, found?.lucky || 0]);
          } else if (res?.totalPlay === 0) {
            alert("Hết lượt quay");
          }
        } catch (error) {
          console.log("error", error);
        }
      },
      gotBack: function (data) {
        audioRef.current.pause();
        audioDoneRef.current.play();
        audioRef.current.currentTime = 0;
        setShowQua(true);
        wsGetLuckyPlayTurn();
      },
    });
  };

  const callbackOk = async () => {
    setShowQua(false);
    audioDoneRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const onLogout = (v) => {
    localStorage.setItem("token", "");
    window.location.reload();
  };

  // Edit
  return (
    <div
      style={{
        backgroundColor: "#333",
        width: gui.screenWidth,
        height: gui.screenHeight,
        minHeight: 896,
        overflow: "hidden",
        display: "flex",
        position: "relative",
        alignItems: "center",
        flexDirection: "column",
        backgroundImage: `url(${Background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
     <button
        onClick={toggleLanguage}
        style={{
          position: "absolute",
          top: 50,
          right: 150,
          background: "#fff",
          borderRadius: "50%",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        {i18n.language === "VI" ? "EN" : "VI"}
      </button>
      <img
        onClick={() => {
          setIsMute((v) => !v);
        }}
        style={{
          position: "absolute",
          right: 80,
          top: 60,
          cursor: "pointer",
          zIndex: 2,
        }}
        src={!isMute ? IconLoa : IconLoaTat}
      />
      <div
        style={{
          display: "flex",
          zIndex: 1,
          position: "absolute",
          top: 92,
          width: gui.screenWidth,
          justifyContent: "center",
          alignItems: "center",
          left: 0,
          height: "auto",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            zIndex: 10,
            position: "relative",
            height: 105,
          }}
        >
          <img style={{}} src={bangdon} />
          <img
            style={{
              position: "absolute",
              zIndex: 12,
              left: 110,
              top: 25,
            }}
            src={showQua ? Congratulation : LuckyRoulette}
          />
        </div>

        <img
          style={{
            marginTop: -55,
            zIndex: 11,
            width: 390,
            height: 390,
          }}
          src={Vongquay}
        />
        <img
          style={{
            position: "absolute",
            top: -100,
            zIndex: 1,
          }}
          src={HieuUngSao}
        />
      </div>
      <section id="luckywheel" className="hc-luckywheel">
        <div className="hc-luckywheel-container">
          <canvas className="hc-luckywheel-canvas" width="500px" height="500px">
            Vòng Xoay May Mắn
          </canvas>
        </div>

        <img
          style={{
            position: "absolute",
            top: 131,
            left: 134,
            zIndex: 99,
          }}
          src={IconKimQuay}
        />
        <div
          className={`hc-luckywheel-btn ${countPlayTurn === 0 ? 'disabled' : ''}`}
        >
          {t("Spin")}
        </div>

        <div
          style={{
            position: "absolute",
            color: "#FFF",
            width: 210,
            left: 52,
            zIndex: 99,
            bottom: -160,
            fontSize: 14,
            fontWeight: "bold",
            textAlign: "center"
          }}
        >
          {t("you have")} {t("turns")} {countPlayTurn}
        </div>
      </section>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          zIndex: 98,
        }}
      >
        <div
          className="ct-flex-row"
          style={{
            marginBottom: 12,
            justifyContent: "space-between",
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <div className="ct-flex-col">
          <ItemOption
              icon={IconSach}
              onClick={(v) => setShowRank(true)}
              text={t("Rank")}
            />
            <ItemOption
              icon={IconSach}
              onClick={(v) => setShowHistory(true)}
              text={t("History")}
            />
            <ItemOption
              onClick={
                () => setBuyMore(true)
              }
              icon={IconTui}
              text={t("Buy more turn")}
            />
          </div>
          <div className="ct-flex-col">
            {/* <ItemOption icon={IconFree} /> */}
            <ItemOption
              onClick={(v) => setShowHuongDan(true)}
              icon={IconVuongMieng}
              text={t("Gift")}
            />

            <ItemOption
              onClick={isLoggedIn ? handleLogout : handleLoginClick}
              text={isLoggedIn ? t("Logout") : t("Login")}
              icon={logout}
            />
      {showLoginPopup && <PopupLogin onClose={handleClosePopup} onLoginSuccess={handleLoginClick} />}

          </div>
        </div>
      </div>
      {showQua ? (
        <PopupQua
          token={tokenState}
          languageUrl={languageUrl}
          data={ItemTrungThuong}
          callback={callbackOk}
        />
      ) : null}
      {buyMore ? (
        <PopupBuyTurn
          onClose={() => setBuyMore(false)}
          onSuccess={(e) => {
            setBuyMore(false);
            if (e.status == "0") {
              setMessageError("Bạn đã mua thêm lượt thành công.");
            } else {
              setMessageError(e.message)
            }
          }}
        />
      ) : null}

      {showHistory ? (
        <PopupHistory
          onClose={() => setShowHistory(false)}
        />
      ) : null}
      {showHuongDan ? (
        <PopupHuongDan
          onClose={() => setShowHuongDan(false)}
        />
      ) : null}
      {showRank ? (
        <PopupRank
          onClose={() => setShowRank(false)}
        />
      ) : null}
    </div>
  );
};

const ItemOption = ({ icon, text, onClick, type }) => (
  <div
    className="ct-flex-col"
    style={{
      marginTop: 10,
      marginBottom: text ? 0 : 14,
      fontSize: 12,
      color: "#FFF",
      cursor: "pointer",
    }}
    onClick={() => onClick && onClick(type)}
  >
    <img style={{}} src={icon} />
    {text ? text : ""}
  </div>
);

export default App;
