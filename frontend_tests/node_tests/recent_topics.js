zrequire('message_util');

set_global('$', global.make_zjquery({
    silent: true,
}));
set_global('hashchange', {
    exit_overlay: () => {},
});
set_global('overlays', {
    open_overlay: (opts) => {
        overlays.close_callback = opts.on_close;
    },
});
set_global('people', {
    is_my_user_id: function (id) {
        return id === 1;
    },
    sender_info_with_small_avatar_urls_for_sender_ids: (ids) => {
        return ids;
    },
});
set_global('XDate', zrequire('XDate', 'xdate'));
set_global('timerender', {
    last_seen_status_from_date: () => {
        return "Just now";
    },
});
set_global('unread', {
    unread_topic_counter: {
        get: (stream_id, topic) => {
            if (stream_id === 1 && topic === "topic-1") {
                // Only stream1, topic-1 is read.
                return 0;
            }
            return 1;
        },
    },
});
set_global('hash_util', {
    by_stream_uri: () => {
        return "https://www.example.com";
    },
    by_stream_topic_uri: () => {
        return "https://www.example.com";
    },
});
set_global('recent_senders', {
    get_topic_recent_senders: () => { return [1, 2]; },
});

// Custom Data

// New stream
const stream1 = 1;
const stream2 = 2;
const stream3 = 3;

// Topics in the stream, all unread except topic1 & stream1.
const topic1 = "topic-1";  // No Other sender & read.
const topic2 = "topic-2";  // Other sender
const topic3 = "topic-3";  // User not present
const topic4 = "topic-4";  // User not present
const topic5 = "topic-5";  // other sender
const topic6 = "topic-6";  // other sender
const topic7 = "topic-7";  // muted topic
const topic8 = "topic-8";
const topic9 = "topic-9";

set_global('muting', {
    is_topic_muted: (stream_id, topic) => {
        if (stream_id === stream1 && topic === topic7) {
            return true;
        }
        return false;
    },
});

// sender1 == current user
// sender2 == any other user
const sender1 = 1;
const sender2 = 2;

const messages = [];

set_global('message_list', {
    all: {
        all_messages: function () {
            return messages;
        },
    },
});
set_global('message_store', {
    get: (msg_id) => {
        return messages[msg_id - 1];
    },
});

let id = 0;

messages[0] = {
    stream_id: stream1,
    stream: 'stream1',
    id: id += 1,
    topic: topic1,
    sender_id: sender1,
    type: 'stream',
};

messages[1] = {
    stream_id: stream1,
    stream: 'stream1',
    id: id += 1,
    topic: topic2,
    sender_id: sender1,
    type: 'stream',
};

messages[2] = {
    stream_id: stream1,
    stream: 'stream1',
    id: id += 1,
    topic: topic2,
    sender_id: sender2,
    type: 'stream',
};

messages[3] = {
    stream_id: stream1,
    stream: 'stream1',
    id: id += 1,
    topic: topic3,
    sender_id: sender2,
    type: 'stream',
};

messages[4] = {
    stream_id: stream1,
    stream: 'stream1',
    id: id += 1,
    topic: topic4,
    sender_id: sender2,
    type: 'stream',
};

messages[5] = {
    stream_id: stream1,
    stream: 'stream1',
    id: id += 1,
    topic: topic5,
    sender_id: sender1,
    type: 'stream',
};

messages[6] = {
    stream_id: stream1,
    stream: 'stream1',
    id: id += 1,
    topic: topic5,
    sender_id: sender2,
    type: 'stream',
};

messages[7] = {
    stream_id: stream1,
    stream: 'stream1',
    id: id += 1,
    topic: topic6,
    sender_id: sender1,
    type: 'stream',
};

messages[8] = {
    stream_id: stream1,
    stream: 'stream1',
    id: id += 1,
    topic: topic6,
    sender_id: sender2,
    type: 'stream',
};

messages[9] = {
    stream_id: stream1,
    stream: 'stream1',
    id: id += 1,
    topic: topic7,
    sender_id: sender1,
    type: 'stream',
};

function verify_topic_data(all_topics, stream, topic, last_msg_id,
                           participated) {
    const topic_data = all_topics.get(stream + ':' + topic);
    assert.equal(topic_data.last_msg_id, last_msg_id);
    assert.equal(topic_data.participated, participated);
}

