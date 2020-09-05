const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Flower Shop'
app.locals.flowers = [
  {
    id: 1,
    name: 'Rose',
    image: 'https://images.freeimages.com/images/large-previews/4dd/rose-1514960.jpg',
    quantity: {
      amount: 4,
      metric: 'Dozen'
    },
    price: 25,
  },
  {
    id: 2,
    name: 'Tulip',
    image: 'https://images.freeimages.com/images/large-previews/e48/tulip-1401330.jpg',
    quantity: {
      amount: 8,
      metric: 'Pack of 15 (assorted colors)'
    },
    price: 35
  },
  {
    id: 3,
    name: 'Orchid',
    image: 'https://images.freeimages.com/images/large-previews/d0f/orchid-1363254.jpg',
    quantity: {
      amount: 12,
      metric: 'Double Stem Plant'
    },
    price: 45
  }
]

app.get('/', (request, response) => {
  response.send('Flower Shop Inventory')
})

app.get('/api/v1/flowers', (request, response) => {
  const flowers = app.locals.flowers;

  response.json({ flowers });
})

app.get('/api/v1/flowers/:id', (request, response) => {
  const id = request.params.id;
  const flower = app.locals.flowers.find(flower => flower.id.toString() === id)

  if(!flower) {
    response.satatus(404).json({
      errorMessage: `Could not find a flower with an id of ${id}`
    })
  }

  response.status(200).json(flower)
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}`)
})
