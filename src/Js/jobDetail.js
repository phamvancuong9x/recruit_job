const ElmTab1Title = document.querySelector(".job__content-tab1");
const ElmTab2Title = document.querySelector(".job__content-tab2");

function getID() {
  const url = window.location.pathname;
  const array = url.split("/");

  return (id = array[array.length - 1]);
}

(function tab() {
  ElmTab2Title.onclick = function tab() {
    $(".job__tab1-content").css("display", "none");
    $(".job__tab2-content").css("display", "block");
    ElmTab1Title.classList.remove("tab-active");
    ElmTab2Title.classList.add("tab-active");
  };

  ElmTab1Title.onclick = function tab() {
    $(".job__tab1-content").css("display", "block");
    $(".job__tab2-content").css("display", "none");
    ElmTab1Title.classList.add("tab-active");
    ElmTab2Title.classList.remove("tab-active");
  };
})();

function ckeckLogin() {
  if (true)
    $(".job__submit-file").click(function (e) {
      e.stopPropagation();
    });
}
ckeckLogin();

function showModal() {
  $(".job__submit-file").click(function () {
    $("#exampleModal").modal();
  });
}
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

showModal();

// lấy linhk file
function getLinkFile() {
  $("#update-file")[0].onchange = function () {
    const fileName = $("#update-file")[0].value;
    const idxDot = fileName.lastIndexOf(".") + 1;
    const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile == "doc" || extFile == "docx" || extFile == "pdf") {
      var data = new FormData();
      data.append("upload", $("#update-file")[0].files[0]);
      showNameFile();
      (async () => {
        const rawResponse = await fetch(
          "http://localhost:8087/api/upload-file",
          {
            method: "POST",
            body: data,
            credentials: "include",
          }
        )
          // .then(() => {
          //   // showNameFile();
          // })
          .catch(() => toastr.warning("Upload file lỗi. Vui lòng thử lại"));
        const content = await rawResponse.json();
        const { url } = content;
        checkFileUpload(url);
      })();
    } else {
      toastr.warning(
        "File upload không hợp lệ. File phải có định dạng .pdf, .doc, .docx và dung lượng <= 2MB)"
      );
    }
  };
}
getLinkFile();
// ckeck validate và submit
function checkFileUpload(linkFile) {
  $("#submit-file").click(function () {
    const user_name_value = $("#user-name").val();
    const user_email_value = $("#user-email").val();
    const user_phone_value = $("#user-phone").val();
    if (user_name_value.length < 6) {
      toastr.warning("Họ tên phải từ 6 kí tự trở lên");
      return;
    }
    if (!validateEmail(user_email_value)) {
      toastr.warning("định dạng email không hợp lệ");
      return;
    }
    if (!validatePhone(user_phone_value)) {
      toastr.warning("Định dạng số điện thoại không hợp lệ");
      return;
    }
    if ($("#update-file")[0].files.length == "0") {
      toastr.warning("Vui lòng tải lên file CV");
      return;
    }

    const data = {
      user_name: user_name_value,
      user_email: user_email_value,
      user_phone: user_phone_value,
      link_file_cv: linkFile,
    };
    if (linkFile) {
      $.ajax({
        url: `/viec-lam/${getID()}/apply`,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        dataType: "json",
        processData: false,
        success: function (data) {
          //close modal and send information to user
          $("#exampleModal").modal("hide");
          toastr.success(" Gửi CV thành công !");
        },
        error: function (xhr) {
          toastr.warning(xhr.responseJSON);
        },
      });
    }
  });
}
checkFileUpload();

// hiển thị tên file upload
function showNameFile() {
  const fileName = $("#update-file")[0].value;
  const fileNameDetail = fileName.split("\\").pop();

  if (fileNameDetail !== "") {
    $(".file__upload-name").css("display", "block");
    $(".file__upload-name-text").text(fileNameDetail);
  }
}
// xóa dữ liệu modal gửi cv
function clearDataModalCV() {
  $("#cannel__data-CV").click(function () {
    $("#user-name").val("");
    $("#user-email").val("");
    $("#user-phone").val("");
    $("#update-file")[0].value = null;
    $(".file__upload-name-text").text("");
    $(".file__upload-name").css("display", "none");
  });
}
clearDataModalCV();

// js login logout

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

function formatDate(date) {
  return date.split("/").reverse().join("/");
}

// hide button apply job
function hideApplyJob() {
  const date = new Date();
  const timedDeadline = new Date(
    formatDate($(".time_deadline-current").text())
  );
  console.log(timedDeadline, $(".time_deadline-current").text());
  if (timedDeadline < date) {
    $(".job__submit-file").css("display", "none");
    $(".expires-apply").css("display", "block");
  }
}
hideApplyJob();

function getID() {
  const url = window.location.pathname;
  const array = url.split("/");

  return array[array.length - 1];
}

function saveJob(selector1, selector2, infoSuccess) {
  $(selector1).on("click", function () {
    data = { id: getID() };
    $.ajax({
      url: "index.html",
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      dataType: "json",
      processData: false,
      success: function (data) {
        $(selector1).css("display", "none");
        $(".save-job").css("display", "block");
        toastr.success("Đã lưu việc làm thành công !");
      },
      error: function (xhr) {
        toastr.warning(xhr.responseJSON);
      },
    });
  });
}
saveJob();
function removeJob() {
  $(".save-job").on("click", function () {
    data = { id: getID() };

    $.ajax({
      url: "index.html",
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      dataType: "json",
      processData: false,
      success: function (data) {
        $(".save-no-job").css("display", "block");
        $(".save-job").css("display", "none");
        toastr.success("Đã bỏ lưu !");
      },
      error: function (xhr) {
        toastr.warning(xhr.responseJSON);
      },
    });
  });
}
removeJob();
