import tkinter as tk
from tkinter import ttk
import time
import threading

class AnimatedChatbot:
    def __init__(self, root):
        self.root = root
        self.root.title("Axie Studio Kundservice")
        self.root.geometry("400x600")
        
        # Configure style
        self.style = ttk.Style()
        self.style.configure("Chat.TFrame", background="#f0f0f0")
        
        # Main frame
        self.main_frame = ttk.Frame(root, style="Chat.TFrame")
        self.main_frame.pack(fill=tk.BOTH, expand=True)
        
        # Chat display
        self.chat_display = tk.Text(self.main_frame, wrap=tk.WORD, state='disabled',
                                  font=("Helvetica", 12), bg="#ffffff")
        self.chat_display.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Input frame
        self.input_frame = ttk.Frame(self.main_frame)
        self.input_frame.pack(fill=tk.X, padx=10, pady=5)
        
        # Input field
        self.input_field = ttk.Entry(self.input_frame)
        self.input_field.pack(side=tk.LEFT, fill=tk.X, expand=True)
        
        # Send button
        self.send_button = ttk.Button(self.input_frame, text="Skicka",
                                    command=self.send_message)
        self.send_button.pack(side=tk.RIGHT, padx=5)
        
        # Welcome message
        self.messages = [
            ("bot", "Hej! Välkommen till Axie Studio Kundservice 👋"),
            ("bot", "Hur kan jag hjälpa dig idag?"),
            ("bot", "Du kan ställa frågor om våra tjänster eller få teknisk support.")
        ]
        
        # Start animation
        self.animate_messages()
    
    def animate_messages(self):
        def animation():
            for msg_type, message in self.messages:
                time.sleep(1)  # Delay between messages
                self.display_message(msg_type, message)
        
        thread = threading.Thread(target=animation)
        thread.daemon = True
        thread.start()
    
    def display_message(self, msg_type, message):
        self.chat_display.configure(state='normal')
        
        # Add new message with animation effect
        if msg_type == "bot":
            self.chat_display.insert(tk.END, "\n🤖 Bot: ", "bot_tag")
            self.chat_display.tag_configure("bot_tag", foreground="#0066cc")
        else:
            self.chat_display.insert(tk.END, "\n👤 Du: ", "user_tag")
            self.chat_display.tag_configure("user_tag", foreground="#009933")
        
        # Animate the message character by character
        for char in message:
            self.chat_display.insert(tk.END, char)
            self.chat_display.see(tk.END)
            self.chat_display.update()
            time.sleep(0.02)  # Adjust speed of typing animation
        
        self.chat_display.insert(tk.END, "\n")
        self.chat_display.configure(state='disabled')
        self.chat_display.see(tk.END)
    
    def send_message(self):
        message = self.input_field.get()
        if message:
            self.display_message("user", message)
            self.input_field.delete(0, tk.END)
            
            # Simulate bot response
            self.root.after(1000, lambda: self.display_message("bot", 
                "Tack för ditt meddelande! Jag hjälper dig strax."))

if __name__ == "__main__":
    root = tk.Tk()
    app = AnimatedChatbot(root)
    root.mainloop() 