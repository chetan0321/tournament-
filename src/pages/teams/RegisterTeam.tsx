import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Users, Mail, Phone } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import toast from 'react-hot-toast';

interface TeamForm {
  teamName: string;
  captainName: string;
  email: string;
  phone: string;
  tournament: string;
  players: string;
}

export default function RegisterTeam() {
  const { register, handleSubmit, formState: { errors } } = useForm<TeamForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: TeamForm) => {
    try {
      // TODO: Implement team registration with Supabase
      console.log('Team data:', data);
      toast.success('Team registered successfully!');
      navigate('/teams');
    } catch (error) {
      toast.error('Failed to register team');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Users className="h-6 w-6 text-green-600 mr-2" />
        <h1 className="text-2xl font-bold text-gray-900">Register Team</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Team Name"
          icon={Users}
          error={errors.teamName?.message}
          {...register("teamName", { required: "Team name is required" })}
        />

        <Input
          label="Captain Name"
          icon={Users}
          error={errors.captainName?.message}
          {...register("captainName", { required: "Captain name is required" })}
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
            label="Phone"
            icon={Phone}
            error={errors.phone?.message}
            {...register("phone", { required: "Phone number is required" })}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Tournament</label>
          <select
            {...register("tournament", { required: "Tournament selection is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a tournament</option>
            <option value="1">Summer Football League 2024</option>
            <option value="2">Basketball Championship</option>
            <option value="3">Volleyball Tournament</option>
          </select>
          {errors.tournament && <p className="text-sm text-red-600">{errors.tournament.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Players List</label>
          <textarea
            {...register("players", { required: "Players list is required" })}
            placeholder="Enter player names (one per line)"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.players && <p className="text-sm text-red-600">{errors.players.message}</p>}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/teams')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Register Team
          </button>
        </div>
      </form>
    </div>
  );
}