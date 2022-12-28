const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");

const privateKey = "secret";
const refreshKey = "refresh";

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
        accessToken: jwt.sign({ usesrId: id }, privateKey, {
          expiresIn: "30m",
        }), // 로그인에 성공하면 토큰을 만들어서 제공한다.
        refreshToken: jwt.sign({ usesrId: id }, refreshKey, {
          expiresIn: "10h",
        }), // accessToken 을 다시 받기 위한 refreshToken 발급
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
  const { id, password, isSocial, name, email } = req.body;

  if (isSocial) {
    userInfo.push({
      id,
      name,
      email,
      isSocial,
    });
    res.send("회원가입 성공");
    return;
  }

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

app.get("/userInfo", (req, res) => {
  const accessToken = req.header("access-token");
  jwt.verify(accessToken, privateKey, (err, decoded) => {
    // 백엔드에서 accessToken 에 대한 검증을 함
    if (err) {
      if (err.name === "TokenExpiredError")
        return res.status(401).send("토큰 유효기간 만료");
      res.status(500).send("에러");
      return;
    }
    res.status(200).json({
      userInfo,
    });
  });
});

app.get("/userInfo/:id", (req, res) => {
  const accessToken = req.header("access-token");
  const { id } = req.params; //

  jwt.verify(accessToken, privateKey, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError")
        return res.status(401).send("토큰 유효기간 만료");
      res.status(500).send("에러");
      return;
    }
    res.status(200).json({
      user: userInfo.find((item) => item.id === id),
    });
  });
});

app.get("/refreshToken", (req, res) => {
  const refreshToken = req.header("refresh-token");
  jwt.verify(refreshToken, refreshKey, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError")
        return res.status(401).send("토큰 유효기간 만료");
      res.status(500).send("에러");
      return;
    }
    res.status(200).json({
      accessToken: jwt.sign({ usesrId: decoded.id }, privateKey, {
        //accessToken 이 만료 되면 refreshToken을 이용해 accessToekn을 다시 받아온다.
        expiresIn: "30m",
      }),
    });
  });
});

const port = 3000;
app.listen(port, () => console.log(`${port}서버 실행 성공`)); // 서버실행 설정
