const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./schema'); // Assuming schema is the name of your schema file for Blog model
const User = require('./userSchema'); // Assuming userSchema is the name of your schema file for User model
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Connect to MongoDB
mongoose.connect('mongodb+srv://ganeshshatrugna:rj8DyBUfzjaTdO2k@mornon.gdze2yg.mongodb.net/blogpost', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => { console.log('Database connected') })
.catch((error) => { console.error('Error connecting to MongoDB:', error) });

// Endpoint to create a blog post
app.post("/createBlog", async (req, res) => {
  try {
    const { author, title, content, tags } = req.body;
    if (!author || !title || !content || !tags) {
      return res.status(400).send({ message: "All fields are required!" });
    }
    console.log(author,title,content,tags)
    const result = await Blog.create({ author, title, content, tags });
    console.log(result)
    return res.status(201).send({ message: "Blog created successfully", result });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

// Endpoint for login
app.post("/login", async (req, res) => {
  try {
    const { email, pwd } = req.body;
    if (!email || !pwd) {
      return res.status(400).send({ message: "Both email and password are required!" });
    }
    const lol = await User.findOne({ username:email, pwd });
    if (lol) {
      return res.send({ message: "Login successful", status:200});
    } else {
      return res.send({ message: "Invalid email or password!" ,status:401});
    }
  } catch (error) {
    console.error("Error during login attempt:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

// Endpoint to create a user
app.post("/createUser", async (req, res) => {
  try {
    const { username, pwd, email } = req.body;
    if (!username || !pwd || !email) {
      return res.status(400).send({ message: "All fields are required!" });
    }

    const result = await User.create({ username, email, pwd });
    return res.status(201).send({ message: "User created successfully", result });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

app.get("/getBlogs",async (req, res) => {
    try {
        const result = await Blog.find();
        if (result) {
            return res.status(200).send({message:"Success", data:result});
        }
        else{
            return res.status(500).send({message:"No files exist!"})
        }
    } catch (e) {
        console.log(e)
        return res.status(500).send({ message: e })
    }
})

app.post("/getUserBlogs",async (req, res) => {
    try {
      const peeps = req.body.auth;
      const result = await Blog.find({author:peeps});
      console.log(result);
      if (result) {
          return res.status(200).send({message:"Success", data:result});
      }
      else{
          return res.status(500).send({message:"No files exist!"})
      }
    } catch (e) {
        console.log(e)
        return res.status(500).send({ message: e })
    }
})

app.put('/updateBlog/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const blog = await Blog.findByIdAndUpdate(id, { title, content }, { new: true });
    res.status(200).json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/deleteBlog/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
