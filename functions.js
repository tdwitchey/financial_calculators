"use strict";
function $(id) {
    return document.getElementById(id);
};

function tabSwitch() {
    var clickedTab = this;
    clickedTab.setAttribute("class", "is-active");
    var otherTabs = $("tabMenu").getElementsByTagName("li");
    for (var i = 0; i < otherTabs.length; i++) {
        if (otherTabs[i] == clickedTab) {

        }
        else {
            otherTabs[i].removeAttribute("class");
        }
    }

    displayCalculator(clickedTab);
}

function displayCalculator(selectedCalculator) {
    //card size based on selected tab
    var cardSize;
    switch(selectedCalculator){
        case $("budgetTab"):
            cardSize = "column is-10"
            break;
        case $("compoundInterestTab"):
            cardSize = "column"
            break;
        case $("debtPayoffTab"):
            cardSize = "column"
            break;
        default:
            cardSize = "column"
            break;
    }
    
    //clear main container
    $("mainContainer").innerHTML = "";
    
    //variables for new title
    var anchor = selectedCalculator.getElementsByTagName("a")[0];
    var title = anchor.innerHTML;
    
    //create h1, give it text, and append to mainContainer
    var changeTitle = document.createElement("h1");
    var node = document.createTextNode(title);
    changeTitle.appendChild(node);
    changeTitle.setAttribute("class", "title");
    var mainContainer = $("mainContainer");
    mainContainer.appendChild(changeTitle);

    //create columns div for formatting
    var createColumns = document.createElement("div");
    createColumns.setAttribute("class", "columns");
    mainContainer.appendChild(createColumns);

    //create column(s) within columns div for card
    var sideColumn1 = document.createElement("div");
    sideColumn1.setAttribute("class", "column");
    var sideColumn2 = document.createElement("div");
    sideColumn2.setAttribute("class", "column");
    var mainColumn = document.createElement("div");
    mainColumn.setAttribute("class", cardSize);
    createColumns.appendChild(sideColumn1);
    createColumns.appendChild(mainColumn);
    createColumns.appendChild(sideColumn2);

    //create card div
    var createCard = document.createElement("div");
    createCard.setAttribute("class", "card");
    mainColumn.appendChild(createCard);
    var cardContent = document.createElement("div");
    cardContent.setAttribute("class", "card-content has-text-left");
    cardContent.setAttribute("id", "mainCardContent");
    createCard.appendChild(cardContent);

    //load card content based on active tab
    if (selectedCalculator == $("compoundInterestTab")) {
        cardContent.appendChild(compoundInterestOption());
    }
    else if(selectedCalculator == $("budgetTab")){
        cardContent.appendChild(budgetOption());
    }
    else if(selectedCalculator == $("debtPayoffTab")){
        cardContent.appendChild(debtPayoffOption());
    }
}

