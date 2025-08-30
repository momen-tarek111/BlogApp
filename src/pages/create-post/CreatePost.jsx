import { useEffect, useState } from "react";
import "./create-post.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/apiCalls/postApiCall";
import { FadeLoader } from "react-spinners";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall"
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isPostCreated } = useSelector((state) => state.post);
  const {categories} = useSelector(state=>state.category)
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Post Title is required");
    if (description.trim() === "")
      return toast.error("Post Description is required");
    if (category.trim() === "") return toast.error("Post Category is required");
    if (!file) return toast.error("Post Image is required");
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    dispatch(createPost(formData));
  };
  useEffect(() => {
    if (isPostCreated) {
      navigate("/");
    }
  }, [dispatch, navigate, isPostCreated]);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <section className="section create-post">
      <h1 className="create-post-title">Create New Post</h1>
      <form onSubmit={formSubmitHandler} className="create-post-form">
        <input
          type="text"
          placeholder="Post Title"
          className="create-post-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="create-post-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled hidden>
            Select A Category
          </option>
          {categories.map((category)=>(<option key={category._id} value={category.title}>{category.title}</option>))}
        </select>
        <textarea
          className="create-post-textarea"
          rows="5"
          placeholder="Post Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="file"
          name="file"
          id="file"
          className="create-post-upload"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" className="create-post-btn">
          {loading ? (
            <FadeLoader
              color="white"
              cssOverride={{ display: "block", margin: "0 auto" }}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "Create"
          )}
        </button>
      </form>
    </section>
  );
};

export default CreatePost;
