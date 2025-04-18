import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import java.time.Duration;

public class KmbalMovieReviewsEndToEndTest {

    private WebDriver driver;
    private WebDriverWait wait;

    // Credentials
    private final String EMAIL = "example@user.com";
    private final String PASSWORD = "Demo@123";
    private final String NEW_PASSWORD = "Newcode@123";

    @BeforeMethod
    public void setUp() {
        // Set up the WebDriver (update the path as necessary)
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\bandi\\IdeaProjects\\interview-test-04-2025\\web\\EndToEndTests\\chromedriver-win64");
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    @Test
    public void testLoginAndUpdatePassword() {
        testLogin();
        testUpdatePassword();
    }

    private void loginPage() {

        driver.get("http://localhost:8000/login");

        Assert.assertTrue(driver.getTitle().contains("KMBAL") ||
                driver.getCurrentUrl().contains("/login"),
            "Login page not loaded properly");

        driver.findElement(By.id("email")).clear.sendKeys(EMAIL);
        driver.findElement(By.id("password")).clear.sendKeys(PASSWORD);

        WebElement loginButton = driver.findElement(By.xpath("//button[text()='Log in']"));
        loginButton.click();

        // 8. Verify login was successful
        String currentUrl = driver.getCurrentUrl();
        Assert.assertTrue(currentUrl.contains("/dashboard") ||
                currentUrl.contains("/home") ||
                currentUrl.contains("/profile"),
            "Login failed - User not redirected after login");

        System.out.println("Login successful!");
    }

    private void testUpdatePassword() {
        driver.get("http://localhost:8000/profile");

        wait.until(ExpectedConditions.or(
            ExpectedConditions.urlContains("/profile")
        ));

        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//h2[@class='Update Password']"));

        WebElement currentPasswordField = driver.findElement(By.xpath("//input[@id='current_password']"));
        WebElement newPasswordField = driver.findElement(By.xpath("//input[@id='password']"));
        WebElement confirmPasswordField = driver.findElement(By.xpath("//input[@id='password_confirmation']"));
        WebElement updateButton = driver.findElement(By.xpath("//button[contains(text(),'Save')]"));

        currentPasswordField.clear();
        currentPasswordField.sendKeys(PASSWORD);

        newPasswordField.clear();
        newPasswordField.sendKeys(NEW_PASSWORD);

        confirmPasswordField.clear();
        confirmPasswordField.sendKeys(NEW_PASSWORD);

        updateButton.click();

        System.out.println("Password updated successfully!");

        logoutAndVerifyNewPassword();
    }

    private void logoutAndVerifyNewPassword() {

        driver.findElement(By.xpath("//button[text(),'Example User']")).click();
        driver.findElement(By.xpath("//button[text(),'Log Out']")).click();

        driver.get("http://localhost:8000/login");

        Assert.assertTrue(driver.getTitle().contains("KMBAL") ||
                driver.getCurrentUrl().contains("/login"),
            "Login page not loaded properly");


        driver.findElement(By.id("email")).clear.sendKeys(EMAIL);
        driver.findElement(By.id("password")).clear.sendKeys(NEW_PASSWORD);

        WebElement loginButton = driver.findElement(By.xpath("//button[contains(text(),'LOG IN')]"));
        loginButton.click();

        // 4. Verify login with new password
        wait.until(ExpectedConditions.or(
            ExpectedConditions.urlContains("/profile")
        ));

        System.out.println("Successfully verified login with new password!");
    }

    @AfterMethod
    public void tearDown() {
        // Close all browser windows
        if (driver != null) {
            driver.quit();
        }
    }
}
