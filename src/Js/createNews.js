const ElmInputSelect = document.querySelectorAll(".input-select");
const ElmInput = document.querySelectorAll(".input_create-job");
const ElmBtnSubmit = document.querySelector(".btn-submit-job");
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

let clickBtnSubmit = false;

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

// Tạo mới tin tuyển dụng

function submitJob() {
  const ElmBtnSubmitCreate = document.querySelector("#btn-submit-new-job");
  if (!ElmBtnSubmitCreate) return;
  ElmBtnSubmitCreate.addEventListener("click", function (e) {
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
          setTimeout(() => {
            window.location.href("postedNews.html");
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

// chỉnh sửa tin tuyển dụng
function submitJobUpdate() {
  const ElmBtnSubmitUpdate = document.querySelector("#btn-submit-job-update");
  if (!ElmBtnSubmitUpdate) return;
  ElmBtnSubmitUpdate.addEventListener("click", function (e) {
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
        type: "PUT",
        contentType: "application/json; charset=utf-8",
        data: formData,
        processData: false,
        success: function (data) {
          toastr.success("Cập nhật thành công");
          setTimeout(() => {
            window.location.href("postedNews.html");
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

function ckeckInputSalary() {
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
}
