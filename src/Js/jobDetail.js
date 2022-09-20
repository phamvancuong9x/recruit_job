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
showModal();
(function checkFileUpload() {
  $("#submit-file").click(function () {
    if ($("#update-file")[0].files.length == "0") {
      toastr.warning("Vui lòng tải lên file CV");
      return;
    }
    var fileName = $("#update-file")[0].value;

    (idxDot = fileName.lastIndexOf(".") + 1),
      (extFile = fileName.substr(idxDot, fileName.length).toLowerCase());
    if (extFile == "html" || extFile == "jpeg" || extFile == "png") {
      console.log(extFile);
    } else {
      toastr.warning("Định dạng file không đúng");
    }
  });
})();
