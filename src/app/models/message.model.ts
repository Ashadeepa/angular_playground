/**
 * Represents an attachment in a message
 */
export interface MessageAttachment {
  id?: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  thumbnailUrl?: string;
}

/**
 * Represents an outbound message
 * Text content is optional when attachments are provided
 */
export interface OutboundMessage {
  /**
   * Message text content - optional when attachments are present
   */
  content?: string;
  
  /**
   * List of attachments
   */
  attachments?: MessageAttachment[];
  
  /**
   * Channel identifier
   */
  channelId: string;
  
  /**
   * Message metadata
   */
  metadata?: {
    sender?: string;
    recipient?: string;
    timestamp?: Date;
    [key: string]: any;
  };
}

/**
 * Response from the outbound message API
 */
export interface OutboundMessageResponse {
  success: boolean;
  messageId?: string;
  error?: string;
  timestamp: Date;
}
