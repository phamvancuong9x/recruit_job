// show modal remove news job
function showModalNewsJob() {
  document.querySelectorAll(".news__recruitment_remove").forEach((element) => {
    element.onclick = function () {
      console.log(element);
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
        const id = element.previousElementSibling.innerText;
        $("#removeNewsJobModal").modal();

        $(".newsJobName")[0].innerText = $(element)
          .parent()
          .parent()
          .children()
          .first()
          .children()[0].innerText;
        const ElmRemove = $(element).parent().parent().parent();
        $(".btn-remove-job")[0].onclick = function () {
          removeJob(id, ElmRemove);
        };
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

function tableEmpty() {
  const ELmTrTable = document.querySelectorAll("tr");
  if (ELmTrTable.length == 1) {
    $(".table-empty").css("display", "block");
    $(".pagination").css("display", "none");
  }
}

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
      tableEmpty();
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

function showSearchEmpty() {
  const url = window.location.href;
  const ELmTrTable = document.querySelectorAll("tr");

  if (url.includes("status") && ELmTrTable.length == 1) {
    $(".search-empty").css("display", "block");
    $(".table-empty").css("display", "none");
  }
}
showSearchEmpty();
