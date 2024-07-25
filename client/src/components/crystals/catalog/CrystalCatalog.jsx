import { useEffect, useState } from "react";
import * as crystalService from '../../../services/crystalService'
import CrystalCatalogItem from "./CrystalCatalogItem/CrystalCatalogItem";
import styles from './CrystalCatalog.module.css';

const CrystalCatalog = () => {
    const [allCrystals, setAllCrystals] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchAllCrystals = async () => {
          try {
            const result = await crystalService.getAll();
            setAllCrystals(result);
          } catch (error) {
            console.error('Error fetching crystals:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchAllCrystals();
      }, []);
    return (
        <div className="container-xxl py-5">
        <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h6 className="section-title bg-white text-center text-primary px-3 mt-3">Crystals Catalog</h6>
                {/* <h1 className="mb-5">Meet Our Guide</h1> */}
            </div>
            {loading ? (
                <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
                    <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
          ) : allCrystals.length ? (
        <div className={`row g-4 mt-3 text-center ${styles.catalog}`}>
            {allCrystals.map(crystal => (
                <CrystalCatalogItem key={crystal._id} {...crystal}/>
            ))}
        </div>
          ) : (
            <div>
            <p className="h2 text-danger text-center">
              Sorry there are no added crystals yet
            </p>
            <p className="h2 text-danger text-center">:\</p>
          </div>
        )}
        </div>
        </div>
    );
}

export default CrystalCatalog;