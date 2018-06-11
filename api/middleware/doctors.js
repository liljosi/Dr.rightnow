const knex = require('../../knex')

const createDoctor = (req,res,next) => {
  let email = { email:req.body.email }
  let {id,name,phone} = req.body
  knex('doctors').select().where(email).then((response) => {
      console.log(response)
        if(response == false) {
          knex('doctors').insert({
              id:id,
              name:name,
              email:email.email,
              phone:phone
          }).then(() => {
              res.send('Doctor registered successfully!')
          })
        }else{
            res.send('Doctor is already registered!')
        }
    }) 
}

const getDoctorById = (req,res,next) => {
    let {id} = req.params
    console.log(id)
    knex('doctors').select().where('id',id).then((response) => {
        res.json(response)
    })
}

const updateUserById = (req,res,next) => {
    let {id} = req.params
    let {name,email,phone} = req.body 
    knex('doctors').update({name:name,email:email,phone:phone})
    .where('id',id)
    .then(() => {
        res.send('Doctor with id '+id+' updated!')
    })
}

const deleteUserById = (req,res,next) => {
    let {id} = req.params

    knex('doctors').delete().where('id', id)
    .then(() => {
        res.send('Doctor with id: '+id+' deleted!')
    })
}

module.exports = {
    createDoctor,
    getDoctorById,
    updateUserById,
    deleteUserById
}