function compoundInterestOption() {
    //create div to hold entire form
    var createForm = document.createElement("div");
    createForm.setAttribute("class", "field");

    //create starting amount label and text input
    var startingAmountLabel = document.createElement("label");
    startingAmountLabel.setAttribute("class", "label");
    startingAmountLabel.appendChild(document.createTextNode("Starting Amount"));
    //-----
    var startingAmountInput = document.createElement("div");
    startingAmountInput.setAttribute("class", "control");
    var startingAmountText = document.createElement("input");
    startingAmountText.setAttribute("class", "input");
    startingAmountText.setAttribute("id", "startingAmountTxt");
    startingAmountText.setAttribute("type", "text");
    startingAmountText.setAttribute("placeholder", "5000");
    startingAmountInput.appendChild(startingAmountText);

    //create years label and text input
    var yearsLabel = document.createElement("label");
    yearsLabel.setAttribute("class", "label");
    yearsLabel.appendChild(document.createTextNode("Years"));
    //-----
    var yearsInput = document.createElement("div");
    yearsInput.setAttribute("class", "control");
    var yearsText = document.createElement("input");
    yearsText.setAttribute("class", "input");
    yearsText.setAttribute("id", "yearsTxt");
    yearsText.setAttribute("type", "text");
    yearsText.setAttribute("placeholder", "10");
    yearsInput.appendChild(yearsText);

    //create APR label and text input
    var aprLabel = document.createElement("label");
    aprLabel.setAttribute("class", "label");
    aprLabel.appendChild(document.createTextNode("APR (%)"));
    //-----
    var aprInput = document.createElement("div");
    aprInput.setAttribute("class", "control");
    var aprText = document.createElement("input");
    aprText.setAttribute("class", "input");
    aprText.setAttribute("id", "aprTxt");
    aprText.setAttribute("type", "text");
    aprText.setAttribute("placeholder", "5");
    aprInput.appendChild(aprText);

    //create additional monthly contributions label and text input
    var addMonthlyLabel = document.createElement("label");
    addMonthlyLabel.setAttribute("class", "label");
    addMonthlyLabel.appendChild(document.createTextNode("Additional Contribution (Monthly)"));
    //-----
    var addMonthlyInput = document.createElement("div");
    addMonthlyInput.setAttribute("class", "control");
    var addMonthlyText = document.createElement("input");
    addMonthlyText.setAttribute("class", "input");
    addMonthlyText.setAttribute("id", "monthlyTxt");
    addMonthlyText.setAttribute("type", "text");
    addMonthlyText.setAttribute("placeholder", "250");
    addMonthlyInput.appendChild(addMonthlyText);

    //create calculate button
    var calculateButton = document.createElement("div");
    var createButton = document.createElement("input");
    createButton.setAttribute("class", "button is-dark");
    createButton.setAttribute("type", "button");
    createButton.setAttribute("value", "Calculate");
    createButton.onclick = function () {
        compoundInterestValidation($("startingAmountTxt").value, $("yearsTxt").value, $("aprTxt").value, $("monthlyTxt").value);
    };
    calculateButton.appendChild(createButton);


    //append (in order) all child elements created above
    createForm.appendChild(startingAmountLabel);
    createForm.appendChild(startingAmountInput);
    createForm.appendChild(yearsLabel);
    createForm.appendChild(yearsInput);
    createForm.appendChild(aprLabel);
    createForm.appendChild(aprInput);
    createForm.appendChild(addMonthlyLabel);
    createForm.appendChild(addMonthlyInput);
    createForm.appendChild(document.createElement("br"));
    createForm.appendChild(calculateButton);

    return createForm;
}

