import { Grid } from "@material-ui/core";
import React, { useState } from "react";
//component import
import BookEditor from "./BookEditor";

export default function CreateBook() {
  const [state, setstate] = useState({});

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
