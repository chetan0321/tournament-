import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Trophy, Calendar, DollarSign, Users } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import toast from 'react-hot-toast';

interface TournamentForm {
  name: string;
  startDate: string;
  endDate: string;
  registrationFee: string;
  maxTeams: string;
  description: string;
  sport: string;
}

export default function CreateTournament() {
  const { register, handleSubmit, formState: { errors } } = useForm<TournamentForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: TournamentForm) => {
    try {
      // TODO: Implement tournament creation with Supabase
      console.log('Tournament data:', data);
      toast.success('Tournament created successfully!');
      navigate('/tournaments');
    } catch (error) {
      toast.error('Failed to create tournament');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Trophy className="h-6 w-6 text-blue-600 mr-2" />
        <h1 className="text-2xl font-bold text-gray-900">Create Tournament</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Tournament Name"
          icon={Trophy}
          error={errors.name?.message}
          {...register("name", { required: "Tournament name is required" })}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Start Date"
            icon={Calendar}
            type="date"
            error={errors.startDate?.message}
            {...register("startDate", { required: "Start date is required" })}
          />

          <Input
            label="End Date"
            icon={Calendar}
            type="date"
            error={errors.endDate?.message}
            {...register("endDate", { required: "End date is required" })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Registration Fee ($)"
            icon={DollarSign}
            type="number"
            error={errors.registrationFee?.message}
            {...register("registrationFee", { required: "Registration fee is required" })}
          />

          <Input
            label="Maximum Teams"
            icon={Users}
            type="number"
            error={errors.maxTeams?.message}
            {...register("maxTeams", { required: "Maximum teams is required" })}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Sport</label>
          <select
            {...register("sport", { required: "Sport is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a sport</option>
            <option value="football">Football</option>
            <option value="basketball">Basketball</option>
            <option value="volleyball">Volleyball</option>
            <option value="cricket">Cricket</option>
            <option value="tennis">Tennis</option>
          </select>
          {errors.sport && <p className="text-sm text-red-600">{errors.sport.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/tournaments')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Tournament
          </button>
        </div>
      </form>
    </div>
  );
}