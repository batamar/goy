import { Accounts } from 'meteor/accounts-base';
import { ServiceConfiguration } from 'meteor/service-configuration';

import './fixtures';

// register api =======================
import '/imports/api/rooms/methods';
import '/imports/api/rooms/server/publications';

import '/imports/api/users/server/publications';
import '/imports/api/users/server/config';

Meteor.startup(function () {
  ServiceConfiguration.configurations.remove({
    service: 'facebook'
  });

  ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '333653390398118',
    secret: '3e12e716615ce33eba41e9605dd426ea'
  });
})
