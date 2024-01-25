import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function initFeatures(element) {
    if (!element) return;

    const pin = element.querySelectorAll(".features-pin");
    const progress = element.querySelector(".progress");
    const progressRect = progress.getBoundingClientRect();
    const panels = element.querySelectorAll(".panel");
    const media = element.querySelectorAll(".media-wrap img:not(:first-child), .media-wrap video:not(:first-child)");
    const lazyVideos = element.querySelectorAll(".media-wrap video[data-src]");
    const lists = element.querySelectorAll(".benefit ul");
    const contents = element.querySelectorAll(".heading, .benefit");
    const contentRects = Array.from(contents).map((el) => {
        return el.getBoundingClientRect();
    });
    const scrollTriggers = element.querySelectorAll("[data-scroll-target]");

    gsap.set(
        media,
        {
            yPercent: 100,
            scale: 1.5,
        },
        0
    );

    gsap.set(
        lists,
        {
            height: 0,
        },
        0
    );

    const contentHeadings = element.querySelectorAll(".features-content h1, .features-content h2");
    const contentHeadingRects = Array.from(contentHeadings).map((el) => {
        return el.getBoundingClientRect();
    });

    const timeline = gsap.timeline({
        scrollTrigger: {
            // markers: true,
            trigger: element,
            start: "top top",
            end: `+=${(panels.length - 1) * 100}%`,
            pin: pin,
            scrub: 1,
            snap: {
                snapTo: "labels",
                duration: { min: 0.2, max: 0.5 },
                delay: 0,
            },
            onEnter: () => {
                lazyVideos.forEach((el) => {
                    el.src = el.dataset.src;
                });
            },
        },
    });

    timeline.set(
        progress,
        {
            scaleY: contentRects[0].height / 100,
        },
        0
    );

    panels.forEach((el, i) => {
        const label = el.id ?? "start";
        timeline.addLabel(label, i);

        // Skip the last panel
        if (i === panels.length - 1) {
            return;
        }

        timeline.to(
            media[i],
            {
                yPercent: 0,
                scale: 1,
                ease: "none",
                duration: 1,
            },
            i
        );

        if (i > 0) {
            timeline.to(
                lists[i - 1],
                {
                    height: 0,
                    ease: "none",
                    duration: 0.5,
                },
                i
            );
        }

        timeline.to(
            lists[i],
            {
                height: "auto",
                ease: "none",
                duration: 0.5,
            },
            i
        );

        timeline.to(
            progress,
            {
                y: () => {
                    return contentHeadingRects[i + 1].y - progressRect.y + 10;
                },
                scaleY: () => {
                    return contentRects[i + 1].height / 100;
                },
                ease: "power2.out",
                duration: 1,
            },
            i
        );
    });

    // Add click handlers to scroll timeline from [data-scroll-target] to associated timeline label
    scrollTriggers.forEach((el) => {
        el.addEventListener("click", () => {
            const target = el.dataset.scrollTarget;
            gsap.to(window, {
                scrollTo: {
                    y: timeline.scrollTrigger.labelToScroll(target),
                    autoKill: true,
                },
            });
        });
    });
}
