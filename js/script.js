function closeSubMenu(subMenu) {
  subMenu.classList.add("sub-menu_inactive");
  document.querySelector(`.art-nav__btn[data-path="${subMenu.dataset.target}"]`).classList.remove("art-nav__btn_active");
  setTimeout(function() {
      subMenu.classList.remove("sub-menu_active");
      subMenu.classList.remove("sub-menu_inactive");
  }, 300);
}

function closeAllSubMenus() {
  document.querySelectorAll(".sub-menu.sub-menu_active").forEach(function(subMenu) {
      closeSubMenu(subMenu);
  });
  document.body.removeEventListener("click", closeAllSubMenus);
}

document.querySelectorAll(".art-nav__btn").forEach(function(btn) {
  btn.addEventListener("click", function(click) {
      click.stopPropagation();
      const path = btn.dataset.path;
      const targetSubMenu = document.querySelector(`.sub-menu[data-target="${path}"]`);
      if(targetSubMenu.classList.contains("sub-menu_active")) {
          closeSubMenu(targetSubMenu);
          btn.classList.remove("art-nav__btn_active");
          document.body.removeEventListener("click", closeAllSubMenus);
      }
      else {
          document.querySelectorAll(".sub-menu.sub-menu_active").forEach(function(subMenu) {
              closeSubMenu(subMenu);
          });
          targetSubMenu.classList.add("sub-menu_active");
          btn.classList.add("art-nav__btn_active");
          document.body.addEventListener("click", closeAllSubMenus);
      }
  });
});

document.querySelectorAll(".sub-menu__list").forEach(function(subMenuList) {
  new SimpleBar(subMenuList, {
    autoHide: false
  })
});
