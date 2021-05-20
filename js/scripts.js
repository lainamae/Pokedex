let pokemonRepository = (function () {
  let pokemonList = [    {
        name: "jolteon",
        types: "electric",
        height: 0.8,
      },
      {
        name: "charhander",
        types: "fire",
        height: 0.6,
      },
      {
        name: "clefable",
        types: "fairy",
        height: 1.3,
      }
    ];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }
  return {
    add: add,
    getAll: getAll
  };
})();
let pokemonData = pokemonRepository.getAll();
pokemonData.forEach(function (pokemon) {
  document.write(`<div><h2>${pokemon.name}</h2><p>${pokemon.types}</p><p>${pokemon.height}</p>
  </div>`);
});
