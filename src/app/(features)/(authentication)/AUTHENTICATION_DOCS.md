### AUTHENTICATION

# `AuthContext`
AuthContext is the centralized source for consuming and dispatching authentication-related updates.
    
    State management: We do not update states individually.
    Single source of truth: There should be only one authObject. Avoid duplicating it.

# AuthProvider
To use AuthContext, wrap your application with AuthProvider.
This grants access to:

    The centralized authObject
    The dispatch function for managing authentication state

# FormProvider
Provides form functions by the `useForm` from `react-hook-form`, prevents excessive prop drilling
# authObject
Demonstrates current status of the sign in session.

    Tracks sign-in/sign-up progress.
    Reflects authentication stages (e.g., OTP entry, verification, form submitting, success).

authReducer | dispatch | initialAuthObject

Manages authObject through a centralized reducer pattern:

    authReducer: Handles authentication state transitions.
    dispatch: Updates authObject based on dispatched actions.
    initialAuthObject: Defines the default authentication state at initialization.

