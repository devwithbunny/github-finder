"use client";

import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  interface GitHubUser {
    login: string;
    avatar_url: string;
    html_url: string;
    name?: string;
    bio: string;
  }

  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetchUser = async () => {
    if (!username) return;
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) {
        throw new Error("User not found");
      }
      const data = await res.json();
      setUserData(data);
      setError(null);
    } catch (err) {
      setUserData(null);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };

  return (
    <>
      {/* Top Section */}
      <div className="min-h-screen bg-[#000] flex justify-center items-center py-[50px] px-[20px] w-full">
        <div className="flex justify-center flex-col items-center text-center w-full gap-[20px] ">
          <div className="lg:flex items-center lg:justify-between w-full max-w-[1120px]">
            <div>
              <img src="./octocat.png" className="w-full h-full" alt="" />
            </div>
            <div>
              <h1 className="text-[20px] lg:text-[40px] font-bold">
                Hi, I'm{" "}
                <span className="text-[#8963ff] font-extrabold italic">
                  OCTOCAT
                </span>{" "}
                I can help you find GitHub user profiles and provide their
                public repositories.
              </h1>
            </div>
          </div>

          <div className="w-full flex flex-col gap-[16px] max-w-[850px]">
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border w-full p-[6px] rounded-[6px]"
            />
            <button
              onClick={handleFetchUser}
              className="w-full p-[6px] rounded-[6px] text-[#000] text-[18px] font-extrabold bg-[#8963ff]"
            >
              Find
            </button>
          </div>
        </div>
      </div>

      {/* Result Section */}
      <div className="min-h-screen bg-[#000]  w-full py-[50px] px-[20px]">
        <div className="w-full flex flex-col items-center justify-center ">
          {error && <p className="text-red-500 font-extrabold">{error}</p>}

          {userData && (
            <>
              <div className="border h-[200px] w-[200px] overflow-hidden rounded-[10px] mb-[20px]">
                <img
                  src={userData.avatar_url}
                  alt={userData.login}
                  className="object-cover h-full w-full"
                />
              </div>
              <h1 className="text-[18px] font-extrabold mb-[4px]">
                {userData.name}
              </h1>
              <p className="mb-[20px]">{userData.bio}</p>
              <button className="w-full p-[6px] rounded-[6px] text-[#000] text-[18px] font-extrabold bg-[#8963ff] max-w-[200px] text-center">
                <a
                  href={userData.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Profile
                </a>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
