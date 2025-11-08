import { Outlet, useLocation } from "react-router-dom";
import { PageAnimation } from "./PageAnimation";

export const AnimatedOutlet = () => {
  const location = useLocation();
  return (
    <PageAnimation key={location.pathname}>
      <Outlet />
    </PageAnimation>
  );
};