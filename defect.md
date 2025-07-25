## :pencil: Defects and Enhancement Suggestions
&emsp;Defect: Search can't be done using the full name
  
&emsp;&emsp;Steps to Reproduce:\
&emsp;&emsp;&emsp;1. Open the Orange HRM URL (https://opensource-demo.orangehrmlive.com/web/index.php/auth/login) \
&emsp;&emsp;&emsp;2. Do the Login\
&emsp;&emsp;&emsp;3. Press the Recruitment option in the left menu\
&emsp;&emsp;&emsp;4. Press the Add button\
&emsp;&emsp;&emsp;5. Fill in the required fields, like: first name, last name and email\
&emsp;&emsp;&emsp;6. Press the Save button\
&emsp;&emsp;&emsp;7. Go to the Recruitment option on the left menu\
&emsp;&emsp;&emsp;8. Fill in the Candidate Name field with the first and last name used to create the candidate\
&emsp;&emsp;&emsp;9. Verify if the candidate is shown in the list below the field
  
&emsp;&emsp;Expected Result:\
&emsp;&emsp;&emsp;The name of the candidate added should be listed.
  
&emsp;&emsp;Actual Result:\
&emsp;&emsp;&emsp;The name is not listed, and the search can't be done by the full name.\
&emsp;&emsp;&emsp;When entering the first name, the candidate is on the list to be selected.\
&emsp;&emsp;&emsp;However, when filling in all the names this does not occur.\
&emsp;&emsp;&emsp;Tested on Chrome browser.
  
&emsp;&emsp;Screenshot:\
<img align="right" width="960" height="960" src="/images/defect_fullNameSearch.png">
<br clear="right"/>
</br>
</br>

&emsp;Enhancement: The delete operation could be executed in the candidate details too

&emsp;&emsp;Steps to Reproduce:\
&emsp;&emsp;&emsp;1. Open the Orange HRM URL (https://opensource-demo.orangehrmlive.com/web/index.php/auth/login) \
&emsp;&emsp;&emsp;2. Do the Login\
&emsp;&emsp;&emsp;3. Press the Recruitment option in the left menu\
&emsp;&emsp;&emsp;4. Press the Add button\
&emsp;&emsp;&emsp;5. Fill in the required fields, like: first name, last name and email\
&emsp;&emsp;&emsp;6. Press the Save button\
&emsp;&emsp;&emsp;7. On the page verify below in the Actions if the delete button is shown

&emsp;&emsp;Suggestion:\
&emsp;&emsp;&emsp;Could have the delete operation in the candidate view page.\
&emsp;&emsp;&emsp;Also, there is an Actions column below on the page that could have this option, as in the main page view of the Recruitment table.\
&emsp;&emsp;&emsp;Tested on Chrome browser.

&emsp;&emsp;Screenshot:\
<img align="right" width="960" height="960" src="/images/deleteAction.png">
<br clear="right"/>
</br>
</br>
