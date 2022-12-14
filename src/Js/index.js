const ElmInputSelect = document.querySelector("#input__working-form");
const ElmInputSelectOption = document.querySelector(".input__title-option");
const ElmPagination = document.querySelector(".pagination");

const ElmInputSearch = document.querySelector("#keyword");
const ElmInputClearSearch = document.querySelector(".clear-search");
function showBtnClearSearch() {
  ElmInputSearch.oninput = function () {
    if (ElmInputSearch.value !== "") {
      ElmInputClearSearch.style.display = "block";
    } else {
      ElmInputClearSearch.style.display = "none";
    }
  };
}
showBtnClearSearch();

function clearSearch() {
  ElmInputClearSearch.onclick = function () {
    ElmInputSearch.value = "";
    ElmInputClearSearch.style.display = "none";
  };
}
clearSearch();

// pagination

updateQueryParamPage("keyword", "location", "");

function showSearchEmpty() {
  const url = window.location.href;
  const ELmTrTable = document.querySelector(".job__list > div");
  if (url.includes("?") && ELmTrTable === null) {
    $(".search-empty").css("display", "block");
    $(".table-empty").css("display", "none");
  }
}
showSearchEmpty();

function saveJob() {
  const ELmBtnSaveJob = document.querySelectorAll(".icon-no-save");
  ELmBtnSaveJob.forEach((element) => {
    element.onclick = function () {
      data = { id: $(element).parent().prev().text() };

      $.ajax({
        url: "index.html",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        dataType: "json",
        processData: false,
        success: function (data) {
          $(element).css("display", "none");
          $(element).next().css("display", "block");
          toastr.success("Đã lưu việc làm thành công !");
        },
        error: function (xhr) {
          toastr.warning(xhr.responseJSON);
        },
      });
    };
  });
}
saveJob();
function removeJob() {
  const ELmBtnSaveJob = document.querySelectorAll(".icon-save");
  ELmBtnSaveJob.forEach((element) => {
    element.onclick = function () {
      data = { id: $(element).parent().prev().text() };
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
          toastr.success("Đã bỏ lưu !");
        },
        error: function (xhr) {
          toastr.warning(xhr.responseJSON);
        },
      });
    };
  });
}
removeJob();

function showPageEmpty() {
  const url = window.location.href;
  const JobList = document.querySelector(".job__list");
  if (!url.includes("?") && JobList === null) {
    $(".page-empty").css("display", "block");
  }
}
showPageEmpty();
