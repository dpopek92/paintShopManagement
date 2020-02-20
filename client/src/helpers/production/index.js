export const isUnreadedMessageInArrayForProduction = (user, messages) => {
 return messages.some(message => {
  if (
   !message.readedBy.includes(user.toString()) &&
   message.authorId !== user.toString()
  )
   return true;
 });
};
