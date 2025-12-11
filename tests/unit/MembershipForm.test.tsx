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
    });

    it('renders optional form fields', () => {
      render(<MembershipForm />);

      expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/website/i)).toBeInTheDocument();
    });

    it('renders contact role radio buttons', () => {
      render(<MembershipForm />);

      expect(screen.getByLabelText(/owner/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/manager/i)).toBeInTheDocument();
    });

    it('has owner radio button checked by default', () => {
      render(<MembershipForm />);

      const ownerRadio = screen.getByLabelText(/owner/i) as HTMLInputElement;
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

      const ownerRadio = screen.getByLabelText(/owner/i);
      expect(ownerRadio).toBeRequired();
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
      await userEvent.click(screen.getByLabelText(/manager/i));

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

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await userEvent.click(submitButton);

      expect(screen.getByLabelText(/business name/i)).toBeDisabled();
      expect(screen.getByLabelText(/contact name/i)).toBeDisabled();
      expect(screen.getByLabelText(/business address/i)).toBeDisabled();
      expect(screen.getByLabelText(/phone number/i)).toBeDisabled();
      expect(screen.getByLabelText(/^email$/i)).toBeDisabled();
      expect(screen.getByLabelText(/website/i)).toBeDisabled();
      expect(screen.getByLabelText(/owner/i)).toBeDisabled();
      expect(screen.getByLabelText(/manager/i)).toBeDisabled();
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

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/thank you for your interest in joining/i),
        ).toBeInTheDocument();
      });
    });

    it('displays confirmation email message in success state', async () => {
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

      const submitButton = screen.getByRole('button', { name: /submit/i });
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/you should receive a confirmation email/i),
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
    });

    it('submit button has proper type attribute', () => {
      render(<MembershipForm />);
      const submitButton = screen.getByRole('button', { name: /submit/i });
      expect(submitButton).toHaveAttribute('type', 'submit');
    });
  });
});
