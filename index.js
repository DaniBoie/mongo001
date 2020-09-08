const mongojs = require('mongojs')
const db = mongojs('favorites_db')
const inquirer = require('inquirer')

inquirer
  .prompt([{
    type: 'list',
    name: 'firstChoice',
    message: 'Would you like to view or create items?',
    choices: ["View", "Create"]
  }
  ])
  .then(res => {
    switch (res.firstChoice) {
      case 'View':
        viewItems()
        break;
      case 'Create':
        createItems()
        break;
    }

  })
  .catch(err => console.log(err))

function viewItems() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'viewChoice',
        message: 'View Movies, Games, Songs, or Foods?',
        choices: ['Movies', 'Games', 'Songs', 'Foods']
      }
    ])
    .then(res => {
      switch (res.viewChoice) {
        case 'Movies':
          db.movies.find((err, data) => {
            if (err) { console.log(err) }
            console.table(data)
          })
          break;
        case 'Games':
          db.games.find((err, data) => {
            if (err) { console.log(err) }
            console.table(data)
          })
          break;
        case 'Songs':
          db.songs.find((err, data) => {
            if (err) { console.log(err) }
            console.table(data)
          })
          break;
        case 'Foods':
          db.foods.find((err, data) => {
            if (err) { console.log(err) }
            console.table(data)
          })
          break;
      }

    })
    .catch(err => console.log(err))
}

function createItems() {
  inquirer
    .prompt([{
      type: 'list',
      name: 'createChoice',
      message: 'Which would you like to add?',
      choices: ['Movies', 'Games', 'Songs', 'Foods']
    }])
    .then(res => {
      switch (res.createChoice) {
        case 'Movies':
          console.log('clicked')
          movieCreate()
          break;
        case 'Games':
          gameCreate()
          break;
        case 'Songs':
          songCreate()
          break;
        case 'Foods':
          foodCreate()
          break;
      }

    })
    .catch(err => console.log(err))
}

function movieCreate() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of the movie?'
      },
      {
        type: 'input',
        name: 'rating',
        message: "What is the movie's rating"
      }
    ])
    .then(res => {
      db.movies.insert(res, (err, data) => {
        if (err) { console.log(err) }
        console.log(data)
      })
    })
}

function gameCreate() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of the game?'
      },
      {
        type: 'input',
        name: 'rating',
        message: "What is the game's rating"
      }
    ])
    .then(res => {
      db.games.insert(res, (err, data) => {
        if (err) { console.log(err) }
        console.log(data)
      })
    })
  }

function songCreate() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of the song?'
      },
      {
        type: 'input',
        name: 'artist',
        message: "Who is the song's artist?"
      }
    ])
    .then(res => {
      db.songs.insert(res, (err, data) => {
        if (err) { console.log(err) }
        console.log(data)
      })
    })
}

function foodCreate() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the name of the food?'
      },
      {
        type: 'input',
        name: 'calories',
        message: "How many Calories per serving?"
      }
    ])
    .then(res => {
      db.foods.insert(res, (err, data) => {
        if (err) { console.log(err) }
        console.log(data)
      })
    })
}