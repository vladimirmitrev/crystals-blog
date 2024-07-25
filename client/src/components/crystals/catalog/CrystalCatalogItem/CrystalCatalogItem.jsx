import {Link} from 'react-router-dom';
import styles from './CrystalCatalogItem.module.css';
import { faPalette} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const GameListItem = ({
    _id,
    name, 
    imageUrl, 
    color, 
    appearance,
}) => {
    return (
        <div className="col-lg-3 col-md-6 wow slideInUp animated" data-wow-delay="0.1s">
            <div className="team-item">
                <div className="overflow-hidden">
                    <img className={`img-fluid ${styles.cardImage}`} src={imageUrl} alt="crystal-image" />
                </div>
                {/* <div className="position-relative d-flex justify-content-center" style={{marginTop: '-19px'}}>
                    <a className="btn btn-square mx-1" href=""><i className="fab fa-facebook-f"></i></a>
                    <a className="btn btn-square mx-1" href=""><i className="fab fa-twitter"></i></a>
                    <a className="btn btn-square mx-1" href=""><i className="fab fa-instagram"></i></a>
                </div> */}
                <div className="text-center p-4">
                    <h5 className="mb-0">{name}</h5>
                    <small><FontAwesomeIcon icon={faPalette} /> {color}</small>
                </div>
                <Link to={`/crystals/${_id}`} className="btn btn-primary rounded-3 mb-2">More details</Link>
            </div>
        </div>
    );
}

export default GameListItem;