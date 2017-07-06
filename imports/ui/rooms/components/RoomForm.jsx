import React from 'react';

class RoomForm extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.save({
      name: document.getElementById('name').value,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input id="name" />
          <button type="submit">create</button>
        </form>
      </div>
		);
  }
}

export default RoomForm;
