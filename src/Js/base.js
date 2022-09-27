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
const ElmSignInEmail = document.querySelector("#sign-in-email");
const ElmSignInPassword = document.querySelector("#sign-in-password");
const ElmBtnSignIn = document.querySelector("#btn-sign-in");

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: "toast-top-center",
  preventDuplicates: true,
  onclick: null,
  showDuration: "300",
  hideDuration: "5000",
  timeOut: "5000",
  width: "700px",
  extendedTimeOut: "5000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

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
function validateEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
  if (phone.length <= 8 || phone.length > 20) {
    return false;
  }
  var re = /^\d+$/;
  return re.test(phone);
}

// Đăng nhập
function signInFunc(e) {
  event.preventDefault();
  let email = $("#sign-in-email").val();
  let password = $("#sign-in-password").val();
  if (!validateEmail(email)) {
    toastr.warning("định dạng email không hợp lệ");
    return;
  }
  if (password.length == 0) {
    toastr.warning("vui lòng nhập mật khẩu");
    return;
  }
  var req = {
    Email: email,
    Password: password,
    Remember: $("#sign-in-remember").prop("checked"),
  };
  var myJSON = JSON.stringify(req);
  $.ajax({
    url: "/login",
    type: "POST",
    contentType: "application/json; charset=utf-8",
    data: myJSON,
    dataType: "json",
    xhrFields: {
      withCredentials: true,
    },
    success: function (data) {
      $("#modal-signin").modal("hide");
      toastr.success("Đăng nhập thành công");
      setTimeout(function () {
        window.location.reload();
      }, 500);
    },
    error: function (xhr) {
      toastr.warning(xhr.responseJSON);
    },
  });
}
$("#sign-in-email, #sign-in-password").bind("enterKey", function (e) {
  signInFunc();
});
$("#sign-in-email, #sign-in-password").keyup(function (e) {
  if (e.keyCode == 13) {
    $(this).trigger("enterKey");
  }
});
function clickLogin() {
  $("#btn-sign-in").on("click", function () {
    signInFunc();
  });
}
clickLogin();

$("#btn-sign-up").on("click", function () {
  let email = $("#sign-up-email").val();
  let phone = $("#sign-up-phone").val();
  let password = $("#sign-up-password").val();
  let retype = $("#sign-up-retype-password").val();
  let fullname = $("#sign-up-fullname").val();
  if (!validateEmail(email)) {
    toastr.warning("định dạng email không hợp lệ");
    return;
  }

  if (!validatePhone(phone)) {
    toastr.warning("định dạng số điện thoại không hợp lệ");
    return;
  }
  if (password.length == 0) {
    toastr.warning("vui lòng nhập mật khẩu");
    return;
  }
  if (retype.length == 0) {
    toastr.warning("Vui lòng gõ lại mật khẩu");
    return;
  }
  if (retype != password) {
    toastr.warning("Mật khẩu gõ lại chưa trùng khớp");
    return;
  }
  if (fullname.length == 0) {
    toastr.warning("Vui lòng nhập họ tên");
    return;
  }
  let req = {
    Email: email,
    Password: password,
    FullName: fullname,
    Phone: phone,
  };
  let myJSON = JSON.stringify(req);

  $.ajax({
    url: "/sign-up",
    type: "POST",
    contentType: "application/json; charset=utf-8",
    data: myJSON,
    dataType: "json",
    success: function (data) {
      toastr.success(
        "Đăng ký tài khoản thành công. Một email kích hoạt đã được gửi vào hòm thư của bạn."
      );
      $("#sign-up-email").val("");
      $("#sign-up-phone").val("");
      $("#sign-up-password").val("");
      $("#sign-up-retype-password").val("");
      $("#sign-up-fullname").val("");
      $("#modal-signin").modal("hide");
    },
    error: function (xhr) {
      toastr.warning(xhr.responseJSON);
    },
  });
});
function openForgotPassword() {
  $("#loginModal").modal("hide");
  $("#forgot-password").modal();
}

$(".forgot-password-toggler").on("click", openForgotPassword);

