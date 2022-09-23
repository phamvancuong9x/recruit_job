CKEDITOR.replace("editor4").setData($("#editor4").val());

// submit update information company
function previewImage() {
  const [file] = $("#image-logo")[0].files;
  if (!file) return;
  $(".image-company")[0].src = URL.createObjectURL(file);
}

function submitUpdateInfoCompany(url) {
  $("#submit__update-info-company")[0].onclick = function (e) {
    const dataCheditorDescribeCompany = CKEDITOR.instances.editor4.getData();

    const data = {
      name_company: $("#name-company").val(),
      number_person: $("#number-person").val(),
      address_company: $("#address-company").val(),
      phone_company: $("#phone-company").val(),
      link_website_company: $("#link_website_company").val(),
      describe_company: dataCheditorDescribeCompany,
      link_image_company: "" ? $(".image-company")[0].src : url,
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
