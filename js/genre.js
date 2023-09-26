async function getBestFilmByGenre(genre){
    /* Function to get movies by genre from the API
        arg = genre */
    let page = 1
    let next_page = true
    let list_film = []

    while(next_page){
        const response = await fetch(`http://localhost:8000/api/v1/titles/?genre=${genre}&imdb_score_min=8.5&page=${page}`)
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

    console.log(list_film)
    return list_film
}

(async() => {
    try{
        let action = await getBestFilmByGenre("romance")
        await getBest7(action, 1)
        let comedy = await getBestFilmByGenre("comedy")
        await getBest7(comedy, 2)
        let adventure = await getBestFilmByGenre("adventure")
        await getBest7(adventure, 3)

    }
    catch(error){
        console.log(error)
    }
})()
