import {mount} from 'enzyme';
import React from 'react';
import GradeEntryListItem from './GradeEntryListItem';
import faker from 'faker';
import {GRADE_A} from '../api/gradeEntry';
import {GradeEntryStats} from '../api/courseInstance';
import Timeago from 'react-timeago';


describe('GradeEntryListItem', () => {
    let name: string, id: number, date: string, stats: GradeEntryStats, defaultProps: any;
    beforeEach(() => {
        name = faker.random.uuid();
        id = faker.random.number(100);
        date = faker.date.future().toISOString();
        stats = {
            letterGrade: GRADE_A,
            points: 12,
            maxPoints: 12,
            score: 1.00,
            minScoreRange: 0.90,
            maxScoreRange: 1.00
        };
        defaultProps = {
            name,
            id,
            lastUpdated: date,
            stats,
            editGradeEntry: () => undefined
        };
    });

    it('renders name', () => {
        const wrapper = mount(
            <GradeEntryListItem {...defaultProps}/>
        );
        expect(wrapper.find('h5').text()).toBe(name);
    });

    it('passes correct date', () => {
        const wrapper = mount(
            <GradeEntryListItem {...defaultProps}/>
        );
        expect(wrapper.find(Timeago).prop('date')).toBe(date);
    });

    it('formats score correctly', () => {
        const wrapper = mount(
            <GradeEntryListItem {...defaultProps}/>
        );
        expect(wrapper.find('h6').text()).toBe(`12 / 12 = 100.0%`)
    });

    it('handles changes correctly', () => {
        // Mock edit handler
        const editGradeEntryMock = jest.fn((id: number) => undefined);
        const wrapper = mount(
            <GradeEntryListItem {...defaultProps} editGradeEntry={editGradeEntryMock}/>
        );
        // Simulate click
        wrapper.find('button').simulate('click');
        // Assert calls
        expect(editGradeEntryMock.mock.calls.length).toBe(1);
        expect(editGradeEntryMock.mock.calls[0].length).toBe(1);
    });
});
