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
        <h2 className="mb-5 text-2xl md:text-3xl font-bold text-white">
          Application Submitted Successfully!
        </h2>
        <p className="text-base md:text-lg text-white mb-6">
          Thank you for your interest in joining the Meriden/Ozawkie Area
          Chamber of Commerce. We have received your membership application and
          will be in touch with you shortly.
        </p>
        <p className="text-sm text-white">
          You should receive a confirmation email at the address you provided.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-lg py-20">
      <div className="mx-auto mb-8 w-full text-center md:mb-10 lg:mb-12">
        <h2 className="rb-5 mb-5 text-lg md:text-3xl font-bold md:mb-6 text-white">
          Join us
        </h2>
        <p className="text-base md:text-lg text-white">
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
            className="block text-lg font-medium text-white mb-2"
          >
            Business name <span className="text-red-400">*</span>
          </Label>
          <TextInput
            type="text"
            id="business"
            name="business"
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="items-center">
          <Label
            htmlFor="contact"
            className="block text-lg font-medium text-white mb-2"
          >
            Contact name <span className="text-red-400">*</span>
          </Label>
          <TextInput
            type="text"
            id="contact"
            name="contact"
            required
            disabled={isSubmitting}
          />
        </div>
        <div>
          <Label className="block text-lg font-medium text-white mb-2">
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
            className="block text-lg font-medium text-white mb-2"
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
          />
        </div>
        <div className="items-center">
          <Label
            htmlFor="phone"
            className="block text-lg font-medium text-white mb-2"
          >
            Phone number
          </Label>
          <TextInput
            type="tel"
            id="phone"
            name="phone"
            placeholder="(555) 555-5555"
            disabled={isSubmitting}
          />
        </div>
        <div className="items-center">
          <Label
            htmlFor="email"
            className="block text-lg font-medium text-white mb-2"
          >
            Email
          </Label>
          <TextInput
            type="email"
            id="email"
            name="email"
            placeholder="name@sample.com"
            disabled={isSubmitting}
          />
        </div>
        <div className="items-center">
          <Label
            htmlFor="website"
            className="block text-lg font-medium text-white mb-2"
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
          />
        </div>
        <Button
          type="submit"
          title="Submit"
          disabled={isSubmitting}
          className="bg-black text-white hover:bg-gray-800 font-semibold"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}
