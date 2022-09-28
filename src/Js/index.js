const ElmInputSelect = document.querySelector("#input__working-form");
const ElmInputSelectOption = document.querySelector(".input__title-option");
const ElmPagination = document.querySelector(".pagination");

function showSelect() {
  ElmInputSelect.onclick = function (e) {
    e.stopPropagation();
    ElmInputSelectOption.style.display = "block";
  };
}
showSelect();
function hideSelect() {
  document.querySelector("body").onclick = function () {
    ElmInputSelectOption.style.display = "none";
  };
}
hideSelect();

function getValueSelect() {
  const ElmInputSelectOptionItem = document.querySelectorAll(
    ".input__title-option-item"
  );
  for (let i = 0; i < ElmInputSelectOptionItem?.length; i++) {
    ElmInputSelectOptionItem[i].onclick = function () {
      if (ElmInputSelectOptionItem[i].innerText !== "Tất cả địa điểm") {
        ElmInputSelect.value = ElmInputSelectOptionItem[i].innerText;
      }
      ElmInputSelectOption.style.display = "none";
    };
  }
}
getValueSelect();

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

updateQueryParamPage("keyword", "location");
