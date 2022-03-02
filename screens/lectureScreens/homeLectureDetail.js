import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, FlatList, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
  MaterialIcons,
} from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';

// スタイルとコンポーネントのインポート
import CustomedButton from '../../Components/CustomedButton';
import CommonStyles from '../../StyleSheet/CommonStyels';

// 教室名と棟名が空白の場合の処理
function changePlaceName(room, building,) {
  if (room == '' || building == '') {
    return '未定またはオンライン講義です';
  }
  else if (building != '' && room == '') {
    return building;
  }
  else if (building == '' && room != '') {
    return room;
  }
  else if (building != '' && room != '') {
    return building + '\n' + room;
  }
};

//授業詳細画面
export default function LectureDetail({ navigation }) {
  const route = useRoute();
  const lectureName = route.params.科目;
  const teacher = route.params.担当;
  const roomName = route.params.教室名;
  const buildingName = route.params.棟名;
  const displayedRoomName = changePlaceName(roomName, buildingName);
  const [taskInfo, setTaskInfo] = useState();
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const HeaderComponent = () => (
    <>
      <View style={styles.headerIconTitleWrapper}>
        <View style={styles.iconFlex}>
          <MaterialIcons name="title" size={24} color="dimgray" />
        </View>
        <View style={styles.textFlex}>
          <Text style={CommonStyles.largeFont}>{lectureName}</Text>
        </View>
      </View>
      <View style={styles.headerIconTitleWrapper}>
        <View style={styles.iconFlex}>
          <Ionicons name="person" size={18} color="dimgray" />
        </View>
        <View style={styles.textFlex}>
          <Text style={CommonStyles.largeFont}>{teacher}</Text>
        </View>
      </View>
      <View style={styles.headerIconTitleWrapper}>
        <View style={styles.iconFlex}>
          <MaterialIcons name="meeting-room" size={18} color="dimgray" />
        </View>
        <View style={styles.textFlex}>
          <Text style={CommonStyles.largeFont}>{displayedRoomName}</Text>
        </View>
      </View>
      <View style={styles.scheduleTitleWrapper}>
        <Text style={CommonStyles.largeFont}>スケジュール</Text>
      </View>
    </>
  )

  const investigateIsCheckedAndNavigate = () => {
    if (taskInfo) {
      const checkedItem = taskInfo.filter((task) => {
        return task.checked === true;
      });
      // checkedItemは配列[{...}]の形になっているためcheckedItem[0]とした
      if (checkedItem.length == 1) {
        navigation.navigate('スケジュールの追加・編集', checkedItem[0]);
        return;
      } else {
        Alert.alert(
          '', '編集したいスケジュールを1つだけ選んでください。',
          [
            { text: '戻る' },
          ],
          { cancelable: false }
        );
      }
    }
    else {
      Alert.alert(
        '', '編集したいスケジュールを選んでください。',
        [
          { text: '戻る' },
        ],
        { cancelable: false }
      );
    }
  };

  const deleteTask = () => {
    if (taskInfo) {
      const newTasks = taskInfo.filter((task) => {
        return task.checked === false;
      });
      setTaskInfo(newTasks);
      setIsDataChanged(!isDataChanged);
    }
    else {
      Alert.alert(
        '', '削除したいスケジュールを選んでください。',
        [
          { text: '戻る' },
        ],
        { cancelable: false }
      );
    }
  };

  const FotterComponent = () => (
    <>
      <View style={styles.iconWrapper}>
        {/* タッチしたアイコンごとに処理を変更 */}
        {/* 🖊をタップ => 該当するタスクの詳細を編集 */}
        {/* プラスボタンをタップ => 該新しいイベントを追加 */}
        <TouchableOpacity
          style={[styles.iconBackCricle, styles.buttonShadow, CommonStyles.bgColorTomato]}
          onPress={deleteTask}
        >
          <FontAwesome5 name="trash-alt" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconBackCricle, styles.buttonShadow, CommonStyles.bgColorTomato]}
          onPress={() => investigateIsCheckedAndNavigate()}>
          <FontAwesome5 name="pen" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconBackCricle, styles.buttonShadow, CommonStyles.bgColorTomato]}
          onPress={() => navigation.navigate('スケジュールの追加・編集')}>
          <Entypo name="add-to-list" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );

  const ContentWhenNoData = () => (
    <View style={styles.emptyContentWrapper}>
      <Text style={CommonStyles.basicFont}>スケジュールを追加できます</Text>
    </View>
  );

  const showHideMemo = (indexNum) => {
    taskInfo[indexNum].showMemo = !taskInfo[indexNum].showMemo;
    setTaskInfo(taskInfo);
    setIsDataChanged(!isDataChanged);
  };

  const checkMark = (indexNum) => {
    taskInfo[indexNum].checked = !taskInfo[indexNum].checked;
    setTaskInfo(taskInfo);
    setIsDataChanged(!isDataChanged);
  };

  const renderItem = ({ item, index }) => (
    <View>
      <View style={styles.innerMargin}>
        <View style={styles.checkMark}>
          <View style={styles.checkBoxWrapper}>
            <CheckBox
              checked={item.checked}
              onPress={() => {
                taskInfo && checkMark(index);
              }}
            />
          </View>
        </View>
        <Pressable
          style={styles.periodTitleWrapper}
          onPress={() => {
            taskInfo && showHideMemo(index);
          }}>
          <View style={styles.periodWrapper}>
            <Text>
              {item.startMonth}/{item.startDay} ~ {item.endMonth}/{item.endDay}
            </Text>
          </View>
          <View style={styles.taskTitleWrapper}>
            <Text style={styles.titleText}>{item.title}</Text>
          </View>
          {!item.showMemo && <View style={styles.arrowIcon}><FontAwesome5 name="angle-double-down" size={24} color="dimgray" /></View>}
          {item.showMemo && <View style={styles.arrowIcon}><FontAwesome5 name="angle-double-up" size={24} color="dimgray" /></View>}
        </Pressable>
      </View>
      {item.showMemo && item.memo ? (
        <View style={styles.memoWrapper}>
          <Text>{item.memo}</Text>
        </View>
      ) : (
        <></>
      )}
    </View>
  )

  return (
    <>
      <FlatList
        data={taskInfo}
        style={[CommonStyles.bgColorWhite, CommonStyles.viewPageContainer]}
        renderItem={renderItem}
        extraData={isDataChanged}
        keyExtractor={(item, index) => index}
        ListEmptyComponent={ContentWhenNoData}
        ListHeaderComponent={HeaderComponent}
        ListFooterComponent={FotterComponent}
      />
    </>
  )
}

