import { PlusIcon } from '@heroicons/react/24/outline';

function StartForm({ onStartClick }) {
  return (
    <div className="p-4">
      <button
        className="flex items-center gap-2 p-2 bg-blue-500 text-white rounded-lg"
        onClick={onStartClick} // Using the passed function here
      >
        <PlusIcon className="h-5 w-5" aria-hidden="true" />
        Create New PVF Submittal
      </button>
    </div>
  );
}

export default StartForm;
