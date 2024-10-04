"use client";
import { useEffect } from 'react'
import useNavigation from './useNavigation';


const ROUTES = {
    home: "/home",
    signIn: "/sign-in",
    signUp: "/sign-up",
};

type AuthRedirectParams = {
    isLoaded: boolean,
    isSignedIn: boolean,
}

export const useAuthRedirect = ({isLoaded, isSignedIn}: AuthRedirectParams) => {
    const { navigateTo } = useNavigation();

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            navigateTo(ROUTES.home);
        }
    }, [isLoaded, isSignedIn, navigateTo])
}