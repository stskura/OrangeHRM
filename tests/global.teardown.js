import { test as teardown, expect } from '@playwright/test';
import { Utilities } from './testUtilities';

/**
 * Delete all the candidates created after all the tests
 */
teardown('Cleanup - Delete all candidates created', async ({ }) => {

    //Create Page
    const { webkit } = require('playwright');
    const browser = await webkit.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    //Click in the Recruitment menu item
    const utilities = new Utilities(page);
    utilities.login();
    await utilities.page.getByRole("navigation").getByText('Recruitment').click();

    //Click in the checkbox of the created candidate
    await expect(utilities.page.getByRole('rowgroup').first()).toBeVisible();
    var candidates = utilities.page.getByRole('row').filter({hasText : utilities.candidateFields.fieldName});
    const count = await candidates.count();

    if(candidates!=null && await candidates.count() > 0){

        //Check the candidate checkbox
        for (let i = 0; i < count; ++i) {
            await candidates.nth(i).getByRole('checkbox').locator('//following-sibling::span').check(); 
        }

        //Click in the delete button
        await utilities.buttonClick('Delete Selected');

        //Click to confirm the delete operation
        await utilities.buttonClick('Yes, Delete');
    }

    page.close();
    browser.close();
});