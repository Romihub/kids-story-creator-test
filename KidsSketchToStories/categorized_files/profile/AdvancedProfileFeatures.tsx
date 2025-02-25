// src/components/profile/AdvancedProfileFeatures.tsx
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useProfile } from '../../hooks/useProfile';
import { useTheme } from '../../hooks/useTheme';
import { useActivityStats } from '../../hooks/useActivityStats';
import { useConnectedAccounts } from '../../hooks/useConnectedAccounts';
import { AchievementCard } from './AchievementCard';
import { ThemePicker } from './ThemePicker';
import { ColorCustomizer } from './ColorCustomizer';
import { FontSelector } from './FontSelector';
import { DateRangePicker } from './DateRangePicker';
import { StatisticsChart } from './StatisticsChart';
import { ActivityBreakdown } from './ActivityBreakdown';
import { ConnectedAccountCard } from './ConnectedAccountCard';
import { AddAccountButton } from './AddAccountButton';

export const AdvancedProfileFeatures: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <AchievementsSection />
      <PersonalizationSection />
      <ActivityStatsSection />
      <ConnectedAccountsSection />
    </ScrollView>
  );
};

// Achievement System
export const AchievementsSection: React.FC = () => {
  const { profile } = useProfile();

  return (
    <View style={styles.section}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {profile.achievements.map(achievement => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            onPress={() => console.log('Achievement pressed:', achievement.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

// Custom Themes and Personalization
export const PersonalizationSection: React.FC = () => {
  const { theme, updateTheme } = useTheme();

  return (
    <View style={styles.section}>
      <ThemePicker currentTheme={theme} onThemeSelect={updateTheme} />
      <ColorCustomizer
        colors={theme.colors}
        onColorChange={(key, color) => 
          updateTheme({ colors: { ...theme.colors, [key]: color } })
        }
      />
      <FontSelector
        currentFont={theme.typography.fontFamily}
        onFontSelect={(font) => 
          updateTheme({ typography: { ...theme.typography, fontFamily: font } })
        }
      />
    </View>
  );
};

// Activity Statistics
export const ActivityStatsSection: React.FC = () => {
  const { stats } = useActivityStats();
  const [dateRange, setDateRange] = React.useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    end: new Date(),
  });

  return (
    <View style={styles.section}>
      <DateRangePicker
        range={dateRange}
        onRangeChange={setDateRange}
      />
      <StatisticsChart
        data={stats.chartData}
        type="line"
      />
      <ActivityBreakdown
        activities={stats.activities}
      />
    </View>
  );
};

// Connected Accounts Management
export const ConnectedAccountsSection: React.FC = () => {
  const { accounts, linkAccount, unlinkAccount } = useConnectedAccounts();

  return (
    <View style={styles.section}>
      {accounts.map(account => (
        <ConnectedAccountCard
          key={account.id}
          account={account}
          onUnlink={() => unlinkAccount(account.id)}
        />
      ))}
      <AddAccountButton
        onPress={linkAccount}
        availableProviders={['google', 'apple', 'facebook']}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  section: {
    padding: 16,
    marginBottom: 16,
  },
});