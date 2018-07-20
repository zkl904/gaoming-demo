// cookieStorage is useful Safari private browser mode, where localStorage
// doesn't work but cookies do. This implementation is adopted from
// https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage

/* eslint-disable no-useless-escape */

import util from './util'
var Global = util.Global
var trim = util.trim

var doc = Global.document

function read(key) {
  if (!key || !_has(key)) { return null }
  var regexpStr = '(?:^|.*;\\s*)' +
    escape(key).replace(/[\-\.\+\*]/g, '\\$&') +
    '\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*'
  return unescape(doc.cookie.replace(new RegExp(regexpStr), '$1'))
}

function each(callback) {
  var cookies = doc.cookie.split(/; ?/g)
  for (var i = cookies.length - 1; i >= 0; i--) {
    if (!trim(cookies[i])) {
      continue
    }
    var kvp = cookies[i].split('=')
    var key = unescape(kvp[0])
    var val = unescape(kvp[1])
    callback(val, key)
  }
}

function write(key, data, expires) {
  if (!key) { return }
  doc.cookie = escape(key) + '=' + escape(data) + `; expires=${expires || 'session'}; path=/`
}

function remove(key) {
  if (!key || !_has(key)) {
    return
  }
  doc.cookie = escape(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
}

function clearAll() {
  each(function(_, key) {
    remove(key)
  })
}

function _has(key) {
  return (new RegExp('(?:^|;\\s*)' + escape(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(doc.cookie)
}

export default {
  name: 'cookieStorage',
  read: read,
  write: write,
  each: each,
  remove: remove,
  clearAll: clearAll
}
