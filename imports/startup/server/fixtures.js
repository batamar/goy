import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (Meteor.users.find().count() !== 0) {
    return;
  }

  const { user } = Meteor.settings.initialData;

  Accounts.createUser(user);
});
