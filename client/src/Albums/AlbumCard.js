import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button, FormGroup, Input } from "reactstrap";
import axios from "axios";

// import AddToAlbumButton from "./AddToAlbumButton";

import "../Home/ImageCard.css";

const AlbumCard = (props) => {
  const { images, setImages, albumCard, albums, setAlbums } = props;
  let history = useHistory();

  // useEffect(() => {
  //   async function getAlbumImages() {
  //     const response = await axios.get(
  //       `http://localhost:8080/albums/${albumCard._id}`
  //     );
  //     setImages(response.data);
  //   }

  //   getAlbumImages();
  // }, []);

  function viewAlbum() {
    history.push(`/albums/${albumCard._id}`);
  }

  async function deleteAlbum() {
    try {
      await axios.delete(`http://localhost:8080/albums/${albumCard._id}`);
      const albumToBeRemovedIndex = albums.findIndex(
        (album) => album._id === albumCard._id
      );
      const albumsCopy = [...albums];
      albumsCopy.splice(albumToBeRemovedIndex, 1);
      setAlbums(albumsCopy);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="image-card">
      <h3>{albumCard.title}</h3>
      <div className="card-image">
        {images[0] ? (
          <img src={images[0].url} alt={images[0].url} />
        ) : (
          <div className="p-3 bg-dark h-100 w-100 text-light d-flex justify-content-center align-items-center">
            <p>Your album is empty, add some images!</p>
          </div>
        )}
      </div>
      <div className="form">
        {/* <FormGroup> */}
        <Button
          className="mt-1 w-75"
          color="primary"
          type="submit"
          onClick={() => viewAlbum()}
        >
          View
        </Button>
        {/* </FormGroup> */}
        {/* <FormGroup> */}
        <Button
          className="w-75"
          color="primary"
          type="submit"
          onClick={() => deleteAlbum()}
        >
          Delete
        </Button>
        {/* </FormGroup> */}
      </div>
    </div>
  );
};

export default AlbumCard;
