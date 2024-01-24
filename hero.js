import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function initHero(element) {
    if (!element) return;

    const mask = element.querySelector(".mask");
    const video = element.querySelector("video");
    const content = element.querySelector(".content");

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: element,
            start: () => {
                const headerHeight = getComputedStyle(document.documentElement).getPropertyValue("--header-height");
                return `top ${headerHeight}`;
            },
            end: "+=100%",
            scrub: true,
        },
    });

    timeline.fromTo(
        mask,
        {
            scale: 0.9,
            borderRadius: 20,
        },
        {
            scale: 1,
            borderRadius: 0,
            ease: "none",
        },
        0
    );

    timeline.fromTo(
        video,
        {
            scale: 1.1,
        },
        {
            scale: 1,
            ease: "none",
        },
        0
    );

    gsap.to(content, {
        y: -window.innerHeight,
        ease: "none",
        scrollTrigger: {
            trigger: element,
            start: () => {
                const headerHeight = getComputedStyle(document.documentElement).getPropertyValue("--header-height");
                return `top ${headerHeight}`;
            },
            end: "+=200%",
            scrub: true,
        },
    });

    gsap.to(mask, {
        opacity: 0,
        scrollTrigger: {
            trigger: element,
            start: "bottom top",
            end: "+=1",
            scrub: true,
        },
    });
}
