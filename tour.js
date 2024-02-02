import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, SplitText);

export default function initTour(element) {
    if (!element) return;

    const video = element.querySelector("video");
    const pin = element.querySelector(".pin");
    const videoDuration = 29.7;
    const videoScrollTriggerDuration = 2;
    // const timeLabel = element.querySelector(".time");
    // const timelineLabel = element.querySelector(".timeline");
    const navPrevious = element.querySelector(".nav .previous");
    const navNext = element.querySelector(".nav .next");
    const navLabel = element.querySelector(".nav .label");
    const intro = element.querySelector(".intro");
    const introButton = intro.querySelector("button");
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

    // video.addEventListener("timeupdate", () => {
    //     timeLabel.innerText = video.currentTime.toFixed(2);
    // });

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

    ScrollTrigger.create({
        trigger: element,
        pin: pin,
        pinSpacing: true,
        start: () => {
            return "top " + getComputedStyle(document.documentElement).getPropertyValue("--header-height");
        },
        end: "bottom bottom",
    });

    gsap.to(video, {
        yPercent: 50,
        scrollTrigger: {
            trigger: element,
            start: "bottom bottom",
            end: "100%",
            scrub: true,
        },
    });

    const entryTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
        },
    });

    entryTimeline.fromTo(
        video,
        {
            currentTime: 0,
        },
        {
            currentTime: videoScrollTriggerDuration,
            duration: videoScrollTriggerDuration,
            ease: "none",
        },
        0
    );

    let previousProgress = 0;
    let previousLabel = "Welcome";

    const updateNav = () => {
        const progress = timeline.progress();
        const direction = progress > previousProgress ? 1 : -1;
        const label = direction > 0 ? timeline.nextLabel(timeline.time() - 0.1) : timeline.previousLabel(timeline.time() + 0.1);
        const formattedLabel = label.replace("1", "").replace("2", "");

        if (formattedLabel !== previousLabel) {
            gsap.timeline()
                .to(navLabel, {
                    x: -20 * direction,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.in",
                })
                .add(() => {
                    navLabel.innerText = formattedLabel;
                })
                .set(navLabel, {
                    x: 20 * direction,
                })
                .to(navLabel, {
                    x: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out",
                });
        }

        previousProgress = progress;
        previousLabel = formattedLabel;

        // Disable prev/next buttons at ends
        navPrevious.disabled = !timeline.previousLabel();
        navNext.disabled = !timeline.nextLabel();
    };

    let timelineComplete = false;
    const timeline = gsap.timeline({
        paused: true,
        onUpdate: () => {
            updateNav();
            // timelineLabel.innerText = timeline.time().toFixed(2);

            if (!timelineComplete && timeline.time() > 26) {
                timelineComplete = true;
                gsap.to(window, {
                    scrollTo: "+=" + window.innerHeight / 2,
                    duration: 2,
                    ease: "power4.inOut",
                });
            }

            if (timelineComplete && timeline.time() < 26) {
                timelineComplete = false;
            }
        },
    });

    timeline.addLabel("Welcome", 0);

    timeline.fromTo(
        video,
        {
            currentTime: videoScrollTriggerDuration,
        },
        {
            currentTime: videoDuration,
            duration: videoDuration - videoScrollTriggerDuration,
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

    timeline.addLabel("Interior1", 12.1);

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

    timeline.addLabel("Interior2", 16.7);

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

    timeline.addLabel("The end.");

    const playToLabel = (label) => {
        const labelTime = timeline.labels[label];
        const duration = Math.abs(timeline.time() - labelTime);
        const videoCurrentTime = video.currentTime;

        entryTimeline.scrollTrigger.disable();

        if (element.classList.contains("active")) {
            timeline.tweenTo(label, {
                duration: duration,
                ease: "none",
                onComplete: () => {
                    // If we're going back to the start, animate video back to its scroll position, then re-enable entryTimeline.scrollTrigger
                    if (label === "Welcome") {
                        gsap.to(video, {
                            currentTime: videoScrollTriggerDuration / 2,
                            duration: videoScrollTriggerDuration / 2,
                            ease: "none",
                            onComplete: () => {
                                element.classList.remove("active");
                                ScrollTrigger.refresh();
                                entryTimeline.scrollTrigger.enable();
                            },
                        });
                    }
                },
            });
        } else {
            gsap.fromTo(
                video,
                {
                    currentTime: videoCurrentTime,
                },
                {
                    currentTime: videoScrollTriggerDuration,
                    duration: videoScrollTriggerDuration - videoCurrentTime,
                    ease: "none",
                    onComplete: () => {
                        timeline.tweenTo(label, {
                            duration: duration,
                            ease: "none",
                        });
                    },
                }
            );
        }

        // Scroll the window up to the top of the tour
        gsap.to(window, {
            scrollTo: {
                y: element,
                offsetY: () => {
                    return getComputedStyle(document.documentElement).getPropertyValue("--header-height").replace("px", "");
                },
            },
            duration: 2,
            ease: "power4.out",
            onComplete: () => {
                element.classList.add("active");
                ScrollTrigger.refresh();
            },
        });
    };

    introButton.addEventListener("click", () => {
        playToLabel("Exterior");
    });

    navPrevious.addEventListener("click", () => {
        const previousTimelineLabel = timeline.previousLabel();

        if (previousTimelineLabel) {
            playToLabel(previousTimelineLabel);
        }
    });

    navNext.addEventListener("click", () => {
        const nextTimelineLabel = timeline.nextLabel();

        if (nextTimelineLabel) {
            playToLabel(nextTimelineLabel);
        }
    });
}
