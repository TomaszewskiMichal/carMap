import { GoogleMap, MarkerClusterer } from '@react-google-maps/api';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Marker, InfoWindow } from '@react-google-maps/api';
import Brightness1Icon from '@mui/icons-material/Brightness1';
/**
 *@description Custom Imports
 */
import { FilterModal } from './filterModal/FilterModal';
import { Loader } from '../../utils/reusableComponents/loaderComponent';
import { ErrorText } from '../../utils/reusableComponents/errorComponent';
import {
  useGoogleMaps,
  containerStyle,
  center,
} from '../../utils/googleMapsProvider';
import icon from '../../utils/icon.png';
import icon2 from '../../utils/icon2.png';
import { useCarMap } from './useCarMap/useCarMap';

export const CarMap = (): JSX.Element => {
  const { state, handleSwichState } = useCarMap();
  const { isGoogleMapsLoaded, loadError } = useGoogleMaps();

  if (loadError || state.error) return <ErrorText />;

  if (!isGoogleMapsLoaded || state.loading) return <Loader />;

  return (
    <div className="flex justify-center flex-col items-center h-[92%] bg-secondary">
      <div className="my-2">
        <Button
          color="primary"
          variant="contained"
          aria-label="Filter button"
          onClick={() => handleSwichState('openFilterModal', true)}
        >
          <FilterAltIcon />
        </Button>
      </div>
      <FilterModal
        dataToMap={state.dataToMap}
        dataToFilter={state.dataToFilter}
        handleSwichState={handleSwichState}
        open={state.openFilterModal}
      />
      <GoogleMap
        id="car-map"
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
      >
        {state.markerClicked && (
          <InfoWindow
            position={{
              lat: state.markerClicked.location.latitude,
              lng: state.markerClicked.location.longitude,
            }}
            onCloseClick={() => handleSwichState('markerClicked', null)}
          >
            <div>
              <div className="flex items-center">
                <Typography variant="h5">
                  {`${state.markerClicked.status.charAt(
                    0
                  )}${state.markerClicked.status.slice(1).toLowerCase()}: `}
                </Typography>
                {state.markerClicked.status === 'AVAILABLE' ? (
                  <Brightness1Icon className="text-green ml-4" />
                ) : (
                  <Brightness1Icon className="text-red ml-4" />
                )}
              </div>
              <Typography variant="h6">
                Name: {state.markerClicked.name}
              </Typography>
              <Typography variant="h6">
                Plates Number: {state.markerClicked.platesNumber}
              </Typography>
              <Typography variant="h6">
                Battery: {state.markerClicked.batteryLevelPct}
              </Typography>
            </div>
          </InfoWindow>
        )}
        {state.dataToMap && (
          <MarkerClusterer enableRetinaIcons minimumClusterSize={3}>
            {(clusterer) =>
              state.dataToMap.map((vehicle) => (
                <Marker
                  key={vehicle.id}
                  clusterer={clusterer}
                  position={{
                    lat: vehicle.location.latitude,
                    lng: vehicle.location.longitude,
                  }}
                  icon={
                    vehicle.status === 'AVAILABLE'
                      ? { url: icon }
                      : { url: icon2 }
                  }
                  onClick={() => handleSwichState('markerClicked', vehicle)}
                />
              ))
            }
          </MarkerClusterer>
        )}
      </GoogleMap>
    </div>
  );
};
