import { fetchChatGroupConversations, sendChatMessage } from "../chat-api";
// import { fetchChatGroupConversations, sendChatMessage } from "../chat-api/mocks";

export const SEND_MESSAGE_BEGIN = 'SEND_MESSAGE_BEGIN';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILED = 'SEND_MESSAGE_FAILED';

export const FETCH_GROUP_CONVERSATIONS_BEGIN = 'FETCH_GROUP_CONVERSATIONS_BEGIN';
export const FETCH_GROUP_CONVERSATIONS_SUCCESS = 'FETCH_GROUP_CONVERSATIONS_SUCCESS';
export const FETCH_GROUP_CONVERSATIONS_FAILED = 'FETCH_GROUP_CONVERSATIONS_FAILED';

export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';

export const receiveMessage = (payload) => ({
    type: MESSAGE_RECEIVED,
    payload
});

export const sendMessageBegin = () => ({
    type: SEND_MESSAGE_BEGIN
});

export const sendMessageSuccess = ({ message, username }) => ({
    type: SEND_MESSAGE_SUCCESS,
    payload: { message, username }
});

export const sendMessageFailed = error => ({
    type: SEND_MESSAGE_FAILED,
    payload: { error }
});


export const sendMessage = message => {
    return dispatch => {
        dispatch(sendMessageBegin());
        return sendChatMessage(message)
            .then(json => {
                dispatch(sendMessageSuccess(message));
                return json;
            })
            .catch(error =>
                dispatch(sendMessageFailed(error))
            );
    };
};


export const fetchGroupConversationsBegin = () => ({
    type: FETCH_GROUP_CONVERSATIONS_BEGIN
});

export const fetchGroupConversationsSuccess = (conversations) => ({
    type: FETCH_GROUP_CONVERSATIONS_SUCCESS,
    payload: { conversations }
});

export const fetchGroupConversationsFailed = error => ({
    type: FETCH_GROUP_CONVERSATIONS_FAILED,
    payload: { error }
});


export const fetchGroupConversations = () => {
    return dispatch => {
        dispatch(fetchGroupConversationsBegin());
        return fetchChatGroupConversations()
            .then(json => {
                dispatch(fetchGroupConversationsSuccess(json));
                return json;
            })
            .catch(error =>
                dispatch(fetchGroupConversationsFailed(error))
            );
    }
};
