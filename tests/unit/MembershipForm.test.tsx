import MembershipForm from '@app/components/Join/MembershipForm';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// Mock the submitMembershipForm action
jest.mock('../../app/components/Join/actions', () => ({
  submitMembershipForm: jest.fn(),
}));

import { submitMembershipForm } from '../../app/components/Join/actions';

// Mock window.alert
const mockAlert = jest.fn();
global.alert = mockAlert;

describe('MembershipForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Initial Render', () => {
    it('renders the form with heading and description', () => {
      render(<MembershipForm />);

      expect(screen.getByText('Join us')).toBeInTheDocument();
      expect(
        screen.getByText('Complete your chamber membership application'),
      ).toBeInTheDocument();
    });

    it('renders all required form fields', () => {
      render(<MembershipForm />);

      expect(screen.getByLabelText(/business name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/contact name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/business address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/number of employees/i)).toBeInTheDocument();
    });

    it('renders optional form fields', () => {
      render(<MembershipForm />);

      expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/website/i)).toBeInTheDocument();
      expect(
        screen.getByLabelText(/who can we thank for referring you/i),
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText(/activity fund donation/i),
      ).toBeInTheDocument();
    });

    it('renders contact role radio buttons', () => {
      render(<MembershipForm />);

      expect(screen.getByLabelText(/^owner$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^manager$/i)).toBeInTheDocument();
    });

    it('has owner radio button checked by default', () => {
      render(<MembershipForm />);

      const ownerRadio = screen.getByLabelText(/^owner$/i) as HTMLInputElement;
      expect(ownerRadio.checked).toBe(true);
    });

    it('renders submit button with correct text', () => {
      render(<MembershipForm />);

      const submitButton = screen.getByRole('button', { name: /submit/i });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveTextContent('Submit');
    });

    it('all form fields are enabled initially', () => {
      render(<MembershipForm />);

      expect(screen.getByLabelText(/business name/i)).not.toBeDisabled();
      expect(screen.getByLabelText(/contact name/i)).not.toBeDisabled();
      expect(screen.getByLabelText(/business address/i)).not.toBeDisabled();
      expect(
        screen.getByRole('button', { name: /submit/i }),
      ).not.toBeDisabled();
    });
  });

  describe('Form Validation', () => {
    it('has required attribute on business name field', () => {
      render(<MembershipForm />);

      const businessField = screen.getByLabelText(/business name/i);
      expect(businessField).toBeRequired();
    });

    it('has required attribute on contact name field', () => {
      render(<MembershipForm />);

      const contactField = screen.getByLabelText(/contact name/i);
      expect(contactField).toBeRequired();
    });

    it('has required attribute on address field', () => {
      render(<MembershipForm />);

      const addressField = screen.getByLabelText(/business address/i);
      expect(addressField).toBeRequired();
    });

    it('has required attribute on contact role', () => {
      render(<MembershipForm />);

      const ownerRadio = screen.getByLabelText(/^owner$/i);
      expect(ownerRadio).toBeRequired();
    });

    it('has required attribute on number of employees field', () => {
      render(<MembershipForm />);

      const employeesField = screen.getByLabelText(/number of employees/i);
      expect(employeesField).toBeRequired();
    });
  });

  describe('Form Submission', () => {
    it('calls submitMembershipForm when form is submitted', async () => {
      (submitMembershipForm as jest.Mock).mockResolvedValue(undefined);

      render(<MembershipForm />);

      await userEvent.type(
        screen.getByLabelText(/business name/i),
        'Test Business',
      );
      await userEvent.type(screen.getByLabelText(/contact name/i), 'John Doe');
      await userEvent.type(
        screen.getByLabelText(/business address/i),
        '123 Main St',
      );
      await userEvent.type(screen.getByLabelText(/number of employees/i), '3');

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(submitMembershipForm).toHaveBeenCalledTimes(1);
      });
    });

    it('submits form data with all fields filled', async () => {
      (submitMembershipForm as jest.Mock).mockResolvedValue(undefined);

      render(<MembershipForm />);

      await userEvent.type(
        screen.getByLabelText(/business name/i),
        'Acme Corp',
      );
      await userEvent.type(
        screen.getByLabelText(/contact name/i),
        'Jane Smith',
      );
      await userEvent.type(
        screen.getByLabelText(/business address/i),
        '456 Oak Ave',
      );
      await userEvent.type(screen.getByLabelText(/phone number/i), '555-1234');
      await userEvent.type(
        screen.getByLabelText(/^email$/i),
        'test@example.com',
      );
      await userEvent.type(
        screen.getByLabelText(/website/i),
        'https://example.com',
      );
      await userEvent.type(screen.getByLabelText(/number of employees/i), '5');
      await userEvent.type(
        screen.getByLabelText(/who can we thank for referring you/i),
        'Bob Smith',
      );
      await userEvent.type(
        screen.getByLabelText(/activity fund donation/i),
        '50',
      );

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(submitMembershipForm).toHaveBeenCalled();
        const formData = (submitMembershipForm as jest.Mock).mock.calls[0][0];
        expect(formData.get('business')).toBe('Acme Corp');
        expect(formData.get('contact')).toBe('Jane Smith');
        expect(formData.get('address')).toBe('456 Oak Ave');
        expect(formData.get('phone')).toBe('555-1234');
        expect(formData.get('email')).toBe('test@example.com');
        expect(formData.get('website')).toBe('https://example.com');
        expect(formData.get('employees')).toBe('5');
        expect(formData.get('referral')).toBe('Bob Smith');
        expect(formData.get('donation')).toBe('50');
      });
    });

    it('submits manager role when selected', async () => {
      (submitMembershipForm as jest.Mock).mockResolvedValue(undefined);

      render(<MembershipForm />);

      await userEvent.type(screen.getByLabelText(/business name/i), 'Test Co');
      await userEvent.type(screen.getByLabelText(/contact name/i), 'Bob Jones');
      await userEvent.type(
        screen.getByLabelText(/business address/i),
        '789 Pine',
      );
      await userEvent.type(screen.getByLabelText(/number of employees/i), '2');
      await userEvent.click(screen.getByLabelText(/^manager$/i));

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await userEvent.click(submitButton);

      await waitFor(() => {
        const formData = (submitMembershipForm as jest.Mock).mock.calls[0][0];
        expect(formData.get('contactrole')).toBe('manager');
      });
    });
  });

  describe('Loading State', () => {
    it('shows "Submitting..." text during submission', async () => {
      (submitMembershipForm as jest.Mock).mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100)),
      );

      render(<MembershipForm />);

      await userEvent.type(screen.getByLabelText(/business name/i), 'Test');
      await userEvent.type(screen.getByLabelText(/contact name/i), 'Test');
      await userEvent.type(screen.getByLabelText(/business address/i), 'Test');
      await userEvent.type(screen.getByLabelText(/number of employees/i), '1');

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await userEvent.click(submitButton);

      expect(
        screen.getByRole('button', { name: /submitting/i }),
      ).toBeInTheDocument();
      expect(screen.getByText('Submitting...')).toBeInTheDocument();
    });

    it('disables all form fields during submission', async () => {
      (submitMembershipForm as jest.Mock).mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100)),
      );

      render(<MembershipForm />);

      await userEvent.type(screen.getByLabelText(/business name/i), 'Test');
      await userEvent.type(screen.getByLabelText(/contact name/i), 'Test');
      await userEvent.type(screen.getByLabelText(/business address/i), 'Test');
      await userEvent.type(screen.getByLabelText(/number of employees/i), '1');

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await userEvent.click(submitButton);

      expect(screen.getByLabelText(/business name/i)).toBeDisabled();
      expect(screen.getByLabelText(/contact name/i)).toBeDisabled();
      expect(screen.getByLabelText(/business address/i)).toBeDisabled();
      expect(screen.getByLabelText(/phone number/i)).toBeDisabled();
      expect(screen.getByLabelText(/^email$/i)).toBeDisabled();
      expect(screen.getByLabelText(/website/i)).toBeDisabled();
      expect(screen.getByLabelText(/number of employees/i)).toBeDisabled();
      expect(
        screen.getByLabelText(/who can we thank for referring you/i),
      ).toBeDisabled();
      expect(screen.getByLabelText(/activity fund donation/i)).toBeDisabled();
      expect(screen.getByLabelText(/^owner$/i)).toBeDisabled();
      expect(screen.getByLabelText(/^manager$/i)).toBeDisabled();
      expect(
        screen.getByRole('button', { name: /submitting/i }),
      ).toBeDisabled();
    });

    it('re-enables fields after submission completes', async () => {
      (submitMembershipForm as jest.Mock).mockRejectedValue(
        new Error('Test error'),
      );

      render(<MembershipForm />);

      await userEvent.type(screen.getByLabelText(/business name/i), 'Test');
      await userEvent.type(screen.getByLabelText(/contact name/i), 'Test');
      await userEvent.type(screen.getByLabelText(/business address/i), 'Test');
      await userEvent.type(screen.getByLabelText(/number of employees/i), '1');

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByLabelText(/business name/i)).not.toBeDisabled();
      });
    });
  });

  describe('Success State', () => {
    it('shows success message after successful submission', async () => {
      (submitMembershipForm as jest.Mock).mockResolvedValue(undefined);

      render(<MembershipForm />);

      await userEvent.type(
        screen.getByLabelText(/business name/i),
        'Test Business',
      );
      await userEvent.type(screen.getByLabelText(/contact name/i), 'John Doe');
      await userEvent.type(
        screen.getByLabelText(/business address/i),
        '123 Main',
      );
      await userEvent.type(screen.getByLabelText(/number of employees/i), '1');

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText('Application Submitted Successfully!'),
        ).toBeInTheDocument();
      });
    });

    it('hides form after successful submission', async () => {
      (submitMembershipForm as jest.Mock).mockResolvedValue(undefined);

      render(<MembershipForm />);

      await userEvent.type(
        screen.getByLabelText(/business name/i),
        'Test Business',
      );
      await userEvent.type(screen.getByLabelText(/contact name/i), 'John Doe');
      await userEvent.type(
        screen.getByLabelText(/business address/i),
        '123 Main',
      );
      await userEvent.type(screen.getByLabelText(/number of employees/i), '1');

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.queryByLabelText(/business name/i),
        ).not.toBeInTheDocument();
        expect(screen.queryByText('Join us')).not.toBeInTheDocument();
      });
    });

    it('displays thank you message in success state', async () => {
      (submitMembershipForm as jest.Mock).mockResolvedValue(undefined);

      render(<MembershipForm />);

      await userEvent.type(
        screen.getByLabelText(/business name/i),
        'Test Business',
      );
      await userEvent.type(screen.getByLabelText(/contact name/i), 'John Doe');
      await userEvent.type(
        screen.getByLabelText(/business address/i),
        '123 Main',
      );
      await userEvent.type(screen.getByLabelText(/number of employees/i), '1');

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/thank you for your interest in joining/i),
        ).toBeInTheDocument();
      });
    });

    it('displays success checkmark icon', async () => {
      (submitMembershipForm as jest.Mock).mockResolvedValue(undefined);

      render(<MembershipForm />);

      await userEvent.type(
        screen.getByLabelText(/business name/i),
        'Test Business',
      );
      await userEvent.type(screen.getByLabelText(/contact name/i), 'John Doe');
      await userEvent.type(
        screen.getByLabelText(/business address/i),
        '123 Main',
      );
      await userEvent.type(screen.getByLabelText(/number of employees/i), '1');

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await userEvent.click(submitButton);

      await waitFor(() => {
        const svg = document.querySelector('svg.text-green-400');
        expect(svg).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('shows alert when submission fails', async () => {
      (submitMembershipForm as jest.Mock).mockRejectedValue(
        new Error('Network error'),
      );

      render(<MembershipForm />);

      await userEvent.type(
        screen.getByLabelText(/business name/i),
        'Test Business',
      );
      await userEvent.type(screen.getByLabelText(/contact name/i), 'John Doe');
      await userEvent.type(
        screen.getByLabelText(/business address/i),
        '123 Main',
      );
      await userEvent.type(screen.getByLabelText(/number of employees/i), '1');

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(mockAlert).toHaveBeenCalledWith(
          'There was an error submitting your application. Please try again.',
        );
      });
    });

    it('does not show success message when submission fails', async () => {
      (submitMembershipForm as jest.Mock).mockRejectedValue(
        new Error('Network error'),
      );

      render(<MembershipForm />);

      await userEvent.type(
        screen.getByLabelText(/business name/i),
        'Test Business',
      );
      await userEvent.type(screen.getByLabelText(/contact name/i), 'John Doe');
      await userEvent.type(
        screen.getByLabelText(/business address/i),
        '123 Main',
      );
      await userEvent.type(screen.getByLabelText(/number of employees/i), '1');

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(mockAlert).toHaveBeenCalled();
      });

      expect(
        screen.queryByText('Application Submitted Successfully!'),
      ).not.toBeInTheDocument();
    });

    it('keeps form visible after error', async () => {
      (submitMembershipForm as jest.Mock).mockRejectedValue(
        new Error('Network error'),
      );

      render(<MembershipForm />);

      await userEvent.type(
        screen.getByLabelText(/business name/i),
        'Test Business',
      );
      await userEvent.type(screen.getByLabelText(/contact name/i), 'John Doe');
      await userEvent.type(
        screen.getByLabelText(/business address/i),
        '123 Main',
      );
      await userEvent.type(screen.getByLabelText(/number of employees/i), '1');

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(mockAlert).toHaveBeenCalled();
      });

      expect(screen.getByLabelText(/business name/i)).toBeInTheDocument();
      expect(screen.getByText('Join us')).toBeInTheDocument();
    });

    it('logs error to console when submission fails', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const testError = new Error('Test error');
      (submitMembershipForm as jest.Mock).mockRejectedValue(testError);

      render(<MembershipForm />);

      await userEvent.type(screen.getByLabelText(/business name/i), 'Test');
      await userEvent.type(screen.getByLabelText(/contact name/i), 'Test');
      await userEvent.type(screen.getByLabelText(/business address/i), 'Test');
      await userEvent.type(screen.getByLabelText(/number of employees/i), '1');

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'Error submitting form:',
          testError,
        );
      });

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Pattern Validation', () => {
    it('business name field has pattern attribute', () => {
      render(<MembershipForm />);
      const businessField = screen.getByLabelText(/business name/i);
      expect(businessField).toHaveAttribute('pattern');
    });

    it('business name field rejects invalid characters', () => {
      render(<MembershipForm />);
      const businessField = screen.getByLabelText(
        /business name/i,
      ) as HTMLInputElement;
      const pattern = new RegExp(businessField.pattern);

      // Valid inputs should pass
      expect(pattern.test('Acme Corp')).toBe(true);
      expect(pattern.test("Joe's Diner")).toBe(true);
      expect(pattern.test('ABC & Co.')).toBe(true);
      expect(pattern.test('Business #1')).toBe(true);

      // Invalid inputs should fail
      expect(pattern.test('Business@Name')).toBe(false);
      expect(pattern.test('Test!Corp')).toBe(false);
      expect(pattern.test('Company$Inc')).toBe(false);
      expect(pattern.test('Name<Script>')).toBe(false);
    });

    it('contact name field has pattern attribute', () => {
      render(<MembershipForm />);
      const contactField = screen.getByLabelText(/contact name/i);
      expect(contactField).toHaveAttribute('pattern');
    });

    it('contact name field rejects invalid characters', () => {
      render(<MembershipForm />);
      const contactField = screen.getByLabelText(
        /contact name/i,
      ) as HTMLInputElement;
      const pattern = new RegExp(contactField.pattern);

      // Valid inputs should pass
      expect(pattern.test('John Doe')).toBe(true);
      expect(pattern.test("Mary O'Brien")).toBe(true);
      expect(pattern.test('Anna-Marie Smith')).toBe(true);
      expect(pattern.test('Dr. Jane')).toBe(true);

      // Invalid inputs should fail
      expect(pattern.test('John123')).toBe(false);
      expect(pattern.test('Name@Email')).toBe(false);
      expect(pattern.test('Test!')).toBe(false);
      expect(pattern.test('User#1')).toBe(false);
    });

    it('address field has pattern attribute', () => {
      render(<MembershipForm />);
      const addressField = screen.getByLabelText(/business address/i);
      expect(addressField).toHaveAttribute('pattern');
    });

    it('address field rejects invalid characters', () => {
      render(<MembershipForm />);
      const addressField = screen.getByLabelText(
        /business address/i,
      ) as HTMLInputElement;
      const pattern = new RegExp(addressField.pattern);

      // Valid inputs should pass
      expect(pattern.test('123 Main St.')).toBe(true);
      expect(pattern.test('456 Oak Ave, Suite #5')).toBe(true);
      expect(pattern.test('789 Pine Rd. Apt 2/B')).toBe(true);

      // Invalid inputs should fail
      expect(pattern.test('123 Main St@')).toBe(false);
      expect(pattern.test('Address!')).toBe(false);
      expect(pattern.test('Test$Address')).toBe(false);
      expect(pattern.test('<script>alert</script>')).toBe(false);
    });

    it('website field has pattern attribute', () => {
      render(<MembershipForm />);
      const websiteField = screen.getByLabelText(/website/i);
      expect(websiteField).toHaveAttribute('pattern');
    });

    it('website field rejects invalid URLs', () => {
      render(<MembershipForm />);
      const websiteField = screen.getByLabelText(
        /website/i,
      ) as HTMLInputElement;
      const pattern = new RegExp(websiteField.pattern);

      // Valid inputs should pass
      expect(pattern.test('example.com')).toBe(true);
      expect(pattern.test('https://example.com')).toBe(true);
      expect(pattern.test('http://sub.example.org/path')).toBe(true);

      // Invalid inputs should fail
      expect(pattern.test('not a url')).toBe(false);
      expect(pattern.test('example')).toBe(false);
      expect(pattern.test('ftp://example.com')).toBe(false);
    });

    it('referral field has pattern attribute', () => {
      render(<MembershipForm />);
      const referralField = screen.getByLabelText(
        /who can we thank for referring you/i,
      );
      expect(referralField).toHaveAttribute('pattern');
    });

    it('referral field rejects invalid characters', () => {
      render(<MembershipForm />);
      const referralField = screen.getByLabelText(
        /who can we thank for referring you/i,
      ) as HTMLInputElement;
      const pattern = new RegExp(referralField.pattern);

      // Valid inputs should pass (including empty string)
      expect(pattern.test('')).toBe(true);
      expect(pattern.test('Jane Doe')).toBe(true);
      expect(pattern.test("Patrick O'Malley")).toBe(true);
      expect(pattern.test('Mary-Jane Watson')).toBe(true);

      // Invalid inputs should fail
      expect(pattern.test('John123')).toBe(false);
      expect(pattern.test('Name@Email')).toBe(false);
      expect(pattern.test('Test!')).toBe(false);
      expect(pattern.test('User#1')).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('has proper form structure with form element', () => {
      const { container } = render(<MembershipForm />);
      const form = container.querySelector('form');
      expect(form).toBeInTheDocument();
    });

    it('has proper heading hierarchy', () => {
      render(<MembershipForm />);
      const heading = screen.getByRole('heading', { name: /join us/i });
      expect(heading).toBeInTheDocument();
    });

    it('all form fields have associated labels', () => {
      render(<MembershipForm />);

      expect(screen.getByLabelText(/business name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/contact name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/business address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/website/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/number of employees/i)).toBeInTheDocument();
      expect(
        screen.getByLabelText(/who can we thank for referring you/i),
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText(/activity fund donation/i),
      ).toBeInTheDocument();
    });

    it('submit button has proper type attribute', () => {
      render(<MembershipForm />);
      const submitButton = screen.getByRole('button', { name: /submit/i });
      expect(submitButton).toHaveAttribute('type', 'submit');
    });
  });
});
