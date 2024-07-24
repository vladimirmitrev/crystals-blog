import { useEffect, useState } from 'react';

import withAuth from '../../HOC/withAuth';
import * as crystalService from '../../services/crystalService';
import LatestsCrystalsItem from './latestCrystals/latestCrystalsItem';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';

const Home = ({ 
  email,
  name,
  }) => {
  const [latestCrystals, setLatestCrystals] = useState([]);

  useEffect(() => {
    crystalService.getLatest().then((result) => {
      setLatestCrystals(result);
    });
  }, []);
  // console.log(latestCrystals);

  return (
    <div>
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="text-center">
            <h1 className="mb-5 text-dark">Welcome {name ? name : 'Guest'} to Crystals Blog!!!</h1>
            <h6 className="section-title bg-white text-center text-primary px-3">
              Our Latest Crystals
            </h6>
          </div>
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
          {!latestCrystals.length && (
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
