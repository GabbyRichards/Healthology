window.onload = () => {
    let button = document.querySelector("#btn");
  
    // Function for calculating Water Intake
    button.addEventListener("click", calculateWaterIntake);
};

function calculateWaterIntake() {
    let weight = parseInt(document.querySelector("#weight").value);
    let amount = parseInt(document.querySelector("#quantity").value);
    let result = document.querySelector("#result");

    if(weight === "" || isNaN(weight) || weight < 0) {
        result.innerHTML = "Error: Invalid weight entered.";
    }

    else if(amount === "" || isNaN(amount) || amount < 0) {
        result.innerHTML = "Error: Invalid water consumption value entered.";
    }

    else if(((weight * 0.5) - amount) < 0) {
        let tooMuchWater = ((weight * 0.5) - amount) * -1;
        result.innerHTML = `TOO MUCH WATER: You drank  <span>${tooMuchWater} more ounces of water than daily recommended amount.</span>`;
    }

   
    else {
        let waterIntake = (weight * 0.5) - amount;

        result.innerHTML = `You need to drink  <span>${waterIntake} more ounces of water today.</span>`;
    }
}
