### AUTHENTICATION

# `AuthContext`
AuthContext is the centralized source for consuming and dispatching authentication-related updates.
    - State management: We do not update states individually.
    - Single source of truth: There should be only one authObject. Avoid duplicating it.
# AuthProvider
Before, using auth context, wrap your app with AuthProvider to access to the centralized `authObject`, `dispatch`, ...
# FormProvider
Provides form functions, prevents excessive prop drilling
# authObject
Demonstrates current status of the sign in session.
# authReducer | dispatch | initialAuthObject
Manage authObject centrally


