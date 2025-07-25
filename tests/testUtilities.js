// @ts-check
import { expect } from '@playwright/test';

export class Utilities {

    //Orange HRM page information
    orangeHRMInfo ={
        URL: "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
        username: "Admin",
        password: "admin123"
    };

    //Candidate Fields
    candidateFields = {
        firstName: "Orange",
        lastName: "TestLastName",
        email: "test@test.com"
    };

    /**
     * @param {import('playwright').Page} page
    */
    constructor(page) {
        this.page = page;
    }

    /**
     * Login in the Orange HRM
     */
    async login(){
        //Open Orange HRM Live page
        await this.page.goto(this.orangeHRMInfo.URL);
        
        //Fill username        
        await this.fillText('Username', this.orangeHRMInfo.username);
        
        //Fill password
        await this.fillText('Password', this.orangeHRMInfo.password);
        
        //Click in the Login button
        await this.buttonClick('Login');
    };

    /**
     * Create a candidate with only the required fields
     * @param {{ firstName: string; lastName: string; email: string; }} fields
     */
    async createCandidate(fields){    
        //Click in the Recruitment menu item
        await this.page.getByText('Recruitment').click();

        //Press the Add button
        await this.buttonClick('Add');

        /*
            Fill the required fields
        */ 
        //Fill the Name
        await this.fillText('First Name', fields.firstName);
        await this.fillText('Last Name', fields.lastName);

        //Fill the Email
        await this.page.getByPlaceholder('Type here').first().fill(fields.email);

        //Press the Save button
        await this.buttonClick('Save');
    };

    /**
     * Verify if the succes message was shown
     */
    async validateSuccessMessage(){
        await expect(this.page.locator('.oxd-toast-content.oxd-toast-content--success'), "Success content must be displayed").toBeVisible();
        await expect(this.page.getByText('Success').first(), "Success message must be displayed").toBeVisible();
    };

    /**
     * Press the button by the name sent.
     * @param {string} buttonName
     */
    async buttonClick(buttonName){
        await this.page.getByRole('button', {name : buttonName}).click();
    };

    /**
     * Enter the text sent in a field
     * @param {string} fieldName
     * @param {string} text
     */
    async fillText(fieldName, text){
        await this.page.getByPlaceholder(fieldName).fill(text);
    };
}