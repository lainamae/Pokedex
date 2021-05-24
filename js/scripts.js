let pokemonRepository = (function () {
  let repository = [    {
        name: "Jolteon",
        types: "electric",
        height: 0.8,
      },
      {
        name: "Charmander",
        types: "fire",
        height: 0.6,
      },
      {
        name: "Clefable",
        types: "fairy",
        height: 1.3,
      }
    ];

  function add(pokemon) {
    if (typeof pokemon === 'object') {
      return repository.push(pokemon);
      console.log(repository);
    } else {
      console.log("Please use objects to input new pokemon")
    }
  }

  function getAll() {
    return repository;
  }
  function showDetails(pokemon){
    console.log(pokemon)
  }
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    button.addEventListener('click',function(event){
      showDetails(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
