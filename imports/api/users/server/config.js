import { Accounts } from 'meteor/accounts-base'

Accounts.onCreateUser(function(options, user) {
  if (options.profile) {
    const id = `${user.services.facebook.id}/picture/?type=large`;
    options.profile.picture = `http://graph.facebook.com/${id}`;
    user.profile = options.profile;
  }
  return user;
});
