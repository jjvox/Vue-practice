const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");

const privateKey = "secret";

app.use(express.json());
app.use(cors()); // 서버와 클라이언트의 도메인이 달라도 요청 가능하게 함.

const userInfo = [];

app.post("/login", (req, res) => {
  // 로그인 요청
  const { id, password } = req.body;
  const userIndex = userInfo.findIndex((item) => item.id === id);
  if (userIndex > -1) {
    // 아이디 일치 확인됨
    if (userInfo[userIndex].password === password) {
      // password도 일치 확인
      res.status(200).json({
        msg: "로그인 성공",
        accessToken: jwt.sign({ usesrId: id }, privateKey), // 로그인에 성공하면 토큰을 만들어서 제공한다.
      });
    } else {
      res.status(500).send("비밀번호가 다릅니다.");
    }
  } else {
    res.status(500).send("일치하는 아이디가 없습니다.");
  }
});

app.post("/signIn", (req, res) => {
  // 회원가입 요청
  const { id, password } = req.body;
  if (userInfo.findIndex((item) => item.id === id) > -1) {
    res.status(500).send("이미 사용중인 아이디 입니다.");
    return;
  }
  userInfo.push({
    id,
    password,
  });
  res.send("회원가입 성공");
});

const port = 3000;
app.listen(port, () => console.log(`${port}서버 실행 성공`)); // 서버실행 설정
