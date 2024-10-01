"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'

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
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            router.push(ROUTES.home);
        }
    }, [isLoaded, isSignedIn, router])
}