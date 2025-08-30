import "./category.css";
import { useParams } from "react-router-dom";
import PostList from "../../components/posts/PostList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPostsBasedOnCategory } from "../../redux/apiCalls/postApiCall";
import { Link } from "react-router-dom";
const Category = () => {
  const dispatch = useDispatch();
  const { postsCategory } = useSelector((state) => state.post);
  const { category } = useParams();
  useEffect(() => {
    dispatch(fetchPostsBasedOnCategory(category));
  }, [dispatch, category]);
  return (
    <section className="category">
      {postsCategory.length === 0 ? (
        <>
          <h1 className="category-not-found">
            Posts with <span>{category}</span> category not found
          </h1>
          <Link to="/posts" className="category-not-found-link">
            Go to posts page
          </Link>

        </>
      ) : (
        <>
          <h1 className="category-title">Posts based on {category}</h1>
          <PostList posts={postsCategory} />
        </>
      )}
    </section>
  );
};

export default Category;
