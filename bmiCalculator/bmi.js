/*
here is the signal for the function to start. 
It will detect the button from index.html being clicked 
*/
window.onload = () => {
    let button = document.querySelector("#btn")
    button.addEventListener("click", calculateBMI)
}

//this is the function that wil calculate the bmi of a user
function calculateBMI(){
    //these are the height and weight variables that are used for the Bmi formula
    let height = parseInt(document.querySelector("#height").value)
    let weight = parseInt(document.querySelector("#weight").value)

    //this is the variable that represents the result displayed on the screen
    let result = document.querySelector("#result")

    //this will check whether the height and weight values are valid
    if(height == "" || height <= 0 || isNaN(height)){
        result.innerHTML = "Provide a valid height in cm."
    }
    else if(weight == "" || weight <= 0 || isNaN(weight)){
        result.innerHTML = "Provide a valid weight in lbs."
    }
    //this is the calculated bmi 
    let bmi = ((weight/2.205)/((height*height)/10000)).toFixed(2)
    //the following if-statements will check the range that the bmi falls into
    //and will tell the user where their bmi lies in (the category)
    if(bmi < 16.00){
        result.innerHTML = `Severely Underweight: <span>${bmi}</span>`
    }
    else if(bmi <= 18.4){
        result.innerHTML = `Underweight: <span>${bmi}</span>`
    }
    else if(bmi <= 24.9){
        result.innerHTML = `Normal: <span>${bmi}</span>`
    }
    else if(bmi <= 29.9){
        result.innerHTML = `Overweight: <span>${bmi}</span>`
    }
    else if(bmi <= 34.9){
        result.innerHTML = `Moderately Obese: <span>${bmi}</span>`
    }
    else if(bmi <= 39.9){
        result.innerHTML = `Severely Obsese: <span>${bmi}</span>`
    }
    else {
        result.innerHTML = `Morbidly Obese: <span>${bmi}</span>`
    }
}



