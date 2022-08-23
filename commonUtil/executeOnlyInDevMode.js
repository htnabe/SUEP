import Constants from 'expo-constants';

export default function executeOnlyInDevMode(func) {
  // 開発ビルドや開発モードではtrueになる
  // nullとundefinedの場合のみfalse
  if (Constants.manifest.packagerOpts.dev ?? false) {
    func;
  }
}
