# GreenO - One Student One Tree Project

**GreenO** is a project developed for R.M.K Engineering College that aims to promote environmental sustainability through the "One Student One Tree" initiative. Each student is given a sapling at the beginning of their academic journey, and their progress is monitored throughout their academic years. Students upload a photo of their sapling every semester, and the system validates the progress using geolocation and image analysis powered by Python-based machine learning.

## Features

- **Student Progress Tracking**: Students upload pictures of their sapling every semester.
- **Geo-location Validation**: The student's location is verified to ensure authenticity.
- **Image Analysis**: A Python-based machine learning model is used to analyze the uploaded images for tree growth.
- **Certificate Generation**: Upon successful completion of a semester, an auto-generated certificate is issued to the student.
- **Role-based Access**: 
  - **HOD and Principal Login**: For progress maintenance and oversight.
  - **AICTE Admin Login**: For maintaining and viewing the overall progress of the college.
  
## Tech Stack

- **Frontend**: React.js
- **Backend**: Express.js
- **Database**: MySQL
- **Machine Learning**: Python (for image validation)

