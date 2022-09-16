const ElmInputSelect = document.querySelectorAll(".input-select");

const ElmInput = document.querySelectorAll(".input_create-job");
const ElmBtnContinue = document.querySelector(".btn-continue");
// mức lương
const ElmSalaryMin = document.querySelector(".input__salary-min");
const ElmSalaryMax = document.querySelector(".input__salary-max");
const ElmFormTab1 = document.querySelector("#form-tab1");
const previewBtnEdit = document.querySelector(".preview__btn-edit");
const tab1Preview = document.querySelector(".tab1_preview");
const ElmProgesNumber2 = document.querySelector(".progres__number2");
const ElmProgesText2 = document.querySelector(".progres__text2");
const ElmCreateTab = document.querySelectorAll(".create-tab-title__tab");
const ElmTab1Content = document.querySelector(".tab1__content");
const ElmTab2Content = document.querySelector(".tab2__content");
const ElmTab3Content = document.querySelector(".tab3__content");

let clickBtnContinue = false;
let ckeckValidateFom = false;

// khởi tạo CKEDITOR
CKEDITOR.replace("editor1");
CKEDITOR.replace("editor2");
CKEDITOR.replace("editor3");

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
  let html = "";
  for (let i = 1; i < 51; i++) {
    html += `<div class="input__title-option-item">${i} triệu</div>`;
  }
  ElmSalaryMin.innerHTML = html;
  ElmSalaryMax.innerHTML = html;
  getValueSelect();
}
renderSalaryList();

function showSelect() {
  for (let i = 0; i < ElmInputSelect?.length; i++) {
    ElmInputSelect[i].onclick = function (e) {
      e.stopPropagation();
      for (let i = 0; i < ElmInputSelect?.length; i++) {
        ElmInputSelect[i].nextElementSibling.style.display = "none";
      }

      if (ElmInputSelect[i].nextElementSibling.style.display === "block") {
        ElmInputSelect[i].nextElementSibling.style.display = "none";
      } else {
        ElmInputSelect[i].nextElementSibling.style.display = "block";
      }
    };
  }
}
showSelect();
function hideSelect() {
  document.querySelector("body").onclick = function () {
    for (let i = 0; i < ElmInputSelect?.length; i++) {
      if (ElmInputSelect[i].nextElementSibling.style.display === "block") {
        ElmInputSelect[i].nextElementSibling.style.display = "none";
      }
    }
  };
}
hideSelect();

function getValueSelect() {
  const ElmInputSelectOption = document.querySelectorAll(
    ".input__title-option-item"
  );
  for (let i = 0; i < ElmInputSelectOption?.length; i++) {
    ElmInputSelectOption[i].onclick = function () {
      ElmInputSelectOption[i].parentElement.previousElementSibling.value =
        ElmInputSelectOption[i].innerText;
      ElmInputSelectOption[i].parentElement.style.display = "none";
      if (clickBtnContinue) {
        hideError();
      }
    };
  }
}
getValueSelect();

// preview job

