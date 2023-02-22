import toggleBodyLock from './../helpers/toggleBodyLock'
import { html, firstScreen, header, burgerButton } from './../helpers/elementsNodeList'

// logger (Full Logging System) =================================================================================================================
function FLS(message) {
  setTimeout(() => (window.FLS ? console.log(message) : null), 0)
}

// Проверка браузера на поддержку .webp изображений =================================================================================================================
function isWebp() {
  // Проверка поддержки webp
  const testWebp = (callback) => {
    const webP = new Image()

    webP.onload = webP.onerror = () => callback(webP.height === 2)
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  }
  // Добавление класса _webp или _no-webp для HTML
  testWebp((support) => {
    const className = support ? 'webp' : 'no-webp'
    html.classList.add(className)

    FLS(support ? 'webp поддерживается' : 'webp не поддерживается')
  })
}

/* Проверка мобильного браузера */
const isMobile = {
  Android: () => navigator.userAgent.match(/Android/i),
  BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
  iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: () => navigator.userAgent.match(/Opera Mini/i),
  Windows: () => navigator.userAgent.match(/IEMobile/i),
  any: () =>
    isMobile.Android() ||
    isMobile.BlackBerry() ||
    isMobile.iOS() ||
    isMobile.Opera() ||
    isMobile.Windows(),
}
/* Добавление класса touch для HTML если браузер мобильный */
function addTouchClass() {
  // Добавление класса _touch для HTML если браузер мобильный
  if (isMobile.any()) {
    html.classList.add('touch')
  }
}

// Добавление loaded для HTML после полной загрузки страницы
function addLoadedClass() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      html.classList.add('loaded')
    }, 0)
  })
}

// Получение хеша в адресе сайта
const getHash = () => {
  if (location.hash) {
    return location.hash.replace('#', '')
  }
}

// Указание хеша в адресе сайта
function setHash(hash) {
  hash = hash ? `#${hash}` : window.location.href.split('#')[0]
  history.pushState('', '', hash)
}

// Функция для фиксированной шапки при скролле =================================================================================================================
function headerFixed() {
  const headerStickyObserver = new IntersectionObserver(([entry]) => {
    header.classList.toggle('sticky', !entry.isIntersecting)
  })

  if (firstScreen) {
    headerStickyObserver.observe(firstScreen)
  }
}

// Универсальная функция для открытия и закрытия попапо =================================================================================================================
const togglePopupWindows = () => {
  document.addEventListener('click', ({ target }) => {
    if (target.closest('[data-type]')) {
      const popup = document.querySelector(
        `[data-popup="${target.dataset.type}"]`
      )

      if (document.querySelector('._is-open')) {
        document.querySelectorAll('._is-open').forEach((modal) => {
          modal.classList.remove('_is-open')
        })
      }

      popup.classList.add('_is-open')
      toggleBodyLock(true)
    }

    if (
      target.classList.contains('_overlay-bg') ||
      target.closest('.button-close')
    ) {
      const popup = target.closest('._overlay-bg')

      popup.classList.remove('_is-open')
      toggleBodyLock(false)
    }
  })
}

// Модуль работы с меню (бургер) =======================================================================================================================================================================================================================
const menuInit = () => {
  if (burgerButton) {
    document.addEventListener('click', ({ target }) => {
      if (target.closest('.icon-menu')) {
        html.classList.toggle('menu-open')
        toggleBodyLock(html.classList.contains('menu-open'))
      }
    })
  }
}
const menuOpen = () => {
  toggleBodyLock(true)
  html.classList.add('menu-open')
}
const menuClose = () => {
  toggleBodyLock(false)
  html.classList.remove('menu-open')
}

function vmMenu(){
  let btn = document.querySelector('.header__button');
  let menu = document.querySelector('.topMenu');
btn.onclick = function(){
  btn.classList.toggle('close');
  menu.classList.toggle('open');
}
}

function customPlayer(){
  var player;
  if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function loadPlayer() {
        window.onYouTubePlayerAPIReady = function() {
          player = new YT.Player("showreel", {
            events: {
              // call this function when player is ready to use
              onReady: onPlayerReady
            }
          });
        };
}
function onPlayerReady(event) {
  // bind events
  var playButton = document.getElementById("play-button");
  playButton.addEventListener("click", function () {
    
    player.playVideo();
  });
}
document.addEventListener("DOMContentLoaded", function() {
  loadPlayer();
});
}

function smoothScroll(){
  // собираем все якоря; устанавливаем время анимации и количество кадров
const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
animationTime = 300,
framesCount = 20;

anchors.forEach(function(item) {
// каждому якорю присваиваем обработчик события
item.addEventListener('click', function(e) {
// убираем стандартное поведение
e.preventDefault();

// для каждого якоря берем соответствующий ему элемент и определяем его координату Y
let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;

// запускаем интервал, в котором
let scroller = setInterval(function() {
// считаем на сколько скроллить за 1 такт
let scrollBy = coordY / framesCount;

// если к-во пикселей для скролла за 1 такт больше расстояния до элемента
// и дно страницы не достигнуто
if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
  // то скроллим на к-во пикселей, которое соответствует одному такту
  window.scrollBy(0, scrollBy);
} else {
  // иначе добираемся до элемента и выходим из интервала
  window.scrollTo(0, coordY);
  clearInterval(scroller);
}
// время интервала равняется частному от времени анимации и к-ва кадров
}, animationTime / framesCount);
});
});
}

export {
  FLS,
  isWebp,
  isMobile,
  addTouchClass,
  headerFixed,
  togglePopupWindows,
  addLoadedClass,
  getHash,
  setHash,
  menuInit,
  menuOpen,
  menuClose,
  vmMenu,
  customPlayer,
  smoothScroll
}
