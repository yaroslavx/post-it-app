import {signIn} from "next-auth/react"

function Login({ providers }) {
  return (
    <div className="m-auto flex flex-col items-center space-y-3 pt-48 w-fit">
      <div className="bg-theme rounded-xl mb-1 py-2 px-5 w-full">
        <img
          src="https://see.fontimg.com/api/renderfont4/ALJ6m/eyJyIjoiZnMiLCJoIjoxNzQsInciOjIwMDAsImZzIjo4NywiZmdjIjoiI0ZFRkZGRiIsImJnYyI6IiM2NkJGRkYiLCJ0IjoxfQ/UE9TVFk/landasans-medium.png"
          className="h-14"
        />
      </div>

      <div>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="relative inline-flex items-center justify-start text-neutral-800 px-5 py-2 overflow-hidden font-medium transition-all bg-gray-100 rounded-full hover:bg-white group hover:text-white hover:bg-theme"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
                Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Login;