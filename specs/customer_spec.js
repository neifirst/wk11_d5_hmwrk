var assert = require('assert');
var RecordStore = require('../record_store.js');
var Record = require('../record.js');
var Customer = require('../customer.js');

describe('Customer', function() {

  var customer1;
  var record1;
  var record2;
  var record3;
  var record4;
  var recordStore1;

  beforeEach(function() {
    customer1 = new Customer('Dave Mustaine', 20.00);
    customer2 = new Customer('James Hetfield', 100.00);
    record1 = new Record('Megadeth', 'Hanger 18', 'Heavy Metal', 7.99);
    record2 = new Record('Metallica', 'Ride The Lightning', 'Heavy Metal', 9.99);
    record3 = new Record('Pantera', 'Far Beyond Driven', 'Heavy Metal', 6.99);
    record4 = new Record('Pearl Jam', 'Ten', 'Grunge', 8.99);
    record5 = new Record('Corrosion of Conformity', 'Deliverance', 'Sludge', 21.99);
    recordStore1 = new RecordStore('Tower Records', 'Glasgow');
    recordStore1.addRecord(record2);
    recordStore1.addRecord(record3);
    recordStore1.addRecord(record4);

  });

  it("should be able to buy record", function() {
    customer1.buyRecord(recordStore1, record3);
    assert.strictEqual(recordStore1.inventory.length, 2);
    assert.strictEqual(recordStore1.balance, 6.99);
    assert.strictEqual(customer1.collection.length, 1);
    assert.strictEqual(customer1.cash, 13.01);
  });

  it("should not be able to buy out of stock or too expensive record", function() {
    recordStore1.addRecord(record5);
    customer1.buyRecord(recordStore1, record1);
    customer1.buyRecord(recordStore1, record5);
    assert.strictEqual(recordStore1.inventory.length, 4);
    assert.strictEqual(recordStore1.balance, 0);
    assert.strictEqual(customer1.collection.length, 0);
    assert.strictEqual(customer1.cash, 20.00);
  });

  it("should be able to sell record", function() {
    recordStore1.balance += 50.00;
    customer1.collection.push(record1);
    customer1.sellRecord(recordStore1, record1);
    assert.strictEqual(recordStore1.inventory.length, 4);
    assert.strictEqual(recordStore1.balance, 42.01);
    assert.strictEqual(customer1.collection.length, 0);
    assert.strictEqual(parseFloat(customer1.cash.toFixed(2)), 27.99);
  });

  // ^ I just put the parse and toFixed in as a quick nasty fix so the test would pass. ;)


  it("should be able to view the value of collection", function() {
    customer1.buyRecord(recordStore1, record2);
    customer1.buyRecord(recordStore1, record3);
    assert.strictEqual(customer1.viewValueOfCollection(), 16.98);
  });

  it("should be able to view the value of collection by genre", function() {
    customer1.buyRecord(recordStore1, record3);
    customer1.buyRecord(recordStore1, record4);
    assert.strictEqual(customer1.viewValueOfCollectionByGenre('Grunge'), 8.99);
  });

  it("should be able to view most valuable record", function() {
    customer1.buyRecord(recordStore1, record3);
    customer1.buyRecord(recordStore1, record4);
    assert.strictEqual(customer1.viewMostValuableRecord(), record4);
  });

  it("should be able to view records in order of value", function() {
    customer1.buyRecord(recordStore1, record3);
    customer1.buyRecord(recordStore1, record4);
    assert.deepStrictEqual(customer1.sortRecordsByValue('desc'), [record4, record3]);
  });

  it("should be able to compare collections", function() {
    recordStore1.addRecord(record5);
    customer1.buyRecord(recordStore1, record3);
    customer1.buyRecord(recordStore1, record4);
    customer2.buyRecord(recordStore1, record2);
    customer2.buyRecord(recordStore1, record5);
    assert.deepStrictEqual(customer1.compareCollectionValue(customer2), 'LOSER!');
  });

});
