const express = require("express");
const app = express();
const path=require("path");
const HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"finalviews/home.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname,"finalviews/register.html"));
});

app.get("/signin", (req, res) => {
  res.sendFile(path.join(__dirname,"finalviews/signin.html"));
});

app.post("/signIn", function(req, res) {
  console.log(req.body);
  final.signIn(req.body).then(function (mail) {
      res.send(mail+" signed in successfully<br><a href=\"/\">Go Home</a>");
  }).catch(function(error) {
      res.send("<html><body>"+error+"</body></html>");
  });
});

app.post("/register", function(req, res) {
  console.log(req.body);
  final.signIn(req.body).then(function (mail) {
      res.send(mail+" register successfully<br><a href=\"/\">Go Home</a>");
  }).catch(function(error) {

      res.send("<html><body>"+error+"</body></html>");
  });
});


// This use() will not allow requests to go beyond it
// so we place it at the end of the file, after the other routes.
// This function will catch all other requests that don't match
// any other route handlers declared before it.
// This means we can use it as a sort of 'catch all' when no route match is found.
// We use this function to handle 404 requests to pages that are not found.
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// listen on port 8080\. The default port for http is 80, https is 443\. We use 8080 here
// because sometimes port 80 is in use by other applications on the machine
app.listen(HTTP_PORT, onHttpStart);