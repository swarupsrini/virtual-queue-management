import React from 'react';

class Search extends React.Component {
  render() {
    const { title, subtitle1, subtitle2 } = this.props;

    return (
      <div>
        <div>{title}</div>
        <div>{subtitle1}</div>
        <div>{subtitle2}</div>
      </div>
      
    );
  }
}
export default Search;