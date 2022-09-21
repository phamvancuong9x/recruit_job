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
(function checkFileUpload() {
  $("#submit-file").click(function () {
    if ($("#user-name").val().length < 6) {
      toastr.warning("Họ tên phải từ 6 kí tự trở lên");
      return;
    }
    if (!validateEmail($("#user-email").val())) {
      toastr.warning("định dạng email không hợp lệ");
      return;
    }
    if (!validatePhone($("#user-phone").val())) {
      toastr.warning("Định dạng số điện thoại không hợp lệ");
      return;
    }
    if ($("#update-file")[0].files.length == "0") {
      toastr.warning("Vui lòng tải lên file CV");
      return;
    }
    const fileName = $("#update-file")[0].value;

    (idxDot = fileName.lastIndexOf(".") + 1),
      (extFile = fileName.substr(idxDot, fileName.length).toLowerCase());
    if (extFile == "doc" || extFile == "docx" || extFile == "pdf") {
      var formData = new FormData($("#form-submit-cv")[0]);
      $.ajax({
        url: "index.html",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: formData,
        processData: false,
        success: function (data) {
          toastr.success(" Gửi CV thành công !");
        },
        error: function (xhr) {
          toastr.warning(xhr.responseJSON);
        },
      });
    } else {
      toastr.warning(
        "File upload không hợp lệ. File phải có định dạng .pdf, .doc, .docx và dung lượng <= 2MB)"
      );
    }
  });
})();
function showNameFile() {
  $("#update-file").change(function () {
    const fileName = $("#update-file")[0].value;
    const fileNameDetail = fileName.split("\\").pop();

    if (fileNameDetail !== "") {
      $(".file__upload-name").css("display", "block");
      $(".file__upload-name-text").text(fileNameDetail);
    }
  });
}
showNameFile();

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
