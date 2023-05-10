import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dataSelector } from '../../redux/slices/auth'
import styles from './Person.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { Post } from '../../components/Post';
import { fetchPosts } from '../../redux/slices/posts';


function Person() {
    const data = useSelector(dataSelector)
    const {posts} = useSelector(state => state.posts)
    const dispatch = useDispatch()
    const {id} = useParams()

    const isPostsLoading = posts.status === 'loading'
    const navigate = useNavigate()


    useEffect(() => {
      
      dispatch(fetchPosts())

      
    }, [])

 

    if (!data) {

      return navigate('/')
    }

        return(
        <>


{data._id === id ? 
  <div  className={styles.root}>
        <img className={styles.avatar} src={data.avatarUrl || '/noavatar.png'} alt={data.fullName} />
        <div className={styles.userDetails}>
        <span className={styles.userName}>{data.fullName}</span>
      </div>
    </div>
    :
    <div></div>
    }




        {data._id === id ? (isPostsLoading ? [...Array(5)]: posts.items).map((obj, index) => 
          isPostsLoading ? (<Post isLoading={true} key={index}/> ):
          data._id === obj.user._id && id === obj.user._id ?
        ( <Post
            key={ obj._id }
            id={ obj._id }
            title={ obj.title }
            imageUrl={ obj.imageUrl? `${process.env.REACT_APP_API_URL}${obj.imageUrl}`: ''}
            user={ obj.user }
            createdAt={ obj.createdAt }
            viewsCount={ obj.viewsCount }
            commentsCount={0}
            tags={ obj.tags }
            isEditable={data._id === obj.user._id}
          />)
          : 
          <div key={index}></div>
        ) : 
        (isPostsLoading ? [...Array(5)]: posts.items).map((obj, index) => 
          isPostsLoading ? (<Post isLoading={true} key={index}/> ):
          id === obj.user._id ?
        ( <Post
            key={ obj._id }
            id={ obj._id }
            title={ obj.title }
            imageUrl={ obj.imageUrl? `${process.env.REACT_APP_API_URL}${obj.imageUrl}`: ''}
            user={ obj.user }
            createdAt={ obj.createdAt }
            viewsCount={ obj.viewsCount }
            commentsCount={0}
            tags={ obj.tags }
            isEditable={data._id === obj.user._id}
          />)
          : 
          <div key={index}></div>
        )}


        </>
        )
      

}

export default Person