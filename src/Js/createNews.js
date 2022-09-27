const ElmInputSelect = document.querySelectorAll(".input-select");
const ElmInput = document.querySelectorAll(".input_create-job");
const ElmBtnSubmit = document.querySelector(".btn-submit-job");
// mức lương
const ElmInputMinSalary = document.querySelector("#input__min-salary");
const ElmInputMaxSalary = document.querySelector("#input__max-salary");
const ElmInputSalary = document.querySelectorAll(".input__salary");
const getAllElmError = document.querySelectorAll(".input_error");
const ElmErrorMinSalary1 = document.querySelector(".input_error-min-salary1");
const ElmErrorMinSalary2 = document.querySelector(".input_error-min-salary2");
const ElmErrorMaxSalary1 = document.querySelector(".input_error-max-salary1");
const ElmErrorMaxSalary2 = document.querySelector(".input_error-max-salary2");
const ElmFormTab1 = document.querySelector("#form-tab1");
const previewBtnEdit = document.querySelector(".preview__btn-edit");
const tab1Preview = document.querySelector(".tab1_preview");
const ElmProgesNumber2 = document.querySelector(".progres__number2");
const ElmProgesText2 = document.querySelector(".progres__text2");
const ElmCreateTab = document.querySelectorAll(".create-tab-title__tab");
const ElmTab1Content = document.querySelector(".tab1__content");
const ElmTab2Content = document.querySelector(".tab2__content");
const ElmTab3Content = document.querySelector(".tab3__content");
const ElmOption = document.querySelectorAll(".input__title-option-item");
const ElmDateline = document.querySelector("#input__submit-deadline");

const url = window.location.href;
const pageParam = getParameterByName("page", url) || 1;
const totalPage = +document.querySelector("#total_page").innerText;
let clickBtnSubmit = false;

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
// khởi tạo CKEDITOR
CKEDITOR.replace("editor1");
CKEDITOR.replace("editor2");
CKEDITOR.replace("editor3");

// Ản option Chọn

function hideOptionSelect() {
  if (!ElmOption) return;
  ElmOption.forEach((element) => {
    if (element.innerText.trim() === "Chọn") {
      element.style.display = "none";
    }
  });
}
hideOptionSelect();
// tab
function tab() {
  ElmCreateTab.forEach((element, i) => {
    element.onclick = function () {
      const ElmTabActive = document.querySelector(".tab__create-job-active");
      ElmTabActive.classList.remove("tab__create-job-active");
      ElmTab1Content.style.display = "none";
      ElmTab2Content.style.display = "none";
      ElmTab3Content.style.display = "none";
      if (i === 0) {
        element.classList.add("tab__create-job-active");
        ElmTab1Content.style.display = "block";
      } else if (i === 1) {
        element.classList.add("tab__create-job-active");
        ElmTab2Content.style.display = "block";
      } else {
        element.classList.add("tab__create-job-active");
        ElmTab3Content.style.display = "block";
      }
    };
  });
}
tab();
// render ra danh sách mức lương
function renderSalaryList() {
  let html = `<option value=""class="input__title-option-item" style="display:none">Chọn</option>`;
  for (let i = 1; i < 51; i++) {
    html += `<option value=${i} class="input__title-option-item  input__title-option-item-min">${i} triệu</option>`;
  }
  ElmInputMinSalary.innerHTML = html;
  ElmInputMaxSalary.innerHTML = html;
}
renderSalaryList();

