export default function Unauthorized() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white text-center p-6">
      <h1 className="text-6xl font-black text-red-600">403</h1>
      <h2 className="text-2xl font-bold mt-4">Access Denied</h2>
      <p className="text-slate-500 mt-2 max-w-sm">
        Your account does not have administrator privileges. Please contact the
        system head if this is an error.
      </p>
      <button
        onClick={() => (window.location.href = '/portal')}
        className="mt-8 px-8 py-3 bg-black text-white rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-blue-600 transition-all"
      >
        Back to Home
      </button>
    </div>
  );
}
