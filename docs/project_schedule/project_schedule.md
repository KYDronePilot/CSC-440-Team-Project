# Project Schedule
The main schedule will be created using Microsoft Project. This doc is for brainstorming and coming up with idea for the
schedule.


## Milestones
### M1 - Simple Web Form Working and Communicating with Backend
### M2 - Progress Review

## Tasks
### Create database ERD
 - Purpose: The database system needs an ERD to visualize relationships/attributes to make model creation simpler.
 - Input: Ideas
 - Output: ERD
 - In charge: Michael
 - Estimated time: 7 days
 - Status: completed, 9/1/19

### Create database models
 - Purpose: Creating raw SQL tables and writing custom queries is impractical for the scale of project we are working
   on. As a result, we are using the Django ORM (Object-Relational Mapping) to create database tables with Django
   models.
 - Input: ERD
 - Output: Database models
 - In charge: Michael
 - Estimated time: 8 days
 - Status: completed, 9/1/19

### Create dummy data for testing
 - Purpose: We need to have some dummy data in the database for testing and seeing how the UI works. This is to be
   created using model create statements so it can be re-applied on a fresh version of the database.
 - Input: Database models
 - Output: Dummy data
 - In charge: Michael
 - Estimated time: 2 days
 - Status: completed, 9/8/19

### Create unit tests for database model relationships
 - Purpose: To prevent changes that may unknowingly affect the database model relationships, unit tests need to be
   created.
 - Input: Dummy data and database models
 - Output: Database model relationship unit tests
 - In charge: Michael
 - Estimated time: 2 days
 - Status: complete, 9/8/19

### Create Redux boilerplate
 - Purpose: To build a Javascript frontend, their needs to be a state management system to keep track of things in the
   browser. Redux is a state management system commonly used with React.js, our frontend framework. Redux needs a lot of
   boilerplate setup to get it working.
 - Input: React.js boilerplate
 - Output: Redux boilerplate
 - In charge: Michael
 - Estimated time: 2 weeks
 - Status: in progress

### Create abstract form components for frontend
 - Purpose: To make creating forms easy in the frontend, we need to have some abstract components that can be used
   across the project to make quick forms.
 - Input: React.js boilerplate
 - Output: Abstract form components
 - In charge: Michael
 - Estimated time: 1 week
 - Status: not started

### Create wireframes for UI
 - Purpose: We need to create some basic wireframe designs for pages on the website before starting to actually coding
   them. This will give us an idea of what the website will look like and let us tweak it without spending too much
   time.
 - Input: Ideas
 - Output: Website wireframes
 - In charge: James
 - Estimated time: 1 week
 - Status: not started

### Implement basic version of UI
 - Purpose: Once the wireframes have been created, we need to implement them in a basic form with React.js. That way we
   can have a working version of the product that we can iterate on.
 - Input: wireframes
 - Output: Basic implementation of UI
 - In charge: Michael and James
 - Estimated time: 2 weeks
 - Status: not started

### Create basic REST API
 - Purpose: The frontend needs a way to communicate with the backend. To do this, we have chosen to use a REST API. This
   API will only be a basic version to support the basic version of the UI.
 - Input: Database models
 - Output: Basic REST API
 - In charge: Michael
 - Estimated time: 1 week
 - Status: not started

### Create basic form of Requirement Specification Report
 - Purpose: Since we are using an Agile process model, we cannot make the entire report ahead of time. As a result, we
   will make a basic form and slowly iterate on it as the project progresses.
 - Input: Ideas
 - Output: Basic form of Requirement Specification Report
 - In charge: Michael and James
 - Estimated time: 1 week
 - Status: not started
 
### Create React.js boilerplate
 - Purpose: We need to instantiate the React.js project and add it to git so we can start using it.
 - Input: Nothing
 - Output: React.js boilerplate
 - In charge: Michael
 - Estimated time: 1 day
 - Status: completed, 8/26/19
