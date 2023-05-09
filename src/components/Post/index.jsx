import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRemovePosts } from '../../redux/slices/posts';
import { fetchComments } from '../../redux/slices/comments';


export const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,

  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {commentsAll} = useSelector(state => state.comments)

  useEffect(() => {
    dispatch(fetchComments())
    
  }, [])
  
  const count = commentsAll.items.filter(el => el.post._id === id).map(el => el._id).length

  



  if (isLoading) {
    return <PostSkeleton />;
  }
 
  const onClickRemove = () => {
    if (window.confirm("Are you sure you want to delete a post?")) {
      dispatch(fetchRemovePosts(id))
    }
    // window.location.reload()
  };
  // console.log(user);
  // console.log( {...user});
 
 



  

  return (
    
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={name}>
                <a href={`/tags/${name}`}>#{name}</a>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{count}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
