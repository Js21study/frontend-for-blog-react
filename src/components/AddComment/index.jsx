import React, { useState } from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { isAuthSelector } from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";
import instance from "../../axiosRef";

export const Index = ({ avatarUrl, idPost }) => {

  const navigate = useNavigate()
  const isAuth = useSelector(isAuthSelector)
  const [text, setText] = useState('');


  const onChangeComment = (text) => {
    setText(text);
  }

  const onSubmit = async () => {
    try {

      const fields = {
        text
      }
      if (isAuth) {
        const { data } = await instance.post(`/comments/${idPost}`, fields)
      } else {
        return alert("You need to login for writing comments")
      }

      window.location.reload(false);
      

    } catch (error) {
      console.warn(error);
      alert("Something went wrong with creating comment for this post! Please, try again!")
    }
  }

 
 
  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={avatarUrl} 
        />
        <div className={styles.form}>
          <TextField
            label="Write your comment"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={text}
            onChange={(e)=>onChangeComment(e.target.value)}
          />
          <Button onClick={onSubmit} variant="contained">Send</Button>
        </div>
      </div>
    </>
  );
};
