import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function initTour(element) {
    const video = element.querySelector("video");

    gsap.fromTo(
        video,
        {
            currentTime: 0,
        },
        {
            currentTime: 30.65,
            ease: "none",
            scrollTrigger: {
                // markers: true,
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        }
    );

    ScrollTrigger.create({
        trigger: element,
        pin: video,
        start: () => `top ${window.innerWidth * 0.0638}`,
        end: "bottom 50%",
    });
}
