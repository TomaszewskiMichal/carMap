import { ThemeProvider } from '@mui/material/styles';

import { NavBar } from '../navBar/NavBar';
import { Map } from '../map/Map';
import { theme } from '../../utils/themeProvider';
import { GoogleMapsProvider } from '../../utils/GoogleMapsProvider';

export const App = (): JSX.Element => {
  return (
    <div className="h-screen">
      <ThemeProvider theme={theme}>
        <NavBar />
        <GoogleMapsProvider>
          <Map />
        </GoogleMapsProvider>
      </ThemeProvider>
    </div>
  );
};
