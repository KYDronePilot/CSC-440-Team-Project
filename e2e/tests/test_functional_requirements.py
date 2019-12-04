import unittest
import os
import time
import faker

from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException, NoAlertPresentException
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains


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
        Take and save a screenshot if one does not already exist.

        Args:
            name: Name of screenshot
        """
        file_name = os.path.join(SCREENSHOTS_DIR, f'{name}.png')
        if not os.path.exists(file_name):
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
        self.assertEqual([], self.verificationErrors)


class AuthTests(SeleniumTestCase):
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

    def test_registration_process(self):
        driver = self.driver
        driver.get(PAGE_URL)

        self.take_screenshot('login_page')

        register = driver.find_element_by_link_text('Register')
        self.take_element_screenshot(register, 'click_register')
        register.click()

        self.take_screenshot('registration_page')

        driver.find_element_by_name('firstName').click()
        driver.find_element_by_name('firstName').clear()
        driver.find_element_by_name('firstName').send_keys(self.fake.first_name())
        driver.find_element_by_name('lastName').click()
        driver.find_element_by_name('lastName').clear()
        driver.find_element_by_name('lastName').send_keys(self.fake.last_name())
        driver.find_element_by_name('username').click()
        driver.find_element_by_name('username').clear()
        driver.find_element_by_name('username').send_keys(self.fake.user_name())
        driver.find_element_by_name('email').click()
        driver.find_element_by_name('email').clear()
        driver.find_element_by_name('email').send_keys(self.fake.email())
        password = self.fake.password()
        driver.find_element_by_name('password').click()
        driver.find_element_by_name('password').clear()
        driver.find_element_by_name('password').send_keys(password)
        driver.find_element_by_name('passwordConfirmation').click()
        driver.find_element_by_name('passwordConfirmation').clear()
        driver.find_element_by_name('passwordConfirmation').send_keys(password)

        self.take_screenshot('registration_page_filled_out')

        register_button = driver.find_element_by_xpath(
            '(.//*[normalize-space(text()) and normalize-space(.)=\'Confirm Password\'])[1]/following::button[1]'
        )
        self.take_element_screenshot(register_button, 'registration_page_click_register')
        register_button.click()

        try:
            self.assertTrue(
                self.is_element_present(
                    By.XPATH,
                    '(.//*[normalize-space(text()) and normalize-space(.)=\'...\'])[1]/following::p[1]'
                )
            )
        except AssertionError as e:
            self.verificationErrors.append(str(e))

        self.take_screenshot('new_user_homepage')

    def test_login_process(self):
        driver = self.driver
        driver.get(PAGE_URL)
        driver.find_element_by_name('username').click()
        driver.find_element_by_name('username').clear()
        driver.find_element_by_name('username').send_keys('william.smith')
        driver.find_element_by_name('password').click()
        driver.find_element_by_name('password').clear()
        driver.find_element_by_name('password').send_keys('somereallyreallysecurepassword')
        self.take_screenshot('login_page_filled_out')
        login = driver.find_element_by_xpath(
            '(.//*[normalize-space(text()) and normalize-space(.)=\'Password\'])[1]/following::button[1]'
        )
        self.take_element_screenshot(login, 'login_page_click_login')
        login.click()
        try:
            self.assertTrue(
                self.is_element_present(
                    By.XPATH,
                    '(.//*[normalize-space(text()) and normalize-space(.)=\'Home\'])[1]/following::h1[1]'
                )
            )
        except AssertionError as e:
            self.verificationErrors.append(str(e))
        self.take_screenshot('existing_user_homepage')

    def test_logout_process(self):
        self.login()
        driver = self.driver
        logout_button = driver.find_element_by_xpath(
            '(.//*[normalize-space(text()) and normalize-space(.)=\'Welcome William Smith\'])[1]/following::button[1]'
        )
        self.take_element_screenshot(logout_button, 'main_menu_click_logout')
        logout_button.click()
        try:
            self.assertTrue(
                self.is_element_present(
                    By.XPATH,
                    '(.//*[normalize-space(text()) and normalize-space(.)=\'Login\'])[1]/following::h2[1]'
                )
            )
        except AssertionError as e:
            self.verificationErrors.append(str(e))


if __name__ == '__main__':
    unittest.main()
