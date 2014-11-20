var CalculatorView = function(el){
  var calc = new ComplexCalculator;
  var view = this, newInput = false;

  var div = document.createElement('DIV');
  div.className = 'buttons';
  var ops = ['+', '-', '*', '/', 'c', '='];
  for (var i = 0; i < ops.length; i++) {
    var btn = document.createElement('BUTTON');
    btn.innerHTML = ops[i];
    div.appendChild(btn);
  }

  input = document.createElement('INPUT');
  el.appendChild(input);
  el.appendChild(div);

  this.handleClick = function(e) {
    var btn = e.target.innerHTML;
    var value, result;

    if (btn == 'c') {
      calc.clear();
      input.value = '';
    } else if (btn == '=') {
      if (newInput) {
        newInput = false;
        value = view.parse(input.value);
        calc.setValue(value);
      }
      result = calc.evaluate();
      input.value = view.format(result);
    } else if (newInput) {
      newInput = false;
      value = view.parse(input.value);
      calc.setValue(value);
      result = calc.setOperator(btn);
      input.value = view.format(result);
    }
  }
  div.addEventListener('click', this.handleClick);

  input.addEventListener('keyup', function(){
    newInput = true;
  });

  input.addEventListener('click', function(){
    input.value = '';
  });

};

CalculatorView.prototype.format = function(number){
  return number[0] + " + " + number[1] + "i";
};

CalculatorView.prototype.parse = function(number){
  var regex = /(\d*)\s*\+\s*(\d*)i/;
  var res = number.match(regex);
  return [parseInt(res[1], 10), parseInt(res[2], 10)];
};


