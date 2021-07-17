const fastify = require('fastify')({ logger: false })
const express = require('express');
// const bodyParser = require('body-parser');
const path = require('path');
const multer = require('fastify-multer');

const cors = require('fastify-cors');
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const fastifyStatic = require('fastify-static')
fastify.register(require('fastify-express'));
fastify.register(fastifyStatic, {
  root: path.join(__dirname, '/../', 'client', 'dist'),
  // prefix: '/dist/', // optional: default '/'
})
fastify.register(cors, {origin: true})
fastify.register(multer.contentParser);

const geoCode = require('./api/geoCode.js');
const getLatLng = require('./api/getLatLng.js');
const spotPhotos = require('./helpers/spotPhotos.js');

const {Event, User, Spot, Location} = require('../database/index.js');

const { CLOUD_NAME, CLOUD_API, CLOUD_SECRET, CLOUDINARY_URL} = require('../cloudinaryConfig.js');
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API,
  api_secret: CLOUD_SECRET,
})

const spotPhotoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'spots'
  },
  allowedFormats: ["jpg", "png", "jpeg", "gif"],
  transformation: [
     { if: "w_gt_1900", width: 1900, crop: "scale" },
     { if: "h_gt_1900", height: 1900, crop: "scale" },
     { quality: "auto" },
     { format: 'jpg' }
  ]
});
const spotPhotoParser = multer({ storage: spotPhotoStorage });
fastify.decorate('multer', { spotPhotoParser});


fastify.get('/', (req, res) => {
  res.status(200).sendFile('index.html');
})

fastify.post('/spot', (req, res) => {
  geoCode(req.body).then(results => Spot.find().then(results => res.status(201).send(results)));
})

fastify.get('/spots', (req, res) => {
  Spot.find().then(results => {
    res.status(200).send(results)
  })
});

fastify.put('/spots/:id', (req, res) => {
  const body = req.body.data;
  const id = req.params.id
  geoCode(body, id).then(results => Spot.find().then(results => res.status(201).send(results)));
})

fastify.delete('/spots/:id', (req, res) => {
  Spot.remove({_id: req.params.id}).then(results => Spot.find().then(results => res.status(201).send(results)))
})

fastify.post('/spots/uploads/:id', {preHandler: spotPhotoParser.array('spotPhotos')}, (req, res) => {
  console.log(req.files)
  const id = req.params.id;
  const body = req.files
  const UUIDS = req.files;
  spotPhotos(UUIDS, id).then(Spot.find({'_id': id}).then(results => res.status(201).send(results)))
})

fastify.post('/spots/videoUploads/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body
  const videos = req.body.map(video => video.video.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')).filter(video => video.includes('youtube.com/embed/'));
  Spot.findByIdAndUpdate({'_id': id}, {$push: {videos: [...videos]}}).then(results => Spot.find({'_id': id}).then(results => res.status(200).send(results)));
})

fastify.post('/events', (req, res) => {
  getLatLng(req.body, 'events').then(results => res.status(200).send(results));
});

fastify.get('/events', (req, res) => {
  Event.find().then(results => {
    res.status(200).send(results);
    results.forEach(result => {
      if (result.date[1] < new Date()) {
        Event.remove({_id: result._id}).then(item => console.log('Deleted Outdated Events'))
      }
    })
  });
})

fastify.delete(`/events/:id`, (req, res) => {
  Event.remove({_id: req.params.id}).then(results => Event.find().then(data => res.status(201).send(data)))
})

fastify.put('/events/:id', (req, res) => {
  const body = req.body.data;
  const id = req.params.id;
  getLatLng(body, 'events', id).then(results => Event.find().then(data => res.status(201).send(data)));
})

fastify.get('/users', (req, res) => {
  User.find().then(results => res.status(200).send(results));
})

fastify.post('/users', (req, res) => {
  getLatLng(req.body, 'users').then(results => res.status(200).send(results));
});

fastify.put('/users/:id', (req, res) => {
  const body = req.body.data;
  const id = req.params.id;
  getLatLng(body, 'users', id).then(results => User.find().then(data => res.status(201).send(data)));
})

fastify.delete(`/users/:id`, (req, res) => {
  User.remove({_id: req.params.id}).then(results => User.find().then(data => res.status(201).send(data)))
})

fastify.get('/userInfo/', (req, res) => {
  console.log('REQUEST',req)
  User.find({email: req.query.email}).then(results => res.status(200).send(results));
})

const port = 3005;
fastify.listen(port, '::', (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
