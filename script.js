const cursor_circle = document.querySelector(".cursor-circle"),
      cursor = document.querySelectorAll(".cursor"),
      elements = document.querySelectorAll(".getHover");
const imageWrap = document.querySelector(".image-wrap");
const bigName = document.querySelector(".big-name");

function runAnimation() {
    let hasPlayed = sessionStorage.getItem("animationPlayed");

    if (!hasPlayed) {
        let timeline = gsap.timeline({
            defaults: { duration: 1, ease: "power3.out" }
        });

        timeline.to(".image-wrap", {
            height: "550px", 
            backgroundSize: "120%", 
            backgroundPosition: "center center", 
            duration: 1,
            ease: "power3.inOut", 
        }).to(
            ".image-wrap", {
                height: "250px", 
                backgroundPosition: "center center", 
                y: "-10", 
                duration: 1, 
            }, "-=0.3" 
        ).call(() => {
            
            gsap.fromTo(".big-name", {
                y: "50px", 
                opacity: 0
            }, {
                y: "0",
                opacity: 1,
                duration: 0.3,
                ease: "power3.out"
            });
        }).from(".hide", {
            opacity: "0",
            duration: 0.3,
        }, "-=0.2"); 
        sessionStorage.setItem("animationPlayed", "true");
    } else {
        imageWrap.style.height = "250px";
        imageWrap.style.backgroundSize = "100%";
        imageWrap.style.backgroundPosition = "center center";
        imageWrap.style.transform = "translateX(-50%)"; 
        bigName.style.opacity = "1";
        bigName.style.transform = "translateY(0)";
    }
}

function getYDistance(el) {
    return window.innerHeight - document.querySelector(el).getBoundingClientRect().top;
}

window.addEventListener("mousemove", (e) => {
    let xPosition = e.clientX;
    let yPosition = e.clientY;

    cursor.forEach(ele => {
        ele.style.transform = `translate(calc(-50% + ${xPosition}px), calc(-50% + ${yPosition}px))`;
        ele.style.opacity = "1";
    });
});

elements.forEach(el => {
    el.addEventListener("mouseover", () => {
        cursor_circle.classList.add("biggerCursor");
    });
    el.addEventListener("mouseout", () => {
        cursor_circle.classList.remove("biggerCursor");
    });
});

runAnimation();
