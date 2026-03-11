import { BasePage } from './BasePage';  

export class Login extends BasePage
{
 constructor(page)
 {
    super(page);
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
      //  this.errorMessage = page.locator('[data-test="error"]');
 }  
  async loginIntoSauceDemo(userName, password )
  {
   await this.usernameInput.fill(userName)
   await this.passwordInput.fill(password)
   await this.loginButton.click()

  }  
    

}