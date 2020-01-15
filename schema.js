const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNotNull

} =require("graphql")

const cricketers=[
    {id:"1",name:'virat kohli',type:"batsman",age:34,team:"India"},
    {id:"2",name:' steve smith',type:"batsman",age:30,team:"Australia"},
    {id:'3',name:'david warner',type:"batsman",age:33,team:"Australia"},
    {id:'4',name:'shai hopes',type:"batsman",age:26,team:"West Indies"}
]


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
            for(let i=0;i<customers.length;i++)
            {

              if(cricketers[i].id==args.id)
              return cricketers[i]
              

            }
        }
    },
cricketers:{
    type: new GraphQLList(CricketerType),
    resolve(parentValue,args){
        return cricketers

    }
    
},
players:{
    type:new GraphQLList(CricketerType),
    args:{
        team:{type:GraphQLString}
        },

        resolve(parentValue,args){
            let players=[];
            cricketers.forEach((player)=>{
                if(player.team==args.team)
                players.push(player)
            })

            return players
            
        }
}
} 
});

module.exports=new GraphQLSchema({
    query:rootQuery

})