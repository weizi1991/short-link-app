# Short Lnk App

This is a Link shortener application. The app is built with React.js for the front-end and meteor for the back-end. 
The back-end can interface with a remote mongoDB database on meteor.

The app provides users authentication functionality in login page and sign up page.

When entered a valid url, the app will generate a short lnk. Database will create a new entity with short link, hit times, and most recent hit history.

When user use the short link in the browser, the url will redirect to the original site. The data will updated with hits, and recent visited timestamp.

## Deployment
The code is deployed to 
<a>https://shielded-spire-48178.herokuapp.com/</a>

