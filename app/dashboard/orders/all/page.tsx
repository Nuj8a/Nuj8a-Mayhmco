// components/StepperForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Stepper from '@/components/ui/stepper';
import { User, Home } from 'lucide-react';
import { MdReviews } from 'react-icons/md';
import { ComboboxDemo } from './content';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
}

interface AddressInfo {
  street: string;
  city: string;
  postalCode: string;
}

const steps = [
  {
    id: 1,
    label: 'Personal Information',
    description: 'Fill your personal info',
    icon: <User />
  },
  {
    id: 2,
    label: 'Address',
    description: 'Fill your address info',
    icon: <Home />
  },
  {
    id: 3,
    label: 'Review',
    description: 'Review your information',
    icon: <MdReviews />
  }
];

const StepperForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [address, setAddress] = useState<AddressInfo>({
    street: '',
    city: '',
    postalCode: ''
  });

  useEffect(() => {
    const savedData = localStorage.getItem('formDraft');
    if (savedData) {
      const { personalInfo, address, activeStep } = JSON.parse(savedData);
      setPersonalInfo(personalInfo);
      setAddress(address);
      setActiveStep(activeStep);
    }
  }, []);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      // eslint-disable-next-line no-console
      console.log('Form Submitted', { personalInfo, address });
      alert('Form Submitted Successfully!');
      localStorage.removeItem('formDraft');
      setPersonalInfo({ firstName: '', lastName: '', email: '' });
      setAddress({ street: '', city: '', postalCode: '' });
      setActiveStep(0);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const handleSaveDraft = () => {
    const draft = { personalInfo, address, activeStep };
    localStorage.setItem('formDraft', JSON.stringify(draft));
    alert('Draft Saved!');
  };

  return (
    <>
      <div className="mx-auto w-full rounded-md bg-card p-6 shadow-md">
        <Stepper steps={steps} activeStep={activeStep} />

        {activeStep === 0 && (
          <div>
            <h2 className="mb-4 text-xl font-semibold">Personal Information</h2>
            <div className="space-y-4">
              <Input
                placeholder="First Name"
                value={personalInfo.firstName}
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    firstName: e.target.value
                  })
                }
              />
              <Input
                placeholder="Last Name"
                value={personalInfo.lastName}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, lastName: e.target.value })
                }
              />
              <Input
                type="email"
                placeholder="Email"
                value={personalInfo.email}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, email: e.target.value })
                }
              />
            </div>
          </div>
        )}

        {activeStep === 1 && (
          <div>
            <h2 className="mb-4 text-xl font-semibold">Address</h2>
            <div className="space-y-4">
              <Input
                placeholder="Street Address"
                value={address.street}
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
              />
              <Input
                placeholder="City"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
              />
              <Input
                placeholder="Postal Code"
                value={address.postalCode}
                onChange={(e) =>
                  setAddress({ ...address, postalCode: e.target.value })
                }
              />
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div>
            <h2 className="mb-4 text-xl font-semibold">Review</h2>
            <div className="space-y-2">
              <p>
                <strong>First Name:</strong> {personalInfo.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {personalInfo.lastName}
              </p>
              <p>
                <strong>Email:</strong> {personalInfo.email}
              </p>
              <p>
                <strong>Street Address:</strong> {address.street}
              </p>
              <p>
                <strong>City:</strong> {address.city}
              </p>
              <p>
                <strong>Postal Code:</strong> {address.postalCode}
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          <div className="flex space-x-2">
            {activeStep < steps.length - 1 && (
              <Button variant="secondary" onClick={handleSaveDraft}>
                Save Draft
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
      <ComboboxDemo />
    </>
  );
};

export default StepperForm;
