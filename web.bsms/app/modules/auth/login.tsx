import { useState } from "react";
import logoDark from "../../../public/logo-dark.svg";
import logoLight from "../../../public/logo-light.svg";
import { Link } from "react-router/internal/react-server-client";

export default function Login() {
  const [mode, setMode] = useState<"options" | "email">("options");

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-90 flex flex-col items-center gap-8">
        <div className="">
            <header className="flex flex-col items-center gap-9">
                <div className="w-50 max-w-[100vw] p-4">
                    <img
                        src={logoLight}
                        alt="React Router"
                        className="block w-full dark:hidden"
                    />
                    <img
                        src={logoDark}
                        alt="React Router"
                        className="hidden w-full dark:block"
                    />
                </div>
            </header>

            <h1 className="text-xl font-semibold text-gray-500 dark:text-gray-50">
                {mode === "options" ? "Log in into myTeam" : "Log in with email"}
            </h1>
        </div>

        {mode === "options" ? (
          <div className="w-full flex flex-col gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-3 w-full rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              onClick={() => {
                // TODO: trigger Google OAuth flow
              }}
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <button
              type="button"
              className="flex items-center justify-center w-full rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setMode("email")}
            >
              Continue with email
            </button>
          </div>
        ) : (
          <form
            className="w-full flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: submit email/password credentials
            }}
          >
            <input
              type="email"
              required
              placeholder="Email"
              className="w-full rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="password"
              required
              placeholder="Password"
              className="w-full rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <button
              type="submit"
              className="w-full rounded-full bg-gray-900 dark:bg-white px-4 py-3 text-sm font-medium text-white dark:text-gray-900 hover:opacity-90 transition-opacity"
            >
              Continue
            </button>

            <button
              type="button"
              className="text-sm text-gray-500 dark:text-gray-400 hover:underline mt-1"
              onClick={() => setMode("options")}
            >
              Back
            </button>
          </form>
        )}

        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-700 dark:text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 0 0 9 18z"
        fill="#34A853"
      />
      <path
        d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.03l2.99-2.33z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.97l2.99 2.33C4.66 5.17 6.65 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  );
}