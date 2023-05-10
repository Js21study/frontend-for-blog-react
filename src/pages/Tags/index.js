import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { allTagsByNameSelector, fetchTagsByName } from '../../redux/slices/posts'
import { Post } from '../../components'
import Grid from '@mui/material/Grid';

function Tags() {

    const {allTagsByName} = useSelector(state => state.posts)

    const isPostsLoading = allTagsByName.status === 'loading'
    const userData = useSelector(state => state.auth.data)

    const {name} = useParams()

    const dispatch = useDispatch()
    const tags = useSelector(allTagsByNameSelector)

    useEffect(() => {
        dispatch(fetchTagsByName(name))
    
    }, [])

  

  return (
    <div>
   

          {tags.length === 0 ?<h1 style={{textAlign: 'center'}}>We dont have any posts with this tag '<span style={{color: 'green'}}>{name}</span>'</h1>
          :
          (isPostsLoading ? [...Array(5)]: tags).map((obj, index) => 
            isPostsLoading ? (<Post isLoading={true} key={index}/> ):
           ( <Post
              key={obj._id}
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl? `https://communication-blog.herokuapp.com${obj.imageUrl}`: ''}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={0}
              tags={obj.tags}
              isEditable={userData?._id === obj.user._id}
            />)
          )
          }

    </div>
  )
}

export default Tags