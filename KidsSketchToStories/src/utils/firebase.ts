import analytics from '@react-native-firebase/analytics';

export const logEvent = async (eventName: string, params?: Object) => {
  try {
    await analytics().logEvent(eventName, params);
  } catch (error) {
    console.error('Analytics error:', error);
  }
};

export const setUserProperties = async (properties: Object) => {
  try {
    await analytics().setUserProperties(properties);
  } catch (error) {
    console.error('Set user properties error:', error);
  }
};

export const setUserId = async (userId: string | null) => {
  try {
    await analytics().setUserId(userId);
  } catch (error) {
    console.error('Set user ID error:', error);
  }
};

export const setCurrentScreen = async (screenName: string) => {
  try {
    await analytics().logScreenView({
      screen_name: screenName,
      screen_class: screenName,
    });
  } catch (error) {
    console.error('Set screen error:', error);
  }
};