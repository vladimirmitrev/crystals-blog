import { useEffect, useState } from "react";
import * as crystalService from '../../../services/crystalService'
import CrystalCatalogItem from "./CrystalCatalogItem/CrystalCatalogItem";
import styles from './CrystalCatalog.module.css';

const CrystalCatalog = () => {
    const [crystals, setCrystals] = useState([]);

    useEffect(() => {
        crystalService.getAll()
        .then(result => setCrystals(result))
        .catch(err => {
            console.log(err);
        });
    },[]);

    return (
        <div className="container-xxl py-5">
        <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h6 className="section-title bg-white text-center text-primary px-3 mt-3">Crystals Catalog</h6>
                {/* <h1 className="mb-5">Meet Our Guide</h1> */}
            </div>
        <div className={`row g-4 mt-3 text-center ${styles.catalog}`}>
            {crystals.map(crystal => (
                <CrystalCatalogItem key={crystal._id} {...crystal}/>
            ))}

            {crystals.length === 0 && (
                <h3 className="no-articles">No crystal yet</h3>
            )}
        </div>
        </div>
        </div>
    );
}

export default CrystalCatalog;