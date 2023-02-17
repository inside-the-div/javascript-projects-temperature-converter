const objFormula = JSON.parse(formula);

_cmnHideElement("OutputResult");

// set default value to select box
document.getElementById("selectBoxToTemp").value = "Kelvin";

function TemperatureCalculatorFormValidate()
{
    RemoveAllErrorMessage();
    
    var fromTemperature = document.getElementById("fromTemp").value;
    if(fromTemperature == "" || isNaN(fromTemperature) || (!isNaN(fromTemperature) && Number(fromTemperature) <= 0))
    {
        ShowErrorMessageBottomOfTheInputFiled("fromTemp", "Enter valid temperature.");
        return false;
    }

    return true;
}

function TemperatureCalculatorReset()
{
    document.getElementById("fromTemp").value = "";
    document.getElementById("selectBoxToTemp").value = "Kelvin";
    document.getElementById("selectBoxFromTemp").value = "Celsius";
    document.getElementById("outputTemp").value = "";
    
    RemoveAllErrorMessage();

    _cmnHideElement("OutputResult");
    _cmnShowElement("OutputInfo", "flex");
}

function TemperatureCalculation()
{
    if(TemperatureCalculatorFormValidate())
    {
        var fromUnit = document.getElementById("selectBoxFromTemp").value;
        var toUnit = document.getElementById("selectBoxToTemp").value;
        var inputTemperature = document.getElementById("fromTemp").value;
        var outputTemperature = document.getElementById("outputTemp");
        
        ShowFormula(fromUnit, toUnit);
        
        var result = ConverterTemperature(inputTemperature,  fromUnit,  toUnit);
        
        outputTemperature.value = result.toFixed(2);
        document.getElementById("tempResult").innerHTML = result.toFixed(2); 

        //result div show
        _cmnHideElement("OutputInfo");
        _cmnShowElement("OutputResult", "flex");
    }
}

function ConverterTemperature(inputTemperature,  fromUnit,  toUnit)
{
    fromUnit = fromUnit.toLowerCase();
    toUnit = toUnit.toLowerCase();
    inputTemperature = Number(inputTemperature);
    var outputTemperature;

    if (fromUnit == "celsius")
    {
        if (toUnit == "kelvin")
        {
            outputTemperature = (inputTemperature + 273.15);
        }
        else if (toUnit == "fahrenheit")
        {
            outputTemperature = (inputTemperature * (9 / 5) + 32);
        }
        else if (toUnit == "rankine")
        {
            outputTemperature = (inputTemperature * 9/5) + 491.67;
        }
    }
    else if (fromUnit == "kelvin")
    {
        if (toUnit == "celsius")
        {
            outputTemperature = inputTemperature - 273.15;
        }
        else if (toUnit == "fahrenheit")
        {
            outputTemperature = (inputTemperature - 273.15) * 9/5 - 459.67;
        }
        else if (toUnit == "rankine")
        {
            outputTemperature = inputTemperature * 9/5 + 491.67;
        }
    }
    else if (fromUnit == "fahrenheit")
    {
        if (toUnit == "celsius")
        {
            outputTemperature = (inputTemperature - 32) * 5/9;
        }
        else if (toUnit == "kelvin")
        {
            outputTemperature = (inputTemperature + 459.67) * 5/9;
        }
        else if (toUnit == "rankine")
        {
            outputTemperature = inputTemperature + 459.67;
        }
    }
    else if (fromUnit == "rankine")
    {
        if (toUnit == "celsius")
        {
            outputTemperature = (inputTemperature - 491.67) * 5/9;
        }
        else if (toUnit == "kelvin")
        {
            outputTemperature = inputTemperature * 5/9;
        }
        else if (toUnit == "fahrenheit")
        {
            outputTemperature = inputTemperature - 459.67;
        }
    }  

    return outputTemperature;
}

function ShowFormula(fromUnit,toUnit)
{

    for(var i = 0; i < (objFormula.conversions.length) - 1; i++)
    {            
        if(
            objFormula.conversions[i].from.toLowerCase() == fromUnit.toLowerCase() 
            && objFormula.conversions[i].to.toLowerCase() == toUnit.toLowerCase()
            )
        {
            document.getElementById("tempFormula").innerHTML = objFormula.conversions[i].formula;
        }
    }
}