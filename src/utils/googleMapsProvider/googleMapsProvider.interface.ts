/**
 * @description Type annotations for Google map context
 */
export type GoogleMapsProviderProps = { children: JSX.Element };

export type contextInitialState = {
  isGoogleMapsLoaded: boolean;
  loadError: boolean;
};

export const initialState: contextInitialState = {
  isGoogleMapsLoaded: false,
  loadError: false,
};

/**
 * @description Options for rendering Google Map
 */
export const containerStyle: { width: string; height: string } = {
  width: `${window.innerWidth - 20}px`,
  height: `${(window.innerHeight * 0.8).toFixed()}px`,
};
export const center: { lat: number; lng: number } = {
  lat: 52.237049,
  lng: 21.017532,
};
