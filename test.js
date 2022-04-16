const models = require('./models');

models.brew_list.findAll({
    where: {
        user_id: 1
    }
}).then(breweries => {
    console.log(breweries.length)
})