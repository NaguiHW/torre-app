# Torre App

## Contributors
**[Kalib Hackin](https://github.com/NaguiHW)**<br>
naguihw@gmail.com

## Live Demo
https://torre-app.web.app/

## Screenshots
![Home](screenshots/home.jpg?raw=true "Home")
![Jobs](screenshots/jobs.png?raw=true "Jobs")
![Job Detail](screenshots/jobdetail.png?raw=true "Job Detail")
![Professionals](screenshots/professionals.png?raw=true "Professionals")
![Professional Detail](screenshots/professionaldetail.png?raw=true "Professional Detail")

## Download and Installation

You can clone the project using the following command in your terminal:
```
git clone git@github.com:NaguiHW/torre-app.git
```
Now, `cd torre-app/` and before to start to install the dependencies:
```
npm install
```
or
```
yarn install
```
Now we have to install the server:
```
cd functions/
```
and now install the dependencies:
```
npm install
```

## Available Scripts

In the project directory, you can run:

`npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

To run the server you have to change to the `functions` directory:
```
cd functions/
```
and run the following command:
```
firebase emulators:start
```
**Important**

By default, the url base in `axios` is the live server, but if you want to use the local server, you have to comment the `url` and uncomment the commented in the `axios.js` file that is in the `src/` folder.

## Future features
- Dark mode.
- Mobil version.
- Fix some errors in the pagination options.

## Built with
- ReactJS
- Axios
- Firebase
- ExpressJS