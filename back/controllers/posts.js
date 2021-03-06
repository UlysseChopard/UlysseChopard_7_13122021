const path = require("path");
const { Post } = require("../models");
const { unlink } = require("fs/promises");

exports.getAll = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { isHidden: false },
      include: "user",
    });
    return res.json(posts);
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
};

exports.remove = async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
      include: "user",
    });
    const comments = await Post.findAll({
      where: { thread: req.params.id },
    });
    if (post.user.uuid !== req.user.uuid) {
      return res.status(401).json({ message: "Ownership required" });
    }
    if (post.image) {
      const imgPath = path.normalize(
        `/usr/src/app/${post.image.split("/").slice(-2).join("/")}`
      );
      await unlink(imgPath);
    }
    await post.destroy();
    await comments.map((comment) => comment.destroy());
    return res.status(200).json({ message: "Post deleted" });
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
};

exports.moderate = async (req, res) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.id } });
    if (req.user.role !== "moderator") {
      return res.status(401).json({ message: "Requires moderator role" });
    }
    post.isHidden = true;
    await post.save();
    res.status(200).json({ message: `Post ${post.id} moderated` });
  } catch (e) {
    res.status(500).json(e);
  }
};

exports.create = async (req, res) => {
  const { content, thread = null } = req.body;
  let { image } = req.body;
  if (!image && req.file) {
    image = `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`;
  }
  try {
    const post = await Post.create({
      content,
      image,
      thread,
      userId: req.user.id,
    });
    const postAndUser = {
      ...post,
      user: req.user,
    };
    return res.status(201).json(postAndUser);
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
};

exports.replace = async (req, res) => {
  const { content } = req.body;
  let { image = null } = req.body;
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
      include: "user",
    });
    if (post.user.uuid !== req.user.uuid) {
      return res.status(401).json({ message: "Ownership required" });
    }
    if (post.image && (req.file || !image)) {
      const imgPath = path.normalize(
        `/usr/src/app/${post.image.split("/").slice(-2).join("/")}`
      );
      await unlink(imgPath);
    }
    if (!image && req.file) {
      image = `${req.protocol}://${req.get("host")}/upload/${
        req.file.filename
      }`;
    }
    post.set({
      content,
      image,
    });
    await post.save();
    return res.status(204).json({ message: "Message modified" });
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
};

exports.getOne = async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
    });
    return res.json(post);
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
};
