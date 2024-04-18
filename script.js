const characterId = document.getElementById('characterId');
const btnGo = document.getElementById('btn-go');
const content = document.getElementById('content');
const image = document.getElementById('img');

const fetchApi = (value) => {
  const result = fetch(`https://rickandmortyapi.com/api/character/${value}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    return data;
  });

  return result;
}

fetchApi(10)

btnGo.addEventListener('click', async (event) => { 
  event.preventDefault();
  const result = await fetchApi(characterId.value);
  content.textContent = `${JSON.stringify(result, undefined, 2)}`;
  image.src = `${result.image}`
});