const questions = [
  {
    question: "Qual é a sua abordagem em relação aos problemas?",
    options: ["a) Resolvo-os com inteligência e criatividade.", "b) Eu evito problemas sempre que possível.", "c) Não me importo muito com problemas."]
  },
  {
    question: "Como você lida com o desconhecido?",
    options: ["a) Eu abraço o desconhecido e vou em frente.", "b) Prefiro evitar o desconhecido.", "c) O desconhecido me assusta, mas eu enfrento mesmo assim."]
  },
  {
    question: "Qual é a sua relação com a autoridade?",
    options: ["a) Eu desafio a autoridade sempre que necessário.", "b) Eu tento seguir as regras, mas questiono quando necessário.", "c) Eu sigo as regras sem questionar."]
  },
  {
    question: "Como você se descreveria em termos de inteligência?",
    options: ["a) Extremamente inteligente, sempre buscando conhecimento.", "b) Inteligente o suficiente para sobreviver.", "c) Não ligo muito para inteligência, contanto que me divirta."]
  },
  {
    question: "Qual é a sua atitude em relação a aventuras interdimensionais?",
    options: ["a) Totalmente a favor, adoro explorar novos mundos.", "b) Eu poderia tentar uma ou duas vezes.", "c) Prefiro ficar na minha zona de conforto."]
  },
  // Adicione mais perguntas conforme necessário
];

const quizForm = document.getElementById('quizForm');
const questionsList = document.getElementById('questionsList');
const resultDiv = document.getElementById('result');

let characters = [];
let quizCompleted = false;

async function fetchCharacters() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
    characters = data.results;
  } catch (error) {
    console.error('Erro ao buscar personagens:', error);
  }
}

fetchCharacters();

function buildQuiz() {
  questions.forEach((question, index) => {
    const listItem = document.createElement('li');
    const questionText = document.createElement('p');
    questionText.classList.add('question-text');
    questionText.textContent = `${index + 1}. ${question.question}`;
    listItem.appendChild(questionText);

    question.options.forEach((option, optionIndex) => {
      const radioInput = document.createElement('input');
      radioInput.type = 'radio';
      radioInput.name = `question${index}`;
      radioInput.value = String.fromCharCode(97 + optionIndex); // Converte índice para letra (a, b, c...)
      const optionLabel = document.createElement('label');
      optionLabel.textContent = option;
      listItem.appendChild(radioInput);
      listItem.appendChild(optionLabel);
      listItem.appendChild(document.createElement('br'));
    });

    questionsList.appendChild(listItem);
  });
}

function calculateResult() {
  if (quizCompleted) return;

  const answers = [];

  questions.forEach((question, index) => {
    const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
    if (selectedOption) {
      answers.push(selectedOption.value);
    } else {
      answers.push(null);
    }
  });

  const similarCharacters = [];

  characters.forEach(character => {
    let score = 0;

    // Lógica de comparação com cada personagem
    // Adicione mais comparações conforme necessário

    // Exemplo de comparação (substitua com suas próprias comparações)
    if (answers[0] === 'a' && character.status === 'Alive') {
      score++;
    } else if (answers[0] === 'b' && character.status === 'Dead') {
      score++;
    } else if (answers[0] === 'c' && character.status === 'unknown') {
      score++;
    }

    // Adicione mais comparações aqui

    // Armazena os personagens e suas pontuações
    similarCharacters.push({ character, score });
  });

  // Ordena os personagens com base na pontuação (do maior para o menor)
  similarCharacters.sort((a, b) => b.score - a.score);

  // Exibe os três personagens mais semelhantes
  let resultHTML = '';
  for (let i = 0; i < 3; i++) {
    const character = similarCharacters[i].character;
    resultHTML += `<div class="character-result">
                    <p>Você é como: ${character.name}</p>
                    <img src="${character.image}" alt="${character.name}">
                  </div>`;
  }

  resultDiv.innerHTML = resultHTML;

  quizCompleted = true;
}

quizForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const unansweredQuestions = [];
  
  questions.forEach((question, index) => {
    const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
    if (!selectedOption) {
      unansweredQuestions.push(index + 1);
    }
  });

  if (unansweredQuestions.length > 0) {
    resultDiv.innerHTML = `<p class="error">Por favor, responda todas as perguntas. Perguntas não respondidas: ${unansweredQuestions.join(', ')}</p>`;
  } else {
    calculateResult();
  }
});

buildQuiz();
