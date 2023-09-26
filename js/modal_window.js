function createTitle(film){
    title = document.createElement("h3")
    title.textContent = film.title
    return title
}

function createGenre(film){
    let genre = document.createElement("p")
    genre.textContent = ("Genre: " + film.genres)
    return genre
}

function createDescription(film){
    description = document.createElement("p")
    description.textContent = film.description
    return description
}

function createDate(film){
    let date = document.createElement("p")
    date.textContent = ("Date de sortie: " + film.date_published)
    return date
}

function createScore(film){
    let score = document.createElement("p")
    score.textContent = ("IMDB score: " + film.imdb_score + " sur " + film.votes + " votes")
    return score
}

function createDirector(film){
    let director = document.createElement("p")
    director.textContent = ("Réalisateur(s): " + film.directors)
    return director
}

function createActors(film){
    let actors = document.createElement("p")
    actors.textContent = ("Acteurs: " + film.actors)
    return actors
}

function createDuration(film){
    let duration = document.createElement("p")
    duration.textContent = ("Durée: " + film.duration + "min")
    return duration
}

function createCountries(film){
    let countries = document.createElement("p")
    countries.textContent = ("Pays d'origine: " + film.countries)
    return countries
}

function createBoxOfficeReview(film){
    let box_office = document.createElement("p")
    let result = film.worlwide_gross_income
    if(result == null){
        box_office.textContent = "Resultats Box Office: Information non communiquée"
    }else{
        box_office.textContent = ("Resultats Box Office: " + film.worlwide_gross_income)
    }
    return box_office
}

function createSynopsis(film){
    let synopsis = document.createElement("p")
    synopsis.textContent = ("Synopsis: " + film.long_description)
    return synopsis
}

async function getInfos(film){
    const response = await fetch("http://localhost:8000/api/v1/titles/" + film)
    film_info = await response.json()
    return film_info
}

function modal_box(film){
    let box = document.getElementById("block-page")
    let modal_container = document.createElement("div")
    modal_container.setAttribute("class", "modal-container")
    box.appendChild(modal_container)
    let overlay = document.createElement("div")
    overlay.setAttribute("class", "overlay modal-trigger")
    modal_container.appendChild(overlay)
    let modal = document.createElement("div")
    modal.setAttribute("id", "modal")
    overlay.appendChild(modal)
    close_modal = document.createElement("button")
    close_modal.setAttribute("class", "close-modal modal-trigger")
    close_modal.textContent = "X"
    modal.appendChild(close_modal)
    let img =createImg(film)
    let title = createTitle(film)
    let genre = createGenre(film)
    let date = createDate(film)
    let score = createScore(film)
    let director = createDirector(film)
    let actors = createActors(film)
    let duration = createDuration(film)
    let countries = createCountries(film)
    let box_office = createBoxOfficeReview(film)
    let synopsis = createDescription(film)
    modal.appendChild(img)
    modal.appendChild(title)
    modal.appendChild(genre)
    modal.appendChild(date)
    modal.appendChild(score)
    modal.appendChild(director)
    modal.appendChild(actors)
    modal.appendChild(duration)
    modal.appendChild(countries)
    modal.appendChild(box_office)
    modal.appendChild(synopsis)
    console.log(modal_container)
    return box
    
}

async function openModal(id){
    /* Function to create a modal window when the user click on movie img
        Mutation observer to receive all infos from api then create modal box on click
        arg = id of the movie from html class .slide*/
    const film = await getInfos(id)
    modal_box(film)
    const modalBox = document.querySelector(".modal-container")
    const close = document.querySelectorAll(".modal-trigger")

    close.forEach(trigger => trigger.addEventListener("click", toggleModal))
    function toggleModal(){
        modalBox.remove() 
    }
}
document.addEventListener("DOMContentLoaded", function(){
    // Créer un observer avec une fonction de rappel
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            // Vérifier si les éléments .slide ont été ajoutés
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                // Arrêter d'observer une fois que les éléments ont été trouvés
                mutation.addedNodes.forEach(function(node) {
                    if (node.classList && node.classList.contains('slide')) {
                        node.addEventListener("click", async () => {
                            const slide_id = node.getAttribute('id');
                            openModal(slide_id);
                        });
                }
            })}}
        );
        
        /*const slides = document.querySelectorAll(".slide");
        console.log(slides)

        slides.forEach(async(slide) => {
            slide.addEventListener("click", async()=>{
                const slide_id = slide.getAttribute('id');
                openModal(slide_id)
            })
        })*/

    });
    const button1 = document.querySelector(".best-movie-button")
        button1.addEventListener("click", async()=>{
            const button_id = button1.getAttribute("id")
            openModal(button_id)
        })

    // Observer tous les changements du nœud enfant du bloc-page
    observer.observe(document.getElementById('block-page'), { childList: true, subtree: true });
});