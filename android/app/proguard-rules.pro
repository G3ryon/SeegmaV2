# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:
-dontnote io.nlopez.**
-dontwarn io.nlopez.**

-dontnote org.apache.**
-dontnote module-info
-dontnote expo.**
-dontwarn expo.**
-dontnote com.**
-dontnote kotlin.**
-dontnote com.swmansion.**
-dontnote kotlin.reflect.jvm.internal.impl.serialization.deserialization.**
-dontwarn module-info.class
-dontwarn module-info
-dontnote okhttp3.**
-dontnote okio.**
-dontnote org.unimodules.**

-addconfigurationdebugging
-dontobfuscate