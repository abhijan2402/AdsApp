import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../Components/FeedHeader';
import FONT from '../../../Constants/Font';
import {COLOR} from '../../../Constants/Colors';
import {windowWidth} from '../../../Constants/Dimensions';
import {AuthContext} from '../../../Backend/AuthContent';

// ✅ Import Google Ads
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const Home = () => {
  const [totalPoints] = useState(3250);
  const [conversionRate] = useState(0.1); // 1 point = 0.10 INR
  const [withdrawHistory] = useState([
    {id: 1, amount: 250, date: '15 Sep 2025'},
    {id: 2, amount: 500, date: '08 Sep 2025'},
    {id: 3, amount: 300, date: '01 Sep 2025'},
    {id: 4, amount: 150, date: '25 Aug 2025'},
    {id: 5, amount: 400, date: '18 Aug 2025'},
  ]);

  const [tasks, setTasks] = useState([
    {id: 1, title: 'Visit daily to earn 40 points', points: 40, claimed: false},
    {id: 2, title: 'Watch 1 Ad to earn 20 points', points: 20, claimed: false},
    {
      id: 3,
      title: 'Refer a friend to earn 100 points',
      points: 100,
      claimed: false,
    },
  ]);

  const auth = useContext(AuthContext);
  const {user} = auth;

  const totalMoney = (totalPoints * conversionRate).toFixed(2);

  const handleClaim = taskId => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? {...task, claimed: true} : task,
      ),
    );
  };

  // ✅ Use Test Banner ID for development
  const bannerAdUnitId = __DEV__
    ? TestIds.BANNER
    : 'ca-app-pub-3056425951476582/1234567890';

  return (
    <View style={styles.safeArea}>
      <Header title={'Home'} />

      <ScrollView contentContainerStyle={styles.container}>
        {/* ---------- Banner Card ---------- */}
        <View style={styles.bannerCard}>
          <Image
            source={{
              uri: 'https://img.freepik.com/free-vector/digital-marketing-illustration_23-2148864589.jpg',
            }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerTitle}>Earn Money!</Text>
            <Text style={styles.bannerSubtitle}>
              Watch ads & complete tasks to earn rewards instantly.
            </Text>
          </View>
        </View>

        {/* ---------- User Info ---------- */}
        <View style={styles.userInfoSection}>
          <Text style={styles.welcomeText}>Welcome, </Text>
          <Text style={styles.userName}>{user?.name}</Text>
        </View>

        {/* ---------- Tasks Section ---------- */}
        <View style={styles.taskSection}>
          <Text style={styles.taskTitle}>Earn more by doing simple tasks</Text>
          {tasks.map(task => (
            <View key={task.id} style={styles.taskRow}>
              <View style={{flex: 1}}>
                <Text style={styles.taskText}>{task.title}</Text>
                <Text style={styles.taskPoints}>{task.points} Points</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.claimButton,
                  task.claimed && styles.claimedButton,
                ]}
                disabled={task.claimed}
                onPress={() => handleClaim(task.id)}>
                <Text
                  style={[
                    styles.claimButtonText,
                    task.claimed && styles.claimedButtonText,
                  ]}>
                  {task.claimed ? 'Claimed' : 'Claim'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* ---------- Withdraw History ---------- */}
        {/* <View style={styles.historySection}>
          <Text style={styles.historyTitle}>Last 5 Withdrawals</Text>
          {withdrawHistory.map(item => (
            <View key={item.id} style={styles.historyRow}>
              <Text style={styles.historyDate}>{item.date}</Text>
              <Text style={styles.historyAmount}>₹{item.amount}</Text>
            </View>
          ))}
        </View> */}
      </ScrollView>

      {/* ---------- Google Banner Ad ---------- */}
      <View style={styles.adContainer}>
        <BannerAd
          unitId={bannerAdUnitId}
          // size={BannerAdSize.FULL_BANNER}
          size={BannerAdSize.LARGE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
    paddingBottom: 80, // space for banner ad
  },

  /* ---------- Banner ---------- */
  bannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5E6',
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  bannerImage: {
    width: 70,
    height: 70,
    borderRadius: 14,
    marginRight: 16,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 18,
    fontFamily: FONT.Bold,
    color: '#FF8C00',
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
    fontFamily: FONT.Medium,
  },

  /* ---------- User Info ---------- */
  userInfoSection: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  welcomeText: {
    fontSize: 20,
    color: '#555',
    fontFamily: FONT.Medium,
  },
  userName: {
    fontSize: 20,
    color: COLOR.primary,
    fontFamily: FONT.Bold,
  },

  /* ---------- Tasks ---------- */
  taskSection: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#EEE',
    marginBottom: 20,
  },
  taskTitle: {
    fontSize: 16,
    fontFamily: FONT.SemiBold,
    marginBottom: 12,
    color: COLOR.black,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  taskText: {
    fontSize: 14,
    fontFamily: FONT.Medium,
    color: '#333',
    width: windowWidth / 1.8,
  },
  taskPoints: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
    fontFamily: FONT.Medium,
  },
  claimButton: {
    backgroundColor: COLOR.primary,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  claimButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FONT.SemiBold,
  },
  claimedButton: {
    backgroundColor: '#ccc',
  },
  claimedButtonText: {
    color: '#555',
  },

  /* ---------- Withdraw History ---------- */
  historySection: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEE',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  historyTitle: {
    fontSize: 16,
    fontFamily: FONT.SemiBold,
    marginBottom: 12,
    color: '#000',
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  historyDate: {
    fontSize: 14,
    color: '#555',
    fontFamily: FONT.SemiBold,
  },
  historyAmount: {
    fontSize: 14,
    fontFamily: FONT.Bold,
    color: '#007AFF',
  },

  /* ---------- Ad Container ---------- */
  adContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
});
