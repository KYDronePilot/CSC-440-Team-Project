import time

from selenium.webdriver.common.by import By

from tests.common import PAGE_URL, GenericSeleniumTestActions


class AuthTests(GenericSeleniumTestActions):
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
        time.sleep(2)
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
