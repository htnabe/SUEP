import Constants from 'expo-constants';

export default function executeOnlyInDevMode(func) {
  // 開発ビルドや開発モードではtrue
  // 左の値がnullとundefinedの場合のみfalse
  if (Constants.manifest.packagerOpts ?? false) {
    // 製品版ではConstants.manifest.packagerOpts.devの読み込み時にエラーが出る可能性があるため
    // Constants.manifest.packagerOptsの真偽判定を先に行う必要がある
    if (Constants.manifest.packagerOpts.dev ?? false) {
      func;
    }
  }
}
