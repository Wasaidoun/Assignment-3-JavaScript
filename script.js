// Function to fetch and display Pokémon data based on the user input
function getPokemon() {
  // Gets the value from the input field and converts it to lowercase
  const name = document.getElementById('pokemon-name').value.toLowerCase();

  // Sends a GET request to the PokéAPI using the entered name from user input
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(response => {
      // If the response is not okay, it throws an error
      if (!response.ok) throw new Error('Pokémon not found');
      return response.json(); // Parse the JSON from the response
    })
    .then(data => {
      // Extracts image URL, type, and their abilities
      const image = data.sprites.front_default;
      const type = data.types.map(t => t.type.name).join(', ');
      const abilities = data.abilities.map(a => a.ability.name).join(', ');

      // Updates the HTML to show the Pokémon's data
      document.getElementById('pokemon-data').innerHTML = `
        <h2>${data.name.toUpperCase()}</h2>
        <img src="${image}" alt="${data.name}" />
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Abilities:</strong> ${abilities}</p>
      `;
    })
    .catch(err => {
      // Handle errors
      document.getElementById('pokemon-data').innerHTML = `<p>Pokémon not found!</p>`;
    });
}