function budgetOption() {
    //create columns div for formatting
    var budgetColumns = document.createElement("div");
    budgetColumns.setAttribute("class", "columns");

    //create column(s) within columns div
    var bColumn1 = document.createElement("div");
    bColumn1.setAttribute("class", "column is-4");
    var bColumn2 = document.createElement("div");
    bColumn2.setAttribute("class", "column is-2");
    var bColumn3 = document.createElement("div");
    bColumn3.setAttribute("class", "column");
    budgetColumns.appendChild(bColumn1);
    budgetColumns.appendChild(bColumn2);
    budgetColumns.appendChild(bColumn3);
    
    //-------------------------------------------------------------
    //budget column 1
    //-------------------------------------------------------------
    var budgetForm = document.createElement("div");
    budgetForm.setAttribute("class", "field");
    
    //create starting amount label and text input
    var incomeLabel = document.createElement("label");
    incomeLabel.setAttribute("class", "label");
    incomeLabel.appendChild(document.createTextNode("Net Income"));
    //-----
    var incomeInput = document.createElement("div");
    incomeInput.setAttribute("class", "control");
    var incomeText = document.createElement("input");
    incomeText.setAttribute("class", "input");
    incomeText.setAttribute("id", "incomeTxt");
    incomeText.setAttribute("type", "text");
    incomeText.setAttribute("placeholder", "40000");
    incomeInput.appendChild(incomeText);
    
    budgetForm.appendChild(incomeLabel);
    budgetForm.appendChild(incomeInput);
    
    bColumn1.appendChild(budgetForm);
    
    //-------------------------------------------------------------
    //budget column 2
    //-------------------------------------------------------------
    var budgetSliders = document.createElement("div");
    budgetSliders.setAttribute("class", "field");
    
    //first slider
    var sliderLabel = document.createElement("label");
    sliderLabel.setAttribute("class", "label");
    sliderLabel.appendChild(document.createTextNode("Slider 1"));
    
    var slider1 = document.createElement("input");
    slider1.setAttribute("type", "range");
    slider1.setAttribute("min", "0");
    slider1.setAttribute("max", "100");
    slider1.setAttribute("value", "33");
    slider1.setAttribute("id", "slider1Range");
    //slider1.setAttribute("disabled", "true");
    
    var sliderSpan = document.createElement("span");
    sliderSpan.innerHTML = slider1.value;

    //second slider
    var sliderLabel2 = document.createElement("label");
    sliderLabel2.setAttribute("class", "label");
    sliderLabel2.appendChild(document.createTextNode("Slider 2"));
    
    var slider2 = document.createElement("input");
    slider2.setAttribute("type", "range");
    slider2.setAttribute("min", "0");
    slider2.setAttribute("max", "100");
    slider2.setAttribute("value", "40");
    slider2.setAttribute("id", "slider2Range");
    //slider2.setAttribute("disabled", "true");
    
    var sliderSpan2 = document.createElement("span");
    sliderSpan2.appendChild(document.createTextNode(slider2.value));
    
    //third slider
    var sliderLabel3 = document.createElement("label");
    sliderLabel3.setAttribute("class", "label");
    sliderLabel3.appendChild(document.createTextNode("Slider 3"));
    
    var slider3 = document.createElement("input");
    slider3.setAttribute("type", "range");
    slider3.setAttribute("min", "0");
    slider3.setAttribute("max", "100");
    slider3.setAttribute("value", "33");
    slider3.setAttribute("id", "slider3Range");
    //slider3.setAttribute("disabled", "true");
    
    var sliderSpan3 = document.createElement("span");
    sliderSpan3.appendChild(document.createTextNode(slider3.value));
    
    //slider functions
    slider1.oninput = function(){
        sliderSpan.innerHTML = slider1.value;
        slider2.value = (100 - slider1.value);
        sliderSpan2.innerHTML = slider2.value;
    }
    slider2.oninput = function(){
        sliderSpan2.innerHTML = slider2.value;
        slider1.value = (100 - slider2.value);
        sliderSpan.innerHTML = slider1.value;
    }
    slider3.oninput = function(){
        sliderSpan3.innerHTML = slider3.value;
    }
    
    budgetSliders.appendChild(sliderLabel);
    budgetSliders.appendChild(slider1);
    budgetSliders.appendChild(sliderSpan);
    budgetSliders.appendChild(sliderLabel2);
    budgetSliders.appendChild(slider2);
    budgetSliders.appendChild(sliderSpan2);
    budgetSliders.appendChild(sliderLabel3);
    budgetSliders.appendChild(slider3);
    budgetSliders.appendChild(sliderSpan3);
    
    bColumn2.appendChild(budgetSliders);
    
    //-------------------------------------------------------------
    //budget column 3
    //-------------------------------------------------------------
    
    return budgetColumns;
}

function debtPayoffOption() {

}

function compoundInterestValidation(startingAmount, years, apr, additional) {
    if (!Number(startingAmount) || !Number(years) || !Number(apr) || !Number(additional)) {
        alert("Please make sure all fields are correct.");
        displayCalculator($("compoundInterestTab"));
    }
    else {
        calculateButton_CompoundInterest($("startingAmountTxt").value, $("yearsTxt").value, $("aprTxt").value, $("monthlyTxt").value);
    }
}

