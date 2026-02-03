import { submitMembershipForm } from '@app/components/Join/actions';
import { Resend } from 'resend';

// Mock the Resend module
jest.mock('resend');

describe('submitMembershipForm', () => {
  let mockSend: jest.Mock;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Create a mock for the send method
    mockSend = jest.fn();

    // Mock the Resend constructor to return an object with emails.send
    (Resend as jest.MockedClass<typeof Resend>).mockImplementation(() => ({
      emails: {
        send: mockSend,
      },
    })) as any;

    // Spy on console methods
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    // Set environment variable
    process.env.RESEND_API_KEY = 'test-api-key';
  });

  afterEach(() => {
    // Restore console methods
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  const createFormData = (data: Record<string, string>) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return formData;
  };

  it('should send email with all form data', async () => {
    mockSend.mockResolvedValue({ data: { id: 'email-123' }, error: null });

    const formData = createFormData({
      business: 'Acme Corp',
      contact: 'John Doe',
      contactrole: 'owner',
      address: '123 Main St, Anytown, KS 12345',
      phone: '(555) 123-4567',
      email: 'john@acme.com',
      website: 'https://acme.com',
      employees: '5',
    });

    await submitMembershipForm(formData);

    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith({
      from: 'onboarding@resend.dev',
      to: 'luinyalia@gmail.com',
      subject: 'New Membership Application - Acme Corp',
      text: expect.stringContaining('Business Name: Acme Corp'),
    });
  });

  it('should include contact name in email body', async () => {
    mockSend.mockResolvedValue({ data: { id: 'email-123' }, error: null });

    const formData = createFormData({
      business: 'Test Business',
      contact: 'Jane Smith',
      contactrole: 'manager',
      address: '456 Oak Ave',
      phone: '',
      email: '',
      website: '',
      employees: '1',
    });

    await submitMembershipForm(formData);

    const emailBody = mockSend.mock.calls[0][0].text;
    expect(emailBody).toContain('Contact Name: Jane Smith');
  });

  it('should include contact role in email body', async () => {
    mockSend.mockResolvedValue({ data: { id: 'email-123' }, error: null });

    const formData = createFormData({
      business: 'Test Business',
      contact: 'John Doe',
      contactrole: 'owner',
      address: '123 Main St',
      phone: '',
      email: '',
      website: '',
      employees: '1',
    });

    await submitMembershipForm(formData);

    const emailBody = mockSend.mock.calls[0][0].text;
    expect(emailBody).toContain("Contact's Role: owner");
  });

  it('should include business address in email body', async () => {
    mockSend.mockResolvedValue({ data: { id: 'email-123' }, error: null });

    const formData = createFormData({
      business: 'Test Business',
      contact: 'John Doe',
      contactrole: 'owner',
      address: '789 Elm Street, Springfield, KS 67890',
      phone: '',
      email: '',
      website: '',
      employees: '1',
    });

    await submitMembershipForm(formData);

    const emailBody = mockSend.mock.calls[0][0].text;
    expect(emailBody).toContain(
      'Business Address: 789 Elm Street, Springfield, KS 67890',
    );
  });

  it('should show "Not provided" for missing phone number', async () => {
    mockSend.mockResolvedValue({ data: { id: 'email-123' }, error: null });

    const formData = createFormData({
      business: 'Test Business',
      contact: 'John Doe',
      contactrole: 'owner',
      address: '123 Main St',
      phone: '',
      email: 'test@example.com',
      website: '',
      employees: '1',
    });

    await submitMembershipForm(formData);

    const emailBody = mockSend.mock.calls[0][0].text;
    expect(emailBody).toContain('Phone Number: Not provided');
  });

  it('should show "Not provided" for missing email', async () => {
    mockSend.mockResolvedValue({ data: { id: 'email-123' }, error: null });

    const formData = createFormData({
      business: 'Test Business',
      contact: 'John Doe',
      contactrole: 'owner',
      address: '123 Main St',
      phone: '(555) 123-4567',
      email: '',
      website: 'https://example.com',
      employees: '1',
    });

    await submitMembershipForm(formData);

    const emailBody = mockSend.mock.calls[0][0].text;
    expect(emailBody).toContain('Email: Not provided');
  });

  it('should show "Not provided" for missing website', async () => {
    mockSend.mockResolvedValue({ data: { id: 'email-123' }, error: null });

    const formData = createFormData({
      business: 'Test Business',
      contact: 'John Doe',
      contactrole: 'owner',
      address: '123 Main St',
      phone: '',
      email: '',
      website: '',
      employees: '1',
    });

    await submitMembershipForm(formData);

    const emailBody = mockSend.mock.calls[0][0].text;
    expect(emailBody).toContain('Website: Not provided');
  });

  it('should include phone number when provided', async () => {
    mockSend.mockResolvedValue({ data: { id: 'email-123' }, error: null });

    const formData = createFormData({
      business: 'Test Business',
      contact: 'John Doe',
      contactrole: 'owner',
      address: '123 Main St',
      phone: '785-555-1234',
      email: '',
      website: '',
      employees: '1',
    });

    await submitMembershipForm(formData);

    const emailBody = mockSend.mock.calls[0][0].text;
    expect(emailBody).toContain('Phone Number: 785-555-1234');
  });

  it('should include email when provided', async () => {
    mockSend.mockResolvedValue({ data: { id: 'email-123' }, error: null });

    const formData = createFormData({
      business: 'Test Business',
      contact: 'John Doe',
      contactrole: 'owner',
      address: '123 Main St',
      phone: '',
      email: 'contact@business.com',
      website: '',
      employees: '1',
    });

    await submitMembershipForm(formData);

    const emailBody = mockSend.mock.calls[0][0].text;
    expect(emailBody).toContain('Email: contact@business.com');
  });

  it('should include website when provided', async () => {
    mockSend.mockResolvedValue({ data: { id: 'email-123' }, error: null });

    const formData = createFormData({
      business: 'Test Business',
      contact: 'John Doe',
      contactrole: 'owner',
      address: '123 Main St',
      phone: '',
      email: '',
      website: 'https://mybusiness.com',
      employees: '1',
    });

    await submitMembershipForm(formData);

    const emailBody = mockSend.mock.calls[0][0].text;
    expect(emailBody).toContain('Website: https://mybusiness.com');
  });

  it('should log error when email sending fails', async () => {
    const mockError = { message: 'Failed to send email' };
    mockSend.mockResolvedValue({ data: null, error: mockError });

    const formData = createFormData({
      business: 'Test Business',
      contact: 'John Doe',
      contactrole: 'owner',
      address: '123 Main St',
      phone: '',
      email: '',
      website: '',
      employees: '1',
    });

    await submitMembershipForm(formData);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed to send email:',
      mockError,
    );
  });

  it('should handle Resend API errors gracefully', async () => {
    mockSend.mockResolvedValue({
      data: null,
      error: { name: 'validation_error', message: 'Invalid API key' },
    });

    const formData = createFormData({
      business: 'Test Business',
      contact: 'John Doe',
      contactrole: 'owner',
      address: '123 Main St',
      phone: '',
      email: '',
      website: '',
      employees: '1',
    });

    // Should not throw
    await expect(submitMembershipForm(formData)).resolves.not.toThrow();

    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('should create Resend instance with API key from environment', async () => {
    mockSend.mockResolvedValue({ data: { id: 'email-123' }, error: null });

    const formData = createFormData({
      business: 'Test Business',
      contact: 'John Doe',
      contactrole: 'owner',
      address: '123 Main St',
      phone: '',
      email: '',
      website: '',
      employees: '1',
    });

    await submitMembershipForm(formData);

    expect(Resend).toHaveBeenCalledWith('test-api-key');
  });

  it('should format email body correctly', async () => {
    mockSend.mockResolvedValue({ data: { id: 'email-123' }, error: null });

    const formData = createFormData({
      business: 'My Business',
      contact: 'Test User',
      contactrole: 'manager',
      address: '100 Test St',
      phone: '555-0000',
      email: 'test@test.com',
      website: 'test.com',
      employees: '3',
    });

    await submitMembershipForm(formData);

    const emailBody = mockSend.mock.calls[0][0].text;
    expect(emailBody).toContain('New Chamber Membership Application');
    expect(emailBody).toContain('Business Name: My Business');
    expect(emailBody).toContain('Contact Name: Test User');
    expect(emailBody).toContain("Contact's Role: manager");
    expect(emailBody).toContain('Business Address: 100 Test St');
    expect(emailBody).toContain('Phone Number: 555-0000');
    expect(emailBody).toContain('Email: test@test.com');
    expect(emailBody).toContain('Website: test.com');
  });

  it('should use correct recipient email address', async () => {
    mockSend.mockResolvedValue({ data: { id: 'email-123' }, error: null });

    const formData = createFormData({
      business: 'Test Business',
      contact: 'John Doe',
      contactrole: 'owner',
      address: '123 Main St',
      phone: '',
      email: '',
      website: '',
      employees: '1',
    });

    await submitMembershipForm(formData);

    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'luinyalia@gmail.com',
      }),
    );
  });

  it('should use correct sender email address', async () => {
    mockSend.mockResolvedValue({ data: { id: 'email-123' }, error: null });

    const formData = createFormData({
      business: 'Test Business',
      contact: 'John Doe',
      contactrole: 'owner',
      address: '123 Main St',
      phone: '',
      email: '',
      website: '',
      employees: '1',
    });

    await submitMembershipForm(formData);

    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'onboarding@resend.dev',
      }),
    );
  });

  it('should include business name in email subject', async () => {
    mockSend.mockResolvedValue({ data: { id: 'email-123' }, error: null });

    const formData = createFormData({
      business: 'Amazing Company LLC',
      contact: 'John Doe',
      contactrole: 'owner',
      address: '123 Main St',
      phone: '',
      email: '',
      website: '',
      employees: '1',
    });

    await submitMembershipForm(formData);

    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: 'New Membership Application - Amazing Company LLC',
      }),
    );
  });
});
