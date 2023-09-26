let best_movie = document.getElementsByClassName("best-movie")
let best_movie_info = document.getElementById("best-movie-info")
let best_movie_img = document.getElementById("best-movie-img")
let buttonElement = best_movie_info.querySelector(".best-movie-button");

function createImg(film){
    img = document.createElement("img")
    img.setAttribute("src", film.image_url)
    img.setAttribute("alt", "Image "+ film.title)
    img.setAttribute("id", "best-movie-img")
    return img
}

function completeTitle(film){
    title = document.getElementById("titre")
    title.textContent = film.title
    return title
}

function completeDescription(film){
    description = document.getElementById("description")
    description.textContent = film.description
    return description
}

function createIdButton(film){
    const button = document.querySelector(".best-movie-button")
    button.id = film.id
    return button
}

let slides = document.getElementsByClassName("slides")

function createImgMovie(film){
    let movie = document.createElement("div")
    movie.classList.add("slide")
    movie.setAttribute('id', film.id)
    let movie_img = document.createElement("img")
    movie_img.setAttribute("src", film.image_url)
    movie_img.setAttribute("alt", "Image du film"+ film.title)
    movie_img.setAttribute("class", "movie-img")
    movie.appendChild(movie_img)
    return movie
}

async function getBestFilm() {
    /**Function to get the movies having an imdb score higher than 9 from the API */
    let page = 1
    let next_page = true
    let list_film = []
    
    while(next_page){
        const response = await fetch(`http://localhost:8000/api/v1/titles/?imdb_score_min=9&page=${page}`);
        if (response.status !== 200) {
            throw new Error("La requéte à échouée")
        }

        const films = await response.json()
        
        for(let e of films.results){
            list_film.push(e)
        }
        list_film.sort((a,b) => {
            if(a.imdb_score !== b.imdb_score){
                return b.imdb_score - a.imdb_score
            }else{
                return b.votes - a.votes
            }
        })
        
        if(films.next === null){
            next_page = false
            break
        }
            
        page++
    }
    
    return list_film
    
}

async function getBest7(films, i){
    /* Function to get the first 7 film from the list of film
    
        arg = list of films and the index of slide class from html */
    const best_7 = films.slice(0,7)
    for(let film of best_7){
        let img = createImgMovie(film)
        slides[i].appendChild(img)}
}

async function getBestFilmInfos(){
    /* Function to get the first element of the list of best films 
    and get info about it from the api */
    const best_films = await getBestFilm()
    await getBest7(best_films, 0)
    if(best_films.length >0){
        const response = await fetch(`http://localhost:8000/api/v1/titles/` + best_films[0].id)
        if (response.status !== 200) {
            throw new Error("La requéte à échouée")
        }
        best_film_info = await response.json()
        console.log(best_film_info)
        return best_film_info
    }
}   

(async() => {
    try{
        const best_film = await getBestFilmInfos()
        let img = createImg(best_film)
        completeTitle(best_film)
        createIdButton(best_film)
        completeDescription(best_film)
        best_movie_img.appendChild(img)
        }
    catch(error){
        console.log(error)
    }
})()