run_test("test_recent_topics_launch", () => {
    // Note: unread count and urls are fake,
    // since they are generated in external libraries
    // and are not to be tested here.
    const expected = {
        recent_topics: [
            {
                stream_id: 1,
                stream: 'stream1',
                topic: 'topic-7',
                unread_count: 1,
                last_msg_time: 'Just now',
                stream_url: 'https://www.example.com',
                topic_url: 'https://www.example.com',
                hidden: true,
                senders: [1, 2],
                count_senders: 0,
            },
            {
                stream_id: 1,
                stream: 'stream1',
                topic: 'topic-6',
                unread_count: 1,
                last_msg_time: 'Just now',
                stream_url: 'https://www.example.com',
                topic_url: 'https://www.example.com',
                hidden: false,
                senders: [1, 2],
                count_senders: 0,
            },
            {
                stream_id: 1,
                stream: 'stream1',
                topic: 'topic-5',
                unread_count: 1,
                last_msg_time: 'Just now',
                stream_url: 'https://www.example.com',
                topic_url: 'https://www.example.com',
                hidden: false,
                senders: [1, 2],
                count_senders: 0,
            },
            {
                stream_id: 1,
                stream: 'stream1',
                topic: 'topic-4',
                unread_count: 1,
                last_msg_time: 'Just now',
                stream_url: 'https://www.example.com',
                topic_url: 'https://www.example.com',
                hidden: false,
                senders: [1, 2],
                count_senders: 0,
            },
            {
                stream_id: 1,
                stream: 'stream1',
                topic: 'topic-3',
                unread_count: 1,
                last_msg_time: 'Just now',
                stream_url: 'https://www.example.com',
                topic_url: 'https://www.example.com',
                hidden: false,
                senders: [1, 2],
                count_senders: 0,
            },
            {
                stream_id: 1,
                stream: 'stream1',
                topic: 'topic-2',
                unread_count: 1,
                last_msg_time: 'Just now',
                stream_url: 'https://www.example.com',
                topic_url: 'https://www.example.com',
                hidden: false,
                senders: [1, 2],
                count_senders: 0,
            },
            {
                stream_id: 1,
                stream: 'stream1',
                topic: 'topic-1',
                unread_count: 0,
                last_msg_time: 'Just now',
                stream_url: 'https://www.example.com',
                topic_url: 'https://www.example.com',
                hidden: false,
                senders: [1, 2],
                count_senders: 0,
            },
        ],
    };

    global.stub_templates(function (template_name, data) {
        assert.equal(template_name, 'recent_topics_table');
        assert.deepEqual(data, expected);
        return '<recent_topics table stub>';
    });

    const rt = zrequire('recent_topics');
    rt.process_messages(messages);

    rt.launch();
    overlays.close_callback();

    // incorrect topic_key
    assert.equal(rt.inplace_rerender('stream_unknown:topic_unknown'), false);
});

run_test('test_filter_all', () => {
    // Just tests inplace rerender of a message
    // in All topics filter.
    let expected = {
        count_senders: 0,
        hidden: false,
        last_msg_time: 'Just now',
        senders: [1, 2],
        stream: 'stream1',
        stream_id: 1,
        stream_url: 'https://www.example.com',
        topic: 'topic-1',
        topic_url: 'https://www.example.com',
        unread_count: 0,
    };

    global.stub_templates(function (template_name, data) {
        assert.equal(template_name, 'recent_topic_row');
        assert.deepEqual(data, expected);
        return '<recent_topics row stub>';
    });

    // topic is not muted
    const rt = zrequire('recent_topics');
    rt.process_messages([messages[0]]);

    expected = {
        stream_id: 1,
        stream: 'stream1',
        topic: 'topic-7',
        unread_count: 1,
        last_msg_time: 'Just now',
        stream_url: 'https://www.example.com',
        topic_url: 'https://www.example.com',
        hidden: true,
        senders: [1, 2],
        count_senders: 0,
    };

    // topic is muted (=== hidden)
    rt.process_messages([messages[9]]);
});

