/**
 * Created by uenit_wjc on 2017/8/22.
 */
function padZero (str, num) {
  str = str.toString()
  let length = str.length
  if (length < num) {
    for (let i = length; i < num; i++) {
      str = '0' + str
    }
  }
  return str
}

// YYYY/MM/DD hh:mm:ss
export function serializeDate (time, str) {
  time = new Date(time)
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let day = time.getDate()
  let hour = time.getHours()
  let minute = time.getMinutes()
  let second = time.getSeconds()
  return str.replace('YYYY', year).replace('MM', padZero(month, 2)).replace('DD', padZero(day, 2))
    .replace('hh', padZero(hour, 2)).replace('mm', padZero(minute, 2)).replace('ss', padZero(second, 2))
}

