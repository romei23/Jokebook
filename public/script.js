const randomSetup = document.getElementById('random-setup');
const randomDelivery = document.getElementById('random-delivery');
const categoryList = document.getElementById('category-list');
const searchBtn = document.getElementById('search-btn');
const categoryInput = document.getElementById('category-input');
const jokeResults = document.getElementById('joke-results');
const form = document.getElementById('joke-form');
const addedJokes = document.getElementById('added-jokes');

// Fetch random joke
fetch('/jokebook/random')
  .then(res => res.json())
  .then(joke => {
    randomSetup.textContent = joke.setup;
    randomDelivery.textContent = joke.delivery;
  });

// Fetch categories
fetch('/jokebook/categories')
  .then(res => res.json())
  .then(categories => {
    categories.forEach(category => {
      const li = document.createElement('li');
      li.textContent = category;
      li.addEventListener('click', () => fetchJokesByCategory(category));
      categoryList.appendChild(li);
    });
  });

// Search by input
searchBtn.addEventListener('click', () => {
  const category = categoryInput.value.trim();
  if (category) {
    fetchJokesByCategory(category);
  }
});

function fetchJokesByCategory(category) {
  jokeResults.innerHTML = '';
  fetch(`/jokebook/joke/${category}`)
    .then(res => {
      if (!res.ok) throw new Error('Category not found');
      return res.json();
    })
    .then(jokes => {
      jokes.forEach(joke => {
        const li = document.createElement('li');
        li.textContent = `${joke.setup} — ${joke.delivery}`;
        jokeResults.appendChild(li);
      });
    })
    .catch(err => {
      jokeResults.innerHTML = `<li style="color:red;">${err.message}</li>`;
    });
}

// Add joke
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newJoke = {
    category: document.getElementById('new-category').value.trim(),
    setup: document.getElementById('new-setup').value.trim(),
    delivery: document.getElementById('new-delivery').value.trim()
  };

  fetch('/jokebook/joke/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newJoke)
  })
    .then(res => res.json())
    .then(jokes => {
      addedJokes.innerHTML = '';
      jokes.forEach(j => {
        const li = document.createElement('li');
        li.textContent = `${j.setup} — ${j.delivery}`;
        addedJokes.appendChild(li);
      });
      form.reset();
    });
});
