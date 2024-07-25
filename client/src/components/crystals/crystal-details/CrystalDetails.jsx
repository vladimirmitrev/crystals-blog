import { Link, useNavigate, useParams } from "react-router-dom";

import { pathToUrl } from "../../../utils/pathUtils";
import AuthContext from "../../../contexts/authContext";
import Path from "../../../paths";
// import {} from '../../../services/crystalService';
import * as crystalService from '../../../services/crystalService'

import styles from './CrystalDetails.module.css';
import { faPalette, faGem, faShapes, faMagic, faMapMarked, faSpa } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useReducer, useState } from "react";
import { useContext } from "react";
import { NotificationContext, types } from '../../../contexts/NotificationContext';

const CrystalDetails = () => {
    const navigate = useNavigate();
    const { email, userId } = useContext(AuthContext);
    const { showNotification } = useContext(NotificationContext);
    const { crystalId } = useParams();
    const [crystal, setCrystal] = useState({});
    // const [comments, dispatch] = useReducer(reducer, []);

    useEffect(() => {
        crystalService.getOne(crystalId)
            .then(setCrystal);

        // commentService.getAll(crystalId)
        //     .then((result) => {
        //         dispatch({
        //             type: 'GET_ALL_COMMENTS',
        //             payload: result,
        //         })
        //     });
    }, [crystalId]);

    const deleteButtonClickHandler = async () => {
        const hasConfirmed = confirm(`Are you sure you want to delete ${crystal.name}?`)
        if (hasConfirmed) {
            try {
                await crystalService.remove(crystalId);

                showNotification('You successfully delete a crystal!', types.success);
                navigate(Path.Crystals);
            } catch (err) {
                showNotification(err.message, types.error);
                console.log(err.message);
            }
        }
    }
  return (
    <div className={`col-lg-4 col-md-6 wow zoomIn animated ${styles.detailsCard}`} data-wow-delay="0.1s">
            <div className="package-item">
                <div className="overflow-hidden">
                <img className={`img-fluid ${styles.cardImage}`} src={crystal.imageUrl} alt="Crystal Image" />
                </div>
                <h3 className="text-center mt-1 mb-1">{crystal.name}</h3>
                {/* <div className="d-flex border-bottom">
                    <small className="flex-fill text-center border-end py-2">
                    <FontAwesomeIcon icon={faPalette} />
                        {crystal.name}
                    </small>
                    <small className="flex-fill text-center border-end py-2 text-dark">
                        <FontAwesomeIcon icon={faPalette} /> Colors: {crystal.color}
                    </small>
                    <small className="flex-fill text-center text-dark py-2">
                    <   FontAwesomeIcon icon={faGem} /> Rarity: {crystal.rarity}
                    </small>
                </div> */}
                <div className="border-top p-4 mt-2">
                    {/* <div className="mb-3 d-flex">
                        <p>Rating: </p>
                        <small className="fa fa-star text-primary"></small>
                        <small className="fa fa-star text-primary"></small>
                        <small className="fa fa-star text-primary"></small>
                        <small className="fa fa-star text-primary"></small>
                        <small className="fa fa-star text-primary"></small>
                    </div> */}
                    <h6><FontAwesomeIcon icon={faPalette} /> Colors</h6>
                    <p>{crystal.color}</p>
                    <h6><FontAwesomeIcon icon={faGem} /> Rarity</h6>
                    <p>{crystal.rarity}</p>
                    <h6><FontAwesomeIcon icon={faShapes} /> Appearance</h6>
                    <p>{crystal.appearance}</p>
                    <h6><FontAwesomeIcon icon={faSpa} /> Healing powers</h6>
                    <p>
                    {crystal.healing}
                    </p>
                    <h6><FontAwesomeIcon icon={faMapMarked} /> Countries where can be found</h6>
                    <p>{crystal.source}</p>
                    <div className="d-flex justify-content-center mb-2">
                    { userId === crystal._ownerId && (
                        <div className="buttons d-flex gap-3">
                            <Link to={pathToUrl(Path.CrystalEdit, { crystalId})} className="btn details-btn btn-warning rounded-3 mt-2 mt-2 ml-3">Edit</Link>
                            <button className="btn btn-danger rounded-3 mt-2 ml-3" onClick={deleteButtonClickHandler}>Delete</button>
                        </div>
                    )}
                    </div>
                </div>
            </div>
          </div>
  );
};

export default CrystalDetails;
