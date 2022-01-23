import { createContext, useContext } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
/**
 * @description Type annotations for Google map context
 */
type GoogleMapsProviderProps = { children: JSX.Element };
type contextInitialState = {
  isGoogleMapsLoaded: boolean;
  loadError: boolean;
};

const initialState: contextInitialState = {
  isGoogleMapsLoaded: false,
  loadError: false,
};

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

/**
 * @description Options for rendering Google Map
 */
export const containerStyle: { width: string; height: string } = {
  width: `${window.innerWidth - 20}px`,
  height: `${(window.innerHeight * 0.9).toFixed()}px`,
};
export const center: { lat: number; lng: number } = {
  lat: 52.237049,
  lng: 21.017532,
};
