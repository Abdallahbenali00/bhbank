const getBotResponse = async (message) => {
  try {
    const res = await fetch("http://localhost:5000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question: message })
    });

    const data = await res.json();
    return data.answer;
  } catch (error) {
    console.error("Erreur lors de la récupération de la réponse :", error);
    return "Désolé, une erreur est survenue.";
  }
};
const handleSendMessage = async () => {
  if (inputMessage.trim() === '') return;

  const userMessage = {
    id: messages.length + 1,
    text: inputMessage,
    sender: 'user',
    timestamp: new Date().toLocaleTimeString()
  };

  setMessages(prev => [...prev, userMessage]);
  setInputMessage('');

  const thinkingMessage = {
    id: messages.length + 2,
    text: "Veuillez patienter, je réfléchis...",
    sender: 'bot',
    timestamp: new Date().toLocaleTimeString()
  };
  setMessages(prev => [...prev, thinkingMessage]);

  const botText = await getBotResponse(inputMessage);

  const botResponse = {
    id: messages.length + 3,
    text: botText,
    sender: 'bot',
    timestamp: new Date().toLocaleTimeString()
  };

  setMessages(prev => [...prev.slice(0, -1), botResponse]);
};
