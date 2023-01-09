// export const getKakaoInfo = () => {
//   function loginWithKakao() {
//     window.Kakao.Auth.authorize({
//       redirectUri: "http://localhost:8080/login",
//       scope: "profile_nickname,account_email",
//     });

//     this.getKakaoUserInfo();
//   }

//   function getKakaoUserInfo() {
//     window.Kakao.API.request({
//       url: "/v2/user/me",
//       data: {
//         property_keys: ["kakao_account.email", "kakao_account.profile.nickname"],
//       },
//     })
//       .then(function (response) {
//         console.log(response);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }

//   loginWithKakao();

//   return {
//     id,
//     name,
//     email,
//   };
// };
