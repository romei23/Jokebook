const jokeModel = require('../models/jokeModel');

exports.getCategories = async (req, res) => {
  try {
    const categories = await jokeModel.getCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getJokesByCategory = async (req, res) => {
  const { category } = req.params;
  const limit = req.query.limit;

  try {
    const jokes = await jokeModel.getByCategory(category, limit);
    if (jokes.length === 0) {
      return res.status(404).json({ error: 'Category not found or no jokes in this category' });
    }
    res.json(jokes);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getRandomJoke = async (req, res) => {
  try {
    const joke = await jokeModel.getRandom();
    res.json(joke);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.addJoke = async (req, res) => {
  const { category, setup, delivery } = req.body;

  if (!category || !setup || !delivery) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await jokeModel.addJoke({ category, setup, delivery });
    const jokes = await jokeModel.getByCategory(category);
    res.status(201).json(jokes);
  } catch (err) {
    console.error('Add Joke Error:', err.message); 
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
