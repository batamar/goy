import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Rooms } from './rooms';

// room add
export const add = new ValidatedMethod({
  name: 'rooms.add',

  validate({ doc }) {
    check(doc, Rooms.schema);
  },

  run({ doc }) {
    return Rooms.insert(doc);
  },
});


// room remove
export const remove = new ValidatedMethod({
  name: 'rooms.remove',

  validate(id) {
    check(id, String);
  },

  run(id) {
    return Rooms.remove(id);
  },
});

// add member
export const addMember = new ValidatedMethod({
  name: 'rooms.addMember',

  validate({ _id, userId }) {
    check(_id, String);
    check(userId, String);
  },

  run({ _id, userId }) {
    return Rooms.update({ _id }, { $addToSet: { memberIds: userId } });
  },
});

// battle
export const battle = new ValidatedMethod({
  name: 'rooms.battle',

  validate({ _id, userId }) {
    check(_id, String);
    check(userId, String);
  },

  run({ _id, userId }) {
    const room = Rooms.findOne({ _id });
    const battlingMemberIds = room.battlingMemberIds || [];

    if (battlingMemberIds.length < 2) {
      return Rooms.update({ _id }, { $addToSet: { battlingMemberIds: userId } });
    }
  },
});

// sendMessage
export const sendMessage = new ValidatedMethod({
  name: 'rooms.sendMessage',

  validate({ _id, message }) {
    check(_id, String);
    check(message, Rooms.messageSchema);
  },

  run({ _id, message }) {
    const room = Rooms.findOne({ _id });

    return Rooms.update({ _id }, { $push: { battleMessages: message } });
  },
});
