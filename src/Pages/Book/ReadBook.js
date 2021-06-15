import { Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//component import
import BookEditor from "./BookEditor";
export default function ReadBook() {
  const { id } = useParams();
  const [state, setstate] = useState({});

  const fetchData = async (url) => {
    const result = await axios(url);
    setstate(result.data);
  };

  useEffect(() => {
    const url = `https://5ee02bf49ed06d001696dbb8.mockapi.io/api/v1/books/${id}`;
    fetchData(url);
  }, []);

  const handleChangeTitle = (e) => {
    setstate({
      ...state,
      title: e.target.value,
    });
  };

  const handleChangeAuthor = (e) => {
    setstate({
      ...state,
      author: e.target.value,
    });
  };

  return (
    <div>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={8} className="padding-top-94">
          <Grid item xs>
            <input
              type="text"
              className="book-title"
              onChange={handleChangeTitle}
              value={state.title || "Book title here.."}
            />
          </Grid>
          <Grid item xs>
            <input
              type="text"
              className="book-author"
              onChange={handleChangeAuthor}
              value={state.author || "author name here..."}
            />
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <BookEditor data={state} />
        </Grid>
      </Grid>
    </div>
  );
}
