
// Study purpose 

const express = require("express");
const app = express();
const PORT = 3000;
const cookieParser = require("cookie-parser")
app.use(cookieParser("secretcode"))
const session = require("express-session")
const flash = require("connect-flash")
const path = require("path")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
  secret:"mysupersecretstring",
  resave: false,
  saveUninitialized:true,
  // cookie:{secure: true},
}

app.use(session(sessionOptions))
app.use(flash())

app.get("/register", (req, res)=>{
  let {name = "anonymous"} = req.query
  // console.log(req.session);
  req.session.name = name;
  // console.log(req.session);

  if(name === "anonymous"){
    req.flash("error","user not register")
  } else {
    req.flash("success","user register")
  }
  res.redirect("/hello")
})

app.get("/hello", (req, res)=>{
  res.locals.msg = req.flash("success")
  res.locals.err = req.flash("error")
  res.render("page.ejs" ,{name:req.session.name })
})


// app.get("/reqcount",(req, res)=>{
//   if(req.session.count){
//     req.session.count++
//   } else {
//     req.session.count = 1
//   }
  
//   res.send(`you send a request ${req.session.count} times`)
// })

// app.get("/test",(req, res)=>{
//   res.send("Test")
// })


// const users = require("./routes/user.js")
// const posts = require("./routes/post.js")


app.get("/", (req, res) => {
  console.dir(req.cookies)
  res.send("root route");
});



// app.get("/sendcookies",(req, res)=>{
//   res.cookie("greet","namaste")
//   res.cookie("origin","india")
//   res.send("cookies send")
// })

// // app.get("/greet", (req, res) => {
// //   console.log(req.cookies.greet)
// //   let {name = "anonymous"}= req.cookies;
// //   res.send(`hii ${name}`);
// // });

// app.get("/greet", (req, res) => {
//   console.log(req.cookies); // shows all cookies
//   let { greet = "anonymous" } = req.cookies; // match the cookie name
//   res.send(`hii ${greet}`);
// });


// app.get("/getsignedcookie", (req, res) => {
//   res.cookie("name","Pushkar", {signed: true})
//   res.send("signed cookie send");
// });

// app.get("/cookieverify", (req, res) => {
//   res.send(req.signedCookies)
// });


// app.use("/users", users)
// app.use("/posts", posts)

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
