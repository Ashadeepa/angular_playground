import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SmsChannelService } from './sms-channel.service';
import { OutboundMessage, OutboundMessageResponse } from '../models/message.model';

describe('SmsChannelService', () => {
  let service: SmsChannelService;
  let httpMock: HttpTestingController;
  const baseUrl = 'https://api-de-na1.dev.niceincontact.com/dfo/3.0';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmsChannelService]
    });
    service = TestBed.inject(SmsChannelService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('sendOutboundMessage', () => {
    
    it('should send message with only attachments (no text)', (done) => {
      const channelId = 'sms_sinch-sms_919930349978';
      const message: OutboundMessage = {
        channelId,
        attachments: [
          {
            fileName: 'document.pdf',
            fileType: 'application/pdf',
            fileSize: 1024,
            fileUrl: 'https://example.com/document.pdf'
          }
        ]
      };

      service.sendOutboundMessage(message).subscribe({
        next: (response: OutboundMessageResponse) => {
          expect(response.success).toBeTrue();
          expect(response.messageId).toBe('msg123');
          done();
        },
        error: () => fail('Should not have errored')
      });

      const req = httpMock.expectOne(`${baseUrl}/channels/${channelId}/outbound`);
      expect(req.request.method).toBe('POST');
      
      // Verify that content is not in the request body
      expect(req.request.body.content).toBeUndefined();
      expect(req.request.body.attachments).toBeDefined();
      expect(req.request.body.attachments.length).toBe(1);

      req.flush({ messageId: 'msg123', timestamp: new Date().toISOString() });
    });

    it('should send message with text content only', (done) => {
      const channelId = 'sms_sinch-sms_919930349978';
      const message: OutboundMessage = {
        channelId,
        content: 'Hello, this is a test message'
      };

      service.sendOutboundMessage(message).subscribe({
        next: (response: OutboundMessageResponse) => {
          expect(response.success).toBeTrue();
          expect(response.messageId).toBe('msg456');
          done();
        },
        error: () => fail('Should not have errored')
      });

      const req = httpMock.expectOne(`${baseUrl}/channels/${channelId}/outbound`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body.content).toBe('Hello, this is a test message');
      expect(req.request.body.attachments).toBeUndefined();

      req.flush({ messageId: 'msg456', timestamp: new Date().toISOString() });
    });

    it('should send message with both text and attachments', (done) => {
      const channelId = 'sms_sinch-sms_919930349978';
      const message: OutboundMessage = {
        channelId,
        content: 'Please see attached',
        attachments: [
          {
            fileName: 'file.pdf',
            fileType: 'application/pdf',
            fileSize: 2048,
            fileUrl: 'https://example.com/file.pdf'
          }
        ]
      };

      service.sendOutboundMessage(message).subscribe({
        next: (response: OutboundMessageResponse) => {
          expect(response.success).toBeTrue();
          done();
        },
        error: () => fail('Should not have errored')
      });

      const req = httpMock.expectOne(`${baseUrl}/channels/${channelId}/outbound`);
      expect(req.request.body.content).toBe('Please see attached');
      expect(req.request.body.attachments).toBeDefined();

      req.flush({ messageId: 'msg789', timestamp: new Date().toISOString() });
    });

    it('should fail validation when message has no content and no attachments', (done) => {
      const message: OutboundMessage = {
        channelId: 'sms_sinch-sms_919930349978'
      };

      service.sendOutboundMessage(message).subscribe({
        next: () => fail('Should have failed validation'),
        error: (error) => {
          expect(error.message).toContain('Message validation failed');
          expect(error.message).toContain('Message must have either content or attachments');
          done();
        }
      });
    });

    it('should fail validation when channelId is missing', (done) => {
      const message: OutboundMessage = {
        channelId: '',
        content: 'Test message'
      };

      service.sendOutboundMessage(message).subscribe({
        next: () => fail('Should have failed validation'),
        error: (error) => {
          expect(error.message).toContain('Channel ID is required');
          done();
        }
      });
    });

    it('should handle HTTP errors', (done) => {
      const channelId = 'sms_sinch-sms_919930349978';
      const message: OutboundMessage = {
        channelId,
        content: 'Test message'
      };

      service.sendOutboundMessage(message).subscribe({
        next: () => fail('Should have errored'),
        error: (response: OutboundMessageResponse) => {
          expect(response.success).toBeFalse();
          expect(response.error).toBeDefined();
          done();
        }
      });

      const req = httpMock.expectOne(`${baseUrl}/channels/${channelId}/outbound`);
      req.flush({ message: 'Server error' }, { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('sendAttachmentsOnly', () => {
    
    it('should send attachments without text content', (done) => {
      const channelId = 'sms_sinch-sms_919930349978';
      const attachments = [
        {
          fileName: 'image.jpg',
          fileType: 'image/jpeg',
          fileSize: 3072,
          fileUrl: 'https://example.com/image.jpg'
        }
      ];

      service.sendAttachmentsOnly(channelId, attachments).subscribe({
        next: (response: OutboundMessageResponse) => {
          expect(response.success).toBeTrue();
          done();
        },
        error: () => fail('Should not have errored')
      });

      const req = httpMock.expectOne(`${baseUrl}/channels/${channelId}/outbound`);
      expect(req.request.body.content).toBeUndefined();
      expect(req.request.body.attachments).toBeDefined();

      req.flush({ messageId: 'msg-attach', timestamp: new Date().toISOString() });
    });
  });

  describe('sendMessageWithText', () => {
    
    it('should send message with text and optional attachments', (done) => {
      const channelId = 'sms_sinch-sms_919930349978';
      const content = 'Check this out';
      const attachments = [
        {
          fileName: 'doc.pdf',
          fileType: 'application/pdf',
          fileSize: 1536,
          fileUrl: 'https://example.com/doc.pdf'
        }
      ];

      service.sendMessageWithText(channelId, content, attachments).subscribe({
        next: (response: OutboundMessageResponse) => {
          expect(response.success).toBeTrue();
          done();
        },
        error: () => fail('Should not have errored')
      });

      const req = httpMock.expectOne(`${baseUrl}/channels/${channelId}/outbound`);
      expect(req.request.body.content).toBe('Check this out');
      expect(req.request.body.attachments).toBeDefined();

      req.flush({ messageId: 'msg-text', timestamp: new Date().toISOString() });
    });
  });
});
