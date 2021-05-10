export default function SignUp() {
  return (
    <div className="w-screen h-screen p-10 bg-gray-bg">
      <div className="flex w-3/4 mx-auto h-3/4">
        <div className="flex flex-col justify-center flex-1 pr-10">
          <h3 className="mb-3 text-5xl font-black text-blue-login">Social App</h3>
          <span className="text-xl font-medium">
            Connect and meet new people from all around the world.
          </span>
        </div>
        <div className="flex flex-col justify-center flex-1">
          <div className="flex flex-col justify-between p-5 bg-white rounded-lg h-80">
            <input
              placeholder="Email"
              className="h-12 pl-5 mb-2 text-lg border rounded-lg outline-none border-gray-light"
            />
            <input
              placeholder="Password"
              className="h-12 pl-5 mb-2 text-lg border rounded-lg outline-none border-gray-light"
            />
            <input
              placeholder="Confirm Password"
              className="h-12 pl-5 mb-2 text-lg border rounded-lg outline-none border-gray-light"
            />
            <input
              placeholder="Username"
              className="h-12 pl-5 mb-2 text-lg border rounded-lg outline-none border-gray-light"
            />
            <input
              placeholder="Full name"
              className="h-12 pl-5 mb-2 text-lg border rounded-lg outline-none border-gray-light"
            />
            <button
              className="self-center w-1/2 h-12 mb-2 text-xl font-medium text-white border-none rounded-lg outline-none cursor-pointer bg-green-register"
              type="button"
            >
              Sign up
            </button>
            <span className="font-medium text-center cursor-pointe">Already have an account?</span>
            <button
              className="self-center w-1/2 h-12 mb-2 text-xl font-medium text-white border-none rounded-lg outline-none cursor-pointer bg-blue-login"
              type="button"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
