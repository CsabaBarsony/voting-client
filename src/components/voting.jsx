import React from 'react';
import Vote from './vote';
import Winner from './winner';

export default React.createClass({
    getPair: function() {
        return this.props.pair || [];
    },
    isDisabled: function() {
        return !!this.props.hasVoted;
    },
    hasVotedFor: function(entry) {
        return this.props.hasVoted === entry;
    },
    render: function() {
        return (
            <div className="voting">
                {this.props.winner ? <Winner ref="winner" winner={this.props.winner} /> : <Vote {...this.props} />}
            </div>
        );
    }
});