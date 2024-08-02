import { useEffect, useState } from "react";
import * as crystalService from '../../../services/crystalService';
import CrystalCatalogItem from "./CrystalCatalogItem/CrystalCatalogItem";
import styles from './CrystalCatalog.module.css';
import Loading from "../../loading/Loading";

const CrystalCatalog = () => {
    const [allCrystals, setAllCrystals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

    useEffect(() => {
        const fetchAllCrystals = async () => {
            setLoading(true);
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

    // Calculate the crystals to display based on the current page
    const indexOfLastCrystal = currentPage * pageSize;
    const indexOfFirstCrystal = indexOfLastCrystal - pageSize;
    const currentCrystals = allCrystals.slice(indexOfFirstCrystal, indexOfLastCrystal);

    const totalPages = Math.ceil(allCrystals.length / pageSize);

    // Function to change the page
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h6 className="section-title bg-white text-center text-primary px-3 mt-3">Crystals Catalog</h6>
                </div>
                {loading ? (
                    <Loading />
                ) : currentCrystals.length ? (
                    <div className={`row g-4 mt-3 text-center ${styles.catalog}`}>
                        {currentCrystals.map(crystal => (
                            <CrystalCatalogItem key={crystal._id} {...crystal} />
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
                {!loading && totalPages > 1 && (
                    <div className={`pagination ${styles.pagination}`}>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                            <button
                                key={pageNumber}
                                className={`btn rounded-pill ${currentPage === pageNumber ? 'btn-info' : 'btn-primary'}`}
                                onClick={() => handlePageChange(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CrystalCatalog;
