import React from 'react';
import { mount } from 'react-mounter';
import { FlowRouter } from 'meteor/kadira:flow-router';

// containers ================
import MainLayout from '/imports/ui/layout/containers/MainLayout';
import Home from '/imports/ui/layout/containers/Home';
import RoomForm from '/imports/ui/rooms/containers/RoomForm';
import RoomDetail from '/imports/ui/rooms/containers/RoomDetail';

// home url
FlowRouter.route('/', {
  name: 'home',
  action() {
    mount(MainLayout, {
      content: <Home />,
    });
  },
});

// rooms ============
FlowRouter.route('/rooms/create', {
  name: 'rooms-create',
  action() {
    mount(MainLayout, {
      content: <RoomForm />,
    });
  },
});

FlowRouter.route('/rooms/detail/:_id', {
  name: 'rooms-detail',
  action(params) {
    mount(MainLayout, {
      content: <RoomDetail _id={params._id} />,
    });
  },
});