// hàm hiển thị error
function checkValidate() {
  ElmBtnSubmit.onclick = function (e) {
    var dataCheditor1 = CKEDITOR.instances.editor1.getData();
    var dataCheditor2 = CKEDITOR.instances.editor2.getData();
    var dataCheditor3 = CKEDITOR.instances.editor3.getData();
    const ElmErrorEditor1 = document.querySelector(".error-editor1");
    const ElmErrorEditor2 = document.querySelector(".error-editor2");
    const ElmErrorEditor3 = document.querySelector(".error-editor3");
    clickBtnSubmit = true;
    for (let i = 0; i < ElmInput?.length; i++) {
      if (ElmInput[i].value === "") {
        ElmInput[i].nextElementSibling.style.display = "block";
      }
    }
    if (dataCheditor1 === "") {
      ElmErrorEditor1.style.display = "block";
    } else {
      ElmErrorEditor1.style.display = "none";
    }
    if (dataCheditor2 === "") {
      ElmErrorEditor2.style.display = "block";
    } else {
      ElmErrorEditor2.style.display = "none";
    }
    if (dataCheditor3 === "") {
      ElmErrorEditor3.style.display = "block";
    } else {
      ElmErrorEditor3.style.display = "none";
    }
    // getAllElmError.forEach((element) => {
    //   if (element.style.display === "block") {
    //     checkNextPreview = false;

    //     return;
    //   }
    // });

    // if (checkNextPreview) {
    //   ElmFormTab1.style.display = "none";
    //   tab1Preview.style.display = "block";
    //   ElmProgesNumber2.style =
    //     "background-color: rgb(183, 250, 233) ;color: #451da0";
    //   ElmProgesText2.style = "color:#451da0";
    // }

    if (clickBtnSubmit) {
      for (let i = 0; i < ElmInput?.length; i++) {
        ElmInput[i].oninput = function () {
          if (ElmInput[i].value === "") {
            ElmInput[i].nextElementSibling.style.display = "block";
          } else {
            ElmInput[i].nextElementSibling.style.display = "none";
          }
        };
      }
    }
  };
}
checkValidate();

// hiển thị error khi ngày chọn nhỏ hơn ngày hiện tại
function checkValidateDateline() {
  const date = new Date();

  ElmDateline.onchange = function () {
    let date2 = new Date(`${ElmDateline.value}`);
    if (date > date2) {
      document.querySelector(".input_error-deadline1").style.display = "block";
      document.querySelector(".input_error-deadline2").style.display = "none";
    } else {
      document.querySelector(".input_error-deadline1").style.display = "none";
    }
  };
}
checkValidateDateline();

// Hiển thị error khi mức lương tối đa nhỏ hon mức lương tối thiểu
function showErrorSalary() {
  ElmInputSalary.forEach((element) => {
    element.addEventListener("input", function () {
      if (+ElmInputMinSalary.value === 0 || +ElmInputMaxSalary.value === 0) {
        ElmErrorMinSalary1.style.display = "none";
        ElmErrorMaxSalary1.style.display = "none";
        return;
      }
      if (+ElmInputMinSalary.value >= +ElmInputMaxSalary.value) {
        ElmErrorMinSalary1.style.display = "block";
        ElmErrorMaxSalary1.style.display = "block";
      } else {
        ElmErrorMinSalary1.style.display = "none";
        ElmErrorMaxSalary1.style.display = "none";
        ElmErrorMinSalary2.style.display = "none";
        ElmErrorMaxSalary2.style.display = "none";
      }
    });
  });
}
showErrorSalary();

function formatDate(stringDate) {
  return stringDate.split("-").reverse().join("/");
}

// chuyển từ trang preview về phần tạo tin tuyển dung

// function previewSwitchCreateJob() {
//   previewBtnEdit.onclick = function () {
//     ElmFormTab1.style.display = "block";
//     tab1Preview.style.display = "none";
//     ElmProgesNumber2.style = "";
//     ElmProgesText2.style = "";
//   };
// }
// previewSwitchCreateJob();

