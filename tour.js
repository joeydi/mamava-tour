import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function initTour(element) {
    const video = element.querySelector("video");
    const pin = element.querySelector(".pin");
    const time = element.querySelector(".time");
    const exterior = element.querySelector(".exterior");
    const exteriorSplit = new SplitText(exterior.querySelector("h2"), { type: "lines" });
    const access = element.querySelector(".access");
    const accessSplit = new SplitText(access.querySelector("h2"), { type: "lines" });
    const interior1 = element.querySelector(".interior-1");
    const interior1Split = new SplitText(interior1.querySelector("h2"), { type: "lines" });
    const interior2 = element.querySelector(".interior-2");
    const interior2Split = new SplitText(interior2.querySelector("h2"), { type: "lines" });
    const mobility = element.querySelector(".mobility");
    const mobilitySplit = new SplitText(mobility.querySelector("h2"), { type: "lines" });

    gsap.set([exterior, access, interior1, interior2, mobility], {
        y: () => window.innerHeight / 4,
    });

    gsap.set([exteriorSplit.lines, accessSplit.lines, interior1Split.lines, interior2Split.lines, mobilitySplit.lines], {
        yPercent: 75,
        opacity: 0,
    });

    const timeline = gsap.timeline({
        scrollTrigger: {
            // markers: true,
            trigger: element,
            start: "top bottom",
            end: "bottom 75%",
            scrub: true,
        },
    });

    timeline.fromTo(
        video,
        {
            currentTime: 0,
        },
        {
            currentTime: 29.7,
            duration: 29.7,
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
            y: 0,
            duration: 1,
            ease: "power4.out",
        },
        2
    );

    timeline.to(
        exteriorSplit.lines,
        {
            yPercent: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power4.out",
            stagger: 0.1,
        },
        2
    );

    timeline.to(
        exterior,
        {
            opacity: 0,
            y: () => window.innerHeight / -4,
            duration: 1,
            ease: "power4.in",
        },
        6.5
    );

    timeline.to(
        access,
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power4.out",
        },
        7.5
    );

    timeline.to(
        accessSplit.lines,
        {
            yPercent: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power4.out",
            stagger: 0.1,
        },
        7.5
    );

    timeline.to(
        access,
        {
            opacity: 0,
            y: () => window.innerHeight / -4,
            duration: 1,
            ease: "power4.in",
        },
        10
    );

    timeline.to(
        interior1,
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power4.out",
        },
        11
    );

    timeline.to(
        interior1Split.lines,
        {
            yPercent: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power4.out",
            stagger: 0.1,
        },
        11
    );

    timeline.to(
        interior1,
        {
            opacity: 0,
            y: () => window.innerHeight / -4,
            duration: 1,
            ease: "power4.in",
        },
        14.5
    );

    timeline.to(
        interior2,
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power4.out",
        },
        15.5
    );

    timeline.to(
        interior2Split.lines,
        {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.out",
            stagger: 1,
        },
        15.75
    );

    timeline.to(
        interior2,
        {
            opacity: 0,
            y: () => window.innerHeight / -4,
            duration: 1,
            ease: "power4.in",
        },
        19
    );

    timeline.to(
        mobility,
        {
            opacity: 1,
            y: () => window.innerHeight / -4,
            duration: 1,
            ease: "power4.out",
        },
        20
    );

    timeline.to(
        mobilitySplit.lines,
        {
            yPercent: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power4.out",
            stagger: 0.1,
        },
        20
    );

    timeline.to(
        mobility,
        {
            y: () => window.innerHeight / -1.5,
            duration: 2,
            ease: "power4.inOut",
        },
        22.5
    );

    timeline.to(
        mobility,
        {
            opacity: 0,
            y: () => window.innerHeight / -1,
            duration: 1,
            ease: "power4.in",
        },
        27
    );

    ScrollTrigger.create({
        trigger: element,
        pin: pin,
        start: () => `top ${window.innerWidth * 0.0638}`,
        end: "bottom top",
    });

    gsap.to(video, {
        yPercent: -50,
        scrollTrigger: {
            trigger: element,
            start: "bottom bottom",
            end: "bottom top",
            scrub: true,
        },
    });
}
