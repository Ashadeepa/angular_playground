import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SmsChannelService } from '../services/sms-channel.service';
import { OutboundMessage, MessageAttachment } from '../models/message.model';

/**
 * Demo component showing how to send SMS messages with or without text
 * This demonstrates the new capability to send attachments without requiring text content
 */
@Component({
  selector: 'app-sms-channel-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sms-channel-demo.component.html',
  styleUrls: ['./sms-channel-demo.component.scss']
})
export class SmsChannelDemoComponent {
  
  // Form fields
  channelId = 'sms_sinch-sms_919930349978';
  messageContent = '';
  attachments: MessageAttachment[] = [];
  
  // UI state
  isSending = false;
  lastResponse: string | null = null;
  errorMessage: string | null = null;
  
  constructor(private smsChannelService: SmsChannelService) {}
  
  /**
   * Sends a message with only text (no attachments)
   */
  sendTextOnly(): void {
    if (!this.messageContent.trim()) {
      this.errorMessage = 'Please enter message content';
      return;
    }
    
    this.isSending = true;
    this.errorMessage = null;
    this.lastResponse = null;
    
    this.smsChannelService.sendMessageWithText(this.channelId, this.messageContent)
      .subscribe({
        next: (response) => {
          this.isSending = false;
          this.lastResponse = `Success! Message ID: ${response.messageId}`;
          this.messageContent = '';
        },
        error: (error) => {
          this.isSending = false;
          this.errorMessage = error.error || error.message || 'Failed to send message';
        }
      });
  }
  
  /**
   * Sends a message with only attachments (no text)
   * This is the new capability - no placeholder text required!
   */
  sendAttachmentsOnly(): void {
    if (this.attachments.length === 0) {
      this.errorMessage = 'Please add at least one attachment';
      return;
    }
    
    this.isSending = true;
    this.errorMessage = null;
    this.lastResponse = null;
    
    this.smsChannelService.sendAttachmentsOnly(this.channelId, this.attachments)
      .subscribe({
        next: (response) => {
          this.isSending = false;
          this.lastResponse = `Success! Message with attachments sent. ID: ${response.messageId}`;
          this.attachments = [];
        },
        error: (error) => {
          this.isSending = false;
          this.errorMessage = error.error || error.message || 'Failed to send message';
        }
      });
  }
  
  /**
   * Sends a message with both text and attachments
   */
  sendTextWithAttachments(): void {
    if (!this.messageContent.trim() && this.attachments.length === 0) {
      this.errorMessage = 'Please provide either message content or attachments';
      return;
    }
    
    this.isSending = true;
    this.errorMessage = null;
    this.lastResponse = null;
    
    const message: OutboundMessage = {
      channelId: this.channelId,
      content: this.messageContent || undefined,
      attachments: this.attachments.length > 0 ? this.attachments : undefined
    };
    
    this.smsChannelService.sendOutboundMessage(message)
      .subscribe({
        next: (response) => {
          this.isSending = false;
          this.lastResponse = `Success! Combined message sent. ID: ${response.messageId}`;
          this.messageContent = '';
          this.attachments = [];
        },
        error: (error) => {
          this.isSending = false;
          this.errorMessage = error.error || error.message || 'Failed to send message';
        }
      });
  }
  
  /**
   * Adds a sample attachment for demo purposes
   */
  addSampleAttachment(): void {
    const attachment: MessageAttachment = {
      fileName: `document_${Date.now()}.pdf`,
      fileType: 'application/pdf',
      fileSize: 1024,
      fileUrl: `https://example.com/files/doc_${Date.now()}.pdf`
    };
    
    this.attachments.push(attachment);
  }
  
  /**
   * Removes an attachment from the list
   */
  removeAttachment(index: number): void {
    this.attachments.splice(index, 1);
  }
  
  /**
   * Clears all form data
   */
  clearForm(): void {
    this.messageContent = '';
    this.attachments = [];
    this.errorMessage = null;
    this.lastResponse = null;
  }
}
