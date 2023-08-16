import UserRoutes from "./user.routers";
import { OperationRoutes } from "./useroperation.routes";
import { PropertyRoutes } from "./property.router";
import { FavoritesRoutes } from "./favorite.route";


export let routes = [
    ...UserRoutes,
    ...OperationRoutes,
    ...PropertyRoutes,
    ...FavoritesRoutes
];