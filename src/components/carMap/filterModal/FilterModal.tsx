import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
/**
 *@description Custom Imports
 */
import { CustomModal } from '../../../utils/reusableComponents/modal/CustomModal';
import {
  VehicleToMarkerInterface,
  FilterModalProps,
  FilterModalState,
} from '../carMap.interface';
import { Loader } from '../../../utils/reusableComponents/loaderComponent/Loader';

export const FilterModal = (props: FilterModalProps): JSX.Element => {
  const [state, setState] = useState<FilterModalState>({
    loading: false,
    empty: false,
    availableCarFilter: false,
    carWithBatteryOver90Filter: false,
    carWithFullBattery: false,
  });

  const handleClearFilter = (): void => {
    setState((prev) => ({
      ...prev,
      empty: false,
      availableCarFilter: false,
      carWithBatteryOver90Filter: false,
      carWithFullBattery: false,
    }));
    props.handleSwichState('openFilterModal', false);
  };

  useEffect(() => {
    let filteredData: VehicleToMarkerInterface[] = [];

    if (state.empty) filteredData = props.dataToFilter;
    if (state.availableCarFilter)
      filteredData = filteredData.length
        ? filteredData.filter((vehicle) => vehicle.status === 'AVAILABLE')
        : props.dataToMap.filter((vehicle) => vehicle.status === 'AVAILABLE');

    if (state.carWithBatteryOver90Filter)
      filteredData = filteredData.length
        ? filteredData.filter((vehicle) => vehicle.batteryLevelPct > 90)
        : props.dataToMap.filter((vehicle) => vehicle.batteryLevelPct > 90);

    if (state.carWithFullBattery)
      filteredData = filteredData.length
        ? filteredData.filter((vehicle) => vehicle.batteryLevelPct === 100)
        : props.dataToMap.filter((vehicle) => vehicle.batteryLevelPct === 100);

    if (
      !state.availableCarFilter &&
      !state.carWithBatteryOver90Filter &&
      !state.carWithFullBattery
    )
      filteredData = props.dataToFilter;

    props.handleSwichState('dataToMap', filteredData);
    setState((prev) => ({
      ...prev,
      loading: false,
      empty: filteredData.length ? false : true,
    }));
  }, [
    state.availableCarFilter,
    state.carWithBatteryOver90Filter,
    state.carWithFullBattery,
  ]);

  return (
    <CustomModal
      open={props.open}
      onClose={handleClearFilter}
      title={'What you are looking for?'}
      body={
        <div className="flex flex-col">
          <FormControlLabel
            control={
              <Checkbox
                checked={state.availableCarFilter}
                onChange={() =>
                  setState((prev) => ({
                    ...prev,
                    availableCarFilter: !prev.availableCarFilter,
                    loading: true,
                  }))
                }
                aria-label="show available cars"
              />
            }
            label="Show Only Available Cars"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.carWithBatteryOver90Filter}
                onChange={() =>
                  setState((prev) => ({
                    ...prev,
                    carWithBatteryOver90Filter:
                      !prev.carWithBatteryOver90Filter,
                    loading: true,
                  }))
                }
                aria-label="show cars with battery over 90"
              />
            }
            label="Show Only Cars with Battery Over 90"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.carWithFullBattery}
                onChange={() =>
                  setState((prev) => ({
                    ...prev,
                    carWithFullBattery: !prev.carWithFullBattery,
                    loading: true,
                  }))
                }
                aria-label="show cars with full battery"
              />
            }
            label="Show Only Cars with Full Battery"
          />
          {state.empty && (
            <Typography variant="h5" align="center">
              No cars found
            </Typography>
          )}
        </div>
      }
      footerActions={
        <div className="flex justify-around w-full">
          <Button
            variant="contained"
            color="primary"
            disabled={state.empty}
            onClick={
              state.loading
                ? () => {}
                : () => props.handleSwichState('openFilterModal', false)
            }
          >
            {state.loading ? <Loader /> : 'Filter'}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={state.loading ? () => {} : () => handleClearFilter()}
          >
            {state.loading ? <Loader /> : 'Clear'}
          </Button>
        </div>
      }
    />
  );
};
