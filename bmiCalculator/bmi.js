window.onload = () => {
    let button = document.querySelector("#btn")
    button.addEventListener("click", calculateBMI)
}

function calculateBMI(){
    let height = parseInt(document.querySelector("#height").value)
    let weight = parseInt(document.querySelector("#weight").value)

    let result = document.querySelector("#result")

    if(height == "" || height <= 0 || isNaN(height)){
        result.innerHTML = "Provide a valid height in cm."
    }
    else if(weight == "" || weight <= 0 || isNaN(weight)){
        result.innerHTML = "Provide a valid weight in lbs."
    }
    let bmi = ((weight/2.205)/((height*height)/10000)).toFixed(2)
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



