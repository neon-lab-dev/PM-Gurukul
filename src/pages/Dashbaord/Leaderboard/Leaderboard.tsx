import { useGetReferralLeaderboardQuery } from '../../../redux/Features/User/userApi';

interface LeaderboardUser {
  userId: string;
  name: string;
  email: string;
  mobileNumber: string;
  totalEarnings: number;
  totalReferredUsers: number;
  durationOnPlatform: string;
  rank: number;
}

const Leaderboard = () => {
  const { data, isLoading, error } = useGetReferralLeaderboardQuery({});
  
  const leaderboardData: LeaderboardUser[] = data?.leaderboard || [];

  // Medal colors and styles for top 3 positions
 const getRankStyles = (rank: number) => {
  switch(rank) {
    case 1: // Gold
      return {
        bg: 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200',
        border: 'border-yellow-500',
        text: 'text-yellow-900',
        accent: 'text-yellow-700',
        shadow: 'shadow-2xl shadow-yellow-500/30',
        rankBg: 'bg-yellow-500 text-white'
      };
    case 2: // Silver
      return {
        bg: 'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-50',
        border: 'border-gray-300',
        text: 'text-gray-800',
        accent: 'text-gray-600',
        shadow: 'shadow-xl shadow-gray-400/25',
        rankBg: 'bg-gray-500 text-white'
      };
    case 3: // Bronze
      return {
        bg: 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300',
        border: 'border-amber-600',
        text: 'text-amber-900',
        accent: 'text-amber-800',
        shadow: 'shadow-lg shadow-amber-500/25',
        rankBg: 'bg-amber-700 text-white'
      };
    default:
      return {
        bg: 'bg-white dark:bg-gray-800',
        border: 'border-gray-100 dark:border-gray-700',
        text: 'text-gray-800 dark:text-gray-100',
        accent: 'text-gray-600 dark:text-gray-300',
        shadow: 'shadow-md shadow-gray-200/30 dark:shadow-gray-900/30',
        rankBg: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
      };
  }
};

  const getRankIcon = (rank: number) => {
    switch(rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };
  if (isLoading) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Referral Leaderboard
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Loading top performers...
            </p>
          </div>
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg h-24"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We couldn't load the leaderboard. Please try again later.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            🏆 Referral Leaderboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our top performers who are leading the way with their referral success
          </p>
        </div>

        {/* Stats Overview */}
        {leaderboardData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {leaderboardData.length}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Total Participants</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                ₹{leaderboardData[0]?.totalEarnings || 0}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Top Earner</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {Math.max(...leaderboardData.map(user => user.totalReferredUsers))}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Most Referrals</div>
            </div>
          </div>
        )}

        {/* Leaderboard */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-6 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 font-semibold text-gray-700 dark:text-gray-300">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-4 md:col-span-3">User</div>
            <div className="col-span-3 md:col-span-2 text-center hidden md:block">Referrals</div>
            <div className="col-span-4 md:col-span-3 text-center">Earnings</div>
            <div className="col-span-3 md:col-span-2 text-center">Duration</div>
          </div>

          {/* Leaderboard Items */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {leaderboardData.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                  No data available
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Be the first to join the leaderboard!
                </p>
              </div>
            ) : (
              leaderboardData.map((user) => {
                const styles = getRankStyles(user.rank);
                return (
                  <div
                    key={user.userId}
                    className={`${styles.bg} ${styles.border} ${styles.shadow} transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl`}
                  >
                    <div className="grid grid-cols-12 gap-4 p-6 items-center">
                      {/* Rank */}
                      <div className="col-span-1 text-center">
                        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${user.rank <= 3 ? 'bg-white bg-opacity-20' : 'bg-gray-100 dark:bg-gray-700'} font-bold ${styles.text}`}>
                          {getRankIcon(user.rank)}
                        </div>
                      </div>

                      {/* User Info */}
                      <div className="col-span-4 md:col-span-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className={`font-semibold ${styles.text}`}>
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Referrals - Hidden on mobile */}
                      <div className="col-span-3 md:col-span-2 text-center hidden md:block">
                        <div className={`text-lg font-bold ${styles.text}`}>
                          {user.totalReferredUsers}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          Users
                        </div>
                      </div>

                      {/* Earnings */}
                      <div className="col-span-4 md:col-span-3 text-center">
                        <div className={`text-lg font-bold ${styles.text}`}>
                         ₹{user.totalEarnings}
                        </div>
                        <div className="text-xs text-green-600 dark:text-green-400">
                          Total Earned
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="col-span-3 md:col-span-2 text-center">
                        <div className={`text-sm font-semibold ${styles.text}`}>
                          {user.durationOnPlatform}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          On Platform
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Leaderboard updates in real-time • Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;