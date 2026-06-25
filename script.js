const movies = [
  {
    title: "Coolie",
    year: 2025,
    duration: "2h 50m",
    genres: ["Action", "Thriller"],
    rating: 10,
    director: "Lokesh Kanagaraj",
    cast: "Rajinikanth, Nagarjuna Akkineni, Shruti Haasan",
    poster: "https://picsum.photos/seed/coolie2025/300/450",
    description:
      "A retired labor-union leader investigates the mysterious death of an old friend, a trail that pulls him straight into a powerful smuggling syndicate.",
  },
  {
    title: "Karuppu",
    year: 2026,
    duration: "2h 30m",
    genres: ["Action", "Fantasy"],
    rating: 10,
    director: "RJ Balaji",
    cast: "Suriya, Trisha Krishnan",
    poster: "https://picsum.photos/seed/karuppu2026/300/450",
    description:
      "A guardian deity takes the disguise of a small-town lawyer to take on a corrupt court system that preys on the powerless.",
  },
  {
    title: "Good Bad Ugly",
    year: 2025,
    duration: "2h 20m",
    genres: ["Action", "Drama"],
    rating: 10,
    director: "Adhik Ravichandran",
    cast: "Ajith Kumar, Trisha Krishnan",
    poster: "https://picsum.photos/seed/goodbadugly2025/300/450",
    description:
      "A retired gangster who promised his son a peaceful life is dragged back into his old world after that son lands in serious trouble.",
  },
  {
    title: "Parasakthi",
    year: 2026,
    duration: "2h 20m",
    genres: ["Drama", "Period"],
    rating: 10,
    director: "Sudha Kongara",
    cast: "Sivakarthikeyan, Ravi Mohan, Atharvaa Murali",
    poster: "https://picsum.photos/seed/parasakthi2026/300/450",
    description:
      "Inspired by real events, three friends get swept into the 1965 anti-Hindi imposition protests that shook Tamil Nadu.",
  },
  {
    title: "Thaai Kizhavi",
    year: 2026,
    duration: "2h 10m",
    genres: ["Drama"],
    rating: 10,
    director: "Sivakumar Murugesan",
    cast: "Radhika Sarathkumar, Aruldoss",
    poster: "https://picsum.photos/seed/thaaikizhavi2026/300/450",
    description:
      "A tough, unyielding elderly moneylender in a small village is forced to face the consequences of decades of strict, fearsome dealings.",
  },
  {
    title: "Kara",
    year: 2026,
    duration: "2h 55m",
    genres: ["Action", "Thriller"],
    rating: 10,
    director: "Vignesh Raja",
    cast: "Dhanush, Mamitha Baiju",
    poster: "https://picsum.photos/seed/kara2026/300/450",
    description:
      "Set in rural India in the 1990s, a reformed thief is pulled back into crime after a predatory bank seizes his family's land.",
  },
  {
    title: "Thug Life",
    year: 2025,
    duration: "2h 45m",
    genres: ["Action", "Drama"],
    rating: 10,
    director: "Mani Ratnam",
    cast: "Kamal Haasan, Silambarasan TR, Trisha Krishnan",
    poster: "https://picsum.photos/seed/thuglife2025/300/450",
    description:
      "An aging mafia kingpin seeks redemption and revenge after being betrayed by the very brother and protege he once trusted.",
  },
  {
    title: "Jana Nayagan",
    year: 2026,
    duration: "3h 6m",
    genres: ["Action", "Thriller"],
    rating: 10,
    director: "H. Vinoth",
    cast: "Vijay, Pooja Hegde, Bobby Deol",
    poster: "https://picsum.photos/seed/jananayagan2026/300/450",
    description:
      "A clash between two ideological rivals, one fighting for ordinary people and the other clinging to power, resurfaces years later.",
  },
];

const movieGrid = document.getElementById("movie-grid");
const noResultsMsg = document.getElementById("no-results");
const searchInput = document.getElementById("search-input");

const modal = document.getElementById("movie-modal");
const closeModalBtn = document.getElementById("close-modal");
const modalPoster = document.getElementById("modal-poster");
const modalTitle = document.getElementById("modal-title");
const modalMeta = document.getElementById("modal-meta");
const modalCrew = document.getElementById("modal-crew");
const modalGenres = document.getElementById("modal-genres");
const modalRating = document.getElementById("modal-rating");
const modalDescription = document.getElementById("modal-description");

function formatRating(movie) {
  if (movie.rating === null) {
    return "🎬 Coming Soon";
  }
  return `⭐ ${movie.rating} / 10`;
}

function renderMovies(movieList) {
  movieGrid.innerHTML = "";

  if (movieList.length === 0) {
    noResultsMsg.style.display = "block";
    return;
  } else {
    noResultsMsg.style.display = "none";
  }

  movieList.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";

    const genreTagsHTML = movie.genres
      .map((genre) => `<span class="genre-tag">${genre}</span>`)
      .join("");

    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title} poster" />
      <h3>${movie.title}</h3>
      <p class="card-rating">${formatRating(movie)}</p>
      <div class="genre-tags">${genreTagsHTML}</div>
    `;

    card.addEventListener("click", () => openModal(movie));

    movieGrid.appendChild(card);
  });
}

function openModal(movie) {
  modalPoster.src = movie.poster;
  modalPoster.alt = movie.title + " poster";
  modalTitle.textContent = movie.title;
  modalMeta.textContent = `${movie.year} • ${movie.duration}`;
  modalCrew.textContent = `Directed by ${movie.director} • Starring ${movie.cast}`;
  modalRating.textContent = formatRating(movie);
  modalDescription.textContent = movie.description;

  modalGenres.innerHTML = movie.genres
    .map((genre) => `<span class="genre-tag">${genre}</span>`)
    .join("");

  modal.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
}

closeModalBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase().trim();

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm)
  );

  renderMovies(filteredMovies);
});

renderMovies(movies);
