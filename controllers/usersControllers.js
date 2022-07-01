const data  = require('../MOCK_DATA.json')
const mssql = require('mssql')
const sqlConfig = require('../config/config');
const { user } = require('../config/config');
const poolPromise = require('../config/poolPromise')

module.exports = {

    //get all users
    
    getUsers: async(req, res)=>{
            let pool = await poolPromise()
            pool.query(`select * FROM usersData`).then(results=>{
                console.log(results.recordset)
                res.json({
                    status:200,
                    success: true,
                    message: "success",
                    results:results.recordset})
            }

            )
        

        
    },

    //get user by email
    getUser: async (req, res)=>{
        const {email} = req.params
        let pool=await poolPromise()
        pool.query(`SELECT * FROM usersData WHERE email='${email}'`).then(results=>{
            let user=results.recordset[0]
            console.log(results)
            if(user){
                return res.status(200).json({
                    status:200,
                    success: true,
                    message: "success",
                    results:user})}
            
                    res.status(404).json({
                        status:404,
                        success: false,
                        message: "not found",
                        results:{}})
            
        })
    }
        // const user = data.find(user=>user.email===email)
     ,

    // login
    login: async(req, res)=>{
        const {email, Password} = req.body
        let pool =await poolPromise()
        pool.query(`SELECT * FROM usersData WHERE email='${email}'`).then (resullts=>{
            let user= results.recordset[0]
            if(user ){
                let password=user.password
                if(password=password){
                return res.json({
                    status:200,
                    success: true,
                    message: "Logged in successfully",
                    results:user})}
                
                res.status(403).json({
                    status:404,
                    success: false,
                    message: "Wrong credentials",
                    results:{}})
                }
        })
    }
        // const user = data.find(user=>user.email===email)
        
    
        
    ,


    create : async(req, res)=>{
        let {id, first_name, last_name, email, gender, Password} = req.body
            let pool = await poolPromise()
            pool.query(`insert into usersData 
                        VALUES('${id}', '${first_name}', '${last_name}', '${email}', '${gender}', '${Password}')`)
                        .then(results=>{
                            if(results.rowsAffected){
                                res.send("user added")
                                console.log("user added")
                            }})
              
        }   
}