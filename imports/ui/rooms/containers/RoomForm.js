import { composeWithTracker } from 'react-komposer';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { add } from '/imports/api/rooms/methods';
import RoomForm from '../components/RoomForm.jsx';

function composer({ _id }, onData) {
  const save = (doc) => {
    add.call({ doc }, (error) => {
      if (error) {
        return alert(error.message);
      }

      alert('Success');

      return FlowRouter.go('/');
    });
  };

  onData(null, {
    save,
  });
}

export default composeWithTracker(composer)(RoomForm);
