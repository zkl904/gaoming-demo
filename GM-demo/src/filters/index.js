import _ from 'lodash'

export default {
  /**
   * thousandSplit
   * @author Zhichao.Liu
   * @param {number | string} value - 要转换的值
   * @returns {string} value - 转换后的值
   * @desc 将值转换为千位分隔式
   * @example
   * // returns 12,3456,7890
   * thousandSplit(1234567890)
   */
  thousandSplit: function (value) {
    if (!value) return '0'
    let splitValue = value.toString().split('.')
    if (splitValue[0].length < 4) return value
    let splitInteger = splitValue[0].split('').reverse()
    for (let i = 0; i < splitInteger.length; i++) {
      if (i % 3 === 0 && i !== splitInteger.length && i !== 0 && !isNaN(Number(splitInteger[i]))) {
        splitInteger[i] += ','
      }
    }
    splitValue[0] = splitInteger.reverse().join('')
    value = splitValue.join('.')
    return value
  },
  /**
   * cardNoSplit
   * @author Zhichao.Liu
   * @param {number | string} value - 要转换的值
   * @param {string} symbol - 分割字符(默认：' ')
   * @returns {string} value - 转换后的值
   * @desc 将值转换为银行卡号形式(每四位加一个空格)
   * @example
   * // returns 6212 4621 7000 0107 869
   * cardNoSplit(6212462170000107869)
   */
  cardNoSplit: function(value, symbol) {
    if (!value) return ''
    symbol = symbol || ' '
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1' + symbol)
  },
  /**
   * mobileNoSplit
   * @author Zhichao.Liu
   * @param {number | string} value - 要转换的值
   * @param {string} symbol - 分隔符，默认为空格
   * @returns {string} value - 转换后的值
   * @desc 转换为按344格式分隔的手机号码
   * @example
   * // returns 188 3333 8888
   * cardNoSplit(18833338888)
   */
  mobileNoSplit: function(value, symbol) {
    if (!value) return ''
    symbol = symbol || ' '
    return value.replace(/\s/g, '').replace(/(\d{3})/, '$1' + symbol).replace(/(\d{4})/, '$1' + symbol)
  },
  /**
   * getSensitiveBankCard
   * @author Zhichao.Liu
   * @param {number | string} value - 要转换的值
   * @returns {string} value - 转换后的值
   * @desc 银行卡号脱敏(显示4位尾号)
   * @example
   * // returns 7869
   * cardNoSplit(6212462170000107869)
   */
  getSensitiveBankCard: function(value) {
    if (!value) return ''
    value = value.toString()
    return value.slice(-4)
  },
  /**
   * getSensitivePhone
   * @author Zhichao.Liu
   * @param {number | string} value - 要转换的值
   * @returns {string} value - 转换后的值
   * @desc 电话号码脱敏
   * @example
   * // returns 187****9898
   * cardNoSplit(18768889898)
   */
  getSensitivePhone: function(value) {
    if (!value) return ''
    value = value.toString()
    return value.substring(0, 3) + '****' + value.substring(7)
  },
  /**
   * getSensitiveName
   * @author Zhichao.Liu
   * @param {string} value - 要转换的值
   * @returns {string} value - 转换后的值
   * @desc 姓名脱敏
   * @example
   * // returns *狗蛋
   * cardNoSplit(李狗蛋)
   */
  getSensitiveName: function(value) {
    if (!value) return ''
    return '*' + value.slice(1)
  },
  /**
   * fetchBit
   * @author Zhichao.Liu
   * @param {number} value - 要转换的值
   * @param {boolean} roundFlag - 是否需要四舍五入
   * @param {number} bit - 取几位小数
   * @returns {string} value - 转换后的值
   * @desc 将值转换为银行卡号形式(每四位加一个空格)
   * @example
   * // returns 1.234
   * fetchBit(1.23456, false, 3)
   * // returns 1.235
   * fetchBit(1.23456, true, 3)
   */
  fetchBit: function (value, roundFlag, bit) {
    if (!value) return '0'
    let hasTenThousandFlag = (/万/g).test(value)
    if (hasTenThousandFlag) value = parseFloat(value).toFixed(bit)
    let splitNumber = value.toString().split('.')
    if (!splitNumber[1]) return !hasTenThousandFlag ? String(parseFloat(value).toFixed(bit)) : value.toFixed(bit) + '万'
    if (roundFlag) return !hasTenThousandFlag ? (_.round(value, bit)).toFixed(bit) : _.round(value, bit).toFixed(bit) + '万'
    if (splitNumber[1].length === bit) return !hasTenThousandFlag ? value : value + '万'
    if (splitNumber[1].length > bit) {
      splitNumber[1] = splitNumber[1].slice(0, bit)
    }
    value = splitNumber.join('.').toString()
    if (splitNumber[1].length < bit) {
      value = parseFloat(value).toFixed(bit)
    }
    return !hasTenThousandFlag ? value : value + '万'
  },
  /**
   * convertTenThousand
   * @author Zhichao.Liu
   * @param {number} value - 要转换的值
   * @returns {number | string} value - 转换后的值
   * @desc 将值转换为万
   * @example
   * // returns 1.23万
   * convertTenThousand(12300)
   */
  convertTenThousand: function (value) {
    if (!value) return '0'
    if (value < 10000) return value
    return value / 10000 + '万'
  },
  /**
   * removeZero
   * @author yanan.li
   * @param {number} value - 要转换的值
   * @returns {number | string} value - 转换后的值
   * @desc 去零处理
   * @example
   * // returns 1.23万
   * removeZero(1.230万)
   */
  removeZero: function(value) {
    if (!value) return '0'
    let hasTenThousandFlag = (/万/g).test(value)
    if (hasTenThousandFlag) value = parseFloat(value)
    let splitNumber = value.toString().split('.')
    // 如果有小数位 则开始处理去零
    if (splitNumber.length > 1) {
      // 做去零处理
      let decimalArray = splitNumber[1].split('')
      while (decimalArray[decimalArray.length - 1] === '0') {
        decimalArray.splice(decimalArray.length - 1, 1)
      }
      // 去零后若有值
      if (decimalArray.length) {
        splitNumber[1] = decimalArray.join('')
      } else {
        splitNumber = [splitNumber[0]]
      }
      value = splitNumber.join('.').toString()
    }
    return !hasTenThousandFlag ? value : value + '万'
  },
  /**
   * percentNumber
   * @author kaili.zheng
   * @param {number} value - 要转换的值
   * @returns {number | string} value - 转换后的值
   * @desc 百分号小数处理精度
   * @example
   * // returns 8.8
   * percentNumber(0.088)
   */
  percentNumber: function(value) {
    if (!value) return ''
    if (Number(value) > 1) {
      return value
    }
    if (Number(value) > 0 && Number(value) <= 1) {
      return value * 10000 / 100
    }
  }
}
