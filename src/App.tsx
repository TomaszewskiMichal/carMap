import { NavBar } from './components/navBar/NavBar';
import { Map } from './components/map/Map';

export const App = (): JSX.Element => {
  return (
    <div className="h-screen">
      <NavBar />
      <Map />
    </div>
  );
};

export default App;
