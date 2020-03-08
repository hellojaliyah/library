const express= require('express')
const router = express.Router();
const Graduate = require('../models/graduate')
const Book = require('../models/book')

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
    res.render('graduates/new', {graduate: new Graduate()})
})

//Create author
router.post('/', async (req, res) =>{
    const graduate = new Graduate ({
        name: req.body.name
    })
    try {
        const newGraduate = await graduate.save()
        res.redirect(`graduates/${newGraduate.id}`)
    } catch {
    res.render('graduates/new', {
    graduate: graduate,
    errorMessage: 'Error creating profile'
                    })
    }
})

router.get('/:id', async (req, res) =>{
    try {
        const graduate = await Graduate.findById(req.params.id)
        const books = await Book.find({ graduate: graduate.id }).limit(6).exec()
        res.render('graduates/show', {
        graduate: graduate,
        booksByGraduate: books
        })
    } catch (err) {
        res.redirect('/')
    }
})

router.get('/:id/edit', async (req, res) => {
try {
    const graduate = await Graduate.findById(req.params.id)
    res.render('graduates/edit', {graduate: graduate })
} catch {
res.redirect('/graduates')
}
})

router.put('/:id', async (req, res) => {
    let graduate 
    try {
        graduate = await Graduate.findById(req.params.id)
        graduate.name = req.body.name
        await graduate.save()
        res.redirect(`/graduates/${graduate.id}`)
    } catch {
        if(graduate == null) {
            res.redirect('/')
        } else {
    res.render('graduates/edit', {
    graduate: graduate,
    errorMessage: 'Error updating profile'
            })
        }
    }
})

router.delete('/:id', async (req, res) => {
let graduate 
    try {
        graduate = await Graduate.findById(req.params.id)
        await graduate.remove()
        res.redirect(`/graduates`)
    } catch {
        if(graduate == null) {
            res.redirect('/')
        } else {
    res.redirect(`/graduates/${graduate.id}`)
        }
     }
})

module.exports = router