function submitJob() {
  ElmBtnSubmit.addEventListener("click", function (e) {
    var dataCheditor1 = CKEDITOR.instances.editor1.getData();
    var dataCheditor2 = CKEDITOR.instances.editor2.getData();
    var dataCheditor3 = CKEDITOR.instances.editor3.getData();
    let checkValidateForm = false;

    getAllElmError.forEach((element) => {
      if (element.style.display === "block") {
        checkValidateForm = true;
        return;
      }
    });
    if (checkValidateForm) {
      toastr.warning("Vui lòng nhập đầy đủ thông tin ");
    }

    if (!checkValidateForm) {
      var formData = new FormData($("#form-tab1")[0]);
      const dateUtc = moment(ElmDateline.value).toISOString();
      formData.set("date", dateUtc);
      formData.set(
        "salary",
        ` ${ElmInputMinSalary.value}-${ElmInputMaxSalary.value}`
      );
      formData.append("describe_job", dataCheditor1);
      formData.append("describe_job", dataCheditor2);
      formData.append("describe_job", dataCheditor3);
      formData.append("id_company", $("#id_company").text());

      $.ajax({
        url: "index.html",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: formData,
        processData: false,
        success: function (data) {
          toastr.success("Tạo tin tuyển dụng thành công. Vui lòng chờ duyệt");
          localStorage.setItem("tab2", "true");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        error: function (xhr) {
          toastr.warning(xhr.responseJSON);
        },
      });
    }
  });
}
submitJob();

(function ckeckInputSalary() {
  ElmInputSalary.forEach((element) => {
    element.oninput = function () {
      if (
        !Number.isInteger(+element.value[element.value.length - 1]) ||
        element.value.length > 3 ||
        +element.value < 1
      ) {
        element.value = element.value.slice(0, element.value.length - 1);
      }
    };
  });
})();

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
function renderInfoModalRemoveJob() {}
renderInfoModalRemoveJob();

//filter recruitment file (lọc danh sách hồ sơ ứng tuyển)

function filterNameRecruitmentFile() {
  const pathNameUrl = window.location.pathname;

  $(".filter-name").on("change", function () {
    const filter_name = $(".filter-name").val();
    const filter_time = $(".filter-time").val();

    window.location.assign(
      `${pathNameUrl}?position_recruit=${filter_name}&time_submit=${filter_time}`
    );
  });
  $(".filter-time").on("change", function () {
    const filter_name = $(".filter-name").val();
    const filter_time = $(".filter-time").val();
    window.location.assign(
      `${pathNameUrl}?position_recruit=${filter_name}&time_submit=${filter_time}`
    );
  });
}
filterNameRecruitmentFile();

// Kiểm tra kiểm tra điều kiện hiển thị tab 2

function checkShowTab2() {
  if (localStorage.getItem("tab2") == null) return;
  localStorage.removeItem("tab2");
  ElmTab1Content.style.display = "none";
  ElmTab2Content.style.display = "none";
  ElmTab3Content.style.display = "block";
  $(".create-tab-title__tab2")[0].classList.add("tab__create-job-active");
  $(".create-tab-title__tab1")[0].classList.remove("tab__create-job-active");
}
checkShowTab2();

// Kiểm tra điều kiện hiển thị tab3
function checkShowTab3() {
  const href = window.location.href;
  if (href.includes("position_recruit") || href.includes("time_submit")) {
    ElmTab1Content.style.display = "none";
    ElmTab2Content.style.display = "none";
    ElmTab3Content.style.display = "block";
    $(".create-tab-title__tab3")[0].classList.add("tab__create-job-active");
    $(".create-tab-title__tab1")[0].classList.remove("tab__create-job-active");
  }
}
checkShowTab3();

function changeStatus() {
  const ElmSelectStatus = document.querySelectorAll(".status-recruitment-file");
  ElmSelectStatus.forEach((element) => {
    element.onchange = function () {
      $(element)
        .removeClass("status-waitting")
        .removeClass("status-accept")
        .removeClass("status-reject");
      if ($($(element)).val() === "Chưa liên hệ") {
        $($(element)).addClass("status-waitting");
      } else if ($($(element)).val() === "Đạt") {
        $($(element)).addClass("status-accept");
      } else {
        $($(element)).addClass("status-reject");
      }
    };
  });
}
changeStatus();
