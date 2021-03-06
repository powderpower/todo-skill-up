import {
    ROUTE_HOME,
    ROUTE_LOGIN,
    ROUTE_TODO_LIST,
    ROUTE_CREATE_USER,
} from '@router/routes';

const getters = {
    getRoute: () => {
        return (route, params = {}, query = {}, hash = null) => {
            let routeQuery = { name: route };

            if (Object.keys(params).length) {
                routeQuery.params = params;
            }

            if (Object.keys(query).length) {
                routeQuery.query = query;
            }

            if (hash) {
                routeQuery.hash = hash;
            }
            
            return routeQuery;
        };
    },
    getHomeRoute: function (state, getters) {
        return getters.getRoute(ROUTE_HOME);
    },
    getLoginRoute: function (state, getters) {
        return getters.getRoute(ROUTE_LOGIN);
    },
    getTodoListRoute: function (_state, getters) {
        return getters.getRoute(ROUTE_TODO_LIST);
    },
    getCreateUserRoute: function (_state, getters) {
        return getters.getRoute(ROUTE_CREATE_USER);
    }
};

export default {
    getters: getters,
}