export function LoadingState({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <p className="mt-3 text-sm">{message}</p>
      </div>
    </div>
  );
}