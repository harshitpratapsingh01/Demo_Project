import UserRoutes from "./user.routers";
import { OperationRoutes } from "./useroperation.routes";
import { PropertyRoutes } from "./property.router";
import { FavoritesRoutes } from "./favorite.route";
import { ViewRoutes } from "./view.routes";


export let routes = [
    ...UserRoutes,
    ...OperationRoutes,
    ...PropertyRoutes,
    ...FavoritesRoutes,
    ...ViewRoutes
];