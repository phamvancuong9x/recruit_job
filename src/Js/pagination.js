const url = window.location.href;
const pageParam = getParameterByName("page", url) || 1;
const totalPage = +document.querySelector("#total_page").innerText;

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return "";
  if (!results[2]) return "";

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

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
function updateQueryParamPage() {
  const pathNameUrl = window.location.pathname;
  const filter_name = getParameterByName("position_recruit", url);
  const filter_time = getParameterByName("time_submit", url);
  const pageParam = getParameterByName("page", url);
  const ElmPageCurrent = document.querySelector(`#page${pageParam}`);
  let ElmPageList = document.querySelectorAll(".page-link");
  const numberOfPage = ElmPageList.length - 2;
  ElmPageList.forEach((element) => {
    element.onclick = function () {
      Number.isInteger(+element.innerText);
      if (Number.isInteger(+element.innerText)) {
        window.location.assign(
          `${pathNameUrl}?position_recruit=${filter_name}&time_submit=${filter_time}&page=${element.innerText}`
        );
      } else if (element.innerText === "Trước" && +pageParam > 1) {
        window.location.assign(
          `${pathNameUrl}?position_recruit=${filter_name}&time_submit=${filter_time}&page=${
            +pageParam - 1
          }`
        );
      } else if (element.innerText === "Tiếp" && +pageParam <= +numberOfPage) {
        window.location.assign(
          `${pathNameUrl}?position_recruit=${filter_name}&time_submit=${filter_time}&page=${
            +pageParam + 1
          }`
        );
      } else if (element.innerText === "Cuối") {
        window.location.assign(
          `${pathNameUrl}?position_recruit=${filter_name}&time_submit=${filter_time}&page=${totalPage}`
        );
      } else if (element.innerText === "Đầu") {
        window.location.assign(
          `${pathNameUrl}?position_recruit=${filter_name}&time_submit=${filter_time}&page=${1}`
        );
      }
    };
  });
}
updateQueryParamPage();
