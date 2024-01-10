import { Meteor } from 'meteor/meteor'
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'
import { map, includes, defaults } from 'lodash'

const fetchMethodNames = (methods) => map(methods, 'name')

const assignLimits = ({ methods, limit, timeRange }) => {
  const methodNames = fetchMethodNames(methods)

  if (Meteor.isServer) {
    DDPRateLimiter.addRule(
      {
        name(name) {
          return includes(methodNames, name)
        },
        connectionId() {
          return true
        },
      },
      limit,
      timeRange
    )
  }
}

export default function rateLimit(options) {
  // Set default
  defaults(options, { limit: 5, timeRange: 1000 })

  return assignLimits(options)
}
