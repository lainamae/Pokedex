let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // push pokemon

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("Please use objects to input new pokemon");
    }
  }

  // returns list of pokemon from API generated repo + pushed pokemon

  function getAll() {
    return pokemonList;
  }

  // makes buttons for all pokemon, button class is ".button-class"

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    button.classList.add("btn");

    listPokemon.classList.add("list-group-item");
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    button.addEventListener("click", function () {
      showDetails(pokemon);
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
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
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

  // Show the details modal
  let modalContainer = document.querySelector("#modal-container");
  function showModal(item) {
    modalContainer.innerHTML = "";
    let modal = document.createElement("div");
    modal.classList.add("modal");
    let pokemonInfo = document.createElement("div");
    pokemonInfo.classList.add("pokemon-info");
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerHTML = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    let nameElement = document.createElement("h1");
    let heightElement = document.createElement("p");
    let imageElement = document.createElement("img");
    nameElement.innerText = item.name;
    heightElement.innerHTML = `<b>Height: </b>${item.height}0 cm`;
    imageElement.src = item.imageUrl;
    imageElement.alt = `Sprite of ${item.name}`;

    modal.appendChild(pokemonInfo);
    pokemonInfo.appendChild(imageElement);
    pokemonInfo.appendChild(nameElement);
    pokemonInfo.appendChild(heightElement);
    modal.appendChild(closeButtonElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");
  }

  // hide the modal

  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }

  // additonal event listeners to hide modal

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
    ``;
  });

  // Return all functions as global variables

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

// end of pokemonRepository IIFE

// Loads API generated list, then gets complete list with any pushed pokemon & for each pokemon creates a list item.

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
