import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { Rooms } from '/imports/api/rooms/rooms';
import { addMember, battle, sendMessage, rate, end } from '/imports/api/rooms/methods';
import RoomDetail from '../components/RoomDetail.jsx';

function composer({ _id }, onData) {
  const roomHandler = Meteor.subscribe('rooms.detail', _id );
  const usersHandler = Meteor.subscribe('users.list');

  if (!roomHandler.ready() || !usersHandler.ready()) {
    return null;
  }

  const room = Rooms.findOne({ _id }) || {};
  const userId = Meteor.userId();
  const memberIds = room.memberIds || [];
  const battlingMemberIds = room.battlingMemberIds || [];
  const battleRatings = room.battleRatings || [];

  onData(null, {
    room,
    messages: room.battleMessages || [],

    addMember: () => addMember.call({ _id, userId }),
    battle: () => battle.call({ _id, userId }),
    surrender: () => end.call({ _id }),

    sendMessage: (message) =>
      sendMessage.call({ message: { content: message, userId }, _id }),

    rate: (value) =>
      rate.call({ rate: { point: value, userId }, _id }),

    userRate: battleRatings.find(rate => rate.userId === userId),
    members: Meteor.users.find({ _id: { $in: memberIds } }).fetch(),
    battleMembers: Meteor.users.find({ _id: { $in: battlingMemberIds } }).fetch(),

    isBattling: battlingMemberIds.includes(userId),
  });
}

export default composeWithTracker(composer)(RoomDetail);
