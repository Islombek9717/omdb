const filmList = document.querySelector(".js-films-list");
const elLoader = document.querySelector(".js-loader");
const elPrev = document.querySelector(".js-prev");
const elNext = document.querySelector(".js-next");
const searchBtn = document.querySelector(".js-form")
const searchInput = document.querySelector(".js-form-search_input")
const tempMovie = document.querySelector(".movie")





let linkOmdb = (movieName, page) => `https://www.omdbapi.com/?apikey=f68eea0e&s=${movieName}&page=${page}`;




templaterender = (item => {
    // console.log(item);
    let element=template.content.cloneNode(true)
    movieInfo = element.querySelectorAll(".data");
    movieInfo[0].src = item.Poster;
    movieInfo[1].textContent = item.Title;
    movieInfo[2].textContent = item.Year;
    movieInfo[3].dataset.id = item.imdbID;
    return element;

})

render = (data) => {
    filmList.textContent = ""
    if (data != undefined) {
        data.forEach(element => {
            filmList.appendChild(templaterender(element))
        });
    }
}

let inputName;
searchBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    inputName = searchInput.value.trim();
    if (inputName.length > 2) {
        let link = linkOmdb(inputName, 1);
        getData(link)
    }

});

let page = 1;

function getData(linkOmdb) {
    fetch(linkOmdb)
    .then((response) => response.json())
    .then((data) => {
        if (page <= 1) {
            elPrev.disabled = true;
        }
        if (page > 1) {
            elPrev.disabled = false;
        }
        if (page == Math.ceil(data.totalResults / 10)) {
            elNext.disabled = true;
        }
        if (page < Math.ceil(data.totalResults / 10)) {
            elNext.disabled = false;
        }
        
        elLoader.style.display = "none";
        render(data.Search);
    }
    );
}


function nextPage() {
    page = page + 1;
    filmList.innerHTML = "";
    elLoader.style.display = "block";
    getData(linkOmdb(inputName,page));
}
elNext.addEventListener("click", nextPage);

function prevPage() {
    page = page - 1;
    filmList.innerHTML = "";
    elLoader.style.display = "block";
    getData(linkOmdb(inputName,page));
}
elPrev.addEventListener("click", prevPage);
