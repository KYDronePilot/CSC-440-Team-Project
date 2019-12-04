import time

from tests.common import GenericSeleniumTestActions


class CourseTests(GenericSeleniumTestActions):
    def test_view_courses(self):
        self.navigate_grade_tracker_home()
        driver = self.driver
        semester = driver.find_element_by_link_text('Fall, 2019')
        self.take_element_screenshot(semester, 'grade_tracker_view_click_semester')
        semester.click()
        time.sleep(1)
        self.take_screenshot('courses_page')
        grade_tracker_button = driver.find_element_by_link_text('Grade Tracker')
        self.take_element_screenshot(grade_tracker_button, 'courses_click_grade_tracker')

    def test_add_remove_courses(self):
        self.navigate_courses()
        driver = self.driver
        self.screenshot_xpath_element(self._contents_xpath('Add Course Instance'), 'click_add_course')
        time.sleep(1)
        self.take_screenshot('add_course_form')
        self.click_and_screenshot_select_option(
            'Select...',
            'SCO 100I - Student Success Seminar for Computer Science, section 1',
            'select_course_to_add'
        )
        time.sleep(1)
        self.screenshot_xpath_element(self._contents_xpath('Save'), 'add_course_form_click_save')
        time.sleep(1)
        self.take_screenshot('newly_added_course')
        self.screenshot_xpath_element(
            '(.//*[normalize-space(text()) and normalize-space(.)=\'Student Success Seminar for Computer Science\'])[1]'
            '/following::button[1]',
            'courses_click_delete'
        )
        time.sleep(1)
        self.take_screenshot('course_delete_confirmation')
        self.screenshot_xpath_element(
            '(.//*[normalize-space(text()) and normalize-space(.)=\'This will delete all grade entries for this '
            'course. This action is irreversible.\'])[1]/following::button[1]',
            'courses_click_confirm_delete'
        )
        time.sleep(1)
        self.take_screenshot('course_deleted')

    def test_course_details(self):
        self.navigate_courses()
        self.screenshot_xpath_element(
            self._contents_xpath('Applied Software Engineering'),
            'courses_click_course'
        )
        time.sleep(3)
        self.take_screenshot('course_details_page')
        grade_tracker_button = self.driver.find_element_by_link_text('Grade Tracker')
        self.take_element_screenshot(grade_tracker_button, 'course_details_click_grade_tracker')
