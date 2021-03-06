import * as React from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, Linking, TouchableOpacity } from "react-native";

async function openUrl(url) {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert(
      "エラー",
      "このページを開ませんでした",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }
}

export default function PrivacyPolicy() {
  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>{`
　このプライバシーポリシーは，開発者がこのアプリケーション上で提供するサービス（以下，「本サービス」といいます。）を運用する際に得られた個人情報を私がどのように扱うか示しています。利用者の皆さま（以下，「ユーザー」といいます。）が本サービスをご利用いただく場合、以下のプライバシーポリシーに同意したものとみなします。\n

1.  個人情報の利用目的\n
　本サービスでは、お問い合わせの際、名前やメールアドレス等の個人情報を入力いただく場合がございます。取得した個人情報は、お問い合わせに対する回答をご連絡する場合に利用させていただくものであり、この目的以外では利用いたしません。\n

2.  Twitter, Inc. が提供するサービスを利用する際のプライバシーポリシー\n
　本サービスではTwitter APIを利用しコンテンツを表示しています。ユーザーがTwitter, Inc.が提供するサービスを利用する際には、ユーザーはTwitterのプライバシーポリシーにも同意しているものとみなします。詳しくは下のリンクからご確認ください。
`}</Text>
        <TouchableOpacity
        style={styles.button}
        onPress={() => openUrl("https://cdn.cms-twdigitalassets.com/content/dam/legal-twitter/site-assets/privacy-june-18th-2020/Twitter_Privacy_Policy_JA.pdf")}
      >
        <Text>「Twitterのプライバシーポリシー」はこちらから</Text>
      </TouchableOpacity>
        <Text style={styles.text}>{`
3.  Googleが提供するサービスを利用する際のプライバシーポリシー\n
　本アプリケーションについての問い合わせにはGoogleフォームを用いる場合があります．Googleのサービスを利用する場合にはGoogle独自のプライバシーポリシーが適用されます．詳しくは下に示したリンク先でご確認いただけます．
`}</Text>
        <TouchableOpacity
        style={styles.button}
        onPress={() => openUrl("https://policies.google.com/terms?hl=ja")}
      >
        <Text>「Googleのプライバシーポリシーと利用規約」はこちらから</Text>
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: 'white',
  },
  text: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  twitterText: {
    color: '#ffffff',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
});
