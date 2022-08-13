import Constants from 'expo-constants';

export default function executeOnlyInDevMode(func) {
  // 開発ビルドや開発モードではtrueになる
  if (Constants.manifest.packagerOpts.dev) {
    func;
  }
}
