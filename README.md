# Capstone-Travel-App
This web application represents the final project of the 'Front End Web Development' course provided by UdaCity. The entire structure and behaviour of the application follows the requirements and style guidelines drawn by UdaCity.

## 1.) Description
This web application constitues a 'Travel Planner' that helps users plan their trips. In short, it provides a general overview of all planned trips, to which you can add some personal trip information. For this purpose, the 'Travel Planner' interacts with three different APIs to enrich the user experience with additional trip-specific data. The app requires the user to enter the desired destination, the planned departure date and optionally the return date. For each destination, a so-called trip card is dynamically generated, in which all necessary data is stored and displayed. Thus, the user benefits from an easy-to-use interface that offers an efficient overview of the trips. 

## 2.) APIs
This web app interacts with three different APIs to make this app working. The first API is the so called **GeoNames API**. This API returns specific data about the trip destination, such as the geographical coordinates (lattitude and longitude). With these coordinates, the travel app makes an HTTP request to the **Weatherbit API** to retrieve specific weather forecast, as long as the departure date is scheduled within the next 16 days. Finally, the **Pixabay API** is used to retrieve an image of the destination and display it as part of the dynamically generated trip card.

## 3.) Getting started
This project contains a build-tool implementation called **webpack**. For this project to run properly, it is important to first implement the build-tool before starting the project. To achieve this, all required dependencies must be installed. In your terminal, navigate to the root directory of the project and enter the following command:
```bash
npm install
```
Once all packages have been installed, it is recommended to perform a test run to make sure everything is working properly. Use the following command in your terminal for the test run:
```bash
npm run test
```
If the test was successful, it is time to implement webpack. Use the following command that will create a **dist/prod** folder in your root folder structure together with a *main.js* and *main.css* file.
```bash
npm run build-prod
```
The server can now be started. In order to do so, type the following command in your terminal:
```bash
npm run start
```
Open a browser and connect to *http://localhost:8000*. You are now set up to fully use the travel planner web app.

## 4.) Usage
The usage of this app is very simple. Enter a destination, the departure date and optionally the returning date. Then, click on the **Generate Trip Card** button, your trip card will be built in few seconds. The trip card will indicate several information, such as:

- destination
- picture of destination
- start and end dates
- trip duration (if end date provided)
- when the trip starts
- weather forecast (if the trip is within the next 16 days)

There are also few functions implemented inside the trip card that allow you to store some information in textfields for any lodging information, packing list or other notes. Finally, press the 'Remove Trip' button to discard the trip card.

## 5.) Features
You will enconter four different features to interact with your trip card:

| Feature | Function |
| ----------|-----------|
| Add lodging info | Click on button to open a textfield that allows you to make some lodging notes |
| Add packing list | Click on button to open a textfield that allows you to list your packing items |
| Add notes | Click on button to open a textfield that allows you to write any kind of notes |
| Remove trip | Click on this button if you want to get rid of your trip card |