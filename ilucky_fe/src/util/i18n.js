import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    EN: {
      translation: {
        Spin: "Spin",
        Star: "Star",
        "on-net call": "on-net call",
        Data: "Data",
        crossword: "crossword",
        "you have 4 turns": "you have 4 turns",
        "you have": "you have",
        turns: "turns",
        "Please enter OTP code sent to SMS":
          "Please enter OTP code sent to SMS",
        "OTP code error, request": "OTP code error, request",
        "OTP code": "OTP code",
        Confirm: "Confirm",
        "OTP code is wrong, please get OTP again":
          "OTP code is wrong, please get OTP again",
        "OTP has expired, please get OTP again":
          "OTP has expired, please get OTP again",
        "Congratulations, you have successfully registered for":
          "Congratulations, you have successfully registered for",
        "VIP MEMBER": "VIP MEMBER",
        Buy: "Buy",
        "5000 VND/5 turns/day": "5000 VND/5 turns/day",
        "Buy more turn": "Buy more turn",
        Cancel: "Cancel",
        "Do you want to cancel VIP MEMBER?":
          "Do you want to cancel VIP MEMBER?",
        "Cancel successful VIP MEMBER": "Cancel successful VIP MEMBER",
        History: "History",
        Gift: "Gift",
        "No.": "No.",
        Prize: "Prize",
        "Date/Time": "Date/Time",
        Turns: "Turns",
        "Guide & Prize": "Guide & Prize",
        Guide: "Guide",
        "Register VIP MEMBER with 200 kip/ 5 turns/day":
          "Register VIP MEMBER with 200 kip/ 5 turns/day",
        "Enter the phone number": "Enter the phone number",
        "Send OTP": "Send OTP",
        Login: "Login",
        Logout: "Logout",
        Spins: "Spins",
        "Matching correctly": "Matching correctly",
        PopupRegisterTitle: "Bạn chắc chắn muốn đăng ký VIP ?"
      },
    },
    VI: {
      translation: {
        Star: "Sao xếp hạng",
        "on-net call": "Phút gọi nội mạng",
        Data: "Data",
        crossword: "Ô chữ",
        Spin: "Quay",
        "you have 4 turns": "Bạn còn 4 lượt quay",
        "you have": "Bạn còn",
        turns: "lượt quay",
        "Please enter OTP code sent to SMS":
          "Vui lòng điền mã OTP được gửi về SMS",
        "OTP code error, request": "Mã OTP có vấn đề?",
        "OTP code": "Lấy lại OTP!",
        Confirm: "Xác nhận",
        "OTP code is wrong, please get OTP again":
          "Mã OTP sai, vui lòng lấy lại mã OTP",
        "OTP has expired, please get OTP again":
          "Mã OTP hết hạn, vui lòng lấy lại mã OTP",
        "Congratulations, you have successfully registered for":
          "Chúc mừng bạn đã đăng ký thành công",
        "VIP MEMBER": "VIP MEMBER",
        Buy: "Mua",
        "5000 VND/5 turns/day": "5000 VNĐ/5 lượt/ngày",
        "Buy more turn": "Mua thêm lượt",
        Cancel: "Hủy",
        "Do you want to cancel VIP MEMBER?": "Bạn có muốn hủy VIP MEMBER?",
        "Cancel successful VIP MEMBER": "Hủy thành công VIP MEMBER",
        History: "Lịch sử",
        Gift: "Giải thưởng",
        "No.": "STT",
        Prize: "Giải thưởng",
        "Date/Time": "Ngày/ thời gian",
        Turns: "Số lượt",
        "Guide & Prize": "Hướng dẫn và giải thưởng",
        Guide: "Hướng dẫn",
        "Register VIP MEMBER with 200 kip/ 5 turns/day":
          "Đăng ký VIP MÊMBER chỉ với 200 kip/ 5 lượt/ ngày",
        "Enter the phone number": "Điền số điện thoại",
        "Send OTP": "Gửi OTP",
        Login: "Đăng nhập",
        Logout: "Đăng xuất",
        Spins: "Đăng xuất",
        "Matching correctly": "Kết hợp chính xác",
        Confirm: "Xác nhận",
        PopupRegisterTitle: "Bạn chắc chắn muốn đăng ký VIP ?"
      },
    }
},
  lng: "VI",
  fallbackLng: "VI",

  interpolation: {
    escapeValue: false,
  },
});
