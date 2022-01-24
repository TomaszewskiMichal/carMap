import { useState, useEffect } from 'react';
import axios from 'axios';

import { MapState, switchCarMapState } from '../carMap.interface';

export const useCarMap = () => {
  const [state, setState] = useState<MapState>({
    openFilterModal: false,
    loading: true,
    error: false,
    dataToMap: [],
    dataToFilter: [],
    markerClicked: null,
  });

  /**
   *@description Function for swiching state
   */
  const handleSwichState = (
    stateToChange: string,
    newState: switchCarMapState
  ): void => setState((prev) => ({ ...prev, [`${stateToChange}`]: newState }));

  useEffect(() => {
    getDataFromServer();
  }, []);

  const getDataFromServer = async () => {
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
  return {
    state,
    handleSwichState,
  };
};
