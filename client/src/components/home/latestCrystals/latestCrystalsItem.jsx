import { Link } from "react-router-dom";
import Path from "../../../paths";
import { pathToUrl } from "../../../utils/pathUtils";
import styles from './LatestCrystalsItem.module.css';
import { faPalette} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LatestsCrystalsItem = ({
    _id,
    name,
    imageUrl,
    rarity,
    color,
    source,
    healing
}) => {
  return (
    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="package-item">
              <div className="overflow-hidden">
                <img className={`img-fluid ${styles.cardImage}`} src={imageUrl} alt="Crystal Image" />
              </div>
              <div className="d-flex border-bottom">
                <small className="flex-fill text-center border-end py-2">
                  <i className="fa fa-map-marker-alt text-primary me-2"></i>
                  {name}
                </small>
                <small className="flex-fill text-center border-end py-2">
                  {/* <i className="fa fa-calendar-alt text-primary me-2"></i> {color} */}
                  <FontAwesomeIcon icon={faPalette} /> {color}
                </small>
                <small className="flex-fill text-center py-2">
                  <i className="fa fa-user text-primary me-2"></i>{rarity}
                </small>
              </div>
              <div className="text-center p-4">
                <h3 className="mb-0">{source}</h3>
                <div className="mb-3">
                  <small className="fa fa-star text-primary"></small>
                  <small className="fa fa-star text-primary"></small>
                  <small className="fa fa-star text-primary"></small>
                  <small className="fa fa-star text-primary"></small>
                  <small className="fa fa-star text-primary"></small>
                </div>
                <p>
                  {healing}
                </p>
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

export default LatestsCrystalsItem;
