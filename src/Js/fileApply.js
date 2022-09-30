const ElmSelectStatus = document.querySelectorAll(".status-recruitment-file");

// thay đổi trạng thái của hồ sơ
function changeStatus() {
  ElmSelectStatus.forEach((element) => {
    element.onchange = function () {
      $(element)
        .removeClass("status-waitting")
        .removeClass("status-accept")
        .removeClass("status-reject");
      if ($($(element)).val() === "Chưa liên hệ") {
        $($(element)).addClass("status-waitting");
      } else if ($($(element)).val() === "Đạt") {
        $($(element)).addClass("status-accept");
      } else {
        $($(element)).addClass("status-reject");
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
