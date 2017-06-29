// function to calculate amount to save to have desired balance
function evaluateAmount (obj) {
    let amountText = "";
    const q = 1 + obj.rate; // count q; pass in r in % ie 3 %;
    let amount = 0;
    if (obj.type === 0) {
        amount = (obj.saved * Math.pow(q, obj.period)) / ((Math.pow(q, obj.period) - 1 )/ (q - 1));
        amountText = "You can withdraw " + parseFloat(amount).toFixed(2) + " a year";
    }
    else {
        amount = (obj.saved) / ((Math.pow(q, obj.period) - 1 )/ (q - 1));
        amountText = "You have to save " + parseFloat(amount).toFixed(2) + " a year to have " + obj.saved;
    }
    return amountText; 
}
// function to calculate saved amount when saving passed in amount
function evaluateSaved (obj) {
    let savedText = "";
    const q = 1 + obj.rate;
    let saved = 0;
    if (obj.type === 0) {
        saved = obj.amount * ((Math.pow(q, obj.period) - 1 )/ ((q - 1) * Math.pow(q, obj.period)));
        savedText = "You have to have " + parseFloat(saved).toFixed(2) + " to withdraw " + obj.amount + " a year";
    }
    else {
        saved = obj.amount * ((Math.pow(q, obj.period) - 1 )/ (q - 1));
        savedText = "You will have " + parseFloat(saved).toFixed(2) + " when saving " + obj.amount + " a year";
        }
    return savedText;
}

// model - values are added after pressing OK on the inputs.
let model = {
    period: null,
    rate: null,
    amount: null,
    saved: null,
    type: null
};

// handlers object that add values to the model object - handles interaction between model object and the DOM
let handlers = {
    addPeriod: function() {
        let period = document.getElementById("addPeriod");
        if (period !== "") {
            model.period = Number(period.value);
        }
        view.displayObj();
    },
    addRate: function() {
        let rate = document.getElementById("addRate");
        if (rate !== "") {
            model.rate = Number(rate.value/100);
        }
        view.displayObj();
    },
    addAmount: function() {
        let amountToSave = document.getElementById("addAmountToSave");
        if (amountToSave !== "") {
            model.amount = Number(amountToSave.value);
        }
        view.displayObj();
    },
    addSaved: function() {
        let saved = document.getElementById("addSaved");
        if (saved !== "") {
            model.saved = Number(saved.value);
        }
        view.displayObj();
    },
    defineType: function(){
        let selection = document.getElementById("mySelect");
        selection.addEventListener("click", function(event) {
        model.type = event.toElement.index;
        view.displayObj();
        });
    },
};

// view object that prints out the current state of the model object.
let view = {
    displayObj: function() {
        let displayDiv = document.querySelector("ul");
        displayDiv.innerHTML = "";
        for (let key in model) {
            let liElem = document.createElement("li");
            liElem.textContent = key + " is " + model[key];
            displayDiv.appendChild(liElem);
        }
    }
};

handlers.defineType();
// let selection = document.getElementById("mySelect");
// let toBeEvaluated = "";

// evaluate button that calls desired function based on what is missing in the model object.
let evaluate = document.getElementById("evaluate");
evaluate.addEventListener("click", function() {
    let result = document.querySelector("#result");
    let p = document.createElement("p");
    result.innerHTML = "";
    if (model.type !== null) {
        if (model.amount === null) {
                let amount = evaluateAmount(model);
                p.textContent = amount;
            } 
            else if (model.saved === null) {
                let saved = evaluateSaved(model);
                p.textContent =  saved;
            }
     }
    else {
        p.textContent = "You need to input amount to save or desired amount and select type!"
    }
    result.appendChild(p);
});


