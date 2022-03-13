import React, { useEffect, useState } from 'react';
import readStringData from '../../../commonUtil/readStringData';
import HomeScreenPopup from './HomeScreenPopup';
import HomeScreenTable from './Table';

export default function LectureScreen() {
  const [initialBoot, setinitialBoot] = useState(false);

  useEffect(() => {
    const init = async () => {

      // 初回起動かどうか確認
      const firstLaunchFlag = await readStringData('firstLaunch');
      if (firstLaunchFlag != 'alreadyLaunched') {
        setinitialBoot(true);
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
