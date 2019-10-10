function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(string) {
	var operations = [[ ['*'] , ['/'] ], [ ['+'] , ['~'], ['-'] ]];
	var output;
	string = string.replace(/ /g, '').replace(/-/g, '~'); 
	
	function round(value, decimals) {
		return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
	}
 
   function calc_internal(a,op,b){
		a=a*1; b=b*1;
		switch(op){
		  case '+': return a+b; break;
		  case '~': return a-b; break;
		  case '-': return a-b; break;
		  case '/': return a/b; break;
		  case '*': return a*b; break;
		  default: null;
		}
   }
	
	function brackets (string){
		var bracketOne = string.lastIndexOf('(');
		var bracketTwo = string.slice(bracketOne).indexOf(')');
		if (bracketOne == -1 || bracketTwo == -1) {
			throw Error('ExpressionError: Brackets must be paired');
		} else {
		bracketTwo += bracketOne;
		var bracketString = string.slice(bracketOne + 1, bracketTwo);
		resultBrackets = getResult(bracketString);
		return string.replace('('+bracketString+')', resultBrackets);
   
    }
  };

  function getResult(string){
	for(var i=0, n=operations.length; i<n; i++ ){
		if(string.match(/e/)){
			string  = string.replace('e','');
			var re = new RegExp('(\\-?\\d+\\.?\\d+)(['+operations[i].join('')+'])(\\-?\\d+\\.?\\d*)');
		}
		else{
			var re = new RegExp('(\\-?\\d+\\.?\\d*)(['+operations[i].join('')+'])(\\-?\\d+\\.?\\d*)');
		}
		re.lastIndex = 0; 
		while( re.test(string) ){
			output = calc_internal(RegExp.$1,RegExp.$2,RegExp.$3);
			if(!isFinite(output)) throw TypeError("TypeError: Division by zero.");
			string  = string.replace(re,output);
		}
   }
   return string;
}

 while (string.indexOf('(') !== -1 || string.indexOf(')') !== -1) { string = brackets(string);}

 return round(getResult(string), 4);

}

  


module.exports = {
    expressionCalculator
}