import React from 'react';
import { Clock, Code2, BookText, ArrowRight } from 'lucide-react'; // Icons for that pro look
interface AssignmentCardProps {
  attributes: {
    Title: string;
    Assignment_Type: string;
    Target_Level: string;
    Deadline: string;
  };
  id: number;

  onClick: (id: number) => void;
}

const AssignmentCard = ({ attributes, id, onClick }: AssignmentCardProps) => {
  const { Title, Assignment_Type, Target_Level, Deadline } = attributes;

  const dueDate = new Date(Deadline);
  const isExpired = new Date() > dueDate;

  // Format date: e.g., "Jan 28, 2:30 PM"
  const formattedDate = dueDate.toLocaleString('en-GB', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="relative group overflow-hidden bg-white/3 backdrop-blur-md border border-white/10 rounded-3xl p-6 transition-all duration-500 hover:bg-white/6 hover:border-yellow-400/30 hover:-translate-y-1">
      {/* Background Glow Effect */}
      <div
        className={`absolute -top-20 -right-20 w-40 h-40 blur-[80px] opacity-20 transition-colors duration-500 ${
          Assignment_Type === 'coding' ? 'bg-yellow-400' : 'bg-blue-500'
        }`}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Top Row: Type & Level Labels */}
        <div className="flex justify-between items-center mb-6">
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${
              Assignment_Type === 'coding'
                ? 'bg-yellow-400/10 border-yellow-400/20 text-yellow-400'
                : 'bg-blue-400/10 border-blue-400/20 text-blue-400'
            }`}
          >
            {Assignment_Type === 'coding' ? (
              <Code2 size={12} />
            ) : (
              <BookText size={12} />
            )}
            {Assignment_Type}
          </div>

          <span className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">
            {Target_Level} Level
          </span>
        </div>

        {/* Middle Row: Title */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2">
            {Title}
          </h3>
        </div>

        {/* Bottom Row: Deadline & Action */}
        <div className="mt-auto flex items-end justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-white/40">
              <Clock size={14} />
              <span className="text-[10px] font-black uppercase tracking-wider">
                Deadline
              </span>
            </div>
            <p
              className={`text-sm font-bold ${isExpired ? 'text-red-400' : 'text-white'}`}
            >
              {isExpired ? 'Closed' : formattedDate}
            </p>
          </div>

          <button
            onClick={() => onClick(id)}
            disabled={isExpired}
            className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 ${
              isExpired
                ? 'bg-white/5 text-white/10 cursor-not-allowed'
                : 'bg-yellow-400 text-black hover:scale-110 shadow-[0_0_20px_rgba(250,204,21,0.2)] active:scale-95'
            }`}
          >
            <ArrowRight size={20} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default AssignmentCard;
