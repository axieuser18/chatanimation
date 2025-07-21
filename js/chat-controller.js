class ChatController {
    constructor() {
        this.chatContainer = document.getElementById('chatContainer');
        this.chatButton = document.getElementById('chatButton');
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.typingIndicator = document.getElementById('typingIndicator');
        
        this.currentStep = 0;
        this.isWaitingForUser = false;
        this.userMessage = '';
        
        this.conversation = [
            { type: 'bot', text: 'Hej! Välkommen till Axie Studio! 👋', delay: 1000 },
            { type: 'bot', text: 'Jag kan hjälpa dig att boka en tid för konsultation eller demo.', delay: 2000 },
            { type: 'user', text: 'Hej! Jag skulle vilja boka en tid för en demo.', delay: 3000, waitForUser: true },
            { type: 'bot', text: 'Perfekt! En demo är ett utmärkt sätt att se vad vi kan erbjuda.', delay: 2000 },
            { type: 'bot', text: 'Vilken typ av tjänst är du mest intresserad av?', delay: 2000 },
            { type: 'user', text: 'Jag är intresserad av webbutveckling och design.', delay: 3000, waitForUser: true },
            { type: 'bot', text: 'Fantastiskt! Vi har stor expertis inom webbutveckling och modern design.', delay: 2000 },
            { type: 'bot', text: 'Jag kommer öppna vårt bokningssystem nu så du kan välja en tid som passar dig! ✨', delay: 3000 }
        ];
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        this.sendButton.addEventListener('click', () => this.handleSendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSendMessage();
            }
        });
    }
    
    startDemo() {
        this.chatButton.classList.add('active');
        this.chatContainer.classList.add('active');
        
        setTimeout(() => {
            this.startConversation();
        }, 800);
    }
    
    startConversation() {
        if (this.currentStep < this.conversation.length) {
            const message = this.conversation[this.currentStep];
            
            if (message.waitForUser && message.type === 'user') {
                this.isWaitingForUser = true;
                this.userMessage = message.text;
                this.messageInput.removeAttribute('readonly');
                this.messageInput.placeholder = 'Skriv ditt meddelande...';
                return;
            }
            
            setTimeout(() => {
                if (message.type === 'user') {
                    this.simulateUserTyping(message.text);
                } else {
                    this.showBotMessage(message.text);
                }
            }, message.delay);
        }
    }
    
    simulateUserTyping(text) {
        this.messageInput.value = text;
        setTimeout(() => {
            this.addMessage(text, false);
            this.messageInput.value = '';
            this.currentStep++;
            this.startConversation();
        }, 1500);
    }
    
    showBotMessage(text) {
        this.showTypingIndicator();
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage(text, true);
            this.currentStep++;
            
            if (this.currentStep === this.conversation.length) {
                setTimeout(() => {
                    window.bookingController.openBookingSystem();
                }, 2000);
            } else {
                this.startConversation();
            }
        }, 2000);
    }
    
    handleSendMessage() {
        if (!this.isWaitingForUser) return;
        
        const message = this.messageInput.value.trim();
        if (!message) return;
        
        this.addMessage(message, false);
        this.messageInput.value = '';
        this.messageInput.setAttribute('readonly', true);
        this.messageInput.placeholder = 'Väntar på svar...';
        
        this.isWaitingForUser = false;
        this.currentStep++;
        
        setTimeout(() => {
            this.startConversation();
        }, 1000);
    }
    
    addMessage(text, isBot = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isBot ? 'bot-message' : 'user-message'}`;
        
        const textNode = document.createTextNode('');
        messageDiv.appendChild(textNode);
        
        this.chatMessages.appendChild(messageDiv);
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                textNode.nodeValue += text.charAt(i);
                i++;
                setTimeout(typeWriter, isBot ? 30 : 20);
            }
        };
        typeWriter();

        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    showTypingIndicator() {
        this.typingIndicator.style.display = 'flex';
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    hideTypingIndicator() {
        this.typingIndicator.style.display = 'none';
    }
    
    fadeOutChat() {
        this.chatContainer.classList.add('fade-out');
    }
}