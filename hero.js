import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function initHero(element) {
    const mask = element.querySelector(".mask");
    const content = element.querySelector(".content");

    gsap.fromTo(
        mask,
        {
            scale: 0.9,
            borderRadius: 20,
        },
        {
            scale: 1,
            borderRadius: 0,
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: () => `top ${window.innerWidth * 0.0638}`,
                end: "+=100%",
                scrub: true,
            },
        }
    );

    gsap.to(content, {
        y: -window.innerHeight,
        ease: "none",
        scrollTrigger: {
            trigger: element,
            start: () => `top ${window.innerWidth * 0.0638}`,
            end: "+=200%",
            scrub: true,
        },
    });
}
