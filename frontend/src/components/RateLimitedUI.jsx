import { ZapIcon } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-primary/5 border border-primary/30 rounded-lg shadow-xl">
        <div className="flex flex-col md:flex-row items-center p-6">
          <div className="bg-primary/20 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
            <ZapIcon className="size-10 text-primary" />
          </div>
          <div aria-live="assertive" className="text-center md:text-left">
            <h2 className="text-xl font-bold mb-2 text-base-content">
              Rate Limit Reached!
            </h2>
            <p className="text-base-content mb-1">
              You've made too many requests in a short period. Please wait a
              moment.
            </p>
            <p className="text-sm text-base-content/85">
              Try again in a few seconds for the best experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;
