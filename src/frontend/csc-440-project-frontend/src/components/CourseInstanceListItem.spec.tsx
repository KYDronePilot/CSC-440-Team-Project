import faker from 'faker';
import {GRADE_A, LetterGrade, NO_SCORE} from '../api/gradeEntry';
import {mount} from 'enzyme';
import React from 'react';
import {Link, MemoryRouter} from 'react-router-dom';
import {COURSE_URL} from '../routes/urls';
import CourseInstanceListItem from './CourseInstanceListItem';
import ReactTimeago from 'react-timeago';

describe('The CourseInstanceListItem component', () => {
    let name: string, code: string, courseInstanceId: number, lastUpdated: string, defaultProps: any;
    let letterGrade: LetterGrade, score: number, points: number, maxPoints: number;
    beforeEach(() => {
        name = 'Some course name';
        code = 'TST 101';
        courseInstanceId = faker.random.number({min: 1, max: 100});
        lastUpdated = faker.date.past().toISOString();
        letterGrade = GRADE_A;
        score = 1.00;
        points = 12;
        maxPoints = 12;
        defaultProps = {
            name,
            code,
            courseInstanceId,
            lastUpdated,
            removeCourseInstance: () => undefined,
            letterGrade,
            score,
            points,
            maxPoints
        };
    });

    it('has link to course view', () => {
        const url = `${COURSE_URL}${courseInstanceId}`;
        const wrapper = mount(
            <MemoryRouter>
                <CourseInstanceListItem {...defaultProps}/>
            </MemoryRouter>
        );
        const linkElement = wrapper.find(Link);
        // Assert link target and content
        expect(linkElement.prop('to')).toBe(url);
        expect(linkElement.text()).toBe(name);
    });

    it('renders time correctly', () => {
        const wrapper = mount(
            <MemoryRouter>
                <CourseInstanceListItem {...defaultProps}/>
            </MemoryRouter>
        );
        // Assert date props of timeago
        expect(wrapper.find(ReactTimeago).prop('date')).toBe(lastUpdated);
    });

    it('does not render grade details when none are available', () => {
        const wrapper = mount(
            <MemoryRouter>
                <CourseInstanceListItem {...defaultProps} points={0} maxPoints={0} score={NO_SCORE}/>
            </MemoryRouter>
        );
        // Assert no grade details
        expect(wrapper.find('#grade-details').length).toBe(0);
    });

    it('renders grade details when they are available', () => {
        const wrapper = mount(
            <MemoryRouter>
                <CourseInstanceListItem {...defaultProps}/>
            </MemoryRouter>
        );
        // Assert there are grade details
        expect(wrapper.find('#grade-details').length).toBe(1);
    });

    it('renders delete button when delete function provided', () => {
        const wrapper = mount(
            <MemoryRouter>
                <CourseInstanceListItem {...defaultProps} removeCourseInstance={() => undefined}/>
            </MemoryRouter>
        );
        // Assert button exists
        expect(wrapper.find('button#delete-course-button').length).toBe(1);
    });

    it('does not render delete button when delete function not provided', () => {
        const wrapper = mount(
            <MemoryRouter>
                <CourseInstanceListItem {...defaultProps} removeCourseInstance={undefined}/>
            </MemoryRouter>
        );
        // Assert button does not exist
        expect(wrapper.find('button#delete-course-button').length).toBe(0);
    });

    it('deletes course correctly', () => {
        // Mock delete function
        const deleteMock = jest.fn((courseInstanceId: number) => undefined);
        const wrapper = mount(
            <MemoryRouter>
                <CourseInstanceListItem {...defaultProps} removeCourseInstance={deleteMock}/>
            </MemoryRouter>
        );
        // Go through delete process
        wrapper.find('button#delete-course-button').simulate('click');
        // Make sure delete warning should be visible
        expect(wrapper.find(CourseInstanceListItem).state('deleteWarningVisible')).toBe(true);
        wrapper.find('button#delete-confirmation-button').simulate('click');
        // Assert calls
        expect(deleteMock.mock.calls.length).toBe(1);
        expect(deleteMock.mock.calls[0].length).toBe(1);
        expect(deleteMock.mock.calls[0][0]).toBe(courseInstanceId);
    });
});
