window.onload = () => {
    let button = document.querySelector("#btn");
  
    // Function for calculating Water Intake
    button.addEventListener("click", calculateWaterIntake);
};

// This function calculates water intake

function calculateWaterIntake() {
    
    //Weight variable
    let weight = parseInt(document.querySelector("#weight").value);

    //This variable holds the amount of water a user drank
    let amount = parseInt(document.querySelector("#quantity").value);

    //Variable holds the result
    let result = document.querySelector("#result");

    //Checks to ensure user enters a vaild weight

    if(weight == "" || weight < 0 || isNaN(weight)) {
        result.innerHTML = "Error: Invalid weight entered.";
    }

    //Checks to ensure user enters a valid water consumption value

    else if(amount == "" || amount < 0 || isNaN(amount)) {
        result.innerHTML = "Error: Invalid water consumption value entered.";
    }
    
    //Checks to ensure user has not drank over the recommended daily amount

    else if(((weight * 0.5) - amount) < 0) {
        let tooMuchWater = ((weight * 0.5) - amount) * -1;
        result.innerHTML = `TOO MUCH WATER: You drank  <span>${tooMuchWater} more ounces of water than daily recommended amount.</span>`;
    }

    
    //If all is well, computes how many more ounces of water a user needs to drink today

    else {
        let waterIntake = (weight * 0.5) - amount;

        result.innerHTML = `You need to drink  <span>${waterIntake} more ounces of water today.</span>`;
    }
}
