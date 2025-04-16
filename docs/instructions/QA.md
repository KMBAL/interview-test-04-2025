# Instructions (QAs)

## Pre-requisites

Please fork this repo to your own GitHub account by following these steps:

1. Go to `https://github.com/KMBAL/interview-test-04-2025/fork`
2. Click "Create Fork"

Next, clone the forked repository to your local machine.

> [!NOTE]
> If you are unfamiliar with forking/cloning git repositories, you can download
> the repository as a zip archive. To do so, visit `https://github.com/KMBAL/interview-test-04-2025`,
> select the "Code" dropdown, and then select "Download ZIP".

## Requirements

Please choose one of the following test cases to implement.

### Option 1: Integration Test (API)

Implement a simple integration test suite for the movie reviews API. This test
suite should assert the following scenarios:

1. A user should be able to submit a review using the `POST /api/v1/movies/:movieId/reviews`
   API endpoint
2. A user should not be able to submit more than one review for a given movie
   using the `POST /api/v1/movies/:movieId/reviews`

### Option 2: End-to-End Test (Web)

Implement a simple end-to-end test suite for the movie reviews web application.
This test suite should assert the following scenarios:

1. A user should be able to login to the web app using the login form at `/login`
2. A user should be able to update their password using the update password form
   at `/profile`.

import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager


class BaseClass:
    def __init__(self):
        self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
        self.driver.maximize_window()
        self.wait = WebDriverWait(self.driver, 15)

    def setup(self, url):
        self.driver.get(url)

    def teardown(self):
        self.driver.quit()

    def wait_for_element(self, locator):
        return self.wait.until(EC.presence_of_element_located(locator))

    def wait_for_element_visible(self, locator):
        return self.wait.until(EC.visibility_of_element_located(locator))


class LoginPage:
    login_home_button = (By.XPATH, "//a[contains(text(), 'Log in')]")
    email_input = (By.NAME, "email")
    password_input = (By.NAME, "password")
    login_button = (By.XPATH, "//button[contains(text(), 'Log in')]")

    def __init__(self, driver):
        self.driver = driver

    def click_loginHome(self):
        self.driver.find_element(*self.login_home_button).click()

    def enter_credentials(self, email, password):
        self.driver.find_element(*self.email_input).send_keys(email)
        self.driver.find_element(*self.password_input).send_keys(password)

    def click_login(self):
        self.driver.find_element(*self.login_button).click()


class ProfilePage:
    current_password_input = (By.ID, "current_password")
    new_password_input = (By.ID, "password")
    confirm_password_input = (By.ID, "password_confirmation")
    save_button = (By.XPATH, "//button[contains(text(), 'Save')]")
    profile_button = (By.XPATH, "//button[contains(text(), 'Sam')]")
    logout_button = (By.XPATH, "//button[contains(text(), 'Log Out')]")

    def __init__(self, driver):
        self.driver = driver

    def change_password(self, current_password, new_password):
        self.driver.find_element(*self.current_password_input).send_keys(current_password)
        self.driver.find_element(*self.new_password_input).send_keys(new_password)
        self.driver.find_element(*self.confirm_password_input).send_keys(new_password)
        self.driver.find_element(*self.save_button).click()

    def logout(self):
        self.driver.find_element(*self.profile_button).click()
        self.driver.find_element(*self.logout_button).click()


class Utilities:
    @staticmethod
    def scroll_until_element_displayed(driver, element_xpath):
        wait = WebDriverWait(driver, 15)
        while True:
            driver.execute_script("window.scrollBy(0, 1000);")
            time.sleep(1)
            try:
                element = wait.until(EC.visibility_of_element_located((By.XPATH, element_xpath)))
                if element.is_displayed():
                    print("Element is displayed!")
                    break
            except:
                print("Element not found, scrolling again...")


class TestLogin(BaseClass):
    movies_heading = (By.XPATH, "//h2[contains(text(), 'Movies')]")

    def test_login_and_verify_movies_page(self):
        self.setup("http://localhost:8000/login")
        login_page = LoginPage(self.driver)
        login_page.enter_credentials("sam123@gmail.com", "Sp16bcs006")
        login_page.click_login()

        self.wait_for_element_visible(self.movies_heading)

        assert self.driver.find_element(*self.movies_heading).is_displayed()
        print("Test 1 Passed: Login successful and 'Movies' heading is present.")
        self.teardown()

    def test_login_and_change_password(self):
        self.setup("http://localhost:8000/login")
        login_page = LoginPage(self.driver)
        login_page.enter_credentials("sam123@gmail.com", "Sp16bcs006")
        login_page.click_login()
        self.wait_for_element_visible(self.movies_heading)

        self.setup("http://localhost:8000/profile")
        profile_page = ProfilePage(self.driver)
        Utilities.scroll_until_element_displayed(self.driver, ProfilePage.save_button[1])

        profile_page.change_password("Sp16bcs006", "Sp16bcs0061")

        self.wait_for_element(ProfilePage.save_button)
        self.driver.refresh()

        profile_page.logout()
        self.wait_for_element(LoginPage.login_home_button)

        login_page.click_loginHome()
        self.wait_for_element(LoginPage.email_input)
        login_page.enter_credentials("sam123@gmail.com", "Sp16bcs006")
        login_page.click_login()

        self.wait_for_element_visible(self.movies_heading)

        assert self.driver.find_element(*self.movies_heading).is_displayed()
        print("Password changed, but old password still works. Functional issue.")
        self.teardown()



print("Running test case 1: Login and verify page")
test1 = TestLogin()
test1.test_login_and_verify_movies_page()

print("\nRunning test case 2: Login, change password, verify login")
test2 = TestLogin()
test2.test_login_and_change_password()


### Option 3: End-to-End Test (Mobile)

Implement a simple end-to-end test suite for the movie reviews mobile application.
This test suite should assert the following cases

1. A user should be able to login to the mobile app
2. A user should be able to view the reviews for a movie in the mobile app

## Submission

Please raise a PR against **you own fork** and email a link to ben@kmbal.com and
malik@kmbal.com.

> [!NOTE]
> If you are unfamiliar with the process of raising PRs to GitHub, please create
> a zip archive of your work and submit it by email to ben@kmbal.com and malik@kmbal.com

## Guidance

### Running the Backend & Web Application Locally

The backend and web application can be run locally with Docker. Run `docker compose build`
then `docker compose up` to start the web application. It will be accessible at
`http://localhost:8000`.

### Connecting to the Database Locally

The backend and web application use a SQLite single file database. This is
accessible at `web/database/production.sqlite`. You can connect to the database
using most database clients. If your preferred database client does not support
SQLite, you can use [DBeaver](https://dbeaver.io/download/).

### Running the Mobile Application Locally

> [!NOTE]
> Running the mobile application locally is only required for Option 3.

There are many ways to run Flutter applications locally. If using Visual Studio
Code, it is recommended to use the official extension. You can find documentation
for this [here](https://docs.flutter.dev/tools/vs-code).

Note that developers should use the Flutter specified in `mobile/.fvmrc`. The
recommended way to do this is using [FVM](https://fvm.app/).


### API Endpoints

The available API endpoints are documented in a postman collecton. The collection
can be imported from `docs/postman/collection.json`.

For convenience, the `POST /api/qa/createTestUser` and `DELETE /api/qa/destroyAllTestUsers`
endpoints can be used in tests to create and destroy temporary test users. These
APIs can be used for setup and teardown of test scenarios.
