import Form from 'next/form';
import { BiEnvelope, BiMap, BiPhone } from 'react-icons/bi';
import { Button, Radio, Label, TextInput } from 'flowbite-react';

import BenefitCard from '@app/components/Join/BenefitCard';

export default function Join() {
  return (
    <section className="px-[5%] mt-16">
      <div className="container">
        <div className="flex flex-col items-start">
          <div className="mx-auto mb-6 max-w-lg md:mb-9 lg:mb-10">
            <div>
              <h2 className="mb-5 text-center text-3xl font-bold md:mb-6">
                Grow your business
              </h2>
              <p className="text-center md:text-md">
                Join the Meriden/Ozawkie Area Chamber of Commerce and unlock
                powerful opportunities for local business success
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-4">
            <BenefitCard
              key="join-benefit-1"
              message="Promote your business through Chamber activities"
              alt="Promote your business"
            />
            <BenefitCard
              key="join-benefit-2"
              message="Enhance your network of key business contacts"
              alt="Enhance your network"
            />
            <BenefitCard
              key="join-benefit-3"
              message="Develop our community through meaningful service"
              alt="Develop through service"
            />
            <BenefitCard
              key="join-benefit-4"
              message="Support the creation of strong local businesses"
              alt="Support local business"
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto max-w-lg py-20">
        <div className="mx-auto mb-8 w-full text-center md:mb-10 lg:mb-12">
          <h2 className="rb-5 mb-5 text-3xl font-bold md:mb-6">Join us</h2>
          <p className="md:text-md">
            Complete your chamber membership application
          </p>
        </div>
        <Form
          action=""
          className="mx-auto grid w-full max-w-md grid-cols-1 gap-6"
        >
          <div className="items-center mb-2">
            <Label
              htmlFor="business"
              className="block text-lg font-medium text-gray-900 dark:text-gray-900"
            >
              Business name
            </Label>
            <TextInput type="text" id="business" required />
          </div>
          <div className="items-center">
            <Label
              htmlFor="contact"
              className="block text-lg font-medium text-gray-900 dark:text-gray-900"
            >
              Contact name
            </Label>
            <TextInput type="text" id="contact" required />
          </div>
          <div className="">
            <Label
              htmlFor="contactrole"
              className="block text-lg font-medium text-gray-900 dark:text-gray-900"
            >
              Contact role
            </Label>
            <Radio id="owner" name="contactrole" value="owner" defaultChecked />
            <Label
              htmlFor="owner"
              className="block text-lg font-medium text-gray-900 dark:text-gray-900"
            >
              Owner
            </Label>
            <Radio id="manager" name="contactrole" value="manager" />
            <Label
              htmlFor="manager"
              className="block text-lg font-medium text-gray-900 dark:text-gray-900"
            >
              Manager
            </Label>
          </div>
          <div className="items-center">
            <Label
              htmlFor="address"
              className="block text-lg font-medium text-gray-900 dark:text-gray-900"
            >
              Address
            </Label>
            <TextInput
              type="text"
              id="address"
              placeholder="555 SW Yellowbrick Rd. Meriden, KS. Zip 66512"
              required
            />
          </div>
          <div className="items-center">
            <Label
              htmlFor="phone"
              className="block text-lg font-medium text-gray-900 dark:text-gray-900"
            >
              Phone
            </Label>
            <TextInput
              type="tel"
              id="phone"
              placeholder="(555) 555-5555"
              required
            />
          </div>
          <div className="items-center">
            <Label
              htmlFor="email"
              className="block text-lg font-medium text-gray-900 dark:text-gray-900"
            >
              Email
            </Label>
            <TextInput
              type="email"
              id="email"
              placeholder="name@sample.com"
              required
            />
          </div>
          <div className="items-center">
            <Label
              htmlFor="website"
              className="block text-lg font-medium text-gray-900 dark:text-gray-900"
            >
              Website
            </Label>
            <TextInput
              type="url"
              id="website"
              placeholder="sample.com"
              required
            />
          </div>
          <Button title="Submit">Submit</Button>
        </Form>
      </div>
      <div className="container">
        <div className="rb-12 mx-auto mb-12 flex max-w-lg flex-col justify-center text-center md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6">Questions?</h2>
          <p className="md:text-md">
            We are here to answer your membership questions
          </p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 items-center gap-x-12 gap-y-12 md:grid-cols-3 md:gap-y-16">
          <div className="flex flex-col items-center justify-start text-center">
            <div className="mb-5 lg:mb-6">
              <BiEnvelope className="size-12" />
            </div>
            <h3 className="mb-3 text-2xl font-bold leading-[1.4] md:text-3xl lg:mb-4 lg:text-4xl">
              Email
            </h3>
            <a href="mailto:meridenozawkieareachamber@gmail.com">
              meridenozawkieareachamber@gmail.com
            </a>
          </div>
          <div className="flex flex-col items-center justify-start text-center">
            <div className="mb-5 lg:mb-6">
              <BiPhone className="size-12" />
            </div>
            <h3 className="mb-3 text-2xl font-bold leading-[1.4] md:text-3xl lg:mb-4 lg:text-4xl">
              Phone
            </h3>
            <p>(785) 817-5979</p>
          </div>
          <div className="flex flex-col items-center justify-start text-center">
            <div className="mb-5 lg:mb-6">
              <BiMap className="size-12" />
            </div>
            <h3 className="mb-3 text-2xl font-bold leading-[1.4] md:text-3xl lg:mb-4 lg:text-4xl">
              Office
            </h3>
            <a href="https://maps.app.goo.gl/8A8siHDuCAgQYXvP9">
              3675 74th St, Meriden, KS 66512
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
