import { OAuthStrategy } from '@clerk/types';
import PlaceholderIcon from './PlaceholderIcon'
import react from 'react';

export const oauthMapping: Partial<{ [ key in OAuthStrategy ]?: { name: string, icon: React.FC} }> = {
    "oauth_google": { name: "Google", icon: PlaceholderIcon },
    "oauth_facebook": { name: "Facebook", icon: PlaceholderIcon },
    "oauth_github": { name: "GitHub", icon: PlaceholderIcon },
    "oauth_gitlab": { name: "GitLab", icon: PlaceholderIcon },
    "oauth_discord": { name: "Discord", icon: PlaceholderIcon },
    "oauth_twitter": { name: "Twitter", icon: PlaceholderIcon },
    "oauth_hubspot": { name: "HubSpot", icon: PlaceholderIcon },
    "oauth_tiktok": { name: "TikTok", icon: PlaceholderIcon },
    "oauth_twitch": { name: "Twitch", icon: PlaceholderIcon },
    "oauth_x": { name: "X", icon: PlaceholderIcon },
    "oauth_line": { name: "LINE", icon: PlaceholderIcon },
    "oauth_linear": { name: "Linear", icon: PlaceholderIcon },
}