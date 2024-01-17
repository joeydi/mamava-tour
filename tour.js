import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function initTour(element) {
    const video = element.querySelector("video");
    const pin = element.querySelector(".pin");
    const time = element.querySelector(".time");
    const exterior = element.querySelector(".exterior");
    const access = element.querySelector(".access");
    const interior1 = element.querySelector(".interior-1");
    const interior2 = element.querySelector(".interior-2");
    const mobility = element.querySelector(".mobility");
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom 50%",
            scrub: true,
        },
    });

    timeline.fromTo(
        video,
        {
            currentTime: 0,
        },
        {
            currentTime: 30.65,
            duration: 30.65,
            ease: "none",
            onUpdate: () => {
                time.innerText = video.currentTime.toFixed(1);
            },
        },
        0
    );

    timeline.to(
        exterior,
        {
            opacity: 1,
            yPercent: -50,
            duration: 1,
            ease: "none",
        },
        2
    );

    timeline.to(
        exterior,
        {
            opacity: 0,
            yPercent: -150,
            duration: 1,
            ease: "none",
        },
        6.5
    );

    timeline.to(
        access,
        {
            opacity: 1,
            yPercent: -50,
            duration: 1,
            ease: "none",
        },
        7.5
    );

    timeline.to(
        access,
        {
            opacity: 0,
            yPercent: -150,
            duration: 1,
            ease: "none",
        },
        10
    );

    timeline.to(
        interior1,
        {
            opacity: 1,
            yPercent: -50,
            duration: 1,
            ease: "none",
        },
        11.5
    );

    timeline.to(
        interior1,
        {
            opacity: 0,
            yPercent: -150,
            duration: 1,
            ease: "none",
        },
        14
    );

    timeline.to(
        interior2,
        {
            opacity: 1,
            yPercent: -50,
            duration: 1,
            ease: "none",
        },
        15.5
    );

    timeline.to(
        interior2,
        {
            opacity: 0,
            yPercent: -150,
            duration: 1,
            ease: "none",
        },
        19
    );

    timeline.to(
        mobility,
        {
            opacity: 1,
            yPercent: -50,
            duration: 1,
            ease: "none",
        },
        20.5
    );

    timeline.to(
        mobility,
        {
            yPercent: -250,
            duration: 1,
            ease: "none",
        },
        22.5
    );

    timeline.to(
        mobility,
        {
            opacity: 0,
            yPercent: -500,
            duration: 1,
            ease: "none",
        },
        27
    );

    ScrollTrigger.create({
        trigger: element,
        pin: pin,
        start: () => `top ${window.innerWidth * 0.0638}`,
        end: "bottom top",
    });
}
