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
      color: document.getElementById('color').value,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <p>
            <label>Name</label>
            <input id="name" />
          </p>

          <p>
            <label>Color</label>
            <input id="color" />
          </p>

          <button type="submit">create</button>
        </form>
      </div>
    );
  }
}

export default RoomForm;
