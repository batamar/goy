import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { Rooms } from '/imports/api/rooms/rooms';
import { addMember, battle } from '/imports/api/rooms/methods';
import RoomDetail from '../components/RoomDetail.jsx';

function composer({ _id }, onData) {
  const roomHandler = Meteor.subscribe('rooms.detail', _id );
  const usersHandler = Meteor.subscribe('users.list');

  if (!roomHandler.ready() || !usersHandler.ready()) {
    return null;
  }

  const room = Rooms.findOne({ _id }) || {};

  onData(null, {
    room,
    addMember: () => addMember.call({ _id, userId: Meteor.userId() }),
    battle: () => battle.call({ _id, userId: Meteor.userId() }),
    members: Meteor.users.find({ _id: { $in: room.memberIds || []} }).fetch(),
  });
}

export default composeWithTracker(composer)(RoomDetail);
