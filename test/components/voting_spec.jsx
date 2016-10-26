import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate } from 'react-addons-test-utils';
import { List } from 'immutable';
import Voting from '../../src/components/Voting';
import { expect } from 'chai';

describe('Voting', () => {
    it('renders a pair of buttons', () => {
        const component = renderIntoDocument(
            <Voting pair={["Trainspotting", "28 Days Later"]} />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].textContent).to.equal('Trainspotting');
        expect(buttons[1].textContent).to.equal('28 Days Later');
    });

    it('invokes callback when a button is clicked', () => {
        let votedWith;
        const vote = (entry) => votedWith = entry;

        const component = renderIntoDocument(
            <Voting pair={["Trainspotting", "28 Days Later"]}
                    vote={vote}/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        Simulate.click(buttons[0]);

        expect(votedWith).to.equal('Trainspotting');
    });

    describe('when already voted', () => {
        const votingComponent = renderIntoDocument(
            <Voting pair={["Trainspotting", "28 Days Later"]} hasVoted="Trainspotting" />
        );
        const buttons = scryRenderedDOMComponentsWithTag(votingComponent, 'button');

        it('renders disabled buttons', () => {
            expect(buttons.length).to.equal(2);
            expect(buttons[0].disabled).to.be.true;
            expect(buttons[1].disabled).to.be.true;
        });

        it('displays \'Voted\' label', () => {
            expect(buttons[0].textContent).to.contain('Voted');
        });
    });

    it('renders just the winner when there is one', () => {
        const votingComponent = renderIntoDocument(
            <Voting winner="Trainspotting"/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(votingComponent, 'button');
        const winner = ReactDOM.findDOMNode(votingComponent.refs.winner);

        expect(buttons.length).to.equal(0);
        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain('Trainspotting');
    });

    it('renders as a pure component', () => {
        const pair = ['Trainspotting', '28 Days Later'];
        const container = document.createElement('div');
        let votingComponent = ReactDOM.render(<Voting pair={pair} />, container);

        let firstButton = scryRenderedDOMComponentsWithTag(votingComponent, 'button')[0];
        expect(firstButton.textContent).to.equal('Trainspotting');

        pair[0] = 'Sunshine';
        votingComponent = ReactDOM.render(<Voting pair={pair} />, container);
        firstButton = scryRenderedDOMComponentsWithTag(votingComponent, 'button')[0];
        expect(firstButton.textContent).to.equal('Trainspotting');
    });

    it('does update DOM when prop changes', () => {
        const pair = List.of('Trainspotting', '28 Days Later');
        const container = document.createElement('div');
        let component = ReactDOM.render(
            <Voting pair={pair} />,
            container
        );

        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Trainspotting');

        const newPair = pair.set(0, 'Sunshine');
        component = ReactDOM.render(
            <Voting pair={newPair} />,
            container
        );
        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Sunshine');
    });
});
