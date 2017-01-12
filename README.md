# React Pender Client
---

## About

This app has been developed as a coding challenge for Meedan's Senior Web Developer Position. I have generated the boilerplate code with the `create-react-app` command line utility.

## Setup

To download from github and run locally please do as follows:

- git clone https://github.com/amoedoamorim/penderclient.git
- cd penderclient
- create your config.js file by copying config.sample.js
- edit config.js and replace **your-api-token-here** with your API Token
- npm install
- npm start

## Requirements

### Input Screen
- The input screen shows a textfield where the user inputs a URL and clicks a button to submit.
- The screen should check that the URL is valid before submitting, and show a warning if it’s not valid.
- Also, the screen should check that Internet connectivity is on and show a warning if it’s not, or if Pender service is not accessible. In those cases, the submission button should be disabled.
- Upon submission, the screen should examine the Pender result and show an error message if Pender returned an error. Otherwise, the app should redirect to the second screen, which is the list of all requested URLs.

### Media List Screen
- The list should be sorted in reverse chronological order, last item first.
- The list should allow pagination, showing 20 items per page (or using a “Load more” mechanism).
- Each item should show the embeddable HTML fragment returned by Pender. **_-- Here I have displayed the embeddable code rather than showing the embedded result as embedding would require connectivity for the script request._**
- It’s important that this screen should function EVEN WHEN INTERNET CONNECTIVITY IS
OFF. This means that the app should remember the list of all requested URLs, and for each, the Pender response.
