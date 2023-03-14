// Jonathan Rene
// Javascript Code

// This automatically focuses on the name field when the page first loads. 
document.getElementById("name").focus();

// This automatically makes the "other job role" text field hidden when the page first loads. 
document.getElementById("other-job-role").style.display = 'none';

// This detects if the user has selected "other" for his or her job role.
// If so, the "other job role" text field becomes visible
document.getElementById("title").addEventListener('change', (e) => {
    if (e.target.value === "other") {
        document.getElementById("other-job-role").style.display = 'block';
    } else{
        document.getElementById("other-job-role").style.display = 'none';
    }
})

// This automatically disables the t-shirt color selection element when the page first loads.
document.getElementById("color").disabled = true;

// This detects for change in the design selection method
document.getElementById("design").addEventListener('change', (e) => {
    // Enables t-shirt color selection method
    document.getElementById("color").disabled = false;

    // Sets color choice back to default (I created this default)
    document.getElementById('color').value = "Select T-shirt Color";

    // This determines which color options to be shown for t-shirt color based on design user selects. 
    // This shows color options if user selects I "heart" JS Puns
    if (document.getElementById("design").value === "js puns"){
        let colors = document.getElementById('color').children;
        for(let i=0; i < colors.length; i++){
            if (colors[i].value === "cornflowerblue" || colors[i].value === "darkslategrey" || colors[i].value === "gold"){
                colors[i].hidden = false;
            }
            else{
                colors[i].hidden = true;
            }
        }
    // This shows color options if user selects I "heart" JS. 
    } else{
        let colors = document.getElementById('color').children;
        for(let i=0; i < colors.length; i++){
            if (colors[i].value === "tomato" || colors[i].value === "steelblue" || colors[i].value === "dimgrey"){
                colors[i].hidden = false;
            }
            else{
                colors[i].hidden = true;
            }
        }
    }
})

 // creates a list of references to all activity labels.
let activitiesLabels = document.getElementById('activities-box').getElementsByTagName('label');

// This is used to keep track of total cost for all acitivities. 
let total_cost = 0;

// Adds event listeners to all activity labels. Listens for clicks. (Indicates user has chosen this activity)
for (let i=0; i < activitiesLabels.length; i++){
    activitiesLabels[i].addEventListener('click', (e)=>{
        e.preventDefault(); // prevents default actions of clicking on label or any elements in label
        let checkbox = activitiesLabels[i].getElementsByTagName('input')[0]; // creates reference to input box in activity label
        
        // Checks if activity has been previously selected. If so, the activity will be deselected, and total cost will update. 
        if(checkbox.checked === true){
            checkbox.checked = false;
            total_cost -= parseInt(checkbox.getAttribute('data-cost'));
            document.getElementById("activities-cost").innerHTML = `Total: $${total_cost}`;
        } else{
            checkbox.checked = true;
            total_cost += parseInt(checkbox.getAttribute('data-cost'));
            document.getElementById("activities-cost").innerHTML = `Total: $${total_cost}`;
        }
    })
}

// This makes the credit card payment option the default payment option when the page first loads. 
document.getElementById('payment').value = 'credit-card';

// This hides Paypal and Bitcoin payment options when the page first loads.
document.getElementById("paypal").style.display = 'none';
document.getElementById("bitcoin").style.display = 'none';

// This detects if the user has changed payment method and displays corresponding payment method details
document.getElementById('payment').addEventListener('change', (e) => {
    if (e.target.value === "credit-card"){
        document.getElementById('credit-card').style.display = 'block';
        document.getElementById('paypal').style.display = 'none';
        document.getElementById('bitcoin').style.display = 'none';
    } else if (e.target.value === "paypal") {
        document.getElementById('credit-card').style.display = 'none';
        document.getElementById('paypal').style.display = 'block';
        document.getElementById('bitcoin').style.display = 'none';
    } else{
        document.getElementById('credit-card').style.display = 'none';
        document.getElementById('paypal').style.display = 'none';
        document.getElementById('bitcoin').style.display = 'block';
    }
})

// Form validation functions.

// This is a function used to validate if a user has entered a valid name in the form
// Returns true if name is valid and returns false if otherwise
function validName(){
    let userName = document.getElementById('name').value;
    const nameRegex = /(.|\s)*\S(.|\s)*/;
    if (nameRegex.test(userName) === false){
        return false;
    }
    return true;
}

