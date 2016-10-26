import React from 'react';
import Vote from './vote';
import Winner from './winner';

export default class Voting extends React.PureComponent {
    getPair() {
        return this.props.pair || [];
    }

    isDisabled() {
        return !!this.props.hasVoted;
    }

    hasVotedFor() {
        return this.props.hasVoted === entry;
    }

    render() {
        return (
            <div className="voting">
                {this.props.winner ?
                    <Winner ref="winner" winner={this.props.winner} /> :
                    <Vote {...this.props} />}
            </div>
        );
    }
}
