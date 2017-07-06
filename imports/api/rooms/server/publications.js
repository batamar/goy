import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Rooms } from '../rooms';

Meteor.publish('rooms.list', function roomList() {
  return Rooms.find({});
});

Meteor.publish('rooms.detail', function roomList(_id) {
  check(_id, String);

  return Rooms.find({ _id });
});
