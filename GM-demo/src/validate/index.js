const VALIDATE_REGEXP = {
  email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  mobileNo: /^((1)+\d{10})$/,
  mobileNoTest: /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(147))+\d{8})$/
}

const validate = function(type, value) {
  if (type !== 'loginPwd') {
    return VALIDATE_REGEXP[type].test(value)
  } else {
    let r = /^[0-9a-zA-Z!@#$^]{6,16}$/ // 特殊字符可以补充，与后续校验同步即可
    if (r.test(value)) {
      let a = /[0-9]/.exec(value) != null ? 1 : 0
      let b = /[a-z]/.exec(value) != null ? 1 : 0
      let c = /[A-Z]/.exec(value) != null ? 1 : 0
      let d = /[!@#$^]/.exec(value) != null ? 1 : 0
      return a + b + c + d >= 2// 至少2种
    }
    return false
  }
}

export default validate
