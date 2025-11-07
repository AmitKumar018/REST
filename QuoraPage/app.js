const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid"); 
const port = 8080;


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.set("public", path.join(__dirname, "public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [
  {
    username: "Amit",
    content: "my first post",
    id:uuidv4()
  },
  {
    username: "sumit",
    content: "my second post",
    id:uuidv4(),
  },
  {
    username: "Ankit",
    content: "my third post",
    id:uuidv4(),
  },
  {
    username: "Anu",
    content: "my fourth post",
    id:uuidv4(),
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});


// create route
app.get("/posts/new",(req,res)=>{
  res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
  let {username,content}=req.body
  posts.push({username,content});
  res.redirect("/posts")
  
})

// show route
app.get("/posts/:id",(req,res)=>{
  let {id}=req.params;
  let post=posts.find((p)=> id===p.id);
  res.render("show.ejs",{post});

})

// update
app.patch("/posts/:id",(req,res)=>{
  let {id}=req.params;
  let newcontent=req.body.content;
  console.log(newcontent);

  res.send("patch request is working");

  
})





app.listen(port, () => {
  console.log(`Server is runnining on ${port}`);
});
