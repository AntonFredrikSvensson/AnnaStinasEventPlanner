
//deklarerar eventTable som en variabel. Det i den här tabellen som vi sedan ska fylla på med event som Anna-Stina skapar upp
const eventTable = document.getElementById("eventTableBody")

/* skapade en funktion för att lägga till event i tabellen. tar med de lika kolumnerna som parametrar. Dessa måsta alltså finnas med 
för att man ska kunna köra funktionen.*/
function addEvent(eventName, invited, replies, accepted, bestDates) {

	const text =  `<tr>
					<td>${eventName}</td>
					<td>${invited}</td>
					<td>${replies}</td>
					<td>${accepted}</td>
					<td>${bestDates}</td>
				  </tr>`
							
	const position = "beforeend";

	eventTable.insertAdjacentHTML(position, text);
}

/*kör funktionen tre gånger för att fylla tabellen med dummy-data. Denna data kommer vi senare att plocka bort när vi börjar använda 
funktion på riktigt. FUnktionen kommer då att användas på två sätt. Dels hämta data från databasen för event som har skapats vid tidigare
sessioner och dels för att trigga så att nya events läggs till när AS skapar dem*/
addEvent("Familjesemester", 7, 5, 5, "2019-07-26 - 2019-07-29")

addEvent("Anton och Mias flytt", 7, 5, 5, "2019-08-03 - 2019-08-03")

addEvent("Släktträff", 17, 8, 6, "2019-10-05 - 2019-10-05")