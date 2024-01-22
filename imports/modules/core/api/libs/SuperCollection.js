const { Mongo } = require('meteor/mongo')

export default class SuperCollection extends Mongo.Collection {
  async aggregate(pipeline = []) {
    return this.rawCollection()
      .aggregate(pipeline, { allowDiskUse: true })
      .toArray()
  }
}
