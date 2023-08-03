//importações
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// --Outras importações--
const app = express();

//Models
const User = require('./models/User')




//Config JSON
app.use(express.json())


//Open route- Rota pública
app.get('/',(req,res)=>{
    res.status(200).json({msg:'Bem vido a nossa API'})
})

//-- Private Route --
app.get('/user/:id', checkToken, async (req, res)=>{

    const id = req.params.id

    //Check if user exists
    const user = await User.findById(id, '-password')

    if(!user){
        return res.status(404).json({msg:"Usuario não encontrado"})
    }

    res.status(200).json({user})

})

function checkToken(req, res, next ){

    const authHeader = req.headers['authorization']
    const token =  authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({msg:'Acesso negado!'})
    }

    try {

        const secret = process.env.SECRET

        jwt.verify(token,secret)

        next()
        
    } catch (error) {
        res.status(400).json({msg: 'Token invalido'})
    }

}


//Register User
app.post('/auth/register',async (req,res)=>{

     const {name, email, password, confirmpassword}= req.body


    //Validation User
     if(!name){

        return res.status(422).json({msg:'Nome é obrigatorio'})
     }

     if(!email){

        return res.status(422).json({msg:'Email é obrigatorio'})
     }

     if(!password){

        return res.status(422).json({msg:'Senha é obrigatoria'})
     }

     if(password !== confirmpassword){

        return res.status(422).json({msg:'Senha incorreta!'})
     }

     //Check if user exixts
     const userExists = await User.findOne({email:email})

     if(userExists){
         return res.status(422).json({msg:'Email já cadastrado, use outro!'})
     }

     //create password
     const salt = await bcrypt.genSalt(12)
     const passwordHash = await bcrypt.hash(password,salt)


     //Create user
     const user = new User({
        name,
        email,
        password: passwordHash,
     })

     try {
        await user.save();

        res.status(201).json({msg: 'Usuario criado com sucesso!'})


     } catch (error) {
        console.log(error)

        res.status(500).json({msg:'Opa!, aconteceu um erro no servidor, tenta de novo!'})
     }

})

// ---Login User---
 app.post('/auth/login', async (req,res)=>{
    const {email, password} = req.body

    //validations
    if(!email){
        return res.status(422).json({msg:'O email é obrigatorio!'})
    }

     if(!password){
        return res.status(422).json({msg:'A senha é obrigatoria!'})
    }
    //check if user exists

    const user = await User.findOne({email:email})


    if(!user){
        return res.status(404).json({msg:"Usuario não encontrado!"})
    }

    // check if password match
    const checkPassword = await bcrypt.compare(password, user.password )

    if(!checkPassword){

       return res.status(422).json({msg:"Senha incorreta!"})
    }

    try {
        const secret = process.env.SECRET

        const token = jwt.sign(
            {
            id: user.id
            }, 
            secret,
        )

        res.status(200).json({msg: 'Autenticação feita com sucesso', token})

        
    } catch (error) {
        
        console.log(error)

        res.status(500).json({msg:'Opa!, aconteceu um erro no servidor, tenta de novo!'})
    }


 })   




//Credencias

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD


mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@api2.ewihn6a.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{

    app.listen(3333)
    console.log('Conectado ao BD...')
})
.catch((err)=> console.log(err))
