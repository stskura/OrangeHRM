# :file_folder: Backlog
## Cleanup
&emsp;&emsp;The cleanup for the tests was developed and was deleting all the candidates created by their test run. However, when an external test from the current test execution deletes the data from the Recruitment's table while the cleanup is running, the teardown will fail. Due to that, the cleanup was commented to not be executed for now to evaluate the next steps to improve the test execution.

<br/>
<img align="left" width="500" height="500" src="/images/teardown.png">
<br clear="left"/>
</br>

<br/>
<img align="left" width="700" height="700" src="/images/teardown_execution.png">
<br clear="left"/>
</br>
