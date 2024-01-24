import Swiper from "swiper";
import { Keyboard, Mousewheel } from "swiper/modules";
import "swiper/css";

export default function initSpecs(element) {
    if (!element) return;

    const navSwiperEl = element.querySelector(".swiper.nav");
    const navButtons = navSwiperEl.querySelectorAll("button");

    const navSwiper = new Swiper(navSwiperEl, {
        slidesPerView: "auto",
        spaceBetween: 15,
        slideToClickedSlide: true,
        breakpoints: {
            768: {
                spaceBetween: 30,
            },
        },
    });

    const updateNav = (index) => {
        navSwiper.slideTo(index);
        navButtons.forEach((el) => el.classList.remove("active"));
        navButtons[index].classList.add("active");
    };

    const cardsSwiperEl = element.querySelector(".swiper.cards");
    const cardsSwiper = new Swiper(cardsSwiperEl, {
        modules: [Keyboard, Mousewheel],
        autoHeight: true,
        slidesPerView: "auto",
        spaceBetween: 20,
        centeredSlides: true,
        keyboard: true,
        mousewheel: {
            forceToAxis: true,
        },
        slideToClickedSlide: true,
        watchSlidesProgress: true,
        breakpoints: {
            768: {
                spaceBetween: 30,
            },
        },
        on: {
            slideChange: (swiper) => {
                updateNav(swiper.activeIndex);
            },
        },
    });

    navButtons.forEach((el, i) => {
        el.addEventListener("click", () => {
            cardsSwiper.slideTo(i);
            updateNav(i);
        });
    });
}
