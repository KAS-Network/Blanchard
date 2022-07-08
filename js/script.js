function inactivate(element) {
  if(element.classList.contains("is-active")) {
    element.classList.add("is-inactive");
    document.querySelector(`.art-nav__title[data-path="${element.dataset.target}"]`).classList.remove("art-nav__title_active");
    setTimeout(function() {
      element.classList.remove("is-active");
      element.classList.remove("is-inactive");
    }, 200);
  }
}

document.querySelectorAll(".art-nav__title").forEach(function(element) {
  element.addEventListener("click", function(event) {
    const btn = event.target;
    const path = btn.dataset.path;
    const subMenu = document.querySelector(`.sub-menu[data-target=${path}]`);
    if(subMenu.classList.contains("is-active")) {
      inactivate(subMenu);
    }
    else {
      subMenu.classList.add("is-active");
      btn.classList.add("art-nav__title_active")
    }
  });
});

document.body.addEventListener("click", function(event) {
  const menus = document.querySelectorAll(".sub-menu");
  if(event.target.classList.contains("art-nav__title")) {
    menus.forEach(function(element) {
      if(element.dataset.target != event.target.dataset.path) {
        inactivate(element);
      }
    });
  }
  else {
    menus.forEach(function(element) {
      inactivate(element);
    });
  }
});
