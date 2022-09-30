// show modal remove news job
function showModalNewsJob() {
  document.querySelectorAll(".news__recruitment_remove").forEach((element) => {
    element.onclick = function () {
      $("#removeNewsJobModal").modal();
      $(".newsJobName")[0].innerText = $(element)
        .parent()
        .parent()
        .children()
        .first()[0].innerText;
      const id = element.previousElementSibling.innerText;
      const ElmRemove = $(element).parent().parent();
      $(".btn-remove-job")[0].onclick = function () {
        removeJob(id, ElmRemove);
      };
    };
  });
}
showModalNewsJob();
function showModalNewsJobMobile() {
  document
    .querySelectorAll(".news__recruitment_remove-mobile")
    .forEach((element) => {
      $(element).on("click", function () {
        // const id = element.previousElementSibling.innerText;
        // console.log(id);
        $("#removeNewsJobModal").modal();

        $(".newsJobName")[0].innerText = $(element)
          .parent()
          .next()
          .children()
          .first()[0].innerText;
      });
    });
}
showModalNewsJobMobile();
// hide modal removeJob
function hideModalNewsJob() {
  $(".btn-cannel-remove-job").on("click", function () {
    $("#removeNewsJobModal").modal("hide");
  });
}
hideModalNewsJob();

// pagination

updateQueryParamPage("posting_status", "submit_deadline", "");

function removeJob(id, ElmRemove) {
  var req = {
    id,
  };
  var myJSON = JSON.stringify(req);
  $.ajax({
    url: "/index.html",
    type: "POST",
    contentType: "application/json; charset=utf-8",
    data: myJSON,
    dataType: "json",

    success: function (data) {
      ElmRemove.remove();
      $("#removeNewsJobModal").modal("hide");
      toastr.success("Xóa tin tuyển dụng thành công !");
    },
    error: function (xhr) {
      toastr.warning(xhr.responseJSON);
    },
  });
}
// pagination

updateQueryParamPage("posting_status", "submit_deadline", "");
