import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Building2, 
  Briefcase, 
  MessageSquare, 
  CreditCard,
  Save,
  AlertCircle
} from 'lucide-react';
import { BranchName, ServiceType } from '../types';

interface FormData {
  // Step 1
  businessName: string;
  entityType: string;
  pan: string;
  gstin: string;
  branch: string;
  contactPerson: string;
  phone: string;
  email: string;
  // Step 2
  services: string[];
  // Step 3
  commChannel: string;
  language: string;
  autoReminders: boolean;
  // Step 4
  bankName: string;
  accountNumber: string;
  ifsc: string;
}

const steps = [
  { id: 1, title: 'Client Details', icon: Building2, description: 'Basic business information' },
  { id: 2, title: 'Services', icon: Briefcase, description: 'Assign work types' },
  { id: 3, title: 'Communication', icon: MessageSquare, description: 'Setup preferences' },
  { id: 4, title: 'Billing', icon: CreditCard, description: 'Bank & payments' },
];

const ClientOnboardingWizard: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    entityType: 'Proprietorship',
    pan: '',
    gstin: '',
    branch: BranchName.Ravulapalem,
    contactPerson: '',
    phone: '',
    email: '',
    services: [],
    commChannel: 'WhatsApp',
    language: 'English',
    autoReminders: true,
    bankName: '',
    accountNumber: '',
    ifsc: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field if exists
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const toggleService = (service: string) => {
    setFormData(prev => {
      const exists = prev.services.includes(service);
      return {
        ...prev,
        services: exists 
          ? prev.services.filter(s => s !== service)
          : [...prev.services, service]
      };
    });
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (step === 1) {
      if (!formData.businessName) newErrors.businessName = 'Business name is required';
      if (!formData.pan) newErrors.pan = 'PAN is required';
      else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) newErrors.pan = 'Invalid PAN format';
      if (!formData.contactPerson) newErrors.contactPerson = 'Contact person is required';
      if (!formData.phone) newErrors.phone = 'Phone is required';
      if (!formData.email) newErrors.email = 'Email is required';
    }

    if (step === 2) {
      if (formData.services.length === 0) {
        // Just a warning usually, but let's enforce at least one service for valid onboarding
        newErrors.services = 'Please select at least one service';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      isValid = false;
    }

    return isValid;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo(0, 0);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    // Simulate API call
    console.log('Submitting onboarding data:', formData);
    // Navigate back to clients list with success state (mocked)
    navigate('/clients');
  };

  const renderStepIndicator = () => (
    <div className="w-full py-6">
      <div className="flex items-center justify-center space-x-4">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          
          return (
            <div key={step.id} className="flex items-center">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
                ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 
                  isCurrent ? 'bg-blue-600 border-blue-600 text-white' : 
                  'bg-white border-slate-300 text-slate-400'}
              `}>
                {isCompleted ? <Check className="w-6 h-6" /> : <step.icon className="w-5 h-5" />}
              </div>
              <div className={`ml-3 hidden sm:block ${isCurrent ? 'text-slate-900' : 'text-slate-500'}`}>
                <p className="text-sm font-medium">{step.title}</p>
                <p className="text-xs">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="w-12 h-0.5 mx-4 bg-slate-200 hidden md:block" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2">
        <h3 className="text-lg font-medium text-slate-800 mb-4 border-b pb-2">Business Information</h3>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-700">Business / Client Name *</label>
        <input 
          type="text" 
          value={formData.businessName}
          onChange={(e) => handleChange('businessName', e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.businessName ? 'border-red-500' : 'border-slate-300'}`}
          placeholder="e.g. Srinivasa Traders"
        />
        {errors.businessName && <p className="text-xs text-red-500">{errors.businessName}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-700">Entity Type</label>
        <select 
          value={formData.entityType}
          onChange={(e) => handleChange('entityType', e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
        >
          <option>Proprietorship</option>
          <option>Partnership Firm</option>
          <option>Private Limited Company</option>
          <option>LLP</option>
          <option>Individual / HUF</option>
          <option>Trust / Society</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-700">PAN Number *</label>
        <input 
          type="text" 
          value={formData.pan}
          onChange={(e) => handleChange('pan', e.target.value.toUpperCase())}
          maxLength={10}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono ${errors.pan ? 'border-red-500' : 'border-slate-300'}`}
          placeholder="ABCDE1234F"
        />
        {errors.pan && <p className="text-xs text-red-500">{errors.pan}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-700">GSTIN (Optional)</label>
        <input 
          type="text" 
          value={formData.gstin}
          onChange={(e) => handleChange('gstin', e.target.value.toUpperCase())}
          maxLength={15}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
          placeholder="37ABCDE1234F1Z5"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-700">Assigned Branch *</label>
        <select 
          value={formData.branch}
          onChange={(e) => handleChange('branch', e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
        >
          {Object.values(BranchName).map(branch => (
            <option key={branch} value={branch}>{branch}</option>
          ))}
        </select>
      </div>

      <div className="md:col-span-2 mt-4">
        <h3 className="text-lg font-medium text-slate-800 mb-4 border-b pb-2">Primary Contact</h3>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-700">Contact Person *</label>
        <input 
          type="text" 
          value={formData.contactPerson}
          onChange={(e) => handleChange('contactPerson', e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.contactPerson ? 'border-red-500' : 'border-slate-300'}`}
          placeholder="Full Name"
        />
        {errors.contactPerson && <p className="text-xs text-red-500">{errors.contactPerson}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-700">Mobile Number *</label>
        <input 
          type="tel" 
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.phone ? 'border-red-500' : 'border-slate-300'}`}
          placeholder="98765 43210"
        />
        {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
      </div>

      <div className="space-y-1 md:col-span-2">
        <label className="block text-sm font-medium text-slate-700">Email Address *</label>
        <input 
          type="email" 
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.email ? 'border-red-500' : 'border-slate-300'}`}
          placeholder="client@example.com"
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <h3 className="text-lg font-medium text-slate-800 mb-2">Assign Services</h3>
      <p className="text-slate-500 text-sm mb-6">Select the services AVR Associates will provide to this client.</p>

      {errors.services && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
          <AlertCircle className="h-4 w-4 mr-2" />
          {errors.services}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.values(ServiceType).map((service) => {
          const isSelected = formData.services.includes(service);
          return (
            <div 
              key={service}
              onClick={() => toggleService(service)}
              className={`
                cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 flex items-start space-x-3
                ${isSelected 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-slate-200 hover:border-slate-300 bg-white'}
              `}
            >
              <div className={`
                w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5
                ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-300 bg-white'}
              `}>
                {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
              </div>
              <div>
                <span className={`font-semibold block ${isSelected ? 'text-blue-800' : 'text-slate-700'}`}>
                  {service}
                </span>
                <span className="text-xs text-slate-500 mt-1 block">
                  {service === 'GST' ? 'Monthly GSTR-1 & 3B' : 
                   service === 'Income Tax' ? 'Annual ITR Filings' :
                   service === 'TDS' ? 'Quarterly TDS Returns' : 'Compliance management'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h3 className="text-lg font-medium text-slate-800 mb-4">Communication Preferences</h3>
        <p className="text-slate-500 text-sm mb-6">How should we notify the client about deadlines and payments?</p>

        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">Preferred Channel</label>
            <div className="flex space-x-4">
              {['Email', 'WhatsApp', 'SMS'].map((channel) => (
                <label key={channel} className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="channel"
                    checked={formData.commChannel === channel}
                    onChange={() => handleChange('commChannel', channel)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-slate-700">{channel}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">Communication Language</label>
            <div className="flex space-x-4">
              {['English', 'Telugu'].map((lang) => (
                <label key={lang} className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="language"
                    checked={formData.language === lang}
                    onChange={() => handleChange('language', lang)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-slate-700">{lang}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div>
              <p className="font-medium text-slate-800">Automated Reminders</p>
              <p className="text-xs text-slate-500">Send auto-reminders for due dates and payment follow-ups.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={formData.autoReminders}
                onChange={(e) => handleChange('autoReminders', e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-lg font-medium text-slate-800 mb-2">Billing & Banking (Optional)</h3>
      <p className="text-slate-500 text-sm mb-6">Link a bank account for direct debit or refund processing.</p>

      <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700">Bank Name</label>
          <input 
            type="text" 
            value={formData.bankName}
            onChange={(e) => handleChange('bankName', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="e.g. SBI, HDFC"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">Account Number</label>
            <input 
              type="text" 
              value={formData.accountNumber}
              onChange={(e) => handleChange('accountNumber', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">IFSC Code</label>
            <input 
              type="text" 
              value={formData.ifsc}
              onChange={(e) => handleChange('ifsc', e.target.value.toUpperCase())}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
            />
          </div>
        </div>
        
        <div className="p-4 bg-slate-50 rounded-lg text-sm text-slate-500 border border-slate-100 flex items-start">
           <AlertCircle className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0" />
           <p>Providing bank details is optional. You can always add this later from the client profile settings.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-8">
        <button 
          onClick={() => navigate('/clients')}
          className="text-slate-500 hover:text-slate-700 flex items-center text-sm font-medium mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Directory
        </button>
        <h2 className="text-3xl font-bold text-slate-800">New Client Onboarding</h2>
        <p className="text-slate-500 mt-1">Complete the steps below to setup a new client in the ERP.</p>
      </div>

      {renderStepIndicator()}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Step Content */}
        <div className="p-6 md:p-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`px-4 py-2 rounded-lg font-medium transition-colors border border-slate-300 ${
              currentStep === 1 ? 'opacity-0 pointer-events-none' : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            Back
          </button>
          
          <button
            onClick={handleNext}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-sm transition-all transform active:scale-95"
          >
            {currentStep === steps.length ? 'Complete Setup' : 'Next Step'}
            {currentStep === steps.length ? <Save className="h-4 w-4 ml-2" /> : <ChevronRight className="h-4 w-4 ml-2" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientOnboardingWizard;
