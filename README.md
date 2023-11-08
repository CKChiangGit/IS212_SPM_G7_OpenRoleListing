# IS212_SPM_G7_OpenRoleListing

![branch structure](img/gitbranch.png)


SQL files are uploaded in the repository to download for the models to test the microservices.

Models are used to link the sql files and the microservices for data retrieval.


--------------PLEASE READ THE FOLLOWING BELOW TO RUN OUR SPM PROJECT!!!!!----------------

Start up wampserver64 and Login into PhpMyAdmin. Import the sql file: spm.sql located under the sql_data folder.


From a base directory ("wamp64\www\IS212_SPM_G7_OpenRoleListing-main" in this case), create a new environment on CMD CLI.
```
python -m venv spm-t3
spm-t3\scripts\activate
```
![Create new environment](/img/create_new_environment.png)


Run npm install to install the relevant packages from package.json
```
npm install
```

For each of the microservices below, run this code on a new terminal to navigate to the spm-t3 directory, run the venv and return to src/api directory. 
```cd spm-t3\Scripts && call activate && cd ../../src/api``` 

Once the terminal is in the environment & src/api, run each line of code below individually on its own terminal to start all the microservices. 
```
node staff_details_ms.js
node openroles.js
node apply_role_complexMS.js
node role_skills_ms.js
node roledetails.js
node apply.js
node rolelistings.js
node skill_details_ms
node staffskills.js
```

![Microservice Steup Example - 1 Microservice -> 1 Terminal](/img/microservice_setup.png)

![Microservice Port Numbers. from depenencies.txt](/img/ms_port_numbers.png)


After running all microservices, open a new terminal and type the code below to test all unit testing TDD for microservices in our code. It should return 7 passed for files and 22 passed for tests.
```cd spm-t3\Scripts && call activate && cd ../../```
```npm test a```

![Running TDD](/img/TDD_testing.png)

![TDD intended results](/img/TDD_results.png)


Ctrl + C to keyboard interrupt to exit the npm test menu, and type ```npm start``` to run the frontend.
This will take a short minute to load all react.js components.


![React.js start success](/img/npm_start_success.png)


Ctrl + C to keyboard interrupt to exit the npm start to stop the frontend react.js
![stopping react.js frontend w/ ctrl + c](/img/npm_start_stop_process.png)



------END OF README-------
