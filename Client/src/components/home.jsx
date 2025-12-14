import { Link } from "react-router-dom";

export function Home({ logged }) {
  return (
    <div className="w-full flex justify-center pt-[100px] px-4 box-border">
      <div className="w-full max-w-6xl bg-gradient-to-br from-purple-100 via-pink-400 to-white px-4 sm:px-6 md:px-10 py-10 flex flex-col items-center rounded-lg shadow-lg dark:bg-blue-300 mx-auto z-10 relative">
       
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-purple-700 text-center mb-4 mt-4">
          <span className="inline-block transition-transform duration-300 hover:scale-125 hover:pr-3">
            🎵
          </span>
          My Music Playlist App
        </h1>

      
        <p className="text-base sm:text-xl md:text-2xl text-gray-700 text-center max-w-2xl mb-8">
          Add your favorite tracks, organize them beautifully, and listen to
          your custom playlist — all in one place!
        </p>

        {logged && (
          <Link
            to="/addsong"
            className="bg-purple-600 hover:bg-purple-700 text-white text-base sm:text-lg px-6 py-3 rounded-lg transition mb-12"
          >
            ➕ Start Adding Songs
          </Link>
        )}

       
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
               <span className="inline-block transition-transform duration-300 hover:scale-125 hover:pr-3">
            🎧
          </span>Add Songs
            </h3>
            <p className="text-gray-600">
              Add songs with title, artist, and a playable link.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              <span className="inline-block transition-transform duration-300 hover:scale-125 hover:pr-3">
            🔍
          </span>  Search Instantly
            </h3>
            <p className="text-gray-600">
              Find songs by title or artist using the live search.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-4xl transition ">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              <span className="inline-block transition-transform duration-300 hover:scale-125 hover:pr-3">
            🔐
          </span> Secure & Synced
            </h3>
            <p className="text-gray-600">
              Your songs are safely stored on the server and linked to your
              account — accessible after login.
            </p>
          </div>
        </div>

        <footer className="mt-16 text-gray-500 text-sm text-center w-full  shadow-lg hover:text-xl hover:text-grey-800">
          Made with ❤️ using React & TailwindCSS
        </footer>
      </div>
    </div>
  );
}
