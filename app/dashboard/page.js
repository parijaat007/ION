"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import useSWR from "swr";

const Dashboard = () => {
  // const [data, setData] = useState([]);
  // const [err, setErr] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const getData = async () => {
  //     setIsLoading(true);
  //     const res = await fetch("", { cache: "no=store" });

  //     if (!res.ok) {
  //       setErr(true);
  //     }
  //     const data = await res.json();
  //     setData(data);
  //     setIsLoading(false);
  //   };
  //   getData();
  // }, []);

  const session = useSession();
  const router = useRouter();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `/api/posts?username=${session?.data?.user.name}`,
    fetcher
  );

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }
  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const desc = e.target[1].value;
    const image = e.target[2].value;
    const content = e.target[3].value;

    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          image,
          content,
          username: session.data.user.name,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (session.status === "authenticated") {
    return (
      <div className="flex gap-20">
        <div className="flex-1">
          {isLoading
            ? "loading"
            : data?.map((post) => (
                <div
                  key={post._id}
                  className="w-max h-auto flex items-center gap-20 my-12 mx-0"
                >
                  <div className="w-80 h-auto relative">
                    <Image
                      src={post.image}
                      width={200}
                      height={100}
                      alt=""
                      className=" object-cover"
                    />
                  </div>
                  <div>{post.title}</div>
                  <div className="cursor-pointer text-red-700">X</div>
                </div>
              ))}
        </div>
        <form className="flex-1 flex flex-col gap-5" onSubmit={handleSubmit}>
          <h1>Add New Post</h1>
          <input
            type="text"
            placeholder="Title"
            className="p-3 bg-transparent font-bold text-xl border-2 border-solid border-gray-400"
          />
          <input
            type="text"
            placeholder="Desc"
            className="p-3 bg-transparent font-bold text-xl border-2 border-solid border-gray-400"
          />
          <input
            type="text"
            placeholder="Image"
            className="p-3 bg-transparent font-bold text-xl border-2 border-solid border-gray-400"
          />
          <textarea
            placeholder="Content"
            cols="30"
            rows="10"
            className="p-3 bg-transparent font-bold text-xl border-2 border-solid border-gray-400"
          ></textarea>
          <button className="p-5 cursor-pointer bg-orange-400 border-2 rounded-md font-bold">
            Send
          </button>
        </form>
      </div>
    );
  }
};

export default Dashboard;