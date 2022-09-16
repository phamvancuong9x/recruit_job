const ElmTab1Title = document.querySelector(".job__content-tab1");
const ElmTab2Title = document.querySelector(".job__content-tab2");

ElmTab2Title.onclick = function tab() {
  document.querySelector(".job__tab1-content").style.display = "none";
  document.querySelector(".job__tab2-content").style.display = " block";
  ElmTab1Title.classList.remove("tab-active");
  ElmTab2Title.classList.add("tab-active");
};

ElmTab1Title.onclick = function tab() {
  document.querySelector(".job__tab1-content").style.display = "block";
  document.querySelector(".job__tab2-content").style.display = " none";
  ElmTab1Title.classList.add("tab-active");
  ElmTab2Title.classList.remove("tab-active");
};
