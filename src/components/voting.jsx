import React from 'react';
import {connect} from 'react-redux';

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

function mapStateToProps(state) {
    return {
        pair: state.getIn(['vote', 'pair']),
        winner: state.get('winner')
    };
}

connect(mapStateToProps)(Voting);
