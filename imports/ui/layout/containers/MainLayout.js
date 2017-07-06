import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import MainLayout from '../components/MainLayout.jsx';

function composer(props, onData) {
  const loginWithFacebook = () => {
    const requestPermissions = ['public_profile', 'email'];

    Meteor.loginWithFacebook({ requestPermissions }, (err) => {
      if (err) {
        console.log(err)
      }
    })
  }

  const logout = () => {
    Meteor.logout();
  }

  onData(null, {
    userId: Meteor.userId(),
    user: Meteor.user() || {},
    loggingIn: Meteor.loggingIn(),
    loginWithFacebook,
    logout,
  });
}

export default composeWithTracker(composer)(MainLayout);
