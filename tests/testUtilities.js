// @ts-check
import { expect } from '@playwright/test';

export class Utilities {

    //Orange HRM page information
    orangeHRMInfo ={
        URL: "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
        username: "Admin",
        password: "admin123"
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

    /**
     * Delete a candidate by the name
     * @param {string} fieldName
     */
    async deleteCandidate(fieldName){
        //Click in the Recruitment menu item
        await this.page.getByRole("navigation").getByText('Recruitment').click();
    
        //Click in the checkbox of the created candidate
        await expect(this.page.getByRole('rowgroup').first()).toBeVisible();
        var candidates = this.page.getByRole('row').filter({hasText : fieldName});
        const count = await candidates.count();

        if(candidates!=null && await candidates.count() > 0){

            /*for (let i = 0; i < count; ++i) {
                await candidates.nth(i).getByRole('checkbox').locator('//following-sibling::span').check(); 
            }*/
            await candidates.nth(0).getByRole('checkbox').locator('//following-sibling::span').check(); 
    
            //Click in the delete utton
            await this.buttonClick('Delete Selected');
        
            //Click to confirm the delete operation
            await this.buttonClick('Yes, Delete');
        }       
    };
}