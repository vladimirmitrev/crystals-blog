import { useContext, useEffect, useMemo, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useFormik } from 'formik';
import * as Yup from 'yup';

import AuthContext from "../../../../contexts/authContext";
import useForm from "../../../../hooks/useForm";
import styles from './CrystalComments.module.css';


import * as commentService from '../../../../services/commentService';
import reducer from "./commentReducer";
import { NotificationContext, types } from '../../../../contexts/NotificationContext';
import Path from "../../../../paths";
import { pathToUrl } from "../../../../utils/pathUtils";

const CrystalComments = () => {
    const { crystalId } = useParams();
    const { email, userId, isAuthenticated } = useContext(AuthContext);
    const [comments, dispatch] = useReducer(reducer, []);
    const { showNotification } = useContext(NotificationContext);
    const navigate = useNavigate();


    useEffect(() => {
        commentService.getAll(crystalId)
            .then((result) => {
                dispatch({
                    type: 'GET_ALL_COMMENTS',
                    payload: result,
                })
            });
    }, [crystalId]);

    const formik = useFormik({
      initialValues: {
        text: '',
      },
      validationSchema: Yup.object({
        text: Yup.string()
          .min(6, 'Comment should be at least 6 characters')
          .max(30, 'Comment should be no longer than 30 characters')
      
      }),
      onSubmit: async (values) => {
          // const commentsData = values;
          try {
            const newComment = await commentService.create(
              crystalId,
              values.text,
           );
          //  console.log(comm);
  
           newComment.owner = { email };
          //  setComments(state => [...state, {...newComment, owner: { email }}]);
          dispatch({
              type: 'ADD_COMMENT',
              payload: newComment
          })
          values.text = '';
              showNotification('You successfully added a new comment!', types.success);
              navigate(pathToUrl(Path.CrystalDetails, { crystalId }));
          } catch (err) {
              showNotification(err.message, types.error);
              console.log(err);
          }
      },
    });

    // const addCommentHandler = async (values) => {

    //     // e.preventDefault();

    //     // const formData = new FormData(e.currentTarget);


    //     const newComment = await commentService.create(
    //         crystalId,
    //         values.comment,
    //      );

    //      newComment.owner = { email };
    //     //  setComments(state => [...state, {...newComment, owner: { email }}]);
    //     dispatch({
    //         type: 'ADD_COMMENT',
    //         payload: newComment
    //     })
    //     values.comment = '';
    // }
    // const initialValues = useMemo(() => ({
    //     comment: '',
    // }), []);

    // const { values, onChange, onSubmit } = useForm(addCommentHandler, initialValues);
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
        <>
        <form onSubmit={formik.handleSubmit}>
            <div className="col-12">
                <div className="form-floating">
                    <input
                    type="text"
                    className="form-control"
                    id="text"
                    placeholder="Comment"
                    name="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.text}
                    />
                    <label htmlFor="text">New comment</label>
                    {formik.errors.text ? (
                    <p className={styles.inputError}>{formik.errors.text}</p>
                    ) : null}
                    <button className="btn btn-primary w-100 py-3 mt-3" type="submit">
                    Add comment
                    </button>
                </div>
            </div>
        </form>
        {/* <div className="create-comment">
          <label>Add new comment:</label>
          <form className="form d-flex flex-column" onSubmit={onSubmit}>
            <input type="text" name="username" placeholder="Type username"/>
            <textarea
              name="comment"
              value={values.comment}
              onChange={onChange}
              placeholder="Comment......"
              minLength={5}
            ></textarea>
            <input className="btn btn-primary submit" name="commentInput" type="submit" value="Add Comment" />
          </form>
        </div> */}
      </>
      )}      
    </>
  );
};

export default CrystalComments;