// This function validates if user entered a valid email in the form
// Return true if email is valid and returns false if otherwise.
function validEmail(){
    let userEmail = document.getElementById('email').value;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(userEmail) === false){
        return false;
    }
    return true;
}

// This function validates if user has selected at least one activity.
// Returns true if at least one actvitiy is selected and returns false if otherwise. 
function actvitiySelected(){
    let activities = document.getElementById('activities').getElementsByTagName('label');

    for (let i=0; i < activities.length ;i++){
        if (activities[i].firstElementChild.checked === true){
            return true;
        }
    }
    return false;
}

// This function validates credit card number.
// Returns true if card number is valid and false if otherwise. 
function validCardNumber(){
    let cardRegex = /^[0-9]{13,16}$/; // Regex to validate card number
    if (cardRegex.test(document.getElementById('cc-num').value.replace(/\s*$/,"")) === false){
        return false;
    }
    return true;
}

// This function validates zip code.
// Returns true if zip code is valid and false if otherwise. 
function validZip(){
    let zipCodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/; // Regex to validate zip code
    if (zipCodeRegex.test(document.getElementById('zip').value.replace(/\s*$/,"")) === false){
        return false;
    }
    return true;
}

// This function validates CVV card number.
// Returns true if CVV number is valid and false if otherwise. 
function validCVV(){
    let cvvRegex = /^[0-9]{3}$/; // Regext to validate cvv
    if (cvvRegex.test(document.getElementById('cvv').value.replace(/\s*$/,"")) === false){
        return false;
    }
    return true;
}

// Form validation
// Validates all data user entered in form
document.getElementsByTagName('form')[0].addEventListener('submit', (e) =>{
    
    // Validates name user has entered after submission
    let userName = document.getElementById('name').value;
    const nameRegex = /(.|\s)*\S(.|\s)*/;
    if (nameRegex.test(userName) === false){
        document.getElementById('name').parentElement.classList.add('not-valid');
        document.getElementById('name').parentElement.classList.remove('valid');
        document.getElementById('name-hint').style.display = 'block';
        e.preventDefault();
    }else{
        document.getElementById('name').parentElement.classList.remove('not-valid');
        document.getElementById('name').parentElement.classList.add('valid');
        document.getElementById('name-hint').style.display = 'none';
    }

    // Validates email user has entered after submission
    let userEmail = document.getElementById('email').value;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(userEmail) === false){
        document.getElementById('email').parentElement.classList.add('not-valid');
        document.getElementById('email').parentElement.classList.remove('valid');
        document.getElementById('email-hint').style.display = 'block';
        e.preventDefault();
    } else{
        document.getElementById('email').parentElement.classList.remove('not-valid');
        document.getElementById('email').parentElement.classList.add('valid');
        document.getElementById('email-hint').style.display = 'none';
    }

    // Validates user has selected at least one activity
    if (actvitiySelected() === false){
        document.getElementById('activities').classList.add('not-valid');
        document.getElementById('activities').classList.remove('valid');
        document.getElementById('activities-hint').style.display = 'block';
        e.preventDefault();
    }else{
        document.getElementById('activities').classList.remove('not-valid');
        document.getElementById('activities').classList.add('valid');
        document.getElementById('activities-hint').style.display = 'none';
    }
    
    // Validates credit card information is valid if it's selected form of payment
    if (document.getElementById('payment').value === 'credit-card'){
        // Validates credit card number
        if (validCVV() === false || validCardNumber() === false || validZip() === false){
            document.getElementById('credit-card').parentElement.classList.add('not-valid');
            document.getElementById('credit-card').parentElement.classList.remove('valid');

            if (validCardNumber() === false){
                document.getElementById('cc-hint').style.display = 'block';
            }else{
                document.getElementById('cc-hint').style.display = 'none';
            }

            if (validZip() === false){
                document.getElementById('zip-hint').style.display = 'block';
            }else{
                document.getElementById('zip-hint').style.display = 'none';
            }

            if (validCVV() === false){
                document.getElementById('cvv-hint').style.display = 'block';
            }else{
                document.getElementById('cvv-hint').style.display = 'none';
            }

            e.preventDefault();
        } else{
            document.getElementById('cc-hint').style.display = 'none';
            document.getElementById('zip-hint').style.display = 'none';
            document.getElementById('cvv-hint').style.display = 'none';
            document.getElementById('credit-card').parentElement.classList.remove('not-valid');
            document.getElementById('credit-card').parentElement.classList.add('valid');
        }
    }

})


