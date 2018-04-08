var assert = require('assert');
var RecordStore = require('../record_store.js');
var Record = require('../record.js');

describe('RecordStore', function() {

  var record1;
  var record2;
  var record3;
  var record4;
  var recordStore1;

  beforeEach(function() {
    record1 = new Record('Megadeth', 'Hanger 18', 'Heavy Metal', 7.99);
    record2 = new Record('Metallica', 'Ride The Lightning', 'Heavy Metal', 9.99);
    record3 = new Record('Pantera', 'Far Beyond Driven', 'Heavy Metal', 6.99);
    record4 = new Record('Pearl Jam', 'Ten', 'Grunge', 8.99);
    recordStore1 = new RecordStore('Tower Records', 'Glasgow');
    recordStore1.addRecord(record1);
    recordStore1.addRecord(record2);
    recordStore1.addRecord(record3);

  });

  it("should be able to add record", function() {
    assert.strictEqual(recordStore1.inventory.length, 3);
  });

  it("should be able to list inventory", function() {
    assert.deepStrictEqual(recordStore1.listInventory(), recordStore1.inventory);
  });

  it("should be able to sell record", function() {
    recordStore1.sellRecord(record3);
    assert.strictEqual(recordStore1.inventory.length, 2);
    assert.strictEqual(recordStore1.balance, 6.99);
  });

  it("should be able to get financial report", function() {
    recordStore1.sellRecord(record3);
    assert.strictEqual(recordStore1.getReport(), 'Balance: £6.99, Stock Value: £17.98');
  });

  it("should be able to list records by genre", function() {
    recordStore1.addRecord(record4);
    assert.deepStrictEqual(recordStore1.recordByGenre('Grunge'), [record4]);
  });

});
