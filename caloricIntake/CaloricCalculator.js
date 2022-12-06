document.getElementById('calorie-form').addEventListener('submit', function(e)
{
    document.getElementById('results').style.display = 'none';
  
    document.getElementById('loading').style.display = 'block';
  
    setTimeout(calculateCalories, 2000); //set timeout for error
  
    e.preventDefault();
});
  
  function calculateCalories(e) 
  {
    const weight = document.getElementById('weight'); //weight element variable
    const height = document.getElementById('height'); //height element variable
    const age = document.getElementById('age'); //age element variable
    const gender = document.querySelector('input[name="customRadioInline1"]:checked'); //gender element variable
    const totalCalories = document.getElementById('total-calories'); //sun of total calories variable
    
    
    if (age.value === '' || weight.value === '' || height.value === '' ||  age.value > 80 || age.value < 15) 
    {
      errorMessage('Please make sure the values you entered are correct') //Displays error if user does not input variable
    } 
    else if(gender.id === 'male')  //male gender Harris Benedict equation
    {
      totalCalories.value = (88.362 + (13.397 * parseFloat(weight.value)) + (4.799 * parseFloat(height.value)) - (5.677 * parseFloat(age.value)));
    } 
    else if(gender.id === 'female') //female gender Harris Benedict equation
    {
      totalCalories.value = (447.593 + (9.247 * parseFloat(weight.value)) + (3.098 * parseFloat(height.value)) - (4.330 * parseFloat(age.value)));
    }
  
    document.getElementById('results').style.display = 'block'; //displays results
  
    document.getElementById('loading').style.display = 'none'; //displays loading sequence
  }
  
  
  function errorMessage(error)  //error catching
  {
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
    const errorDiv = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    errorDiv.className = 'alert';
    errorDiv.appendChild(document.createTextNode(error));
    card.insertBefore(errorDiv, heading);
    setTimeout(clearError, 4000);
  }
    
  function clearError() //clear error
  {
    document.querySelector('.alert').remove();
  }