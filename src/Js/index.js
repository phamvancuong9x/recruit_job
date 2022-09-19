const ElmInputSelect = document.querySelector("#input__working-form");
const ElmInputSelectOption = document.querySelector(".input__title-option");
const ElmPagination = document.querySelector(".pagination");
const url = window.location.href;
const pageParam = getParameterByName("page", url) || 1;
const totalPage = +document.querySelector("#total_page").innerText;
$("#pagination-demo").twbsPagination({
  totalPages: totalPage,
  visiblePages: 7,
  startPage: +pageParam,
  last: "Cuối",
  next: "Tiếp",
  prev: "Trước",
  first: "Đầu",

  onPageClick: function (event, page) {},
});

function showSelect() {
  console.log(ElmInputSelect);
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
let ElmPageList = document.querySelectorAll(".page-link");

function updateQueryParamPage() {
  const url = window.location.href;
  const pathNameUrl = window.location.pathname;
  const keywordParam = getParameterByName("keyword", url);
  const locationParam = getParameterByName("location", url);
  const pageParam = getParameterByName("page", url);
  const ElmPageCurrent = document.querySelector(`#page${pageParam}`);
  const numberOfPage = ElmPageList.length - 2;

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
      } else if (element.innerText === "Tiếp" && +pageParam <= +numberOfPage) {
        window.location.assign(
          `${pathNameUrl}?keyword=${keywordParam}&location=${locationParam}&page=${
            +pageParam + 1
          }`
        );
      } else if (element.innerText === "Cuối") {
        window.location.assign(
          `${pathNameUrl}?keyword=${keywordParam}&location=${locationParam}&page=${totalPage}`
        );
      } else if (element.innerText === "Đầu") {
        window.location.assign(
          `${pathNameUrl}?keyword=${keywordParam}&location=${locationParam}&page=${1}`
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
