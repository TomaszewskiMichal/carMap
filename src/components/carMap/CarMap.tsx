import { GoogleMap, MarkerClusterer } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Marker, InfoWindow } from '@react-google-maps/api';
/**
 *
 */
import { CustomModal } from '../../utils/reusableComponents/modal/CustomModal';
import {
  useGoogleMaps,
  containerStyle,
  center,
} from '../../utils/GoogleMapsProvider';
import { Loader } from '../../utils/reusableComponents/loaderComponent/Loader';
import { ErrorText } from '../../utils/reusableComponents/errorComponent/ErrorText';
import icon from '../../utils/icon.png';

interface MapState {
  open: boolean;
  availableCarFilter: boolean;
  carWithBatteryOver90Filter: boolean;
  loading: boolean;
  error: boolean;
  dataToMap: [] | VehicleToMarkerInterface[];
  dataToFilter: [] | VehicleToMarkerInterface[];
  markerClicked: null | VehicleToMarkerInterface;
}
interface VehicleToMarkerInterface {
  location: { latitude: number; longitude: number };
  name: string;
  batteryLevelPct: number;
  color: string;
  id: string;
  platesNumber: string;
  status: string;
  type: string;
}

export const CarMap = (): JSX.Element => {
  const [state, setState] = useState<MapState>({
    open: false,
    availableCarFilter: false,
    carWithBatteryOver90Filter: false,
    loading: true,
    error: false,
    dataToMap: [],
    dataToFilter: [],
    markerClicked: null,
  });
  const { isGoogleMapsLoaded, loadError } = useGoogleMaps();

  // Title body and footer for Custom Modal
  const modalTitle = 'What you are looking for?';
  const modalBody = <div></div>;
  const modalFooter = (
    <div>
      <Button variant="contained" color="primary">
        Filter
      </Button>
    </div>
  );

  const handleOpenModal = (): void =>
    setState((prev) => ({ ...prev, open: true }));

  const handleCloseModal = (): void =>
    setState((prev) => ({ ...prev, open: false }));

  const handleCloseInfoWindow = (): void =>
    setState((prev) => ({ ...prev, markerClicked: null }));

  const getData = async () => {
    try {
      const { data } = await axios.get(
        'https://dev.vozilla.pl/api-client-portal/map?objectType=VEHICLE'
      );
      setState((prev) => ({
        ...prev,
        loading: false,
        dataToMap: data.objects,
        dataToFilter: data.objects,
      }));
    } catch {
      setState((prev) => ({ ...prev, loading: false, error: true }));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loadError || state.error) return <ErrorText />;

  if (!isGoogleMapsLoaded || state.loading) return <Loader />;

  return (
    <div className="flex justify-center flex-col items-center h-[92%] bg-yellow">
      <div className="my-2">
        <Button
          color="primary"
          variant="contained"
          aria-label="Filter button"
          onClick={handleOpenModal}
        >
          <FilterAltIcon />
        </Button>
      </div>
      <CustomModal
        open={state.open}
        onClose={handleCloseModal}
        title={modalTitle}
        body={modalBody}
        footerActions={modalFooter}
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
            onCloseClick={handleCloseInfoWindow}
          >
            <div>
              <div className="">
                <Typography variant="h5">
                  {state.markerClicked.status}
                </Typography>
                <Typography variant="h6">{state.markerClicked.name}</Typography>
              </div>
              <Typography variant="h6">
                {state.markerClicked.platesNumber}
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
                  icon={{ url: icon }}
                  onClick={() => {
                    setState((prev) => ({ ...prev, markerClicked: vehicle }));
                  }}
                />
              ))
            }
          </MarkerClusterer>
        )}
      </GoogleMap>
    </div>
  );
};
