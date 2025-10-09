import React, {use, useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Header from '../../../Components/FeedHeader';
import FONT from '../../../Constants/Font';
import {COLOR} from '../../../Constants/Colors';
import {windowWidth} from '../../../Constants/Dimensions';
import {AuthContext} from '../../../Backend/AuthContent';
import {useApi} from '../../../Backend/Api';
import {api_routes} from '../../../Constants/ApiRoute';
import {useToast} from '../../../Constants/ToastContext';

// ✅ Import Google Ads
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import CustomButton from '../../../Components/CustomButton';

const Home = ({navigation}) => {
  const [totalPoints] = useState(3250);
  const [conversionRate] = useState(0.1); // 1 point = 0.10 INR
  const {getRequest, putRequest} = useApi();

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Visit daily to earn 40 points',
      points: 40,
      claimed: false,
      keyName: 'visitedDate',
      matchName: 'visitedToday',
    },
    {
      id: 2,
      title: 'Watch 1 Ad to earn 20 points',
      points: 20,
      claimed: false,
      keyName: 'dailyAdClaimedDate',
      matchName: 'adClaimedToday',
    },
    {
      id: 3,
      title: 'Refer a friend to earn 100 points',
      points: 100,
      claimed: false,
      keyName: null,
      matchName: null,
    },
  ]);

  const auth = useContext(AuthContext);
  const {user} = auth;
  const [lastTransaction, setLastTransaction] = useState([]);
  const {showToast} = useToast();
  const [loading, setLoading] = useState(false);

  console.log(user, 'USERRRR');
  useEffect(() => {
    getDashboardData();
    getHomeData();
  }, []);

  const getHomeData = async () => {
    try {
      const response = await getRequest(api_routes.user_analytics);
      if (!response.success) throw response;
      setLastTransaction(response?.data?.response?.latestTransactions);
    } catch (error) {
      showToast(error.error, 'error');
    }
  };

  const getDashboardData = async () => {
    try {
      const response = await getRequest(api_routes.get_dashboard_data);
      if (!response.success) throw response;
      const dashboardData = response?.data?.response?.dashboard;
      const updatedTasks = tasks.map(task => {
        if (task.matchName && dashboardData.hasOwnProperty(task.matchName)) {
          return {...task, claimed: dashboardData[task.matchName]};
        }
        return task;
      });
      setTasks(updatedTasks);
    } catch (error) {
      showToast(error.error, 'error');
    }
  };

  const totalMoney = (totalPoints * conversionRate).toFixed(2);

  const handleClaim = async taskId => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || !task.keyName) {
      console.log('No keyName for this task or task not found');
      return;
    }

    const data = {
      keyName: task.keyName,
      points: task.points,
    };
    Alert.alert(
      'Confirm Claim',
      `Do you want to claim and earn ${task.points} points?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            setLoading(true);
            try {
              const response = await putRequest(
                api_routes.update_dashboard_data,
                data,
              );
              if (!response.success) throw response;
              await getDashboardData();
              showToast(`You earned ${task.points} points!`, 'success');
              setLoading(false);
            } catch (error) {
              console.log(error);
              setLoading(false);
              showToast(error.error || 'Failed to claim task', 'error');
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={30} color={'black'} />
      </View>
    );
  }

  // ✅ Use Test Banner ID for development
  const bannerAdUnitId = __DEV__
    ? TestIds.BANNER
    : 'ca-app-pub-3056425951476582~1460645342';

  return (
    <View style={styles.safeArea}>
      <Header title={'Home'} />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.adContainer}>
          <BannerAd
            unitId={bannerAdUnitId}
            // size={BannerAdSize.FULL_BANNER}
            size={BannerAdSize.MEDIUM_RECTANGLE}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </View>
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
        {user?.email == 'admin_ashishjat@gmail.com' && (
          <CustomButton
            title={'See Request'}
            style={{marginVertical: 15}}
            onPress={() => {
              navigation.navigate('AdminRequestMenu');
            }}
          />
        )}
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
        {lastTransaction?.length > 0 && (
          <View style={styles.historySection}>
            <Text style={styles.historyTitle}>Last 5 Withdrawals</Text>
            {lastTransaction.map(item => (
              <View key={item.id} style={styles.historyRow}>
                <Text style={styles.historyDate}>
                  {new Date(item.createdAt).toDateString()}
                </Text>
                <Text style={styles.historyAmount}>₹{item.amountRedeemed}</Text>
              </View>
            ))}
          </View>
        )}
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
      </ScrollView>
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
    marginTop: 10,
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
