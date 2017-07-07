import { mount } from 'react-mounter';
import { FlowRouter } from 'meteor/kadira:flow-router';

// containers ================
import Home from '/imports/ui/layout/containers/Home';
import RoomForm from '/imports/ui/rooms/containers/RoomForm';
import RoomDetail from '/imports/ui/rooms/containers/RoomDetail';

// home url
FlowRouter.route('/', {
  name: 'home',
  action() {
    mount(Home, {});
  },
});

// rooms ============
FlowRouter.route('/rooms/create', {
  name: 'rooms-create',
  action() {
    mount(RoomForm, {});
  },
});

FlowRouter.route('/rooms/detail/:_id', {
  name: 'rooms-detail',
  action(params) {
    mount(RoomDetail, { _id: params._id });
  },
});
