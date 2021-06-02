import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';
import Conversation from '../components/messenger/conversation';
import Message from '../components/messenger/message';
import ChatOnline from '../components/messenger/chat_online';
import { AuthContext } from '../context/AuthContext';

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { user: currentUser } = useContext(AuthContext);
  const scrollRef = useRef();

  // get currentUsers conversations
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`/conversations/${currentUser._id}`);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [currentUser._id]);

  // get messages for the current conversation
  useEffect(() => {
    const getMessages = async () => {
      if (currentConversation !== null) {
        try {
          const res = await axios.get(`/messages/${currentConversation._id}`);
          setMessages(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getMessages();
  }, [currentConversation]);

  // handles submit and sets new message to state
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      conversationId: currentConversation,
      sender: currentUser._id,
      text: newMessage
    };
    try {
      const res = await axios.post('/messages', message);
      // add new message to messages state
      setMessages([...messages, res.data]);
      // clear field
      setNewMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  // handle scroll messages div down
  useEffect(() => {
    //  if (messages && scrollRef.current) {
    // could use smooth scroll object param { behavior: 'smooth' }, but anim is too slow, also somehow breaks new message scrolling, bug?
    scrollRef.current?.scrollIntoView();
    // }
  }, [messages]); // whenever messages change we should scoll down

  return (
    <>
      {/* Moved header absolute upwards to prevent it from being in viewport calc */}
      <div className="absolute left-0 flex w-full h-12 pt-12 -top-12">
        <Navbar />
      </div>
      <div className="flex w-full h-screen pt-12">
        <div className="w-3/12 h-full p-2">
          <div className="mb-2">
            <input
              placeholder="Search for friends"
              className="w-11/12 outline-none border-b border-gray-border"
            />
          </div>
          {conversations.map((c) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div
              key={c._id}
              className=""
              role="button"
              tabIndex="0"
              onClick={() => {
                setCurrentConversation(c);
              }}
            >
              <Conversation conversation={c} currentUser={currentUser} />
            </div>
          ))}
        </div>
        <div className="w-6/12 h-full p-2">
          <div className="flex flex-col h-5/6 justify-between relative">
            {currentConversation ? ( // !== undefined && currentConversation !== null
              <div className="h-full overflow-y-auto">
                {messages.map((m) => (
                  <div key={m._id} ref={scrollRef}>
                    <Message
                      // resolve owner of message comparing sender id and authed user
                      owner={m.sender === currentUser._id}
                      message={m}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <span className="opacity-20 font-bold text-5xl p-5">
                Open a conversation to start chatting.
              </span>
            )}
          </div>
          <div className="flex h-1/6 justify-between">
            <textarea
              rows="3"
              placeholder="Input text..."
              className="p-1 border w-4/5 resize-none rounded-md outline-none"
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />
            <button
              type="button"
              className={`w-1/6 bg-green-button p-2 rounded-xl text-white outline-none ${
                // disable button if textArea is empty a or conversation is not selected
                (newMessage.length === 0 || !currentConversation) && 'cursor-not-allowed opacity-25'
              }`}
              onClick={handleSubmit}
              disabled={
                newMessage.length < 1 ||
                currentConversation === null ||
                currentConversation === undefined
              }
            >
              Submit
            </button>
          </div>
        </div>
        <div className="w-3/12 h-full p-2">
          <ChatOnline />
          <ChatOnline />
          <ChatOnline />
        </div>
      </div>
    </>
  );
}
