import React from 'react';
import {mount} from 'enzyme';
import TextInput from './TextInput';
import {MDBInput} from 'mdbreact';

describe('TextInput component', () => {
    let baseProps = {
        autoComplete: 'username',
        className: 'custom-mdb-input-class',
        displayFeedback: false,
        hint: 'test hint',
        invalidFeedback: () => undefined,
        invalidFeedbackOverride: undefined,
        label: 'test label',
        name: 'test name',
        onChange: () => null,
        password: false,
        valid: undefined,
        validFeedback: undefined,
        value: 'test value',
        wrapperClassName: 'custom-wrapper-class'
    };
    const vfc = 'valid-feedback-content';
    const ifoc = 'invalid-feedback-override-content';
    const ifc = 'invalid-feedback-content';
    const udef = undefined;

    it('renders MDBInput tag', () => {
        const wrapper = mount(<TextInput {...baseProps}/>);
        expect(wrapper.find(MDBInput).length).toEqual(1);
    });

    describe.each`
        dispFeed | invFeed      | invFeedOver | val     | valFeed | isInvFeedDisp | isValFeedDisp | invFeedExp | validFeedExp
        ${true}  | ${() => ifc} | ${ifoc}     | ${udef} | ${udef} | ${true}       | ${false}      | ${ifoc}    | ${udef}
        ${true}  | ${() => ifc} | ${udef}     | ${true} | ${vfc}  | ${false}      | ${true}       | ${udef}    | ${vfc}
        ${true}  | ${() => ifc} | ${udef}     | ${true} | ${udef} | ${false}      | ${false}      | ${udef}    | ${udef}
        ${true}  | ${udef}      | ${udef}     | ${udef} | ${vfc}  | ${false}      | ${true}       | ${udef}    | ${vfc}
        ${true}  | ${udef}      | ${udef}     | ${false}| ${vfc}  | ${false}      | ${false}      | ${udef}    | ${udef}
    `(
        '<TextInput displayFeedback={$dispFeed} invalidFeedback={$invFeed} ' +
        'invalidFeedbackOverride={$invFeedOver} valid={$val} validFeedback={$valFeed}>', ({
                                                                                              dispFeed, invFeed, invFeedOver, val, valFeed, isInvFeedDisp, isValFeedDisp, invFeedExp,
                                                                                              validFeedExp
                                                                                          }) => {
            const wrapper = mount(
                <TextInput
                    {...baseProps}
                    displayFeedback={dispFeed}
                    invalidFeedback={invFeed}
                    invalidFeedbackOverride={invFeedOver}
                    valid={val}
                    validFeedback={valFeed}
                />
            );

            it(isInvFeedDisp ? 'displays invalid feedback' : 'does not display invalid feedback', () => {
                const feedbackDiv = wrapper.find(MDBInput).find('.invalid-feedback');
                if (isInvFeedDisp)
                    expect(feedbackDiv.text()).toEqual(invFeedExp);
                else
                    expect(feedbackDiv).toEqual({});
            });

            it(isValFeedDisp ? 'displays valid feedback' : 'does not display valid feedback', () => {
                const feedbackDiv = wrapper.find(MDBInput).find('.valid-feedback');
                if (isValFeedDisp)
                    expect(feedbackDiv.text()).toEqual(validFeedExp);
                else
                    expect(feedbackDiv).toEqual({});
            });
        }
    );

    it('calls onChange properly', () => {
        // Mock onChange function passed to component
        const mockOnChange = jest.fn((name: string, value: string) => undefined);
        const wrapper = mount(
            <TextInput
                {...baseProps}
                onChange={mockOnChange}
                name={'test-name'}
                value={'test-value'}
            />
        );
        // Simulate input change event
        wrapper.find('input').simulate('change');
        // Assert onChange calls
        expect(mockOnChange.mock.calls.length).toBe(1);
        expect(mockOnChange.mock.calls[0][0]).toBe('test-name');
        expect(mockOnChange.mock.calls[0][1]).toBe('test-value');
    });

    it('renders valid feedback', () => {
        const FEEDBACK = 'unique valid feedback';
        const wrapper = mount(
            <TextInput
                invalidFeedback={() => undefined}
                validFeedback={FEEDBACK}
                displayFeedback={true}
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
                invalidFeedback={() => FEEDBACK}
                displayFeedback={true}
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
