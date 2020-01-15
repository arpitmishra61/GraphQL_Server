const axios=require("axios")
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull

} =require("graphql")




const CricketerType=new GraphQLObjectType({
    name:'Cricketer',
    fields:()=>({
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        type:{type:GraphQLString},
        age:{type:GraphQLString},
        team:{type:GraphQLString},

    })
})

//Root Query
const rootQuery=new GraphQLObjectType({
    name:'RootQueryType',
   fields:{cricketer:{
        type:CricketerType,
        args:{
            id:{type:GraphQLString}
        },
        resolve(parentValue,args){
            return axios.get("http://localhost:3000/cricketers").then(res=>{
            const cricketers=res.data

            for(let i=0;i<cricketers.length;i++)
            {

              if(cricketers[i].id==args.id)
              return cricketers[i]
              

            }
            }).catch((err)=>err)
            
        }
    },
cricketers:{
    type: new GraphQLList(CricketerType),
    resolve(parentValue,args){

        return axios.get("http://localhost:3000/cricketers").then(res=>{
            const cricketers=res.data
            console.log(cricketers)
        return cricketers}).catch((err)=>err)

    }
    
},
players:{
    type:new GraphQLList(CricketerType),
    args:{
        team:{type:GraphQLString}
        },

        resolve(parentValue,args){
            //Also can use default json server api methods
            //e.g /id or /?q=value
           return axios.get("http://localhost:3000/cricketers/?team="+args.team).then(res=>res.data
            ).catch((err)=>err)
           
            
            
        }
}
} 
});

//Mutations
const mutation=new GraphQLObjectType({
    name:'mutation',
    fields:{
       addCricketer:{
           type:CricketerType,
           args:{ 
        name:{type:new GraphQLNonNull(GraphQLString)},
        type:{type:new GraphQLNonNull(GraphQLString)},
        age:{type:new GraphQLNonNull(GraphQLString)},
        team:{type:new GraphQLNonNull(GraphQLString)}},
        resolve(parentValue,args){
            return axios.post("http://localhost:3000/cricketers",{
               
               name:args.name,
               age:args.age,
               team:args.team,
               type:args.type


            }).then(res=>res.data)
        }
       },
        deleteCricketer:{
           type:CricketerType,
           args:{ id:{type:new GraphQLNonNull(GraphQLString)}},
        resolve(parentValue,args){
            return axios.delete("http://localhost:3000/cricketers/"+args.id).then(res=>res.data)
        }
       },
       updateCricketer:{
           type:CricketerType,
           args:{ id:{type:new GraphQLNonNull(GraphQLString)},
           name:{type:GraphQLString},
           age:{type:GraphQLString},
           team:{type:GraphQLString},
           type:{type:GraphQLString}
        
        },
        resolve(parentValue,args){
            return axios.patch("http://localhost:3000/cricketers/"+args.id,args).then(res=>res.data)
        }
       }
    }
})

module.exports=new GraphQLSchema({
    query:rootQuery,
    mutation

})