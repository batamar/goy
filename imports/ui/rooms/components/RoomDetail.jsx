import React from 'react';

class RoomDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = { message: '' };

    this.onMessage = this.onMessage.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    this.props.addMember();
  }

  onMessage(e) {
    if (e.key ==='Enter') {
      this.props.sendMessage(e.target.value);
      this.setState({ message: '' });
    }
  }

  onInputChange(e) {
    this.setState({ message: e.target.value });
  }

  // members ============
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

  // battle members =============
  renderBattleMember(member) {
    return (
      <div key={member._id}>
        <img src={member.profile.picture} />
      </div>
    )
  }

  renderBattleMembers() {
    return (
      <div>
        {this.props.battleMembers.map(member => this.renderBattleMember(member))}
      </div>
    )
  }

  // messages ================
  renderMessage(message, index) {
    return (
      <div key={index}>{message.content}</div>
    )
  }

  renderMessages() {
    return (
      <div>
        {this.props.messages.map((m, i) => this.renderMessage(m, i))}
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

  renderMessageInput() {
    if (this.props.isBattling) {
      return (
        <input
          onChange={this.onInputChange}
          onKeyPress={this.onMessage}
          value={this.state.message}
        />
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderMembers()}
        {this.renderBattleButton()}
        {this.renderBattleMembers()}
        {this.renderMessages()}
        {this.renderMessageInput()}
      </div>
		);
  }
}

export default RoomDetail;
