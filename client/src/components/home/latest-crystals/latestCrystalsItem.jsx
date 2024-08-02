import { Link } from 'react-router-dom';
import Path from '../../../paths';
import { pathToUrl } from '../../../utils/pathUtils';
import styles from './LatestCrystalsItem.module.css';
import { faGem } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LatestsCrystalsItem = ({ 
    _id, 
    name, 
    imageUrl, 
    color, 
    appearance,
    rarity,
  }) => {
  return (
    <div className={`item testimonial-item bg-white text-center border p-4 team-item ${styles.latestCard}`}>
        <img
        className={`bg-white rounded-circle p-1 mx-auto mb-3 ${styles.latestCardImage}`}
        src={imageUrl}
        />
        <div className="text-center">
            <h5 className="mb-0">{name}</h5>
            <small><FontAwesomeIcon icon={faGem} /> {rarity}</small>
        </div>
        {/* <h5 className="mt-3">{name}</h5>
        <small><FontAwesomeIcon icon={faGem} /> {rarity}</small> */}
        {/* <p><FontAwesomeIcon icon={faPalette} /> {color}</p>
        <p className="mb-0">{appearance}</p> */}
        <Link to={pathToUrl(Path.CrystalDetails, {crystalId: _id})} 
            className="btn details-btn btn-primary rounded-3 mt-3">More details
        </Link>
    </div>
  );
};

export default LatestsCrystalsItem;
