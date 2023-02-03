function smoothScrolling() {
    let links = document.querySelectorAll('#body-header a');

    for (let s of links) {
        s.addEventListener('click', smoothScroll);
    }

    let interval;
    function smoothScroll(event) {
        event.preventDefault();

        let id = this.getAttribute('href');
        id = id.substring(1);

        let targetSection = document.getElementById(id);

        interval = setInterval(scroll, 50, targetSection);
    }

    function scroll(targetSection) {
        let sectionCoordinates = targetSection.getBoundingClientRect();

        if (sectionCoordinates.top <= 0) {
            clearInterval(interval);
            return;
        }

        window.scrollBy(0, 100);
    }
}

function skillBarAnimation() {
    let progressBar = document.querySelectorAll(".skill-progress > div");
    function initialBar() {
        for (let bar of progressBar) {
            bar.style.width = 0 + "%";
        }
    }

    initialBar();
    let skillsContainer = document.getElementById('skills');

    function fillBars() {
        for (let bar of progressBar) {
            /*
            // Approach 1
            let skillPercentage = bar.getAttribute('data-skill-bar');
            bar.style.width = skillPercentage + '%';
            bar.style.transitionDuration = '1.5s';
            bar.style.transitionProperty = 'width';
            bar.style.transitionTimingFunction = 'ease-in-out';
            */

            // Approach 2
            let targetWidth = bar.getAttribute('data-skill-bar');
            let currWidth = 0;

            let interval = setInterval(animateBar, 10);

            function animateBar() {
                if (currWidth > targetWidth) {
                    clearInterval(interval);
                    return;
                }

                currWidth++;
                bar.style.width = currWidth + '%';
            }
        }
    }

    let animationDone = false;
    function checkScroll() {
        let coordinates = skillsContainer.getBoundingClientRect();

        if (!animationDone && coordinates.top < window.innerHeight) {
            animationDone = true;
            fillBars();
        }

        if (coordinates.bottom < 0 || coordinates.top > window.innerHeight) {
            animationDone = false;
            initialBar();
        }
    }

    window.addEventListener('scroll', checkScroll);
}

smoothScrolling(); // Smooth scrolling
// skillBarAnimation(); // Skill bar animation

function singleBarAnimation() {
    let skillProgress = document.querySelectorAll(".skill-progress > div");

    function initialiseSingleBar(progress) {
        progress.setAttribute("data-visited", false);
        progress.style.width = 0 + '%';
    }

    for (let bar of skillProgress) {
        initialiseSingleBar(bar);
    }

    function fillSingleBar(progress) {
        let targetWidth = progress.getAttribute('data-skill-bar');
        let currWidth = 0;

        let interval = setInterval(fillBar, 15);

        function fillBar() {
            if (currWidth >= targetWidth) {
                clearInterval(interval);
                return;
            }

            currWidth++;
            progress.style.width = currWidth + '%';
        }
    }

    function checkScroll() {
        for (let progress of skillProgress) {
            let position = progress.getBoundingClientRect();

            if ((progress.getAttribute("data-visited") == "false") && position.top <= (window.innerHeight - position.height) && position.bottom >= (0 + position.height)) {
                fillSingleBar(progress);
                progress.setAttribute("data-visited", true);
            }

            if (position.top > window.innerHeight || position.bottom < (0 - position.height)) {
                initialiseSingleBar(progress);
                progress.setAttribute("data-visited", false);
            }
        }
    }
    window.addEventListener('scroll', checkScroll);
}

singleBarAnimation();