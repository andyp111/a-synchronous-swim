const messages = []; // the storage unit for messages

module.exports.enqueue = (message) => {
  console.log(`Enqueing message: ${message}`);
  messages.push(message);
  console.log(messages);
};

module.exports.dequeue = () => {
  if (!messages.length) {
    return undefined;
  }
  return messages.shift();
};

module.exports.messages;