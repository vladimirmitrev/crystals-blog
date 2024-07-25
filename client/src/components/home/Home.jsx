import { useEffect, useState } from 'react';
import withAuth from '../../HOC/withAuth';
import * as crystalService from '../../services/crystalService';
import LatestsCrystalsItem from './latest-crystals/latestCrystalsItem';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';

const Home = ({ 
    email, 
    name }) => {
  const [latestCrystals, setLatestCrystals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestCrystals = async () => {
      try {
        const result = await crystalService.getLatest();
        setLatestCrystals(result);
      } catch (error) {
        console.error('Error fetching latest crystals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestCrystals();
  }, []);

  return (
    <div>
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="text-center">
            <h1 className="mb-5 text-dark mt-3">
              Welcome {name ? name : 'Guest'} to Crystals Blog!!!
            </h1>
            <h6 className="section-title bg-white text-center text-primary px-3">
              Our Latest Crystals
            </h6>
          </div>
          {loading ? (
                <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
                    <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
          ) : latestCrystals.length ? (
            <OwlCarousel
              className="owl-theme"
              items={3}
              autoplay={true}
              smartSpeed={1000}
              autoplaySpeed={1000}
              autoplayTimeout={3000}
              nav
              dots
              loop
              margin={10}
              dotsSpeed={1000}
              navSpeed={1000}
            >
              {latestCrystals.map((crystal) => (
                <LatestsCrystalsItem key={crystal._id} {...crystal} />
              ))}
            </OwlCarousel>
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
    </div>
  );
};

const EnhancedHome = withAuth(Home);

export default EnhancedHome;
