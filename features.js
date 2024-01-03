import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function initFeatures(element) {
    gsap.set(element.querySelectorAll(".media-wrap .media-2, .media-wrap .media-3, .media-wrap .media-4, .media-wrap .media-5"), {
        yPercent: 100,
        scale: 1.5,
    });

    gsap.set(element.querySelectorAll(".benefit ul"), {
        height: 0,
    });

    const timeline = gsap.timeline({
        scrollTrigger: {
            // markers: true,
            trigger: element,
            start: "top top+=1",
            end: "+=400.1%",
            pin: element.querySelectorAll(".features-pin"),
            scrub: 1,
            onEnter: function () {
                gsap.set("html", {
                    "scroll-snap-type": "y mandatory",
                });
            },
            onEnterBack: function () {
                gsap.set("html", {
                    "scroll-snap-type": "y mandatory",
                });
            },
            onLeave: function () {
                gsap.set("html", {
                    "scroll-snap-type": "none",
                });
            },
            onLeaveBack: function () {
                gsap.set("html", {
                    "scroll-snap-type": "none",
                });
            },
        },
    });

    timeline.to(
        element.querySelectorAll(".media-wrap .media-2"),
        {
            yPercent: 0,
            scale: 1,
            ease: "none",
            duration: 1,
        },
        0
    );

    timeline.to(
        element.querySelectorAll(".benefit-1 ul"),
        {
            height: "auto",
            ease: "none",
            duration: 0.5,
        },
        0
    );

    timeline.to(
        element.querySelectorAll(".progress"),
        {
            yPercent: 122,
            scaleY: 0.95,
            ease: "power2.out",
            duration: 1,
        },
        0
    );

    timeline.to(
        element.querySelectorAll(".media-wrap .media-3"),
        {
            yPercent: 0,
            scale: 1,
            ease: "none",
            duration: 1,
        },
        1
    );

    timeline.to(
        element.querySelectorAll(".benefit-1 ul"),
        {
            height: 0,
            ease: "none",
            duration: 0.5,
        },
        1
    );

    timeline.to(
        element.querySelectorAll(".benefit-2 ul"),
        {
            height: "auto",
            ease: "none",
            duration: 0.5,
        },
        1
    );

    timeline.to(
        element.querySelectorAll(".progress"),
        {
            yPercent: 156,
            scaleY: 1.25,
            ease: "power2.out",
            duration: 1,
        },
        1
    );

    timeline.to(
        element.querySelectorAll(".media-wrap .media-4"),
        {
            yPercent: 0,
            scale: 1,
            ease: "none",
            duration: 1,
        },
        2
    );

    timeline.to(
        element.querySelectorAll(".benefit-2 ul"),
        {
            height: 0,
            ease: "none",
            duration: 0.5,
        },
        2
    );

    timeline.to(
        element.querySelectorAll(".benefit-3 ul"),
        {
            height: "auto",
            ease: "none",
            duration: 0.5,
        },
        2
    );

    timeline.to(
        element.querySelectorAll(".progress"),
        {
            yPercent: 195,
            scaleY: 1,
            ease: "power2.out",
            duration: 1,
        },
        2
    );

    timeline.to(
        element.querySelectorAll(".media-wrap .media-5"),
        {
            yPercent: 0,
            scale: 1,
            ease: "none",
            duration: 1,
        },
        3
    );

    timeline.to(
        element.querySelectorAll(".benefit-3 ul"),
        {
            height: 0,
            ease: "none",
            duration: 0.5,
        },
        3
    );

    timeline.to(
        element.querySelectorAll(".benefit-4 ul"),
        {
            height: "auto",
            ease: "none",
            duration: 0.5,
        },
        3
    );

    timeline.to(
        element.querySelectorAll(".progress"),
        {
            yPercent: 230,
            scaleY: 1,
            ease: "power2.out",
            duration: 1,
        },
        3
    );

    timeline.set("html", {
        "scroll-snap-type": "none",
    });
}
