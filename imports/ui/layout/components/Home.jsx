import React from 'react';

class Home extends React.Component {
  renderRoom(room) {
    const onRoomClick = () => {
      this.props.onRoomClick(room._id);
    }

    return (
    <div className="col-md-3 col-sm-6">
        <div className="featured-box featured-box-secondary featured-box-effect-1 mt-xlg">
          <div key={room._id} onClick={onRoomClick} className="box-content">
            <i className="icon-featured fa fa-user"></i>
            <h4 className="text-uppercase">{room.name}</h4>
            <p><a href={onRoomClick} className="lnk-primary learn-more">Learn More <i class="fa fa-angle-right"></i></a></p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div class="footer">
        {this.props.rooms.map(room => this.renderRoom(room))}

        <div className="clearfix" />

        <a href="/rooms/create">Create room</a>
      </div>
		);
  }
}

export default Home;
