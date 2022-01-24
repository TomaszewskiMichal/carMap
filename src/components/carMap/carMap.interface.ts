/**
 *@description Interfaces and Types for Car Map
 */
export interface MapState {
  openFilterModal: boolean;
  loading: boolean;
  error: boolean;
  dataToMap: [] | VehicleToMarkerInterface[];
  dataToFilter: [] | VehicleToMarkerInterface[];
  markerClicked: null | VehicleToMarkerInterface;
}
export interface VehicleToMarkerInterface {
  location: { latitude: number; longitude: number };
  name: string;
  batteryLevelPct: number;
  color: string;
  id: string;
  platesNumber: string;
  status: string;
  type: string;
}
export type switchCarMapState =
  | boolean
  | null
  | VehicleToMarkerInterface
  | VehicleToMarkerInterface[];

/**
 *@description Interfaces and Types for Filter Modal
 */
export interface FilterModalProps {
  dataToMap: VehicleToMarkerInterface[];
  dataToFilter: VehicleToMarkerInterface[];
  handleSwichState: (
    stateToChange: string,
    newState: switchCarMapState
  ) => void;
  open: boolean;
}
export interface FilterModalState {
  availableCarFilter: boolean;
  carWithBatteryOver90Filter: boolean;
  carWithFullBattery: boolean;
  loading: boolean;
  empty: boolean;
}
