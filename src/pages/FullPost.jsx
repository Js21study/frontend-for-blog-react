import React, { useEffect } from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import { useState } from "react";
import instance from "../axiosRef";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentsByIdPost } from "../redux/slices/comments";
import { dataSelector } from "../redux/slices/auth";

export const FullPost = () => {
  const userData = useSelector(state => state.auth.data)
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const {id} = useParams();
  const {comments} = useSelector(state => state.comments)
  const isCommentsLoading = comments.status === 'loading'
  const dispatch = useDispatch()
  const dataAuthUser = useSelector(dataSelector)

  useEffect(() => {
    setIsLoading(true)
   instance.get(`/posts/${id}`)
   .then(res => {
    setData(res.data)
    setIsLoading(false)
   }).catch((err) => {
    console.warn(err);
    alert('Error in getting post. Please, try again!')
   })
  }, [])

  useEffect(() => {
    dispatch(fetchCommentsByIdPost(id))
  }, [])
 

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost/>
  }


  return (
    <>
      <Post
        key={data._id}
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl? `http://localhost:4444${data.imageUrl}`: ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={0}
        tags={data.tags}
        isFullPost
        isEditable={userData?._id === data.user._id}
        
      >
        <ReactMarkdown children={data.text}/>
      </Post>
      <CommentsBlock
        items={comments.items}
        isLoading={isCommentsLoading}
      >
        <Index avatarUrl={dataAuthUser.avatarUrl? dataAuthUser.avatarUrl : '/noavatar.png'} idPost = {id}/>
      </CommentsBlock>
    </>
  );
};
