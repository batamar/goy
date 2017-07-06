import { Meteor } from 'meteor/meteor';

Meteor.publish('users.list', function roomList() {
  return Meteor.users.find({});
});
