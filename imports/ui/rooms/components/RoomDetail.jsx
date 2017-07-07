import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';

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
    if (e.key === 'Enter') {
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
      <div key={member._id} className="member">
        <img role="presentation" src={member.profile.picture} />
        <span>{member.profile.name}</span>
      </div>
    );
  }

  renderMembers() {
    return (
      <div className="members">
        <h4>Members</h4>
        {this.props.members.map(member => this.renderMember(member))}
      </div>
    );
  }

  // rate ============
  renderRateButton(value, toUserId) {
    const userRate = this.props.userRates.find(r => r.toUserId === toUserId) || {};

    let className = 'btn btn-default rate';

    if (userRate.point === value) {
      className = `${className} active`;
    }

    return (
      <button
        className={className}
        onClick={() => this.props.rate(value, toUserId)}
      >
        {value}
      </button>
    );
  }

  renderRateButtons(toUserId) {
    if (!this.props.isBattling) {
      return (
        <div className="ratings">
          {this.renderRateButton(1, toUserId)}
          {this.renderRateButton(2, toUserId)}
          {this.renderRateButton(3, toUserId)}
          {this.renderRateButton(4, toUserId)}
        </div>
      );
    }

    return null;
  }

  // battle members =============
  renderBattleMember(member) {
    return (
      <div key={member._id} className="battling-member">
        <img role="presentation" src={member.profile.picture} />
        <span>{member.profile.name}</span>

        {this.renderRateButtons(member._id)}
      </div>
    );
  }

  renderBattleMembers() {
    return (
      <div className="battling-members">
        <h4>Battling</h4>
        {this.props.battleMembers.map(member => this.renderBattleMember(member))}
      </div>
    );
  }

  // messages ================
  renderMessage(message, index, firstUserId) {
    const user = Meteor.users.findOne({ _id: message.userId });

    if (user._id === firstUserId) {
      return (
        <div key={index} className="message right">
          <span className="text">{message.content}</span>
          <img role="presentation" src={user.profile.picture} />
        </div>
      );
    }

    return (
      <div key={index} className="message left">
        <img role="presentation" src={user.profile.picture} />
        <span className="text">{message.content}</span>
      </div>
    );
  }

  renderMessages() {
    const messages = this.props.messages;
    const firstUserId = messages.length > 0 ? messages[0].userId : null;

    return (
      <div>
        {messages.map((m, i) => this.renderMessage(m, i, firstUserId))}
      </div>
    );
  }

  renderBattleButton() {
    const battlingMemberIds = this.props.room.battlingMemberIds || [];

    if (battlingMemberIds.length < 2) {
      return (
        <button
          className="btn btn-success"
          onClick={this.props.battle}
        >
          Join the battle
        </button>
      );
    }

    return null;
  }

  renderMessageInput() {
    if (this.props.isBattling) {
      return (
        <input
          className="message-input"
          placeholder="Type a message ..."
          onChange={this.onInputChange}
          onKeyPress={this.onMessage}
          value={this.state.message}
        />
      );
    }

    return null;
  }

  renderSurrenderButton() {
    if (this.props.isBattling) {
      return (
        <button
          className="btn btn-success btn-xs btn-danger surrender"
          onClick={this.props.surrender}
        >
          Surrender
        </button>
      );
    }

    return null;
  }

  render() {
    return (
      <div>
        <div className="leftSide">
          {this.renderBattleButton()}
          {this.renderBattleMembers()}
          {this.renderSurrenderButton()}
          {this.renderMembers()}
        </div>

        <div className="rightSide">
          {this.renderMessages()}
          {this.renderMessageInput()}
        </div>

        <div className="clearfix"></div>
      </div>
    );
  }
}

RoomDetail.propTypes = {
  addMember: PropTypes.func,
  sendMessage: PropTypes.func,
  battle: PropTypes.func,
  surrender: PropTypes.func,
  rate: PropTypes.func,
  userRates: PropTypes.array,
  room: PropTypes.object,
  members: PropTypes.array,
  battleMembers: PropTypes.array,
  messages: PropTypes.array,
  isBattling: PropTypes.bool,
};

export default RoomDetail;