function calculateButton_CompoundInterest(startingAmount, years, apr, additional) {
    $("mainCardContent").innerHTML = "";

    startingAmount = parseFloat(startingAmount);
    years = parseFloat(years);
    apr = parseFloat(apr);
    additional = parseFloat(additional);

    var value = startingAmount;
    for (var i = 1; i <= years; i++) {
        var increment = (value * apr / 100);
        value += increment;
        value += additional * 12;
    }
    value = value.toFixed(2);

    var display = document.createElement("table");
    display.setAttribute("class", "table");
    var tableBody = document.createElement("tbody");
    
    var tableRow_StartingAmt = document.createElement("tr");
    var tableHeader_StartingAmt = document.createElement("th");
    tableHeader_StartingAmt.appendChild(document.createTextNode("Starting Amount"));
    var tableCell_StartingAmt = document.createElement("td");
    tableCell_StartingAmt.appendChild(document.createTextNode("$" + startingAmount));
    tableRow_StartingAmt.appendChild(tableHeader_StartingAmt);
    tableRow_StartingAmt.appendChild(tableCell_StartingAmt);

    var tableRow_Years = document.createElement("tr");
    var tableHeader_Years = document.createElement("th");
    tableHeader_Years.appendChild(document.createTextNode("Years"));
    var tableCell_Years = document.createElement("td");
    tableCell_Years.appendChild(document.createTextNode(years));
    tableRow_Years.appendChild(tableHeader_Years);
    tableRow_Years.appendChild(tableCell_Years);

    var tableRow_APR = document.createElement("tr");
    var tableHeader_APR = document.createElement("th");
    tableHeader_APR.appendChild(document.createTextNode("Interest Rate"));
    var tableCell_APR = document.createElement("td");
    tableCell_APR.appendChild(document.createTextNode(apr + "%"));
    tableRow_APR.appendChild(tableHeader_APR);
    tableRow_APR.appendChild(tableCell_APR);

    var tableRow_Additional = document.createElement("tr");
    var tableHeader_Additional = document.createElement("th");
    tableHeader_Additional.appendChild(document.createTextNode("Additional Contribution"));
    var tableCell_Additional = document.createElement("td");
    tableCell_Additional.appendChild(document.createTextNode("$" + additional));
    tableRow_Additional.appendChild(tableHeader_Additional);
    tableRow_Additional.appendChild(tableCell_Additional);

    var tableRow_Total = document.createElement("tr");
    tableRow_Total.setAttribute("class", "has-background-grey-lighter");
    var tableHeader_Total = document.createElement("th");
    tableHeader_Total.appendChild(document.createTextNode("Total Value"));
    var tableCell_Total = document.createElement("td");
    tableCell_Total.appendChild(document.createTextNode("$" + value));
    tableRow_Total.appendChild(tableHeader_Total);
    tableRow_Total.appendChild(tableCell_Total);

    tableBody.appendChild(tableRow_StartingAmt);
    tableBody.appendChild(tableRow_Years);
    tableBody.appendChild(tableRow_APR);
    tableBody.appendChild(tableRow_Additional);
    tableBody.appendChild(tableRow_Total);

    display.appendChild(tableBody);

    $("mainCardContent").appendChild(display);

    var createArea = document.createElement("div");
    var resetButton = document.createElement("input");
    resetButton.setAttribute("type", "button");
    resetButton.setAttribute("class", "button is-dark");
    resetButton.setAttribute("value", "Reset");
    resetButton.onclick = function () {
        displayCalculator($("compoundInterestTab"));
    }
    createArea.appendChild(resetButton);

    $("mainCardContent").appendChild(createArea);

}

window.onload = function () {
    $("budgetTab").onclick = tabSwitch;
    $("compoundInterestTab").onclick = tabSwitch;
    $("debtPayoffTab").onclick = tabSwitch;
}




