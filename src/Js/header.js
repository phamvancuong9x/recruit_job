function tabSubmenu() {
  console.log($(".sub-nav-item"));
  $(".sub-nav-item").on("click", function () {
    if (this.classList.contains("sub-nav-item4")) {
      return;
    }
    $(".sub-nav-item").removeClass("sub-nav-item-active");
    $(".sub-content").css("display", "none");
    this.classList.add("sub-nav-item-active");
    if (this.classList.contains("sub-nav-item1")) {
      $(".sub-content1").css("display", "block");
    } else if (this.classList.contains("sub-nav-item2")) {
      $(".sub-content2").css("display", "block");
    } else if (this.classList.contains("sub-nav-item3")) {
      $(".sub-content3").css("display", "block");
    }
  });
}
tabSubmenu();
function showSubMenu() {
  $(".nav__menu-item").on("click", (e) => {
    $(".dropdown-menu-full ").toggleClass("sub-menu-active");
  });
}
showSubMenu();
function StopPropagationDropdownMenu() {
  $(".dropdown-menu-full ").on("click", (e) => {
    e.stopPropagation();
  });
}
StopPropagationDropdownMenu();

function ShowSubMenu() {
  $("#submenu-dropdown-mobile-2").toggleClass(
    "submenu-dropdown-mobile-2-active"
  );
}
function showSubMenu2() {
  $(".menu-ranks-2").on("click", function () {
    $(this).next().toggleClass("menu-ranks-2-content");
  });
}
showSubMenu2();
function showSubMenu3() {
  $(".menu-ranks-3").on("click", function (e) {
    e.stopPropagation();
    $(this).next().toggleClass("menu-ranks-3-content");
  });
}
showSubMenu3();

function showSubMenuMobile() {
  $(".bar-icon").on("click", function () {
    $(".parent-menu").toggleClass("parent-menu-active");
  });
}
showSubMenuMobile();
function hideSubMenu(classSubMenu, classBtnShow, classActive) {
  const ElmMenuMobile = document.querySelector(classSubMenu);
  const ElmBtnShowMenuMobile = document.querySelector(classBtnShow);
  window.addEventListener("click", function (e) {
    if (
      e.target.closest(classSubMenu) !== ElmMenuMobile &&
      e.target.closest(classBtnShow) !== ElmBtnShowMenuMobile
    ) {
      $(ElmMenuMobile).removeClass(classActive);
    } else {
      $(".parent-menu").addClass(classActive);
    }
  });
}
hideSubMenu(".parent-menu", ".bar-icon", "parent-menu-active");
hideSubMenu(".dropdown-menu-full", ".nav__menu-item", "sub-menu-active");
