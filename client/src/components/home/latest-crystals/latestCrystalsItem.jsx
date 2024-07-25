import { Link } from 'react-router-dom';
import Path from '../../../paths';
import { pathToUrl } from '../../../utils/pathUtils';
import styles from './LatestCrystalsItem.module.css';
import { faPalette} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LatestsCrystalsItem = ({ 
    _id, 
    name, 
    imageUrl, 
    color, 
    appearance }) => {
  return (
    <div className={`item testimonial-item bg-white text-center border p-4 ${styles.latestCard}`}>
        <img
        className={`bg-white rounded-circle shadow p-1 mx-auto mb-3 ${styles.latestCardImage}`}
        src={imageUrl}
        />
        <h5 className="mb-0">{name}</h5>
        <p><FontAwesomeIcon icon={faPalette} /> {color}</p>
        <p className="mb-0">{appearance}</p>
        <Link to={pathToUrl(Path.CrystalDetails, {crystalId: _id})} 
            className="btn details-btn btn-primary rounded-3">Details
        </Link>
    </div>
  );
};

export default LatestsCrystalsItem;
