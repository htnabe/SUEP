import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import HTMLView from 'react-native-htmlview';

// 画像素材のインポート
import reply from './assets/reply.png';
import retweet from './assets/retweet.png';
import like from './assets/like.png';
import TwitterLogo from './assets/2021Twitterlogo-blue.png';

// コンポーネントとスタイルのインポート
import CustomedSearchBar from '../../commonComponent/CustomedSearchBar';
import CustomedIndicator from '../../commonComponent/CustomedIndicator';
import commonStyles from '../../commonStyle/commonStyle';

// 外部関数のインポート
import fetchTweetData from './fetchTweetData';
import searchData from './searchData';
import storeArrayData from '../../commonUtil/storeArrayData';
import openUrl from '../../commonUtil/openUrl';

const windowWidth = Dimensions.get('window').width;

export default function Timeline(props) {
  const [InputtedText, setInputtedText] = useState();
  const [searching, setSearching] = useState(false);
  const [flatListData, setFlatListData] = useState();
  const [refreshing, setRefreshing] = useState(true);
  const [storedTweets, setStoredTweets] = useState();
  const flatListRef = useRef(null);
  useScrollToTop(flatListRef);

  //  画面引き下げ時のデータ読み込み処理
  useEffect(() => {
    if (refreshing) {
      let data = async () => {
        const fetchedData = await fetchTweetData(props.sheetName, props.key);
        setFlatListData(fetchedData);
        return fetchedData;
      };
      data().then((fData) => {
        storeArrayData('store_fetchedData', fData);
        setStoredTweets(fData);
      });
    }
    setRefreshing(false);
  }, [refreshing]);

  // 検索語の読み込み処理
  useEffect(() => {
    if (searching) {
      const data = async () => {
        setFlatListData(await searchData(storedTweets, InputtedText));
      };
      data();
    }
    setSearching(false);
  }, [searching]);

  // 値が存在しないときの表示
  if (!flatListData) {
    return (
      <View style={commonStyles.viewPageContainer}>
        <CustomedIndicator />
      </View>
    );
  }

  const renderItem = ({ item }) => {
    // プロフィール画像のURLを分割して'_normal'だけを'400x400'に安全に置き換える
    let itemArray = item[4].split('.');
    itemArray[itemArray.length - 2] = itemArray[itemArray.length - 2].replace(
      /_normal/g,
      '_400x400'
    );
    const profileUrl = itemArray.join('.');
    return (
      <View style={styles.itemWrapper}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            openUrl('https://twitter.com/' + item[6] + '/status/' + item[2])
          }
        >
          {/* アイコン、ユーザー名、ロゴの部分 */}
          <View style={styles.upperItem}>
            {/* アイコン */}
            <TouchableOpacity
              style={styles.icon}
              onPress={() => openUrl('https://twitter.com/' + item[6])}
            >
              <Image source={{ uri: profileUrl }} style={styles.icon} />
            </TouchableOpacity>
            {/* ユーザー名とID */}
            <View style={styles.nameIdWrapper}>
              <TouchableOpacity
                onPress={() => openUrl('https://twitter.com/' + item[6])}
              >
                <Text style={commonStyles.basicFontBold}>
                  {!item[3] ? 'Not Provided' : item[3]}
                </Text>
              </TouchableOpacity>
              <Text style={commonStyles.smallFont}>
                {!item[6] ? 'Not Provided' : '@' + item[6]}
              </Text>
            </View>
            {/* ユーザー名とID */}
            <Image source={TwitterLogo} style={styles.logo} />
          </View>
          <View style={styles.content}>
            <HTMLView value={item[5]} stylesheet={styles} />
          </View>
          <View style={styles.footerItem}>
            <View style={styles.utilityRow}>
              <TouchableOpacity
                style={styles.utilitySpace}
                onPress={() =>
                  openUrl(
                    'https://twitter.com/intent/tweet?in_reply_to=' + item[2]
                  )
                }
              >
                <Image source={reply} style={styles.utility} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.utilitySpace}
                onPress={() =>
                  openUrl(
                    'https://twitter.com/intent/retweet?tweet_id=' + item[2]
                  )
                }
              >
                <Image source={retweet} style={styles.utility} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.utilitySpace}
                onPress={() =>
                  openUrl('https://twitter.com/intent/like?tweet_id=' + item[2])
                }
              >
                <Image source={like} style={styles.utility} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.dateWrapper}
              onPress={() =>
                openUrl('https://twitter.com/' + item[6] + '/status/' + item[2])
              }
            >
              <Text style={[commonStyles.smallFont, commonStyles.colorGray]}>
                {!item[1] ? 'Not Provided' : item[1]}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const componentForEmptyList = (
    <View>
      <Text style={commonStyles.largeFontBold}>
        該当するアイテムがありません
      </Text>
    </View>
  );

  return (
    <View style={[commonStyles.viewPageContainer, commonStyles.bgColorWhite]}>
      <CustomedSearchBar
        onChangeText={(text) => {
          setInputtedText(text);
        }}
        onSubmitEditing={() => {
          setSearching(true);
        }}
        value={InputtedText}
        placeholder="Search"
        onTapIcon={() => {
          setInputtedText(''), setFlatListData(storedTweets);
        }}
        showShadow={true}
      />
      <View style={styles.listWrapper}>
        <FlatList
          data={flatListData}
          refreshing={refreshing}
          onRefresh={async () => {
            setRefreshing(true);
          }}
          ListEmptyComponent={componentForEmptyList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          ref={flatListRef}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listWrapper: {
    marginTop: '2%',
  },
  itemWrapper: {
    paddingHorizontal: '2.5%',
    paddingTop: windowWidth * 0.04,
    paddingBottom: windowWidth * 0.05,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  upperItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    flex: 1,
    width: windowWidth * 0.14,
    height: windowWidth * 0.14,
    borderRadius: (windowWidth * 0.14) / 2,
    overflow: 'hidden',
    resizeMode: 'contain',
    marginRight: windowWidth * 0.01,
  },
  nameIdWrapper: {
    flex: 4,
    flexDirection: 'column',
    marginBottom: 8,
    marginTop: 8,
  },
  logo: {
    flex: 1,
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
    marginLeft: windowWidth * 0.01,
  },
  content: {
    marginVertical: windowWidth * 0.09,
  },
  p: {
    fontSize: 16,
  },
  footerItem: {
    flex: 1,
    flexDirection: 'row',
  },
  utilityRow: {
    flex: 1,
    flexDirection: 'row',
  },
  utilitySpace: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  utility: {
    height: windowWidth * 0.06,
    resizeMode: 'contain',
  },
  dateWrapper: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
