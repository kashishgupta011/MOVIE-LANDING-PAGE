const movieList = document.querySelector(".movie-list");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

const movieCards = document.querySelectorAll(".movie-card");
const hero = document.querySelector(".hero");
const heroTitle = document.getElementById("hero-title");
const heroDescription = document.getElementById("hero-description");
const heroContent = document.querySelector(".hero-content");

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const movies = [
    {
        title: "THE LITTLE MERMAID",
        description: "Dive into an amazing underwater adventure filled with friendship, courage and magic.",
        background: "images/bg-little-mermaid.jpg"
    },
    {
        title: "THE BLACK DEMON",
        description: "A terrifying adventure beneath the ocean awaits.",
        background: "images/bg-the-black-demon.jpeg"
    },
    {
        title: "THE COVENANT",
        description: "A soldier fights against all odds to save his friend.",
        background: "images/bg-the-covenant.jpeg"
    },
    {
        title: "THE TANK",
        description: "A mysterious discovery turns into a dangerous underwater adventure.",
        background: "images/the-tank.jpeg"
    },
    {
        title: "65",
        description: "A dangerous journey begins on an unknown world.",
        background: "images/bg-65.jpeg"
    },
    {
        title: "THE LITTLE MERMAID",
        description: "Return to the magical underwater world.",
        background: "images/bg-little-mermaid.jpg"
    },
    {
        title: "THE BLACK DEMON",
        description: "Face the creature lurking beneath the sea.",
        background: "images/bg-the-black-demon.jpeg"
    },
    {
        title: "THE COVENANT",
        description: "A mission that will test courage and loyalty.",
        background: "images/bg-the-covenant.jpeg"
    }
];

let currentMovie = 0;


// =========================
// CHANGE MOVIE
// =========================

function changeMovie(index) {

    const movie = movies[index];

    movieCards.forEach(card => {
        card.classList.remove("active");
    });

    movieCards[index].classList.add("active");

    hero.style.backgroundImage = `
        linear-gradient(
            90deg,
            rgba(0,0,0,0.9),
            rgba(0,0,0,0.4),
            rgba(0,0,0,0.1)
        ),
        url("${movie.background}")
    `;

    heroTitle.textContent = movie.title;
    heroDescription.textContent = movie.description;

    heroContent.classList.remove("hero-animate");

    void heroContent.offsetWidth;

    heroContent.classList.add("hero-animate");
}


// =========================
// PREVIOUS ARROW
// =========================

prev.addEventListener("click", () => {

    currentMovie--;

    if (currentMovie < 0) {
        currentMovie = movieCards.length - 1;
    }

    changeMovie(currentMovie);

});


// =========================
// NEXT ARROW
// =========================

next.addEventListener("click", () => {

    currentMovie++;

    if (currentMovie >= movieCards.length) {
        currentMovie = 0;
    }

    changeMovie(currentMovie);

});


// =========================
// CARD CLICK
// =========================

movieCards.forEach((card, index) => {

    card.addEventListener("click", () => {

        currentMovie = index;

        changeMovie(currentMovie);

    });

});


// =========================
// AUTOMATIC MOVIE CHANGE
// =========================

setInterval(() => {

    currentMovie++;

    if (currentMovie >= movieCards.length) {
        currentMovie = 0;
    }

    changeMovie(currentMovie);

}, 5000);


// =========================
// SEARCH MOVIE
// =========================

function searchMovie() {

    const searchText = searchInput.value.toLowerCase().trim();

    // Empty search
    if (searchText === "") {

        movieCards.forEach(card => {
            card.style.display = "";
        });

        return;
    }

    let foundMovie = false;

    movieCards.forEach((card, index) => {

        const movieName = movies[index].title.toLowerCase();

        if (movieName.includes(searchText)) {

            card.style.display = "";

            // First matching movie open in Hero
            if (!foundMovie) {

                currentMovie = index;

                changeMovie(index);

                foundMovie = true;
            }

        } else {

            card.style.display = "none";

        }

    });

    // Movie not found
    if (!foundMovie) {

        alert("Movie not found!");

    }

}


// =========================
// SEARCH BUTTON
// =========================

searchBtn.addEventListener("click", (event) => {

    event.preventDefault();

    searchMovie();

});


// =========================
// ENTER KEY
// =========================

searchInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        event.preventDefault();

        searchMovie();

    }

});