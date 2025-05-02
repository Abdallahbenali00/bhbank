import React, { useState, useRef, useEffect } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  
  // Messages de bienvenue initiaux en français
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: "Bienvenue sur l'Assistant Virtuel de BH Bank ! Comment puis-je vous aider aujourd'hui ?",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      },
      {
        id: 2,
        text: "Je peux vous aider avec les informations sur vos comptes, les transactions, les crédits et bien plus encore.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      },
      {
        id: 3,
        text: "Voici quelques questions fréquentes :\n1. Solde de mon compte\n2. Demande de crédit\n3. Contactez un conseiller\n4. Problème technique",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  }, []);

  // Faire défiler vers le bas automatiquement
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    // Ajouter le message de l'utilisateur
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages([...messages, userMessage]);
    setInputMessage('');
    
    // Simuler une réponse du bot après un délai
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('solde') || lowerMessage.includes('compte')) {
      return "Vous pouvez consulter le solde de votre compte dans la section 'Mes Comptes' de notre service bancaire en ligne.";
    } else if (lowerMessage.includes('crédit') || lowerMessage.includes('prêt')) {
      return "Nous proposons plusieurs options de crédit. Souhaitez-vous des informations sur les crédits personnels, les crédits immobiliers ou les crédits professionnels ?";
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('conseiller')) {
      return "Vous pouvez contacter notre service client 24h/24 au +216 70 000 000 ou visiter votre agence la plus proche.";
    } else if (lowerMessage.includes('technique') || lowerMessage.includes('problème')) {
      return "Pour les problèmes techniques, veuillez envoyer un email à support@bhbank.tn ou appeler le 71 000 000.";
    } else {
      return "Je vous remercie pour votre message. Je suis encore en apprentissage, mais je ferai de mon mieux pour vous aider. Pourriez-vous préciser votre demande ?";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        {/* En-tête du chat */}
        <div className="bg-blue-900 text-white p-4 flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold">Assistant Virtuel BH Bank</h1>
            <p className="text-xs text-blue-200">En ligne 24h/24 pour vous aider</p>
          </div>
        </div>
        
        {/* Zone de messages */}
        <div className="p-4 h-96 overflow-y-auto bg-gray-50">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs md:max-w-md rounded-lg p-3 ${message.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}
              >
                {message.sender === 'bot' && message.id === 3 ? (
                  <>
                    <p>{message.text.split('\n')[0]}</p>
                    <ul className="list-disc pl-5 mt-2">
                      {message.text.split('\n').slice(1).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p>{message.text}</p>
                )}
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Zone de saisie */}
        <div className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tapez votre message ici..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Assistant AI BH Bank - Vos requêtes sont sécurisées et cryptées
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;