const styles = StyleSheet.create({
  // 講義情報について
  headerIconTitleWrapper: {
    marginVertical: 2,
    padding: 5,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
  },
  iconFlex: {
    alignItems: 'center',
    flex: 1,
  },
  textFlex: {
    alignSelf: 'flex-start',
    flex: 6,
  },
  // スケジュール関連
  scheduleTitleWrapper: {
    marginLeft: 10,
    marginTop: 40,
    marginBottom: 20,
    width: '100%',
  },
  emptyContentWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },

  // 各タスク
  innerMargin: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    padding: 5,
  },
  checkBoxWrapper: {
    flex: 1,
  },
  periodTitleWrapper: {
    flex: 10,
    flexDirection: 'row',
    height: '100%',
  },
  periodWrapper: {
    height: '100%',
    justifyContent: 'center',
    flex: 4,
  },
  taskTitleWrapper: {
    height: '100%',
    justifyContent: 'center',
    flex: 6,
  },
  arrowIcon: {
    paddingRight: 5,
    justifyContent: 'flex-end',
  },
  memoWrapper: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },

  // アイコン関連
  iconWrapper: {
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'space-around',
    flex: 1,
    flexDirection: 'row',
  },
  iconBackCricle: {
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height
      ) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: (Dimensions.get('window').width * 0.5) / 3,
    height: (Dimensions.get('window').width * 0.5) / 3,
  },
  buttonShadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
  },
});
