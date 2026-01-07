import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SmsChannelDemoComponent } from './sms-channel-demo.component';
import { SmsChannelService } from '../services/sms-channel.service';
import { of, throwError } from 'rxjs';

describe('SmsChannelDemoComponent', () => {
  let component: SmsChannelDemoComponent;
  let fixture: ComponentFixture<SmsChannelDemoComponent>;
  let smsChannelService: jasmine.SpyObj<SmsChannelService>;

  beforeEach(async () => {
    const smsServiceSpy = jasmine.createSpyObj('SmsChannelService', [
      'sendMessageWithText',
      'sendAttachmentsOnly',
      'sendOutboundMessage'
    ]);

    await TestBed.configureTestingModule({
      imports: [SmsChannelDemoComponent, HttpClientTestingModule],
      providers: [
        { provide: SmsChannelService, useValue: smsServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SmsChannelDemoComponent);
    component = fixture.componentInstance;
    smsChannelService = TestBed.inject(SmsChannelService) as jasmine.SpyObj<SmsChannelService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('sendTextOnly', () => {
    it('should send message with text only', () => {
      component.messageContent = 'Test message';
      const mockResponse = { success: true, messageId: 'msg123', timestamp: new Date() };
      smsChannelService.sendMessageWithText.and.returnValue(of(mockResponse));

      component.sendTextOnly();

      expect(smsChannelService.sendMessageWithText).toHaveBeenCalledWith(
        component.channelId,
        'Test message'
      );
      expect(component.lastResponse).toContain('msg123');
      expect(component.messageContent).toBe('');
    });

    it('should show error when message content is empty', () => {
      component.messageContent = '   ';

      component.sendTextOnly();

      expect(component.errorMessage).toBe('Please enter message content');
      expect(smsChannelService.sendMessageWithText).not.toHaveBeenCalled();
    });
  });

  describe('sendAttachmentsOnly', () => {
    it('should send attachments without text', () => {
      component.attachments = [{
        fileName: 'test.pdf',
        fileType: 'application/pdf',
        fileSize: 1024,
        fileUrl: 'https://example.com/test.pdf'
      }];
      const mockResponse = { success: true, messageId: 'msg456', timestamp: new Date() };
      smsChannelService.sendAttachmentsOnly.and.returnValue(of(mockResponse));

      component.sendAttachmentsOnly();

      expect(smsChannelService.sendAttachmentsOnly).toHaveBeenCalledWith(
        component.channelId,
        component.attachments
      );
      expect(component.lastResponse).toContain('msg456');
      expect(component.attachments.length).toBe(0);
    });

    it('should show error when no attachments are present', () => {
      component.attachments = [];

      component.sendAttachmentsOnly();

      expect(component.errorMessage).toBe('Please add at least one attachment');
      expect(smsChannelService.sendAttachmentsOnly).not.toHaveBeenCalled();
    });
  });

  describe('sendTextWithAttachments', () => {
    it('should send message with both text and attachments', () => {
      component.messageContent = 'Please see attached';
      component.attachments = [{
        fileName: 'doc.pdf',
        fileType: 'application/pdf',
        fileSize: 2048,
        fileUrl: 'https://example.com/doc.pdf'
      }];
      const mockResponse = { success: true, messageId: 'msg789', timestamp: new Date() };
      smsChannelService.sendOutboundMessage.and.returnValue(of(mockResponse));

      component.sendTextWithAttachments();

      expect(smsChannelService.sendOutboundMessage).toHaveBeenCalled();
      expect(component.lastResponse).toContain('msg789');
    });

    it('should show error when both text and attachments are missing', () => {
      component.messageContent = '';
      component.attachments = [];

      component.sendTextWithAttachments();

      expect(component.errorMessage).toBe('Please provide either message content or attachments');
    });

    it('should handle errors from service', () => {
      component.messageContent = 'Test';
      const mockError = { error: 'Server error', message: 'Failed' };
      smsChannelService.sendOutboundMessage.and.returnValue(
        throwError(() => mockError)
      );

      component.sendTextWithAttachments();

      expect(component.errorMessage).toBeTruthy();
      expect(component.isSending).toBeFalse();
    });
  });

  describe('addSampleAttachment', () => {
    it('should add a sample attachment to the list', () => {
      const initialCount = component.attachments.length;

      component.addSampleAttachment();

      expect(component.attachments.length).toBe(initialCount + 1);
      expect(component.attachments[0].fileName).toContain('document_');
      expect(component.attachments[0].fileType).toBe('application/pdf');
    });
  });

  describe('removeAttachment', () => {
    it('should remove attachment at specified index', () => {
      component.attachments = [
        { fileName: 'file1.pdf', fileType: 'application/pdf', fileSize: 1024, fileUrl: 'url1' },
        { fileName: 'file2.pdf', fileType: 'application/pdf', fileSize: 2048, fileUrl: 'url2' }
      ];

      component.removeAttachment(0);

      expect(component.attachments.length).toBe(1);
      expect(component.attachments[0].fileName).toBe('file2.pdf');
    });
  });

  describe('clearForm', () => {
    it('should clear all form data', () => {
      component.messageContent = 'Test';
      component.attachments = [{ fileName: 'test.pdf', fileType: 'application/pdf', fileSize: 1024, fileUrl: 'url' }];
      component.errorMessage = 'Error';
      component.lastResponse = 'Response';

      component.clearForm();

      expect(component.messageContent).toBe('');
      expect(component.attachments.length).toBe(0);
      expect(component.errorMessage).toBeNull();
      expect(component.lastResponse).toBeNull();
    });
  });
});
