import time

from tests.common import GenericSeleniumTestActions


class ConcentrationProgressTests(GenericSeleniumTestActions):
    def test_view_concentration_progress(self):
        self.login()
        driver = self.driver
        concentration_progress_button = driver.find_element_by_link_text('Concentration Progress Tracker')
        self.take_element_screenshot(concentration_progress_button, 'main_menu_click_concentration_progress_tracker')
        concentration_progress_button.click()
        self.take_screenshot('concentration_progress_page')
        # Select college
        driver.find_element_by_xpath(
            self._contents_xpath('Select College...')
        ).click()
        driver.find_element_by_xpath(
            self._contents_xpath('Eastern Kentucky University - Richmond, KY')
        ).click()
        college_select = driver.find_element_by_xpath(
            self._contents_xpath('Eastern Kentucky University - Richmond, KY')
        )
        self.take_element_screenshot(college_select, 'concentration_progress_college_select')
        # Select major
        driver.find_element_by_xpath(
            self._contents_xpath('Select Major...')
        ).click()
        driver.find_element_by_xpath(
            self._contents_xpath('Computer Science')
        ).click()
        major_select = driver.find_element_by_xpath(
            self._contents_xpath('Computer Science')
        )
        self.take_element_screenshot(major_select, 'concentration_progress_major_select')
        # Select concentration
        driver.find_element_by_xpath(
            self._contents_xpath('Select Concentration...')
        ).click()
        driver.find_element_by_xpath(
            self._contents_xpath('General')
        ).click()
        concentration_select = driver.find_element_by_xpath(
            self._contents_xpath('General')
        )
        self.take_element_screenshot(concentration_select, 'concentration_progress_concentration_select')
        load_progress_button = driver.find_element_by_xpath(
            '(.//*[normalize-space(text()) and normalize-space(.)=\'General\'])[1]'
            '/following::button[1]'
        )
        self.take_element_screenshot(load_progress_button, 'concentration_progress_click_load_progress')
        load_progress_button.click()
        driver.find_element_by_xpath(
            '//div[@id=\'root\']/div/div/div[2]/div/div[4]/div/ul/li/span/i'
        ).click()
        self.scroll(0, 500)
        time.sleep(1)
        self.take_screenshot('concentration_progress_requirement_structure')
        self.scroll(0, 0)
        grade_tracker_button = driver.find_element_by_link_text('Grade Tracker')
        self.take_element_screenshot(grade_tracker_button, 'concentration_progress_click_grade_tracker')
        grade_tracker_button.click()
