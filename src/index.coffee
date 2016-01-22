url = require 'url'
redis = require 'redis'
client = redis.createClient({no_ready_check: true})

hash = "defaultdomain"

# looking for alias url. If exists, replace url and store old url to urlRewritten
urlalias = (req, res, next) ->
  url_parts = url.parse req.url
  client.hget hash, url_parts.pathname, (err, reply) ->
    if reply
      req.urlRewritten = req.url
      req.url = reply + (url_parts.search || "")
    next()
    
urlalias.configure = (domain) ->
  hash = domain

# check if url already exists in database, return true or false in callback  
urlalias.isExist = (url, cb) ->
  client.hexists hash, url, (err, ret) ->
    cb(ret)

# add entry to database, return err status, cb can be ignored  
urlalias.add = (from, to, cb) ->
  client.hset hash, from, to, (err, res) ->
    cb(err) if cb?

# remove entry from database, return err status, cb can be ignored
urlalias.remove = (url, cb) ->
  client.hdel hash, url, (err) ->
    cb(err) if cb?

module.exports = urlalias
