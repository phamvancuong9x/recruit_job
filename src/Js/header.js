function tabSubmenu() {
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
    $(".sub-menu-nav").removeClass("active");
  });
}
showSubMenu();
function StopPropagationDropdownMenu() {
  $(".dropdown-menu-full").on("click", (e) => {
    e.stopPropagation();
  });
}
StopPropagationDropdownMenu();

function ShowSubMenu() {
  $(".menu-ranks-1").on("click", function () {
    $(this)
      .parent()
      .find(".menu-ranks-1-content")
      .addClass("menu-ranks-content-active");
  });
}
ShowSubMenu();
function showSubMenu2() {
  $(".menu-ranks-2").on("click", function () {
    $(this).next().toggleClass("menu-ranks-content-active");
  });
}
showSubMenu2();
function showSubMenu3() {
  $(".menu-ranks-3").on("click", function (e) {
    e.stopPropagation();
    $(this).next().toggleClass("menu-ranks-content-active");
  });
}
showSubMenu3();
function showSubMenu4() {
  $(".parent-menu-2").on("click", function (e) {
    e.stopPropagation();
    $(".parent-menu-2__submenu").toggleClass("menu-ranks-content-active");
  });
}
showSubMenu4();

function showSubMenuMobile() {
  $(".bar-icon").on("click", function () {
    $(".parent-menu").toggleClass("parent-menu-active");
    $(".overlay").addClass("overlay-active");
  });
}
showSubMenuMobile();
function hideSubMenu() {
  $(".menu-ranks-icon").on("click", function () {
    $(this).parent().parent().parent().removeClass("menu-ranks-content-active");
    $(this).parent().parent().removeClass("menu-ranks-content-active");
  });
}
hideSubMenu();
function touchEventLeft() {
  let x;
  let y;
  window.addEventListener("touchstart", function (e) {
    x = e.touches[0].clientX;
  });
  window.addEventListener("touchmove", function (e) {
    y = e.touches[0].clientX;
  });
  window.addEventListener("touchend", function (e) {
    if (y - x >= 50) {
      $(e.target.closest(".menu-ranks-content-active")).removeClass(
        "menu-ranks-content-active"
      );
      x = 0;
      y = 0;
    }
  });
}
touchEventLeft();
function hideSubMenu1(classSubMenu, classBtnShow, classActive) {
  const ElmMenuMobile = document.querySelector(classSubMenu);
  const ElmBtnShowMenuMobile = document.querySelector(classBtnShow);
  const Elmmenu1 = document.querySelector("#submenu-dropdown-8");
  const ElmBtnmenu1 = document.querySelector(".parent-menu-nav1");
  const Elmmenu2 = document.querySelector("#dropdown-user-menu");
  const ElmBtnmenu2 = document.querySelector(".parent-menu-nav2");
  const Elmmenu3 = document.querySelector("#dropdown-user-menu-mobile");
  const ElmBtnmenu3 = document.querySelector(".parent-menu-nav3");
  window.addEventListener("click", function (e) {
    if (
      e.target.closest(classSubMenu) !== ElmMenuMobile &&
      e.target.closest(classBtnShow) !== ElmBtnShowMenuMobile
    ) {
      $(ElmMenuMobile).removeClass(classActive);
    } else {
      $(".parent-menu").addClass(classActive);
    }
    // $(".sub-menu-nav").removeClass("active");

    if (
      e.target.closest("#submenu-dropdown-8") !== Elmmenu1 &&
      e.target.closest(".parent-menu-nav1") !== ElmBtnmenu1 &&
      e.target.closest("#dropdown-user-menu") !== Elmmenu2 &&
      e.target.closest(".parent-menu-nav2") !== ElmBtnmenu2 &&
      e.target.closest("#dropdown-user-menu-mobile") !== Elmmenu3 &&
      e.target.closest(".parent-menu-nav3") !== ElmBtnmenu3
    ) {
      $(".sub-menu-nav").removeClass("active");
    }
  });

  $(".overlay").on("click", function () {
    $(".overlay").removeClass("overlay-active");
  });
}
hideSubMenu1(".parent-menu", ".bar-icon", "parent-menu-active");
hideSubMenu1(".dropdown-menu-full", ".nav__menu-item", "sub-menu-active");

function showSubMenuNav() {
  $(".parent-menu-nav").on("click", function () {
    $(this).children().next().toggleClass("active");
  });
}
showSubMenuNav();
