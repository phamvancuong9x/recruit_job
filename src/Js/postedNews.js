// show modal remove news job

function showModalNewsJob() {
  document.querySelectorAll(".news__recruitment_remove").forEach((element) => {
    $(element).on("click", function () {
      $("#removeNewsJobModal").modal();
      $(".newsJobName")[0].innerText = $(element)
        .parent()
        .parent()
        .children()
        .first()[0].innerText;
    });
  });
}
showModalNewsJob();
function showModalNewsJobMobile() {
  document
    .querySelectorAll(".news__recruitment_remove-mobile")
    .forEach((element) => {
      $(element).on("click", function () {
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
