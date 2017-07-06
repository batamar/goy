import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { Rooms } from '/imports/api/rooms/rooms';
import { addMember, battle, sendMessage } from '/imports/api/rooms/methods';
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

  onData(null, {
    room,
    messages: room.battleMessages || [],

    addMember: () => addMember.call({ _id, userId }),
    battle: () => battle.call({ _id, userId }),
    sendMessage: (message) =>
      sendMessage.call({ message: { content: message, userId }, _id }),

    members: Meteor.users.find({ _id: { $in: memberIds } }).fetch(),
    battleMembers: Meteor.users.find({ _id: { $in: battlingMemberIds } }).fetch(),

    isBattling: battlingMemberIds.includes(userId),
  });
}

export default composeWithTracker(composer)(RoomDetail);
