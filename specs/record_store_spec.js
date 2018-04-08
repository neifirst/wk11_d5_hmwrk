var assert = require('assert');
var RecordStore = require('../record_store.js');
var Record = require('../record.js');

describe('RecordStore', function() {

  var record1;
  var record2;
  var record3;
  var recordStore1;

  beforeEach(function() {
    record1 = new Record('Megadeth', 'Hanger 18', 'Heavy Metal', 7.99);
    record2 = new Record('Metallica', 'Ride The Lightning', 'Heavy Metal', 9.99);
    record3 = new Record('Pantera', 'Far Beyond Driven', 'Heavy Metal', 6.99);
    recordStore1 = new RecordStore('Tower Records', 'Glasgow');
    recordStore1.addRecord(record1);
    recordStore1.addRecord(record2);
    recordStore1.addRecord(record3);

  })

  it("should be able to add record", function() {
    assert.strictEqual(recordStore1.inventory.length, 3);
  });


});
