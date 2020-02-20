export const isUnreadedMessageInArray = (user, messages) => {
 return messages.some(message => {
  if (
   !message.readedBy.includes(user.toString()) &&
   message.authorId !== user.toString()
  )
   return true;
 });
};

export const isMessageUnreaded = (user, message) => {
 return (
  !message.readedBy.includes(user.toString()) &&
  message.authorId !== user.toString()
 );
};
