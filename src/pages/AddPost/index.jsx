import React, { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';
import { isAuthSelector } from '../../redux/slices/auth';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import instance from '../../axiosRef';


export const AddPost = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const isAuth = useSelector(isAuthSelector)
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const inputFileDownloadRef = useRef(null)

  const isEditing = Boolean(id)

  const handleChangeFile = async(e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append('image', file);
      const {data} = await instance.post('/upload', formData)
      setImageUrl(data.url)
    } catch (error) {
      console.warn(error);
      alert('Error with uploading file');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('')
  };

  const onChange = React.useCallback((text) => {
    setText(text);
  }, []);

  const onSubmit = async () => {
    try {

      setIsLoading(true)
      const fields = {
        title,
        text,
        tags,
        imageUrl,
      }
      console.log(id);
      const { data } = isEditing 
      ? await instance.patch(`/posts/${id}`, fields)
      : await instance.post('/posts', fields)
      

      const _id = isEditing ? id : data._id
      navigate(`/posts/${_id}`)
      

    } catch (error) {
      console.warn(error);
      alert("Something went wrong with creating post! Please, try again!")
    }
  }

  useEffect(() => {
    if (id) {
      instance.get(`/posts/${id}`)
      .then( ({data}) => {
        setTitle(data.title)
        setText(data.text)
        setImageUrl(data.imageUrl)
        setTags(data.tags.join(','))
      })
      .catch(err => {
        console.warn(err);
        alert("Something went wrong with getting post! Please, try again!")
      })
    }
  }, [id])
  

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '300px',
      autofocus: true,
      placeholder: 'Text...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );
  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to='/'/>
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileDownloadRef.current.click()} variant="outlined" size="large" color='secondary'>
        Upload picture
      </Button>
      <input ref={inputFileDownloadRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Delete
        </Button>
        <div><img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" /></div>
        </>
      )}
     
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Title..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
      />
      <TextField classes={{ root: styles.tags }} variant="standard" value={tags}
        onChange={e => setTags(e.target.value)} placeholder="Tags" helperText='Write your tags without space separated by commas. Example is "tag,tag,tag"' fullWidth />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained" color='success'>
          { isEditing ? 'Save' : 'Done' }
        </Button>
        <a href="/">
          <Button size="large" color='secondary'>Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};
