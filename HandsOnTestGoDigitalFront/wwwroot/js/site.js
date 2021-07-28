var APIKEY = '848fcb8e4c9b8d8a0e51fcc8b37a4540';
var URL = 'https://api.themoviedb.org/3/';

const getLastMovies = async () => {
    let url = `${URL}movie/latest?api_key=${APIKEY}`;
    let result = await fetch(url);
    let data = await result.json();
    appenedData([data]);
}

const getTopRated = async () => {
    let url = `${URL}movie/top_rated?api_key=${APIKEY}&page=1`;
    let result = await fetch(url);
    let data = await result.json();
    appenedData(data.results);
}

const getPopulares = async () => {
    let url = `${URL}movie/popular?api_key=${APIKEY}`;
    let result = await fetch(url);
    let data = await result.json();
    appenedData(data.results);
}

const appenedData = data => {
    $('#carouselIndicators').empty();
    $('#carouselInner').empty();
    let i = 0;
    data.forEach(x => {
        let active = i === 0 ? 'active' : '';
        let srcImage = x.poster_path != null ? `https://www.themoviedb.org/t/p/w220_and_h330_face/${x.poster_path}` : 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17ae992840d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17ae992840d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22217.7609375%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
        $('#carouselIndicators').append(templateCarouselIndicators(i++));
        $('#carouselInner').append(templateCarouselInner(srcImage, x.title, x.overview, active));
    });
}

const templateCarouselIndicators = number => (`
    <li data-target="#carousel" data-slide-to="${number}" class=""></li>
`);

const templateCarouselInner = (srcImage, title, overview, active = '') => (`<div class="carousel-item ${active}">
        <img class="d-block w-100" data-src="holder.js/800x400?auto=yes&amp;bg=777&amp;fg=555&amp;text=${title}" alt="${title} [800x400]" src="${srcImage}" data-holder-rendered="true">
        <div class="carousel-caption d-none d-md-block">
            <h5>${title}</h5>
            <p>${overview}</p>
        </div>
    </div>`);

$(document).ready(function () {

    let href = window.location.href;
    switch (true) {
        case href.indexOf('Populares') > 0:
            getPopulares();
            break;
        case href.indexOf('TopRated') > 0:
            getTopRated();
            break;
        default:
            getLastMovies();
            break;
    }

    $('.carousel').carousel({
        interval: 4000
    });
})