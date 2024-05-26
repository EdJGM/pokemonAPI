class PokemonAPI {
    constructor() {
        this.apiURL = 'https://pokeapi.co/api/v2/pokemon/';//busqueda por nombre e ID
        this.apiURLType = 'https://pokeapi.co/api/v2/type/';//busqueda por tipo
        this.apiURLAbility = 'https://pokeapi.co/api/v2/ability/';//busqueda por habilidad
        this.searchButton = document.getElementById('search-button');
        this.randomButton = document.getElementById('random');
        this.searchInput = document.getElementById('search');
        this.pokemonContainer = document.getElementById('pokemon');
        this.spinner = document.getElementById('spinner');
        this.peticionFail = document.getElementById('peticion-fail');
        this.modal = document.getElementById('modal');
        this.btnCloseModal = document.getElementById('cerrar-modal');
        this.searchButtonID = document.getElementById('search-button-id');
        this.searchButtonType = document.getElementById('search-button-type');
        this.searchButtonAbility = document.getElementById('search-button-ability');

        // Ocultar el spinner al inicio
        this.hideSpinner();

        this.searchButton.addEventListener('click', () => this.searchPokemon());
        this.randomButton.addEventListener('click', () => this.randomPokemon());
        this.btnCloseModal.addEventListener('click', () => this.closeModal());
        this.searchButtonID.addEventListener('click', () => this.searchPokemonID());
        this.searchButtonType.addEventListener('click', () => this.searchPokemonType());
        this.searchButtonAbility.addEventListener('click', () => this.searchPokemonAbility());
    }

    displaySpinner() {
        this.spinner.style.display = 'block';
    }

    hideSpinner() {
        this.spinner.style.display = 'none';
    }

    displayModal() {
        this.modal.style.display = 'block';
    }

    closeModal() {
        this.modal.style.display = 'none';
        this.searchInput.value = '';
        this.pokemonContainer.innerHTML = '';
    }

    handleFetchError(error) {
        console.log(error);
        if (error instanceof TypeError) {
            this.peticionFail.textContent = 'La peticion ha fallado de parte de la api';
        }
        this.displayModal();
    }

    displayPokemon(data) {
        this.pokemonContainer.innerHTML = '';
        if (Array.isArray(data.pokemon)) {
            // Si data.pokemon es un array, estamos manejando una búsqueda por tipo
            data.pokemon.forEach(pokemon => {
                fetch(pokemon.pokemon.url)
                    .then(response => response.json())
                    .then(pokemonData => {
                        this.pokemonContainer.innerHTML += `
                            <div class="card">
                                <h1>${pokemonData.name}</h1>
                                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}" />
                            </div>
                        `;
                    });
            });
        } else {
            // Si data.pokemon no es un array, estamos manejando una búsqueda por nombre o ID
            this.pokemonContainer.innerHTML =
                `
            <h1>${data.name}</h1>
            <img src="${data.sprites.front_default}" alt="${data.name}" />
            <p>Altura: ${data.height}</p>
            <p>Peso: ${data.weight}</p>
            `;
        }
    }

    fetchPokemon(url) {
        this.displaySpinner();
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw Error('No se ha encontrado el pokemon');
                }
                return response.json();
            })
            .then(data => this.displayPokemon(data))
            .catch(error => this.handleFetchError(error))
            .finally(() => this.hideSpinner());
    }

    searchPokemon() {
        const searchValue = this.searchInput.value;
        this.fetchPokemon(`${this.apiURL}${searchValue}`);
    }

    searchPokemonID() {
        const searchValue = this.searchInput.value;
        this.fetchPokemon(`${this.apiURL}${searchValue}`);
    }

    searchPokemonType() {
        const searchValue = this.searchInput.value;
        this.fetchPokemon(`${this.apiURLType}${searchValue}`);

    }

    searchPokemonAbility() {
        const searchValue = this.searchInput.value;
        this.fetchPokemon(`${this.apiURLAbility}${searchValue}`);
    }

    randomPokemon() {
        const randomId = Math.floor(Math.random() * 898);
        this.fetchPokemon(`${this.apiURL}${randomId}`);
    }
}

new PokemonAPI();
