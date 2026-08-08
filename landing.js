// =====================================================
// TREE & GRAPH ALGORITHM LAB
// Landing Page JavaScript
// =====================================================


// ================================================
// Scroll Reveal Animation
// ================================================

const revealElements = document.querySelectorAll(
    ".problem-card, .step, .about-section, .stat-card"
);


const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(
                    entry.target
                );

            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


// ================================================
// Smooth Scroll
// ================================================

const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


internalLinks.forEach((link) => {

    link.addEventListener(
        "click",
        function (event) {

            const targetId =
                this.getAttribute("href");

            const target =
                document.querySelector(targetId);


            if (target) {

                event.preventDefault();

                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }

        }
    );

});


// ================================================
// Problem Card 3D Hover
// ================================================

const problemCards =
    document.querySelectorAll(
        ".problem-card"
    );


problemCards.forEach((card) => {

    card.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX - rect.left;


            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) / centerY) * -2;


            const rotateY =
                ((x - centerX) / centerX) * 2;


            card.style.transform =
                `
                translateY(-8px)
                perspective(800px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

});


// ================================================
// Navbar Effect On Scroll
// ================================================

const navbar =
    document.querySelector(
        ".navbar"
    );


window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 40) {

            navbar.style.background =
                "rgba(2, 6, 23, 0.75)";

            navbar.style.backdropFilter =
                "blur(15px)";

            navbar.style.borderRadius =
                "0 0 15px 15px";

            navbar.style.paddingLeft =
                "18px";

            navbar.style.paddingRight =
                "18px";

        }
        else {

            navbar.style.background =
                "transparent";

            navbar.style.backdropFilter =
                "none";

            navbar.style.borderRadius =
                "0";

            navbar.style.paddingLeft =
                "0";

            navbar.style.paddingRight =
                "0";

        }

    }
);


// ================================================
// Console Information
// ================================================

console.log(
    "================================="
);

console.log(
    "Tree & Graph Algorithm Lab"
);

console.log(
    "Problem 1: Tree of Trusted Servers"
);

console.log(
    "Problem 2: Emergency Route Validation"
);

console.log(
    "================================="
);