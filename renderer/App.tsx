import { GridProvider } from "@context/grid/GridContext";
import { LocationProvider } from "@context/location/locationContext";
import { TabProvider } from "@context/tabs/TabContext";
import { routes } from "@routes/routes";
import type { FC } from "react";
import { useMemo } from "react";
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from "react-router-dom";
import { ErrorBoundary } from "./components/error/ErrorBoundary";
import { Footer } from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";

const AppContent: FC = () => {
  const routeElements = useMemo(
    () =>
      routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      )),
    [],
  );

  return (
    <LocationProvider>
      <GridProvider>
        <TabProvider>
          <Navbar />
          <Sidebar />
          <div className="main-container">
            <ErrorBoundary>
              <Routes>
                {routeElements}
                <Route path="*" element={<Navigate to="/home" />} />
              </Routes>
            </ErrorBoundary>
            <Footer />
          </div>
        </TabProvider>
      </GridProvider>
    </LocationProvider>
  );
};

const App: FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
};

export default App;
