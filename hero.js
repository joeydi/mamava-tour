import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function initHero(element) {
    const video = element.querySelector("video");

    gsap.fromTo(
        video,
        {
            currentTime: 0,
        },
        {
            currentTime: video.duration,
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top top",
                end: "bottom 50%",
                scrub: true,
            },
        }
    );
}
