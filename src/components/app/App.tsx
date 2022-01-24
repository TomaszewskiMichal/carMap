import { ThemeProvider } from '@mui/material/styles';
/**
 *@description Custom Imports
 */
import { NavBar } from '../navBar';
import { CarMap } from '../carMap';
import { theme } from '../../utils/themeProvider';
import { GoogleMapsProvider } from '../../utils/googleMapsProvider';
import { ErrorBoundary } from '../../utils/reusableComponents/errorComponent';

export const App = (): JSX.Element => {
  return (
    <div className="h-screen">
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <NavBar />
          <GoogleMapsProvider>
            <CarMap />
          </GoogleMapsProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </div>
  );
};
