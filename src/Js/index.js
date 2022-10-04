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
