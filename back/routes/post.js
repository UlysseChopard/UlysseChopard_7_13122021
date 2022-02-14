const { Post } = require("../models");

module.exports = (app) => {
  app.post("/posts", async (req, res) => {
    const { content, image } = req.body;
    try {
      const post = await Post.create({ content, image, userId: req.user.uuid });
      return res.json(post);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  });

  app.get("/posts", async (req, res) => {
    try {
      const posts = await Post.findAll();
      return res.json(posts);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  });

  app.delete("/posts/:uuid", async (req, res) => {
    const uuid = req.params.uuid;
    try {
      const post = await Post.findOne({ where: { uuid } });
      await post.destroy();
      return res.json({ message: "Post deleted" });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  });

  app.put("/posts/:uuid", async (req, res) => {
    const uuid = req.params.uuid;
    try {
      let post = await Post.findOne({ where: { uuid } });
      post = { ...post, ...req.body };
      await post.save();
      return res.json({ message: "Message modified" });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  });

  return app;
};
