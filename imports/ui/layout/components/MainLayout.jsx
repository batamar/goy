import React, { PropTypes } from 'react';

const propTypes = {
  content: PropTypes.element,
  userId: PropTypes.string,
  loggingIn: PropTypes.bool.isRequired,
};

class MainLayout extends React.Component {
  render() {
    const loginWithFacebook = () => {
      Meteor.loginWithFacebook({requestPermissions: ['public_profile', 'email']}, (err) => {
        if (err) {
          console.log(err)
        }
      })
    }

    return (
      <div className="container">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Goy</a>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
            </div>
          </div>
        </nav>

        <div className="jumbotron">
          {this.props.content}
          <button onClick={loginWithFacebook}>Facebook</button>
        </div>
      </div>
    );
  }
}

MainLayout.propTypes = propTypes;

export default MainLayout;
