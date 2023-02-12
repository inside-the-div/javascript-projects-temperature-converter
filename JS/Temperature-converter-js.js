document.getElementById("selectBoxToTemp").value = "Kelvin";
document.getElementById("OutputResult").style = "display: none";
document.getElementById("OutputInfo").style = "display: flex";

function TemperatureCalculatorFormValidate()
{
    RemoveAllErrorMessage();
    var fromLength = document.getElementById("fromTemp").value;

    if(IsInputFieldEmpty("fromTemp"))
    {
        ShowErrorMessageBottomOfTheInputFiled("fromTemp", "Enter temperature.");
        return false;
    }
    else if(isNaN(fromLength))
    {
        ShowErrorMessageBottomOfTheInputFiled("fromTemp", "Enter valid temperature.");
        return false;
    }
    
    if(parseFloat(fromLength) < 1)
    {
        ShowErrorMessageBottomOfTheInputFiled("fromLength", "Enter valid temperature.");
        return false;
    }
    
    return true;
}

function TemperatureCalculatorReset()
{
    document.getElementById("fromTemp").value = "";
    document.getElementById("selectBoxToTemp").value = "Kelvin";
    document.getElementById("outputTemp").value = "";
    document.getElementById("tempFormula").innerHTML = "";
    document.getElementById("tempResult").innerHTML = "00.00";
    RemoveAllErrorMessage();
}

function TemperatureCalculation()
{
    if(TemperatureCalculatorFormValidate())
    {
        var count = 0;
        var fromUnit = document.getElementById("selectBoxFromTemp").value;
        var toUnit = document.getElementById("selectBoxToTemp").value;
        var inputTemperature = document.getElementById("fromTemp").value;
        var outputTemp = document.getElementById("outputTemp");

        if(count == 0)
        {
            document.getElementById("OutputInfo").style = "display: none";
            document.getElementById("OutputResult").style = "display: flex";
            count++;
        }

        var result = TempCconverter(inputTemperature,  fromUnit,  toUnit);
        outputTemp.value = result;
        document.getElementById("tempResult").innerHTML = result;
    }
}

function TempCconverter(inputTemperature,  from_unit,  to_unit)
{
    from_unit = from_unit.toLowerCase();
    to_unit = to_unit.toLowerCase();
    inputTemperature = Number(inputTemperature);

    var formula = document.getElementById("tempFormula");
    formula.innerHTML = "";

    if (from_unit == "celsius")
    {
        if (to_unit == "kelvin")
        {
            inputTemperature = (inputTemperature + 273.15);
            formula.innerHTML = "Kelvin = Celcius + 273.15";
        }
        else if (to_unit == "fahrenheit")
        {
            inputTemperature = (inputTemperature * (9 / 5) + 32);
            formula.innerHTML = ("Fahrenheit = (Celcius * (9/5)) + 32");
        }
        else if (to_unit == "rankine")
        {
            inputTemperature = (inputTemperature * 9/5) + 491.67;
            formula.innerHTML = ("Rankine = (Celsius x (9/5)) + 491.67");
        }
    }
    else if (from_unit == "kelvin")
    {
        if (to_unit == "celsius")
        {
            inputTemperature = inputTemperature - 273.15;
            formula.innerHTML = ("Celcius = Kelvin + 273.15");
        }
        else if (to_unit == "fahrenheit")
        {
            inputTemperature = (inputTemperature - 273.15) * 9/5 - 459.67;
            formula.innerHTML = ("Fahrenheit = ((Kelvin  - 273.15) * (9/5)) - 459.67");
        }
        else if (to_unit == "rankine")
        {
            inputTemperature = inputTemperature * 9/5 + 491.67;
            formula.innerHTML = ("Rankine = (Kelvin  * (9/5)) + 491.67");
        }
    }
    else if (from_unit == "fahrenheit")
    {
        if (to_unit == "celsius")
        {
            inputTemperature = (inputTemperature - 32) * 5/9;
            formula.innerHTML = ("Celcius = (Fahrenheit - 32) * (5/9)");
        }
        else if (to_unit == "kelvin")
        {
            inputTemperature = (inputTemperature + 459.67) * 5/9;
            formula.innerHTML = ("Kelvin = (Fahrenheit + 459.67) * (5/9)");
        }
        else if (to_unit == "rankine")
        {
            inputTemperature = inputTemperature + 459.67;
            formula.innerHTML = ("Rankine = Fahrenheit + 459.67");
        }
    }
    else if (from_unit == "rankine")
    {
        if (to_unit == "celsius")
        {
            inputTemperature = (inputTemperature - 491.67) * 5/9;
            formula.innerHTML = ("Celcius = (Rankine - 491.67) * (5/9)");
        }
        else if (to_unit == "kelvin")
        {
            inputTemperature = inputTemperature * 5/9;
            formula.innerHTML = ("Kelvin = (Rankine * (5/9))");
        }
        else if (to_unit == "fahrenheit")
        {
            inputTemperature = inputTemperature - 459.67;
            formula.innerHTML = ("Fahrenheit = (Rankine - 491.67) * (9/5)");
        }
    }            
    return inputTemperature;
}