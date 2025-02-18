import clsx from 'clsx';

export default function Button({ clickHandler, title, color }) {
    
  return (
    <button
      onClick={clickHandler}
      className={clsx(
        'font-semibold text-white border-2 py-3 px-4 text-md rounded-md cursor-pointer mt-6 transition-all transform hover:scale-105 hover:shadow-xl flex gap-2 items-center', 
        `bg-${[color]}`, 
        `hover:bg-${color}`
      )}

      style={{backgroundColor: `${color}` }}
    >
      {title} 
    </button>
  );
}