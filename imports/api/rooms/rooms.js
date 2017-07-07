import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// Room collection
class RoomsCollection extends Mongo.Collection {}

export const Rooms = new RoomsCollection('rooms');


Rooms.messageSchema = new SimpleSchema({
  content: {
    type: String,
  },

  userId: {
    type: String,
  },
});

Rooms.rateSchema = new SimpleSchema({
  point: {
    type: Number,
  },

  userId: {
    type: String,
  },

  toUserId: {
    type: String,
  },
});

Rooms.schema = new SimpleSchema({
  name: {
    type: String,
  },

  state: {
    type: String,
    optional: true,
  },

  battlingMemberIds: {
    type: [String],
    optional: true,
  },

  battleMessages: {
    type: [Rooms.messageSchema],
    optional: true,
  },

  battleRatings: {
    type: [Rooms.rateSchema],
    optional: true,
  },

  memberIds: {
    type: [String],
    optional: true,
  },
});

Rooms.attachSchema(Rooms.schema);
