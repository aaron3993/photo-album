import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input } from "reactstrap";
import Select from "react-select";
import axios from "axios";

// import AddToAlbumButton from "./AddToAlbumButton";

import "./ImageCard.css";

const ImageCard = (props) => {
  const { image, albums } = props;
  const [option, setOption] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState({});

  useEffect(() => {
    setSelectedAlbum(albums.find((album) => album.title === option.value));
  }, [option]);

  async function addToCollection() {
    try {
      await axios.post("http://localhost:8080/images/collection", image);
    } catch (err) {
      console.log(err);
    }
  }

  async function addToAlbum(image) {
    try {
      await axios.post(`http://localhost:8080/images/album`, {
        album: selectedAlbum,
        image: image,
      });
    } catch (err) {
      console.log(err);
    }
  }

  const options = albums.map((album) => {
    return { value: album.title, label: album.title };
  });

  return (
    <div className="image-card">
      <div className="card-image">
        <img src={image.urls.regular} alt={image.alt_description} />
      </div>
      {/* <div className="form"> */}
      <Select
        className="w-75"
        options={options}
        value={option}
        onChange={setOption}
        placeholder="Select an album"
      />
      <Button
        className="p-1 mt-1 w-75"
        color="primary"
        type="submit"
        onClick={() => addToAlbum(image.urls.regular, option.value)}
      >
        Add to Album
      </Button>
      {/* <button onClick={() => addToAlbum(image.urls.regular, option.value)}>
        Add to Album
      </button> */}
      <Button
        className="p-1 mt-1 w-75"
        color="primary"
        type="submit"
        onClick={() => addToCollection()}
      >
        Save to Collection
      </Button>
      {/* <button onClick={() => addToCollection()}>Save to Collection</button> */}
      {/* </div> */}
    </div>
  );
};

export default ImageCard;
