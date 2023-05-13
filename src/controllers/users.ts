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
            resolve(parent, args) {
                return user.findById(args.id);
            }
        },
        getAllUsers: {
            type: new GraphQLList(userType),
            resolve(parent, args) {
                return user.find({});
            }
        }
    }
});


export = new GraphQLSchema({ query: userQuery });