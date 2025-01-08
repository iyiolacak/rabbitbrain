import { OAuthStrategy } from '@clerk/types';
import PlaceholderIcon from './PlaceholderIcon';

export const oauthMapping: Partial<{ [ key in OAuthStrategy ]?: { name: string, icon: React.FC} }> = {
    "oauth_google": { name: "Google", icon: PlaceholderIcon },
    "oauth_github": { name: "GitHub", icon: PlaceholderIcon },
    "oauth_discord": { name: "Discord", icon: PlaceholderIcon },
    "oauth_twitter": { name: "Twitter", icon: PlaceholderIcon },
    "oauth_tiktok": { name: "TikTok", icon: PlaceholderIcon },
    "oauth_twitch": { name: "Twitch", icon: PlaceholderIcon },
    "oauth_x": { name: "X", icon: PlaceholderIcon },
}