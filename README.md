docker build . -t graphql/node-web-app
<br>
docker run -p 49160:4000 -d graphql/node-web-app
<br>
open index.html

Warriors:

{
warriors {
id
name
}
}

Todo:

mutation {
createTodo(input: {text: "eat"}) {
id
text
}
}

mutation {
updateTodo(id: "e99ce10750c93793a23d", input: {text: "eat"}) {
id
text
}
}

query {
getTodo(id: "0e127cfbe6f4ee92993b"){
id
text
}
}
