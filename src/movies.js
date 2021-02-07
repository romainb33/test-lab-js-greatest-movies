
// Iteration 1: All directors? - Get the array of all directors.
function getAllDirectors(arr) {
    let listOfDirectors = arr.map( movie => movie.director)
    let filteredDirectors =  listOfDirectors.filter((director, i) => listOfDirectors.indexOf(director) === i);
    return filteredDirectors
}
// _Bonus_: It seems some of the directors had directed multiple arr so they will pop up multiple times in the array of directors. How could you "clean" a bit this array and make it unified (without duplicates)?
function uniquifyList(arr) {
    let listOfDirectors = arr.map( movie => movie.director)
    let uniqDirectors = listOfDirectors.filter( (director, index) => listOfDirectors.indexOf(director) === index)
    return uniqDirectors;
}
// Iteration 2: Steven Spielberg. The best? - How many drama arr did STEVEN SPIELBERG direct?
function howManyMovies(arr) {
    if (arr.length === 0 ) return 0;
    let dramaWithSteven = arr.filter( movie => {
    return movie.director === "Steven Spielberg" && movie.genre.indexOf('Drama') !== -1
    });
    return dramaWithSteven.length;
}
// Iteration 3: All rates average - Get the average of all rates with 2 decimals
function ratesAverage(arr) {
    if (arr.length === 0 ) return 0;
    let rates = arr.map(movie => {
        if (isNaN(movie.rate) || movie.rate === undefined || typeof movie.rate === "string") {
          return 0;
        } else {
          return movie.rate;
        }
    });
    let totalRates = rates.reduce( (acc, rate) => { return acc + rate},0);
    let averageRate = Number((totalRates / arr.length).toFixed(2))
    return averageRate;
}
// Iteration 4: Drama arr - Get the average of Drama arr
function dramaMoviesRate(arr) {
    let allDramaMovies = arr.filter( movie => movie.genre.indexOf('Drama') !== -1 );
    return ratesAverage(allDramaMovies);
}
// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(arr) {
    let newArr = [... arr];
    let moviesByYear = newArr.sort( (movie1, movie2) => {
        if (movie1.year > movie2.year || (movie1.year === movie2.year && movie1.name > movie2.name) )  return 1
        else return -1;
    });
    return moviesByYear
}
// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(arr) {
    //extraire les titles
    let allTitles = arr.map(movie => movie.title)
    let moviesByName = allTitles.sort( (movie1, movie2) => {
        if (movie1 > movie2 )  return 1
        else return -1;
    });
    if ( moviesByName.length > 20 ) {
        return moviesByName.splice(0, 20);
    }
    return moviesByName
}
// BONUS - Iteration 7: Time Format - Turn duration of the arr from hours to minutes

function turnHoursToMinutes(arr) {
   let newArr = arr.map( movie => {
       return {
            ...movie,
            duration: doTurnHoursToMinutes(movie.duration)
       }
   })
   
   return newArr
}  

function doTurnHoursToMinutes(duration) {

    // Split duration into an array ["X", "XXmin"]
    let splitHours = duration.split("h ")
    let minutes = 0;
    // If duration = "Xh" "XXmin" => .length = 2 // If duration = "Xh" || "XXmin" => .length = 1
    if (splitHours.length === 1) {
        if (duration.includes("min")) {
            minutes += parseInt(splitHours[0])
        } else {
            minutes += parseInt(splitHours[0])*60;
        }
    }
    else {
        minutes += parseInt(splitHours[1])
        minutes += parseInt(splitHours[0])*60
    }
    return minutes;

    // // SOLUTION 2
    // let durationWithoutSpace = duration.replace(/\s/g, '')
    // let hours = "";
    // let minutes = "";
    // let hoursDone = false;
    // if (durationWithoutSpace.includes("h") && durationWithoutSpace.includes("min") ) {
    //     for (let i = 0; i < durationWithoutSpace.length; i++) {
    //         if (!hoursDone && durationWithoutSpace[i] !== "h" ) {
    //             hours += duration[i];
    //         } else if (durationWithoutSpace[i] === "h" ) {
    //             hoursDone = true;
    //         }
    //         else if (hoursDone && durationWithoutSpace[i] !== "m") {
    //             minutes += durationWithoutSpace[i];
    //         } else {
    //             break;
    //         }
    //     }
    // } else if (durationWithoutSpace.includes("h") && !durationWithoutSpace.includes("min")) {
    //     for (let i = 0; i < durationWithoutSpace.length; i++) {
    //         if (durationWithoutSpace[i] !== "h" ) {
    //             hours += durationWithoutSpace[i];
    //             minutes += "0"
    //         }
    //     }        
    // } else {
    //     for (let i = 0; i < durationWithoutSpace.length; i++) {
    //         if (durationWithoutSpace[i] !== "m") {
    //             minutes += durationWithoutSpace[i];
    //             hours += "0"
    //         } else {
    //         break;
    //         }
    //     }
    // }
    // let minutesInt = parseInt(minutes);
    // let hoursInt = parseInt(hours);
    // return minutesInt += hoursInt*60
}

// BONUS - Iteration 8: Best yearly rate average - Best yearly rate average
function bestYearAvg(arr) {
    if (arr.length === 0) return null;

    let ratesPerYear = {}
    // Create an object with key = year / value = [all the rates]
    arr.forEach(element => {
        if (element.year in ratesPerYear) {
            ratesPerYear[element.year].push(element.rate)
            // add element.rate
        } else {
            ratesPerYear[element.year] = [element.rate]
        }
    });

    // Calculate the best year and 
    let bestYear = 0
    let bestYearAvgRate = 0

    for (const [year, rates] of Object.entries(ratesPerYear)) {
        let totalRates = rates.reduce((sum, rate) => sum + rate)
        let yearAvgRate = totalRates / rates.length

        if (yearAvgRate > bestYearAvgRate) {
            bestYear = year
            bestYearAvgRate = yearAvgRate
        }
    }

    let result = `The best year was ${bestYear} with an average rate of ${bestYearAvgRate}`
    return result;
}