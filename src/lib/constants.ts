export const SPORTS = [
  { id: 'football', name: 'Football' },
  { id: 'basketball', name: 'Basketball' },
  { id: 'cricket', name: 'Cricket' },
  { id: 'tennis', name: 'Tennis' },
  { id: 'badminton', name: 'Badminton' },
  { id: 'volleyball', name: 'Volleyball' },
  { id: 'table-tennis', name: 'Table Tennis' },
  { id: 'chess', name: 'Chess' },
] as const;

export const SPONSORSHIP_LEVELS = [
  { id: 'platinum', name: 'Platinum', minAmount: 5000 },
  { id: 'gold', name: 'Gold', minAmount: 3000 },
  { id: 'silver', name: 'Silver', minAmount: 1000 },
  { id: 'bronze', name: 'Bronze', minAmount: 500 },
] as const;

export const TOURNAMENT_STATUSES = [
  { id: 'upcoming', name: 'Upcoming' },
  { id: 'ongoing', name: 'Ongoing' },
  { id: 'completed', name: 'Completed' },
] as const;