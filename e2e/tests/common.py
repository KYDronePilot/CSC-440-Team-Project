import os
import time
import unittest
from typing import Tuple

import faker
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException, NoAlertPresentException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SCREENSHOTS_DIR = os.path.join(os.path.dirname(BASE_DIR), 'screenshots')
PAGE_URL = 'http://localhost:3000/login/'


class SeleniumTestCase(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.implicitly_wait(30)
        # Set dimensions
        self.driver.set_window_position(0, 0)
        self.driver.set_window_size(1000, 1000)
        self.verificationErrors = []
        self.accept_next_alert = True
        self.fake = faker.Faker()

    def take_screenshot(self, name: str):
        """
        Take and save a screenshot.

        Args:
            name: Name of screenshot
        """
        file_name = os.path.join(SCREENSHOTS_DIR, f'{name}.png')
        # if not os.path.exists(file_name):
        self.driver.save_screenshot(file_name)

    @staticmethod
    def _apply_style(style: str, driver, element):
        """
        Apply style to an element.

        Args:
            style: Style to apply
            driver: Driver to use
            element: Element to apply to
        """
        driver.execute_script('arguments[0].setAttribute(\'style\', arguments[1]);', element, style)

    def highlight(self, element):
        """
        Highlights (blinks) a Selenium Webdriver element

        Returns:
            Original style
        """
        driver = element._parent

        original_style = element.get_attribute('style')
        self._apply_style('background: yellow; border: 2px solid red;', driver, element)
        return original_style

    def take_element_screenshot(self, element, name: str):
        """
        Take a screenshot while highlighting a particular element.

        Args:
            element: Element to highlight
            name: Name of screenshot
        """
        original_style = self.highlight(element)
        self.take_screenshot(name)
        self._apply_style(original_style, element._parent, element)

    def wait_till_element_present(self, selector: Tuple, timeout: int = 5):
        """
        Wait till an element becomes present.

        Args:
            selector: Selector tuple describing element to wait for
            timeout: Time to wait before giving up
        """
        WebDriverWait(self.driver, timeout).until(EC.presence_of_element_located(selector))

    def _contents_xpath(self, content: str) -> str:
        """
        Format an xpath for finding an element containing the given text.

        Args:
            content: Content text of element

        Returns:
            Formatted xpath
        """
        return f'//*[contains(text(), \'{content}\')]'

    def screenshot_xpath_element(self, xpath: str, screenshot_name: str, click: bool = True):
        """
        Find an xpath element, screenshot it, and click it if specified.

        Args:
            xpath: xpath of element
            screenshot_name: Name of screenshot
            click: Whether or not to click the element
        """
        element = self.driver.find_element_by_xpath(xpath)
        self.take_element_screenshot(element, screenshot_name)
        if click:
            element.click()

    def click_and_screenshot_select_option(self, placeholder: str, option_text: str, screenshot_name: str):
        """
        Click on a select option and screenshot it.

        Args:
            placeholder: Placeholder text of select element
            option_text: Text of option to click
            screenshot_name: Name of screenshot
        """
        self.driver.find_element_by_xpath(self._contents_xpath(placeholder)).click()
        self.driver.find_element_by_xpath(self._contents_xpath(option_text)).click()
        time.sleep(0.5)
        self.screenshot_xpath_element(self._contents_xpath(option_text), screenshot_name, click=False)

    def scroll(self, x: int, y: int):
        """
        Scroll webpage to a set of coordinates.

        Args:
            x: X-coordinate
            y: Y-coordinate
        """
        self.driver.execute_script(f'window.scrollTo({x}, {y})')

    def is_element_present(self, how, what):
        try:
            self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e:
            return False
        return True

    def is_alert_present(self):
        try:
            self.driver.switch_to_alert()
        except NoAlertPresentException as e:
            return False
        return True

    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally:
            self.accept_next_alert = True

    def tearDown(self):
        self.driver.close()
        self.assertEqual([], self.verificationErrors)


class GenericSeleniumTestActions(SeleniumTestCase):
    def login(self):
        driver = self.driver
        driver.get(PAGE_URL)
        driver.find_element_by_name('username').clear()
        driver.find_element_by_name('username').send_keys('william.smith')
        driver.find_element_by_name('password').clear()
        driver.find_element_by_name('password').send_keys('somereallyreallysecurepassword')
        login = driver.find_element_by_xpath(
            '(.//*[normalize-space(text()) and normalize-space(.)=\'Password\'])[1]/following::button[1]'
        )
        login.click()
        self.wait_till_element_present((By.XPATH, self._contents_xpath('Dashboard')))
        time.sleep(2)

    def navigate_grade_tracker_home(self):
        self.login()
        driver = self.driver
        driver.find_element_by_link_text('Grade Tracker Home').click()
        time.sleep(1)

    def navigate_courses(self):
        self.navigate_grade_tracker_home()
        driver = self.driver
        driver.find_element_by_link_text('Fall, 2019').click()
        time.sleep(1)

    def navigate_course_details(self):
        self.navigate_courses()
        self.driver.find_element_by_xpath(self._contents_xpath('Applied Software Engineering')).click()
        time.sleep(2.5)


if __name__ == '__main__':
    unittest.main()
