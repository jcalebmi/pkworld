import React from 'react';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.feeds = ['Map', 'Profile']
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.changeFeed(e.target.value)
  }

  render () {
    return (
      <div id="navigation">
        <h1 onClick={() => {this.props.changeFeed('Map')}}>PK World</h1>
        <div className="buttons">
          {this.feeds.map((feed, index) => <button key={feed} onClick={this.handleClick} value={feed}>{feed}</button>)}
        </div>
      </div>
    )
  }
}

export default Navigation;