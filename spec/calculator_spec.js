describe('ComplexCalculator', function() {

  var calc;
  beforeEach(function(){
    calc = new ComplexCalculator();
  });

  it('should add two complex numbers', function(){
    calc.setValue([1,2]);
    expect(calc.setOperator('+')).toEqual([1,2]);
    calc.setValue([2,3]);
    expect(calc.evaluate()).toEqual([3,5]);
  });

  it('should continue adding as evaluate is called', function(){
    calc.setValue([1,2]);
    calc.setOperator('+');
    calc.setValue([2,3]);
    expect(calc.evaluate()).toEqual([3,5]);
    expect(calc.evaluate()).toEqual([5,8]);
    expect(calc.evaluate()).toEqual([7,11]);
  });

  it('should add more than two numbers', function(){
    calc.setValue([1,2]);
    expect(calc.setOperator('+')).toEqual([1,2]);
    calc.setValue([2,3]);
    expect(calc.setOperator('+')).toEqual([3,5]);
    calc.setValue([3,4]);
    expect(calc.setOperator('+')).toEqual([6,9]);
    calc.setValue([4,5]);
    expect(calc.evaluate()).toEqual([10,14]);
  });

  it('should allow the operator to change', function(){
    calc.setValue([1,2]);
    calc.setOperator('+');
    calc.setValue([2,3]);
    calc.setOperator('*');
    calc.setValue([3,4]);
    expect(calc.evaluate()).toEqual([-11,27]);
  });

  it('should allow inputs to be changed before evaluation', function(){
    calc.setValue([1,2]);
    expect(calc.setOperator('+')).toEqual([1,2]);
    calc.setValue([2,3]);
    calc.setValue([3,4]);
    expect(calc.evaluate()).toEqual([4,6]);
  });

  it('should clear', function(){
    calc.setValue([1,2]);
    expect(calc.setOperator('+')).toEqual([1,2]);
    calc.setValue([2,3]);
    calc.clear();
    calc.setValue([3,4]);
    calc.setOperator('+');
    calc.setValue([4,5]);
    expect(calc.evaluate()).toEqual([7,9]);
  });

  describe('operators', function(){

    describe('add', function(){
      it('should be correct', function(){
        var add = calc.operators['+'];
        expect(add([1,2], [3,4])).toEqual([4, 6]);
      });
    });

    describe('subtract', function(){
      it('should be correct', function(){
        var subt = calc.operators['-'];
        expect(subt([3,4], [1,2])).toEqual([2,2]);
      });
    });

    describe('multiply', function(){
      it('should be correct', function(){
        var mult = calc.operators['*'];
        expect(mult([2,3], [4,5])).toEqual([-7,22]);
      });
    });

    describe('divide', function(){
      it('should be correct', function(){
        var div = calc.operators['/'];
        expect(div([-7, 22], [4,5])).toEqual([2,3]);
      });
    });
  });

});
