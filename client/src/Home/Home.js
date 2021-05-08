import React, { useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import axios from "axios";

import ImageList from "./ImageList";
import Welcome from "./Welcome";
import "./Home.css";

const Home = (props) => {
  const { albums } = props;
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");

  const searchImages = async (e, term) => {
    e.preventDefault();
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query: term },
      headers: {
        Authorization: "Client-ID HogGshsiM9hbZC7IBAJ1opNRJb9aWwQEoEVrCsxxYq8",
      },
    });
    setImages(response.data.results);
  };

  return (
    <div>
      <Form className="heading" onSubmit={(e) => searchImages(e, search)}>
        <h1 className="mt-3 text-center">Imager</h1>
        <FormGroup>
          <Input
            autoFocus={true}
            type="text"
            placeholder="Search Images"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Button color="primary" type="submit">
            Search
          </Button>
        </FormGroup>
      </Form>
      <div className="d-flex justify-content-center align-items-center">
        {!images.length ? (
          <Welcome />
        ) : (
          <ImageList images={images} albums={albums} />
        )}
      </div>
      {/* <ImageList images={images} albums={albums} /> */}
    </div>
  );
};

export default Home;
