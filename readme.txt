React Native App Structure:

This is a demo application structure demonstrating production-ready code organization. 
It does not include React Native CLI/Expo build-related files.

STRUCTURE:
- app.js: Application entry point
- appStyles.js: Global application styles
- contexts/: React Context providers (FavoriteProvider.js)
- hooks/: Custom React hooks (useAppInitialization.js, useStartPageLogic.js)
- screens/: Screen components with co-located Styles.js files
- utils/: Utility functions, constants, and helpers

FILE ORGANIZATION:
Each screen will have its own directory with component and Styles.js file.
Custom hooks extract business logic from components.
Utilities are organized by functionality.

