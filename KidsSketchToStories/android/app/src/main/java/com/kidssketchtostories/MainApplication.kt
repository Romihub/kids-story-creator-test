package com.kidssketchtostories

import android.app.Application
import android.util.Log
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader
import com.facebook.FacebookSdk
import com.facebook.appevents.AppEventsLogger

class MainApplication : Application(), ReactApplication {

  override fun onCreate() {
    super.onCreate()
    Log.d("MainApplication", "Application onCreate started")

    // Initialize Facebook SDK first
    try {
      FacebookSdk.apply {
        setApplicationId(getString(R.string.facebook_app_id))
        setClientToken(getString(R.string.facebook_client_token))
        sdkInitialize(applicationContext)
        setAutoInitEnabled(true)
        fullyInitialize()
      }
      AppEventsLogger.activateApp(this)
      Log.d("MainApplication", "Facebook SDK initialized successfully")
    } catch (e: Exception) {
      Log.e("MainApplication", "Error in Facebook SDK initialization: ${e.message}", e)
    }

    try {
      SoLoader.init(this, false)
      if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
        load()
      }
    } catch (e: Exception) {
      Log.e("MainApplication", "Error in SoLoader initialization", e)
    }
    
    Log.d("MainApplication", "Application onCreate completed")
  }

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> {
          Log.d("MainApplication", "Getting packages")
          return PackageList(this).packages
        }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)
}