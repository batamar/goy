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
    return Rooms.insert({ ...doc, state: 'started' });
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
      return Rooms.update(
        { _id },
        {
          $set: { state: 'started' },
          $addToSet: { battlingMemberIds: userId },
        }
      );
    }

    return null;
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
    return Rooms.update({ _id }, { $push: { battleMessages: message } });
  },
});

// givePoint
export const rate = new ValidatedMethod({
  name: 'rooms.rate',

  validate({ _id, rating }) {
    check(_id, String);
    check(rating, Rooms.rateSchema);
  },

  run({ _id, rating }) {
    const room = Rooms.findOne({ _id });
    const battleRatings = room.battleRatings || [];

    const userPoint = battleRatings.find(p =>
      p.userId === rating.userId && p.toUserId === rating.toUserId
    );

    if (!userPoint) {
      battleRatings.push(rating);
    } else {
      userPoint.userId = rating.userId;
      userPoint.toUserId = rating.toUserId;
      userPoint.point = rating.point;
    }

    return Rooms.update({ _id }, { $set: { battleRatings } });
  },
});

// end
export const end = new ValidatedMethod({
  name: 'rooms.end',

  validate({ _id }) {
    check(_id, String);
  },

  run({ _id }) {
    const room = Rooms.findOne({ _id });

    const wonMemberId = room.battlingMemberIds.find(id => id !== this.userId);

    return Rooms.update(
      { _id },
      {
        $set: {
          state: 'ended',
          wonMemberId,
          battleRatings: [],
          battlingMemberIds: [],
          battleMessages: [],
        },
      }
    );
  },
});
