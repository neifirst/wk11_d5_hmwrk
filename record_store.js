const _ = require('lodash');

var RecordStore = function(name, city) {
  this.name = name;
  this.city = city;
  this.inventory = [];
  this.balance = 0;
}

RecordStore.prototype.addRecord = function (record) {
  this.inventory.push(record);
}

RecordStore.prototype.listInventory = function () {
  return this.inventory;
}

RecordStore.prototype.sellRecord = function (record) {
  _.remove(this.inventory, function(item) { return item === record; });
  this.balance += record.price;
}

RecordStore.prototype.getReport = function () {
  var value = _.sumBy(this.inventory, 'price');
  var report = `Balance: £${this.balance}, Stock Value: £${value}`;
  return report;
}

RecordStore.prototype.recordByGenre = function (genre) {
  return _.filter(this.inventory, {genre: genre});
}

module.exports = RecordStore;
