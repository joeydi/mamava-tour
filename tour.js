import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, SplitText);

export default function initTour(element) {
    if (!element) return;

    const video = element.querySelector("video");
    const videoDuration = 29.7;
    const timeLabel = element.querySelector(".time");
    const navPrevious = element.querySelector(".nav .previous");
    const navNext = element.querySelector(".nav .next");
    const navSkip = element.querySelector(".nav .skip");
    const navLabel = element.querySelector(".nav .label");
    const intro = element.querySelector(".intro");
    // const introSplit = new SplitText(intro.querySelector("h2"), { type: "lines" });
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

    video.addEventListener("timeupdate", () => {
        timeLabel.innerText = video.currentTime.toFixed(2);
    });

    gsap.set(intro, {
        opacity: 1,
    });

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

    const entryTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
        },
        // onUpdate: () => {
        //     const time = video.currentTime.toFixed(2);
        //     timeLabel.innerText = time;
        // },
        onComplete: () => {
            entryTimeline.kill();
        },
    });

    entryTimeline.fromTo(
        video,
        {
            currentTime: 0,
        },
        {
            currentTime: 2,
            duration: 2,
            ease: "none",
        },
        0
    );

    const timeline = gsap.timeline({
        paused: true,
        onUpdate: () => {
            const time = timeline.progress() * timeline.duration();
            const label = getSectionLabel(time);
            navLabel.innerText = label;

            // Disable prev/next buttons at ends
            navPrevious.disabled = !timeline.previousLabel();
            navNext.disabled = !timeline.nextLabel();
        },
    });

    timeline.fromTo(
        video,
        {
            currentTime: 2,
        },
        {
            currentTime: 29.7,
            duration: 27.7,
            ease: "none",
        },
        0
    );

    timeline.to(
        intro,
        {
            opacity: 0,
            yPercent: -100,
            duration: 1,
            ease: "power4.in",
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
        1
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
        1
    );

    timeline.to(
        exterior,
        {
            opacity: 0,
            yPercent: -100,
            duration: 1,
            ease: "power4.in",
        },
        4.5
    );

    timeline.addLabel("Exterior", 4.5);

    timeline.to(
        access,
        {
            opacity: 1,
            yPercent: 0,
            duration: 1,
            ease: "power4.out",
        },
        5.5
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
        5.5
    );

    timeline.to(
        access,
        {
            opacity: 0,
            yPercent: -100,
            duration: 1,
            ease: "power4.in",
        },
        8.1
    );

    timeline.addLabel("Access", 8.1);

    timeline.to(
        interior1,
        {
            opacity: 1,
            yPercent: 0,
            duration: 1,
            ease: "power4.out",
        },
        9
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
        9
    );

    timeline.to(
        interior1,
        {
            opacity: 0,
            yPercent: -100,
            duration: 1,
            ease: "power4.in",
        },
        12.1
    );

    timeline.addLabel("Interior 1", 12.1);

    timeline.to(
        interior2,
        {
            opacity: 1,
            yPercent: 0,
            duration: 1,
            ease: "power4.out",
        },
        13.5
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
        13.75
    );

    timeline.to(
        interior2,
        {
            opacity: 0,
            yPercent: -100,
            duration: 1,
            ease: "power4.in",
        },
        17
    );

    timeline.addLabel("Interior 2", 16.7);

    timeline.to(
        mobility,
        {
            opacity: 1,
            yPercent: 0,
            duration: 1,
            ease: "power4.out",
        },
        18
    );

    timeline.addLabel("Mobility", 24.8);

    timeline.to(
        mobilitySplit.lines,
        {
            yPercent: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power4.out",
            stagger: 0.1,
        },
        18
    );

    timeline.to(
        mobility,
        {
            opacity: 0,
            yPercent: -100,
            duration: 1,
            ease: "power4.in",
        },
        25
    );

    timeline.addLabel("End");

    const playToLabel = (label) => {
        const labelTime = timeline.labels[label];
        const duration = Math.abs(timeline.time() - labelTime);
        console.log({ labelTime, duration });

        timeline.tweenTo(label, {
            duration: duration,
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
