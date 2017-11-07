const express = require('express')
const firebase = require('firebase')
const port = process.env.PORT || 3000
const cors = require('cors')
const cron = require('node-cron')
const app = express()

app.use(cors())

var config = {
  apiKey: "AIzaSyAf6fPpTR2eBdyii4bctEVfMbj4A03J3oA",
  authDomain: "fire-mango.firebaseapp.com",
  databaseURL: "https://fire-mango.firebaseio.com",
  projectId: "fire-mango",
  storageBucket: "fire-mango.appspot.com",
  messagingSenderId: "1083307373466"
}

const firebaseApp = firebase.initializeApp(config)
const db = firebaseApp.database()

const mango = require('./mango')

app.get('/', (req, res) => {
  let tree = new mango.MangoTree(0,0,0,'yes');
  let cronJob = cron.schedule('*/1 * * * * *', function(){
    tree.grow();
    tree.harvest();
    tree.produceMangoes();
    db.ref('mango').set({
      stopMessage: '',
      status: `The Mango Tree is ${tree.age} years old and ${tree.height} meters tall. It
              beared ${tree.fruits} fruits with ${tree.good} being good and ${tree.bad} in bad condition`
    })
    if (tree.healthy == 'dead') {
      db.ref('mango').set({
        stopMessage: 'The tree has died'
      })
      cronJob.stop()
    }
    if (tree.healthy == 'disease') {
      db.ref('mango').set({
        stopMessage: 'The tree has died of disease'
      })
      cronJob.stop()
    }
  })
})

app.listen(port);
console.log('Listening on ' + port);
