import { useContext, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../../../contexts/authContext";
import styles from './CrystalLikes.module.css';
import * as likeService from '../../../../services/likeService';
import reducer from "./likeReducer";
import { NotificationContext, types } from '../../../../contexts/NotificationContext';

const CrystalLikes = ({
    _id,
    _ownerId,
}) => {
    const { crystalId } = useParams();
    const { email, userId, isAuthenticated } = useContext(AuthContext);
    const [likes, dispatch] = useReducer(reducer, []);
    const { showNotification } = useContext(NotificationContext);
    const [like, setLike] = useState(null);
    const [likesCount, setLikesCount] = useState(0);
    const [isLikedBefore, setIsLikedBefore] = useState(false);

    useEffect(() => {
        likeService.getAll(crystalId)
            .then((result) => {
                dispatch({
                    type: 'GET_ALL_LIKES',
                    payload: result,
                });
                getCurrentUserLike();
                setLikesCount(result.length);
                checkStatusOfLikes();
                console.log(result);
                console.log(likesCount);
            });
    }, [crystalId]);

    const getCurrentUserLike = async () => {
        try {
            const likeId = await likeService.getLikeId(crystalId, userId);
            setLike(likeId);
        } catch (error) {
            console.error('Error fetching like ID:', error);
        }
    };

    const checkStatusOfLikes = async () => {
        try {
            const result = await likeService.getStatusOfPreviouslyLiked(_id, crystalId, userId);

            setIsLikedBefore(result);
                            
        } catch (error) {
            console.log(error);
        }
    };

    const likeCrystal = async () => {
        const isLiked = true;
        let newLike;
        try {
            if ( isLikedBefore === false) {
                newLike = await likeService.like(crystalId, isLiked);
            } else {
                newLike = await likeService.editPreviouslyLiked(crystalId, isLiked);
            }
            showNotification('You successfully added a new like!', types.success);
            setLike(newLike);
            setLikesCount(likesCount + 1);
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
            await likeService.dislike(likeId, likesData);
            setLike(null)
            setLikesCount(likesCount - 1);
            showNotification('You successfully removed a like!', types.success);
            likes.length - 1;
            dispatch({
                type: 'REMOVE_LIKE',
                payload: likeId
            })

        } catch (err) {
            showNotification(err.message, types.error);
            console.log(err);
        }
    };
    return (
        <>
            {isAuthenticated && (
                <div className={styles.likesCard}>
                    {/* <p className="card-owner"><span>Added by: Someone</span></p> */}
                    <div className="text-center">
                        <div>
                            <h6 className={styles.likesCount}>Likes: ({likesCount ? likesCount : '0'})</h6>
                        </div>
                        <div className={styles.cardLikes}>
                            {_ownerId !== userId && (
                                <div 
                                className={`${styles.heart} ${like ? styles.active : ''}`} 
                                onClick={like ? dislikeCrystal : likeCrystal}
                            >
                                &#10084;
                            </div>
                            )}
                        </div>
                    </div>
                </div>
             )}
        </>
    );
};

export default CrystalLikes;
