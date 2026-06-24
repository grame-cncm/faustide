type ScopeChannelRouteOptions = {
    /** Source splitter feeding the analyser. */
    splitter: ChannelSplitterNode;
    /** Analyser that should receive exactly one selected channel. */
    analyser: AnalyserNode;
    /** Number of available splitter outputs. */
    channels: number;
    /** Currently connected channel index. */
    currentChannel: number;
    /** Requested channel index. */
    nextChannel: number;
};

/**
 * Reconnects the analyser to a different splitter output.
 *
 * The new channel is connected before the old channel is disconnected. Keep
 * this ordering: Chrome may inspect and prune the audio graph when the analyser
 * is temporarily disconnected.
 *
 * Returns the accepted channel index, or `undefined` when the requested channel
 * is outside the available channel count.
 */
export const routeScopeChannel = ({
    splitter,
    analyser,
    channels,
    currentChannel,
    nextChannel
}: ScopeChannelRouteOptions) => {
    if (nextChannel >= channels) return undefined;
    if (nextChannel === currentChannel) return nextChannel;

    splitter.connect(analyser, nextChannel, 0);
    setTimeout(() => {
        try {
            splitter.disconnect(analyser, currentChannel, 0);
        } catch {} // eslint-disable-line no-empty
    }, 10);

    return nextChannel;
};
