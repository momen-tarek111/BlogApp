import "./comment-list.css";
import swal from "sweetalert";
import { useState } from "react";
import UpdateCommentModel from "./UpdateCommentModel";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { deleteComment } from "../../redux/apiCalls/commentApiCall";

const CommentList = ({comments}) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch=useDispatch();
    const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteComment(commentId));
      }
    });
    };
    const [updateComment, setUpdateComment] = useState(false);
    const [commentForUpdate, setCommentForUpdate] = useState(null);
    const updateCommentHandler = (comment) => {
        setCommentForUpdate(comment);
        setUpdateComment(true);
    }
    return (
    <div className="comment-list">
      <h4 className="comment-list-count">{comments?.length} Comments</h4>
      {comments?.map((comment) => (
        <div key={comment?._id} className="comment-item">
          <div className="comment-item-info">
            <div className="comment-item-username">{comment?.username}</div>
            <div className="comment-item-time">
                {moment(comment?.createdAt).fromNow()}
            </div>
          </div>
          <p className="comment-item-text">
            {comment?.text}
          </p>
          {user?._id === comment?.user && (
            <div className="comment-item-icon-wrapper">
            <i onClick={()=>updateCommentHandler(comment)} className="bi bi-pencil-square"></i>
            <i onClick={()=>deleteCommentHandler(comment?._id)} className="bi bi-trash-fill"></i>
          </div>
          )}
        </div>
      ))}
      {updateComment&&<UpdateCommentModel commentForUpdate={commentForUpdate} setUpdateComment={setUpdateComment}/>}
    </div>
  );
};

export default CommentList;
