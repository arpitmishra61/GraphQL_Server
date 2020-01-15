const express=require("express")
const expressGraphQL=require("express-graphql")
const schema=require("./schema")

const app=express()

const PORT=process.env.PORT || 3000;

app.use("/graphql",expressGraphQL({
    graphiql:true,
    schema:schema


}))

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})