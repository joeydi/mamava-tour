import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, SplitText);

export default function initTour(element) {
    if (!element) return;

    const video = element.querySelector("video");
    const pin = element.querySelector(".pin");
    // const timeLabel = element.querySelector(".time");
    const navPrevious = element.querySelector(".nav .previous");
    const navNext = element.querySelector(".nav .next");
    const navSkip = element.querySelector(".nav .skip");
    const navLabel = element.querySelector(".nav .label");
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
        yPercent: 100,
    });

    gsap.set([exteriorSplit.lines, accessSplit.lines, interior1Split.lines, interior2Split.lines, mobilitySplit.lines], {
        yPercent: 75,
        opacity: 0,
    });

    const getSectionLabel = (time) => {
        if (time < 7.5) {
            return "Exterior";
        }

        if (time < 11) {
            return "Access";
        }

        if (time < 20) {
            return "Interior";
        }

        return "Mobility";
    };

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom 75%",
            scrub: true,
            onUpdate: () => {
                const time = timeline.progress() * timeline.duration();

                const label = getSectionLabel(time);
                navLabel.innerText = label;

                // Disable prev/next buttons at ends
                navPrevious.disabled = !timeline.previousLabel();
                navNext.disabled = !timeline.nextLabel();
            },
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
        },
        0
    );

    timeline.to(
        exterior,
        {
            opacity: 1,
            yPercent: 0,
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
            yPercent: -100,
            duration: 1,
            ease: "power4.in",
        },
        6.5
    );

    timeline.addLabel("Exterior", 6.5);

    timeline.to(
        access,
        {
            opacity: 1,
            yPercent: 0,
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
            yPercent: -100,
            duration: 1,
            ease: "power4.in",
        },
        10
    );

    timeline.addLabel("Access", 10);

    timeline.to(
        interior1,
        {
            opacity: 1,
            yPercent: 0,
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
            yPercent: -100,
            duration: 1,
            ease: "power4.in",
        },
        14.5
    );

    timeline.addLabel("Interior 1", 14.2);

    timeline.to(
        interior2,
        {
            opacity: 1,
            yPercent: 0,
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
            yPercent: -100,
            duration: 1,
            ease: "power4.in",
        },
        19
    );

    timeline.addLabel("Interior 2", 18.7);

    timeline.to(
        mobility,
        {
            opacity: 1,
            yPercent: 0,
            duration: 1,
            ease: "power4.out",
        },
        20
    );

    timeline.addLabel("Mobility", 26.8);

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
            opacity: 0,
            yPercent: -100,
            duration: 1,
            ease: "power4.in",
        },
        27
    );

    timeline.addLabel("End");

    // Pin the tour
    ScrollTrigger.create({
        trigger: element,
        pin: pin,
        start: () => {
            const headerHeight = getComputedStyle(document.documentElement).getPropertyValue("--header-height");
            return `top ${headerHeight}`;
        },
        end: "bottom top",
    });

    // Scroll the video out at half speed
    gsap.to(video, {
        yPercent: -50,
        scrollTrigger: {
            trigger: element,
            start: "bottom bottom",
            end: "bottom top",
            scrub: true,
        },
    });

    const playToLabel = (label) => {
        const playbackSpeed = 2.75;
        const scrollPosition = timeline.scrollTrigger.labelToScroll(label);
        const scrollDelta = Math.abs(document.documentElement.scrollTop - scrollPosition);
        const scrollDuration = (scrollDelta / window.innerHeight) * playbackSpeed;

        gsap.to(window, {
            scrollTo: {
                y: scrollPosition,
                autoKill: true,
            },
            duration: scrollDuration,
            ease: "none",
        });
    };

    navPrevious.addEventListener("click", () => {
        const currentTime = timeline.progress() * timeline.duration();
        const previousTimelineLabel = timeline.previousLabel(currentTime - 0.01);

        if (previousTimelineLabel) {
            playToLabel(previousTimelineLabel);
        }
    });

    navNext.addEventListener("click", () => {
        const currentTime = timeline.progress() * timeline.duration();
        const nextTimelineLabel = timeline.nextLabel(currentTime + 0.01);

        if (nextTimelineLabel) {
            playToLabel(nextTimelineLabel);
        }
    });

    navSkip.addEventListener("click", () => {
        const scrollPosition = timeline.scrollTrigger.labelToScroll("End");

        window.scrollTo({
            top: scrollPosition,
            behavior: "instant",
        });

        gsap.to(window, {
            scrollTo: {
                y: "#benefits",
                offsetY: 40,
                autoKill: true,
            },
            duration: 1,
            ease: "expo.out",
        });
    });
}
