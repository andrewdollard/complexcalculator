var ComplexCalculator = function(){
  this.operators = {
    '+': function (a, b) {
      return [a[0] + b[0], a[1] + b[1]]
    },

    '-': function (a, b) {
      return [a[0] - b[0], a[1] - b[1]]
    },

    '*': function (a, b) {
      var real = (a[0] * b[0]) - (a[1] * b[1]);
      var img = (a[1] * b[0]) + (a[0] * b[1]);
      return [real, img];
    },

    '/': function (a, b) {
      var denom = Math.pow(b[0], 2) + Math.pow(b[1], 2);
      var real = ((a[0] * b[0]) + (a[1] * b[1])) / denom;
      var img = ((a[1] * b[0]) - (a[0] * b[1])) / denom;
      return [real, img];
    }
  }

  this.clear();
};

ComplexCalculator.prototype.clear = function(){
  this._currentValue = [0,0];
  this._workingValue = [0,0];
  this._op = this.operators['+'];
};

ComplexCalculator.prototype.setValue = function(value){
  this._workingValue = value;
};

ComplexCalculator.prototype.setOperator = function(operator) {
  this._currentValue = this._op(this._currentValue, this._workingValue);
  this._op = this.operators[operator];
  return this._currentValue;
};

ComplexCalculator.prototype.evaluate = function() {
  this._currentValue = this._op(this._currentValue, this._workingValue);
  return this._currentValue;
};

