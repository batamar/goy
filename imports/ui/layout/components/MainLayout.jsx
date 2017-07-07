import React from 'react';

class MainLayout extends React.Component {
  renderAuthInfo() {
    const { user } = this.props;

    if (user._id) {
      return (
        <div className="auth-info">
          <img className="picture" src={user.profile.picture} onClick={this.props.logout} />
          <span>{user.profile.name}</span>
        </div>
      )
    }

    return (
      <div className="auth-info">
        <a className="facebook-login" onClick={this.props.loginWithFacebook}>
          Facebook login
        </a>
      </div>
    )
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <a className="logo" href="/"></a>
            <p className="title">
              {this.props.title}
            </p>
            {this.renderAuthInfo()}
          </div>
        </nav>

        <div className="content">
          {this.props.content}
        </div>
      </div>
    );
  }
}

export default MainLayout;
