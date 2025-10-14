import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
    contactForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        mobile: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
        subject: new FormControl('', [Validators.required]),
        message: new FormControl('', [Validators.required, Validators.maxLength(500)])
    });

    messageLength = 0;

    onMessageChange() {
        this.messageLength = this.contactForm.get('message')?.value?.length || 0;
    }

    onSubmit() {
        if (this.contactForm.valid) {
            console.log('Form Data:', this.contactForm.value);
            alert('Thank you! We will get back to you soon.');
            this.contactForm.reset();
            this.messageLength = 0;
        } else {
            this.contactForm.markAllAsTouched();
        }
    }

    sendChat(event: any) {
        const input = event.target as HTMLInputElement;
        const message = input.value.trim();
        if (!message) return;

        const chatBox = document.getElementById('chat-box')!;
        const p = document.createElement('p');
        p.textContent = "You: " + message;
        chatBox.appendChild(p);

        const botReply = document.createElement('p');
        botReply.textContent = "Support: Thanks for your message! We'll reply soon.";
        botReply.style.color = '#ff4d4d';
        chatBox.appendChild(botReply);

        chatBox.scrollTop = chatBox.scrollHeight;
        input.value = '';
    }
}