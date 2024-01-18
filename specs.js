import Swiper from "swiper";
import { Keyboard, Mousewheel } from "swiper/modules";
import "swiper/css";

export default function initSpecs(element) {
    const navSwiperEl = element.querySelector(".swiper.nav");
    const navButtons = navSwiperEl.querySelectorAll("button");
    const navSwiper = new Swiper(navSwiperEl, {
        centeredSlides: true,
        centeredSlidesBounds: true,
        slidesPerView: "auto",
        spaceBetween: 30,
        slideToClickedSlide: true,
    });

    const updateNav = (index) => {
        navButtons.forEach((el) => el.classList.remove("active"));
        navButtons[index].classList.add("active");
    };

    const cardsSwiperEl = element.querySelector(".swiper.cards");
    const cardsSwiper = new Swiper(cardsSwiperEl, {
        modules: [Keyboard, Mousewheel],
        slidesPerView: "auto",
        spaceBetween: 30,
        centeredSlides: true,
        centeredSlidesBounds: true,
        keyboard: true,
        mousewheel: {
            forceToAxis: true,
        },
        slideToClickedSlide: true,
        watchSlidesProgress: true,
        on: {
            slideChange: (swiper) => {
                updateNav(swiper.activeIndex);
            },
            reachEnd: (swiper) => {
                updateNav(swiper.slides.length - 1);
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
