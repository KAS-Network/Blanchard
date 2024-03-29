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

document.querySelectorAll(".sub-menu__wrapper").forEach(function(subMenuList) {
  new SimpleBar(subMenuList, {
    autoHide: false
  })
});

const heroSwiper = new Swiper('.hero-swiper', {
  loop: true,
  effect: "fade",
  speed: 2000,
  autoplay: {
    delay: 6000
  }
});

const nativeArtSelect = document.querySelector(".art-select");
const artSelect = new Choices(nativeArtSelect, {
  searchEnabled: false,
  itemSelectText: ""
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

const lockPadding = window.innerWidth - document.body.offsetWidth + "px";
const gallerySlides = document.querySelectorAll(".gallery-swiper__slide");
const popup = document.querySelector(".popup");
const popupCloseBtn = document.querySelector(".popup__close-btn");
var unlock = true

function openPopup(event) {
  if(unlock) {
    const targetSlide = event.target.closest(".gallery-swiper__slide");
    const path = targetSlide.dataset.path;
    const targetPicture = document.querySelector(`.popup__picture[data-target="${path}"]`);
    const targetInfo = document.querySelector(`.popup__info[data-target="${path}"]`);
    document.body.classList.add("body_lock");
    document.body.style.paddingRight = lockPadding;
    popup.classList.add("popup_active");
    targetPicture.classList.add("popup__picture_selected");
    targetInfo.classList.add("popup__info_selected");
    document.querySelector(".header").setAttribute("inert", true);
    document.querySelector(".main").setAttribute("inert", true);
    document.querySelector(".footer").setAttribute("inert", true);
    popupCloseBtn.focus();
    popupCloseBtn.addEventListener("click", closePopup);
    document.addEventListener("keydown", popupExit);
  }
}

function closePopup(event) {
  unlock = false;
  const targetPicture = document.querySelector(".popup__picture_selected");
  const targetInfo = document.querySelector(".popup__info_selected");
  const target = targetPicture.dataset.target;
  const targetSlide = document.querySelector(`.gallery-swiper__slide[data-path="${target}"]`);
  popup.classList.add("popup_inactive");
  popup.style.marginRight = "-" + lockPadding;
  setTimeout(function() {
    popup.classList.remove("popup_active");
    popup.classList.remove("popup_inactive");
    targetPicture.classList.remove("popup__picture_selected");
    targetInfo.classList.remove("popup__info_selected");
    popup.style.marginRight = "0";
    unlock = true;
  }, 500);
  document.querySelector(".header").removeAttribute("inert");
  document.querySelector(".main").removeAttribute("inert");
  document.querySelector(".footer").removeAttribute("inert");
  document.body.classList.remove("body_lock");
  document.body.style.paddingRight = "0";
  targetSlide.focus();
  popupCloseBtn.removeEventListener("click", closePopup);
  document.removeEventListener("keydown", popupExit);
}

function popupExit(event) {
  if(event.keyCode === 27) {
    popupCloseBtn.click();
  }
}

gallerySlides.forEach(function(slide) {
  slide.addEventListener("click", openPopup);
});

function openArtistBlock(block) {
  if(!block.classList.contains("about-artist__content_active")) {
    tabBtnUnlocked = false;
    const openBlock = document.querySelector(".about-artist__content_active");
    openBlock.classList.add("about-artist__content_inactive");
    setTimeout(function() {
      openBlock.classList.remove("about-artist__content_active");
      openBlock.classList.remove("about-artist__content_inactive");
      block.classList.add("about-artist__content_active");
      setTimeout(function() {
        tabBtnUnlocked = true;
      }, 300);
    }, 300);
  }
}

const tabBtnList = document.querySelectorAll(".drop-down-block__btn");
const contentBlockList = document.querySelectorAll(".about-artist__content");
var tabBtnUnlocked = true;

tabBtnList.forEach(function(btn) {
  btn.addEventListener("click", function() {
    if(tabBtnUnlocked) {
      const name = btn.dataset.name;
      var targetBlock = document.querySelector(`.about-artist__content[data-target="${name}"]`);
      if(targetBlock === null) {
        targetBlock = document.querySelector(".about-artist__content:not([data-target])");
      }
      if(!btn.classList.contains("drop-down-block__btn_active")) {
        const activeBtn = document.querySelector(".drop-down-block__btn_active");
        activeBtn.classList.remove("drop-down-block__btn_active");
        btn.classList.add("drop-down-block__btn_active");
      }
      openArtistBlock(targetBlock);
    }
  });
});

function openDropDownBlock(block) {
  triggerUnlockedForOpening = false;
  const dropDownBlockList = block.querySelector(".drop-down-block__list");
  const dropDownBlockCork = block.querySelector(".cork");
  var height;
  if(dropDownBlockList) {
    height = dropDownBlockList.offsetHeight;
  }
  else {
    height = dropDownBlockCork.offsetHeight;
  }
  const accordionItem = block.parentElement;
  const expandIcon = accordionItem.querySelector(".accordion__expand-icon");
  const activeBlockList = document.querySelectorAll(".drop-down-block_active");
  activeBlockList.forEach(function(activeBlock) {
      closeDropDownBlock(activeBlock);
  });
  block.classList.add("drop-down-block_active");
  block.style.height = height + "px";
  accordionItem.setAttribute("data-active", true);
  expandIcon.classList.add("accordion__expand-icon_rotated");
  setTimeout(function() {
      triggerUnlockedForOpening = true;
  }, 500);
}

function closeDropDownBlock(block) {
  triggerUnlockedForClosing = false;
  const accordionItem = block.parentElement;
  const expandIcon = accordionItem.querySelector(".accordion__expand-icon");
  block.style.height = "0";
  expandIcon.classList.remove("accordion__expand-icon_rotated");
  setTimeout(function() {
      block.classList.remove("drop-down-block_active");
      accordionItem.removeAttribute("data-active");
      triggerUnlockedForClosing = true;
  }, 500);
}

var triggerUnlockedForOpening = true;
var triggerUnlockedForClosing = true;
const triggerList = document.querySelectorAll(".accordion__trigger");
const dropDownBlockList = document.querySelectorAll(".drop-down-block");
triggerList.forEach(function(trigger) {
  trigger.addEventListener("click", function(click) {
      if(triggerUnlockedForOpening && triggerUnlockedForClosing) {
          const path = trigger.dataset.path;
          const block = document.querySelector(`.drop-down-block[data-target="${path}"]`);
          if(block.classList.contains("drop-down-block_active")) {
              closeDropDownBlock(block);
          }
          else {
              openDropDownBlock(block);
          }
      }
  });
});
triggerList[0].click();

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
    nextEl: '.projects__swiper-button-next',
    prevEl: '.projects__swiper-button-prev'
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

const linkList = document.querySelectorAll("*[data-goto]");
linkList.forEach(function(link) {
  link.addEventListener("click", function(click) {
    const targetSection = document.querySelector(link.dataset.goto);
    const topPosition = targetSection.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: topPosition,
      behavior: "smooth"
    });
    click.preventDefault();
  });
});
