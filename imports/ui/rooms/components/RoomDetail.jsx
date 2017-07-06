import React from 'react';

class RoomDetail extends React.Component {
  componentDidMount() {
    this.props.addMember();
  }

  renderMember(member) {
    return (
      <div key={member._id}>
        <img src={member.profile.picture} />
      </div>
    )
  }

  renderMembers() {
    return (
      <div>
        {this.props.members.map(member => this.renderMember(member))}
      </div>
    )
  }

  renderBattleButton() {
    const battlingMemberIds = this.props.room.battlingMemberIds || [];

    if (battlingMemberIds.length < 2) {
      return (
        <button onClick={this.props.battle}>battle</button>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderMembers()}
        {this.renderBattleButton()}
      </div>
		);
  }
}

export default RoomDetail;
