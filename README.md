docker build . -t graphql/node-web-app
<br>
docker run -p 49160:4000 -d graphql/node-web-app
<br>
open index.html

{
warriors {
id
name
}
}