run_test('test_filter_unread', () => {
    // Tests rerender of all topics when filter changes to "unread".
    const expected =   {
        recent_topics: [
            {
                count_senders: 0,
                hidden: true,
                last_msg_time: 'Just now',
                senders: [1, 2],
                stream: 'stream1',
                stream_id: 1,
                stream_url: 'https://www.example.com',
                topic: 'topic-7',
                topic_url: 'https://www.example.com',
                unread_count: 1,
            },
            {
                count_senders: 0,
                hidden: false,
                last_msg_time: 'Just now',
                senders: [1, 2],
                stream: 'stream1',
                stream_id: 1,
                stream_url: 'https://www.example.com',
                topic: 'topic-6',
                topic_url: 'https://www.example.com',
                unread_count: 1,
            },
            {
                count_senders: 0,
                hidden: false,
                last_msg_time: 'Just now',
                senders: [1, 2],
                stream: 'stream1',
                stream_id: 1,
                stream_url: 'https://www.example.com',
                topic: 'topic-5',
                topic_url: 'https://www.example.com',
                unread_count: 1,
            },
            {
                count_senders: 0,
                hidden: false,
                last_msg_time: 'Just now',
                senders: [1, 2],
                stream: 'stream1',
                stream_id: 1,
                stream_url: 'https://www.example.com',
                topic: 'topic-4',
                topic_url: 'https://www.example.com',
                unread_count: 1,
            },
            {
                count_senders: 0,
                hidden: false,
                last_msg_time: 'Just now',
                senders: [1, 2],
                stream: 'stream1',
                stream_id: 1,
                stream_url: 'https://www.example.com',
                topic: 'topic-3',
                topic_url: 'https://www.example.com',
                unread_count: 1,
            },
            {
                count_senders: 0,
                hidden: false,
                last_msg_time: 'Just now',
                senders: [1, 2],
                stream: 'stream1',
                stream_id: 1,
                stream_url: 'https://www.example.com',
                topic: 'topic-2',
                topic_url: 'https://www.example.com',
                unread_count: 1,
            },
            {
                count_senders: 0,
                hidden: true,  // This is the only thing we are testing here
                last_msg_time: 'Just now',
                senders: [1, 2],
                stream: 'stream1',
                stream_id: 1,
                stream_url: 'https://www.example.com',
                topic: 'topic-1',
                topic_url: 'https://www.example.com',
                unread_count: 0,
            },
        ],
    };

    const rt = zrequire('recent_topics');

    global.stub_templates(function () {
        return '<recent_topics table stub>';
    });
    rt.process_messages(messages);

    $('#recent_topics_filter_buttons').removeClass('btn-recent-selected');
    global.stub_templates(function (template_name, data) {
        assert.equal(template_name, 'recent_topics_table');
        assert.deepEqual(data, expected);
        return '<recent_topics table stub>';
    });
    rt.set_filter('unread');

    // Unselect "unread" filter by clicking twice.
    expected.recent_topics[6].hidden = false;
    rt.set_filter('unread');

    // Now clicking "all" filter should have no change to expected data.
    rt.set_filter('all');
});

run_test('test_filter_participated', () => {
    // Tests rerender of all topics when filter changes to "unread".
    const expected =   {
        recent_topics: [
            {
                count_senders: 0,
                hidden: true,
                last_msg_time: 'Just now',
                senders: [1, 2],
                stream: 'stream1',
                stream_id: 1,
                stream_url: 'https://www.example.com',
                topic: 'topic-7',
                topic_url: 'https://www.example.com',
                unread_count: 1,
            },
            {
                count_senders: 0,
                hidden: false,
                last_msg_time: 'Just now',
                senders: [1, 2],
                stream: 'stream1',
                stream_id: 1,
                stream_url: 'https://www.example.com',
                topic: 'topic-6',
                topic_url: 'https://www.example.com',
                unread_count: 1,
            },
            {
                count_senders: 0,
                hidden: false,
                last_msg_time: 'Just now',
                senders: [1, 2],
                stream: 'stream1',
                stream_id: 1,
                stream_url: 'https://www.example.com',
                topic: 'topic-5',
                topic_url: 'https://www.example.com',
                unread_count: 1,
            },
            {
                count_senders: 0,
                hidden: true,
                last_msg_time: 'Just now',
                senders: [1, 2],
                stream: 'stream1',
                stream_id: 1,
                stream_url: 'https://www.example.com',
                topic: 'topic-4',
                topic_url: 'https://www.example.com',
                unread_count: 1,
            },
            {
                count_senders: 0,
                hidden: true,
                last_msg_time: 'Just now',
                senders: [1, 2],
                stream: 'stream1',
                stream_id: 1,
                stream_url: 'https://www.example.com',
                topic: 'topic-3',
                topic_url: 'https://www.example.com',
                unread_count: 1,
            },
            {
                count_senders: 0,
                hidden: false,
                last_msg_time: 'Just now',
                senders: [1, 2],
                stream: 'stream1',
                stream_id: 1,
                stream_url: 'https://www.example.com',
                topic: 'topic-2',
                topic_url: 'https://www.example.com',
                unread_count: 1,
            },
            {
                count_senders: 0,
                hidden: false,
                last_msg_time: 'Just now',
                senders: [1, 2],
                stream: 'stream1',
                stream_id: 1,
                stream_url: 'https://www.example.com',
                topic: 'topic-1',
                topic_url: 'https://www.example.com',
                unread_count: 0,
            },
        ],
    };

    const rt = zrequire('recent_topics');

    global.stub_templates(function () {
        return '<recent_topics table stub>';
    });
    rt.process_messages(messages);

    $('#recent_topics_filter_buttons').removeClass('btn-recent-selected');
    global.stub_templates(function (template_name, data) {
        assert.equal(template_name, 'recent_topics_table');
        assert.deepEqual(data, expected);
        return '<recent_topics table stub>';
    });
    rt.set_filter('participated');

    expected.recent_topics[3].hidden = false;
    expected.recent_topics[4].hidden = false;
    rt.set_filter('all');
});

