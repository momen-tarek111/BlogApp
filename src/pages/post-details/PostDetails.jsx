import { useParams } from "react-router-dom";
import "./post-details.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import swal from "sweetalert";
import UpdatePostModel from "./UpdatePostModel";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost, fetchSinglePost, toggleLikePost, updatePostImage } from "../../redux/apiCalls/postApiCall";
const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const [file, setFile] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);
  const navigate=useNavigate();
  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [id, dispatch]);
  const uploadImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) {
      return toast.warning("there is no file!");
    }
    const formData = new FormData();
    formData.append("image", file);
    console.log(formData);
    dispatch(updatePostImage(formData, post._id));
  };
  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deletePost(post._id));
        navigate(`/profile/${user._id}`);
      } else {
        swal("Something went wrong");
      }
    });
  };
  return (
    <section className="post-details">
      <div className="post-details-image-wrapper">
        <img
          src={file ? URL.createObjectURL(file) : post?.image.url}
          alt=""
          className="post-details-image"
        />
        {user?._id === post?.user._id && (
          <form
          onSubmit={uploadImageSubmitHandler}
          className="update-post-image-form"
        >
          <label htmlFor="file" className="update-post-label">
            <i className="bi bi-image-fill"></i>
            Select new image
          </label>
          <input
            type="file"
            name="file"
            id="file"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type="submit">upload</button>
        </form>
        )}
      </div>
      <h1 className="post-details-title">{post?.title}</h1>
      <div className="post-details-user-info">
        <img src={post?.user.profilePhoto?.url} alt="" className="post-details-user-image" />
        <div className="post-details-user">
          <strong>
            <Link to={`/profile/${post?.user._id}`}>{post?.user.username}</Link>
          </strong>
          <span>{new Date(post?.createdAt).toDateString()}</span>
        </div>
      </div>
      <p className="post-details-description">
        {post?.description}
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium
        voluptatum autem, harum doloribus voluptate necessitatibus reiciendis
        magnam repudiandae error, accusamus tempora blanditiis placeat earum
        ipsa in! Dignissimos explicabo assumenda vero. Hic dolorem nulla sequi,
        neque, commodi eaque minus delectus doloremque eum dolores autem
        laboriosam, eligendi quis alias veritatis aspernatur beatae. Quas
        veritatis consequuntur quos aspernatur accusantium magni obcaecati
        consectetur quisquam! Tenetur sapiente, deleniti autem veritatis commodi
        laboriosam mollitia repudiandae veniam distinctio rerum inventore
        aperiam cumque adipisci id dolor. Voluptatem consequuntur saepe delectus
        iure distinctio sequi illo possimus. Quis, doloribus unde? Mollitia
        veritatis impedit ab delectus eos? Voluptas quaerat ea aliquid cumque
        iure facilis aut soluta sequi omnis, tempora suscipit dolorum assumenda
        minus nihil dicta vitae, delectus dolore error possimus vero? Nam
        nesciunt ipsam, necessitatibus repellat, eveniet unde optio numquam, cum
        architecto voluptate quia! Nostrum facere cupiditate consequuntur unde
        quidem repellat sequi, optio ipsum, ipsam voluptate animi.
        Necessitatibus beatae ex odit. Beatae voluptates, possimus dolores
        repellendus cumque adipisci deleniti molestiae reiciendis hic quaerat
        ratione odio perferendis eius quam provident consectetur quas vitae!
        Totam facere minus, voluptas tempora repudiandae beatae sed obcaecati.
        Incidunt vel aliquid quis adipisci voluptatibus excepturi ullam?
        Dignissimos iusto quos quo consectetur exercitationem, asperiores
        delectus harum eos expedita numquam, ab officiis illo? Explicabo enim
        nemo, quas nostrum recusandae consequatur. Id cumque optio a est
        voluptates sapiente quisquam, mollitia repellat, voluptatibus similique
        culpa beatae tempore rem. Natus, fugiat assumenda dolorem sit minima
        quia totam ipsam voluptatibus quas cumque vitae quod. Dolorem, minima?
        Doloremque repellendus quae architecto, inventore culpa ducimus quos
        quibusdam sit nobis voluptas laboriosam beatae deserunt, aliquam quas
        asperiores a nesciunt facilis odit, ut dicta tempora suscipit. Ullam,
        pariatur. Quod ipsa eum eos veniam dolores laborum aspernatur hic sint
        modi itaque illum eius ad tempora perspiciatis, culpa atque accusamus
        saepe ex libero vero incidunt ea exercitationem. Quisquam, dolorum
        quasi? Mollitia minima at iste nam ipsa quisquam ullam dolore placeat
        quasi, eaque quidem pariatur non unde molestias cupiditate consequatur
        magnam nemo dignissimos. Facere eos ex totam consectetur beatae! Vitae,
        similique! Iure quos architecto excepturi et distinctio molestiae modi
        cupiditate reprehenderit accusamus nostrum qui eaque in id, aliquam
        libero quo delectus dignissimos hic officia deleniti earum porro.
        Deserunt provident esse voluptatibus? Quas odio eveniet possimus neque
        soluta deleniti! Fuga vitae dignissimos quas eaque cupiditate nisi!
        Dolore nostrum tempore, amet dicta facilis nihil veritatis eius
        inventore nisi odit debitis quod accusantium quidem! Ut vitae natus,
        inventore ipsa, quidem quibusdam mollitia itaque omnis dolorum error
        recusandae cum dolore atque consectetur praesentium a nobis commodi sit?
        Facilis minus, fugiat quidem facere fuga dicta alias. Facilis, eveniet
        necessitatibus doloremque maxime deserunt quia. Reiciendis voluptas
        deserunt hic distinctio ex pariatur cumque eius perspiciatis. Non
        temporibus repellendus voluptatem, dolorem incidunt saepe, itaque nobis
        dolorum, nulla dicta officia! Itaque quaerat maxime est exercitationem
        dolor sunt voluptas illo quo? Aspernatur minima voluptatum consequuntur
        perferendis deserunt libero, sed autem vitae dignissimos a impedit
        repellat dolores voluptates! Totam, nulla? Dolorum, autem! Culpa quam id
        nobis tempora, nulla veniam aperiam eum odit doloribus, obcaecati iusto
        magni, laboriosam porro rem temporibus modi quia quae provident sint
        voluptatem. Aliquid est non dignissimos voluptates molestias! Laboriosam
        nihil provident, saepe similique modi esse ullam reiciendis facilis
        natus ex enim magnam vero unde iste tempore alias id iusto nesciunt.
        Sunt corporis delectus, recusandae optio dolores corrupti in! Animi a
        possimus at iure veritatis velit quibusdam. Nam, est in natus aliquid ut
        assumenda, laudantium officia iste perspiciatis optio saepe ab. Fuga
        ipsam rem, mollitia ut repellendus repudiandae impedit? Debitis nam
      </p>
      <div className="post-details-icon-wrapper">
        <div>
          {user&&(
            <i 
              className={post?.likes.includes(user._id)?"bi bi-hand-thumbs-up-fill":"bi bi-hand-thumbs-up"}
              onClick={() => dispatch(toggleLikePost(post._id))}
            ></i>
          )}
          <small>{post?.likes.length} likes</small>
        </div>
        {user?._id === post?.user._id && (
          <div>
          <i onClick={()=>setUpdatePost(true)} className="bi bi-pencil-square"></i>
          <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
        </div>
        )}
      </div>
      {
        user? <AddComment postId={post?._id}/>:
        <p className="post-details-info-write">
          to write a comment you should login first
        </p>
        
      }
      <CommentList comments={post?.comments}/>
      {updatePost&&<UpdatePostModel setUpdatePost={setUpdatePost} post={post}/>}
    </section>
  );
};

export default PostDetails;