$("#btn-forgot-password").on("click", function () {
  let email = $("#forgot-password-email").val();
  if (!validateEmail(email)) {
    toastr.warning("định dạng email không hợp lệ");
    return;
  }
  var req = {
    Email: email,
  };
  var myJSON = JSON.stringify(req);
  $.ajax({
    url: "/forgot-password",
    type: "POST",
    contentType: "application/json; charset=utf-8",
    data: myJSON,
    dataType: "json",
    success: function (data) {
      toastr.success(
        "Một email hướng dẫn sẽ được gửi đến bạn trong vài phút tới. Vui lòng kiểm tra email."
      );
      $("#forgot-password").modal("hide");
      $("#forgot-password-email").val("");
    },
    error: function (xhr) {
      toastr.warning(xhr.responseJSON);
    },
  });
});

// switch tab logout login

function switchLogoutLogin(classBtnClick, classElm1, classElm2) {
  $(classBtnClick).on("click", function () {
    $(classElm1).css("display", "none");
    $(classElm2).css("display", "flex");
  });
}
switchLogoutLogin(".switch-page-register", ".login-contain", ".logout-contain");
switchLogoutLogin(".switch-page-login", ".logout-contain", ".login-contain");

/*--------------- Đăng nhập bên thứ 3 -----------------*/
let GoogleClientId = $("#googleId").text();
let GithubClientId = $("#githubId").text();
(function (i, s, o, g, r, a, m) {
  i["GoogleAnalyticsObject"] = r;
  (i[r] =
    i[r] ||
    function () {
      (i[r].q = i[r].q || []).push(arguments);
    }),
    (i[r].l = 1 * new Date());
  (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");

ga("create", "UA-31629610-1", "auto");
ga("send", "pageview");
!(function (f, b, e, v, n, t, s) {
  if (f.fbq) return;
  n = f.fbq = function () {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  };
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = !0;
  n.version = "2.0";
  n.queue = [];
  t = b.createElement(e);
  t.async = !0;
  t.src = v;
  s = b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t, s);
})(
  window,
  document,
  "script",
  "https://connect.facebook.net/vi_VN/fbevents.js"
);
fbq("init", "1043327282441146");
fbq("track", "PageView");
window.fbAsyncInit = function () {
  FB.init({
    appId: "382077653781510",
    autoLogAppEvents: true,
    xfbml: true,
    version: "v13.0",
    channelURL: "",
    status: true,
    cookie: true,
    oauth: true,
  });
};

$(".github-sign-in").on("click", function () {
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${GithubClientId}`;
});

$(".facebook-sign-in").on("click", function () {
  FB.getLoginStatus(function (r) {
    if (r.status === "connected") {
      var req = {
        AccessToken: r.authResponse.accessToken,
      };
      var myJSON = JSON.stringify(req);
      $.ajax({
        url: "/login-facebook",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: myJSON,
        dataType: "json",
        success: function (data) {
          location.reload();
        },
        error: function (xhr) {
          toastr.warning(xhr.responseJSON);
          $("#modal-signin").modal("hide");
        },
      });
    } else {
      FB.login(
        function (response) {
          if (response.authResponse) {
            var req = {
              AccessToken: response.authResponse.accessToken,
            };
            var myJSON = JSON.stringify(req);
            $.ajax({
              url: "/login-facebook",
              type: "POST",
              contentType: "application/json; charset=utf-8",
              data: myJSON,
              dataType: "json",
              success: function (data) {
                location.reload();
              },
              error: function (xhr) {
                toastr.warning(xhr.responseJSON);
                $("#modal-signin").modal("hide");
              },
            });
          } else {
            $("#modal-signin").modal("hide");
          }
        },
        { scope: "email" }
      );
    }
  });
});

$(".google-sign-in").on("click", function () {
  gapi.load("auth2", function () {
    gapi.auth2.authorize(
      {
        client_id: `${GoogleClientId}`,
        scope: "profile email",
        response_type: "id_token permission",
      },
      function (response) {
        // if (response.error) {
        //   toastr.warning("Lỗi không thể đăng nhập Google")
        //   return;
        // }
        var req = {
          AccessToken: response.access_token,
        };
        var myJSON = JSON.stringify(req);
        $.ajax({
          url: "/login-google",
          type: "POST",
          contentType: "application/json; charset=utf-8",
          data: myJSON,
          dataType: "json",
          success: function (data) {
            location.reload();
            // if (data == true) {
            // 	location.reload();
            // } else {
            // 	$('#modal-signin').modal('hide')
            // 	$('#required-info-update').modal('show')
            // }
          },
          error: function (xhr) {
            toastr.warning(xhr.responseJSON);
            $("#modal-signin").modal("hide");
          },
        });
      }
    );
  });
});
