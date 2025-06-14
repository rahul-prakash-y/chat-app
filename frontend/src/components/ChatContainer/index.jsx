import React from 'react'
import { useAuthStore, useChatStore } from '../../store'
import { ChatHeader } from '../ChatHeader';
import { MessageInput } from '../MessageInput';
import { MessageSkeleton } from '../Skeletons';
import { formatMessageTime } from '../../lib';

export const ChatContainer = () => {
  const {messages, getMessages, isMessagesLoading, selectedUser,subscribeToMessages, unSubscribeToMessages } = useChatStore();
  const {authUser} = useAuthStore();
  const messageEndRef = React.useRef(null);
  React.useEffect(()=>{
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unSubscribeToMessages();
  },[getMessages, selectedUser._id, subscribeToMessages, unSubscribeToMessages]);

  React.useEffect(()=>{
    if(messageEndRef.current && messages){
      messageEndRef.current.scrollIntoView({behaviour: 'smooth'});
    }
  },[messages]);

  if(isMessagesLoading ){
     return (
    <div className='flex flex-col flex-1 overflow-auto'>
      <ChatHeader/>
      <MessageSkeleton />
      <MessageInput/>
    </div>
  )
}
  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>

      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((message) => {
          return(
            <div key={message._id} className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'}`} ref={messageEndRef}>
              <div className='chat-image avatar'>
                <div className='size-10 rounded-full'>
                  <img src={message.senderId === authUser._id ? authUser.profilePic || '/avatar.png' : selectedUser.profilePic || '/avatar.png'} alt="profile pic" />
                </div>
              </div>

              <div className='chat-header mb-1'>
                <time className='text-xs opacity-50 ml-1'>
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

              <div className='chat-bubble flex flex-col'>
                {message.image && (
                  <img src={message.image} alt="Attachment" className='sm:max-w-[200px] rounded-md mb-2' />
                )}
                {message.text && ( 
                  <p>{message.text}</p>
                  )}
              </div>
            </div>
          )
        })}
      </div>

      <MessageInput/>
    </div>
  )
}

