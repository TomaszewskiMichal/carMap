import { GoogleMap } from '@react-google-maps/api';
import CircularProgress from '@mui/material/CircularProgress';

import {
  useGoogleMaps,
  containerStyle,
  center,
} from '../../utils/GoogleMapsProvider';

export const Map = (): JSX.Element => {
  const { isGoogleMapsLoaded } = useGoogleMaps();

  if (!isGoogleMapsLoaded)
    return (
      <div className="flex justify-center items-center h-[92%] bg-yellow">
        <div className=" flex justify-center items-center">
          <CircularProgress color="primary" />
        </div>
      </div>
    );
  return (
    <div className="flex justify-center items-center h-[92%] bg-yellow">
      <GoogleMap
        id="car-map"
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      />
    </div>
  );
};
