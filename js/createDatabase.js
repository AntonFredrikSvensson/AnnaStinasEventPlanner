
/* 
Pre-req
- NodeJS installerat
- XAMPP installerat

1. Öppna CMD eller GIT Bash som terminal
2. Gå till foldern där du har ditt projekt
3. Kör "NPM init" - för att skapa Json package där våra dependencies alltså vilka versioner vi är beroende avd
  "name": "annastinaseventplanner",
  "version": "1.0.0",
  "description": "App for planning and inviting to events",
  "main": "js/createDatabase.js",
  -klicka förbi resten
4. Kör "NPM install --save mysql express" - detta installerar mySQL (database) och express (webserver) + lägger till dem som dependencies i JSON-filen
5. Kör "Npm install -g nodemon" - så slipper du starta om webservern varje gång du gjort en ändring
6. Starta nodemon genom att skriva i "nodemon" i terminalen
7. Öppna en webbrowser och gå till http://localhost:3000/ - JS filen körs nu i webbrowsern. Du bör nu få ett meddelande som säger Cannot GET /, detta beror
att vi inte har skapat någon databas ännu. Om du inte får detta meddelande är det något som är fel. Kolla vad du får för meddelande i terminalen 
eller öppna consolen i webbrowsern för att se vad du får för felmeddelande
8. Starta XAMPP, aktivera Apache (webserver för databasen) och MySQL (databasen)
9. Öppna "http://localhost/phpmyadmin/" i en ny tab i webbrowser. Här kommer du kunna se databasen när vi har skapat upp den. 
10. Gå tillbaka till "http://localhost:3000/", lägg till /createdb i adressfönstret. (använd endast 1 /). Du bör nu fått ett meddelande i browsern 
om att databasen är uppskapad. Om du kollar i terminalen kommer den innehåll info om paketet som har skapats upp. Om du byter tab och refreshar bör 
du nu se annastinaseventplannerdb som en databas i listan
11. ta bort kommenteringen till annastinaseventplannerdb i createDatabse.js-filen under create connection så att scriptet vet om vilken databas den 
ska koppla upp mot. 
12. Kör /createtable på samma sätt. Gå till "http://localhost/phpmyadmin/" och kolla så att tabellen har skapats upp
13. Kör /addpost för att lägga til ett event i tabellen, Gå till "http://localhost/phpmyadmin/" och kolla så posten har lagts till i tabellen
14. Ändra uppgifterna i app.get('/addpost'... i createDatabase.js till ett annat event och kör /addpost på nytt i browsern
*/



const express = require('express');
const mysql = require('mysql');

//create connection
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  //password : 'secret',
  database : 'annastinaseventplannerdb'
});

//connect
db.connect((err) => {
if (err) {
	throw err;
}
console.log('MySql Connected.....')
});

const app = express();

// Create DB
app.get('/createdb',(req, res) =>{
	let sql = 'CREATE DATABASE annastinaseventplannerdb';
	db.query(sql, (err,result) =>{
		if (err) throw err;
		console.log(result);
		res.send('database created...');
	});
});

// Create table
app.get('/createtable', (req,res) => {
	let sql = 'CREATE TABLE events(id int AUTO_INCREMENT, eventname VARCHAR(255), invited VARCHAR(255), replies INTEGER, accepted INTEGER, bestdate VARCHAR(255), PRIMARY KEY (id))';
	db.query(sql,(err, result) =>{
		if (err) throw err;
		console.log(result);
		res.send('Table created.....');
	});
});

// insert post 1
app.get('/addpost', (req, res) =>{
	let post = {
		eventname: 'Anton och Mias flytt',
		invited: 6,
		replies: 6,
		accepted: 4,
		bestdate: "2019-08-03 - 2019-08-03"
	};
	let sql = 'INSERT INTO events SET ?';
	let query = db.query(sql, post, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send('Post added.....');
	});
});



app.listen('3000', () => {
	console.log('Server started on port 3000');
});
