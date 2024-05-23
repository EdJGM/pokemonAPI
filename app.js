//consumir api de pokemon
document.getElementById('search-button').addEventListener('click', () => {
    const search = document.getElementById('search').value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
        .then(response => response.json())
        .then(data => {
            const pokemon = document.getElementById('pokemon');
            pokemon.innerHTML =
                `
                <h1>${data.name}</h1>
                <img src="${data.sprites.front_default}" alt="${data.name}" />
                <p>Altura: ${data.height}</p>
                <p>Peso: ${data.weight}</p>
                `;
        })
        .catch(error => console.log(error));
});