import { composeWithTracker } from 'react-komposer';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Rooms } from '/imports/api/rooms/rooms';
import Home from '../components/Home.jsx';

function composer(props, onData) {
  Meteor.subscribe('rooms.list');

  const onRoomClick = (roomId) => {
    return FlowRouter.go(`/rooms/detail/${roomId}`);
  }

  onData(null, {
    rooms: Rooms.find().fetch(),
    onRoomClick,
  });
}

export default composeWithTracker(composer)(Home);
