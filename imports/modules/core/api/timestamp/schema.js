import SimpleSchema from 'simpl-schema'

export default TimestampSchema = new SimpleSchema({
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date()
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() }
      } else {
        this.unset() // Prevent user from supplying their own value
      }
    },
  },
  createdBy: {
    type: String,
    autoValue() {
      if (this.isInsert) {
        return this.userId || ''
      } else if (this.isUpsert) {
        return { $setOnInsert: this.userId || '' }
      } else {
        this.unset() // Prevent user from supplying their own value
      }
    },
    optional: true,
  },
  updatedAt: {
    type: Date,
    autoValue: function () {
      if (this.isUpdate) {
        return new Date()
      }
    },
    optional: true,
  },
  updatedBy: {
    type: String,
    autoValue: function () {
      if (this.isUpdate) {
        return this.userId || ''
      }
    },
    optional: true,
  },
})
