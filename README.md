# Project 2 - Movie Browser

For this project, you'll be implementing a movie browser. It will allow users to
search for movies included in the [Movie Database](https://api.themoviedb.org)
and view additional information about any movies they select.

## Requirements

- You may not import libraries other than the below:
  - `expo`
  - `react`
  - `react-native`
  - `prop-types`
  - `react-navigation`
  - Any library for icons
- There should be at least one `StackNavigator`
- There should be a search screen that allows users to search for movies
  - You should show more than 10 results if more than 10 results exist
- There should be a screen that shows additional information about a selected movie

The aesthetics of the app are up to you!

## My Solution

### Imported libraries (see package.json):

    "@expo/vector-icons": "^10.0.5",
    "expo": "^34.0.0",
    "react": "16.8.6",
    "react-native": "https://github.com/expo/react-native/archive/sdk-34.0.0.tar.gz",
    "react-navigation": "^3.2.0"

### Navigation

The navigation of my App uses 3 StackNavigators and 1 TabNavigator:

- MainNavigator (StackNavigator)
  - SearchScreen
  - MoviesScreen
  - MovieDetailScreen
  - SettingsScreen
  - CreditTabsNavigator (TabNavigator)
    - CastNavigator (StackNavigator)
      - CastScreen
      - ProfileScreen
    - CrewNavigator (StackNavigator)
      - CrewScreen
      - ProfileScreen

### Screens

The App contains 7 different screens:

The App starts with the `SearchScreen`.
A search-field allows to input the text and the search results are shown in a list below (`MoviesScreen`).
The search screen contains also a link to the `SettingsScreen` where the language can be chosen between English, French and German.
When selecting a movie from the list, the `MovieDetailScreen` is shown with additional information about the film and a button to show the credits.
Clicking the credits button leads to the `CreditTabsNavigator` with two tabs showing the `CastScreen` and the `CrewScreen`. Both screens show a list of people with some basic information. When selected, the `ProfileScreen` of this person is shown.
The profile contains a button to show movies with that person. When clicked, the `MoviesScreen` is shown again with the corresponding movies.
If the user wants to do a new search from the beginning, she can click a header-button that clears the navigators (pop-to-top)

### Lists

The MovieScreen, the CrewScreen and the CastScreen use FlatList to render a potentially great number of items.
The MovieDetailScreen and the ProfileScreen have a known number of elements - although the size of the elements will differ. Therefore, I use ScrollLists to make the screen scrollable if the content is larger than the app's screen.

### Demo

A demo video of my implementation run on an Android emulator can be watched here: https://youtu.be/shWMCl4o7Rs
