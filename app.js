//consumir api de pokemon
document.getElementById('search-button').addEventListener('click', () => {
    const search = document.getElementById('search');
    const searchValue = search.value;
    const pokemon = document.getElementById('pokemon');
    const spinner = document.getElementById('spinner');

    // Mostrar el spinner
    spinner.style.display = 'block';

    fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)
        .then(response => {
            if (!response.ok) {
                throw Error('No se ha encontrado el pokemon');
            }
            return response.json();
        })
        .catch(error => {
            console.log(error);
            if (error instanceof TypeError) {
                const peticionFail = document.getElementById('peticion-fail');
                peticionFail.textContent = 'La peticion ha fallado de parte de la api';
                throw error;
            }
            throw error;
        })
        .then(data => {
            pokemon.innerHTML =
                `
                <h1>${data.name}</h1>
                <img src="${data.sprites.front_default}" alt="${data.name}" />
                <p>Altura: ${data.height}</p>
                <p>Peso: ${data.weight}</p>
                `;
        })
        .catch(error => {
            console.log(error);
            const modal = document.getElementById('modal');
            modal.style.display = 'block';
        })
        .finally(() => {
            // Ocultar el spinner
            spinner.style.display = 'none';
        });


    const btnCerrarModal = document.getElementById('cerrar-modal');
    btnCerrarModal.addEventListener('click', () => {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
        search.value = '';
        pokemon.innerHTML = '';
    });
});
