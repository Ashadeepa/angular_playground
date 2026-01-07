import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { OutboundMessage, OutboundMessageResponse } from '../models/message.model';
import { MessageValidator } from '../shared/validators/message.validator';

/**
 * Service for handling SMS channel operations
 * Supports sending messages with or without text content
 */
@Injectable({
  providedIn: 'root'
})
export class SmsChannelService {
  
  // Base API URL - can be configured via environment variables
  private readonly baseUrl = 'https://api-de-na1.dev.niceincontact.com/dfo/3.0';
  
  constructor(private http: HttpClient) {}
  
  /**
   * Sends an outbound message through the specified channel
   * Text content is optional when attachments are provided
   * 
   * @param message - The outbound message to send
   * @returns Observable of the message response
   * @throws Error if message validation fails
   */
  sendOutboundMessage(message: OutboundMessage): Observable<OutboundMessageResponse> {
    // Validate the message before sending
    const validationResult = MessageValidator.validate(message);
    
    if (!validationResult.isValid) {
      const errorMessage = `Message validation failed: ${validationResult.errors.join(', ')}`;
      return throwError(() => new Error(errorMessage));
    }
    
    const url = `${this.baseUrl}/channels/${message.channelId}/outbound`;
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    
    // Prepare the payload - only include content if it exists
    const payload: any = {
      channelId: message.channelId
    };
    
    // Only add content to payload if it exists and is not empty
    if (message.content && message.content.trim().length > 0) {
      payload.content = message.content;
    }
    
    // Add attachments if they exist
    if (message.attachments && message.attachments.length > 0) {
      payload.attachments = message.attachments;
    }
    
    // Add metadata if it exists
    if (message.metadata) {
      payload.metadata = message.metadata;
    }
    
    return this.http.post<any>(url, payload, { headers }).pipe(
      map(response => ({
        success: true,
        messageId: response.messageId || response.id,
        timestamp: new Date(response.timestamp || Date.now())
      })),
      catchError(error => {
        const errorResponse: OutboundMessageResponse = {
          success: false,
          error: error.error?.message || error.message || 'Failed to send message',
          timestamp: new Date()
        };
        return throwError(() => errorResponse);
      })
    );
  }
  
  /**
   * Sends an outbound message with only attachments (no text)
   * 
   * @param channelId - The channel identifier
   * @param attachments - Array of attachments to send
   * @returns Observable of the message response
   */
  sendAttachmentsOnly(
    channelId: string,
    attachments: OutboundMessage['attachments']
  ): Observable<OutboundMessageResponse> {
    const message: OutboundMessage = {
      channelId,
      attachments
    };
    
    return this.sendOutboundMessage(message);
  }
  
  /**
   * Sends an outbound message with text and optional attachments
   * 
   * @param channelId - The channel identifier
   * @param content - The message text content
   * @param attachments - Optional array of attachments
   * @returns Observable of the message response
   */
  sendMessageWithText(
    channelId: string,
    content: string,
    attachments?: OutboundMessage['attachments']
  ): Observable<OutboundMessageResponse> {
    const message: OutboundMessage = {
      channelId,
      content,
      attachments
    };
    
    return this.sendOutboundMessage(message);
  }
}
