const listaPersonagens = document.querySelector('.lista')
const form = document.querySelector('.form')
const input = document.querySelector('.pesquisa')

const narutinho = async (query) => {

    const apiNaruto = await fetch(`https://narutoql.up.railway.app/graphql?query=${query}`)

    const dados = await apiNaruto.json()
    console.log(dados.data)
    return dados.data
}

const main = async (variavel) => {
    const personagens = `{
        characters (filter: {name:"${variavel}"}){
          results {
            name
            avatarSrc
            description
            rank
            village
            age
          }
        }
      }`

    await narutinho(personagens).then(res => showPersonagens(res));
}

function showPersonagens(personagem){
  let template = '';
  listaPersonagens.innerHTML = '';

  todosPersonagens = personagem.characters.results;
  console.log('X', todosPersonagens);
  
  todosPersonagens.forEach((personagem) =>{
    template += `
      <div class="card">
        <li class="media">
          <div class="img">
            <img src="${personagem.avatarSrc}">
            <h5>${personagem.name}</h5>
          </div>
          <div class="media-body">
            <span>Idade : ${personagem.age}</span><br>
            <span>Descrição : ${personagem.description}</span><br>
            <span>Rank : ${personagem.rank}</span><br>
            <span>Vila : ${personagem.village}</span>
          </div>
        </li>
      </div>`
  });

  listaPersonagens.innerHTML = `
  <ul class="list-unstyled">
    ${template}
  </ul>
  `;

}

form.addEventListener('submit', (evento) =>{

  evento.preventDefault();
  main(input.value);
});

main('');
