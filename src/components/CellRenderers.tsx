import React from 'react';
import { type ICellRendererParams } from 'ag-grid-community';

const StatusRenderer: React.FC<ICellRendererParams> = (props) => {
   const isActive = props.value === true;
   return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${isActive
         ? 'bg-green-100 text-green-800'
         : 'bg-red-100 text-red-800'
         }`}>
         {isActive ? 'Active' : 'Inactive'}
      </span>
   );
};

const SkillsRenderer: React.FC<ICellRendererParams> = (props) => {
   const skills = props.value || [];
   return (
      <div className="flex flex-wrap gap-1">
         {skills.slice(0, 3).map((skill: string, idx: number) => (
            <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
               {skill}
            </span>
         ))}
         {skills.length > 3 && (
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
               +{skills.length - 3}
            </span>
         )}
      </div>
   );
};

const RatingRenderer: React.FC<ICellRendererParams> = (props) => {
   const rating = Math.floor(props.value || 0);
   return (
      <div className="flex items-center gap-1">
         <span className="text-yellow-400 text-sm">
            {/* Will change in production with Star Rating componeny */}
            {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
         </span>
         <span className="text-xs text-gray-500">({props.value})</span>
      </div>
   );
};

const EmployeeNameRenderer: React.FC<ICellRendererParams> = (props) => {
   return (
      <div>
         <div className="font-medium text-gray-900">{props.value}</div>
         <div className="text-xs text-gray-500">{props.data.position}</div>
      </div>
   );
};

export { StatusRenderer, SkillsRenderer, RatingRenderer, EmployeeNameRenderer };
