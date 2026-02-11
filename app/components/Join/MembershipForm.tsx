'use client';

import { useState } from 'react';
import { Button, Radio, Label, TextInput } from 'flowbite-react';
import { submitMembershipForm } from '@app/components/Join/actions';

export default function MembershipForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      await submitMembershipForm(formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(
        'There was an error submitting your application. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-lg py-20 text-center">
        <div className="mb-8">
          <svg
            className="mx-auto size-16 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="mb-5 text-2xl lg:text-3xl font-bold text-white">
          Application Submitted Successfully!
        </h2>
        <p className="text-base lg:text-lg text-white mb-6">
          Thank you for your interest in joining the Meriden/Ozawkie Area
          Chamber of Commerce. We received your membership application and will
          get in touch with you soon.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-lg px-[5%] py-20 lg:px-0">
      <div className="mx-auto mb-8 w-full text-center lg:mb-10 xl:mb-12">
        <h2 className="rb-5 mb-5 text-lg lg:text-3xl font-bold lg:mb-6 text-white">
          Join us
        </h2>
        <p className="text-base lg:text-lg text-white">
          Complete your chamber membership application
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto grid w-full max-w-md grid-cols-1 gap-6"
      >
        <div className="items-center mb-2">
          <Label
            htmlFor="business"
            className="block text-base xl:text-lg font-medium text-white mb-2"
          >
            Business name <span className="text-red-400">*</span>
          </Label>
          <TextInput
            type="text"
            id="business"
            name="business"
            required
            disabled={isSubmitting}
            className="text-base xl:text-lg"
            pattern="^[\w\s\-\.\,\&\'\#]+$"
            title="Enter a valid business name (letters, numbers, spaces, and common punctuation)"
          />
        </div>
        <div className="items-center">
          <Label
            htmlFor="contact"
            className="block text-base xl:text-lg font-medium text-white mb-2"
          >
            Contact name <span className="text-red-400">*</span>
          </Label>
          <TextInput
            type="text"
            id="contact"
            name="contact"
            required
            disabled={isSubmitting}
            className="text-base xl:text-lg"
            pattern="^[a-zA-Z\s\-\'\.]+$"
            title="Enter a valid name (letters, spaces, hyphens, and apostrophes)"
          />
        </div>
        <div>
          <Label className="block text-base xl:text-lg font-medium text-white mb-2">
            Contact&apos;s role <span className="text-red-400">*</span>
          </Label>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Radio
                id="owner"
                name="contactrole"
                value="owner"
                defaultChecked
                required
                color="dark"
                disabled={isSubmitting}
              />
              <Label
                htmlFor="owner"
                className="font-normal cursor-pointer text-white"
              >
                Owner
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                id="manager"
                name="contactrole"
                value="manager"
                color="dark"
                disabled={isSubmitting}
              />
              <Label
                htmlFor="manager"
                className="font-normal cursor-pointer text-white"
              >
                Manager
              </Label>
            </div>
          </div>
        </div>
        <div className="items-center">
          <Label
            htmlFor="address"
            className="block text-base xl:text-lg font-medium text-white mb-2"
          >
            Business address <span className="text-red-400">*</span>
          </Label>
          <TextInput
            type="text"
            id="address"
            name="address"
            placeholder="555 SW Yellowbrick Rd. Meriden, KS. Zip 66512"
            required
            disabled={isSubmitting}
            className="text-base xl:text-lg"
            pattern="^[\w\s\-\.\,\#\/]+$"
            title="Enter a valid address (letters, numbers, spaces, and common punctuation)"
          />
        </div>
        <div className="items-center">
          <Label
            htmlFor="phone"
            className="block text-base xl:text-lg font-medium text-white mb-2"
          >
            Phone number
          </Label>
          <TextInput
            type="tel"
            id="phone"
            name="phone"
            placeholder="(555) 555-5555"
            disabled={isSubmitting}
            className="text-base xl:text-lg"
            title="Enter a valid phone number (e.g., (555) 555-5555)"
          />
        </div>
        <div className="items-center">
          <Label
            htmlFor="email"
            className="block text-base xl:text-lg font-medium text-white mb-2"
          >
            Email
          </Label>
          <TextInput
            type="email"
            id="email"
            name="email"
            placeholder="name@sample.com"
            disabled={isSubmitting}
            className="text-base xl:text-lg"
            title="Enter a valid email address (e.g., name@sample.com)"
          />
        </div>
        <div className="items-center">
          <Label
            htmlFor="website"
            className="block text-base xl:text-lg font-medium text-white mb-2"
          >
            Website
          </Label>
          <TextInput
            type="text"
            id="website"
            name="website"
            placeholder="sample.com"
            pattern="^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$"
            title="Enter a valid website URL (e.g., sample.com or https://sample.com)"
            disabled={isSubmitting}
            className="text-base xl:text-lg"
          />
        </div>
        <div className="items-center">
          <Label className="block text-base xl:text-lg font-medium text-white mb-4">
            Monthly Dues
          </Label>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="bg-[#081a33] text-white px-4 py-2 rounded-tl">
                  Employees
                </th>
                <th className="bg-[#081a33] text-white px-4 py-2 rounded-tr">
                  Monthly Dues
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#0e2647]">
                <td className="text-white px-4 py-2">1</td>
                <td className="text-white px-4 py-2">$30</td>
              </tr>
              <tr className="bg-[#0e2647]">
                <td className="text-white px-4 py-2">2-5</td>
                <td className="text-white px-4 py-2">$60</td>
              </tr>
              <tr className="bg-[#0e2647]">
                <td className="text-white px-4 py-2 rounded-bl">6 or more</td>
                <td className="text-white px-4 py-2 rounded-br">$90</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="items-center">
          <Label
            htmlFor="employees"
            className="block text-base xl:text-lg font-medium text-white mb-2"
          >
            Number of employees <span className="text-red-400">*</span>
            <br />
            (including owners & managers, 2 part time = 1 full time)
          </Label>
          <TextInput
            type="number"
            id="employees"
            name="employees"
            min="1"
            placeholder="1"
            required
            disabled={isSubmitting}
            className="text-base xl:text-lg"
          />
        </div>
        <div className="items-center">
          <Label
            htmlFor="referral"
            className="block text-base xl:text-lg font-medium text-white mb-2"
          >
            Who can we thank for referring you?
          </Label>
          <TextInput
            type="text"
            id="referral"
            name="referral"
            placeholder="Jane Doe"
            disabled={isSubmitting}
            className="text-base xl:text-lg"
            pattern="^[a-zA-Z\s\-\'\.]*$"
            title="Enter a valid name (letters, spaces, hyphens, and apostrophes)"
          />
        </div>
        <div className="items-center">
          <Label
            htmlFor="donation"
            className="block text-base xl:text-lg font-medium text-white mb-2"
          >
            Activity Fund Donation
          </Label>
          <TextInput
            type="number"
            id="donation"
            name="donation"
            min="0"
            step="0.01"
            placeholder="0.00"
            disabled={isSubmitting}
            className="text-base xl:text-lg"
          />
        </div>
        <Button
          type="submit"
          title="Submit"
          disabled={isSubmitting}
          className="bg-[#0e2647] text-white hover:bg-[#081a33] font-semibold"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}
