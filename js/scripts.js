var pokemonList = [
  {
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
  },
];

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 1) {
    document.write(
      `<div>
    <h2>${pokemonList[i].name}</h2>
    <p>Types: ${pokemonList[i].types} <br> Height: ${pokemonList[i].height} Big guy!</p>
    </div>`
    );
  } else {
    document.write(
      `<div>
      <h2>${pokemonList[i].name}</h2>
      <p>Types: ${pokemonList[i].types} <br> Height: ${pokemonList[i].height}</p>
      </div>`
    );
  }
}
