import express from 'express'
import crypto from 'crypto'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql';
const schema = buildSchema(`
  input TodoInput {
    text: String    
  }
  type Todo {
    id: ID!
    text: String    
  }
  type Query {
    getTodo(id: ID!): Todo
  }
  type Mutation {
    createTodo(input: TodoInput): Todo
    updateTodo(id: ID!, input: TodoInput): Todo
  }
`);
class Todo {
  constructor(id, { text }) {
    this.id = id;
    this.text = text;
  }
}
let todos = {};
const root = {
  getTodo: ({ id }) => {
    if (!todos[id]) {
      throw new Error('Todo not found.');
    }
    return new Todo(id, todos[id]);
  },
  createTodo: ({ input }) => {
    const id = crypto.randomBytes(10).toString('hex');
    todos[id] = input;
    return new Todo(id, input);
  },
  updateTodo: ({ id, input }) => {
    if (!todos[id]) {
      throw new Error('Todo not found');
    }
    todos[id] = input;
    return new Todo(id, input);
  },
};
const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('server started'));
