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
if (totalPage !== "0") {
  $("#pagination-demo").twbsPagination({
    totalPages: totalPage,
    visiblePages: 6,
    startPage: +pageParam,
    last: "Cuối",
    next: "Tiếp",
    prev: "Trước",
    first: "Đầu",

    onPageClick: function (event, page) {},
  });
}

function updateQueryParamPage(firstParam, secondParam, thirdParam) {
  const pathNameUrl = window.location.pathname;
  const param1 = getParameterByName(firstParam, url);
  const param2 = getParameterByName(secondParam, url);
  const param3 = getParameterByName(thirdParam, url);
  const pageParam = getParameterByName("page", url);
  let ElmPageList = document.querySelectorAll(".page-link");
  const numberOfPage = ElmPageList.length - 2;
  ElmPageList.forEach((element) => {
    element.onclick = function () {
      Number.isInteger(+element.innerText);
      if (Number.isInteger(+element.innerText)) {
        directUrl(
          pathNameUrl,
          firstParam,
          param1,
          secondParam,
          param2,
          thirdParam,
          param3,
          element.innerText
        );
      } else if (element.innerText === "Trước" && +pageParam > 1) {
        directUrl(
          pathNameUrl,
          firstParam,
          param1,
          secondParam,
          param2,
          thirdParam,
          param3,
          +pageParam - 1
        );
      } else if (element.innerText === "Tiếp" && +pageParam <= +numberOfPage) {
        directUrl(
          pathNameUrl,
          firstParam,
          param1,
          secondParam,
          param2,
          thirdParam,
          param3,
          +pageParam + 1
        );
      } else if (element.innerText === "Cuối") {
        directUrl(
          pathNameUrl,
          firstParam,
          param1,
          secondParam,
          param2,
          thirdParam,
          param3,
          totalPage
        );
      } else if (element.innerText === "Đầu") {
        directUrl(
          pathNameUrl,
          firstParam,
          param1,
          secondParam,
          param2,
          thirdParam,
          param3,
          1
        );
      }
    };
  });
}

function directUrl(
  pathNameUrl,
  name_param1,
  text_param1,
  name_param2,
  text_param2,
  name_param3,
  text_param3,
  page
) {
  if (name_param3 !== "") {
    window.location.assign(
      `${pathNameUrl}?${name_param1}=${text_param1}&${name_param2}=${text_param2}&${name_param3}=${text_param3}&page=${page}`
    );
  } else if (name_param2 === "") {
    window.location.assign(`${pathNameUrl}?${name_param1}=${text_param1}`);
  } else {
    window.location.assign(
      `${pathNameUrl}?${name_param1}=${text_param1}&${name_param2}=${text_param2}&page=${page}`
    );
  }
}
