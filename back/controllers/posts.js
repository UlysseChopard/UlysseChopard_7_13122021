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
    if (post.user.uuid !== req.user.uuid) {
      return res.status(401).json({ message: "Ownership required" });
    }
    if (post.image) {
      try {
        const imgPath = path.normalize(
          `/usr/src/app/${post.image.split("/").slice(-2).join("/")}`
        );
        console.log(imgPath);
        await unlink(imgPath);
        console.log("image deleted:", imgPath);
      } catch (e) {
        return res.status(500).json(e); // remettre à 500
      }
    }
    await post.destroy();
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
  const { content } = req.body;
  console.log("body", req.body);
  console.log("file", req.file);
  const image = req.file
    ? `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`
    : null;
  try {
    const post = await Post.create({
      content,
      image,
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

exports.modify = async (req, res) => {
  try {
    let post = await Post.findOne({ where: { id: req.params.id } });
    // const modifiedPost = req.file ? {
    //   ...req.body,
    //   image:
    // }
    // post = { ...post, ...req.body };
    await post.save();
    return res.status(204).json({ message: "Message modified" });
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
};
