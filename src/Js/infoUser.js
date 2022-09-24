// submit update information company
function previewImage() {
  const [file] = $("#image-logo")[0].files;
  if (!file) return;
  $(".image-company")[0].src = URL.createObjectURL(file);
}

function validateEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
  if (phone.length <= 8 || phone.length > 20) {
    return false;
  }
  var re = /^\d+$/;
  return re.test(phone);
}
function submitUpdateInfoCompany(url) {
  $("#submit__update-info-company")[0].onclick = function (e) {
    console.log(url);
    let full_name = $("#user-name").val();
    let email = $("#user-email").val();
    let phone = $("#user-phone").val();
    let bank_name = $("#bank_name").val();
    let bank_account = $("#account-number").val();
    let description = $("#user-descreption").val();
    if (full_name === "") {
      toastr.warning("Họ tên không được để trống");
      return;
    }

    if (!validateEmail(email)) {
      toastr.warning("Định dạng email không hợp lệ");
      return;
    }

    if (!validatePhone(phone)) {
      toastr.warning("Định dạng số điện thoại không hợp lệ");
      return;
    }

    let avatar;
    if (url) {
      avatar = url;
    } else {
      avatar = $(".image-company")[0].src;
    }
    const data = {
      full_name,
      email,
      phone,
      bank_name,
      bank_account,
      description,
      avatar,
    };
    $.ajax({
      url: "index.html",
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      dataType: "json",
      processData: false,
      success: function (data) {
        toastr.success("Cập nhật thành công");
      },
      error: function (xhr) {
        toastr.warning(xhr.responseJSON);
      },
    });
  };
}
submitUpdateInfoCompany("");

function getLinkFile() {
  $("#image-logo")[0].onchange = function () {
    const fileName = $("#image-logo")[0].value;
    const idxDot = fileName.lastIndexOf(".") + 1;
    const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (
      extFile == "png" ||
      extFile == "jpg" ||
      extFile == "jpeg" ||
      extFile == "gif"
    ) {
      previewImage();
      var data = new FormData();
      data.append("upload", $("#image-logo")[0].files[0]);
      (async () => {
        const rawResponse = await fetch(
          "http://localhost:8087/api/upload-image",
          {
            method: "POST",
            body: data,
          }
        ).catch(() => toastr.warning("Upload file lỗi. Vui lòng thử lại"));
        const content = await rawResponse.json();
        const { url } = content;
        submitUpdateInfoCompany(url);
      })();
    } else {
      toastr.warning(
        "File upload không hợp lệ. File phải có định dạng .png, .jpg, .jpeg ,.gif)"
      );
    }
  };
}

getLinkFile();
