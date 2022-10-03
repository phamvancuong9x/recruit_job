const ElmSelectStatus = document.querySelectorAll(".status-recruitment-file");

// thay đổi trạng thái của hồ sơ
function changeStatus() {
  ElmSelectStatus.forEach((element) => {
    element.onchange = function () {
      $(element)
        .removeClass("pending")
        .removeClass("approve")
        .removeClass("reject");
      if ($($(element)).val() === "Chưa liên hệ") {
        $($(element)).addClass("pending");
      } else if ($($(element)).val() === "Đạt") {
        $($(element)).addClass("approve");
      } else {
        $($(element)).addClass("reject");
      }
      const id = element.previousElementSibling.innerText;
      const status_file = element.value;
      var req = {
        id_file: id,
        status_file,
      };
      var myJSON = JSON.stringify(req);
      $.ajax({
        url: "index/html",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: myJSON,
        dataType: "json",

        success: function (data) {
          $("#modal-signin").modal("hide");
          toastr.success("Thay đổi trạng thái hồ sơ thành công ");
        },
        error: function (xhr) {
          toastr.warning(xhr.responseJSON);
        },
      });
    };
  });
}
changeStatus();

// pagination

updateQueryParamPage("position_recruit", "time_submit", "status_profile");
function showSearchEmpty() {
  const url = window.location.href;
  const ELmTrTable = document.querySelectorAll("tbody tr");

  if (url.includes("status") && ELmTrTable.length == 0) {
    $(".search-empty").css("display", "block");
    $(".table-empty").css("display", "none");
  }
}
showSearchEmpty();
