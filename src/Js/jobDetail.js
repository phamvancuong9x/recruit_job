const ElmTab1Title = document.querySelector(".job__content-tab1");
const ElmTab2Title = document.querySelector(".job__content-tab2");

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
        url: "index.html",
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
