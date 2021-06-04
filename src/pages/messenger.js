import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { formatISO } from 'date-fns';
import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import Conversation from '../components/messenger/conversation';
import Message from '../components/messenger/message';
import ChatOnline from '../components/messenger/chat_online';
import { AuthContext } from '../context/AuthContext';
import { SOCKET } from '../constants/const';

export default function Messenger() {
  const conversation = useParams(null);
  const [conversations, setConversations] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [incomingMessage, setIncomingMessage] = useState(null);
  const socketRef = useRef(null);
  const { user: currentUser } = useContext(AuthContext);
  const scrollRef = useRef();

  // create a connection to socket server on 1st render
  useEffect(() => {
    // set socketRef.current using websocket(ws)
    socketRef.current = io(SOCKET);

    //
    socketRef.current.on('getMessage', (data) => {
      setIncomingMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: formatISO(Date.now())
      });
    });
  }, []); // run only once (on first render)

  // get incoming messages
  useEffect(() => {
    //
    // eslint-disable-next-line no-unused-expressions
    incomingMessage &&
      currentConversation?.members.includes(incomingMessage.sender) &&
      setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage, currentConversation]);

  // register user with socket server, id with userId
  useEffect(() => {
    // add currentUser to sockets users array
    socketRef.current.emit('addUser', currentUser._id);
    // get updated list of clients
    socketRef.current.on('getUsers', (users) => {
      // filter onlineUsers from currentusers followings using sockets list of online users
      setOnlineUsers(currentUser.followings.filter((f) => users.some((u) => u.userId === f)));
    });
  }, [currentUser]);

  // set currentconversation if param id is provided
  useEffect(() => {
    const getConversation = async () => {
      if (conversation.id !== null && conversation.id !== undefined) {
        try {
          const res = await axios.get(`/conversations/${conversation.id}/find`);
          setCurrentConversation(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getConversation();
  }, []);

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

    // get reveicers userId from currentConversation, only has 2 values find the one not CurrentUser
    const receiverId = currentConversation?.members.find((member) => member !== currentUser._id);
    // send socket a notification on a new message
    socketRef.current.emit('sendMessage', {
      senderId: currentUser._id,
      receiverId,
      text: newMessage
    });

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
            <Conversation
              key={c._id}
              conversation={c}
              currentUser={currentUser}
              setCurrentConversation={setCurrentConversation}
            />
          ))}
        </div>
        <div className="w-6/12 h-full p-2">
          <div className="flex flex-col h-5/6 justify-between relative">
            {currentConversation ? ( // !== undefined && currentConversation !== null
              <div className="h-full overflow-y-auto">
                {messages.map((m) => (
                  <div key={m.createdAt} ref={scrollRef}>
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
          <ChatOnline
            onlineUsers={onlineUsers}
            currentId={currentUser._id}
            setCurrentConversation={setCurrentConversation}
            currentConversationId={currentConversation?._id}
          />
        </div>
      </div>
    </>
  );
}
