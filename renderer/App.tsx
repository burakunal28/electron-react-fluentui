import { GridProvider } from "@context/grid/GridContext";
import { LocationProvider } from "@context/location/locationContext";
import { TabProvider } from "@context/tabs/TabContext";
import { routes } from "@routes/routes";
import type { FC } from "react";
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from "react-router-dom";
import { Footer } from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";

const AppContent: FC = () => {
  return (
    <TabProvider>
      <LocationProvider>
        <GridProvider>
          <Navbar />
          <Sidebar />
          <div className="main-container">
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
            <Footer />
          </div>
        </GridProvider>
      </LocationProvider>
    </TabProvider>
  );
};

const App: FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
