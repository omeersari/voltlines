# volt-lines

# Project setup

Download this project and run

With npm:

```
npm install
npm run serve
```

With yarn:

```
yarn install
yarn serve
```

To run with Docker:

```
docker build -t voltlines .
docker run -it -p 8080:8080 --rm --name dockerize-voltlines voltlines
```


# Used Tech and Libraries and Notes

- Vue2 is used with Vuex and Vue-Router.
- SASS is used for styling. Responsive design is applied.
- For Google-maps vue2-google-maps is used.
- For notifications vue-notification is used.
- For API requests axios is used.
- To style code, prettier and eslint are used.
- Google Maps API is used.
- mockAPI.io is used to create mock data.
- To enable the Google Maps API .env file is required.

# Pages

### Login

A simple login page. There is no real authentication here. Just a simple if-else to illustrate login.

You can login with username: [admin] and password [1234].

### Passengers

In the passenger table, we can the see passengers with their names, pick up orders and trip durations. Also we can click 'go to details' button to see the route and other information. 

Delete icon deletes the passenger. Edit icon will redirect to create page to update the passenger.

The table can be filtered by exact name, can be sorted according to pick up order and trip duration.

### Create

We can create a new passenger or update an existing passenger by filling all the fields. Lat and lng values are displayed when the user clicks on the map to determine origin. After the second click route is displayed, distance and trip duration are also displayed below the map.

For updating if the user wants to change the origin too, he/she needs to reset the map. However changing destination can be done by clicking on the map. It will re-arrange the destination.

User can enter a number in pick up order input to determine the order. It is in the range between 1-9.

If we already have passengers, average of the passengers trip duration can also be seen below the map.

After creating the new passenger, average of the passengers trip duration will be recalculated and displayed.

Creating the new passenger should check 2 validations:

- Trip duration must be lower than 2 hours.
- Total passenger number should be lower than 10.

Reset map button simply clears the map.

- Note: For now user can give the same pick up order number to different passengers. (Can be improved.)

### Route Detail

Route detail page is a page where we can select a passenger and see the all details about them. 

This page is also rendered from passengers page after clicking the 'go to details' button.

