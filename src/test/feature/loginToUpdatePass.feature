Feature: Login and Update Password

  Background:
    Given user launches the "Kmbal movies" portal
    And user enters valid credentials "jami@gmail.com" and "See@1234" to log in

  @smoke
  Scenario: Admin user can log in to the Kmbal movies portal
    And verify user has landed on the "Kmbal movies" portal home page

  @smoke
  Scenario: Admin user can change the password
    Then user successfully changes the password from "See@1234" to "Abc@1234"