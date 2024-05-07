const linkRandomFilms = "https://api.kinopoisk.dev/v1.3/movie?page=1&limit=100";
const linkSearchFilms = "https://api.kinopoisk.dev/v1.2/movie/search?page=1&limit=10&query=";
const API_KEY = "ABR5PPZ-MT8MA14-MX1GXHC-7AJCPBZ";

const inputSearch = document.querySelector(".menu__input");
const place = document.querySelector(".cards");
const menu = document.querySelector(".menu__list");

showDefaultFilms(linkRandomFilms);

inputSearch.addEventListener("change", () => {
  if (inputSearch.value) {
    let link = `${linkSearchFilms}${inputSearch.value}`;
    showSearchFilms(link);
    inputSearch.value = "";
  }
});

menu.addEventListener("click", (e) => {
  if (e.target.closest("#main")) {
    burgerButton.classList.remove("active");
    menuBurger.classList.remove("active");
    content.classList.remove("blur");
    body.classList.remove("lock");
    showDefaultFilms(linkRandomFilms);
  }
});

async function responsFilms(url) {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

function renderFilms(data) {
  place.innerHTML = "";
  data.docs.forEach((el) => {
    let ratingColor = setColor(el.rating.imdb || el.rating.kp || el.rating.tmdb);
    place.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="cards__item">
      <div class="card">
        <div class="card__body">
          <div class="card__img">
            <a href="#">
              <img
              //  src="${el.poster.url}"
                alt="Fast&Furious"
              />
            </a>
          </div>
          <div class="card__content">
            <div class="card__title"><a href="#">${el.name}</a></div>
            <div class="card__gener">${el.genres.map((gener) => gener.name).join(" - ")}</div>
            <div class="card__description">
              ${el.shortDescription}
            </div>
            <div class="card__rang rang-color-${ratingColor}"><span class="rang ">${
        el.rating.imdb.toFixed(1) || el.rating.kp.toFixed(1) || el.rating.tmdb.toFixed(1)
      }</span></div>
            <button type="button" class="card__button gradient">смотреть</button>
          </div>
        </div>
      </div>
    </div>
      `
    );
  });
}

function renderSearchFilms(data) {
  place.innerHTML = "";
  data.docs.forEach((el) => {
    let ratingColor = setColor(el.rating);
    place.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="cards__item">
      <div class="card">
        <div class="card__body">
          <div class="card__img">
            <a href="#">
              <img
              //  src="${
                el.poster ||
                el.logo ||
                el.backdrop ||
                "https://w7.pngwing.com/pngs/760/904/png-transparent-computer-icons-clapperboard-film-coin-miscellaneous-angle-text.png"
              }"
                alt="Fast&Furious"
              />
            </a>
          </div>
          <div class="card__content">
            <div class="card__title"><a href="#">${el.name || el.alternativeName}</a></div>
            <div class="card__gener">${el.genres.map((gener) => gener).join(" - ")}</div>
            <div class="card__description">
              ${el.shortDescription || el.description}
            </div>
            <div class="card__rang rang-color-${ratingColor}"><span class="rang ">${el.rating.toFixed(
        1
      )}</span></div>
            <button type="button" class="card__button gradient">смотреть</button>
          </div>
        </div>
      </div>
    </div>
      `
    );
  });
}

function showDefaultFilms(link) {
  responsFilms(link).then((json) => renderFilms(json));
}
function showSearchFilms(link) {
  responsFilms(link).then((json) => renderSearchFilms(json));
}

function setColor(rating) {
  if (rating >= 9) {
    return "green";
  } else if (rating >= 7 && rating < 9) {
    return "orange";
  } else {
    return "red";
  }
}
