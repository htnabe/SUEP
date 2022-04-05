import readStringData from '../../../commonUtil/readStringData';
import * as Sentry from 'sentry-expo';
import loadFirstSemisterFile from './loadFirstSemisterFile';
import loadSecondSemisterFile from './loadSecondSemisterFile';

//全角(英数字)→半角に変換
function convertWordsToHalfSize(words) {
  let halfSizeWords = [];
  for (const word of words) {
    if (word) {
      const tmp = word.replace(/[！-～]/g, function (word) {
        //UTF-16のコード値を0xFEE0分シフト
        return String.fromCharCode(word.charCodeAt(0) - 0xfee0);
      });
      halfSizeWords.push(tmp);
    }
  }
  return halfSizeWords;
}

function changeSymbolToNumber(searchedWords) {
  let retChangedWords = [];
  for (let selectedWord of searchedWords) {
    // 条件の厳しい順例:IIIがIでヒットするのを防ぐため
    const fiveToBeChangedFromAndTo = [['Ⅴ'], '5'];
    const fourToBeChangedFromAndTo = [['IV', 'Ⅳ'], '4'];
    const threeToBeChangedFromAndTo = [['Ⅲ', 'III'], '3'];
    const twoToBeChangedFromAndTo = [['Ⅱ', 'II'], '2'];
    const oneToBeChangedFromAndTo = [['Ⅰ', 'I', 'Ｉ'], '1'];
    const wordsTobeChangedFromAndTo = [
      fiveToBeChangedFromAndTo,
      fourToBeChangedFromAndTo,
      threeToBeChangedFromAndTo,
      twoToBeChangedFromAndTo,
      oneToBeChangedFromAndTo,
    ];
    for (let wordsArray of wordsTobeChangedFromAndTo) {
      for (let symbolicNumber of wordsArray[0]) {
        const regWord = new RegExp(symbolicNumber);
        const isSymbolicNumberExist = regWord.test(selectedWord);
        if (isSymbolicNumberExist) {
          selectedWord = selectedWord.replace(symbolicNumber, wordsArray[1]);
        }
      }
    }
    retChangedWords.push(selectedWord);
  }
  return retChangedWords;
}

// インプットされた文字と学部名から特定の講義を検索
const searchLecture = async (inputedKeyWord) => {
  // 複数のキーワードでの検索に対応, wordsToSearchForは配列の場合有り
  let wordsToSearchFor = '';
  const halfWidthSpace = new RegExp(' ');
  const fullWidthSpace = new RegExp('　');
  if (halfWidthSpace.test(inputedKeyWord)) {
    wordsToSearchFor = inputedKeyWord.split(halfWidthSpace);
  } else if (fullWidthSpace.test(inputedKeyWord)) {
    wordsToSearchFor = inputedKeyWord.split(fullWidthSpace);
  } else {
    wordsToSearchFor = inputedKeyWord;
  }

  //全角(英数字)→半角
  const halfConvertedWords = convertWordsToHalfSize(wordsToSearchFor);
  //Ⅰ,Ⅱ,Ⅲなど→1,2,3
  wordsToSearchFor = changeSymbolToNumber(halfConvertedWords);

  try {
    let facultyAndFilesName = await readStringData('facultyName');

    // facultyAndFilesNameを文字列 => 配列変更
    facultyAndFilesName = facultyAndFilesName.split(',');

    //  tmp[0]にある学部名を削除
    facultyAndFilesName.shift();
    const jsonFileNames = facultyAndFilesName;
    let lectureData = [];
    let lectureFile;
    const today = new Date();
    const month = today.getMonth() + 1;

    // for.. of 内ではawait処理を行える
    for (const fileName of jsonFileNames) {
      // 3~8月は前期のファイルを参照
      // 9～2月は後期のファイルを参照
      if (3 <= month <= 8) {
        lectureFile =  loadFirstSemisterFile(fileName);
      } else {
        lectureFile =  loadSecondSemisterFile(fileName);
      }

      for (const word of wordsToSearchFor) {
        lectureFile = await lectureFile.filter(function (item) {
          return item.科目.match(word) || item.担当.match(word);
        });
      }
      for (
        let lectureNumber = 0;
        lectureNumber < lectureFile.length;
        lectureNumber++
      ) {
        lectureData.push(lectureFile[lectureNumber]);
      }
    }
    return lectureData;
  } catch (error) {
    Sentry.Native.captureException(error);
  }
};

export default searchLecture;
