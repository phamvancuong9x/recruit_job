const ElmInputSelect = document.querySelector("#input__working-form");
const ElmInputSelectOption = document.querySelector(".input__title-option");

function showSelect() {
  console.log(ElmInputSelect);
  ElmInputSelect.onclick = function (e) {
    console.log(1);
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
      ElmInputSelect.value = ElmInputSelectOptionItem[i].innerText;
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
const ElmPageList = document.querySelectorAll(".page-link");

function updateQueryParamPage() {
  const url = window.location.href;
  const pathNameUrl = window.location.pathname;
  const keywordParam = getParameterByName("keyword", url);
  const locationParam = getParameterByName("location", url);
  const pageParam = getParameterByName("page", url);
  const ElmPageCurrent = document.querySelector(`#page${pageParam}`);
  const ElmPage1 = document.querySelector(`#page1`);
  const numberOfPage = ElmPageList.length - 2;
  if (pageParam === "" || pageParam === "1") {
    ElmPage1.classList.add("page-active");
  } else {
    ElmPageCurrent?.classList.add("page-active");
  }
  ElmPageList.forEach((element) => {
    element.onclick = function () {
      Number.isInteger(+element.innerText);
      if (Number.isInteger(+element.innerText)) {
        window.location.assign(
          `${pathNameUrl}?keyword=${keywordParam}&location=${locationParam}&page=${element.innerText}`
        );
      } else if (element.innerText === "Trước" && +pageParam > 1) {
        window.location.assign(
          `${pathNameUrl}?keyword=${keywordParam}&location=${locationParam}&page=${
            +pageParam - 1
          }`
        );
      } else if (element.innerText === "Sau" && +pageParam < +numberOfPage) {
        window.location.assign(
          `${pathNameUrl}?keyword=${keywordParam}&location=${locationParam}&page=${
            +pageParam + 1
          }`
        );
      }
    };
  });
}
updateQueryParamPage();

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return "";
  if (!results[2]) return "";

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
