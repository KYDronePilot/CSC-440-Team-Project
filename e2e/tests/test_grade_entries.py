import time

from selenium.webdriver.common.keys import Keys

from tests.common import GenericSeleniumTestActions


class GradeEntryTests(GenericSeleniumTestActions):
    def test_add_edit_delete_grade_entries(self):
        self.navigate_course_details()
        driver = self.driver
        test_grade_entry_name = 'Test Grade Entry'
        self.scroll(0, 600)

        # Click 'Add Grade Entry'
        self.screenshot_xpath_element(
            '(.//*[normalize-space(text()) and normalize-space(.)=\'Edit\'])[5]/following::button[1]',
            'click_add_grade_entry'
        )
        time.sleep(1)
        self.take_screenshot('add_grade_entry_form')

        # Enter grade entry information
        name = driver.find_element_by_name('name')
        name.clear()
        name.send_keys(test_grade_entry_name)
        points = driver.find_element_by_name('points')
        points.clear()
        points.send_keys('95')
        max_points = driver.find_element_by_name('max_points')
        max_points.clear()
        max_points.send_keys('100')
        self.take_screenshot('grade_entry_form_filled_out')

        # Click save button
        self.screenshot_xpath_element(self._contents_xpath('Save'), 'add_grade_entry_click_save')
        time.sleep(1)
        self.take_screenshot('newly_added_grade_entry')

        # Edit grade entry
        self.screenshot_xpath_element(
            f'(.//*[normalize-space(text()) and normalize-space(.)=\'{test_grade_entry_name}\'])[1]'
            f'/following::button[1]',
            'click_edit_grade_entry'
        )
        time.sleep(1)
        self.take_screenshot('edit_grade_entry_form')

        # Change grade entry edit form values
        name = driver.find_element_by_name('name')
        for i in range(len(test_grade_entry_name)):
            name.send_keys(Keys.BACK_SPACE)
        test_grade_entry_name = 'Test Grade Entry (edited)'
        name.send_keys(test_grade_entry_name)
        self.take_screenshot('edit_grade_entry_form_updated')

        # Click save button
        self.screenshot_xpath_element(self._contents_xpath('Save'), 'edit_grade_entry_click_save')
        time.sleep(1)
        self.take_screenshot('newly_edited_grade_entry')

        # Start editing to delete grade entry
        self.screenshot_xpath_element(
            f'(.//*[normalize-space(text()) and normalize-space(.)=\'{test_grade_entry_name}\'])[1]'
            f'/following::button[1]',
            'click_edit_grade_entry_to_delete'
        )
        time.sleep(1)
        self.take_screenshot('edit_grade_entry_to_delete_form')

        # Click delete button
        self.screenshot_xpath_element(
            '(.//*[normalize-space(text()) and normalize-space(.)=\'Max Points\'])[1]/following::button[1]',
            'edit_grade_entry_to_delete_click_delete'
        )
        self.take_screenshot('delete_grade_entry_confirmation_popup')
        self.screenshot_xpath_element(
            '(.//*[normalize-space(text()) and normalize-space(.)=\'Delete\'])[1]/following::button[1]',
            'delete_grade_entry_click_confirmation'
        )
        time.sleep(1)
        self.take_screenshot('grade_entry_deleted')
