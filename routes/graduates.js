const express= require('express')
const router = express.Router();
const Graduate = require('../models/graduate')

//All authors
router.get('/', async (req, res) =>{
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
   try {
       const graduates = await Graduate.find(searchOptions)
       res.render('graduates/index', { 
        graduates: graduates, 
        searchOptions: req.query
    })
   } catch {
    res.redirect('/')
   }
    
})

//New author route
router.get('/new', (req, res) =>{
    res.render('graduates/new', 
    {graduate: new Graduate()})
})

//Create author
router.post('/', async (req, res) =>{
    const graduate = new Graduate ({
        name: req.body.name
    })
    try {
        const newGraduate = await graduate.save()
        // res.redirect(`authors/${newAuthor.id}`)
            res.redirect(`graduates`)
    } catch {
    res.render('graduates/new', {
    graduate: graduate,
    errorMessage: 'Error creating profile'
                    })
    }
})

module.exports = router