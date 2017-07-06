import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// Room collection
class RoomsCollection extends Mongo.Collection {}

export const Rooms = new RoomsCollection('rooms');

Rooms.schema = new SimpleSchema({
  name: {
    type: String,
  },

  battlingMemberIds: {
    type: [String],
    optional: true,
  },

  memberIds: {
    type: [String],
    optional: true,
  },
});

Rooms.attachSchema(Rooms.schema);
