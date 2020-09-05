const express = require('express');
const app = express();
app.use(express.json());

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Flower Shop'
app.locals.flowers = [
  {
    id: 1,
    name: 'Rose',
    image: 'https://images.freeimages.com/images/large-previews/4dd/rose-1514960.jpg',
    price: 25,
  },
  {
    id: 2,
    name: 'Tulip',
    image: 'https://images.freeimages.com/images/large-previews/e48/tulip-1401330.jpg',
    price: 35
  },
  {
    id: 3,
    name: 'Orchid',
    image: 'https://images.freeimages.com/images/large-previews/d0f/orchid-1363254.jpg',
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

app.post('/api/v1/flowers', (request, response) => {
  const requiredProperties = ['name', 'image', 'price'];
  for (let property of requiredProperties) {
    if(!request.body[property]) {
      return response.status(422).json({
        errorMessage: `Cannot POST: no property of ${property} in request`
      })
    }
  }

  const { name, image, price } = request.body;
  const id = Date.now().toString();

  app.locals.flowers.push({ id, name, image, price })
  response.status(201).json({ id, name, image, price })
})

app.delete('/api/v1/flowers/:id', (request, response) => {
  const { id } = request.params;
  const foundFlower = app.locals.flowers.find(flower => flower.id.toString() === id)

  if(!foundFlower) {
    return response.status(404).json({errorMessage: `Cannot find flowerwith id of ${id}`})
  }

  app.locals.flowers = app.locals.flowers.filter(flower => flower.id.toString() !== id)
  response.sendStatus(204)
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}`)
})
