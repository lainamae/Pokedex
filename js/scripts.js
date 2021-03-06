let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=900';

  // push pokemon

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log('Please use objects to input new pokemon');
    }
  }

  // returns list of pokemon from API generated repo + pushed pokemon

  function getAll() {
    return pokemonList;
  }

  // makes buttons for all pokemon, button class is ".button-class"

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('col');
    button.classList.add('button-class');
    button.classList.add('btn');
    // button.classList.add("btn-primary");

    listPokemon.classList.add('list-group-item');
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModal');
    button.addEventListener('click', function () {
      showDetails(pokemon);
      console.log(pokemon);
    });
  }

  // fetch pokemon list from api

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Fetch pokemon details from API

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        item.abilities = details.abilities;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Display pokemon details modal

  function showDetails(item) {
    loadDetails(item).then(function () {
      showModal(item);
    });
  }

  function showModal(item) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h4 class="pokemon-name">' + item.name + '</h4>');
    let imageFront = $('<img src =' + item.imageUrlFront + '></img>');
    let imageBack = $('<img src =' + item.imageUrlBack + '></img>');
    let imageElement = $('<div class="d-flex justify-content-center align-items-center images-element"></div>');
    let heightElement = $('<p>' + '<b>Height :</b> ' + item.height + '</p>');
    let weightElement = $('<p>' + '<b>Weight :</b> ' + item.weight + '</p>');
    let typesElement = $('<div class = "d-flex align-items-center"><b>Types:</b></div>');
    item.types.forEach(function (item) {
      let typeItem = $('<p class="types-element ' + item.type.name + '">' + item.type.name + '</p>');
      typesElement.append(typeItem);
    });
    let abilitiesElement = $('<div class = "d-flex align-items-center"><b>Abilities:</b></div>');
    item.abilities.forEach(function (item) {
      let abilitiesItem = $('<p class="abilities-element">' + item.ability.name + '</p>');
      abilitiesElement.append(abilitiesItem);
    });

    modalBody.append(nameElement);
    imageElement.append(imageFront);
    imageElement.append(imageBack);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);

    $('#pokemonModal').modal('toggle');
  }

  // Return all functions as global variables

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
  };
})();

// end of pokemonRepository IIFE

// Loads API generated list, then gets complete list with any pushed pokemon & for each pokemon creates a list item.

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
