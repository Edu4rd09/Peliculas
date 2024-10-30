const apiKey = '981bd3b5b25bd4a0a0c1eb92e09861b5';
        const apiUrlPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es`;
        const apiUrlSearch = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es&query=`;
        const apiUrlGenres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=es`;
        const apiUrlByGenre = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es&with_genres=`;

        // Fetch y mostrar géneros en el select
        async function fetchGenres() {
            const response = await fetch(apiUrlGenres);
            const data = await response.json();
            const genres = data.genres;
            const genreSelect = document.getElementById('genre-select');

            genres.forEach(genre => {
                const option = document.createElement('option');
                option.value = genre.id;
                option.textContent = genre.name;
                genreSelect.appendChild(option);
            });
        }

        // Función para buscar películas populares o por búsqueda
        async function fetchMovies(url) {
            const response = await fetch(url);
            const data = await response.json();
            const movies = data.results;
            displayMovies(movies);
        }

        // Mostrar las películas
        function displayMovies(movies) {
            const movieList = document.getElementById('movie-list');
            movieList.innerHTML = '';

            if (movies.length === 0) {
                movieList.innerHTML = '<p>No se encontraron resultados.</p>';
                return;
            }

            movies.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie-card');

                const movieImg = document.createElement('img');
                movieImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                movieImg.alt = movie.title;

                const movieTitle = document.createElement('h3');
                movieTitle.textContent = movie.title;

                const movieOverview = document.createElement('p');
                movieOverview.textContent = movie.overview;

                movieCard.appendChild(movieImg);
                movieCard.appendChild(movieTitle);
                movieCard.appendChild(movieOverview);
                movieList.appendChild(movieCard);
            });
        }

        // Función para filtrar por género
        function filterByGenre() {
            const genreId = document.getElementById('genre-select').value;
            if (genreId) {
                fetchMovies(apiUrlByGenre + genreId);
            } else {
                fetchMovies(apiUrlPopular);
            }
        }

        // Función para buscar películas por palabra clave
        function searchMovies() {
            const query = document.getElementById('search-input').value;
            if (query.length > 2) {
                fetchMovies(apiUrlSearch + encodeURIComponent(query));
            } else {
                filterByGenre(); // Mostrar las populares o por género si el campo está vacío
            }
        }

        // Inicializar la página cargando géneros y películas populares
        fetchGenres();
        fetchMovies(apiUrlPopular);