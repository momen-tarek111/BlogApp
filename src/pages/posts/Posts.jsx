import PostList from "../../components/posts/PostList";
import "./posts.css";
import {categories} from "../../dummyData"
import Sidebar from "../../components/sidebar/Sidebar";
import Pagination from "../../components/pagination/Pagination";
import {useDispatch,useSelector} from "react-redux"
import { useEffect } from 'react'
import { fetchPosts, getPostsCount } from '../../redux/apiCalls/postApiCall'
import { useState } from "react";
const POST_PER_PAGE=3;
const Posts = () => {
  const dispatch = useDispatch();
  const {posts,postsCount} = useSelector((state)=>state.post)
  const [currentPage, setCurrentPage] = useState(1)
  const pages= Math.ceil(postsCount / POST_PER_PAGE)
  useEffect(()=>{
      dispatch(fetchPosts(currentPage));

  },[dispatch,currentPage])
  useEffect(()=>{
    dispatch(getPostsCount());
  },[dispatch])
  return (
    <>
      <section className="posts-page">
        <PostList posts={posts} />
        <Sidebar categories={categories}/>
      </section>
      <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </>
  )
}

export default Posts