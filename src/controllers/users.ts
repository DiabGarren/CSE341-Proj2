"use strict";

import {
    GraphQLObjectType, GraphQLString,
    GraphQLID, GraphQLInt, GraphQLSchema,
    GraphQLList, GraphQLNonNull
} from 'graphql';
import user = require('../models/user');

const userType = new GraphQLObjectType({
    name: 'user',

    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        image: { type: GraphQLString },
    })
});

const userQuery = new GraphQLObjectType({
    name: 'userQueries',
    fields: {
        getUser: {
            type: userType,
            args: { id: { type: GraphQLID } },
            resolve(_parent: any, args: any) {
                return user.findById(args.id);
            }
        },
        getAllUsers: {
            type: new GraphQLList(userType),
            resolve(_parent: any, _args: any) {
                return user.find({});
            }
        }
    }
});


export = new GraphQLSchema({ query: userQuery });