// template rendering is tested in test_recent_topics_launch.
global.stub_templates(function () {
    return '<recent_topics table stub>';
});

run_test('basic assertions', () => {
    const rt = zrequire('recent_topics');
    rt.process_messages(messages);
    let all_topics = rt.get();

    // update a message
    rt.process_messages([messages[9]]);
    // Check for expected lengths.
    // total 7 topics, 1 muted
    assert.equal(all_topics.size, 7);
    assert.equal(Array.from(all_topics.keys()).toString(),
                 '1:topic-7,1:topic-6,1:topic-5,1:topic-4,1:topic-3,1:topic-2,1:topic-1');

    rt.process_message({
        type: 'private',
    });

    // Private msgs are not processed.
    assert.equal(all_topics.size, 7);
    assert.equal(Array.from(all_topics.keys()).toString(),
                 '1:topic-7,1:topic-6,1:topic-5,1:topic-4,1:topic-3,1:topic-2,1:topic-1');

    // participated
    verify_topic_data(all_topics, stream1, topic1, messages[0].id, true);

    // No message was sent by us.
    verify_topic_data(all_topics, stream1, topic3, messages[3].id, false);

    // Not participated
    verify_topic_data(all_topics, stream1, topic4, messages[4].id, false);

    // topic3 now participated
    rt.process_message({
        stream_id: stream1,
        id: id += 1,
        topic: topic3,
        sender_id: sender1,
        type: 'stream',
    });

    all_topics = rt.get();
    assert.equal(Array.from(all_topics.keys()).toString(),
                 '1:topic-3,1:topic-7,1:topic-6,1:topic-5,1:topic-4,1:topic-2,1:topic-1');
    verify_topic_data(all_topics, stream1, topic3, id, true);

    // Send new message to topic7 (muted)
    // The topic will be hidden when displayed
    rt.process_message({
        stream_id: stream1,
        id: id += 1,
        topic: topic7,
        sender_id: sender1,
        type: 'stream',
    });

    all_topics = rt.get();
    assert.equal(Array.from(all_topics.keys()).toString(),
                 '1:topic-7,1:topic-3,1:topic-6,1:topic-5,1:topic-4,1:topic-2,1:topic-1');

    // unmute topic7
    assert.equal(rt.update_topic_is_muted(stream1, topic7, false), true);

    // mute topic7
    assert.equal(rt.update_topic_is_muted(stream1, topic7, true), true);

    // a topic gets muted which we are not tracking
    assert.equal(rt.update_topic_is_muted(stream1, "topic-10", true), false);
});

run_test('test_topic_edit', () => {
    // NOTE: This test should always run in the end as it modified the messages data.
    const rt = zrequire('recent_topics');
    rt.process_messages(messages);

    let all_topics = rt.get();
    assert.equal(Array.from(all_topics.keys()).toString(),
                 '1:topic-7,1:topic-6,1:topic-5,1:topic-4,1:topic-3,1:topic-2,1:topic-1');

    ////////////////// test change topic //////////////////
    verify_topic_data(all_topics, stream1, topic6, messages[8].id, true);
    assert.equal(all_topics.get(stream1 + ":" + topic8), undefined);

    // change topic of topic6 to topic8
    messages[7].topic = topic8;
    messages[8].topic = topic8;
    rt.process_topic_edit(stream1, topic6, topic8);
    all_topics = rt.get();

    verify_topic_data(all_topics, stream1, topic8, messages[8].id, true);
    assert.equal(all_topics.get(stream1 + ":" + topic6), undefined);

    ////////////////// test stream change //////////////////
    verify_topic_data(all_topics, stream1, topic1, messages[0].id, true);
    assert.equal(all_topics.get(stream2 + ":" + topic1), undefined);

    messages[0].stream_id = stream2;
    rt.process_topic_edit(stream1, topic1, topic1, stream2);
    all_topics = rt.get();

    assert.equal(all_topics.get(stream1 + ":" + topic1), undefined);
    verify_topic_data(all_topics, stream2, topic1, messages[0].id, true);

    ////////////////// test stream & topic change //////////////////
    verify_topic_data(all_topics, stream2, topic1, messages[0].id, true);
    assert.equal(all_topics.get(stream3 + ":" + topic9), undefined);

    messages[0].stream_id = stream3;
    messages[0].topic = topic9;
    rt.process_topic_edit(stream2, topic1, topic9, stream3);
    all_topics = rt.get();

    assert.equal(all_topics.get(stream2 + ":" + topic1), undefined);
    verify_topic_data(all_topics, stream3, topic9, messages[0].id, true);
});
