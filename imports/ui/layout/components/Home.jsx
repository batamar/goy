import React, { PropTypes } from 'react';
import MainLayout from '../containers/MainLayout';

class Home extends React.Component {
  renderRoom(room) {
    const onRoomClick = () => {
      this.props.onRoomClick(room._id);
    };

    return (
      <div key={room._id} className="room-item" onClick={onRoomClick}>
        <p>
          {room.name}
        </p>
      </div>
    );
  }

  renderContent() {
    return (
      <div>
        {this.props.rooms.map(room => this.renderRoom(room))}

        <div className="clearfix" />

        <a href="/rooms/create">Create room</a>
      </div>
    );
  }

  render() {
    return (
      <MainLayout content={this.renderContent()} title="Rooms" />
    );
  }
}

Home.propTypes = {
  onRoomClick: PropTypes.func,
  rooms: PropTypes.array,
};

export default Home;
