import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Building, Link as LinkIcon, Mail } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import toast from 'react-hot-toast';

interface SponsorshipForm {
  companyName: string;
  email: string;
  website: string;
  sponsorshipLevel: string;
  message: string;
}

export default function ManageSponsorship() {
  const { register, handleSubmit, formState: { errors } } = useForm<SponsorshipForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: SponsorshipForm) => {
    try {
      // TODO: Implement sponsorship submission with Supabase
      console.log('Sponsorship data:', data);
      toast.success('Sponsorship inquiry submitted successfully!');
      navigate('/sponsorships');
    } catch (error) {
      toast.error('Failed to submit sponsorship inquiry');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <DollarSign className="h-6 w-6 text-purple-600 mr-2" />
        <h1 className="text-2xl font-bold text-gray-900">Sponsorship Inquiry</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Company Name"
          icon={Building}
          error={errors.companyName?.message}
          {...register("companyName", { required: "Company name is required" })}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email"
            icon={Mail}
            type="email"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
          />

          <Input
            label="Website"
            icon={LinkIcon}
            error={errors.website?.message}
            {...register("website", { required: "Website URL is required" })}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Sponsorship Level</label>
          <select
            {...register("sponsorshipLevel", { required: "Sponsorship level is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a level</option>
            <option value="platinum">Platinum Sponsor</option>
            <option value="gold">Gold Sponsor</option>
            <option value="silver">Silver Sponsor</option>
            <option value="bronze">Bronze Sponsor</option>
          </select>
          {errors.sponsorshipLevel && <p className="text-sm text-red-600">{errors.sponsorshipLevel.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            {...register("message", { required: "Message is required" })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Tell us about your sponsorship goals..."
          />
          {errors.message && <p className="text-sm text-red-600">{errors.message.message}</p>}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/sponsorships')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Submit Inquiry
          </button>
        </div>
      </form>
    </div>
  );
}