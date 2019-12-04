import time

from tests.common import GenericSeleniumTestActions


class SemesterTests(GenericSeleniumTestActions):
    def test_view_enrolled_semesters(self):
        self.login()
        driver = self.driver
        grade_tracker_home_link = driver.find_element_by_link_text('Grade Tracker Home')
        self.take_element_screenshot(grade_tracker_home_link, 'main_menu_click_grade_tracker_home')
        grade_tracker_home_link.click()
        self.take_screenshot('grade_tracker_home')
        grade_tracker_button = driver.find_element_by_link_text('Grade Tracker')
        self.take_element_screenshot(grade_tracker_button, 'grade_tracker_click_grade_tracker')
        grade_tracker_button.click()

    def test_add_remove_semesters(self):
        self.navigate_grade_tracker_home()
        driver = self.driver
        add_semester = driver.find_element_by_xpath(self._contents_xpath('Add Semester'))
        self.take_element_screenshot(add_semester, 'click_add_semester')
        add_semester.click()
        time.sleep(1)
        self.take_screenshot('add_semester_form')
        driver.find_element_by_xpath(self._contents_xpath('Select...')).click()
        driver.find_element_by_xpath(self._contents_xpath('Spring, 2019')).click()
        semester_dropdown = driver.find_element_by_xpath(self._contents_xpath('Spring, 2019'))
        self.take_element_screenshot(semester_dropdown, 'add_semester_select')
        save_button = driver.find_element_by_xpath(self._contents_xpath('Save'))
        self.take_element_screenshot(save_button, 'add_semester_click_save')
        save_button.click()
        time.sleep(1)
        self.take_screenshot('newly_added_semester')
        delete_button = driver.find_element_by_xpath(
            '(.//*[normalize-space(text()) and normalize-space(.)=\'Spring, 2019\'])[1]/following::button[1]'
        )
        self.take_element_screenshot(delete_button, 'semester_click_delete_button')
        delete_button.click()
        time.sleep(1)
        self.take_screenshot('semester_confirm_delete')
        delete_confirm_button = driver.find_element_by_xpath(
            '(.//*[normalize-space(text()) and normalize-space(.)=\'Are you sure you want to delete this item?\'])[1]'
            '/following::button[2]'
        )
        self.take_element_screenshot(delete_confirm_button, 'semester_click_confirm_delete')
        delete_confirm_button.click()
        time.sleep(2)
        self.take_screenshot('removed_deleted_semester')
        driver.find_element_by_link_text('Grade Tracker').click()