// hàm hiển thị error
function checkValidate() {
  const getAllElmError = document.querySelectorAll(".input_error");
  ElmBtnContinue.onclick = function () {
    var dataCheditor1 = CKEDITOR.instances.editor1.getData();
    var dataCheditor2 = CKEDITOR.instances.editor2.getData();
    var dataCheditor3 = CKEDITOR.instances.editor3.getData();
    const ElmErrorEditor1 = document.querySelector(".error-editor1");
    const ElmErrorEditor2 = document.querySelector(".error-editor2");
    const ElmErrorEditor3 = document.querySelector(".error-editor3");
    clickBtnContinue = true;
    let checkNextPreview = true;
    for (let i = 0; i < ElmInput?.length; i++) {
      if (
        ElmInput[i].value === "" &&
        ElmInput[i].nextElementSibling.nextElementSibling
      ) {
        ElmInput[i].nextElementSibling.nextElementSibling.style.display =
          "block";
      } else if (ElmInput[i].value === "" && ElmInput[i].nextElementSibling) {
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
    getAllElmError.forEach((element) => {
      if (element.style.display === "block") {
        checkNextPreview = false;
        return;
      }
    });

    if (checkNextPreview) {
      ElmFormTab1.style.display = "none";
      tab1Preview.style.display = "block";
      ElmProgesNumber2.style =
        "background-color: rgb(183, 250, 233) ;color: #451da0";
      ElmProgesText2.style = "color:#451da0";
    }
  };
}

// hàm ẩn đi error
function hideError() {
  for (let i = 0; i < ElmInput?.length; i++) {
    if (
      ElmInput[i].value !== "" &&
      ElmInput[i].nextElementSibling.nextElementSibling
    ) {
      ElmInput[i].nextElementSibling.nextElementSibling.style.display = "none";
    } else if (ElmInput[i].value !== "" && ElmInput[i].nextElementSibling) {
      ElmInput[i].nextElementSibling.style.display = "none";
    }
  }
}
checkValidate();

const ElmDateline = document.querySelector("#input__submit-deadline");

// hiển thị error khi ngày chọn nhỏ hơn ngày hiện tại
function checkValidateDateline() {
  const date = new Date();

  ElmDateline.onchange = function () {
    let date2 = new Date(`${ElmDateline.value}`);
    if (date > date2) {
      document.querySelector(".input_error-deadline1").style.display = "block";
      document.querySelector(".input_error-deadline2").style.display = "none";
    } else {
      console.log(document.querySelector(".input_error-deadline"));
      document.querySelector(".input_error-deadline1").style.display = "none";
    }
  };
}
checkValidateDateline();

// Hiển thị error khi mức lương tối đa nhỏ hon mức lương tối thiểu
function showErrorSalary() {
  const ElmErrorMinSalary1 = document.querySelector(".input_error-min-salary1");
  const ElmErrorMinSalary2 = document.querySelector(".input_error-min-salary2");
  const ElmErrorMaxSalary1 = document.querySelector(".input_error-max-salary1");
  const ElmErrorMaxSalary2 = document.querySelector(".input_error-max-salary2");
  const ElmInputMinSalary = document.querySelector("#input__min-salary");
  const ElmInputMaxSalary = document.querySelector("#input__max-salary");
  const ElmMinOption = document.querySelectorAll(".input__title-option-item");

  ElmMinOption.forEach((element) => {
    element.addEventListener("click", function () {
      if (+ElmInputMinSalary.value === 0 || +ElmInputMaxSalary.value === 0) {
        return;
      }
      if (
        +ElmInputMinSalary.value.replace(" triệu", "") >=
        +ElmInputMaxSalary.value.replace(" triệu", "")
      ) {
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

// render dữ liệu ra trang preview
function renderDataPreview() {
  ElmBtnContinue.addEventListener("click", function () {
    var dataCheditor1 = CKEDITOR.instances.editor1.getData();
    var dataCheditor2 = CKEDITOR.instances.editor2.getData();
    var dataCheditor3 = CKEDITOR.instances.editor3.getData();

    document.querySelector(".preview__position_recruit").innerText =
      document.querySelector("#input__position_recruit").value;
    document.querySelector(".preview__working-form").innerText =
      document.querySelector("#input__working-form").value;
    document.querySelector(".preview__degree").innerText =
      document.querySelector("#input__degree").value;
    document.querySelector(".preview__experience").innerText =
      document.querySelector("#input__experience").value;
    document.querySelector(".preview__submit-deadline").innerText = formatDate(
      document.querySelector("#input__submit-deadline").value
    );
    document.querySelector(".preview__min-salary").innerText =
      document.querySelector("#input__min-salary").value;
    document.querySelector(".preview__max-salary").innerText =
      document.querySelector("#input__max-salary").value;
    document.querySelector(".preview__workplace").innerText =
      document.querySelector("#input__workplace").value;

    document.querySelector(".preview__describe-job-text").innerHTML =
      dataCheditor1;
    document.querySelector(".preview__request-job-text").innerHTML =
      dataCheditor2;
    document.querySelector(".preview__benefit-job-text").innerHTML =
      dataCheditor3;
  });
}
renderDataPreview();

// chuyển từ trang preview về phần tạo tin tuyển dung

function previewSwitchCreateJob() {
  previewBtnEdit.onclick = function () {
    ElmFormTab1.style.display = "block";
    tab1Preview.style.display = "none";
    ElmProgesNumber2.style = "";
    ElmProgesText2.style = "";
  };
}
previewSwitchCreateJob();
