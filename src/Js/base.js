const ElmBtnLogout = document.querySelector(".logout");
const ElmBtnLogoutMobile = document.querySelector(".logout-mobile");
const ElmBtnBar = document.querySelector(".bar-icon");
const ElmNavMenuMobile = document.querySelector(".nav__menu-mobile");
const ElmHeaderUser = document.querySelector(".header__user");
const ElmHeaderUserList = document.querySelector(".header__user-list");
const ElmHeaderUserMobile = document.querySelector(".header__user-mobile");
const ElmHeaderUserListMobile = document.querySelector(
  ".header__user-list-mobile"
);
const ElmBtnLogin = document.querySelector(".login");
const ElmBtnLoginMobile = document.querySelector(".login-mobile");

(function toggleSubMenu() {
  if (!ElmBtnBar) return;
  ElmBtnBar.onclick = function () {
    ElmNavMenuMobile.classList.toggle("menu__mobile-active");
  };
  ElmBtnLoginMobile.onclick = function (e) {
    e.stopPropagation();
    ElmNavMenuMobile.classList.remove("menu__mobile-active");
  };
})();
function toggleUserList(Btn, ElmChange) {
  if (!Btn) return;
  Btn.onclick = function () {
    ElmChange.classList.toggle("header__user-active");
  };
}
toggleUserList(ElmHeaderUser, ElmHeaderUserList);
toggleUserList(ElmHeaderUserMobile, ElmHeaderUserListMobile);

function Logout(Btn, ElmChange) {
  if (!Btn) return;
  Btn.onclick = function (e) {
    e.stopPropagation();
    Btn.style.display = "block";
    ElmChange.style.display = "none";
  };
}
Logout(ElmBtnLogout, ElmHeaderUser);
Logout(ElmBtnLogoutMobile, ElmHeaderUserMobile);

const ElmTabLogin = document.querySelector("#tab__title-login");
const ElmTabRegister = document.querySelector("#tab__title-register");
const ElmTabLoginContent = document.querySelector(".tab__login-content");
const ElmTabRegisterContent = document.querySelector(".tab__register-content");
function tabLoginRegister(
  Btn,
  ElmTabTitle1,
  ElmTabTitle2,
  ElmTabContent1,
  ElmTabContent2
) {
  if (
    !Btn ||
    !ElmTabTitle1 ||
    !ElmTabTitle2 ||
    !ElmTabContent1 ||
    !ElmTabContent2
  )
    return;
  Btn.onclick = function () {
    ElmTabTitle1.classList.add("tab-active");
    ElmTabTitle2.classList.remove("tab-active");
    ElmTabContent1.classList.add("tab-content-active");
    ElmTabContent2.classList.remove("tab-content-active");
  };
}
tabLoginRegister(
  ElmTabLogin,
  ElmTabLogin,
  ElmTabRegister,
  ElmTabLoginContent,
  ElmTabRegisterContent
);
tabLoginRegister(
  ElmTabRegister,
  ElmTabRegister,
  ElmTabLogin,
  ElmTabRegisterContent,
  ElmTabLoginContent
);

const ElmSignInEmail = document.querySelector("#sign-in-email");
const ElmSignInPassword = document.querySelector("#sign-in-password");
const ElmBtnSignIn = document.querySelector("#btn-sign-in");

let clickBtnSignIn = false;
function checkValidateFormLogin() {
  if (!ElmBtnSignIn) return;
  ElmBtnSignIn.onclick = function (e) {
    clickBtnSignIn = true;
    if (!ElmSignInEmail.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      ElmSignInEmail.nextElementSibling.style.display = "block";
      e.stopPropagation();
    } else {
      ElmSignInEmail.nextElementSibling.style.display = "none";
    }
    if (ElmSignInPassword.value === "") {
      ElmSignInPassword.nextElementSibling.style.display = "block";
      e.stopPropagation();
    } else {
      ElmSignInPassword.nextElementSibling.style.display = "none";
    }
  };

  ElmSignInEmail.oninput = function () {
    if (!clickBtnSignIn) return;
    if (!ElmSignInEmail.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      ElmSignInEmail.nextElementSibling.style.display = "block";
    } else {
      ElmSignInEmail.nextElementSibling.style.display = "none";
    }
  };
  ElmSignInPassword.oninput = function () {
    if (!clickBtnSignIn) return;
    if (ElmSignInPassword.value === "") {
      ElmSignInPassword.nextElementSibling.style.display = "block";
    } else {
      ElmSignInPassword.nextElementSibling.style.display = "none";
    }
  };
}
checkValidateFormLogin();

// function checkValidateSignUpName() {
//   // if()
// }
