_cmnHideElement("OutputResult");
const objFormula = JSON.parse(formula);
document.getElementById("selectBoxToTemp").value = "Kelvin";

function TemperatureCalculatorFormValidate()
{
    RemoveAllErrorMessage();
    
    var fromLength = document.getElementById("fromTemp").value;

    if(IsInputFieldEmpty("fromTemp") || (isNaN(fromLength) && Number(fromLength) <= 0))
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
        var outputTemp = document.getElementById("outputTemp");
        
        ShowFormula(fromUnit, toUnit);
        
        var result = TempCconverter(inputTemperature,  fromUnit,  toUnit);
        
        outputTemp.value = result.toFixed(2);
        document.getElementById("tempResult").innerHTML = result.toFixed(2);

        //result div show
        _cmnHideElement("OutputInfo");
        _cmnShowElement("OutputResult", "flex");
    }
}

function TempCconverter(inputTemperature,  from_unit,  to_unit)
{
    from_unit = from_unit.toLowerCase();
    to_unit = to_unit.toLowerCase();
    inputTemperature = Number(inputTemperature);
    if (from_unit == "celsius")
    {
        if (to_unit == "kelvin")
        {
            inputTemperature = (inputTemperature + 273.15);
        }
        else if (to_unit == "fahrenheit")
        {
            inputTemperature = (inputTemperature * (9 / 5) + 32);
        }
        else if (to_unit == "rankine")
        {
            inputTemperature = (inputTemperature * 9/5) + 491.67;
        }
    }
    else if (from_unit == "kelvin")
    {
        if (to_unit == "celsius")
        {
            inputTemperature = inputTemperature - 273.15;
        }
        else if (to_unit == "fahrenheit")
        {
            inputTemperature = (inputTemperature - 273.15) * 9/5 - 459.67;
        }
        else if (to_unit == "rankine")
        {
            inputTemperature = inputTemperature * 9/5 + 491.67;
        }
    }
    else if (from_unit == "fahrenheit")
    {
        if (to_unit == "celsius")
        {
            inputTemperature = (inputTemperature - 32) * 5/9;
        }
        else if (to_unit == "kelvin")
        {
            inputTemperature = (inputTemperature + 459.67) * 5/9;
        }
        else if (to_unit == "rankine")
        {
            inputTemperature = inputTemperature + 459.67;
        }
    }
    else if (from_unit == "rankine")
    {
        if (to_unit == "celsius")
        {
            inputTemperature = (inputTemperature - 491.67) * 5/9;
        }
        else if (to_unit == "kelvin")
        {
            inputTemperature = inputTemperature * 5/9;
        }
        else if (to_unit == "fahrenheit")
        {
            inputTemperature = inputTemperature - 459.67;
        }
    }  

    return inputTemperature;
}

function ShowFormula(fromUnit,toUnit)
{
    document.getElementById("tempFormula").innerHTML = "";

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