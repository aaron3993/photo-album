import mongoose from "mongoose";
import Album from "../models/album.js";
import Image from "../models/image.js";

export const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    res.status(200).json(albums);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const viewAlbum = async (req, res) => {
  const { id } = req.params;
  Image.find({ album_id: id })
    .then((all) => res.status(200).json(all))
    .catch((err) => res.status(400).json(err));
};

export const addAlbum = async (req, res) => {
  const album = req.body;
  const newAlbum = new Album({
    title: album.title,
  });

  try {
    await newAlbum.save();
    res.status(201).json(newAlbum);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const deleteAlbum = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No album with that id");

  await Album.findByIdAndRemove(id);

  res.json({ message: "Image remove successfully" });
};
