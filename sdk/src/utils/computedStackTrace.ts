import { UNKNOWN_FUNCTION, ERROR_LEVEL } from './../constant/index'
import { getLocationHref } from './util'

/* 
 chorme safari firefox 这些信息都有
window.onerror = function(message, url, lineNo, columnNo, error) {
    message: 错误信息
    url: 发生错误对应的脚本路径
    lineNo: 错误发生的行号
    columnNo: 错误发生的列号
    error: 具体的error对象，包含更加详细的错误调用堆栈信息
}
*/

export default function(ex: any) {
  if (typeof ex.stack === 'undefined' || !ex.stack) {
    return false
  }

  let chrome = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
    gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i,
    winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
    // Used to additionally parse URL/line/column from eval frames
    geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
    chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/,
    lines = ex.stack.split('\n'),
    stack = [],
    submatch,
    parts,
    element,
    reference = /^(.*) is undefined$/.exec(ex.message)

  for (var i = 0, j = lines.length; i < j; ++i) {
    if ((parts = chrome.exec(lines[i]))) {
      var isNative = parts[2] && parts[2].indexOf('native') === 0 // start of line
      var isEval = parts[2] && parts[2].indexOf('eval') === 0 // start of line
      if (isEval && (submatch = chromeEval.exec(parts[2]))) {
        // throw out eval line/column and use top-most line/column number
        parts[2] = submatch[1] // url
        parts[3] = submatch[2] // line
        parts[4] = submatch[3] // column
      }
      element = {
        url: !isNative ? parts[2] : null,
        func: parts[1] || UNKNOWN_FUNCTION,
        args: isNative ? [parts[2]] : [],
        line: parts[3] ? +parts[3] : null,
        column: parts[4] ? +parts[4] : null
      }
    } else if ((parts = winjs.exec(lines[i]))) {
      element = {
        url: parts[2],
        func: parts[1] || UNKNOWN_FUNCTION,
        args: [],
        line: +parts[3],
        column: parts[4] ? +parts[4] : null
      }
    } else if ((parts = gecko.exec(lines[i]))) {
      var isEval = parts[3] && parts[3].indexOf(' > eval') > -1
      if (isEval && (submatch = geckoEval.exec(parts[3]))) {
        // throw out eval line/column and use top-most line number
        parts[3] = submatch[1]
        parts[4] = submatch[2]
        parts[5] = null // no column when eval
      } else if (
        i === 0 &&
        !parts[5] &&
        typeof ex.columnNumber !== 'undefined'
      ) {
        // FireFox uses this awesome columnNumber property for its top frame
        // Also note, Firefox's column number is 0-based and everything else expects 1-based,
        // so adding 1
        // NOTE: this hack doesn't work if top-most frame is eval
        stack[0].column = ex.columnNumber + 1
      }
      element = {
        url: parts[3],
        func: parts[1] || UNKNOWN_FUNCTION,
        args: parts[2] ? parts[2].split(',') : [],
        line: parts[4] ? +parts[4] : null,
        column: parts[5] ? +parts[5] : null
      }
    } else {
      continue
    }

    if (!element.func && element.line) {
      element.func = UNKNOWN_FUNCTION
    }

    stack.push(element)
  }

  if (!stack.length) {
    return null
  }

  return {
    name: ex.name,
    message: ex.message,
    url: getLocationHref(),
    level: ERROR_LEVEL.NORMAL,
    stack: stack
  }
}
