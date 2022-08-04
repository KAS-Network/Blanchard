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
    nextEl: '.hero-swiper__swiper-button-next',
    prevEl: '.hero-swiper__swiper-button-prev',
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
    if(event.keyCode === 13) {
      filterPoint.click();
    }
  });
});

const gallerySwiper = new Swiper('.gallery-swiper', {
  navigation: {
    nextEl: '.gallery-swiper__button-next',
    prevEl: '.gallery-swiper__button-prev',
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

function ModalWindowExit(event) {
  if(event.keyCode === 27) {
    document.querySelector(".modal-window__close-btn").click();
  }
}

function closeModalWindow(click) {
  const picture = document.querySelector(".modal-window__picture_selected")
  const target = picture.dataset.target;
  const slide = document.querySelector(`.gallery-swiper__slide[data-path="${target}"]`);
  document.body.classList.remove("body_inactive");
  document.querySelector(".header").removeAttribute("inert");
  document.querySelector(".main").removeAttribute("inert")
  document.querySelector(".footer").removeAttribute("inert");
  picture.classList.remove("modal-window__picture_selected");
  document.querySelector(".modal-window__content_selected").classList.remove("modal-window__content_selected");
  document.querySelector(".modal-window").classList.remove("modal-window_active");
  document.querySelector(".modal-window__close-btn").removeEventListener("click", closeModalWindow);
  click.target.removeEventListener("click", closeModalWindow);
  document.removeEventListener("keydown", ModalWindowExit);
  slide.focus();
}

const gallerySlides = document.querySelectorAll(".gallery-swiper__slide");
gallerySlides.forEach(function(slide) {
  slide.addEventListener("click", function(click) {
    click.stopPropagation();
    document.body.classList.add("body_inactive");
    document.querySelector(".header").setAttribute("inert", true);
    document.querySelector(".main").setAttribute("inert", true);
    document.querySelector(".footer").setAttribute("inert", true);
    document.querySelector(".modal-window").classList.add("modal-window_active");
    const path = slide.dataset.path;
    document.querySelector(`.modal-window__picture[data-target="${path}"]`).classList.add("modal-window__picture_selected");
    document.querySelector(`.modal-window__content[data-target="${path}"]`).classList.add("modal-window__content_selected");
    const closeBtn = document.querySelector(".modal-window__close-btn");
    closeBtn.focus();
    closeBtn.addEventListener("click", closeModalWindow);
    document.addEventListener("keydown", ModalWindowExit);
  });
});

function closeAccordionBlock(trigger, block) {
  trigger.classList.remove("accordion__trigger_active");
  block.style.maxHeight = "0";
  const accordionItem = trigger.parentElement;
  setTimeout(function() {
    block.classList.remove("expansion-block_visible");
    accordionItem.removeAttribute("data-active");
  }, 500);
}

const triggerList = document.querySelectorAll(".accordion__trigger");
triggerList.forEach(function(trigger) {
  trigger.addEventListener("click", function() {
    const path = trigger.dataset.path;
    const targetBlock = document.querySelector(`.expansion-block[data-target="${path}"]`);
    const targetList = targetBlock.querySelector(".expansion-block__list");
    const targetCork = targetBlock.querySelector(".cork");
    if(targetBlock.classList.contains("expansion-block_visible")) {
      closeAccordionBlock(trigger, targetBlock);
    }
    else {
      const activeTrigger = document.querySelector(".accordion__trigger_active");
      const activeBlock = document.querySelector(".expansion-block_visible");
      if(activeTrigger) {
        closeAccordionBlock(activeTrigger, activeBlock);
      }
      const accordionItem = trigger.parentElement;
      trigger.classList.add("accordion__trigger_active");
      targetBlock.classList.add("expansion-block_visible");
      accordionItem.setAttribute("data-active", true);
      if(targetList) {
        targetBlock.style.maxHeight = targetList.offsetHeight + 1 + "px";
        targetCork.classList.add("cork_disabled");
      }
      else {
        targetBlock.style.maxHeight = targetCork.offsetHeight + "px";
      }
    }
  });
});

triggerList.forEach(function(trigger) {
  trigger.addEventListener("keydown", function(event) {
    if(event.keyCode === 13) {
      trigger.click();
    }
  });
});

const artistBtns = document.querySelectorAll(".expansion-block__btn");
artistBtns.forEach(function(btn) {
  btn.addEventListener("click", function() {
    const selectedPicture = document.querySelector(".about-artist__picture_selected");
    const selectedInfo = document.querySelector(".about-artist__info_selected");
    selectedPicture.classList.remove("about-artist__picture_selected");
    selectedInfo.classList.remove("about-artist__info_selected");
    const name = btn.dataset.name;
    const targetPicture = document.querySelector(`.about-artist__picture[data-target="${name}"]`);
    const targetInfo = document.querySelector(`.about-artist__info[data-target="${name}"]`);
    if(targetPicture) {
      targetPicture.classList.add("about-artist__picture_selected");
      targetInfo.classList.add("about-artist__info_selected");
    }
    else {
      document.querySelector(".about-artist__picture:not([data-target])").classList.add("about-artist__picture_selected");
      document.querySelector(".about-artist__info:not([data-target])").classList.add("about-artist__info_selected");
    }
  });
});

const eventsSwiper = new Swiper(".events__swiper", {
  navigation: {
    nextEl: '.events__swiper-button-next',
    prevEl: '.events__swiper-button-prev'
  },
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: 50
});

const projectsSwiper = new Swiper(".partners", {
  navigation: {
    nextEl: '.partners__swiper-button-next',
    prevEl: '.partners__swiper-button-prev'
  },
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: 50,
  keyboard: {
    enabled: true
  }
});

const telInput = document.querySelector('.callback-form__input[type="tel"]');
const telMaskInput = new Inputmask("+7-(999)-999-99-99");
telMaskInput.mask(telInput);

function telValidate() {
  const unmaskedTel = telInput.inputmask.unmaskedvalue();
  return Number(unmaskedTel) && unmaskedTel.length === 10;
}

const formValidation = new JustValidate(document.querySelector(".callback-form"));
formValidation.addField("#name-input", [
  {
    rule: "minLength",
    value: 3,
    errorMessage: "Слишком короткое имя"
  },
  {
    rule: "maxLength",
    value: 30,
    errorMessage: "Слишком длинное имя"
  },
  {
    rule: "required",
    errorMessage: "Введите имя"
  }
]);
formValidation.addField("#tel-input", [
  {
    rule: "required",
    errorMessage: "Введите телефон"
  },
  {
    validator: telValidate,
    errorMessage: "Недопустимый формат"
  }
]);

function init(){
  var contactsMap = new ymaps.Map("contacts-map", {
    center: [55.75846806898367, 37.60108849999989],
    zoom: 7,
    controls: ['geolocationControl', 'zoomControl']
    },
    {
      suppressMapOpenBlock: true,
      geolocationControlSize: "large",
      geolocationControlPosition:  { top: "350px", right: "20px" },
      geolocationControlFloat: 'none',
      zoomControlSize: "small",
      zoomControlFloat: "none",
      zoomControlPosition: { top: "270px", right: "20px" }
    }
  );
  contactsMap.behaviors.disable('scrollZoom');
  const myPlacemark = new ymaps.Placemark(
    [55.75846806898367, 37.60108849999989],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "img/map-marker.svg",
      iconImageSize: [40, 40],
      iconImageOffset: [-20, -40],
    }
  );
  contactsMap.geoObjects.add(myPlacemark);
}
ymaps.ready(init);
