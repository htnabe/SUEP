import React, { useEffect, useState } from 'react';
import readStringData from '../../../commonUtil/readStringData';
import HomeScreenPopup from './HomeScreenPopup';
import HomeScreenTable from './Table';
import checkUpdate from './checkUpdate';
import forceUpdate from './forceUpdate';
import removeStoredData from '../../../commonUtil/removeStoredData';

export default function LectureScreen() {
  const [initialBoot, setinitialBoot] = useState(false);

  useEffect(() => {
    const init = async () => {
      const update = await checkUpdate();
      // 'tableKey'で呼び出されるデータはver1.1.2移行使われないので削除
      // ver1.1.4への移行時にはここを削除
      removeStoredData('tableKey');

      // 新しいバージョンがあるとき
      if (update.result === 'new') {
        forceUpdate();
      } else {
        // 初回起動かどうか確認
        const firstLaunchFlag = await readStringData('firstLaunch');
        if (firstLaunchFlag != 'alreadyLaunched') {
          setinitialBoot(true);
        }
      }
    };
    init();
  }, []);

  return (
    <>
      {initialBoot && <HomeScreenPopup />}

      {/* テーブル部分をインポート */}
      <HomeScreenTable />
    </>
  );
}
