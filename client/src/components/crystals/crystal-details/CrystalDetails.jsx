import { useEffect,  useContext, useState } from "react";
// import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import CrystalComments from "./comments/CrystalComments";
import { pathToUrl } from "../../../utils/pathUtils";
import AuthContext from "../../../contexts/authContext";
import Path from "../../../paths";
import * as crystalService from '../../../services/crystalService';

import styles from './CrystalDetails.module.css';
import { faPalette, faGem, faShapes, faMagic, faMapMarked, faSpa } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NotificationContext, types } from '../../../contexts/NotificationContext';
import CrystalLikes from "./crystal-likes/CrystalLikes";

const CrystalDetails = () => {
    const navigate = useNavigate();
    const { email, userId } = useContext(AuthContext);
    const { showNotification } = useContext(NotificationContext);
    const { crystalId } = useParams();
    const [crystal, setCrystal] = useState({});

    useEffect(() => {
        crystalService.getOne(crystalId)
            .then(setCrystal);
            
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
             <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h6 className="section-title bg-white text-center text-primary px-3 mt-4">Crystal Details</h6>
            </div>
            <div className="package-item mt-3">
                <div className="overflow-hidden">
                <img className={`img-fluid ${styles.cardImage}`} src={crystal.imageUrl} alt="Crystal Image" />
                </div>
                <div className="d-flex justify-content-around">
                <h3 className="text-center ml-3 mt-1 mb-1">{crystal.name}</h3>
                <CrystalLikes key={crystalId} { ...crystal}/>
                </div>
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

                    <CrystalComments />

                    <div className="d-flex justify-content-center mt-3 mb-2 gap-3">
                        <Link to={Path.Crystals} className="btn details-btn btn-info rounded-3 mt-2 mt-2 ml-3">Go back to catalog</Link>
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
