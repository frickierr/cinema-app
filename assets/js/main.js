const searchForm = document.querySelector('.search-form');
const searchInput = searchForm.querySelector('.search-form__input');
const movies = document.querySelector('.movies');

let searchString = null;
let searchLast = null;

const debounce = (() => {
    let timer = null;

    return (cb, ms) => {
        if (timer) {
            clearTimeout(timer)
            timer = null;
        }
        timer = setTimeout(cb, ms);
    }
})()

const debounced = () => {

}

const getData = (url) => {
    return fetch(url)
        .then(response => response.json())
        .then(json => json.Search)
}

const addMovieToList = (movie) => {
    const item = document.createElement('div');
    const img = document.createElement('img');
    const itemTitle = document.createElement('span');
    const itemYear = document.createElement('span');

    item.setAttribute('class', 'movie');

    img.setAttribute('class', 'movie__image');
    img.setAttribute('src', movie.Poster !== 'N/A' ? movie.Poster : 'assets/images/no-photo.png');
    img.setAttribute('alt', movie.Title);
    img.setAttribute('title', movie.Title);

    itemTitle.setAttribute('class', 'movie__title');
    itemTitle.innerHTML = movie.Title;

    itemYear.setAttribute('class', 'movie__year');
    itemYear.innerHTML = movie.Year;

    item.append(img);
    item.append(itemTitle);
    item.append(itemYear);
    movies.append(item);
}

const handler = (e) => {

    searchString = e.target.value.trim();

    console.log(e);

    debounce(() => {
        if (searchString && searchString.length > 2 && searchString !== searchLast) {
            getData(`http://www.omdbapi.com/?apikey=26a1d776&s=${searchString}`)
                .then(movies => {
                    if (movies) {
                        movies.forEach(movie => addMovieToList(movie))
                    } else {
                        throw Error('Server returned wrong response.')
                    }
                })
                .catch(err => console.error(err))
        }
        searchLast = searchString;
    }, 2000)
}

searchInput.addEventListener('keyup', handler);
searchForm.addEventListener('submit', (e) => e.preventDefault());
