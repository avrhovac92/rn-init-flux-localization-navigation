/**
*  Import routes from subfolders and export them all as one object§
*  Used for routing
*/

import { routes as homeRoutes } from '@components/home/screens';

const routes = {
  ...homeRoutes
};

export default routes;
