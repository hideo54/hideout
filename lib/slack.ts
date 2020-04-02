import { WebClient } from '@slack/web-api';

const statuses = {
    'asleep': {
        isAway: true,
        status_emoji: ':zzz:',
        status_text: '睡眠中',
    },
    'awake_at_home': {
        isAway: false,
        status_emoji: ':house:',
        status_text: '自宅で覚醒中',
    },
    'slack_at_home': {
        isAway: false,
        status_emoji: ':house:',
        status_text: '自宅でだらだら中',
    },
    'at_univ': {
        isAway: false,
        status_emoji: ':utokyo:',
        status_text: '駒場にいます',
    },
    'outside': {
        isAway: false,
        status_emoji: ':walking:',
        status_text: '外出中',
    },
};

export type DefinedSlackStatus = keyof typeof statuses;

export const setStatus = async (webClient: WebClient, status: DefinedSlackStatus) => {
    const { isAway, status_emoji, status_text } = statuses[status];
    const currentProfile = (await webClient.users.profile.get()).profile;
    // @ts-ignore
    const currentStatusEmoji = currentProfile.status_emoji;
    const isStatusChanged = currentStatusEmoji === status_emoji;
    if (isStatusChanged) {
        await webClient.users.setPresence({ presence: isAway ? 'away' : 'auto' });
        await webClient.users.profile.set({
            profile: JSON.stringify({ status_text, status_emoji }),
        });
        await webClient.chat.postMessage({
            channel: process.env.SLACK_CHANNEL!,
            text: `My status is changed to ${status_emoji}: ${status_text}`,
        });
    }
};