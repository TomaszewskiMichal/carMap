import { ThemeProvider } from '@mui/material/styles';
/**
 *
 */
import { NavBar } from '../navBar/NavBar';
import { CarMap } from '../carMap/CarMap';
import { theme } from '../../utils/themeProvider';
import { GoogleMapsProvider } from '../../utils/GoogleMapsProvider';
import ErrorBoundary from '../../utils/reusableComponents/errorComponent/ErrorBoundary';

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
