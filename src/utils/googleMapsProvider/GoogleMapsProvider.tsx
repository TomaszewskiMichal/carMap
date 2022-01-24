import { createContext, useContext } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

import {
  GoogleMapsProviderProps,
  initialState,
  contextInitialState,
} from './googleMapsProvider.interface';

export const GoogleMapsContext: React.Context<contextInitialState> =
  createContext(initialState);

export const GoogleMapsProvider = ({
  children,
}: GoogleMapsProviderProps): JSX.Element => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY as string,
  });

  return (
    <GoogleMapsContext.Provider
      value={{ isGoogleMapsLoaded: isLoaded, loadError: Boolean(loadError) }}
    >
      {children}
    </GoogleMapsContext.Provider>
  );
};

export const useGoogleMaps = () => useContext(GoogleMapsContext);
