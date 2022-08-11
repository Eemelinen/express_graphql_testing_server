import express from 'express'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'

const app = express()
const port = 4000

// In-memory data store
const data = {
  warriors: [
    { id: '001', name: 'Jaime' },
    { id: '002', name: 'Jorah' },
  ],
}

// Schema
const typeDefs = `
type Warrior {
  id: ID!
  name: String!
}

type Query {
  warriors: [Warrior]
}
`

// Resolver for warriors
const resolvers = {
  Query: {
    warriors: (obj, args, context) => context.warriors,
  },
}

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Entrypoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema: executableSchema,
    context: data,
    graphiql: true,
  })
)

app.listen(port, () => {
  console.log(`Running a server at http://localhost:${port}`)
})

// // 'use strict';
// //
// // const express = require('express');
// // const cors = require('cors');
// // import { graphqlHTTP } from 'express-graphql'
// // import { makeExecutableSchema } from '@graphql-tools/schema'
// //
// // // Constants
// // const PORT = 8080;
// // const HOST = '0.0.0.0';
// //
// // // App
// // const app = express();
// // app.get('/', (req, res) => {
// //   res.send('Hello World');
// // });
// //
// // app.listen(PORT, HOST);
// // console.log(`Running on http://${HOST}:${PORT}`);
//
// import express from 'express'
// import cors from 'cors'
// import { graphqlHTTP } from 'express-graphql'
// import { makeExecutableSchema } from '@graphql-tools/schema'
//
// const data = {
//   warriors: [
//     { id: '001', name: 'Jaime' },
//     { id: '002', name: 'Jorah' },
//   ],
// }
//
// const typeDefs = `
// type Warrior {
//   id: ID!
//   name: String!
// }
//
// type Query {
//   warriors: [Warrior]
// }
// `
//
// const executableSchema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// })
//
// const resolvers = {
//   Query: {
//     warriors: (obj, args, context, info) => context.warriors,
//   },
// }
//
// const app = express()
// const port = 8080
//
// app.use(cors())
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
//
// app.use(
//   '/graphql',
//   graphqlHTTP({
//     schema: executableSchema,
//     context: data,
//     graphiql: true,
//   })
// )
//
// // app.get('/', (request, response) => {
// //   response.send('Hello, GraphQL!')
// // })
//
// app.listen(port, () => {
//   console.log(`Running a server at http://localhost:${port}`)
// })
