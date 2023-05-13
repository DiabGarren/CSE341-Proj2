"use strict";

import {
    GraphQLObjectType, GraphQLString,
    GraphQLID, GraphQLInt, GraphQLSchema,
    GraphQLList, GraphQLNonNull
} from 'graphql';
import vehicle = require('../models/vehicle');


const images = new GraphQLObjectType({
    name: 'images',

    fields: () => ({
        large: { type: GraphQLString },
        small: { type: GraphQLString }
    })
})

const vehicleType = new GraphQLObjectType({
    name: 'vehicle',

    fields: () => ({
        id: { type: GraphQLID },
        make: { type: GraphQLString },
        model: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLInt },
        images: { type: images}
    })
});


const vehicleQuery = new GraphQLObjectType({
    name: 'vehicleQueries',
    fields: {
        getVehicle: {
            type: vehicleType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return vehicle.findById(args.id);
            }
        },
        getAllVehicles: {
            type: new GraphQLList(vehicleType),
            resolve(parent, args) {
                return vehicle.find({});
            }
        }
    }
});

export = new GraphQLSchema({ query: vehicleQuery });