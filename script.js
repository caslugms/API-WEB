const API_KEY = '57b9c16e009926ea3049a403dd98c1bc';
const API_URL = 'https://api.themoviedb.org/3/search/movie';

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsDiv = document.getElementById('results');

async function searchMovies() {
    const query = searchInput.value.trim();
    
    resultsDiv.innerHTML = '<div class="col-12 text-center"><div class="spinner-border text-light" role="status"><span class="visually-hidden">Carregando...</span></div></div>';
    
    if (!query) {
        resultsDiv.innerHTML = '<div class="col-12 text-center"><p class="text-warning">Digite o nome de um filme para buscar.</p></div>';
        return;
    }

    try {
        const response = await fetch(`${API_URL}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=pt-BR`);
        const data = await response.json();
        
        if (data.results.length === 0) {
            resultsDiv.innerHTML = '<div class="col-12 text-center"><p class="text-light">Nenhum filme encontrado. Tente outro termo.</p></div>';
            return;
        }
        
        displayMovies(data.results);
    } catch (error) {
        resultsDiv.innerHTML = '<div class="col-12 text-center"><p class="text-danger">Ocorreu um erro na busca. Tente novamente mais tarde.</p></div>';
        console.error('Erro:', error);
    }
}

function displayMovies(movies) {
    resultsDiv.innerHTML = '';
    
    movies.forEach(movie => {
        const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'Ano desconhecido';
        
        const movieCard = document.createElement('div');
        movieCard.className = 'col-md-4 col-lg-3 mb-4';
        movieCard.innerHTML = `
            <div class="card h-100">
                ${movie.poster_path 
                    ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top movie-poster" alt="${movie.title}">` 
                    : `<div class="no-poster">Imagem não disponível</div>`}
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text"><strong>Ano:</strong> ${releaseYear}</p>
                    <p class="card-text"><strong>Avaliação:</strong> ${movie.vote_average.toFixed(1)}/10</p>
                    <p class="card-text small">${movie.overview ? movie.overview.substring(0, 100) + '...' : 'Descrição não disponível.'}</p>
                </div>
                <div class="rating-badge bg-primary text-white rounded-pill">${movie.vote_average.toFixed(1)}</div>
            </div>
        `;
        
        resultsDiv.appendChild(movieCard);
    });
}

searchBtn.addEventListener('click', searchMovies);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchMovies();
});
