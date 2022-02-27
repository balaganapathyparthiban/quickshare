import Download from "../pages/Download/Download";
import Landing from "../pages/Landing/Landing";

export interface IRoute {
  path: string;
  component: React.FC;
}

const routes: IRoute[] = [
  {
    path: "/",
    component: Landing,
  },
  {
    path: "/:file",
    component: Download,
  },
];

export default routes;
