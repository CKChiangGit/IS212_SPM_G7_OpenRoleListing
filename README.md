# IS212_SPM_G7_OpenRoleListing

![branch structure](img/gitbranch.png)


SQL files are uploaded in the repository to download for the models to test the microservices.

Models are used to link the sql files and the microservices for data retrieval.


PLEASE READ TO RUN OUR SPM PROJECT!!!!_!!__!____!

1) Create a new environment on CMD CLI.
```
python -m venv spm-t3
spm-t3\scripts\activate
```
2) Run npm install to install the relevant packages from file name package.json
```
npm install
```

3) For each of the microservices below, run this code on a new terminal to navigate to the spm-t3 directory, run the venv and return to src/api directory. 
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
node staff_roles_ms.js
node staffskills.js
node staff_details_ms.js
```

