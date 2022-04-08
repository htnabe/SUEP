import * as Sentry from 'sentry-expo';

// 通年講義と後期のJSONファイルのインポート
function loadFirstSemisterFile(fileName) {
  try {
      fileName = fileName.replace(/"/g, '');
      fileName = fileName.trim();
      let data;

    // 文字列を動的に変化させてrequireすることは不可能なので仕方なくswitch文
    switch (fileName) {
      case '総合理工':
        data = require('./firstSemiLects/総合理工.json');
        break;
      case '教養教育':
        data = require('./firstSemiLects/教養教育.json');
        break;
      case '生物資源':
        data = require('./firstSemiLects/生物資源.json');
        break;
      case '人間科学':
        data = require('./firstSemiLects/人間科学.json');
        break;
      case '人間社会科学':
        data = require('./firstSemiLects/人間社会科学.json');
        break;
      case '教育':
        data = require('./firstSemiLects/教育.json');
        break;
      case '教育学':
        data = require('./firstSemiLects/教育学.json');
        break;
      case '法文':
        data = require('./firstSemiLects/法文.json');
        break;
      case '人文科学':
        data = require('./firstSemiLects/人文科学.json');
        break;
      case '教育学_教職':
        data = require('./firstSemiLects/教育学(教職).json');
        break;
      case '自然科学':
        data = require('./firstSemiLects/自然科学.json');
        break;
      case '総合理工_博士後期':
        data = require('./firstSemiLects/総合理工(博士後期).json');
        break;
      default:
        break;
    }
    return data;
  } catch (error) {
    Sentry.Native.captureException(error);
  }
}

export default loadFirstSemisterFile;
