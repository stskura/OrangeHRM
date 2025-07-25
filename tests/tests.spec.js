// @ts-check
import { test, expect } from '@playwright/test';
import { Utilities } from './testUtilities';

//Candidate Fields
let candidateFields = {
      firstName: "Orange",
      lastName: "TestLastName",
      email: "test@test.com"
  };

/**
 * Before each test do the login.
 */
test.beforeEach(async ({ page }) => {
  const utilities = new Utilities(page);
  //Login before each test
  await utilities.login();
});

/**
 * Test Case 1: 
 *      Login in the Orange HRM page and verify the Dashboard page is loaded.
 */
test('Login', async ({ page }) => { 
  //Login was done by the before each test

  //Validate the Dashboard page opens
  await expect(page, "The login should be done and go to the Dashboard page").toHaveURL(/dashboard/);

  //Validate the Dashboad was selected in the menu
  await expect(page.locator('.active'), "The Dashboard should be selected").toHaveText('Dashboard');
});

/**
 * Test Case 2: 
 *      In the recruitment page create a new candidate and validate was sucessfully created.
 */
test('Recruitment - Create Candidate', async ({ page }) => { 
  const utilities = new Utilities(page);

  //Create a candidate
  await utilities.createCandidate(candidateFields);

  //Validate Success message
  await utilities.validateSuccessMessage();
});

/**
 * Test Case 3: 
 *      In the recruitment page find the candidate previously added, edit and verify was updated.
 */
test('Recruitment - Edit Candidate', async ({ page }) => { 
  const utilities = new Utilities(page);

  //Create a candidate
  await utilities.createCandidate(candidateFields);

  //Click in the Recruitment menu item
  await page.getByRole("navigation").getByText('Recruitment').click();

  //Fill the Candidate Name
  await utilities.fillText('Type for hints...', candidateFields.firstName);

  //Click in the list of the candidate name search
  var listbox = page.getByRole('listbox');  
  await expect(listbox, "The list in the searched names should be shown").toBeVisible();

  listbox = listbox.filter({hasText: candidateFields.firstName});  
  await expect(listbox, "The number of names found in list should not be zero").not.toHaveCount(0);

  await listbox.first().click();

  //Click in the search button
  await utilities.buttonClick('Search');
  
  //Validate the candidate was found
  await expect(page.getByText('Record Found'), "The record found message should be displayed").toBeVisible();

  //Validate the canditate was found in the search
  const candidate = page.getByRole('table').filter({hasText : candidateFields.firstName});
  await expect(candidate, "Table must find at least one record found").not.toHaveCount(0);
  
  //Click in the eye button
  await candidate.locator('//following-sibling::button').first().click();

  //Press the Edit option
  await page.getByLabel('Edit').check();
  
  //Fill the Middle Name
  const middleName = 'TestMiddleName';
  await utilities.fillText('Middle Name', middleName);

  //Press the Save button
  await utilities.buttonClick('Save');

  //Validate Success message
  await utilities.validateSuccessMessage();

  //Validate if the table was updated with the middle name
  await expect(page.getByRole('table').filter({hasText : middleName}), "Table must find at least one record found").not.toHaveCount(0);
});

/**
 * Test Case 3: 
 *      In the recruitment page find the candidate previously added, edit and verify was updated.
 */
test('Recruitment - Delete Candidate', async ({ page }) => { 
  const utilities = new Utilities(page);

  //Create a candidate
  await utilities.createCandidate(candidateFields);

  //Click in the Recruitment menu item
  await page.getByRole("navigation").getByText('Recruitment').click();

  //Click in the checkbox of the created candidate
  const candidate = page.getByRole('row').filter({hasText : candidateFields.firstName}).first();
  await candidate.getByRole('checkbox').locator('//following-sibling::span').check();

  //Validate if delete button is shown
  var deleteButton = 'Delete Selected';
  await expect(page.getByText(deleteButton), "The delete button should be shown").toBeVisible();

  //Click in the delete utton
  await utilities.buttonClick(deleteButton);

  //Validate if dialog is shown
  deleteButton = 'Yes, Delete';
  await expect(page.getByText(deleteButton), "The \"\"+ deleteButton + \"\" button should be shown").toBeVisible();

  //Click to confirm the delete operation
  await utilities.buttonClick(deleteButton);

  //Validate Success message
  await utilities.validateSuccessMessage();
});