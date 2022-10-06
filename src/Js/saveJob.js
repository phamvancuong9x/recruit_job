function removeJob() {
  const ELmBtnSaveJob = document.querySelectorAll(".icon-save");
  ELmBtnSaveJob.forEach((element) => {
    element.onclick = function () {
      data = { id: $(element).parent().prev().text() };
      $(element).css("display", "none");
      $(element).prev().css("display", "block");
      $(element).parent().parent().remove();
      $(".panigation").css("display", "none !important");
      showJobEmpty();
      $.ajax({
        url: "index.html",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        dataType: "json",
        processData: false,
        success: function (data) {
          $(element).css("display", "none");
          $(element).prev().css("display", "block");
          toastr.success("Đã bỏ lưu");
        },
        error: function (xhr) {
          toastr.warning(xhr.responseJSON);
        },
      });
    };
  });
}
removeJob();
function showJobEmpty() {
  const ELmTrTable = document.querySelector(".job__list > div");
  if (ELmTrTable === null) {
    $(".job-empty").css("display", "block");
  }
}
showJobEmpty();
updateQueryParamPage("", "", "");
