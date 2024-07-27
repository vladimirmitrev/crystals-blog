import { useContext, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../../../contexts/authContext";
// import styles from './CrystalLikes.module.css';
import * as likeService from '../../../../services/likeService';
import reducer from "./likeReducer";
import { NotificationContext, types } from '../../../../contexts/NotificationContext';

const CrystalLikes = ({
    _ownerId
}) => {
    const { crystalId } = useParams();
    const { email, userId, isAuthenticated } = useContext(AuthContext);
    const [likes, dispatch] = useReducer(reducer, []);
    const { showNotification } = useContext(NotificationContext);
    const [like, setLike] = useState(null);

    useEffect(() => {
        likeService.getAll(crystalId)
            .then((result) => {
                dispatch({
                    type: 'GET_ALL_LIKES',
                    payload: result,
                });
                getCrystalLikeId();
            });
    }, [crystalId]);

    const getCrystalLikeId = async () => {
        try {
            const likeId = await likeService.getLikeId(crystalId, userId);
            setLike({ _id: likeId });
        } catch (error) {
            console.error('Error fetching like ID:', error);
        }
    };

    const likeCrystal = async () => {
        const isLiked = true;
        try {
            const newLike = await likeService.like(crystalId, isLiked);
            showNotification('You successfully added a new like!', types.success);
            dispatch({
                type: 'ADD_LIKE',
                payload: newLike
            })
        } catch (err) {
            showNotification(err.message, types.error);
            console.log(err);
        }
    };

    const dislikeCrystal = async () => {
        if (!like) {
            console.error('No like to dislike');
            return;
        }
        const likeId = like._id;
        const likesData = {
            crystalId: crystalId,
            isLiked: false,
        };
        try {
            const newLike = await likeService.dislike(likeId, likesData);
            showNotification('You successfully removed a like!', types.success);
            dispatch({
                type: 'ADD_LIKE',
                payload: newLike
            })
        } catch (err) {
            showNotification(err.message, types.error);
            console.log(err);
        }
    };

    const likesCount = <h6 className="likes-count">Likes: {likes?.length}</h6>;

    return (
        <>
            {isAuthenticated && (
                <div className="card-owner-details">
                    <p className="card-owner"><span>Added by: Someone</span></p>
                    <div className="flex-end">
                        {likesCount}
                        <div className="d-flex gap-3">
                            <button className="btn rounded-pill btn-success" onClick={likeCrystal}>Like</button>
                            <button className="btn rounded-pill btn-danger" onClick={dislikeCrystal}>Dislike</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CrystalLikes;
