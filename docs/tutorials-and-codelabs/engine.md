---
id: engine
title: Codelab · Manage FHIR Resources
description: Build a Kotlin Multiplatform app that syncs patients with a FHIR server, changes them locally, and searches them with the Kotlin FHIR Engine.
slug: /tutorials-and-codelabs/engine/
sidebar_label: FHIR Engine Codelab
sidebar_position: 10
guide_type: Codelab
guide_status: ready
repository: kotlin-fhir-engine
---

## Step 1 · Before you begin

### What you will build

In this codelab, you build a Kotlin Multiplatform app with the Kotlin FHIR Engine. Your app uses the engine to download FHIR resources from a FHIR server, and to upload any local changes to the server. The same code runs on Android, iOS, Desktop (JVM) and Web (Wasm).

### What you will learn

- How to run a local HAPI FHIR server with Docker
- How to integrate the Kotlin FHIR Engine into your Kotlin Multiplatform application
- How to use the Sync API to download and upload FHIR resources
- How to use the Search API
- How to use the Data Access APIs to create, read, update, and delete FHIR resources locally

### What you will need

- Docker with Docker Compose ([get Docker](https://docs.docker.com/get-docker/))
- A recent version of [Android Studio](https://developer.android.com/studio)
- The [Android Emulator](https://developer.android.com/studio/run/emulator) or a physical Android device running Android 8.0 (API 26) or later
- JDK 21
- A Mac with [Xcode](https://developer.apple.com/xcode/) if you also want to run the iOS app
- The sample code
- Basic knowledge of Kotlin and [Jetpack Compose](https://developer.android.com/compose)

This codelab is focused on the [Kotlin FHIR Engine](https://github.com/ohs-foundation/kotlin-fhir-engine). Concepts and code that are not relevant to the engine are glossed over and provided for you to copy and paste. If you have not built a Kotlin Multiplatform app before, start by [creating your first Compose Multiplatform app](https://www.jetbrains.com/help/kotlin-multiplatform-dev/compose-multiplatform-create-first-app.html).

## Step 2 · Get the code and start a FHIR server

### Download the code

You only need the `codelabs` folder of the Kotlin FHIR Engine repository. You can fetch just that part of the repository with a [sparse checkout](https://git-scm.com/docs/git-sparse-checkout), which needs Git 2.25 or later.

```shell
git clone --depth 1 --filter=blob:none --sparse https://github.com/ohs-foundation/kotlin-fhir-engine.git
cd kotlin-fhir-engine
git sparse-checkout set codelabs gradle
```

The `gradle` folder is needed too, because the codelab reads its library versions from `gradle/libs.versions.toml` at the root of the repository.

Alternatively, clone the whole repository.

```shell
git clone https://github.com/ohs-foundation/kotlin-fhir-engine.git
```

The starter project for this codelab is in `codelabs/`.

### Start a local FHIR server with test data

[HAPI FHIR](https://hapifhir.io/hapi-fhir/) is a popular open source FHIR server. The app in this codelab connects to a local HAPI FHIR server.

The `codelabs` folder includes a Docker Compose file that starts a HAPI FHIR server and loads three test patients into it. Run the following command in the `codelabs` folder.

```shell
docker compose up -d
```

The first run downloads the HAPI FHIR image, which can take a few minutes. After that, the server starts in about half a minute. You can carry on with the next step while it starts.

To check that the test data is on the server, open `http://localhost:8080/fhir/Patient` in a browser. You should see a FHIR Bundle as the search result, with a `total` count of 3.

![The HAPI FHIR server returning a search result Bundle with a total of 3 patients](../images/engine-codelab-server-patients.png)

The test patients are in `data/patients.json`. To reset the server to them, for example to run the update step again, run `docker compose down` and then `docker compose up -d`. When you finish the codelab, stop the server with `docker compose down`.

## Step 3 · Set up the project

### Project structure

| Module | Contents |
| --- | --- |
| `shared` | The engine setup, sync, view model and UI in `commonMain`, and each platform's entry point |
| `androidApp` | Android entry point that initializes the engine |
| `iosApp` | Xcode project that shows `App()` through `MainViewController()` |

The platform entry points are already written for you. Everything you write in this codelab goes into five files in `shared/src/commonMain/kotlin/dev/ohs/fhir/codelab/`.

- `FhirEngineSetup.kt`
- `DownloadWorkManagerImpl.kt`
- `AppFhirSyncTask.kt`
- `PatientListViewModel.kt`
- `PatientListScreen.kt`

Each place you change is marked with a numbered comment, such as `// 4 Replace with code from the codelab to initialize the FHIR Engine.` The number tells you which step of the codelab adds the code.

### Import the app into Android Studio

Open Android Studio, select **Open** and choose the `codelabs` folder from the code you downloaded.

### The Kotlin FHIR Engine dependency

The Kotlin FHIR Engine dependencies are already in the `commonMain` source set of `shared/build.gradle.kts`.

```kotlin
kotlin {
  sourceSets {
    commonMain.dependencies {
      api("dev.ohs.fhir:fhir-engine:2.0.0-alpha05")
      api("dev.ohs.fhir:fhir-model-r4:1.0.0-rc03")
      // ...
    }
  }
}
```

Because the dependencies are in `commonMain`, Gradle picks the right artifact for each target platform.

The FHIR model is [Kotlin FHIR](https://github.com/ohs-foundation/kotlin-fhir), not HAPI. Kotlin FHIR resources are immutable. To change a resource, make a copy with `copy(...)`.

### Sync your project with Gradle files

To be sure that all dependencies are available to your app, select **Sync Project with Gradle Files** from the Android Studio toolbar.

### Run the starter app

Connect your Android device to your computer over USB, or [start the Android Studio emulator](https://developer.android.com/studio/run/emulator). Select the `androidApp` run configuration and click **Run** in the Android Studio toolbar. You can also install the app from the command line, in the `codelabs` folder.

```shell
./gradlew :androidApp:installDebug
```

Because the FHIR Engine is not initialized yet, the app shows a Hello World screen.

![The starter app showing a Hello World message](../images/engine-codelab-starter-app.png)

There is not much here yet, so the next step creates the FHIR Engine.

### Run the app on other platforms

Because the app is built with Kotlin Multiplatform, you can run it on other platforms too, at any step of the codelab. Run the Gradle commands in the `codelabs` folder.

| Platform | Command or action |
| --- | --- |
| Desktop (JVM) | `./gradlew :shared:run` |
| Web (Wasm) | `./gradlew :shared:wasmJsBrowserDevelopmentRun`, then open `http://localhost:8081` |
| iOS | Open `iosApp/iosApp.xcodeproj` in Xcode, select a simulator, and click **Run** |

On iOS, Xcode builds the `shared` framework with Gradle. To run on a real device, follow the [iOS app instructions](https://github.com/ohs-foundation/kotlin-fhir-engine/blob/main/codelabs/iosApp/README.md).

## Step 4 · Create the FHIR Engine instance

In this step, you initialize the FHIR Engine with the address of your local FHIR server.

Along the way, Android Studio prompts you to add these imports.

- `dev.ohs.fhir.engine.DatabaseErrorStrategy`
- `dev.ohs.fhir.engine.FhirEngineConfiguration`
- `dev.ohs.fhir.engine.FhirEngineProvider`
- `dev.ohs.fhir.engine.ServerConfiguration`
- `dev.ohs.fhir.engine.sync.remote.HttpLogger`

### Initialize the engine

Open `shared/src/commonMain/kotlin/dev/ohs/fhir/codelab/FhirEngineSetup.kt`. Find the `// 4 Replace with code from the codelab to initialize the FHIR Engine.` comment in `initFhirEngine` and replace it with the following code.

```kotlin
// 4 Initialize the FHIR Engine
FhirEngineProvider.init(
  FhirEngineConfiguration(
    databaseErrorStrategy = DatabaseErrorStrategy.RECREATE_AT_OPEN,
    serverConfiguration =
      ServerConfiguration(
        baseUrl = baseUrl,
        httpLogger =
          HttpLogger(if (debug) HttpLogger.Level.BODY else HttpLogger.Level.BASIC),
      ),
    storageDirectory = storageDirectory,
  ),
  platformContext,
)
```

- `platformContext` is the application `Context` on Android, and `Unit` on other platforms.
- `baseUrl` is the base URL of the FHIR server.
- `httpLogger` logs the requests to the server. The logs show up in Logcat on Android, the Xcode console on iOS, the terminal on Desktop and the browser console on Web.
- `storageDirectory` is where the database is stored. Only Desktop and Web use it.
- `RECREATE_AT_OPEN` makes the engine delete the database and create a new one if the database fails to open.
- `enableEncryption = true` encrypts the database with SQLCipher. It is supported on Android only.

### Call it at startup

Each platform calls `initFhirEngine` once at startup, and the starter already has these calls. On Android, `FhirApplication.onCreate()` calls it.

```kotlin
initFhirEngine(this, baseUrl = "http://10.0.2.2:8080/fhir/", debug = BuildConfig.DEBUG)
```

`10.0.2.2` is the `localhost` of the host machine as seen from the Android emulator. Learn more about [emulator networking](https://developer.android.com/studio/run/emulator-networking). The Desktop, Web, and iOS entry points call it with `Unit` and `http://localhost:8080/fhir/`.

You can get the engine anywhere with `FhirEngineProvider.getInstance(platformContext)`.

Now that the engine is initialized, run the app again. Instead of the Hello World screen, you should see the patient list. The list stays empty until you sync with the server in the next step.

![The app showing an empty patient list with Sync and Update buttons](../images/engine-codelab-empty-list.png)

## Step 5 · Sync data with the FHIR server

In this step, you download patients from the FHIR server into the local database, and upload local changes back to the server.

Along the way, Android Studio prompts you to add these imports.

- `dev.ohs.fhir.model.r4.Bundle`
- `dev.ohs.fhir.engine.FhirEngineProvider`
- `dev.ohs.fhir.engine.sync.AcceptLocalConflictResolver`
- `dev.ohs.fhir.engine.sync.upload.HttpCreateMethod`
- `dev.ohs.fhir.engine.sync.upload.HttpUpdateMethod`

### Define which resources to download

Open `DownloadWorkManagerImpl.kt` in `commonMain`. Replace the two `// 5.1 Replace with code from the codelab ...` comments, and the `return` lines below them, so that the class looks like this.

```kotlin
class DownloadWorkManagerImpl : DownloadWorkManager {
  private val urls = ArrayDeque(listOf("Patient"))

  override suspend fun getNextRequest(): DownloadRequest? {
    // 5.1 Return the next download request
    val url = urls.removeFirstOrNull() ?: return null
    return DownloadRequest.of(url)
  }

  override suspend fun getSummaryRequestUrls() = mapOf<ResourceType, String>()

  override suspend fun processResponse(response: Resource): Collection<Resource> {
    // 5.1 Extract the resources from the response
    if (response is Bundle && response.type.value == Bundle.BundleType.Searchset) {
      return response.entry.mapNotNull { it.resource }
    }
    return emptyList()
  }
}
```

This class has a queue of URLs to download. It extracts the resources from each returned bundle, and the engine saves them in the local database.

### Define how the app syncs

Open `AppFhirSyncTask.kt` in `commonMain`. Replace the `// 5.2 Replace the functions below with code from the codelab to define how the app syncs.` comment and the four functions below it, so that the class looks like this.

```kotlin
class AppFhirSyncTask(private val platformContext: Any) : FhirSyncTask {
  // 5.2 Define the download manager, conflict resolver, FHIR Engine and upload strategy
  override fun getDownloadWorkManager(): DownloadWorkManager = DownloadWorkManagerImpl()

  override fun getConflictResolver(): ConflictResolver = AcceptLocalConflictResolver

  override fun getFhirEngine(): FhirEngine = FhirEngineProvider.getInstance(platformContext)

  override fun getUploadStrategy(): UploadStrategy =
    UploadStrategy.forBundleRequest(
      methodForCreate = HttpCreateMethod.PUT,
      methodForUpdate = HttpUpdateMethod.PATCH,
      squash = true,
      bundleSize = 500,
    )
}
```

This class defines which download manager, conflict resolver, and FHIR Engine instance to use for syncing. All platforms use it.

Shared code starts a sync through the `SyncLauncher` interface. Each platform has its own implementation, which is already in the starter.

- On Android, `AndroidSyncLauncher` enqueues `AppFhirSyncWorker` with WorkManager, so the sync continues in the background. The worker delegates to `AppFhirSyncTask`.
- On Desktop, Web, and iOS, `ForegroundSyncLauncher` runs `AppFhirSyncTask` with `runSync` in the coroutine of the app. The sync stops if the app closes.

```kotlin
class AndroidSyncLauncher(private val context: Context) : SyncLauncher {
  override suspend fun oneTimeSync() = Sync.oneTimeSync<AppFhirSyncWorker>(context)
}
```

### Start the sync

Open `PatientListViewModel.kt`. Find the `// 5.3 Replace with code from the codelab to start the sync.` comment in `triggerOneTimeSync()` and replace it with the following code.

```kotlin
// 5.3 Start the sync
scope.launch { syncLauncher.oneTimeSync().collect { _pollState.emit(it) } }
```

This coroutine starts a one-time sync with the FHIR server, and forwards the state of the sync to the UI.

### Show when the sync finishes

Open `PatientListScreen.kt`. Find the `// 5.4 Replace with code from the codelab to show a message when the sync completes.` comment in `handleSyncJobStatus` and replace it with the following code.

```kotlin
// 5.4 Show a message when the sync completes
when (syncJobStatus) {
  is CurrentSyncJobStatus.Succeeded -> {
    viewModel.refreshPatients()
    snackbarHostState.showSnackbar("Sync Finished")
  }
  else -> {}
}
```

When the sync finishes, the app reloads all patients from the local database with `refreshPatients()`, which is already in the starter, and shows a message to the user.

Run your app and tap **Sync**. The patients from your local FHIR server are downloaded and displayed in the app.

![The app showing three synced patients and a Sync Finished message](../images/engine-codelab-synced-list.png)

## Step 6 · Modify and upload patient data

In this step, you swap the address cities of patients in Wakefield and Taunton, then upload the changes to the FHIR server. All the code in this step goes in the `PatientListViewModel` class in `PatientListViewModel.kt`.

Along the way, Android Studio prompts you to add this import.

- `dev.ohs.fhir.engine.search.StringFilterModifier`

You also need the Kotlin FHIR `String` type. It has the same name as the Kotlin `String` type, so add it by hand with an alias.

```kotlin
import dev.ohs.fhir.model.r4.String as FhirString
```

If you import `dev.ohs.fhir.model.r4.String` without the alias, it hides the Kotlin `String` type and parameters such as `city: String` no longer compile.

### Search for patients by city

Find the `// 6.1 Replace with code from the codelab to search for patients by city.` comment and replace it with the following code.

```kotlin
// 6.1 Search for patients by city
private suspend fun searchByCity(city: String): List<Patient> =
  fhirEngine
    .search<Patient> {
      filter(
        StringClientParam("address-city"),
        {
          modifier = StringFilterModifier.MATCHES_EXACTLY
          value = city
        },
      )
    }
    .map { it.resource }
```

There are no generated search parameter constants, so use the FHIR search parameter name, here `address-city`.

### Change the city of a patient

Find the `// 6.2 Replace with code from the codelab to change the city of a patient.` comment and replace it with the following code.

```kotlin
// 6.2 Change the city of a patient
private fun Patient.withCity(city: String): Patient =
  copy(
    address =
      address.mapIndexed { index, address ->
        if (index == 0) address.copy(city = FhirString(value = city)) else address
      },
  )
```

Kotlin FHIR resources are immutable, so this function makes a copy of the patient with the new city.

### Update the patients, then sync

Find the `// 6.3 Replace with code from the codelab to update the patients and sync.` comment in `triggerUpdate()` and replace it with the following code.

```kotlin
// 6.3 Update the patients and sync
scope.launch {
  val patientsFromWakefield = searchByCity("Wakefield")
  val patientsFromTaunton = searchByCity("Taunton")

  patientsFromWakefield.forEach { fhirEngine.update(it.withCity("Taunton")) }
  patientsFromTaunton.forEach { fhirEngine.update(it.withCity("Wakefield")) }

  triggerOneTimeSync()
}
```

After changing the data locally, the app triggers a one-time sync to upload the changes to the FHIR server.

Your `PatientListViewModel` class should now look like this.

```kotlin
class PatientListViewModel(
  private val fhirEngine: FhirEngine,
  private val syncLauncher: SyncLauncher,
  private val scope: CoroutineScope,
) {
  private val _pollState = MutableSharedFlow<CurrentSyncJobStatus>()
  val pollState: SharedFlow<CurrentSyncJobStatus> = _pollState

  private val _patients = MutableStateFlow<List<Patient>>(emptyList())
  val patients: StateFlow<List<Patient>> = _patients

  private var loadJob: Job? = null

  init {
    refreshPatients()
  }

  /** Loads all patients from the local database, sorted by given name. */
  fun refreshPatients() = showPatients {
    fhirEngine
      .search<Patient> { sort(StringClientParam("given"), Order.ASCENDING) }
      .map { it.resource }
  }

  /**
   * Shows the patients that [load] returns. Cancels the previous load, so an older search can't
   * replace the result of a newer one.
   */
  private fun showPatients(load: suspend () -> List<Patient>) {
    loadJob?.cancel()
    loadJob = scope.launch { _patients.value = load() }
  }

  fun triggerOneTimeSync() {
    // 5.3 Start the sync
    scope.launch { syncLauncher.oneTimeSync().collect { _pollState.emit(it) } }
  }

  // 6.1 Search for patients by city
  private suspend fun searchByCity(city: String): List<Patient> =
    fhirEngine
      .search<Patient> {
        filter(
          StringClientParam("address-city"),
          {
            modifier = StringFilterModifier.MATCHES_EXACTLY
            value = city
          },
        )
      }
      .map { it.resource }

  // 6.2 Change the city of a patient
  private fun Patient.withCity(city: String): Patient =
    copy(
      address =
        address.mapIndexed { index, address ->
          if (index == 0) address.copy(city = FhirString(value = city)) else address
        },
    )

  /** Swaps the city of patients in Wakefield and Taunton, then syncs the changes. */
  fun triggerUpdate() {
    // 6.3 Update the patients and sync
    scope.launch {
      val patientsFromWakefield = searchByCity("Wakefield")
      val patientsFromTaunton = searchByCity("Taunton")

      patientsFromWakefield.forEach { fhirEngine.update(it.withCity("Taunton")) }
      patientsFromTaunton.forEach { fhirEngine.update(it.withCity("Wakefield")) }

      triggerOneTimeSync()
    }
  }

  fun searchPatientsByName(nameQuery: String) {
    // 7 Replace with code from the codelab to search for patients by name.
  }
}
```

### Test the functionality

1. Run your app and tap **Update**. The address cities of the patients `Aaron697` and `Abby752` swap.
2. Open `http://localhost:8080/fhir/Patient` in a browser. The address cities of `Aaron697` and `Abby752` are updated on the local FHIR server too.

## Step 7 · Search for patients by name

In this step, you filter the patient list by the name typed in the search field.

Find the `// 7 Replace with code from the codelab to search for patients by name.` comment in `searchPatientsByName` and replace it with the following code.

```kotlin
// 7 Search for patients by name
showPatients {
  fhirEngine
    .search<Patient> {
      if (nameQuery.isNotEmpty()) {
        filter(
          StringClientParam("name"),
          {
            modifier = StringFilterModifier.CONTAINS
            value = nameQuery
          },
        )
      }
    }
    .map { it.resource }
}
```

If `nameQuery` is not empty, the search returns only the patients whose names contain it. `showPatients`, which is already in the starter, shows the result. Each letter you type starts a new search, so `showPatients` cancels the previous search first. Otherwise an older search, such as the one for the first letter, could finish last and replace the result.

Run your app again. You can now enter a name, or part of a name, in the search field to filter the list of patients.

![The app showing only Abby752 after searching for Abby](../images/engine-codelab-search.png)

## Step 8 · Congratulations

You have used the Kotlin FHIR Engine to manage FHIR resources in your app. You can now do the following.

- Use the Sync API to sync FHIR resources with a FHIR server
- Use the Data Access API to create, read, update, and delete local FHIR resources
- Use the Search API to search local FHIR resources

### What you covered

- How to run a local HAPI FHIR server with test data
- How to add the Kotlin FHIR Engine to your Kotlin Multiplatform app
- How to use the Sync API, Data Access API, and Search API of the Kotlin FHIR Engine

## Where to go next

- Run the codelab on Desktop, Web and iOS.
- Download other resource types by adding them to the `urls` queue in `DownloadWorkManagerImpl`.
- Add periodic sync. The [engine app](https://github.com/ohs-foundation/kotlin-fhir-engine/tree/main/engine-app) has an example on every platform, and [Synchronization](/fhir-foundations/kotlin-fhir-engine/synchronization/) describes the sync API.
- Explore the Search API. The [conformance statement](https://github.com/ohs-foundation/kotlin-fhir-engine/blob/main/docs/conformance.md) lists the supported search parameter types, modifiers and prefixes.
