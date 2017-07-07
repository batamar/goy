import React from 'react';

class Home extends React.Component {
  renderRoom(room) {
    const onRoomClick = () => {
      this.props.onRoomClick(room._id);
    }

    return (
      <div key={room._id} className="room-item" onClick={onRoomClick}>
        <p>
          {room.name}
        </p>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.props.rooms.map(room => this.renderRoom(room))}

        <div className="clearfix" />

        <a href="/rooms/create">Create room</a>
      </div>
		);
  }
}

export default Home;
