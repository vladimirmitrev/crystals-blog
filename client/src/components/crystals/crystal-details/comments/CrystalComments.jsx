import { useContext, useEffect, useMemo, useReducer } from "react";
import { useParams } from "react-router-dom";

import AuthContext from "../../../../contexts/authContext";
import useForm from "../../../../hooks/useForm";

import * as commentService from '../../../../services/commentService';
import reducer from "./commentReducer";

const CrystalComments = () => {
    const { crystalId } = useParams();
    const { email, userId, isAuthenticated } = useContext(AuthContext);
    const [comments, dispatch] = useReducer(reducer, []);

    useEffect(() => {
        commentService.getAll(crystalId)
            .then((result) => {
                dispatch({
                    type: 'GET_ALL_COMMENTS',
                    payload: result,
                })
            });
    }, [crystalId]);

    const addCommentHandler = async (values) => {

        // e.preventDefault();

        // const formData = new FormData(e.currentTarget);


        const newComment = await commentService.create(
            crystalId,
            values.comment,
         );

         newComment.owner = { email };
        //  setComments(state => [...state, {...newComment, owner: { email }}]);
        dispatch({
            type: 'ADD_COMMENT',
            payload: newComment
        })
        values.comment = '';
    }
    const initialValues = useMemo(() => ({
        comment: '',
    }), []);

    const { values, onChange, onSubmit } = useForm(addCommentHandler, initialValues);
  return (
    <>
      <div className="details-comments">
        <h5>Comments:</h5>
        <ul>
          {comments.map(({ _id, text, owner: { email } }) => (
            <li key={_id} className="comment">
              <p>
                {email}: {text}
              </p>
            </li>
          ))}
        </ul>
        {comments.length === 0 && <p className="no-comment">No comments.</p>}
      </div>

      {isAuthenticated && (
        <div className="create-comment">
        <label>Add new comment:</label>
        <form className="form d-flex flex-column" onSubmit={onSubmit}>
          {/* <input type="text" name="username" placeholder="Type username"/> */}
          <textarea
            name="comment"
            value={values.comment}
            onChange={onChange}
            placeholder="Comment......"
          ></textarea>
          <input className="btn btn-primary submit" name="commentInput" minLength={5} type="submit" value="Add Comment" />
        </form>
      </div>
      )}      
    </>
  );
};

export default CrystalComments;
