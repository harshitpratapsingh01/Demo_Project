import plugin from "../src/middleware/userAuth";
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import * as HapiSwagger from 'hapi-swagger';

export const plugins = [
    {
        plugin,
    },
    Inert,
    Vision,
    {
        plugin: HapiSwagger,
        options: {
            info: {
                title: 'Makan',
                version: '1.0.0',
            },
            securityDefinitions: {
                jwt: {
                  type: 'apiKey',
                  name: 'Authorization',
                  in: 'header'
                }
            },
            security: [{ jwt: [] }],
            grouping:'tags',
            tags: [
                { name: 'user', description: 'user onboarding' },
                { name: 'useroperation', description: 'user route operation' },
                { name: 'property', description:'property operation'},
                {name: 'Buy Request', description: 'property buy request operation'},
                {name: 'FavoritesRoutes', description: 'property favorites operation'},

            ],
            documentationPath: '/documentation', 
        },
    },
];