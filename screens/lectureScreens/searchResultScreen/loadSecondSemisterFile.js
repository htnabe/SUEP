import * as Sentry from 'sentry-expo';

// 通年講義のみ抽出
async function filterYearData(firstData, secondData) {
  const allYearLecture = await firstData.filter((item) => item.開講 == '通年');
  return secondData.concat(allYearLecture);
}

// 通年講義と後期のJSONファイルのインポート
async function loadSecondSemisterFile(fileName) {
  try {
      fileName = fileName.replace(/"/g, '');
      fileName = fileName.trim();
      let data;
      let yearAroundData;

    // 文字列を動的に変化させてrequireすることは不可能なので仕方なくswitch文
    switch (fileName) {
      case '総合理工':
        yearAroundData = require('./FirstSemisterLecs/総合理工.json');
        data = require('./SecondSemisterLecs/総合理工.json');
        data = await filterYearData(yearAroundData, data);
        break;
      case '教養教育':
        yearAroundData = require('./FirstSemisterLecs/教養教育.json');
        data = require('./SecondSemisterLecs/教養教育.json');
        data = await filterYearData(yearAroundData, data);
        break;
      case '生物資源':
        yearAroundData = require('./FirstSemisterLecs/生物資源.json');
        data = require('./SecondSemisterLecs/生物資源.json');
        data = await filterYearData(yearAroundData, data);
        break;
      case '人間科学':
        yearAroundData = require('./FirstSemisterLecs/人間科学.json');
        data = require('./SecondSemisterLecs/人間科学.json');
        data = await filterYearData(yearAroundData, data);
        break;
      case '人間社会科学':
        yearAroundData = require('./FirstSemisterLecs/人間社会科学.json');
        data = require('./SecondSemisterLecs/人間社会科学.json');
        data = await filterYearData(yearAroundData, data);
        break;
      case '教育':
        yearAroundData = require('./FirstSemisterLecs/教育.json');
        data = require('./SecondSemisterLecs/教育.json');
        data = await filterYearData(yearAroundData, data);
        break;
      case '教育学':
        yearAroundData = require('./FirstSemisterLecs/教育学.json');
        data = require('./SecondSemisterLecs/教育学.json');
        data = await filterYearData(yearAroundData, data);
        break;
      case '法文':
        yearAroundData = require('./FirstSemisterLecs/法文.json');
        data = require('./SecondSemisterLecs/法文.json');
        data = await filterYearData(yearAroundData, data);
        break;
      case '人文科学':
        yearAroundData = require('./FirstSemisterLecs/人文科学.json');
        data = require('./SecondSemisterLecs/人文科学.json');
        data = await filterYearData(yearAroundData, data);
        break;
      case '教育学_教職':
        yearAroundData = require('./FirstSemisterLecs/教育学（教職）.json');
        data = require('./SecondSemisterLecs/教育学（教職）.json');
        data = await filterYearData(yearAroundData, data);
        break;
      case '自然科学':
        yearAroundData = require('./FirstSemisterLecs/自然科学.json');
        data = require('./SecondSemisterLecs/自然科学.json');
        data = await filterYearData(yearAroundData, data);
        break;
      case '総合理工_博士後期':
        yearAroundData = require('./FirstSemisterLecs/総合理工（博士後期）.json');
        data = require('./SecondSemisterLecs/総合理工（博士後期）.json');
        data = await filterYearData(yearAroundData, data);
        break;
      default:
        break;
    }
    return data;
  } catch (error) {
    Sentry.Native.captureException(error);
        console.log('エラー箇所: loadSecondSemisterFile.js\n' + error + '\n');
  }
}

export default loadSecondSemisterFile;
