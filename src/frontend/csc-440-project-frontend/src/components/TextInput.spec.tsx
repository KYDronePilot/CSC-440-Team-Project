import React from 'react';
import { mount } from 'enzyme';
import TextInput from './TextInput';
import {MDBInput} from 'mdbreact';

describe('TextInput tests', () => {
    it('renders MDBInput tag', () => {
        const wrapper = mount(
            <TextInput
                invalidFeedback={'test invalid feedback'}
                validFeedback={'test valid feedback'}
                valid={true}
                displayFeedback={false}
                name={'test name'}
                label={'test label'}
                onChange={() => null}
                value={'test value'}
                hint={'test hint'}
            />);
        expect(wrapper.find(MDBInput).length).toEqual(1);
    });

    it('renders valid feedback', () => {
        const FEEDBACK = 'unique valid feedback';
        const wrapper = mount(
            <TextInput
                invalidFeedback={'test invalid feedback'}
                validFeedback={FEEDBACK}
                valid={true}
                displayFeedback={false}
                name={'test name'}
                label={'test label'}
                onChange={() => null}
                value={'test value'}
                hint={'test hint'}
            />);
        const feedbackDiv = wrapper.find(MDBInput).find('.valid-feedback');
        expect(feedbackDiv.length).toEqual(1);
        expect(feedbackDiv.text()).toEqual(FEEDBACK);
    });

    it('renders invalid feedback', () => {
        const FEEDBACK = 'unique invalid feedback';
        const wrapper = mount(
            <TextInput
                invalidFeedback={FEEDBACK}
                validFeedback={'test valid feedback'}
                valid={true}
                displayFeedback={false}
                name={'test name'}
                label={'test label'}
                onChange={() => null}
                value={'test value'}
                hint={'test hint'}
            />);
        const feedbackDiv = wrapper.find(MDBInput).find('.invalid-feedback');
        expect(feedbackDiv.length).toEqual(1);
        expect(feedbackDiv.text()).toEqual(FEEDBACK);
    });
});
