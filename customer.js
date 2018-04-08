const _ = require('lodash');

var Customer = function(name, cash) {
  this.name = name;
  this.cash = cash;
  this.collection = [];
}

Customer.prototype.transaction = function(recordStore, record, buyOrSell) {
  if (buyOrSell === 'buy') {
    this.cash -= record.price;
    recordStore.balance += record.price;
    this.collection.push(record);
    _.remove(recordStore.inventory, record);
  }else{
    this.cash += record.price;
    recordStore.balance -= record.price;
    recordStore.inventory.push(record);
    _.remove(this.collection, record);
  }
}

Customer.prototype.buyRecord = function (recordStore, record) {
  if (recordStore.inventory.includes(record) && this.cash > record.price) {
    this.transaction(recordStore, record, 'buy');
  }
}

Customer.prototype.sellRecord = function (recordStore, record) {
    this.transaction(recordStore, record, 'sell');
}

Customer.prototype.viewValueOfCollection = function () {
    let total = 0;
    this.collection.forEach(record => total += record.price);
    return total;
}

Customer.prototype.viewValueOfCollectionByGenre = function (genre) {
    let total = 0;
    let genreArray = _.filter(this.collection, {genre: genre});
    genreArray.forEach(record => total += record.price);
    return total;
}

Customer.prototype.viewMostValuableRecord = function () {
    return _.maxBy(this.collection, 'price');
}

Customer.prototype.sortRecordsByValue = function (order) {
    return _.orderBy(this.collection, 'price', 'desc' );
}

Customer.prototype.compareCollectionValue = function (customer) {
    var result;
    this.viewValueOfCollection() < customer.viewValueOfCollection() ? result = 'LOSER!' : result = 'You are the coolest';
    return result;
}


module.exports = Customer;
