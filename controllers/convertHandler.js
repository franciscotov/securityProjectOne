/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  this.doMath = function(arr){
    /*
    if(arr[arr.length-2] =='x'){
      arr[arr.length-3]*arr[arr.length-1];
    }
    */
    let arrAux = [];
    arr.map((item)=>{
      if((arrAux[arrAux.length-1] === '*' || arrAux[arrAux.length-1] === '/') && item !== '-'){
        if(arrAux[arrAux.length-1] === '*'){
          let aux = arrAux[arrAux.length-2] * item;
          arrAux.splice(arrAux.length -2 , 2);
          arrAux.push(aux);
        }
        else if(arrAux[arrAux.length-1] === '/'){
          let aux = arrAux[arrAux.length-2] / item;
          arrAux.splice(arrAux.length -2 , 2);
          arrAux.push(aux);
        }
      }
      else if((arrAux[arrAux.length-2] === '*' || arrAux[arrAux.length-2] === '/') && arrAux[arrAux.length-1] === '-'){
        if(arrAux[arrAux.length-2] === '*'){
          let aux = arrAux[arrAux.length-3] * (-item);
          arrAux.splice(arrAux.length -3 , 3);
          arrAux.push(aux);
        }
        else if(arrAux[arrAux.length-2] === '/'){
          let aux = arrAux[arrAux.length-3] / (-item);
          arrAux.splice(arrAux.length -3 , 3);
          arrAux.push(aux);
        }
      }
      else{
        arrAux.push(parseFloat(item)||item);
      }
    });
    console.log(arrAux)
    return arrAux.map((item,i,arr) => {
      return arr[i-1] === '-' ?  -item: item;
    }).filter(item => typeof(item) === 'number').reduce((accu, val) => accu+val);
  }
  
  this.getNum = function(input) {
    input = input.toLowerCase();
    var result;
    var regex = /[a-z]/; //coincidencia con letras
    var regexTwo= /[a-z](?=[^a-z])/g; //coincidencia con letras seguidas de digitos o caracteres
    var regexNeg = /[^\d]/; //conincidencia con caracteres 
    //find the index of first character with string.indexOf(character)
    //var ind = input.indexOf(input.match(regex)[0]);
    //var inputAux = input.split(input.match(regex)[0]).join('').match(/\d/);
    //result = input.match(regex) != null && input.match(regexTwo) == null? Number(input.split('', input.indexOf(input.match(regex)[0])).join('')): 'invalid number';
    if(input.match(regex) != null && input.match(regexTwo) == null){
      var inputAux = [];
      input.split('', input.indexOf(input.match(/[a-z]/)[0])).map((val,i,arr)=>{
        inputAux.push(val);
        if(inputAux[i-1]=='.'){
          inputAux.splice(inputAux.length -3 , 3);
          inputAux.push(arr[i-2]+'.'+arr[i]);
        }
      });
      result = Number(input.split('', input.indexOf(input.match(/[a-z]/)[0])).join('')) || this.doMath(inputAux);
    }
    else{
      result = 'invalid number';
    }
    return result;
  };
  
  this.getUnit = function(input) {
    var result;
    input = input.toLowerCase();
    var regex = /[a-z](?=[a-z])|[a-z]$/g;
    var arrUnit = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    result = input.match(regex) != null ? input.match(regex).join(''): 'invalid unit';
    if(result != 'invalid unit' && arrUnit.indexOf(result) == -1){
     result = 'invalid unit';
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    var result;
    var arrUnit = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    var ind;
    if(arrUnit.indexOf(initUnit) != -1 ){
      ind = arrUnit.indexOf(initUnit) %2 == 0 ? arrUnit.indexOf(initUnit) + 1: arrUnit.indexOf(initUnit)-1;   
    }
    result = arrUnit[ind];
    return result;
  };

  this.spellOutUnit = function(unit) {
    var result;
    var arrUnit = ['gal','l','mi','km','lbs','kg'];
    var arrSpellUnit = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms']
    result = arrSpellUnit[arrUnit.indexOf(unit)];
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    if(initUnit == 'gal' || initUnit=='l'){
      result = initUnit == 'gal' ? initNum*galToL: initNum/galToL;
    }
    else if(initUnit == 'lbs' || initUnit=='kg'){
      result = initUnit == 'lbs' ? initNum*lbsToKg: initNum/lbsToKg;
    }
    
    else if(initUnit == 'mi' || initUnit=='km'){
      result = initUnit == 'mi' ? initNum*miToKm: initNum/miToKm;
    }
    return result
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;
    result = +initNum +' '+ this.spellOutUnit(initUnit)+ ' converts to '+ returnNum+ ' '+ this.spellOutUnit(returnUnit);
    return result;
  };
  
}

module.exports = ConvertHandler;
