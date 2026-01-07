import { OutboundMessage } from '../models/message.model';

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validates an outbound message
 * Message is valid if it has either content OR attachments (or both)
 */
export class MessageValidator {
  
  /**
   * Validates the outbound message
   * @param message - The message to validate
   * @returns ValidationResult indicating if the message is valid and any errors
   */
  static validate(message: OutboundMessage): ValidationResult {
    const errors: string[] = [];
    
    // Check if message object exists
    if (!message) {
      errors.push('Message object is required');
      return { isValid: false, errors };
    }
    
    // Check if channelId is provided
    if (!message.channelId || message.channelId.trim() === '') {
      errors.push('Channel ID is required');
    }
    
    // Check if either content or attachments are provided
    const hasContent = message.content && message.content.trim().length > 0;
    const hasAttachments = message.attachments && message.attachments.length > 0;
    
    if (!hasContent && !hasAttachments) {
      errors.push('Message must have either content or attachments');
    }
    
    // Validate attachments if present
    if (message.attachments && message.attachments.length > 0) {
      message.attachments.forEach((attachment, index) => {
        if (!attachment.fileName || attachment.fileName.trim() === '') {
          errors.push(`Attachment ${index + 1}: fileName is required`);
        }
        if (!attachment.fileType || attachment.fileType.trim() === '') {
          errors.push(`Attachment ${index + 1}: fileType is required`);
        }
        if (!attachment.fileUrl || attachment.fileUrl.trim() === '') {
          errors.push(`Attachment ${index + 1}: fileUrl is required`);
        }
        if (attachment.fileSize === undefined || attachment.fileSize < 0) {
          errors.push(`Attachment ${index + 1}: valid fileSize is required`);
        }
      });
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  /**
   * Checks if a message has valid content
   * @param message - The message to check
   * @returns true if message has either content or attachments
   */
  static hasValidContent(message: OutboundMessage): boolean {
    const hasContent = message.content && message.content.trim().length > 0;
    const hasAttachments = message.attachments && message.attachments.length > 0;
    return hasContent || hasAttachments;
  }
}
