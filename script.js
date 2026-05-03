// Lenis Smooth Scrolling for Premium Feel
const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Hide loader with a cinematic fade out
    setTimeout(() => {
        const loader = document.querySelector('.loader');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            initAnimations();
        }, 500);
    }, 2000); // 2 second ignition delay
});

// GSAP Animations
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero Section Entrance (Cinematic Trailer Feel)
    const heroTl = gsap.timeline();
    
    heroTl.from(".sub-heading", {y: 30, opacity: 0, duration: 1, ease: "power4.out"})
          .from(".main-heading .word", {
              y: 80, 
              opacity: 0, 
              duration: 1.2, 
              stagger: 0.2, 
              ease: "power4.out",
              rotationX: -20
          }, "-=0.6")
          .from(".description", {y: 30, opacity: 0, duration: 1, ease: "power3.out"}, "-=0.6")
          .from(".cta-group", {y: 30, opacity: 0, duration: 1, ease: "power3.out"}, "-=0.8")
          .from(".hero-image", {
              x: 150, 
              opacity: 0, 
              duration: 1.5, 
              ease: "power3.out",
              filter: "blur(10px)"
          }, "-=1.2")
          .from(".image-glow", {scale: 0, opacity: 0, duration: 2, ease: "power2.out"}, "-=1.5");

    // Hero Image Parallax (Moving slightly as we scroll down)
    gsap.to(".hero-image", {
        y: 150,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // 2. Skills 360 Section Entrance
    gsap.from(".skill-sphere-wrapper", {
        scale: 0.5,
        opacity: 0,
        rotationX: 40,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#skills",
            start: "top 75%",
        }
    });

    // 3. Exploded Engineering View Logic
    const tlExplode = gsap.timeline({
        scrollTrigger: {
            trigger: "#engineering",
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1
        }
    });

    // Pull layers apart on Z-axis and slightly on X/Y to show "exploded" internal workings
    tlExplode.to(".ui-layer", { z: 250, x: -50, y: -50 }, 0)
             .to(".code-layer", { z: 0 }, 0)
             .to(".logic-layer", { z: -250, x: 50, y: 50 }, 0);

    // 4. About Me - Stats Counter and Engine Block Stagger
    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#about",
            start: "top 70%"
        }
    });

    aboutTl.from(".about-sub-title", {x: -30, opacity: 0, duration: 0.8})
           .from(".about-desc", {y: 30, opacity: 0, duration: 0.8}, "-=0.4")
           .from(".stat", {scale: 0.8, opacity: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)"}, "-=0.4")
           .from(".engine-block", {x: 50, opacity: 0, duration: 1, ease: "power3.out"}, "-=0.8");

    // 5. Fleet Showcase (Horizontal Cinematic Scroll)
    const track = document.querySelector(".project-track");
    if(track) {
        // Animate the opacity of the section header to ensure it's visible
        gsap.from("#work .section-header", {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: "#work",
                start: "top 70%"
            }
        });

        // Horizontal scroll tied to vertical scroll
        gsap.to(track, {
            x: () => -(track.scrollWidth - document.documentElement.clientWidth) + "px",
            ease: "none",
            scrollTrigger: {
                trigger: "#work",
                start: "center center",
                end: () => `+=${track.scrollWidth}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true
            }
        });
        
        // Remove the opacity:0 initial state on cards that might have gotten stuck.
        // Instead, cards gently pop in as they scroll into the viewport horizontally.
    }

    // 6. Tools Marquee Entrance
    gsap.from(".marquee-wrapper", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".tools-section",
            start: "top 80%"
        }
    });

    // 7. Final CTA
    gsap.from(".cta-heading", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".cta-section",
            start: "top 80%"
        }
    });
    
    gsap.from(".cta-btn", {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.5)",
        scrollTrigger: {
            trigger: ".cta-section",
            start: "top 75%"
        }
    });
}

// Ensure lenis stops scrolling when hovering over 3D showcase
const skillContainer = document.querySelector('.skills-container');
if (skillContainer) {
    skillContainer.addEventListener('mouseenter', () => {
        lenis.options.mouseMultiplier = 0.5; // slow down scroll when focused on 3D
    });
    skillContainer.addEventListener('mouseleave', () => {
        lenis.options.mouseMultiplier = 1;
    });
}
