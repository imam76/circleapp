import { Grid, Typography } from "@material-ui/core";
import {
  convertFromRaw,
  convertToRaw,
  Editor,
  EditorState,
  RichUtils,
} from "draft-js";
import "draft-js/dist/Draft.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function BookEditor({ data }) {
  let history = useHistory();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (data.block) {
      const convertedState = convertFromRaw(data.block);
      const editorValue = EditorState.createWithContent(convertedState);
      setEditorState(() => editorValue);
    }
  }, [data]);

  const uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  // const handleKeyCommand = (command) => {
  //   const newState = RichUtils.handleKeyCommand(editorState, command);
  //   if (newState) {
  //     onChange(newState);
  //     return "handled";
  //   }
  //   return "not-handled";
  // };

  const onUnderlineClick = () => {
    let nextState = RichUtils.toggleInlineStyle(editorState, "UNDERLINE");
    setEditorState(nextState);
  };

  const onBoldClick = () => {
    let nextState = RichUtils.toggleInlineStyle(editorState, "BOLD");
    setEditorState(nextState);
  };

  const onItalicClick = () => {
    let nextState = RichUtils.toggleInlineStyle(editorState, "ITALIC");
    setEditorState(nextState);
  };

  const handleSubmit = () => {
    const blocks = convertToRaw(editorState.getCurrentContent());
    const body = {
      title: data.title,
      author: data.author,
      block: blocks,
      id: uuidv4(),
    };
    fetch("https://5ee02bf49ed06d001696dbb8.mockapi.io/api/v1/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(() => {
      setEditorState(() => EditorState.createEmpty());
      // title = {};
      history.push("/");
    });
  };

  const handleUpdate = (id) => () => {
    const blocks = convertToRaw(editorState.getCurrentContent());
    const body = {
      ...data,
      block: blocks,
    };
    fetch(`https://5ee02bf49ed06d001696dbb8.mockapi.io/api/v1/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(() => {
      setEditorState(() => EditorState.createEmpty());
      // title = {};
      history.push("/");
    });
  };

  console.log("data", data);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="space-between">
          <Grid item>
            <button
              className="rich-text-util-button"
              onClick={onUnderlineClick}
            >
              <Typography variant="h6">U</Typography>
            </button>
            <button className="rich-text-util-button" onClick={onBoldClick}>
              <Typography variant="h6">B</Typography>
            </button>
            <button className="rich-text-util-button" onClick={onItalicClick}>
              <Typography variant="h6">I</Typography>
            </button>
          </Grid>
          <Grid item>
            <button
              className="rich-text-util-button-submit"
              onClick={data.id ? handleUpdate(data.id) : handleSubmit}
            >
              <Typography variant="body">Save</Typography>
            </button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <div className="editor">
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            // handleKeyCommand={handleKeyCommand}
          />
        </div>
      </Grid>
    </Grid>
  );
}
