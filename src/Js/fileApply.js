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
    };
  });
}
changeStatus();
//filter recruitment file (lọc danh sách hồ sơ ứng tuyển)

function filterNameRecruitmentFile() {
  const pathNameUrl = window.location.pathname;

  $(".filter-name").on("change", function () {
    const filter_name = $(".filter-name").val();
    const filter_time = $(".filter-time").val();

    window.location.assign(
      `${pathNameUrl}?position_recruit=${filter_name}&time_submit=${filter_time}`
    );
  });
  $(".filter-time").on("change", function () {
    const filter_name = $(".filter-name").val();
    const filter_time = $(".filter-time").val();
    window.location.assign(
      `${pathNameUrl}?position_recruit=${filter_name}&time_submit=${filter_time}`
    );
  });
}
filterNameRecruitmentFile();
