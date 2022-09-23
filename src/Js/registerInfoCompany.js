function customSelector() {
  $("option").css("color", "#000");
  if ($("#number-person").val() === "") {
    $("#number-person").css("color", "#757575");
  }
  $("#number-person").on("change", function () {
    $("#number-person").css("color", "#000");
  });
}
customSelector();
function validatePhone(phone) {
  if (phone.length <= 8 || phone.length > 20) {
    return false;
  }
  var re = /^\d+$/;
  return re.test(phone);
}

$("#btn-register-info-company").on("click", function () {
  let name_company = $("#name-company").val();
  let number_person = $("#number-person").val();
  let address_company = $("#address_company").val();
  let phone_company = $("#phone_company").val();
  if (name_company === "") {
    toastr.warning("Vui lòng nhập tên công ty");
    return;
  }

  if (number_person === "") {
    toastr.warning("Vui lòng chọn quy mô công ty");
    return;
  }
  if (address_company === "") {
    toastr.warning("Vui lòng nhập địa điểm công ty");
    return;
  }
  if (!validatePhone(phone_company)) {
    toastr.warning("Dịnh dạng số điện thoại không hợp lệ");
    return;
  }

  let req = {
    name_company,
    number_person,
    address_company,
    phone_company,
  };
  let myJSON = JSON.stringify(req);

  $.ajax({
    url: "/sign-up",
    type: "POST",
    contentType: "application/json; charset=utf-8",
    data: myJSON,
    dataType: "json",
    success: function (data) {
      toastr.success("Đăng ký thông ty thành công !");
      $("#name-company").val("");
      $("#number-person").val("");
      $("#address_company").val("");
      $("#phone_company").val("");
    },
    error: function (xhr) {
      toastr.warning(xhr.responseJSON);
    },
  });
});
