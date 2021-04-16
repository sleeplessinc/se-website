import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FirebaseContext } from '../firebase';
import * as alertify from 'alertifyjs';
import OverlayDisplay from './OverlayDisplay';
import { URL_IMG_SHIRT } from '../utils/constants';

const ShopSection: React.FC = () => {
  const firebaseContext = React.useContext(FirebaseContext);
  const [shopUrl, setShopUrl] = useState('');

  useEffect(() => {
    return firebaseContext?.subscribeToAppSettings(
      (result) => {
        if (result?.shopUrl) {
          setShopUrl(result.shopUrl);
        }
      },
      (error) => {
        console.log(error);
        alertify.error(`Error loading shop URL`);
      },
    );
  }, [firebaseContext]);

  return (
    <OverlayDisplay imageSrc={URL_IMG_SHIRT} overlap={0.05} imageWidth={0.5}>
      <div className="text-primary text-center px-3 d-flex align-items-center" style={{ height: '20rem' }}>
        <div>
          <h2>
            <strong>Merchandise</strong>
          </h2>
          <h5>Looking for Street Epistemology-themed merch? Browse our selection here.</h5>
          <Button className="m-2" href={shopUrl} target="blank" disabled={!shopUrl}>
            Shop Now
          </Button>
        </div>
      </div>
    </OverlayDisplay>
  );
};

export default ShopSection;
