import withAuth from '../../HOC/withAuth';
import * as crystalService from '../../services/crystalService';
import { useEffect, useState } from 'react';
import LatestsCrystalsItem from './latestCrystals/latestCrystalsItem';

const Home = ({ 
    email,
     _id
    }) => {
  const [latestCrystals, setLatestCrystals] = useState([]);

  useEffect(() => {
    crystalService.getLatest().then((result) => {
      setLatestCrystals(result);
    });
  }, []);
  console.log(latestCrystals);

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
        <h6 className="section-title bg-white text-center text-primary px-3">
            Crystals
          </h6>
          <h1 className="mb-5">Latest Crystals</h1>
        </div>
        <div className="row g-4 justify-content-center">
          {latestCrystals.map((crystal) => (
            <LatestsCrystalsItem key={crystal._id} {...crystal} />
          ))}
          {/* <!-- Display paragraph: If there is no crystals  --> */}
          {!latestCrystals.length && (
            <p className="h1">No crystals yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

const EnhancedHome = withAuth(Home);

export default EnhancedHome;
