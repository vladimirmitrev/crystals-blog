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

const CrystalDetails = () => {
    const navigate = useNavigate();
    const { email, userId } = useContext(AuthContext);
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
  return (
    <div className={`col-lg-4 col-md-6 wow fadeInUp animated ${styles.detailsCard}`} data-wow-delay="0.1s">
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
                    {/* <a href="#" className="btn btn-sm btn-primary px-3 border-end" style="border-radius: 30px 0 0 30px;">Read More</a>
                                    <a href="#" className="btn btn-sm btn-primary px-3" style="border-radius: 0 30px 30px 0;">Book Now</a> */}
                    </div>
                </div>
            </div>
          </div>
    // <div
    //   className={`col-lg-4 col-md-12 wow fadeInUp ${styles.latestCard}`}
    //   data-wow-delay="2s"
    // >
    //   <div className="game">
    //     <div className="image-wrap">
    //       <img src={imageUrl} />
    //     </div>
    //     <h3>{name}</h3>
    //     <div className="rating">
    //       <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
    //     </div>
    //     <div className="data-buttons">
    //       <Link to={pathToUrl(Path.CrystalDetails, {crystalId: _id})} className="btn details-btn">
    //         Details
    //       </Link>
    //     </div>
    //   </div>
    // </div>
  );
};

export default CrystalDetails;
