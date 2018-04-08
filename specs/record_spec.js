var assert = require('assert');
var Record = require('../record.js');

describe('Record', function() {

  var record1;
  var record2;
  var record3;


  beforeEach(function() {
    record1 = new Record('Megadeth', 'Hanger 18', 'Heavy Metal', 7.99);
    record2 = new Record('Metallica', 'Ride The Lightning', 'Heavy Metal', 9.99);
    record3 = new Record('Pantera', 'Far Beyond Driven', 'Heavy Metal', 6.99);

  })

  it("should be able to print out details", function() {
    assert.strictEqual(record1.printDetails(), 'Artist: Megadeth, Title: Hanger 18, Genre: Heavy Metal, Price: £7.99.');
  });


});
