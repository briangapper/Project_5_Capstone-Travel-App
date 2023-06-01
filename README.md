# Capstone-Travel-App
 Final Project of the Front End Development Course (UdaCity)

## 1.) Description
This website uses Natural Language Processing (NLP) technology to evaluate the sentiment of a text. The user has the possibility to pass a URL that leads to a blog or more generally to any text, which is then evaluated. NLP is a technology that can interpret natural human speech. Systems like Alexa, Google Assistant, and many voice interaction programs are well known to us. Understanding human speech is an incredibly difficult task and requires a lot of resources to achieve. Wikipedia defines NLP as following:

> Natural language processing (NLP) is a subfield of computer science, information engineering, and artificial intelligence
concerned with the interactions between computers and human (natural) languages, in particular how to program computers to
process and analyze large amounts of natural language data.

Typically, NLP programs require far more resources than individuals have access to. The MeaningCloud platform has put a public facing API in front of their NLP system. This project uses it to determine various attributes of an article, blog post, or other form of text-based content.

## 2.) Getting started
This project contains a build-tool implementation called **webpack**. For this project to run properly, it is important to first implement the build-tool before starting the project. To achieve this, all required dependencies must be installed. In your terminal, navigate to the root directory of the project and enter the following command:
```bash
npm install
```
Once all packages have been installed, it is recommended to perform a test run to make sure everything is working properly. Use the following command in your terminal for the test run:
```bash
npm run test
```
If the test was successful, it is now time to implement webpack. Use the following command that will create a **dist/prod** folder in your root folder structure together with a *main.js* and *main.css* file.
```bash
npm run build-prod
```
The server now can be started. In order to do so, type the following command in your terminal:
```bash
npm run start
```
Open a browser and connect to *http://localhost:9000*. 

## 3.) Usage
The usage of this app is very simple. Just search for a blog post, article, or any other text-based content that the MeaningCloud API should analyze for you, copy the URL and paste it into the web app. Click on the 'Analyze' button and you will see some attributes displayed once the API has analyzed the text and returned and appropriate evaluation of the sentiment.

## 4.) Meaning of attributes
The result will consist of five different attributes:

| Attribute | Meaning |
| ----------|-----------|
| Status  | Shows if the API request has been successful |
| Polarity | Indicates whether the text communicates a rather positive or negative message (value is either N or P) |
| Subjectivity | Marks the subjectivity of the text (value is either Objective or Subjective) |
| Confidence | Represents the confidence associated with the sentiment analysis performed on the text (integer value from 0 - 100) |
| Text | A sentence that appears in the analyzed URL |