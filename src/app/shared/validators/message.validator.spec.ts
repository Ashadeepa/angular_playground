import { MessageValidator } from './message.validator';
import { OutboundMessage } from '../../models/message.model';

describe('MessageValidator', () => {
  
  describe('validate', () => {
    
    it('should return invalid when message is null', () => {
      const result = MessageValidator.validate(null as any);
      expect(result.isValid).toBeFalse();
      expect(result.errors).toContain('Message object is required');
    });
    
    it('should return invalid when channelId is missing', () => {
      const message: OutboundMessage = {
        channelId: '',
        content: 'Test message'
      };
      
      const result = MessageValidator.validate(message);
      expect(result.isValid).toBeFalse();
      expect(result.errors).toContain('Channel ID is required');
    });
    
    it('should return invalid when both content and attachments are missing', () => {
      const message: OutboundMessage = {
        channelId: 'sms_sinch-sms_919930349978'
      };
      
      const result = MessageValidator.validate(message);
      expect(result.isValid).toBeFalse();
      expect(result.errors).toContain('Message must have either content or attachments');
    });
    
    it('should return valid when only content is provided', () => {
      const message: OutboundMessage = {
        channelId: 'sms_sinch-sms_919930349978',
        content: 'Hello, this is a test message'
      };
      
      const result = MessageValidator.validate(message);
      expect(result.isValid).toBeTrue();
      expect(result.errors.length).toBe(0);
    });
    
    it('should return valid when only attachments are provided (no content)', () => {
      const message: OutboundMessage = {
        channelId: 'sms_sinch-sms_919930349978',
        attachments: [
          {
            fileName: 'document.pdf',
            fileType: 'application/pdf',
            fileSize: 1024,
            fileUrl: 'https://example.com/document.pdf'
          }
        ]
      };
      
      const result = MessageValidator.validate(message);
      expect(result.isValid).toBeTrue();
      expect(result.errors.length).toBe(0);
    });
    
    it('should return valid when both content and attachments are provided', () => {
      const message: OutboundMessage = {
        channelId: 'sms_sinch-sms_919930349978',
        content: 'Please see the attached file',
        attachments: [
          {
            fileName: 'report.pdf',
            fileType: 'application/pdf',
            fileSize: 2048,
            fileUrl: 'https://example.com/report.pdf'
          }
        ]
      };
      
      const result = MessageValidator.validate(message);
      expect(result.isValid).toBeTrue();
      expect(result.errors.length).toBe(0);
    });
    
    it('should return invalid when attachment is missing required fields', () => {
      const message: OutboundMessage = {
        channelId: 'sms_sinch-sms_919930349978',
        attachments: [
          {
            fileName: '',
            fileType: 'application/pdf',
            fileSize: 1024,
            fileUrl: 'https://example.com/document.pdf'
          }
        ]
      };
      
      const result = MessageValidator.validate(message);
      expect(result.isValid).toBeFalse();
      expect(result.errors.some(e => e.includes('fileName is required'))).toBeTrue();
    });
    
    it('should validate multiple attachments', () => {
      const message: OutboundMessage = {
        channelId: 'sms_sinch-sms_919930349978',
        attachments: [
          {
            fileName: 'doc1.pdf',
            fileType: 'application/pdf',
            fileSize: 1024,
            fileUrl: 'https://example.com/doc1.pdf'
          },
          {
            fileName: 'doc2.jpg',
            fileType: 'image/jpeg',
            fileSize: 2048,
            fileUrl: 'https://example.com/doc2.jpg'
          }
        ]
      };
      
      const result = MessageValidator.validate(message);
      expect(result.isValid).toBeTrue();
      expect(result.errors.length).toBe(0);
    });
    
    it('should return invalid when content is only whitespace', () => {
      const message: OutboundMessage = {
        channelId: 'sms_sinch-sms_919930349978',
        content: '   '
      };
      
      const result = MessageValidator.validate(message);
      expect(result.isValid).toBeFalse();
      expect(result.errors).toContain('Message must have either content or attachments');
    });
  });
  
  describe('hasValidContent', () => {
    
    it('should return true when content is provided', () => {
      const message: OutboundMessage = {
        channelId: 'test',
        content: 'Test message'
      };
      
      expect(MessageValidator.hasValidContent(message)).toBeTrue();
    });
    
    it('should return true when attachments are provided', () => {
      const message: OutboundMessage = {
        channelId: 'test',
        attachments: [
          {
            fileName: 'file.pdf',
            fileType: 'application/pdf',
            fileSize: 1024,
            fileUrl: 'https://example.com/file.pdf'
          }
        ]
      };
      
      expect(MessageValidator.hasValidContent(message)).toBeTrue();
    });
    
    it('should return false when neither content nor attachments are provided', () => {
      const message: OutboundMessage = {
        channelId: 'test'
      };
      
      expect(MessageValidator.hasValidContent(message)).toBeFalse();
    });
  });
});
