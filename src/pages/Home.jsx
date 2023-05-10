import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';


import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchPostsNew, fetchPostsPopular, fetchTags } from '../redux/slices/posts';



export const Home = () => {
  const dispatch = useDispatch()
  const [tabsValue, setTabsValue] = useState(0)

  const userData = useSelector(state => state.auth.data)
  const {posts, tags} = useSelector(state => state.posts)


  const isPostsLoading = posts.status === 'loading'
  const isTagsLoading = tags.status === 'loading'



  useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchTags())
   
   
    
  }, [])






  const clickOnAll = () => {
    dispatch(fetchPosts())
    setTabsValue(0)
  }

  const clickOnNeW = () => {
    dispatch(fetchPostsNew())
    setTabsValue(1)
  }

  const clickOnPopular = () => {
    dispatch(fetchPostsPopular())
    setTabsValue(2)
  }


  const ListTabs = [ 
    {name: 'All', func: clickOnAll},
    {name:'New', func: clickOnNeW},
    {name:'Popular', func: clickOnPopular},
    ]
  


  return (
    <>


      <Tabs style={{ marginBottom: 15 }} value={tabsValue} aria-label="basic tabs example">

          {ListTabs.map( (catg, i) =>
              <Tab key={catg.name} label={catg.name} onClick={catg.func} ></Tab>
              )
          }
        
      </Tabs>


      <Grid container spacing={4}>
        <Grid lg={8} item>
          {(isPostsLoading ? [...Array(5)]: posts.items).map((obj, index) => 
            isPostsLoading ? (<Post isLoading={true} key={index}/> ): 
          
           ( <Post
              key={obj._id}
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl? `${process.env.REACT_APP_API_URL}${obj.imageUrl}`: ''}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
         
              tags={obj.tags}
              isEditable={userData?._id === obj.user._id}
            />)
          )}
        </Grid>
        <Grid lg={4} item>
         <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          
         
        </Grid>
      </Grid>
    </>
  );
};
