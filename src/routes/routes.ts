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
];

export default routes;
