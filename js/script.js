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

const heroSwiper = new Swiper('.hero-swiper', {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});

const nativeArtSelect = document.querySelector(".art-select");
const artSelect = new Choices(nativeArtSelect, {
  searchEnabled: false,
  itemSelectText: ""
});

const filterPoints = document.querySelectorAll(".filter__point");
filterPoints.forEach(function(filterPoint) {
  filterPoint.addEventListener("keydown", function(event) {
    if(event.keyCode === 32) {
      filterPoints.forEach(function(el) {
        el.querySelector(".filter__checkbox").removeAttribute("checked");
      });
      filterPoint.querySelector(".filter__checkbox").setAttribute("checked", true);
    }
  });
});

const gallerySwiper = new Swiper('.gallery-swiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    type: "fraction"
  },
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: 50
});

function closeModalWindow(click) {
  document.body.classList.remove("body_inactive");
  document.querySelector(".modal-window__picture_selected").classList.remove("modal-window__picture_selected");
  document.querySelector(".modal-window__content_selected").classList.remove("modal-window__content_selected");
  document.querySelector(".modal-window").classList.remove("modal-window_active");
  document.querySelector(".modal-window__close-btn").removeEventListener("click", closeModalWindow);
}

const gallerySlides = document.querySelectorAll(".gallery-swiper__slide");
gallerySlides.forEach(function(slide) {
  slide.addEventListener("click", function(click) {
    click.stopPropagation();
    document.body.classList.add("body_inactive");
    document.querySelector(".modal-window").classList.add("modal-window_active");
    const path = slide.dataset.path;
    document.querySelector(`.modal-window__picture[data-target="${path}"]`).classList.add("modal-window__picture_selected");
    document.querySelector(`.modal-window__content[data-target="${path}"]`).classList.add("modal-window__content_selected");
    document.querySelector(".modal-window__close-btn").addEventListener("click", closeModalWindow);
  });
});
